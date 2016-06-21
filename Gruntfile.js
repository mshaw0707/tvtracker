module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['public/qa/*.js', 'app.js'],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        freeze: true,
        latedef: true,
        maxdepth: 3,
        nonbsp: true,
        singleGroups: true,
        unused: 'vars',
        browser: true,
        devel: true
      }
    },
    express: {
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development',
        },
      },
      prod: {
        options: {
          script: 'app.js',
          node_env: 'production'
        }
      }
    },
    watch: {
      express: {
        files: ['app.js'],
        tasks: ['jshint', 'express:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.registerTask('default', ['jshint', 'express:dev', 'watch']);
  grunt.registerTask('lint', 'jshint');
};
