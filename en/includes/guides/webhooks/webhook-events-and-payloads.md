# Webhook events and payloads <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

This guide details the webhook event types dispatched by {{product_name}}. For each event, you'll find JSON payload examples and descriptions of their properties.

!!! Note
      This feature is currently in **Preview**. Functionality and event payloads may change during development.  
      Expect updates without prior notice.

## Login events

{{product_name}} dispatches webhook events for both successful and failed login attempts, providing detailed context for each.

### Login success event

{{product_name}} sends a <code>loginSuccess</code> event when a user successfully authenticates.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "051f0c37-b689-44d4-b7d2-29b980ece273",
  "iat": 1751705149662,
  "events": {
    "https://schemas.identity.wso2.org/events/login/event-type/loginSuccess": {
      "user": {
        "id": "d4002616-f00c-49d5-b9b7-63b063819049",
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/d4002616-f00c-49d5-b9b7-63b063819049"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "id": "40d982e5-23be-4ee1-8540-9cb696d8c321",
        "name": "MyApp"
      },
      "authenticationMethods": [
        "BasicAuthenticator"
      ]
    }
  }
}
```

The <code>events</code> object contains the actual event data for a successful login, identified by the URI <code>https://schemas.identity.wso2.org/events/login/event-type/loginSuccess</code>. This URI signifies a successful login event.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the authenticated user.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the login processes.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store in which the user's data gets managed.</p></td>
</tr>
<tr class="even">
<td>application</td>
<td><p>Contains information of the application through which the login occurred.</p></td>
</tr>
<tr class="odd">
<td>authenticationMethods</td>
<td><p>An array of authentication methods used for the successful login (for example <code>BasicAuthenticator</code>).</p></td>
</tr>
</tbody>
</table>

### Login failed event

{{product_name}} sends a <code>loginFailed</code> event when a login attempt fails.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "7ef94943-2004-4f72-b476-9baffe5623c7",
  "iat": 1751709144508,
  "events": {
    "https://schemas.identity.wso2.org/events/login/event-type/loginFailed": {
      "user": {},
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "application": {
        "id": "63d8a96f-ff87-4f38-a1d7-4d10ee470d9a",
        "name": "My Account"
      },
      "reason": {
        "description": "User authentication failed due to invalid credentials",
        "context": {
          "failedStep": {
            "step": 1,
            "idp": "LOCAL",
            "authenticator": "BasicAuthenticator"
          }
        }
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a failed login, identified by the URI <code>https://schemas.identity.wso2.org/events/login/event-type/loginFailed</code>. This URI signifies a successful login event.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the authenticating user.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processes the login.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data if applicable.</p></td>
</tr>
<tr class="even">
<td>application</td>
<td><p>Contains information about the application that initiated the login.</p></td>
</tr>
<tr class="odd">
<td>reason</td>
<td>
<p>Provides context information for the failure including:</p>
<ul>
<li><strong>description</strong>: Human-readable explanation of why the login failed (for example "User authentication failed due to invalid credentials")</li>
<li><strong>context</strong>: Details about the failure point in the authentication flow including:
<ul>
<li>Step number where the failure occurred</li>
<li>Identity Provider (IdP) involved (for example "LOCAL")</li>
<li>Authenticator used (for example <code>BasicAuthenticator</code>)</li>
</ul>
</li>
</ul>
</td>
</tr>
</tbody>
</table>

## Registration events

{{product_name}} dispatches webhook events for successful and failed user registrations. Each event provides detailed context.

### Registration success event

{{product_name}} sends a <code>registrationSuccess</code> event when a new user account gets successfully registered in a state where the user can login and access.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "e558b025-58ae-4e29-8242-75d6bfdfcbda",
  "iat": 1751709420327,
  "events": {
    "https://schemas.identity.wso2.org/events/registration/event-type/registrationSuccess": {
      "initiatorType": "ADMIN",
      "user": {
        "id": "3fae4858-4b26-4608-9df4-78ae75e3adda",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "johndoe@aol.com"
          },
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "johndoe@aol.com"
          },
          {
            "uri": "http://wso2.org/claims/lastname",
            "value": "Doe"
          },
          {
            "uri": "http://wso2.org/claims/givenname",
            "value": "John"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/3fae4858-4b26-4608-9df4-78ae75e3adda"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "REVGQVVMVA==",
        "name": "DEFAULT"
      },
      "action": "REGISTER"
    }
  }
}
```

