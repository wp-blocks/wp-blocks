module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		project: [ './tsconfig.eslint.json', './packages/*/tsconfig.json' ],
		tsconfigRootDir: __dirname,
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
					'./packages/*/tsconfig.json',
				],
			},
		},
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
