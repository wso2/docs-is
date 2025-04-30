The Pre-Update Profile action allows you to validate user attributes during profile update operations. This action
empowers you to implement custom workflows, such as automated verification of updated data, persisting audit trails, or
triggering notifications whenever sensitive information is changed.
Using this extension point, you can enforce additional validations or business logic during two types of profile update
flows:

* Self-service updates performed by the user through their profile management portal.
* Administrator-initiated updates where an admin modifies a user's profile via the management console or APIs.

## Scenario Overview

In this guide, the scenario we will implement demonstrates a real-world use case involving the Pre-Update Profile
action:

* Department Validation: Before allowing a user to update their department information, the system will validate the
  entered department against a company's internal directory via an internal API. Only if the department exists will the
  update be allowed.
* Security Notification: If a user attempts to update sensitive attributes such as email, phone number, or department,
  an email notification will be sent to the security team alerting them about the attempted change.

This use case highlights how you can enhance profile management flows with validation and notification mechanisms,
improving data integrity and operational security.

## Request and Response Handling

When a profile update request is made, Asgardeo or WSO2 Identity Server (WSO2 IS) will send a request to your configured
extension service containing the updated attribute information.
Your service will process this request and respond with an appropriate status:

* Success: Allow the update to proceed.
* Failed: Block the update and provide an appropriate error message.
* Error: Indicate a processing error, prompting the platform to handle it accordingly.

The request structure and expected response formats are detailed in the official documentation. The request structure
for this use case is as follows.

```json
{
  "actionType": "PRE_UPDATE_PROFILE",
  "event": {
    "request": {
      "claims": [
        {
          "uri": "http://wso2.org/claims/department",
          "value": "HR"
        },
        {
          "uri": "http://wso2.org/claims/mobile",
          "value": "+94771223448"
        },
        {
          "uri": "http://wso2.org/claims/emailaddress",
          "value": "testuser@wso2.com"
        }
      ]
    },
    "tenant": {
      "id": "2210",
      "name": "testwso2"
    },
    "user": {
      "id": "57b22cbf-4688-476c-a607-c0c9d089d25d",
      "claims": [
        {
          "uri": "http://wso2.org/claims/username",
          "value": "testuser@wso2.com"
        },
        {
          "uri": "http://wso2.org/claims/identity/userSource",
          "value": "DEFAULT"
        },
        {
          "uri": "http://wso2.org/claims/identity/idpType",
          "value": "Local"
        }
      ]
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

The response structures used in this scenario are as follows.

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
  "failureReason": "invalid_input",
  "failureDescription": "Provided user attributes are invalid."
}
```

By following this scenario, you will learn how to build, deploy, and integrate a pre-update profile validation service
that enhances your identity management processes.
