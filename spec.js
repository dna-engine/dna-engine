// dna.js
// Mocha Specification Cases
//
// Run specs:
//    $ cd dna.js
//    $ npm test

const url = 'http://example.com?a=one&b=two';
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
const window =    new JSDOM(html, { url: url }).window;
const $ =         require('jquery')(window);
const dna =       require('./dna.js')(window, $);

//Unit tests for dna.array
////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.array.last()', () => {

 it('returns last object in array', () => {
   var actual = dna.array.last([3, 21, 7]);
   expected = '7';
   assert.equal(actual, expected);
   });

 });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.array.find()', () => {

  it('finds a key in an array and returns the value', () => {
    var array = [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
    var actual = dna.array.find(array, 'b').word;
    expected = 'Bat';
    assert.equal(actual, expected);
    });

});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.array.toMap()', () => {

  it('Converts an array of objects into an object (hash map)', () => {
     var dataSet = [
        {
           inputArray: [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }],
           expected: { a: { word: 'Ant' }, b: { word: 'Bat' } }
        }];
     function evalData(data) {
        var output = dna.array.toMap(data.inputArray, data.inputKey);
        assert.deepEqual(output, data.expected);
        }
     dataSet.forEach(evalData);
     });

  });
*/
////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.array.fromMap()', () => {

  it('converts a map into an array of maps', () => {
     var dataSet = [
        {
           inputMap: { a: { word: 'Ant' }, b: { word: 'Bat' } },
           expected: [{ word: 'Ant', code: 'a' }, { word: 'Bat', code: 'b' }]
        },
        {
           inputMap: { x0: 100, x1: 101, x2: 102 },
           inputKey: 'key',
           expected: [{ value: 100, key: 'x0' }, { value: 101, key: 'x1' }, { value: 102, key: 'x2' }]
        }];
     function evalData(data) {
        var output = dna.array.fromMap(data.inputMap, data.inputKey);
        assert.deepEqual(output, data.expected);
        }
     dataSet.forEach(evalData);
     });

  });


//Unit tests for dna.util
////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.toCamel()', () => {

   it('converts a kebab (dashes) name to camelCase', () => {
      var dataSet = [
         { input: 'ready-set-go', expected: 'readySetGo' },
         { input: 'dna',          expected: 'dna' }
         ];
      function evalData(data) {
         assert.equal(dna.util.toCamel(data.input), data.expected);
         }
      dataSet.forEach(evalData);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.toKebab()', () => {

 it('converts kebab (dashes) name to camelCase', () => {
   var dataSet = [
        { input: 'readySetGo', expected: 'ready-set-go' },
        { input: 'dna',          expected: 'dna' }
        ];
     function evalData(data) {
        assert.equal(dna.util.toKebab(data.input), data.expected);
        }
     dataSet.forEach(evalData);
     });

 });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.value()', () => {

 it('returns value from key', () => {
   var actual = dna.util.value({ a: { b: 7 }}, 'a.b');
   expected = '7';
   assert.equal(actual, expected);
   });

 });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.realTruth()', () => {

 it('returns a boolean', () => {
   var dataSet = [
        { input: '7', expected: true },
        { input: '0', expected: false }
        ];
     function evalData(data) {
        assert.equal(dna.util.realTruth(data.input), data.expected);
        }
     dataSet.forEach(evalData);
     });

 });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.printf()', () => {

 it('builds a string from variables', () => {
   var actual = dna.util.printf('%s: %s', 'Lives', 3);
   expected = 'Lives: 3';
   assert.equal(actual, expected);
   });

 });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Utility function dna.util.apply()', () => {

 it('calls fn (string name or actual function) passing in params', () => {
   var app = {
     priceCatalog: { 3: 19.95, 7: 14.95, 21: 39.95 },
     cart: {
       buy: function(itemNum) {
         return app.priceCatalog[itemNum];
       }
     }
   }
   dna.registerContext('app', app);
   var actual = dna.util.apply('app.cart.buy', 7);
   expected = '14.95';
   assert.equal(actual, expected);
   });

 });
