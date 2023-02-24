# tsconfig

> Shared [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for `@wp-block` projects

## Install

```sh
npm install --save-dev @wp-block/tsconfig
```

*This config requires TypeScript 4.9 or later.*

## Usage

`tsconfig.json`

```json
{
	"extends": "@wp-block/tsconfig",
	"compilerOptions": {
		"outDir": "build"
	},
  "include": ["src"]
}
```

When you are targeting a higher version of Node.js, check the relevant ECMAScript version and add it as `target`:

```json
{
	"extends": "@wp-block/tsconfig",
	"compilerOptions": {
		"outDir": "build",
		"target": "ES2021"
	}
}
```
