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

    // Make the dest dir if it doesn't exist
    grunt.file.mkdir(this.file.dest);

    // Loop through all files and write them to files
    this.file.src.forEach(function(filepath) {
      var
        fileExtname = path.extname(filepath),
        src = grunt.file.read(filepath),
        outputFilename = path.basename(filepath, fileExtname),
        outputExtension = options.client ? '.js' : '.html',
        outputFilepath = path.join(this.file.dest, outputFilename + outputExtension),
        compiled = helpers.compile(src, options, wrapper, outputFilename, filepath);

      // Write the destination file.
      grunt.file.write(outputFilepath, compiled);

      // Print a success message.
      grunt.log.writeln('File "' + outputFilepath.cyan + '" created.');
    }.bind(this));

    if(options.client && options.runtime){
      helpers.runtime(this.file.dest, wrapper);
    }

  });

};
