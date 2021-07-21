# React + TypeScript config

## Vite

Creation of a Vite project

```shell
yarn create vite app --template react-ts
```

Installation of the dependencies

```shell
yarn install
```

Installation of additional packages

```shell
yarn add -D vite-tsconfig-paths
```

`vite.config.ts`

```typescript
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
});

export default config;
```

## Typescript

`tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "allowJs": false,
    "allowSyntheticDefaultImports": true,
    "baseUrl": "src",
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    /*
      Default value `react` was changed because:
      - React 17+ is used, which doesn't require React to be in scope
      - TypeScript doesn't throw errors in this case
    */
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "noEmit": true,
    "resolveJsonModule": true,
    "skipLibCheck": false,
    "strict": true,
    "target": "ESNext"
  },
  "include": ["src"]
}
```

`package.json`

```json
{
  "scripts": {
    "tslint": "tsc"
  }
}
```

## Styles

Installation of SasS

```shell
yarn add -D sass
```

Installation of additional packages

```shell
yarn add classnames
```

## Tests

Installation script

```shell
yarn add -D jest jest-watch-typeahead @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event @swc/jest
```

`jest.config.json`

```json
{
  "moduleNameMapper": {
    "\\.scss$": "identity-obj-proxy",
    "\\.(svg|jpg|png)$": "<rootDir>/src/__mocks__/file-mock.ts"
  },
  "setupFilesAfterEnv": ["<rootDir>/src/setup-tests.ts"],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.tsx?$": "@swc/jest"
  },
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}
```

`src/__mocks__/file-mock.ts`

```typescript
const mock = "test-file-stub";

export default mock;
```

`src/setup-tests.ts`

```typescript
import "@testing-library/jest-dom";
```

`package.json`

```json
{
  "scripts": {
    "test": "jest --watchAll --detectOpenHandles",
    "test:coverage": "jest --coverage"
  }
}
```

## MSW

Installation script

```shell
yarn add -D msw
```

`src/mocks/handlers.ts`

```typescript
import { MockedRequest, RestHandler } from "msw";

const handlers: RestHandler<MockedRequest>[] = [];

export { handlers };
```

Creation of the service worker

```shell
yarn msw init ./
```

`src/mocks/browser.ts`

```typescript
import { setupWorker } from "msw";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

export { worker };
```

`src/main.tsx`

```typescript
if (process.env.NODE_ENV === "development") {
  const { worker } = await import("mocks/browser");

  void worker.start({
    onUnhandledRequest: "bypass",
  });
}
```

`package.json`

```json
{
  "msw": {
    "workerDirectory": ""
  }
}
```

## Storybook

Installation script

```shell
npx ynpx sb init
```

Installation of additional packages

```shell
yarn add -D sass-loader
```

**Note**: `css-loader` and `style-loader` are Storybook dependencies, so it is not necessary to install them separately.

`.storybook/main.js`

```javascript
const path = require("path");

const config = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(ts|tsx)"],
  webpackFinal: (config) => {
    // https://github.com/storybookjs/storybook/issues/2704#issuecomment-357407742
    config.resolve.modules = [
      "node_modules",
      path.resolve(__dirname, "../src"),
    ];

    // https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: {
            /*
              `modules: true` allows to use EITHER modules or plain styles.
              `modules: { auto: true }` allows to use both.

              More info: https://webpack.js.org/loaders/css-loader/#modules
            */
            modules: {
              auto: true,
            },
          },
        },
        /*
          Version of `sass-loader` should match Storybook's webpack version.
          Storybook' webpack version is 4, and the last version of `sass-loader`
          that supports it is "^10.1.1".

          Related issue: https://github.com/webpack-contrib/sass-loader/issues/924
        */
        { loader: "sass-loader" },
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};

module.exports = config;
```

`.storybook/preview.js`

```javascript
// Import the same styles as in `main.tsx`.
import "../src/styles/index.scss";

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export { parameters };
```

