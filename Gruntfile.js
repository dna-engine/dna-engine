module.exports = function(grunt) {
   var versionPatterns = '(~~ v)|(js v)|(release: \\*\\*v)|("version":\\s*")|(value="v)';
   // Examples:
   //    dna.js Template Cloner ~~ v1.0.0
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
            src: ['bower.json', 'dna.jquery.json', 'README.md', 'website/^dsi/~begin.fhtml'],
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
   grunt.loadNpmTasks('grunt-version');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.registerTask('default', ['version:dev', 'jshint', 'uglify']);
   grunt.registerTask('release', ['version:release']);
   };
