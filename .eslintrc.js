module.exports = {
	root: true,
	extends: [
		'standard-with-typescript',
		'standard-jsx',
		'standard-react',
		'prettier',
	],
	plugins: ['react-hooks'],
	rules: {
		'react/prop-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
	},
	parserOptions: {
		project: './tsconfig.json',
	},
};
