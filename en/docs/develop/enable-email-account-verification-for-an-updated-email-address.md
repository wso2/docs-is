# Enable Email Account Verification for an Updated Email Address 

This feature enables email account verification when the user updates the user profile with a new email address, so that the new email address can be taken into consideration for all further activities performed by the user. 

When users update their email addresses in the user profile, an email verification is triggered to the new email address. Until the new email address is verified successfully, the user's existing email address is not overridden.

!!! warning 
    -   This feature can be invoked via a PUT/PATCH request to SCIM 2.0 /Users endpoint or /Me endpoint.
    -   The verification on update capability is **only** supported for the http://wso2.org/claims/emailaddress claim.
    -   An email verification is not triggered if the email address to be updated is the same as the previously verified email address of the user.
    -   This feature only manages the verification flow internally. External verification capability is not offered.

## Step 01 - Configure the email adapter to send emails

See [Configuring the Email Sending Module](../../setup/configuring-email-sending) to configure the email adapter. 

## Step 02 - Enable the feature in the management console

1.  In the management console, navigate to **Main > Identity Providers > Resident > Account Management Policies > User Claim Update**.

2.  Enable **User Email Verification On Update**. Additionally, you can define the expiry time for the verification link to match your requirement.

3.  Click **Update** to save the changes. 

!!! note 
    To enable this feature server-wide, follow the instructions given below. 
    
    1.  Shut down the server if it is running.
    2.  Add the following properties to the `deployment.toml` file in `IS_HOME/repository/conf` to enable the feature and to configure the verification email link expiry time.

        ```toml 
        [identity_mgt.user_claim_update.email]
        enable_verification = true
        verification_email_validity = “1440”
        ```

## Try it Out 

Given below is a sample request and the relevant response for updating the email address via a PATCH operation to SCIM 2.0 Users endpoint.

**Request**

```curl
curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],
"value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[user ID]
```

**Sample**

```curl tab="Request"
curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
"Operations":[{"op":"replace","value":{"emails":[{"primary":true,"value":"kim.jackson.new@gmail.com"}]}}]}' 
--header "Content-Type:application/json" https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21
```

```curl tab="Response" 
{"emails":["kimjack@gmail.com"],"meta":{"created":"2020-01-07T09:32:18","location":"https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21,"lastModified":"2020-01-07T14:18:49","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"pendingEmails":[{"value":"kim.jackson.new@gmail.com"}]},"roles":[{"type":"default","value":"Internal/everyone"}],"name":{"givenName":"kim","familyName":"jackson"},"id":"1e624046-520c-4628-a245-091e04b03f21","userName":"kim"}
```

Upon receiving the response as given above, the user will receive an email notification to verify the account. By successfully confirming the account, the user’s `emailaddress` claim, http://wso2.org/claims/emailaddress, will be updated with the newly-verified email address. The new email address is represented in the SCIM response as an attribute of Enterprise User Extension. Given below is the extracted representation of it.

```java
"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"pendingEmails":[{"value":"kim.jackson.new@gmail.com"}]}
```

Run the following curl command to resend email verification upon updating the email address. 

**Request** 

```curl
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": <USERNAME>,"realm": <REALM>"},"properties": [{"key":"RecoveryScenario","value":"EMAIL_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
```

**Sample**

```curl tab="Request"
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": admin,"realm": PRIMARY"},"properties": [{"key":"RecoveryScenario","value":"EMAIL_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
```

```curl tab="Response"
HTTP/1.1 201 Created
```

!!! info "Related Topics"
    See [Using the SCIM 2.0 Rest APIs](../../develop/using-the-scim-2.0-rest-apis) for instructions on using SCIM 2.0 REST APIs.
