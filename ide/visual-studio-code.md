# Configuration for Visual Studio Code

[Link to IDE](https://code.visualstudio.com/)

## User settings

### `settings.json`

```jsonc
{
	"[markdown]": {
		"editor.wordWrap": "wordWrapColumn",
		"editor.wordWrapColumn": 120
	},
	"chat.viewSessions.orientation": "stacked",
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
	"scm.repositories.explorer": true,
	"scm.repositories.selectionMode": "single",
	"telemetry.feedback.enabled": false,
	"terminal.integrated.defaultProfile.windows": "Git Bash",
	"terminal.integrated.scrollback": 5000,
	"terminal.integrated.stickyScroll.enabled": false,
	"workbench.activityBar.location": "top",
	"workbench.colorTheme": "Light Modern",
	"workbench.editor.useModal": "off",
	"workbench.iconTheme": "material-icon-theme",
	"workbench.startupEditor": "none",
	"workbench.tree.enableStickyScroll": false
}
```

## Extensions

### List

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [rumdl - Markdown Linter](https://marketplace.visualstudio.com/items?itemName=rvben.rumdl)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

### `extensions.json`

```jsonc
{
	"recommendations": [
		"dbaeumer.vscode-eslint",
		"EditorConfig.EditorConfig",
		"PKief.material-icon-theme",
		"rvben.rumdl",
		"streetsidesoftware.code-spell-checker",
		"stylelint.vscode-stylelint"
	]
}
```
