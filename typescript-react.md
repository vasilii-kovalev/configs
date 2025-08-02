# TypeScript + React configs

## Runtime

[Bun official site](https://bun.sh)

## Bundler

[Vite official site](https://vite.dev)

### Installation

```sh
bun create vite
```

Select React, then TypeScript options.

```sh
bun install
```

### Additional libraries

```sh
bun add -D -E vite-tsconfig-paths sonda
```

### vite.config.ts

```typescript
import react from "@vitejs/plugin-react";
import sonda from "sonda/vite";
import {
	defineConfig,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config
const config = defineConfig({
	build: {
		// Required for Sonda.
		sourcemap: true,
	},
	plugins: [
		tsconfigPaths({
			configNames: [
				"tsconfig.app.json",
			],
		}),
		react(),
		sonda(),
	],
});

export default config;
```

### .gitignore

```diff
# ... other options
+.sonda
-.vscode/*
-!.vscode/extensions.json
```

## React

[React official site](https://react.dev)

### Installation

```sh
bun add -E react@19.0.1 react-dom@19.1.0
```

```sh
bun add -D -E @types/react@19.1.8 @types/react-dom@19.1.6
```

## TypeScript

[TypeScript official site](https://www.typescriptlang.org)

### Installation

```sh
bun add -D -E typescript@5.8.3
```

### tsconfig.app.json

```jsonc
{
	// ... other options
	"compilerOptions": {
		// ... other options
		"target": "ESNext",
		"lib": [
			// ... other options
			"ESNext"
		],
		"module": "ESNext",
		"paths": {
			"@/*": [
				"./src/*"
			]
		},
		"noUncheckedIndexedAccess": true
	},
	"include": [
		"src"
	]
}
```

`compilerOptions.lib` should contain only one `ES*` option.

### tsconfig.node.json

```jsonc
{
	// ... other options
	"compilerOptions": {
		// ... other options
		"target": "ESNext",
		"lib": [
			"ESNext"
		],
		"module": "ESNext",
		"noUncheckedIndexedAccess": true
	}
}
```

`compilerOptions.lib` should contain only one `ES*` option.

### package.json

```jsonc
{
	// ... other options
	"scripts": {
		// ... other options
		"check:types": "tsc --noEmit --project tsconfig.app.json"
	}
}
```

### .vscode/settings.json

```jsonc
{
	// ... other options
	"typescript.tsdk": "node_modules\\typescript\\lib"
}
```

## EditorConfig

[EditorConfig official site](https://editorconfig.org)

### .editorconfig

```editor-config
root = true

[*]
charset = utf-8
indent_style = tab
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true

# For a pretty visual representation.
[*.md]
indent_size = 2
indent_style = space
```

### .vscode/extensions.json

```jsonc
{
	"recommendations": [
		// ... other options
		"EditorConfig.EditorConfig"
	]
}
```

## ESLint

[ESLint official site](https://eslint.org)

### Installation

```sh
bun add -D -E @eslint-react/eslint-plugin@1.51.1 @eslint/js@9.28.0 @morev/eslint-disable-autofix@1.0.2 @stylistic/eslint-plugin@4.4.1 eslint@9.28.0 eslint-import-resolver-typescript@4.4.3 eslint-plugin-import-export-newline@1.0.0 eslint-plugin-import-x@4.15.1 eslint-plugin-react-hooks@5.2.0 eslint-plugin-react-refresh@0.4.20 eslint-plugin-simple-import-sort@12.1.1 globals@16.2.0 typescript-eslint@8.33.1 @types/bun
```

`@types/bun` allows using `import.meta.dirname` in the ESLint config.

### tsconfig.node.json

```jsonc
{
	// ... other options
	"include": [
		// ... other options
		"eslint.config.ts"
	]
}
```

### eslint.config.ts

<details>

  <summary>Click to expand code block</summary>

```typescript
import js from "@eslint/js";
import react from "@eslint-react/eslint-plugin";
import {
	disableAutofix,
} from "@morev/eslint-disable-autofix";
import stylistic from "@stylistic/eslint-plugin";
import {
	type Linter,
} from "eslint";
// eslint-disable-next-line import-x/no-namespace
import * as tsResolver from "eslint-import-resolver-typescript";
// @ts-expect-error The plugin doesn't provide types.
import importExportNewline from "eslint-plugin-import-export-newline";
import {
	flatConfigs as importConfigs,
} from "eslint-plugin-import-x";
import {
	configs as reactHooksConfigs,
} from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import {
	config,
	configs as typeScriptConfigs,
} from "typescript-eslint";

/*
	Having the severity constants allows fast rule severity changes.
	For example, if necessary to turn off all the rules to check
	how auto-fix works for one of the rules, it would be necessary to set the
	constants' value to "off" and manually set the necessary severity of the rule.
*/
const WARNING: Linter.RuleSeverity = "warn";
const ERROR: Linter.RuleSeverity = "error";
const DISABLED: Linter.RuleSeverity = "off";

/*
	Severity of the rules is set this way:
	* "error":
		* Ensures code consistency
		* Makes code more readable (easier to perceive) than without it
		* Prevents potential bugs and security issues
		* Improves debugging experience
		* Discourages using outdated syntax/approach
		* Discourages being lazy and write unmaintainable code
		* Discourages writing/leaving useless code
	* "warn":
		* Highlights potential problems, that need to be double checked before refactoring
	* "off":
		* Establishes unnecessary limits/conventions
		* Configures feature/syntax, which we are not going to use
		* Another rule handles the same cases or causes conflicts

	Additional comments are provided for the rules if necessary.
*/

const eslintConfig = disableAutofix(
	config(
		{
			ignores: [
				"dist",
			],
		},
		{
			files: [
				"**/*.{ts,tsx}",
			],
			extends: [
				js.configs.all,
				// @ts-expect-error Incorrect plugin types.
				importConfigs.react,
				// @ts-expect-error Incorrect plugin types.
				importConfigs.typescript,
				stylistic.configs.all,
				typeScriptConfigs.all,
			],
			settings: {
				"import-x/resolver": {
					name: "tsResolver",
					resolver: tsResolver,
				},
			},
			languageOptions: {
				globals: globals.browser,
				parserOptions: {
					sourceType: "module",
					ecmaVersion: "latest",
					projectService: true,
					tsconfigRootDir: import.meta.dirname,
				},
			},
			plugins: {
				"simple-import-sort": simpleImportSort,
				// The package doesn't have types.
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				"import-export-newline": importExportNewline,
			},
			rules: {
				/*
					==================================================
					Built-in rules
					==================================================
				*/

				// Possible problems.

				// https://eslint.org/docs/latest/rules/array-callback-return
				"array-callback-return": [
					ERROR,
					{
						checkForEach: true,
					},
				],
				// https://eslint.org/docs/latest/rules/constructor-super
				"constructor-super": ERROR,
				// https://eslint.org/docs/latest/rules/for-direction
				"for-direction": ERROR,
				// https://eslint.org/docs/latest/rules/getter-return
				"getter-return": ERROR,
				// https://eslint.org/docs/latest/rules/no-async-promise-executor
				"no-async-promise-executor": ERROR,
				// https://eslint.org/docs/latest/rules/no-await-in-loop
				"no-await-in-loop": ERROR,
				// https://eslint.org/docs/latest/rules/no-class-assign
				"no-class-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-compare-neg-zero
				"no-compare-neg-zero": ERROR,
				// https://eslint.org/docs/latest/rules/no-cond-assign
				"no-cond-assign": [
					ERROR,
					"always",
				],
				// https://eslint.org/docs/latest/rules/no-const-assign
				"no-const-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-constant-binary-expression
				"no-constant-binary-expression": ERROR,
				// https://eslint.org/docs/latest/rules/no-constant-condition
				// The "@typescript-eslint/no-unnecessary-condition" rule takes care of it.
				"no-constant-condition": DISABLED,
				// https://eslint.org/docs/latest/rules/no-constructor-return
				"no-constructor-return": ERROR,
				// https://eslint.org/docs/latest/rules/no-control-regex
				"no-control-regex": ERROR,
				// https://eslint.org/docs/latest/rules/no-debugger
				"no-debugger": ERROR,
				// https://eslint.org/docs/latest/rules/no-dupe-args
				"no-dupe-args": ERROR,
				// https://eslint.org/docs/latest/rules/no-dupe-class-members
				"no-dupe-class-members": ERROR,
				// https://eslint.org/docs/latest/rules/no-dupe-else-if
				"no-dupe-else-if": ERROR,
				// https://eslint.org/docs/latest/rules/no-dupe-keys
				"no-dupe-keys": ERROR,
				// https://eslint.org/docs/latest/rules/no-duplicate-case
				"no-duplicate-case": ERROR,
				// https://eslint.org/docs/latest/rules/no-duplicate-imports
				"no-duplicate-imports": [
					ERROR,
					{
						includeExports: true,
					},
				],
				// https://eslint.org/docs/latest/rules/no-empty-character-class
				"no-empty-character-class": ERROR,
				// https://eslint.org/docs/latest/rules/no-empty-pattern
				"no-empty-pattern": ERROR,
				// https://eslint.org/docs/latest/rules/no-ex-assign
				"no-ex-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-fallthrough
				"no-fallthrough": ERROR,
				// https://eslint.org/docs/latest/rules/no-func-assign
				"no-func-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-import-assign
				"no-import-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-inner-declarations
				"no-inner-declarations": [
					ERROR,
					"both",
				],
				// https://eslint.org/docs/latest/rules/no-invalid-regexp
				"no-invalid-regexp": ERROR,
				// https://eslint.org/docs/latest/rules/no-irregular-whitespace
				"no-irregular-whitespace": [
					ERROR,
					{
						skipStrings: false,
					},
				],
				// https://eslint.org/docs/latest/rules/no-loss-of-precision
				"no-loss-of-precision": ERROR,
				// https://eslint.org/docs/latest/rules/no-misleading-character-class
				"no-misleading-character-class": ERROR,
				// https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
				"no-new-native-nonconstructor": ERROR,
				// https://eslint.org/docs/latest/rules/no-obj-calls
				"no-obj-calls": ERROR,
				// https://eslint.org/docs/latest/rules/no-promise-executor-return
				"no-promise-executor-return": ERROR,
				// https://eslint.org/docs/latest/rules/no-prototype-builtins
				"no-prototype-builtins": ERROR,
				// https://eslint.org/docs/latest/rules/no-self-assign
				"no-self-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-self-compare
				"no-self-compare": ERROR,
				// https://eslint.org/docs/latest/rules/no-setter-return
				"no-setter-return": ERROR,
				// https://eslint.org/docs/latest/rules/no-sparse-arrays
				"no-sparse-arrays": ERROR,
				// https://eslint.org/docs/latest/rules/no-template-curly-in-string
				"no-template-curly-in-string": ERROR,
				// https://eslint.org/docs/latest/rules/no-this-before-super
				"no-this-before-super": ERROR,
				// https://eslint.org/docs/latest/rules/no-undef
				"no-undef": ERROR,
				// https://eslint.org/docs/latest/rules/no-unexpected-multiline
				"no-unexpected-multiline": ERROR,
				// https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
				"no-unmodified-loop-condition": ERROR,
				// https://eslint.org/docs/latest/rules/no-unreachable
				"no-unreachable": ERROR,
				// https://eslint.org/docs/latest/rules/no-unreachable-loop
				"no-unreachable-loop": ERROR,
				// https://eslint.org/docs/latest/rules/no-unsafe-finally
				"no-unsafe-finally": ERROR,
				// https://eslint.org/docs/latest/rules/no-unsafe-negation
				"no-unsafe-negation": ERROR,
				// https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining
				"no-unsafe-optional-chaining": [
					ERROR,
					{
						disallowArithmeticOperators: true,
					},
				],
				// https://eslint.org/docs/latest/rules/no-unused-private-class-members
				"no-unused-private-class-members": ERROR,
				// https://eslint.org/docs/latest/rules/no-unused-vars
				"no-unused-vars": ERROR,
				// https://eslint.org/docs/latest/rules/no-use-before-define
				"no-use-before-define": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-assignment
				"no-useless-assignment": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-backreference
				"no-useless-backreference": ERROR,
				// https://eslint.org/docs/latest/rules/require-atomic-updates
				"require-atomic-updates": ERROR,
				// https://eslint.org/docs/latest/rules/use-isnan
				"use-isnan": [
					ERROR,
					{
						enforceForIndexOf: true,
					},
				],
				// https://eslint.org/docs/latest/rules/valid-typeof
				"valid-typeof": [
					ERROR,
					{
						requireStringLiterals: true,
					},
				],

				// Suggestions.

				// https://eslint.org/docs/latest/rules/accessor-pairs
				"accessor-pairs": WARNING,
				// https://eslint.org/docs/latest/rules/arrow-body-style
				"arrow-body-style": [
					ERROR,
					// Always having the function's body allows us to quicker add debugger, console.log, change the logic, etc.
					"always",
				],
				// https://eslint.org/docs/latest/rules/block-scoped-var
				// This rule is disabled because `var`-s are prohibited (see the "no-var" rule).
				"block-scoped-var": DISABLED,
				// https://eslint.org/docs/latest/rules/camelcase
				/*
					The "@typescript-eslint/naming-convention" rule mostly covers the same cases, but it doesn't handle
					object's keys in an assignments (like `window.a_b = 2`).
				*/
				camelcase: ERROR,
				// https://eslint.org/docs/latest/rules/capitalized-comments
				/*
					Having this rule is useful for several reasons:
					1. Enforces comments consistency
					2. Highlights commented out code, which needs to be reviewed

					Auto-fix is disabled, because sometimes it is necessary to temporary comment out code,
					and automatic change of casing would make it invalid after uncommenting.
				*/
				"no-autofix/capitalized-comments": [
					WARNING,
					"always",
					{
						ignorePattern: "webpackChunkName",
					},
				],
				// https://eslint.org/docs/latest/rules/class-methods-use-this
				"class-methods-use-this": ERROR,
				// https://eslint.org/docs/latest/rules/complexity
				complexity: ERROR,
				// https://eslint.org/docs/latest/rules/consistent-return
				"consistent-return": ERROR,
				// https://eslint.org/docs/latest/rules/consistent-this
				"consistent-this": ERROR,
				// https://eslint.org/docs/latest/rules/curly
				curly: ERROR,
				// https://eslint.org/docs/latest/rules/default-case
				"default-case": ERROR,
				// https://eslint.org/docs/latest/rules/default-case-last
				"default-case-last": ERROR,
				// https://eslint.org/docs/latest/rules/default-param-last
				"default-param-last": ERROR,
				// https://eslint.org/docs/latest/rules/dot-notation
				"dot-notation": ERROR,
				// https://eslint.org/docs/latest/rules/eqeqeq
				eqeqeq: ERROR,
				// https://eslint.org/docs/latest/rules/func-name-matching
				/*
					It is discouraged to assign a function declaration to a function expression in general
					(see the "func-style" rule), but if it is necessary, it would be less confusing when using consistent names.
				*/
				"func-name-matching": [
					ERROR,
					"always",
					{
						considerPropertyDescriptor: true,
						includeCommonJSModuleExports: true,
					},
				],
				// https://eslint.org/docs/latest/rules/func-names
				/*
					If the function declaration is necessary, it would be useful to give it a name, so that is doesn't appear as
					"anonymous" function in stack traces.
				*/
				"func-names": ERROR,
				// https://eslint.org/docs/latest/rules/func-style
				"func-style": [
					ERROR,
					"declaration",
					{
						/*
							Arrow functions are useful when defining components, which allows us to use `FC` type to define the
							components' signature.
						*/
						allowArrowFunctions: true,
					},
				],
				// https://eslint.org/docs/latest/rules/grouped-accessor-pairs
				"grouped-accessor-pairs": [
					ERROR,
					"getBeforeSet",
				],
				// https://eslint.org/docs/latest/rules/guard-for-in
				"guard-for-in": ERROR,
				// https://eslint.org/docs/latest/rules/id-denylist
				"id-denylist": [
					ERROR,
					// Can be changed to `error` or `event`, for example.
					"e",
					// Can be changed to `error`, for example.
					"err",
					// Please choose a more appropriate name related to this function's purpose.
					"callback",
					// Please choose a more appropriate name related to this function's purpose.
					"cb",
					// Please choose a more appropriate name related to this variable's data.
					"acc",
					// Please choose a more appropriate name related to this variable's data.
					"accumulator",
					// Can be changed to `submitButton`, for example.
					"btn",
					// Can be changed to `submitButtonElement`, for example.
					"el",
					// Can be changed to `submitButtonElement`, for example.
					"element",
					// Can be changed to `request`, for example.
					"req",
					// Can be changed to `response` or `result`, for example.
					"res",
				],
				// https://eslint.org/docs/latest/rules/id-length
				"id-length": ERROR,
				// https://eslint.org/docs/latest/rules/id-match
				// This rule is disabled because enforcing any naming convention is unnecessary.
				"id-match": DISABLED,
				// https://eslint.org/docs/latest/rules/init-declarations
				// This rule is disabled because necessity of variables' initialization heavily depends on particular situation.
				"init-declarations": DISABLED,
				// https://eslint.org/docs/latest/rules/logical-assignment-operators
				"logical-assignment-operators": [
					ERROR,
					"always",
					{
						enforceForIfStatements: true,
					},
				],
				// https://eslint.org/docs/latest/rules/max-classes-per-file
				// This rule is disabled because limiting the classes number is unnecessary.
				"max-classes-per-file": DISABLED,
				// https://eslint.org/docs/latest/rules/max-depth
				"max-depth": ERROR,
				// https://eslint.org/docs/latest/rules/max-lines
				// This rule is disabled because limiting the lines number is unnecessary.
				"max-lines": DISABLED,
				// https://eslint.org/docs/latest/rules/max-lines-per-function
				// The "complexity" rule takes care of it.
				"max-lines-per-function": DISABLED,
				// https://eslint.org/docs/latest/rules/max-nested-callbacks
				// The "complexity" rule takes care of it.
				"max-nested-callbacks": DISABLED,
				// https://eslint.org/docs/latest/rules/max-params
				"max-params": ERROR,
				// https://eslint.org/docs/latest/rules/max-statements
				// The "complexity" rule takes care of it.
				"max-statements": DISABLED,
				// https://eslint.org/docs/latest/rules/new-cap
				"new-cap": ERROR,
				// https://eslint.org/docs/latest/rules/no-alert
				/*
					The severity is set to "error" to avoid leaving these functions in production code. The functions are typically
					used while debugging. When these capabilities are necessary in production, the appropriate components from the
					UI library can be used.
				*/
				"no-alert": ERROR,
				// https://eslint.org/docs/latest/rules/no-array-constructor
				"no-array-constructor": ERROR,
				// https://eslint.org/docs/latest/rules/no-bitwise
				/*
					The severity is set to "error" because we don't need bitwise operators, so if they are presented, it is possibly
					a typo.
				*/
				"no-bitwise": ERROR,
				// https://eslint.org/docs/latest/rules/no-caller
				"no-caller": ERROR,
				// https://eslint.org/docs/latest/rules/no-case-declarations
				"no-case-declarations": ERROR,
				// https://eslint.org/docs/latest/rules/no-console
				"no-console": [
					/*
						The severity is set to "error" to avoid leaving these functions in production code. The functions are
						typically used while debugging.
					*/
					ERROR,
					{
						allow: [
							"info",
							"warn",
							"error",
						],
					},
				],
				// https://eslint.org/docs/latest/rules/no-continue
				"no-continue": ERROR,
				// https://eslint.org/docs/latest/rules/no-delete-var
				// This rule is disabled because `var`-s are prohibited (see the "no-var"rule).
				"no-delete-var": DISABLED,
				// https://eslint.org/docs/latest/rules/no-div-regex
				"no-div-regex": ERROR,
				// https://eslint.org/docs/latest/rules/no-else-return
				"no-else-return": [
					ERROR,
					{
						allowElseIf: false,
					},
				],
				// https://eslint.org/docs/latest/rules/no-empty
				"no-empty": [
					ERROR,
					{
						// Use `logError` inside `catch` clauses.
						allowEmptyCatch: false,
					},
				],
				// https://eslint.org/docs/latest/rules/no-empty-function
				// If a callback should be empty, use `noop` function instead.
				"no-empty-function": ERROR,
				// https://eslint.org/docs/latest/rules/no-empty-static-block
				"no-empty-static-block": ERROR,
				// https://eslint.org/docs/latest/rules/no-eq-null
				// The "eqeqeq" rule takes care of it.
				"no-eq-null": DISABLED,
				// https://eslint.org/docs/latest/rules/no-eval
				"no-eval": ERROR,
				// https://eslint.org/docs/latest/rules/no-extend-native
				"no-extend-native": ERROR,
				// https://eslint.org/docs/latest/rules/no-extra-bind
				"no-extra-bind": WARNING,
				// https://eslint.org/docs/latest/rules/no-extra-boolean-cast
				"no-extra-boolean-cast": [
					ERROR,
					{
						enforceForInnerExpressions: true,
					},
				],
				// https://eslint.org/docs/latest/rules/no-extra-label
				// The "no-labels" rule takes care of it.
				"no-extra-label": DISABLED,
				// https://eslint.org/docs/latest/rules/no-global-assign
				"no-global-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-implicit-coercion
				"no-implicit-coercion": [
					ERROR,
					{
						disallowTemplateShorthand: true,
					},
				],
				// https://eslint.org/docs/latest/rules/no-implicit-globals
				// This rule is disabled because we work with modules, so cases this rule handles won't happen.
				"no-implicit-globals": DISABLED,
				// https://eslint.org/docs/latest/rules/no-implied-eval
				"no-implied-eval": ERROR,
				// https://eslint.org/docs/latest/rules/no-inline-comments
				/*
					There is an overlap with the "@stylistic/line-comment-position" rule, but that rule handles only single line
					comments, while this one handles all the types.
				*/
				"no-inline-comments": ERROR,
				// https://eslint.org/docs/latest/rules/no-invalid-this
				"no-invalid-this": ERROR,
				// https://eslint.org/docs/latest/rules/no-iterator
				"no-iterator": ERROR,
				// https://eslint.org/docs/latest/rules/no-label-var
				// The "no-labels" rule takes care of it.
				"no-label-var": DISABLED,
				// https://eslint.org/docs/latest/rules/no-labels
				"no-labels": ERROR,
				// https://eslint.org/docs/latest/rules/no-lone-blocks
				"no-lone-blocks": ERROR,
				// https://eslint.org/docs/latest/rules/no-lonely-if
				"no-lonely-if": ERROR,
				// https://eslint.org/docs/latest/rules/no-loop-func
				"no-loop-func": ERROR,
				// https://eslint.org/docs/latest/rules/no-magic-numbers
				// This rule is disabled because it hinders more than helps.
				"no-magic-numbers": DISABLED,
				// https://eslint.org/docs/latest/rules/no-multi-assign
				"no-multi-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-multi-str
				"no-multi-str": ERROR,
				// https://eslint.org/docs/latest/rules/no-negated-condition
				// This rule is disabled because early returns are useful.
				"no-negated-condition": DISABLED,
				// https://eslint.org/docs/latest/rules/no-nested-ternary
				/*
					This rule is disabled because in most cases the conditions are easy to read and understand, so there is no need
					to restrict the nesting. If it is not, the code is marked for refactoring.
				*/
				"no-nested-ternary": DISABLED,
				// https://eslint.org/docs/latest/rules/no-new
				"no-new": ERROR,
				// https://eslint.org/docs/latest/rules/no-new-func
				"no-new-func": ERROR,
				// https://eslint.org/docs/latest/rules/no-new-wrappers
				"no-new-wrappers": ERROR,
				// https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape
				"no-nonoctal-decimal-escape": ERROR,
				// https://eslint.org/docs/latest/rules/no-object-constructor
				"no-object-constructor": ERROR,
				// https://eslint.org/docs/latest/rules/no-octal
				"no-octal": ERROR,
				// https://eslint.org/docs/latest/rules/no-octal-escape
				"no-octal-escape": ERROR,
				// https://eslint.org/docs/latest/rules/no-param-reassign
				"no-param-reassign": [
					ERROR,
					{
						props: true,
					},
				],
				// https://eslint.org/docs/latest/rules/no-plusplus
				"no-plusplus": ERROR,
				// https://eslint.org/docs/latest/rules/no-proto
				"no-proto": ERROR,
				// https://eslint.org/docs/latest/rules/no-redeclare
				"no-redeclare": ERROR,
				// https://eslint.org/docs/latest/rules/no-regex-spaces
				"no-regex-spaces": ERROR,
				// https://eslint.org/docs/latest/rules/no-restricted-exports
				// This rule is disabled because all export names are allowed.
				"no-restricted-exports": DISABLED,
				// https://eslint.org/docs/latest/rules/no-restricted-globals
				/*
					The rule is disabled because we use modules, an other rules handle the cases (for example, "no-undef"),
					as well as TypeScript.
				*/
				"no-restricted-globals": DISABLED,
				// https://eslint.org/docs/latest/rules/no-restricted-imports
				"no-restricted-imports": ERROR,
				// https://eslint.org/docs/latest/rules/no-restricted-properties
				// This rule is disabled because all object properties are allowed.
				"no-restricted-properties": DISABLED,
				// https://eslint.org/docs/latest/rules/no-restricted-syntax
				"no-restricted-syntax": [
					ERROR,
					// Covers "no-with" rule.
					"WithStatement",
					// Covers "no-sequences" rule.
					"SequenceExpression",
					// To make the code more unified.
					// Inspired by: https://stackoverflow.com/a/68873616
					{
						selector: "SwitchCase > *.consequent[type!=\"BlockStatement\"]",
						message: "Switch cases without blocks are disallowed.",
					},
				],
				// https://eslint.org/docs/latest/rules/no-return-assign
				"no-return-assign": [
					ERROR,
					"always",
				],
				// https://eslint.org/docs/latest/rules/no-script-url
				"no-script-url": ERROR,
				// https://eslint.org/docs/latest/rules/no-sequences
				// The "no-restricted-syntax" rule takes care of it.
				"no-sequences": DISABLED,
				// https://eslint.org/docs/latest/rules/no-shadow
				/*
					This rule encourages assigning more meaningful names to the variables/constant, taking current context
					into account in each case.

					Usually, names can be the same for accumulator inside `reduce` callback and the result, assigned to
					a variable/constant. In this case, the accumulator can be postfixed with "current" word (because it is actually
					a current value in each iteration, not the final one).
				*/
				"no-shadow": ERROR,
				// https://eslint.org/docs/latest/rules/no-shadow-restricted-names
				"no-shadow-restricted-names": ERROR,
				// https://eslint.org/docs/latest/rules/no-ternary
				// This rule is disabled because ternaries are allowed.
				"no-ternary": DISABLED,
				// https://eslint.org/docs/latest/rules/no-throw-literal
				"no-throw-literal": ERROR,
				// https://eslint.org/docs/latest/rules/no-undef-init
				"no-undef-init": ERROR,
				// https://eslint.org/docs/latest/rules/no-undefined
				// The "no-shadow-restricted-names" rule takes care of it.
				"no-undefined": DISABLED,
				// https://eslint.org/docs/latest/rules/no-underscore-dangle
				"no-underscore-dangle": [
					ERROR,
					{
						allowInArrayDestructuring: false,
						allowInObjectDestructuring: false,
						allowFunctionParams: false,
					},
				],
				// https://eslint.org/docs/latest/rules/no-unneeded-ternary
				"no-unneeded-ternary": [
					ERROR,
					{
						defaultAssignment: false,
					},
				],
				// https://eslint.org/docs/latest/rules/no-unused-expressions
				"no-unused-expressions": ERROR,
				// https://eslint.org/docs/latest/rules/no-unused-labels
				// The "no-labels" rule takes care of it.
				"no-unused-labels": DISABLED,
				// https://eslint.org/docs/latest/rules/no-useless-call
				"no-useless-call": WARNING,
				// https://eslint.org/docs/latest/rules/no-useless-catch
				"no-useless-catch": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-computed-key
				"no-useless-computed-key": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-concat
				"no-useless-concat": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-constructor
				"no-useless-constructor": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-escape
				"no-useless-escape": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-rename
				"no-useless-rename": ERROR,
				// https://eslint.org/docs/latest/rules/no-useless-return
				"no-useless-return": ERROR,
				// https://eslint.org/docs/latest/rules/no-var
				"no-var": ERROR,
				// https://eslint.org/docs/latest/rules/no-void
				// Use `undefined` instead.
				"no-void": [
					ERROR,
					{
						/*
							This option is set to `true` to compliment `ignoreVoid` one in the "@typescript-eslint/no-floating-promises"
							rule.
						*/
						allowAsStatement: true,
					},
				],
				// https://eslint.org/docs/latest/rules/no-warning-comments
				// This rule is disabled because warning comments are allowed.
				"no-warning-comments": DISABLED,
				// https://eslint.org/docs/latest/rules/no-with
				// The "no-restricted-syntax" rule takes care of it.
				"no-with": DISABLED,
				// https://eslint.org/docs/latest/rules/object-shorthand
				"object-shorthand": [
					ERROR,
					"always",
					{
						ignoreConstructors: false,
						avoidExplicitReturnArrows: false,
					},
				],
				// https://eslint.org/docs/latest/rules/one-var
				"one-var": [
					ERROR,
					/*
						Defining variables/constants on separate lines allows us to quicker refactor and disable/enable them
						(for debugging purposes, for example), without touching unrelated code.
					*/
					"never",
				],
				// https://eslint.org/docs/latest/rules/operator-assignment
				"operator-assignment": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-arrow-callback
				"prefer-arrow-callback": [
					ERROR,
					{
						allowUnboundThis: false,
					},
				],
				// https://eslint.org/docs/latest/rules/prefer-const
				"prefer-const": [
					ERROR,
					{
						/*
							The value is set to `true` to avoid conflicts with the "no-use-before-define" rule (as described in the
							documentation).
						*/
						ignoreReadBeforeAssign: true,
					},
				],
				// https://eslint.org/docs/latest/rules/prefer-destructuring
				"prefer-destructuring": [
					ERROR,
					{
						array: true,
						object: true,
					},
				],
				// https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
				"prefer-exponentiation-operator": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-named-capture-group
				"prefer-named-capture-group": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-numeric-literals
				"prefer-numeric-literals": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-object-has-own
				"prefer-object-has-own": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-object-spread
				"prefer-object-spread": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
				"prefer-promise-reject-errors": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-regex-literals
				"prefer-regex-literals": [
					ERROR,
					{
						disallowRedundantWrapping: true,
					},
				],
				// https://eslint.org/docs/latest/rules/prefer-rest-params
				"prefer-rest-params": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-spread
				"prefer-spread": ERROR,
				// https://eslint.org/docs/latest/rules/prefer-template
				"prefer-template": ERROR,
				// https://eslint.org/docs/latest/rules/radix
				radix: ERROR,
				// https://eslint.org/docs/latest/rules/require-await
				"require-await": ERROR,
				// https://eslint.org/docs/latest/rules/require-unicode-regexp
				"require-unicode-regexp": ERROR,
				// https://eslint.org/docs/latest/rules/require-yield
				"require-yield": ERROR,
				// https://eslint.org/docs/latest/rules/sort-imports
				// The "simple-import-sort/imports" rule takes care of it.
				"sort-imports": DISABLED,
				// https://eslint.org/docs/latest/rules/sort-keys
				"sort-keys": ERROR,
				// https://eslint.org/docs/latest/rules/sort-vars
				/*
					This rule is disabled because chaining variables/constants declarations is prohibited (see the "no-multi-assign"
					and "one-var" rules).
				*/
				"sort-vars": DISABLED,
				// https://eslint.org/docs/latest/rules/strict
				strict: ERROR,
				// https://eslint.org/docs/latest/rules/symbol-description
				"symbol-description": ERROR,
				// https://eslint.org/docs/latest/rules/vars-on-top
				// The rule is disabled because `var`-s are prohibited (see the "no-var" rule).
				"vars-on-top": DISABLED,
				// https://eslint.org/docs/latest/rules/yoda
				yoda: ERROR,

				// Layout & formatting.

				// https://eslint.org/docs/latest/rules/unicode-bom
				"unicode-bom": ERROR,

				/*
					==================================================
					Import plugin
					==================================================
				*/

				// Helpful warnings.

				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/export.md
				"import-x/export": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-deprecated.md
				"import-x/no-deprecated": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-empty-named-blocks.md
				"import-x/no-empty-named-blocks": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
				"import-x/no-extraneous-dependencies": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md
				"import-x/no-mutable-exports": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default.md
				"import-x/no-named-as-default": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default-member.md
				"import-x/no-named-as-default-member": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-rename-default.md
				// This rule is disabled because it reports renames for dependencies, which is not useful.
				"import-x/no-rename-default": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unused-modules.md
				/*
					Computationally expensive, no need to slow down CI and development.
					Expected the following usage:
					* From time to time enable this rule and fix issues (if any)
					* Disable this rule
				*/
				/* "import-x/no-unused-modules": [
					ERROR,
					{
						unusedExports: true,
					},
				], */

				// Module systems.

				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-amd.md
				"import-x/no-amd": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-commonjs.md
				"import-x/no-commonjs": [
					ERROR,
					{
						allowConditionalRequire: false,
					},
				],
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-import-module-exports.md
				"import-x/no-import-module-exports": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-nodejs-modules.md
				"import-x/no-nodejs-modules": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/unambiguous.md
				// This rule is disabled because we work with modules only.
				"import-x/unambiguous": DISABLED,

				// Static analysis.

				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/default.md
				"import-x/default": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/named.md
				/*
					The "typescript" config of the plugin already disables it, but it was duplicated here to make it more explicit
					and provide the link to the rule.
				*/
				"import-x/named": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/namespace.md
				"import-x/namespace": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-absolute-path.md
				"import-x/no-absolute-path": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md
				/*
					Computationally expensive, no need to slow down CI and development.
					Expected the following usage:
					* From time to time enable this rule and fix issues (if any)
					* Disable this rule
				*/
				/* "import-x/no-cycle": [
					ERROR,
					{
						maxDepth: Infinity,
						ignoreExternal: true,
					},
				], */
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-dynamic-require.md
				"import-x/no-dynamic-require": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-internal-modules.md
				// This rule is disabled because it is unnecessary to forbid imports from other scopes.
				"import-x/no-internal-modules": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-packages.md
				"import-x/no-relative-packages": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-parent-imports.md
				/*
					This rule is disabled because often it is necessary to import something from the outer folder (a global
					constant, for example).
				*/
				"import-x/no-relative-parent-imports": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-restricted-paths.md
				// This rule is disabled because there are no restricted paths.
				"import-x/no-restricted-paths": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-self-import.md
				"import-x/no-self-import": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
				"import-x/no-unresolved": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-useless-path-segments.md
				"import-x/no-useless-path-segments": [
					ERROR,
					{
						noUselessIndex: true,
					},
				],
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-webpack-loader-syntax.md
				"import-x/no-webpack-loader-syntax": ERROR,

				// Style guide.

				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md
				"import-x/consistent-type-specifier-style": [
					ERROR,
					"prefer-inline",
				],
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/dynamic-import-chunkname.md
				"import-x/dynamic-import-chunkname": [
					// TODO: enable when it starts working.
					DISABLED,
					{
						// kebab-case.
						webpackChunknameFormat: "([a-z][a-z0-9]*)(-[a-z0-9]+)*",
						allowEmpty: false,
					},
				],
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md
				"import-x/exports-last": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
				"import-x/extensions": [
					ERROR,
					"ignorePackages",
					{
						js: "never",
						ts: "never",
						tsx: "never",
					},
				],
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md
				"import-x/first": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md
				"import-x/group-exports": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/max-dependencies.md
				// This rule is disabled because it doesn't make sense to put any restrictions on the dependencies amount.
				"import-x/max-dependencies": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md
				"import-x/newline-after-import": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-anonymous-default-export.md
				"import-x/no-anonymous-default-export": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-default-export.md
				// This rule is disabled because having default exports is necessary for code splitting.
				"import-x/no-default-export": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md
				"import-x/no-duplicates": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-default.md
				"import-x/no-named-default": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-export.md
				// This rule is disabled because named exports and useful.
				"import-x/no-named-export": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-namespace.md
				"import-x/no-namespace": ERROR,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unassigned-import.md
				"import-x/no-unassigned-import": [
					ERROR,
					{
						allow: [
							"**/*.css",
						],
					},
				],
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md
				// The "simple-import-sort/imports" rule takes care of it.
				"import-x/order": DISABLED,
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-default-export.md
				// This rule is disabled because the default exports are used for code-splitting only.
				"import-x/prefer-default-export": DISABLED,

				// https://github.com/lydell/eslint-plugin-simple-import-sort/?tab=readme-ov-file#usage
				"simple-import-sort/imports": ERROR,
				// https://github.com/lydell/eslint-plugin-simple-import-sort/?tab=readme-ov-file#usage
				"simple-import-sort/exports": ERROR,

				// https://github.com/yay/eslint-plugin-import-export-newline?tab=readme-ov-file#usage
				"import-export-newline/import-declaration-newline": ERROR,
				// https://github.com/yay/eslint-plugin-import-export-newline?tab=readme-ov-file#usage
				"import-export-newline/export-declaration-newline": ERROR,

				/*
					==================================================
					Stylistic plugin
					==================================================
				*/

				// https://eslint.style/rules/default/array-bracket-newline
				"@stylistic/array-bracket-newline": [
					ERROR,
					{
						minItems: 1,
					},
				],
				// https://eslint.style/rules/default/array-bracket-spacing
				"@stylistic/array-bracket-spacing": ERROR,
				// https://eslint.style/rules/default/array-element-newline
				"@stylistic/array-element-newline": ERROR,
				// https://eslint.style/rules/default/arrow-parens
				"@stylistic/arrow-parens": [
					ERROR,
					/*
						Always having the parentheses solves the following problems:
						1. It is always clear, that it is a function (see the "@stylistic/no-confusing-arrow" for more details)
						2. It is convenient to add/remove parameters without necessity to add/remove the parentheses
					*/
					"always",
				],
				// https://eslint.style/rules/default/arrow-spacing
				"@stylistic/arrow-spacing": ERROR,
				// https://eslint.style/rules/default/block-spacing
				"@stylistic/block-spacing": [
					ERROR,
					"never",
				],
				// https://eslint.style/rules/default/brace-style
				"@stylistic/brace-style": ERROR,
				// https://eslint.style/rules/default/comma-dangle
				"@stylistic/comma-dangle": [
					ERROR,
					/*
						Having trailing commas when having array items/object keys/values on multiple lines allows us to
						swap/add/remove lines without necessity to add/remove the comma after the adjustments.
					*/
					"always-multiline",
				],
				// https://eslint.style/rules/default/comma-spacing
				"@stylistic/comma-spacing": ERROR,
				// https://eslint.style/rules/default/comma-style
				"@stylistic/comma-style": ERROR,
				// https://eslint.style/rules/default/computed-property-spacing
				"@stylistic/computed-property-spacing": ERROR,
				// https://eslint.style/rules/default/curly-newline
				"@stylistic/curly-newline": ERROR,
				// https://eslint.style/rules/default/dot-location
				"@stylistic/dot-location": [
					ERROR,
					/*
						Having the dot alongside the property allows us to swap/add/remove lines without necessity to adjustment
						the object's line.
					*/
					"property",
				],
				// https://eslint.style/rules/default/eol-last
				"@stylistic/eol-last": ERROR,
				// https://eslint.style/rules/default/function-call-argument-newline
				"@stylistic/function-call-argument-newline": ERROR,
				// https://eslint.style/rules/default/function-call-spacing
				"@stylistic/function-call-spacing": ERROR,
				// https://eslint.style/rules/default/function-paren-newline
				"@stylistic/function-paren-newline": [
					ERROR,
					"multiline-arguments",
				],
				// https://eslint.style/rules/default/generator-star-spacing
				"@stylistic/generator-star-spacing": ERROR,
				// https://eslint.style/rules/default/implicit-arrow-linebreak
				/*
					This rule is disabled because the "arrow-body-style" one indirectly prohibits implicit returns, so we don't
					have to configure rules for such cases. It is also mentioned in that rule's documentation.
				*/
				"@stylistic/implicit-arrow-linebreak": DISABLED,
				// https://eslint.style/rules/default/indent
				"@stylistic/indent": [
					ERROR,
					"tab",
				],
				// https://eslint.style/rules/default/indent-binary-ops
				"@stylistic/indent-binary-ops": [
					ERROR,
					"tab",
				],
				// https://eslint.style/rules/default/key-spacing
				"@stylistic/key-spacing": ERROR,
				// https://eslint.style/rules/default/keyword-spacing
				"@stylistic/keyword-spacing": ERROR,
				// https://eslint.style/rules/default/line-comment-position
				"@stylistic/line-comment-position": ERROR,
				// https://eslint.style/rules/default/linebreak-style
				// This rule is disabled because the line break style doesn't really matter.
				"@stylistic/linebreak-style": DISABLED,
				// https://eslint.style/rules/default/lines-around-comment
				"@stylistic/lines-around-comment": [
					ERROR,
					{
						beforeBlockComment: false,
						allowObjectStart: false,
						allowObjectEnd: false,
						allowArrayStart: false,
						allowArrayEnd: false,
						allowClassStart: false,
						allowClassEnd: false,
						afterHashbangComment: false,
					},
				],
				// https://eslint.style/rules/default/lines-between-class-members
				"@stylistic/lines-between-class-members": ERROR,
				// https://eslint.style/rules/default/max-len
				"@stylistic/max-len": [
					ERROR,
					{
						code: 120,
						tabWidth: 2,
						ignoreComments: true,
						ignoreUrls: true,
						ignoreStrings: false,
						ignoreTemplateLiterals: true,
						ignoreRegExpLiterals: true,
					},
				],
				// https://eslint.style/rules/default/max-statements-per-line
				"@stylistic/max-statements-per-line": ERROR,
				// https://eslint.style/rules/default/member-delimiter-style
				"@stylistic/member-delimiter-style": ERROR,
				// https://eslint.style/rules/default/multiline-comment-style
				// Each comment style is useful in different situation, so it is unnecessary to force only one.
				"@stylistic/multiline-comment-style": DISABLED,
				// https://eslint.style/rules/default/multiline-ternary
				"@stylistic/multiline-ternary": [
					ERROR,
					"always-multiline",
				],
				// https://eslint.style/rules/default/new-parens
				"@stylistic/new-parens": ERROR,
				// https://eslint.style/rules/default/newline-per-chained-call
				"@stylistic/newline-per-chained-call": ERROR,
				// https://eslint.style/rules/default/no-confusing-arrow
				"@stylistic/no-confusing-arrow": [
					ERROR,
					{
						allowParens: false,
					},
				],
				// https://eslint.style/rules/default/no-extra-parens
				"@stylistic/no-extra-parens": [
					ERROR,
					"functions",
				],
				// https://eslint.style/rules/default/no-extra-semi
				"@stylistic/no-extra-semi": ERROR,
				// https://eslint.style/rules/default/no-floating-decimal
				"@stylistic/no-floating-decimal": ERROR,
				// https://eslint.style/rules/default/no-mixed-operators
				"@stylistic/no-mixed-operators": ERROR,
				// https://eslint.style/rules/default/no-mixed-spaces-and-tabs
				"@stylistic/no-mixed-spaces-and-tabs": ERROR,
				// https://eslint.style/rules/default/no-multi-spaces
				"@stylistic/no-multi-spaces": ERROR,
				// https://eslint.style/rules/default/no-multiple-empty-lines
				"@stylistic/no-multiple-empty-lines": [
					ERROR,
					{
						max: 1,
						maxEOF: 0,
						maxBOF: 0,
					},
				],
				// https://eslint.style/rules/default/no-tabs
				"@stylistic/no-tabs": [
					ERROR,
					{
						allowIndentationTabs: true,
					},
				],
				// https://eslint.style/rules/default/no-trailing-spaces
				"@stylistic/no-trailing-spaces": ERROR,
				// https://eslint.style/rules/default/no-whitespace-before-property
				"@stylistic/no-whitespace-before-property": ERROR,
				// https://eslint.style/rules/default/nonblock-statement-body-position
				/*
					This rule is disabled because the "curly" rule adds blocks everywhere, which means there won't be cases this
					rule handles. It is also mentioned in this rule's documentation.
				*/
				"@stylistic/nonblock-statement-body-position": DISABLED,
				// https://eslint.style/rules/default/object-curly-newline
				"@stylistic/object-curly-newline": [
					ERROR,
					// This rule is configured to add new lines to non-empty objects to make it easier to read and modify them.
					{
						ObjectExpression: {
							multiline: true,
							minProperties: 1,
							consistent: true,
						},
						ObjectPattern: "always",
						ImportDeclaration: "always",
						ExportDeclaration: "always",
					},
				],
				// https://eslint.style/rules/default/object-curly-spacing
				"@stylistic/object-curly-spacing": ERROR,
				// https://eslint.style/rules/default/object-property-newline
				"@stylistic/object-property-newline": ERROR,
				// https://eslint.style/rules/default/one-var-declaration-per-line
				// The "one-var" rule takes care of it.
				"@stylistic/one-var-declaration-per-line": DISABLED,
				// https://eslint.style/rules/default/operator-linebreak
				"@stylistic/operator-linebreak": [
					ERROR,
					/*
						It is more readable when the operator and the operand it is applied to are on the same line. It also allows to
						swap/add/remove lines without necessity to adjust the lines above the changed ones.
					*/
					"before",
				],
				// https://eslint.style/rules/default/padded-blocks
				"@stylistic/padded-blocks": [
					ERROR,
					"never",
				],
				// https://eslint.style/rules/default/padding-line-between-statements
				"@stylistic/padding-line-between-statements": [
					ERROR,
					{
						blankLine: "always",
						prev: "*",
						next: [
							"break",
							"return",
							"throw",
							"class",
							"block-like",
							"export",
							"expression",
							"interface",
							"type",
						],
					},
					{
						blankLine: "always",
						prev: [
							"block-like",
							"expression",
						],
						next: "*",
					},
					{
						blankLine: "never",
						prev: "case",
						next: "block-like",
					},
					{
						blankLine: "always",
						prev: "block-like",
						next: "block-like",
					},
					{
						blankLine: "never",
						prev: "export",
						next: "export",
					},
				],
				// https://eslint.style/rules/default/quote-props
				"@stylistic/quote-props": [
					ERROR,
					"as-needed",
				],
				// https://eslint.style/rules/default/quotes
				"@stylistic/quotes": [
					ERROR,
					// Ensures consistency between plain JavaScript/TypeScript code, JSX string props and JSON code.
					"double",
					{
						avoidEscape: true,
					},
				],
				// https://eslint.style/rules/default/rest-spread-spacing
				"@stylistic/rest-spread-spacing": ERROR,
				// https://eslint.style/rules/default/semi
				"@stylistic/semi": ERROR,
				// https://eslint.style/rules/default/semi-spacing
				"@stylistic/semi-spacing": ERROR,
				// https://eslint.style/rules/default/semi-style
				"@stylistic/semi-style": ERROR,
				// https://eslint.style/rules/default/space-before-blocks
				"@stylistic/space-before-blocks": ERROR,
				// https://eslint.style/rules/default/space-before-function-paren
				"@stylistic/space-before-function-paren": [
					ERROR,
					{
						anonymous: "never",
						named: "never",
					},
				],
				// https://eslint.style/rules/default/space-in-parens
				"@stylistic/space-in-parens": ERROR,
				// https://eslint.style/rules/default/space-infix-ops
				"@stylistic/space-infix-ops": ERROR,
				// https://eslint.style/rules/default/space-unary-ops
				"@stylistic/space-unary-ops": ERROR,
				// https://eslint.style/rules/default/spaced-comment
				"@stylistic/spaced-comment": [
					ERROR,
					"always",
					{
						// For triple-slash TypeScript directives.
						markers: [
							"/",
						],
						block: {
							balanced: true,
						},
					},
				],
				// https://eslint.style/rules/default/switch-colon-spacing
				"@stylistic/switch-colon-spacing": ERROR,
				// https://eslint.style/rules/default/template-curly-spacing
				"@stylistic/template-curly-spacing": ERROR,
				// https://eslint.style/rules/default/template-tag-spacing
				"@stylistic/template-tag-spacing": ERROR,
				// https://eslint.style/rules/default/type-annotation-spacing
				"@stylistic/type-annotation-spacing": [
					ERROR,
					{
						before: true,
						after: true,
						overrides: {
							colon: {
								before: false,
								after: true,
							},
							arrow: {
								before: true,
								after: true,
							},
						},
					},
				],
				// https://eslint.style/rules/default/type-generic-spacing
				"@stylistic/type-generic-spacing": ERROR,
				// https://eslint.style/rules/default/type-named-tuple-spacing
				"@stylistic/type-named-tuple-spacing": ERROR,
				// https://eslint.style/rules/default/wrap-iife
				"@stylistic/wrap-iife": [
					ERROR,
					"inside",
					{
						functionPrototypeMethods: true,
					},
				],
				// https://eslint.style/rules/default/wrap-regex
				"@stylistic/wrap-regex": ERROR,
				// https://eslint.style/rules/default/yield-star-spacing
				"@stylistic/yield-star-spacing": ERROR,

				/*
					==================================================
					TypeScript plugin
					==================================================
				*/

				// https://typescript-eslint.io/rules/adjacent-overload-signatures
				"@typescript-eslint/adjacent-overload-signatures": ERROR,
				// https://typescript-eslint.io/rules/array-type
				"@typescript-eslint/array-type": [
					ERROR,
					{
						default: "generic",
						readonly: "generic",
					},
				],
				// https://typescript-eslint.io/rules/await-thenable
				"@typescript-eslint/await-thenable": ERROR,
				// https://typescript-eslint.io/rules/ban-ts-comment
				"@typescript-eslint/ban-ts-comment": ERROR,
				// https://typescript-eslint.io/rules/ban-tslint-comment
				// This rule is disabled because we don't use TSLint.
				"@typescript-eslint/ban-tslint-comment": DISABLED,
				// https://typescript-eslint.io/rules/class-literal-property-style
				"@typescript-eslint/class-literal-property-style": ERROR,
				// https://typescript-eslint.io/rules/class-methods-use-this
				"@typescript-eslint/class-methods-use-this": ERROR,
				// https://typescript-eslint.io/rules/consistent-generic-constructors
				"@typescript-eslint/consistent-generic-constructors": ERROR,
				// https://typescript-eslint.io/rules/consistent-indexed-object-style
				"@typescript-eslint/consistent-indexed-object-style": ERROR,
				// https://typescript-eslint.io/rules/consistent-return
				// TypeScript takes care of it.
				"@typescript-eslint/consistent-return": DISABLED,
				// https://typescript-eslint.io/rules/consistent-type-assertions
				"@typescript-eslint/consistent-type-assertions": ERROR,
				// https://typescript-eslint.io/rules/consistent-type-definitions
				"@typescript-eslint/consistent-type-definitions": ERROR,
				// https://typescript-eslint.io/rules/consistent-type-exports
				"@typescript-eslint/consistent-type-exports": [
					ERROR,
					{
						fixMixedExportsWithInlineTypeSpecifier: true,
					},
				],
				// https://typescript-eslint.io/rules/consistent-type-imports
				"@typescript-eslint/consistent-type-imports": [
					ERROR,
					{
						fixStyle: "inline-type-imports",
					},
				],
				// https://typescript-eslint.io/rules/default-param-last
				"@typescript-eslint/default-param-last": ERROR,
				// https://typescript-eslint.io/rules/dot-notation
				"@typescript-eslint/dot-notation": ERROR,
				// https://typescript-eslint.io/rules/explicit-function-return-type
				"@typescript-eslint/explicit-function-return-type": [
					ERROR,
					{
						allowExpressions: true,
						allowDirectConstAssertionInArrowFunctions: false,
					},
				],
				// https://typescript-eslint.io/rules/explicit-member-accessibility
				"@typescript-eslint/explicit-member-accessibility": ERROR,
				// https://typescript-eslint.io/rules/explicit-module-boundary-types
				"@typescript-eslint/explicit-module-boundary-types": ERROR,
				// https://typescript-eslint.io/rules/init-declarations
				"@typescript-eslint/init-declarations": DISABLED,
				// https://typescript-eslint.io/rules/max-params
				"@typescript-eslint/max-params": ERROR,
				// https://typescript-eslint.io/rules/member-ordering
				"@typescript-eslint/member-ordering": ERROR,
				// https://typescript-eslint.io/rules/method-signature-style
				"@typescript-eslint/method-signature-style": [
					ERROR,
					// Prevents runtime errors: https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
					"property",
				],
				// https://typescript-eslint.io/rules/naming-convention
				"@typescript-eslint/naming-convention": [
					ERROR,
					{
						selector: "default",
						format: [
							"camelCase",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "variable",
						format: [
							"camelCase",
							// For constants with static value.
							"UPPER_CASE",
							// For React components.
							"PascalCase",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "variable",
						types: [
							"boolean",
						],
						format: [
							"PascalCase",
							// For constants with static value.
							"UPPER_CASE",
						],
						prefix: [
							"is",
							"IS_",
							"are",
							"ARE_",
							"does",
							"DOES_",
							"do",
							"DO_",
							"should",
							"SHOULD_",
							"has",
							"HAS_",
							"have",
							"HAVE_",
							"can",
							"CAN_",
							"did",
							"DID_",
							"will",
							"WILL_",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "function",
						format: [
							"camelCase",
							"PascalCase",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "class",
						format: [
							"PascalCase",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: [
							"enum",
							"interface",
							"typeAlias",
							"typeParameter",
						],
						format: [
							"PascalCase",
						],
						custom: {
							/*
								"I" and "T" are commonly used by TypeScript developers, though they don't make sense and don't help with
								anything, that's why they are banned.
							*/
							regex: "^(I|T)[A-Z]",
							match: false,
						},
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "enumMember",
						format: [
							"UPPER_CASE",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "property",
						format: [
							"camelCase",
							// For map keys and enum-like objects.
							"UPPER_CASE",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					// data- and aria- attributes.
					{
						selector: "property",
						format: null,
						modifiers: [
							"requiresQuotes",
						],
						custom: {
							// kebab-case.
							regex: "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
							match: true,
						},
						filter: {
							regex: "^(data|aria)-.+",
							match: true,
						},
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					// CSS variables.
					{
						selector: "property",
						format: null,
						modifiers: [
							"requiresQuotes",
						],
						custom: {
							// kebab-case with two leading dashes.
							regex: "^--([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
							match: true,
						},
						filter: {
							regex: "^--.+",
							match: true,
						},
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					// Date strings.
					{
						selector: "property",
						format: null,
						modifiers: [
							"requiresQuotes",
						],
						custom: {
							// "YYYY-MM-DD" pattern.
							regex: "^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$",
							match: true,
						},
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
					{
						selector: "import",
						format: [
							// CSS Modules.
							"camelCase",
							// React components.
							"PascalCase",
						],
						modifiers: [
							"default",
						],
						leadingUnderscore: "forbid",
						trailingUnderscore: "forbid",
					},
				],
				// https://typescript-eslint.io/rules/no-array-constructor
				"@typescript-eslint/no-array-constructor": ERROR,
				// https://typescript-eslint.io/rules/no-array-delete
				"@typescript-eslint/no-array-delete": ERROR,
				// https://typescript-eslint.io/rules/no-base-to-string
				"@typescript-eslint/no-base-to-string": ERROR,
				// https://typescript-eslint.io/rules/no-confusing-non-null-assertion
				"@typescript-eslint/no-confusing-non-null-assertion": ERROR,
				// https://typescript-eslint.io/rules/no-confusing-void-expression
				"@typescript-eslint/no-confusing-void-expression": ERROR,
				// https://typescript-eslint.io/rules/no-deprecated
				"@typescript-eslint/no-deprecated": ERROR,
				// https://typescript-eslint.io/rules/no-dupe-class-members
				// TypeScript takes care of it.
				"@typescript-eslint/no-dupe-class-members": DISABLED,
				// https://typescript-eslint.io/rules/no-duplicate-enum-values
				"@typescript-eslint/no-duplicate-enum-values": ERROR,
				// https://typescript-eslint.io/rules/no-duplicate-type-constituents
				"@typescript-eslint/no-duplicate-type-constituents": [
					ERROR,
					{
						// Sometimes it makes sense to use type aliases of the same type to clearly describe possible options.
						ignoreUnions: true,
					},
				],
				// https://typescript-eslint.io/rules/no-dynamic-delete
				"@typescript-eslint/no-dynamic-delete": ERROR,
				// https://typescript-eslint.io/rules/no-empty-function
				"@typescript-eslint/no-empty-function": ERROR,
				// https://typescript-eslint.io/rules/no-empty-object-type
				"@typescript-eslint/no-empty-object-type": DISABLED,
				// https://typescript-eslint.io/rules/no-explicit-any
				"@typescript-eslint/no-explicit-any": ERROR,
				// https://typescript-eslint.io/rules/no-extra-non-null-assertion
				"@typescript-eslint/no-extra-non-null-assertion": ERROR,
				// https://typescript-eslint.io/rules/no-extraneous-class
				"@typescript-eslint/no-extraneous-class": ERROR,
				// https://typescript-eslint.io/rules/no-floating-promises
				"@typescript-eslint/no-floating-promises": [
					ERROR,
					{
						checkThenables: true,
						/*
							This option is set to `true` to avoid reports in `useEffect` hooks.
							Details: https://github.com/typescript-eslint/typescript-eslint/issues/1184
						*/
						ignoreVoid: true,
					},
				],
				// https://typescript-eslint.io/rules/no-for-in-array
				"@typescript-eslint/no-for-in-array": ERROR,
				// https://typescript-eslint.io/rules/no-implied-eval
				"@typescript-eslint/no-implied-eval": ERROR,
				// https://typescript-eslint.io/rules/no-import-type-side-effects
				// This rule is disabled because we don't use (and don't need) "verbatimModuleSyntax" TypeScript config flag.
				"@typescript-eslint/no-import-type-side-effects": DISABLED,
				// https://typescript-eslint.io/rules/no-inferrable-types
				"@typescript-eslint/no-inferrable-types": ERROR,
				// https://typescript-eslint.io/rules/no-invalid-this
				// TypeScript takes care of it.
				"@typescript-eslint/no-invalid-this": DISABLED,
				// https://typescript-eslint.io/rules/no-invalid-void-type
				"@typescript-eslint/no-invalid-void-type": ERROR,
				// https://typescript-eslint.io/rules/no-loop-func
				"@typescript-eslint/no-loop-func": ERROR,
				// https://typescript-eslint.io/rules/no-magic-numbers
				// This rule is disabled because it hinders more than helps.
				"@typescript-eslint/no-magic-numbers": DISABLED,
				// https://typescript-eslint.io/rules/no-meaningless-void-operator
				"@typescript-eslint/no-meaningless-void-operator": ERROR,
				// https://typescript-eslint.io/rules/no-misused-new
				"@typescript-eslint/no-misused-new": ERROR,
				// https://typescript-eslint.io/rules/no-misused-promises
				"@typescript-eslint/no-misused-promises": ERROR,
				// https://typescript-eslint.io/rules/no-misused-spread
				"@typescript-eslint/no-misused-spread": ERROR,
				// https://typescript-eslint.io/rules/no-mixed-enums
				"@typescript-eslint/no-mixed-enums": ERROR,
				// https://typescript-eslint.io/rules/no-namespace
				"@typescript-eslint/no-namespace": ERROR,
				// https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
				"@typescript-eslint/no-non-null-asserted-nullish-coalescing": ERROR,
				// https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
				"@typescript-eslint/no-non-null-asserted-optional-chain": ERROR,
				// https://typescript-eslint.io/rules/no-non-null-assertion
				// Please add a comment about why the non-null assertion is used.
				"@typescript-eslint/no-non-null-assertion": ERROR,
				// https://typescript-eslint.io/rules/no-redeclare
				// TypeScript takes care of it.
				"@typescript-eslint/no-redeclare": DISABLED,
				// https://typescript-eslint.io/rules/no-redundant-type-constituents
				"@typescript-eslint/no-redundant-type-constituents": ERROR,
				// https://typescript-eslint.io/rules/no-require-imports
				// The "import-x/no-commonjs" rule takes care of it.
				"@typescript-eslint/no-require-imports": DISABLED,
				// https://typescript-eslint.io/rules/no-restricted-imports
				"@typescript-eslint/no-restricted-imports": ERROR,
				// https://typescript-eslint.io/rules/no-restricted-types
				"@typescript-eslint/no-restricted-types": ERROR,
				// https://typescript-eslint.io/rules/no-shadow
				"@typescript-eslint/no-shadow": [
					ERROR,
					{
						ignoreTypeValueShadow: false,
						ignoreFunctionTypeParameterNameValueShadow: false,
					},
				],
				// https://typescript-eslint.io/rules/no-this-alias
				"@typescript-eslint/no-this-alias": [
					ERROR,
					{
						allowDestructuring: false,
					},
				],
				// https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
				"@typescript-eslint/no-unnecessary-boolean-literal-compare": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-condition
				"@typescript-eslint/no-unnecessary-condition": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment
				"@typescript-eslint/no-unnecessary-parameter-property-assignment": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-qualifier
				"@typescript-eslint/no-unnecessary-qualifier": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-template-expression
				"@typescript-eslint/no-unnecessary-template-expression": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-type-arguments
				"@typescript-eslint/no-unnecessary-type-arguments": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-type-assertion
				"@typescript-eslint/no-unnecessary-type-assertion": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-type-constraint
				"@typescript-eslint/no-unnecessary-type-constraint": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-type-conversion
				"@typescript-eslint/no-unnecessary-type-conversion": ERROR,
				// https://typescript-eslint.io/rules/no-unnecessary-type-parameters
				"@typescript-eslint/no-unnecessary-type-parameters": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-argument
				"@typescript-eslint/no-unsafe-argument": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-assignment
				"@typescript-eslint/no-unsafe-assignment": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-call
				"@typescript-eslint/no-unsafe-call": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-declaration-merging/
				"@typescript-eslint/no-unsafe-declaration-merging": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-enum-comparison
				"@typescript-eslint/no-unsafe-enum-comparison": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-function-type
				"@typescript-eslint/no-unsafe-function-type": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-member-access
				"@typescript-eslint/no-unsafe-member-access": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-return
				"@typescript-eslint/no-unsafe-return": ERROR,
				// https://typescript-eslint.io/rules/no-unsafe-type-assertion
				// This rule is disabled because if there is a type assertion, it was added on purpose.
				"@typescript-eslint/no-unsafe-type-assertion": DISABLED,
				// https://typescript-eslint.io/rules/no-unsafe-unary-minus
				"@typescript-eslint/no-unsafe-unary-minus": ERROR,
				// https://typescript-eslint.io/rules/no-unused-expressions
				"@typescript-eslint/no-unused-expressions": [
					ERROR,
					{
						enforceForJSX: true,
					},
				],
				// https://typescript-eslint.io/rules/no-unused-vars
				"@typescript-eslint/no-unused-vars": ERROR,
				// https://typescript-eslint.io/rules/no-use-before-define
				"@typescript-eslint/no-use-before-define": [
					ERROR,
					{
						ignoreTypeReferences: false,
					},
				],
				// https://typescript-eslint.io/rules/no-useless-constructor
				"@typescript-eslint/no-useless-constructor": ERROR,
				// https://typescript-eslint.io/rules/no-useless-empty-export
				"@typescript-eslint/no-useless-empty-export": ERROR,
				// https://typescript-eslint.io/rules/no-wrapper-object-types
				"@typescript-eslint/no-wrapper-object-types": ERROR,
				// https://typescript-eslint.io/rules/non-nullable-type-assertion-style
				"@typescript-eslint/non-nullable-type-assertion-style": ERROR,
				// https://typescript-eslint.io/rules/only-throw-error
				"@typescript-eslint/only-throw-error": ERROR,
				// https://typescript-eslint.io/rules/parameter-properties
				"@typescript-eslint/parameter-properties": ERROR,
				// https://typescript-eslint.io/rules/prefer-as-const
				"@typescript-eslint/prefer-as-const": ERROR,
				// https://typescript-eslint.io/rules/prefer-destructuring
				"@typescript-eslint/prefer-destructuring": [
					ERROR,
					{
						array: true,
						object: true,
					},
					{
						enforceForDeclarationWithTypeAnnotation: true,
					},
				],
				// https://typescript-eslint.io/rules/prefer-enum-initializers
				"@typescript-eslint/prefer-enum-initializers": ERROR,
				// https://typescript-eslint.io/rules/prefer-find
				"@typescript-eslint/prefer-find": ERROR,
				// https://typescript-eslint.io/rules/prefer-for-of
				"@typescript-eslint/prefer-for-of": ERROR,
				// https://typescript-eslint.io/rules/prefer-function-type
				"@typescript-eslint/prefer-function-type": ERROR,
				// https://typescript-eslint.io/rules/prefer-includes
				"@typescript-eslint/prefer-includes": ERROR,
				// https://typescript-eslint.io/rules/prefer-literal-enum-member
				"@typescript-eslint/prefer-literal-enum-member": ERROR,
				// https://typescript-eslint.io/rules/prefer-namespace-keyword
				"@typescript-eslint/prefer-namespace-keyword": ERROR,
				// https://typescript-eslint.io/rules/prefer-nullish-coalescing
				"@typescript-eslint/prefer-nullish-coalescing": [
					ERROR,
					{
						ignoreConditionalTests: false,
					},
				],
				// https://typescript-eslint.io/rules/prefer-optional-chain
				"@typescript-eslint/prefer-optional-chain": ERROR,
				// https://typescript-eslint.io/rules/prefer-promise-reject-errors
				"@typescript-eslint/prefer-promise-reject-errors": ERROR,
				// https://typescript-eslint.io/rules/prefer-readonly
				"@typescript-eslint/prefer-readonly": ERROR,
				// https://typescript-eslint.io/rules/prefer-readonly-parameter-types
				// This rule is disabled because it hinders more than helps.
				"@typescript-eslint/prefer-readonly-parameter-types": DISABLED,
				// https://typescript-eslint.io/rules/prefer-reduce-type-parameter
				"@typescript-eslint/prefer-reduce-type-parameter": ERROR,
				// https://typescript-eslint.io/rules/prefer-regexp-exec
				"@typescript-eslint/prefer-regexp-exec": ERROR,
				// https://typescript-eslint.io/rules/prefer-return-this-type
				"@typescript-eslint/prefer-return-this-type": ERROR,
				// https://typescript-eslint.io/rules/prefer-string-starts-ends-with
				"@typescript-eslint/prefer-string-starts-ends-with": ERROR,
				// https://typescript-eslint.io/rules/promise-function-async
				"@typescript-eslint/promise-function-async": [
					ERROR,
					{
						allowAny: false,
					},
				],
				// https://typescript-eslint.io/rules/require-array-sort-compare
				"@typescript-eslint/require-array-sort-compare": ERROR,
				// https://typescript-eslint.io/rules/require-await
				"@typescript-eslint/require-await": ERROR,
				// https://typescript-eslint.io/rules/restrict-plus-operands
				"@typescript-eslint/restrict-plus-operands": ERROR,
				// https://typescript-eslint.io/rules/restrict-template-expressions
				"@typescript-eslint/restrict-template-expressions": [
					ERROR,
					{
						// To be compliant with "@typescript-eslint/no-base-to-string" rule.
						allowRegExp: false,
						allowArray: false,
					},
				],
				// https://typescript-eslint.io/rules/return-await
				"@typescript-eslint/return-await": [
					ERROR,
					"always",
				],
				// https://typescript-eslint.io/rules/strict-boolean-expressions
				"@typescript-eslint/strict-boolean-expressions": [
					ERROR,
					{
						allowString: false,
						allowNumber: false,
						allowNullableObject: false,
					},
				],
				// https://typescript-eslint.io/rules/switch-exhaustiveness-check
				"@typescript-eslint/switch-exhaustiveness-check": ERROR,
				// https://typescript-eslint.io/rules/triple-slash-reference
				"@typescript-eslint/triple-slash-reference": ERROR,
				// https://typescript-eslint.io/rules/typedef
				// This rule is disabled because "strict" setting in the TypeScript configs cover this rule's cases.
				"@typescript-eslint/typedef": DISABLED,
				// https://typescript-eslint.io/rules/unbound-method
				"@typescript-eslint/unbound-method": ERROR,
				// https://typescript-eslint.io/rules/unified-signatures
				"@typescript-eslint/unified-signatures": ERROR,
				// https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
				// This rule is disabled because "strict" setting in the TypeScript configs cover this rule's cases.
				"@typescript-eslint/use-unknown-in-catch-callback-variable": DISABLED,
			},
		},
		{
			files: [
				"**/*.tsx",
			],
			extends: [
				react.configs.all,
				react.configs["disable-debug"],
				reactHooksConfigs["recommended-latest"],
				reactRefresh.configs.vite,
			],
			rules: {
				/*
					==================================================
					React plugin
					==================================================
				*/

				// Core rules.

				// https://eslint-react.xyz/docs/rules/avoid-shorthand-boolean
				/*
					Always defining the boolean value solves the following problems:
					1. Keeps the code consistent (since non-boolean props require the value to be explicitly passed)
					2. Allows us to change the value without adding/removing the second part all the time
				*/
				"@eslint-react/avoid-shorthand-boolean": ERROR,
				// https://eslint-react.xyz/docs/rules/avoid-shorthand-fragment
				// The "@eslint-react/prefer-shorthand-fragment" rule takes care of it.
				"@eslint-react/avoid-shorthand-fragment": ERROR,
				// https://eslint-react.xyz/docs/rules/jsx-key-before-spread
				"@eslint-react/jsx-key-before-spread": ERROR,
				// https://eslint-react.xyz/docs/rules/jsx-no-iife
				"@eslint-react/jsx-no-iife": ERROR,
				// https://eslint-react.xyz/docs/rules/jsx-no-undef
				"@eslint-react/jsx-no-undef": ERROR,
				// https://eslint-react.xyz/docs/rules/jsx-uses-react
				"@eslint-react/jsx-uses-react": ERROR,
				// https://eslint-react.xyz/docs/rules/no-access-state-in-setstate
				"@eslint-react/no-access-state-in-setstate": ERROR,
				// https://eslint-react.xyz/docs/rules/no-array-index-key
				"@eslint-react/no-array-index-key": ERROR,
				// https://eslint-react.xyz/docs/rules/no-children-count
				"@eslint-react/no-children-count": ERROR,
				// https://eslint-react.xyz/docs/rules/no-children-for-each
				"@eslint-react/no-children-for-each": ERROR,
				// https://eslint-react.xyz/docs/rules/no-children-map
				"@eslint-react/no-children-map": ERROR,
				// https://eslint-react.xyz/docs/rules/no-children-only
				"@eslint-react/no-children-only": ERROR,
				// https://eslint-react.xyz/docs/rules/no-children-prop
				"@eslint-react/no-children-prop": ERROR,
				// https://eslint-react.xyz/docs/rules/no-children-to-array
				"@eslint-react/no-children-to-array": ERROR,
				// https://eslint-react.xyz/docs/rules/no-class-component
				"@eslint-react/no-class-component": ERROR,
				// https://eslint-react.xyz/docs/rules/no-clone-element
				"@eslint-react/no-clone-element": ERROR,
				// https://eslint-react.xyz/docs/rules/no-comment-textnodes
				"@eslint-react/no-comment-textnodes": ERROR,
				// https://eslint-react.xyz/docs/rules/no-complex-conditional-rendering
				"@eslint-react/no-complex-conditional-rendering": ERROR,
				// https://eslint-react.xyz/docs/rules/no-component-will-mount
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-component-will-mount": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-component-will-receive-props
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-component-will-receive-props": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-component-will-update
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-component-will-update": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-context-provider
				"@eslint-react/no-context-provider": ERROR,
				// https://eslint-react.xyz/docs/rules/no-create-ref
				"@eslint-react/no-create-ref": ERROR,
				// https://eslint-react.xyz/docs/rules/no-default-props
				"@eslint-react/no-default-props": ERROR,
				// https://eslint-react.xyz/docs/rules/no-direct-mutation-state
				"@eslint-react/no-direct-mutation-state": ERROR,
				// https://eslint-react.xyz/docs/rules/no-duplicate-jsx-props
				"@eslint-react/no-duplicate-jsx-props": ERROR,
				// https://eslint-react.xyz/docs/rules/no-duplicate-key
				"@eslint-react/no-duplicate-key": ERROR,
				// https://eslint-react.xyz/docs/rules/no-forward-ref
				"@eslint-react/no-forward-ref": ERROR,
				// https://eslint-react.xyz/docs/rules/no-implicit-key
				"@eslint-react/no-implicit-key": ERROR,
				// https://eslint-react.xyz/docs/rules/no-leaked-conditional-rendering
				"@eslint-react/no-leaked-conditional-rendering": ERROR,
				// https://eslint-react.xyz/docs/rules/no-missing-component-display-name
				"@eslint-react/no-missing-component-display-name": ERROR,
				// https://eslint-react.xyz/docs/rules/no-missing-context-display-name
				"@eslint-react/no-missing-context-display-name": ERROR,
				// https://eslint-react.xyz/docs/rules/no-missing-key
				"@eslint-react/no-missing-key": ERROR,
				// This rule is disabled because the functionality is not going to be used.
				// https://eslint-react.xyz/docs/rules/no-misused-capture-owner-stack
				"@eslint-react/no-misused-capture-owner-stack": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-nested-component-definitions
				"@eslint-react/no-nested-component-definitions": ERROR,
				// https://eslint-react.xyz/docs/rules/no-nested-lazy-component-declarations
				"@eslint-react/no-nested-lazy-component-declarations": ERROR,
				// https://eslint-react.xyz/docs/rules/no-prop-types
				"@eslint-react/no-prop-types": ERROR,
				// https://eslint-react.xyz/docs/rules/no-redundant-should-component-update
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-redundant-should-component-update": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-mount
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-set-state-in-component-did-mount": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-update
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-set-state-in-component-did-update": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-set-state-in-component-will-update
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-set-state-in-component-will-update": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-string-refs
				"@eslint-react/no-string-refs": ERROR,
				// https://eslint-react.xyz/docs/rules/no-unsafe-component-will-mount
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-unsafe-component-will-mount": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-unsafe-component-will-receive-props
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-unsafe-component-will-receive-props": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-unsafe-component-will-update
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-unsafe-component-will-update": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-unstable-context-value
				"@eslint-react/no-unstable-context-value": ERROR,
				// https://eslint-react.xyz/docs/rules/no-unstable-default-props
				"@eslint-react/no-unstable-default-props": ERROR,
				// https://eslint-react.xyz/docs/rules/no-unused-class-component-members
				// The "@eslint-react/no-class-component" rule disallows class components.
				"@eslint-react/no-unused-class-component-members": DISABLED,
				// https://eslint-react.xyz/docs/rules/no-unused-state
				"@eslint-react/no-unused-state": ERROR,
				// https://eslint-react.xyz/docs/rules/no-use-context
				"@eslint-react/no-use-context": ERROR,
				// https://eslint-react.xyz/docs/rules/no-useless-forward-ref
				"@eslint-react/no-useless-forward-ref": ERROR,
				// https://eslint-react.xyz/docs/rules/no-useless-fragment
				"@eslint-react/no-useless-fragment": ERROR,
				// https://eslint-react.xyz/docs/rules/prefer-destructuring-assignment
				"@eslint-react/prefer-destructuring-assignment": ERROR,
				// https://eslint-react.xyz/docs/rules/prefer-react-namespace-import
				"@eslint-react/prefer-react-namespace-import": ERROR,
				// https://eslint-react.xyz/docs/rules/prefer-read-only-props
				// This rule is disabled because the implementation is too naive and hinders more than helps.
				"@eslint-react/prefer-read-only-props": DISABLED,
				// https://eslint-react.xyz/docs/rules/prefer-shorthand-boolean
				// The "@eslint-react/avoid-shorthand-boolean" rule takes care of it.
				"@eslint-react/prefer-shorthand-boolean": DISABLED,
				// https://eslint-react.xyz/docs/rules/prefer-shorthand-fragment
				// The "@eslint-react/avoid-shorthand-fragment" rule takes care of it.
				"@eslint-react/prefer-shorthand-fragment": DISABLED,
				// https://eslint-react.xyz/docs/rules/use-jsx-vars
				"@eslint-react/use-jsx-vars": ERROR,

				// DOM rules.

				// https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml
				"@eslint-react/dom/no-dangerously-set-innerhtml": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children
				"@eslint-react/dom/no-dangerously-set-innerhtml-with-children": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-find-dom-node
				"@eslint-react/dom/no-find-dom-node": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-flush-sync
				"@eslint-react/dom/no-flush-sync": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-hydrate
				"@eslint-react/dom/no-hydrate": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-missing-button-type
				"@eslint-react/dom/no-missing-button-type": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-missing-iframe-sandbox
				"@eslint-react/dom/no-missing-iframe-sandbox": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-namespace
				"@eslint-react/dom/no-namespace": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-render
				"@eslint-react/dom/no-render": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-render-return-value
				"@eslint-react/dom/no-render-return-value": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-script-url
				"@eslint-react/dom/no-script-url": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-unknown-property
				"@eslint-react/dom/no-unknown-property": [
					ERROR,
					{
						requireDataLowercase: true,
					},
				],
				// https://eslint-react.xyz/docs/rules/dom-no-unsafe-iframe-sandbox
				"@eslint-react/dom/no-unsafe-iframe-sandbox": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-unsafe-target-blank
				"@eslint-react/dom/no-unsafe-target-blank": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-use-form-state
				"@eslint-react/dom/no-use-form-state": ERROR,
				// https://eslint-react.xyz/docs/rules/dom-no-void-elements-with-children
				"@eslint-react/dom/no-void-elements-with-children": ERROR,

				// Web API rules.

				// https://eslint-react.xyz/docs/rules/web-api-no-leaked-event-listener
				"@eslint-react/web-api/no-leaked-event-listener": ERROR,
				// https://eslint-react.xyz/docs/rules/web-api-no-leaked-interval
				"@eslint-react/web-api/no-leaked-interval": ERROR,
				// https://eslint-react.xyz/docs/rules/web-api-no-leaked-resize-observer
				"@eslint-react/web-api/no-leaked-resize-observer": ERROR,
				// https://eslint-react.xyz/docs/rules/web-api-no-leaked-timeout
				"@eslint-react/web-api/no-leaked-timeout": ERROR,

				// Hooks extra rules.

				// https://eslint-react.xyz/docs/rules/hooks-extra-no-direct-set-state-in-use-effect
				"@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": WARNING,
				// https://eslint-react.xyz/docs/rules/hooks-extra-no-direct-set-state-in-use-layout-effect
				"@eslint-react/hooks-extra/no-direct-set-state-in-use-layout-effect": WARNING,
				// https://eslint-react.xyz/docs/rules/hooks-extra-no-unnecessary-use-callback
				"@eslint-react/hooks-extra/no-unnecessary-use-callback": ERROR,
				// https://eslint-react.xyz/docs/rules/hooks-extra-no-unnecessary-use-memo
				"@eslint-react/hooks-extra/no-unnecessary-use-memo": ERROR,
				// https://eslint-react.xyz/docs/rules/hooks-extra-no-unnecessary-use-prefix
				"@eslint-react/hooks-extra/no-unnecessary-use-prefix": ERROR,
				// https://eslint-react.xyz/docs/rules/hooks-extra-prefer-use-state-lazy-initialization
				"@eslint-react/hooks-extra/prefer-use-state-lazy-initialization": ERROR,

				// Naming convention rules.

				// https://eslint-react.xyz/docs/rules/naming-convention-component-name
				"@eslint-react/naming-convention/component-name": ERROR,
				// https://eslint-react.xyz/docs/rules/naming-convention-context-name
				"@eslint-react/naming-convention/context-name": ERROR,
				// https://eslint-react.xyz/docs/rules/naming-convention-filename
				"@eslint-react/naming-convention/filename": [
					ERROR,
					"kebab-case",
				],
				// https://eslint-react.xyz/docs/rules/naming-convention-filename-extension
				"@eslint-react/naming-convention/filename-extension": ERROR,
				// https://eslint-react.xyz/docs/rules/naming-convention-use-state
				"@eslint-react/naming-convention/use-state": ERROR,

				/*
					==================================================
					React Hooks plugin
					==================================================
				*/

				// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
				"react-hooks/exhaustive-deps": WARNING,
				// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
				"react-hooks/rules-of-hooks": ERROR,

				/*
					==================================================
					React Refresh plugin
					==================================================
				*/

				// https://github.com/ArnaudBarre/eslint-plugin-react-refresh?tab=readme-ov-file#usage
				"react-refresh/only-export-components": ERROR,

				/*
					==================================================
					Stylistic plugin
					==================================================
				*/

				// https://eslint.style/rules/default/jsx-child-element-spacing
				"@stylistic/jsx-child-element-spacing": WARNING,
				// https://eslint.style/rules/default/jsx-closing-bracket-location
				"@stylistic/jsx-closing-bracket-location": [
					ERROR,
					"line-aligned",
				],
				// https://eslint.style/rules/default/jsx-closing-tag-location
				"@stylistic/jsx-closing-tag-location": ERROR,
				// https://eslint.style/rules/default/jsx-curly-brace-presence
				"@stylistic/jsx-curly-brace-presence": [
					ERROR,
					"never",
				],
				// https://eslint.style/rules/default/jsx-curly-newline
				"@stylistic/jsx-curly-newline": ERROR,
				// https://eslint.style/rules/default/jsx-curly-spacing
				"@stylistic/jsx-curly-spacing": [
					ERROR,
					{
						children: true,
					},
				],
				// https://eslint.style/rules/default/jsx-equals-spacing
				"@stylistic/jsx-equals-spacing": ERROR,
				// https://eslint.style/rules/default/jsx-first-prop-new-line
				"@stylistic/jsx-first-prop-new-line": [
					ERROR,
					"always",
				],
				// https://eslint.style/rules/default/jsx-function-call-newline
				"@stylistic/jsx-function-call-newline": [
					ERROR,
					"always",
				],
				// https://eslint.style/rules/default/jsx-indent-props
				"@stylistic/jsx-indent-props": [
					ERROR,
					"tab",
				],
				// https://eslint.style/rules/default/jsx-max-props-per-line
				"@stylistic/jsx-max-props-per-line": ERROR,
				// https://eslint.style/rules/default/jsx-newline
				// This rule is disabled because separating JSX blocks by newlines makes the code more readable.
				"@stylistic/jsx-newline": [
					ERROR,
					{
						prevent: true,
						allowMultilines: true,
					},
				],
				// https://eslint.style/rules/default/jsx-one-expression-per-line
				"@stylistic/jsx-one-expression-per-line": ERROR,
				// https://eslint.style/rules/default/jsx-pascal-case
				"@stylistic/jsx-pascal-case": ERROR,
				// https://eslint.style/rules/default/jsx-props-no-multi-spaces
				"@stylistic/jsx-props-no-multi-spaces": ERROR,
				// https://eslint.style/rules/default/jsx-quotes
				"@stylistic/jsx-quotes": ERROR,
				// https://eslint.style/rules/default/jsx-self-closing-comp
				"@stylistic/jsx-self-closing-comp": [
					ERROR,
					{
						component: true,
						html: true,
					},
				],
				// https://eslint.style/rules/default/jsx-sort-props
				"@stylistic/jsx-sort-props": ERROR,
				// https://eslint.style/rules/default/jsx-tag-spacing
				"@stylistic/jsx-tag-spacing": [
					ERROR,
					{
						// Simplifies adding a new line to pass/remove props without necessity to add/remove the whitespace.
						closingSlash: "never",
						beforeSelfClosing: "never",
						beforeClosing: "never",
					},
				],
				// https://eslint.style/rules/default/jsx-wrap-multilines
				"@stylistic/jsx-wrap-multilines": [
					ERROR,
					{
						declaration: "parens-new-line",
						assignment: "parens-new-line",
						return: "parens-new-line",
						arrow: "parens-new-line",
						condition: "parens-new-line",
						logical: "parens-new-line",
						prop: "parens-new-line",
						propertyValue: "parens-new-line",
					},
				],
			},
		},
		{
			files: [
				"eslint.config.ts",
			],
			rules: {
				"capitalized-comments": DISABLED,
				"sort-keys": DISABLED,
				"@typescript-eslint/naming-convention": DISABLED,
			},
		},
	),
);

export default eslintConfig;
```

</details>

### package.json

```jsonc
{
	// ... other options
	"scripts": {
		// ... other options
		"check:eslint": "bun --bun eslint . --quiet"
	}
}
```

`bun --bun` is required, because ESLint won't recognize Bun's usage otherwise, and will throw an error about absent `jiti` package.

### .vscode/extensions.json

```jsonc
{
	"recommendations": [
		// ... other options
		"dbaeumer.vscode-eslint"
	]
}
```

### .vscode/settings.json

```jsonc
{
	// ... other options
	"[javascript][javascriptreact][typescript][typescriptreact]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit"
	},
	/*
		Necessary to support ESLint TypeScript config file.
		More info: https://github.com/microsoft/vscode-eslint/issues/1917#issuecomment-3059655482
	*/
	"eslint.runtime": "bun"
}
```

## Styles

### UnoCSS

[UnoCSS official site](https://unocss.dev)

#### Installation

```sh
bun add -D -E unocss@66.3.3 @unocss/eslint-config@66.3.3
```

#### vite.config.ts

```typescript
import unoCSS from "unocss/vite";

const config = defineConfig({
	// ... other options
	plugins: [
		// ... other options
		unoCSS(),
	],
});

export default config;
```

#### uno.config.ts

```typescript
import {
	defineConfig,
} from "unocss";

const config = defineConfig({
	presets: [],
});

export default config;
```

#### main.tsx

```typescript
// ... other options
import "virtual:uno.css";
```

### tsconfig.node.json

```jsonc
{
	// ... other options
	"include": [
		// ... other options
		"uno.config.ts"
	]
}
```

#### eslint.config.ts

```typescript
// ... other options
import unocss from "@unocss/eslint-config/flat";

const eslintConfig = disableAutofix(
	config(
		// ... other options
		{
			files: [
				"**/*.tsx",
			],
			extends: [
				// ... other options
				unocss,
			],
			rules: [
				// ... other options

				/*
					==================================================
					UnoCSS plugin
					==================================================
				*/

				// https://unocss.dev/integrations/eslint#unocss-order
				"unocss/order": ERROR,
				"unocss/order-attributify": ERROR,
				// https://unocss.dev/integrations/eslint#unocss-blocklist
				"unocss/blocklist": ERROR,
				// https://unocss.dev/integrations/eslint#unocss-enforce-class-compile
				// The rule is disabled because compile class transformer is not used.
				"unocss/enforce-class-compile": DISABLED,
			],
		},
	)
);
```

#### .vscode/extensions.json

```jsonc
{
	"recommendations": [
		// ... other options
		"antfu.unocss"
	]
}
```
