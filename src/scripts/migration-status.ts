#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

interface FileStatus {
  path: string;
  converted: boolean;
}

function checkMigrationStatus(): void {
  console.log('🔍 Checking TypeScript migration status...\n');

  // Find all JavaScript files in src directory
  const jsFiles = glob.sync('src/**/*.js').map(file => ({
    path: file,
    converted: fs.existsSync(file.replace('.js', '.ts'))
  }));

  const unconverted = jsFiles.filter(file => !file.converted);
  const converted = jsFiles.filter(file => file.converted);

  console.log(`📊 Migration Status: ${converted.length}/${jsFiles.length} files converted`);

  if (unconverted.length > 0) {
    console.log('\n❌ Files still needing conversion:');
    unconverted.forEach(file => console.log(`  - ${file.path}`));
  } else {
    console.log('\n✅ All files have been converted to TypeScript!');
  }

  if (converted.length > 0) {
    console.log('\n✅ Converted files:');
    converted.forEach(file => console.log(`  - ${file.path} → ${file.path.replace('.js', '.ts')}`));
  }

  // Check for any remaining .js files that might need attention
  const allJsFiles = glob.sync('**/*.js', { ignore: ['node_modules/**', '_site/**', '.cache/**'] });
  const srcJsFiles = allJsFiles.filter(file => file.startsWith('src/'));
  
  if (srcJsFiles.length > 0) {
    console.log('\n📝 All JavaScript files in src directory:');
    srcJsFiles.forEach(file => console.log(`  - ${file}`));
  }

  console.log('\n🎯 Migration check complete!');
}

// Run the migration status check
checkMigrationStatus();
