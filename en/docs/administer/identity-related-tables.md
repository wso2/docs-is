# Identity Related Tables

This section lists out all the identity related tables and their
attributes in the WSO2 Identity Server database.

#### IDN\_BASE\_TABLE

This table is used to provide information related to the server setup.
It has only one column `(PRODUCT\_NAME)`, which contains a row with the
value “WSO2 Identity Server”.  

#### IDN\_OAUTH\_CONSUMER\_APPS

This table is used when adding OAuth/OpenID Connect Configuration as
Inbound Authentication Configuration for a Service Provider. The
following table lists out the columns and the values they contain.

| Column           | Description                                                |
|------------------|------------------------------------------------------------|
| CONSUMER\_KEY    | The OAuth client key                                       |
| CONSUMER\_SECRET | The OAuth client secret                                    |
| USERNAME         | The username of the user who created the application       |
| TENANT\_ID       | The tenant ID                                              |
| APP\_NAME        | The name of the service provider                           |
| OAUTH\_VERSION   | The supported OAuth version of the application             |
| CALLBACK URL     | The URL to be redirected to when authorization is complete |
| GRANT\_TYPES     | All the grant types for the application                    |

#### IDN\_OAUTH1A\_REQUEST\_TOKEN

When using OAuth 1.0a, OAuth clients need to send the consumer key,
consumer secret and scope to the OAuth service and obtain a request
token. When the Identity Server returns a request token to such a
client, it adds a record to this table. The client will then receive the
request token and the OAuth verifier. The client can send these values
back to the service and obtain the OAuth access token. Then the record
in this table will be deleted and a new row will be added to the
`IDN\_OAUTH1A\_ACCESS\_TOKEN` table. The following table lists out the
columns and a description of the values it contains.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 75%" />
</colgroup>
<thead>
<tr class="header">
<th>Column</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>REQUEST_TOKEN</p></td>
<td>The generated request token value</td>
</tr>
<tr class="even">
<td>REQUEST_TOKEN_SECRET</td>
<td>The generated request token secret</td>
</tr>
<tr class="odd">
<td>CONSUMER_KEY</td>
<td>The consumer key of the OAuth application in the service provider</td>
</tr>
<tr class="even">
<td>CALLBACK_URL</td>
<td>The redirect URL specified for the client in the OAuth application in the service provider</td>
</tr>
<tr class="odd">
<td>SCOPE</td>
<td>The provided scope in the recieved request</td>
</tr>
<tr class="even">
<td>AUTHORIZED</td>
<td>True/False (indicates whether the resource owner authorized the request). Initially this column will be marked as false.</td>
</tr>
<tr class="odd">
<td>OAUTH_VERIFIER</td>
<td>Initially this column will be NULL. The client application then receives the request token and the request token secret after which it can authorize the request token where the user enters the credentials and authorizes the request.</td>
</tr>
<tr class="even">
<td>AUTHZ_USER</td>
<td>The username of the user that authorized the request token. Once the value of this column is added, the AUTHORIZED column will be marked as true and a random number will be inserted into the OAUTH_VERIFIER column for verification purposes.</td>
</tr>
</tbody>
</table>

#### IDN\_OAUTH1A\_ACCESS\_TOKEN

When using OAuth 1.0a and receiving a OAuth 1.0a request token, the
client application can obtain the access token by authorizing the
request token. The following table lists out the columns and a
description of the values it contains.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Column</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>ACCESS_TOKEN</td>
<td>Randomly generated access token value</td>
</tr>
<tr class="even">
<td><p>ACCESS_TOKEN_SECRET</p></td>
<td>Randomly generated access token secret</td>
</tr>
<tr class="odd">
<td>CONSUMER_KEY</td>
<td>The consumer key of the OAuth application created in the Service Provider</td>
</tr>
<tr class="even">
<td>SCOPE</td>
<td>The authorized scope</td>
</tr>
<tr class="odd">
<td>AUTHZ_USER</td>
<td>The username of the user who authorized the request token for obtaining the access token</td>
</tr>
</tbody>
</table>

