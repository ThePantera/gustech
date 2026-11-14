# GUSTECH IT Solutions

Sitio web institucional de **GUSTECH IT Solutions** (`gustech.com.ar`): soporte y soluciones IT para particulares, profesionales, comercios y empresas de Argentina.

Es un sitio estático hecho con [Astro](https://astro.build). Sin base de datos, sin backend y sin servicios de terceros en el navegador.

La especificación completa está en [GUSTECH_ESPECIFICACION_TECNICA.md](GUSTECH_ESPECIFICACION_TECNICA.md).

## Requisitos

- Node.js 22.23.4 o superior (la versión está fijada en `.node-version`).

## Comandos

| Comando           | Qué hace                                         |
| ----------------- | ------------------------------------------------ |
| `npm install`     | Instala las dependencias.                        |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:4321`. |
| `npm run build`   | Genera el sitio de producción en `dist/`.        |
| `npm run preview` | Sirve `dist/` localmente para revisarlo.         |

## Estructura

```text
├── public/                  favicon, robots.txt y sitemap.xml
├── src/
│   ├── components/          Header, Hero, Services, Solutions, Process, Coverage, About, ContactSection, Footer, Logo
│   ├── data/site.ts         textos, correo, navegación y servicios (un solo lugar para editarlos)
│   ├── layouts/             BaseLayout: SEO, favicon, header y footer
│   ├── pages/               index.astro y 404.astro
│   └── styles/global.css    paleta y estilos globales (variables CSS)
├── wrangler.jsonc           configuración de despliegue en Cloudflare
└── astro.config.mjs
```

## Animaciones e interacciones

El sitio tiene movimiento sutil, pensado como mejora progresiva (sin JavaScript todo se ve igual):

- **Hero:** red animada (anillos, nodos y "paquetes de datos"), solo con CSS en `src/components/Hero.astro`.
- **Al hacer scroll:** los bloques aparecen en cascada, la línea del proceso se dibuja, el header proyecta sombra, hay una barra de progreso, el menú marca la sección activa y aparece un botón "volver arriba". Todo está en `src/scripts/dynamic.ts` (sin librerías).
- **Efectos al pasar el mouse** en tarjetas y botones, en `src/styles/global.css`.
- **Accesibilidad:** todo el movimiento está dentro de `prefers-reduced-motion: no-preference`. Quien pidió reducir el movimiento ve el sitio estático. Solo se animan `transform` y `opacity`.

## Despliegue en Cloudflare

El sitio se publica como sitio estático en Cloudflare:

- **Comando de build:** `npm run build`
- **Comando de deploy:** `npx wrangler deploy` (usa `wrangler.jsonc`, que sirve el directorio `dist`)

El dominio `gustech.com.ar` está conectado como dominio personalizado del Worker `gustech` (Cloudflare crea y administra su registro DNS).

**Analítica:** el sitio usa Cloudflare Web Analytics, que Cloudflare agrega en el dominio propio. No usa cookies ni recolecta datos personales. La política de seguridad (`public/_headers`) permite solo su script y su destino de envío.

**Correo:** el correo corporativo funciona con Zoho. No eliminar, reemplazar ni modificar los registros MX, SPF, DKIM, DMARC ni TXT de Zoho al cambiar la configuración del sitio.

## Formulario de contacto

El sitio sigue siendo estático, pero `wrangler.jsonc` suma un Worker (`src/worker/`) que atiende solo `POST /api/contacto` (`assets.run_worker_first: ["/api/*"]`). Valida los datos en el servidor, verifica Cloudflare Turnstile, descarta spam con un campo trampa (honeypot) y manda el mensaje a `contacto@gustech.com.ar` por la API de **Resend**, desde un subdominio dedicado (`envio.gustech.com.ar`). Así no se toca ningún registro MX/SPF/DKIM/DMARC/TXT de Zoho ni se activa Email Routing. Si el envío falla, la persona ve el correo y el botón de WhatsApp.

- **Formulario:** `src/components/ContactForm.astro` (funciona sin JS como formulario normal, pero la verificación anti-robots requiere JS: sin JS se muestra el correo y WhatsApp). Solo nombre, un medio de contacto (correo o teléfono) y "qué necesitás" son obligatorios.
- **Clave pública de Turnstile:** variable de build `PUBLIC_TURNSTILE_SITE_KEY` (en Cloudflare, variables del build). Sin ella se usa la clave de prueba de Cloudflare, que siempre aprueba.
- **Secretos (nunca en el repo):** `npx wrangler secret put TURNSTILE_SECRET` y `npx wrangler secret put RESEND_API_KEY`. Variables no secretas (`MAIL_TO`, `MAIL_FROM`, `SITE_ORIGIN`) en `wrangler.jsonc`.
- **Probar en local:** crear `.dev.vars` (ignorado por git) con `TURNSTILE_SECRET=1x0000000000000000000000000000000AA` y `RESEND_API_KEY=...`; luego `npm run dev:worker` (hace build y corre `wrangler dev`). Con la clave de prueba de Turnstile (`1x00000000000000000000AA`) el widget siempre pasa.
- **Resend:** verificar el dominio `envio.gustech.com.ar` (solo agrega registros DNS en ese subdominio) y crear una API key con permiso solo de envío.

### CSP sin `unsafe-inline` en scripts

`public/_headers` tiene el marcador `__SCRIPT_HASHES__` en `script-src`. Después de cada `npm run build`, el script `postbuild` (`node scripts/csp-hashes.mjs`) lee `dist/*.html`, calcula el sha256 de cada script inline y reemplaza el marcador en `dist/_headers`. Se recalcula en cada build; no hay que mantener hashes a mano. No quitar el marcador de `public/_headers`.

## Contenido y SEO

- **Un solo lugar para editar:** `src/data/site.ts` (textos, WhatsApp, cobertura, FAQ). El enlace de WhatsApp se arma con `whatsappUrl()`; al tener la línea dedicada, cambiar solo `site.whatsapp.display` y `site.whatsapp.number`.
- **Cobertura:** presencial en CABA y AMBA, remoto en todo el país. No se menciona mercado internacional.
- **Precios:** no se publican montos. Se comunica que la consulta inicial es gratuita y que el valor se acuerda antes de empezar.
- **Datos estructurados (JSON-LD):** `BaseLayout.astro` genera `ProfessionalService`, `WebSite` y `FAQPage` desde `site.ts`. Sin dirección ni horarios (no confirmados).
- **Sitemap:** `public/sitemap.xml` es estático; actualizar `lastmod` cuando cambie el contenido.
- **Imagen para compartir:** `public/og-image.png` (1200x630) tiene texto dentro; si cambia el mensaje, regenerarla.

## Contenido pendiente de definir

- Texto de "Nosotros": el propietario pasará los datos reales (ver el TODO en `src/data/site.ts`).
- Línea de WhatsApp dedicada (hoy se usa el 11 2388-4030).

- Logotipo definitivo: el actual es un **prototipo** (`public/logo-g.webp`, usado en `src/components/Logo.astro`). Al reemplazarlo, actualizar también `public/favicon.png`, `public/apple-touch-icon.png` y `public/og-image.png`.
- Razón social y CUIT: no se publican por ahora (se están gestionando con ARCA). Agregarlos al footer cuando estén disponibles.

Ya definidos por el propietario: el tagline y los servicios del lanzamiento (ver `src/data/site.ts`).
