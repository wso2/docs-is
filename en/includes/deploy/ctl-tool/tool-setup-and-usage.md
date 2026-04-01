### Setting up IAM-CTL

Follow the steps below to learn how you can configure IAM-CTL.

1. Download the latest release from [releases](https://github.com/wso2-extensions/identity-tools-cli/releases/){:target="_blank"} based on your Operating System.

2. Extract the release.

3. Open a terminal and create an alias (depending on your platform):

    === "Linux/macOS"
        ```bash
        alias iamctl="<IAM-CTL-PATH>/bin/iamctl"
        ```

    === "Windows"
        ```bash
        doskey iamctl="<IAM-CTL-PATH>\bin\iamctl.exe" $*
        ```

4. Run the following command to view the available commands:

    === "CLI Command"
        ```bash
        iamctl -h
        ```

### Running the tool

1. Create a new folder and navigate to it from your terminal.
2. Run the following command to create the configuration files needed.

    === "CLI Command"
        ```bash
        iamctl setupCLI
        ```

3. A new folder named `configs` will be created with an `env` folder inside it. The `env` folder will contain three configuration files, `serverConfig.json`, `toolConfig.json`, and `keywordConfig.json`.

    !!! note
        If you have multiple environments, get a copy of the `env` folder and rename it according to the environments you have.

4. Open the **serverConfig.json** file and provide the client ID and client secret of the application you created earlier.

    To propagate resources between root organizations, provide the details of the M2M application created in the root organization and the organization details.

    === "serverConfig.json"

        ```json
        {
            "SERVER_URL" : "{server_url}",
            "CLIENT_ID" : "{client_id}",
            "CLIENT_SECRET" : "{client_secret}",
            "TENANT_DOMAIN" : "{tenant_domain}",
            "SERVER_VERSION" : "{server_version}"
        }
        ```

    === "Example"

        ```json
        {
            "SERVER_URL" : "{{server_url}}",
            "CLIENT_ID" : "bsjhjlb64crOL58bKV3UQmwA9QQa",
            "CLIENT_SECRET" : "TC45TBkLaZ6kFxqZuSmhOgelSG2ZBvFYKFlUFmfhKlYa",
            "TENANT_DOMAIN" : "{{tenant_domain}}",
            "SERVER_VERSION" : "{{server_version}}"
        }
        ```

5. Run the following commands to export and import configurations.

    a. **Export**

    === "CLI Command"
        ```bash
        iamctl exportAll -c ./configs/env
        ```

    b. **Import**

    === "CLI Command"
        ```bash
        iamctl importAll -c ./configs/env
        ```
