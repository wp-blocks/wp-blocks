module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		project: [
			'./tsconfig.eslint.json',
			'./examples/*/tsconfig.json',
			'./packages/*/tsconfig.json',
		],
	},
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	plugins: [ '@typescript-eslint' ],
	rules: {
		'import/order': [
			'error',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
				groups: [ 'builtin', 'external', 'parent', 'sibling', 'index' ],
				pathGroups: [
					{
						pattern: '@wordpress/**',
						group: 'external',
					},
				],
				pathGroupsExcludedImportTypes: [ 'builtin' ],
			},
		],

		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: false,
				optionalDependencies: false,
				peerDependencies: false,
				// This is pretty dumb
				packageDir: [
					'./',
					'./packages/scripts',
					'./packages/utils',
					'./packages/vinyl',
					'./packages/wp-deps',
					'./packages/image',
				],
			},
		],

		// Enable these once Gutenberg types are figured out.
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',

		// This might be a bad idea...
		'@wordpress/no-unsafe-wp-apis': 'off',
	},
	overrides: [
		{
			files: 'tests/**/*',
			rules: {
				'@typescript-eslint/no-unsafe-call': 'off',
			},
		},
		{
			files: [ '*.js', '*.cjs' ],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
			},
		},
		{
			files: [ 'scripts/**/*', 'packages/scripts/**/*' ],
			rules: {
				'no-console': 'off',
				'jsdoc/no-undefined-types': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
			},
		},
		{
			files: [ 'packages/image/**/*' ],
			rules: {
				'no-console': 'off',
			},
		},
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': [ '.ts', '.tsx' ],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: [
					'./tsconfig.eslint.json',
					'./examples/*/tsconfig.json',
					'./packages/*/tsconfig.json',
				],
			},
		},
		jsdoc: {
			tagNamePreference: {
				// Override `@wordpress/eslint-plugin/recommended`
				returns: 'returns',
			},
		},
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
