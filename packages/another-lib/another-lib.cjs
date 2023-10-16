'use strict';

/**
 * @param {import("my-lib/@types").ConcatParam[]} strs
 */
function concat(...strs) {
	let result = "";
	for (const str of strs) {
		result += str;
	}
	return result
}

exports.concat = concat;
