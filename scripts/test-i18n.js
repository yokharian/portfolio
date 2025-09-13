#!/usr/bin/env node
/*
Basic sanity tests for i18n system.
- Ensures i18n.json has en/es and required keys.
- Ensures client scripts exist.
- Exits non-zero on failure.
*/
const fs = require('fs');
const path = require('path');

function fail(msg){
  console.error('[i18n test] ' + msg);
  process.exit(1);
}

function ok(msg){
  console.log('[i18n test] ' + msg);
}

try {
  const i18nPath = path.join(process.cwd(), 'src', 'data', 'i18n.json');
  const raw = fs.readFileSync(i18nPath, 'utf8');
  const dict = JSON.parse(raw);
  const langs = ['en','es'];
  for (const l of langs){
    if (!dict[l]) fail(`Missing '${l}' block in i18n.json`);
  }
  const requiredKeys = ['hero.title','hero.subtitle','hero.cta','home.featured.heading','home.featured.viewAll','certifications.heading','header.cta'];
  function get(obj, key){
    return key.split('.').reduce((acc,k)=> (acc && acc[k]!==undefined? acc[k]: undefined), obj);
  }
  for (const l of langs){
    for (const k of requiredKeys){
      const v = get(dict[l], k);
      if (typeof v !== 'string' || !v.length){
        fail(`Missing translation for '${k}' in '${l}'`);
      }
    }
  }
  ok('i18n.json has required languages and keys');

  const files = [
    path.join(process.cwd(),'public','assets','js','lang-bootstrap.js'),
    path.join(process.cwd(),'public','assets','js','lang-switcher.js'),
    path.join(process.cwd(),'public','assets','js','i18n-client.js'),
  ];
  for (const f of files){
    if (!fs.existsSync(f)) fail(`Missing client file: ${path.relative(process.cwd(), f)}`);
  }
  ok('Client-side language scripts are present');

  process.exit(0);
} catch (e) {
  fail(e.message || String(e));
}
