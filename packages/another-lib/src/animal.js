/** @param {import("../private.js").Animal} animal */
export default (animal) => {
	if (animal.no == 1) {
		animal.fly()
	}
	if (is_fish(animal)) {
		animal.swim()
	}
}

/**
 * @param {import("../private.js").Animal} animal
 * @return {animal is import("../private.js").Fish}
 */
function is_fish(animal) {
	return /** @type {import("../private.js").Fish} */(animal).swim != void 0
}