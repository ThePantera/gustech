# GUSTECH IT Solutions — Especificación técnica y guía de implementación

**Documento para Claude Code**  
**Proyecto:** sitio web corporativo de GUSTECH IT Solutions  
**Dominio:** `gustech.com.ar`  
**Idioma principal:** español de Argentina (`es-AR`)  
**Estado:** especificación inicial — implementar por etapas y validar antes de publicar.

---

## 1. Rol que debe asumir Claude

Actuá como **ingeniero de software senior, arquitecto frontend, diseñador UX/UI y responsable técnico de calidad** del proyecto GUSTECH IT Solutions.

No te limites a generar código: analizá el repositorio, proponé una arquitectura simple y mantenible, implementá por etapas, verificá cada cambio y explicá las decisiones técnicas en lenguaje claro.

### Reglas de trabajo obligatorias

1. Antes de modificar archivos, inspeccioná el repositorio y explicá brevemente qué encontraste.
2. Si el repositorio está vacío o solo tiene un README, proponé la estructura inicial.
3. No borres, sobrescribas ni reorganices archivos existentes sin explicar el motivo y pedir autorización cuando pueda perderse trabajo.
4. No inventes información comercial, clientes, certificaciones, años de experiencia, alianzas, direcciones, teléfonos, precios ni testimonios.
5. No publiques el sitio ni cambies DNS sin autorización explícita del propietario.
6. No incluyas contraseñas, tokens, claves API ni datos personales en el código o en GitHub.
7. No agregues dependencias innecesarias ni servicios pagos sin justificarlo y pedir aprobación.
8. Trabajá en entregas pequeñas. Después de cada etapa, indicá archivos modificados, pruebas realizadas, resultado y próximo paso.
9. Si falta un dato que afecta una decisión importante, preguntá antes de asumirlo. Para detalles menores, elegí una opción segura y documentala.
10. No afirmes que una función funciona si no fue probada.

---

## 2. Contexto del negocio

GUSTECH IT Solutions es una marca en desarrollo orientada a brindar servicios de tecnología y soporte IT a empresas de Argentina.

### Posicionamiento

- **Nombre comercial:** GUSTECH IT Solutions.
- **Dominio:** `gustech.com.ar`.
- **Correo corporativo inicial:** `contacto@gustech.com.ar`.
- **Mercado:** Argentina.
- **Cobertura:** soporte remoto a nivel nacional y asistencia presencial coordinada según disponibilidad y ubicación.
- **Clientes objetivo:** pequeñas, medianas y grandes empresas.
- **Modelo comercial previsto:** abonos mensuales y servicios acordados según necesidad.
- **Operación:** posibilidad de trabajar con técnicos asociados/partners, coordinados por GUSTECH.

### Mensaje de marca

Concepto principal: tecnología confiable, soporte profesional y continuidad operativa para empresas.

Tagline tentativo:
**“La tecnología de tu empresa, en buenas manos.”**

Alternativa:
**“Tu tecnología, siempre en funcionamiento.”**

Usar el primer tagline como propuesta inicial, pero mantenerlo fácil de cambiar desde un único lugar del proyecto.

### Importante: límites de las promesas comerciales

No afirmar que GUSTECH ofrece actualmente:
- Atención 24/7.
- SLA garantizados o tiempos de resolución específicos.
- Centros de operaciones propios.
- Cobertura presencial inmediata en todo el país.
- Certificaciones, homologaciones o partners oficiales.
- Un equipo de empleados de determinada cantidad.
- Clientes reconocidos, casos de éxito o testimonios.

Se puede describir la modalidad como **servicios coordinados, soporte remoto y asistencia presencial previamente acordada**, sin prometer capacidades que todavía no fueron confirmadas.

---

## 3. Objetivo del sitio

Crear una web corporativa que transmita confianza y profesionalismo, explique claramente los servicios de GUSTECH y permita que una empresa solicite información o contacto.

La primera versión será un **sitio institucional estático**, rápido, seguro, responsive y fácil de mantener.

### Objetivos principales

1. Presentar la marca GUSTECH IT Solutions.
2. Explicar qué problemas tecnológicos puede ayudar a resolver.
3. Mostrar los servicios de manera ordenada.
4. Explicar cómo se trabaja y cómo se coordina la asistencia.
5. Generar consultas comerciales por correo electrónico.
6. Estar preparado para crecer con nuevas secciones y servicios.

### Fuera del alcance de la primera versión

