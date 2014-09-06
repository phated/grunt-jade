/*
 * grunt-jade
 * https://github.com/phated/grunt-jade
 *
 * Copyright (c) 2013 Blaine Bublitz
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var helpers = require('./lib/helpers').init(grunt);

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('jade', 'Compile your Jade templates', function() {

    var defaults = {
      client: true,
      runtime: true,
      pretty: false,
      compileDebug: false,
      extension: null,
      wrap: null,
      locals: null,
      basePath: null
    };

    // Options object for jade
    var options = this.options(defaults);

    grunt.verbose.writeflags(options, 'Options');

    var wrapper = helpers.wrapper(options.wrap);

    var outputExtension = (options.extension !== null)? options.extension
                                                      : (options.client? '.js' : '.html');
    // Loop through all files and write them to files
    this.files.forEach(function(fileObj) {
      // Reference to the dest dir
      var dest = path.normalize(fileObj.dest + '/');
      // Make the dest dir if it doesn't exist
      grunt.file.mkdir(dest);

      var files = grunt.file.expand({nonull: true}, fileObj.src);

      files.forEach(function(filepath){
        var fileExtname = path.extname(filepath);
        var outputFilename = path.basename(filepath, fileExtname);
        var outputDirectory = options.basePath ? path.dirname(path.relative(options.basePath, filepath)) + '/' : '';
        var outputFilepath = dest + outputDirectory + outputFilename + outputExtension;
        var compiled = helpers.compile(filepath, options, wrapper, outputFilename);
        grunt.file.write(outputFilepath, compiled);
      });

      if(options.client && options.runtime){
        helpers.runtime(dest, wrapper);
      }
    });

  });

};
