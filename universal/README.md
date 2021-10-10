# Universal configs

## EditorConfig

### .editorconfig

```editor-config
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = tab
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true
```

## Prettier

### Installation script

#### Yarn

```shell
yarn add -D -E prettier
```

#### npm

```shell
npm i -D -E prettier
```

### .prettierrc

```json
{
  "arrowParens": "always",
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
  "useTabs": true
}
```

### .prettierignore

```ignore
# Artifacts
build
dist
```

### package.json

```json
{
  "scripts": {
    "prettier:check": "prettier . --check",
    "prettier:fix": "prettier . --write"
  }
}
```

## Visual Studio Code

### Extensions

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) (enabled only if needed)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [browserslist](https://marketplace.visualstudio.com/items?itemName=webben.browserslist) (enabled only if needed)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) (enabled only if needed)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) (enabled only if needed)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (enabled only if needed)
- [filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize) (enabled only if needed)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) (enabled only if needed)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks) (enabled only if needed)
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
  "editor.bracketPairColorization.enabled": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.guides.bracketPairs": true,
  "editor.linkedEditing": true,
  "editor.renderWhitespace": "all",
  "editor.rulers": [80],
  "editor.tabSize": 2,
  "explorer.compactFolders": false,
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