The <code>events</code> object contains the actual event data for a successful registration, identified by the URI <code>https://schemas.identity.wso2.org/events/registration/event-type/registrationSuccess</code>. This URI signifies a successful user registration event.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user who registers.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processes the user registration.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the registration. Refer to <a href="#initatorType-and-action">initiatorType and action properties</a> for details.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>Indicates whether the registration uses direct admin registration, user self-registration, or admin invite flow. Refer to <a href="#initatorType-and-action">initiatorType and action properties</a> for details.</p></td>
</tr>
</tbody>
</table>

### Registration failure event

{{product_name}} sends a <code>registrationFailed</code> event when a user registration attempt fails.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "43e76a18-f3b3-400c-bf76-9761b4ec5d57",
  "iat": 1751565405544,
  "events": {
    "https://schemas.identity.wso2.org/events/registration/event-type/registrationFailed": {
      "initiatorType": "USER",
      "user": {
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          },
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          },
          {
            "uri": "http://wso2.org/claims/givenname",
            "value": "Peter"
          }
        ]
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "action": "REGISTER",
      "reason": {
        "description": "The provided username already exists in the tenant: myorg"
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a failed registration, identified by the URI <code>https://schemas.identity.wso2.org/events/registration/event-type/registrationFailed</code>. This URI signifies a failed user registration event.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user attempting registration, including provided claims.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the registration attempt.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the registration. Refer to <a href="#initatorType-and-action">initiatorType and action properties</a> for details.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates whether the registration uses direct admin registration, user self-registration, or admin invite flow. Refer to <a href="#initatorType-and-action">initiatorType and action properties</a> for details.</p></td>
</tr>
<tr class="odd">
<td>reason</td>
<td><p>Provides context information explaining the registration failure.</p></td>
</tr>
</tbody>
</table>

<a name="initatorType-and-action"></a>

### <code>initiatorType</code> and <code>action</code> properties

The initiatorType and the action property together show which flow triggers a user registration.

The table below explains how these properties differ based on each flow.

<table>
<thead>
<tr class="header">
<th>Flow</th>
<th>Value of <code>initiatorType</code></th>
<th>Value of <code>action</code></th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Admin initiated direct user registration</td>
<td>ADMIN</td>
<td>REGISTER</td>
<td><p>Occurs when an administrator directly registers a user via console or <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.</p></td>
</tr>
<tr class="even">
<td>Admin initiated user invite to register</td>
<td>ADMIN</td>
<td>INVITE</td>
<td><p>Occurs when an administrator invites a user to register via console or <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.</p></td>
</tr>
<tr class="odd">
<td>User self registration</td>
<td>USER</td>
<td>REGISTER</td>
<td><p>Occurs when a user registers by clicking the 'Register' link in the login page or via self registration APIs.</p></td>
</tr>
<tr class="even">
<td>Application initiated user registration</td>
<td>APPLICATION</td>
<td>REGISTER</td>
<td><p>Occurs when an application with appropriate permissions automatically registers a user. This happens during automated user provisioning or integration with external identity management systems via <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.</p></td>
</tr>
</tbody>
</table>

## Credential update events

{{product_name}} sends a <code>credentialUpdated</code> event when a user successfully updates credential information. This event currently triggers only for password updates.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "24fc890a-41c5-4397-9cc9-b9f48102384e",
  "iat": 1751566637663,
  "events": {
    "https://schemas.identity.wso2.org/events/credential/event-type/credentialUpdated": {
      "initiatorType": "ADMIN",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "credentialType": "PASSWORD",
      "action": "UPDATE"
    }
  }
}
```

The <code>events</code> object contains the actual event data for a credential update, identified by the URI <code>https://schemas.identity.wso2.org/events/credential/event-type/credentialUpdated</code>. This URI signifies a successful credential update event.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user whose credential updated.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the credential update.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="even">
<td>credentialType</td>
<td><p>Shows which credential the user updates. Currently shows "PASSWORD" as events trigger only for password updates.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the password update. Refer to initiatorType and action properties for details.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates whether the password update uses a reset flow, update flow, or invite flow. Refer to initiatorType and action properties for details.</p></td>
</tr>
</tbody>
</table>

<a name="initatorType-and-action"></a>

### <code>initiatorType</code> and <code>action</code> properties

The initiatorType and the action property together show which flow triggers a password update.

The table below explains how these properties differ based on each flow.

<table>
<thead>
<tr class="header">
<th>Flow</th>
<th>Value of initiatorType</th>
<th>Value of action</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>User initiated password update</td>
<td>USER</td>
<td>UPDATE</td>
<td><p>Occurs when a user updates their password through profile settings in My Account app or via 
{% if product_name == "WSO2 Identity Server"%}
<a href="{{base_path}}/apis/scim2-me-rest-apis/">SCIM 2.0 Me API</a>
{% elif product_name == "Asgardeo" %}
<a href="{{base_path}}/apis/scim2-me/">SCIM 2.0 Me API</a>
{% endif %}.</p></td>
</tr>
<tr class="even">
<td>User initiated password reset</td>
<td>USER</td>
<td>RESET</td>
<td><p>Occurs when a user forgets their password and initiates a reset flow to regain account access.</p></td>
</tr>
<tr class="odd">
<td>Admin initiated password update</td>
<td>ADMIN</td>
<td>UPDATE</td>
<td><p>Occurs when an administrator updates a user's password directly via console or <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.</p></td>
</tr>
<tr class="even">
<td>Admin initiated password reset</td>
<td>ADMIN</td>
<td>RESET</td>
<td><p>Occurs when an administrator initiates a forced password reset and the user resets the password via that request.</p></td>
</tr>
<tr class="odd">
<td>Admin initiated user invite to set password</td>
<td>ADMIN</td>
<td>INVITE</td>
<td><p>Occurs when an administrator invites a new user to join the system. The user then sets their password.</p></td>
</tr>
<tr class="even">
<td>Application initiated password update</td>
<td>APPLICATION</td>
<td>UPDATE</td>
<td><p>Occurs when an application with appropriate permissions automatically updates a user's password. This happens during automated user provisioning or integration with external identity management systems via <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.</p></td>
</tr>
</tbody>
</table>

## User account management events

{{product_name}} dispatches webhook events for changes to user profiles and account statuses. These events provide detailed context for each action, helping you synchronize external systems with user data and manage user lifecycle within your applications.

### User profile updated event

{{product_name}} sends a <code>userProfileUpdated</code> event when a user updates profile information.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "2371a91d-66e8-400b-a8de-6e8ee2b8175e",
  "iat": 1751569642578,
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userProfileUpdated": {
      "initiatorType": "ADMIN",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b",
        "addedClaims": [
          {
            "uri": "http://wso2.org/claims/organization",
            "value": "myorg"
          }
        ],
        "updatedClaims": [
          {
            "uri": "http://wso2.org/claims/emailAddresses",
            "value": "peter@aol.com"
          }
        ]
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "UPDATE"
    }
  }
}
```

