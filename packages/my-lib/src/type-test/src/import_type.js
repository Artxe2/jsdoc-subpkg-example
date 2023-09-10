/** @param {import("./class_type.js").Test} test */
export default test => {
	return test.field === test.func()
}