# Configure My Account Application

The **My Account** application can be configured by modifying the `deployment.config.json` file. This file can be found at the root of the app directory (`<IS_HOME>/repository/deployment/server/webapps/myaccount`) in production and in `apps/myaccount/src/public/`  in the dev environment.

By default, the `deployment.config.json` file has the following configurations.

```json
{
    "appBaseName": "myaccount",
    "clientID": "MY_ACCOUNT",
    "loginCallbackPath": "/login",
    "logoutCallbackPath": "/login",
    "productVersion": "5.x.x",
    "routePaths": {
            "home": "/overview",
            "login": "/login",
            "logout": "/logout"
    },
    "extensions": {
    },
    "session": {
                "userIdleWarningTimeOut": 580.0,
                "sessionRefreshTimeOut": 300.0,
                "userIdleTimeOut": 600.0,
                "checkSessionInterval": 3.0
    },
    "ui": {
        "announcements": [
        ],
        "appCopyright": "WSO2 Identity Server",
        "appTitle": "My Account | WSO2 Identity Server",
        "appName": "My Account",
        "appLogoPath": "/assets/images/logo.svg",
        "authenticatorApp": {
                "enabled": true
        },
        "features": {
            "applications": {
                "disabledFeatures": [
                ],
                "enabled": true,
                "scopes": {
                        "create": [],
                        "read": [],
                        "update": [],
                        "delete": []
                }
            },
            "operations": {
                "disabledFeatures": [
                ],
                "enabled": true,
                "scopes": {
                    "create": [
                    ],
                    "read": [
                            "internal_humantask_view"
                    ],
                    "update": [
                    ],
                    "delete": [
                    ]
                }
            },
            "overview": {
                "disabledFeatures": [
                ],
                "enabled": true,
                "scopes": {
                        "create": [],
                        "read": [],
                        "update": [],
                        "delete": []
                }
            },
            "personalInfo": {
                "disabledFeatures": [
                ],
                "enabled": true,
                "scopes": {
                        "create": [],
                        "read": [],
                        "update": [],
                        "delete": []
                }
            },
            "security": {
                "disabledFeatures": [
                ],
                "enabled": true,
                "scopes": {
                        "create": [],
                        "read": [],
                        "update": [],
                        "delete": []
                }
            }
        },
        "productName": "Identity Server",
        "productVersionConfig": {
        },
        "theme": {
            "name": "default"
        }
    }
}
```

!!! note 
	In WSO2 5.11.0 onwards, the **My Account** application is `readonly` by default. To make the callback URLs configurable, add the following configuration to the `deployment.toml` file. 

	```toml
	[system_applications]
	read_only_apps = []
	```
---

## Configure basic settings

The following basic settings can be configured.

|Attribute|Description|Default Value|
|--|--|--|
`appBaseName`|The name of the app as it should appear in the URL. For instance, with the default `appBaseName`, the app can be accessed via `https://localhost:9443/myaccount/` |"myaccount"|
|`clientID`| This is the client ID of the application in WSO2 Identity Server.| `MY_ACCOUNT`|
|`loginCallbackPath`|This is the URL to which the user should be redirected to after user authentication. |`login`|
|`logoutCallbackPath`|This is the URL to which the user should be redirected to after the user is logged out. | `login`|
|`serverOrigin`|This is the original server URL of WSO2 Identity Server. | `https://localhost:9443`|

---

## Customize My Account
 
The **My Account** application can be customized to be consistent with the branding of the business. The following attributes under the `ui` attribute can be modified to brand the **My Account** application.

|Attribute|Description|Default Value|
|--|--|--|
|`productName`|This is the name of the organization and is displayed in the app header next to the logo.|WSO2 Identity Server|
|`appCopyright`| This is the copyright information that is displayed in the footer of the application.| WSO2 Identity Server|
|`appTitle`|This is the `HTML` title of the application. This is the name that appears in the browser tab.|My Account|
|`appName`| This is the name of the application and it appears in the header following the name of the organization.|My Account|
|`appLogoPath`| This is the path of the logo that is displayed in the header. The logo of the application can be changed by assigning the path of a custom logo to this attribute.|/assets/images/logo.svg|

---

## Change the theme of the application

Custom themes can be applied to the **My Account** application. Once a theme is created, the one that the application should use can be specified by configuring the `name` attribute under `theme`.

```json
"ui":{
	"theme":{
		"name": "default"
	}
}
```

---

## Configure session information

Parameters such as how often the state of the session should be checked, how long a user should be allowed to remain idle etc., can be configured using the `session`. The `session` information has the following attributes.

|Attribute|Description|Default Value|
|--|--|--|
| `"userIdleTimeout"`|This specifies the number of seconds a user is allowed to remain idle after which they will be logged out automatically. | 600|
|`"userIdleWarningTimeout"`| This specifies how long, in seconds, a user needs to be idle before a warning notification is displayed.| 580|
|`"sessionRefreshTimeout"`| This specifies how often the session should be refreshed. | 300|
|`"checkSessionInterval"` | This specifies how often the session state should be checked. |3|

---

## Disable using authenticator app as an authentication factor

WSO2 Identity Server allows multi-factor authentication via SMS, Security Key/Biometrics (FIDO), and Authenticator Applications. The use of authenticator app can be disabled by setting the `enabled` key of the `authenticatorApp` under `ui` to `false`.

```json
"ui":{
	"authenticatorApp":{
		"enabled": false
	}
}
```

