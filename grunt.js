module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
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
        es5: true
      },
      globals: {}
    },
    jade: {
      dev: {
        src: ['templates/src/*.jade'],
        dest: 'templates/dev',
        options: {
          development: true,
          amd: 'jade'
        }
      },
      no_amd: {
        src: ['templates/src/*.jade'],
        dest: 'templates/no_amd',
        options: {
          development: true
        }
      },
      dist: {
        src: ['templates/src/*.jade'],
        dest: 'templates/dist/',
        options: {
          amd: 'jade'
        }
      },
      html: {
        src: ['templates/src/*.jade'],
        dest: 'templates/html/',
        options: {
          client: false
        }
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
