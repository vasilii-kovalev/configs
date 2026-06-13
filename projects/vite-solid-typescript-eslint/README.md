# Vite + Solid + TypeScript + ESLint

## Prerequisites

- Node.js version: 24.14.1 or later

## Installation

### Scaffolding

```sh
npm create vite
```

1. Select "Solid"
2. Select "TypeScript"

### `dependencies`

```sh
npm install -E solid-js@1.9.13
```

### `devDependencies`

```sh
npm install -E -D @eslint/js@10.0.1 @morev/eslint-disable-autofix@1.1.0 @stylistic/eslint-plugin@5.10.0 @types/node@25.9.2 eslint@10.4.1 eslint-import-resolver-typescript@4.4.5 eslint-plugin-import-x@4.16.2 eslint-plugin-simple-import-sort@13.0.0 eslint-plugin-solid@0.14.5 eslint-plugin-unicorn@64.0.0 globals@17.6.0 solid-devtools@0.34.5 sonda@0.13.0 typescript@6.0.3 typescript-eslint@8.60.1 vite@8.0.16 vite-plugin-solid@2.11.12
```

## `package.json`

```json
{
	"scripts": {
		"dev": "vite",
		"build": "tsc --build && vite build",
		"preview": "vite preview",
		"check:types": "tsc --build",
		"check:eslint": "eslint . --quiet --flag unstable_native_nodejs_ts_config",
		"fix:eslint": "eslint . --quiet --fix --flag unstable_native_nodejs_ts_config"
	},
	"dependencies": {
		"solid-js": "1.9.13"
	},
	"devDependencies": {
		"@eslint/js": "10.0.1",
		"@morev/eslint-disable-autofix": "1.1.0",
		"@stylistic/eslint-plugin": "5.10.0",
		"@types/node": "25.9.2",
		"eslint": "10.4.1",
		"eslint-import-resolver-typescript": "4.4.5",
		"eslint-plugin-import-x": "4.16.2",
		"eslint-plugin-simple-import-sort": "13.0.0",
		"eslint-plugin-solid": "0.14.5",
		"eslint-plugin-unicorn": "64.0.0",
		"globals": "17.6.0",
		"solid-devtools": "0.34.5",
		"sonda": "0.13.0",
		"typescript": "6.0.3",
		"typescript-eslint": "8.60.1",
		"vite": "8.0.16",
		"vite-plugin-solid": "2.11.12"
	},
	"overrides": {
		"eslint-plugin-solid": {
			"eslint": "$eslint"
		},
		"solid-devtools": {
			"vite": "$vite"
		}
	}
}
```

## Vite

### `vite.config.ts`

```typescript
import solidDevtools from "solid-devtools/vite";
import sonda from "sonda/vite";
import {
	defineConfig,
} from "vite";
import solid from "vite-plugin-solid";

// https://vite.dev/config
const config = defineConfig({
	build: {
		// Required for Sonda.
		sourcemap: true,
	},
	plugins: [
		solidDevtools(),
		solid(),
		sonda(),
	],
	resolve: {
		tsconfigPaths: true,
	},
});

export default config;
```

## Entry point

### `src/index.tsx`

```tsx
/* @refresh reload */
// eslint-disable-next-line import-x/no-unassigned-import
import "solid-devtools";

// The rest of the application.
```

## TypeScript

### `tsconfig.app.json`

```json
{
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
		"target": "esnext",
		"lib": [
			"ESNext",
			"DOM",
			"DOM.Iterable"
		],
		"module": "esnext",
		"types": [
			"vite/client"
		],
		"skipLibCheck": true,
		"paths": {
			"@/*": [
				"./src/*"
			]
		},

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"moduleDetection": "force",
		"noEmit": true,
		"jsx": "preserve",
		"jsxImportSource": "solid-js",

		/* Linting */
		"allowUnreachableCode": false,
		"erasableSyntaxOnly": true,
		"noFallthroughCasesInSwitch": true,
		"noImplicitReturns": true,
		"noUncheckedIndexedAccess": true
	},
	"include": [
		"src"
	]
}
```

### `tsconfig.json`

```json
{
	"files": [],
	"references": [
		{
			"path": "./tsconfig.app.json"
		},
		{
			"path": "./tsconfig.node.json"
		}
	]
}
```

### `tsconfig.node.json`

```json
{
	"compilerOptions": {
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
		"target": "esnext",
		"lib": [
			"ESNext"
		],
		"module": "nodenext",
		"types": [
			"node"
		],
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "nodenext",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"moduleDetection": "force",
		"noEmit": true,

		/* Linting */
		"allowUnreachableCode": false,
		"erasableSyntaxOnly": true,
		"noFallthroughCasesInSwitch": true,
		"noImplicitReturns": true,
		"noUncheckedIndexedAccess": true
	},
	"include": [
		"eslint.config.ts",
		"vite.config.ts"
	]
}
```

## ESLint

### `eslint.config.ts`

<details>

  <summary>Click to expand code block</summary>

