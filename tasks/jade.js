/*
 * grunt-jade
 * https://github.com/phated/grunt-jade
 *
 * Copyright (c) 2012 Blaine Bublitz
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  var jade = require('jade')
    , path = require('path')
    , jadeRuntimePath = require.resolve('jade/lib/runtime');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('jade', 'Your task description goes here.', function() {
    // Options object for jade
    var options = grunt.utils._.extend({
      client: true,
      runtime: true,
      compileDebug: false
    }, this.data.options);

    var wrapper = grunt.utils._.extend({
      wrap: true,
      amd: false,
      dependencies: ''
    }, this.data.wrapper);

    // Reference to the dest dir
    var dest = path.normalize(this.file.dest + '/')
      , files = grunt.file.expandFiles(this.file.src);

    // Make the dest dir if it doesn't exist
    grunt.file.mkdir(dest);

    // Loop through all files and write them to files
    files.forEach(function(filepath) {
      var fileExtname = path.extname(filepath)
        , src = grunt.file.read(filepath)
        , outputFilename = path.basename(filepath, fileExtname)
        , outputExtension = options.client ? '.js' : '.html'
        , outputFilepath = dest + outputFilename + outputExtension
        , compiled = grunt.helper('compile', src, options, wrapper, outputFilename, filepath);
      grunt.file.write(outputFilepath, compiled);
    });

    if(options.client && options.runtime){
      grunt.helper('runtime', dest, wrapper);
    }

  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('compile', function(src, options, wrapper, filename, extraMsg) {
    var msg = 'Compiling' + (extraMsg ? ' ' + extraMsg : '') + '...';
    grunt.verbose.write(msg);
    var compiled = jade.compile(src, options);
    grunt.verbose.ok();
    var output;
    // Was compilation successful?
    if(compiled){
      // Are we writing JS?
      if(options.client){
        compiled = String(compiled);
        // Are we wrapping it?
        if(wrapper.wrap){
          output = grunt.helper('wrap', compiled, wrapper, filename);
        } else {
          output = compiled;
        }
      } else {
        // Spit out
        output = compiled(options);
      }
    }
    return output;
  });

  grunt.registerHelper('wrap', function(compiled, wrapper, filename){
    // Generate path for wrapper template
    var templatePath = __dirname + '/../support/' + (wrapper.amd ? 'amd' : 'no-amd') + '.template';
    // Read in the correct wrapper template
    var template = grunt.file.read(templatePath);
    grunt.verbose.write('Wrapping ' + filename + ' template...');
    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, {
      compiledTemplate: compiled,
      filename: filename,
      dependencies: wrapper.dependencies
    });
    grunt.verbose.ok();
    return wrappedTemplate;
  });

  grunt.registerHelper('runtime', function(dest, wrapper){
    // Generate path for wrapper template
    var templatePath = __dirname + '/../support/' + (wrapper.amd ? 'amd' : 'no-amd') + '-runtime.template';
    // Read in the correct wrapper template
    var template = grunt.file.read(templatePath);
    var runtime = grunt.file.read(jadeRuntimePath);
    grunt.verbose.write('Wrapping runtime.js...');
    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, {
      runtime: runtime
    });
    var filename = wrapper.dependencies ? wrapper.dependencies : 'runtime';
    grunt.file.write(dest + filename + '.js', wrappedTemplate);
    return;
  });

};