#### IDN\_OAUTH2\_AUTHORIZATION\_CODE

When a client application is used with OAuth 2 authorization code grant
type, after the authentication, the Identity Server returns the
authorization code to the client. When this occurs, a record is added to
this table. The client application can then request the OAuth access
token using the authorized code. When the access token is returned, the
record with that authorization code is deleted from this table.The
following table lists out the columns and a description of the values it
contains.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Column</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>AUTHORIZATION_CODE</p></td>
<td>The generated authorization code value</td>
</tr>
<tr class="even">
<td>CONSUMER_KEY</td>
<td>The particular consumer key for which the authorization code was generated. It is used to identify the OAuth application.</td>
</tr>
<tr class="odd">
<td>CALLBACK_URL</td>
<td>The redirect URL of the client for returning the authorization code</td>
</tr>
<tr class="even">
<td>SCOPE</td>
<td>The approved OAuth scope</td>
</tr>
<tr class="odd">
<td>AUTHZ_USER</td>
<td>The fully qualified username (with the tenant domain) of the user who authorized the application</td>
</tr>
<tr class="even">
<td>TIME_CREATED</td>
<td>The date and time when the authorization code was generated</td>
</tr>
<tr class="odd">
<td><p>VALIDITY_PERIOD</p></td>
<td>The validity time period for the authorization code (default value is 300000 ms)</td>
</tr>
</tbody>
</table>

#### IDN\_OAUTH2\_ACCESS\_TOKEN

When an OAuth2 access token is returned to a client, a record will be
added to this table. The following table lists out the columns and a
description of the values it contains.

| Column           | Description                                                                                      |
|------------------|--------------------------------------------------------------------------------------------------|
| ACCESS\_TOKEN    | The access token                                                                                 |
| REFRESH\_TOKEN   | The refresh token                                                                                |
| CONSUMER\_KEY    | The consumer key of the OAuth application                                                        |
| AUTHZ\_USER      | The fully qualified username (with the tenant domain) of the user who authorized the application |
| USER\_TYPE       | The type of user                                                                                 |
| TIME\_CREATED    | The date time value when the access token was generated                                          |
| VALIDITY\_PERIOD | The validity period of the token (default is 3600000 ms)                                         |
| TOKEN\_SCOPE     | The scope of the access token                                                                    |
| TOKEN\_STATE     | The state of the access token (ACTIVE)                                                           |
| TOKEN\_STATE\_ID |                                                                                                  |

#### IDN\_OAUTH2\_SCOPE

When the Identity Server is used with a product such as the WSO2 API
Manager, custom OAuth scopes can be defined. The following table lists
out the columns and a description of the values it contains.

| Column      | Description                |
|-------------|----------------------------|
| SCOPE\_ID   | The unique ID of the scope |
| SCOPE\_KEY  | A scope key                |
| NAME        | Name for the scope         |
| DESCRIPTION | Description of the scope   |
| TENANT\_ID  | Tenant ID                  |
| ROLES       | List of roles given        |

!!! note
    
    In a standalone WSO2 Identity Server instance, this table will not get
    populated with data.
    

#### IDN\_OAUTH2\_RESOURCE\_SCOPE

When the Identity Server is used with a product such as WSO2 API
Manager, the custom scopes defined for the APIs will be stored in the
`IDN\_OAUTH2\_SCOPE` table. These scopes can be mapped with the resources
in the API and these resources and scopes mapping are stored in this
table. The following table lists out the columns and a description of
the values it contains.

| Column         | Description                                                                             |
|----------------|-----------------------------------------------------------------------------------------|
| RESOURCE\_PATH | The path to the resource                                                                |
| SCOPE\_ID      | The ID of the scope that points to the SCOPE\_ID column of the IDN\_OAUTH2\_SCOPE table |

