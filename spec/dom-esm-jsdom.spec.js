// dna.js
// Mocha Specification Cases

// Imports
import assert from 'assert';
import { JSDOM } from 'jsdom';
import jQuery from 'jquery';

// Setup
import { html, bookCatalog } from './mock-data.mjs';
import { dna } from '../dist/dna.esm.js';
const mode =     { type: 'ES Module', file: 'dist/dna.esm.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =      new JSDOM(html);
const $ =        jQuery(dom.window);
const setupEnv = (done) => dna.initGlobal(dom.window, $) && done();
const grabText = (elems) => elems.toArray().map(elem => $(elem).text());

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {
   before(setupEnv);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.templateExists()', () => {

   it('identifies if a template is present before cloning', () => {
      const actual =   [dna.templateExists('book'), dna.templateExists('bogus')];
      const expected = [true, false];
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Template cloning function dna.clone()', () => {

   it('creates a book with the correct title', () => {
      dna.clone('book', bookCatalog[0]);
      const actual =   { title: $('.book h2').text() };
      const expected = { title: bookCatalog[0].title };
      assert.deepStrictEqual(actual, expected);
      });

   it('creates a book with the correct author', () => {
      const actual =   { author: $('.book cite').text() };
      const expected = { author: bookCatalog[0].author };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.getModel()', () => {

   it('returns the data object for the clone', () => {
      dna.clone('book', bookCatalog[1]);
      const actual =   { model: dna.getModel($('.book').last()) };
      const expected = { model: bookCatalog[1] };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Formatter', () => {

   it('for currency displays correctly formatted prices', () => {
      dna.clone('book', bookCatalog[2]);
      const actual = {
         usd:   grabText($('output.usd')),
         jpy:   grabText($('output.jpy')),
         };
      const expected = {
         usd:   ['$2,499.00', '$1,999.00', ''],
         jpy:   [   '¥2,499',    '¥1,999', ''],
         };
      assert.deepStrictEqual(actual, expected);
      });

   it('for dates displays correctly formatted timestamps', () => {
      const actual = {
         locale:  $('#978-3 output.locale').text(),
         general: $('#978-3 output.general').text(),
         };
      const expected = {
         locale:  '5/4/2030, 1:00:00 AM',
         general: '2030-05-04 1:00am',
         };
      assert.deepStrictEqual(actual, expected);
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
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Plugin call clone.dna("destroy")', () => {

   it('deletes a book from the DOM', () => {
      dna.getClones('book').last().last().dna('destroy');
      const titles =   $('.dna-clone.book').toArray().map(elem => $(elem).find('h2').text());
      const actual =   { titles: Array.from(titles) };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3'] };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.templateExists()', () => {

   it('identifies if a template is present after cloning', () => {
      const actual =   [dna.templateExists('book'), dna.templateExists('bogus')];
      const expected = [true, false];
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Function dna.info()', () => {

   it('reports the correct number of templates and clone instances', () => {
      const actual = JSON.parse(JSON.stringify(dna.info()));
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
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
