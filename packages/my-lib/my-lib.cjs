'use strict';

/**
 * @param {import("../../../private.js").NumberType} a
 * @param {import("../../../private.js").NumberType} b
 */
function add(a, b) {
	return a + b
}

/**
 * @param {import("../../../private.js").NumberType} a
 * @param {import("../../../private.js").NumberType} b
 */
function multiply(a, b) {
	return a * b
}

/** @typedef {number | string} NumberString */

/**
 * @param {import("../../../public.js").ConcatParam[]} strs
 */
function concat(...strs) {
	let result = "";
	for (const str of strs) {
		result += str;
	}
	return result
}

exports.add = add;
exports.concat = concat;
exports.multiply = multiply;