!!! note
    
    In a standalone WSO2 Identity Server instance, this table will not get
    populated with data.
    

####  IDN\_SCIM\_GROUP

When creating a new role in the user store,  if the
`         SCIMEnabled        ` property in the user store configuration
is set to true, the SCIM attributes for the created role are stored in
this table.  For each role that is created, there are multiple rows
stored since multiple SCIM attributes are associated with a role
(GROUP). The following table lists out the columns and a description of
the values it contains.

| Column      | Description                     |
|-------------|---------------------------------|
| ID          |                                 |
| TENANT\_ID  | Tenant ID                       |
| ROLE\_NAME  | The name of the role            |
| ATTR\_NAME  | The name of the SCIM attribute  |
| ATTR\_VALUE | The value of the SCIM attribute |

#### IDN\_SCIM\_PROVIDER

This table is not used in the latest version of WSO2 Identity Server.

-   `CONSUMER\_ID`
-   `PROVIDER\_ID`
-   `USER\_NAME`
-   `USER\_PASSWORD`
-   `USER\_URL`
-   `GROUP\_URL`
-   `BULK\_URL`

#### IDN\_OPENID\_REMEMBER\_ME

This table is not being used in the latest version of Identity Server
because the 'Remember Me' feature is handled from the authentication
framework.

-   `USER\_NAME`
-   `TENANT\_ID`
-   `COOKIE\_VALUE`
-   `CREATED\_TIME`

#### IDN\_OPENID\_USER\_RPS

When users login to OpenID relying party applications where the OpenID
authentication is provided by the Identity Server, the login details are
stored in this table. The following table lists out the columns and a
description of the values it contains.

| Column                 | Description                                                                                                                        |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| USER\_\_NAME           | The username of the logged in user                                                                                                 |
| TENANT\_ID             | Tenant ID of the tenant that the user belongs to                                                                                   |
| RP\_URL                | The URL of the relying party to which it should be redirected upon successful login                                                |
| TRUSTED\_ALWAYS        | True/False (indicates whether the user has given the  “Approve Always” or “Approve” options of the application for authentication) |
| LAST\_VISIT            | Date of the last login of the user                                                                                                 |
| VISIT\_COUNT           | The number of successful login attempts for the user                                                                               |
| DEFAULT\_PROFILE\_NAME | The default profile name                                                                                                           |

#### IDN\_OPENID\_ASSOCIATIONS

The OpenID associations are stored in this table. The following table
lists out the columns and a description of the values it contains.

| Column       | Description                                         |
|--------------|-----------------------------------------------------|
| HANDLE       | The association handle                              |
| ASSOC\_TYPE  | The OpenID association type                         |
| EXPIRE\_IN   | The datetime value of the expiry of the association |
| MAC\_KEY     | The Message Authentication Code of the association  |
| ASSOC\_STORE |                                                     |

#### IDN\_STS\_STORE

When the Identity Server is used as a Security Token Service which
issues access tokens, such records are stored in following table.
Following are the columns of the table.

-   `ID`
-   `TOKEN\_ID`
-   `TOKEN\_CONTENT`
-   `CREATE\_DATE`
-   `EXPIRE\_DATE`
-   `STATE`

#### IDN\_IDENTITY\_USER\_DATA

When using a JDBC user store, the user attributes of a user are stored
in the `UM\_USER\_ATTRIBUTE` table for the supported claims. There are
some claims used for Identity Management features that should be handled
specifically. Claims used for Identity Management feature will be stored
in the userstore which is specified in the
`         <IS_HOME>/repository/conf/security/identity-mgt.properties        `
file. In that property file, the property
`         Identity.Mgt.User.Data.Store        ` is used to define what
kind of store it uses to store those reserved claims. Upon updating the
user profile, these claims and their mapped attribute values will be
inserted to this table.  

