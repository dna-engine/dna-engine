// dna.js
// Mocha Specification Cases

// Imports
import assert from 'assert';
import { JSDOM } from 'jsdom';
import jQuery from 'jquery';

// Setup
import { dna } from '../dist/dna.esm.js';
const mode =     { type: 'ES Module', file: 'dist/dna.esm.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =      new JSDOM('');
const $ =        jQuery(dom.window);
const setupEnv = (done) => dna.initGlobal(dom.window, $) && done();

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {
   before(setupEnv);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { version: dna.version, valid: semVerPattern.test(dna.version) };
      const expected = { version: dna.version, valid: true };
      assert.deepStrictEqual(actual, expected);
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
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
