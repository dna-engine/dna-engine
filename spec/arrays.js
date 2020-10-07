// dna.js
// Mocha Specification Cases

// Imports
const assert =    require('assert').strict;
const { JSDOM } = require('jsdom');

// Setup
const dnaPath = process.env.specMode === 'minified' ? '../dist/dna.min.js' : '../dist/dna.js';
const window =  new JSDOM('').window;
const $ =       require('jquery')(window);
const dna =     require(dnaPath)(window, $);

// Specification suite
describe(require('path').basename(__filename) + ': ' + dnaPath, () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.find()', () => {

   it('finds an item by key in an array and returns the item and index', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      const actual =   { item: dna.array.find(array, 'b').item };
      const expected = { item: { code: 'b', word: 'Bat' } };
      assert.deepEqual(actual, expected);
      });

   it('returns undefined for the item when key does not exist', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      const actual =   { result: dna.array.find(array, { key: 'bogus' }) };
      const expected = { result: { item: undefined, index: -1 } };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.last()', () => {

   it('returns last object in array', () => {
      const array =    [3, 21, 7];
      const actual =   { last: dna.array.last(array) };
      const expected = { last: 7 };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.fromMap()', () => {

   it('converts a map of objects into an array of maps', () => {
      const map =      { a: { word: 'Ant' }, bZ: { word: 'Bat' } };
      const actual =   dna.array.fromMap(map);
      const expected = [{ word: 'Ant', code: 'a' }, { word: 'Bat', code: 'bZ' }];
      assert.deepEqual(actual, expected);
      });

   it('converts a map of objects into an array of maps with kebab case codes', () => {
      const map =      { a: { word: 'Ant' }, bZ: { word: 'Bat' } };
      const actual =   dna.array.fromMap(map, { kebabCodes: true });
      const expected = [{ word: 'Ant', code: 'a' }, { word: 'Bat', code: 'b-z' }];
      assert.deepEqual(actual, expected);
      });

   it('converts a map of values into an array of maps with a custom code name', () => {
      const map =      { x0: 100, x1: 101, x2: 102 };
      const actual =   dna.array.fromMap(map, { key: 'key' });
      const expected = [{ value: 100, key: 'x0' }, { value: 101, key: 'x1' }, { value: 102, key: 'x2' }];
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.toMap()', () => {

   it('converts an array of objects into an object (hash map)', () => {
      const array = [
         { code: 'a',        word: 'Ant' },
         { code: 'b-z',      word: 'Bat' },
         { code: 'J30X-W77', price: 34.99 }
         ];
      const actual = dna.array.toMap(array);
      const expected = {
         'a':        { code: 'a',        word: 'Ant' },
         'b-z':      { code: 'b-z',      word: 'Bat' },
         'J30X-W77': { code: 'J30X-W77', price: 34.99 }
         };
      assert.deepEqual(actual, expected);
      });

   it('converts an array of objects into an object (hash map) with camel case keys', () => {
      const array = [
         { code: 'a',        word: 'Ant' },
         { code: 'b-z',      word: 'Bat' },
         { code: 'J30X-W77', price: 34.99 }
         ];
      const actual = dna.array.toMap(array, { key: 'code', camelKeys: true });
      const expected = {
         a:       { code: 'a',        word: 'Ant' },
         bZ:      { code: 'b-z',      word: 'Bat' },
         J30XW77: { code: 'J30X-W77', price: 34.99 }
         };
      assert.deepEqual(actual, expected);
      });

   it('converts an array of objects into an object (hash map) with custom key field', () => {
      const array =    [
         { code: 'a',   word: 'Ant' },
         { code: 'b-z', word: 'Bat' }
         ];
      const actual = dna.array.toMap(array, { key: 'word' });
      const expected = {
         Ant: { code: 'a',   word: 'Ant' },
         Bat: { code: 'b-z', word: 'Bat' }
         };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
