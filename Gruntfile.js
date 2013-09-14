module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jshint: {
      	myFiles: ['dna.js']
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
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.registerTask('default', ['jshint', 'uglify']);
   };
