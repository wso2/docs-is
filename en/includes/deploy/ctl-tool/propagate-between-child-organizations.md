## Propagate resources between child organizations

IAM-CTL enables you to propagate configurations and resources across child organizations in an organization hierarchy.

Supported resource types:

- Applications
- Identity Providers
- User Stores

### Register tool management application and share with child organizations

If the target environment is a child organization, ensure that a Standard-Based Application is created within the root organization and shared with that specific child organization.

1. Register a Standard-Based Application in the root organization.
2. Share the application with the relevant child organization (e.g., wso2.com).
3. Allow following grant types in the newly created Standard-Based Application:
    - Client Credentials
    - Organization Switch
4. Grant the following API authorizations under Organization APIs.

<!-- vale off -->
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
<!-- vale on -->

Take note of the **Client ID** and **Client Secret** of the application you created.

### Update the tool

Open the **serverConfig.json** file and provide the details of the application shared with the child organization and the child organization details, before running the tool.

=== "serverConfig.json"

    ```json
    {
        "SERVER_URL" : "{server_url}",
        "CLIENT_ID" : "{client_id}",
        "CLIENT_SECRET" : "{client_secret}",
        "TENANT_DOMAIN" : "{tenant_domain}",
        "SERVER_VERSION" : "{server_version}",
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
        "SERVER_VERSION" : "{{server_version}}",
        "ORGANIZATION": "b833d7de-264c-4c4e-8d52-61f9c57e84ca"
    }
    ```
