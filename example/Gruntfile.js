'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jade: {
      dev: {
        files: {
          'templates/dev/': ['templates/src/*.jade']
        },
        options: {
          compileDebug: true
        },
        wrapper: {
          amd: true,
          dependencies: 'jade'
        }
      },
      no_amd: {
        files: {
          'templates/no_amd/': ['templates/src/*.jade']
        },
        options: {
          compileDebug: true
        },
        wrapper: {
          amd: false
        }
      },
      dist: {
        files: {
          'templates/dist/': ['templates/src/*.jade']
        },
        wrapper: {
          amd: true,
          dependencies: 'jade'
        }
      },
      html: {
        files: {
          'templates/html/': ['templates/src/*.jade']
        },
        options: {
          client: false
        }
      },
      no_runtime: {
        files: {
          'templates/no_runtime/': ['templates/src/*.jade']
        },
        options: {
          runtime: false
        }
      },
      no_options: {
        files: {
          'templates/no_options/': ['templates/src/*.jade']
        }
      },
      no_wrap_no_amd: {
        files: {
          'templates/no_wrap_no_amd/': ['templates/src/*.jade']
        },
        wrapper: {
          amd: false,
          wrap: false
        }
      },
      node: {
        files: {
          'templates/node/': ['templates/src/*.jade']
        },
        wrapper: {
          node: true,
          dependencies: 'runtime'
        }
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Default task.
  grunt.registerTask('default', ['jade']);

};
