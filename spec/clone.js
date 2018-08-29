// dna.js
// Mocha Specification Cases
//
// Run specs:
//    $ cd dna.js
//    $ npm test

const html = `
<!doctype html>
<html>
   <head>
      <meta charset=utf-8>
      <title>Specification Runner</title>
   </head>
   <body>
      <h1>Featured Books</h1>
      <section class=books>
         <div id=book class=dna-template>
            <h2>~~title~~</h2>
            Author: <b class=author>~~author~~</b>
          </div>
      </section>
   </body>
</html>
`;

const assert =    require('assert');
const { JSDOM } = require('jsdom');
const window =    new JSDOM(html).window;
const $ =         require('jquery')(window);
const dna =       require('../dna.js')(window, $);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Template cloning function dna.clone()', () => {

   dna.clone('book', { title: 'The DOM', author: 'Jan' });

   it('creates a book with the correct title', () => {
      const actual   = $('.book h2').text();
      const expected = 'The DOM';
      assert.strictEqual(actual, expected);
      });

   it('creates a book with the correct author', () => {
      const actual   = $('.book .author').text();
      const expected = 'Jan';
      assert.strictEqual(actual, expected);
      });

   });
