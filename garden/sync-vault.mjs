import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const source = process.env.GARDEN_SOURCE;
if (!source) throw new Error('Set GARDEN_SOURCE to your designated public Obsidian folder.');
const root = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(root, 'content');
if (!fs.existsSync(source)) throw new Error(`Publishing folder not found: ${source}`);
const sourcePath = fs.realpathSync(source);
const sourceRelative = path.relative(target, sourcePath);
const targetRelative = path.relative(sourcePath, target);
if (!sourceRelative || !targetRelative || (!sourceRelative.startsWith('..') && !path.isAbsolute(sourceRelative)) || (!targetRelative.startsWith('..') && !path.isAbsolute(targetRelative))) {
  throw new Error('The public source folder and generated content directory must not overlap.');
}
const allowed = new Set(['.md','.png','.jpg','.jpeg','.webp','.gif','.svg','.pdf','.mp3','.mp4','.webm']);
const files = [];
function scan(dir, relative='') {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if (entry.name.startsWith('.')) continue;
    const rel = path.join(relative,entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not published: ${rel}`);
    if (entry.isDirectory()) scan(path.join(dir,entry.name),rel);
    else if (allowed.has(path.extname(entry.name).toLowerCase())) files.push(rel);
  }
}
scan(source);
if (!files.includes('index.md')) throw new Error('Publishing folder must contain index.md');
// This directory contains only generated copies of the dedicated public folder.
fs.rmSync(target,{recursive:true,force:true});
for(const rel of files) {
  const dest=path.join(target,rel);
  fs.mkdirSync(path.dirname(dest),{recursive:true});
  fs.copyFileSync(path.join(source,rel),dest);
}
console.log(`Copied ${files.length} public files from ${source}. Review git diff before pushing.`);
