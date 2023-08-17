# dna-engine
<img src=https://dna-engine.org/graphics/dna-logo.png align=right width=160 alt=logo>

_An uncomplicated user interface library for cloning semantic templates_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://dna-engine.org/license)
[![npm](https://img.shields.io/npm/v/dna-engine.svg)](https://www.npmjs.com/package/dna-engine)
[![Hits](https://data.jsdelivr.com/v1/package/npm/dna-engine/badge?style=rounded)](https://www.jsdelivr.com/package/npm/dna-engine)
[![Build](https://github.com/dna-engine/dna-engine/workflows/build/badge.svg)](https://github.com/dna-engine/dna-engine/actions/workflows/run-spec-on-push.yaml)

dna-engine is a lightweight easy-to-use UI library enabling developers to rapidly build maintainable
JavaScript applications.

## A) Bookstore Example
Designate templates with the `dna-template` class, and put the templates directly into the HTML
of your web page.&nbsp; Use the element's `id` to indicate the name of the template.&nbsp;
Enclose data fields in double tildes `~~`.

### 1. HTML for book template
```html
<h1>Featured Books</h1>
<div id=book class=dna-template>
   <h2>~~title~~</h2>
   Author: <cite>~~author~~</cite>
</div>
```

Then call the `dna.clone()` function to insert a copy of the template into the DOM.&nbsp; The
supplied JSON data object populates the fields of the template.

### 2. JavaScript call to add book node
```js
dna.clone('book', { title: 'The DOM', author: 'Jan' });
```

The new clone element replaces the template.&nbsp; The original template is detached from
the DOM and kept for additional cloning.

### 3. Resulting HTML with clone
```html
<h1>Featured Books</h1>
<div class=book>
   <h2>The DOM</h2>
   Author: <cite>Jan</cite>
</div>
```

Need to clone the template multiple times?&nbsp;  Simply pass an array of data objects into the
`dna.clone()` function.

## B) Additional Information
* [https://dna-engine.org](https://dna-engine.org/) (see the *"Try it out"* section for an interactive example)
* [Sample To-Do Application](https://jsfiddle.net/3qbkjguy/1) (jsfiddle)
* [Introduction to dna-engine](https://youtu.be/jMOZOI-UkNI) (YouTube)
* [Documentation](https://dna-engine.org/docs)
* [Release Notes](https://github.com/dna-engine/dna-engine/wiki/Release-Notes)

## C) Contributor Notes
To be a contributor, **fork** the project and run the commands `npm install` and `npm test` on your
local clone.&nbsp; Make your edits and rerun the tests.&nbsp; Pull requests welcome.

## D) Build Environment
Check out the `runScriptsConfig` section in [package.json](package.json) for an
interesting approach to organizing build tasks.

**CLI Build Tools**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header):&nbsp; _Prepend a one-line banner comment (with license notice) to distribution files_
   - 📄 [copy-file-util](https://github.com/center-key/copy-file-util):&nbsp; _Copy or rename a file with optional package version number_
   - 📂 [copy-folder-util](https://github.com/center-key/copy-folder-util):&nbsp; _Recursively copy files from one folder to another folder_
   - 🪺 [recursive-exec](https://github.com/center-key/recursive-exec):&nbsp; _Run a command on each file in a folder and its subfolders_
   - 🔍 [replacer-util](https://github.com/center-key/replacer-util):&nbsp; _Find and replace strings or template outputs in text files_
   - 🔢 [rev-web-assets](https://github.com/center-key/rev-web-assets):&nbsp; _Revision web asset filenames with cache busting content hash fingerprints_
   - 🚆 [run-scripts-util](https://github.com/center-key/run-scripts-util):&nbsp; _Organize npm scripts into named groups of easy to manage commands_
   - 🚦 [w3c-html-validator](https://github.com/center-key/w3c-html-validator):&nbsp; _Check the markup validity of HTML files using the W3C validator_

<br>

---
Feel free to submit questions at:<br>
[github.com/dna-engine/dna-engine/issues](https://github.com/dna-engine/dna-engine/issues)

dna-engine is open source under the [MIT License](https://dna-engine.org/license).&nbsp;
The website and documentation are published under the
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) license.
