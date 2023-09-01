/** @param {ABC} abc */
export default function(abc) {
	if (abc.type == "A") return abc.a()
	if (abc.type == "B") return abc.b()
	return abc.c()
}