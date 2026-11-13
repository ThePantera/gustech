# GUSTECH IT Solutions

Sitio web institucional de **GUSTECH IT Solutions** (`gustech.com.ar`): soporte y soluciones IT para empresas de Argentina.

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
│   ├── components/          Header, Hero, Services, Solutions, Process, About, ContactSection, Footer, Logo
│   ├── data/site.ts         textos, correo, navegación y servicios (un solo lugar para editarlos)
│   ├── layouts/             BaseLayout: SEO, favicon, header y footer
│   ├── pages/               index.astro y 404.astro
│   └── styles/global.css    paleta y estilos globales (variables CSS)
├── wrangler.jsonc           configuración de despliegue en Cloudflare
└── astro.config.mjs
```

## Despliegue en Cloudflare

El sitio se publica como sitio estático en Cloudflare:

- **Comando de build:** `npm run build`
- **Comando de deploy:** `npx wrangler deploy` (usa `wrangler.jsonc`, que sirve el directorio `dist`)

El dominio `gustech.com.ar` está conectado como dominio personalizado del Worker `gustech` (Cloudflare crea y administra su registro DNS).

**Analítica:** el sitio usa Cloudflare Web Analytics, que Cloudflare agrega en el dominio propio. No usa cookies ni recolecta datos personales. La política de seguridad (`public/_headers`) permite solo su script y su destino de envío.

**Correo:** el correo corporativo funciona con Zoho. No eliminar, reemplazar ni modificar los registros MX, SPF, DKIM, DMARC ni TXT de Zoho al cambiar la configuración del sitio.

## Contenido pendiente de definir

- Logotipo definitivo (el actual es una propuesta tipográfica provisoria, en `src/components/Logo.astro`).
- Tagline definitivo (provisorio en `src/data/site.ts`).
- Servicios que estarán disponibles en el lanzamiento.
- Imagen para compartir el sitio en redes (Open Graph).
