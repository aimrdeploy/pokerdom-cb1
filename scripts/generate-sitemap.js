#!/usr/bin/env node
/**
 * Recursively discovers every HTML file in the project and regenerates sitemap.xml.
 * Run on every build with: npm run build
 *
 * Set SITE_URL to the public site root (must end without a slash).
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'sitemap.xml');
const SITE_URL = (process.env.SITE_URL || 'https://YOUR-USERNAME.github.io/YOUR-REPOSITORY')
  .replace(/\/+$/, '');

const EXCLUDED_DIRS = new Set([
  '.git', 'node_modules', '.github', 'dist', 'vendor'
]);

function walk(directory, found = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.well-known') continue;
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) walk(path.join(directory, entry.name), found);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      found.push(path.relative(ROOT, path.join(directory, entry.name)).split(path.sep).join('/'));
    }
  }
  return found;
}

function xmlEscape(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const htmlFiles = walk(ROOT).sort();
const urls = htmlFiles.map(file => {
  const suffix = file === 'index.html' ? '/' : `/${file}`;
  return `  <url>\n    <loc>${xmlEscape(SITE_URL + suffix)}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urls.join('\n')}\n</urlset>\n`;

fs.writeFileSync(OUTPUT, xml, 'utf8');
console.log(`Sitemap generated: ${htmlFiles.length} HTML page(s) -> ${path.relative(ROOT, OUTPUT)}`);
