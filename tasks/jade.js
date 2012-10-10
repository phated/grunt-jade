/*
 * grunt-jade
 * https://github.com/phated/grunt-jade
 *
 * Copyright (c) 2012 Blaine Bublitz
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  var helpers = require('./lib/helpers').init(grunt);

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('jade', 'Compile your Jade templates', function() {
    // Options object for jade
    var options = this.options({
      client: true,
      runtime: true,
      compileDebug: false
    });

    var wrapper = grunt.util._.extend({
      wrap: true,
      amd: false,
      dependencies: ''
    }, this.data.wrapper);

    // Loop through all files and write them to files
    this.files.forEach(function(fileObj) {
      // Reference to the dest dir
      var dest = path.normalize(fileObj.dest + '/');
      // Make the dest dir if it doesn't exist
      grunt.file.mkdir(dest);

      var files = grunt.file.expandFiles(fileObj.src);

      files.forEach(function(filepath){
        var fileExtname = path.extname(filepath);
        var src = grunt.file.read(filepath);
        var outputFilename = path.basename(filepath, fileExtname);
        var outputExtension = options.client ? '.js' : '.html';
        var outputFilepath = dest + outputFilename + outputExtension;
        var compiled = helpers.compile(src, options, wrapper, outputFilename, filepath);
        grunt.file.write(outputFilepath, compiled);
      });

      if(options.client && options.runtime){
        helpers.runtime(dest, wrapper);
      }
    });

  });

};
