// Recalcula los hashes sha256 de los scripts inline que Astro dejó en dist/*.html y los
// escribe en dist/_headers (reemplaza el marcador __SCRIPT_HASHES__ de public/_headers).
// Se ejecuta solo después de cada build (script npm "postbuild"). Así la CSP de script-src
// no necesita 'unsafe-inline'.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MARKER = '__SCRIPT_HASHES__';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

const hashes = new Set();
// <script ...>contenido</script> sin atributo src. Los bloques JSON (ld+json) no son código
// ejecutable y la CSP no los controla, así que se omiten.
const re = /<script((?:\s[^>]*)?)>([\s\S]*?)<\/script>/gi;
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(re)) {
    const attrs = m[1] ?? '';
    if (/\ssrc\s*=/.test(attrs) || /type\s*=\s*["']?application\/(ld\+)?json/i.test(attrs)) continue;
    if (!m[2].trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(m[2], 'utf8').digest('base64')}'`);
  }
}

const headersPath = join(dist, '_headers');
if (!existsSync(headersPath)) throw new Error('No existe dist/_headers: ¿corrió el build?');
const headers = readFileSync(headersPath, 'utf8');
if (!headers.includes(MARKER)) throw new Error(`public/_headers no contiene el marcador ${MARKER}`);
writeFileSync(headersPath, headers.replaceAll(MARKER, [...hashes].sort().join(' ')));
console.log(`CSP: ${hashes.size} hash(es) de scripts inline escritos en dist/_headers`);
