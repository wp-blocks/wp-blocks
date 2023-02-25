// import type { BlockAttribute } from '@wordpress/blocks';

type JsonValue =
	| string
	| number
	| boolean
	| { [ x: string ]: JsonValue }
	| JsonValue[];

export type JsonObject = Record< string, JsonValue >;
export type JsonArray = JsonValue[];

export type Config = Required< ProjectConfig & PluginConfig & BlockMetadata >;

/**
 * @public
 */
export interface TemplateConfig {
	/**
	 * This optional field allows overriding file templates related to **the WordPress plugin shell**.
	 * The path points to a location of the template files (nested folders are also supported). When
	 * not set, the tool uses its own set of templates.
	 *
	 * @default `undefined`
	 */
	pluginTemplatesPath?: string;

	/**
	 * This optional field allows overriding file templates related to **the individual block**. The
	 * path points to a location of the template files (nested folders are also supported). When not
	 * set, the tool uses its own set of templates.
	 *
	 * @default `undefined`
	 */
	blockTemplatesPath?: string;

	/**
	 * This setting is useful when your template scaffolds a WordPress plugin that uses static assets
	 * like images or fonts, which should not be processed. It provides the path pointing to the
	 * location where assets are located. They will be copied to the `assets` subfolder in the
	 * generated plugin.
	 *
	 * @default `undefined`
	 */
	assetsPath?: string;

	defaultValues: Config;
}

/**
 * @public
 */
export interface ProjectConfig {
	/**
	 * Enables integration with the `@wordpress/scripts` package and adds common scripts to the `package.json`.
	 *
	 * @default `true`
	 */
	wpScripts: boolean;

	/**
	 * Enables integration with the `@wordpress/env` package and adds the `env` script to the `package.json`.
	 *
	 * @default `false`
	 */
	wpEnv: boolean;

	/**
	 * The list of custom scripts to add to `package.json` . It also allows overriding default scripts.
	 *
	 * @default `{}`
	 */
	customScripts: Record< string, string >;

	/**
	 * The list of remote npm packages to be installed in the project with [`npm install`](https://docs.npmjs.com/cli/v8/commands/npm-install) when `wpScripts` is enabled.
	 *
	 * @default `[]`
	 */
	npmDependencies: string[];

	/**
	 * The list of remote npm packages to be installed in the project with [`npm install --save-dev`](https://docs.npmjs.com/cli/v8/commands/npm-install) when `wpScripts` is enabled.
	 *
	 * @default `[]`
	 */
	npmDevDependencies: string[];

	/**
	 * Allows definition of additional properties for the generated package.json file.
	 *
	 * @default `undefined`
	 */
	customPackageJSON?: JsonObject;
}

/**
 * Plugin header fields ([learn more](https://developer.wordpress.org/plugins/plugin-basics/header-requirements/)):
 *
 * @public
 */
export interface PluginConfig {
	/**
	 * The name of the plugin.
	 *
	 * @default `undefined`
	 */
	plugin?: string;

	/**
	 * The home page of the plugin.
	 *
	 * @default `undefined`
	 */
	pluginURI?: string;

	/**
	 * The current version number of the plugin.
	 *
	 * @default `'0.1.0'`
	 */
	version: string;

	/**
	 * The name of the plugin author(s).
	 *
	 * @default `'The WordPress Contributors'`
	 */
	author: string;

	/**
	 * The short name of the plugin’s license.
	 *
	 * @default `'GPL-2.0-or-later'`
	 */
	license: string;

	/**
	 * A link to the full text of the license.
	 *
	 * @default `'https://www.gnu.org/licenses/gpl-2.0.html'`
	 */
	licenseURI: string;

	/**
	 * A custom domain path for the translations ([more info](https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/#domain-path)).
	 *
	 * @default `undefined`
	 */
	domainPath?: string;

	/**
	 * A custom update URI for the plugin ([related dev note](https://make.wordpress.org/core/2021/06/29/introducing-update-uri-plugin-header-in-wordpress-5-8/)).
	 *
	 * @default `undefined`
	 */
	updateURI?: string;
}

export interface BlockAttribute {
	/**
	 * The type indicates the type of data that is stored by the attribute. It does not indicate where the
	 * data is stored, which is defined by the source field.
	 *
	 * [reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/#type-validation)
	 */
	type:
		| 'null'
		| 'boolean'
		| 'object'
		| 'array'
		| 'string'
		| 'integer'
		| 'number';

	/**
	 * Attribute sources are used to define how the attribute values are extracted from saved post
	 * content. They provide a mechanism to map from the saved markup to a JavaScript representation
	 * of a block.
	 *
	 * [reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/#value-source)
	 */
	source?: 'attribute' | 'text' | 'html' | 'query' | 'meta';
}

/**
 * ([learn more](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/)):
 *
 * @public
 */
export interface BlockMetadata {
	/**
	 * The location for the `block.json` file and other optional block files generated from block templates included in the folder set with the `blockTemplatesPath` setting.
	 *
	 * @default `'.'`
	 */
	folderName: string;

	/**
	 * The schema URL used for block validation.
	 *
	 * @default `'https://schemas.wp.org/trunk/block.json'`
	 */
	$schema: string;

	/**
	 * The block API version ([related dev note](https://make.wordpress.org/core/2020/11/18/block-api-version-2/)).
	 *
	 * @default `2`
	 */
	apiVersion: number;

	/**
	 * The block slug used for identification in the block name.
	 *
	 * @default `undefined`
	 */
	slug?: string;

	/**
	 * The internal namespace for the block name.
	 *
	 * @default `'create-block'`
	 */
	namespace: string;

	/**
	 * A display title for your block.
	 *
	 * @default `undefined`
	 */
	title?: string;

	/**
	 * A short description for your block.
	 *
	 * @default `undefined`
	 */
	description?: string;

	/**
	 * An icon property thats makes it easier to identify a block ([available values](https://developer.wordpress.org/resource/dashicons/)).
	 *
	 * @default `undefined`
	 */
	dashicon?: string;

	/**
	 * Blocks are grouped into categories to help users browse and discover them. The categories provided by core are `text`, `media`, `design`,
	 *
	 * @default `'widgets'`
	 */
	category: string;

	/**
	 * Block attributes ([more details](https://developer.wordpress.org/block-editor/developers/block-api/block-attributes/)).
	 *
	 * @default `undefined`
	 */
	attributes: BlockAttribute[];

	/**
	 * Optional block extended support features ([more details](https://developer.wordpress.org/block-editor/developers/block-api/block-supports/).
	 *
	 * @default `undefined`
	 */
	supports: unknown;

	/**
	 * The editor script definition location.
	 *
	 * @default `'file:./index.js'`
	 */
	editorScript: string;

	/**
	 * The editor style definition location.
	 *
	 * @default `'file:./index.css'`
	 */
	editorStyle: string;

	/**
	 * The frontend and editor style definition location.
	 *
	 * @default `'file:./style-index.css'`
	 */
	style: string;

	/**
	 * A path to the PHP file used when rendering the block type on the server before presenting on the front end.
	 *
	 * @default `undefined`
	 */
	render?: string;

	/**
	 * Allows definition of additional properties for the generated block.json file.
	 *
	 * @default `undefined`
	 */
	customBlockJSON?: JsonObject;

	/**
	 *
	 * @default `undefined`
	 */
	variantVars?: Record< string, unknown >;
}