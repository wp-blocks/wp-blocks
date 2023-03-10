# wp-blocks

A monorepo of tools and blocks for the WordPress [Gutenberg](https://github.com/WordPress/gutenberg) editor.

## What is this?

A collection of Gutenberg blocks and utilities built using TypeScript.

Included are detailed examples of how to configure block plugins using TypeScript.

## Getting started

This project uses `pnpm` to manage dependencies and `turbo` to orchestrate the build process of the packages in the monorepo.

```sh
git clone https://github.com/wp-blocks/wp-blocks.git
cd wp-blocks
pnpm install
pnpm build
pnpm wp-env:start
```

See [`wp-env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) for details and requirements of usage.

## Project structure

```sh
examples/ # example plugins and blocks, detailing how to use deferent aspects of the Gutenberg APIs
packages/ # published and internal packages of wp-blocks
scripts/  # internal build scripts
```

[`wp-scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) as used as much as possible to keep the build process similar to Gutenberg, though some packages use custom build scripts that are internal to `wp-blocks`.

The linting and formatting are also similar to Gutenberg, most of the modification are for linting TypeScript.

## Gutenberg APIs and TypeScript

Currently Gutenberg's support of TypeScript is incomplete. Some packages provide their own types while others are available from Definitely Typed (though some are outdated). To complicated it further, some packages use ambiguous types like `Object` or `any`, which makes property access difficult in TypeScript without a lot of type guards or type assertions.

The answer to this issue to for all `@wordpress` packages to provide their own explicit type. Though this will be difficult. Support for TypeScript in the WordPress community is tepid and the code base wasn't written with typing in mind. In the meantime this project patches the types where necessary in the `types` directory.

## License

`wp-blocks` is free software, and is released under the terms of the GNU General Public License version 3. See [LICENSE.md](LICENSE.md) for complete license.
