# Configs

The umbrella repository for all configs, used in web development.

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

`package.json`

```json
{
  "scripts" {
    "prettier:check": "prettier --check .",
    "prettier:fix": "prettier --write ."
  }
}
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
build
dist

# Coverage directory
coverage

# GitHub Workflow
.github

# MSW generated service worker
public/mockServiceWorker.js
```

## Git ignore

`.gitignore`

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

### React + TypeScript

Creation of a Vite project

```shell
yarn create vite
```

Installation of additional packages

```shell
yarn add -D vite-tsconfig-paths
```

`package.json`

```json
{
  "scripts" {
    "tslint": "tsc"
  }
}
```

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

`vite.config.ts`

```typescript
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
});
```

### Pure TypeScript

Check out [`hydrate-text` repository](https://github.com/vasilii-kovalev/hydrate-text).

## ESlint

### React + TypeScript

```shell
yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

`package.json`

```json
{
  "scripts" {
    "eslint:check": "eslint --ext .ts,.tsx src --color",
    "eslint:fix": "yarn eslint:check --fix"
  }
}
```

`.eslintrc`

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
  "root": true,
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

`.eslintignore`

```ignore
# MSW mocks
src/mocks
```

### Pure TypeScript

Check out [`hydrate-text` repository](https://github.com/vasilii-kovalev/hydrate-text).

## Stylelint

Installation script

```shell
yarn add -D stylelint stylelint-config-standard stylelint-config-prettier stylelint-config-css-modules stylelint-order stylelint-scss
```

`package.json`

```json
{
  "scripts" {
    "stylelint:check": "stylelint src/**/*.scss --color",
    "stylelint:fix": "yarn stylelint:check --fix"
  }
}
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

## Visual Studio Code

Extensions

- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [browserslist](https://marketplace.visualstudio.com/items?itemName=webben.browserslist)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)
- [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai)
- [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Russian - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-russian)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

_Note: run `code --list-extensions` in terminal to get extensions list._

Config

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
