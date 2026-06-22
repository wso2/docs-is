# Implement an external service for flow extensions

A flow extension calls an external HTTP service that you build and host. This service is where your custom logic runs. Use it to enrich user claims during registration, validate input against an external system, derive computed claims, or stop a flow with a business-rule failure.

This guide explains the contract your service must implement so that {{product_name}} can integrate with it. You can build the service in any language or framework you prefer.

## How it works

At the flow extension step of a flow, {{product_name}} pauses the flow and sends an HTTP `POST` request with a JSON envelope to your service. Your service runs its logic and responds with an `actionStatus` that determines what happens next:

| actionStatus | Meaning |
| ------------ | ------- |
| `SUCCESS`    | Apply the returned operations and continue the flow. |
| `FAILED`     | Stop the flow for a business or policy reason (for example, "user not allowed"). {{product_name}} surfaces this to the end user as a flow error. |
| `ERROR`      | Your service hit a processing or server-side error (a crash or a downstream failure). {{product_name}} returns a `500` to the client. |

Each request includes an `allowedOperations` whitelist that defines exactly which changes your service may make. If your response references anything outside this whitelist, {{product_name}} rejects it.

## Authentication

Configure the authentication scheme {{product_name}} uses for the outbound call when you [create the flow extension]({{base_path}}/guides/flows/flow-extensions/#step-1-create-a-new-flow-extension). The supported schemes are:

- **Basic**: HTTP Basic authentication.
- **Bearer**: An OAuth 2.0 Bearer token in the `Authorization` header.
- **API Key**: An API key sent in a header whose name you define (for example, `X-API-Key`).

Your service should validate the incoming credential on every request and reject unauthenticated calls.

## Request reference

{{product_name}} sends the following request to your service.

**HTTP contract**

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Timeout**: 3 seconds

### Top-level envelope

| Field | Type | Description |
| ----- | ---- | ----------- |
| `actionType` | string | Always `FLOW_EXTENSION` for this integration. |
| `event` | object | A snapshot of the flow state. See [event object](#event-object). |
| `allowedOperations` | array | The whitelist of changes your service may emit. See [allowedOperations](#allowedoperations). |
| `requestId` | string | A unique identifier for this invocation. |

```json
{
  "actionType": "FLOW_EXTENSION",
  "event": { ... },
  "allowedOperations": [ ... ],
  "requestId": "93c2fb70-6f8c-444b-8ff8-36ff580dabb7"
}
```

### Event object

The `event` object carries context about the flow and the organization.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `flow` | object | The flow being executed. See [flow object](#flow-object). |
| `application` | object | The application context. See [application object](#application-object). |

#### Flow object

| Field | Type | Description |
| ----- | ---- | ----------- |
| `flowType` | string | The flow being executed: `REGISTRATION`, `PASSWORD_RECOVERY`, or `INVITED_USER_REGISTRATION`. Branch your logic on this value. |
| `flowId` | string | The identifier for this single flow execution. |
| `portalUrl` | string | The portal (fix this). |
| `user` | object | The user being acted on. See [user object](#user-object). |

```json
{
  "flowType": "REGISTRATION",
  "flowId": "d6e02342-7c5b-40de-a3f9-403ae5d163a9",
  "portalUrl": "https://dev.accounts.asgardeo.io/t/helheim/accounts/register",
  "user": { ... }
}
```

#### User object

| Field | Type | Description |
| ----- | ---- | ----------- |
| `claims` | array | The current claims, each as `{ uri, value }`. |
| `userStoreDomain` | string | The user store (for example, `DEFAULT`). |
| `userId` | string | Present in `PASSWORD_RECOVERY` and `INVITED_USER_REGISTRATION` flows. Not present in `REGISTRATION`. |

```json
{
  "claims": [
    { "uri": "http://wso2.org/claims/givenname", "value": "John" },
    { "uri": "http://wso2.org/claims/mobile",    "value": "0123456789" }
  ]
}
```

#### Application object

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | string | The application UUID. |

```json
{
  "id": "application-id"
}
```

!!! note

    The `application.id` value is only available for flows initiated with the `applicationId` parameter.

### AllowedOperations

Each entry defines a change your service is permitted to make. If your response references anything outside this whitelist, {{product_name}} rejects it.

The only operation in `FLOW_EXTENSIONS` is **`replace`**, which acts as an upsert on a claim at one of the listed paths:

- If the claim already exists at the path, its value is replaced.
- If the claim does not exist at the path, it is created with the given value.
- If the supplied `value` is the empty string (`""`) or `null`, the claim value is set to empty.

You may only target paths listed in `paths`.

```json
[
  { "op": "replace", "paths": ["/user/claims[uri=http://wso2.org/claims/custom]"] }
]
```

## Response reference

{{product_name}} distinguishes outcomes by the HTTP status of your response:

- **HTTP 200 OK**: Used for `SUCCESS` and `FAILED` responses. The `actionStatus` in the body tells {{product_name}} which.
- **HTTP 400, 401, or 500**: Interpreted as `ERROR`. When your service returns an error status or fails to respond entirely, {{product_name}} treats it as a failure to execute the action and aborts the flow.

The response body has the following shape:

```json
{
  "actionStatus": "SUCCESS" | "FAILED" | "ERROR",
  "operations": [ ... ]
}
```

### replace operation

The `path` must match one of the paths listed against the `replace` entry in `allowedOperations`. The same upsert semantics apply: the claim is created if absent and set to empty if `value` is empty or `null`.

```json
{
  "op": "replace",
  "path": "/user/claims[uri=http://wso2.org/claims/customClaim]",
  "value": "new-value"
}
```

### SUCCESS response

Apply the returned `operations` and continue the flow. `operations` is optional; omit it when there is nothing to change but the flow should still proceed.

```json
{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/user/claims[uri=http://wso2.org/claims/customClaim]",
      "value": "new-value1"
    },
    {
      "op": "replace",
      "path": "/user/claims[uri=http://wso2.org/claims/multiValuedClaim]",
      "value": ["multi-value1", "multi-value2"]
    }
  ]
}
```

### FAILED response

Use `FAILED` when your service decides, on business or policy grounds, that the flow should not continue (for example, the user is on a denylist or the supplied data failed an external check). The end user sees a flow-level error.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `actionStatus` | string | `FAILED` |
| `failureReason` | string | A short, user-facing reason for the failure. You can also send an i18n key. |
| `failureDescription` | string | A longer, user-facing description of the failure. You can also send an i18n key. |

```json
{
  "actionStatus": "FAILED",
  "failureReason": "Invalid User",
  "failureDescription": "The user doesn't exist."
}
```

### ERROR response

Use `ERROR` when your service itself hits a processing or server error (a downstream call failed, an unexpected exception was caught, and so on). Return HTTP 400, 401, or 500. {{product_name}} treats this as a failure to execute the action and aborts the flow.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `actionStatus` | string | `ERROR` |
| `errorMessage` | string | A short error message. Published to diagnostic logs. |
| `errorDescription` | string | A longer description of the error. Published to diagnostic logs. |

```json
{
  "actionStatus": "ERROR",
  "errorMessage": "External service failure",
  "errorDescription": "The external service met with an unexpected error."
}
```

!!! warning "Avoid exposing personal data in error messages"

    Don't include personally identifiable information (PII) in `failureReason`, `failureDescription`, `errorMessage`, or `errorDescription`. If you must include such data, mask it.

## Example

The following example shows a self-registration flow where your service may replace two claims.

**Request from {{product_name}}**

```json
{
  "actionType": "FLOW_EXTENSIONS",
  "event": {
    "flow": {
      "flowType": "REGISTRATION",
      "flowId": "d6e02342-7c5b-40de-a3f9-403ae5d163a9",
      "user": {
        "claims": [
          { "uri": "http://wso2.org/claims/givenname",        "value": "John" },
          { "uri": "http://wso2.org/claims/multiValuedClaim",  "value": ["value1", "value2"] },
          { "uri": "http://wso2.org/claims/customClaim",       "value": "customValue1" }
        ],
        "userId": "",
        "userStoreDomain": "DEFAULT"
      }
    },
    "organization": {
      "id": "your-org-id",
      "name": "your-org-name",
      "orgHandle": "your-org-handle",
      "depth": 0
    }
  },
  "allowedOperations": [
    {
      "op": "replace",
      "paths": [
        "/user/claims[uri=http://wso2.org/claims/multiValuedClaim]",
        "/user/claims[uri=http://wso2.org/claims/customClaim]"
      ]
    }
  ],
  "requestId": "93c2fb70-6f8c-444b-8ff8-36ff580dabb7"
}
```

**Response: apply a claim and continue**

```json
{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "replace",
      "path": "/user/claims[uri=http://wso2.org/claims/customClaim]",
      "value": "123"
    }
  ]
}
```

**Response: fail the flow**

```json
{
  "actionStatus": "FAILED",
  "failureReason": "Invalid User",
  "failureDescription": "The user doesn't exist."
}
```

**Response: service-side error**

```json
{
  "actionStatus": "ERROR",
  "errorMessage": "External service failure",
  "errorDescription": "The external service met with an unexpected error."
}
```

## Next steps

Once your service is ready, [configure the flow extension]({{base_path}}/guides/flows/flow-extensions/) to register it as a connection and invoke it from a flow.
