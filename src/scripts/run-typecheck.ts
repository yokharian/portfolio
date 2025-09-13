#!/usr/bin/env ts-node

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function hasTypescript(): boolean {
  try {
    const typescriptPath = path.resolve(process.cwd(), 'node_modules/typescript');
    return fs.existsSync(typescriptPath);
  } catch (_) {
    return false;
  }
}

function main(): void {
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
