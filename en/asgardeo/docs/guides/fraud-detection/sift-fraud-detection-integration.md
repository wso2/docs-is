# Sift Fraud Detection Integration

[Sift](https://sift.com/) is a fraud prevention platform that leverages machine learning to detect suspicious patterns and prevent account-related fraud, including account takeovers and fake account creation. By analyzing data in real-time across its global network, Sift ensures account security and helps businesses maintain user trust.

This guide explains how you can add Sift fraud detection to applications registered in your Asgardeo organization.

## Prerequisites

You need to configure the Sift environment and have access to the Sift console. Reach out to [Sift](https://sift.com/contact-us) to get started.

## Configure Sift in Asgardeo

Follow the steps below to register Sift in Asgardeo.

1. On the Asgardeo Console, go to **Login and Registration**
2. Click **Sift Configuration**.
3. Enter the API key for the Sift platform and click **Update**

## Sift Fraud Detection with Conditional Authentication

### Conditional Authentication Functions 

Asgardeo offers the following Sift-related functions that can be utilized in your conditional authentication scripts, enabling seamless integration of Sift into the user authentication process.

**`getSiftRiskScoreForLogin()`**

- This function returns the Sift risk score for a given login event, which is a value between 0 and 1. Higher the score, greater the risk.
- If an error occurs due to an invalid API key, network issue or a Sift server issue, this function returns a value of -1.
- The function takes the following arguments.
  - `AuthenticationContext` - current authentication context.
  - `LoginStatus` - Whether the user authentication was successful or not. Accepted values `LOGIN_SUCCESS`, `LOGIN_FAILED`.
  - `AdditionalParameters` - Any additional parameters can be sent to Sift.

**`publishLoginEventInfoToSift`**

- This function publishes the successful or failed login events to Sift. This informs Sift that the current login attempt was successful/failed.
  - `AuthenticationContext` - current authentication context.
  - `LoginStatus` - Whether the complete login flow was successful or not. Accepted values are `LOGIN_SUCCESS`, `LOGIN_FAILED`.
  - `AdditionalParameters` - Any additional parameters can be sent to Sift.

By default, Asgardeo sends the user ID, session ID, IP address, and user agent to Sift.
The user ID is a mandatory field, while the other fields are optional. All four parameters can be overridden by including them as additional parameters in the functions.
To prevent Asgardeo from sending the optional parameters to Sift, set empty strings to their values.

```javascript
var additionalParams = {
    "$ip": "",
    "$user_agent": "",
    "$session_id": ""
}
```

### Enable Logging

Including `"isLoggingEnabled": true` as an additional parameter in the functions activates logging for Sift fraud detection. When used with `getSiftRiskScoreForLogin`, it logs the payload sent to Sift and the risk score returned by Sift, and when applied to `publishLoginEventToSift`, it logs the payload sent to Sift.

### Enable Sift fraud detection

!!! note "Before you begin"
    You need to [register an application with Asgardeo]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

To enable Sift fraud detection for your application:

1. On the Asgardeo Console, go to **Applciations**.
2. Go to the **Sign-in Method** tab of the application and [enable conditional authentication](../authentication/conditional-auth/configure-conditional-auth.md).
3. Add an conditional authentication script and Click on **Update**.

Example conditional authentication script which fails the authentication if the risk score is higher than 0.5.

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
                publishLoginEventToSift(context, "LOGIN_FAILED", additionalParams);
                sendError(errorPage, suspiciousLoginError);
            } else if (riskScore > 0.5) {
                console.log("Success login. Stepping up due to the risk.");
                executeStep(2);
            } 
            else {
                publishLoginEventToSift(context, "LOGIN_SUCCESS", additionalParams);
            }
        }
    });
};
```

## Try it out

Follow the steps given below:

1. Access the application URL.

2. Click **Login** to open the Asgardeo login page.

3. Complete the authentication steps.

4. Based on the risk score of the user login will be successful or failed.

5. Mark the relevant account as a compromised account in the Sift console to ensure the risk score will be higher.


