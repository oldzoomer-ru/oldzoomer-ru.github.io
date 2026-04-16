import fs from 'node:fs';
import path from 'node:path';

const DOMAIN = 'https://oldzoomer.ru';
const OUT_DIR = path.join(process.cwd(), 'build/client');

// Опишите ваши роуты здесь
const routes: string[] = [
  '/',
];

function generateSitemap(urls: string[]) {
  const lastmod = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://sitemaps.org">
${urls.map(url => `  <url>
    <loc>${DOMAIN}${url === '/' ? '' : url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
  return xml;
}

function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;
}

// Выполнение
try {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), generateSitemap(routes));
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), generateRobots());

  console.log('[SEO] sitemap.xml and robots.txt generated!');
} catch (e) {
  console.error('[SEO] Error generating files:', e);
  process.exit(1);
}
