# How to use

Once you complete setting up Sift in {{product_name}}, you can use the following [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) functions to customize the login flow based on risk.

!!! tip "Before you begin"

    To set up conditional authentication, refer to [set up conditional authentication]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/).

## `getSiftRiskScoreForLogin()`

This function,

- returns a value between `0` and `1`. Higher the score, greater the risk.

- returns `-1` if an error occurs due to an invalid API key, network issue or a Sift server issue.

- takes the following arguments.

    - `AuthenticationContext` - current authentication context.

    - `LoginStatus` - Status of login; `LOGIN_SUCCESS` for a success status, `LOGIN_FAILED` for a failed status.

    - `AdditionalParameters` - Any extra parameters you want to send to Sift.

## `getSiftWorkflowDecision()`

This function,

- returns the Sift decision ID for a login event. This ID uniquely identifies the decision made during the Sift workflow for that event. Learn more about [Sift workflows](https://developers.sift.com/tutorials/workflows){: target="_blank"}.

- returns `null` if an error occurs due to an invalid API key, network issue or a Sift server issue.

- takes the following arguments.

    - `AuthenticationContext` - current authentication context.

    - `LoginStatus` - Status of login; `LOGIN_SUCCESS` for a success status, `LOGIN_FAILED` for a failed status.

    - `AdditionalParameters` - Any extra parameters you want to send to Sift.

## `publishLoginEventInfoToSift()`

This function,

- publishes the status of the current login event to Sift, indicating whether it succeeded or failed.

- takes the following arguments.

    - `AuthenticationContext` - current authentication context.

    - `LoginStatus` - Status of login; `LOGIN_SUCCESS` for a success status, `LOGIN_FAILED` for a failed status.

    - `AdditionalParameters` - Any extra parameters you want to send to Sift.

