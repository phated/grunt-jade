exports.init = function(grunt) {
  'use strict';

  // External libs.
  var jade = require('jade');
  var jadeRuntimePath = require.resolve('jade/lib/runtime');

  var _ = grunt.util._;

  var exports = {};

  exports.compile = function(src, options, wrapper, filename, filepath) {
    var msg = 'Compiling' + (filepath ? ' ' + filepath : '') + '...';
    grunt.verbose.write(msg);

    var compiled;
    // Catch and log error if compilation fails
    try {
      compiled = jade.compile(src, _.extend({
        filename: filepath // required to use includes
      }, options));
      grunt.verbose.ok();
    } catch (ex) {
      grunt.log.error(ex.toString());
      return;
    }

    var output;

    if (options.client){
      compiled = String(compiled);
      output = wrapper.wrap ? exports.wrap(compiled, wrapper, filename) : compiled;
    } else {
      var locals;
      if(options.locals){
        locals = _.isFunction(options.locals) ? options.locals() : options.locals;
      } else {
        locals = options;
      }
      output = compiled(locals);
    }

    return output;
  };

  exports.wrap = function(compiled, wrapper, filename){
    // Generate path for wrapper template
    var templateFilename =
        wrapper.amd ? 'amd'
      : wrapper.node ? 'node'
      : 'jade-global';
    var templatePath = __dirname + '/../../support/' + templateFilename + '.template';
    // Read in the correct wrapper template
    var template = grunt.file.read(templatePath);
    grunt.verbose.write('Wrapping ' + filename + ' template...');

    var templateOptions = {
      data: {
        filename: filename,
        compiledTemplate: compiled,
        dependencies: wrapper.dependencies
      }
    };

    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, templateOptions);
    grunt.verbose.ok();
    return wrappedTemplate;
  };

  exports.runtime = function(dest, wrapper){
    // Generate path for wrapper template
    var templateFilename =
        wrapper.amd ? 'amd'
      : wrapper.node ? 'node'
      : 'jade-global';
    var templatePath = __dirname + '/../../support/' + templateFilename + '-runtime.template';
    // Read in the correct wrapper template
    var template = grunt.file.read(templatePath);
    var runtime = grunt.file.read(jadeRuntimePath);
    grunt.verbose.write('Wrapping runtime.js...');

    var templateOptions = {
      data: {
        runtime: runtime
      }
    };

    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, templateOptions);
    var filename = wrapper.dependencies ? wrapper.dependencies : 'runtime';
    grunt.file.write(dest + filename + '.js', wrappedTemplate);
    return;
  };

  return exports;
};
