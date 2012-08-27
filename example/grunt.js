module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jade: {
      dev: {
        src: ['templates/src/*.jade'],
        dest: 'templates/dev',
        options: {
          compileDebug: true
        },
        wrapper: {
          amd: true,
          dependencies: 'jade'
        }
      },
      no_amd: {
        src: ['templates/src/*.jade'],
        dest: 'templates/no_amd',
        options: {
          compileDebug: true
        },
        wrapper: {
          amd: false
        }
      },
      dist: {
        src: ['templates/src/*.jade'],
        dest: 'templates/dist/',
        wrapper: {
          amd: true,
          dependencies: 'jade'
        }
      },
      html: {
        src: ['templates/src/*.jade'],
        dest: 'templates/html/',
        options: {
          client: false
        }
      },
      no_runtime: {
        src: ['templates/src/*.jade'],
        dest: 'templates/no_runtime/',
        options: {
          runtime: false,
        }
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('../tasks');

  // Default task.
  grunt.registerTask('default', 'jade');

};
