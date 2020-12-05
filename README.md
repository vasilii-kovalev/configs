# Configs

The umbrella repository for all configs, used in web development.

* [EditorConfig](#editorconfig)
* [Prettier](#prettier)
* [TypeScript configuration](#typescript-configuration)
  * [TypeScript configuration for React + TypeScript](#typescript-configuration-for-react--typescript)
  * [TypeScript configuration for pure TypeScript](#typescript-configuration-for-pure-typescript)
* [ESLint](#eslint)
  * [ESLint configuration for React + TypeScript](#eslint-configuration-for-react--typescript)
  * [ESLint configuration for pure TypeScript](#eslint-configuration-for-pure-typescript)
* [Stylelint](#stylelint)

## EditorConfig

`.editorconfig` [[source](./.editorconfig)]

```editor-config
root = true

[*]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
max_line_length = 80
trim_trailing_whitespace = true
```

## Prettier

`.prettierrc` [[source](./.prettierrc)]

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

`.prettierignore` [[source](./.prettierignore)]

```ignore
# Artifacts:
.next
build
coverage

# GitHub Workflow
.github
```

## TypeScript configuration

### TypeScript configuration for React + TypeScript

`package.json` script

```json
{
  "tslint": "tsc --noEmit"
}
```

`tsconfig.json` [[source](./react-typescript/tsconfig.json)]

```jsonc
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

### TypeScript configuration for pure TypeScript

`tsconfig.json` [[source](./typescript/tsconfig.json)]

```jsonc
{
  "exclude": ["node_modules", "src/**/*.test.ts", "lib/*"],
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./lib",
    "rootDir": "src",
    "isolatedModules": true,
    "strict": true,
    "baseUrl": ".",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

`tsconfig.eslint.json` [[source](./typescript/tsconfig.eslint.json)]

In order to lint tests, but don't compile them, it is necessary to have a
separate `tsconfig.json` file [[learn more](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/MONOREPO.md#one-root-tsconfigjson)].

```jsonc
{
  "extends": "./tsconfig.json",
  "exclude": [],
  "include": ["src"],
  "compilerOptions": {
    "noEmit": true
  }
}

```

## ESlint

### ESLint configuration for React + TypeScript

Installation script

```shell
npm i -D eslint@^6.6.0 @typescript-eslint/parser eslint-config-airbnb-typescript eslint-plugin-import@^2.22.0 eslint-plugin-jsx-a11y@^6.3.1 eslint-plugin-react@^7.20.3 eslint-plugin-react-hooks@^4.0.8 @typescript-eslint/eslint-plugin@^3.6.1
```

`package.json` script

```json
{
  "eslint": "eslint --ext .ts,.tsx src --color"
}
```

`.eslintrc` [[source](./react-typescript/.eslintrc)]

```jsonc
{
  "plugins": ["@typescript-eslint"],
  "extends": ["airbnb-typescript", "react-app"],
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "indent": "off",
    "linebreak-style": "off",
    "max-len": [
      "error",
      {
        "code": 80,
        "ignoreComments": true
      }
    ],
    "no-unused-vars": "off",
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": ["error"],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "src/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": false
        }
      }
    ],
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx"]
      }
    }
  }
}
```

`.eslintignore` [[source](./react-typescript/.eslintignore)]

```ignore
src/serviceWorker.ts
```

### ESLint configuration for pure TypeScript

Installation script

```shell
npm i -D eslint @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import@^2.22.0 @typescript-eslint/eslint-plugin@^3.6.1
```

`package.json` script

```json
{
  "eslint": "eslint --ext .ts src --color"
}
```

`.eslintrc` [[source](./typescript/.eslintrc)]

```jsonc
{
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint-config-airbnb-base"],
  "rules": {
    "arrow-parens": ["error", "as-needed"],
    "indent": "off",
    "linebreak-style": "off",
    "max-len": [
      "error",
      {
        "code": 80,
        "ignoreComments": true
      }
    ],
    "no-unused-vars": "off",
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ],
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": ["error"],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "src/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": false
        }
      }
    ],
    "import/extensions": [
      "error",
      {
        "ts": "never"
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

`package.json` script

```json
{
  "stylelint": "stylelint **/*.scss --color"
}
```

`.stylelintrc` [[source](./.stylelintrc)]

```jsonc
{
  "plugins": [
    "stylelint-scss",
    "stylelint-order"
  ],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-css-modules"
  ],
  "rules": {
    "at-rule-no-unknown": null,
    "order/properties-alphabetical-order": true,
    "scss/at-rule-no-unknown": true
  }
}
```
