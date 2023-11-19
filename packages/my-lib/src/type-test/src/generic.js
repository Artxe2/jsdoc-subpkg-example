/**
 * @template {Record<string, *>} T
 * @param {T} abc
 * @returns {[T, T]}
 */
export default function(abc) {
	return [ abc, abc ]
}