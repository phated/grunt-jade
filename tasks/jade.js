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
  var _ = grunt.util._;

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('jade', 'Compile your Jade templates', function() {
    /**
     * Default options that are expected inside the jade task
     *
     * @static
     * @type Object
     */
    var defaults = {
      /**
       * Passed to jade.compile to determine if jade is returing HTML or JS
       *
       * @static
       * @memberOf defaults
       * @type Boolean
       */
      client: true,
      runtime: true,
      compileDebug: false,
      extension: null,
      wrap: null,
      locals: null,
      basePath: null
    };

    var wrappers = {
      amd: {
        wrap: true,
        amd: true,
        node: false,
        dependencies: 'runtime'
      },
      global: {
        wrap: true,
        amd: false,
        node: false,
        dependencies: null
      },
      node: {
        wrap: true,
        amd: false,
        node: true,
        dependencies: 'runtime'
      },
      none: {
        wrap: false,
        amd: false,
        node: false,
        dependencies: null
      }
    };

    // Options object for jade
    var options = this.options(defaults);
    // Wrapper options for templates (Default to global since that is jade's client defaults)
    var wrapperKey = _.isString(options.wrap) ? options.wrap : 'global';
    var wrapper;
    if(_.isObject(options.wrap)){
      wrapper = options.wrap;
    } else {
      wrapper = this.data.wrapper || {};
    }
    wrapper = _.extend(wrappers[wrapperKey], wrapper);

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
        console.log(filepath);
        var fileExtname = path.extname(filepath);
        var src = grunt.file.read(filepath);
        var outputFilename = path.basename(filepath, fileExtname);
        var outputDirectory = options.basePath ? path.dirname(path.relative(options.basePath, filepath)) + '/' : '';
        var outputFilepath = dest + outputDirectory + outputFilename + outputExtension;
        var compiled = helpers.compile(src, options, wrapper, outputFilename, filepath);
        grunt.file.write(outputFilepath, compiled);
      });

      if(options.client && options.runtime){
        helpers.runtime(dest, wrapper);
      }
    });

  });

};
