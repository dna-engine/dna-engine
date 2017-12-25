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
describe('Array utility function dna.array.last()', () => {

   it('returns last object in array', () => {
      const actual =   dna.array.last([3, 21, 7]);
      const expected = 7;
      assert.strictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.find()', () => {

   it('finds a key in an array and returns the value', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      const actual =   dna.array.find(array, 'b').word;
      const expected = 'Bat';
      assert.strictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.toMap()', () => {

   it('converts an array of objects into an object (hash map) using default key', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b-z', word: 'Bat' }];
      const actual =   dna.array.toMap(array);
      const expected = { a: { code: 'a', word: 'Ant' }, bZ: { code: 'b-z', word: 'Bat' } };
      assert.deepStrictEqual(actual, expected);
      });

   it('converts an array of objects into an object (hash map)', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b-z', word: 'Bat' }];
      const actual =   dna.array.toMap(array, 'word');
      const expected = { Ant: { code: 'a', word: 'Ant' }, Bat: { code: 'b-z', word: 'Bat' } };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.fromMap()', () => {

   it('converts a map of objects into an array of maps', () => {
      const map =      { a: { word: 'Ant' }, bZ: { word: 'Bat' } };
      const actual =   dna.array.fromMap(map);
      const expected = [{ word: 'Ant', code: 'a' }, { word: 'Bat', code: 'b-z' }];
      assert.deepStrictEqual(actual, expected);
      });

   it('converts a map of values into an array of maps', () => {
      const map =      { x0: 100, x1: 101, x2: 102 };
      const actual =   dna.array.fromMap(map, 'key');
      const expected = [{ value: 100, key: 'x0' }, { value: 101, key: 'x1' }, { value: 102, key: 'x2' }];
      assert.deepStrictEqual(actual, expected);
      });

   });
