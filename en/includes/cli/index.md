# {{ product_name }} CLI

The **{{ product_name }} CLI** (`asg`) lets you manage your {{ product_name }} organization from the terminal. You can create and update applications, API resources, MCP servers, AI agents, users, groups, roles, organizations and branding without opening the Console, and script these tasks for automation and CI/CD pipelines.

The CLI offers three ways to work:

- **Commands** such as `asg apps list` or `asg users create`, which prompt you for any missing values.
- **Non-interactive mode** for scripts, where every value comes from flags and output can be JSON or YAML.
- **A terminal dashboard** (`asg tui`) to browse and manage resources visually. See [Terminal UI]({{base_path}}/cli/terminal-ui/).

!!! note
    The CLI currently supports organizations in the US region.

## Prerequisites

- A [{{ product_name }} account]({{base_path}}/get-started/create-identity-platform-account/).
- Administrator access to the {{ product_name }} Console to enable CLI access for your organization.

## Enable CLI access

CLI access is disabled by default. An administrator of the root organization must enable it and choose which users can sign in through the CLI.

1. On the {{ product_name }} Console, go to **CLI Settings**.

2. Turn on the **CLI** toggle to enable CLI access for the organization.

3. Go to the **Users** tab and click **Assign Users**.

4. Select the users who need CLI access and save.

!!! note
    The **Users** tab manages members of the **CLI Administrator** role. If you disable CLI access later, active CLI sessions are terminated immediately and users can no longer sign in through the CLI. Existing user assignments are kept, so you can re-enable access at any time.

## Install the CLI

{% set asg_release = "asg-v0.1.0-rc.1" %}
{% set asg_release_url = "https://github.com/wso2/wso2-cli/releases/tag/" ~ asg_release %}
{% set asg_download_url = "https://github.com/wso2/wso2-cli/releases/download/" ~ asg_release %}

The CLI is a single binary for macOS, Linux and Windows.

1. Download the binary for your platform from the [{{ product_name }} CLI release]({{ asg_release_url }}){: target="_blank"}.

    | Platform | File |
    |---|---|
    | macOS (Apple silicon) | `asg-darwin-arm64` |
    | macOS (Intel) | `asg-darwin-amd64` |
    | Linux (x86-64) | `asg-linux-amd64` |
    | Linux (Arm 64-bit) | `asg-linux-arm64` |
    | Linux (Arm 32-bit) | `asg-linux-arm` |
    | Linux (x86 32-bit) | `asg-linux-386` |
    | Windows (x86-64) | `asg-windows-amd64.exe` |
    | Windows (Arm) | `asg-windows-arm64.exe` |

    !!! example
        The download URL for macOS (Apple silicon) is:

        `{{ asg_download_url }}/asg-darwin-arm64`

2. Rename the file to `asg` (`asg.exe` on Windows) and move it to a folder on your `PATH`.

    === "macOS/Linux"

        ```bash
        mkdir -p ~/.local/bin
        mv ~/Downloads/asg-darwin-arm64 ~/.local/bin/asg
        chmod +x ~/.local/bin/asg
        ```

        Replace `asg-darwin-arm64` with the file you downloaded. If `~/.local/bin` is not on your `PATH`, add `export PATH="$HOME/.local/bin:$PATH"` to your shell profile, such as `~/.zshrc` or `~/.bashrc`.

    === "Windows"

        ```powershell
        New-Item -ItemType Directory -Force "$env:LOCALAPPDATA\asg" | Out-Null
        Move-Item "$env:USERPROFILE\Downloads\asg-windows-amd64.exe" "$env:LOCALAPPDATA\asg\asg.exe"
        [Environment]::SetEnvironmentVariable("Path", "$([Environment]::GetEnvironmentVariable('Path', 'User'));$env:LOCALAPPDATA\asg", "User")
        ```

        Open a new terminal so that the updated `PATH` takes effect.

3. Verify the installation.

    ```bash
    asg --version
    ```

!!! tip
    To verify the download, compare its SHA-256 checksum with the value in the `checksums.txt` file of the release.

## Sign in

Run the following command and provide the name of your root organization. You can find it in the Console URL, `https://console.asgardeo.io/t/<organization-name>`.

```bash
asg login --org-name <organization-name>
```

The CLI opens the sign-in page in your browser. Confirm the code shown in your terminal and sign in with your {{ product_name }} credentials.

To learn about other ways to sign in, such as using a machine-to-machine (M2M) application in CI/CD pipelines, see [Authenticate the CLI]({{base_path}}/cli/authenticate/).

## Run your first commands

Commands follow the `asg <resource> <action> [flags]` pattern.

```bash
# List applications
asg apps list

# View details of an application
asg apps view --name <application-name>

# Find users whose username starts with "john"
asg users filter --query "userName sw john"
```

Use `--help` at any level to see the available commands and flags.

```bash
asg --help
asg apps --help
asg apps create --help
```

## Global flags

The following flags work with every command.

| Flag | Description |
|---|---|
| `--format json` or `--format yaml` | Prints structured output instead of tables. |
| `-N`, `--no-interactive` | Disables prompts. You must provide all required values as flags. |
| `--no-color` | Disables colored output. |
| `-v`, `--verbose` | Prints detailed logs, which help with troubleshooting. |
| `-h`, `--help` | Shows help for the command. |

## Supported resources

| Command | Manages |
|---|---|
| `asg apps` | Applications, including their protocol settings, authorized API resources and requested user attributes. |
| `asg apis` | API resources, including MCP servers, and their scopes. |
| `asg scopes` | Scopes across all API resources. |
| `asg agents` | AI agents. |
| `asg users` | Users. |
| `asg groups` | Groups, group members and the roles assigned to groups. |
| `asg roles` | Roles and the users and groups assigned to roles. |
| `asg orgs` | Organizations. |
| `asg idps` | Connections (identity providers). |
| `asg branding` | Branding preferences. |
| `asg api` | Sends a request to any {{ product_name }} management API using your CLI session. |

See [Manage resources with the CLI]({{base_path}}/cli/manage-resources/) for examples of common tasks.

## Troubleshooting

| Error | Solution |
|---|---|
| `CLI access is disabled for this organization` | Ask an administrator to [enable CLI access](#enable-cli-access), then run `asg login` again. |
| Requesting the device code failed | Make sure you entered the name of the root organization. |
| `device code expired` | Run `asg login` again and complete the browser sign-in sooner. |
| Permission errors when running a command | Make sure your user has CLI access. If you signed in with an M2M application, authorize the required management API scopes for it. |

Add `--verbose` to any command to see detailed logs.
