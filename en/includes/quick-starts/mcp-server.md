# Asgardeo MCP Server Quickstart <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

Welcome to the Asgardeo MCP Server Quickstart! In this document, you will learn how to build, install, and configure the Asgardeo MCP Server with **VS Code, Claude Desktop, Cursor, Windsurf**, and other MCP-compatible clients.

!!! Note

    The Asgardeo MCP Server is currently in **Preview**. Some features may be subject to changes in future releases.

[//] STEPS_START

## Configure {{ product_name }} access for MCP server

The Asgardeo MCP Server communicates with the {{ product_name }} Management APIs to perform the actions required by each MCP tool.
To enable this, it must first get an access token with the appropriate scopes. This requires configuring access to
your {{ product_name }} organization by creating a Machine-to-Machine (M2M) application and authorizing API Resources and Scopes to access the
necessary APIs.

Follow these steps to set up the M2M application:

Sign into {{ product_name }} console and navigate to **Applications > New Application**. Then, select **M2M Application** and complete the wizard popup by providing a suitable name.

!!! Example
    **name:** Asgardeo-MCP-Server

Note down the following values from the **Protocol** tab of the registered application. You will need them in **step-3**.

- **`client-id`** from the **Protocol** tab.
- **`client-secret`** from the **Protocol** tab.
- **The name of your {{ product_name }} organization**

---
Next, you need to authorize the API resources and corresponding scopes required for the actions performed by the MCP tools.
The following table includes the required API resources and scopes for all currently supported tools.

| **{{ product_name }} Management API** | **Required scopes** |
|--------|---------|
| **Application Management API** (`/api/server/v1/applications`) | `internal_application_mgt_view`, `internal_application_mgt_update`, `internal_application_mgt_create` |
| **API Resource Management API** (`/api/server/v1/api-resources`) | `internal_api_resource_update`, `internal_api_resource_create`, `internal_api_resource_view` |
| **Identity Provider Management API** (`/api/server/v1/identity-providers`) | `internal_idp_view` |
| **Authenticators Management API** (`/api/server/v1/authenticators`) | `internal_authenticator_view` |
| **Claim Management API** (`/api/server/v1/claim-dialects`) | `internal_claim_meta_view` |
| **SCIM2 Users API** (`/scim2/Users`) | `internal_user_mgt_create` |
| **OIDC Scope Management API** (`/api/server/v1/oidc/scopes`) | `internal_oidc_scope_mgt_view` |

To authorize API resources, navigate to the **API Authorization** tab within your {{ product_name }} application settings and
click the **Authorize an API Resource** button. In the pop-up window that appears, use the dropdown to search and select
the necessary API Resources from the Management APIs and authorize necessary scopes.

!!! Note

    You can selectively authorize API Resources and scopes based on the specific MCP tools you plan to use.
    For detailed guidance on which API Resources and Scopes are needed by each tool, see the [API resources and scopes required for MCP tools]({{base_path}}/references/mcp-tool-api-resource-access/) section.

Once completed, your API Authorization configuration should resemble the example shown in the screenshot.

![{{ product_name }} M2M app]({{base_path}}/assets/img/quick-starts/mcp-server/image1.png){: width="800" style="display: block; margin: 0;"}

{% if product_name == "WSO2 Identity Server" %}

## Subscribe to WSO2 Identity Server AI features

If you plan to use the **login flow update** functionality via MCP Server, ensure that the required AI features are enabled and configured in your {{ product_name }} deployment.

For detailed instructions, refer to the [Subscribe to AI features guide](https://is.docs.wso2.com/en/latest/get-started/subscribe-to-ai-features/).

## Configure certificate trust for local or internal environments

If you are using a local development setup or operating within an internal network where the {{ product_name }} runs with a self-signed or untrusted TLS certificate, you must configure the MCP client to trust it.

Follow these steps:

1. Open a terminal in the {{ product_name }} base directory.

2. Navigate to the `repository/resources/security` directory:
   ```bash
   cd repository/resources/security
   ```

3. Export the certificate from the default keystore:
   ```bash
   openssl pkcs12 -in wso2carbon.p12 -nokeys -out ./wso2is_cert.pem -legacy
   ```

4. Use the generated **`wso2is_cert.pem`** file when configuring the MCP client to establish trusted communication.

{% endif %}

## Build Asgardeo MCP server

Download the source code from the [Asgardeo MCP Server GitHub repository](https://github.com/asgardeo/asgardeo-mcp-server){:target="_blank"}. Choose one of the following methods:

=== "Clone the repository locally using Git"
    Make sure **Git** is installed on your machine, then run the following commands.

    Clone the full repo: 
    ```bash
    git clone https://github.com/asgardeo/asgardeo-mcp-server
    ```
    Change directory into `asgardeo-mcp-server`:
    ```bash
    cd asgardeo-mcp-server
    ```
    Checkout the specific release tag:
    ```bash
    git checkout tags/v0.1.0
    ```

=== "Download as a ZIP archive"
    [**Download the source ZIP**](https://github.com/asgardeo/asgardeo-mcp-server/releases/tag/v0.1.0){:target="_blank"} from the release page of the repository, then extract the contents to your preferred directory.

Then, install the required dependencies by running the following command.

```bash

go mod tidy
```

Now, you can build the Asgardeo MCP server by running the following command. Make sure you have installed Go as mentioned in prerequisites section.

```bash

go build -o asgardeo-mcp
```

After running the above command, make sure to copy the absolute path to the generated binary. This path will be referenced as `<ABSOLUTE-PATH>`in the next step.

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
    4. Click on **Add erver** button next to **Model Context Protocol (MCP) Servers**. Then click the **Add custom Server** button will open `mcp_config.json` file in the editor itself.

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

## Verify {{ product_name }} MCP server setup

Use the following simple prompt to verify whether you have configured Asgardeo MCP Server successfully.

```text
List my {{ product_name }} applications, names only

```

Depending on the code editor you're using, you should see a list of results. The output may vary based on the number of applications you've created in {{ product_name }}, but you should see at least one application name listed.

=== " VS Code  "
    {{ product_name }} application list displayed in VS Code.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image2.png){: width="500" style="display: block; margin: 0;"}

=== " Cursor  "
    {{ product_name }} application list displayed in Cursor.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image3.png){: width="500" style="display: block; margin: 0;"}

=== " Windsurf  "
    {{ product_name }} application list displayed in Windsurf.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image4.png){: width="500" style="display: block; margin: 0;"}

=== " Claude Desktop "
    {{ product_name }} application list displayed in Claude Desktop.

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
    over the operations performed in your {{ product_name }} organization.

[//] STEPS_END
