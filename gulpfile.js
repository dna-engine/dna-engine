// dna.js
// gulp configuration and tasks

const gulp =        require('gulp');
const fileInclude = require('gulp-file-include');
const filesize =    require('gulp-filesize');
const header =      require('gulp-header');
const htmlHint =    require('gulp-htmlhint');
const jsHint =      require('gulp-jshint');
const rename =      require('gulp-rename');
const replace =     require('gulp-replace');
const uglify =      require('gulp-uglify');
const w3cjs =       require('gulp-w3cjs');
const del =         require('del');

const webContext = {
   pkg:  require('./package.json'),
   size: '16 kb',
   youTube: {
      intro:    'jMOZOI-UkNI',
      tutorial: 'juIru5qHZFM'
      },
   jsFiddle: {
      addABook:       'eo3gpfmo',
      bookFinder:     'zxb2x6dv',
      dataClick:      '5dsbvacd',
      liveModel:      '8gnyLovu',
      panelsClick:    'uzm44vrf',
      panelsDropDown: 'qt95wt46',
      smartUpdates:   '4a0tpmxp',
      toDo:           'wo6og0z8'
      }
   };
webContext.title = 'dna.js';  //default page title
const banner = '//dna.js v' + webContext.pkg.version + ' ~~ dnajs.org/license\n';
const versionPatternStrs = [
   'dna[.]js v',     //example (dna.css):      /* dna.js v1.0.0 ~~ dnajs.org/license */
   "version:\\s*'",  //example (dna.js):       version: '1.0.0',
   '"version":\\s*"' //example (package.json): "version":  "1.0.0",
   ];
const versionPatterns = new RegExp('(' + versionPatternStrs.join('|') + ')[0-9.]*', 'g');
const httpdocsFolder = 'website/httpdocs';
const htmlHintConfig = { 'attr-value-double-quotes': false };
const jsHintConfig = {
   strict: 'implied',
   undef:  true,
   unused: true,
   jquery: true,
   node:   true,
   mocha:  true,
   globals: {
      app:     false,
      console: false,
      $:       true,
      window:  true
      }
   };
const jsHintConfigEs6 = Object.assign({}, jsHintConfig, { esversion: 6 });

function setVersionNumber() {
   const stream = gulp.src(['dna.js', 'dna.css'])
      .pipe(replace(versionPatterns, '$1' + webContext.pkg.version))
      .pipe(gulp.dest('.'));
   return stream;
   }

function runJsHint() {
   gulp.src(['dna.js', 'website/*.js'])
      .pipe(jsHint(jsHintConfig))
      .pipe(jsHint.reporter());
   gulp.src(['gulpfile.js', 'spec.js'])
      .pipe(jsHint(jsHintConfigEs6))
      .pipe(jsHint.reporter());
   }

function runUglify() {
   gulp.src('dna.js')
      .pipe(rename('dna.min.js'))
      .pipe(uglify())
      .pipe(header(banner))
      .pipe(gulp.dest('.'));
   }

function reportSize() {
   gulp.src('dna.*')
      .pipe(filesize());
   }

function cleanWebsite() {
    return del(httpdocsFolder + '/**');
    }

function buildWebsite() {
   const findToDoLine = /.*To-Do Application.*/;
   const findIntroLine = /.*Introduction to dna.js.*/;
   const newToDoLine =
      '* [Sample To-Do Application](http://jsfiddle.net/' + webContext.jsFiddle.toDo + '/) (jsfiddle)';
   const newIntroLine =
      '* [Introduction to dna.js](https://youtu.be/' + webContext.youTube.intro + ') (YouTube)';
   gulp.src('README.md')
      .pipe(replace(findToDoLine,  newToDoLine))
      .pipe(replace(findIntroLine, newIntroLine))
      .pipe(filesize())
      .pipe(gulp.dest('.'));
   gulp.src('website/static/**')
      .pipe(gulp.dest(httpdocsFolder));
   gulp.src(['website/static/**/*.html', 'spec/visual.html'])
      .pipe(w3cjs())
      .pipe(w3cjs.reporter())
      .pipe(htmlHint(htmlHintConfig))
      .pipe(htmlHint.reporter());
   gulp.src('website/root/**/*.html')
      .pipe(fileInclude({ basepath: '@root', indent: true, webContext: webContext }))
      .pipe(w3cjs())
      .pipe(w3cjs.reporter())
      .pipe(htmlHint(htmlHintConfig))
      .pipe(htmlHint.reporter())
      .pipe(gulp.dest(httpdocsFolder));
   }

gulp.task('set-version', setVersionNumber);
gulp.task('lint',        runJsHint);
gulp.task('minify',      ['set-version'], runUglify);
gulp.task('build',       ['lint', 'minify'], reportSize);
gulp.task('clean-web',   cleanWebsite);
gulp.task('web',         ['clean-web'], buildWebsite);
