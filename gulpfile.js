// dna.js
// gulp configuration and tasks

const gulp =        require('gulp');
const fileInclude = require('gulp-file-include');
const header =      require('gulp-header');
const htmlHint =    require('gulp-htmlhint');
const jsHint =      require('gulp-jshint');
const mergeStream = require('merge-stream');
const rename =      require('gulp-rename');
const replace =     require('gulp-replace');
const size =        require('gulp-size');
const uglify =      require('gulp-uglify');
const w3cJs =       require('gulp-w3cjs');
const del =         require('del');

const webContext = {
   pkg:  require('./package.json'),
   gzipSize: '6 kb gzip',
   youTube: {
      intro:    'jMOZOI-UkNI',
      tutorial: 'juIru5qHZFM'
      },
   jsFiddle: {
      addABook:       'Lspfc8t5',
      bookFinder:     'zxb2x6dv',
      dataClick:      '5dsbvacd',
      liveModel:      '8gnyLovu',
      panelsClick:    'uzm44vrf',
      panelsDropDown: 'qt95wt46',
      photoUpload:    'ac0d784e/3',
      smartUpdates:   '4a0tpmxp',
      toDo:           'wo6og0z8'
      }
   };
webContext.title = 'dna.js';  //default page title
webContext.minorVersion = webContext.pkg.version.split('.').slice(0,2).join('.');
const banner = '//! dna.js v' + webContext.pkg.version + ' ~~ dnajs.org ~~ MIT License\n';
const versionPatternStrs = [
   'dna[.]js v',     //example (dna.css):      /*! dna.js v1.0.0 ~~ dnajs.org ~~ MIT License */
   "version:\\s*'",  //example (dna.js):       version: '1.0.0',
   '"version":\\s*"' //example (package.json): "version":  "1.0.0",
   ];
const versionPatterns = new RegExp('(' + versionPatternStrs.join('|') + ')[0-9.]*', 'g');
const websiteTargetFolder = 'website-target';
const htmlHintConfig = { 'attr-value-double-quotes': false };
const jsHintConfig = {
   strict: 'implied',
   undef:   true,
   unused:  true,
   browser: true,
   jquery:  true,
   node:    true,
   globals: { dna: false, $: true, window: true }
   };

const task = {
   setVersionNumber: function() {
      return gulp.src(['dna.js', 'dna.css'])
         .pipe(replace(versionPatterns, '$1' + webContext.pkg.version))
         .pipe(gulp.dest('.'));
      },
   runJsHint: function() {
      return gulp.src(['dna.js', 'website/static/**/*.js'])
         .pipe(jsHint(jsHintConfig))
         .pipe(jsHint.reporter());
      },
   runUglify: function() {
      return gulp.src('dna.js')
         .pipe(rename('dna.min.js'))
         .pipe(uglify())
         .pipe(header(banner))
         .pipe(gulp.dest('.'));
      },
   reportSize: function() {
      return mergeStream(
         gulp.src('dna.*')
            .pipe(size({ showFiles: true })),
         gulp.src('dna.min.js')
            .pipe(size({ gzip: true, title: 'dna.min.js gzipped:' }))
         );
      },
   cleanWebsite: function() {
      return del(websiteTargetFolder);
      },
   buildWebsite: function() {
      return mergeStream(
         gulp.src(['website/static/**', '!website/static/**/*.html'])
            .pipe(gulp.dest(websiteTargetFolder)),
         gulp.src(['website/static/**/*.html', 'website/root/**/*.html'])
            .pipe(fileInclude({ basepath: '@root', indent: true, context: webContext }))
            .pipe(w3cJs())
            .pipe(w3cJs.reporter())
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(gulp.dest(websiteTargetFolder))
            .pipe(size({ showFiles: true }))
         );
      },
   otherStuff: function() {
      const findToDoLine =  /.*To-Do Application.*/;
      const findIntroLine = /.*Introduction to dna.js.*/;
      const newToDoLine =
         '* [Sample To-Do Application](https://jsfiddle.net/' + webContext.jsFiddle.toDo + '/) (jsfiddle)';
      const newIntroLine =
         '* [Introduction to dna.js](https://youtu.be/' + webContext.youTube.intro + ') (YouTube)';
      return mergeStream(
         gulp.src('README.md')
            .pipe(replace(findToDoLine,  newToDoLine))
            .pipe(replace(findIntroLine, newIntroLine))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('.')),
         gulp.src(['spec/visual.html', 'spec/simple.html'])
            .pipe(w3cJs())
            .pipe(w3cJs.reporter())
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(size({ showFiles: true }))
         );
      }
   };

gulp.task('set-version', task.setVersionNumber);
gulp.task('lint',        task.runJsHint);
gulp.task('minify',      task.runUglify);
gulp.task('report-size', task.reportSize);
gulp.task('clean-web',   task.cleanWebsite);
gulp.task('build-web',   task.buildWebsite);
gulp.task('other-stuff', task.otherStuff);
