# Fraud detection with Sift

[Sift](https://sift.com/){target="_blank"} is a fraud detection platform that leverages machine learning to detect suspicious patterns and prevent account-related fraud, such as account takeovers and fake account creation. By analyzing real-time data across its global network, Sift enhances security and helps businesses protect user trust while reducing fraud risks.

This guide explains how you can integrate Sift fraud detection to prevent fraudulent logins to your applications in {{product_name}}.

## Prerequisites

You need to have an already configured Sift environment and have access to the Sift console. Reach out to [Sift](https://sift.com/contact-us){target="_blank"} to get started.

## Integrate Sift with Asgardeo

Follow the steps below to register Sift in Asgardeo.

1. On the Asgardeo Console, go to **Login and Registration**.
2. Under **Login Security**, select **Fraud Detection**.
3. Enter the API key for the Sift platform and click **Update**.

## Enable Sift fraud detection in applications

!!! note "Before you begin"
    You need to [register an application with Asgardeo]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

To enable Sift fraud detection:

1. On the Asgardeo Console, go to **Applciations**.
2. Go to the **Login Flow** tab of the application and enable **Conditional Authentication**.
3. Add a conditional authentication script. Refer to the sample conditional authentication scripts [here](#sample-conditional-authentication-scripts).

    !!! note

        - Find the list of Sift-related functions in [Conditional authentication functions](#conditional-authentication-functions).
        - Find all standard conditional authentication functions in the [API reference]({{base_path}}/references/conditional-auth/api-reference/).

4. Click **update** to save the changes.

## Conditional Authentication Functions 

{{product_name}} offers the following Sift-related functions that can be utilized in your conditional authentication scripts, enabling seamless integration with user login flows.

**`getSiftRiskScoreForLogin()`**

- This function returns the Sift risk score for a given login event, which is a value between 0 and 1. Higher the score, greater the risk.
- If an error occurs due to an invalid API key, network issue or a Sift server issue, this function returns a value of -1.
- The function takes the following arguments.
    - `AuthenticationContext` - current authentication context.
    - `LoginStatus` - Whether the user authentication was successful or not. Accepted values `LOGIN_SUCCESS`, `LOGIN_FAILED`.
    - `AdditionalParameters` - Any additional parameters in the form of key-value pairs that need to be sent to Sift.

**`getSiftWorkflowDecision()`**

- This function returns the Sift decision ID for a given login event. The decision ID is a unique identifier for the decision selected for the login event during the workflow execution. Workflows and decisions can be configured through the Sift console.
- If an error occurs due to an invalid API key, network issue or a Sift server issue, this function returns a null value.
- The function takes the following arguments.
    - AuthenticationContext - current authentication context.
    - LoginStatus - Whether the user authentication was successful or not. Accepted values LOGIN_SUCCESS, LOGIN_FAILED.
    - AdditionalParameters - Any additional parameters can be sent to Sift.

**`publishLoginEventInfoToSift`**

- This function publishes the successful or failed login events to Sift. This informs Sift that the current login attempt was successful/failed.
- The function takes the following arguments.
  - `AuthenticationContext` - current authentication context.
  - `LoginStatus` - Whether the complete login flow was successful or not. Accepted values are `LOGIN_SUCCESS`, `LOGIN_FAILED`.
  - `AdditionalParameters` - Any additional parameters in the form of key-value pairs that need to be sent to Sift.

!!! warning "Exclude metadata from events"

    By default, {{product_name}} sends the user ID, session ID, IP address, and user agent to Sift.
    The user ID is a mandatory field and others are optional. All four parameters can be overridden by including them as additional parameters in the functions. To prevent {{product_name}} from sending the optional parameters to Sift, set empty strings to their values.

    ```javascript
    var additionalParams = {
        "$ip": "",
        "$user_agent": "",
        "$session_id": ""
    }
    ```

### Enable Logging

Including `"loggingEnabled": true` as an additional parameter in the functions activates logging for Sift fraud detection. When used with `getSiftRiskScoreForLogin`, it logs the payload sent to Sift and the risk score returned by Sift, and when applied to `publishLoginEventToSift`, it logs the payload sent to Sift.

```javascript
var additionalParams = {
    ---
    "$loggingEnabled": true
    ---
}
```

## Sample Conditional Authentication Scripts

### Workflow Based

Workflows can be configured in the Sift console to define the decisions to be made based on various parameters, including the risk score.
The getSiftWorkflowDecision function returns the decision ID configured in the Sift console.

The following example conditional authentication script is for a scenario where,
- The authentication fails if the decision id is "session_looks_bad_account_takeover".
- Prompts for additional authentication if the decision id is "mfa_account_takeover".
- Publishes a login fail event to Sift, if authentication fails.

```javascript
var additionalParams = {
    "loggingEnabled": true,
    "$user_agent": "",
}
var errorPage = '';
var suspiciousLoginError = {
    'status': 'Login Restricted',
    'statusMsg': 'You login attempt was identified as suspicious.'
};

var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            var workflowDecision = getSiftWorkflowDecision(context, "LOGIN_SUCCESS", additionalParams);
            if (workflowDecision == null) {
                Log.info("Error occured while obtaining Sift score.");
            }
            if (workflowDecision == "session_looks_bad_account_takeover") {
                sendError(errorPage, suspiciousLoginError);
            } else if (workflowDecision == "mfa_account_takeover") {
                executeStep(2);
            }
        },
        onFail: function (context) {
            publishLoginEventToSift(context, 'LOGIN_FAILED', additionalParams);
        }
    });
};
```

### Risk Score Based

The following example conditional authentication script is for a scenario where,
- The authentication fails if the risk score exceeds 0.7.
- Prompts for additional authentication if the risk score is between 0.5 and 0.7.
- Publishes a login fail event to Sift, if authentication fails.

```javascript
var additionalParams = {
    "loggingEnabled": true,
    "$user_agent": "",
}
var errorPage = '';
var suspiciousLoginError = {
    'status': 'Login Restricted',
    'statusMsg': 'You login attempt was identified as suspicious.'
};

var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            var riskScore = getSiftRiskScoreForLogin(context, "LOGIN_SUCCESS", additionalParams);
            if (riskScore == -1) {
                Log.info("Error occured while obtaining Sift score.");
            }
            if (riskScore > 0.7) {
                sendError(errorPage, suspiciousLoginError);
            } else if (riskScore > 0.5) {
                executeStep(2);
            }
        },
        onFail: function (context) {
            publishLoginEventToSift(context, 'LOGIN_FAILED', additionalParams);
        }
    });
};
```