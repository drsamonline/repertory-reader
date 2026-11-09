'use strict';
/**
 * Accent folding, tested against the code that ships.
 *
 *   node tests/fold.test.js
 *
 * The page defines `fold` and `rkey` on one line each; this reads those lines out
 * of docs/play/index.html and evaluates them, so the assertion is about the app
 * and not about a copy of it.
 */
const fs = require('fs');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, '..', 'docs', 'play', 'index.html'), 'utf8');
let pass = 0, fail = 0;
const ok = (n, c, d) => { c ? (pass++, console.log('PASS  ' + n)) : (fail++, console.log('FAIL  ' + n + (d ? '  [' + d + ']' : ''))); };

function grab(re) {
  const m = page.match(re);
  if (!m) return null;
  return m[0];
}

const foldSrc = grab(/const fold = s => [^\n]+/);
const rkeySrc = grab(/const rkey = s => [^\n]+/);
ok('the page defines fold()', !!foldSrc);
ok('the page defines rkey()', !!rkeySrc);

if (!foldSrc || !rkeySrc) { console.log('\nfold: FAILED — the page does not define fold()/rkey()'); process.exit(1); }
const fold = new Function(foldSrc + '\nreturn fold;')();
const rkey = new Function(foldSrc + '\n' + rkeySrc + '\nreturn rkey;')();

ok('fold strips the accent', fold('Ménière') === 'meniere', fold('Ménière'));
ok('fold keeps the length', fold('Ménière').length === 'Ménière'.length);
ok('fold leaves plain text alone', fold('Head bursting') === 'head bursting');
ok('fold handles Devanagari', fold('शिर') === 'शिर');

ok('rkey folds before stripping', rkey('Ménière') === 'meniere', rkey('Ménière'));
ok('a reader typing the plain name matches', rkey('Ménière') === rkey('meniere'));
ok('two different remedies do not collide', rkey('Café') !== rkey('Cfe'), rkey('Café') + ' vs ' + rkey('Cfe'));
ok('rkey still strips punctuation', rkey("Arnica mont. (30c)") === 'arnicamontc', rkey("Arnica mont. (30c)"));

console.log('\n' + (fail === 0 ? 'fold: OK' : fail + ' failed'));
process.exit(fail === 0 ? 0 : 1);
