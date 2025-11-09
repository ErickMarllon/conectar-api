/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const paths = [
  // domain
  'src/domain/contracts/pgsql/entities',
  'src/domain/contracts/pgsql/repositories',
  'src/domain/errors',
  'src/domain/usecase/pgsql/tenant',
  'src/domain/usecase/pgsql/user',
  'src/domain/usecase/pgsql/user/auth',
  'src/domain/usecase/pgsql/plan',

  // infrastructure
  'src/infrastructure/auth/strategies',
  'src/infrastructure/database/migrations',
  'src/infrastructure/database/pgsql/entities',
  'src/infrastructure/database/pgsql/repositories',
  'src/infrastructure/http/interceptors',
  'src/infrastructure/http/decorators',

  // seed
  'src/infrastructure/database/pgsql/seeds',
  'src/infrastructure/database/pgsql/seeds/factories',

  // main
  'src/main/controllers/auth/dto',
  'src/main/controllers/tenant/dto',
  'src/main/controllers/user/dto',
  'src/main/controllers/plan/dto',

  // usecase
  'src/main/factories/usecases/auth/modules',
  'src/main/factories/usecases/auth',
  'src/main/factories/usecases/oauth/modules',
  'src/main/factories/usecases/oauth',
  'src/main/factories/usecases/tenant/modules',
  'src/main/factories/usecases/tenant',
  'src/main/factories/usecases/user/modules',
  'src/main/factories/usecases/user',
  'src/main/factories/usecases/plan/modules',
  'src/main/factories/usecases/plan',

  // shared enums
  'src/shared/enums',
  'src/shared/dto',
  'src/shared/paginate/dto',
  'src/shared/paginate/types',
];
const FOLDER_PATTERNS = ['factories/usecases'];

const shouldIncludeFolders = (path) => {
  return FOLDER_PATTERNS.some((pattern) => path.includes(pattern));
};

paths.forEach((relativePath) => {
  const pathDir = path.resolve(__dirname, '..', ...relativePath.split('/'));
  const pathFile = path.resolve(pathDir, 'index.ts');

  try {
    if (!fs.existsSync(pathDir)) {
      console.warn(`Directory not found: ${relativePath}`);
      return;
    }

    const includeFolders = shouldIncludeFolders(relativePath);
    const allItems = fs.readdirSync(pathDir);

    const itemsToExport = allItems.filter((item) => {
      if (item === 'index.ts') return false;

      const itemPath = path.resolve(pathDir, item);
      const stats = fs.statSync(itemPath);

      if (includeFolders) {
        return stats.isDirectory() || (stats.isFile() && item.endsWith('.ts'));
      } else {
        return stats.isFile() && item.endsWith('.ts');
      }
    });

    if (itemsToExport.length === 0) {
      console.warn(`No items found in: ${relativePath}`);
      return;
    }

    const exports = itemsToExport
      .map((item) => {
        const itemPath = path.resolve(pathDir, item);
        const stats = fs.statSync(itemPath);

        if (item.endsWith('.skip.ts')) {
          return `// export * from './${item}';\n`;
        }

        if (stats.isDirectory()) {
          // Para pastas: exporta como './nome-da-pasta'
          return `export * from './${item}';\n`;
        } else {
          // Para arquivos: remove a extensão .ts
          const name = item.replace('.ts', '');
          return `export * from './${name}';\n`;
        }
      })
      .join('');

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    }

    fs.writeFileSync(pathFile, exports);

    console.log(`✓ Success: ${relativePath}/index.ts`);
  } catch (error) {
    console.error(`Error ${relativePath}:`, error.message);
  }
});
