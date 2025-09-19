/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

function run(script) {
  console.log(`\n🔹 Executando ${script}...\n`);
  execSync(`node ${script}`, { stdio: 'inherit' });
}

// domain
run('./scripts/entity-domain-import.js');
run('./scripts/repository-domain-import.js');

// infrastructure
run('./scripts/entity-infrastructure-import.js');
run('./scripts/repository-infrastructure-import.js');

// seed
run('./scripts/seed-import.js');
run('./scripts/seed-factory-import.js');

// shared enums
run('./scripts/shared-enum-import.js');

console.log('\n✅ Todos os imports executados com sucesso!\n');
