// dna.js
// gulp configuration and tasks

// Imports
const babel =         require('gulp-babel');
const del =           require('del');
const fileInclude =   require('gulp-file-include');
const gap =           require('gulp-append-prepend');
const gulp =          require('gulp');
const header =        require('gulp-header');
const htmlHint =      require('gulp-htmlhint');
const htmlValidator = require('gulp-w3c-html-validator');
const mergeStream =   require('merge-stream');
const rename =        require('gulp-rename');
const replace =       require('gulp-replace');
const size =          require('gulp-size');

// Setup
const pkg = require('./package.json');
const released = process.env.dnaReleasedVersion;
const minorVersion = pkg.version.split('.').slice(0,2).join('.');
const linkInfo = {
   youTube: {
      intro:    'jMOZOI-UkNI',
      tutorial: 'juIru5qHZFM'
      },
   jsFiddle: {
      addABook:       'Lspfc8t5',
      bookFinder:     'zxb2x6dv',
      dataClick:      '5dsbvacd',
      liveModel:      'y24pshbn',
      panelsClick:    'uzm44vrf',
      panelsDropDown: 'qt95wt46',
      photoUpload:    'ac0d784e/3',
      smartUpdates:   '4a0tpmxp',
      toDo:           'wo6og0z8'
      }
   };
const webContext = {
   pkg:          pkg,
   released:     released,
   minorVersion: minorVersion,
   gzipSize:     '6 kb gzip',
   title:        pkg.description,  //default page title
   youTube:      linkInfo.youTube,
   jsFiddle:     linkInfo.jsFiddle
   };
const banner =              'dna.js v' + pkg.version + ' ~~ dnajs.org ~~ MIT License';
const websiteTargetFolder = 'website-target';
const htmlHintConfig =      { 'attr-value-double-quotes': false };
const headerComments =      { css: /^[/][*].*[*][/]$/gm, js: /^[/][/].*\n/gm };
const transpileES6 =        ['@babel/env', { modules: false }];
const babelMinifyJs =       { presets: [transpileES6, 'minify'], comments: false };
const newLine =             '\n';

// Tasks
const task = {
   buildDistribution: () => {
      const buildCss = () =>
         gulp.src('dna.css')
            .pipe(replace(headerComments.css, ''))
            .pipe(header('/*! ' + banner + ' */'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildJs = () =>
         gulp.src('dna.js')
            .pipe(replace(headerComments.js, ''))
            .pipe(header('//! ' + banner + newLine))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'))
            .pipe(babel(babelMinifyJs))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(header('//! ' + banner + newLine))
            .pipe(gap.appendText(newLine))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      return mergeStream(buildCss(), buildJs());
      },
   reportSize: () => {
      return gulp.src('dist/dna.*')
         .pipe(size({ showFiles: true, gzip: true }));
      },
   cleanWebsite: () => {
      return del(websiteTargetFolder);
      },
   buildWebsite: () => {
      return mergeStream(
         gulp.src(['website/static/**', '!website/static/**/*.html'])
            .pipe(gulp.dest(websiteTargetFolder)),
         gulp.src(['website/static/**/*.html', 'website/root/**/*.html'])
            .pipe(fileInclude({ basepath: '@root', indent: true, context: webContext }))
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(htmlValidator())
            .pipe(htmlValidator.reporter())
            .pipe(gulp.dest(websiteTargetFolder))
            .pipe(size({ showFiles: true }))
         );
      },
   otherStuff: () => {
      const findToDoLine =  /.*To-Do Application.*/;
      const findIntroLine = /.*Introduction to dna.js.*/;
      const newToDoLine =
         '* [Sample To-Do Application](https://jsfiddle.net/' + linkInfo.jsFiddle.toDo + '/) (jsfiddle)';
      const newIntroLine =
         '* [Introduction to dna.js](https://youtu.be/' + linkInfo.youTube.intro + ') (YouTube)';
      return mergeStream(
         gulp.src('README.md')
            .pipe(replace(findToDoLine,  newToDoLine))
            .pipe(replace(findIntroLine, newIntroLine))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('.')),
         gulp.src(['spec/visual.html', 'spec/simple.html'])
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(htmlValidator())
            .pipe(htmlValidator.reporter())
            .pipe(size({ showFiles: true }))
         );
      }
   };

// Gulp
gulp.task('build-dist',  task.buildDistribution);
gulp.task('report-size', task.reportSize);
gulp.task('clean-web',   task.cleanWebsite);
gulp.task('build-web',   task.buildWebsite);
gulp.task('other-stuff', task.otherStuff);
