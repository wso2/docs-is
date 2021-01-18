# Identity Provider Configurations used with APIs

This section lists out some sample configurations that can be used when
configuring an Identity Provider.

## Federated authenticator configuration samples

A federated authenticator is used to authenticate a user through an
external system (e.g. Yahoo, MSN, OpenIDConnect). To write your own
custom federated authenticator, see [Writing a Custom Federated Authenticator](../../extend/writing-a-custom-federated-authenticator/).

!!! warning
    The `         <federatedAuthenticatorConfigs>        ` and
    `         <defaultAuthenticatorConfig>        ` tags have similar
    attributes. To configure a federated authenticator as the default
    authenticator, use the desired configuration found below with the
    `         <defaultAuthenticatorConfig>        ` tag instead of the
    `         <federatedAuthenticatorConfigs>        ` tag. Note that there
    can be only one `         <defaultAuthenticatorConfig>        ` while
    there can be multiple `         <federatedAuthenticatorConfigs>        `
    .
    
---

## SAML2 Web SSO configuration

``` xml
<federatedAuthenticatorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <displayName>samlsso</displayName>
   <enabled>true</enabled>
   <name>SAMLSSOAuthenticator</name>
   <properties>
      <name>IdPEntityId</name>
      <value>Identity Provider Entity Id</value>
   </properties>
   <properties>
      <name>SPEntityId</name>
      <value>Service Provider Entity Id</value>
   </properties>
   <properties>
      <name>SSOUrl</name>
      <value>https://localhost:9443/samlsso/</value>
   </properties>
   <properties>
      <name>ISAuthnReqSigned</name>
      <value>true</value>
   </properties>
   <properties>
      <name>IsLogoutEnabled</name>
      <value>true</value>
   </properties>
   <properties>
      <name>LogoutReqUrl</name>
      <value>https://example.com/logout/url</value>
   </properties>
   <properties>
      <name>IsLogoutReqSigned</name>
      <value>true</value>
   </properties>
   <properties>
      <name>IsAuthnRespSigned</name>
      <value>true</value>
   </properties>
   <properties>
      <name>IsUserIdInClaims</name>
      <value>false</value>
   </properties>
   <properties>
      <name>IsAssertionEncrypted</name>
      <value>true</value>
   </properties>
   <properties>
      <name>isAssertionSigned</name>
      <value>true</value>
   </properties>
   <properties>
      <name>commonAuthQueryParams</name>
      <value>paramName1=value1&paramName2=value2</value>
   </properties>
</federatedAuthenticatorConfigs>
```

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>IdPEntityId</p></td>
<td><p>Identity Provider Entity Id</p></td>
</tr>
<tr class="even">
<td><p>SPEntityId</p></td>
<td><p>Service Provider Entity Id</p></td>
</tr>
<tr class="odd">
<td><p>SSOUrl</p></td>
<td><p>SSO URL</p></td>
</tr>
<tr class="even">
<td><p>ISAuthnReqSigned</p></td>
<td><p>Enable Authentication Request Signing</p></td>
</tr>
<tr class="odd">
<td><p>IsLogoutEnabled</p></td>
<td><p>Enable Logout</p></td>
</tr>
<tr class="even">
<td><p>LogoutReqUrl</p></td>
<td><p>Logout Url</p></td>
</tr>
<tr class="odd">
<td><p>IsLogoutReqSigned</p></td>
<td><p>Enable Logout Request Signing</p></td>
</tr>
<tr class="even">
<td><p>IsAuthnRespSigned</p></td>
<td><p>Enable Authentication Response Signing</p></td>
</tr>
<tr class="odd">
<td><p>IsUserIdInClaims</p></td>
<td><p>SAML2 Web SSO User ID Location</p></td>
</tr>
<tr class="even">
<td><p>IsAssertionEncrypted</p></td>
<td><p>Enable Assertion Encryption</p></td>
</tr>
<tr class="odd">
<td><p>isAssertionSigned</p></td>
<td><p>Enable Assertion Signing</p></td>
</tr>
<tr class="even">
<td><p>commonAuthQueryParams</p></td>
<td><p>Additional Query Parameters</p></td>
</tr>
</tbody>
</table>