## EditorConfig

`.editorconfig`

```editor-config
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true
```

## Prettier

Installation script

```shell
yarn add -D -E prettier
```

`.prettierrc`

```json
{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "endOfLine": "auto",
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "quoteProps": "as-needed",
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```

`.prettierignore`

```ignore
# Artifacts
dist

# Coverage directory
coverage

# MSW generated service worker
mockServiceWorker.js
```

`package.json`

```json
{
  "scripts": {
    "prettier:check": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }
}
```

## ESlint

```shell
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-jest eslint-plugin-testing-library
```

`.eslintrc`

```jsonc
{
  "extends": [
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js#L13-L71
    "eslint:recommended",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L118-L151
    "plugin:react/recommended",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/index.js#L163-L176
    "plugin:react/jsx-runtime",
    // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/src/index.js#L14-L20
    "plugin:react-hooks/recommended",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.ts#L6-L33
    "plugin:@typescript-eslint/recommended",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts#L6-L25
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/recommended.js#L6-L27
    "plugin:import/recommended",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js#L9-L27
    "plugin:import/typescript",
    // https://github.com/jest-community/eslint-plugin-jest#rules
    "plugin:jest/recommended",
    // https://github.com/jest-community/eslint-plugin-jest#rules
    "plugin:jest/style",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/lib/configs/react.ts#L6-L20
    "plugin:testing-library/react",
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/src/index.js#L43-L199
    "plugin:jsx-a11y/recommended",
    // https://github.com/prettier/eslint-plugin-prettier/blob/master/eslint-plugin-prettier.js#L92-L100
    "plugin:prettier/recommended"
  ],
  // Some @typescript-eslint rules need it
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "root": true,
  "rules": {
    // https://eslint.org/docs/rules/consistent-return
    "consistent-return": "error",
    // https://eslint.org/docs/rules/default-case-last
    "default-case-last": "error",
    // https://eslint.org/docs/rules/default-case
    "default-case": "error",
    // Handled by @typescript-eslint/default-param-last
    // https://eslint.org/docs/rules/default-param-last
    "default-param-last": "off",
    // Handled by @typescript-eslint/dot-notation
    // https://eslint.org/docs/rules/dot-notation
    "dot-notation": "off",
    // https://eslint.org/docs/rules/eqeqeq
    "eqeqeq": "error",
    // https://eslint.org/docs/rules/id-denylist
    "id-denylist": ["error", "req", "res", "err", "e"],
    // https://eslint.org/docs/rules/line-comment-position
    "line-comment-position": ["error", "above"],
    // https://eslint.org/docs/rules/multiline-comment-style
    "multiline-comment-style": ["error", "bare-block"],
    // https://eslint.org/docs/rules/no-alert
    "no-alert": "error",
    // https://eslint.org/docs/rules/no-console
    "no-console": ["error", { "allow": ["error"] }],
    // https://eslint.org/docs/rules/no-implicit-coercion
    "no-implicit-coercion": "error",
    // Handled by @typescript-eslint/no-magic-numbers
    // https://eslint.org/docs/rules/no-magic-numbers
    "no-magic-numbers": "off",
    // https://eslint.org/docs/rules/no-new-wrappers
    "no-new-wrappers": "error",
    // https://eslint.org/docs/rules/no-param-reassign
    "no-param-reassign": "error",
    // https://eslint.org/docs/rules/no-plusplus
    "no-plusplus": "error",
    // https://eslint.org/docs/rules/no-restricted-imports
    "no-restricted-imports": [
      "error",
      {
        "name": "lodash",
        "message": "Please use `import <package> from \"lodash/<package>\";` instead."
      }
    ],
    // https://eslint.org/docs/rules/no-return-assign
    "no-return-assign": "error",
    // Handled by @typescript-eslint/return-await
    // https://eslint.org/docs/rules/no-return-await
    "no-return-await": "off",
    // https://eslint.org/docs/rules/no-self-compare
    "no-self-compare": "error",
    // https://eslint.org/docs/rules/no-unneeded-ternary
    "no-unneeded-ternary": "error",
    // Handled by @typescript-eslint/no-unused-expressions
    // https://eslint.org/docs/rules/no-unused-expressions
    "no-unused-expressions": "off",
    // https://eslint.org/docs/rules/no-useless-computed-key
    "no-useless-computed-key": "error",
    // https://eslint.org/docs/rules/no-useless-concat
    "no-useless-concat": "error",
    // https://eslint.org/docs/rules/no-useless-rename
    "no-useless-rename": "error",
    // https://eslint.org/docs/rules/no-useless-return
    "no-useless-return": "error",
    // https://eslint.org/docs/rules/object-shorthand
    "object-shorthand": "error",
    // https://eslint.org/docs/rules/one-var
    "one-var": ["error", "never"],
    // https://eslint.org/docs/rules/operator-assignment
    "operator-assignment": ["error", "always"],
    // https://eslint.org/docs/rules/prefer-arrow-callback
    "prefer-arrow-callback": "error",
    // https://eslint.org/docs/rules/prefer-destructuring
    "prefer-destructuring": "error",
    // https://eslint.org/docs/rules/prefer-named-capture-group
    "prefer-named-capture-group": "error",
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    "prefer-promise-reject-errors": "error",
    // https://eslint.org/docs/rules/prefer-template
    "prefer-template": "error",
    // https://eslint.org/docs/rules/radix
    "radix": "error",
    // https://eslint.org/docs/rules/sort-imports
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ],
    // https://eslint.org/docs/rules/yoda
    "yoda": ["error", "never"],

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
    "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md
    "@typescript-eslint/consistent-indexed-object-style": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
    "@typescript-eslint/consistent-type-assertions": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
    "@typescript-eslint/consistent-type-definitions": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "no-type-imports" }
    ],
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
    "@typescript-eslint/default-param-last": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    "@typescript-eslint/dot-notation": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { "allowExpressions": true }
    ],
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
    "@typescript-eslint/method-signature-style": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implicit-any-catch.md
    "@typescript-eslint/no-implicit-any-catch": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
    "@typescript-eslint/no-invalid-void-type": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    "@typescript-eslint/no-magic-numbers": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
    "@typescript-eslint/no-unnecessary-condition": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-constraint.md
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    "@typescript-eslint/no-unused-expressions": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    "@typescript-eslint/return-await": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
    "@typescript-eslint/strict-boolean-expressions": "error",
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
    "@typescript-eslint/unified-signatures": "error",

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/exports-last.md
    "import/exports-last": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    "import/first": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/group-exports.md
    "import/group-exports": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    "import/newline-after-import": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    "import/no-absolute-path": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md
    "import/no-anonymous-default-export": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    "import/no-mutable-exports": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md
    "import/no-self-import": "error",
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md
    "import/no-useless-path-segments": ["error", { "noUselessIndex": true }],
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    "import/order": [
      "error",
      {
        "alphabetize": { "order": "asc", "caseInsensitive": false },
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "object",
          "type",
          "unknown"
        ],
        "newlines-between": "always",
        "warnOnUnassignedImports": true
      }
    ],

    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/consistent-test-it.md
    "jest/consistent-test-it": ["error", { "withinDescribe": "test" }],
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md
    "jest/no-duplicate-hooks": "error",
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-on-top.md
    "jest/prefer-hooks-on-top": "error",
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-spy-on.md
    "jest/prefer-spy-on": "error",
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-strict-equal.md
    "jest/prefer-strict-equal": "error",
    // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-to-throw-message.md
    "jest/require-to-throw-message": "error",

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
    "react/button-has-type": "error",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    "react/jsx-boolean-value": ["error", "always"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
    "react/jsx-curly-brace-presence": ["error", "never"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
    "react/jsx-fragments": ["error", "syntax"],
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
    "react/jsx-no-constructed-context-values": "error",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
    "react/jsx-no-useless-fragment": "error",
    // Handled by TypeScript
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    "react/prop-types": "off",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    "react/self-closing-comp": "error",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    "react/void-dom-elements-no-children": "error",

    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-events.md
    "testing-library/no-await-sync-events": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-manual-cleanup.md
    "testing-library/no-manual-cleanup": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md
    "testing-library/no-render-in-setup": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
    "testing-library/no-unnecessary-act": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-multiple-assertions.md
    "testing-library/no-wait-for-multiple-assertions": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-side-effects.md
    "testing-library/no-wait-for-side-effects": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-snapshot.md
    "testing-library/no-wait-for-snapshot": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-explicit-assert.md
    "testing-library/prefer-explicit-assert": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md
    "testing-library/prefer-presence-queries": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-query-by-disappearance.md
    "testing-library/prefer-query-by-disappearance": "error",
    // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md
    "testing-library/prefer-user-event": "error"
  },
  "settings": {
    // https://github.com/benmosher/eslint-plugin-import/issues/1582#issuecomment-568951354
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src"]
      }
    },
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    "react": {
      "version": "detect"
    },
    // https://github.com/testing-library/eslint-plugin-testing-library#testing-libraryutils-module
    "testing-library/utils-module": "test-utils"
  }
}
```

`package.json`

```json
{
  "scripts": {
    "eslint:check": "eslint --ext .ts,.tsx src --color",
    "eslint:fix": "yarn eslint:check --fix"
  }
}
```

## Stylelint

Installation script

```shell
yarn add -D stylelint stylelint-config-standard stylelint-config-prettier stylelint-config-css-modules stylelint-order stylelint-scss
```

`.stylelintrc`

```jsonc
{
  "plugins": ["stylelint-scss", "stylelint-order"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-prettier"
  ],
  "rules": {
    "at-rule-no-unknown": null,
    "order/properties-alphabetical-order": true,
    "scss/at-rule-no-unknown": true
  }
}
```

`package.json`

```json
{
  "scripts": {
    "stylelint:check": "stylelint src/**/*.scss --color",
    "stylelint:fix": "yarn stylelint:check --fix"
  }
}
```

## Git ignore

`.gitignore`

```ignore
# Artifacts
dist

