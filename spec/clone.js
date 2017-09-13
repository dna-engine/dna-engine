const assert    = require('assert');
const jsdom     = require("jsdom");
const { JSDOM } = jsdom;

const dom       = new JSDOM(`<!DOCTYPE html>
                             <html>
                             <body>
                             <h1>Featured Books</h1>
                             <div id=book class=dna-template>
                                 <div>Title:  <span class=title  >~~title~~</span></div>
                                 <div>Author: <span class=author >~~author~~</span></div>
                             </div>
                             </body>
                             </html>`);

const $       = require("jquery")(dom.window);
const dna     = require("../dna.js")(dom.window, $);

describe('the clone function', () => {

 dna.clone('book', { title: 'The DOM', author: 'Jan' });

 it('creates a book with the correct title', () => {
   const actual   = $('.book .title').text()
   const expected = 'The DOM'
   assert.equal(actual, expected);
 });

 it('creates a book with the correct author', () => {
   const actual   = $('.book .author').text();
   const expected = 'Jan';
   assert.equal(actual, expected);
 });

});
