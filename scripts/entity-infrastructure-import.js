/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const pathDir = path.resolve(
  __dirname,
  '..',
  'src',
  'infrastructure',
  'database',
  'pgsql',
  'entities',
);
const pathFile = path.resolve(pathDir, 'index.ts');
const migrationsFiles = fs
  .readdirSync(pathDir)
  .filter((f) => f !== 'index.ts')
  .map((f) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parse = f.split('.ts');
    const [name, _] = parse;
    return name.includes('entity') ? `export * from './${name}';\n` : null;
  });
if (fs.existsSync(pathFile)) {
  fs.unlinkSync(pathFile);
}
const data = migrationsFiles.toString().replace(/,/gm, '');
fs.writeFile(pathFile, data, { flag: 'wx' }, (err) => {
  if (err !== null) {
    console.log(err);
  }
});
console.log('Entity importado com sucesso!');
