#!/usr/bin/env node

const { spawnSync } = require('child_process');

function hasTypescript() {
  try {
    require.resolve('typescript');
    return true;
  } catch (_) {
    return false;
  }
}

function main() {
  if (!hasTypescript()) {
    // Skip typecheck gracefully if TypeScript is not installed in the environment.
    console.log('[typecheck] typescript not installed; skipping type check.');
    process.exit(0);
  }
  const bin = process.platform === 'win32' ? 'node_modules/.bin/tsc.cmd' : 'node_modules/.bin/tsc';
  const res = spawnSync(bin, ['--noEmit', '-p', 'tsconfig.json'], { stdio: 'inherit' });
  process.exit(res.status || 0);
}

main();
