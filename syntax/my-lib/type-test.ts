import {
	Test,
	generic,
	importType as import_type,
	typeTest as type_test
} from "my-lib/type-test"

const test = new Test("asd")

generic({})

import_type(test)


type_test({ type: "A", a: () => "" })