// dna.js ~~ MIT License
// Gulp configuration and tasks

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
const pkg =            require('./package.json');
const released =       process.env.dnaReleasedVersion;
const minorVersion =   pkg.version.split('.').slice(0, 2).join('.');
const banner =         'dna.js v' + pkg.version + ' ~~ dnajs.org ~~ MIT License';
const bannerCss =      '/*! ' + banner + ' */';
const bannerJs =       '//! ' + banner + '\n';
const websiteTarget =  'website-target';
const htmlHintConfig = { 'attr-value-double-quotes': false };
const headerComments = { css: /^\/[*].*[*]\/$/gm, js: /^\/\/.*\n/gm };
const transpileES6 =   ['@babel/preset-env', { modules: false }];
const babelMinifyJs =  { presets: [transpileES6, 'minify'], comments: false };
const webContext = {
   pkg:          pkg,
   released:     released,
   minorVersion: minorVersion,
   gzipSize:     '7 kb gzip',
   title:        pkg.description,  //default page title
   youTube:      linkInfo.youTube,
   jsFiddle:     linkInfo.jsFiddle
   };

// Tasks
const task = {
   buildDistribution: () => {
      const buildCss = () =>
         gulp.src('dna.css')
            .pipe(replace(headerComments.css, ''))
            .pipe(header(bannerCss))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      const buildJs = () =>
         gulp.src('dna.js')
            .pipe(replace(headerComments.js, ''))
            .pipe(header(bannerJs))
            .pipe(replace('[VERSION]', pkg.version))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'))
            .pipe(babel(babelMinifyJs))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(header(bannerJs))
            .pipe(gap.appendText('\n'))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('dist'));
      return mergeStream(buildCss(), buildJs());
      },
   reportSize: () => {
      return gulp.src('dist/dna.*')
         .pipe(size({ showFiles: true, gzip: true }));
      },
   cleanWebsite: () => {
      return del([websiteTarget, '**/.DS_Store']);
      },
   buildWebsite: () => {
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
   otherStuff: () => {
      const line = {
         findToDo:  /.*To-Do Application.*/,
         findIntro: /.*Introduction to dna.js.*/,
         newToDo:   '* [Sample To-Do Application](https://jsfiddle.net/' + linkInfo.jsFiddle.toDo + '/) (jsfiddle)',
         newIntro:  '* [Introduction to dna.js](https://youtu.be/' + linkInfo.youTube.intro + ') (YouTube)'
         };
      const updateReadMe = () =>
         gulp.src('README.md')
            .pipe(replace(line.findToDo,  line.newToDo))
            .pipe(replace(line.findIntro, line.newIntro))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest('.'));
      const skip = (type, message) => !/input type is not supported in all browsers/.test(message);
      const validateHtml = () =>
         gulp.src(['spec/visual.html', 'spec/simple.html'])
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(htmlValidator({ verifyMessage: skip }))
            .pipe(htmlValidator.reporter())
            .pipe(size({ showFiles: true }));
      return mergeStream(updateReadMe(), validateHtml());
      }
   };

// Gulp
gulp.task('build-dist',  task.buildDistribution);
gulp.task('report-size', task.reportSize);
gulp.task('clean-web',   task.cleanWebsite);
gulp.task('build-web',   task.buildWebsite);
gulp.task('other-stuff', task.otherStuff);
