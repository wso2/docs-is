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
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
    ```

??? Example "OracleRac"
    
    ```sql
    INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES ('3e5b1f91-72d8-4fbc-94d1-1b9a4f8c3b07', 'IMPERSONATION_CONFIGURATION', 'A resource type to keep the tenant impersonation preferences.');
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

2. Select the application and go to API Authorization tab of the application and click authorize on API Resource.

3. Search for User Impersonation under management APIs and subscribe to the application.

    ![Api-Authorization-Impersonation-Selection]({{base_path}}/assets/img/guides/authorization/impersonation/user-impersonation-selection.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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
https://{{ host_name }}/oauth2/authorize?redirect_uri={redirect_uri}&client_id={client_id}&state=<sample_state>&scope=internal_user_impersonate%20{Other_Required_Scopes}&response_type=id_token%20subject_token&requested_subject={User_id_of_the_end_user}&nonce={nonce}
```

**Sample Request**
``` bash
https://localhost:9443/oauth2/authorize?client_id=jVcW4oLn1Jjb2T94H4gtPV9z5Y0a&state=sample_state&scope=internal_user_impersonate%20openid%20internal_org_user_mgt_view%20internal_org_user_mgt_list%20internal_user_mgt_delete%20internal_org_user_mgt_create%20internal_login%20internal_user_mgt_delete%20internal_user_mgt_view%20internal_user_mgt_list%20internal_user_mgt_update%20internal_user_mgt_create&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&response_type=id_token%20subject_token&requested_subject=32bc4697-ed0f-4546-8387-dcd6403e7caa&nonce=2131232
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
--data-urlencode 'subject_token={subject_token}' \
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

!!! note
    If Impersonation email template not found in branding preferences, you can add it via following REST API request.

    **Sample Request Format**

    ```
        {% raw %}
        curl --location 'https://{{ host_name }}/api/server/v1/email/template-types' \
        --header 'Content-Type: application/json' \
        --header 'Authorization: Basic <base64 Encoded (adminUsername:adminPassword)>' \
        --data-raw '{
            "displayName": "Impersonation Email Notification",
            "templates": [
                {
                    "contentType": "text/html",
                    "subject": "User Impersonation Session Started",
                    "body": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n        <html xmlns=\"http://www.w3.org/1999/xhtml\">\n            <head>\n                <meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\" />\n                <title>User Impersonation Session Started</title>\n                <!-- [if mso]>\n                <style type=\"text/css\">\n                    @import url('\''https://fonts.googleapis.com/css2?family={{organization.font}}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900'\'');\n\n                    @font-face {\n                        font-family: '\''{{organization.font}}'\'', ;\n                        font-style: normal;\n                        font-weight: 400;\n                        src: local('\''{{organization.font}}'\''),\n                            local('\''{{organization.font}}'\''),\n                            url('\''https://fonts.googleapis.com/css2?family={{organization.font}}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900'\'') format('\''Roboto'\'');\n                </style>\n        <![endif] -->\n        <style type=\"text/css\">\n                    @import url('\''https://fonts.googleapis.com/css2?family={{organization.font}}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'\'');\n\n                    @font-face {\n                        font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;\n                        font-style: normal;\n                        font-weight: 400;\n                        src: local('\''{{organization.font}}'\''),\n                            local('\''{{organization.font}}'\''),\n                            url('\''https://fonts.googleapis.com/css2?family={{organization.font}}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'\'') format('\''Roboto'\'');\n                    }\n\n                    #outlook a {\n                        padding: 0;\n                    }\n\n                    .body {\n                        width: 100% !important;\n                        -webkit-text-size-adjust: 100%;\n                        -ms-text-size-adjust: 100%;\n                        margin: 0;\n                        padding: 0;\n                    }\n\n                    .ExternalClass {\n                        width: 100%;\n                    }\n\n                    *[x-apple-data-detectors],\n                    /* iOS */\n                    .unstyle-auto-detected-links *,\n                    .aBn {\n                        border-bottom: 0 !important;\n                        cursor: default !important;\n                        color: inherit !important;\n                        text-decoration: none !important;\n                        font-size: inherit !important;\n                        font-family: inherit !important;\n                        font-weight: inherit !important;\n                        line-height: inherit !important;\n                    }\n\n                    .ExternalClass,\n                    .ExternalClass p,\n                    .ExternalClass span,\n                    .ExternalClass font,\n                    .ExternalClass td,\n                    .ExternalClass div {\n                        line-height: 100%;\n                    }\n\n                    img {\n                        outline: none;\n                        text-decoration: none;\n                        -ms-interpolation-mode: bicubic;\n                    }\n\n                    .wso2_orange a {\n                        color: {{organization.color.primary}};\n                        text-decoration: underline;\n                    }\n\n                    .wso2_orange a:hover {\n                        text-decoration: none !important;\n                    }\n\n                    .Wrap_Border img:hover {\n                        background-color: {{organization.color.primary}} !important;\n                    }\n\n                    a.wso2_orange3:hover {\n                        color: {{organization.color.primary}} !important;\n                        text-decoration: none !important;\n                    }\n\n                    .wso2_grey7 a:hover {\n                        text-decoration: none !important;\n                    }\n\n                    a img {\n                        border: none;\n                    }\n\n                    p {\n                        margin: 1em 0;\n                    }\n\n                    table td {\n                        border-collapse: collapse;\n                    }\n\n                    /* hide unsubscribe from forwards*/\n                    blockquote .original-only,\n                    .WordSection1 .original-only {\n                        display: none !important;\n                    }\n\n                    .fadeimg:hover {\n                        transition: 0.3s !important;\n                        opacity: 0.7 !important;\n                    }\n\n                    .linkname:hover {\n                        transition: 0.3s !important;\n                        opacity: 0.6 !important;\n                    }\n\n                    .linktopic:hover {\n                        transition: 0.3s !important;\n                        opacity: 0.8 !important;\n                    }\n\n                    .linkbody:hover {\n                        transition: 0.3s !important;\n                        text-decoration: none !important;\n                        color: #000000 !important;\n                    }\n\n                    .linkrevbut:hover {\n                        transition: 0.3s !important;\n                        text-decoration: none;\n                        background-color: #092a56;\n                        color: #ffffff !important;\n                    }\n\n                    .ctaorange:hover {\n                        transition: 0.3s !important;\n                        background-color: #000000 !important;\n                    }\n\n                    .ctaorange1:hover {\n                        transition: 0.3s !important;\n                        color: #000000 !important;\n                    }\n\n                    .wso2_center {\n                        text-align: center !important;\n                    }\n\n                    @media only screen and (max-width: 480px) {\n\n                        body,\n                        table,\n                        td,\n                        p,\n                        a,\n                        li,\n                        blockquote {\n                            -webkit-text-size-adjust: none !important;\n                        }\n\n                        /* Prevent Webkit platforms from changing default text sizes */\n                        body {\n                            width: 100% !important;\n                            min-width: 100% !important;\n                        }\n\n                        /* Prevent iOS Mail from adding padding to the body */\n\n                        #bodyCell {\n                            padding: 10px !important;\n                        }\n\n                        #templateContainer {\n                            /* max-width:650px !important; */\n                            width: 100% !important;\n                        }\n\n                        h1 {\n                            font-size: 24px !important;\n                            line-height: 32px !important;\n                            padding-right: 40px !important;\n                        }\n\n                        h2 {\n                            font-size: 20px !important;\n                            line-height: 100% !important;\n                        }\n\n                        h3 {\n                            font-size: 18px !important;\n                            line-height: 100% !important;\n                        }\n\n                        h4 {\n                            font-size: 16px !important;\n                            line-height: 100% !important;\n                        }\n\n                        #templatePreheader {\n                            display: none !important;\n                        }\n\n                        /* Hide the template preheader to save space */\n\n                        .headerContent {\n                            font-size: 20px !important;\n                            line-height: 125% !important;\n                        }\n\n                        .bodyContent {\n                            font-size: 18px !important;\n                            line-height: 125% !important;\n                            padding-right: 0px !important;\n                            padding-left: 10px !important;\n                        }\n\n                        .headercontent {\n                            font-size: 18px !important;\n                            line-height: 125% !important;\n                            padding-right: 0px !important;\n                            padding-left: 0px !important;\n                        }\n\n                        .templateColumnContainer {\n                            display: block !important;\n                            width: 100% !important;\n                        }\n\n                        .columnImage {\n                            height: auto !important;\n                            max-width: 480px !important;\n                            width: 100% !important;\n                        }\n\n                        .leftColumnContent {\n                            font-size: 16px !important;\n                            line-height: 125% !important;\n                        }\n\n                        .rightColumnContent {\n                            font-size: 16px !important;\n                            line-height: 125% !important;\n                        }\n\n                        .footerContent {\n                            font-size: 14px !important;\n                            line-height: 115% !important;\n                            padding-right: 10px !important;\n                            padding-left: 10px !important;\n                        }\n\n                        .logobottommobile {\n                            display: none;\n                        }\n\n                        .main-content {\n                            background-size: 100px;\n                            padding-right: 50px !important;\n                            background-repeat: no-repeat;\n                            background-position-x: right;\n                            background-position-y: bottom;\n                        }\n\n                        /* Place footer social and utility links on their own lines, for easier access */\n                    }\n\n                    /* u+.wso2_body .wso2_full_wrap {\n                        width: 100% !important;\n                        width: 100vw !important;\n                    } */\n                </style>\n            </head>\n            <body class=\"wso2_body\"\n                        style=\"font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; height: 100% !important; width: 100% !important; background-color: {{organization.color.background}}; margin: 0; padding: 0;\"\n                        data-gr-c-s-loaded=\"true\" bgcolor=\"#FAFAFA\">\n                <table class=\"wso2_full_wrap\"\n                            style=\"-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: {{organization.color.background}};height: 100% !important;margin: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;padding: 0;\"\n                            width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"left\">\n                    <tbody>\n                        <tr>\n                            <td id=\"bodyCell\"\n                                        style=\"-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;margin: 0;\"\n                                        valign=\"top\" align=\"left\">\n                                <!-- BEGIN TEMPLATE // -->\n                                <table id=\"templateContainer\"\n                                            style=\"-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;\"\n                                            width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">\n                                    <tbody>\n                                        <!-- BEGIN PREHEADER // -->\n                                        <tr>\n                                            <td style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;width: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: {{organization.color.background}};\"\n                                                        valign=\"top\" align=\"left\">\n                                                <table id=\"templatePreheader\"\n                                                            style=\"-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: {{organization.color.background}};mso-table-lspace: 0pt;mso-table-rspace: 0pt;\"\n                                                            width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n                                                    <tbody>\n                                                        <tr>\n                                                            <td class=\"wso2_orange preheaderContent\"\n                                                                        style=\"text-size-adjust: 100%; color: rgb(255, 255, 255); font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif; font-size: 10px; line-height: 12.5px; text-align: center; padding: 0px; margin: 0px; overflow: hidden; float: left; display: none;\"\n                                                                        valign=\"top\" align=\"left\">Please click the following button to\n                                                                        securely reset the password of your account in the organization\n                                                                        {{organization-name}}:\n                                                                    </td>\n                                                        </tr>\n                                                    </tbody>\n                                                </table>\n                                            </td>\n                                        </tr>\n                                        <!-- // END PREHEADER -->\n                                        <tr>\n                                            <td style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: {{organization.color.background}};width: 100%;padding: 40px 0 0;\"\n                                                        width=\"100%\" valign=\"top\" align=\"left\">\n                                                <!-- BEGIN BODY // -->\n                                                <table id=\"templateBody\"\n                                                            style=\"width: 100%;max-width: 650px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: {{organization.theme.background.color}};mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: auto;padding-top: 0p;border-width:1px;border-color: {{organization.theme.border.color}};border-style:solid;\"\n                                                            width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n                                                    <tbody>\n                                                        <tr>\n                                                            <td class=\"bodyContent\" style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #465868;font-family: '\'' {{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 16px;line-height: 24px;text-align:left;padding: 40px 120px 0px\n                                                                        40px;\" valign=\"top\" align=\"left\">\n                                                                <img style=\"width:200px; margin: 0;\"\n                                                                            src=\"{{organization.logo.img}}\"\n                                                                            alt=\"{{organization.logo.altText}}\">\n                                                                </td>\n                                                            </tr>\n                                                            <tr>\n                                                                <td class=\"bodyContent\"\n                                                                        style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #465868;font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 16px;line-height: 24px;text-align: center;padding: 10px 120px 0px 40px;\"\n                                                                        valign=\"top\" align=\"left\">\n                                                                    <h1\n                                                                            style=\"font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 36px;font-weight: bold;line-height: 42px;color: {{organization.color.primary}};text-align: left;\">\n                                                                            User Impersonation Session Started\n                                                                        </h1>\n                                                                </td>\n                                                            </tr>\n                                                            <tr>\n                                                                <td class=\"bodyContent\"\n                                                                        style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #465868;font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 16px;line-height: 24px;text-align: center;padding: 0px 20px 0px 40px;\"\n                                                                        valign=\"top\" align=\"left\">\n                                                                    <table id=\"u_content_text_1\" class=\"u_content_text\"\n                                                                            style=\"font-family:'\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;\" role=\"presentation\"\n                                                                            width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n                                                                        <tbody>\n                                                                            <tr>\n                                                                                <td class=\"main-content\"\n                                                                                        style=\"overflow-wrap:break-word;word-break:break-word;padding: 18px 10px 10px 0px;font-family:'\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;width: 75%; \"\n                                                                                        align=\"left\">\n                                                                                    <div class=\"v-text-align\"\n                                                                                            style=\"color: {{organization.font.color}} !important; line-height: 140%; text-align: left; word-wrap: break-word;\">\n                                                                                        <p\n                                                                                                style=\"font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 14px;font-weight: normal;letter-spacing: normal;line-height: 24px;margin: 0;padding-bottom: 10px;text-align: left;\">\n                                                                                                Hi {{user-name}},\n                                                                                        </p>\n                                                                                        <p\n                                                                                                style=\"font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 14px;font-weight: normal;letter-spacing: normal;line-height: 24px;margin: 0;padding-bottom: 0;text-align: left;\">\n                                                                                                We wanted to inform you that an impersonation session for your account {{user-name}} was initiated on {{login-time}} by {{impersonator-user-name}}. If you have any concerns, please contact\n                                                                                                <a\n                                                                                                    class=\"wso2_orange3\"\n                                                                                                    href=\"mailto:{{organization.support.mail}}\"\n                                                                                                    style=\"color:{{organization.color.primary}}; font-weight: bold;\"\n                                                                                                    target=\"_blank\">{{organization.support.mail}}\n                                                                                                   </a>\n                                                                                                immediately.\n                                                                                        </p>\n                                                                                        </div>\n                                                                                        <div class=\"v-text-align\"\n                                                                                            style=\"color: {{organization.font.color}} !important;; line-height: 140%; text-align: left; word-wrap: break-word;\">\n                                                                                            <p\n                                                                                                style=\"font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 13px; font-weight: normal; letter-spacing: normal; line-height: 23px; margin: 20px 0px 20px; padding-bottom:0px; text-align: left;\">\n                                                                                                {{organization.copyright.text}}\n                                                                                            </p>\n                                                                                        </div>\n                                                                                    </td>\n                                                                                </tr>\n                                                                            </tbody>\n                                                                        </table>\n                                                                    </td>\n                                                                </tr>\n                                                            </tbody>\n                                                        </table>\n                                                    </td>\n                                                </tr>\n                                                <tr>\n                                                    <td style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: {{organization.color.background}};width: 100%;\"\n                                                        width=\"100%\" valign=\"top\" align=\"left\">\n                                                        <!-- BEGIN BODY // -->\n                                                        <table id=\"templateBody\"\n                                                            style=\"width: 100%;max-width: 650px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: {{organization.color.background}};mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: auto;\"\n                                                            width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n                                                            <tbody>\n                                                                <tr>\n                                                                    <td class=\"footerContent\"\n                                                                        style=\"-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-family: '\''{{organization.font}}'\'', Roboto, Verdana, Helvetica, sans-serif;font-size: 10px;line-height: 15px;text-align: left;padding: 10px 40px 25px;\"\n                                                                        valign=\"top\" align=\"left\">\n                                                                        <p style=\"font-size: 14px; line-height: 140%; padding-top: 8px;\">\n                                                                            <span\n                                                                                style=\"font-size: 12px; line-height: 16.8px; color: #808080;\">You\n                                                                                received this email because you have an account in the\n                                                                                organization\n                                                                                <b>{{organization-name}}</b>. If you encounter any issues,\n                                                                                you may contact us at\n                                                                                <a\n                                                                                    class=\"wso2_orange3\" href=\"mailto:{{organization.support.mail}}\"\n                                                                                    style=\"color:#808080;\"\n                                                                                    target=\"_blank\">{{organization.support.mail}}</a>.\n                                                                            </span>\n                                                                        </p>\n                                                                        <p style=\"font-size: 14px; line-height: 140%; padding-top: 2px;\">\n                                                                            <span\n                                                                                style=\"font-size: 11px; line-height: 16.8px; color: #9e9e9e;\">This\n                                                                                mail was sent by WSO2 LLC. 3080 Olcott St., Suite C220,\n                                                                                Santa Clara, CA 95054, USA</span>\n                                                                        </p>\n                                                                    </td>\n                                                                </tr>\n                                                            </tbody>\n                                                        </table>\n                                                    </td>\n                                                </tr>\n                                            </tbody>\n                                        </table>\n                                        <!-- // END BODY -->\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                        <!-- // END TEMPLATE -->\n                    </body>\n                </html>\n        ",
                    "id": "en_US"
                }
            ]
        }'
        {% endraw %}
    ```
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
