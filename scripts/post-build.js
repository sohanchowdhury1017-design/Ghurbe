import fs from 'fs';
import path from 'path';

const routes = [
  'about',
  'SAMSUL-ARAFIN',
  'mahim-ibn-khudi',
  'md-rifat-islam',
  'sidra-islam',
  'packages',
  'blog',
  'kuakata-travel-guide',
  'Kuakata',
  'contact',
  'gallery',
  'why-us',
  'stats',
];

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  for (const route of routes) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
  }
  console.log(`Generated compiled static entry points for ${routes.length} routes in dist/`);
}
