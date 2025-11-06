# Use the Flow Execution API

Use the Flow Execution API to run user journeys that you design in the Flow Builder of {{product_name}} directly from your client application. The API returns every step in the flow so that you can render the right experience without embedding the hosted Flow Runner UI.

!!! info
    The Flow Execution API is exposed at `{{base_path}}/api/server/v1/flow/execute`. This endpoint is open and does not require an authorization header. Always call it over HTTPS to safeguard the flow data exchanged.

The API drives the flow in a loop:

1. Start the flow by creating a new execution instance.
2. Interpret the `type` in each response and guide the user through the required step.
3. Post the user input or action result back to the same endpoint until the server returns `flowStatus: COMPLETE`.

## Before you begin

- [Build and enable the flow]({{base_path}}/guides/flows/build-a-flow/) that you want to expose through your app.
- Decide how your client persists the `flowId` between requests. Treat it as sensitive data because anyone with the `flowId` can continue the flow.

## Start a flow execution

Call `POST /flow/execute` with the `flowType` of the flow that should be executed.

=== "Sample request"

    ```bash
    curl --location '{{api_base_path}}/flow/execute' \
    --header 'Content-Type: application/json' \
    --data '{
      "flowType": "<Flow Type>"
    }'
    ```

=== "Example request"

    ```bash
    curl --location 'https://localhost:9443/api/server/v1/flow/execute' \
    --header 'Content-Type: application/json' \
    --data '{
      "flowType": "REGISTRATION"
    }'
    ```

The value for `flowType` must match a flow that is enabled in your tenant.

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
- `flowStatus` indicates the current status of the flow. Valid values are `INCOMPLETE` and `COMPLETE`.
- `type` determines how your client should proceed. The `data` object contains the payload that is specific to the `type`.
- `components` describe the UI blueprint for the step. See [Understand Flow Execution components]({{base_path}}/guides/flows/flow-execution-components/) for details.

### Response types

| `type` | When you receive it | Expected client action | Typical data fields |
|--------|---------------------|------------------------|---------------------|
| `VIEW` | The server needs the user to interact with a UI form, list, or confirmation step. | Render the view described in `data.components`, capture user input, and send it back with the provided action identifier. | `components`, `requiredParams` |
| `REDIRECTION` | A third-party system must complete part of the flow (for example, identity verification or payment). | Redirect the browser or web view to `data.url` and resume the flow from your callback endpoint. | `url` |
| `WEBAUTHN` | The user must complete a WebAuthn ceremony. | Call `navigator.credentials.{create|get}` with the information in `data.publicKeyCredentialCreation` or `data.publicKeyCredentialRequest`, then submit the encoded response. | `publicKeyCredentialCreation` |
| `INTERNAL_PROMPT` | The client app, not the end user, must respond. | Call the API with the requested parameters. | `requiredParams` |

## Continue a flow execution

After executing the user action, call the same endpoint with the `flowId` and the data that corresponds to the step you just completed.

### Submit a view

When the response `type` is `VIEW`, locate the component that exposes an `actionId` (for example, the primary button) and use that identifier when you submit the user's input.

```bash
curl --location '{{api_base_path}}/flow/execute' \
--header 'Content-Type: application/json' \
--data '{
  "flowId": "c8e06de8-7123-44ac-8209-02be5b55387e",
  "actionId": "submit-registration",
  "params": {
    "email": "sasha@example.com",
    "password": "MyP@ssw0rd!"
  }
}'
```

- If the API returns validation `messages`, render them in your UI and prompt the user to correct the input before resubmitting.

### Resume after a redirect

When you receive `type: "REDIRECTION"`:

1. Redirect the user agent to `data.url`.
2. Handle the callback at the `returnUrl` that you registered in Flow Builder. The callback contains the `flowId` (and any provider-specific data such as `code` or `state`).
3. Call `/flow/execute` with the same `flowId`, the proper `actionId`, and the callback parameters in the `params` payload.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "actionId": "federation-complete",
  "params": {
    "code": "4/0AfJohX...",
    "state": "g5kZMl"
  }
}
```

### Complete a WebAuthn ceremony

For `type: "WEBAUTHN"`:

1. Extract `data.publicKeyCredentialCreation`.
2. Call the WebAuthn browser APIs.
3. Base64url-encode the resulting credential and post it back in the `params` object under the key listed in `requiredParams`.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "actionId": "passkey-finish",
  "params": {
    "tokenResponse": "eyJpZCI6IjR..."
  }
}
```

### Handle internal prompts

For `type: "INTERNAL_PROMPT"`, inspect `data.requiredParams` to determine the values you must provide. This type is typically used for steps such as sending a magic link or triggering an action.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "actionId": "send-notification",
  "params": {
    "origin": "mobile-app",
    "deviceId": "3e83f937-4ad0-4a67-a920-7e5af338c9ed"
  }
}
```

## Complete a flow

The API signals the outcome in `flowStatus`.

- `COMPLETE`: The flow finished successfully. The `data` object contains the outcome of the flow (for example, a `userId` or `resetTicket`). Use it to move the application forward.
- `INCOMPLETE`: More steps remain. Continue looping.

```json
{
  "flowId": "5f31ce20-872d-4334-8f9f-3572710dbc57",
  "flowStatus": "COMPLETE",
  "flowType": "REGISTRATION",
  "data": {
    "userId": "00d9b675-9da3-4fa6-9ef4-1a61ac6e9788"
  }
}
```

## Error handling and resilience

- Always guard the `flowId` and never log it in plain text.
- Use exponential backoff for transient network errors. Do not retry requests that returned validation errors.
- Capture the `messages` array and present it to the user for troubleshooting.

## Next steps

- Review the flow-specific guides for additional design examples: [Self-registration]({{base_path}}/guides/flows/self-registration/), [Password recovery]({{base_path}}/guides/flows/password-recovery/), and [Invited user registration]({{base_path}}/guides/flows/invited-user-registration/).
- Dive deeper into the response schema in [Understand Flow Execution components]({{base_path}}/guides/flows/flow-execution-components/).
- If you need to embed the hosted UI instead of building your own components, see [Build a flow]({{base_path}}/guides/flows/build-a-flow/).
