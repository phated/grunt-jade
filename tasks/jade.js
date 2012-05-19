/*
 * grunt-jade
 * https://github.com/phated/grunt-jade
 *
 * Copyright (c) 2012 Blaine Bublitz
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  var jade = require('jade')
    , normalize = require('path').normalize;

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('jade', 'Your task description goes here.', function() {
    // hugz to rix for this regex
    var jadeFileRegex = /([a-zA-Z0-9\-\.\_]*)\.jade/;

    // Options object for jade
    var options = {
      client: typeof this.data.options.client !== 'undefined' ? this.data.options.client : true,
      compileDebug: this.data.options.development || false,
      amd: this.data.options.amd || ''
    };

    // Reference to the dest dir
    var dest = normalize(this.file.dest + '/')
      , files = grunt.file.expandFiles(this.file.src);

    // Make the dest dir if it doesn't exist
    grunt.file.mkdir(dest);

    // Loop through all files and write them to files
    files.forEach(function(filepath) {
      var outputFilename = filepath.match(jadeFileRegex)[1].replace('-', '_')
        , outputFilepath
        , compiled;
      if(options.client){
        outputFilepath = dest + outputFilename + '.js';
      } else {
        outputFilepath = dest + outputFilename + '.html';
      }
      compiled = grunt.helper('compile', grunt.file.read(filepath), options, outputFilename, filepath);
      grunt.file.write(outputFilepath, compiled);
    });
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('compile', function(src, options, filename, extraMsg) {
    var msg = 'Compiling' + (extraMsg ? ' ' + extraMsg : '') + '...';
    grunt.verbose.write(msg);
    var compiled = jade.compile(src, options);
    if(compiled){
      if(options.client){
        compiled = String(compiled);
        if(options.amd){
          grunt.verbose.ok();
          return grunt.helper('wrap-amd', compiled, options.amd, filename);
        } else {
          grunt.verbose.ok();
          return grunt.helper('wrap-no-amd', compiled, filename);
        }
      } else {
        grunt.verbose.ok();
        return compiled(options);
      }
    }
    return;
  });

  grunt.registerHelper('wrap-no-amd', function(compiled, filename){
    var header = '(function(){jade.templates.' + filename + ' = '
      , footer = '})();';
    return header + compiled + footer;
  });

  grunt.registerHelper('wrap-amd', function(compiled, amd, filename){
    var header = 'define(["' + amd + '"], function(jade) {\nreturn '
      , footer = ';\n});';
    return header + compiled + footer;
  });

};
