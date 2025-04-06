# User Impersonation

User impersonation is a feature that allows an authorized user to act as another user. This may be useful in instances where an admin or a support personnel 
wishes to perform actions on behalf of a user without requiring the credentials of the user.

This guide explains how you can implement user impersonation in {{product_name}}.

## Configure your application for user impersonation

You can go through the following steps to prepare your application for user impersonation.

### Prerequisites

{% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}

- Enable impersonation. To do so, apply the following configurations in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.

    ```bash
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

- Insert a new configuration type into the `IDN_CONFIG_TYPE` table of your database. The relevant DB scripts are shown  below.

    ??? Example "DB2"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "H2"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "MsSQL"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "MYSQL"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "MYSQL-Cluster"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "Oracle"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "OracleRac"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    ??? Example "Postgres"
    
        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07',     'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
        ```

    Alternatively you can use [Config Management REST API]({{base_path}}/apis/use-the-configuration-management-rest-apis/) to add this configuration as shown below.

    ```curl
    curl --location 'https://<serverUrl>/api/identity/config-mgt/v1.0/resource-type' \
    --header 'accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4=' \
    --data '{"name": "IMPERSONATION_CONFIGURATION", "description": "A resource type to keep the tenant impersonation    preferences.
    ```

- You need to have an application registered in {{product_name}}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).

{% else %}
To get started, you need to have an application registered in {{product_name}}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).
{% endif %}

### Step 1: Authorize application for user impersonation

First, your application should be authorized to consume the user impersonation API. To do so,

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application and go to its **API Authorization** tab.

