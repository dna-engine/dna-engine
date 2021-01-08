// dna.js
// Mocha Specification Cases

// Imports
import assert from    'assert';
import { JSDOM } from 'jsdom';
import jQuery from    'jquery';

// Setup
import { dna } from '../dist/dna.esm.js';
const mode =     { type: 'ES Module', file: 'dist/dna.esm.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =      new JSDOM('');
const $ =        jQuery(dom.window);
const setupEnv = (done) => dna.initGlobal(dom.window, $) && done();

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {
   before(setupEnv);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.toCamel()', () => {

   it('converts a kebab (dashes) name to camelCase', () => {
      const input =  ['ready-set-go', 'dna'];
      const output = ['readySetGo',   'dna'];
      const actual =   { camels: input .map(dna.util.toCamel) };
      const expected = { camels: output };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.toKebab()', () => {

   it('converts kebab (dashes) name to camelCase', () => {
      const input =  ['readySetGo',   'dna'];
      const output = ['ready-set-go', 'dna'];
      const actual =   { kebabs: input.map(dna.util.toKebab) };
      const expected = { kebabs: output };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.value()', () => {

   it('returns value from key', () => {
      const actual =   { value: dna.util.value({ a: { b: 7 } }, 'a.b') };
      const expected = { value: 7 };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.realTruth()', () => {

   it('returns true for really true things', () => {
      const input = [true, 1, '1', 't', 'T', 'TRue', 'Y', 'yes', 77, [5], {}, 'Colbert', Infinity];
      const actual =   input.map((value) => ({ in: value, out: dna.util.realTruth(value) }));
      const expected = input.map((value) => ({ in: value, out: true }));
      assert.deepStrictEqual(actual, expected);
      });

   it('returns false for really untrue things', () => {
      const input = [false, 0, '0', 'f', 'F', 'faLSE', 'N', 'no', '', [], null, undefined, NaN];
      const actual =   input.map((value) => ({ in: value, out: dna.util.realTruth(value) }));
      const expected = input.map((value) => ({ in: value, out: false }));
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.printf()', () => {

   it('builds a string from variables', () => {
      const actual =   { string: dna.util.printf('Items in %s: %s', 'cart', 3) };
      const expected = { string: 'Items in cart: 3' };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.apply()', () => {

   const app = {
      priceCatalog: { 3: 19.95, 7: 14.95, 21: 39.95 },
      cart: {
         buy: (itemNum) => app.priceCatalog[itemNum],
         },
      };

   it('calls fn (string name or actual function) passing in params', () => {
      dna.registerContext('app', app);  //alternative: declare "app" using: "window.app = {"
      const actual =   { price: dna.util.apply('app.cart.buy', 7) };
      const expected = { price: 14.95 };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.assign()', () => {

   const app = { cart: { items: 3, total: 43.21 } };

   it('updates an existing field in an object', () => {
      const actual =   dna.util.assign(app, 'cart.total', 123.45);
      const expected = { cart: { items: 3, total: 123.45 } };
      assert.deepStrictEqual(actual, expected);
      });
   it('creates a new field in an object', () => {
      const actual =   dna.util.assign(app, 'cart.status.level', 'gold');
      const expected = { cart: { items: 3, total: 123.45, status: { level: 'gold' } } };
      assert.deepStrictEqual(actual, expected);
      });
   it('creates a new object if needed', () => {
      const actual =   dna.util.assign(null, 'cart.status.level', 'silver');
      const expected = { cart: { status: { level: 'silver' } } };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
