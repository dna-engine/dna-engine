# dna.js
<img src=https://dnajs.org/graphics/dnajs-logo.png align=right width=160 alt=logo>

_An uncomplicated user interface library for building data-driven semantic templates_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://dnajs.org/license)
[![npm](https://img.shields.io/npm/v/dna.js.svg)](https://www.npmjs.com/package/dna.js)
[![Size](https://badgen.net/bundlephobia/minzip/dna.js)](https://bundlephobia.com/result?p=dna.js)
[![Quality](https://npm.packagequality.com/shield/dna.js.svg)](https://packagequality.com/#?package=dna.js)
[![Vulnerabilities](https://snyk.io/test/github/dnajs/dna.js/badge.svg)](https://snyk.io/test/github/dnajs/dna.js)
[![Hits](https://data.jsdelivr.com/v1/package/npm/dna.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/dna.js)
[![Build](https://travis-ci.org/dnajs/dna.js.svg)](https://travis-ci.org/dnajs/dna.js)

dna.js is a lightweight easy-to-use UI library enabling developers to rapidly build maintainable
JavaScript applications.

### 1. Bookstore Example
Designate templates with the `dna-template` class, and put the templates directly into the HTML
of your web page.&nbsp; Use the element's `id` to indicate the name of the template.&nbsp;
Enclose data fields in double tildes `~~`.

#### a) HTML for book template
```html
<h1>Featured Books</h1>
<div id=book class=dna-template>
   <h2>~~title~~</h2>
   Author: <cite>~~author~~</cite>
</div>
```

Then call the `dna.clone()` function to insert a copy of the template into the DOM.&nbsp; The
supplied JSON data object populates the fields of the template.

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
   <h2>The DOM</h2>
   Author: <cite>Jan</cite>
</div>
```

Need to clone the template multiple times?&nbsp;  Simply pass an array of data objects into the
`dna.clone()` function.

### 2. Additional Information
* [https://dnajs.org](https://dnajs.org/) (see the *"Try it out"* section for an interactive example)
* [Sample To-Do Application](https://jsfiddle.net/3qbkjguy/) (jsfiddle)
* [Introduction to dna.js](https://youtu.be/jMOZOI-UkNI) (YouTube)
* [Documentation](https://dnajs.org/docs)
* [Release Notes](https://github.com/dnajs/dna.js/wiki/Release-Notes)

### 3. Contributor Notes
To be a contributor, fork the project and run the commands `npm install` and `npm test` on your
local clone.&nbsp; Make your edits and rerun the tests.&nbsp; Pull requests welcome.

Pull requests (PRs) should not update the `version` number in **package.json** or any files in the
`dist` folder.&nbsp; The `version` number and `dist` files are all updated as part of the release
process.

Issues labeled **"good first issue"** make it easy for first time contributors to participate.&nbsp;
Only submit a PR for one of these issues if you're new to this project.

<br>

---
Feel free to submit questions at:<br>
[github.com/dnajs/dna.js/issues](https://github.com/dnajs/dna.js/issues)

dna.js is open source under the [MIT License](https://dnajs.org/license).&nbsp;
The website and documentation are published under the
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) license.
