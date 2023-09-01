import {
	assert, describe, it 
} from "vitest"
import { add } from "my-lib/math"
import { add as _add } from "my-lib"

describe(
	"add",
	() => {
		it(
			"add",
			() => {
				assert.equal(5, add(2, 3))
			}
		)
		it(
			"root === sub",
			() => {
				assert.equal(add, _add)
			}
		)
	}
)