The <code>events</code> object contains the actual event data for a user profile update, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userProfileUpdated</code>. This URI signifies a successful user profile update event.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td>
<p>Contains information about the user whose profile updated. This includes:</p>
<ul>
<li><strong>addedClaims</strong>: Array of claims (attributes) newly added to the user's profile during the update</li>
<li><strong>updatedClaims</strong>: Array of claims (attributes) that the update process changes in the user's profile</li>
<li><strong>removedClaims</strong>: Array of claims (attributes) that the update process removes from the user's profile</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the profile update.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the profile update.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>Shows the profile update flow type. Currently has the value <code>UPDATE</code>, indicating a standard profile update flow.</p></td>
</tr>
</tbody>
</table>

### User disabled event

{{product_name}} sends a <code>userDisabled</code> event when a user account gets disabled.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "d32b6be7-1675-4e7d-b118-7346ad53c046",
  "iat": 1751570468806,
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userDisabled": {
      "initiatorType": "ADMIN",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a user disabled event, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userDisabled</code>. This URI signifies a successful user account disablement.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the user disablement.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the user disablement.</p></td>
</tr>
</tbody>
</table>

### User enabled event

{{product_name}} sends a <code>userEnabled</code> event when a user account gets enabled. This event signifies that a previously disabled user account becomes reactivated.

**Example payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "285a876f-ea57-47b6-9a9d-fc452a04413a",
  "iat": 1751570713348,
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userEnabled": {
      "initiatorType": "ADMIN",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a user enabled event, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userEnabled</code>. This URI signifies a successful user account enablement.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user whose account enabled.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the user enablement.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the user enablement.</p></td>
</tr>
</tbody>
</table>

### User deleted event

{{product_name}} sends a <code>userDeleted</code> event when a user account gets deleted.

**Example Payload:**

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "21f03016-632d-4266-9e8b-8863001109f2",
  "iat": 1751571143534,
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userDeleted": {
      "initiatorType": "ADMIN",
      "user": {
        "id": "0bd61ecd-e974-41e6-a962-8b712090240f",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/0bd61ecd-e974-41e6-a962-8b712090240f"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a user deleted event, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userDeleted</code>. This URI signifies a user account deletion.

The table below explains each property in the event data.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user whose account got deleted.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the user deletion.</p></td>
</tr>
<tr class="odd">
<td>userStore</td>
<td><p>Indicates the user store that managed the user's data.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the user deletion.</p></td>
</tr>
</tbody>
</table>
