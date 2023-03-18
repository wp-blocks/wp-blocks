# @wp-blocks/update

## What is this?

Utility to update dependencies on Gutenberg to a specific release.

## When should I use this?

When developing blocks and using `@wordpress` scoped packages, the current versioning scheme does not make managing dependencies on Gutenberg very simple. Especially if you need to target a specific release of Gutenberg. See this [discussion](https://github.com/WordPress/gutenberg/discussions/49140) in the [WordPress/gutenberg](https://github.com/WordPress/gutenberg) repo.


The `@wordpress/scripts` does have command [`packages-update`](https://github.com/WordPress/gutenberg/tree/trunk/packages/scripts#packages-update), though it calls `npm install`, not just adjust the version numbers. This project uses `pnpm` and calling `npm install` is not ideal.

## Usage

```sh
npx wp-update --target 15.1
```
