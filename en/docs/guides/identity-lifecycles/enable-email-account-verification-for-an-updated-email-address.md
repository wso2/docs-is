# Enable Email Account Verification for an Updated Email Address 

This feature enables email account verification when the user updates the user profile with a new email address, so that the new email address can be taken into consideration for all further activities performed by the user. 

When users update their email addresses in the user profile, an email verification is triggered to the new email address. Until the new email address is verified successfully, the user's existing email address is not overridden.

!!! warning "Important" 
    -   The verification on update capability is **only** supported for the `http://wso2.org/claims/emailaddress` claim.
    -   An email verification is not triggered if the email address to be updated is the same as the previously verified email address of the user.
    -   Triggering an email account verification is skipped if the `verifyEmail` claim is not set to true.
    -   This feature only manages the verification flow internally. External verification capability is not offered.

---

## Step 01 - Configure the email adapter to send emails

{!fragments/configure-email-sending.md!}

---
## Step 02 - Enable the feature in the management console

1.  In the management console, navigate to **Main > Identity Providers > Resident > Other Settings > User Claim Update**.

2.  Mark **Enable user email verification on update**. Additionally, you can define the expiry time for the verification link to match your requirement.
    
    ![](/assets/img/guides/email-verification-on-update-config.png)

3.  Click **Update** to save the changes. 

!!! note 
    To enable this feature server-wide, follow the instructions given below. 
    
    1.  Shut down the server if it is running.
    2.  Add the following properties to the `deployment.toml` file in `IS_HOME/repository/conf` to enable the feature and to configure the verification email link expiry time.

        ```toml 
        [identity_mgt.user_claim_update.email]
        enable_verification = true
        verification_email_validity = "1440"
        ```
    3. Restart the server.
---

## Try it out 

You can use either the My Account application or SCIM 2.0 API to try out the feature.

### My Account

The **My Account** application which provided the capability for users to manage their user account-related preferences, 
can also be used to try out this feature.

1. Access the **My Account** URL: `https://<HOST_NAME>:<PORT>/myaccount/`.

2. Enter the username and password and click **Sign In**.  

3. Click the **Personal info** tab on the side panel to view **Profile** information of the user.

4. Click on the pencil icon aligning with the **Email** field.
   ![edit-email](/assets/img/guides/my-account/update-email/edit-email.png)

5. Update the new email address in the profile and click **Save**.
   ![save-new-email](/assets/img/guides/my-account/update-email/save-new-email.png)
   
The user will receive an email notification to verify the account and the following notification will be displayed until the account confirmation happens.

![email-confirmation-pending](/assets/img/guides/my-account/update-email/email-confirmation-pending.png)  

---
   
### SCIM 2.0

This feature can also be invoked via a PUT/PATCH request to SCIM 2.0 /Users endpoint or /Me endpoint.

Given below is a sample request and the relevant response for updating the email address via a PATCH operation to SCIM 2.0 Users endpoint.

```curl tab="Request"
curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"], "Operations":[{"op":[operation], "value":{ "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"verifyEmail": [true/false]}, "emails":[{"primary":true, "value":[new email]}]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[user ID]
```

```curl tab="Example" 
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"], "Operations":[{"op":"replace","value":{ "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"verifyEmail": "true"}, "emails":[{"primary":true,"value":"kim.jackson.new@gmail.com"}]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21
```

**Sample Response**

```
{
    "emails":[
        "kimjack@gmail.com"
    ],
    "meta":{
        "created":"2020-01-07T09:32:18",
        "location":"https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21",
        "lastModified":"2020-01-07T14:18:49",
        "resourceType":"User"
    },
    "schemas":[
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
    ],
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{
        "pendingEmails":[
            {
                "value":"kim.jackson.new@gmail.com"
             }
        ]
    },
    "roles":[
        {
            "type":"default",
            "value":"Internal/everyone"
        }
    ],
    "name":{
        "givenName":"kim",
        "familyName":"jackson"
    },
    "id":"1e624046-520c-4628-a245-091e04b03f21",
    "userName":"kim"
}
```

The new email address is represented in the SCIM response as an attribute of Enterprise User Extension. Given below is the extracted representation of it.

```java
{"pendingEmails":[{"value":"kim.jackson.new@gmail.com"}]}
```

Upon receiving the response as given above, the user will receive an email notification to verify the account. By successfully confirming the account, the user’s `emailaddress` claim (http://wso2.org/claims/emailaddress), will be updated with the newly-verified email address. 

---

## Resend email verification

Run the following curl command to resend email verification upon updating the email address. 

**Request** 

```curl
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": <USERNAME>,"realm": <REALM>"},"properties": [{"key":"RecoveryScenario","value":"EMAIL_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
```

**Sample**

```curl tab="Request"
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": "admin","realm": "PRIMARY"},"properties": [{"key":"RecoveryScenario","value":"EMAIL_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
```

```curl tab="Response"
HTTP/1.1 201 Created
```

!!! info "Related Topics"
    See [Using the SCIM 2.0 Rest APIs](../../../develop/apis/scim2-rest-apis) for instructions on using SCIM 2.0 REST APIs.
