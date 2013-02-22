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

exports['jade-no_runtime'] = function (test){
  'use strict';

  test.expect(4);

  var actual, expected, runtimeExists;
  // OLD - Test there is no runtime output
  runtimeExists = existsSync('tmp/old/jade-html/runtime.html') || existsSync('tmp/old/jade-html/runtime.js');
  test.equal(runtimeExists, false, 'should NOT generate a module for the runtime');
  // OLD - Test helloworld.jade output
  actual = grunt.file.read('tmp/old/jade-no_runtime/helloworld.js');
  expected = grunt.file.read('test/fixtures/no_runtime/helloworld_expected.js');
  test.equal(actual, expected, 'should generate a global wrapped file for the template');


  // NEW - Test there is no runtime output
  runtimeExists = existsSync('tmp/new/jade-html/runtime.html') || existsSync('tmp/new/jade-html/runtime.js');
  test.equal(runtimeExists, false, 'should NOT generate a module for the runtime');
  // NEW - Test helloworld.jade output
  actual = grunt.file.read('tmp/new/jade-no_runtime/helloworld.js');
  expected = grunt.file.read('test/fixtures/no_runtime/helloworld_expected.js');
  test.equal(actual, expected, 'should generate a global wrapped file for the template');

  test.done();
};
