// Datos centrales del sitio. Cambiar acá el tagline, el correo, los servicios o la
// navegación los actualiza en todo el proyecto.

export const site = {
  name: 'GUSTECH IT Solutions',
  shortName: 'GUSTECH',
  url: 'https://gustech.com.ar',
  email: 'contacto@gustech.com.ar',
  // Teléfono: contacto SECUNDARIO (el principal es el correo). Formato nacional.
  phone: { display: '11 2388-4030', href: 'tel:1123884030' },
  locale: 'es-AR',
  tagline: 'Hagamos que la tecnología de tu empresa funcione cuando más importa.',
  title: 'GUSTECH IT Solutions | Soporte y soluciones IT para empresas',
  description:
    'Soporte técnico, redes, copias de seguridad y automatización para empresas, comercios y profesionales de Argentina.',
} as const;

export const nav = [
  // Los enlaces parten de "/" para que también funcionen desde la página 404.
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Para quién', href: '/#soluciones' },
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
    'Brindamos soporte técnico, redes y conectividad, continuidad operativa y automatización para ayudar a empresas, comercios y profesionales a trabajar de forma más segura, ordenada y eficiente.',
  secondaryCta: { label: 'Conocer nuestros servicios', href: '#servicios' },
} as const;

// Servicios del lanzamiento, confirmados por el propietario.
export const services = [
  {
    icon: 'headset',
    title: 'Soporte técnico e infraestructura IT',
    items: [
      'Diagnóstico, reparación y mantenimiento preventivo y correctivo de PCs y notebooks.',
      'Instalación y configuración de sistemas operativos, software y licencias.',
      'Armado de equipos a medida y actualización de hardware (RAM, SSD, etc.).',
      'Soporte técnico remoto y presencial.',
    ],
  },
  {
    icon: 'wifi',
    title: 'Redes y conectividad',
    items: [
      'Configuración de routers, repetidores, redes Wi-Fi de alto alcance y cableado estructurado básico.',
      'Solución de caídas de red, cuellos de botella y optimización de señal en oficinas o locales.',
      'Configuración de impresoras y recursos compartidos en red.',
    ],
  },
  {
    icon: 'shield',
    title: 'Gestión operativa y continuidad',
    items: [
      'Implementación de copias de seguridad (backups locales y en la nube).',
      'Seguridad básica: limpieza de malware, configuración de antivirus y control de accesos.',
      'Abonos mensuales de mantenimiento preventivo para evitar paradas operativas.',
    ],
  },
  {
    icon: 'bolt',
    title: 'Automatización y digitalización básica',
    items: [
      'Configuración de herramientas de trabajo colaborativo (Google Workspace, Microsoft 365, correo corporativo).',
      'Automatización de tareas administrativas repetitivas e integración de flujos simples (formularios, planillas o bots básicos de atención).',
      'Asesoría en compra de equipamiento tecnológico.',
    ],
  },
] as const;

// Para quién trabajamos (según la tabla de servicios del propietario).
export const solutions = [
  {
    title: 'Particulares y profesionales independientes',
    text: 'Equipos que funcionan, redes del hogar o del estudio y soporte técnico remoto o presencial.',
  },
  {
    title: 'PyMEs y estudios sin área de sistemas',
    text: 'Un acompañamiento IT práctico, sin necesidad de armar un departamento propio.',
  },
  {
    title: 'Comercios, consultorios y oficinas pequeñas',
    text: 'Conectividad estable, impresoras y recursos compartidos, y datos respaldados para no frenar la atención.',
  },
  {
    title: 'Emprendedores',
    text: 'Ordenar la operación y ahorrar tiempo con herramientas colaborativas y automatización de tareas repetitivas.',
  },
] as const;

// Atención a demanda (por incidente): la puerta de entrada. Sin abonos obligatorios.
// No se publican aquí precios, recargos ni tiempos de respuesta: no están confirmados.
export const onDemand = {
  lead: 'Pedí una atención puntual cuando la necesitás. Si más adelante querés evitar los problemas antes de que aparezcan, podemos armar un abono mensual de mantenimiento preventivo.',
  levels: [
    {
      icon: 'headset',
      title: 'Soporte remoto',
      text: 'Resolvemos el problema a distancia, sin costo de traslado y, cuando es posible, en la misma sesión.',
      examples: [
        'PC lenta o fallas de Windows.',
        'Limpieza de virus y malware.',
        'Configuración de correos e impresoras en red.',
        'Instalación de programas.',
      ],
    },
    {
      icon: 'wrench',
      title: 'Visita técnica programada',
      text: 'Vamos hasta donde está el problema, o retiramos el equipo para revisarlo en taller. Se coordina previamente y se acuerda el valor antes de ir.',
      examples: [
        'Fallas de hardware o equipos que no encienden.',
        'Cambio de disco a SSD o ampliación de RAM.',
        'Problemas de Wi-Fi o de cableado.',
        'Retiro de equipos para llevarlos a taller.',
      ],
    },
    {
      icon: 'bolt',
      title: 'Urgencias',
      text: 'Para comercios, estudios u oficinas que no pueden operar. Atención prioritaria, también fuera de horario, según disponibilidad y con tarifa diferencial.',
      examples: [
        'Un comercio que no puede facturar.',
        'Una oficina o un estudio sin internet.',
        'Una PC o un servidor crítico caído.',
      ],
    },
  ],
} as const;

