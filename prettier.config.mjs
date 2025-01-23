// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	printWidth: 140,
	semi: false,
	singleQuote: true,
	// bracketSameLine: true,
	useTabs: true,

	// https://github.com/IanVS/prettier-plugin-sort-imports
	importOrder: ['<TYPES>^(node:)', '<TYPES>', '<TYPES>^[.]', '^(react/(.*)$)|^(react$)', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.5.2',

	// https://github.com/prettier/prettier-vscode/issues/3248: "prettier.documentSelectors": ["**/*.sql"]
	// https://github.com/tailwindlabs/prettier-plugin-tailwindcss
	// https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#specifying-your-tailwind-stylesheet-path
	tailwindStylesheet: 'src/tailwind.css',
	// https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#sorting-classes-in-function-calls
	tailwindFunctions: ['tv', 'composeTailwindRenderProps'],

	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		// https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
		'prettier-plugin-tailwindcss', // MUST come last
	],
};

export default config;
