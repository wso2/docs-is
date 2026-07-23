# Webhook events and payloads

This guide details the webhook event types dispatched by {{product_name}}. For each event, you'll find JSON payload examples and descriptions of their properties.

!!! Note
      In webhook event payloads, <code>initiatorIpAddress</code> (when present) represents the IP address of the initiator that triggered the event.

{% if product_name == "WSO2 Identity Platform" %}
!!! Note
      This feature is currently in **Preview**. Functionality and event payloads may change during development.  
      Expect updates without prior notice.
{% endif %}

{% if product_name == "WSO2 Identity Platform" %}
{% set server_url = "https://api.asgardeo.io/t/myorg" %}
{% set host_url = "https://api.asgardeo.io" %}
{% set tenant_domain = "myorg" %}
{% set userstore_domain = "DEFAULT" %}
{% else %}
{% set server_url = "https://localhost:9443/t/myorg.com" %}
{% set host_url = "https://localhost:9443" %}
{% set tenant_domain = "myorg.com" %}
{% set userstore_domain = "PRIMARY" %}
{% endif %}

## Login events

{{product_name}} dispatches webhook events for both successful and failed login attempts, providing detailed context for each.

### Login success event

{{product_name}} sends a <code>loginSuccess</code> event when a user successfully authenticates.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "051f0c37-b689-44d4-b7d2-29b980ece273",
  "iat": 1751705149662,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/login/event-type/loginSuccess": {
      "user": {
        "id": "d4002616-f00c-49d5-b9b7-63b063819049",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/d4002616-f00c-49d5-b9b7-63b063819049"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
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

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "051f0c37-b689-44d4-b7d2-29b980ece273",
  "iat": 1751705149662,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/login/event-type/loginSuccess": {
      "user": {
        "id": "d4002616-f00c-49d5-b9b7-63b063819049",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/d4002616-f00c-49d5-b9b7-63b063819049"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
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

{% endif %}

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
<td><p>Contains information about the authenticated user along with user resident organization.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the login processes.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the login processes.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store in which the user's data gets managed.</p></td>
</tr>
<tr class="odd">
<td>application</td>
<td><p>Contains information of the application through which the login occurred.</p></td>
</tr>
<tr class="even">
<td>authenticationMethods</td>
<td><p>An array of authentication methods used for the successful login (for example <code>BasicAuthenticator</code>).</p></td>
</tr>
</tbody>
</table>

### Login failed event

{{product_name}} sends a <code>loginFailed</code> event when a login attempt fails.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "7ef94943-2004-4f72-b476-9baffe5623c7",
  "iat": 1751709144508,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/login/event-type/loginFailed": {
      "user": {
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
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        }
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "application": {
        "id": "63d8a96f-ff87-4f38-a1d7-4d10ee470d9a",
        "name": "Test App"
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

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "7ef94943-2004-4f72-b476-9baffe5623c7",
  "iat": 1751709144508,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/login/event-type/loginFailed": {
      "user": {
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
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        }
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "application": {
        "id": "63d8a96f-ff87-4f38-a1d7-4d10ee470d9a",
        "name": "Test App"
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

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processes the login.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data if applicable.</p></td>
</tr>
<tr class="odd">
<td>application</td>
<td><p>Contains information about the application that initiated the login.</p></td>
</tr>
<tr class="even">
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

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "e558b025-58ae-4e29-8242-75d6bfdfcbda",
  "iat": 1751709420327,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/registration/event-type/registrationSuccess": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
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
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/3fae4858-4b26-4608-9df4-78ae75e3adda"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
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

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "e558b025-58ae-4e29-8242-75d6bfdfcbda",
  "iat": 1751709420327,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/registration/event-type/registrationSuccess": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
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
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/3fae4858-4b26-4608-9df4-78ae75e3adda"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
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

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processes the user registration.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the registration. Refer to <a href="#initiatorType-and-action-registration"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>Indicates whether the registration uses direct admin registration, user self-registration, or admin invite flow. Refer to <a href="#initiatorType-and-action-registration"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
</tbody>
</table>

### Registration failure event

{{product_name}} sends a <code>registrationFailed</code> event when a user registration attempt fails.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "43e76a18-f3b3-400c-bf76-9761b4ec5d57",
  "iat": 1751565405544,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/registration/event-type/registrationFailed": {
      "initiatorType": "USER",
      "initiatorIpAddress": "203.0.113.10",
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
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "action": "REGISTER",
      "reason": {
        "description": "The provided username already exists in the tenant: myorg"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "43e76a18-f3b3-400c-bf76-9761b4ec5d57",
  "iat": 1751565405544,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/registration/event-type/registrationFailed": {
      "initiatorType": "USER",
      "initiatorIpAddress": "203.0.113.10",
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
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "action": "REGISTER",
      "reason": {
        "description": "The provided username already exists in the tenant: myorg.com"
      }
    }
  }
}
```

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processed the registration attempt.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the registration. Refer to <a href="#initiatorType-and-action-registration"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates whether the registration uses direct admin registration, user self-registration, or admin invite flow. Refer to <a href="#initiatorType-and-action-registration"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
<tr class="even">
<td>reason</td>
<td><p>Provides context information explaining the registration failure.</p></td>
</tr>
</tbody>
</table>

<a name="initiatorType-and-action-registration"></a>

### <code>initiatorType</code> and <code>action</code> properties for registration events

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

## Token events

{{product_name}} dispatches webhook events for both token issuance and revocation. Each event provides detailed context.

### Access token issued event

{{product_name}} sends an <code>accessTokenIssued</code> event when an access token gets successfully issued to a client application.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "f30f6807-192a-40b0-99b9-b176d3b94a94",
  "iat": 1755541962092,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/token/event-type/accessTokenIssued": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          },
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "name": "Test App",
        "consumerKey": "eaSbhGeDL7ek2ypVrb0h4ZYMSN0a"
      },
      "accessToken": {
        "tokenType": "Opaque",
        "iat": "1755541962069",
        "grantType": "authorization_code"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "f30f6807-192a-40b0-99b9-b176d3b94a94",
  "iat": 1755541962092,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/token/event-type/accessTokenIssued": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          },
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "name": "Test App",
        "consumerKey": "eaSbhGeDL7ek2ypVrb0h4ZYMSN0a"
      },
      "accessToken": {
        "tokenType": "Opaque",
        "iat": "1755541962069",
        "grantType": "authorization_code"
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a successful token issuance, identified by the URI <code>https://schemas.identity.wso2.org/events/token/event-type/accessTokenIssued</code>. This URI signifies a successful access token issuance event.

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
<td><p>Contains information about the user for whom the token gets issued along with user resident organization.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the token issuance processes.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the token issuance processes.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>application</td>
<td><p>Contains information about the application that requested the token.</p></td>
</tr>
<tr class="even">
<td>accessToken</td>
<td>
<p>Contains details about the issued token including:</p>
<ul>
<li><strong>tokenType</strong>: Token type (for example "Opaque" or "jwt")</li>
<li><strong>iat</strong>: Token issued at timestamp</li>
<li><strong>grantType</strong>: OAuth2 grant type used for token issuance (for example "authorization_code")</li>
</ul>
</td>
</tr>
</tbody>
</table>

### Access token revoked event

{{product_name}} sends an <code>accessTokenRevoked</code> event when an access token gets revoked.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "d801a275-e64b-4998-90d9-2ed1601a0d19",
  "iat": 1755541966592,
  "rci": "48eaeb32-76c0-4af8-b04e-9ce0c00cb61f",
  "events": {
    "https://schemas.identity.wso2.org/events/token/event-type/accessTokenRevoked": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          },
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "applications": [
        {
          "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
          "name": "Test App",
          "consumerKey": "eaSbhGeDL7ek2ypVrb0h4ZYMSN0a"
        }
      ]
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "d801a275-e64b-4998-90d9-2ed1601a0d19",
  "iat": 1755541966592,
  "rci": "48eaeb32-76c0-4af8-b04e-9ce0c00cb61f",
  "events": {
    "https://schemas.identity.wso2.org/events/token/event-type/accessTokenRevoked": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          },
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "applications": [
        {
          "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
          "name": "Test App",
          "consumerKey": "eaSbhGeDL7ek2ypVrb0h4ZYMSN0a"
        }
      ]
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a token revocation, identified by the URI <code>https://schemas.identity.wso2.org/events/token/event-type/accessTokenRevoked</code>. This URI signifies an access token revocation event.

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
<td><p>Contains information about the user whose token gets revoked.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processes the token revocation.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processes the token revocation.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>applications</td>
<td><p>Contains information about applications associated with the revoked token. This appears as an array because token revocation can affect multiple applications.</p></td>
</tr>
</tbody>
</table>

## Session events

{{product_name}} dispatches webhook events for session establishment, presentation, and revocation. Each event provides detailed context about user sessions and associated applications.

### Session established event

{{product_name}} sends a <code>sessionEstablished</code> event when a user logs in for the first time and creates a new session.

This event triggers for every new session creation during the login process. It helps you track when users establish new sessions in your system.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "1a9b7a5f-42f3-4f87-a03d-6962b32a219b",
  "iat": 1755541960053,
  "rci": "b8b6ccbd-69b0-47d3-b0ae-b2b0df085f7c",
  "events": {
    "https://schemas.identity.wso2.org/events/session/event-type/sessionEstablished": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
        "name": "Test App"
      },
      "session": {
        "id": "68d1f2861461c69d8e821d91839bbf8e23ef04fb96c1ac655f452d94d1fd6e4d",
        "loginTime": 1755541960025,
        "applications": [
          {
            "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
            "name": "Test App"
          }
        ]
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "1a9b7a5f-42f3-4f87-a03d-6962b32a219b",
  "iat": 1755541960053,
  "rci": "b8b6ccbd-69b0-47d3-b0ae-b2b0df085f7c",
  "events": {
    "https://schemas.identity.wso2.org/events/session/event-type/sessionEstablished": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
        "name": "Test App"
      },
      "session": {
        "id": "68d1f2861461c69d8e821d91839bbf8e23ef04fb96c1ac655f452d94d1fd6e4d",
        "loginTime": 1755541960025,
        "applications": [
          {
            "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
            "name": "Test App"
          }
        ]
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a session establishment, identified by the URI <code>https://schemas.identity.wso2.org/events/session/event-type/sessionEstablished</code>. This URI signifies a new session establishment event.

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
<td><p>Contains information about the user who established the session.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the session gets established.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the session gets established.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>application</td>
<td><p>Contains information about the application through which the session gets established.</p></td>
</tr>
<tr class="even">
<td>session</td>
<td>
<p>Contains details about the established session including:</p>
<ul>
<li><strong>id</strong>: Unique identifier for the session</li>
<li><strong>loginTime</strong>: Timestamp when the session gets created</li>
<li><strong>applications</strong>: Array of applications associated with this session</li>
</ul>
</td>
</tr>
</tbody>
</table>

### Session presented event

{{product_name}} sends a <code>sessionPresented</code> event when an existing session gets used for authentication.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "2837280b-5229-462a-afb6-dc84e97ca152",
  "iat": 1755541961796,
  "rci": "60f7dd4f-a791-4135-94d6-d26795629361",
  "events": {
    "https://schemas.identity.wso2.org/events/session/event-type/sessionPresented": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
        "name": "Test App"
      },
      "session": {
        "id": "68d1f2861461c69d8e821d91839bbf8e23ef04fb96c1ac655f452d94d1fd6e4d",
        "loginTime": 1755541961792,
        "applications": [
          {
            "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
            "name": "Test App"
          }
        ]
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "2837280b-5229-462a-afb6-dc84e97ca152",
  "iat": 1755541961796,
  "rci": "60f7dd4f-a791-4135-94d6-d26795629361",
  "events": {
    "https://schemas.identity.wso2.org/events/session/event-type/sessionPresented": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "application": {
        "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
        "name": "Test App"
      },
      "session": {
        "id": "68d1f2861461c69d8e821d91839bbf8e23ef04fb96c1ac655f452d94d1fd6e4d",
        "loginTime": 1755541961792,
        "applications": [
          {
            "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
            "name": "Test App"
          }
        ]
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a session presentation, identified by the URI <code>https://schemas.identity.wso2.org/events/session/event-type/sessionPresented</code>. This URI signifies a session presentation event.

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
<td><p>Contains information about the user whose session gets presented.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the session gets presented.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the session gets presented.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>application</td>
<td><p>Contains information about the application that requested the session presentation.</p></td>
</tr>
<tr class="even">
<td>session</td>
<td>
<p>Contains details about the presented session including:</p>
<ul>
<li><strong>id</strong>: Unique identifier for the session</li>
<li><strong>loginTime</strong>: Timestamp when the session originally started</li>
<li><strong>applications</strong>: Array of applications associated with this session</li>
</ul>
</td>
</tr>
</tbody>
</table>

### Session revoked event

{{product_name}} sends a <code>sessionRevoked</code> event when one or more user sessions get revoked.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "61503199-bdf7-4f44-8f50-60c78bf419ad",
  "iat": 1755541966644,
  "rci": "48eaeb32-76c0-4af8-b04e-9ce0c00cb61f",
  "events": {
    "https://schemas.identity.wso2.org/events/session/event-type/sessionRevoked": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "sessions": [
        {
          "id": "68d1f2861461c69d8e821d91839bbf8e23ef04fb96c1ac655f452d94d1fd6e4d",
          "loginTime": 1755541961792,
          "applications": [
            {
              "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
              "name": "Test App"
            }
          ]
        }
      ]
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "61503199-bdf7-4f44-8f50-60c78bf419ad",
  "iat": 1755541966644,
  "rci": "48eaeb32-76c0-4af8-b04e-9ce0c00cb61f",
  "events": {
    "https://schemas.identity.wso2.org/events/session/event-type/sessionRevoked": {
      "user": {
        "id": "1801d35e-1339-4c16-9c53-61321cf37fb9",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/1801d35e-1339-4c16-9c53-61321cf37fb9"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "sessions": [
        {
          "id": "68d1f2861461c69d8e821d91839bbf8e23ef04fb96c1ac655f452d94d1fd6e4d",
          "loginTime": 1755541961792,
          "applications": [
            {
              "id": "eb395ddd-1280-46e9-98fb-810948c1dab4",
              "name": "Test App"
            }
          ]
        }
      ]
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a session revocation, identified by the URI <code>https://schemas.identity.wso2.org/events/session/event-type/sessionRevoked</code>. This URI signifies a session revocation event.

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
<td><p>Contains information about the user whose sessions get revoked.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processes the session revocation.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processes the session revocation.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>sessions</td>
<td>
<p>Array of revoked sessions. Each session contains:</p>
<ul>
<li><strong>id</strong>: Unique identifier for the revoked session</li>
<li><strong>loginTime</strong>: Timestamp when the session originally started</li>
<li><strong>applications</strong>: Array of applications that lost access due to session revocation</li>
</ul>
</td>
</tr>
</tbody>
</table>

## Credential update events

{{product_name}} sends a <code>credentialUpdated</code> event when a user successfully updates credential information. This event currently triggers only for password updates.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "24fc890a-41c5-4397-9cc9-b9f48102384e",
  "iat": 1751566637663,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/credential/event-type/credentialUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
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

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "24fc890a-41c5-4397-9cc9-b9f48102384e",
  "iat": 1751566637663,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/credential/event-type/credentialUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
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

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processed the credential update.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>credentialType</td>
<td><p>Shows which credential the user updates. Currently shows "PASSWORD" as events trigger only for password updates.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the password update. Refer to <a href="#initiatorType-and-action-credential-update"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates whether the password update uses a reset flow, update flow, or invite flow. Refer to <a href="#initiatorType-and-action-credential-update"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
</tbody>
</table>

<a name="initiatorType-and-action-credential-update"></a>

### <code>initiatorType</code> and <code>action</code> properties for credential update events

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
{% elif product_name == "WSO2 Identity Platform" %}
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

### User created event

{{product_name}} sends a <code>userCreated</code> event when a new user account gets created in the system.

This event triggers when administrators, applications, or users create accounts through various flows like direct registration, invitations, or automated provisioning.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "b6148a40-9e3c-45c4-b57d-85c7da482ad5",
  "iat": 1755618921154,
  "rci": "dca8d1d5-5a8f-4141-aac6-2abcb27fd168",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userCreated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "3987d74e-8432-4f4d-b1a8-cad463af843d",
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
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/3987d74e-8432-4f4d-b1a8-cad463af843d"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "REGISTER"
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "b6148a40-9e3c-45c4-b57d-85c7da482ad5",
  "iat": 1755618921154,
  "rci": "dca8d1d5-5a8f-4141-aac6-2abcb27fd168",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userCreated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "3987d74e-8432-4f4d-b1a8-cad463af843d",
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
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/3987d74e-8432-4f4d-b1a8-cad463af843d"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "REGISTER"
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a user creation, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userCreated</code>. This URI signifies a successful user creation event.

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
<td><p>Contains information about the newly created user including user claims and organization details.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the user creation.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the user creation.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the user creation.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>Shows the user creation flow type. Can have values like <code>REGISTER</code> for direct registration or <code>INVITE</code> for invitation-based creation.</p></td>
</tr>
</tbody>
</table>

### User profile updated event

{{product_name}} sends a <code>userProfileUpdated</code> event when a user updates profile information.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "2371a91d-66e8-400b-a8de-6e8ee2b8175e",
  "iat": 1751569642578,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userProfileUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
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
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
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

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "2371a91d-66e8-400b-a8de-6e8ee2b8175e",
  "iat": 1751569642578,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userProfileUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b",
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
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
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

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processed the profile update.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator, user, or application initiated the profile update.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
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

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "d32b6be7-1675-4e7d-b118-7346ad53c046",
  "iat": 1751570468806,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userDisabled": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "d32b6be7-1675-4e7d-b118-7346ad53c046",
  "iat": 1751570468806,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userDisabled": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processed the user disablement.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the user disablement.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
</tbody>
</table>

### User enabled event

{{product_name}} sends a <code>userEnabled</code> event when a user account gets enabled. This event signifies that a previously disabled user account becomes reactivated.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "285a876f-ea57-47b6-9a9d-fc452a04413a",
  "iat": 1751570713348,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userEnabled": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "285a876f-ea57-47b6-9a9d-fc452a04413a",
  "iat": 1751570713348,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userEnabled": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "85071750-3d1f-4ba4-b58f-991532e2742b",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/85071750-3d1f-4ba4-b58f-991532e2742b"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processed the user enablement.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the user enablement.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
</tbody>
</table>

### User account locked event

{{product_name}} sends a <code>userAccountLocked</code> event when a user account gets locked.

This event triggers when accounts get locked due to failed login attempts, administrative action, or security policies. Locked accounts prevent users from authenticating until unlocked.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "5ab9d903-a718-4e71-9a16-314203f02778",
  "iat": 1755619049121,
  "rci": "24b22c09-ae39-4942-896f-5c14fd18b4e0",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userAccountLocked": {
      "user": {
        "id": "3987d74e-8432-4f4d-b1a8-cad463af843d",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "johndoe@aol.com"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/3987d74e-8432-4f4d-b1a8-cad463af843d"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "5ab9d903-a718-4e71-9a16-314203f02778",
  "iat": 1755619049121,
  "rci": "24b22c09-ae39-4942-896f-5c14fd18b4e0",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userAccountLocked": {
      "user": {
        "id": "3987d74e-8432-4f4d-b1a8-cad463af843d",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "johndoe@aol.com"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/3987d74e-8432-4f4d-b1a8-cad463af843d"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a user account locked event, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userAccountLocked</code>. This URI signifies a user account lock event.

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
<td><p>Contains information about the user whose account got locked.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the account locking.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the account locking.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
</tbody>
</table>

### User account unlocked event

{{product_name}} sends a <code>userAccountUnlocked</code> event when a user account gets unlocked.

This event triggers when locked accounts get restored to normal status through administrative action or automatic timeout policies. Unlocked accounts allow users to authenticate again.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "7bf8f4ce-816e-46a2-8964-99682ece9084",
  "iat": 1755619053135,
  "rci": "e26aade5-ad74-4e5f-a98b-762bd218197e",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userAccountUnlocked": {
      "user": {
        "id": "3987d74e-8432-4f4d-b1a8-cad463af843d",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "johndoe@aol.com"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/3987d74e-8432-4f4d-b1a8-cad463af843d"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "7bf8f4ce-816e-46a2-8964-99682ece9084",
  "iat": 1755619053135,
  "rci": "e26aade5-ad74-4e5f-a98b-762bd218197e",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userAccountUnlocked": {
      "user": {
        "id": "3987d74e-8432-4f4d-b1a8-cad463af843d",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "johndoe@aol.com"
          }
        ],
        "organization": {
          "id": "10084a8d-113f-4211-a0d5-efe36b082211",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/3987d74e-8432-4f4d-b1a8-cad463af843d"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a user account unlocked event, identified by the URI <code>https://schemas.identity.wso2.org/events/user/event-type/userAccountUnlocked</code>. This URI signifies a user account unlock event.

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
<td><p>Contains information about the user whose account got unlocked.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the account unlocking.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the account unlocking.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
</tbody>
</table>

### User deleted event

{{product_name}} sends a <code>userDeleted</code> event when a user account gets deleted.

**Example Payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "21f03016-632d-4266-9e8b-8863001109f2",
  "iat": 1751571143534,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userDeleted": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "0bd61ecd-e974-41e6-a962-8b712090240f",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg",
          "depth": 0
        },
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/0bd61ecd-e974-41e6-a962-8b712090240f"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "21f03016-632d-4266-9e8b-8863001109f2",
  "iat": 1751571143534,
  "rci": "05268edb-9a87-4656-87c0-0fb674dd03b1",
  "events": {
    "https://schemas.identity.wso2.org/events/user/event-type/userDeleted": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "203.0.113.10",
      "user": {
        "id": "0bd61ecd-e974-41e6-a962-8b712090240f",
        "claims": [
          {
            "uri": "http://wso2.org/claims/username",
            "value": "peter@aol.com"
          }
        ],
        "organization": {
          "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
          "name": "myorg",
          "orgHandle": "myorg.com",
          "depth": 0
        },
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/0bd61ecd-e974-41e6-a962-8b712090240f"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "6f8d17ae-1ad5-441b-b9e0-c7731e739e94",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

{% endif %}

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
<td>organization</td>
<td><p>Represents the organization that processed the user deletion.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that managed the user's data.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the user deletion.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
</tbody>
</table>

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version >= "7.4.0") %}

## Role management events

{{product_name}} dispatches webhook events for role lifecycle changes and role assignment updates. Each event provides detailed context, helping you keep external systems in sync with your role definitions, memberships, and permissions.

### Role created event

{{product_name}} sends a <code>roleCreated</code> event when a new role gets created.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "9befa02f-6977-472a-8450-09c391b6ba45",
  "iat": 1783322160021,
  "rci": "accdbb61-d005-41ab-8760-58fd7a539bf9",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/roleCreated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "ROLE_CREATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        },
        "ref": "{{host_url}}/scim2/v2/Roles/1fad5996-3418-4883-925d-a319e3bb8e72",
        "users": [
          {
            "id": "6c7f23d9-8083-4bf7-ab2c-885aa9faa186",
            "userStoreDomain": "{{userstore_domain}}",
            "claims": [
              {
                "uri": "http://wso2.org/claims/username",
                "value": "abcuser"
              }
            ]
          }
        ],
        "groups": [
          {
            "id": "da2aeb94-aebf-4846-b611-1865cf85aea5",
            "groupName": "sales",
            "userStoreDomain": "{{userstore_domain}}"
          }
        ],
        "permissions": [
          "internal_session_view"
        ]
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role creation, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/roleCreated</code>. This URI signifies a successful role creation event.

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
<td>role</td>
<td>
<p>Contains details about the created role including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the role</li>
<li><strong>name</strong>: Display name of the role</li>
<li><strong>audience</strong>: The audience the role is scoped to. Contains <code>type</code>, <code>value</code>, and <code>display</code>, where <code>type</code> is either <code>organization</code> or <code>application</code>. For an organization-scoped role, <code>value</code> is the organization id and <code>display</code> is the organization name. For an application-scoped role, <code>value</code> is the application id and <code>display</code> is the application name.</li>
<li><strong>ref</strong>: SCIM v2 reference URL for the role</li>
<li><strong>users</strong>: Array of users assigned to the role at creation. Present only when the role is created with users. Each entry contains the user <code>id</code>, <code>userStoreDomain</code>, and <code>claims</code>.</li>
<li><strong>groups</strong>: Array of local groups assigned to the role at creation. Present only when the role is created with groups. Each entry contains the group <code>id</code>, <code>groupName</code>, and <code>userStoreDomain</code>.</li>
<li><strong>permissions</strong>: Array of permission names granted to the role at creation. Present only when the role is created with permissions.</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the role gets created.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the role gets created.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role creation.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates the flow that triggered the event. The value is <code>ROLE_CREATE</code> for a role creation.</p></td>
</tr>
</tbody>
</table>

### Role metadata updated event

{{product_name}} sends a <code>roleMetaUpdated</code> event when role metadata (for example the role name) gets updated.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "cead6c7f-a38c-4752-9485-56af37c1db5f",
  "iat": 1783322212811,
  "rci": "ad969f38-830c-41e7-b4c1-6f5544544921",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/roleMetaUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "ROLE_UPDATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE-updated",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        },
        "ref": "{{host_url}}/scim2/v2/Roles/1fad5996-3418-4883-925d-a319e3bb8e72"
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role metadata update, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/roleMetaUpdated</code>. This URI signifies a role metadata update event.

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
<td>role</td>
<td>
<p>Contains details about the updated role including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the role</li>
<li><strong>name</strong>: Current display name of the role after the update</li>
<li><strong>audience</strong>: The audience the role is scoped to (<code>type</code>, <code>value</code>, <code>display</code>).</li>
<li><strong>ref</strong>: SCIM v2 reference URL for the role</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the role metadata update.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the role metadata update.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role metadata update.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates the flow that triggered the event. The value is <code>ROLE_UPDATE</code> for a role update.</p></td>
</tr>
</tbody>
</table>

### Role deleted event

{{product_name}} sends a <code>roleDeleted</code> event when a role gets deleted.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "361f4c4c-e35e-43bb-a52d-864a4b659f2f",
  "iat": 1783322224574,
  "rci": "90b7008c-50f5-411e-b2fe-f67b1b632d77",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/roleDeleted": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "APPLICATION_UPDATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        }
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role deletion, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/roleDeleted</code>. This URI signifies a role deletion event.

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
<td>role</td>
<td>
<p>Contains details about the deleted role including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the deleted role</li>
<li><strong>name</strong>: Display name of the deleted role</li>
<li><strong>audience</strong>: The audience the role is scoped to (<code>type</code>, <code>value</code>, <code>display</code>).</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the role deletion.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the role deletion.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role deletion.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates what triggered the role deletion. The value is <code>ROLE_DELETE</code> when an administrator deletes a role directly, <code>APPLICATION_UPDATE</code> when a role is removed from an application's Roles section, and <code>APPLICATION_DELETE</code> when the role is deleted as part of application deletion. Refer to <a href="#initiatorType-and-action-role"><code>initiatorType</code> and <code>action</code> properties</a> for details.</p></td>
</tr>
</tbody>
</table>

### Role users updated event

{{product_name}} sends a <code>roleUsersUpdated</code> event when users get assigned to or unassigned from a role.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "09a24bef-04f2-407a-a061-e851d0a8d581",
  "iat": 1783322202677,
  "rci": "1bab73e8-d1fe-4469-89fc-41488aa718fb",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/roleUsersUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "ROLE_UPDATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        },
        "ref": "{{host_url}}/scim2/v2/Roles/1fad5996-3418-4883-925d-a319e3bb8e72",
        "removedUsers": [
          {
            "id": "6c7f23d9-8083-4bf7-ab2c-885aa9faa186",
            "userStoreDomain": "{{userstore_domain}}",
            "claims": [
              {
                "uri": "http://wso2.org/claims/username",
                "value": "abcuser"
              }
            ]
          }
        ],
        "addedUsers": [
          {
            "id": "311b60cf-da6f-4378-8cd1-31e3e7026f4d",
            "userStoreDomain": "AGENT",
            "claims": [
              {
                "uri": "http://wso2.org/claims/username",
                "value": "311b60cf-da6f-4378-8cd1-31e3e7026f4d"
              },
              {
                "uri": "http://wso2.org/claims/agent/Name",
                "value": "NewAgent"
              }
            ]
          }
        ]
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role user assignment update, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/roleUsersUpdated</code>. This URI signifies a role user assignment update event.

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
<td>role</td>
<td>
<p>Contains details about the role whose user assignments got updated, including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the role</li>
<li><strong>name</strong>: Display name of the role</li>
<li><strong>audience</strong>: The audience the role is scoped to (<code>type</code>, <code>value</code>, <code>display</code>).</li>
<li><strong>ref</strong>: SCIM v2 reference URL for the role</li>
<li><strong>addedUsers</strong>: Array of users assigned to the role in this update. Each entry contains the user <code>id</code>, <code>userStoreDomain</code>, and <code>claims</code>.</li>
<li><strong>removedUsers</strong>: Array of users unassigned from the role in this update. Each entry contains the user <code>id</code>, <code>userStoreDomain</code>, and <code>claims</code>.</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the role user assignment update.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the role user assignment update.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role user assignment update.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates the flow that triggered the event. The value is <code>ROLE_UPDATE</code> for a role update.</p></td>
</tr>
</tbody>
</table>

### Role groups updated event

{{product_name}} sends a <code>roleGroupsUpdated</code> event when local groups get assigned to or unassigned from a role.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "be85978e-5ac6-48a1-ae54-24c292f1f3c3",
  "iat": 1783322195097,
  "rci": "fd338a56-569b-4b1f-a9e3-9bffade3b481",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/roleGroupsUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "ROLE_UPDATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        },
        "ref": "{{host_url}}/scim2/v2/Roles/1fad5996-3418-4883-925d-a319e3bb8e72",
        "removedGroups": [
          {
            "id": "da2aeb94-aebf-4846-b611-1865cf85aea5",
            "groupName": "sales",
            "userStoreDomain": "{{userstore_domain}}"
          }
        ],
        "addedGroups": [
          {
            "id": "da2aeb94-aebf-4846-b611-1865cf85aea5",
            "groupName": "sales",
            "userStoreDomain": "{{userstore_domain}}"
          }
        ]
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role group assignment update, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/roleGroupsUpdated</code>. This URI signifies a role group assignment update event.

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
<td>role</td>
<td>
<p>Contains details about the role whose group assignments got updated, including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the role</li>
<li><strong>name</strong>: Display name of the role</li>
<li><strong>audience</strong>: The audience the role is scoped to (<code>type</code>, <code>value</code>, <code>display</code>).</li>
<li><strong>ref</strong>: SCIM v2 reference URL for the role</li>
<li><strong>addedGroups</strong>: Array of local groups assigned to the role in this update. Each entry contains the group <code>id</code>, <code>groupName</code>, and <code>userStoreDomain</code>.</li>
<li><strong>removedGroups</strong>: Array of local groups unassigned from the role in this update. Each entry contains the group <code>id</code>, <code>groupName</code>, and <code>userStoreDomain</code>.</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the role group assignment update.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the role group assignment update.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role group assignment update.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates the flow that triggered the event. The value is <code>ROLE_UPDATE</code> for a role update.</p></td>
</tr>
</tbody>
</table>

### Role IdP groups updated event

{{product_name}} sends a <code>roleIdpGroupsUpdated</code> event when federated identity provider (IdP) groups get assigned to or unassigned from a role.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "d443cbd9-82c5-4397-8d2d-b1b143f13905",
  "iat": 1783322195104,
  "rci": "fd338a56-569b-4b1f-a9e3-9bffade3b481",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/roleIdpGroupsUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "ROLE_UPDATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        },
        "ref": "{{host_url}}/scim2/v2/Roles/1fad5996-3418-4883-925d-a319e3bb8e72",
        "addedIdpGroups": [
          {
            "groupId": "7ae41d10-e4a1-4ed8-adc2-8644872b8783",
            "groupName": "idpgroup1",
            "idpId": "8ef35e33-b4dc-444f-8d71-3ff32e44cca9",
            "idpName": "IDP"
          }
        ]
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role IdP group assignment update, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/roleIdpGroupsUpdated</code>. This URI signifies a role IdP group assignment update event.

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
<td>role</td>
<td>
<p>Contains details about the role whose IdP group assignments got updated, including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the role</li>
<li><strong>name</strong>: Display name of the role</li>
<li><strong>audience</strong>: The audience the role is scoped to (<code>type</code>, <code>value</code>, <code>display</code>).</li>
<li><strong>ref</strong>: SCIM v2 reference URL for the role</li>
<li><strong>addedIdpGroups</strong>: Array of federated IdP groups assigned to the role. Each entry contains <code>groupId</code>, <code>groupName</code>, <code>idpId</code>, and <code>idpName</code>.</li>
<li><strong>removedIdpGroups</strong>: Array of federated IdP groups unassigned from the role. Each entry contains <code>groupId</code>, <code>groupName</code>, <code>idpId</code>, and <code>idpName</code>.</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the role IdP group assignment update.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the role IdP group assignment update.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role IdP group assignment update.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates the flow that triggered the event. The value is <code>ROLE_UPDATE</code> for a role update.</p></td>
</tr>
</tbody>
</table>

### Role permissions updated event

{{product_name}} sends a <code>rolePermissionsUpdated</code> event when permissions get granted to or revoked from a role.

**Example payload:**

```json
{
  "iss": "{{server_url}}",
  "jti": "99ea2226-328e-4b60-bc8d-4d72028267e8",
  "iat": 1783322187274,
  "rci": "c607ec61-8bcc-4f2c-8b21-064f3774fdd4",
  "events": {
    "https://schemas.identity.wso2.org/events/role/event-type/rolePermissionsUpdated": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "{{tenant_domain}}"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "{{tenant_domain}}",
        "depth": 0
      },
      "action": "ROLE_UPDATE",
      "role": {
        "id": "1fad5996-3418-4883-925d-a319e3bb8e72",
        "name": "ROLE",
        "audience": {
          "type": "application",
          "value": "6db0975b-9f7c-42d1-a8b4-895a77d23cff",
          "display": "Sample Application"
        },
        "ref": "{{host_url}}/scim2/v2/Roles/1fad5996-3418-4883-925d-a319e3bb8e72",
        "addedPermissions": [
          "internal_session_delete"
        ],
        "removedPermissions": [
          "internal_session_view"
        ]
      }
    }
  }
}
```

The <code>events</code> object contains the actual event data for a role permission update, identified by the URI <code>https://schemas.identity.wso2.org/events/role/event-type/rolePermissionsUpdated</code>. This URI signifies a role permission update event.

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
<td>role</td>
<td>
<p>Contains details about the role whose permissions got updated, including:</p>
<ul>
<li><strong>id</strong>: Unique identifier of the role</li>
<li><strong>name</strong>: Display name of the role</li>
<li><strong>audience</strong>: The audience the role is scoped to (<code>type</code>, <code>value</code>, <code>display</code>).</li>
<li><strong>ref</strong>: SCIM v2 reference URL for the role</li>
<li><strong>addedPermissions</strong>: Array of permission names granted to the role in this update.</li>
<li><strong>removedPermissions</strong>: Array of permission names revoked from the role in this update.</li>
</ul>
</td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) that processed the role permission update.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization that processed the role permission update.</p></td>
</tr>
<tr class="even">
<td>initiatorType</td>
<td><p>Indicates whether an administrator or application initiated the role permission update.</p></td>
</tr>
<tr class="odd">
<td>initiatorIpAddress</td>
<td><p>Indicates the IP address of the initiator that triggered the event.</p></td>
</tr>
<tr class="even">
<td>action</td>
<td><p>Indicates the flow that triggered the event. The value is <code>ROLE_UPDATE</code> for a role update.</p></td>
</tr>
</tbody>
</table>

<a name="initiatorType-and-action-role"></a>

### <code>initiatorType</code> and <code>action</code> properties for role management events

The initiatorType and the action property together show which flow triggered a role management event.

The table below explains how these properties differ based on each flow.

<table>
<thead>
<tr class="header">
<th>Event</th>
<th>Flow</th>
<th>Value of <code>initiatorType</code></th>
<th>Value of <code>action</code></th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>roleCreated</code></td>
<td>Admin initiated role creation</td>
<td>ADMIN</td>
<td>ROLE_CREATE</td>
<td><p>Occurs when an administrator creates a role via the console or SCIM 2.0 Roles API.</p></td>
</tr>
<tr class="even">
<td><code>roleCreated</code></td>
<td>Application initiated role creation</td>
<td>APPLICATION</td>
<td>ROLE_CREATE</td>
<td><p>Occurs when an application with appropriate permissions creates a role via the SCIM 2.0 Roles API.</p></td>
</tr>
<tr class="odd">
<td><code>roleMetaUpdated</code>, <code>roleUsersUpdated</code>, <code>roleGroupsUpdated</code>, <code>roleIdpGroupsUpdated</code>, <code>rolePermissionsUpdated</code></td>
<td>Admin initiated role update</td>
<td>ADMIN</td>
<td>ROLE_UPDATE</td>
<td><p>Occurs when an administrator updates a role's metadata, users, groups, IdP groups, or permissions via the console or SCIM 2.0 Roles API.</p></td>
</tr>
<tr class="even">
<td><code>roleMetaUpdated</code>, <code>roleUsersUpdated</code>, <code>roleGroupsUpdated</code>, <code>roleIdpGroupsUpdated</code>, <code>rolePermissionsUpdated</code></td>
<td>Application initiated role update</td>
<td>APPLICATION</td>
<td>ROLE_UPDATE</td>
<td><p>Occurs when an application with appropriate permissions updates a role via the SCIM 2.0 Roles API.</p></td>
</tr>
<tr class="odd">
<td><code>roleUsersUpdated</code></td>
<td>Role user update via an adaptive authentication script</td>
<td>USER</td>
<td>LOGIN</td>
<td><p>Occurs when an adaptive authentication script updates a user's role assignments during the login flow.</p></td>
</tr>
<tr class="even">
<td><code>roleUsersUpdated</code></td>
<td>Role user assignment during self-registration</td>
<td>USER</td>
<td>REGISTER</td>
<td><p>Occurs when a user's role assignments change during the self-registration flow.</p></td>
</tr>
<tr class="odd">
<td><code>roleDeleted</code></td>
<td>Direct role deletion</td>
<td>ADMIN</td>
<td>ROLE_DELETE</td>
<td><p>Occurs when an administrator deletes a role directly via the console or SCIM 2.0 Roles API.</p></td>
</tr>
<tr class="even">
<td><code>roleDeleted</code></td>
<td>Role removed from an application</td>
<td>ADMIN</td>
<td>APPLICATION_UPDATE</td>
<td><p>Occurs when a role is removed from an application's Roles section.</p></td>
</tr>
<tr class="odd">
<td><code>roleDeleted</code></td>
<td>Role deleted with its application</td>
<td>ADMIN</td>
<td>APPLICATION_DELETE</td>
<td><p>Occurs when a role is deleted as part of application deletion.</p></td>
</tr>
</tbody>
</table>

{% endif %}

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version >= "7.4.0") %}

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}
!!! note "Enable consent webhook events"
    Consent webhook events are disabled by default. See [Prerequisites]({{base_path}}/guides/consent-management/#prerequisites) for the required `deployment.toml` configurations to enable them.
{% endif %}

## Consent events

{{product_name}} dispatches webhook events when users add or revoke consents for purposes. These events allow third-party providers (TPPs) and downstream systems to react to consent state changes in real time.

### Consent added event

{{product_name}} sends a <code>consentAdded</code> event when a user approves a consent for a purpose. This can occur during user registration or during the login flow.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "8c695b00-d165-466d-ab20-770aa43ec4da",
  "iat": 1782900901608,
  "rci": "8cccc58f-ecb1-46da-a825-707f6740b8ea",
  "events": {
    "https://schemas.identity.wso2.org/events/consent/event-type/consentAdded": {
      "initiatorType": "USER",
      "initiatorIpAddress": "127.0.0.1",
      "user": {
        "id": "60ed468b-a357-405c-aad2-2ce6960ec2aa",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/60ed468b-a357-405c-aad2-2ce6960ec2aa"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "REGISTER",
      "consent": {
        "id": "501a6ba7-0b15-4ae6-9642-03b5267ab996",
        "subjectId": "peter",
        "state": "APPROVED",
        "serviceId": "Resident IDP",
        "purpose": {
          "id": "909eea3e-5bf1-4106-a5b8-44580fc4ae74",
          "name": "Marketing Consent",
          "version": "12a53d28-4536-4201-939e-5e5c00eadf7b",
          "elements": [
            {
              "name": "Policy"
            }
          ]
        }
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "8c695b00-d165-466d-ab20-770aa43ec4da",
  "iat": 1782900901608,
  "rci": "8cccc58f-ecb1-46da-a825-707f6740b8ea",
  "events": {
    "https://schemas.identity.wso2.org/events/consent/event-type/consentAdded": {
      "initiatorType": "USER",
      "initiatorIpAddress": "127.0.0.1",
      "user": {
        "id": "60ed468b-a357-405c-aad2-2ce6960ec2aa",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/60ed468b-a357-405c-aad2-2ce6960ec2aa"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "REGISTER",
      "consent": {
        "id": "501a6ba7-0b15-4ae6-9642-03b5267ab996",
        "subjectId": "peter",
        "state": "APPROVED",
        "serviceId": "Resident IDP",
        "purpose": {
          "id": "909eea3e-5bf1-4106-a5b8-44580fc4ae74",
          "name": "Marketing Consent",
          "version": "12a53d28-4536-4201-939e-5e5c00eadf7b",
          "elements": [
            {
              "name": "Policy"
            }
          ]
        }
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a consent addition, identified by the URI <code>https://schemas.identity.wso2.org/events/consent/event-type/consentAdded</code>. This URI signifies a user consent approval event.

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
<td>initiatorType</td>
<td><p>Indicates whether a user or an administrator initiated the consent approval.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>The IP address of the client that triggered the consent approval.</p></td>
</tr>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user who approved the consent.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the consent gets approved.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the consent gets approved.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>Indicates the flow that triggered the consent approval. Refer to <a href="#consent-initiatortype-and-action">initiatorType and action properties</a> for details.</p></td>
</tr>
<tr class="even">
<td>consent</td>
<td>
<p>Contains details about the approved consent including:</p>
<ul>
<li><strong>id</strong>: Unique identifier for the consent record</li>
<li><strong>subjectId</strong>: Username of the user to whom the consent applies</li>
<li><strong>state</strong>: Current state of the consent (for example <code>APPROVED</code>)</li>
<li><strong>serviceId</strong>: The service or application for which the consent is granted</li>
<li><strong>purpose</strong>: Details of the consent purpose including:
<ul>
<li><strong>id</strong>: Unique identifier of the consent purpose</li>
<li><strong>name</strong>: Human-readable name of the consent purpose</li>
<li><strong>version</strong>: The UUID of the specific purpose version the user consented to</li>
<li><strong>elements</strong>: Array of PII categories covered by the consent, each with a <strong>name</strong></li>
</ul>
</li>
</ul>
</td>
</tr>
</tbody>
</table>

### Consent revoked event

{{product_name}} sends a <code>consentRevoked</code> event when a user revokes an approved consent for a purpose.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "6d43b40a-18f6-48ee-8592-d85d9f005452",
  "iat": 1782901275789,
  "rci": "7dadc7c2-9584-48e1-92e5-afa64a2630a6",
  "events": {
    "https://schemas.identity.wso2.org/events/consent/event-type/consentRevoked": {
      "initiatorType": "USER",
      "initiatorIpAddress": "127.0.0.1",
      "user": {
        "id": "60ed468b-a357-405c-aad2-2ce6960ec2aa",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://api.asgardeo.io/t/myorg/scim2/Users/60ed468b-a357-405c-aad2-2ce6960ec2aa"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "CONSENT_REVOKE",
      "consent": {
        "id": "501a6ba7-0b15-4ae6-9642-03b5267ab996",
        "subjectId": "peter",
        "state": "REVOKED",
        "serviceId": "Resident IDP",
        "purpose": {
          "id": "909eea3e-5bf1-4106-a5b8-44580fc4ae74",
          "name": "Marketing Consent",
          "version": "12a53d28-4536-4201-939e-5e5c00eadf7b",
          "elements": [
            {
              "name": "Policy"
            }
          ]
        }
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "6d43b40a-18f6-48ee-8592-d85d9f005452",
  "iat": 1782901275789,
  "rci": "7dadc7c2-9584-48e1-92e5-afa64a2630a6",
  "events": {
    "https://schemas.identity.wso2.org/events/consent/event-type/consentRevoked": {
      "initiatorType": "USER",
      "initiatorIpAddress": "127.0.0.1",
      "user": {
        "id": "60ed468b-a357-405c-aad2-2ce6960ec2aa",
        "claims": [
          {
            "uri": "http://wso2.org/claims/emailaddress",
            "value": "peter@aol.com"
          }
        ],
        "ref": "https://localhost:9443/t/myorg.com/scim2/Users/60ed468b-a357-405c-aad2-2ce6960ec2aa"
      },
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      },
      "action": "CONSENT_REVOKE",
      "consent": {
        "id": "501a6ba7-0b15-4ae6-9642-03b5267ab996",
        "subjectId": "peter",
        "state": "REVOKED",
        "serviceId": "Resident IDP",
        "purpose": {
          "id": "909eea3e-5bf1-4106-a5b8-44580fc4ae74",
          "name": "Marketing Consent",
          "version": "12a53d28-4536-4201-939e-5e5c00eadf7b",
          "elements": [
            {
              "name": "Policy"
            }
          ]
        }
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a consent revocation, identified by the URI <code>https://schemas.identity.wso2.org/events/consent/event-type/consentRevoked</code>. This URI signifies a user consent revocation event.

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
<td>initiatorType</td>
<td><p>Indicates whether a user or an administrator initiated the consent revocation.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>The IP address of the client that triggered the consent revocation.</p></td>
</tr>
<tr class="odd">
<td>user</td>
<td><p>Contains information about the user whose consent gets revoked.</p></td>
</tr>
<tr class="even">
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the consent gets revoked.</p></td>
</tr>
<tr class="odd">
<td>organization</td>
<td><p>Represents the organization under which the consent gets revoked.</p></td>
</tr>
<tr class="even">
<td>userStore</td>
<td><p>Indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>Indicates the flow that triggered the consent revocation. Refer to <a href="#consent-initiatortype-and-action">initiatorType and action properties</a> for details.</p></td>
</tr>
<tr class="even">
<td>consent</td>
<td>
<p>Contains details about the revoked consent including:</p>
<ul>
<li><strong>id</strong>: Unique identifier for the consent record</li>
<li><strong>subjectId</strong>: Username of the user to whom the consent applies</li>
<li><strong>state</strong>: Current state of the consent (for example <code>REVOKED</code>)</li>
<li><strong>serviceId</strong>: The service or application for which the consent was granted</li>
<li><strong>purpose</strong>: Details of the consent purpose including:
<ul>
<li><strong>id</strong>: Unique identifier of the consent purpose</li>
<li><strong>name</strong>: Human-readable name of the consent purpose</li>
<li><strong>version</strong>: The UUID of the specific purpose version the user had consented to</li>
<li><strong>elements</strong>: Array of PII categories covered by the consent, each with a <strong>name</strong></li>
</ul>
</li>
</ul>
</td>
</tr>
</tbody>
</table>

<a name="consent-initiatortype-and-action"></a>

### <code>initiatorType</code> and <code>action</code> properties

The <code>initiatorType</code> and <code>action</code> properties together identify the flow that triggered a consent event.

<table>
<thead>
<tr class="header">
<th>Webhook event</th>
<th>Flow</th>
<th>Value of <code>initiatorType</code></th>
<th>Value of <code>action</code></th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td rowspan="4">Consent added</td>
<td>Self-registration flow</td>
<td>USER</td>
<td>REGISTER</td>
<td><p>Occurs when a user approves a consent purpose during the self-registration flow.</p></td>
</tr>
<tr class="even">
<td>Login flow</td>
<td>USER</td>
<td>LOGIN</td>
<td><p>Occurs when a user approves a consent purpose during the login flow (for example, when a new consent version requires re-approval at login).</p></td>
</tr>
<tr class="odd">
<td>User consent via Consent API</td>
<td>USER</td>
<td>CONSENT_GRANT</td>
<td><p>Occurs when a user grants or authorizes a consent directly through the Consent API.</p></td>
</tr>
<tr class="even">
<td>Administrator consent creation via Consent API</td>
<td>ADMIN</td>
<td>CONSENT_CREATE</td>
<td><p>Occurs when an administrator creates a consent on behalf of a user through the Consent API.</p></td>
</tr>
<tr class="odd">
<td rowspan="2">Consent revoked</td>
<td>User consent revocation via Consent API</td>
<td>USER</td>
<td>CONSENT_REVOKE</td>
<td><p>Occurs when a user revokes their own consent through the Consent API (for example, from the My Account portal).</p></td>
</tr>
<tr class="even">
<td>Administrator consent revocation via Consent API</td>
<td>ADMIN</td>
<td>CONSENT_REVOKE</td>
<td><p>Occurs when an administrator revokes a consent on behalf of a user through the Consent API.</p></td>
</tr>
</tbody>
</table>

## Consent purpose events

{{product_name}} dispatches webhook events when a new version gets added to an existing consent purpose. These events let you notify users who have already approved a purpose that they need to review and re-approve the updated version.

### Purpose version added event

{{product_name}} sends a <code>purposeVersionAdded</code> event when an administrator adds a new version to an existing consent purpose.

**Example payload:**

{% if product_name == "WSO2 Identity Platform" %}

```json
{
  "iss": "https://api.asgardeo.io/t/myorg",
  "jti": "8745b363-ed05-4c24-a202-3d2c062bec6b",
  "iat": 1782900735216,
  "rci": "5e62a3ec-96ac-472b-824c-3def154c5edc",
  "events": {
    "https://schemas.identity.wso2.org/events/consent-purpose/event-type/purposeVersionAdded": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "myorg"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg",
        "depth": 0
      },
      "action": "PURPOSE_UPDATE",
      "purpose": {
        "id": "909eea3e-5bf1-4106-a5b8-44580fc4ae74",
        "name": "Marketing Consent",
        "version": {
          "version": "2",
          "setAsLatest": true,
          "elements": [
            {
              "name": "Policy",
              "mandatory": false
            }
          ]
        }
      }
    }
  }
}
```

{% else %}

```json
{
  "iss": "https://localhost:9443/t/myorg.com",
  "jti": "8745b363-ed05-4c24-a202-3d2c062bec6b",
  "iat": 1782900735216,
  "rci": "5e62a3ec-96ac-472b-824c-3def154c5edc",
  "events": {
    "https://schemas.identity.wso2.org/events/consent-purpose/event-type/purposeVersionAdded": {
      "initiatorType": "ADMIN",
      "initiatorIpAddress": "127.0.0.1",
      "tenant": {
        "id": "12402",
        "name": "myorg.com"
      },
      "organization": {
        "id": "10084a8d-113f-4211-a0d5-efe36b082211",
        "name": "myorg",
        "orgHandle": "myorg.com",
        "depth": 0
      },
      "action": "PURPOSE_UPDATE",
      "purpose": {
        "id": "909eea3e-5bf1-4106-a5b8-44580fc4ae74",
        "name": "Marketing Consent",
        "version": {
          "version": "2",
          "setAsLatest": true,
          "elements": [
            {
              "name": "Policy",
              "mandatory": false
            }
          ]
        }
      }
    }
  }
}
```

{% endif %}

The <code>events</code> object contains the actual event data for a purpose version addition, identified by the URI <code>https://schemas.identity.wso2.org/events/consent-purpose/event-type/purposeVersionAdded</code>. This URI signifies that a new version has been added to a consent purpose.

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
<td>tenant</td>
<td><p>Represents the root organization (tenant) under which the purpose update occurs.</p></td>
</tr>
<tr class="even">
<td>organization</td>
<td><p>Represents the organization under which the purpose update occurs.</p></td>
</tr>
<tr class="odd">
<td>initiatorType</td>
<td><p>Indicates who initiated the purpose update. Currently <code>ADMIN</code> for purpose version additions.</p></td>
</tr>
<tr class="even">
<td>initiatorIpAddress</td>
<td><p>The IP address of the administrator client that triggered the purpose update.</p></td>
</tr>
<tr class="odd">
<td>action</td>
<td><p>The action that triggered the event. Value is <code>PURPOSE_UPDATE</code> for purpose version additions.</p></td>
</tr>
<tr class="even">
<td>purpose</td>
<td>
<p>Contains details about the updated consent purpose including:</p>
<ul>
<li><strong>id</strong>: Unique identifier for the consent purpose</li>
<li><strong>name</strong>: Human-readable name of the consent purpose</li>
<li><strong>version</strong>: Details of the newly added version including:
<ul>
<li><strong>version</strong>: The version number of the new version</li>
<li><strong>setAsLatest</strong>: Whether this version becomes the active version for new consents</li>
<li><strong>elements</strong>: Array of attributes (elements) included in this version, each with a <strong>name</strong> and <strong>mandatory</strong> flag</li>
</ul>
</li>
</ul>
</td>
</tr>
</tbody>
</table>

{% endif %}
