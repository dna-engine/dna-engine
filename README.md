### dna.js Semantic Templates
<img src=https://raw.githubusercontent.com/dnajs/dna.js/master/website/static/graphics/dnajs-logo.png
   align=right width=160 alt=logo>
*An uncomplicated user interface library*

[![npm](https://img.shields.io/npm/v/dna.js.svg)](https://github.com/dnajs/dna.js)
[![Build Status](https://travis-ci.org/dnajs/dna.js.svg)](https://travis-ci.org/dnajs/dna.js)

dna.js is an easy-to-use UI library for jQuery enabling developers to rapidly build maintainable
JavaScript applications.

### 1. Bookstore Example
Designate templates with the `dna-template` class, and put the templates directly into the HTML
of your web page.&nbsp; Use the element's `id` to indicate the name of the template.&nbsp;
Enclose data fields in double tildes `~~`.

#### a) HTML for book template
```html
<h1>Featured Books</h1>
<div id=book class=dna-template>
   <div>Title:  <span>~~title~~</span></div>
   <div>Author: <span>~~author~~</span></div>
</div>
```

Then call the `dna.clone()` function to insert a copy of the template into the DOM.&nbsp; The
supplied JSON data object will be used to populate the fields of the template.

#### b) JavaScript call to add book node
```js
dna.clone('book', { title: 'The DOM', author: 'Jan' });
```

The new clone element replaces the template.&nbsp; The original template is detached from
the DOM and kept for additional cloning.

#### c) Resulting HTML with clone
```html
<h1>Featured Books</h1>
<div class=book>
   <div>Title:  <span>The DOM</span></div>
   <div>Author: <span>Jan</span></div>
</div>
```

### 2. Additional Information
* [dnajs.org](http://dnajs.org) (see the "Try It Out" section for a live example)
* [Sample To-Do Application](http://jsfiddle.net/wo6og0z8/) (jsfiddle)
* [Introduction to dna.js](https://youtu.be/jMOZOI-UkNI) (YouTube)
* [Documentation](http://dnajs.org/docs)
* [Release Notes](https://github.com/dnajs/dna.js/wiki/Release-Notes)

---
dna.js is open source under the [MIT License](http://dnajs.org/license).&nbsp;
The website and documentation are published under the
[CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0) license.
