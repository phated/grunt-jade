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

exports['jade-base_path'] = function (test){
  'use strict';

  test.expect(2);

  var actual, expected;

  // NEW - Test the runtime output
  actual = grunt.file.read('tmp/new/jade-base_path/runtime.js');
  expected = grunt.file.read('test/fixtures/base_path/runtime_expected.js');
  test.equal(actual, expected, 'should generate a global module for the runtime');
  // NEW - Test helloworld.jade output
  actual = grunt.file.read('tmp/new/jade-base_path/fixtures/helloworld.js');
  expected = grunt.file.read('test/fixtures/base_path/helloworld_expected.js');
  test.equal(actual, expected, 'should generate a non-wrapped module for the template in the fixtures directory');

  test.done();
};
