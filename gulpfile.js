// dna.js ~~ MIT License
// Gulp configuration and tasks

// Imports
import babel       from 'gulp-babel';
import fileInclude from 'gulp-file-include';
import gap         from 'gulp-append-prepend';
import gulp        from 'gulp';
import mergeStream from 'merge-stream';
import rename      from 'gulp-rename';
import replace     from 'gulp-replace';
import size        from 'gulp-size';
import { readFileSync } from 'fs';

// Link information
const linkInfo = {
   youTube: {
      intro:    'jMOZOI-UkNI',
      jquery:   'UU-GebNqdbg',
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
      },
   };

// Setup
const pkg =           JSON.parse(readFileSync('./package.json', 'utf8'));
const released =      process.env.dnaReleasedVersion;
const minorVersion =  pkg.version.split('.').slice(0, 2).join('.');
const websiteTarget = 'website-target';
const transpileES6 =  ['@babel/preset-env', { modules: false }];
const babelMinifyJs = { presets: [transpileES6, 'minify'], comments: false };
const webContext = {
   pkg:          pkg,
   released:     released,
   minorVersion: minorVersion,
   gzipSize:     '9 kb gzip',
   title:        pkg.description,  //default page title
   youTube:      linkInfo.youTube,
   jsFiddle:     linkInfo.jsFiddle
   };

// Tasks
const task = {

   minifyJs() {
      return gulp.src('build/dna.js')
         .pipe(replace(/^export { (.*) };/m, 'if (typeof window === "object") window.$1 = $1;'))
         .pipe(rename({ extname: '.dev.js' }))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest('build'))
         .pipe(babel(babelMinifyJs))
         .pipe(rename('dna.min.js'))
         .pipe(gap.appendText('\n'))
         .pipe(size({ showFiles: true }))
         .pipe(size({ showFiles: true, gzip: true }))
         .pipe(gulp.dest('build'));
      },

   buildWebsite() {
      const cdnDist = `https://cdn.jsdelivr.net/npm/dna.js@${minorVersion}/dist/`;
      const copyStaticFiles = () =>
         gulp.src(['website/static/**', '!website/static/**/*.html', 'website/static/**/.htaccess'])
            .pipe(gulp.dest(websiteTarget));
      const buildHtml = () =>
         gulp.src(['website/static/**/*.html', 'website/root/**/*.html'])
            .pipe(fileInclude({ basepath: '@root', indent: true, context: webContext }))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest(websiteTarget));
      const addVisualSpec = () =>
         gulp.src('spec/visual**.html')
            .pipe(replace('../dist/', cdnDist))
            .pipe(size({ showFiles: true }))
            .pipe(gulp.dest(websiteTarget + '/spec'));
      return mergeStream(copyStaticFiles(), buildHtml(), addVisualSpec());
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

   };

// Gulp
gulp.task('minify-js',     task.minifyJs);
gulp.task('build-website', task.buildWebsite);
gulp.task('update-readme', task.updateReadMe);
