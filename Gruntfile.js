module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jade: {
      node: {
        files: {
          'tmp/jade-node/': ['test/fixtures/**/*.jade']
        },
        options: {},
        wrapper: {
          node: true,
          dependencies: 'runtime'
        }
      }
    },
    clean: {
      test: ['tmp/**/'],
      examples: ['example/templates/**/', '!example/templates/', '!example/templates/src/']
    },
    jshint: {
      all: ['Gruntfile.js', 'example/Gruntfile.js', 'tasks/**/*.js', '<config:nodeunit.tasks>'],
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
        laxcomma: true,
        globalstrict: true,
        globals: {}
      }
    },
    watch: {
      files: '<config:jshint.all>',
      tasks: 'default'
    },
    nodeunit: {
      tasks: ['test/**/*_test.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean:test', 'jade', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};
