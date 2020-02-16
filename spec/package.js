// dna.js
// Mocha Specification Cases

// Imports
const assert =    require('assert').strict;
const { JSDOM } = require('jsdom');

// Web page
const html = `
<!doctype html>
<html lang=en>
   <head>
      <meta charset=utf-8>
      <title>Specification Runner</title>
   </head>
   <body>
      <h1>Featured Books</h1>
      <section class=books>
         <div id=book class=dna-template>
            <h2>~~title~~</h2>
            Author: <cite>~~author~~</cite>
         </div>
      </section>
   </body>
</html>
`;

// Setup
const dnaPath = process.env.specMode === 'minified' ? '../dist/dna.min.js' : '../dist/dna.js';
const window =  new JSDOM(html).window;
const $ =       require('jquery')(window);
const dna =     require(dnaPath)(window, $);

// Specification suite
describe(require('path').basename(__filename) + ': ' + dnaPath, () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { version: dna.version, valid: semVerPattern.test(dna.version) };
      const expected = { version: dna.version, valid: true };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.info()', () => {

   it('reports correct numbers before any cloning', () => {
      const actual = dna.info();
      const expected = {
         version:      dna.version,
         templates:    0,
         clones:       0,
         subs:         0,
         names:        [],
         store:        {},
         initializers: [],
         panels:       []
         };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
