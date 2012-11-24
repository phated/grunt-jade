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
      compileDebug: false,
      extension: null,
      locals: {},
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

    var outputExtension = (options.extension !== null)? options.extension
                                                      : (options.client? '.js' : '.html');

    // Loop through all files and write them to files
    files.forEach(function(filepath) {
      var fileExtname = path.extname(filepath)
        , src = grunt.file.read(filepath)
        , outputFilename = path.basename(filepath, fileExtname)
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

  grunt.registerHelper('compile', function(src, options, wrapper, filename, filepath) {

    var msg = 'Compiling' + (filepath ? ' ' + filepath : '') + '...';
    grunt.verbose.write(msg);

    var compiled = jade.compile(src, grunt.utils._.extend({
      filename: filepath // required to use includes
    }, options));

    grunt.verbose.ok();

    // Was compilation successful?
    if (!compiled) {
      return;
    }

    var output;

    if (options.client){
      compiled = String(compiled);
      output = wrapper.wrap? grunt.helper('wrap', compiled, wrapper, filename) : compiled;
    } else {
      var locals = grunt.utils._.isFunction(options.locals)? options.locals() : options.locals;
      output = compiled(locals);
    }

    return output;
  });

  grunt.registerHelper('wrap', function(compiled, wrapper, filename){
    // Generate path for wrapper template
    var templateFilename =
        wrapper.amd ? 'amd'
      : wrapper.node ? 'node'
      : 'jade-global';
    var templatePath = __dirname + '/../support/' + templateFilename + '.template';
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
    var templateFilename =
        wrapper.amd ? 'amd'
      : wrapper.node ? 'node'
      : 'jade-global';
    var templatePath = __dirname + '/../support/' + templateFilename + '-runtime.template';
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