---

## OAuth2/OpenID Connect configuration

``` xml
<federatedAuthenticatorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <displayName>openidconnect</displayName>
   <enabled>true</enabled>
   <name>OpenIDConnectAuthenticator</name>
   <properties>
      <name>ClientId</name>
      <value>ClientID</value>
   </properties>
   <properties>
      <name>OAuth2AuthzUrl</name>
      <value>https://localhost:9443/oauth2/authorize/</value>
   </properties>
   <properties>
      <name>OAUTH2TokenUrl</name>
      <value>https://localhost:9443/oauth2/token/</value>
   </properties>
   <properties>
      <confidential>true</confidential>
      <name>ClientSecret</name>
      <value>ClientSecret</value>
   </properties>
   <properties>
      <name>IsUserIdInClaims</name>
      <value>false</value>
   </properties>
   <properties>
      <name>commonAuthQueryParams</name>
      <value>paramName1=value1&paramName2=value2</value>
   </properties>
</federatedAuthenticatorConfigs>
```

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>ClientId</p></td>
<td><p>Client Id</p></td>
</tr>
<tr class="even">
<td><p>OAuth2AuthzUrl</p></td>
<td><p>Authorization Endpoint URL</p></td>
</tr>
<tr class="odd">
<td><p>OAUTH2TokenUrl</p></td>
<td><p>Token Endpoint URL</p></td>
</tr>
<tr class="even">
<td><p>ClientSecret</p></td>
<td><p>Client Secret</p></td>
</tr>
<tr class="odd">
<td><p>IsUserIdInClaims</p></td>
<td><p>OpenID Connect User ID Location</p></td>
</tr>
<tr class="even">
<td><p>commonAuthQueryParams</p></td>
<td><p>Additional Query Parameters</p></td>
</tr>
</tbody>
</table>

---

## WS-Federation (Passive) configuration

``` xml
<federatedAuthenticatorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <displayName>passivests</displayName>
   <enabled>true</enabled>
   <name>PassiveSTSAuthenticator</name>
   <properties>
      <name>RealmId</name>
      <value>Passive STS Realm</value>
   </properties>
   <properties>
      <name>PassiveSTSUrl</name>
      <value>https://localhost:9443/passivests/</value>
   </properties>
   <properties>
      <name>IsUserIdInClaims</name>
      <value>false</value>
   </properties>
   <properties>
      <name>commonAuthQueryParams</name>
      <value>paramName1=value1</value>
   </properties>
</federatedAuthenticatorConfigs>
```

| Property Name         | Description                  |
|-----------------------|------------------------------|
| RealmId               | Passive STS Realm            |
| PassiveSTSUrl         | Passive STS URL              |
| IsUserIdInClaims      | Passive STS User ID Location |
| commonAuthQueryParams | Additional Query Parameters  |

  
---

## Facebook configuration

  

``` xml
<federatedAuthenticatorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <displayName>facebook</displayName>
   <enabled>true</enabled>
   <name>FacebookAuthenticator</name>
   <properties>
      <name>ClientId</name>
      <value>clientID</value>
   </properties>
   <properties>
      <confidential>true</confidential>
      <name>ClientSecret</name>
      <value>secret</value>
   </properties>
   <properties>
      <name>UserInfoFields</name>
      <value>id,first_name,middle_name,gender,email</value>
   </properties>
   <properties>
      <name>Scope</name>
      <value>email</value>
   </properties>
   <properties>
      <name>callBackUrl</name>
      <value>https://localhost:9443/commonauth</value>
   </properties>
</federatedAuthenticatorConfigs>
```

