module.exports = {
	root: true,
	extends: [
		'standard-with-typescript',
		'standard-jsx',
		'standard-react',
		'prettier',
	],
	rules: {
		'react/prop-types': 'off',
	},
	parserOptions: {
		project: './tsconfig.json',
	},
};
