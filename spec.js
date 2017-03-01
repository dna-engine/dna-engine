// dna.js Specification Runner
//
// Run specs:
//    $ cd dna.js
//    $ npm update
//    $ node spec.js

var html = `
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

var spec =     require('tape');
var document = require('jsdom').jsdom(html, { url: 'http://example.com' });
var window =   document.defaultView;
var $ =        require('jquery')(window);
var dna =      require('./dna.js')(window, $);
console.log('~~~ dna.js Specification Runner ~~~');
console.log(`jQuery v${$.fn.jquery}, dna.js v${dna.info().version}`);

spec('Utility function dna.array.fromMap()', (assert) => {
   var does = 'Converts a map into an array of maps';
   var dataSet = [
      {
         inputMap: { a: { word: 'Ant' }, b: { word: 'Bat' } },
         expected: [{ word: 'Ant', code: 'a' }, { word: 'Bat', code: 'b' }]
      },
      {
         inputMap: { x0: 100, x1: 101, x2: 102 },
         inputKey: 'key',
         expected: [{ value: 100, key: 'x0' }, { value: 101, key: 'x1' },{ value: 102, key: 'x2' }]
      }];
   function evalData(data) {
      var output = dna.array.fromMap(data.inputMap, data.inputKey);
      assert.equal(JSON.stringify(output), JSON.stringify(data.expected), does);
      }
   dataSet.forEach(evalData);
   assert.end();
   });

spec('Utility function dna.util.toCamel()', (assert) => {
   var does = 'Converts a kebab (dashes) name to camelCase';
   var dataSet = [
      { input: 'ready-set-go', expected: 'readySetGo' },
      { input: 'dna',          expected: 'dna' }
      ];
   function evalData(data) {
      assert.equal(dna.util.toCamel(data.input), data.expected, does);
      }
   dataSet.forEach(evalData);
   assert.end();
   });
