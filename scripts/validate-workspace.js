const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const required = [
  'apps/management-dashboard/package.json',
  'apps/backend/package.json',
  'packages/ui/package.json',
  'packages/api/package.json',
  'packages/auth/package.json',
  'packages/config/package.json',
  'packages/types/package.json',
  'packages/utils/package.json',
  'packages/database/package.json',
  'turbo.json',
  'tsconfig.base.json',
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error(`Workspace validation failed:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log(`Workspace validation passed (${required.length} required files).`);
