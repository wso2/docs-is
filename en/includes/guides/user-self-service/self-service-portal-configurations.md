## Configure the My Account portal login flow

Just like any other application registered in {{product_name}}, you can customize the login flow of the My Account portal.

1. On the {{product_name}} Console, go to **Applications** and locate the My Account application at the top.

2. Click the settings icon to enter the **My Account** configuration page.

3. Go to the **Login Flow** tab and customize the login flow.

    !!! note
        Explore the authentication options offered by {{product_name}} in the [Authentication]({{base_path}}/guides/authentication/) section.

4. Click **Update** to save the changes.

## Customize My Account appearance

The **My Account** application can be customized to be consistent with the branding of the business. To customize, use the [Branding Preferences]({{base_path}}/guides/branding/configure-ui-branding/) in the {{product_name}} Console.

![Branding preferences in My Account application]({{base_path}}/assets/img/guides/branding/branding-my-account-ui.png)

## Enable and disable My Account features

**My Account** has several features and those features have several sub features. These features can be configured by applying configurations in the following format.

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

These are the five features in **My Account**.

1.  Overview
2.  Personal Info
3.  Security
4.  Applications
5.  Operations

#### 1. Overview

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

#### 2. Personal Info

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
|`profileInfo.mobileVerification`|The Mobile number verification feature in the Personal Info page.|

#### 3. Security

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

#### 4. Applications

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

The applications feature has no sub-features.

#### 5. Operations

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


## Configure My Account session

Parameters such as how often the state of the session should be checked, how long a user should be allowed to remain idle etc., can be configured using the following attributes.

|Parameter|Description|Default Value|
|--|--|--|
| `session.params.userIdleTimeOut`|This specifies the number of seconds a user is allowed to remain idle after which they will be logged out automatically. | 600|
|`session.params.userIdleWarningTimeOut`| This specifies how long, in seconds, a user needs to be idle before a warning notification is displayed.| 580|
|`session.params.sessionRefreshTimeOut`| This specifies how often the session should be refreshed. | 300|
|`session.params.checkSessionInterval` | This specifies how often the session state should be checked. |3|
