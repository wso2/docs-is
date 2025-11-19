# Promote Configurations Across Environments

This guide outlines the recommended workflow for promoting resource configurations seamlessly between environments. By leveraging the **IAM-CTL** tool, you can efficiently manage configurations, automate deployments, and ensure consistency across your environments.

## Why use IAM-CTL tool?

The [IAM-CTL](https://github.com/wso2-extensions/identity-tools-cli){:target="_blank"} tool is a command-line utility designed to simplify the management of configurations.

- **Bulk Configuration Management**: Handle large-scale configurations in your target environment effortlessly.
- **Environment Promotion**: Promote resources across multiple environments with ease.
- **Backup and Restore**: Act as a backup solution for environment configurations.
- **CI/CD Integration**: Automate deployment processes and resource propagation using CI/CD pipelines. To integrate with GitHub workflows, refer to the [sample workflow guide](https://github.com/wso2-extensions/identity-tools-cli/blob/master/docs/resource-propagation.md){:target="_blank"}.

### Supported Resource Types

IAM-CTL provides support for propagating the following resource types:

<table>
  <thead>
    <tr>
      <th>Organization Type</th>
      <th>Supported Resources</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Root Organization</td>
      <td>Applications, Identity Providers, Claims, User Stores</td>
    </tr>
    <tr>
      <td>Child Organization</td>
      <td>Applications, Identity Providers, User Stores</td>
    </tr>
  </tbody>
</table>

## Getting Started

Before using IAM-CTL, you need to register Machine-to-Machine (M2M) applications in your target environments. If you are propagating resources between root orgs, you need to create M2M apps in root organizations. If you are propagating resources between child organization, you need to create application in the root organization and share it with the relevant child organization. These applications will be used by IAM-CTL to authenticate and perform operations on your behalf.

### Register an application for resource propagation across root organizations

Follow the steps below to register an M2M application.

1. [Register an M2M application]({{base_path}}/guides/applications/register-machine-to-machine-app/){:target="_blank"} with the following API authorization.

<table>
    <tr>
        <td>Management --> Application Management API</td>
        <td>Create Application, Update Application, Delete Application, View Application, Update authorized business APIs of an Application, Update authorized internal APIs of an Application, View application client secret, Regenerate Application Secret</td>
    </tr>
    <tr>
        <td>Management --> Application Authentication Script Management API</td>
        <td>Update Application Authentication Script</td>
    </tr>
    <tr>
        <td>Management --> Claim Management API</td>
        <td>Create Claim, Update Claim, Delete Claim, View Claim</td>
    </tr>
    <tr>
        <td>Management --> Identity Provider Management API</td>
        <td>Create Identity Provider, Update Identity Provider, Delete Identity Provider, View Identity Provider</td>
    </tr>
    <tr>
        <td>Management --> Userstore Management API</td>
        <td>Create Userstore, Update Userstore, Delete Userstore, View Userstore</td>
    </tr>
</table>

Take note of the **Client ID** and **Client Secret** of the M2M application you created.

### Register an application for resource propagation across child organizations

If the target environment is a child organization, ensure that a Standard-Based Application is created within the root organization and shared with that specific child organization.

1. Register a Standard-Based Application in the root organization.
2. Share the application with the relevant child organization (e.g., wso2.com).
3. Allow following grant types in the newly created Standard-Based Application:
    - Client Credentials
    - Organization Switch
4. Grant the following API authorizations under Organization APIs.

<table>
    <tr>
        <td>Organization --> Application Management API</td>
        <td>Create Application, Update Application, Delete Application, View Application, Update authorized business APIs of an Application, Update authorized internal APIs of an Application, View application client secret, Regenerate Application Secret</td>
    </tr>
    <tr>
        <td>Organization --> Application Authentication Script Management API</td>
        <td>Update Application Authentication Script</td>
    </tr>
    <tr>
        <td>Organization --> Identity Provider Management API</td>
        <td>Create Identity Provider, Update Identity Provider, Delete Identity Provider, View Identity Provider</td>
    </tr>
    <tr>
        <td>Organization --> Userstore Management API</td>
        <td>Create Userstore, Update Userstore, Delete Userstore, View Userstore</td>
    </tr>
</table>

Take note of the **Client ID** and **Client Secret** of the application you created.

### Setting up IAM-CTL

Follow the steps below to learn how you can configure IAM-CTL.

1. Download the latest release from [releases](https://github.com/wso2-extensions/identity-tools-cli/releases/){:target="_blank"} based on your Operating System.

2. Extract the release.

3. Open a terminal and create an alias (depending on your platform):

    === "Linux/Mac"
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

3. A new folder named **configs** will be created with an **env** folder inside it. The **env** folder will contain three configuration files, **serverConfig.json**, **toolConfig.json**, and **keywordConfig.json**.

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
            "TENANT_DOMAIN" : "{tenant_domain}"
        }
        ```

    === "Example"
    
        ```json
        {
            "SERVER_URL" : "{{server_url}}",
            "CLIENT_ID" : "bsjhjlb64crOL58bKV3UQmwA9QQa",
            "CLIENT_SECRET" : "TC45TBkLaZ6kFxqZuSmhOgelSG2ZBvFYKFlUFmfhKlYa",
            "TENANT_DOMAIN" : "{{tenant_domain}}"
        }
        ```

    To propagate resources between child organizations, provide the details of the application created in the child organization and the child organization details.
    
    === "serverConfig.json"

        ```json
        {
            "SERVER_URL" : "{server_url}",
            "CLIENT_ID" : "{client_id}",
            "CLIENT_SECRET" : "{client_secret}",
            "TENANT_DOMAIN" : "{tenant_domain}",
            "ORGANIZATION": "{organization_id}"
        }
        ```
    === "Example"
        
         ```json
         {
            "SERVER_URL" : "{{server_url}}",
            "CLIENT_ID" : "bsjhjlb64crOL58bKV3UQmwA9QQa",
            "CLIENT_SECRET" : "TC45TBkLaZ6kFxqZuSmhOgelSG2ZBvFYKFlUFmfhKlYa",
            "TENANT_DOMAIN" : "{{tenant_domain}}",
            "ORGANIZATION": "b833d7de-264c-4c4e-8d52-61f9c57e84ca"
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

## Customization Options

IAM-CTL provides several advanced customization options to handle environment-specific needs and streamline configuration management:

### Keyword Mapping

When managing multiple environments, resource configuration files often contain environment-specific variables. IAM-CTL supports **dynamic keyword replacement** to handle these variables during import or export. Keyword mapping can also be defined for specific resources within that environment.

For more details, refer to the [environment-specific variables guide](https://github.com/wso2-extensions/identity-tools-cli/blob/master/docs/env-specific-variables.md){:target="_blank"}.

### Partial Propagation

IAM-CTL supports **partial propagation** of resources using the below properties.

- **`EXCLUDE`**: Exclude specific resource types or a set of individual resources during import or export.
- **`INCLUDE_ONLY`**: Include only specific resource types or a set of individual resources during import or export.

### Resource Deletion

By default, IAM-CTL does not delete any resources during import. However, it can be configured to either replace all 
existing resources with the imported resources or merge the imported resources with the existing ones using the 
**`ALLOW_DELETE`** property.

### Secret Handling

IAM-CTL provides options to manage sensitive data securely. By default, secrets fields are masked. 
The **`EXCLUDE_SECRETS`** property can be used to override this behavior and include the secrets in the exported resources.

Learn more about these configurations in the [tool configurations documentation](https://github.com/wso2-extensions/identity-tools-cli/blob/master/docs/cli-mode.md#tool-configurations){:target="_blank"}.
