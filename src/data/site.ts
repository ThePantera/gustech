// Datos centrales del sitio. Cambiar acá el tagline, el correo o la navegación
// los actualiza en todo el proyecto.

export const site = {
  name: 'GUSTECH IT Solutions',
  shortName: 'GUSTECH',
  url: 'https://gustech.com.ar',
  email: 'contacto@gustech.com.ar',
  // Teléfono: contacto SECUNDARIO (el principal es el correo). Formato nacional.
  phone: { display: '11 2388-4030', href: 'tel:1123884030' },
  locale: 'es-AR',
  // Tagline provisorio (pendiente de definición por el propietario).
  tagline: 'La tecnología de tu empresa, en buenas manos.',
  title: 'GUSTECH IT Solutions | Soporte y soluciones IT para empresas',
  description:
    'Soporte tecnológico, asistencia a usuarios y acompañamiento en infraestructura IT para empresas de Argentina.',
} as const;

export const nav = [
  // Los enlaces parten de "/" para que también funcionen desde la página 404.
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Soluciones', href: '/#soluciones' },
  { label: 'Cómo trabajamos', href: '/#como-trabajamos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

export const cta = {
  label: 'Solicitar asesoramiento',
  href: '/#contacto',
} as const;

export const hero = {
  title: 'Soluciones IT para que tu empresa siga avanzando.',
  description:
    'Brindamos soporte tecnológico, asistencia a usuarios y acompañamiento en infraestructura IT para ayudar a las empresas a trabajar de forma más segura, ordenada y eficiente.',
  secondaryCta: { label: 'Conocer nuestros servicios', href: '#servicios' },
} as const;

// Áreas de servicio ofrecidas o planificadas. PENDIENTE: el propietario debe
// confirmar cuáles estarán disponibles en el lanzamiento antes de publicar.
export const services = [
  {
    icon: 'headset',
    title: 'Soporte técnico IT',
    items: [
      'Asistencia remota a usuarios.',
      'Diagnóstico y resolución de incidentes de hardware, software y conectividad.',
      'Gestión y seguimiento de solicitudes.',
      'Escalamiento y coordinación con proveedores cuando corresponda.',
    ],
  },
  {
    icon: 'server',
    title: 'Infraestructura IT',
    items: [
      'Acompañamiento en la administración y mantenimiento de infraestructura.',
      'Puestos de trabajo, equipos y periféricos.',
      'Redes y conectividad.',
      'Documentación y organización de activos tecnológicos.',
    ],
  },
  {
    icon: 'activity',
    title: 'Monitoreo y operaciones',
    items: [
      'Seguimiento de indicadores y disponibilidad de servicios, según herramientas y alcance contratado.',
      'Detección y comunicación de eventos.',
      'Coordinación de incidentes y escalamiento.',
      'Reportes operativos acordados.',
    ],
  },
  {
    icon: 'window',
    title: 'Soporte de aplicaciones',
    items: [
      'Atención de incidentes reportados por usuarios.',
      'Análisis inicial y clasificación.',
      'Coordinación con equipos funcionales o proveedores.',
      'Seguimiento hasta su derivación o resolución.',
    ],
  },
  {
    icon: 'shield',
    title: 'Cloud y seguridad',
    items: [
      'Acompañamiento en servicios cloud y buenas prácticas.',
      'Revisión de accesos y permisos.',
      'Orientación sobre protección de equipos y cuentas.',
      'Alcance sujeto a evaluación y propuesta técnica.',
    ],
  },
  {
    icon: 'wrench',
    title: 'Mantenimiento preventivo',
    items: [
      'Revisión periódica de equipos.',
      'Actualizaciones y verificaciones acordadas.',
      'Recomendaciones para reducir incidentes.',
      'Registro de tareas realizadas.',
    ],
  },
] as const;

export const solutions = [
  {
    title: 'Pequeñas empresas',
    text: 'Asistencia IT flexible y acompañamiento tecnológico sin necesidad de contar con un departamento IT propio.',
  },
  {
    title: 'Medianas empresas',
    text: 'Soporte a usuarios, seguimiento de incidentes y mantenimiento coordinado.',
  },
  {
    title: 'Grandes empresas',
    text: 'Apoyo operativo, soporte especializado por alcance, coordinación y escalamiento con equipos internos y proveedores.',
  },
] as const;

export const workSteps = [
  {
    title: 'Relevamiento',
    text: 'Conocer la organización, usuarios, infraestructura y necesidades.',
  },
  {
    title: 'Propuesta',
    text: 'Definir alcance, prioridades, modalidad y condiciones del servicio.',
  },
  {
    title: 'Puesta en marcha',
    text: 'Acordar canales de contacto, responsables y procedimientos.',
  },
  {
    title: 'Atención y seguimiento',
    text: 'Gestionar solicitudes e incidentes según el alcance contratado.',
  },
  {
    title: 'Revisión',
    text: 'Evaluar necesidades y oportunidades de mejora.',
  },
] as const;

export const about = {
  text: 'En GUSTECH IT Solutions trabajamos para acercar soluciones tecnológicas prácticas a las empresas. Nuestro enfoque combina soporte a usuarios, acompañamiento en infraestructura y coordinación operativa, con una atención clara, ordenada y orientada a las necesidades de cada organización.',
} as const;

// Situaciones frecuentes en empresas. Cada respuesta se apoya en los servicios descritos
// arriba: no agregar capacidades que no estén confirmadas.
export const problems = [
  {
    title: 'Las computadoras o los programas fallan y nadie los atiende',
    text: 'Asistencia remota a usuarios, diagnóstico de incidentes y seguimiento de cada solicitud hasta su resolución.',
  },
  {
    title: 'La red o internet se cae y el trabajo se frena',
    text: 'Revisión de redes y conectividad, y coordinación con los proveedores cuando el origen del problema está fuera de la empresa.',
  },
  {
    title: 'La empresa no tiene un responsable de IT',
    text: 'Acompañamiento tecnológico flexible, sin necesidad de armar un departamento propio.',
  },
  {
    title: 'Los equipos y las cuentas están desordenados o poco protegidos',
    text: 'Documentación de activos tecnológicos, revisión de accesos y permisos, y orientación para proteger equipos y cuentas.',
  },
  {
    title: 'Los mismos problemas se repiten una y otra vez',
    text: 'Mantenimiento preventivo, recomendaciones para reducir incidentes y registro de las tareas realizadas.',
  },
  {
    title: 'Una aplicación o un proveedor falla y no se sabe a quién reclamar',
    text: 'Análisis inicial, clasificación del incidente y coordinación con equipos o proveedores hasta su derivación o resolución.',
  },
] as const;

export const faq = [
  {
    q: '¿El soporte es remoto o presencial?',
    a: 'Brindamos soporte remoto y asistencia presencial previamente acordada, según la ubicación y la disponibilidad.',
  },
  {
    q: '¿Cómo se contratan los servicios?',
    a: 'Trabajamos por abono mensual o con servicios puntuales, según lo que necesite cada empresa. Siempre se define después de un relevamiento y una propuesta.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'No publicamos precios cerrados porque dependen del alcance: cantidad de usuarios, equipos y servicios. Escribinos contando tu necesidad y te preparamos una propuesta.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Escribinos por correo con una breve descripción de tu empresa y de lo que necesitás. A partir de ahí coordinamos un relevamiento para conocer tus usuarios, tu infraestructura y tus prioridades.',
  },
  {
    q: '¿Trabajan con empresas de cualquier tamaño?',
    a: 'Sí. Adaptamos el alcance a pequeñas, medianas y grandes empresas, desde asistencia flexible hasta apoyo operativo con escalamiento a equipos internos y proveedores.',
  },
  {
    q: '¿Qué pasa si el problema es de una aplicación o de un proveedor externo?',
    a: 'Hacemos un análisis inicial, clasificamos el incidente y coordinamos con los equipos o proveedores correspondientes, según el alcance contratado.',
  },
] as const;

export const contact = {
  subject: 'Consulta desde gustech.com.ar',
  body: 'Hola, quiero consultar sobre servicios IT para mi empresa.\n\nEmpresa:\nCantidad aproximada de usuarios o equipos:\nNecesidad:\n',
} as const;
