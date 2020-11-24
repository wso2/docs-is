# What Has Changed

WSO2 Identity Server 5.11.0 brings a range of new features and major improvements. The following aspects have changed in 5.11.0 compared to the previous WSO2 IS versions.

This page provides details about the behavioral changes from WSO2 Identity Server 5.10.0 to 5.11.0.

!!! info "If you are migrating from an older version of Identity Server"
    To find the changes introduced in the previous versions, you can refer to the following documentation:
    
    - Changes introduced in IS 5.10.0 can be found at [What Has Changed in IS 5.10.0](https://is.docs.wso2.com/en/5.10.0/setup/migrating-what-has-changed/#what-has-changed).
    - Changes introduced in IS 5.9.0 can be found at [What Has Changed in IS 5.9.0](https://is.docs.wso2.com/en/latest/setup/migrating-what-has-changed/).
    - Changes introduced in IS 5.8.0 and before can be found at [Migrating Configurations to IS 5.8.0](https://docs.wso2.com/display/IS580/Upgrading+From+an+Older+Version+of+WSO2+IS#UpgradingFromanOlderVersionofWSO2IS-Migratingtheconfigurations).


## Renamed 'User Portal' to 'MyAccount'

A new portal named "User Portal" was released with WSO2 Identity Server 5.10.0 which replaced the legacy Jaggery-based end-user dashboard. With WSO2 IS 5.11.0 onwards, this portal has been renamed to “My Account” and will be onboarded as a SaaS application.

The following configurations changed in the application.

| Configuration | 5.10.0 value | 5.11.0 value |
|-|-|-|
| name | User Portal | My Account |
| description | This is the user portal application. | This is the my account application. |
| client_id | USER_PORTAL | MY_ACCOUNT |
| callback_url | /user-portal/login | /myaccount/login |

For more information, see [Configuring My Account Application](../../develop/configure-my-account).

## Symmetric key encryption for internal data

Up to version 5.10.0, WSO2 IS has been using asymmetric key encryption for encrypting internal data as well as for signing purposes.
With 5.11.0 onwards, symmetric key encryption is the default encryption mechanism to encrypt internal sensitive data because:

-  Capability to change keystores easily
    Prior to 5.10.0, since internal data was also encrypted using asymmetric key encryption, whenever the certificates expired or needed to be moved to a different keystore, all the data encrypted using the old keystore needed to be migrated.
    Now, with symmetric key encryption for internal sensitive data, this is no longer an overhead. The secret key in symmetric key encryption is now encrypted using asymmetric key encryption so only the secret key of symmetric key encryption needs to re-encrypted whenever a keystore change is required.

- Symmetric key encryption for encrypting internal sensitive data is used industry-wide

For more information, see [An Overview of Symmetric Encryption](../../administer/symmetric-overview).

## The algorithm used for symmetric key encryption 

WSO2 IS 5.11.0 uses ‘AES/GCM/NoPadding’ as the encryption algorithm. GCM is a stream cypher. Therefore, there is a performance advantage of using it due to the parallel encryption of each block. 

- There is no need to use a padding mechanism in GCM mode. 
- In GCM mode, the IV (initialization vector) should be a unique value for each encryption request. 
- Along with each value that is encrypted, the relevant IV related to that should be tracked in order to do the decryption. 
- AES-128 is supported as the key size.

For more information, see [Using Symmetric Key Encryption](../../administer/using-symmetric-encryption).

## Group and role separation

In versions up to WSO2 Identity Server 5.10.0, there were no separate entity for groups. Both groups and roles were considered as roles in the system and roles could be managed via the WSO2 IS management console or the SCIM groups endpoint. 

From WSO2 Identity Server 5.11.0 onwards, this has been redesigned and groups and roles are considered separate entities in the system as described below. They can be managed using the new console or via SCIM APIs.

- **User**: An identity of a person stored in the IAM system.
- **Group**: A representation of a set of users in the userstore.
- **Role**: Roles within the IAM solution that bind with permissions defined for resources within the IAM solution. It can be mapped to old hybrid roles.

**Relationship between roles, groups, and users**

- A role can be assigned to multiple groups
- A group can have multiple roles
- A role can be assigned to multiple users
- A user can have multiple roles
- A group can be assigned to multiple users
- A user can have multiple groups

![relationship-between-groups-and-roles](../../assets/img/setup/groups-roles-relationship.png)

## Hosting account recovery endpoint on a different server

With WSO2 IS 5.10.0, `accountrecoveryendpoint.war` can be configured to be hosted on WSO2 Identity Server or on a separate server. When migrating to 5.11.0, if you enable the tenant-qualify URL feature and host the `accountrecoveryendpoint.war` on a different server, the `identity.server.service.contextURL` configuration in the `<WEBAPP_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties` file must refer to only the server URL excluding the `/services` part as shown below. 

```tab="Example"
identity.server.service.contextURL=https://localhost:9443/
```

## Deprecating WebContextRoot configuration 

The `WebContextRoot` configuration was included in the `<IS_HOME>/repository/conf/carbon.xml` file and it was the configuration used to build the URLs within the WSO2 IS product. However, it was observed that this has not been consistent in all places across the product and therefore the usage of this config has been very minimal. 
 
From WSO2 Identity Server 5.11.0 onwards, we have deprecated the `WebContextRoot` configuration. Alternatively, you can use the `ProxyContextPath` configuration by adding it to the `<IS_HOME>/repository/conf/deployment.toml` file as shown below.

```
[server]
proxy_context_path="abc"
```

## Configuring CORS tenant-wise

Complete the following steps for the CORS migration.

1. Remove any CORS configurations defined in the `<IS_HOME>/repository/resources/conf/tomcat/web.xml` file. 
To do this, remove the whole tag under the filter class named `com.thetransactioncompany.cors.CORSFilter`. 

2. In order to complete the CORS migration, any CORS configurations defined at the `web.xml` file should be reconfigured in the `deployment.toml` file. The following table shows how the old configurations in the `web.xml` file are mapped to the new ones in the `deployment.toml` file. 

    | Old (xml) configuration | New (toml) configuration |
    |-|-|
    | cors.allowGenericHttpRequests | allow_generic_http_requests |
    | cors.allowOrigin {"*"} | allow_any_origin |
    | cors.allowOrigin | allowed_origins |
    | cors.allowSubdomains | allow_subdomains |
    | cors.supportedMethods | supported_methods |
    | cors.supportedHeaders {"*"} | support_any_header |
    | cors.supportedHeaders | supported_headers |
    | cors.exposedHeaders | exposed_headers |
    | cors.supportsCredentials | supports_credentials |
    | cors.maxAge | max_age |
    | cors.tagRequests | tag_requests |

    A sample CORS toml configuration is shown below.

    ```toml
    [cors]
    allow_generic_http_requests = true

    allowed_origins = [
        "http://wso2.is"
    ]
    allow_subdomains = false
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

## Configuring the certificate used to encrypt SAML assertions 

In earlier versions, the certificate alias defined in SAML configuration was used to encrypt the SAML assertion. From WSO2 IS 5.11.0 onwards, an application certificate (if present) is used for this task. To revert to the old behavior, add the following property to the `deployment.toml` file and set it to **false**. 

```toml
[saml.metadata]
assertion_encrypt_with_app_cert= false
```

## SAML service provider certificate expiry validation

In earlier versions, service provider certificate expiry validation was not enabled by default. From 5.11.0 onwards, this validation is enabled by default. To revert to the old behavior, add the following property to the `deployment.toml` file to disable the validation. 

```toml
[saml]
enable_saml_sp_certificate_expiry_validation= false
```

## OAuth 2.0 token binding validation

The token binding validation is a feature that was introduced with WSO2 IS 5.10.0. Intially, if `tokenBindingType` is provided when creating the OpenID Connect service provider, the token binding validation is enabled by default. With the WSO2 IS WUM-updated pack, you can disable it by unticking the **Validate token bindings** property. However, if this property is not available for the existing service providers, token binding will still be enabled by default. 

From 5.11.0 onwards, this behavior has been changed. The property is available for all new service providers. For the existing service providers that do not have this property, token binding validation is disabled. 
To maintain backward compatibility, the property will be enabled during migration for those existing service providers that have the `tokenBindingType` as **cookie**.

Hence, with this change, after 5.11.0, there will be no service providers without the **Validate token bindings** property. 

## Configurations for managing OIDC consent flow 

With WSO2 IS 5.10.0, two new properties shown below were introduced to the `<IS_HOME>/repository/conf/identity/identity.xml` file within the `OpenIDConnect` tag to manage consent during OpenID Connect login and logout flows. 
- `SkipLoginConsent`:  Skip the OIDC login consent 
- `SkipLogoutConsent`: Skip the OIDC logout consent

With 5.11.0, these two properties are added to the [Application Management Rest API](../../develop/application-rest-api) so that they can be viewed and modified. The `skipConsent` attribute in the **AdvancedApplicationConfiguration** model has been removed the two properties `skipLoginConsent` and `skipLogoutConsent` have been added instead. 

## Skip challenge question recovery option 

With WSO2 IS 5.11.0, the challenge question recovery option is skipped by default if the user has not provided the challenge question answers set. To revert to the old behavior, you can disable this configuration by adding the following property to the `deployment.toml` file. 

```toml
[identity_mgt.password_reset_challenge_questions]
skip_on_insufficient_answers = false
```

## Deprecated features

OAuth 1.0 and `identity/connect/dcr` APIs are depecrated in WSO2 IS 5.11.0. If you wish to revert to the previous behavior, add the following property to the `<IS_HOME>/repository/conf/deployment.toml` file. 

**To enable OAuth 1.0**

```toml
[[legacy_feature]]
id = "oauth"
version = "1.0"
enable = true
```

**To enable identity/connect/dcr**

```toml
[[legacy_feature]]
id = "identity/connect/dcr"
enable = true
```

## WS-Trust authenticator moved to the connector store

WS-Trust authentication is no longer supported by default in WSO2 IS 5.11.0 and has been introduced as a connector. To use WS-Trust authentication, [configure the connector](TODO:insert-link-to-connector-doc). 

## Migration of user store managers with unique ID support

New user store managers with inbuilt unique ID support was introduced in WSO2 5.10.0 and named with the `UniqueID` prefix. User store managers that do not have `UniqueID` as part of the user store manager name are only available for backward compatibility purposes and can only be used if you are migrating from a previous version of WSO2 Identity Server. If you are using any such user store managers, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file to support using the user store in the management console or console application.

Note that both existing user stores as well as new user stores must be configured as shown below. 

```toml tab="Format"
[user_store_mgt]
allowed_user_stores=[<existing userstores..>,"<new userstore>"]
```

```toml tab="Sample"
[user_store_mgt]
allowed_user_stores=["org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager", "org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager","org.wso2.carbon.user.core.ldap.UniqueIDReadOnlyLDAPUserStoreManager","org.wso2.carbon.user.core.ldap.UniqueIDReadWriteLDAPUserStoreManager","org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager"]
```

## JWT validation at introspection

JWT validation at introspection is enabled by default in WSO2 IS 5.11.0. The server identifies a JWT token at the introspection endpoint by attempting a JWT token parsing. If identified, introspection is performed by treating the token as a JWT access token.

**Note** that enabling this feature will validate the token using the available JWT token validator for instance, in the default pack, it will use the `Default JWT token validator`. So any valid and parsable JWT token should be able to be successfully validated against the available JWT token validator in the system. 

However, if the server issues custom JWT tokens which fail validation with the available JWT token validator, the existing flow can break. In a migrated setup, this condition can fail in scenarios such as:

- There are custom token issuers that issue valid and parsable JWT tokens which fail the default JWT token validator shipped with the pack. e.g., a custom token not having the `jti` claim.

- Both a custom JWT token validator and the default JWT token validator co-exist in the system. There also exists an invalid custom token which is successfully validated with the default validator but fails to be validated with the custom validator. The token may still pass the introspection validation.

Therefore, it is important to verify that the JWT token validator can avoid the scenarios mentioned above. If not, it needs to be handled by deploying a custom JWT token validator that will avoid the issues mentioned above.

To revert to the previous behavior and disable this feature, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[oauth]
enable_jwt_token_validation_during_introspection=false
```

## Disabled appending params to OAuth2/OIDC error responses

Appending additional parameters to the OAuth2/OIDC error response has been disabled by default. As a result, the parameters 'sp' and 'tenant_domain' which was set to the callback url in error responses in previous WSO2 IS versions will also not be available. If any configured error param needs to be sent back to the callback url in an error response, add the following config to the `deployment.toml` file.

```toml
[oauth]
allow_additional_params_from_error_url = true
```

## Disabled device authorization grant

The device authorization grant was introduced with WSO2 IS 5.10.0. It has been disabled by default in the 5.11.0 version. However, you can enable it for backward compatibility if you had previously enabled this in your setup. To enable the grant and revert to the old behavior, add the following configuration to the `deployment.toml` file.

!!! warning 
    Note that this configuration is not production-ready and is ideally not recommended for use. 

```toml
[oauth.response_type.device]
enable=true
[oauth.grant_type.device_code]
enable=true
```

## New email templates 

From WSO2 Identity Server 5.11.0 onwards, five new email templates have been added. 

- TenantRegistrationConfirmation
- LiteUserEmailConfirmation
- ResendLiteUserEmailConfirmation
- ResendVerifyEmailOnUpdate
- SelfSignUpSuccess

Apart from these new email templates, the Email Content Type was changed to `text/html` for the **Totp** email template.

## Logging

### Archived log file names

In versions up to WSO2 Identity Server 5.10.0, archived log file names only include the date.

``` java tab="Example"
wso2carbon-10-12-2020.log
```
However, from WSO2 Identity Server 5.11.0 onwards, a integer `i` has been added to the file name to represent the number of rollovers. This avoids target file overwriting on every rollover.

``` java tab="Example"
wso2carbon-10-12-2020.1.log
```
### Access log pattern

In versions up to WSO2 Identity Server 5.10.0, access logs are printed as seen below. 

``` java tab="Example"
127.0.0.1 - - [26/Apr/2020:22:35:52 +0530] GET /carbon/admin/images/favicon.ico HTTP/1.1 200 17542 https://is.wso2.com:9443/carbon/admin/login.jsp Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36 0.001
```
In the example given above, the user agent is `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36` and the referer is `https://is.wso2.com:9443/carbon/admin/login.jsp`. As you can see, the user agent has white spaces in between, which prevents access log analyzer tools from processing the log lines properly.

As a solution to this, the user agent and referer will be printed within double quotes from WSO2 Identity Server 5.11.0 onwards. 

``` java tab="Example"
127.0.0.1 - - [21/Oct/2020:11:46:54 +0530] GET /favicon.ico HTTP/1.1 401 - "https://localhost:9443/oauth2/authorize?sessionDataKey=d7ccf253-4abd-4a33-a79b-d7a71aa631d0" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36" 0.001
```

## Extending expiry time of commonAuth cookie

From WSO2 IS 5.11.0 onwards, the expiry time of the commonAuth cookie is extended with each authentication request. This is enabled by default in 5.11.0 but was disabled by default in the WSO2 IS 5.10.0 WUM-updated pack. If you do not require this feature, you can disable it by adding the following configuration to the `deployment.toml` file. 

```toml
[session.timeout]
extend_remember_me_session_timeout_on_auth=false
```

## Revoke access tokens on logout/session expiry

There are two types of access token binding supported with WSO2 IS; **Cookie Based** and **SSO Session Based**. If you have enabled one of these binding types for a service provider when configuring OAuth/OIDC inbound authentication for an application, with WSO2 IS 5.11.0 you can also enable revoking access tokens when the access token binding expires. 

WSO2 IS 5.11.0 supports the functionality to revoke access tokens issued for the application once the IDP session terminates.  When the user logs out of the application, the access tokens of the token binding reference issued for the application gets revoked. This functionality can be enabled when configuring the service provider OAuth/OIDC inbound authentication. 

![revoke-tokens](../../assets/img/learn/revoke-tokens-config.png)

WSO2 IS 5.11.0 also supports revoking the issued tokens for a session that has expired due to a session idle timeout when a user tries to use single sign-on, log in again, or log out after a session has expired.

For both usecases mentioned above, token revoking is enabled by default in 5.11.0. If you wish to disable this, add the following configuration to the `deployment.toml` file. 

```toml
[identity_mgt.events.schemes.TokenBindingExpiryEventHandler.properties]
enable = false
```

## Configurable system apps

In WSO2 5.11.0, the **My Account** and **Console** applications are `readonly` apps by default. To make the callback URLs for these apps configurable, add the following configuration to the `deployment.toml` file. 

```toml
[system_applications]
read_only_apps = []
```

## Configuring approval step for workflows

When creating roles through the management console in WSO2 IS-5.11.0 onwards, the domain must be specified as **Internal**. Else, it will be created as a group. 

![workflow-roles](../../assets/img/setup/workflow-roles.png)

When adding workflows, groups will not be listed as roles under the approval step. Hence, to select a 'role' for a particular approval step in a workflow, create that role with the **Internal** domain via the management console.  