---

## Enable and disable application features

**My Account** has several [features](#the-features) and those features, in turn, have several sub features. These features can be configured by using the `features` attribute under `ui`. Each feature under the `features` attribute has the following format.
```json
"feature":{
	"disabledFeatures": [],
	"enabled": true,
	"scopes": {
		"create": [],
		"read": [],
		"update": [],
		"delete": []
	}
}
```

- The `disabledFeatures` attribute is used to disable sub features belonging to a feature.

- The `enabled` attribute can be used to toggle the feature as a whole. For instance, by setting the `enabled` attribute of the `overview` feature, you can disable the `overview` feature as a whole.

- The `scopes` attribute is used to specify the scopes that a user should be allowed in order to access the concerned feature. The `scopes` attribute has the following sub-attributes and each sub-attribute takes an array of scopes.

```json
"scopes":{
	"create":[],
	"read":[],
	"update":[],
	"delete":[]
}
```
If you want a user to have a certain scope(s) to be able to create an application, then you can specify that/those scope(s) within the `create` array of the application feature.

---

## The features

These are the five features in **My Account**.

1.  Overview
2.  Personal Info
3.  Security
4.  Applications
5.  Operations

### 1. Overview

The overview feature can be configured via the `overview` attribute of the `features` attribute under `ui`.

```json
"ui":{
	"features":{
		"overview":{
			"enabled": true,
			"disabledFeatures": [],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```
Set the `enabled` attribute to `false` to disable the overview altogether.

The overview feature has the following sub-features that can be disabled:

|Sub-feature| Description|
|--|--|
"overview.accountStatus"|The widget that shows the account status in the overview page.|
"overview.accountActivity"|The widget that shows the account activity in the overview page.|
"overview.accountSecurity"|The widget that shows the account security information in the overview page.|
"overview.consents"|The widget that shows the consent information in the overview page.|

To disable a sub-feature, pass the sub-feature name into the `disabledFeatures` array.

For example, to disable the account status widget do the following. 

```json
"ui":{
	"features":{
		"overview":{
			"enabled": true,
			"disabledFeatures": ["overview.accountStatus"],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```

### 2. Personal Info

The Personal Info feature can be configured via the `personalInfo` attribute of the `features` attribute under `ui`.

```json
"ui":{
	"features":{
		"personalInfo":{
			"enabled": true,
			"disabledFeatures": [],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```

Set the `enabled` attribute to `false` to disable this feature altogether.

The Personal Info feature has the following sub-features that can be disabled:

|Sub-feature| Description|
|--|--|
"profileInfo.linkedAccounts"|The Linked Accounts section in the Personal Info page.|
"profileInfo.externalLogins"|The External Logins section in the Personal Info page.|
"profileInfo.exportProfile"|The Export Profile section in the Personal Info page.|

To disable a sub-feature, pass the name of the sub-feature into the `disabledFeatures` array.

For example, do the following to disable External Logins. 

```json
"ui":{
	"features":{
		"personalInfo":{
			"enabled": true,
			"disabledFeatures": ["profileInfo.externalLogins"],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```
### 3. Security

The *security* feature can be configured via the `security` attribute of the `features` attribute under `ui`.

```json
"ui":{
	"features":{
		"security":{
			"enabled": true,
			"disabledFeatures": [],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```
Set the `enabled` attribute to `false` to disable security altogether.

The **Security** feature has the following sub-features that can be disabled:

|Sub-feature| Description|
|--|--|
|"security.changePassword"| The Change Password section of the Security page.|
|"security.accountRecovery"| The Account Recovery section of the Security page.|
|"security.accountRecovery.challengeQuestions"| The Challenge Questions section under the Account Recovery section of the Security page.|
|"security.accountRecovery.emailRecovery"| The Email Recovery Section under the Account Recovery section of the Security page.|
|"security.mfa"| The Multi-factor Authentication section of the Security page.|
|"security.mfa.sms"| The SMS feature of the Multi-factor Authentication section of the Security page.|
|"security.mfa.fido"| The Device feature of the Multi-factor  Authentication section of the Security page.|
|"security.mfa.totp"| The Authenticator App feature of the Multi-factor  Authentication section of the Security page.|
|"security.activeSessions"| The Active IDP Sessions section of the Security page.|
|"security.manageConsents"| The Manage Consents section of the Security page.|

To disable a sub-feature, pass the name of the sub-feature in the `disabledFeatures` array.

For example, do the following to disable the Active Sessions section. 

```json
"ui":{
	"features":{
		"personalInfo":{
			"enabled": true,
			"disabledFeatures": ["security.activeSessions"],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```
### 4. Applications

The applications feature can be configured via the `applications` attribute of the `features` attribute under `ui`.

```json
"ui":{
	"features":{
		"personalInfo":{
			"enabled": true,
			"disabledFeatures": [],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```

Set the `enabled` attribute to `false` to disable applications altogether.

The applications feature does not have a sub-feature.

### 5. Operations

The operations feature can be configured via the `operations` attribute of the `features` attribute under `ui`.

```json
"ui":{
	"features":{
		"operations":{
			"enabled": true,
			"disabledFeatures": [],
			"scopes":{
				"create": [],
				"read": [],
				"updated": [],
				"delete": []
			}
		}
	}
}
```
Set the `enabled` attribute to `false` to disable operations altogether.

The operations feature has no sub-features.
