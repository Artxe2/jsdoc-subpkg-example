# How to configure JSDoc instead of TypeScript

A few months ago, there was a something issue in the JavaScript ecosystem.
It was the migration of Svelte's codebase from TypeScript to JavaScript.
Yes, it's not a typo.
Svelte, during its version 3 to 4 upgrade, was rewritten in JavaScript, and the existing TypeScript code was pushed to the `version-3` branch.
Despite significant concerns from the Svelte community about this decision made by Rich Harris and the Svelte team, two months have passed since the release of Svelte 4, and they have proven their choice to be right.
In this article, we will explore how to create an NPM package that provides subpath modules using JSDoc and how it significantly enhances Developer Experience.

## Example
It seems difficult to explain multiple pieces of source code in text alone, so I've prepared StackBlitz and Github links.
I was trying to attach StackBlitz using DEV.to's embed, but I encountered a `Failed to boot WebContainer` error.
### StackBlitz
[https://stackblitz.com/edit/github-p9xwsc?file=package.json](https://stackblitz.com/edit/github-p9xwsc?file=package.json)
### Github
[https://github.com/Artxe2/jsdoc-subpkg-example]
(https://github.com/Artxe2/jsdoc-subpkg-example)

## Code analysis
Starting from the `package.json` file located in the project root, let's quickly go over the important sections.

```js
// ./package.json
  "scripts": {
    "dts": "pnpm -r dts",
    "lint": "tsc && eslint --fix .",
    "test": "vitest run"
  },
```
In the `package.json` file, there are three scripts.
`dts` is used for generating `.d.ts` files using JSDoc, `lint` performs coding convention checks, and `test` is used for running tests.

```yaml
// ./pnpm-workspace.yaml
packages:
  - 'packages/*'
```
The `pnpm-workspace.yaml` file is a configuration file used for managing local packages.

```js
// ./tsconfig.json
    "module": "ES6",
    "moduleResolution": "Node",
    "noEmit": true,
```
In the `tsconfig.json` file, the `module` and `moduleResolution` options are set to `ES6` and `Node`, respectively, for compatibility checking.
Additionally, the `noEmit` option is set to `true` to perform type checking only when running the `pnpm lint` command.

```js
// ./.eslintrc.json
  "ignorePatterns": ["**/@types/**/*.d.ts"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
```
Files within the `@types` folder are automatically generated, so they are excluded from eslint checks.

In the `syntax` and `test` folders, files are created for type checking and testing purposes. The library packages are located under the `packages` folder.

```ts
// ./packages/my-lib/private.d.ts
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
```
Typically, types are written in `private.d.ts`.

```ts
// ./packages/my-lib/public.d.ts
import { Test } from "./type-test/index.js"

export type ConcatParam = string | number | boolean
export type TestArray = Test[]
```
The `public.d.ts` file defines the types to be exported with the `./@types` sub-path.
Since the basic types are provided by JSDoc by default, there will not be much content written in this file in general.
For example, the `Writeable` type of svelte can be defined in two ways as follows.
```js
/** @type {import("svelte/store").Writable<{ title: string, content: string }[]>} */
export const contents$ = writable([])

export const contents$ = writable(
	/** @type {{ title: string, content: string }[]} */([])
)
```

```js
// ./packages/my-lib/package.json
  "exports": {
    ".": {
      "default": "./src/index.js",
      "types": "./@types/index.d.ts"
    },
    "./math": {
      "default": "./src/math/index.js",
      "types": "./@types/math/index.d.ts"
    },
    "./string": {
      "default": "./src/string/index.js",
      "types": "./@types/string/index.d.ts"
    },
    "./type-test": {
      "default": "./src/type-test/index.js",
      "types": "./@types/type-test/index.d.ts"
    },
  "./@types": "./public.d.ts"
  },
  "typesVersions": {
    "*": {
      "*": ["@types/index.d.ts"],
      "math": ["@types/math/index.d.ts"],
      "string": ["@types/string/index.d.ts"],
      "type-test": ["@types/type-test/index.d.ts"],
      "@types": ["public.d.ts"]
    }
  },
```
To define subpath modules in the library, we need several options in the `package.json` file.
If the user set `moduleResolution` to `Node16` or `NodeNext` in `tsconfig.json`, the `exports` option alone is sufficient.
However, for users who don't have this configuration, we also need to set the `typesVersions` option.

```js
// ./packages/my-lib/tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "checkJs": true,
    "declaration": true,
    "declarationDir": "@types",
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "Node16",
    "outDir": "silences wrong TS error, we don't compile, we only typecheck",
    "rootDir": "src",
    "skipLibCheck": true,
    "strict": true,
    "target": "ESNext"
  },
}
```
In order to use JSDoc in a project, we need to set `allowJs` and `checkJs` to `true`.
The `outDir` option is configured in the `tsconfig.json` file to suppress error messages.
If you additionally configure the `declaration`, `declarationDir`, `declarationMap`, and `emitDeclarationOnly` options, you can use the tsc command to analyze JSDoc and generate `d.ts` and `d.ts.map` files in the `@types` folder.
Setting the `module` option to `Node16` offers several convenient benefits when using JSDoc.
Because `d.ts` files are placed in the root directory of the package and used as relative paths, we set the `rootDir` to `src` to match the relative path levels of the js source and automatically generated `d.ts` files

## JSDoc
TypeScript provides static type checking to help developers identify potential errors in their code ahead of time.
However, you can introduce JSDoc into an existing JavaScript project without starting from scratch, reaping the benefits.
By using JSDoc to specify type information for variables, functions, classes, and more, TypeScript can also utilize this information for type checking.

```js
/** @param {import("../../../private.js").ABC} abc */
export default function(abc) {
  if (abc.type == "A") return abc.a()
  if (abc.type == "B") return abc.b()
  return abc.c()
}
```
You can apply types using tags such as `@type`, `@param`, `@return`, and similar, features like type guards are also supported without any issues.
Moreover, setting the `module` option in `tsconfig.json` to `NodeNext` enables you to use types written in `d.ts` files that do not include `export` statements without any issues.

```js
// js source
/**
 * @param {import("../../../public.js").ConcatParam[]} strs
 */
export default function concat(...strs) {
	let result = ""
	for (const str of strs) {
		result += str
	}
	return result
}
```
```ts
// auto-generated d.ts
/**
 * @param {import("../../../public.js").ConcatParam[]} strs
 */
export default function concat(...strs: import("../../public.js").ConcatParam[]): string;
//# sourceMappingURL=concat.d.ts.map
```
Since JSDoc `import`` statements are written using relative paths, it is important to match the relative paths of the automatically generated dts files.

```js
// js source
/** @typedef {string | number} ConcatParam */
/**
 * @param {ConcatParam[]} strs
 */
export default function concat(...strs) {
	let result = ""
	for (const str of strs) {
		result += str
	}
	return result
}
```
```ts
// auto-generated d.ts
/** @typedef {string | number} ConcatParam */
/**
 * @param {ConcatParam[]} strs
 */
export default function concat(...strs: ConcatParam[]): string;
export type ConcatParam = string | number;
//# sourceMappingURL=concat.d.ts.map
```
Do not use `@typedef` as it is not well-supported with `d.ts` files.

## Conclusion
We have covered in detail how to create an npm package using JSDoc, including the subpath module.
As seen in the example project, VSCode and TypeScript provide excellent support for JSDoc.
My impression of JSDoc is that it effectively separates types and source code, which contributes to improving TypeScript's performance.
JSDoc indeed offers the convenience of providing types while keeping the source code in pure JavaScript.
Some people argue that comments should only serve as comments and should not affect the logic.
However, JSDoc essentially functions as comments and does not impact the logic directly.
It serves as a helpful tool for documenting and adding type information to JavaScript code, making it easier to understand and maintain while not altering the code's behavior.
To wrap things up, I'd like to share a YouTube video titled "CREATOR OF SVELTE From TS TO JSDoc??" with you.

Thank you.
[\[YouTube\] CREATOR OF SVELTE From TS TO JSDoc??](https://www.youtube.com/watch?v=zPOHY-cZ1w)