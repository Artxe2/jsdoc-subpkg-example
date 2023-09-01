/* eslint-disable no-unused-vars */
type NumberType = number
type ConcatParam = string | number | boolean
type A = {
	type: "A",
	a(): string
}
type B = {
	type: "B",
	b(): string
}
type C = {
	type: "C",
	c(): string
}
type ABC = A | B | C