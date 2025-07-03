# User impersonation via business application

User impersonation lets you perform actions and access resources using another user’s permissions, useful for scenarios like testing and troubleshooting. You can follow this guide and use a business application to start impersonating the user.

!!! tip "[Recommended] Use the Console to start impersonation"

    Starting impersonation through a business application requires some manual, advanced steps. The recommended method is to impersonate users via the Console. However, your organization must meet the following requirements to do this:

    - Your organization has [enabled]({{base_path}}/guides/user-self-service/configure-self-service-portal/#enabledisable-the-my-account-portal) the My Account portal.

    - Your {{product_name}} Console and My Account portal have the same login flow.

    If your organization can meet these requirements, follow the guide to [start impersonating from the Console]({{base_path}}/guides/authorization/user-impersonation/via-console/).

## Step 1: Configure business applications for impersonation

To let an impersonator access a business application as another user, you need to enable impersonation for that app. This section shows you how to set it up.

### Step 1.1: Authorize application to use the impersonation API

By following the steps below, you permit a business application to use the impersonation API.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application and go to its **API Authorization** tab.

3. Click **Authorize an API Resource** and do the following:

    1. Under **API Resource**, select **User Impersonation**.

    2. Under **Authorized Scopes**, select **User Impersonation Scope**.

    3. Click **Finish**.

    ![Authorize impersonation API]({{base_path}}/assets/img/guides/authorization/impersonation/api-authorization-impersonation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 1.2: Create an application role that permits impersonation

To access business applications as an impersonated user, you need to create a new role to give the impersonator the right permissions.

To do so,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Go to the **Roles** tab of the application.

3. Under **Role Audience**, select **Application**. This sets the audience of this role to the current application.

4. Click **New Role** and do the following:

    1. Provide a suitable role name.

    2. Under **API Resource**, select **User Impersonation**.

    3. Select the checkbox corresponding to **User Impersonation** to select its scopes.

    4. Click **Create**.

        ![Role-Creation]({{base_path}}/assets/img/guides/authorization/impersonation/role-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 1.3: Assign the role to the impersonator

To assign the role,

1. On the {{product_name}} Console, go to **User Management** > **Roles**.

2. Select the role you just created. The audience of this role is set to your business application.

3. Under the **Users** tab, click **Assign Users** and select the impersonator.

4. Click **Update** to save the changes.

### Step 1.4: (Optional) Skip consent screens

Since the impersonator is pre-approved to access the application on behalf of another user, you can skip the login and logout consent prompts. To enable this:

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Switch to the **Advanced** tab of the application.

3. Select the **Skip login consent** and **Skip logout consent** checkboxes.

4. Click **Update** to save the changes.

## Step 2: Configure the application to accept subject tokens

The subject token contains information about the impersonated user and used when obtaining access tokens and ID tokens on their behalf. Your application should enable subject tokens as an acceptable response type to authorization calls. To do so:

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Switch to the **Protocol** tab of your application.

3. Under **Allowed grant types**, select **Token Exchange**.

4. Under **Access Token** > **Token type**, select **JWT**.

5. Under **Subject Token**, select **Enable subject token response type**. Optionally, set the token expiry time in seconds.

6. Click **Update** to save the changes.

![Subject-Token-Config]({{base_path}}/assets/img/guides/authorization/impersonation/subject-token-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Step 3: Get tokens for user impersonation

User impersonation involves the following two steps:

1. Get a subject token from the authorization endpoint. This token contains information on the impersonated user.
2. Exchange the subject token for an access token and an ID token. These tokens provide you with authorization and authentication capabilities of the impersonated user.

The following diagram outlines the detailed steps involved in user impersonation:

![Impersonation-Flow]({{base_path}}/assets/img/guides/authorization/impersonation/Impersonation-flow.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Get a subject token

A subject token refers to a JSON Web Token (JWT) containing details about both the impersonated user and the impersonator. To get a subject token, the client needs to start an authorization request using the following query parameters.

=== "Request Format"

    ```bash
    https://{{base_url}}/oauth2/authorize?
      client_id={clientID}
      &redirect_uri={redirect_uri}
      &state={sample_state}
      &scope=internal_user_impersonate,{other_Required_Scopes}
      &response_type={response_type}
      &requested_subject={userid_of_the_end_user}
      &nonce={nonce}
    ```

=== "Example"
    ```bash
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
        <td>The address the response redirects to at the end of the process.</td>
    </tr>
    <tr>
        <td>scope</td>
        <td>Scope should contain <code>internal_user_impersonate</code> along with other required scopes.</td>
    </tr>
    <tr>
        <td>response_type</td>
        <td>Either <code>id_token subject_token</code> or <code>subject_token</code>.</td>
    </tr>
    <tr>
        <td>requested_subject</td>
        <td>A valid user ID. This is the impersonated user.</td>
    </tr>
    <tr>
        <td>nonce</td>
        <td>Required if the response type is <code>id_token subject_token</code>, to prevent ID token replay attacks.</td>
    </tr>
</table>

After successful authorization, the response looks like the following:

```bash
https://oauth.pstmn.io/v1/callback
    ?id_token={id_token}
    &session_state=ecfb74cde9f694c1de0905aa40a5f6fc1dd595bdcfd739cbd3dd5b964da53325.1554z-G22KW3pwK_hYhqPw
    &state=sample
    &subject_token={subject_token}
```

The decoded subject token looks as follows:

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

The subject token also includes the `may_act` property, which indicates that the user identified in `may_act.sub` is allowed to impersonate the user identified in `sub`.

### Get an impersonated access token

After receiving a subject token, exchange it for an access token that carries the permissions of the impersonated user.

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

=== "Example"

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

The response looks like the following:

``` json
{
    "access_token": "eyJ4NXQiOiJPV1JpTXpaaVlURXhZVEl4WkdGa05UVTJOVE0zTWpkaFltTmxNVFZrTnpRMU56a3paVGc1TVRrNE0yWmxOMkZoWkdaalpURmlNemxsTTJJM1l6ZzJNZyIsImtpZCI6Ik9XUmlNelppWVRFeFlUSXhaR0ZrTlRVMk5UTTNNamRoWW1ObE1UVmtOelExTnprelpUZzVNVGs0TTJabE4yRmhaR1pqWlRGaU16bGxNMkkzWXpnMk1nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzMmJjNDY5Ny1lZDBmLTQ1NDYtODM4Ny1kY2Q2NDAzZTdjYWEiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiY2xpZW50X2lkIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsImF1ZCI6ImpWY1c0b0xuMUpqYjJUOTRINGd0UFY5ejVZMGEiLCJuYmYiOjE3MTg2OTUwNTIsImFjdCI6eyJzdWIiOiIyZDkzMWM5ZC04NzZlLTQ2YzAtOWFiYS1mMzQ1MDE4NzlkZmMifSwiYXpwIjoialZjVzRvTG4xSmpiMlQ5NEg0Z3RQVjl6NVkwYSIsIm9yZ19pZCI6IjEwMDg0YThkLTExM2YtNDIxMS1hMGQ1LWVmZTM2YjA4MjIxMSIsInNjb3BlIjoiaW50ZXJuYWxfbG9naW4gaW50ZXJuYWxfb3JnX3VzZXJfbWd0X2xpc3QgaW50ZXJuYWxfb3JnX3VzZXJfbWd0X3ZpZXcgaW50ZXJuYWxfdXNlcl9tZ3RfbGlzdCBpbnRlcm5hbF91c2VyX21ndF92aWV3IG9wZW5pZCIsImV4cCI6MTcxODY5ODY1Miwib3JnX25hbWUiOiJTdXBlciIsImlhdCI6MTcxODY5NTA1MiwianRpIjoiMDcyOGQ1MTctNzk2OC00NzRmLWJkN2QtMTI1MzdjY2JlNDM2In0.FqavHBDNLo-nMMgJ3OTDswo7pl6zMztpUkm-cgBOgDJPek_FAEQzt4DFxGglnf2-AtnRN14wPOv9_M_DYJWH529hbwYBVrQQDlJmcF1WtWX_MnBgBGsIfA5_3nzocZWBqj5KDjbXS3_3CSexQ9_h3tKWCDX1oit03flcs7E_xG_nkWV1TUPFUAaoHrMWTROIttN1iFqwRjeg6Bkqjx8hHM3Dn7E9Zsmby0EhuC7i41kid2s9F_5XPPMCYM0gyxX5lAjsf6UFth9v3SWIuMLFgiq5Eh6u4pCs9srh2A5t0DIcKMwyXTEm-QVIhGi1zkB-wGV6yYD9TwbiujnrqOyFQA",
    "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
    "scope": "internal_login internal_org_user_mgt_list internal_org_user_mgt_view internal_user_mgt_list internal_user_mgt_view",
    "token_type": "Bearer",
    "expires_in": 3600
}
```

The decoded access token looks as follows:

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

- Apart from the generic claims, the impersonated access token has the `act` property which clients can use to detect impersonation. In the given example, the `sub` property holds the value of `32bc4697-ed0f-4546-8387-dcd6403e7caa`, the user ID of the impersonated user.

- The `act.sub` property holds the user ID of the impersonator. In the given exmaple, the `act.sub` property holds the value of `2d931c9d-876e-46c0-9aba-f34501879dfc`, the user ID of the impersonator.

## Configure more impersonation options

To learn how to check impersonation logs, notify users on impersonation and how to access child organizations as an impersonator, see the end of the [User impersonation via Console]({{base_path}}/guides/authorization/user-impersonation/via-console/) guide.
