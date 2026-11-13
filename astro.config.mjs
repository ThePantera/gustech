// @ts-check
import { defineConfig } from 'astro/config';

// Sitio estático. La URL canónica se usa para metadatos y sitemap.
export default defineConfig({
  site: 'https://gustech.com.ar',
  // El CSS total pesa pocos KB: se incluye en el HTML para evitar una petición que bloquea el render.
  build: { inlineStylesheets: 'always' },
});
