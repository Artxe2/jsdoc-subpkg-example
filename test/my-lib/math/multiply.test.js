import {
	assert, describe, it 
} from "vitest"
import { multiply } from "my-lib/math"
import { multiply as _multiply } from "my-lib"

describe(
	"multiply",
	() => {
		it(
			"multiply",
			() => {
				assert.equal(6, multiply(2, 3))
			}
		)
		it(
			"root === sub",
			() => {
				assert.equal(multiply, _multiply)
			}
		)
	}
)