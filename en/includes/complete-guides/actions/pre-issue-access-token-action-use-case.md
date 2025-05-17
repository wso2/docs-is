The Pre-Issue Access Token action in Asgardeo allows you to execute custom logic just before an access token is issued
during the OAuth2 flow. This is useful in real-world scenarios that require token customization or additional
validation. Once the token is modified, the changes are stored as transactional data and persist throughout the token’s
lifecycle. These modifications are reflected in subsequent flows, such as the refresh token flow, and are available to
applications, resource servers, and other actions that depend on the access token. The key capabilities included are as
follows:

* Modify the access token before issuance during the OAuth2 flow. 
* Perform custom checks (e.g., IP validation, user attributes, time-based rules). 
* Add, modify, or remove scopes to control resource access. 
* Add, modify, or remove audience values for token recipients. 
* Modify or remove user attributes embedded in the token. 
* Add custom claims (Supported types: string, number, boolean, and string arrays). 
* Update the token validity period dynamically based on logic.

The above operations require different responses to be returned from the external service. You can refer to the official
documentation on Pre-issue access token action for more details.

![Pre-Issue Access Token Action Overview]({{base_path}}/assets/img/complete-guides/actions/image1.png)

## Scenario Overview

In this guide, the scenario we will implement demonstrates a real-world use case involving the Pre-Issue Access Token action:

* Before issuing an access token, the system will check the originating country or region of the request. If the request
  comes from a restricted location, the token issuance will be blocked immediately.
* If the country is allowed, the system will query the IP address against AbuseIPDB to assess its abuse confidence
  score. Based on the risk level (e.g., high abuse score or suspicious access time), the access token’s validity period
  may be reduced—or the token may be blocked altogether.

This use case demonstrates how you can incorporate location and risk-based intelligence into token issuance workflows,
enhancing security posture and minimizing unauthorized access.

## Request and Response Handling

When an access token request is made, Asgardeo or WSO2 Identity Server (WSO2 IS) will send a request to your configured
extension service containing the information of the access token request and the allowed operations.

Your service will process this request and respond with an appropriate status:

* Success: Allow the update to proceed. The operation can vary, for example, reducing the token expiry time or issuing
  the access token without any restrictions.
* Failure: Block the access token issuance and return an appropriate error message.
* Error: Indicate a processing error so that the platform can handle it accordingly.

The request structure and expected response formats are detailed in the official documentation. The request structure
for this use case is as follows.

```json
{
  "actionType": "PRE_ISSUE_ACCESS_TOKEN",
  "event": {
    "request": {
      "additionalHeaders": [
        {
          "name": "x-request-id",
          "value": [
            "b523491ab6c6291325cd5a130bef3c16"
          ]
        },
        {
          "name": "x-client-source-ip",
          "value": [
            "205.210.31.51"
          ]
        },
        {
          "name": "postman-token",
          "value": [
            "71a4ec17-4207-436c-b9b1-e9943154828b"
          ]
        }
      ],
      "clientId": "CCm5aWk4TjKgprfH_fmuMI7edDQa",
      "grantType": "client_credentials"
    },
    "tenant": {
      "id": "2210",
      "name": "testwso2"
    },
    "accessToken": {
      "tokenType": "JWT",
      "claims": [
        {
          "name": "iss",
          "value": "https://api.asgardeo.io/t/testwso2/oauth2/token"
        },
        {
          "name": "client_id",
          "value": "CCm5aWk4TjKgprfH_fmuMI7edDQa"
        },
        {
          "name": "aut",
          "value": "APPLICATION"
        },
        {
          "name": "expires_in",
          "value": 3600
        },
        {
          "name": "aud",
          "value": [
            "CCm5aWk4TjKgprfH_fmuMI7edDQa"
          ]
        },
        {
          "name": "subject_type",
          "value": "public"
        },
        {
          "name": "sub",
          "value": "CCm5aWk4TjKgprfH_fmuMI7edDQa"
        }
      ]
    }
  },
  "allowedOperations": [
    {
      "op": "add",
      "paths": [
        "/accessToken/claims/",
        "/accessToken/scopes/",
        "/accessToken/claims/aud/"
      ]
    },
    {
      "op": "remove",
      "paths": [
        "/accessToken/scopes/",
        "/accessToken/claims/aud/"
      ]
    },
    {
      "op": "replace",
      "paths": [
        "/accessToken/scopes/",
        "/accessToken/claims/aud/",
        "/accessToken/claims/expires_in"
      ]
    }
  ]
}
```

The sample response structures used in this scenario are as follows.

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  actionStatus: "SUCCESS"
}

HTTP/1.1 200 OK
Content-Type: application/json
{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/accessToken/claims/expires_in",
      "value": "900"
    }
  ]
}

HTTP/1.1 200 OK
Content-Type: application/json
{
  "actionStatus": "FAILED",
  "failureReason": "access_denied",
  "failureDescription": "Access token issuance is blocked due to high IP risk."
}

HTTP/1.1 200 OK
Content-Type: application/json
{
  "actionStatus": "FAILED",
  "failureReason": "access_denied",
  "failureDescription": "Access token issuance is blocked from your region CN."
}
```

By following this scenario, you will learn how to build, deploy, and integrate a pre-issue access token validation
service that enhances your API security by applying geolocation and risk-based access controls.
