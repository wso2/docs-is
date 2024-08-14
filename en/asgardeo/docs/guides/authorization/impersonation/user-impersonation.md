# User Impersonation

User impersonation involves an authorization server’s ability to temporarily grant access to another user's account. With this feature, a user with required permission can impersonate any user within the organization.

## Setting up the {{ product_name }}

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

``` 
https://api.asgardeo.io/t/{organization_name}/oauth2/authorize?response_type=code&redirect_uri={redirect_uri}&client_id={client_id}state=<sample_state>&scope=internal_user_impersonate%20{Other_Required_Scopes}&response_type=id_token%20subject_token&requested_subject={User_id_of_the_end_user}&nonce={nonce}
```

**Sample Request**
``` 
https://api.asgardeo.io/t/bifrost/oauth2/authorize?client_id=jVcW4oLn1Jjb2T94H4gtPV9z5Y0a&state=sample_state&scope=internal_user_impersonate%20openid%20internal_org_user_mgt_view%20internal_org_user_mgt_list%20internal_user_mgt_delete%20internal_org_user_mgt_create%20internal_login%20internal_user_mgt_delete%20internal_user_mgt_view%20internal_user_mgt_list%20internal_user_mgt_update%20internal_user_mgt_create%20readBooking%0A&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&response_type=id_token%20subject_token&requested_subject=32bc4697-ed0f-4546-8387-dcd6403e7caa&nonce=2131232
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
  "iss": "https://api.asgardeo.io/t/{organization_name}/oauth2/token",
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

Token exchange grant type can be used exchange subject for an impersonated access token.  Impersonated access token can be used as same as generic access token to access protected resources as impersonated user.

**Request Format**
``` bash
curl --location 'https://api.asgardeo.io/t/{organization_name}/oauth2/token' \
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
  "iss": "https://api.asgardeo.io/t/bifrost/oauth2/token",
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
  "org_name": "bifrost",
  "iat": 1718695052,
  "jti": "0728d517-7968-474f-bd7d-12537ccbe436"
}

```

The sub claim is the impersonated user (32bc4697-ed0f-4546-8387-dcd6403e7caa), while act.sub contains the ID of the impersonator (2d931c9d-876e-46c0-9aba-f34501879dfc). Client can detect impersonation using **act** claim  in the access token.

### Audit logs for Impersonation

When a resource get modified using impersonated access token, an audit log will be printed expressing the details of the resource modification. These audit logs can be used to track actions performed by impersonation.

![Impersonation-Audit-Log]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-audit-logs.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


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

## Access protected resources of invited user in the sub organization.

You can use the impersonated access token to exchange for a sub oirganization bound impersonated access token. To use this flow, impersonated user should be invited from parent organization.

!!! note
    To read about inviting users from parent organization check [Invite users from the parent organization]({{base_path}}/guides/organization-management/invite-parent-organization-users/)

![Impersonation-sub-org]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-flow-sub-org.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

**Request Format**
``` bash
curl --location 'https://api.asgardeo.io/t/{organization_name}/oauth2/token' \
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
