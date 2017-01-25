// dna.js Specifications
//
// Prerequisite:
//    Download and install Node.js from https://nodejs.org
//    $ git clone https://github.com/dnajs/dna.js.git
//
// Run tests:
//    $ cd dna.js
//    $ npm update
//    $ node spec.js

var spec =   require('tape');
var window = require('jsdom').jsdom('<html></html>', { url: 'http://example.com' }).defaultView;
var $ =      require('jquery')(window);
var dna =    require('./dna.js')(window, $);

console.log('~~~ dna.js Specifications ~~~');
console.log(`jQuery v${$.fn.jquery}, dna.js v${dna.info().version}`);

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
