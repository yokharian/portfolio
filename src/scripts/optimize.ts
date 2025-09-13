#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

function checkImplicitAnyTypes(): void {
  console.log('🔍 Checking for implicit any types...\n');

  try {
    execSync('npx tsc --noImplicitAny --noEmit', { stdio: 'inherit' });
    console.log('✅ No implicit any types found!');
  } catch (error) {
    console.error('❌ Found implicit any types that should be fixed');
    console.error('Run `npx tsc --noImplicitAny --noEmit` to see details');
  }
}

function checkBundleSizes(): void {
  console.log('\n📦 Checking JavaScript bundle sizes...\n');

  const jsDir = path.resolve(process.cwd(), 'src/assets/js');
  
  if (!fs.existsSync(jsDir)) {
    console.log('⚠️  JavaScript output directory not found. Run build first.');
    return;
  }

  const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
  
  if (jsFiles.length === 0) {
    console.log('⚠️  No JavaScript files found in output directory.');
    return;
  }

  console.log('JavaScript bundle sizes:');
  let totalSize = 0;
  
  jsFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    console.log(`  - ${file}: ${sizeKB} KB`);
  });

  console.log(`\n📊 Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
}

function checkTypeCoverage(): void {
  console.log('\n🎯 Checking TypeScript coverage...\n');

  try {
    // Run type checking with strict mode
    execSync('npx tsc --noEmit --strict', { stdio: 'inherit' });
    console.log('✅ All TypeScript files pass strict type checking');
  } catch (error) {
    console.error('❌ Some TypeScript files have type issues');
    console.error('Run `npx tsc --noEmit --strict` to see details');
  }
}

function runOptimization(): void {
  console.log('🚀 Running TypeScript optimization checks...\n');

  checkImplicitAnyTypes();
  checkBundleSizes();
  checkTypeCoverage();

  console.log('\n✨ Optimization check complete!');
}

// Run the optimization
runOptimization();
