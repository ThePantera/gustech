import { site } from './site';

// Datos legales del sitio. Los campos vacíos NO se muestran en las páginas legales.
// TODO (propietario): completar razonSocial, cuit, domicilio y titularNombre cuando correspondan.
// No inventar datos: dejar '' si no se tienen o no se quieren publicar.
export const legal = {
  razonSocial: '',
  cuit: '',
  domicilio: '',
  titularNombre: '',
  // Fecha de la última actualización de los textos legales (AAAA-MM-DD).
  updated: '2026-11-16',
  // Responsable del tratamiento de datos y canal para ejercer derechos.
  dataController: {
    name: site.name,
    email: site.email,
    rrhhEmail: site.rrhhEmail,
  },
  // Plazos de conservación. CRITERIO propuesto, a confirmar por el propietario o un abogado.
  retention: {
    contact: '24 meses desde la última comunicación',
    cv: '24 meses desde que lo recibimos',
    ip: 'unas pocas horas (solo mientras dura la ventana del límite anti-spam)',
  },
  consumerDefenseUrl: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor',
  aaipUrl: 'https://www.argentina.gob.ar/aaip',
} as const;

export const legalPages = [
  { href: '/privacidad', label: 'Política de privacidad' },
  { href: '/terminos', label: 'Términos y condiciones' },
  { href: '/cookies', label: 'Política de cookies' },
] as const;

export const formatLegalDate = (iso: string) =>
  new Date(`${iso}T12:00:00-03:00`).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  });