!!! note
    
    -   If you specify
        `           org.wso2.carbon.identity.mgt.store.UserStoreBasedIdentityDataStore          `
        for the `           Identity.Mgt.User.Data.Store          ` property
        which is the default store, it will use the same user store where
        the user resides for storing these special attributes.
    
    -   If you specify
        `           org.wso2.carbon.identity.mgt.store.JDBCIdentityDataStore          `
        for the `           Identity.Mgt.User.Data.Store          `
        property, it will not use the user's user store and will instead use
        Identity Server's internal JDBC database to store those claims.
    

  
  
The reserved claims are as follows:

-   Any claim that contains the part : `http://wso2.org/claims/challengeQuestion` for its claim URI
    -  `http://wso2.org/claims/challengeQuestion1`
    -  `http://wso2.org/claims/challengeQuestion2`
    -  `http://wso2.org/claims/challengeQuestionUris`

-   Any claim that contains part `http://wso2.org/claims/identity` for its claim URI
    -  `http://wso2.org/claims/identity/accountLocked`
    -  `http://wso2.org/claims/identity/failedLoginAttempts`
    -  `http://wso2.org/claims/identity/unlockTime`
    -  `http://wso2.org/claims/identity/passwordTimestamp`

The following table lists out the columns and a description of the
values it contains.

| Column      | Description                                       |
|-------------|---------------------------------------------------|
| TENANT\_ID  | The ID of the tenant to which the user belongs to |
| USER\_NAME  | The username of the user                          |
| DATA\_KEY   | The Claim URI of the supported claim              |
| DATA\_VALUE | The user attribute value of the particular claim  |

#### IDN\_IDENTITY\_META\_DATA

-   `USER\_NAME`
-   `TENANT\_ID`
-   `METADATA\_TYPE`
-   `METADATA`
-   `VALID`

#### IDN\_THRIFT\_SESSION

This table is used to store the authenticated Thrift session. Once the
user is authenticated to the thrift authenticator, it creates a thrift
session. This is mainly used in the XACML feature in WSO2 Identity
Server. The **Entitlement Service** of the Identity Server is exposed
via **Thrift** transport and in order to access this admin service, it
must be authenticated. The following table lists out the columns and a
description of the values it contains.

| Column               | Description                                 |
|----------------------|---------------------------------------------|
| SESSION\_ID          | The unique idea of the created session      |
| USER\_NAME           | The username of the user                    |
| CREATED\_TIME        | The time that the session was created       |
| LAST\_MODIFIED\_TIME | The time that the session was last modified |

#### IDN\_ASSOCIATED\_ID

In the Identity Server Dashboard, users can associate their social
identity (i.e. Facebook, Yahoo, Google, Microsoft ) with the user
account created in the Identity Server. The following table lists out
the columns and a description of the values it contains.

| Column        | Description                                                                              |
|---------------|------------------------------------------------------------------------------------------|
| ID            |                                                                                          |
| IDP\_USER\_ID | The user's username in the social account (i.e., Facebook username)                      |
| TENANT\_ID    | The ID of the tenant in which the user is created                                        |
| IDP\_ID       | The ID of the identity provider which contains the federated authenticator               |
| USER\_NAME    | The username of the user in Identity Server that this social identity is associated with |

#### IDN\_AUTH\_SESSION\_STORE

When the remember me option is selected when logging into the either a
service provider or the Identity Server, session data is persisted
provided that the session data persistence is enabled from
configuration. The following table lists out the columns and a
description of the values it contains.

| Column          | Description                      |
|-----------------|----------------------------------|
| SESSION\_ID     | The unique ID of the session     |
| SESSION\_TYPE   | The type of session created      |
| SESSION\_OBJECT | The session object               |
| TIME\_CREATED   | The time of the session creation |

![Identity related tables]( ../../assets/img/using-wso2-identity-server/identity-related-tables.png)
