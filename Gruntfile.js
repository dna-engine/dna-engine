// dna.js Semantic Templates
// Grunt configuration and tasks

function gruntRunner(grunt) {
   var versionPatterns = '(~~ v)|(js v)|(release: \\*\\*v)|("version":\\s*")|("release"\\s+value=")';
   // Example lines with pattern:
   //    dna.js Semantic Templates ~~ v1.0.0
   //    "version":  "1.0.0",
   //    Current release: **v1.0.0**
   //    "release" value="1.0.0 (beta)"
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      version: {
         dev: {
            options: { prefix: versionPatterns },
            src: ['dna.js', 'dna.css'],
            },
         release: {
            options: { prefix: versionPatterns },
            src: ['bower.json', 'README.md', 'website/dsi/~begin.fhtml'],
            },
         },
      jshint: {
         myFiles: ['dna.js', 'Gruntfile.js']
         },
      uglify: {
         options: {
            banner: '//dna.js v<%=pkg.version%> ~~ dnajs.org/license.html\n'
            },
         build: {
            src:  'dna.js',
            dest: 'dna.min.js'
            }
         }
      });
   require('load-grunt-tasks')(grunt);
   grunt.registerTask('default', ['version:dev', 'jshint', 'uglify']);
   grunt.registerTask('release', ['version:release']);
   }

module.exports = gruntRunner;