# Coverage directory
coverage

# Dependency directories
node_modules
```

## Visual Studio Code

`.vscode/settings.json`

```jsonc
{
  "typescript.tsdk": "node_modules\\typescript\\lib"
}
```

### Extensions

- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [browserslist](https://marketplace.visualstudio.com/items?itemName=webben.browserslist) (enabled only if needed)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (enabled only if needed)
- [filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize) (enabled only if needed)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai)
- [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (enabled only if needed)
- [Russian - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-russian) (enabled only if needed)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) (enabled only if needed)

**Note**: run `code --list-extensions` in terminal to get extensions list.

### Config

```jsonc
{
  "cSpell.enableFiletypes": ["diff", "jsx-tags", "xml"],
  "cSpell.language": "en,ru,ru-RU,en-GB,en-US",
  "diffEditor.ignoreTrimWhitespace": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.linkedEditing": true,
  "editor.renderWhitespace": "all",
  "editor.rulers": [80],
  "editor.tabSize": 2,
  "editor.wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?_",
  "explorer.compactFolders": false,
  "files.associations": {
    ".eslintignore": "ignore",
    ".huskyrc": "json",
    ".lintstagedrc": "json",
    ".stylelintrc": "json"
  },
  "files.autoSave": "off",
  "files.insertFinalNewline": true,
  "git.allowNoVerifyCommit": true,
  "git.confirmSync": false,
  "gitlens.views.remotes.branches.layout": "tree",
  "gitlens.views.stashes.files.layout": "tree",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "path-autocomplete.extensionOnImport": true,
  "workbench.colorTheme": "One Monokai",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.startupEditor": "none"
}
```
