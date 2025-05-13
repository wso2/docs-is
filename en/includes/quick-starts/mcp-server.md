# Asgardeo MCP Server Quickstart

Welcome Asgardeo MCP Server Quickstart! In this document, you will learn to build, install and configure Asgardeo MCP Server with **VS Code, Claude Desktop, Cursor, Windsurf**, and other **MCP-compatible clients**.

[//] STEPS_START

## Configure a M2M Application in {{ product_name }}

Sign into {{ product_name }} console and navigate to **Applications > New Application**. Then, select **M2M Application** and complete the wizard popup by providing a suitable name. 

!!! Example
    **name:** Asgardeo-MCP-Server
    

Note down the following values from the **Protocol** tab of the registered application. You will need them to configure  Asgardeo React SDK.

- **`client-id`** from the **Protocol** tab. 
- **`client-secret`** from the **Protocol** tab. 
- **The name of your {{ product_name }} organization**
---
Next, go to the **API Authorization** tab in your Asgardeo application settings and click the **Authorize an API Resource** button. In the pop-up window, use the dropdown to search and select each required resource from the Asgardeo Management API by typing the first few letters of the resource name. For each selected resource, make sure you select **authorized scopes** to match those listed in the table below.

| **Asgardeo Management API** | **Required scopes** |
|--------|---------|
| **Application Management API** (`/api/server/v1/applications`) | `internal_application_mgt_view`, `internal_application_mgt_update`, `internal_application_mgt_create` |
| **API Resource Management API** (`/api/server/v1/api-resources`) | `internal_api_resource_update`, `internal_api_resource_create`, `internal_api_resource_view` |
| **Identity Provider Management API** (`/api/server/v1/identity-providers`) | `internal_idp_view` |
| **Authenticators Management API** (`/api/server/v1/authenticators`) | `internal_authenticator_view` |
| **Claim Management API** (`/api/server/v1/claim-dialects`) | `internal_claim_meta_view` |
| **SCIM2 Users API** (`/scim2/Users`) | `internal_user_mgt_create` |



Once completed, your API Authorization configuration should resemble the example shown in the screenshot.

![Asgardeo M2M app]({{base_path}}/assets/img/quick-starts/mcp-server/image1.png){: width="800" style="display: block; margin: 0;"}

## Build Asgardeo MCP Server

Download the source code from the [Asgardeo MCP Server GitHub repository](https://github.com/asgardeo/asgardeo-mcp-server){:target="_blank"}. Choose one of the following methods:


=== "Clone the repository locally using Git"
    Make sure **Git** is installed on your machine. Then run:

    ```bash
    git clone https://github.com/asgardeo/asgardeo-mcp-server
    ```

=== "Download as a ZIP archive"
    Click **"Download ZIP"** on the repository page, then extract the contents to your preferred directory.


Then, install the required dependencies by running the following command. 

```bash

go mod tidy
```

Now, you can build the Asgardeo MCP server by running the following command. Make sure you have installed Go as mentioned in prerequisites section. 


```bash

go build -o asgardeo-mcp
```

After running the above command, make sure to copy the absolute path to the generated binary. This path will be referenced as '<ABSOLUTE-PATH>'in the next step.


## Configure your code editor

=== " VS Code "
    **Open the VS Code user settings `settings.json` file:**

    1. Open **VS Code**.
    2. Press `Ctrl` + `Shift` + `P` (or `Cmd` + `Shift` + `P` on Mac).
    3. Type **"Preferences: Open Settings (JSON)"** and select it.

    Append the following configuration to `settings.json`. Replace the `<ABSOLUTE-PATH>/asgardeo-mcp`, `<client-id>`,  `<client-secret>` and `organization` values from the values you copied from the previous steps. 
    
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
    **Open the VS Code user settings `settings.json` file:**

    1. Open **Cursor**.
    2. Click on **Cursor > Settings > Cursor Settings**.
    3. Switch to **MCP** tab.
    4. Click on **Add new global MCP server** button at the bottom. This will open `mcp.json` file in the editor itself.

    Append the following configuration to `settings.json`. Replace the `<ABSOLUTE-PATH>/asgardeo-mcp`, `<client-id>`,  `<client-secret>` and `organization` values from the values you copied from the previous steps. 
    
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
    **Open the VS Code user settings `settings.json` file:**

    1. Open **Windsurf**.
    2. Click on **Windsurf > Windsurf Settings > Cursor Cascade**.
    3. Switch to **MCP** tab.
    4. Click on **Add erver** button next to **Model Context Protocol (MCP) Servers**. Then click the **Add custom Server** button will open `mcp_config.json` file in the editor itself.

    Append the following configuration to `mcp_config.json`. Replace the `<ABSOLUTE-PATH>/asgardeo-mcp`, `<client-id>`,  `<client-secret>` and `organization` values from the values you copied from the previous steps. 
    
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
    **Open the VS Code user settings `settings.json` file:**

    1. Open **Claude Desktop**.
    2. Click on **Claude Desktop > Settings > Developer**.
    4. Click on **Edit Config** button at the bottom. This will open `claude_desktop_config.json` file location and you open this file using an text editor.

    Append the following configuration to `claude_desktop_config.json`. Replace the `<ABSOLUTE-PATH>/asgardeo-mcp`, `<client-id>`,  `<client-secret>` and `organization` values from the values you copied from the previous steps. 
    
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
    **Use the following configuration settings**

    Make sure to replace the `<ABSOLUTE-PATH>/asgardeo-mcp`, `<client-id>`,  `<client-secret>` and `organization` values from the values you copied from the previous steps. 
    
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


## Verify Asgardeo MCP Server setup 

Use the following simple prompt to verify whether you have configured Asgardeo MCP Server successfully. 

```
List my Asgardeo applications, names only

```

Depending on the code editor you're using, you should see a list of results. The output may vary based on the number of applications you've created in Asgardeo, but you should see at least one application name listed.

=== " VS Code  "
    Asgardeo Application List Displayed in VS Code .
    
    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image2.png){: width="500" style="display: block; margin: 0;"}

=== " Cursor  "
    Asgardeo Application List Displayed in Cursor .
    
    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image3.png){: width="500" style="display: block; margin: 0;"}

=== " Windsurf  "
    Asgardeo Application List Displayed in Windsurf .
    
    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image4.png){: width="500" style="display: block; margin: 0;"}

=== " Claude Desktop "
    Asgardeo Application List Displayed in Claude Desktop.

    ![ Claude Desktop]({{base_path}}/assets/img/quick-starts/mcp-server/image5.png){: width="800" style="display: block; margin: 0;"}

## Build a real-world sample

Now that you’ve configured and verified the Asgardeo MCP Server with your preferred code editor, it’s time to build a real-world example. The following quickstarts are great starting points to try out the Asgardeo MCP Server alongside your AI toolkit:

- [Asgardeo React Quickstart]({{ base_path }}/quick-starts/react/){:target="_blank"} 
- [Asgardeo Angular Quickstart]({{ base_path }}/quick-starts/angular/){:target="_blank"} 
- [Asgardeo React Spring Quickstart]({{ base_path }}/quick-starts/springboot/){:target="_blank"} 

Explore these guides to put your setup into action and see how natural-language-powered identity management can accelerate your development workflow.

[//] STEPS_END
