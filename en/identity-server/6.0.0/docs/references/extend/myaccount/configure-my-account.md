# Configure My Account Application

The **My Account** application can be configured by modifying the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf` directory).

```toml
[myaccount]
app_base_name = "myaccount"
client_id = "MY_ACCOUNT"
login_callback_path = ""
logout_callback_path = ""

route_paths.home = "/overview"
route_paths.login = ""
route_paths.logout = "/logout"

product_version.configs.versionOverride = ""
authenticator_app_configs.enabled = true

ui.announcements = []
ui.app_copyright = "WSO2 Identity Server"
ui.app_title = "My Account | WSO2 Identity Server"
ui.app_name = "My Account"
ui.app_logo_path = "/assets/images/branding/logo.svg"
ui.product_name = "WSO2 Identity Server"
theme = "default"

applications.enabled = true
applications.disabled_features = []
applications.scopes.create = []
applications.scopes.read = []
applications.scopes.update = []
applications.scopes.delete = []

operations.enabled = true
operations.disabled_features = []
operations.scopes.create = []
operations.scopes.read = ["internal_humantask_view"]
operations.scopes.update = []
operations.scopes.delete = []

overview.enabled = true
overview.disabled_features = []
overview.scopes.create = []
overview.scopes.read = []
overview.scopes.update = []
overview.scopes.delete = []

personal_info.enabled = true
personal_info.disabled_features = ["profileInfo.mobileVerification"]
personal_info.scopes.create = []
personal_info.scopes.read = []
personal_info.scopes.update = []
personal_info.scopes.delete = []

security.enabled = true
security.disabled_features = ["security.loginVerifyData.typingDNA"]
security.scopes.create = []
security.scopes.read = []
security.scopes.update = []
security.scopes.delete = []

session.params.userIdleTimeOut = 600.0
session.params.userIdleWarningTimeOut = 580.0
session.params.sessionRefreshTimeOut = 300.0
session.params.checkSessionInterval = 3.0
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

|Parameter|Description|Default Value|
|--|--|--|
`app_base_name`|The name of the app as it should appear in the URL. For instance, with the default `app_base_name`, the app can be accessed via `https://localhost:9443/myaccount/` |"myaccount"|
|`client_id`| This is the client ID of the application in WSO2 Identity Server.| `MY_ACCOUNT`|
|`login_callback_path`|This is the URL to which the user should be redirected after user authentication. |`login`|
|`logout_callback_path`|This is the URL to which the user should be redirected after the user is logged out. | `login`|
<!--
|`serverOrigin`|This is the original server URL of WSO2 Identity Server. | `https://localhost:9443`|
--> 
---

## Customize My Account
 
The **My Account** application can be customized to be consistent with the branding of the business. The following attributes can be modified to brand the **My Account** application.

|Parameter|Description|Default Value|
|--|--|--|
|`ui.product_name`|This is the name of the organization and is displayed in the app header next to the logo.|WSO2 Identity Server|
|`ui.app_copyright`| This is the copyright information that is displayed in the footer of the application.| WSO2 Identity Server|
|`ui.app_title`|This is the `HTML` title of the application. This is the name that appears in the browser tab.|My Account|
|`ui.app_name`| This is the name of the application and it appears in the header following the name of the organization.|My Account|
|`ui.app_logo_path`| This is the path to the logo that is displayed in the header. The logo of the application can be changed by assigning the path of a custom logo to this attribute.|`/assets/images/logo.svg`|

---

## Change the theme of the application

Custom themes can be applied to the **My Account** application. 

|Parameter|Description|Default Value|
|--|--|--|
|`theme`|Once a theme is created, the one that the application should use can be specified as the value to this parameter.|`default`|

---

## Configure session information

Parameters such as how often the state of the session should be checked, how long a user should be allowed to remain idle etc., can be configured using the following attributes.

|Parameter|Description|Default Value|
|--|--|--|
| `session.params.userIdleTimeOut`|This specifies the number of seconds a user is allowed to remain idle after which they will be logged out automatically. | 600|
|`session.params.userIdleWarningTimeOut`| This specifies how long, in seconds, a user needs to be idle before a warning notification is displayed.| 580|
|`session.params.sessionRefreshTimeOut`| This specifies how often the session should be refreshed. | 300|
|`session.params.checkSessionInterval` | This specifies how often the session state should be checked. |3|

---

## Disable using authenticator app as an authentication factor

WSO2 Identity Server allows multi-factor authentication via SMS, Security Key/Biometrics (FIDO), and authenticator applications.

|Attribute|Description|Default Value|
|--|--|--|
| `authenticator_app_configs.enable`|The use of the authenticator app can be disabled by setting this parameter to `false`.| `true`|

