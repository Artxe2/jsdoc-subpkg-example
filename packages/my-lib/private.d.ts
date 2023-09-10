export type NumberType = number
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
export type ABC = A | B | C