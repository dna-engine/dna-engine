// dna.js
// gulp configuration and tasks

var gulp =        require('gulp');
var fileinclude = require('gulp-file-include');
var filesize =    require('gulp-filesize');
var header =      require('gulp-header');
var htmlhint =    require('gulp-htmlhint');
var jshint =      require('gulp-jshint');
var rename =      require('gulp-rename');
var replace =     require('gulp-replace');
var uglify =      require('gulp-uglify');
var w3cjs =       require('gulp-w3cjs');
var del =         require('del');

var context = {
   pkg:     require('./package.json'),
   size:    '16 kb',
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
context.title = context.pkg.dna.fullName;  //default page title
var banner = '//dna.js v' + context.pkg.version + ' ~~ dnajs.org/license\n';
var versionPatternStrs = [
   'dna[.]js v',     //example (dna.css):      /* dna.js v1.0.0 ~~ dnajs.org/license */
   "version:\\s*'",  //example (dna.js):       version: '1.0.0',
   '"version":\\s*"' //example (package.json): "version":  "1.0.0",
   ];
var versionPatterns = new RegExp('(' + versionPatternStrs.join('|') + ')[0-9.]*', 'g');
var httpdocsFolder = 'website/httpdocs';
var htmlHintConfig = { 'attr-value-double-quotes': false };
var jsHintConfig = {
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
var jsHintConfigEs6 = Object.assign({}, jsHintConfig, { esversion: 6 });

function setVersionNumber() {
   var stream = gulp.src(['dna.js', 'dna.css'])
      .pipe(replace(versionPatterns, '$1' + context.pkg.version))
      .pipe(gulp.dest('.'));
   return stream;
   }

function runJsHint() {
   gulp.src(['dna.js', 'website/*.js'])
      .pipe(jshint(jsHintConfig))
      .pipe(jshint.reporter());
   gulp.src(['gulpfile.js', 'spec.js'])
      .pipe(jshint(jsHintConfigEs6))
      .pipe(jshint.reporter());
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
   var findToDoLine = /.*To-Do Application.*/;
   var findIntroLine = /.*Introduction to dna.js.*/;
   var newToDoLine =
      '* [Sample To-Do Application](http://jsfiddle.net/' + context.jsFiddle.toDo + '/) (jsfiddle)';
   var newIntroLine =
      '* [Introduction to dna.js](https://youtu.be/' + context.youTube.intro + ') (YouTube)';
   gulp.src('README.md')
      .pipe(replace(findToDoLine,  newToDoLine))
      .pipe(replace(findIntroLine, newIntroLine))
      .pipe(filesize())
      .pipe(gulp.dest('.'));
   gulp.src('website/static/**')
      .pipe(gulp.dest(httpdocsFolder));
   gulp.src('website/static/**/*.html')
      .pipe(w3cjs())
      .pipe(w3cjs.reporter())
      .pipe(htmlhint(htmlHintConfig))
      .pipe(htmlhint.reporter());
   gulp.src('website/root/**/*.html')
      .pipe(fileinclude({ basepath: '@root', indent: true, context: context }))
      .pipe(w3cjs())
      .pipe(w3cjs.reporter())
      .pipe(htmlhint(htmlHintConfig))
      .pipe(htmlhint.reporter())
      .pipe(gulp.dest(httpdocsFolder));
   }

gulp.task('set-version', setVersionNumber);
gulp.task('lint',        runJsHint);
gulp.task('minify',      ['set-version'], runUglify);
gulp.task('build',       ['lint', 'minify'], reportSize);
gulp.task('clean-web',   cleanWebsite);
gulp.task('web',         ['clean-web'], buildWebsite);
