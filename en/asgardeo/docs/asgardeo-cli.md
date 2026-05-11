---
template: templates/quick-start.html
---
<script>
  const meta = {
    what_you_will_learn: [
      "Build and install the Asgardeo CLI",
      "Configure your Asgardeo organization"
    ],
    prerequisites: [
      "About 15 minutes",
      "<a href='{{ base_path }}/get-started/create-asgardeo-account/'>Asgardeo account</a>",
      "Install <a href='https://go.dev/doc/install' target='_blank' rel='noopener noreferrer'>Go</a> on your system.",
    ],
  };
</script>

# Asgardeo CLI <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

The **Asgardeo CLI** helps you manage identity and access management tasks using terminal commands. It connects your terminal or AI tool to Asgardeo's Management APIs, automating common identity management operations such as creating applications, updating API resources, and managing users, groups, and roles without using the Asgardeo Console UI or writing API calls.

The Asgardeo CLI acts as a bridge between your terminal and Asgardeo, handling authentication and API requests. This guide explains how to set up the CLI, connect it to your Asgardeo organization, and verify your setup.

!!! Note

    The Asgardeo CLI is currently in **Preview**. Some features may be subject to changes in future releases.

## Configure Asgardeo

The Asgardeo CLI communicates with the Asgardeo Management APIs to perform the actions required by each command. To make this work, it must first get an access token with the appropriate scopes. This requires configuring access to your Asgardeo organization by creating a Machine-to-Machine (M2M) application and authorizing API Resources and Scopes to access the necessary APIs.

1. Sign into [Asgardeo console](https://console.asgardeo.io) and navigate to **Applications > New Application**. Then, select **M2M Application** and complete the wizard popup by providing a suitable name.

    !!! Example
        **name:** asgardeo-cli

    Note down the following values from the **Protocol** tab of the registered application. You will need them to authenticate the CLI.

    - **`client-id`** from the **Protocol** tab.
    - **`client-secret`** from the **Protocol** tab.
    - **The name of your Asgardeo organization**

    ![Asgardeo M2M app]({{base_path}}/assets/img/quick-starts/cli-tool/credentials.png){: width="800" style="display: block; margin: 0;"}

    !!! Note
        It is recommended to set the `Token type` of the Access Token of this application to `Opaque`, and `Application access token expiry time` of the application to a preferred value. These configurations can be done in the **Protocol** tab.

2. Authorize the API resources and corresponding scopes required for the actions performed by the CLI. The following table includes the required API resources and scopes for the currently supported CLI commands.

| **Asgardeo Management API** | **Required scopes** |
|--------|---------|
| **SCIM2 Agents API** (`/scim2/Agents`) | `internal_agent_mgt_list`, `internal_agent_mgt_create`, `internal_agent_mgt_view`, `internal_agent_mgt_update`, `internal_agent_mgt_delete`|
| **Application Management API** (`/api/server/v1/applications`) | `internal_application_mgt_view`, `internal_application_mgt_update`, `internal_application_mgt_create`, `internal_application_mgt_delete` |
| **API Resource Management API** (`/api/server/v1/api-resources`) | `internal_api_resource_create`, `internal_api_resource_view`, `internal_api_resource_delete`, `internal_api_resource_update` |
| **Branding Preference Management API** (`/api/server/v1/branding-preference`) |`internal_branding_preference_update`|
| **Identity Provider Management API** (`/api/server/v1/identity-providers`) | `internal_idp_view`, `internal_idp_create`, `internal_idp_update`, `internal_idp_delete` |
| **Organization Management API** (`/api/server/v1/organizations`) |`internal_organization_create`, `internal_organization_view`, `internal_organization_update`, `internal_organization_delete`|
| **SCIM2 Users API** (`/scim2/Users`) | `internal_user_mgt_create`, `internal_user_mgt_list`, `internal_user_mgt_view`, `internal_user_mgt_update`, `internal_user_mgt_delete` |
| **SCIM2 Groups API** (`/scim2/Groups`) | `internal_group_mgt_create`, `internal_group_mgt_view`, `internal_group_mgt_update`, `internal_group_mgt_delete` |
| **SCIM2 Roles V3 API** (`/scim2/v3/Roles`) | `internal_role_mgt_view`, `internal_role_mgt_meta_create`, `internal_role_mgt_meta_update`, `internal_role_mgt_delete`, `internal_role_mgt_users_update`, `internal_role_mgt_groups_update` |

!!! Note

    You can selectively authorize API Resources and scopes based on the specific commands you plan to use.
    If you plan to use the `asg api` command, ensure you have authorized the corresponding API resource and scopes.

## Installation

### Building the Asgardeo CLI locally

1. Clone the repository

```bash
  git clone https://github.com/wso2-enterprise/asgardeo-cli.git
```

2.  Build and install the CLI

```bash
  cd asgardeo-cli/cmd/asg
  go install .
```

!!! Note
    Ensure your Go binary directory is included in your `PATH`.

    Example:
    ```bash
    export PATH=$PATH:$(go env GOPATH)/bin
    ```

3. Verify the installation

```bash
  asg --help
```

If the command displays the help message, the installation was successful.

## Authenticating the CLI

Before using the CLI, you must authenticate it.

### Authenticating via an application
The credentials of the application created [earlier](#configure-asgardeo) will be used in this step.

1. Run the login command

```bash
asg login
```

2. Select `Login using an application`

3. Provide the credentials (`client-id`, `client-secret`, `organization-name`) when prompted.

!!! Note
    Authentication can be done in one step by providing the credentials as flags.
    ```bash
      asg login --client-id <client_id> --client-secret <client_secret> --org-name <organization_name>
    ```

!!! Warning
    Do not expose your `client-secret` in shared terminals, shell history, or source control repositories.

4. Verify authentication status

```bash
  asg status
```

!!! Note
    Use the `asg logout` commnd to clear the authentication data of the CLI.

The current authentication status will be displayed in the terminal.

## Command Line Interface

Once the CLI is authenticated, commands can be executed.
Commands follow the `<root> <resource_type> <action> --<flags>` pattern.

For example:
  ```bash
  asg apps list
  asg apis create
  asg users delete --id <user_id>
  ```

!!! Note
    Adding the `--help` flag displays the detailed help message for any command.
    ```bash
      asg apps delete --help
      asg groups members add --help
    ```

## Text User Interface

The Asgardeo CLI provides a Text User Interface (TUI) for interactive navigation and command execution without manually typing commands.
```bash
  asg tui
``` 

## Next steps

After setting up the CLI, you can start managing:

- Applications
- Users
- Groups
- Roles
- API resources

Use the `--help` flag with any command to explore available operations.