// Cómo es una atención, paso a paso.
export const workSteps = [
  {
    title: 'Nos contás el problema',
    text: 'Escribinos por correo con una descripción de lo que pasa. Una captura o una foto del error nos ayuda a entenderlo más rápido.',
  },
  {
    title: 'Definimos cómo resolverlo',
    text: 'Vemos si se puede resolver a distancia o si hace falta una visita, y te informamos el valor antes de empezar.',
  },
  {
    title: 'Lo resolvemos',
    text: 'Solucionamos el problema y, de paso, revisamos si tenés copia de seguridad o el disco al límite, para dejártelo anotado.',
  },
  {
    title: 'Cierre y seguimiento',
    text: 'Te enviamos un resumen de lo que se hizo y, si querés, te proponemos la próxima mejora o un abono de mantenimiento preventivo.',
  },
] as const;

export const about = {
  text: 'En GUSTECH IT Solutions trabajamos para acercar soluciones tecnológicas prácticas a empresas, comercios y profesionales. Nuestro enfoque combina soporte técnico, redes, continuidad operativa y automatización, con una atención clara, ordenada y orientada a las necesidades de cada cliente.',
} as const;

// Situaciones frecuentes. Cada respuesta se apoya en los servicios descritos arriba:
// no agregar capacidades que no estén confirmadas.
export const problems = [
  {
    title: 'La computadora falla, está lenta o necesita programas nuevos',
    text: 'Diagnóstico y reparación de PCs y notebooks, instalación de sistemas operativos y software, y mejoras de hardware como RAM o SSD.',
  },
  {
    title: 'El Wi-Fi se corta o no llega a todos lados',
    text: 'Configuración de routers y repetidores, redes Wi-Fi de alto alcance y optimización de la señal en oficinas, locales u hogares.',
  },
  {
    title: 'Me da miedo perder mis datos',
    text: 'Copias de seguridad locales y en la nube, para que un fallo no frene tu trabajo.',
  },
  {
    title: 'Mi equipo tiene virus o no está protegido',
    text: 'Limpieza de malware, configuración de antivirus y control de accesos.',
  },
  {
    title: 'Pierdo tiempo en tareas repetitivas',
    text: 'Herramientas de trabajo colaborativo, automatización de tareas administrativas y flujos simples con formularios, planillas o bots básicos.',
  },
  {
    title: 'No sé qué equipo comprar',
    text: 'Asesoría en la compra de equipamiento tecnológico, según lo que realmente necesitás.',
  },
] as const;

export const faq = [
  {
    q: '¿El soporte es remoto o presencial?',
    a: 'Brindamos soporte técnico remoto y presencial. La asistencia presencial se coordina previamente, según la ubicación y la disponibilidad.',
  },
  {
    q: '¿Atienden solo a empresas?',
    a: 'No. Trabajamos con particulares, profesionales independientes, estudios, comercios, consultorios, emprendedores y PyMEs.',
  },
  {
    q: '¿Cómo se contratan los servicios?',
    a: 'Podés pedir una atención puntual, como reparar un equipo o configurar una red, sin abonos obligatorios. Si querés prevención, también ofrecemos un abono mensual de mantenimiento preventivo.',
  },
  {
    q: '¿Qué pasa si tengo una urgencia?',
    a: 'Escribinos describiendo el problema. Para comercios, estudios y oficinas que no pueden operar ofrecemos atención prioritaria, también fuera de horario, según disponibilidad y con tarifa diferencial.',
  },
  {
    q: '¿Conviene reparar mi PC o comprar una nueva?',
    a: 'Depende del estado del equipo. Antes de comprar una nueva, consultanos: en muchos casos una optimización, más memoria RAM o un cambio de disco a SSD alcanza para que funcione mucho mejor.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'No publicamos precios cerrados porque dependen del trabajo a realizar. Escribinos contando tu necesidad y te pasamos una propuesta.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Escribinos por correo con una breve descripción de lo que necesitás. Con esa información coordinamos los próximos pasos.',
  },
  {
    q: '¿Hacen copias de seguridad y se ocupan de la seguridad básica?',
    a: 'Sí. Implementamos copias de seguridad locales y en la nube, y ayudamos con seguridad básica: limpieza de malware, antivirus y control de accesos.',
  },
] as const;

export const contact = {
  subject: 'Consulta desde gustech.com.ar',
  body: 'Hola, quiero consultar sobre sus servicios.\n\nNombre o empresa:\nQué necesito:\n',
} as const;
