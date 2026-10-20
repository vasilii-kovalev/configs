# Common project configs

## EditorConfig

### `.editorconfig`

```editorconfig
root = true

[*]
charset = utf-8
indent_style = tab
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true

# For a pretty visual representation.
[*.md]
indent_size = 2
indent_style = space
```

### `.npmrc`

```npmrc
# Supply-chain cooldown (days): npm skips versions newer than this so compromised publishes are more likely to be caught before install.
min-release-age=3
save-exact=true
```
