# User Impersonation

User impersonation involves an authorization server’s ability to temporarily grant access to another user's account. With this feature, a user with required permission can impersonate any user within the organization.

!!! note
    This feature is only available from update level 41 onwards. If you don't already have this update, see the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/updates/overview/).

## Setting up the {{ product_name }}

### Enable Impersonation Feature

#### Apply deployment.toml configuration

You need to apply following deployment.toml configurations before statring the server.
```toml
[[oauth.custom_response_type]]
name= "subject_token"
class= "org.wso2.carbon.identity.oauth2.authz.handlers.SubjectTokenResponseTypeHandler"
validator= "org.wso2.carbon.identity.oauth.common.SubjectTokenResponseValidator"

[[oauth.custom_response_type]]
name= "id_token subject_token"
class= "org.wso2.carbon.identity.oauth2.authz.handlers.SubjectTokenResponseTypeHandler"
validator= "org.wso2.carbon.identity.oauth.common.SubjectTokenResponseValidator"

[[api_resources]]
name= "User Impersonation"
identifier= "system:impersonation"
requiresAuthorization= true
description= "Resource representation of the User Impersonation"
type= "TENANT"

[[api_resources.scopes]]
displayName = "User Impersonation Scope"
name = "internal_user_impersonate"
description = "Allows to impersonate another user"
```

#### Add Impersonation Configuration Resource

Impersonation feature requires a config type to be added to the IDN_CONFIG_TYPE table. Please find the relevant db scripts below. 

