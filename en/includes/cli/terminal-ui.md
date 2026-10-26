# Terminal UI

The {{ product_name }} CLI includes a terminal dashboard where you can browse and manage resources with your keyboard, without remembering command names.

## Launch the terminal UI

[Sign in]({{base_path}}/cli/authenticate/) and run the following command.

```bash
asg tui
```

Select one of the following resource areas and press `Enter`.

- Applications
- Users
- API Resources
- Organizations
- Groups
- Roles
- Branding
- Agents

## Keyboard shortcuts

The footer of each view lists the shortcuts that the view supports.

| Shortcut | Action |
|---|---|
| `↑` `↓` or `h` `j` `k` `l` | Move through the list. |
| `←` `→` | Switch between tabs, where available. |
| `Enter` | Open the selected item. |
| `Ctrl` + `N` | Create a resource. |
| `Ctrl` + `E` | Edit the selected resource. |
| `Alt` + `E` | Export the selected resource to a temporary file to edit in your text editor. |
| `Ctrl` + `S` | Import the changes from the edited temporary file. |
| `Ctrl` + `D` | Delete the selected resource. |
| `Ctrl` + `R` | Refresh the list. |
| `Ctrl` + `O` | Open the selected resource in the {{ product_name }} Console. |
| `Ctrl` + `H` | Return to the resource areas. |
| `q` or `Ctrl` + `C` | Quit. |
