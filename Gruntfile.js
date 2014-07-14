module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      version: {
         options: { prefix: '(~~ v)|(js v)|(release: \\*\\*v)|("version":\\s*")' },
         src: ['dna.js', 'README.md', 'bower.json', 'dna.jquery.json'],
         //src: ['dna.js'],
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
   grunt.registerTask('default', ['version', 'jshint', 'uglify']);
   };
