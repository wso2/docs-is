# Edit a Windows Desktop Application

## General

Configure the general settings of your Windows application here.
Here are the settings that you can change:
|Setting | What it is for|
|:-------|:-----|
|Name|Changing the name of the application|
|Description|Describing your application so that developers can get a better understanding about the application.|
|Application Image| Setting an image for the application. Insert the URL of an image here and it will be shown on the applications list before the application name.
|Discoverable application| Check this if the application should be visible to the end users. If checked, users will be able to find this application in their account page.|
|Access URL| This is the URL of the login page of the application. Should `Discoverable application` be checked, the user will be taken to this URL on clicking on this application on their account page.|
|Certificate| This is to verify the validity of the signed requests applications send to the WSO2 Identity Server. This is used in SAML2 authentication, and in encrypting `id_token` and validating the signed requests sent during authorization requests. You can either <ul><li>Provide a JWKS endpoint</li><li>Input a certificate</li></ul> If you choose to input a certificate, make sure it is PEM encoded|

## Access

Configure the protocols used by the application here.
Windows applications use the OIDC protocol by default.

Click on `New protocol` to add a new protocol.

The existing protocols can be configured clicking on the relevant protocol on the list of protocols and expanding it.

The `trash` icon can be used to delete a protocol.

## Attributes

Configure the attributes related to the application here.

### Attribute Selection

Select the attributes that the application should request from the user by clicking on the `Add Attribute` button. If attributes have been already selected, you can edit them by clicking on the `pencil` icon on the top right corner of the section.

To make an attribute mandatory, Tick the checkbox under the `Mandatory` column.

### Subject

| Setting                  | What it is for                                                                                                                |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| Subject attribute        | It is the attribute that uniquely identifies a user. Select the attribute that you want to serve as a user's unique identity. |
| Include User Domain      | This appends the userstore domain a user belongs to their subject identifier.                                                 |
| Include Tenant Domain    | This appends the tenant domain to the subject identifier.                                                                     |
| Use mapped local subject | This uses the local subject identifier to identify a user.                                                                    |

### Role

| Setting            | What it is for                                                        |
| :----------------- | :-------------------------------------------------------------------- |
| Role attribute     | This is the attribute that is used to determine the role of the user. |
| Include userDomain | This appends the userstore domain a user belongs to their role.       |

### Role Mapping

This allows you to map a local to a role available in your application.

## Sign-on Method

Configure sign-on methods here.

### Authentication Flow

This allows you to design the authentication flow of your application. There are two major components:

-   Steps
-   Authenticators

#### Steps

Steps consist of authenticators and users are supposed to complete every step to authenticate themselves. This can be used to enable multi-factor authentication, in which users have to authenticate themselves using multiple factors.

You can add a new step by clicking on the `New Authentication Step` button.
To delete a step, click on the `x` icon on the top right corner of the step.

The `Use Subject identifier from` setting can be used to determine which step the subject identifier will be chosen from.

The `Use Attributes from` setting can be used to determine which step the attributes will be chosen from.

### Authenticators

Authenticators are the different authenticating factors. You will be able to choose an authenticating factor from authenticators such as basic, TOTP, FIDO, etc.

To add an authenticator to a step, drag an authenticator from the `Authenticators` section and drop it in the `Step` section. To remove an authenticator, hover over it and click on the `x` icon on the top right corner.

#### Script-based configuration

A script can be used to authenticate users. You can choose a template from the list of templates available on the right sidebar or you can input your custom script into the code editor.

### Request Path Authentication

This is used to authenticate users using authenticating credentials obtained from outside the Identity Server. This allows you to use single-sign-on without using the identity provider's login page, perhaps, obtain login credentials using a custom login page.

There are two types of request path authentication:

-   Basic Auth
-   OAuth Bearer

Basic Auth requires username and password whereas OAuth bearer requires an access token to perform authentication.

You can choose one of them from the dropdown menu.

## Provisioning

Configure provisioning setting here.

### Inbound Provisioning

Use this to provision users or groups to the identity server's userstore through this application.

### Outbound Provisioning

Use this to provision users or groups to external systems.

## Advanced

| Setting                       | What it is for                                                                                          |
| :---------------------------- | :------------------------------------------------------------------------------------------------------ |
| SaaS Application              | Use this to make this application available across tenants                                              |
| Skip login consent            | The user consent screen will not be shown during signing in                                             |
| Skip logout consent           | The user will not be prompted for consent before logging out the user                                   |
| return authenticated IdP list | The list of identity providers used for authentication will be returned in the authentication response. |
| Enable authorization          | The access control policies for the application                                                         |
