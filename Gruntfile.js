// DNAjs Template Cloner
// Grunt configuration and tasks

function gruntRunner(grunt) {
   var versionPatterns = '(~~ v)|(js v)|(release: \\*\\*v)|("version":\\s*")|(value="v)';
   // Example lines with pattern:
   //    DNAjs Template Cloner ~~ v1.0.0
   //    "version":  "1.0.0",
   //    Current release: **v1.0.0**
   //    value="v1.0.0 (beta)"
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      version: {
         dev: {
            options: { prefix: versionPatterns },
            src: ['dna.js'],
            },
         release: {
            options: { prefix: versionPatterns },
            src: ['bower.json', 'README.md', 'website/^dsi/~begin.fhtml'],
            },
         },
      jshint: {
         myFiles: ['dna.js', 'Gruntfile.js']
         },
      uglify: {
         options: {
            banner: '//DNAjs v<%=pkg.version%> ~~ dnajs.org/license.html\n'
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
