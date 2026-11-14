import { MODE, SIZE, TOPICS, URGENCY, type Clean } from './validate';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildMail(d: Clean, flags: string[] = []) {
  const rows: [string, string][] = [
    ['Nombre', d.name],
    ['Empresa / estudio', d.company || '—'],
    ['Correo', d.email || '—'],
    ['Teléfono / WhatsApp', d.phone || '—'],
    ['Tipo de consulta', d.topic ? TOPICS[d.topic] : '—'],
    ['Urgencia', d.urgency ? URGENCY[d.urgency] : '—'],
    ['Modalidad preferida', d.mode ? MODE[d.mode] : '—'],
    ['Zona / localidad', d.zone || '—'],
    ['Equipos o personas', d.size ? SIZE[d.size] : '—'],
  ];
  const urgent = d.urgency === 'sin-trabajar' ? '[URGENTE] ' : d.urgency === 'hoy' ? '[HOY] ' : '';
  // El asunto es de una sola línea (sin saltos) para evitar inyección de cabeceras.
  // "[REVISAR]" permite que una regla de Zoho mande las consultas dudosas a una carpeta aparte.
  const review = flags.length ? '[REVISAR] ' : '';
  const subject = `${review}${urgent}Consulta web: ${d.name}`.replace(/[\r\n]+/g, ' ').slice(0, 150);
  const warn = flags.length ? `Posible spam (${flags.join('; ')}). Revisala antes de responder.` : '';

  const text =
    (warn ? `*** ${warn} ***\n\n` : '') + rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMensaje:\n${d.message}\n`;
  const font = 'font-family:system-ui,Arial,sans-serif;font-size:15px';
  const html =
    (warn ? `<p style="${font};color:#b91c1c"><strong>${esc(warn)}</strong></p>` : '') +
    `<table cellpadding="6" style="${font};border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="color:#64748b">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`).join('') +
    `</table><p style="${font}"><strong>Mensaje:</strong></p>` +
    `<p style="${font};white-space:pre-wrap">${esc(d.message)}</p>`;
  return { subject, text, html };
}
