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
