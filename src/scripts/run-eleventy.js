#!/usr/bin/env node

const { spawnSync } = require('child_process');

function hasModule(id) {
  try {
    require.resolve(id);
    return true;
  } catch (_) {
    return false;
  }
}

function main() {
  const args = process.argv.slice(2);
  const env = { ...process.env };

  if (hasModule('ts-node/register')) {
    env.NODE_OPTIONS = [env.NODE_OPTIONS, '-r ts-node/register'].filter(Boolean).join(' ');
    console.log('[eleventy] Using ts-node/register preload.');
  } else {
    if (env.NODE_OPTIONS && env.NODE_OPTIONS.includes('ts-node/register')) {
      // Remove ts-node preload if present to avoid module not found errors
      env.NODE_OPTIONS = env.NODE_OPTIONS
        .split(/\s+/)
        .filter((t) => !/ts-node\/register/.test(t))
        .join(' ');
    }
    console.log('[eleventy] ts-node not installed; running Eleventy without TS preload.');
  }

  const bin = process.platform === 'win32' ? 'node_modules/.bin/eleventy.cmd' : 'node_modules/.bin/eleventy';
  const res = spawnSync(bin, args, { stdio: 'inherit', env });
  process.exit(res.status || 0);
}

main();
