// dna.js Semantic Templates
// gulp configuration and tasks

var gulp =     require('gulp');
var header =   require('gulp-header');
var w3cjs =    require('gulp-w3cjs');
var htmlhint = require('gulp-htmlhint');
var jshint =   require('gulp-jshint');
var rename =   require('gulp-rename');
var uglify =   require('gulp-uglify');
var replace =  require('gulp-replace');
var size =     require('gulp-filesize');

var pkg = require('./package.json');
var banner = '//dna.js v' + pkg.version + ' ~~ dnajs.org/license.html\n';

var versionPatternStrs = [
   'js v',                      //example: /* dna.js v1.0.0 ~~ dnajs.org/license.html */
   '~~ v',                      //example: // dna.js Semantic Templates ~~ v1.0.0
   '"version":  "',             //example: "version":  "1.0.0",
   'Current release: \\*\\*v',  //example: Current release: **v1.0.0**
   '"release"\\s+value="'       //example: <!--#set var="release" value="1.0.0" -->
   ];
var versionPatterns = new RegExp('(' + versionPatternStrs.join('|') + ')[0-9.]*');

var files = {
    html: ['*.html', 'website/*.html', 'website/httpdocs/*.html'],
    js:   ['dna.js', 'gulpfile.js', 'website/*.js']
    };
var htmlHintConfig = {
    'attr-value-double-quotes': false
    };
var jsHintConfig = {
    undef:  true,
    unused: true,
    predef: ['require', 'navigator', 'window', 'document', 'console', '$', 'jQuery', 'app', 'dna']
    };

function setVersionNumberDev() {
   gulp.src(['dna.js', 'dna.css'])
      .pipe(replace(versionPatterns, '$1' + pkg.version))
      .pipe(gulp.dest('.'));
   }

function setVersionNumberProd() {
   gulp.src(['bower.json', 'README.md', 'website/dsi/~begin.fhtml'])
      .pipe(replace(versionPatterns, '$1' + pkg.version))
      .pipe(gulp.dest('.'));
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
   gulp.src('dna.min.js')
      .pipe(size());
   }

function runHtmlChecks() {
    gulp.src(files.html)
        .pipe(w3cjs())
        .pipe(w3cjs.reporter());
    gulp.src(files.html)
        .pipe(htmlhint(htmlHintConfig))
        .pipe(htmlhint.reporter());
   }

gulp.task('jshint',  runJsHint);
gulp.task('uglify',  runUglify);
gulp.task('html',    runHtmlChecks);
gulp.task('dev',     setVersionNumberDev);
gulp.task('prod',    setVersionNumberProd);
gulp.task('default', ['dev', 'jshint', 'uglify']);
gulp.task('release', ['prod']);
gulp.task('web',     ['html']);
