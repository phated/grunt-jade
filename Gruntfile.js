module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // These definitions are getting very large so I moved them to another file
    jade: require('./support/taskDefinitions'),
    clean: [
      'tmp/',
      'example/output/'
    ],
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tasks %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    nodeunit: {
      tasks: [
        'test/**/*_test.js'
      ]
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jade', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};
