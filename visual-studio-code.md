# Visual Studio Code configs

## Extensions

### Always enabled

* [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
* [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai)

### Enabled in workspaces if needed

* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
* [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
* [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
* [Oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
* [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
* [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

## User settings

```jsonc
{
	"[markdown]": {
		"editor.wordWrap": "wordWrapColumn"
	},
	"chat.commandCenter.enabled": false,
	"debug.console.fontSize": 13,
	"diffEditor.experimental.showMoves": true,
	"diffEditor.ignoreTrimWhitespace": true,
	// Fira Code font: https://github.com/tonsky/FiraCode
	"editor.fontFamily": "'Fira Code', Consolas, 'Courier New', monospace",
	"editor.fontSize": 13,
	"editor.guides.bracketPairs": true,
	"editor.linkedEditing": true,
	"editor.quickSuggestions": {
		"strings": "on"
	},
	"editor.rulers": [
		120
	],
	"editor.renderWhitespace": "all",
	"editor.stickyScroll.enabled": false,
	"editor.tabSize": 2,
	"editor.unicodeHighlight.nonBasicASCII": true,
	"files.autoSave": "off",
	"git.allowNoVerifyCommit": true,
	"git.confirmSync": false,
	"git.blame.editorDecoration.enabled": true,
	"git.blame.statusBarItem.enabled": false,
	"javascript.preferences.jsxAttributeCompletionStyle": "none",
	"markdown.preview.fontSize": 13,
	"scm.inputFontSize": 13,
	"telemetry.feedback.enabled": false,
	"terminal.integrated.defaultProfile.windows": "Git Bash",
	"terminal.integrated.fontSize": 13,
	"terminal.integrated.scrollback": 5000,
	"typescript.preferences.jsxAttributeCompletionStyle": "none",
	"window.zoomLevel": 1,
	"workbench.colorCustomizations": {
		"[One Monokai]": {
			"editor.wordHighlightBorder": "#c5c5c5"
		}
	},
	"workbench.colorTheme": "One Monokai",
	"workbench.iconTheme": "material-icon-theme",
	"workbench.startupEditor": "none",
	"workbench.tree.enableStickyScroll": false
}
```
