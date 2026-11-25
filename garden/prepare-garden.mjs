import fs from 'node:fs';
let config = fs.readFileSync('quartz.config.default.yaml', 'utf8')
  .replace('pageTitle: Quartz 5', 'pageTitle: Proudfeather Fieldnotes')
  .replace('analytics:\n    provider: plausible', 'analytics: null')
  .replace('baseUrl: quartz.jzhao.xyz', 'baseUrl: localhost:8080')
  .replace('"#faf8f8"', '"#f7fafc"')
  .replace('"#284b63"', '"#225b79"')
  .replace('"#84a59d"', '"#647c51"')
  .replace('"#161618"', '"#101b24"')
  .replace('"#7b97aa"', '"#8fcbe5"')
  .replace('        GitHub: https://github.com/jackyzha0/quartz\n        Discord Community: https://discord.gg/cRFFHYye7t', '        About: /about\n        Support: /support');
fs.writeFileSync('quartz.config.yaml', config);
const pages = {
  'index.md': `---\ntitle: Proudfeather Fieldnotes\ndescription: A digital garden by Kestrel Proudfeather.\n---\n\n*Notes from Kestrel Proudfeather.*\n\nA place for ideas to take shape: working notes, connected questions, and longer essays that grow with time.\n\n## Explore\n\n- [[notes/index|The garden]] — ideas in progress and connections worth following.\n- [[journal/index|The journal]] — longer entries and finished thoughts.\n- [[about|About this place]] — how to read a growing collection of notes.\n\n## A living notebook\n\nSome pages will be seedlings; others will have had time to develop. Follow the links, wander between topics, and return as the notes change.\n\n[[support|Support the writing]]\n`,
  'about.md': `---\ntitle: About\n---\n\n# Kestrel Proudfeather\n\nProudfeather Fieldnotes is a digital garden: a collection of notes and essays that can be revisited, connected, and refined.\n\nThe [[notes/index|garden]] holds developing ideas. The [[journal/index|journal]] gives longer pieces a home.\n\nThis site is just beginning. More fieldnotes are on their way.\n`,
  'support.md': `---\ntitle: Support the writing\n---\n\nIf a note helped you, sharing it with someone else is appreciated.\n\nOptional cryptocurrency tips will be available here once the receiving details are verified. There is no payment required to read the garden.\n`,
  'notes/index.md': `---\ntitle: The garden\n---\n\nIdeas in progress, questions worth keeping, and notes that connect to one another.\n\nThe first notes are being prepared. Start at [[index|Proudfeather Fieldnotes]] or visit [[journal/index|the journal]].\n`,
  'journal/index.md': `---\ntitle: The journal\n---\n\nLonger entries from Kestrel Proudfeather.\n\nThe first entry is still taking shape. Meanwhile, explore [[notes/index|the garden]].\n`
};
for (const [file, body] of Object.entries(pages)) {
  fs.mkdirSync(`content/${file.split('/').slice(0,-1).join('/')}`, {recursive:true});
  fs.writeFileSync(`content/${file}`, body);
}
