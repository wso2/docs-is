# Asgardeo MCP Server <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

The **Asgardeo MCP Server** helps you manage identity and access management tasks using natural language prompts. It connects your code editor or AI tool to Asgardeo’s Management APIs, letting you automate common identity management operations—such as listing applications, updating application settings, or managing users—without going through UI interfaces or needing to write API calls.

You can use the Asgardeo MCP Server with popular editors and tools like **VS Code, Claude Desktop, Cursor, Windsurf**, and others. The MCP server acts as a bridge between your editor and Asgardeo, handling authentication and API requests for you. This quickstart explains how to set up the server, connect it to your Asgardeo organization, and verify your setup.

!!! Note

    The Asgardeo MCP Server is currently in **Preview**. Some features may be subject to changes in future releases.

## On Asgardeo

The Asgardeo MCP Server communicates with the Asgardeo Management APIs to perform the actions required by each MCP tool. To make this work, it must first get an access token with the appropriate scopes. This requires configuring access to your {{ product_name }} organization by creating a Machine-to-Machine (M2M) application and authorizing API Resources and Scopes to access the necessary APIs.

1. Sign into {{ product_name }} console and navigate to **Applications > New Application**. Then, select **M2M Application** and complete the wizard popup by providing a suitable name.

    !!! Example
        **name:** Asgardeo-MCP-Server

    Note down the following values from the **Protocol** tab of the registered application. You will need them in **step-3**.

    - **`client-id`** from the **Protocol** tab.
    - **`client-secret`** from the **Protocol** tab.
    - **The name of your {{ product_name }} organization**

2. Authorize the API resources and corresponding scopes required for the actions performed by the MCP tools. The following table includes the required API resources and scopes for all currently supported tools.

| **Asgardeo Management API** | **Required scopes** |
|--------|---------|
| **Application Management API** (`/api/server/v1/applications`) | `internal_application_mgt_view`, `internal_application_mgt_update`, `internal_application_mgt_create` |
| **API Resource Management API** (`/api/server/v1/api-resources`) | `internal_api_resource_update`, `internal_api_resource_create`, `internal_api_resource_view` |
| **Identity Provider Management API** (`/api/server/v1/identity-providers`) | `internal_idp_view` |
| **Authenticators Management API** (`/api/server/v1/authenticators`) | `internal_authenticator_view` |
| **Claim Management API** (`/api/server/v1/claim-dialects`) | `internal_claim_meta_view` |
| **SCIM2 Users API** (`/scim2/Users`) | `internal_user_mgt_create` |
| **OIDC Scope Management API** (`/api/server/v1/oidc/scopes`) | `internal_oidc_scope_mgt_view` |

To authorize API resources, navigate to the **API Authorization** tab within your Asgardeo application settings and click the **Authorize an API Resource** button. In the pop-up window that appears, use the dropdown to search and select the necessary API Resources from the Management APIs and authorize necessary scopes.

!!! Note

    You can selectively authorize API Resources and scopes based on the specific MCP tools you plan to use.
    For detailed guidance on which API Resources and Scopes are needed by each tool, see the [API resources and scopes required for MCP tools]({{base_path}}/references/mcp-tool-api-resource-access/) section.

Once completed, your API Authorization configuration should look as follows.

![Asgardeo M2M app]({{base_path}}/assets/img/quick-starts/mcp-server/image1.png){: width="800" style="display: block; margin: 0;"}

## Configure your code editor

=== " VS Code "
    1. Open **VS Code**.
    2. Press `Ctrl` + `Shift` + `P` (or `Cmd` + `Shift` + `P` on Mac).
    3. Type **"Preferences: Open Settings (JSON)"** and select it.

    Append the following configuration to `settings.json` file. Replace the `<ABSOLUTE-PATH>`, `<client-id>`,  `<client-secret>` and `<organization>` values from the values you copied from the previous steps. 
    
    ```json title="settings.json" 
    "mcp": {
        "servers": {
            "asgardeo-mcp": {
                "command": "<ABSOLUTE-PATH>/asgardeo-mcp",
                "args": [],
                "env": {
                    "ASGARDEO_BASE_URL": "https://api.asgardeo.io/t/<organization>",
                    "ASGARDEO_CLIENT_ID": "<client-id>",
                    "ASGARDEO_CLIENT_SECRET": "<client-secret>"
                }
            }
        }
    }
    ```

=== " Cursor "
    1. Open **Cursor**.
    2. Click on **Cursor > Settings > Cursor Settings**.
    3. Switch to **MCP** tab.
    4. Click on **Add new global MCP server** button. This will open `mcp.json` file in the editor itself.

    Append the following configuration to `settings.json` file. Replace the `<ABSOLUTE-PATH>`, `<client-id>`,  `<client-secret>` and `<organization>` values from the values you copied from the previous steps. 
    
    ```json title="mcp.json" 
    {
        "mcpServers": {
            "asgardeo-mcp": {
                "command": "<ABSOLUTE-PATH>/asgardeo-mcp",
                "args": [],
                "env": {
                    "ASGARDEO_BASE_URL": "https://api.asgardeo.io/t/<organization>",
                    "ASGARDEO_CLIENT_ID": "<client-id>",
                    "ASGARDEO_CLIENT_SECRET": "<client-secret>"
                }
            }
        }
    }
    ```

