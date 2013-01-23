var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
// In Nodejs 0.8.0, existsSync moved from path -> fs.
var existsSync = fs.existsSync || path.existsSync;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['jade-html'] = function (test){
  'use strict';

  test.expect(4);

  var actual, expected, runtimeExists;
  // Test there is no runtime output
  runtimeExists = existsSync('tmp/old/jade-html/runtime.html') || existsSync('tmp/old/jade-html/runtime.js');
  test.equal(runtimeExists, false, 'should NOT generate a module for the runtime');
  // Test helloworld.jade output
  actual = grunt.file.read('tmp/old/jade-html/helloworld.html');
  expected = grunt.file.read('test/fixtures/html/helloworld_expected.html');
  test.equal(actual, expected, 'should generate an HTML file for the template');


  // Test there is no runtime output
  runtimeExists = existsSync('tmp/new/jade-html/runtime.html') || existsSync('tmp/new/jade-html/runtime.js');
  test.equal(runtimeExists, false, 'should NOT generate a module for the runtime');
  // Test helloworld.jade output
  actual = grunt.file.read('tmp/new/jade-html/helloworld.html');
  expected = grunt.file.read('test/fixtures/html/helloworld_expected.html');
  test.equal(actual, expected, 'should generate an HTML file for the template');

  test.done();
};
