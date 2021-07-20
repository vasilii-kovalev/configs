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
    "jsx": "react",
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

  worker.start({
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
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jest eslint-plugin-testing-library
```

`.eslintrc`

```jsonc
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:testing-library/react",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "root": true,
  "rules": {
    "consistent-return": "error",
    "default-case-last": "error",
    "default-case": "error",
    "eqeqeq": "error",
    "id-denylist": ["error", "req", "res", "err", "e"],
    "line-comment-position": ["error", "above"],
    "multiline-comment-style": ["error", "bare-block"],
    "no-alert": "error",
    "no-console": ["error", { "allow": ["error"] }],
    "no-implicit-coercion": "error",
    "no-new-wrappers": "error",
    "no-param-reassign": "error",
    "no-plusplus": "error",
    "no-restricted-imports": [
      "error",
      {
        "name": "lodash",
        "message": "Please use `import <package> from \"lodash/<package>\";` instead."
      }
    ],
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-unneeded-ternary": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "operator-assignment": ["error", "always"],
    "prefer-arrow-callback": "error",
    "prefer-destructuring": "error",
    "prefer-named-capture-group": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-template": "error",
    "radix": "error",
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ],
    "yoda": ["error", "never"],

    "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "no-type-imports" }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { "allowExpressions": true }
    ],
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-magic-numbers": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/unified-signatures": "error",

    "import/exports-last": "error",
    "import/first": "error",
    "import/group-exports": "error",
    "import/newline-after-import": "error",
    "import/no-absolute-path": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-mutable-exports": "error",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": ["error", { "noUselessIndex": true }],
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

    "jest/consistent-test-it": ["error", { "withinDescribe": "test" }],
    "jest/no-duplicate-hooks": "error",
    "jest/prefer-hooks-on-top": "error",
    "jest/prefer-spy-on": "error",
    "jest/prefer-strict-equal": "error",
    "jest/require-to-throw-message": "error",

    "react/button-has-type": "error",
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": ["error", "never"],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react/void-dom-elements-no-children": "error",

    "testing-library/no-await-sync-events": "error",
    "testing-library/no-manual-cleanup": "error",
    "testing-library/no-render-in-setup": "error",
    "testing-library/no-unnecessary-act": "error",
    "testing-library/no-wait-for-multiple-assertions": "error",
    "testing-library/no-wait-for-side-effects": "error",
    "testing-library/no-wait-for-snapshot": "error",
    "testing-library/prefer-explicit-assert": "error",
    "testing-library/prefer-presence-queries": "error",
    "testing-library/prefer-query-by-disappearance": "error",
    "testing-library/prefer-user-event": "error"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src"]
      }
    },
    "react": {
      "version": "detect"
    },
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

## Visual Studio Code

`.vscode/settings.json`

```jsonc
{
  "typescript.tsdk": "node_modules\\typescript\\lib"
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
