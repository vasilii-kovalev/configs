# Useful configs

One repository for all configs (ESLint, Stylelint, TS config, EditorConfig, etc.)

## tsconfig.json
#### npm script
```json
{
  "tslint": "tsc --noEmit"
}
```

### React
```jsonc
{
  "version": "1.0.0",
  "exclude": [
    "node_modules",
    "src/**/*.test.ts"
  ],
  "include": [
    "src"
  ],
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,
    "target": "ESNext",
    "module": "ESNext",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowJs": true,
    // "checkJs": true,
    "jsx": "react",
    "declaration": true,
    // "declarationMap": true,
    // "sourceMap": true,
    // "outFile": "./",
    // "outDir": "./lib",
    "rootDir": "src",
    // "composite": true,
    // "tsBuildInfoFile": "./",
    // "removeComments": true,
    "noEmit": true,
    // "importHelpers": true,
    // "downlevelIteration": true,
    "isolatedModules": true,
    /* Strict Type-Checking Options */
    "strict": true,
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true,
    /* Additional Checks */
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noImplicitReturns": true,
    // "noFallthroughCasesInSwitch": true,
    /* Module Resolution Options */
    "moduleResolution": "node",
    "baseUrl": ".",
    // "paths": {},
    // "rootDirs": [],
    // "typeRoots": [],
    // "types": [],
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    // "preserveSymlinks": true,
    // "allowUmdGlobalAccess": true,
    /* Source Map Options */
    // "sourceRoot": "",
    // "mapRoot": "",
    // "inlineSourceMap": true,
    // "inlineSources": true,
    /* Experimental Options */
    // "experimentalDecorators": true,
    // "emitDecoratorMetadata": true,
    /* Advanced Options */
    "forceConsistentCasingInFileNames": true
  }
}
```

### TypeScript
```jsonc
{
  "version": "1.0.0",
  "exclude": [
    "node_modules",
    "src/**/*.test.ts",
    "lib/*"
  ],
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,
    "target": "es5",
    "module": "commonjs",
    // "lib": [],
    // "allowJs": true,
    // "checkJs": true,
    // "jsx": "preserve",
    "declaration": true,
    // "declarationMap": true,
    // "sourceMap": true,
    // "outFile": "./",
    "outDir": "./lib",
    "rootDir": "src",
    // "composite": true,
    // "tsBuildInfoFile": "./",
    // "removeComments": true,
    // "noEmit": true,
    // "importHelpers": true,
    // "downlevelIteration": true,
    "isolatedModules": true,
    /* Strict Type-Checking Options */
    "strict": true,
    // "noImplicitAny": true,
    // "strictNullChecks": true,
    // "strictFunctionTypes": true,
    // "strictBindCallApply": true,
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true,
    /* Additional Checks */
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noImplicitReturns": true,
    // "noFallthroughCasesInSwitch": true,
    /* Module Resolution Options */
    // "moduleResolution": "node",
    "baseUrl": ".",
    // "paths": {},
    // "rootDirs": [],
    // "typeRoots": [],
    // "types": [],
    // "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    // "preserveSymlinks": true,
    // "allowUmdGlobalAccess": true,
    /* Source Map Options */
    // "sourceRoot": "",
    // "mapRoot": "",
    // "inlineSourceMap": true,
    // "inlineSources": true,
    /* Experimental Options */
    // "experimentalDecorators": true,
    // "emitDecoratorMetadata": true,
    /* Advanced Options */
    "forceConsistentCasingInFileNames": true
  }
}
```

#### tsconfig.eslint.json
In order to lint tests, but don't compile them, it is necessary to have a
separate `tsconfig.json` file [[more](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/MONOREPO.md#one-root-tsconfigjson)].

```jsonc
{
  "version": "1.0.0",
  "extends": "./tsconfig.json",
  "exclude": [],
  "include": [
    "src"
  ],
  "compilerOptions": {
    "noEmit": true
  }
}
```

## ESlint
### React
#### Install
```shell
npm i -D eslint@^6.6.0 @typescript-eslint/parser eslint-config-airbnb-typescript eslint-plugin-import@^2.22.0 eslint-plugin-jsx-a11y@^6.3.1 eslint-plugin-react@^7.20.3 eslint-plugin-react-hooks@^4.0.8 @typescript-eslint/eslint-plugin@^3.6.1
```

#### npm script
```json
{
  "eslint": "eslint --ext .ts,.tsx src --color"
}
```

#### .eslintrc
```jsonc
{
  // "version": "1.0.0",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "airbnb-typescript",
    "react-app"
  ],
  "rules": {
    "arrow-parens": [
      "error",
      "as-needed"
    ],
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
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "@typescript-eslint/no-unused-vars": [
      "error"
    ],
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
        "pathGroupsExcludedImportTypes": [
          "builtin"
        ],
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
        "extensions": [
          ".ts",
          ".tsx"
        ]
      }
    }
  }
}
```

#### .eslintignore
```ignore
# version: 1.0.0

src/serviceWorker.ts
```

### TypeScript
#### Install
```shell
npm i -D eslint @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import@^2.22.0 @typescript-eslint/eslint-plugin@^3.6.1
```

#### npm script
```json
{
  "eslint": "eslint --ext .ts src --color"
}
```

#### .eslintrc
```jsonc
{
  // "version": "1.0.0",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint-config-airbnb-base"
  ],
  "rules": {
    "arrow-parens": [
      "error",
      "as-needed"
    ],
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
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "@typescript-eslint/no-unused-vars": [
      "error"
    ],
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
        "pathGroupsExcludedImportTypes": [
          "builtin"
        ],
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
        "extensions": [
          ".ts"
        ]
      }
    }
  }
}
```

## Stylelint
#### Install
```shell
npm i -D stylelint stylelint-config-css-modules stylelint-config-standard stylelint-order stylelint-scss
```

#### npm script
```json
{
  "stylelint": "stylelint **/*.scss --color"
}
```

#### .stylelintrc
```jsonc
{
  // "version": "1.0.0",
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

## EditorConfig
#### .editorconfig
```editor-config
# version: 1.0.0

root = true

[*]
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2
```