No desarrollar todavía:
- Portal privado de clientes.
- Inicio de sesión o registro de usuarios.
- Sistema de tickets propio.
- Panel de monitoreo.
- Gestión de técnicos o partners.
- Pagos, suscripciones o facturación.
- Base de datos de clientes.
- Chat en vivo.
- Integraciones con herramientas internas.

La arquitectura debe permitir incorporar estos módulos en el futuro sin construirlos ahora.

---

## 4. Identidad visual y dirección de diseño

### Paleta de colores

Usar variables CSS centralizadas:

| Uso | Color | Hex |
|---|---|---|
| Azul marino principal | Navy | `#101C32` |
| Azul eléctrico | Primary blue | `#2563EB` |
| Cian de acento | Cyan | `#06B6D4` |
| Blanco suave | Background | `#F8FAFC` |
| Texto principal | Slate dark | `#172033` |
| Texto secundario | Slate | `#64748B` |
| Bordes | Light slate | `#E2E8F0` |

Se pueden ajustar tonos por contraste y accesibilidad, pero conservar la identidad azul marino, azul eléctrico, cian y blanco.

### Estilo

- Corporativo, moderno, tecnológico y sobrio.
- Apariencia profesional, no de plantilla genérica.
- Espacios amplios y jerarquía visual clara.
- Tipografía legible y consistente.
- Iconografía simple y coherente.
- Animaciones sutiles, nunca indispensables para entender el contenido.
- Evitar exceso de gradientes, brillos, efectos de cristal y elementos decorativos.
- Evitar imágenes de stock que parezcan representar oficinas, técnicos o clientes reales de GUSTECH.
- Priorizar ilustraciones abstractas de infraestructura, redes, conectividad y tecnología cuando agreguen valor.
- El diseño debe verse excelente tanto en desktop como en móvil.

### Logotipo

Si todavía no existe un logotipo oficial, crear una **propuesta tipográfica provisional** con el texto GUSTECH y un símbolo geométrico simple. No presentarla como marca registrada ni inventar un logo oficial existente. Mantener el logo en un componente o archivo fácil de reemplazar.

---

## 5. Estructura del sitio y contenido

Crear una web de una sola página con navegación por secciones, salvo que el análisis técnico justifique páginas separadas. La navegación debe ser clara y permitir ampliar el sitio en el futuro.

### 5.1 Header / navegación

- Logo GUSTECH IT Solutions.
- Enlaces: Inicio, Servicios, Soluciones, Cómo trabajamos, Nosotros y Contacto.
- CTA destacado: **Solicitar asesoramiento**.
- Header responsive con menú móvil accesible.
- Al desplazarse, puede mantenerse fijo si no perjudica la experiencia.

### 5.2 Hero / Inicio

Propuesta de contenido:

**Título:**  
“Soluciones IT para que tu empresa siga avanzando.”

**Descripción:**  
“Brindamos soporte tecnológico, asistencia a usuarios y acompañamiento en infraestructura IT para ayudar a las empresas a trabajar de forma más segura, ordenada y eficiente.”

**CTA principal:** “Solicitar asesoramiento”  
**CTA secundario:** “Conocer nuestros servicios”

Agregar una composición visual tecnológica sobria que sugiera conectividad, infraestructura y continuidad operativa. No utilizar dashboards ficticios con métricas presentadas como datos reales.

### 5.3 Servicios IT

Presentar tarjetas o bloques para los siguientes servicios. Describirlos como áreas de servicio ofrecidas o planificadas, sin prometer cobertura o capacidades no confirmadas.

1. **Soporte técnico IT**
   - Asistencia remota a usuarios.
   - Diagnóstico y resolución de incidentes de hardware, software y conectividad.
   - Gestión y seguimiento de solicitudes.
   - Escalamiento y coordinación con proveedores cuando corresponda.

2. **Infraestructura IT**
   - Acompañamiento en la administración y mantenimiento de infraestructura.
   - Puestos de trabajo, equipos y periféricos.
   - Redes y conectividad.
   - Documentación y organización de activos tecnológicos.

3. **Monitoreo y operaciones**
   - Seguimiento de indicadores y disponibilidad de servicios, según herramientas y alcance contratado.
   - Detección y comunicación de eventos.
   - Coordinación de incidentes y escalamiento.
   - Reportes operativos acordados.

4. **Soporte de aplicaciones**
   - Atención de incidentes reportados por usuarios.
   - Análisis inicial y clasificación.
   - Coordinación con equipos funcionales o proveedores.
   - Seguimiento hasta su derivación o resolución.

