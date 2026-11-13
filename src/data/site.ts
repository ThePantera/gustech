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

export const contact = {
  subject: 'Consulta desde gustech.com.ar',
  body: 'Hola, quiero consultar sobre servicios IT para mi empresa.\n\nEmpresa:\nCantidad aproximada de usuarios o equipos:\nNecesidad:\n',
} as const;
