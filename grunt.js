module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jade: {
      node: {
        src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-node/',
        wrapper: {
          node: true,
          dependencies: 'runtime'
        }
      },
      amd: {
        src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-amd/',
        wrapper: {
          amd: true,
          dependencies: 'runtime'
        }
      },
      debug: {
        src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-debug/',
        options: {
          compileDebug: true
        }
      },
      html: {
        src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-html/',
        options: {
          client: false
        }
      },
      no_wrap: {
         src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-no_wrap/',
        wrapper: {
          wrap: false
        }
      },
      no_runtime: {
        src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-no_runtime/',
        options: {
          runtime: false
        }
      },
      custom_extension: {
        src: ['test/fixtures/**/*.jade'],
        dest: 'tmp/jade-custom_extension/',
        options: {
          client: false,
          extension: '.xml'
        }
      }
    },
    clean: ['tmp/'],
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
