# Sift

The following guide explains how you can use Sift for fraud detection.

## Overview

Sift uses machine learning and real-time data analysis to detect fraud.

In {{product_name}}, Sift calculates a risk score for each user login based on behavioral and contextual signals. You can use this score to customize your authentication flow.

For example,

1. Deny login when the user's risk score exceeds the threshold.

2. Trigger TOTP step when the user's risk score exceeds the threshold.

## Set up

The following guide explains how you can install and set up Sift in {{product_name}}.

### Prerequisites

You need to have a Sift account. If you don't have an account, create one by visiting the [Sift website](https://sift.com/).

### Step 1: Install the Sift connector

Follow the steps below to install Sift in {{product_name}}.

1. Download the project artifacts from the {{product_name}} [connector store](https://store.wso2.com/connector/identity-fraud-detection-sift){: target="_blank"}.

2. Copy the `org.wso2.carbon.identity.fraud.detection.sift-<version>.jar` file to the `<IS_HOME>/repository/components/dropins` directory.

3. Restart {{product_name}}.

### Step 2: Add the API key

To work with Sift, you need to register your Sift API key in {{product_name}}. To do so,

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Click **Fraud Detection** and enter the API key.

    ![Configuring Sift in WSO2 Console]({{base_path}}/assets/img/connectors/sift/sift-api-key.png)

3. Click **Update** to save the changes.

## Usage

In {{product_name}}, you can customize an application's login flow using [conditional authentication scripts]({{base_path}}/guides/authentication/conditional-auth/).

WSO2 Identity Server offers the following Sift-related functions that can be utilized in your conditional authentication scripts, enabling seamless integration of Sift into the user authentication process.

**`getSiftRiskScoreForLogin()`**

- This function returns the Sift risk score for a given login event, which is a value between 0 and 1. Higher the score, greater the risk.
- If an error occurs due to an invalid API key, network issue or a Sift server issue, this function returns a value of -1.
- The function takes the following arguments.
    - `AuthenticationContext` - current authentication context.
    - `LoginStatus` - Whether the user authentication was successful or not. Accepted values `LOGIN_SUCCESS`, `LOGIN_FAILED`.
    - `AdditionalParameters` - Any additional parameters can be sent to Sift.

**`getSiftWorkflowDecision()`**

- This function returns the Sift decision ID for a given login event. The decision ID is a unique identifier for the decision selected for the login event during the workflow execution. 
Workflows and decisions can be configured through the Sift console.
- If an error occurs due to an invalid API key, network issue or a Sift server issue, this function returns a null value.
- The function takes the following arguments.
  - `AuthenticationContext` - current authentication context.
  - `LoginStatus` - Whether the user authentication was successful or not. Accepted values `LOGIN_SUCCESS`, `LOGIN_FAILED`.
  - `AdditionalParameters` - Any additional parameters can be sent to Sift.


**`publishLoginEventInfoToSift`**

- This function publishes the successful or failed login events to Sift. This informs Sift that the current login attempt was successful/failed.
    - `AuthenticationContext` - current authentication context.
    - `LoginStatus` - Whether the complete login flow was successful or not. Accepted values are `LOGIN_SUCCESS`, `LOGIN_FAILED`.
    - `AdditionalParameters` - Any additional parameters can be sent to Sift.

By default, Identity Server sends the user ID, session ID, IP address, and user agent to Sift.
The user ID is a mandatory field, while the other fields are optional. All four parameters can be overridden by including them as additional parameters in the functions.
To prevent Identity Server from sending the optional parameters to Sift, set empty strings to their values.

```javascript
var additionalParams = {
    "$ip": "",
    "$user_agent": "",
    "$session_id": ""
}
```

### Enable Logging

Including `"loggingEnabled": true` as an additional parameter in the functions activates logging for Sift fraud detection. When used with `getSiftRiskScoreForLogin`, it logs the payload sent to Sift and the risk score returned by Sift, and when applied to `publishLoginEventToSift`, it logs the payload sent to Sift.

### Enable Sift fraud detection

To enable Sift fraud detection for your application:

1. On the Console, go to **Applications**.
2. Go to the **Login Flow** tab of the application and enable **Conditional Authentication**.
3. Add a conditional authentication script and Click **Update**.

## Examples

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
                console.log("Error occured while obtaining Sift score.");
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
                console.log("Error occured while obtaining Sift score.");
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