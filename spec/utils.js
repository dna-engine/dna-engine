// dna.js
// Mocha Specification Cases
//
// Run specs:
//    $ cd dna.js
//    $ npm test

const html = `
<!doctype html>
<html lang=en>
    <head>
        <meta charset=utf-8>
        <title>Specification Runner</title>
    </head>
    <body>
    </body>
</html>
`;

const assert =    require('assert');
const { JSDOM } = require('jsdom');
const window =    new JSDOM(html).window;
const $ =         require('jquery')(window);
const dna =       require('../dna.js')(window, $);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.toCamel()', () => {

   it('converts a kebab (dashes) name to camelCase', () => {
      const dataSet = [
         { input: 'ready-set-go', expected: 'readySetGo' },
         { input: 'dna',          expected: 'dna' }
         ];
      function evalData(data) {
         assert.strictEqual(dna.util.toCamel(data.input), data.expected);
         }
      dataSet.forEach(evalData);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.toKebab()', () => {

   it('converts kebab (dashes) name to camelCase', () => {
      const dataSet = [
           { input: 'readySetGo', expected: 'ready-set-go' },
           { input: 'dna',        expected: 'dna' }
           ];
      function evalData(data) {
         assert.strictEqual(dna.util.toKebab(data.input), data.expected);
         }
      dataSet.forEach(evalData);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.value()', () => {

   it('returns value from key', () => {
      const actual =   dna.util.value({ a: { b: 7 } }, 'a.b');
      const expected = 7;
      assert.strictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.realTruth()', () => {

   it('returns a boolean', () => {
      const dataSet = [
         { input: '7', expected: true },
         { input: '0', expected: false }
         ];
      function evalData(data) { assert.strictEqual(dna.util.realTruth(data.input), data.expected); }
      dataSet.forEach(evalData);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.printf()', () => {

   it('builds a string from variables', () => {
      const actual =   dna.util.printf('%s: %s', 'Lives', 3);
      const expected = 'Lives: 3';
      assert.strictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.apply()', () => {

   const app = {
      priceCatalog: { 3: 19.95, 7: 14.95, 21: 39.95 },
      cart: {
         buy: function(itemNum) {
            return app.priceCatalog[itemNum];
            }
         }
      };
   dna.registerContext('app', app);

   it('calls fn (string name or actual function) passing in params', () => {
      const actual =   dna.util.apply('app.cart.buy', 7);
      const expected = 14.95;
      assert.strictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.assign()', () => {

   const app = { cart: { items: 3, total: 43.21 } };

   it('updates an existing field in an object', () => {
      const actual =   dna.util.assign(app, 'cart.total', 123.45);
      const expected = { cart: { items: 3, total: 123.45 } };
      assert.deepEqual(actual, expected);
      });
   it('creates a new field in an object', () => {
      const actual =   dna.util.assign(app, 'cart.status.level', 'gold');
      const expected = { cart: { items: 3, total: 123.45, status: { level: 'gold' } } };
      assert.deepEqual(actual, expected);
      });
   it('creates a new object if needed', () => {
      const actual =   dna.util.assign(null, 'cart.status.level', 'silver');
      const expected = { cart: { status: { level: 'silver' } } };
      assert.deepEqual(actual, expected);
      });

   });
