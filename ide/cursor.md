# Configuration for Cursor

[Link to IDE](https://cursor.com/)

## User settings

### `settings.json`

```jsonc
{
	"[markdown]": {
		"editor.wordWrap": "wordWrapColumn",
		"editor.wordWrapColumn": 120
	},
	"cSpell.language": "en",
	// Fira Code font: https://github.com/tonsky/FiraCode
	"editor.fontFamily": "'Fira Code', Consolas, 'Courier New', monospace",
	"editor.guides.bracketPairs": true,
	"editor.linkedEditing": true,
	"editor.minimap.enabled": false,
	"editor.quickSuggestions": {
		"strings": "on"
	},
	"editor.renderWhitespace": "all",
	"editor.rulers": [
		120
	],
	"editor.stickyScroll.enabled": false,
	"editor.tabSize": 2,
	"editor.unicodeHighlight.nonBasicASCII": true,
	// Too annoying.
	"editor.wordBasedSuggestions": "off",
	"explorer.copyRelativePathSeparator": "/",
	"files.associations": {
		".env*": "properties"
	},
	"files.autoSave": "off",
	"git.allowNoVerifyCommit": true,
	"git.blame.editorDecoration.enabled": true,
	"git.blame.statusBarItem.enabled": false,
	"git.confirmSync": false,
  "js/ts.preferences.jsxAttributeCompletionStyle": "none",
	"json.schemaDownload.enable": true,
	"terminal.integrated.commandsToSkipShell": [
		"aichat.newchataction"
	],
	"terminal.integrated.defaultProfile.windows": "Git Bash",
	"terminal.integrated.scrollback": 5000,
	"terminal.integrated.stickyScroll.enabled": false,
	"workbench.colorTheme": "Default Light Modern",
	"workbench.iconTheme": "material-icon-theme",
	"workbench.startupEditor": "none",
	"workbench.tree.enableStickyScroll": false
}
```

## Keyboard shortcuts

### `keybindings.json`

```jsonc
[
	{
		"key": "ctrl+e",
		"command": "-cursor.toggleAgentWindowIDEUnification",
		"when": "!isGlass && workbenchState != 'empty'"
	},
	{
		"key": "ctrl+k",
		"command": "-aipopup.action.modal.generate",
		"when": "editorFocus && !composerBarIsVisible"
	},
	{
		"key": "ctrl+k s",
		"command": "saveAll"
	},
	{
		"key": "ctrl+shift+l",
		"command": "-composer.newAgentChat"
	}
]
```

## Extensions

### List

- [Code Spell Checker](https://marketplace.cursorapi.com/items/?itemName=streetsidesoftware.code-spell-checker)
- [EditorConfig](https://marketplace.cursorapi.com/items/?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.cursorapi.com/items/?itemName=dbaeumer.vscode-eslint)
- [markdownlint](https://marketplace.cursorapi.com/items/?itemName=DavidAnson.vscode-markdownlint)
- [Material Icon Theme](https://marketplace.cursorapi.com/items/?itemName=PKief.material-icon-theme)
- [Stylelint](https://marketplace.cursorapi.com/items/?itemName=stylelint.vscode-stylelint)

### `extensions.json`

```json
{
	"recommendations": [
		"DavidAnson.vscode-markdownlint",
		"dbaeumer.vscode-eslint",
		"EditorConfig.EditorConfig",
		"PKief.material-icon-theme",
		"streetsidesoftware.code-spell-checker",
		"stylelint.vscode-stylelint"
	]
}
```
