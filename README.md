# Configs

The umbrella repository for all configs, used in web development.

## EditorConfig

`.editorconfig` [[source](./.editorconfig)]

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
npm i -D -E prettier
```

`package.json` scripts

```json
{
  "prettier:check": "prettier --check .",
  "prettier:fix": "prettier --write ."
}
```

`.prettierrc` [[source](./.prettierrc)]

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

`.prettierignore` [[source](./.prettierignore)]

```ignore
# Artifacts:
.next
build
dist
lib
coverage

# GitHub Workflow
.github
```

## TypeScript configuration

### TypeScript configuration for React + TypeScript

`package.json` scripts

```json
{
  "tslint": "tsc --noEmit"
}
```

`tsconfig.json` [[source](./react-typescript/tsconfig.json)]

```jsonc
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext"
  },
  "include": ["src"]
}
```

### TypeScript configuration for pure TypeScript

Installation script

```shell
npm i -D -E typescript @types/node
```

`tsconfig.json` [[source](./typescript/tsconfig.json)]

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "declaration": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "module": "commonjs",
    "outDir": "./lib",
    "rootDir": "src",
    "strict": true,
    "target": "es5"
  },
  "exclude": ["node_modules", "src/**/*.test.ts", "lib/*"]
}
```

`tsconfig.eslint.json` [[source](./typescript/tsconfig.eslint.json)]

In order to lint tests, but don't compile them, it is necessary to have a
separate `tsconfig.json` file [[learn more](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/MONOREPO.md#one-root-tsconfigjson)].

```jsonc
{
  "compilerOptions": {
    "noEmit": true
  },
  "exclude": [],
  "extends": "./tsconfig.json",
  "include": ["src"]
}
```

## ESlint

### ESLint configuration for React + TypeScript

`package.json` scripts

```json
{
  "eslint": "eslint --ext .ts,.tsx src --color"
}
```

`.eslintrc` [[source](./react-typescript/.eslintrc)]

```jsonc
{
  "extends": ["react-app", "react-app/jest"]
}
```

`.eslintignore` [[source](./react-typescript/.eslintignore)]

```ignore
src/serviceWorker.ts
```

### ESLint configuration for pure TypeScript

Installation script

```shell
npm i -D eslint @typescript-eslint/parser eslint-plugin-import
```

`package.json` scripts

```json
{
  "eslint": "eslint --ext .ts src --color"
}
```

`.eslintrc` [[source](./typescript/.eslintrc)]

```jsonc
{
  "rules": {
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ],
    "import/prefer-default-export": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.eslint.json"
  },
  "env": {
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts"]
      }
    }
  }
}
```

## Stylelint

Installation script

```shell
npm i -D stylelint stylelint-config-css-modules stylelint-config-standard stylelint-order stylelint-scss
```

`package.json` scripts

```json
{
  "stylelint": "stylelint /*.scss --color"
}
```

`.stylelintrc` [[source](./.stylelintrc)]

```jsonc
{
  "plugins": ["stylelint-scss", "stylelint-order"],
  "extends": ["stylelint-config-standard", "stylelint-config-css-modules"],
  "rules": {
    "at-rule-no-unknown": null,
    "order/properties-alphabetical-order": true,
    "scss/at-rule-no-unknown": true
  }
}
```
