# === Commands history management ===

# Keep history across sessions
shopt -s histappend

# Number of commands kept in memory
HISTSIZE=10000

# Maximum number of commands saved to the history file
HISTFILESIZE=20000

# Append each command to the history file
PROMPT_COMMAND="history -a${PROMPT_COMMAND:+; $PROMPT_COMMAND}"

# === fnm ===

# Add fnm to PATH
export PATH="$PATH:$(cygpath "$USERPROFILE")/bin"

# Initialize fnm with automatic Node.js version switching
eval "$(fnm env --use-on-cd --shell bash)"
