export type Bird = {
    no: 1
    fly(): void
}

export type Fish = {
    no: 2
    swim(): void
}

export type Animal = {
    is_live: boolean
} & (
    Bird
    | Fish
)