---

## Enable and disable application features

**My Account** has several [features](#the-features) and those features, in turn, have several sub features. These features can be configured by applying configurations in the following format.

``` toml
<feature>.enabled = true
<feature>.disabled_features = []
<feature>.scopes.create = []
<feature>.scopes.read = []
<feature>.scopes.update = []
<feature>.scopes.delete = []
```

-	The `<feature>.disabled_features` parameter is used to disable sub features belonging to a feature.
-	The `<feature>.enabled` parameter can be used to toggle the feature as a whole. For instance, by setting the `<feature>.enabled` parameter of the `overview` feature, you can disable the `overview` feature as a whole.
-	The `<feature>.scopes` parameter is used to specify the scopes that a user should be allowed in order to access the concerned feature. The `<feature>.scopes` parameter has the following sub-attributes and each sub-attribute takes an array of scopes.

	```toml
	<feature>.scopes.create = []
	<feature>.scopes.read = []
	<feature>.scopes.update = []
	<feature>.scopes.delete = []
	```

	If you want a user to have a certain scope(s) to be able to create an application, then you can specify that/those scope(s) within the `application.scopes.create` array of the application feature.

---

## The features

These are the five features in **My Account**.

1.  Overview
2.  Personal Info
3.  Security
4.  Applications
5.  Operations

### 1. Overview

The `overview` feature can be configured as follows:

``` toml
[myaccount]
overview.enabled = true
overview.disabled_features = []
overview.scopes.create = []
overview.scopes.read = []
overview.scopes.update = []
overview.scopes.delete = []
```

The `overview` feature has the following sub-features that can be disabled using the `overview.disabled_features` parameter:

|Sub-feature| Description|
|--|--|
|`overview.accountStatus`|The widget that shows the account status in the overview page.|
|`overview.accountActivity`|The widget that shows the account activity in the overview page.|
|`overview.accountSecurity`|The widget that shows the account security information in the overview page.|
|`overview.consents`|The widget that shows the consent information in the overview page.|

### 2. Personal Info

The `personal info` feature can be configured as follows:

``` toml
[myaccount]
personal_info.enabled = true
personal_info.disabled_features = ["profileInfo.mobileVerification"]
personal_info.scopes.create = []
personal_info.scopes.read = []
personal_info.scopes.update = []
personal_info.scopes.delete = []
```

The `personal info` feature has the following sub-features that can be disabled using the `personal_info.disabled_features` parameter:

|Sub-feature| Description|
|--|--|
|`profileInfo.linkedAccounts`|The Linked Accounts section in the Personal Info page.|
|`profileInfo.externalLogins`|The External Logins section in the Personal Info page.|
|`profileInfo.exportProfile`|The Export Profile section in the Personal Info page.|

### 3. Security

The `security` feature can be configured as follows:

```toml
[myaccount]
security.enabled = true
security.disabled_features = []
security.scopes.create = []
security.scopes.read = []
security.scopes.update = []
security.scopes.delete = []
```

The `security` feature has the following sub-features that can be disabled using the `security.disabled_features` parameter:

|Sub-feature| Description|
|--|--|
|`security.changePassword`| The Change Password section of the Security page.|
|`security.accountRecovery`| The Account Recovery section of the Security page.|
|`security.accountRecovery.challengeQuestions`| The Challenge Questions section under the Account Recovery section of the Security page.|
|`security.accountRecovery.emailRecovery`| The Email Recovery Section under the Account Recovery section of the Security page.|
|`security.mfa`| The Multi-factor Authentication section of the Security page.|
|`security.mfa.sms`| The SMS feature of the Multi-factor Authentication section of the Security page.|
|`security.mfa.fido`| The Device feature of the Multi-factor  Authentication section of the Security page.|
|`security.mfa.totp`| The Authenticator App feature of the Multi-factor  Authentication section of the Security page.|
|`security.activeSessions`| The Active IDP Sessions section of the Security page.|
|`security.manageConsents`| The Manage Consents section of the Security page.|

For example, do the following to disable the Active Sessions section. 

### 4. Applications

The `applications` feature can be configured as follows:

```toml
[myaccount]
applications.enabled = true
applications.disabled_features = []
applications.scopes.create = []
applications.scopes.read = []
applications.scopes.update = []
applications.scopes.delete = []
```

The `applications` feature does not have a sub-feature.

### 5. Operations

The `operations` feature can be configured as follows:

```toml
[myaccount]
operations.enabled = true
operations.disabled_features = []
operations.scopes.create = []
operations.scopes.read = ["internal_humantask_view"]
operations.scopes.update = []
operations.scopes.delete = []
```

The operations feature has no sub-features.