// Worker de GUSTECH: atiende solo POST /api/contacto; el resto lo sirve el sitio estático
// (wrangler.jsonc: assets.run_worker_first = ["/api/*"]).
import { buildMail } from './mail';
import { validate, type Errors } from './validate';

export interface Env {
  ASSETS: Fetcher;
  /** Secret: clave secreta de Cloudflare Turnstile. */
  TURNSTILE_SECRET: string;
  /** Secret: API key de Resend (solo permiso de envío). */
  RESEND_API_KEY: string;
  /** Variables no secretas (wrangler.jsonc). */
  MAIL_TO: string;
  MAIL_FROM: string;
  SITE_ORIGIN: string;
}

const MAX_BODY = 24 * 1024;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Respuesta HTML para el envío normal (sin JavaScript).
function page(title: string, bodyHtml: string, status = 200) {
  const html =
    `<!doctype html><html lang="es-AR"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">` +
    `<title>${title} | GUSTECH</title><style>body{font:17px/1.5 system-ui,Arial,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1rem;color:#172033}a{color:#1d4ed8}h1{font-size:1.5rem}</style></head>` +
    `<body><h1>${title}</h1>${bodyHtml}<p><a href="/#contacto">Volver al sitio</a></p></body></html>`;
  return new Response(html, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      'x-content-type-options': 'nosniff',
    },
  });
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const j = (await r.json()) as { success?: boolean };
    return j.success === true;
  } catch {
    return false;
  }
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const fail = (code: string, message: string, status: number, errors?: Errors) =>
    wantsJson
      ? json({ ok: false, code, message, errors }, status)
      : page(
          'No pudimos enviar tu consulta',
          `<p>${esc(message)}</p>` +
            (errors
              ? `<ul>${Object.values(errors).map((e) => `<li>${esc(e)}</li>`).join('')}</ul><p>Volvé atrás con el botón del navegador para corregirlo.</p>`
              : '') +
            `<p>También podés escribirnos a <a href="mailto:${esc(env.MAIL_TO)}">${esc(env.MAIL_TO)}</a> o por WhatsApp al <a href="https://wa.me/5491123884030">11 2388-4030</a>.</p>`,
          status,
        );

  // Solo desde nuestro propio sitio (o localhost en desarrollo).
  const origin = request.headers.get('origin');
  if (origin && origin !== env.SITE_ORIGIN && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return fail('origin', 'Origen no permitido.', 403);
  }

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) {
    return fail('too_large', 'El mensaje es demasiado grande.', 413);
  }

  let fields: Record<string, unknown> = {};
  try {
    const ct = request.headers.get('content-type') ?? '';
    const raw = await request.text();
    if (raw.length > MAX_BODY) return fail('too_large', 'El mensaje es demasiado grande.', 413);
    if (ct.includes('application/json')) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') fields = parsed as Record<string, unknown>;
    } else if (ct.includes('application/x-www-form-urlencoded')) {
      fields = Object.fromEntries(new URLSearchParams(raw));
    } else {
      return fail('bad_request', 'Formato no soportado.', 415);
    }
  } catch {
    return fail('bad_request', 'No pudimos leer el formulario.', 400);
  }

  // Honeypot: una persona no ve este campo. Respondemos "ok" para no darle pistas al bot.
  if (typeof fields.sitio_web === 'string' && fields.sitio_web.trim() !== '') {
    return wantsJson ? json({ ok: true }) : page('Consulta enviada', '<p>Gracias. Te respondemos a la brevedad.</p>');
  }

  const v = validate(fields);
  if (!v.ok) return fail('validation', 'Revisá los datos marcados.', 422, v.errors);

  const token = typeof fields['cf-turnstile-response'] === 'string' ? (fields['cf-turnstile-response'] as string) : '';
  if (!token) {
    return fail(
      'captcha_missing',
      'No pudimos verificar que sos una persona (esa verificación necesita JavaScript activado).',
      403,
    );
  }
  if (!(await verifyTurnstile(token, env.TURNSTILE_SECRET, request.headers.get('CF-Connecting-IP')))) {
    return fail('captcha', 'La verificación anti-robots falló o venció. Probá de nuevo.', 403);
  }

  const mail = buildMail(v.data);
  const payload: Record<string, unknown> = {
    from: env.MAIL_FROM,
    to: [env.MAIL_TO],
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };
  if (v.data.email) payload.reply_to = v.data.email;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      console.error('resend_error', r.status, (await r.text()).slice(0, 300));
      return fail('send', 'No pudimos enviar tu consulta en este momento.', 502);
    }
  } catch (e) {
    console.error('resend_exception', String(e));
    return fail('send', 'No pudimos enviar tu consulta en este momento.', 502);
  }

  return wantsJson
    ? json({ ok: true })
    : page('Consulta enviada', '<p>Gracias. Recibimos tu consulta y te respondemos a la brevedad.</p>');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contacto') {
      if (request.method !== 'POST') {
        return new Response('Método no permitido', { status: 405, headers: { allow: 'POST' } });
      }
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
