import { Test, generic, importType, typeTest } from "my-lib/type-test"

const test = new Test("asd")

generic({})

importType(test)


typeTest({ type: "A", a: () => "" })