module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:react/recommended",
		"airbnb",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	plugins: ["react", "@typescript-eslint"],
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		"no-console": ["warn"],
		"import/extensions": "off",
		"no-nested-ternary": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"react/function-component-definition": "off",
		"react/button-has-type": "off",
		"react/jsx-props-no-spreading": "off",
		"jsx-a11y/label-has-associated-control": "off",
		radix: "off",
		"react/jsx-filename-extension": [
			2,
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] },
		],
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				// Add or override TypeScript-specific rules here
			},
		},
	],
};
