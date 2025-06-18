# Configuring Sift Fraud Detection

Sift uses machine learning and real-time data analysis to detect fraud. You can use Sift fraud detection with WSO2 Identity Server by following the steps below.

## Prerequisites
- You need to have a Sift account. If you do not have an account, create one by visiting the [Sift website](https://sift.com/).

## Install the Sift connector

The latest project artifacts can be downloaded from the Connector Store (https://store.wso2.com/connector/identity-fraud-detection-sift). 

**Step 1:** Deploy the Sift connector

1. Copy the `org.wso2.carbon.identity.fraud.detection.sift-<version>.jar` file to the `<IS_HOME>/repository/components/dropins` directory.
3. Restart the WSO2 Identity Server.

## Access the Console UI for the Sift connector

Once the connector is added successfully to WSO2 Identity Server, the Sift connector UI will be accessible from the Console, which enables developers to easily configure Sift for their organization by adding the API key.
To do so,
  1. In the WSO2 Console, go to `Login and Registration` section and click on `Fraud Detection`.

![Configuring Sift in WSO2 Console](../images/wso2console.png)

Add the `API key` you received from Sift.

## Sift Fraud Detection with Conditional Authentication

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