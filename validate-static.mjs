import fs from 'node:fs';
import path from 'node:path';
const pages = fs.readdirSync('dist').filter(name => name.endsWith('.html'));
const missing = [];
for (const page of pages) {
  const html = fs.readFileSync(path.join('dist', page), 'utf8');
  for (const [, reference] of html.matchAll(/(?:src|href)="(\.\/[^\"]+)"/g)) {
    const file = reference.split('#')[0];
    if (!fs.existsSync(path.join('dist', file))) missing.push({page, file});
  }
}
console.log(JSON.stringify({pages:pages.length,missing}));
if(missing.length) process.exit(1);
