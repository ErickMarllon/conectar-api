/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const pathDir = path.resolve(
  __dirname,
  '..',
  'src',
  'infrastructure',
  'database',
  'migrations',
);
const pathFile = path.resolve(pathDir, 'index.ts');
const migrationsFiles = fs
  .readdirSync(pathDir)
  .filter((f) => f !== 'index.ts')
  .map((f) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [name, _] = f.split('.');
    return `export * from './${name}';\n`;
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
console.log('Migration criado com sucesso!');
