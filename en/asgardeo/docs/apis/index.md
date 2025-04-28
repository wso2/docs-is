# APIs - Overview

Asgardeo exposes most of the features via REST APIs. Those APIs are categorized into the following categories based on the usage.

 - Management APIs - APIs that are consumed by an application using Asgardeo as the Identity Provider.

 - Organization APIs - APIs that are consumed by the B2B SaaS applications for organization-level operations.

 - End User APIs - APIs that are used for all operations on the currently authenticated user.

## Get access to APIs

An authentication element should be sent in an API request to successfully invoke an API. If you fail to add the authentication element, the API request will return a `401` unauthorized HTTP response.

Follow the steps below to obtain an access token using OAuth-based authentication.

!!! note "Authentication for organization APIs"
    While the following steps are valid for all APIs, you need to perform an additional token exchange step when dealing with organization APIs. Learn how to [access organization APIs]({{base_path}}/apis/organization-apis/authentication/)
    

### Step 1: Register an application

Follow the guide and create either a [standard-based (OIDC) application]({{base_path}}/guides/applications/register-standard-based-app/) or an [M2M application]({{base_path}}/guides/applications/register-machine-to-machine-app/) based on the use case. Take note of the client ID and the client secret of the created application.

### Step 2: Authorize the application to consume API resources

Applications, by default, do not have permission to consume API resources. Therefore, in order to invoke APIs, you need to provide the relevant permissions for the application.

To authorize the application,

1. On the Asgardeo Console, go to **Applications**.

2. Select the created application and go to its **API Authorization** tab.

3. Click **Authorize an API Resource** and provide the relevant details of the API resource. Repeat the step for the required APIs

    !!! tip
        For Asgardeo REST APIs, find the relevant scopes from the API definition.

4. Click **Finish** to save the changes.

!!! note
    For more information, refer to [API authorization]({{base_path}}/guides/api-authorization/).

### Step 3: Request an access token

You can now make a request to the token endpoint to obtain an access token for one or more scopes authorized for the application.

The following is an example request to obtain an access token for the `internal_application_mgt_view` scope.

=== "Request format"
    
    ``` bash
    curl https://api.asgardeo.io/t/{organization_name}/oauth2/token -k \
    -H "Authorization: Basic Base64(<clientid>:<client-secret>)" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=client_credentials" \
    --data-urlencode "scope=<scope>"
    ```
  
=== "Sample request"
   
    ``` bash
    curl https://api.asgardeo.io/t/{organization_name}/oauth2/token -k \
    -H "Authorization: Basic d21VRm5oY2xlWFJNSFFZb29iUkx5VGY0TUxFYTowc0doU0dOOG4zMXJFQnpSRjkyYlN1dG5IRUFh" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=client_credentials" \
    --data-urlencode "scope=internal_application_mgt_view"
    ```

    The variables used in the cURL request are as follows: 

| Variable  | Description                                                                                                                                                                                               | Sample value  |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `clientid`    | Client ID of your application.                                                                                                           | `wmUFnhcleXRMHQYoobRLyTf4MLEa`   |
| `clientsecret`    | Client secret of your application.                                           | `0sGhSGN8n31rEBzRF92bSutnHEAa`   |
| `Base64 (<clientid>:<client-secret>)` | The base64 encoded value of `clientid:clientsecret`.                                                                                                                                                      | `d21VRm5oY2xlWFJNSFFZb29iUkx5VGY0TUxFYTowc0doU0dOOG4zMXJFQnpSRjkyYlN1dG5IRUFh`    |
| `scope`   | The scope corresponding to the API. See the relevant API definition to find the list of internal scopes relevant to it. To request multiple scopes, include them in a space-separated list. | `internal_login`   |

The token response looks as follows. You may verify that the received access token has the expected permission level if the `scope` parameter is populated with the requested scopes.
    
``` js
{
    "access_token": "decc891e-4bee-3831-a321-38b1db1fece0",
    "scope": "internal_application_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

### Step 4: Access the API
You can now use the access token to access APIs as follows:

``` bash
curl -X GET https://api.asgardeo.io/t/{organization_name}/api/server/v1/applications \
-H "accept: application/json" \
-H "Authorization: Bearer <access_token>"
```

## Best practices

When invoking APIs, we recommend the following best practices:

- If the ``client_id`` and ``client_secret`` are compromised, anyone can use them to invoke the client credentials grant and get an access token with all the access levels of the admin. Therefore, we highly recommend not sharing the client id and client secret.
- If required, the administrator can set a higher expiry time for the application token through the application configurations in the {{ product_name }} Console.
- When you request an access token, make sure it is specific to the scopes required for a specific task. This allows you to mitigate the risk of token misuse when you share it with other developers.