5. **Cloud y seguridad**
   - Acompañamiento en servicios cloud y buenas prácticas.
   - Revisión de accesos y permisos.
   - Orientación sobre protección de equipos y cuentas.
   - Alcance sujeto a evaluación y propuesta técnica.

6. **Mantenimiento preventivo**
   - Revisión periódica de equipos.
   - Actualizaciones y verificaciones acordadas.
   - Recomendaciones para reducir incidentes.
   - Registro de tareas realizadas.

No afirmar que todos los servicios están operativos desde el primer día. Si es necesario, etiquetar internamente los servicios que requieren validación antes de publicarse.

### 5.4 Soluciones para empresas

Mostrar que la propuesta puede adaptarse a organizaciones de diferentes tamaños:

- **Pequeñas empresas:** asistencia IT flexible y acompañamiento tecnológico sin necesidad de contar con un departamento IT propio.
- **Medianas empresas:** soporte a usuarios, seguimiento de incidentes y mantenimiento coordinado.
- **Grandes empresas:** apoyo operativo, soporte especializado por alcance, coordinación y escalamiento con equipos internos y proveedores.

No publicar precios ni paquetes cerrados todavía. Se pueden mencionar modalidades de servicio por abono mensual o servicios puntuales, sujetos a relevamiento y propuesta.

### 5.5 Cómo trabajamos

Explicar un proceso sencillo de cinco pasos:

1. **Relevamiento:** conocer la organización, usuarios, infraestructura y necesidades.
2. **Propuesta:** definir alcance, prioridades, modalidad y condiciones del servicio.
3. **Puesta en marcha:** acordar canales de contacto, responsables y procedimientos.
4. **Atención y seguimiento:** gestionar solicitudes e incidentes según el alcance contratado.
5. **Revisión:** evaluar necesidades y oportunidades de mejora.

Aclarar que la asistencia presencial se coordina previamente según ubicación y disponibilidad.

### 5.6 Nosotros

Texto institucional propuesto:

“En GUSTECH IT Solutions trabajamos para acercar soluciones tecnológicas prácticas a las empresas. Nuestro enfoque combina soporte a usuarios, acompañamiento en infraestructura y coordinación operativa, con una atención clara, ordenada y orientada a las necesidades de cada organización.”

No inventar historia, cantidad de empleados, trayectoria corporativa, certificaciones ni sedes.

### 5.7 Contacto

- Correo visible: `contacto@gustech.com.ar`.
- CTA para enviar un correo.
- Formulario de contacto solo si se implementa un backend o proveedor real de formularios.
- No crear un formulario que simule enviar información sin que exista un servicio funcional.
- Si la primera versión no tiene backend, utilizar un botón `mailto:` con asunto y cuerpo precompletados, e informar claramente que abre el programa de correo del visitante.
- No inventar número de WhatsApp, dirección física ni redes sociales.
- Incluir una invitación a describir brevemente la necesidad de la empresa.

### 5.8 Footer

- GUSTECH IT Solutions.
- Enlaces internos.
- Correo de contacto.
- Aviso de privacidad si se recopilan datos.
- Año dinámico.
- No inventar domicilio legal ni CUIT.

---

## 6. Arquitectura y tecnologías

### Recomendación inicial

Antes de elegir herramientas, inspeccionar el repositorio. Para una web institucional estática, priorizar una solución liviana y sencilla.

Opción preferida:
- **Astro** para generar páginas estáticas, si el repositorio está vacío y no existe una restricción técnica.
- HTML semántico.
- CSS moderno con variables y componentes reutilizables.
- JavaScript mínimo, solo para interacciones necesarias.
- TypeScript si aporta seguridad sin complejidad innecesaria.
- GitHub para versionado.
- Cloudflare Pages para hosting y despliegue.

Si ya existe una aplicación configurada, evaluar si conviene continuar con esa tecnología en lugar de migrar.

### Requisitos técnicos

- Sitio estático y rápido.
- Diseño responsive mobile-first.
- Componentes reutilizables.
- Contenido separado de la presentación cuando sea práctico.
- Estructura simple y documentada.
- Sin base de datos en esta etapa.
- Sin secretos ni credenciales en el frontend.
- Dependencias actualizadas y justificadas.
- No introducir librerías grandes para resolver interacciones simples.

### Estructura orientativa

La estructura final depende del framework elegido, pero debe mantener una organización similar a:

