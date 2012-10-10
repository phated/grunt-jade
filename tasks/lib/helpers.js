
'use strict';

// External libs.
var jade = require('jade');
var jadeRuntimePath = require.resolve('jade/lib/runtime');

exports.init = function(grunt) {
  var exports = {};

  exports.compile = function(src, options, wrapper, filename, filepath) {
    var msg = 'Compiling' + (filepath ? ' ' + filepath : '') + '...';
    grunt.verbose.write(msg);
    var compiled = jade.compile(src, grunt.util._.extend({
      filename: filepath // required to use includes
    }, options));
    grunt.verbose.ok();
    var output;
    // Was compilation successful?
    if(compiled){
      // Are we writing JS?
      if(options.client){
        compiled = String(compiled);
        // Are we wrapping it?
        if(wrapper.wrap){
          output = exports.wrap(compiled, wrapper, filename);
        } else {
          output = compiled;
        }
      } else {
        // Spit out
        output = compiled(options);
      }
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
    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, {
      data: {
        compiledTemplate: compiled,
        filename: filename,
        dependencies: wrapper.dependencies
      }
    });
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
    // Compile template with params
    var wrappedTemplate = grunt.template.process(template, {
      data: {
        runtime: runtime
      }
    });
    var filename = wrapper.dependencies ? wrapper.dependencies : 'runtime';
    grunt.file.write(dest + filename + '.js', wrappedTemplate);
    return;
  };

  return exports;
};
