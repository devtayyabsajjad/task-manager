#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Task Manager for Vercel deployment...');

// Get the project root (parent of scripts directory)
const projectRoot = path.resolve(__dirname, '..');

// Check if we're in the correct directory structure
const rootPackageJson = path.join(projectRoot, 'package.json');
const backendPackageJson = path.join(projectRoot, 'apps', 'backend', 'package.json');
const frontendPackageJson = path.join(projectRoot, 'apps', 'frontend', 'package.json');

if (!fs.existsSync(rootPackageJson)) {
  console.error('❌ Root package.json not found');
  process.exit(1);
}

if (!fs.existsSync(backendPackageJson)) {
  console.error('❌ Backend package.json not found');
  process.exit(1);
}

if (!fs.existsSync(frontendPackageJson)) {
  console.error('❌ Frontend package.json not found');
  process.exit(1);
}

console.log('✅ Project structure validated');

// Check for required files
const requiredFiles = [
  'vercel.json',
  'apps/backend/src/main.ts',
  'apps/backend/index.js',
  'apps/frontend/src/lib/apiConfig.ts'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(projectRoot, file))) {
    console.error(`❌ Required file not found: ${file}`);
    process.exit(1);
  }
}

console.log('✅ Required files validated');

// Check environment variables template
const envTemplate = path.join(projectRoot, 'apps', 'frontend', '.env.production.template');
if (fs.existsSync(envTemplate)) {
  console.log('✅ Environment template found');
} else {
  console.log('⚠️  Environment template not found, but not critical');
}

console.log('🎉 Project is ready for Vercel deployment!');
console.log('');
console.log('Next steps:');
console.log('1. Push your code to a Git repository');
console.log('2. Connect the repository to Vercel');
console.log('3. Set up environment variables in Vercel dashboard');
console.log('4. Deploy!');
console.log('');
console.log('See DEPLOYMENT_GUIDE.md for detailed instructions.');
