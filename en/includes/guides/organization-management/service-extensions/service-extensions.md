# Service extensions

Service extensions at the organization level let you extend {{product_name}} to meet the specific requirements of your sub-organizations.

To learn how it works, refer to the [How service extensions work]({{base_path}}/guides/service-extensions/understanding-service-extensions/#how-service-extensions-work).

You can use the following extension capabilities available in {{product_name}} for your sub organizations:

## In-flow extensions

These extensions run directly within authentication or registration flows.

### Custom authentication

You can develop custom authentication logic by creating a custom authenticator as an external web service. This provides greater flexibility in handling diverse authentication requirements beyond the built-in authenticators in your organization.

To learn more, refer to the [Custom authentication]({{base_path}}/guides/service-extensions/in-flow-extensions/custom-authentication).

## Pre-flow extensions (actions)

These extensions execute specific actions before a particular event or flow within {{product_name}}.

To set up pre-flow extensions, refer to [Pre-flow extensions]({{base_path}}/guides/service-extensions/pre-flow-extensions/setting-up-actions) or [Action Management Rest API]({{base_path}}/apis/organization-apis/action-management-rest-api).

### Pre update password action

The pre update password action in {{product_name}} lets you check a password during password update flows.

To learn more, refer to the [Pre update password action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-update-password-action).

Behavior by user type:

- Organization users: The pre update password action executes in all password update flows for users created in the organization.

  The following example shows a request sent to an external service configured as a pre update password action, triggered when an administrator updates the organization user’s password.

```http
POST /password-update-action HTTP/1.1
Host: localhost
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
    "actionType": "PRE_UPDATE_PASSWORD",
    "event": {
    "tenant": {
        "id": "12402",
        "name": "bar.com"
    },
    "organization": {
        "id": "eb1115f6-274f-4bb7-9b6d-d31f678e81f7",
        "name": "Builders",
        "orgHandle": "builders.com",
        "depth": 1
    },
    "user": {
        "id": "8eebb941-51e1-4d13-9d5a-81da190383ae",
        "claims": [
        {
            "uri": "http://wso2.org/claims/username",
            "value": "bob@aol.com"
        },
        {
            "uri": "http://wso2.org/claims/emailAddresses",
            "value": [
            "bob@work.example.com",
            "bob@personal.example.com"
            ]
        }
        ],
        "groups": [
            "employee",
            "manager"
        ],
        "organization": {
            "id": "eb1115f6-274f-4bb7-9b6d-d31f678e81f7",
            "name": "Builders",
            "orgHandle": "builders.com",
            "depth": 1
        }
        "updatingCredential": {
        "type": "PASSWORD",
        "format": "HASH",
        "value": "h3bxCOJHqx4rMjBCwEnCZkB8gfutQb3h6N/Bu2b9Jn4=",
        "additionalData": {
            "algorithm": "SHA256"
        }
        }
    },
    "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
    },
    "initiatorType": "ADMIN",
    "action": "UPDATE"
    }
}
```

- Shared/ invited users: The pre update password action doesn't execute because the parent organization manages the credentials for the shared/ invited users.

### Pre update profile action

The pre-update profile action in WSO2 Identity Server lets you verify user attributes during profile update processes.

To learn more, refer to the [Pre update profile action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-update-profile-action).

Behavior by user type:

- Organization users: The pre update profile action runs during all profile update flows for users created in the organization.

  The following example shows a request sent to an external service configured as a pre update profile action, triggered when an administrator updates the organization user’s profile.

```http
POST /profile-update-action HTTP/1.1
Host: localhost
Authorization: Bearer czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
"actionType": "PRE_UPDATE_PROFILE",
"event": {
    "request": {
        "claims": [
            {
                "uri": "http://wso2.org/claims/emailaddress",
                "value": "emily@gmail.com"
            }
        ]
    },
    "tenant": {
        "id": "12402",
        "name": "bar.com"
    },
    "organization": {
        "id": "eb1115f6-274f-4bb7-9b6d-d31f678e81f7",
        "name": "ABC Builders",
        "orgHandle": "builders.com",
        "depth": 1
    },
    "user": {
        "id": "ab49e1b8-2d1b-424d-b136-debdca67bfcc",
        "organization": {
            "id": "eb1115f6-274f-4bb7-9b6d-d31f678e81f7",
            "name": "ABC Builders",
            "orgHandle": "builders.com",
            "depth": 1
        },
        "claims": [
            {
                "uri": "http://wso2.org/claims/emailaddress",
                "value": "emily@aol.com",
                "updatingValue": "emily@gmail.com"
            }
        ],
        "groups": [
            "gold-tier"
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

- Shared/ invited users: The pre update profile action only executes for the profile updates that happen for the attributes mentioned in [Customize user attributes in shared user profiles]({{base_path}}/guides/organization-management/share-user-profiles/#customize-user-attributes-in-shared-user-profiles).

    The following example shows a request sent to an external service configured as a pre update profile action, triggered when an administrator updates the shared user’s profile.

```http
POST /profile-update-action HTTP/1.1
Host: localhost
Authorization: Bearer czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
    "actionType": "PRE_UPDATE_PROFILE",
    "event": {
        "request": {
            "claims": [
                {
                    "uri": "http://wso2.org/claims/customAttribute1",
                    "value": "customValue1"
                },
                {
                    "uri": "http://wso2.org/claims/customAttribute2",
                    "value": [
                        "1234566234",
                        "1234566235",
                        "1234566236"
                    ]
                }
            ]
        },
        "tenant": {
            "id": "12402",
            "name": "bar.com"
        },
        "organization": {
            "id": "eb1115f6-274f-4bb7-9b6d-d31f678e81f7",
            "name": "ABC Builders",
            "orgHandle": "builders.com",
            "depth": 1
        },
        "user": {
            "id": "ab49e1b8-2d1b-424d-b136-debdca67bfcc",
            "claims": [
                {
                    "uri": "http://wso2.org/claims/identity/accountState",
                    "value": "UNLOCKED"
                },
                {
                    "uri": "http://wso2.org/claims/customAttribute1",
                    "value": "customValue1",
                    "updatingValue": "customValue99"
                },
            ],
            "groups": [
                "gold-tier"
            ],
            "organization": {
                "id": "2fb1115f5-244f-4bc7-4b6e-d314178e81f7",
                "name": "Bar",
                "orgHandle": "bar.com",
                "depth": 0
            },
            "sharedUserId": "efa47311-ce77-4c19-9501-e872de6924ab"
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

!!! note
    The `sharedUserId` in `event.user` denotes the unique identifier for the user in the shared organization.
