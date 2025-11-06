# Usage

Administrators can use the risk score or decision ID returned by Sift to decide whether to allow, deny, or step up authentication for a login attempt.

This guide gives examples of how to use the Sift functions in [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) scripts to customize the login flow based on risk.

## Prerequisites

- If you haven't already, [register your application]({{base_path}}/guides/applications/#register-an-application) in {{product_name}}.

- [Set up conditional authentication]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/) for your application.

!!! note

    Learn more about all the elements you can use to create conditional authentication scripts in its [API reference]({{base_path}}/references/conditional-auth/api-reference/).

## Risk score-based scenario

In this example scenario, imagine you want to fulfill the following requirements:

- if the user's risk score exceeds 0.7, fail the login attempt.

- if the risk score falls between 0.5 and 0.7, prompt for an extra login step.

- if authentication fails, publish a login fail event to Sift.

- Enable {{product_name}} to send the user ID, session ID, IP address to Sift for risk evaluation, but prevent sending the user agent information to Sift.

You can implement this using the [getSiftRiskScoreForLogin()]({{base_path}}/connectors/sift/reference/#getsiftriskscoreforlogin) function in a conditional authentication script as shown below.

```javascript

var additionalParams = {
    "loggingEnabled": true, // enable logging for debugging
    "$user_agent": "" // prevent sending user agent info to Sift
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

How it works:

- When a user attempts to log in, the script executes step 1 (e.g., username/password authentication).

- If step 1 is successful, it calls the `getSiftRiskScoreForLogin()` function, passing the current authentication context, login status, and additional parameters. This function sends the relevant contextual data to Sift and retrieves the risk score.

- Based on the returned risk score:

      - If the score is greater than 0.7, it sends an error response, effectively blocking the login attempt.

      - If the score is between 0.5 and 0.7, it executes step 2 (e.g., an additional authentication step like OTP).

- If step 1 fails, it calls the `publishLoginEventToSift()` function to notify Sift of the failed login attempt, which can help improve future risk assessments.

- Additional parameters enable logging and prevent WSO2 Identity Server from sending the user agent information to Sift.

## Decision ID-based scenario

In this example scenario, imagine you want to fulfill the following requirements:

- if the decision ID is `session_looks_bad_account_takeover`, fail the login attempt.

- if the decision ID is `mfa_account_takeover`, prompt for an extra login step.

- if the login fails, publish a login fail event to Sift.

- Enable {{product_name}} to send the user ID, session ID, IP address to Sift for risk evaluation, but prevent sending the user agent information to Sift.

You can implement this using the [getSiftWorkflowDecision()]({{base_path}}/connectors/sift/reference/#getsiftworkflowdecision) function in a conditional authentication script as shown below.

```javascript
var additionalParams = {
    "loggingEnabled": true, // enable logging for debugging
    "$user_agent": "", // prevent sending user agent info to Sift
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

How it works:

- When a user attempts to log in, the script executes step 1 (e.g., username/password authentication).

- If step 1 is successful, it calls the `getSiftWorkflowDecision()` function, passing the current authentication context, login status, and additional parameters. This function sends the relevant contextual data to Sift and retrieves the decision ID.

- Based on the returned decision ID:

      - If the decision ID is `session_looks_bad_account_takeover`, it sends an error response, effectively blocking the login attempt.

      - If the decision ID is `mfa_account_takeover`, it executes step 2 (e.g., an additional authentication step like OTP).

- If step 1 fails, it calls the `publishLoginEventToSift()` function to notify Sift of the failed login attempt, which can help improve future risk assessments.

- Additional parameters enable logging and prevent {{product_name}} from sending the user agent information to Sift.
