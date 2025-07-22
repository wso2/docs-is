# Sift

The following guide explains how you can use Sift for fraud detection.

## Overview

[Sift](https://sift.com/){:target="_blank"} helps businesses prevent fraud, abuse, and account takeovers by analyzing user behavior and contextual data in real time. By combining signals like device fingerprinting, IP reputation, and behavioral patterns, Sift creates a dynamic risk score that helps businesses make smarter decisions and reduce false positives.

{{product_name}} uses Sift to calculate risk for each user login based on behavioral and contextual signals. You can then tailor the login flow based on the assessed risk using [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/).

For example,

1. Deny login when the user's risk score exceeds the threshold.

2. Require a Time-based One-Time Password (TOTP) when the user's risk score exceeds the threshold.

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

Once you complete setting up Sift in {{product_name}}, you can use the following [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) functions to customize the login flow based on risk.

!!! tip "Before you begin"

    To set up conditional authentication, refer to [set up conditional authentication]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/).

### `getSiftRiskScoreForLogin()`

This function,

- returns a value between `0` and `1`. Higher the score, greater the risk.

- returns `-1` if an error occurs due to an invalid API key, network issue or a Sift server issue.

- takes the following arguments.

    - `AuthenticationContext` - current authentication context.

    - `LoginStatus` - Status of login; `LOGIN_SUCCESS` for a success status, `LOGIN_FAILED` for a failed status.

    - `AdditionalParameters` - Any extra parameters you want to send to Sift.

### `getSiftWorkflowDecision()`

This function,

- returns the Sift decision ID for a login event. This ID uniquely identifies the decision made during the Sift workflow for that event. Learn more about [Sift workflows](https://developers.sift.com/tutorials/workflows){: target="_blank"}.

- returns `null` if an error occurs due to an invalid API key, network issue or a Sift server issue.

- takes the following arguments.

    - `AuthenticationContext` - current authentication context.

    - `LoginStatus` - Status of login; `LOGIN_SUCCESS` for a success status, `LOGIN_FAILED` for a failed status.

    - `AdditionalParameters` - Any extra parameters you want to send to Sift.

### `publishLoginEventInfoToSift()`

This function,

- publishes the status of the current login event to Sift, indicating whether it succeeded or failed.

- takes the following arguments.

    - `AuthenticationContext` - current authentication context.

    - `LoginStatus` - Status of login; `LOGIN_SUCCESS` for a success status, `LOGIN_FAILED` for a failed status.

    - `AdditionalParameters` - Any extra parameters you want to send to Sift.

## Optional configurations

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

## Examples

To understand how you can use Sift-related functions in a conditional authentication script, let's look at the following examples.

!!! note "Conditional authentication scripts"

    To learn more about all the functions and object references you can use to create condiitonal authentication scripts, refer to the [conditional auth API reference]({{base_path}}/references/conditional-auth/api-reference/).

### Workflow-based scenario

You can use [Sift workflows](https://developers.sift.com/tutorials/workflows){: target="_blank"} to define decisions based on risk factors including the risk score. You can then use the [getSiftWorkflowDecision()](#getsiftworkflowdecision) function to get the decision ID.

In the example below,

- if the decision ID is `session_looks_bad_account_takeover`, login fails.

- if the decision ID is `mfa_account_takeover`, prompts for an extra login step.

- if the login fails, publishes a login fail event to Sift.

- additional parameters enable logging and prevent {{product_name}} from sending the user agent information to Sift.

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

### Risk score-based scenario

In the example below,

- if the risk score exceeds 0.7, login fails.

- if the risk score is between 0.5 and 0.7, prompts for an extra login step.

- if authentication fails, published a login fail event to Sift.

- additional parameters enable logging and prevent {{product_name}} from sending the user agent information to Sift.

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
