module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    // These definitions are getting very large so I moved them to another file
    jade: require('./support/taskDefinitions'),
    clean: ['tmp/', 'example/output/'],
    lint: {
      files: ['grunt.js', 'example/grunt.js', 'tasks/**/*.js', '<config:nodeunit.tasks>']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        laxcomma: true
      },
      globals: {}
    },
    nodeunit: {
      tasks: ['test/**/*_test.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean jade nodeunit');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
