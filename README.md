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
yarn add -D -E prettier
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
# Artifacts
build
dist

# Coverage directory
coverage

# GitHub Workflow
.github
```

## Git ignore

```ignore
# Artifacts
build
dist

# Coverage directory
coverage

# Dependency directories
node_modules
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
    "allowJs": false,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "noEmit": true,
    "paths": {
      "hooks/*": ["src/hooks/*"],
      "mocks/*": ["src/mocks/*"],
      "models/*": ["src/models/*"],
      "pages/*": ["src/pages/*"],
      "services/*": ["src/services/*"],
      "templates/*": ["src/templates/*"],
      "types/*": ["src/types/*"],
      "utils/*": ["src/utils/*"]
    },
    "resolveJsonModule": true,
    "skipLibCheck": false,
    "strict": true,
    "target": "ESNext"
  },
  "include": ["src"]
}
```

`vite.config.ts` [[source](./react-typescript/vite.config.ts)]

```typescript
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "hooks/": "/src/hooks/",
      "mocks/": "/src/mocks/",
      "models/": "/src/models/",
      "pages/": "/src/pages/",
      "services/": "/src/services/",
      "templates/": "/src/templates/",
      "types/": "/src/types/",
      "utils/": "/src/utils/",
    },
  },
});

export default viteConfig;
```

### TypeScript configuration for pure TypeScript

Installation script

```shell
yarn add -D typescript jest @types/jest ts-jest
```

`package.json` scripts

```json
{
  "tslint": "tsc"
}
```

`tsconfig.json` [[source](./typescript/tsconfig.json)]

```jsonc
{
  "compilerOptions": {
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "lib": ["ES2020"],
    "module": "ESNext",
    "moduleResolution": "Node",
    "noEmit": true,
    "strict": true,
    "target": "ES2015",
    "types": ["jest"]
  }
}
```

`tsconfig.esm.json` [[source](./typescript/tsconfig.esm.json)]

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist/types/",
    "noEmit": false,
    "outDir": "./dist/esm/"
  },
  "exclude": [
    "**/*.test.ts",
    /*
      Fixes error TS5055 ("Cannot write file '.../dist/types/....d.ts' because
      it would overwrite input file").
    */
    "dist/*"
  ]
}
```

`tsconfig.cjs.json` [[source](./typescript/tsconfig.cjs.json)]

```jsonc
{
  "extends": "./tsconfig.esm.json",
  "compilerOptions": {
    /*
      The "ESM" config generates the type declarations, so no need to overwrite
      them.
    */
    "declaration": false,
    "declarationDir": null,
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist/cjs"
  }
}
```

## ESlint

### ESLint configuration for React + TypeScript

```shell
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

`package.json` scripts

```json
{
  "eslint:check": "eslint --ext .ts,.tsx src --color",
  "eslint:fix": "yarn eslint:check --fix"
}
```

`.eslintrc` [[source](./react-typescript/.eslintrc)]

```jsonc
{
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

`.eslintignore` [[source](./react-typescript/.eslintignore)]

```ignore
src/mocks
```

### ESLint configuration for pure TypeScript

Installation script

```shell
yarn add -D eslint @typescript-eslint/parser eslint-plugin-import
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
  "parser": "@typescript-eslint/parser",
  "rules": {
    "import/prefer-default-export": "off",
    "sort-imports": [
      "error",
      {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false
      }
    ]
  }
}
```

## Stylelint

Installation script

```shell
yarn add -D stylelint stylelint-config-css-modules stylelint-config-standard stylelint-order stylelint-scss
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

## Visual Studio Code

Extensions

- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [browserslist](https://marketplace.visualstudio.com/items?itemName=webben.browserslist)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai)
- [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Russian - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-russian)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

_Note: run `code --list-extensions` in terminal to get extensions list._

Config [[source](./vs-code-config.json)]

```jsonc
{
  "[browserslist]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "cSpell.enableFiletypes": ["diff", "jsx-tags", "xml"],
  "cSpell.language": "en,ru,ru-RU,en-GB,en-US",
  "diffEditor.ignoreTrimWhitespace": false,
  "editor.formatOnSave": false,
  "editor.linkedEditing": true,
  "editor.renderWhitespace": "all",
  "editor.rulers": [80],
  "editor.tabSize": 2,
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
