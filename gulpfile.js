// dna.js Semantic Templates
// gulp configuration and tasks

var gulp =        require('gulp');
var fileinclude = require('gulp-file-include');
var filesize =    require('gulp-filesize');
var header =      require('gulp-header');
var htmlhint =    require('gulp-htmlhint');
var jshint =      require('gulp-jshint');
var mocha =       require('gulp-mocha');
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
   'js v',           //example: /* dna.js v1.0.0 ~~ dnajs.org/license */
   '~~ v',           //example: // dna.js Semantic Templates ~~ v1.0.0
   "version:\\s*'",  //example: version: '1.0.0',
   '"version":\\s*"' //example: "version":  "1.0.0",
   ];
var versionPatterns = new RegExp('(' + versionPatternStrs.join('|') + ')[0-9.]*', 'g');
var httpdocsFolder = 'website/httpdocs';
var files = {
   html: ['*.html', 'website/*.html', 'website/httpdocs/*.html'],
   js:   ['dna.js', 'gulpfile.js', 'website/*.js']
   };
var htmlHintConfig = {
   'attr-value-double-quotes': false
   };
var jsHintConfig = {
   strict: 'implied',
   undef:  true,
   unused: true,
   jquery: true,
   node:   true,
   mocha:  true,
   globals: {
      app:      false,
      console:  false,
      $:        true,
      document: true,
      window:   true
      }
   };
var jsHintConfigEs6 = Object.assign({}, jsHintConfig, { esversion: 6 });

function setVersionNumberDev() {
   var stream = gulp.src(['dna.js', 'dna.css'])
      .pipe(replace(versionPatterns, '$1' + context.pkg.version))
      .pipe(filesize())
      .pipe(gulp.dest('.'));
   return stream;
   }

function setVersionNumberProd() {
   var stream = gulp.src('bower.json')
      .pipe(replace(versionPatterns, '$1' + context.pkg.version))
      .pipe(filesize())
      .pipe(gulp.dest('.'));
   return stream;
   }

function runJsHint() {
   gulp.src(files.js)
      .pipe(jshint(jsHintConfig))
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
   gulp.src('dna*.js')
      .pipe(filesize());
   }

function runSpec() {
   var stream = gulp.src('spec.js')
      .pipe(jshint(jsHintConfigEs6))
      .pipe(jshint.reporter())
      .pipe(mocha());
   return stream;
   }

function cleanWebsite() {
    return del(httpdocsFolder + '/**');
    }

function buildWebsite() {
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

gulp.task('dev',     setVersionNumberDev);
gulp.task('release', setVersionNumberProd);
gulp.task('jshint',  ['dev'], runJsHint);
gulp.task('uglify',  ['dev'], runUglify);
gulp.task('spec',    ['dev'], runSpec);
gulp.task('default', ['jshint', 'uglify', 'spec'], reportSize);
gulp.task('clean',   cleanWebsite);
gulp.task('web',     ['clean'], buildWebsite);
