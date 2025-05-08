The Pre-Update Password action allows you to validate passwords during various password update operations. This feature enables you to integrate with credential intelligence services (such as Have I Been Pwned or SpyCloud) to detect compromised passwords or apply custom password policies by checking against allowed or disallowed password lists.

Using this extension point, you can enforce additional password validation logic during the following flows:

* Self-Service password reset which triggers when an end user selects the "Forgot Password" option and completes the
  password recovery process. This flow ensures that the new password meets your security requirements before it is
  accepted.
* Profile update which occurs when a user changes their password through a self-service portal such as the My Account
  application. The Pre-Update Password action helps validate that the new password adheres to your organization's
  security policies.
* Admin-Initiated password reset initiated by an administrator who forces a password reset for a user. The user is then
  required to set a new password, which is validated through this action before being accepted.
* Admin-Initiated user invitation that happens when an administrator invites a new user to register by sending a
  password reset link. The invited user sets a new password as part of the onboarding flow, which is validated to ensure
  compliance with your password policies.
* Direct admin update involving an administrator directly updating a user's password via the management console or APIs.
  The new password is subjected to validation before being applied.

This action helps enforce stronger security standards by allowing proactive checks during all major password update
scenarios.

![Pre-Update Password Action Overview]({{base_path}}/assets/img/complete-guides/actions/image16.png)

## Scenario Overview

In this guide, the scenario we will implement demonstrates a real-world use case involving the Pre-Update Password
action:

* External Breach Verification: Before allowing a user to update their password, the system will verify the new password
  against the Have I Been Pwned (HIBP) service to check whether it has appeared in known data breaches. If the password
  is found to be compromised, the update will be blocked and the user will be prompted to choose a more secure password.

This use case showcases how you can enhance password update flows with external validation, promoting better password
hygiene and strengthening overall account security.

## Request and Response Handling

When a password update request is made, Asgardeo or WSO2 Identity Server (WSO2 IS) will send a request to your 
configured extension service containing the updated password information.

Your service will process this request and respond with an appropriate status:

* Success: Allow the password update to proceed.
* Failed: Block the password update and provide an appropriate error message.
* Error: Indicate a processing error, prompting the platform to handle it accordingly.

The request structure and expected response formats are detailed in the official documentation. The request structure
for this use case is as follows.

```json
{
  "actionType": "PRE_UPDATE_PASSWORD",
  "event": {
    "tenant": {
      "id": "2210",
      "name": "testwso2"
    },
    "user": {
      "id": "18b6b431-16e9-4107-a828-33778824c8af",
      "updatingCredential": {
        "type": "PASSWORD",
        "format": "HASH",
        "value": "ec4Zktg/dqruY3ZHVjwTCZ9422Bu0Xi3F56ZcFxkcjU=",
        "additionalData": {
          "algorithm": "SHA256"
        }
      }
    },
    "userStore": {
      "id": "REVGQVVMVA==",
      "name": "DEFAULT"
    },
    "initiatorType": "ADMIN",
    "action": "UPDATE"
  }
}
```

The sample response structures used in this scenario are as follows.

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "actionStatus": "SUCCESS"
}

HTTP/1.1 200 OK
Content-Type: application/json
{
  "actionStatus": "FAILED",
  "failureReason": "password_compromised",
  "failureDescription": "The provided password is compromised."
}
```

By following this scenario, you will learn how to build, deploy, and integrate a pre-password update validation service
that strengthens your password policies and enhances your identity management workflows.
