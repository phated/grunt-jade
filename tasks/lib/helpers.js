exports.init = function(grunt) {
  'use strict';

  // External libs.
  var jade = require('jade');
  var jadeRuntimePath = require.resolve('jade/lib/runtime');

  var _ = grunt.util._;

  var wrapperDefaults = {
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
      dependencies: './runtime'
    },
    none: {
      wrap: false,
      amd: false,
      node: false,
      dependencies: null
    }
  };

  var exports = {};

  exports.templateFilename = function(wrapper){
    if(wrapper.amd){
      return 'amd';
    }

    if(wrapper.node){
      return 'node';
    }

    return 'global';
  };

  exports.wrapper = function(wrap){
    // Return wrapper options for templates (Default to global since that is jade's client defaults)
    if(_.isString(wrap) && wrap in wrapperDefaults){
      return wrapperDefaults[wrap];
    }

    if(_.isObject(wrap)){
      return _.defaults(wrap, wrapperDefaults.global);
    }

    if(_.isBoolean(wrap)){
      return wrap ? wrapperDefaults.global : wrapperDefaults.none;
    }

    return wrapperDefaults.global;
  };

  exports.compile = function(filepath, options, wrapper, filename) {
    var msg = 'Compiling' + (filepath ? ' ' + filepath : '') + '...';

    var src = grunt.file.read(filepath);

    grunt.verbose.write(msg);

    var compiled;
    // Catch and log error if compilation fails
    try {
      compiled = jade.compile(src, _.extend({
        filename: filepath // required to use includes
      }, options));
      grunt.verbose.ok();
    } catch (ex) {
      grunt.fail.warn(ex);
      return;
    }

    var output;

    if (options.client){
      compiled = String(compiled);
      output = wrapper.wrap ? exports.wrap(compiled, wrapper, filename) : compiled;
    } else {
      var locals = _.isFunction(options.locals) ? options.locals() : options.locals;
      output = compiled(locals);
    }

    return output;
  };

  exports.wrap = function(compiled, wrapper, filename){
    var templatePath = __dirname + '/../../support/' + exports.templateFilename(wrapper) + '.template';
    // Read in the correct wrapper template
    var template = grunt.file.read(templatePath);
    grunt.verbose.write('Wrapping ' + filename + ' template...');

    var templateOptions = {
      data: {
        filename: filename,
        compiledTemplate: compiled.replace(/^function anonymous/, 'function '),
        dependencies: wrapper.dependencies
      }
    };

    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, templateOptions);
    grunt.verbose.ok();
    return wrappedTemplate;
  };

  exports.runtime = function(dest, wrapper){
    var templatePath = __dirname + '/../../support/' + exports.templateFilename(wrapper) + '-runtime.template';
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
