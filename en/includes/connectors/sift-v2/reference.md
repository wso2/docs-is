# Reference: Sift functions and parameters

This reference describes the functions and parameters you can use in [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) scripts to interact with Sift.

!!! note
    - To use these functions, you must first [set up Sift]({{base_path}}/guides/connectors/sift/set-up/) in {{product_name}}.
    - You can find example scripts in the [how to use Sift]({{base_path}}/guides/connectors/sift/how-to-use/) guide.

## `getSiftRiskScoreForLogin()`

This function,

- returns a value between 0 and 1. Higher the score, greater the risk.
- returns –1 if an error occurs due to an invalid API key, network issue or a Sift server issue.
- takes the following arguments.
  - `AuthenticationContext` - Current authentication [context]({{base_path}}/references/conditional-auth/api-reference/#context).
  - `LoginStatus` - Status of login; *LOGIN_SUCCESS* for a success status, *LOGIN_FAILED* for a failed status.
  - `AdditionalParameters` - Any extra parameters you want to send to Sift as explained in [additional parameters](#additional-parameters).

## `getSiftWorkflowDecision()`

This function,

- returns the Sift decision ID for a login event. This ID uniquely identifies the decision made during the Sift workflow for that event. Learn more about [Sift workflows](https://developers.sift.com/tutorials/workflows){: target="_blank"}.
- returns null if an error occurs due to an invalid API key, network issue or a Sift server issue.
- takes the following arguments.
  - `AuthenticationContext` - Current authentication [context]({{base_path}}/references/conditional-auth/api-reference/#context).
  - `LoginStatus` - Status of login; *LOGIN_SUCCESS* for a success status, *LOGIN_FAILED* for a failed status.
  - `AdditionalParameters` - Any extra parameters you want to send to Sift as explained in [additional parameters](#additional-parameters).

## `publishLoginEventToSift()`

This function,

- publishes the status of the current login event to Sift, indicating whether it succeeded or failed.
- takes the following arguments.
  - `AuthenticationContext` - Current authentication [context]({{base_path}}/references/conditional-auth/api-reference/#context).
  - `LoginStatus` - Status of login; *LOGIN_SUCCESS* for a success status, *LOGIN_FAILED* for a failed status.
  - `AdditionalParameters` - Any extra parameters you want to send to Sift as explained in [additional parameters](#additional-parameters).

## Additional parameters

You can configure the following options when creating a conditional authentication script using Sift-related functions.

### Customize the data sent to Sift

To assess risk of a login event, {{product_name}} sends the following data to Sift:

- user ID (mandatory)
- session ID
- IP address
- user agent

You can override the default values that {{product_name}} sends by passing these as additional parameters in the functions. You can also exclude any optional parameter from being sent, by setting the value to an empty string as shown below.

```javascript
var additionalParams = {
    "$ip": "",
    "$user_agent": "",
    "$session_id": ""
}
```

!!! important
    The `$user_id` field sent to Sift is **not** the user's actual UUID. By default, it contains a hashed value of the username. To reliably identify users in Sift, use the `user_uuid` field, which is published separately in the event payload and contains the actual user UUID.

### User data published to Sift

The following user attributes may be included in the event payload depending on your [fraud detection configuration]({{base_path}}/connectors/sift/set-up/#step-3-configure-fraud-detection-settings).

#### User information

| Field | Description |
|---|---|
| **Email** | The user's registered email address. |
| **Mobile** | The user's mobile phone number. Published only if in E.164 format. |
| **Name** | The user's full name. If unavailable, the first or last name is used instead. |

#### User browser and device metadata

| Field | Description |
|---|---|
| **IP Address** | The user's IP address at the time of the event. |
| **User Agent** | The browser or device user agent string associated with the user's session. |

### Enable logging

You can enable logging by sending `"loggingEnabled": true` as an additional parameter in the functions.

- If sent with `getSiftRiskScoreForLogin()`, it logs the payload sent to Sift and the risk score that Sift returns.
- If sent with `getSiftWorkflowDecision()`, it logs the payload sent to Sift and the decision ID returned by Sift.
- If sent with `publishLoginEventToSift()`, it logs the payload sent to Sift.