??? Example "DB2"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "H2"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "MsSQL"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "MYSQL"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');

    ```

??? Example "MYSQL-Cluster"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "Oracle"
    
    ```sql
    INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "OracleRac"
    
    ```sql
    INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "Postgres"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

Alternatively you can use Config Management REST API to add this configuration. Please find the sample curl below.

```curl
curl --location 'https://<serverUrl>/api/identity/config-mgt/v1.0/resource-type' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--data '{"name": "IMPERSONATION_CONFIGURATION", "description": "A resource type to keep the tenant impersonation preferences."}'
```

You only need to run this command once per deployment.


### Configure the application

#### Subscribe to Impersonation API 

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and go to API Authorization tab of the application and click authorize API Resource.

3. Search for User Impersonation under management APIs and subscribe to the application.

    ![Api-Authorization-Impersonation]({{base_path}}/assets/img/guides/authorization/impersonation/api-authorization-impersonation.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Switch to the Roles tab, click on **+ New Role** to create a Role and assign the Impersonation Scope.

    ![Role-Creation]({{base_path}}/assets/img/guides/authorization/impersonation/role-creation.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Create a User and assign to the Role.

!!! note
    To read about subscribing APIs and authorize using Role Based Access Control (RBAC) check [Role-based access control (RBAC)]({{base_path}}/guides/authorization/api-authorization/api-authorization/)

#### Configure Subject token for the application

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and go to Protocol tab.

3. Enable **Token Exchange** grant type.

4. Enable subject token.

5. [Optional] Configure Subject token expiry time by default it is 3 minutes.

    ![Subject-Token-Config]({{base_path}}/assets/img/guides/authorization/impersonation/subject-token-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Enable **JWT type** Access token.

#### Apply application advanced configuration

1. Select the application and go to Application Advanced tab.

2. Enable skip login consent and Enable skip logout consent.

## Impersonating a User

Impersonating a user involves two step process.

1. Acquire Subject token from Authorize endpoint.

2. Exchange subject token for impersonated access token using Token Exchange grant type.

    ![Impersonation-Flow]({{base_path}}/assets/img/guides/authorization/impersonation/Impersonation-flow.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Acquire Subject Token

A security JWT token that represents the identity of both parties Impersonator and End-User. Subject token can be used to exchange impersonated access token. To obtain subject token, client need to initiate an authorize call with following query parameters.

**Request Format**
``` bash
https://{{ host_name }}/oauth2/authorize?response_type=code&redirect_uri={redirect_uri}&client_id={client_id}state=<sample_state>&scope=internal_user_impersonate%20{Other_Required_Scopes}&response_type=id_token%20subject_token&requested_subject={User_id_of_the_end_user}&nonce={nonce}
```

**Sample Request**
``` bash
https://localhost:9443/oauth2/authorize?client_id=jVcW4oLn1Jjb2T94H4gtPV9z5Y0a&state=sample_state&scope=internal_user_impersonate%20openid%20internal_org_user_mgt_view%20internal_org_user_mgt_list%20internal_user_mgt_delete%20internal_org_user_mgt_create%20internal_login%20internal_user_mgt_delete%20internal_user_mgt_view%20internal_user_mgt_list%20internal_user_mgt_update%20internal_user_mgt_create%20readBooking%0A&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&response_type=id_token%20subject_token&requested_subject=32bc4697-ed0f-4546-8387-dcd6403e7caa&nonce=2131232
```

**Sample Response after sucessful authorization**
``` bash
https://oauth.pstmn.io/v1/callback#id_token={id_token}&session_state=ecfb74cde9f694c1de0905aa40a5f6fc1dd595bdcfd739cbd3dd5b964da53325.1554z-G22KW3pwK_hYhqPw&state=sample&subject_token={subject_token}
```


!!! note
    - In Subject token requrest,

        - Response type can be **id_token subject_token** or **subject_token**.
        - Scope should contain **internal_user_impersonate** scope with other required scopes.
        - Requested_subject should be a valid user id.
        - Authorizing user should have a role that is associated with Impersonation permission related to the application.
        - Nonce is required if you re using “id_token subject_token” response type.


#### JWT cliams of Subject Token

Apart from generic claims, subject token has a claim **may_act**. The **may_act** claim makes a statement that one party is authorized to become the actor and act on behalf of another party. Here **sub** id inside **may_act** claim hold the identity of the impersoator.


``` json
{
  "sub": "32bc4697-ed0f-4546-8387-dcd6403e7caa",
  "aud": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "nbf": 1718694997,
  "azp": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view internal_user_mgt_list internal_user_mgt_view",
  "iss": "https://localhost:9443/oauth2/token",
  "may_act": {
    "sub": "2d931c9d-876e-46c0-9aba-f34501879dfc"
  },
  "exp": 1718712997,
  "iat": 1718694997,
  "jti": "66dff3b0-2828-4bc0-8a27-84aa9bd3ebdb",
  "client_id": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a"
}
```

### Acquire Impersonated Access Token

Token exchange grant type can be used exchange subject for an impersonated access token. 

**Request Format**
``` bash
curl --location 'https://{{ host_name }}/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
--data-urlencode 'subject_token={subeject_token}' \
--data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt' \
--data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token' \
--data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
--data-urlencode 'actor_token={id_token}' \
--data-urlencode 'actor_token_type=urn:ietf:params:oauth:token-type:id_token'
```

**Sample Response**
``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJuYmYiOjE3MTg2OTUwNTIsImFjdCI6eyJzdWIiOiIyZDkzMWM5ZC04NzZlLTQ2YzAtOWFiYS1mMzQ1MDE4NzlkZmMifSwiYXpwIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsIm9yZ19pZCI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsInNjb3BlIjoiaW50ZXJuYWxfbG9naW4gaW50ZXJuYWxfb3JnX3VzZXJfbWd0X2xpc3QgaW50ZXJuYWxfb3JnX3VzZXJfbWd0X3ZpZXcgaW50ZXJuYWxfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF91c2VyX21ndF92aWV3IG9wZW5pZCIsImV4cCI6MTcxODY5ODY1Miwib3JnX25hbWUiOiJTdXBlciIsImlhdCI6MTcxODY5NTA1MiwianRpIjoiMDcyOGQ1MTctNzk2OC00NzRmLWJkN2QtMTI1MzdjY2JlNDM2In0.FqavHBDNLo-nMMgJ3OTDswo7pl6zMztpUkm-cgBOgDJPek_FAEQzt4DFxGglnf2-AtnRN14wPOv9_M_DYJWH529hbwYBVrQQDlJmcF1WtWX_MnBgBGsIfA5_3nzocZWBqj5KDjbXS3_3CSexQ9_h3tKWCDX1oit03flcs7E_xG_nkWV1TUPFUAaoHrMWTROIttN1iFqwRjeg6Bkqjx8hHM3Dn7E9Zsmby0EhuC7i41kid2s9F_5XPPMCYM0gyxX5lAjsf6UFth9v3SWIuMLFgiq5Eh6u4pCs9srh2A5t0DIcKMwyXTEm-QVIhGi1zkB-wGV6yYD9TwbiujnrqOyFQA",
    "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view internal_user_mgt_list internal_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

#### JWT cliams of Impersonated Access Token

Apart from generic claims, impersonated access token has a claim **act**. The **act** (actor) claim provides a means within a JWT to express that impersonation has occurred and identify the acting party to whom authority has been impersonated. The act claim value is a JSON object, Here **sub** id inside **act** claim hold the identity of the actor.

``` json

