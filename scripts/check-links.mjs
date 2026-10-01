import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const root = 'dist';
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(root);

const resolveLocal = (raw, pageDir) => {
  if (!raw || /^(https?:|mailto:|tel:|data:|#)/i.test(raw)) return null;
  const clean = raw.replace(/[?#].*$/, '');
  if (clean.startsWith('/')) {
    const p = join(root, decodeURIComponent(clean));
    return existsSync(p) || existsSync(p + '.html') || existsSync(join(p, 'index.html'))
      ? null
      : clean;
  }
  const p = join(pageDir, decodeURIComponent(clean));
  return existsSync(p) ? null : `${clean}  (相对 ${pageDir})`;
};

const broken = [];
const seen = new Set();
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const pageDir = dirname(file);
  const refs = [
    ...html.matchAll(/(?:href|src)="([^"]+)"/g),
    ...html.matchAll(/url\((['"]?)([^'")]+)\1\)/g).map((m) => [m[0], m[2]]),
  ];
  for (const [, raw] of refs) {
    const key = `${pageDir}|${raw}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const miss = resolveLocal(raw, pageDir);
    if (miss) broken.push(`${file}: ${miss}`);
  }
}

console.log(`扫描 ${files.length} 个产物文件，${seen.size} 条引用`);
console.log(broken.length ? `断链 ${broken.length} 条:\n` + broken.join('\n') : '本地引用全部可解析');