| Property Name  | Description                                                                                                                                                                                                                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ClientId       | This refers to the Client Id you received from the Facebook app you created.                                                                                                                                                                                                                                                                          |
| ClientSecret   | This refers to the Client Secret you received from the Facebook app you created.                                                                                                                                                                                                                                                                      |
| UserInfoFields | These are the claims related to the user account on Facebook. WSO2 Identity Server requests these fields from Facebook when a user is authenticated with Facebook through the IS. See [public\_profile permission](https://developers.facebook.com/docs/facebook-login/permissions#reference-public-profile) for more information about these fields. |
| Scope          | Defines the permission to access particular information from a Facebook profile. See the [Permissions Reference](https://developers.facebook.com/docs/facebook-login/permissions) for a list of the different permission groups in Facebook APIs.                                                                                                     |
| callBackUrl    | Callback URL of the Identity Server.                                                                                                                                                                                                                                                                                                                  |

---

## Yahoo configuration

``` xml
<federatedAuthenticatorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <displayName>yahoo</displayName>
   <enabled>true</enabled>
   <name>YahooOpenIDAuthenticator</name>
</federatedAuthenticatorConfigs>
```
  
---

## Google configuration

``` xml
<federatedAuthenticatorConfigs
    xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
    <displayName>google</displayName>
    <enabled>true</enabled>
    <name>GoogleOpenIDAuthenticator</name>
</federatedAuthenticatorConfigs>
```

---

## Microsoft (Hotmail,MSN,Live) configuration

``` xml
<federatedAuthenticatorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <displayName>microsoft(hotmail,</displayName>
   <enabled>true</enabled>
   <name>MicrosoftWindowsLive</name>
   <properties>
      <name>ClientSecret</name>
      <value>clientsecret</value>
   </properties>
   <properties>
      <name>windows-live-callback-url</name>
      <value>https://example.com/callback/url</value>
   </properties>
   <properties>
      <name>ClientId</name>
      <value>clientID</value>
   </properties>
</federatedAuthenticatorConfigs>
```

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>ClientSecret</p></td>
<td><p>Client Secret</p></td>
</tr>
<tr class="even">
<td><p>windows-live-callback-url</p></td>
<td><p>Callback Url</p></td>
</tr>
<tr class="odd">
<td><p>ClientId</p></td>
<td><p>Client Id</p></td>
</tr>
</tbody>
</table>

--- 

## Outbound provisioning connector configuration samples

An outbound provisioning connector is used to provision users to
external systems (e.g. Google, SalesForce).  To write your own custom
outbound provisioning connector, see [Writing an Outbound Provisioning
Connector](../../develop/writing-an-outbound-provisioning-connector/).

!!! warning
    The `              <provisioningConnectorConfigs>             ` and `              <defaultProvisioningConnectorConfig>             ` tags
    have similar attributes. To configure an outbound provisioning connector
    as the default provisioning connector, use the desired configuration
    found below with the
    `              <defaultProvisioningConnectorConfig>             ` tag
    instead of the
    `              <provisioningConnectorConfigs>             ` tag. There
    can be only one
    `              <defaultProvisioningConnectorConfig>             ` while
    there can be multiple
    `              <provisioningConnectorConfigs>             ` .
    
---

## SalesForce provisioning configuration

``` xml
<provisioningConnectorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <enabled>true</enabled>
   <name>salesforce</name>
   <provisioningProperties>
      <name>sf-username</name>
      <value>testuser</value>
   </provisioningProperties>
   <provisioningProperties>
      <confidential>true</confidential>
      <name>sf-password</name>
      <value>testpw</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>sf-clientid</name>
      <value>clientID</value>
   </provisioningProperties>
   <provisioningProperties>
      <confidential>true</confidential>
      <name>sf-client-secret</name>
      <value>clientsecret</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>sf-api-version</name>
      <value>1.0.0</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>sf-domain-name</name>
      <value>example.com</value>
   </provisioningProperties>
</provisioningConnectorConfigs>
```

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>sf-username</p></td>
<td><p>Username</p></td>
</tr>
<tr class="even">
<td><p>sf-password</p></td>
<td><p>Password</p></td>
</tr>
<tr class="odd">
<td><p>sf-clientid</p></td>
<td><p>Client ID</p></td>
</tr>
<tr class="even">
<td><p>sf-client-secret</p></td>
<td><p>Client Secret</p></td>
</tr>
<tr class="odd">
<td><p>sf-api-version</p></td>
<td><p>API version</p></td>
</tr>
<tr class="even">
<td><p>sf-domain-name</p></td>
<td><p>Domain Name</p></td>
</tr>
</tbody>
</table>

---

## Google provisioning configuration

``` xml
<provisioningConnectorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <enabled>true</enabled>
   <name>googleapps</name>
   <provisioningProperties>
      <name>google_prov_application_name</name>
      <value>TestApp</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>google_prov_admin_email</name>
      <value>test@mygoogledomain.com</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>google_prov_service_acc_email</name>
      <value>test@developer.gserviceaccount.com</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>google_prov_familyname_claim_dropdown</name>
      <value>ClaimB</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>google_prov_givenname_claim_dropdown</name>
      <value>ClaimB</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>google_prov_email_claim_dropdown</name>
      <value>ClaimA</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>google_prov_domain_name</name>
      <value>mygoogledomain.com</value>
   </provisioningProperties>
</provisioningConnectorConfigs>
```

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>google_prov_application_name</p></td>
<td><p>Application Name</p></td>
</tr>
<tr class="even">
<td><p>google_prov_admin_email</p></td>
<td><p>Administrator's Email</p></td>
</tr>
<tr class="odd">
<td><p>google_prov_service_acc_email</p></td>
<td><p>Service Account Email</p></td>
</tr>
<tr class="even">
<td><p>google_prov_familyname_claim_dropdown</p></td>
<td><p>Family Name</p></td>
</tr>
<tr class="odd">
<td><p>google_prov_givenname_claim_dropdown</p></td>
<td><p>Given Name</p></td>
</tr>
<tr class="even">
<td><p>google_prov_email_claim_dropdown</p></td>
<td><p>Primary Email</p></td>
</tr>
<tr class="odd">
<td><p>google_prov_domain_name</p></td>
<td><p>Google Domain</p></td>
</tr>
</tbody>
</table>

---

## SCIM provisioning configuration

``` xml
<provisioningConnectorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <enabled>true</enabled>
   <name>scim</name>
   <provisioningProperties>
      <name>scim-username</name>
      <value>testuser</value>
   </provisioningProperties>
   <provisioningProperties>
      <confidential>true</confidential>
      <name>scim-password</name>
      <value>testpw</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>scim-user-ep</name>
      <value>example.com</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>scim-group-ep</name>
      <value>example.com</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>scim-user-store-domain</name>
      <value>example.com</value>
   </provisioningProperties>
</provisioningConnectorConfigs>
```

  

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>scim-username</p></td>
<td><p>Username</p></td>
</tr>
<tr class="even">
<td><p>scim-password</p></td>
<td><p>Password</p></td>
</tr>
<tr class="odd">
<td><p>scim-user-ep</p></td>
<td><p>User Endpoint</p></td>
</tr>
<tr class="even">
<td><p>scim-group-ep</p></td>
<td><p>Group Endpoint</p></td>
</tr>
<tr class="odd">
<td><p>scim-user-store-domain</p></td>
<td><p>User Store Domain</p></td>
</tr>
</tbody>
</table>

---  

## SPML provisioning configuration

``` xml
<provisioningConnectorConfigs xmlns="http://model.common.application.identity.carbon.wso2.org/xsd">
   <enabled>true</enabled>
   <name>spml</name>
   <provisioningProperties>
      <name>spml-username</name>
      <value>testuser</value>
   </provisioningProperties>
   <provisioningProperties>
      <confidential>true</confidential>
      <name>spml-password</name>
      <value>testpw</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>spml-ep</name>
      <value>example.com</value>
   </provisioningProperties>
   <provisioningProperties>
      <name>spml-oc</name>
      <value>spml2person</value>
   </provisioningProperties>
</provisioningConnectorConfigs>
```

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Property Name</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>spml-username</p></td>
<td><p>Username</p></td>
</tr>
<tr class="even">
<td><p>spml-password</p></td>
<td><p>Password</p></td>
</tr>
<tr class="odd">
<td><p>spml-ep</p></td>
<td><p>SPML Endpoint</p></td>
</tr>
<tr class="even">
<td><p>spml-oc</p></td>
<td><p>SPML ObjectClass</p></td>
</tr>
</tbody>
</table>
