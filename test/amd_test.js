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

exports['jade-amd'] = function (test){
  'use strict';

  test.expect(2);

  var actual, expected;
  // Test the runtime output
  actual = grunt.file.read('tmp/jade-amd/runtime.js');
  expected = grunt.file.read('test/fixtures/amd/runtime_expected.js');
  test.equal(actual, expected, 'should generate an AMD module for the runtime');
  // Test helloworld.jade output
  actual = grunt.file.read('tmp/jade-amd/helloworld.js');
  expected = grunt.file.read('test/fixtures/amd/helloworld_expected.js');
  test.equal(actual, expected, 'should generate an AMD module for the template');

  test.done();
};
