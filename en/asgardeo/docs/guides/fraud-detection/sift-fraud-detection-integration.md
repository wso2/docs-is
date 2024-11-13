# Sift Fraud Detection Integration

[Sift](https://sift.com/) is a fraud prevention platform that leverages machine learning to detect suspicious patterns and prevent account-related fraud, including account takeovers and fake account creation. By analyzing data in real-time across its global network, Sift ensures account security and helps businesses maintain user trust.

This guide explains how you can use Sift to add fraud detection to applicatioons registered in your Asgardeo organization.

## Prerequisites

You need to configure the Sift environment and have access to the Sift console. Reach out to [Sift](https://sift.com/contact-us) to get started.

## Configure Sift in Asgardeo

Follow the steps below to register Sift in Asgardeo.

1. On the Asgardeo Console, go to **Login and Registration**
2. Click **Sift Configuration**.
3. Enter the API key for the Sift platform and click **Update**

## Sift Fraud Detection with Conditional Authentication

### Conditional Authentication Functions 

Following conditional authentication functions are provided for the Sift fraud detection integration.

**`getSiftRiskScoreForLogin()`** 

- This function is utilized to obtained the Sift risk score for a given login event. This returns the risk score which resides between 0 and 1. Higher score means higher risk. 
- Following arguments are needed for the function.
    - Authentication context - current authentication context.
    - Login status - Whether the user authentication was succssful or not. Accepted values `LOGIN_SUCCESS`, `LOGIN_FAILED`.
    - Login data - This indicates whether user id, session id, ip, user_agent values needs to be sent to Sift for the risk score calculations.
    - Additional parameters - Apart from the above parameters, if needed any additional parameters can be sent to Sift.

**`publishLoginEventInfoToSift`** 

- This function is utilized to publish the successful or failed login events to Sift. This informs Sift that current login attempt was successful/failed.
    - Authentication context - current authentication context.
    - Login status - Whether the user authentication was succssful or not. Accepted values are `$success`, `$failure`.
    - Login data - This indicates whether user id, session id, ip, user_agent values needs to be sent to Sift for the risk score calculations.
    - Additional parameters - Apart from the above parameters, if needed any additional parameters can be sent to Sift.

### Enable Logging

Sending `"isLoggingEnabled": true` in the additional parameters will enable the logging for the Sift fraud detection flow. This will log the payload that will be sent to Sift as well as the risk score returned from the Sift.

### Enable Sift fraud detection

!!! note "Before you begin"
    You need to [register an application with Asgardeo]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

To enable Sift fraud detection for your application:

1. On the Asgardeo Console, go to **Applciations**.
2. Go to the **Sign-in Method** tab of the application and [enable conditional authentication](../authentication/conditional-auth/configure-conditional-auth.md).
3. Add an conditional authentication script and Click on **Update**.

Example conditional authentication script which fails the authentication if the risk score is higher than 0.5.

```
var data = ["$user_id", "$session_id", "$ip", "$user_agent"];
var additionalParams = {
    "loggingEnabled": true
}
var errorPage = '';
var errorPageParameters = {
    'status': 'Login Restricted',
    'statusMsg': 'You login attempt was identified as suspicious.'
};

var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            var riskScore = getSiftRiskScoreForLogin(context, "LOGIN_SUCCESS", data, additionalParams);
            if (riskScore > 0.5) {
                publishLoginEventInfoToSift(context, "LOGIN_FAILED", data, additionalParams);
                sendError(errorPage, errorPageParameters);
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


