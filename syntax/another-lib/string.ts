import { ConcatParam } from "my-lib/@types"
import { concat } from "another-lib"

const params: ConcatParam[] = ["a", "b", "c", 1, 2, 3, true, false]

concat(...params)