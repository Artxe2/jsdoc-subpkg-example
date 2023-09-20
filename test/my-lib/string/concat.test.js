import { assert, describe, it } from "vitest"
import { concat } from "my-lib/string"
import { concat as _concat } from "my-lib"

describe(
	"concat",
	() => {
		it(
			"concat number",
			() => {
				assert.equal("123", concat(1, 2, 3))
			}
		)
		it(
			"concat string",
			() => {
				assert.equal("abc", concat("a", "b", "c"))
			}
		)
		it(
			"root === sub",
			() => {
				assert.equal(concat, _concat)
			}
		)
	}
)