3. Click **Authorize an API Resource** and do the following:

    1. Under **API Resource**, select **User Impersonation**.

    2. Under **Authorized Scopes**, select **User Impersonation Scope**.

    3. Click **Finish**.

        ![Authorize impersonation API]({{base_path}}/assets/img/guides/authorization/impersonation/api-authorization-impersonation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    Refer to [API authorization with RBAC]({{base_path}}/guides/authorization/api-authorization/api-authorization/) to learn more about API authorizations.

### Step 2: Create a user role that allows user impersonation

Next, let's create an application role and provide impersonation permissions to it. This role can then be assigned to users who are required to impersonate other users.

1. Switch to the **Roles** tab of the application.

2. Under **Role Audience**, select **Application**.

3. Click **New Role** and do the following:

    1. Provide a suitable role name.

    2. Under **API Resource**, select **User Impersonation**.

    3. Select the checkbox corresponding to **User Impersonation** to select its scopes.

    4. Click **Create**.

        ![Role-Creation]({{base_path}}/assets/img/guides/authorization/impersonation/role-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    You may assign users to the application role you created to provide them with user impersonation permissions. Refer to [Manage roles]({{base_path}}/guides/users/manage-roles/) to learn more about roles and how to assign users to roles.

### Step 3: Configure the subject token of the application

The subject token contains information about the impersonated user and can be exchanged to obtain access tokens and ID tokens on their behalf. Your application should allow subject tokens as an acceptable response type to authorization calls. To do so,

1. Switch to the **Protocol** tab of your application.

2. Under **Allowed grant types**, select **Token Exchange**.

3. Under **Access Token** > **Token type**, select **JWT**.

4. Under **Subject Token**, select **Enable subject token response type**. Optionally, set the token expiry time in seconds.

5. Click **Update** to save the changes.

    ![Subject-Token-Config]({{base_path}}/assets/img/guides/authorization/impersonation/subject-token-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


### Step 4: Skip consent pages of applications

Since the user is pre-approved to impersonate another user, we can bypass the consent prompts during both login and logout processes. To do so,

1. Switch to the **Advanced** tab of the application.

2. Select **Skip login consent** and **Skip logout consent**.

3. Click **Update** to save the changes.

## Get tokens for user impersonation

User impersonation involves the following two steps.

1. Acquire a subject token from the authorization endpoint. This token contains information on the impersonated user.

2. Exchange the subject token for an access token and an ID token. These tokens provide you with authorization and authentication capabilities of the impersonated user.

The following diagram outlines the detailed steps involved in user impersonation:

![Impersonation-Flow]({{base_path}}/assets/img/guides/authorization/impersonation/Impersonation-flow.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Acquire a subject token

Subject token is a JWT token that contains information on both the impersonated user and the impersonator. To obtain a subject token, the client should initiate an authorization request with the following query parameters.

=== "Request Format"

    ``` bash
    https://{{base_url}}/oauth2/authorize?
      client_id={clientID}
      redirect_uri={redirect_uri}
      &state={sample_state}
      &scope=internal_user_impersonate,{other_Required_Scopes}
      &response_type={response_type}
      &requested_subject={userid_of_the_end_user}
      &nonce={nonce}

    ```

=== "Sample Request"
    
    ``` bash
    https://{{base_url_sample}}/oauth2/authorize?
      client_id=jVcW4oLn1Jjb2T94H4gtPV9z5Y0a
      &redirect_uri=https://oauth.pstmn.io/v1/callback
      &state=sample_state
      &scope=internal_user_impersonate,openid,internal_org_user_mgt_view
      &response_type=id_token subject_token
      &requested_subject=32bc4697-ed0f-4546-8387-dcd6403e7caa
      &nonce=2131232
    ```

The subject token request contains the following parameters:

<table>
    <tr>
        <td>client_id</td>
        <td>The client ID obtained when registering the application in {{product_name}}.</td>
    </tr>
    <tr>
        <td>redirect_uri</td>
        <td>The URL to where the response is redirected to at the end of the process.</td>
    </tr>
    <tr>
        <td>scope</td>
        <td>Scope should contain <code>internal_user_impersonate</code> scope along with other required scopes.</td>
    </tr>
    <tr>
        <td>response_type</td>
        <td>Response type can be <code>id_token subject_token</code> or <code>subject_token</code>.</td>
    </tr>
    <tr>
        <td>requested_subject</td>
        <td>A valid user ID. This will be the impersonated user.</td>
    </tr>
    <tr>
        <td>nonce</td>
        <td>Required if the response type is <code>id_token subject_token</code>, to prevent ID token replay attacks.</td>
    </tr>
</table>

After successful authorization, the response will look similar to the following:

``` bash
https://oauth.pstmn.io/v1/callback
    ?id_token={id_token}
    &session_state=ecfb74cde9f694c1de0905aa40a5f6fc1dd595bdcfd739cbd3dd5b964da53325.1554z-G22KW3pwK_hYhqPw
    &state=sample
    &subject_token={subject_token}
```

The decoded subject token may looks as follows:

``` json
{
  "sub": "32bc4697-ed0f-4546-8387-dcd6403e7caa",
  "aud": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "nbf": 1718694997,
  "azp": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "scope": "internal_login internal_user_mgt_list internal_user_mgt_view",
  "iss": "https://{{base_url}}/oauth2/token",
  "may_act": {
    "sub": "2d931c9d-876e-46c0-9aba-f34501879dfc"
  },
  "exp": 1718712997,
  "iat": 1718694997,
  "jti": "66dff3b0-2828-4bc0-8a27-84aa9bd3ebdb",
  "client_id": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a"
}
```

In addition to the usual properties of an ID token, the subject token contains the `may_act` property. This property states that the user, 
whose ID is in `may_act.sub` property, is authorized to impersonate the user, whose ID is in the `sub` property.

### Acquire an impersonated access token

Once a subject token is received, it can then be exchanged for an access token which represents the permissions of the impersonated user. 

=== "Request Format"

    ``` bash
    curl --location 'https://{{base_url}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
    --data-urlencode 'subject_token={subject_token}' \
    --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token' \
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
    --data-urlencode 'actor_token={id_token}' \
    --data-urlencode 'actor_token_type=urn:ietf:params:oauth:token-type:id_token'
    ```

=== "Sample Request"

    ``` bash
    curl --location 'https://{{base_url_sample}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic QVVhZkoyeWpXM2dUR3JZaWZCTlF1MTBXRWtNYToybWN1blJ1T1Y5WFQ3QXpzRDEyVmY3cGhOVWJRUmdlT0NtZW5Wa0xKQTR3YQ==' \
    --data-urlencode 'subject_token=eyJ4NXQiOiJDN3Q1elQ4UUhXcWJBZ3ZJ9HVXWTN4UnlwcE0iLCJraWQiOiJaR0UyTXpjeE1XWXpORGhtTVRoak1HSmlOamhpTmpNMFlqWXhNakJtTUdZeFl6ZzBabU0zWldJd1pHRmxZakk1TTJZelpHTmtaalkxWXpBeE5qZzNNUV9SUzI1NiIsInR5cCI6Imp3dCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxYmI0NmMyOC0zN2U4LTQxN2UtYWI5NS0wMzAzYTYzM2ZlZTIiLCJhdWQiOiJBVWFmSjJ5alczZ1RHcllpZkJOUXUxMFdFa01hIiwibmJmIjoxNzI4ODc5NTQ3LCJhenAiOiJBVWFmSjJ5alczZ1RHcllpZkJOUXUxMFdFa01hIiwic2NvcGUiOiJpbnRlcm5hbF9vcmdfYXBwbGljYXRpb25fbWd0X3ZpZXcgb3BlbmlkIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS5hc2dhcmRlby5pb1wvdFwvaGltZXNoZGV2aW5kYVwvb2F1dGgyXC90b2tlbiIsIm1heV9hY3QiOnsic3ViIjoiNTllNmNlZWEtOGU2Ni00MTkyLWJlMDktMzQwYmIwMmQ1N2MxIn0sImV4cCI6MTcyODg3OTcyNywiaWF0IjoxNzI4ODc5NTQ3LCJqdGkiOiIzYjIzNDViOS1jN2Y4LTQ4MjUtYWYyNC1lNDRjYjk3Y2U5NWEiLCJjbGllbnRfaWQiOiJBVWFmSjJ5alczZ1RHcllpZkJOUXUxMFdFa01hIn0.UmhvpiqrgbgJ8MSXNkzyUMbw5c2BG5oWv9HpBDrZwig2HkM-FpceFlGi4tnl45LGAxDeVE2NJBAII3Q6ccMK0pk9DM2piX0m7gtxtfNy9XQURMad39JOY1GTy8p9uJY0wYWrYXYCc3nyF83kwu4y3xHABYd1JNjcZgLW_B5M1XUUk05cOOyJLOvjaMAkl8DlohD9mAY4-C2UyaxsG8ftfth4mMJZeg3MJOW150cye9TAil0SACO6DIv3Tik7Wt_zyghSueBKQiOqgLEXZdphIT-7TWYASiJigTX0n_PKBF67qOo9tD5FIDEh5fQquXYAjPP9LHJYeK_C6dkh9jiX7w' \
    --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token' \
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange' \
    --data-urlencode 'actor_token=eyJ4NXQiOiJDN3Q1elQ4UUhXcWJBZ3ZJOGVXWTN4UnlwcE0iLCJraWQiOiJaR0UyTXpjeE1XWXpORGhtTVRoak1HSmlOamhpTmpNMFlqWXhNakJtTUdZeFl6ZzBabU0zWldJd1pHRmxZakk1TTJZelpHTmtaalkxWXpBeE5qZzNNUV9SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJpc2siOiIzMWJmYjE4YWQ2Yzc1YmFjYWJmMmIzMDRmMmYyYmI2YTdlODY1Y2FiYTU2OGRkNDNiM2U3YzI3OGVlYzNjNzY3Iiwic3ViIjoiNTllNmNlZWEtOGU2Ni00MTkyLWJlMDktMzQwYmIwMmQ1N2MxIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvYXBpLmFzZ2FyZGVvLmlvXC90XC9oaW1lc2hkZXZpbmRhXC9vYXV0aDJcL3Rva2VuIiwibm9uY2UiOiIyMTIzNDUyMTMiLCJzaWQiOiI3ZWQwOTU1Mi1hZDQ0LTQ2NjYtOTJmMy0yYWM0MmJhZWNlYzQiLCJhdWQiOiJBVWFmSjJ5alczZ1RHcllpZkJOUXUxMFdFa01hIiwidXNlcl9vcmciOiJkZTljNWYxNC0xMGI2LTQ5OWEtOTkzZC04OWZjMzYyYmIyNDAiLCJzX2hhc2giOiJFLUlmSmNrWHNsdUwzRUpFcUttUlpnIiwiYXpwIjoiQVVhZkoyeWpXM2dUR3JZaWZCTlF1MTBXRWtNYSIsIm9yZ19pZCI6ImRlOWM1ZjE0LTEwYjYtNDk5YS05OTNkLTg5ZmMzNjJiYjI0MCIsImV4cCI6MTcyODg4MzE0Nywib3JnX25hbWUiOiJoaW1lc2hkZXZpbmRhIiwiaWF0IjoxNzI4ODc5NTQ3LCJqdGkiOiJkZmI2ODkxYS05MzMyLTQ0OGYtOGQ5ZC1hNDdjOGE3ZTE2OTAifQ.ODTLpicbOfjTEdi7QPOgVew9dxTcL5OR5x8REoujgKcE-mMXvt5wnX_dVp1q_jTWg7yoECJ9dw_KIqqrOOsAc09oGTmMJkqdCd5VoVLSbJ703hvXZU4DUtpjqulzWuuTACsT-eWNQ6IuGo1dP_34r3BucjxAmwCzMQJ_ngTIG213nnF4p5vFRBGxEdX1KkZL9X4Iogw1oweyPVuBAN_3FGOGErBCnRWhL1VNcTkuubcMzD2JafIxaD62Knwcv9x8lmQz__mVyCADhTTuXQ6r7EGk6GCebeL6tE5WFxfKrIDZJeLyoI4BSNK73L9q-iWAmk1OCIHu_RlubrYxMXxc3g' \
    --data-urlencode 'actor_token_type=urn:ietf:params:oauth:token-type:id_token'
    ```

The response will look similar to the following:

``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJuYmYiOjE3MTg2OTUwNTIsImFjdCI6eyJzdWIiOiIyZDkzMWM5ZC04NzZlLTQ2YzAtOWFiYS1mMzQ1MDE4NzlkZmMifSwiYXpwIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsIm9yZ19pZCI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsInNjb3BlIjoiaW50ZXJuYWxfbG9naW4gaW50ZXJuYWxfb3JnX3VzZXJfbWd0X2xpc3QgaW50ZXJuYWxfb3JnX3VzZXJfbWd0X3ZpZXcgaW50ZXJuYWxfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF91c2VyX21ndF92aWV3IG9wZW5pZCIsImV4cCI6MTcxODY5ODY1Miwib3JnX25hbWUiOiJTdXBlciIsImlhdCI6MTcxODY5NTA1MiwianRpIjoiMDcyOGQ1MTctNzk2OC00NzRmLWJkN2QtMTI1MzdjY2JlNDM2In0.FqavHBDNLo-nMMgJ3OTDswo7pl6zMztpUkm-cgBOgDJPek_FAEQzt4DFxGglnf2-AtnRN14wPOv9_M_DYJWH529hbwYBVrQQDlJmcF1WtWX_MnBgBGsIfA5_3nzocZWBqj5KDjbXS3_3CSexQ9_h3tKWCDX1oit03flcs7E_xG_nkWV1TUPFUAaoHrMWTROIttN1iFqwRjeg6Bkqjx8hHM3Dn7E9Zsmby0EhuC7i41kid2s9F_5XPPMCYM0gyxX5lAjsf6UFth9v3SWIuMLFgiq5Eh6u4pCs9srh2A5t0DIcKMwyXTEm-QVIhGi1zkB-wGV6yYD9TwbiujnrqOyFQA",
    "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view internal_user_mgt_list internal_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

The decoded access token may looks as follows:

``` json
{
  "sub": "32bc4697-ed0f-4546-8387-dcd6403e7caa",
  "aut": "APPLICATION_USER",
  "iss": "https://{{base_url_sample}}/oauth2/token",
  "client_id": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "aud": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "nbf": 1718695052,
  "act": {
    "sub": "2d931c9d-876e-46c0-9aba-f34501879dfc"
  },
  "azp": "jVcW4oLn1Jjb2T94H4gtPV9z5Y0a",
  "org_id": "10084a8d-113f-4211-a0d5-efe36b082211",
  "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view",
  "exp": 1718698652,
  "org_name": "bifrost",
  "iat": 1718695052,
  "jti": "0728d517-7968-474f-bd7d-12537ccbe436"
}

```

Apart from the generic claims, the impersonated access token has the `act` property which clients may use to detect impersonation.
The `act.sub` property holds the userid of the impersonator. 

In the example above, the `sub` property holds the value of `32bc4697-ed0f-4546-8387-dcd6403e7caa`, which is the userid of the impersonated user. The `act.sub` property
holds the value of `2d931c9d-876e-46c0-9aba-f34501879dfc`, which is the userid of the impersonator.

## Access logs related to user impersonation

In order to troubleshoot issues and keep track of the actions performed by impersonators, {{product_name}} supports logs for user impersonation. Whenever a resource gets modified using an impersonated access token, an audit log is printed with the relevant details of the impersonator. 

{% if product_name == "Asgardeo" %}

You may access these logs from the **Logs** section of the {{product_name}} Console.

![Impersonation-Audit-Log]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-audit-logs.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    Learn more about [audit logs]({{base_path}}/guides/asgardeo-logs/audit-logs/).

{% else %}

=== "Audit log format"

    ``` bash
    TID: [-1234] [2024-06-03 14:50:42,298] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} \
    - Initiator={Impersonated_User_Id} \
    Action=resource-modification-via-impersonation \
    Target={Impersonated_User_Id} \
    Data={"ResourcePath":{Resource_Path} ,"clientId":{Client_Id} ,"subject":{Impersonated_User_Id},"scope":{Scope Issued for the Impersonated Access token} ,"impersonator":{Impersonater Id} ,"httpMethod":{Http Method}} \
    Outcome=AUTHORIZED
    ```

=== "Sample audit log"

    ```bash
    TID: [-1234] [2024-06-03 14:50:42,298] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} \
    - Initiator=0fa51985-d36d-4492-9ebd-298f9d68861f \
    Action=resource-modification-via-impersonation \
    Target=49de2b73-5f0b-44db-bf75-6fddec4b058e \
    Data={"ResourcePath":"/scim2/Me","clientId":"luoljDTbHYcfx6YWT_7wsYs67rsa","subject":"49de2b73-5f0b-44db-bf75-6fddec4b058e","scope":"internal_login internal_user_mgt_list internal_user_mgt_view","impersonator":"0fa51985-d36d-4492-9ebd-298f9d68861f","httpMethod":"PATCH" \
    Outcome=AUTHORIZED
    ```

In an instance where the impersonator modifies a resource, a log will be printed similar to the following:

```bash
TID: [-1234] [2024-06-03 14:50:42,976] [1a2ac914-ea61-4699-8778-ea44d2fa27c5]  INFO {AUDIT_LOG} \
- Initiator=49de2b73-5f0b-44db-bf75-6fddec4b058e \
Action=Set-User-Claim-Values \
Target=t******r \
Data={"ServiceProviderName":"POSTMAN_SBA","Claims":{"http://wso2.org/claims/country":"S***n","http://wso2.org/claims/modified":"2*************************Z","profileConfiguration":"d*****t"}} \
Outcome=Success | Impersonator : 0fa51985-d36d-4492-9ebd-298f9d68861f
```

{% endif %}

## Notify users on impersonation

When an impersonated access token is issued on behalf of a user, {{product_name}} allows you to send a notification email to the affected user. 
This enhances transparency by keeping the user informed of any actions performed on their behalf.

Follow the steps below to enable/disable email notifications:

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Under **Organization settings**, select **Impersonation**.

3. Toggle the switch on to enable email notifications and off to disable it.

The following is the default email notification that will be sent to a user upon issuing an impersonated access token.

![Impersonation-Email-Notification]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-email-notification.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    
    If you wish to customize this email template, you may do so by navigating to **Branding** > **Email Templates**. For more information, refer to the [Customize email templates]({{base_path}}/guides/branding/customize-email-templates/) documentation.
    
## Access organizations as an impersonator

If the user is also a member of a child [organization]({{base_path}}/guides/organization-management/), the impersonator can exchange the impersonated access token to an organization access token.
This authorizes the impersonator to access child organizations with the same permission level as the impersonated user.

!!! note
    
    The impersonator can only access organizations in which the impersonated user is an invited member. 
    Learn more about [inviting users from the parent organization]({{base_path}}/guides/organization-management/invite-parent-organization-users/).

The following diagram shows the detailed steps involved in receiving an impersonated organization access token.

![Impersonation-sub-org]({{base_path}}/assets/img/guides/authorization/impersonation/impersonation-flow-sub-org.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

=== "Request Format"

    ``` bash
    curl --location 'https://{{base_url}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
    --data-urlencode 'client_id={Client_Id}' \
    --data-urlencode 'grant_type=organization_switch' \
    --data-urlencode 'scope={Organization API Scopes}' \
    --data-urlencode 'switching_organization={Organization_Id}' \
    --data-urlencode 'token={Impersonated Access Token}'
    ```

=== "Sample Request"

    ``` bash
    curl --location 'https://{{base_url_sample}}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic QVVhZkoyeWpXM2dUR3JZaWZCTlF1MTBXRWtNYToybWN1blJ1T1Y5WFQ3QXpzRDEyVmY3cGhOVWJRUmdlT0NtZW5Wa0xKQTR3YQ==' \
    --data-urlencode 'client_id=AUafJ2yjW3gTGrYifBNQu10WEkMb' \
    --data-urlencode 'grant_type=organization_switch' \
    --data-urlencode 'scope=internal_login internal_org_user_mgt_view internal_org_user_mgt_list' \
    --data-urlencode 'switching_organization=2fb64b16-94ee-4727-a542-5db7af91ef06' \
    --data-urlencode 'token=eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJuYmYiOjE3MTg2OTUwNTIsImFjdCI6eyJzdWIiOiIyZDkzMWM5ZC04NzZlLTQ2YzAtOWFiYS1mMzQ1MDE4NzlkZmMifSwiYXpwIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsIm9yZ19pZCI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsInNjb3BlIjoiaW50ZXJuYWxfbG9naW4gaW50ZXJuYWxfb3JnX3VzZXJfbWd0X2xpc3QgaW50ZXJuYWxfb3JnX3VzZXJfbWd0X3ZpZXcgaW50ZXJuYWxfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF91c2VyX21ndF92aWV3IG9wZW5pZCIsImV4cCI6MTcxODY5ODY1Miwib3JnX25hbWUiOiJTdXBlciIsImlhdCI6MTcxODY5NTA1MiwianRpIjoiMDcyOGQ1MTctNzk2OC00NzRmLWJkN2QtMTI1MzdjY2JlNDM2In0.FqavHBDNLo-nMMgJ3OTDswo7pl6zMztpUkm-cgBOgDJPek_FAEQzt4DFxGglnf2-AtnRN14wPOv9_M_DYJWH529hbwYBVrQQDlJmcF1WtWX_MnBgBGsIfA5_3nzocZWBqj5KDjbXS3_3CSexQ9_h3tKWCDX1oit03flcs7E_xG_nkWV1TUPFUAaoHrMWTROIttN1iFqwRjeg6Bkqjx8hHM3Dn7E9Zsmby0EhuC7i41kid2s9F_5XPPMCYM0gyxX5lAjsf6UFth9v3SWIuMLFgiq5Eh6u4pCs9srh2A5t0DIcKMwyXTEm-QVIhGi1zkB-wGV6yYD9TwbiujnrqOyFQA'
    ```

The response will look similar to the following:

``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJ1c2VyX29yZyI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsIm5iZiI6MTcxODY5NTA3MiwiYWN0Ijp7InN1YiI6IjJkOTMxYzlkLTg3NmUtNDZjMC05YWJhLWYzNDUwMTg3OWRmYyJ9LCJhenAiOiJqVmNXNG9MbjFKamIyVDk0SDRndFBWOXo1WTBhIiwib3JnX2lkIjoiMTU1OGViZjYtMTdlMC00MTY1LWI5YzAtYTgxMTdjODc4MDZiIiwic2NvcGUiOiJpbnRlcm5hbF9sb2dpbiBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF9vcmdfdXNlcl9tZ3RfdmlldyIsImV4cCI6MTcxODY5ODY3Miwib3JnX25hbWUiOiJTdWJPcmciLCJpYXQiOjE3MTg2OTUwNzIsImp0aSI6IjA2NjcwOGYzLWQyNzYtNDQyMi1iZWZlLTE0Njk3N2RlMDA4ZiJ9.XliLCV0IS-KzYZTriSBpVacg-u4l0tLiRoBwWmjoyZz-9-LbCAf-oAweywpaWM7kwo6EaxCZ1S4Am5K1hh-R9Rp5RP1PouxL407MHd-gRpLU5x8V1c9PmofZgWNrrqWLgvxi-MjI-XRkFqMARf39tfBgqHcsZA8Ixeht8zN16EL4GTeYMWbcIuHPSDKaQ-_ZgOcoL1fim3ELUMc0N7Mtv4QGM8bHjhKUQV-wHrj6CRcx7TmyCcMyW1rqLpyqbnkbiOoUDlz0AvK_TxNVt4qhVsgS-9ZCmLb4fdIWTdsqAiZrM7Cfn1HT16PsGP0YTqz3AI3c_ZqTGuH867E6qxJpzg",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

Similar to the impersonated access token, impersonated organization access token has the `act` property which clients may use to detect impersonation, and the `act.sub` property holds the userid of the impersonator.