=== " Windsurf "
    1. Open **Windsurf**.
    2. Click on **Windsurf > Windsurf Settings > Cursor Cascade**.
    3. Switch to **MCP** tab.
    4. Click on **Add Server** button next to **Model Context Protocol (MCP) Servers**. Then click the **Add custom Server** button will open `mcp_config.json` file in the editor itself.

    Append the following configuration to `mcp_config.json` file. Replace the `<ABSOLUTE-PATH>`, `<client-id>`,  `<client-secret>` and `<organization>` values from the values you copied from the previous steps. 
    
    ```json title="`mcp_config.json.json" 
    "{
        "servers": {
            "asgardeo-mcp": {
                "command": "<ABSOLUTE-PATH>/asgardeo-mcp",
                "args": [],
                "env": {
                    "ASGARDEO_BASE_URL": "https://api.asgardeo.io/t/<organization>",
                    "ASGARDEO_CLIENT_ID": "<client-id>",
                    "ASGARDEO_CLIENT_SECRET": "<client-secret>"
                }
            }
        }
    }
    ```

=== " Claude Desktop "
    1. Open **Claude Desktop**.
    2. Click on **Claude Desktop > Settings > Developer**.
    4. Click on **Edit Config** button. This will open `claude_desktop_config.json` file location and you can open this file using an text editor.

    Append the following configuration to `claude_desktop_config.json` file. Replace the `<ABSOLUTE-PATH>`, `<client-id>`,  `<client-secret>` and `<organization>` values from the values you copied from the previous steps. 
    
    ```json title="claude_desktop_config.json" 
    {
        "mcpServers": {
            "asgardeo-mcp": {
                "command": "<ABSOLUTE-PATH>/asgardeo-mcp",
                "args": [],
                "env": {
                    "ASGARDEO_BASE_URL": "https://api.asgardeo.io/t/<organization>",
                    "ASGARDEO_CLIENT_ID": "<client-id>",
                    "ASGARDEO_CLIENT_SECRET": "<client-secret>"
                }
            }
        }
    }
    ```
=== " Other "
    Use the following settings to configure your MCP-compatible client application.

    Make sure to replace the `<ABSOLUTE-PATH>`, `<client-id>`,  `<client-secret>` and `<organization>` values from the values you copied from the previous steps. 
    
    ```json  
    {
        "mcpServers": {
            "asgardeo-mcp": {
                "command": "<ABSOLUTE-PATH>/asgardeo-mcp",
                "args": [],
                "env": {
                    "ASGARDEO_BASE_URL": "https://api.asgardeo.io/t/<organization>",
                    "ASGARDEO_CLIENT_ID": "<client-id>",
                    "ASGARDEO_CLIENT_SECRET": "<client-secret>"
                }
            }
        }
    }
    ```

## Verify Asgardeo MCP server setup

Use the following simple prompt to verify whether you have configured Asgardeo MCP Server successfully.

```text
List my Asgardeo applications, names only

```

Depending on the code editor you're using, you should see a list of results. The output may vary based on the number of applications you've created in Asgardeo, but you should see at least one application name listed.

=== " VS Code  "
    Asgardeo application list displayed in VS Code.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image2.png){: width="500" style="display: block; margin: 0;"}

=== " Cursor  "
    Asgardeo application list displayed in Cursor.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image3.png){: width="500" style="display: block; margin: 0;"}

=== " Windsurf  "
    Asgardeo application list displayed in Windsurf.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image4.png){: width="500" style="display: block; margin: 0;"}

=== " Claude Desktop "
    Asgardeo application list displayed in Claude Desktop.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image5.png){: width="800" style="display: block; margin: 0;"}

## Build a real-world sample

Now that you’ve configured and verified the Asgardeo MCP Server with your preferred code editor, it’s time to build a real-world example. The following quickstarts are great starting points to try out the Asgardeo MCP Server alongside your AI toolkit:

- [Asgardeo React Quickstart]({{ base_path }}/quick-starts/react/){:target="_blank"}
- [Asgardeo Angular Quickstart]({{ base_path }}/quick-starts/angular/){:target="_blank"}
- [Asgardeo React Spring Quickstart]({{ base_path }}/quick-starts/springboot/){:target="_blank"}

Explore these guides to put your setup into action and see how natural-language-powered identity management can accelerate your development workflow.

!!! Note

    During tool execution, you will be prompted to give **explicit consent** for the action. It’s recommended to 
    approve actions with "Approve Once" option rather than selecting "Approve Always" option so you retain full control and visibility
    over the operations performed in your Asgardeo organization.
