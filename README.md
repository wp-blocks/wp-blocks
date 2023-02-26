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

## License

`wp-blocks` is free software, and is released under the terms of the GNU General Public License version 3. See [LICENSE.md](LICENSE.md) for complete license.
