// Protecciones anti-spam del formulario de contacto (lado servidor).
// Criterio: cortar el abuso sin rechazar a personas reales. Lo dudoso NO se descarta: se marca
// con "[REVISAR]" en el asunto para que una regla de Zoho lo mande a una carpeta aparte.
import type { Clean } from './validate';

/** Máximo de consultas aceptadas por persona (IP) por hora. */
export const LIMIT_PER_IP_HOUR = 3;
/** Máximo de consultas que el formulario envía por día. Protege el cupo gratis de Resend (100/día). */
export const DAILY_CAP = 40;

// --- Contadores en KV (best effort: si KV falla o no está, se deja pasar para no bloquear a clientes) ---

export interface Counter {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl: number }): Promise<void>;
}

export async function count(kv: Counter | undefined, key: string): Promise<number> {
  if (!kv) return 0;
  try {
    return Number(await kv.get(key)) || 0;
  } catch {
    return 0;
  }
}

export async function bump(kv: Counter | undefined, key: string, ttlSeconds: number): Promise<void> {
  if (!kv) return;
  try {
    const n = (Number(await kv.get(key)) || 0) + 1;
    await kv.put(key, String(n), { expirationTtl: Math.max(60, ttlSeconds) });
  } catch {
    /* sin contador, no se bloquea */
  }
}

export const ipKey = (ip: string) => `ip:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
export const dayKey = () => `day:${new Date().toISOString().slice(0, 10)}`;

// --- Correo: dominio real y no descartable ---

const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'grr.la',
  '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org', 'tempail.com',
  'yopmail.com', 'yopmail.fr', 'trashmail.com', 'sharklasers.com', 'getnada.com',
  'throwawaymail.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com', 'mintemail.com',
  'mohmal.com', 'emailondeck.com', 'burnermail.io', 'spamgourmet.com', 'moakt.com',
  'mailnesia.com', 'tmail.ws', 'dropmail.me', 'inboxkitten.com', 'mailcatch.com',
  'tempinbox.com', 'mytemp.email', 'tempr.email', 'discard.email', 'trbvm.com',
]);

type Dns = { Status?: number; Answer?: unknown[] };

async function dnsQuery(name: string, type: 'MX' | 'A' | 'AAAA'): Promise<Dns | null> {
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
      headers: { accept: 'application/dns-json' },
      signal: AbortSignal.timeout(2500),
    });
    if (!r.ok) return null;
    return (await r.json()) as Dns;
  } catch {
    return null;
  }
}

export type EmailCheck = 'ok' | 'disposable' | 'nodomain';

/** Verifica el DOMINIO del correo (no el buzón): que exista y pueda recibir mail. Ante dudas, deja pasar. */
export async function checkEmail(email: string): Promise<EmailCheck> {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return 'ok';
  if (DISPOSABLE.has(domain)) return 'disposable';

  const mx = await dnsQuery(domain, 'MX');
  if (!mx) return 'ok'; // sin respuesta del servicio DNS: no bloqueamos
  if (mx.Status === 3) return 'nodomain'; // NXDOMAIN: el dominio no existe
  if ((mx.Answer?.length ?? 0) > 0) return 'ok';

  // Sin MX: por norma, el correo va al registro A/AAAA del dominio.
  const [a, aaaa] = await Promise.all([dnsQuery(domain, 'A'), dnsQuery(domain, 'AAAA')]);
  if (!a && !aaaa) return 'ok';
  if ((a?.Answer?.length ?? 0) > 0 || (aaaa?.Answer?.length ?? 0) > 0) return 'ok';
  return 'nodomain';
}

// --- Contenido: señales de spam (no se rechaza, se marca) ---

const SPAM_WORDS =
  /\b(backlinks?|seo\s+(services?|servicios?|ranking)|crypto(currency)?|bitcoin|casino|viagra|cialis|forex|escort|porn|loan\s+offer|click\s+here|apuestas?\s+online|rank\s+your\s+(site|website))\b/i;

export function spamSignals(d: Clean): string[] {
  const signals: string[] = [];
  const text = `${d.name}\n${d.company}\n${d.message}`;
  const links = (text.match(/https?:\/\/|www\./gi) ?? []).length;
  if (links > 2) signals.push(`${links} enlaces en el texto`);
  if (SPAM_WORDS.test(text)) signals.push('palabras típicas de spam');
  if (/https?:\/\/|www\./i.test(d.name)) signals.push('enlace en el nombre');
  return signals;
}
