module.exports = {
	'**/*.(ts|tsx)': () => 'pnpm check',
	'**/*.(js|jsx|cjs|mjs|ts|tsx)': ( filenames ) => {
		const files = filenames.join( ' ' );
		return [
			`eslint --ext .js,.jsx,.cjs,.mjs,.ts,.tsx --fix ${ files }`,
			`prettier --write ${ files }`,
		];
	},
};
