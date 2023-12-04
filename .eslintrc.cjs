module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: false,
	},
	plugins: [
		'@stylistic',
		'@typescript-eslint',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsConfigRootDir: __dirname,
		project: [
			'./tsconfig.json',
			'./scripts/tsconfig.json',
		],
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	ignorePatterns: [
		'*.md',
		'.eslintrc.cjs',
		'stylelint.config.cjs',
		'jest.config.js',
	],
	rules: {
		/////////////////////////
		// Overriding defaults //
		/////////////////////////

		// Sometimes it's useful to leave a name for an unused argument,
		// in case it might be used in the future. Also, using a warning
		// level makes it clearer when there's not a "real" error while
		// authoring new variables.
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'none',
				ignoreRestSiblings: true,
			}
		],

		// Sometimes it's useful to use a clearer name than `this`
		'@typescript-eslint/no-this-alias': 'off',

		// There can be value in being explicit about a type that could be inferred,
		// especially if a variable's default value might change in the future
		'@typescript-eslint/no-inferrable-types': 'off',

		// A function returning a `Promise<void>` should be able to go unchecked just
		// like a function that returns `void`
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false,
			},
		],

		// I don't mind type coercion in string literal expressions
		'@typescript-eslint/restrict-template-expressions': 'off',

		// There are legitimate uses for empty functions
		'@typescript-eslint/no-empty-function': 'off',

		// Using `any[]` for rest arguments can sometimes be necessary
		'@typescript-eslint/no-explicit-any': [
			'warn',
			{
				ignoreRestArgs: true,
			},
		],

		// There are plenty of times where it's safe to use a Promise without error handling
		'@typescript-eslint/no-floating-promises': 'off',

		// Sometimes it can be useful to create an asynchronous function that doesn't yet do anything
		// asynchronous, but which is planned to eventually become asynchronous, in order to provide
		// a consistent interface
		'@typescript-eslint/require-await': 'warn',

		////////////////////////
		// Debugging warnings //
		////////////////////////
		'no-debugger': 'warn',
		'no-constant-condition': 'warn',
		'no-console': [
			'warn',
			{
				allow: ['warn', 'error'],
			},
		],
		'no-warning-comments': [
			'warn',
			{
				terms: ['TODO'],
				location: 'start',
			}
		],

		///////////////////////////////
		// TypeScript-specific rules //
		///////////////////////////////
		'@typescript-eslint/consistent-type-assertions': [
			'error',
			{
				assertionStyle: 'as',
			},
		],
		'@typescript-eslint/explicit-module-boundary-types': [
			'error'
		],

		////////////////
		// Code style //
		////////////////
		'curly': [
			'error',
			'all',
		],
		'default-case-last': 'error',
		'no-var': 'error',
		'one-var': [
			'error',
			'never',
		],

		'@stylistic/array-bracket-newline': [
			'error',
			'consistent',
		],
		'@stylistic/array-bracket-spacing': [
			'error',
			'never',
		],
		'@stylistic/array-element-newline': [
			'error',
			'consistent',
		],
		'@stylistic/arrow-parens': [
			'error',
			'always',
		],
		'@stylistic/arrow-spacing': [
			'error',
			{
				before: true,
				after: true,
			},
		],
		'@stylistic/block-spacing': [
			'error',
			'always',
		],
		'@stylistic/brace-style': [
			'error',
			'1tbs',
			{
				allowSingleLine: true,
			},
		],
		'@stylistic/comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'only-multiline',
			},
		],
		'@stylistic/comma-spacing': [
			'error',
			{
				before: false,
				after: true,
			}
		],
		'@stylistic/comma-style': [
			'error',
			'last',
		],
		'@stylistic/eol-last': [
			'error',
			'always',
		],
		'@stylistic/func-call-spacing': [
			'error',
			'never',
		],
		'@stylistic/function-call-argument-newline': [
			'error',
			'consistent',
		],
		'@stylistic/function-paren-newline': [
			'error',
			'multiline-arguments',
		],
		'@stylistic/indent': [
			'error',
			'tab',
			{
				SwitchCase: 1,
				ignoredNodes: [
					// Ignore indentation within template literals to allow them to be indented like markup
					'TemplateLiteral *',
					// This rule doesn't behave correctly for TypeScript generic types
					// https://github.com/typescript-eslint/typescript-eslint/issues/455#issuecomment-560585408
					'TSTypeParameterInstantiation ',
				],
			},
		],
		'@stylistic/key-spacing': [
			'error',
			{
				'beforeColon': false,
				'afterColon': true,
				mode: 'minimum',
			},
		],
		'@stylistic/keyword-spacing': [
			'error',
			{
				'before': true,
				'after': true,
			},
		],
		'@stylistic/multiline-ternary': [
			'error',
			'always-multiline',
		],
		'@stylistic/new-parens': [
			'error',
			'always',
		],
		'@stylistic/no-extra-semi': [
			'error',
		],
		'@stylistic/no-mixed-spaces-and-tabs': [
			'error',
			'smart-tabs',
		],
		'@stylistic/no-trailing-spaces': [
			'error',
		],
		'@stylistic/no-whitespace-before-property': [
			'error',
		],
		'@stylistic/object-curly-newline': [
			'error',
			{
				multiline: true,
				consistent: true,
			},
		],
		'@stylistic/quotes': [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		'@stylistic/rest-spread-spacing': [
			'error',
			'never',
		],
		'@stylistic/semi': [
			'error',
			'always',
		],
		'@stylistic/semi-spacing': [
			'error',
			{
				before: false,
				after: true,
			},
		],
		'@stylistic/semi-style': [
			'error',
			'last',
		],
		'@stylistic/space-before-blocks': [
			'error',
			'always',
		],
		'@stylistic/space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'@stylistic/space-in-parens': [
			'error',
			'never',
		],
		'@stylistic/space-unary-ops': [
			'error',
			{
				words: true,
			},
		],
		'@stylistic/spaced-comment': [
			'error',
			'always',
			{
				exceptions: [
					'/',
				],
				block: {
					balanced: true,
				},
			},
		],
		'@stylistic/switch-colon-spacing': [
			'error',
			{
				'after': true,
				'before': false,
			},
		],

		// TypeScript-specific code style rules
		'@stylistic/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: true,
				},
				multilineDetection: 'brackets',
			},
		],
		'@stylistic/type-annotation-spacing': [
			'error',
			{
				before: false,
				after: true,
				overrides: {
					arrow: {
						before: true,
						after: true,
					},
				},
			},
		],
	}
};
