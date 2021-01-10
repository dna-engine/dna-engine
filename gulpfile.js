// dna.js ~~ MIT License
// Gulp configuration and tasks

// Imports
import babel from         'gulp-babel';
import del from           'del';
import fileInclude from   'gulp-file-include';
import gap from           'gulp-append-prepend';
import gulp from          'gulp';
import header from        'gulp-header';
import htmlHint from      'gulp-htmlhint';
import htmlValidator from 'gulp-w3c-html-validator';
import mergeStream from   'merge-stream';
import rename from        'gulp-rename';
import replace from       'gulp-replace';
import size from          'gulp-size';
import { readFileSync } from 'fs';

// Link information
const linkInfo = {
   youTube: {
      intro:    'jMOZOI-UkNI',
      tutorial: 'juIru5qHZFM'
      },
   jsFiddle: {
      addABook:       'Lv4pjt0g',
      bookFinder:     'r8hwk0Lq',
      dataClick:      '50gwncj3',
      liveModel:      'xez27s0o',
      panelsClick:    'm7b9h53a',
      panelsDropDown: 'rdjb6cka',
      photoUpload:    'o5p0wjd1',
      smartUpdates:   'a5rsLcb2',
      toDo:           '3qbkjguy'
      }
   };

// Setup
const pkg =            JSON.parse(readFileSync('./package.json'));
const released =       process.env.dnaReleasedVersion;
const minorVersion =   pkg.version.split('.').slice(0, 2).join('.');
const banner =         'dna.js v' + pkg.version + ' ~~ dnajs.org ~~ MIT License';
const bannerCss =      '/*! ' + banner + ' */\n';
const bannerJs =       '//! ' + banner + '\n\n';
const websiteTarget =  'website-target';
const htmlHintConfig = { 'attr-value-double-quotes': false };
const headerComments = { css: /^\/[*].*[*]\/$/gm, js: /^\/\/.*\n/gm };
const transpileES6 =   ['@babel/preset-env', { modules: false }];
const babelMinifyJs =  { presets: [transpileES6, 'minify'], comments: false };
const webContext = {
   pkg:          pkg,
   released:     released,
   minorVersion: minorVersion,
   gzipSize:     '8 kb gzip',
   title:        pkg.description,  //default page title
   youTube:      linkInfo.youTube,
   jsFiddle:     linkInfo.jsFiddle
   };

// Tasks
const task = {

   makeDistribution() {
      const buildCss = () =>
         gulp.src('dna.css')
            .pipe(replace(headerComments.css, ''))
            .pipe(header(bannerCss))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildDts = () =>
         gulp.src('build/dna.d.ts')
            .pipe(header(bannerJs))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildEsm = () =>
         gulp.src('build/dna.js')
            .pipe(replace(headerComments.js, ''))
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(size({ showFiles: true }))
            .pipe(rename({ extname: '.esm.js' }))
            .pipe(gulp.dest('dist'));
      const buildUmd = () =>
         gulp.src('build/umd/dna.js')
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(rename({ extname: '.umd.js' }))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildJs = () =>
         gulp.src('build/dna.js')
            .pipe(replace(headerComments.js, ''))
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(replace(/^export { (.*) };/m, 'if (typeof window === "object") window.$1 = $1;'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'))
            .pipe(babel(babelMinifyJs))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(header(bannerJs.replace('\n\n', '\n')))
            .pipe(gap.appendText('\n'))
            .pipe(size({ showFiles: true }))
            .pipe(size({ showFiles: true, gzip: true }))
            .pipe(gulp.dest('dist'));
      return mergeStream(buildCss(), buildDts(), buildEsm(), buildUmd(), buildJs());
      },

   reportSize() {
      return gulp.src('dist/dna.*')
         .pipe(size({ showFiles: true, gzip: true }));
      },

   cleanWebsite() {
      return del([websiteTarget, '**/.DS_Store']);
      },

   buildWebsite() {
      const copyStaticFiles = () =>
         gulp.src(['website/static/**', '!website/static/**/*.html', 'website/static/**/.htaccess'])
            .pipe(gulp.dest(websiteTarget));
      const buildHtml = () =>
         gulp.src(['website/static/**/*.html', 'website/root/**/*.html'])
            .pipe(fileInclude({ basepath: '@root', indent: true, context: webContext }))
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(htmlValidator())
            .pipe(htmlValidator.reporter())
            .pipe(gulp.dest(websiteTarget))
            .pipe(size({ showFiles: true }));
      return mergeStream(copyStaticFiles(), buildHtml());
      },

   updateReadMe() {
      const line = {
         findToDo:  /.*To-Do Application.*/,
         findIntro: /.*Introduction to dna.js.*/,
         newToDo:   '* [Sample To-Do Application](https://jsfiddle.net/' + linkInfo.jsFiddle.toDo + '/) (jsfiddle)',
         newIntro:  '* [Introduction to dna.js](https://youtu.be/' + linkInfo.youTube.intro + ') (YouTube)'
         };
      return gulp.src('README.md')
         .pipe(replace(line.findToDo,  line.newToDo))
         .pipe(replace(line.findIntro, line.newIntro))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest('.'));
      },

   validateHtml() {
      const skip = (type, message) => !/input type is not supported in all browsers/.test(message);
      return gulp.src(['spec/visual.html', 'spec/simple.html'])
         .pipe(htmlHint(htmlHintConfig))
         .pipe(htmlHint.reporter())
         .pipe(htmlValidator({ verifyMessage: skip }))
         .pipe(htmlValidator.reporter())
         .pipe(size({ showFiles: true }));
      },

   };

// Gulp
gulp.task('make-dist',     task.makeDistribution);
gulp.task('report-size',   task.reportSize);
gulp.task('clean-website', task.cleanWebsite);
gulp.task('build-website', task.buildWebsite);
gulp.task('update-readme', task.updateReadMe);
gulp.task('validate-html', task.validateHtml);
