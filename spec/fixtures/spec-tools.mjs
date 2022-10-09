// dna-engine
// Specification Tools

import jQuery from 'jquery';

const grabText = (elems) => elems.toArray().map(elem => $(elem).text());

export { grabText };
