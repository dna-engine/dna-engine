// dna.js
// Specification Tools

import jQuery from 'jquery';

const toPlainObj = (obj) => JSON.parse(JSON.stringify(obj));

const grabText = (elems) => toPlainObj(elems.toArray().map(elem => $(elem).text()));

export { toPlainObj, grabText };