{
  "sub": "32bc4697-ed0f-4546-8387-dcd6403e7caa",
  "aut": "APPLICATION_USER",
  "iss": "https://localhost:9443/oauth2/token",
  "client_id": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "aud": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "nbf": 1718695052,
  "act": {
    "sub": "2d931c9d-876e-46c0-9aba-f34501879dfc"
  },
  "azp": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "org_id": "10084a8d-113f-4211-a0d5-efe36b082211",
  "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view internal_user_mgt_list internal_user_mgt_view",
  "exp": 1718698652,
  "org_name": "Super",
  "iat": 1718695052,
  "jti": "0728d517-7968-474f-bd7d-12537ccbe436"
}

```

The sub claim is the impersonated user (32bc4697-ed0f-4546-8387-dcd6403e7caa), while act.sub contains the ID of the impersonator (2d931c9d-876e-46c0-9aba-f34501879dfc). Client can detect impersonation using **act** claim  in the access token.

### Email Notification for impersonated user

Once impersonated access token obtained, Authorization server will send an email notification to impersonated user.

#### Configure Impersonation Email Notification

1. Go to Login and Registration section.

2. Select Impersonation Configurations under Organizations settings.

    ![Impersonation-Config]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Here you can enable/disable the email notification. When enabled, an email notification will send to impersonated user. By default, this configuration is enabled.

    ![Impersonation-Email-Config]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-email-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Following is the default template of impersonation notification.

![Impersonation-Email-Notification]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-email-notification.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    See [Customize email templates]({{base_path}}/guides/branding/customize-email-templates/#configure-email-templates) for more information about customise the email template according to your branding preferences.

## Access protected resources using Impersonated Access token

Impersonated access token can be used as same as generic access token to access protected resources as impersonated user.

### Audit logs for Impersonation

When a resource get modified using impersonated access token, an audit log will be printed expressing the details of the resource modification. These audit logs can be used to track actions performed by impersonation.

**Audit log  Format**
``` java
TID: [-1234] [2024-06-03 14:50:42,298] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} - Initiator={Impersonated_User_Id} Action=resource-modification-via-impersonation Target={Impersonated_User_Id}  Data={"ResourcePath":{Resource_Path} ,"clientId":{Client_Id} ,"subject":{Impersonated_User_Id},"scope":{Scope Issued for the Impersonated Access token} ,"impersonator":{Impersonater Id} ,"httpMethod":{Http Method} } Outcome=AUTHORIZED
```

**Sample Audit Log**
``` java
TID: [-1234] [2024-06-03 14:50:42,298] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} - Initiator=0fa51985-d36d-4492-9ebd-298f9d68861f Action=resource-modification-via-impersonation Target=49de2b73-5f0b-44db-bf75-6fddec4b058e Data={"ResourcePath":"/scim2/Me","clientId":"luoljDTbHYcfx6YWT_7wsYs67rsa","subject":"49de2b73-5f0b-44db-bf75-6fddec4b058e","scope":"internal_login internal_user_mgt_list internal_user_mgt_view","impersonator":"0fa51985-d36d-4492-9ebd-298f9d68861f","httpMethod":"PATCH"} Outcome=AUTHORIZED
```

Addtionally all existing audits logs will be appended by Impersonater Id, if the resource accessed via impersonation. Following is the sample audit log when the user claim updated via Impersonation.

``` java
TID: [-1234] [2024-06-03 14:50:42,976] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} - Initiator=49de2b73-5f0b-44db-bf75-6fddec4b058e Action=Set-User-Claim-Values Target=t******r Data={"ServiceProviderName":"POSTMAN_SBA","Claims":{"http://wso2.org/claims/country":"S***n","http://wso2.org/claims/modified":"2*************************Z","profileConfiguration":"d*****t"}} Outcome=Success | Impersonator : 0fa51985-d36d-4492-9ebd-298f9d68861f
```

## Access protected resources of invited user in the sub organization.

You can use the impersonated access token to exchange for a sub oirganization bound impersonated access token. To use this flow, impersonated user should be invited from parent organization.

!!! note
    To read about inviting users from parent organization check [Invite users from the parent organization]({{base_path}}/guides/organization-management/invite-parent-organization-users/)

![Impersonation-sub-org]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-flow-sub-org.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

**Request Format**
``` bash
curl --location 'https://{{ host_name }}/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
--data-urlencode 'client_id={Client_Id}' \
--data-urlencode 'grant_type=organization_switch' \
--data-urlencode 'scope={Organization API Scopes}' \
--data-urlencode 'switching_organization={Organization_Id}' \
--data-urlencode 'token={Impersonated Access Token}'
```

**Sample Response**
``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJ1c2VyX29yZyI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsIm5iZiI6MTcxODY5NTA3MiwiYWN0Ijp7InN1YiI6IjJkOTMxYzlkLTg3NmUtNDZjMC05YWJhLWYzNDUwMTg3OWRmYyJ9LCJhenAiOiJqVmNXNG9MbjFKamIyVDk0SDRndFBWOXo1WTBhIiwib3JnX2lkIjoiMTU1OGViZjYtMTdlMC00MTY1LWI5YzAtYTgxMTdjODc4MDZiIiwic2NvcGUiOiJpbnRlcm5hbF9sb2dpbiBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfdmlldyIsImV4cCI6MTcxODY5ODY3Miwib3JnX25hbWUiOiJTdWJPcmciLCJpYXQiOjE3MTg2OTUwNzIsImp0aSI6IjA2NjcwOGYzLWQyNzYtNDQyMi1iZWZlLTE0Njk3N2RlMDA4ZiJ9.XliLCV0IS-KzYZTriSBpVacg-u4l0tLiRoBwWmjoyZz-9-LbCAf-oAweywpaWM7kwo6EaxCZ1S4Am5K1hh-R9Rp5RP1PouxL407MHd-gRpLU5x8V1c9PmofZgWNrrqWLgvxi-MjI-XRkFqMARf39tfBgqHcsZA8Ixeht8zN16EL4GTeYMWbcIuHPSDKaQ-_ZgOcoL1fim3ELUMc0N7Mtv4QGM8bHjhKUQV-wHrj6CRcx7TmyCcMyW1rqLpyqbnkbiOoUDlz0AvK_TxNVt4qhVsgS-9ZCmLb4fdIWTdsqAiZrM7Cfn1HT16PsGP0YTqz3AI3c_ZqTGuH867E6qxJpzg",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```
Retrieved access token also has a claim **act** which holds the identity of the impersonator. Client can detect impersonation using **act** claim in the access token.

## Extending Impersonation Authorization

[ImpersonationValidator](https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/master/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/impersonation/validators/ImpersonationValidator.java) service used to entend custom impersonation validators. Currently following validators are engaged in Impersonation authorization flow.

- SubjectScopeValidator -  It checks the authorization scopes associated with the impersonation request to determine if the requested scopes are authorized for the impersonated user. 

- ImpersonatorPermissionValidator -  This class validates whether an authenticated user has the necessary impersonation permissions within a given tenant and for a specified client.

You can extend this validation process by adding custom validators as OSGi Service.
