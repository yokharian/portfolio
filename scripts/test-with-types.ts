#!/usr/bin/env ts-node

import { execSync } from 'child_process';

/**
 * Test script that runs type checking followed by unit tests
 * This ensures that both TypeScript compilation and Jest tests pass
 */

async function runTests(): Promise<void> {
  try {
    console.log('🔍 Running TypeScript type checking...');
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('✅ Type checking passed\n');

    console.log('🧪 Running Jest unit tests...');
    execSync('npx jest', { stdio: 'inherit' });
    console.log('✅ All tests passed\n');

    console.log('🎉 All checks completed successfully!');
  } catch (error) {
    console.error('❌ Test suite failed');
    process.exit(1);
  }
}

// Run the tests
runTests().catch((error) => {
  console.error('Failed to run tests:', error);
  process.exit(1);
});
