exports.init = function(grunt) {
  'use strict';

  // External libs.
  var jade = require('jade');
  var jadeRuntimePath = require.resolve('jade/lib/runtime');

  // For 0.3 to 0.4
  var util = grunt.util || grunt.utils;
  var _ = util._;

  var exports = {};

  exports.compile = function(src, options, wrapper, filename, filepath) {
    var msg = 'Compiling' + (filepath ? ' ' + filepath : '') + '...';
    grunt.verbose.write(msg);
    var compiled = jade.compile(src, _.extend({
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
      output = wrapper.wrap ? exports.wrap(compiled, wrapper, filename) : compiled;
    } else {
      var locals;
      if(options.locals){
        locals = grunt.utils._.isFunction(options.locals)? options.locals() : options.locals;
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

    // Pass in the template data directly on options (for 0.3)
    // Pass in the template data as data property on options (for 0.4)
    var templateData = {
      compiledTemplate: compiled,
      filename: filename,
      dependencies: wrapper.dependencies
    };
    var templateOptions = _.extend(templateData, {
      data: _.clone(templateData) // TODO: Do we need to do _.clone here or is a circular ref fine??
    });

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

    // Pass in the template data directly on options (for 0.3)
    // Pass in the template data as data property on options (for 0.4)
    var templateData = {
      runtime: runtime
    };
    var templateOptions = _.extend(templateData, {
      data: _.clone(templateData) // TODO: Do we need to do _.clone here or is a circular ref fine??
    });

    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, templateOptions);
    var filename = wrapper.dependencies ? wrapper.dependencies : 'runtime';
    grunt.file.write(dest + filename + '.js', wrappedTemplate);
    return;
  };

  return exports;
};
