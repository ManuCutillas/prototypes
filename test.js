'use strict';

/**
 * Run package tests.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');
var Log = require('log');

// globals
var log = new Log('info');


/**
 * Test that a new object is clean: has no functions.
 * Same for string and array.
 */
function testCleanObjects(callback)
{
	var object = {};
	for (var key in object)
	{
		testing.fail('New object has attribute %s', key, callback);
	}
	var string = '';
	for (key in string)
	{
		testing.fail('New string has attribute %s', key, callback);
	}
	testing.success(callback);
}

/**
 * Run all module tests.
 */
exports.test = function(callback)
{
	log.debug('Running tests');
	var tests = {
		cleanObjects: testCleanObjects,
	};
	var libs = [ 'string', 'object' ];
	libs.forEach(function(lib)
	{
		tests[lib] = require('./lib/' + lib + '.js').test;
	});
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

