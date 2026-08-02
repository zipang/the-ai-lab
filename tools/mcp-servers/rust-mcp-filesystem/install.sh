#!/bin/bash

# rust-mcp-filesystem installer
# Installs the latest version from GitHub using cargo

set -e

REPO_URL="https://github.com/rust-mcp-stack/rust-mcp-filesystem"

# Check dependencies
if ! command -v cargo &> /dev/null; then
    echo "Error: cargo is not installed. Please install Rust from https://rustup.rs"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "Error: git is not installed."
    exit 1
fi

echo "Welcome to the rust-mcp-filesystem installer."
echo "This script will install the latest version directly from GitHub."
echo ""
echo "Select installation target:"
echo "1) ~/.cargo/bin (Standard Rust location)"
echo "2) ~/.local/bin (Standard user binary location)"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        INSTALL_ROOT="$HOME/.cargo"
        BIN_PATH="$HOME/.cargo/bin"
        ;;
    2)
        INSTALL_ROOT="$HOME/.local"
        BIN_PATH="$HOME/.local/bin"
        mkdir -p "$BIN_PATH"
        ;;
    *)
        echo "Invalid choice. Defaulting to ~/.cargo/bin"
        INSTALL_ROOT="$HOME/.cargo"
        BIN_PATH="$HOME/.cargo/bin"
        ;;
esac

echo "Installing rust-mcp-filesystem to $BIN_PATH..."

cargo install --git "$REPO_URL" --root "$INSTALL_ROOT"

echo ""
echo "Installation complete!"

# Check if path is in PATH
if [[ ":$PATH:" != *":$BIN_PATH:"* ]]; then
    echo "Warning: $BIN_PATH is not in your PATH."
    echo "You may need to add it to your shell configuration (e.g., .bashrc or .zshrc):"
    echo "  export PATH=\"\$PATH:$BIN_PATH\""
else
    echo "Success: rust-mcp-filesystem is ready to use."
    "$BIN_PATH/rust-mcp-filesystem" --version
fi
