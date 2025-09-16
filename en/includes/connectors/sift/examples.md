# Example use cases

To understand how you can use Sift-related functions in a conditional authentication script, let's look at the following examples.

!!! note "Conditional authentication scripts"

    To learn more about all the functions and object references you can use to create condiitonal authentication scripts, refer to the [conditional auth API reference]({{base_path}}/references/conditional-auth/api-reference/).

## Workflow-based scenario

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

## Risk score-based scenario

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
