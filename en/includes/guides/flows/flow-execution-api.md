# Use the Flow Execution API

Use the Flow Execution API to run user journeys that you design in the Flow Builder of {{product_name}} directly from your client application.

The Flow Execution API is exposed at `{{api_base_path}}/api/server/v1/flow/execute`. This endpoint is open and does not require an authorization header.

{% if product_name == "WSO2 Identity Server" %}
!!! info
    Ensure the proper rate limits and security measures are in place when using this API.
{% endif %}

## Before you begin

- [Enable and build the flow]({{base_path}}/guides/flows/build-a-flow/) that you want to use in your app.

## Start flow execution

Call `POST /flow/execute` with the `flowType` of the flow that should be executed.

=== "Sample request"

    ```bash
    curl --location '{{api_base_path}}/flow/execute' \
    --header 'Content-Type: application/json' \
    --data '{
      "flowType": "<Flow_Type>"
    }'
    ```

The value for `flowType` depends on the flow you want to execute. Refer to the table below for the possible values.

| `flowType` value | Description |
|------------------|-------------|
| `REGISTRATION` | Self-registration flow. |
| `PASSWORD_RECOVERY` | Password recovery flow. |
| `INVITED_USER_REGISTRATION` | Invite user to register flow. |

=== "Example response"

    ```json
    {
      "flowId": "c8e06de8-7123-44ac-8209-02be5b55387e",
      "flowType": "REGISTRATION",
      "flowStatus": "INCOMPLETE",
      "type": "VIEW",
      "data": {
        "components": [
          {
            "id": "form_1",
            "type": "FORM",
            "components": [
              {
                "id": "email",
                "type": "INPUT",
                "variant": "EMAIL",
                "config": {
                  "identifier": "email",
                  "label": "Email",
                  "required": true
                }
              },
              {
                "id": "password",
                "type": "INPUT",
                "variant": "PASSWORD",
                "config": {
                  "identifier": "password",
                  "label": "Password",
                  "required": true
                }
              },
              {
                "id": "submit",
                "type": "BUTTON",
                "actionId": "submit-registration",
                "variant": "PRIMARY",
                "config": {
                  "text": "Continue"
                }
              }
            ]
          }
        ],
        "requiredParams": [
          "email",
          "password"
        ]
      }
    }
    ```

- `flowId` uniquely identifies the execution instance. Persist it securely and include it in every subsequent call to the API.
- `flowType` identifies the executing flow.
- `flowStatus` indicates the current status of the flow, `INCOMPLETE` and `COMPLETE`.
- `type` determines how your client should proceed.
- `data` object contains the payload that is specific to the `type`.

### Response types

| Type | Expected client action | Typical data fields |
|--------|------------------------|---------------------|
| `VIEW` | Render the view described in `data.components`, capture user input if any, and send it back with the provided action identifier. | `components`, `requiredParams` |
| `REDIRECTION` | Redirect the browser or web view to `data.url` and resume the flow from your callback endpoint. | `url` |
| `WEBAUTHN` | Initiate webAuthn ceremony with the information in `data.webAuthn`, then submit the encoded response. | `webAuthn` |
| `INTERNAL_PROMPT` | Submit the requested parameters to server. | `requiredParams` |

## Continue a flow execution

After the client action, call the previous `execute` endpoint with the `flowId` and the data that corresponds to the current step.

### Handle View

When the response `type` is `VIEW`, locate the component that exposes an `actionId` (for example, a primary button) and include it in the `actionId` field of your request.
Include the user input in the `inputs` object, using the `identifier` of the input component as the key.

```json
{
  "flowId": "c8e06de8-7123-44ac-8209-02be5b55387e",
  "actionId": "button-a2f1",
  "inputs": {
    "email": "sasha@example.com",
    "password": "MyP@ssw0rd!"
  }
}
```

To learn more about the view response schema and how to render it, refer to [Understand Flow Execution components]({{base_path}}/guides/flows/flow-execution-components/).

### Handle Redirection

When you receive `REDIRECTION`, redirect the client to `data.url`.

If there's any callback, handle the callback and any provider-specific data such as `code` or `state`.

Call `/flow/execute` with the `flowId`, the `actionId` (if any), and the callback data to continue the flow.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "inputs": {
    "code": "4/0AfJohX...",
    "state": "g5kZMl"
  }
}
```

### Handle WebAuthn

For `WEBAUTHN`,

1. Extract `data.webAuthn` which contains the challenge and other parameters.
2. Call the WebAuthn APIs.
3. Base64url-encode the resulting credential and post it back in the `inputs` object under the key listed in `requiredParams`.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "inputs": {
    "tokenResponse": "eyJpZCI6IjR..."
  }
}
```

### Handle Internal Prompt

For `INTERNAL_PROMPT`, inspect `data.requiredParams` to determine the parameters needed to continue the flow.
This type is typically used to collect contextual information from the client, such as origin or device details.
Collect these values from your client context and send them back in the `inputs` object.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "inputs": {
    "origin": "example.com"
  }
}
```

## Complete a flow

The `COMPLETE` status indicates that the flow finished successfully.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "flowStatus": "COMPLETE",
  "flowType": "REGISTRATION",
  "data": {}
}
```

### Auto login on flow completion

If the auto login on flow completion is enabled, the completion response contains a `userAssertion` JWT in the `data` object.
This can either be a `VIEW` type response or `REDIRECTION` type response based on the configuration.

The `userAssertion` JWT user assertion along with a session data key can be used to authenticate the user.
This JWT has a significantly short expiry (~2 seconds) and contains claims about the user who completed the flow.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "flowStatus": "COMPLETE",
  "flowType": "REGISTRATION",
  "type": "REDIRECTION",
  "data": {
    "userAssertion": "<JWT_Token>"
  }
}
```

!!! info
    Authentication is successful only when the authentication methods configured in the executed flow meet the authentication methods of the application login flow.
    For example, if the executed flow has only password authentication and the application login flow requires SMS OTP, the user will not be authenticated even if the flow execution is successful.
