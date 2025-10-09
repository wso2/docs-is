# Reference: Sift functions and parameters

This reference describes the functions and parameters you can use in [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) scripts to interact with Sift.

!!! note

    - To use these functions, you must first [set up Sift]({{base_path}}/guides/connectors/sift/set-up/) in {{product_name}}.

    - You can find example scripts in the [how to use Sift]({{base_path}}/guides/connectors/sift/how-to-use/) guide.

## `getSiftRiskScoreForLogin()`

This function,

- returns a value between 0 and 1. Higher the score, greater the risk.

- returns –1 if an error occurs due to an invalid API key, network issue or a Sift server issue.

- Takes the following arguments.

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

## `publishLoginEventInfoToSift()`

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

### Enable logging

You can enable logging by sending `"loggingEnabled": true` as an additional parameter in the functions.

- If sent with `getSiftRiskScoreForLogin()` function, it logs the payload sent to Sift and the risk score that Sift returns.

- If sent with, `publishLoginEventToSift()`, it logs the payload sent to Sift.