```text
gustech-web/
├── public/
│   ├── favicon.svg
│   ├── images/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header
│   │   ├── Footer
│   │   ├── Hero
│   │   ├── ServiceCard
│   │   └── ContactSection
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   │   └── global.css
│   └── content/
├── README.md
├── package.json
└── configuración del framework
```

No es obligatorio copiar esta estructura literalmente. Adaptarla al framework y mantener consistencia.

---

## 7. SEO, accesibilidad y rendimiento

### SEO básico

- Título: `GUSTECH IT Solutions | Soporte y soluciones IT para empresas`.
- Meta description clara y natural.
- Un único H1 principal por página.
- Jerarquía correcta de H2 y H3.
- URLs canónicas con `https://gustech.com.ar/`.
- Open Graph para compartir el sitio.
- Favicon.
- `robots.txt`.
- Sitemap XML si corresponde al framework.
- Datos estructurados `Organization` solo con información real y confirmada.
- No agregar direcciones, teléfonos, perfiles sociales ni datos legales inventados.

### Accesibilidad

- HTML semántico.
- Contraste suficiente.
- Navegación por teclado.
- Estados de foco visibles.
- Etiquetas accesibles para controles.
- Texto alternativo útil en imágenes informativas.
- Respetar `prefers-reduced-motion`.
- Menú móvil operable con teclado y lector de pantalla.

### Rendimiento

- Evitar imágenes pesadas.
- Usar SVG para iconos y recursos simples.
- Optimizar imágenes y formatos.
- Cargar imágenes no críticas de forma diferida.
- Evitar scripts de terceros innecesarios.
- Buscar buenos resultados en Lighthouse para rendimiento, accesibilidad, buenas prácticas y SEO.

---

## 8. Seguridad y privacidad

- No recopilar información personal sin necesidad.
- No almacenar consultas en el navegador ni en repositorios.
- No enviar datos de formularios a servicios no configurados.
- No incluir secretos en variables públicas del frontend.
- Si se agrega un formulario real en una etapa posterior, definir protección contra spam, validación, tratamiento de datos y política de privacidad.
- No incorporar analytics o cookies de seguimiento sin decidirlo expresamente.
- Mantener dependencias y acciones de despliegue bajo revisión.
- No habilitar acceso administrativo ni paneles públicos.

---

## 9. GitHub y despliegue en Cloudflare Pages

### Flujo esperado

1. Desarrollar y probar localmente.
2. Versionar el código en el repositorio GitHub `gustech-web`.
3. Conectar el repositorio a Cloudflare Pages.
4. Configurar el comando de build y el directorio de salida según el framework.
5. Hacer un primer despliegue de prueba en el subdominio `*.pages.dev`.
6. Verificar el funcionamiento en desktop y móvil.
7. Asociar `gustech.com.ar` como dominio personalizado desde Cloudflare Pages.
8. Verificar que HTTPS funcione correctamente.
9. Confirmar que el correo `contacto@gustech.com.ar` siga funcionando después de cualquier cambio DNS.

### Precaución con DNS y correo

El dominio ya utiliza Cloudflare y el correo corporativo funciona con Zoho Mail.

**No eliminar, reemplazar ni modificar registros MX, SPF, DKIM, DMARC ni TXT relacionados con Zoho.** Para conectar la web, revisar únicamente los registros necesarios para el sitio y seguir el procedimiento de Cloudflare Pages. Si Cloudflare solicita un cambio que pueda afectar al correo, detenerse y explicar el impacto antes de realizarlo.

Claude no debe acceder a la cuenta de NIC Argentina, Cloudflare, Zoho ni GitHub mediante credenciales del usuario. El propietario realizará las acciones de autenticación desde su navegador.

---

## 10. Plan de implementación por etapas

### Etapa 0 — Auditoría

- Inspeccionar repositorio y archivos.
- Identificar framework y estado actual.
- Revisar README y configuración.
- Proponer plan de trabajo.
- No modificar archivos hasta presentar el diagnóstico.

**Criterio de aceptación:** diagnóstico claro y propuesta aprobada.

### Etapa 1 — Base técnica

- Crear o ajustar estructura.
- Configurar framework y scripts.
- Implementar estilos globales, colores y tipografía.
- Crear layout base, header y footer.

**Criterio de aceptación:** proyecto inicia localmente sin errores y tiene una base visual consistente.

### Etapa 2 — Diseño y contenido

