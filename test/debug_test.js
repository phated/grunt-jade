var grunt = require('grunt');

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

exports['jade-debug'] = function (test){
  'use strict';

  test.expect(4);

  var actual, expected;
  // OLD - Test the runtime output
  actual = grunt.file.read('tmp/old/jade-debug/runtime.js');
  expected = grunt.file.read('test/fixtures/debug/runtime_expected.js');
  test.equal(actual, expected, 'should generate a global module for the runtime');
  // OLD - Test helloworld.jade output
  actual = grunt.file.read('tmp/old/jade-debug/helloworld.js');
  expected = grunt.file.read('test/fixtures/debug/helloworld_expected.js');
  test.equal(actual, expected, 'should generate a global module (with debug) for the template');


  // NEW - Test the runtime output
  actual = grunt.file.read('tmp/new/jade-debug/runtime.js');
  expected = grunt.file.read('test/fixtures/debug/runtime_expected.js');
  test.equal(actual, expected, 'should generate a global module for the runtime');
  // NEW - Test helloworld.jade output
  actual = grunt.file.read('tmp/new/jade-debug/helloworld.js');
  expected = grunt.file.read('test/fixtures/debug/helloworld_expected.js');
  test.equal(actual, expected, 'should generate a global module (with debug) for the template');

  test.done();
};
