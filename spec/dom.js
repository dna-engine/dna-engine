// dna.js
// Mocha Specification Cases

// Imports
const fs =        require('fs');
const assert =    require('assert').strict;
const { JSDOM } = require('jsdom');

// Setup
const dnaPath = process.env.specMode === 'minified' ? 'dist/dna.min.js' : 'dist/dna.js';
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
            Author: <cite>~~author~~</cite>
         </div>
      </section>
   </body>
</html>
`;
const scripts = [
   'node_modules/jquery/dist/jquery.js',
   dnaPath,
   ];
const window = new JSDOM(html, { runScripts: 'outside-only' }).window;
const loadScript = (file) => window.eval(fs.readFileSync(file).toString());  //jshint ignore:line
scripts.forEach(loadScript);
const { $, dna } = window;

// Mock data
const bookCatalog = [
   { title: 'The DOM',      author: 'Jan',  price: 2499, sale: false, language: 'en' },
   { title: 'Styling CSS3', author: 'Abby', price: 1999, sale: true,  language: 'fr' },
   { title: 'Howdy HTML5',  author: 'Ed',   price: 2999 }
   ];

// Specification suite
describe(require('path').basename(__filename) + ': ' + dnaPath, () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Template cloning function dna.clone()', () => {

   it('creates a book with the correct title', () => {
      dna.clone('book', bookCatalog[0]);
      const actual   = { title: $('.book h2').text() };
      const expected = { title: bookCatalog[0].title };
      assert.deepEqual(actual, expected);
      });

   it('creates a book with the correct author', () => {
      const actual   = { author: $('.book cite').text() };
      const expected = { author: bookCatalog[0].author };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.getModel()', () => {

   it('returns the data object for the clone', () => {
      dna.clone('book', bookCatalog[1]);
      const actual   = { model: dna.getModel($('.book').last()) };
      const expected = { model: bookCatalog[1] };
      assert.deepEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Plugin call clone.dna("refresh")', () => {

   it('updates the displayed title of a book', () => {
      const clones = dna.clone('book', bookCatalog, { empty: true });
      dna.getModel(clones.first()).title = 'The DOM 2.0!';
      clones.first().dna('refresh');
      const titles = $('.dna-clone.book').toArray().map(elem => $(elem).find('h2').text());
      const actual   = { titles: Array.from(titles) };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3', 'Howdy HTML5'] };
      assert.deepEqual(actual.titles, expected.titles);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Plugin call clone.dna("destroy")', () => {

   it('deletes a book from the DOM', () => {
      dna.getClones('book').last().last().dna('destroy');
      const titles = $('.dna-clone.book').toArray().map(elem => $(elem).find('h2').text());
      const actual   = { titles: Array.from(titles) };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3'] };
      assert.deepEqual(actual.titles, expected.titles);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
