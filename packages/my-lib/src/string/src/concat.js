/**
 * @param {ConcatParam[]} strs
 */
export default function concat(...strs) {
	let result = ""
	for (const str of strs) {
		result += str
	}
	return result
}