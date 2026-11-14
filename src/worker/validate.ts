// Validación del formulario de contacto (lado servidor). Nunca se confía en lo que valida el navegador.

export const LIMITS = {
  name: 100,
  company: 120,
  email: 120,
  phone: 30,
  zone: 100,
  message: 3000,
} as const;

export const TOPICS = {
  'no-se': 'No sé / no estoy seguro',
  soporte: 'Soporte técnico (PC, notebook, impresora, programas)',
  redes: 'Redes, Wi-Fi e internet',
  respaldo: 'Copias de seguridad y datos',
  seguridad: 'Virus y seguridad',
  continuidad: 'Gestión operativa y continuidad',
  automatizacion: 'Automatización de tareas',
  compra: 'Asesoramiento para comprar equipos',
  otro: 'Otro',
} as const;

export const URGENCY = {
  'no-urgente': 'No es urgente',
  hoy: 'Necesito ayuda hoy',
  'sin-trabajar': 'Estoy sin poder trabajar',
} as const;

export const MODE = {
  'no-se': 'No sé / lo definimos juntos',
  remoto: 'Remoto',
  presencial: 'Presencial',
} as const;

export const SIZE = {
  personal: 'Uso personal / 1 persona',
  '2-5': '2 a 5 equipos o personas',
  '6-20': '6 a 20',
  '21-50': '21 a 50',
  '51+': 'Más de 50',
} as const;

export type Clean = {
  name: string;
  company: string;
  email: string;
  phone: string;
  zone: string;
  message: string;
  topic: keyof typeof TOPICS | '';
  urgency: keyof typeof URGENCY | '';
  mode: keyof typeof MODE | '';
  size: keyof typeof SIZE | '';
};

export type Errors = Partial<Record<'name' | 'contact' | 'email' | 'phone' | 'message' | 'company' | 'zone', string>>;

// Limpia: texto, sin caracteres de control, espacios recortados.
function clean(v: unknown, max: number, multiline = false): string {
  if (typeof v !== 'string') return '';
  let s = v.normalize('NFC').replace(/\r\n?/g, '\n');
  s = s.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, ' ');
  return s.trim().slice(0, max + 1); // +1 para poder detectar el exceso
}

function pick<T extends Record<string, string>>(map: T, v: unknown): keyof T | '' {
  return typeof v === 'string' && Object.prototype.hasOwnProperty.call(map, v) ? (v as keyof T) : '';
}

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

export function validate(input: Record<string, unknown>): { ok: true; data: Clean } | { ok: false; errors: Errors } {
  const data: Clean = {
    name: clean(input.name, LIMITS.name),
    company: clean(input.company, LIMITS.company),
    email: clean(input.email, LIMITS.email).toLowerCase(),
    phone: clean(input.phone, LIMITS.phone),
    zone: clean(input.zone, LIMITS.zone),
    message: clean(input.message, LIMITS.message, true),
    topic: pick(TOPICS, input.topic),
    urgency: pick(URGENCY, input.urgency),
    mode: pick(MODE, input.mode),
    size: pick(SIZE, input.size),
  };
  const errors: Errors = {};

  if (!data.name) errors.name = 'Decinos cómo te llamás.';
  else if (data.name.length > LIMITS.name) errors.name = `El nombre es muy largo (máximo ${LIMITS.name} caracteres).`;

  if (data.company.length > LIMITS.company) errors.company = `Es muy largo (máximo ${LIMITS.company} caracteres).`;
  if (data.zone.length > LIMITS.zone) errors.zone = `Es muy largo (máximo ${LIMITS.zone} caracteres).`;

  if (data.email && (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))) {
    errors.email = 'Revisá el correo: parece que le falta algo (por ejemplo: nombre@ejemplo.com).';
  }
  const digits = data.phone.replace(/\D/g, '');
  if (
    data.phone &&
    (data.phone.length > LIMITS.phone || digits.length < 8 || digits.length > 15 || /[^\d\s+()\-.]/.test(data.phone))
  ) {
    errors.phone = 'Revisá el teléfono: usá solo números (por ejemplo: 11 2345-6789).';
  }
  if (!data.email && !data.phone) {
    errors.contact = 'Dejanos un correo o un teléfono (con uno solo alcanza) para poder responderte.';
  }

  if (!data.message) errors.message = 'Contanos con tus palabras qué necesitás. No hace falta que sea técnico.';
  else if (data.message.length > LIMITS.message) {
    errors.message = `El mensaje es muy largo (máximo ${LIMITS.message} caracteres). Resumilo y lo vemos en detalle después.`;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
