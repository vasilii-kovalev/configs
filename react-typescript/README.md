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

## SCSS

Installation script

```shell
yarn add -D sass
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
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jest
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
    "prettier",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "root": true,
  "rules": {
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ],
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
    "react/prop-types": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src"]
      }
    },
    "react": {
      "version": "detect"
    }
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
