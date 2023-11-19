import { assert, describe, it } from "vitest"

import { typeTest } from "my-lib/type-test"

describe(
	"type_test",
	() => {
		it(
			"type A test",
			() => {
				assert.equal(
					typeTest({ type: "A", a: () => "aa" }),
					"aa"
				)
			}
		)
		it(
			"type Btest",
			() => {
				assert.equal(
					typeTest({ type: "B", b: () => "bb" }),
					"bb"
				)
			}
		)
		it(
			"type C test",
			() => {
				assert.equal(
					typeTest({ type: "C", c: () => "cc" }),
					"cc"
				)
			}
		)
	}
)