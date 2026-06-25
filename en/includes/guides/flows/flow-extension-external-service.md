# Implement an external service for flow extensions

A flow extension calls an external HTTP service that you build and host. This service is where your custom logic runs. Use it to enrich user claims during registration, validate input against an external system, derive computed claims, or stop a flow with a business-rule failure.

This guide explains the contract your service must implement so that {{product_name}} can integrate with it. You can build the service in any language or framework you prefer.

## How it works

At the flow extension step of a flow, {{product_name}} pauses the flow and sends an HTTP `POST` request with a JSON envelope to your service. Your service runs its logic and responds with an `actionStatus` that determines what happens next:

| Status | Meaning |
| ------------ | ------- |
| `SUCCESS`    | Apply the returned operations and continue the flow. |
| `FAILED`     | Stop the flow for a business or policy reason (for example, "user not allowed"). {{product_name}} surfaces this to the end user as a flow error. |
| `ERROR`      | Your service hit a processing or server-side error (a crash or a downstream failure). {{product_name}} returns a `500` to the client. |

Each request includes an `allowedOperations` whitelist that defines exactly which changes your service may make. If your response references anything outside this whitelist, {{product_name}} rejects it.

## Authentication

Configure the authentication scheme {{product_name}} uses for the outbound call when you [create the flow extension]({{base_path}}/guides/flows/flow-extension-configuration/#step-1-create-a-new-flow-extension). Your service should validate the incoming credential on every request and reject unauthenticated calls.

## Request reference

{{product_name}} sends the following request to your service.

The request uses the following HTTP contract:

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Timeout**: 3 seconds

### Top-level envelope

| Field | Type | Description |
| ----- | ---- | ----------- |
| `actionType` | string | Always `FLOW_EXTENSION` for this integration. |
| `event` | object | A snapshot of the flow state. See [event object](#event-object). |
| `allowedOperations` | array | The whitelist of changes your service may emit. See [allowedOperations](#allowed-operations). |
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
| `flowType` | string | The flow being executed. |
| `flowId` | string | The identifier for this single flow execution. |
| `portalUrl` | string | The URL of the {{product_name}} portal page. |
| `user` | object | The user being acted on. See [user object](#user-object). |

```json
{
  "flowType": "REGISTRATION",
  "flowId": "d6e02342-7c5b-40de-a3f9-403ae5d163a9",
  "portalUrl": "https://accounts.asgardeo.io/t/<your-organization-name>/accounts/register",
  "user": { ... }
}
```

#### User object

| Field | Type | Description |
| ----- | ---- | ----------- |
| `claims` | array | The current claims, each as `{ uri, value }`. |

```json
{
   "claims":[
      {
         "uri":"http://wso2.org/claims/givenname",
         "value":"John"
      },
      {
         "uri":"http://wso2.org/claims/mobile",
         "value":"0123456789"
      }
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

### Allowed operations

Each entry defines a change your service is permitted to make. If your response references anything outside this whitelist, {{product_name}} rejects it.

The only operation in `FLOW_EXTENSION` is **`replace`**, which creates or replaces a claim at one of the listed paths:

- If the value already exists in the flow, its value is replaced.
- If no value exists in the flow, {{product_name}} adds the given value.
- If the supplied value is an empty string (`""`) or `null`, the claim value is set to empty.

You may only target paths listed in `paths`.

```json
{
  "op": "replace",
  "paths": [
    "/user/claims[uri=http://wso2.org/claims/identifier]",
    "/user/claims[uri=http://wso2.org/claims/tier]"
  ]
}
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

### Replace operation

The `path` must match one of the paths listed against the `replace` entry in `allowedOperations`. The same create or replace behavior applies: the value is created if absent and set to empty if value is empty.

```json
{
  "op": "replace",
  "path": "/user/claims[uri=http://wso2.org/claims/customClaim]",
  "value": "new-value"
}
```

### Success response

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

### Failed response

Use `FAILED` when your service decides, on business or policy grounds, that the flow should not continue. For example, the user is on a deny list, or the supplied data failed an external check. The end user sees a flow-level error.

| Field | Type | Description |
| ----- | ---- | ----------- |
| `actionStatus` | string | `FAILED` |
| `failureReason` | string | A short, user-facing reason for the failure. Or send an i18n key. |
| `failureDescription` | string | A longer, user-facing description of the failure. Or send an i18n key. |

```json
{
  "actionStatus": "FAILED",
  "failureReason": "User not allowed",
  "failureDescription": "You are currently restricted from creating new accounts."
}
```

The end user sees the `failureReason` and `failureDescription` rendered as a flow error:

![Flow extension failure shown to the end user]({{base_path}}/assets/img/guides/flows/flow-extension-failed-error.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Error response

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

{{product_name}} sends the following request:

```json
{
   "actionType":"FLOW_EXTENSION",
   "event":{
      "flow":{
         "flowType":"REGISTRATION",
         "flowId":"d6e02342-7c5b-40de-a3f9-403ae5d163a9",
         "user":{
            "claims":[
               {
                  "uri":"http://wso2.org/claims/givenname",
                  "value":"John"
               },
               {
                  "uri":"http://wso2.org/claims/multiValuedClaim",
                  "value":[
                     "value1",
                     "value2"
                  ]
               },
               {
                  "uri":"http://wso2.org/claims/customClaim",
                  "value":"customValue1"
               }
            ]
         }
      }
   },
   "allowedOperations":[
      {
         "op":"replace",
         "paths":[
            "/user/claims[uri=http://wso2.org/claims/multiValuedClaim]",
            "/user/claims[uri=http://wso2.org/claims/customClaim]"
         ]
      }
   ],
   "requestId":"93c2fb70-6f8c-444b-8ff8-36ff580dabb7"
}
```

A response that applies a claim and continues the flow:

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

A response that fails the flow:

```json
{
  "actionStatus": "FAILED",
  "failureReason": "User not allowed",
  "failureDescription": "You are currently restricted from creating new accounts."
}
```

A response that reports a service-side error:

```json
{
  "actionStatus": "ERROR",
  "errorMessage": "External service failure",
  "errorDescription": "The external service met with an unexpected error."
}
```

For the full API specification, see the [flow extension API contract]({{base_path}}/references/service-extensions/in-flow-extensions/flow-extension/api-contract/).

## Next steps

Once your service is ready, [configure the flow extension]({{base_path}}/guides/flows/flow-extensions/) to register it as a connection and invoke it from a flow.
