# @wp-blocks/types

## What is this?

Type declaration patches to DefinitelyTyped WordPress packages.

## When should I use this?

Currently Gutenberg's support of TypeScript is incomplete. Some packages provide their own types while others are available from Definitely Typed (though some are outdated). To complicated it further, some packages use ambiguous types like `Object` or `any`, which makes property access difficult in TypeScript without a lot of type guards or type assertions.

The answer to this issue to for all `@wordpress` packages to provide their own explicit type. Though this will be difficult. Support for TypeScript in the WordPress community is tepid and the code base wasn't written with typing in mind. In the meantime this project patches the types where necessary in the `types` directory.

This package is intended for usage in `wp-blocks` packages, though it could be helpful to others.

## Usage

Install and add this package as a `typesRoot` in your `tsconfig.json`. It needs to be listed before `./node_module/types` to override any `@types/wordpress__*` packages installed.

```json
{
	"compilerOptions": {
		"typesRoots": [
			"./node_modules/@wp-blocks/types",
			"./node_modules/types"
		]
	}
}
```

