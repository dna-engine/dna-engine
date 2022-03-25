// dna.js
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { grabText } from './fixtures/spec-tools.mjs';
import { html, bookCatalog } from './fixtures/mock-data.mjs';

// Setup
const mode =       { type: 'Minified', file: 'dist/dna.min.js' };
const filename =   import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =        new JSDOM(html, { runScripts: 'outside-only' });
const scripts =    ['node_modules/jquery/dist/jquery.js', mode.file];
const loadScript = (file) => dom.window.eval(readFileSync(file).toString());  //jshint ignore:line
scripts.forEach(loadScript);
const { $, dna } = dom.window;

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.templateExists()', () => {

   it('identifies if a template is present before cloning', () => {
      const actual =   [dna.templateExists('book'), dna.templateExists('bogus')];
      const expected = [true, false];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Template cloning function dna.clone()', () => {

   it('creates a book with the correct title', () => {
      dna.clone('book', bookCatalog[0]);
      const actual =   { title: $('.book h2').text() };
      const expected = { title: bookCatalog[0].title };
      assertDeepStrictEqual(actual, expected);
      });

   it('creates a book with the correct author', () => {
      const actual =   { author: $('.book cite').text() };
      const expected = { author: bookCatalog[0].author };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.getModel()', () => {

   it('returns the data object for the clone', () => {
      dna.clone('book', bookCatalog[1]);
      const actual =   { model: dna.getModel($('.book').last()) };
      const expected = { model: bookCatalog[1] };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Field formatter', () => {

   it('for currency correctly formats prices', () => {
      dna.clone('book', bookCatalog[2]);
      const actual = {
         usd:    grabText($('output.usd')),
         jpy:    grabText($('output.jpy')),
         usd100: grabText($('output.usd100')),
         };
      const expected = {
         usd:    ['$2,499.00', '$1,999.00', ''],
         jpy:    [   '¥2,499',    '¥1,999', ''],
         usd100: [   '$24.99',    '$19.99', ''],
         };
      assertDeepStrictEqual(actual, expected);
      });

   it('for dates correctly formats timestamps', () => {
      const actual = {
         locale:  $('#978-3 output.locale').text(),
         general: $('#978-3 output.general').text(),
         };
      const expected = {
         locale:  '5/4/2030, 1:00:00 AM',
         general: '2030-05-04 1:00am Sat',
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Plugin call clone.dna("refresh")', () => {

   it('updates the displayed title of a book', () => {
      const clones = dna.clone('book', bookCatalog, { empty: true });
      dna.getModel(clones.first()).title = 'The DOM 2.0!';
      clones.first().dna('refresh');
      const titles =   $('.dna-clone.book').toArray().map(elem => $(elem).find('h2').text());
      const actual =   { titles: Array.from(titles) };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3', 'Howdy HTML5'] };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Plugin call clone.dna("destroy")', () => {

   it('deletes a book from the DOM', () => {
      dna.getClones('book').last().last().dna('destroy');
      const titles =   $('.dna-clone.book').toArray().map(elem => $(elem).find('h2').text());
      const actual =   { titles: Array.from(titles) };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3'] };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.templateExists()', () => {

   it('identifies if a template is present after cloning', () => {
      const actual =   [dna.templateExists('book'), dna.templateExists('bogus')];
      const expected = [true, false];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.info()', () => {

   it('reports the correct number of templates and clone instances', () => {
      const actual = dna.info();
      delete actual.store;
      delete actual.version;
      const expected = {
         clones:       2,
         initializers: [],
         names:        ['book'],
         panels:       [],
         subs:         0,
         templates:    1,
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
