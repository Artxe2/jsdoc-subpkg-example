import {
	assert,
	describe,
	it
} from "vitest"

import { typeTest as type_test } from "my-lib/type-test"

describe(
	"type_test",
	() => {
		it(
			"type A test",
			() => {
				assert.equal(type_test({
					type: "A",
					a: () => "aa" 
				}), "aa")
			}
		)
		it(
			"type Btest",
			() => {
				assert.equal(type_test({
					type: "B",
					b: () => "bb" 
				}), "bb")
			}
		)
		it(
			"type C test",
			() => {
				assert.equal(type_test({
					type: "C",
					c: () => "cc" 
				}), "cc")
			}
		)
	}
)