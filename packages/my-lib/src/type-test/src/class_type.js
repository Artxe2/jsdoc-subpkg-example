export class Test {
	/** @type {string} */
	field
	/** @param {string} field */
	constructor(field) {
		this.field = field
	}
	func() {
		return this.field
	}
}