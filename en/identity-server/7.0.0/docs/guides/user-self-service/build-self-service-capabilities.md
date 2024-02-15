{% set product_name = "WSO2 Identity Server" %}

# Build self-service capabilities for your application

Developers can use {{ product_name }}'s REST APIs to implement self-service capabilities for the users on their business applications.

Here are some capabilities you may want to enable when you implement self-service capabilities in your business app.

- Allow users to update their user profiles
- Allow users to change passwords
- Allow users to enable MFA
- Allow users to manage consents given to applications

Once the user logs in to the business application, you can make these capabilities available to the user from the business application itself.

## Self-service APIs
You can use the following {{ product_name }} APIs to enable self-service capabilities in your business application.

- SCIM/Me Endpoint

    - [List user details]({{base_path}}/apis/scim2-me-rest-apis/#tag/Me-Endpoint/paths/~1Me/get)
    - [Update user profile]({{base_path}}/apis/scim2-me-rest-apis/#tag/Me-Endpoint/operation/patchUserMe)
    - [Update user password]({{base_path}}/apis/scim2-me-rest-apis/#tag/Me-Endpoint/operation/patchUserMe)

        !!! note
            To update the password of a user, update the `value` parameter of the API payload as follows:

            ``` curl 
            {
              "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
              ],
              "Operations": [
                {
                  "op": "add",
                  "value": {
                    "nickName": "shaggy"
                  }
                }
              ]
            }
            ```

- Manage MFA settings and recovery
  
    - [TOTP]({{base_path}}/apis/totp-rest-api/)
    <!-- TODO - [Backup codes]({{base_path}}/apis/{{ backup_codes_api }}/)-->

<!-- TODO - [Export user profile]({{base_path}}/apis/{{ export_user_prof }}/) -->

- [Manage consent of users]({{base_path}}/apis/consent-management-api-definition/)

## Prerequisites

You need an application that [integrates login with {{ product_name }}]({{base_path}}/guides/authentication/add-login-to-apps/) over OpenID connect standards.

Learn more about registering OIDC applications on {{ product_name }}.

- [SPA]({{base_path}}/guides/applications/register-single-page-app/)
- [Traditional Web application]({{base_path}}/guides/applications/register-oidc-web-app/)
- [Mobile appliction]({{base_path}}/guides/applications/register-mobile-app/)


## Invoke the self-service APIs

To invoke the self-service APIs from your application:

1. Once the user logs into your application, get an access token on behalf of the user.
2. Use the obtained `access_token` as a bearer token to invoke the APIs.

Given below is a sample API request for a client sending a `PATCH` request sent to the `/scim2/Me` endpoint to update the user password.

``` curl
URL:  https://api.asgardeo.io/t/<org_name>/scim2/Me
HTTP Method: PATCH
Headers:
'Content-Type: application/scim+json'
 'Authorization: Bearer <access_token>'
Data:
{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
  ],
  "Operations": [
    {
      "op": "add",
      "value": {
        "password": "<new-password>"
      }
    }
  ]
}
```

??? note "If you are using {{ product_name }}'s React SDK"
    You can use the <code>[httpRequest](https://github.com/asgardeo/asgardeo-auth-react-sdk/blob/main/API.md#httprequest)</code> method to invoke the APIs on {{ product_name }}'s React SDK.

    A sample of how to use the `httpRequest` method in [{{ product_name }}'s React SDK]({{base_path}}/get-started/try-your-own-app/react/) is given below:
    
    ```js
    import { useAuthContext, HttpRequestConfig } from "@asgardeo/auth-react";
    const {httpRequest } = useAuthContext();
    
       const requestConfig: HttpRequestConfig = {
                // Add API content here
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/scim+json"
                },
                attachToken: true,
                method: "GET",
                url: "https://api.asgardeo.io/t/<org_name>/scim2/Me"
            };
            httpRequest(requestConfig).then((response: any) => {
                console.log(“request response : ”+response.data);
            }).catch((error) => {
                console.log("request error: " + error);
            })
    ```
    
    You can replace the body of `const requestConfig: HttpRequestConfig = {}` with the API you wish to invoke.