- Construir Hero.
- Servicios IT.
- Soluciones para empresas.
- Cómo trabajamos.
- Nosotros.
- Contacto.
- Footer.

**Criterio de aceptación:** todas las secciones se visualizan correctamente y el contenido no contiene afirmaciones inventadas.

### Etapa 3 — Responsive y accesibilidad

- Revisar móviles, tablets y desktop.
- Corregir menú móvil.
- Verificar contraste, foco, teclado y etiquetas.
- Corregir desbordamientos y problemas de diseño.

**Criterio de aceptación:** navegación y contenido utilizables en pantallas pequeñas y grandes.

### Etapa 4 — SEO y optimización

- Metadatos.
- Favicon.
- Robots y sitemap.
- Optimización de recursos.
- Revisión Lighthouse.

**Criterio de aceptación:** metadatos correctos, sin errores críticos de accesibilidad o rendimiento.

### Etapa 5 — Pruebas y despliegue de prueba

- Ejecutar build de producción.
- Revisar consola y errores.
- Probar enlaces y correo.
- Publicar en `pages.dev` solo después de autorización.

**Criterio de aceptación:** build exitoso y sitio de prueba funcional.

### Etapa 6 — Dominio propio

- Conectar `gustech.com.ar`.
- Configurar redirección entre dominio raíz y `www` si se decide utilizar ambos.
- Verificar HTTPS.
- Confirmar que el correo Zoho continúa enviando y recibiendo.

**Criterio de aceptación:** sitio accesible por el dominio propio y correo operativo.

---

## 11. Checklist de calidad antes de publicar

- [ ] El nombre GUSTECH IT Solutions está escrito correctamente.
- [ ] El dominio es `gustech.com.ar`.
- [ ] El correo es `contacto@gustech.com.ar`.
- [ ] No hay teléfonos, direcciones ni redes sociales inventadas.
- [ ] No hay testimonios ni clientes ficticios.
- [ ] No se prometen servicios 24/7 ni SLA no aprobados.
- [ ] Los botones y enlaces funcionan.
- [ ] El enlace de correo abre el destinatario correcto.
- [ ] El menú móvil funciona.
- [ ] No hay desbordamientos horizontales.
- [ ] Se puede navegar con teclado.
- [ ] El sitio tiene título, descripción y favicon.
- [ ] El build de producción finaliza correctamente.
- [ ] No hay secretos en el repositorio.
- [ ] Los registros de correo de Zoho permanecen intactos.
- [ ] El propietario autorizó expresamente la publicación.

---

## 12. Primera instrucción para comenzar con Claude

**No desarrolles todavía. Primero auditá el repositorio.**

Usá este mensaje inicial:

> Leé íntegramente el documento `GUSTECH_ESPECIFICACION_TECNICA.md` y asumí el rol indicado.
>
> Primero inspeccioná el repositorio actual: estructura de carpetas, archivos, framework, dependencias, scripts y configuración de Git. No modifiques ni elimines nada todavía.
>
> Después entregame:
> 1. Diagnóstico del estado actual.
> 2. Tecnología que encontraste.
> 3. Arquitectura recomendada para este proyecto.
> 4. Estructura de archivos propuesta.
> 5. Plan de implementación por etapas.
> 6. Riesgos técnicos o decisiones que necesiten mi aprobación.
>
> Recordá que el sitio es para GUSTECH IT Solutions, una empresa en desarrollo en Argentina. No inventes datos comerciales ni prometas capacidades que no fueron confirmadas. La web debe ser profesional, moderna, responsive, rápida y publicable en Cloudflare Pages.
>
> Esperá mi aprobación antes de comenzar a modificar archivos.

---

## 13. Decisiones pendientes del propietario

No bloquear la primera maqueta por estas decisiones. Presentarlas cuando corresponda:

- Logotipo definitivo.
- Tagline definitivo.
- Número de WhatsApp comercial, si se desea publicar.
- Redes sociales oficiales.
- Dirección comercial, si corresponde.
- Servicios que estarán disponibles efectivamente en el lanzamiento.
- Alcance de soporte presencial y zonas de cobertura.
- Política de privacidad y datos legales.
- Si se incorporará un formulario real o se mantendrá el contacto por correo.
- Precios y condiciones de abonos, cuando estén definidos.

**Principio rector:** construir una presencia digital profesional y honesta, con una base técnica simple, segura y escalable. Primero una web institucional excelente; después, cuando el negocio lo requiera, incorporar portal de clientes, tickets, monitoreo y automatizaciones.