```typescript
import js from "@eslint/js";
import {
	disableAutofix,
} from "@morev/eslint-disable-autofix";
import stylistic from "@stylistic/eslint-plugin";
import {
	type Linter,
} from "eslint";
import {
	defineConfig,
	globalIgnores,
} from "eslint/config";
import {
	createTypeScriptImportResolver,
} from "eslint-import-resolver-typescript";
import {
	flatConfigs as importConfigs,
} from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import solid from "eslint-plugin-solid/configs/typescript";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import {
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

/*
	Overlapping enforcers are set this way:
	* Coverage:
		* The same concern can be checked by several enforcers - plugin rules and TypeScript compiler
		* They are grouped by what they check, not by package or tsconfig origin
		* Only the minimal set that matches the intended policy stays on; the rest are off
			to avoid duplicate reports
	* Disabled rules:
		* Each off rule names what actually covers the concern:
			* Another rule: "The "<rule>" rule takes care of it."
			* The compiler: "TypeScript takes care of it (<detail>)."
		* An off rule is never pointed at another rule that is also off
		* Compiler-delegated "<detail>" is a tsconfig flag when the compiler exposes one, or
			built-in check when the behavior is always on
	* Rule entries:
		* Severity, options, and why a rule is off live on that rule's own entry, not on a
			related rule's comment
*/

const eslintConfig = disableAutofix(
	defineConfig(
		globalIgnores([
			"dist",
		]),
		{
			files: [
				"**/*.{ts,tsx}",
			],
			extends: [
				js.configs.all,
				typeScriptConfigs.all,
				eslintPluginUnicorn.configs.all,
				// import-x JSX preset (not React framework).
				importConfigs.react,
				importConfigs.typescript,
				stylistic.configs.all,
			],
			settings: {
				"import-x/resolver-next": [
					createTypeScriptImportResolver(),
				],
			},
			languageOptions: {
				parserOptions: {
					sourceType: "module",
					ecmaVersion: "latest",
					projectService: true,
					tsconfigRootDir: import.meta.dirname,
				},
			},
			linterOptions: {
				reportUnusedDisableDirectives: ERROR,
			},
			plugins: {
				"simple-import-sort": simpleImportSort,
			},
			rules: {
				/*
					==================================================
					JavaScript plugin
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
				// TypeScript takes care of it (built-in class inheritance check).
				"constructor-super": DISABLED,
				// https://eslint.org/docs/latest/rules/for-direction
				"for-direction": ERROR,
				// https://eslint.org/docs/latest/rules/getter-return
				// TypeScript takes care of it (built-in accessor check).
				"getter-return": DISABLED,
				// https://eslint.org/docs/latest/rules/no-async-promise-executor
				"no-async-promise-executor": ERROR,
				// https://eslint.org/docs/latest/rules/no-await-in-loop
				"no-await-in-loop": ERROR,
				// https://eslint.org/docs/latest/rules/no-class-assign
				// TypeScript takes care of it (built-in assignment check).
				"no-class-assign": DISABLED,
				// https://eslint.org/docs/latest/rules/no-compare-neg-zero
				"no-compare-neg-zero": ERROR,
				// https://eslint.org/docs/latest/rules/no-cond-assign
				"no-cond-assign": [
					ERROR,
					"always",
				],
				// https://eslint.org/docs/latest/rules/no-const-assign
				// TypeScript takes care of it (built-in assignment check).
				"no-const-assign": DISABLED,
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
				// TypeScript takes care of it (built-in duplicate identifier check).
				"no-dupe-args": DISABLED,
				// https://eslint.org/docs/latest/rules/no-dupe-class-members
				// TypeScript takes care of it (built-in duplicate class member check).
				"no-dupe-class-members": DISABLED,
				// https://eslint.org/docs/latest/rules/no-dupe-else-if
				"no-dupe-else-if": ERROR,
				// https://eslint.org/docs/latest/rules/no-dupe-keys
				// TypeScript takes care of it (built-in duplicate property check).
				"no-dupe-keys": DISABLED,
				// https://eslint.org/docs/latest/rules/no-duplicate-case
				"no-duplicate-case": ERROR,
				// https://eslint.org/docs/latest/rules/no-duplicate-imports
				// The "import-x/no-duplicates" rule takes care of it.
				"no-duplicate-imports": DISABLED,
				// https://eslint.org/docs/latest/rules/no-empty-character-class
				"no-empty-character-class": ERROR,
				// https://eslint.org/docs/latest/rules/no-empty-pattern
				"no-empty-pattern": ERROR,
				// https://eslint.org/docs/latest/rules/no-ex-assign
				"no-ex-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-fallthrough
				// TypeScript takes care of it (noFallthroughCasesInSwitch: true).
				"no-fallthrough": DISABLED,
				// https://eslint.org/docs/latest/rules/no-func-assign
				// TypeScript takes care of it (built-in assignment check).
				"no-func-assign": DISABLED,
				// https://eslint.org/docs/latest/rules/no-import-assign
				// TypeScript takes care of it (built-in assignment check).
				"no-import-assign": DISABLED,
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
				// TypeScript takes care of it (built-in constructability check).
				"no-new-native-nonconstructor": DISABLED,
				// https://eslint.org/docs/latest/rules/no-obj-calls
				// TypeScript takes care of it (built-in callability check).
				"no-obj-calls": DISABLED,
				// https://eslint.org/docs/latest/rules/no-promise-executor-return
				"no-promise-executor-return": ERROR,
				// https://eslint.org/docs/latest/rules/no-prototype-builtins
				"no-prototype-builtins": ERROR,
				// https://eslint.org/docs/latest/rules/no-self-assign
				"no-self-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-self-compare
				"no-self-compare": ERROR,
				// https://eslint.org/docs/latest/rules/no-setter-return
				// TypeScript takes care of it (built-in accessor check).
				"no-setter-return": DISABLED,
				// https://eslint.org/docs/latest/rules/no-sparse-arrays
				"no-sparse-arrays": ERROR,
				// https://eslint.org/docs/latest/rules/no-template-curly-in-string
				"no-template-curly-in-string": ERROR,
				// https://eslint.org/docs/latest/rules/no-this-before-super
				// TypeScript takes care of it (built-in class inheritance check).
				"no-this-before-super": DISABLED,
				// https://eslint.org/docs/latest/rules/no-unassigned-vars
				"no-unassigned-vars": ERROR,
				// https://eslint.org/docs/latest/rules/no-undef
				"no-undef": ERROR,
				// https://eslint.org/docs/latest/rules/no-unexpected-multiline
				"no-unexpected-multiline": ERROR,
				// https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
				"no-unmodified-loop-condition": ERROR,
				// https://eslint.org/docs/latest/rules/no-unreachable
				// TypeScript takes care of it (allowUnreachableCode: false).
				"no-unreachable": DISABLED,
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
				// The "@typescript-eslint/no-unused-private-class-members" rule takes care of it.
				"no-unused-private-class-members": DISABLED,
				// https://eslint.org/docs/latest/rules/no-unused-vars
				// The "@typescript-eslint/no-unused-vars" rule takes care of it.
				"no-unused-vars": DISABLED,
				// https://eslint.org/docs/latest/rules/no-use-before-define
				// The "@typescript-eslint/no-use-before-define" rule takes care of it.
				"no-use-before-define": DISABLED,
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
				// The "@typescript-eslint/class-methods-use-this" rule takes care of it.
				"class-methods-use-this": DISABLED,
				// https://eslint.org/docs/latest/rules/complexity
				complexity: ERROR,
				// https://eslint.org/docs/latest/rules/consistent-return
				// The "@typescript-eslint/consistent-return" rule takes care of it.
				"consistent-return": DISABLED,
				// https://eslint.org/docs/latest/rules/consistent-this
				"consistent-this": ERROR,
				// https://eslint.org/docs/latest/rules/curly
				curly: ERROR,
				// https://eslint.org/docs/latest/rules/default-case
				"default-case": ERROR,
				// https://eslint.org/docs/latest/rules/default-case-last
				"default-case-last": ERROR,
				// https://eslint.org/docs/latest/rules/default-param-last
				// The "@typescript-eslint/default-param-last" rule takes care of it.
				"default-param-last": DISABLED,
				// https://eslint.org/docs/latest/rules/dot-notation
				// The "@typescript-eslint/dot-notation" rule takes care of it.
				"dot-notation": DISABLED,
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
					// Please choose a more appropriate name related to this function's purpose.
					"callback",
					// Please choose a more appropriate name related to this variable's data.
					"accumulator",
					// Can be changed to `submitButtonElement`, for example.
					"element",
				],
				// https://eslint.org/docs/latest/rules/id-length
				"id-length": ERROR,
				// https://eslint.org/docs/latest/rules/id-match
				// This rule is disabled because enforcing any naming convention is unnecessary.
				"id-match": DISABLED,
				// https://eslint.org/docs/latest/rules/init-declarations
				// The rule "@typescript-eslint/init-declarations" takes care of it.
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
				// The "@typescript-eslint/max-params" rule takes care of it.
				"max-params": DISABLED,
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
				// The "@typescript-eslint/no-array-constructor" rule takes care of it.
				"no-array-constructor": DISABLED,
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
				// This rule is disabled because it is used in `for...of` loops.
				"no-continue": DISABLED,
				// https://eslint.org/docs/latest/rules/no-delete-var
				// This rule is disabled because `var`-s are prohibited (see the "no-var" rule).
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
				// The "@typescript-eslint/no-empty-function" rule takes care of it.
				"no-empty-function": DISABLED,
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
				// The "@typescript-eslint/no-implied-eval" rule takes care of it.
				"no-implied-eval": DISABLED,
				// https://eslint.org/docs/latest/rules/no-inline-comments
				/*
					There is an overlap with the "@stylistic/line-comment-position" rule, but that rule handles only single line
					comments, while this one handles all the types.
				*/
				"no-inline-comments": ERROR,
				// https://eslint.org/docs/latest/rules/no-invalid-this
				// The "@typescript-eslint/no-invalid-this" rule takes care of it.
				"no-invalid-this": DISABLED,
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
				// The "@typescript-eslint/no-loop-func" rule takes care of it.
				"no-loop-func": DISABLED,
				// https://eslint.org/docs/latest/rules/no-magic-numbers
				// This rule is disabled because it hinders more than helps.
				"no-magic-numbers": DISABLED,
				// https://eslint.org/docs/latest/rules/no-multi-assign
				"no-multi-assign": ERROR,
				// https://eslint.org/docs/latest/rules/no-multi-str
				"no-multi-str": ERROR,
				// https://eslint.org/docs/latest/rules/no-negated-condition
				// The "unicorn/no-negated-condition" rule takes care of it.
				"no-negated-condition": DISABLED,
				// https://eslint.org/docs/latest/rules/no-nested-ternary
				// The "unicorn/no-nested-ternary" rule takes care of it.
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
				// The "@typescript-eslint/no-redeclare" rule takes care of it.
				"no-redeclare": DISABLED,
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
				// The "@typescript-eslint/no-restricted-imports" rule takes care of it.
				"no-restricted-imports": DISABLED,
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
				// The "@typescript-eslint/no-shadow" rule takes care of it.
				"no-shadow": DISABLED,
				// https://eslint.org/docs/latest/rules/no-shadow-restricted-names
				"no-shadow-restricted-names": ERROR,
				// https://eslint.org/docs/latest/rules/no-ternary
				// This rule is disabled because ternaries are allowed.
				"no-ternary": DISABLED,
				// https://eslint.org/docs/latest/rules/no-throw-literal
				// The "@typescript-eslint/only-throw-error" rule takes care of it.
				"no-throw-literal": DISABLED,
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
				// The "@typescript-eslint/no-unused-expressions" rule takes care of it.
				"no-unused-expressions": DISABLED,
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
				// The "@typescript-eslint/no-useless-constructor" rule takes care of it.
				"no-useless-constructor": DISABLED,
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
							The value is set to `true` to avoid conflicts with the "@typescript-eslint/no-use-before-define" rule (as
							described in the documentation).
						*/
						ignoreReadBeforeAssign: true,
					},
				],
				// https://eslint.org/docs/latest/rules/prefer-destructuring
				// The "@typescript-eslint/prefer-destructuring" rule takes care of it.
				"prefer-destructuring": DISABLED,
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
				// The "@typescript-eslint/prefer-promise-reject-errors" rule takes care of it.
				"prefer-promise-reject-errors": DISABLED,
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
				// https://eslint.org/docs/latest/rules/preserve-caught-error
				"preserve-caught-error": [
					ERROR,
					{
						requireCatchParameter: true,
					},
				],
				// https://eslint.org/docs/latest/rules/radix
				radix: ERROR,
				// https://eslint.org/docs/latest/rules/require-await
				// The "@typescript-eslint/require-await" rule takes care of it.
				"require-await": DISABLED,
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
				/*
					This rule is disabled because ECMAScript modules are always in strict mode (see "sourceType" in
					"languageOptions"), and CommonJS patterns are handled by the "import-x/no-commonjs" and
					"unicorn/prefer-module" rules.
				*/
				strict: DISABLED,
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
					Unicorn plugin
					==================================================
				*/

				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
				"unicorn/better-regex": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
				"unicorn/catch-error-name": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-assert.md
				// This rule is disabled because `node:assert` is not used.
				"unicorn/consistent-assert": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-date-clone.md
				"unicorn/consistent-date-clone": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
				"unicorn/consistent-destructuring": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-empty-array-spread.md
				"unicorn/consistent-empty-array-spread": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-existence-index-check.md
				"unicorn/consistent-existence-index-check": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
				"unicorn/consistent-function-scoping": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-template-literal-escape.md
				"unicorn/consistent-template-literal-escape": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
				"unicorn/custom-error-definition": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/empty-brace-spaces.md
				"unicorn/empty-brace-spaces": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md
				"unicorn/error-message": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md
				"unicorn/escape-case": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
				// This rule is disabled because it is unnecessary to limit TODO comments' lifetime.
				"unicorn/expiring-todo-comments": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
				"unicorn/explicit-length-check": [
					ERROR,
					{
						// Consistent with `consistent-existence-index-check` rule.
						"non-zero": "not-equal",
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
				"unicorn/filename-case": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
				// This rule is disabled because "import" plugin and TypeScript handle import styles.
				"unicorn/import-style": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/isolated-functions.md
				"unicorn/isolated-functions": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
				"unicorn/new-for-builtins": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
				"unicorn/no-abusive-eslint-disable": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-accessor-recursion.md
				"unicorn/no-accessor-recursion": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-anonymous-default-export.md
				"unicorn/no-anonymous-default-export": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md
				"unicorn/no-array-callback-reference": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
				"unicorn/no-array-for-each": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md
				"unicorn/no-array-method-this-argument": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
				"unicorn/no-array-reduce": [
					ERROR,
					{
						allowSimpleOperations: false,
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reverse.md
				"unicorn/no-array-reverse": [
					ERROR,
					{
						allowExpressionStatement: false,
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-sort.md
				"unicorn/no-array-sort": [
					ERROR,
					{
						allowExpressionStatement: false,
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md
				"unicorn/no-await-expression-member": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-in-promise-methods.md
				"unicorn/no-await-in-promise-methods": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md
				"unicorn/no-console-spaces": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md
				"unicorn/no-document-cookie": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md
				"unicorn/no-empty-file": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
				"unicorn/no-for-loop": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md
				"unicorn/no-hex-escape": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-immediate-mutation.md
				"unicorn/no-immediate-mutation": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-builtins.md
				"unicorn/no-instanceof-builtins": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-fetch-options.md
				"unicorn/no-invalid-fetch-options": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md
				"unicorn/no-invalid-remove-event-listener": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
				"unicorn/no-keyword-prefix": [
					ERROR,
					{
						disallowedPrefixes: [
							"new",
						],
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
				"unicorn/no-lonely-if": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-magic-array-flat-depth.md
				"unicorn/no-magic-array-flat-depth": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-named-default.md
				// The "import-x/no-named-default" rule takes care of it.
				"unicorn/no-named-default": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md
				"unicorn/no-negated-condition": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negation-in-equality-check.md
				"unicorn/no-negation-in-equality-check": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
				"unicorn/no-nested-ternary": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
				/*
					The "@typescript-eslint/no-array-constructor" rule allows `new Array(singleArg)` (sparse length). This rule
					covers that ambiguous case.
				*/
				"unicorn/no-new-array": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
				// The rule is disabled because Node.js is not used.
				"unicorn/no-new-buffer": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
				/*
					This rule is disabled because in components if `undefined` is returned,
					it will conflict with the "unicorn/no-useless-undefined" rule.
					It is better to keep an eye on `null` usage manually.
				*/
				"unicorn/no-null": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md
				"unicorn/no-object-as-default-parameter": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md
				// The rule is disabled because Node.js is not used.
				"unicorn/no-process-exit": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-single-promise-in-promise-methods.md
				"unicorn/no-single-promise-in-promise-methods": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md
				"unicorn/no-static-only-class": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md
				"unicorn/no-thenable": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md
				"unicorn/no-this-assignment": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-typeof-undefined.md
				"unicorn/no-typeof-undefined": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-flat-depth.md
				"unicorn/no-unnecessary-array-flat-depth": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-splice-count.md
				"unicorn/no-unnecessary-array-splice-count": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-await.md
				"unicorn/no-unnecessary-await": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-polyfills.md
				// This rule is disabled because polyfills are not used.
				"unicorn/no-unnecessary-polyfills": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-slice-end.md
				"unicorn/no-unnecessary-slice-end": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md
				"unicorn/no-unreadable-array-destructuring": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-iife.md
				"unicorn/no-unreadable-iife": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md
				// This rule is disabled because of its limited scope.
				"unicorn/no-unused-properties": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-collection-argument.md
				"unicorn/no-useless-collection-argument": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-error-capture-stack-trace.md
				"unicorn/no-useless-error-capture-stack-trace": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md
				"unicorn/no-useless-fallback-in-spread": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-iterator-to-array.md
				"unicorn/no-useless-iterator-to-array": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md
				// This rule is disabled because arrays' emptiness is checked via `isEmpty` utility.
				"unicorn/no-useless-length-check": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md
				"unicorn/no-useless-promise-resolve-reject": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md
				"unicorn/no-useless-spread": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md
				"unicorn/no-useless-switch-case": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md
				"unicorn/no-useless-undefined": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
				"unicorn/no-zero-fractions": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
				"unicorn/number-literal-case": [
					ERROR,
					{
						hexadecimalValue: "lowercase",
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
				"unicorn/numeric-separators-style": [
					ERROR,
					{
						number: {
							minimumDigits: 4,
						},
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
				"unicorn/prefer-add-event-listener": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
				"unicorn/prefer-array-find": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
				"unicorn/prefer-array-flat": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md
				"unicorn/prefer-array-flat-map": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
				"unicorn/prefer-array-index-of": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
				"unicorn/prefer-array-some": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md
				"unicorn/prefer-at": [
					ERROR,
					{
						checkAllIndexAccess: true,
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-bigint-literals.md
				"unicorn/prefer-bigint-literals": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md
				"unicorn/prefer-blob-reading-methods": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-class-fields.md
				"unicorn/prefer-class-fields": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-classlist-toggle.md
				"unicorn/prefer-classlist-toggle": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md
				"unicorn/prefer-code-point": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
				"unicorn/prefer-date-now": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md
				"unicorn/prefer-default-parameters": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
				"unicorn/prefer-dom-node-append": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md
				// This rule is disabled to maintain consistency with setting/removing of other attributes.
				"unicorn/prefer-dom-node-dataset": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md
				"unicorn/prefer-dom-node-remove": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
				"unicorn/prefer-dom-node-text-content": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-event-target.md
				// This rule is disabled because Node.js is not used.
				"unicorn/prefer-event-target": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md
				"unicorn/prefer-export-from": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-global-this.md
				"unicorn/prefer-global-this": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-import-meta-properties.md
				"unicorn/prefer-import-meta-properties": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md
				"unicorn/prefer-includes": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md
				"unicorn/prefer-json-parse-buffer": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
				"unicorn/prefer-keyboard-event-key": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md
				"unicorn/prefer-logical-operator-over-ternary": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-min-max.md
				"unicorn/prefer-math-min-max": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md
				"unicorn/prefer-math-trunc": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md
				"unicorn/prefer-modern-dom-apis": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-math-apis.md
				"unicorn/prefer-modern-math-apis": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
				"unicorn/prefer-module": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md
				"unicorn/prefer-native-coercion-functions": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md
				"unicorn/prefer-negative-index": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
				// Enabled for config files only.
				"unicorn/prefer-node-protocol": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
				"unicorn/prefer-number-properties": [
					ERROR,
					{
						checkInfinity: true,
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md
				"unicorn/prefer-object-from-entries": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md
				"unicorn/prefer-optional-catch-binding": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md
				"unicorn/prefer-prototype-methods": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md
				// This rule is disabled because the named methods describe the intention clearer.
				"unicorn/prefer-query-selector": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md
				"unicorn/prefer-reflect-apply": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md
				"unicorn/prefer-regexp-test": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-response-static-json.md
				"unicorn/prefer-response-static-json": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
				"unicorn/prefer-set-has": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md
				"unicorn/prefer-set-size": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-simple-condition-first.md
				"unicorn/prefer-simple-condition-first": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-single-call.md
				"unicorn/prefer-single-call": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
				"unicorn/prefer-spread": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-raw.md
				"unicorn/prefer-string-raw": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
				"unicorn/prefer-string-replace-all": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
				"unicorn/prefer-string-slice": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md
				// The "@typescript-eslint/prefer-string-starts-ends-with" rule takes care of it.
				"unicorn/prefer-string-starts-ends-with": DISABLED,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md
				"unicorn/prefer-string-trim-start-end": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-structured-clone.md
				"unicorn/prefer-structured-clone": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
				"unicorn/prefer-switch": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
				"unicorn/prefer-ternary": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
				"unicorn/prefer-top-level-await": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md
				"unicorn/prefer-type-error": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
				"unicorn/prevent-abbreviations": [
					ERROR,
					{
						allowList: {
							params: true,
							Params: true,
							props: true,
							Props: true,
							ref: true,
							Ref: true,
						},
						checkDefaultAndNamespaceImports: true,
						checkShorthandImports: true,
						checkShorthandProperties: true,
						checkProperties: true,
					},
				],
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md
				"unicorn/relative-url-style": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md
				"unicorn/require-array-join-separator": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-attributes.md
				"unicorn/require-module-attributes": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-specifiers.md
				"unicorn/require-module-specifiers": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md
				"unicorn/require-number-to-fixed-digits-argument": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
				"unicorn/require-post-message-target-origin": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md
				"unicorn/string-content": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md
				"unicorn/switch-case-braces": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-break-position.md
				"unicorn/switch-case-break-position": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md
				"unicorn/template-indent": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md
				"unicorn/text-encoding-identifier-case": ERROR,
				// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
				"unicorn/throw-new-error": ERROR,

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
				// Enabled for application source files only.
				"import-x/no-nodejs-modules": DISABLED,
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
					ERROR,
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
				// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-namespace-import.md
				"import-x/prefer-namespace-import": ERROR,

				// https://github.com/lydell/eslint-plugin-simple-import-sort/?tab=readme-ov-file#usage
				"simple-import-sort/imports": ERROR,
				// https://github.com/lydell/eslint-plugin-simple-import-sort/?tab=readme-ov-file#usage
				"simple-import-sort/exports": ERROR,

				/*
					==================================================
					Stylistic plugin
					==================================================
				*/

				// https://eslint.style/rules/default/array-bracket-newline
				// The "@stylistic/exp-list-style" rule takes care of it.
				"@stylistic/array-bracket-newline": DISABLED,
				// https://eslint.style/rules/default/array-bracket-spacing
				// The "@stylistic/exp-list-style" rule takes care of it.
				"@stylistic/array-bracket-spacing": DISABLED,
				// https://eslint.style/rules/default/array-element-newline
				// The "@stylistic/exp-list-style" rule takes care of it.
				"@stylistic/array-element-newline": DISABLED,
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
				// https://eslint.style/rules/list-style
				/*
					1. Empty and single-member lists stay on one line (`[]`, `[1]`, `{a: 1}`, `foo(a)`, `import {foo} from "bar"`)
					2. Two or more members go multiline, one per line, with brackets on separate lines
					3. No spaces inside brackets
				*/
				"@stylistic/exp-list-style": [
					ERROR,
					{
						singleLine: {
							spacing: "never",
							maxItems: 1,
						},
						multiLine: {
							minItems: 0,
						},
					},
				],
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
				// The "@stylistic/exp-list-style" rule takes care of it.
				"@stylistic/object-curly-newline": DISABLED,
				// https://eslint.style/rules/default/object-curly-spacing
				// The "@stylistic/exp-list-style" rule takes care of it.
				"@stylistic/object-curly-spacing": DISABLED,
				// https://eslint.style/rules/default/object-property-newline
				// The "@stylistic/exp-list-style" rule takes care of it.
				"@stylistic/object-property-newline": DISABLED,
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
					{
						overrides: {
							"=": "after",
						},
					},
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
				/*
					TypeScript's "noImplicitReturns" requires returns on all code paths but does not flag mixed value/undefined
					returns (e.g. `return true` in one branch and bare `return` in another).
				*/
				"@typescript-eslint/consistent-return": ERROR,
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
				// This rule is disabled because necessity of variables' initialization heavily depends on particular situation.
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
							// For Solid components.
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
							// Solid components.
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
				// TypeScript takes care of it (built-in duplicate class member check).
				"@typescript-eslint/no-dupe-class-members": DISABLED,
				// https://typescript-eslint.io/rules/no-duplicate-enum-values
				// This rule is disabled because `enum` declarations are forbidden by "erasableSyntaxOnly" in TypeScript.
				"@typescript-eslint/no-duplicate-enum-values": DISABLED,
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
				// If a callback should be empty, use `noop` function instead.
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
				/*
					Conflicts with "import-x/consistent-type-specifier-style" and
					"@typescript-eslint/consistent-type-imports" (both prefer inline type qualifiers).
					"verbatimModuleSyntax" TypeScript config flag takes care of side-effect imports.
				*/
				"@typescript-eslint/no-import-type-side-effects": DISABLED,
				// https://typescript-eslint.io/rules/no-inferrable-types
				"@typescript-eslint/no-inferrable-types": ERROR,
				// https://typescript-eslint.io/rules/no-invalid-this
				/*
					TypeScript's "noImplicitThis" uses type checking; this rule uses ESLint heuristics and covers cases the
					compiler does not model the same way. For example, `function foo() { this.a = 0; }` is reported, while
					`function bar(this: MyType) { this.a = 0; }` is allowed.
				*/
				"@typescript-eslint/no-invalid-this": ERROR,
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
				// This rule is disabled because `enum` declarations are forbidden by "erasableSyntaxOnly" in TypeScript.
				"@typescript-eslint/no-mixed-enums": DISABLED,
				// https://typescript-eslint.io/rules/no-namespace
				// Enabled for application source files only.
				"@typescript-eslint/no-namespace": DISABLED,
				// https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
				"@typescript-eslint/no-non-null-asserted-nullish-coalescing": ERROR,
				// https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
				"@typescript-eslint/no-non-null-asserted-optional-chain": ERROR,
				// https://typescript-eslint.io/rules/no-non-null-assertion
				// Please add a comment about why the non-null assertion is used.
				"@typescript-eslint/no-non-null-assertion": ERROR,
				// https://typescript-eslint.io/rules/no-redeclare
				"@typescript-eslint/no-redeclare": ERROR,
				// https://typescript-eslint.io/rules/no-redundant-type-constituents
				"@typescript-eslint/no-redundant-type-constituents": ERROR,
				// https://typescript-eslint.io/rules/no-require-imports
				// The "import-x/no-commonjs" rule takes care of it.
				"@typescript-eslint/no-require-imports": DISABLED,
				// https://typescript-eslint.io/rules/no-restricted-imports
				"@typescript-eslint/no-restricted-imports": [
					ERROR,
					{
						patterns: [
							{
								group: [
									"es-toolkit",
									"nanoid",
								],
								message: "Import utility functions from `@/utilities` folder instead.",
							},
							{
								group: [
									"date-fns",
								],
								message: "Import utility functions from `@/features/dates-and-time/utilities` folder instead.",
							},
						],
					},
				],
				// https://typescript-eslint.io/rules/no-restricted-types
				"@typescript-eslint/no-restricted-types": ERROR,
				// https://typescript-eslint.io/rules/no-shadow
				/*
					This rule encourages assigning more meaningful names to variables/constants, taking the current context
					into account in each case. It extends the base "no-shadow" rule with TypeScript-aware shadowing checks.

					Usually, names can be the same for an accumulator inside a `reduce` callback and the result assigned to
					a variable/constant. In that case, the accumulator can be postfixed with "current" (it is the value in
					each iteration, not the final one).
				*/
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
				// This rule is disabled because `enum` declarations are forbidden by "erasableSyntaxOnly" in TypeScript.
				"@typescript-eslint/no-unsafe-enum-comparison": DISABLED,
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
				// https://typescript-eslint.io/rules/no-unused-private-class-members
				"@typescript-eslint/no-unused-private-class-members": ERROR,
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
				// https://typescript-eslint.io/rules/no-useless-default-assignment
				"@typescript-eslint/no-useless-default-assignment": ERROR,
				// https://typescript-eslint.io/rules/no-useless-empty-export
				"@typescript-eslint/no-useless-empty-export": ERROR,
				// https://typescript-eslint.io/rules/no-wrapper-object-types
				"@typescript-eslint/no-wrapper-object-types": ERROR,
				// https://typescript-eslint.io/rules/non-nullable-type-assertion-style
				"@typescript-eslint/non-nullable-type-assertion-style": ERROR,
				// https://typescript-eslint.io/rules/only-throw-error
				"@typescript-eslint/only-throw-error": [
					ERROR,
					/*
						"allowThrowingAny" and "allowThrowingUnknown" are set to `false` to
						match the base rule's strictness.
					*/
					{
						allowThrowingAny: false,
						allowThrowingUnknown: false,
					},
				],
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
				// This rule is disabled because `enum` declarations are forbidden by "erasableSyntaxOnly" in TypeScript.
				"@typescript-eslint/prefer-enum-initializers": DISABLED,
				// https://typescript-eslint.io/rules/prefer-find
				"@typescript-eslint/prefer-find": ERROR,
				// https://typescript-eslint.io/rules/prefer-for-of
				"@typescript-eslint/prefer-for-of": ERROR,
				// https://typescript-eslint.io/rules/prefer-function-type
				"@typescript-eslint/prefer-function-type": ERROR,
				// https://typescript-eslint.io/rules/prefer-includes
				"@typescript-eslint/prefer-includes": ERROR,
				// https://typescript-eslint.io/rules/prefer-literal-enum-member
				// This rule is disabled because `enum` declarations are forbidden by "erasableSyntaxOnly" in TypeScript.
				"@typescript-eslint/prefer-literal-enum-member": DISABLED,
				// https://typescript-eslint.io/rules/prefer-namespace-keyword
				// TypeScript takes care of it (erasableSyntaxOnly: true).
				"@typescript-eslint/prefer-namespace-keyword": DISABLED,
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
				// https://typescript-eslint.io/rules/strict-void-return
				"@typescript-eslint/strict-void-return": ERROR,
				// https://typescript-eslint.io/rules/switch-exhaustiveness-check
				"@typescript-eslint/switch-exhaustiveness-check": ERROR,
				// https://typescript-eslint.io/rules/triple-slash-reference
				"@typescript-eslint/triple-slash-reference": ERROR,
				// https://typescript-eslint.io/rules/unbound-method
				"@typescript-eslint/unbound-method": ERROR,
				// https://typescript-eslint.io/rules/unified-signatures
				"@typescript-eslint/unified-signatures": ERROR,
				// https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
				/*
					TypeScript's "useUnknownInCatchVariables" (enabled by default in TypeScript 6) covers synchronous `try/catch`
					only. This rule covers `Promise` rejection callbacks, which stay implicitly `any` otherwise.
				*/
				"@typescript-eslint/use-unknown-in-catch-callback-variable": ERROR,
			},
		},
		{
			files: [
				"src/**/*.{ts,tsx}",
			],
			languageOptions: {
				globals: globals.browser,
			},
			rules: {
				"import-x/no-nodejs-modules": ERROR,
				"@typescript-eslint/no-namespace": ERROR,
			},
		},
		{
			files: [
				"**/*.tsx",
			],
			extends: [
				// @ts-expect-error Incorrect plugin types.
				solid,
			],
			rules: {
				/*
					==================================================
					Solid plugin
					==================================================
				*/
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/components-return-once.md
				"solid/components-return-once": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/event-handlers.md
				"solid/event-handlers": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/imports.md
				"solid/imports": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/jsx-no-duplicate-props.md
				"solid/jsx-no-duplicate-props": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/jsx-no-script-url.md
				"solid/jsx-no-script-url": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/jsx-no-undef.md
				"solid/jsx-no-undef": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/jsx-uses-vars.md
				"solid/jsx-uses-vars": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-array-handlers.md
				"solid/no-array-handlers": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-destructure.md
				"solid/no-destructure": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-innerhtml.md
				"solid/no-innerhtml": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-proxy-apis.md
				"solid/no-proxy-apis": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-react-deps.md
				"solid/no-react-deps": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-react-specific-props.md
				"solid/no-react-specific-props": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-unknown-namespaces.md
				"solid/no-unknown-namespaces": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/prefer-classlist.md
				"solid/prefer-classlist": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/prefer-for.md
				"solid/prefer-for": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/prefer-show.md
				"solid/prefer-show": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/reactivity.md
				"solid/reactivity": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/self-closing-comp.md
				"solid/self-closing-comp": ERROR,
				// https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/style-prop.md
				"solid/style-prop": ERROR,

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
				// The "@stylistic/exp-jsx-props-style" rule takes care of it.
				"@stylistic/jsx-first-prop-new-line": DISABLED,
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
				// The "@stylistic/exp-jsx-props-style" rule takes care of it.
				"@stylistic/jsx-max-props-per-line": DISABLED,
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
				// https://eslint.style/rules/jsx-props-style
				/*
					1. Each prop starts on a new line after the opening tag name
					2. At most one prop per line
				*/
				"@stylistic/exp-jsx-props-style": [
					ERROR,
					{
						singleLine: {
							maxItems: 0,
						},
						multiLine: {
							minItems: 0,
							maxItemsPerLine: 1,
						},
					},
				],
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
				"vite.config.ts",
			],
			languageOptions: {
				globals: globals.node,
			},
			rules: {
				"no-autofix/capitalized-comments": DISABLED,
				"sort-keys": DISABLED,
				"unicorn/no-null": DISABLED,
				"unicorn/prefer-node-protocol": ERROR,
				"unicorn/prevent-abbreviations": DISABLED,
				"@typescript-eslint/naming-convention": DISABLED,
			},
		},
	),
);

export default eslintConfig;
```

</details>

## IDE

### `.vscode/settings.json`

```jsonc
{
	"[typescript][typescriptreact]": {
		"editor.defaultFormatter": "dbaeumer.vscode-eslint"
	},
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit",
		"source.fixAll.markdownlint": "explicit"
	},
	"eslint.options": {
		"flags": [
			"unstable_native_nodejs_ts_config"
		]
	},
	/*
		Use system Node instead of VS Code's bundled runtime.
		Matches `npm run` behavior and satisfies ESLint's Node requirements.
	*/
	"eslint.runtime": "node",
	"typescript.tsdk": "node_modules\\typescript\\lib"
}
```
