// dna-engine
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import jQuery from 'jquery';

// Setup
import { dna } from '../dist/dna-engine.js?cache-bust=5';
const pkg =      JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const mode =     { type: 'ES Module', file: 'dist/dna-engine.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =      new JSDOM('');
const $ =        jQuery(dom.window);
const setupEnv = (done) => dna.initGlobal(dom.window, $) && done();

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {
   before(setupEnv);

////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('dist').sort();
      const expected = [
         'dna-engine.css',
         'dna-engine.d.ts',
         'dna-engine.dev.js',
         'dna-engine.js',
         'dna-engine.min.js',
         'panel-nav.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { version: dna.version, valid: semVerPattern.test(dna.version) };
      const expected = { version: dna.version, valid: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Function dna.info()', () => {

   it('reports correct numbers before any cloning', () => {
      const actual = dna.info();
      actual.state = actual.state.length;        //only verify array length
      actual.store = Object.keys(actual.store);  //only verify keys names
      const expected = {
         clones:       0,
         initializers: [],
         names:        [],
         panels:       [],
         state:        0,
         store:        [],
         subs:         0,
         templates:    0,
         version:      pkg.version,
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
