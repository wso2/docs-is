# Enable user email verification on update

Email address verification on update ensures that when a user changes their primary email address, verification is 
triggered to the new email address. The existing primary email address remains unchanged until the new one is 
successfully verified. If multiple mobile emails per user support is enabled, users can maintain several verified email
addresses and designate one as the primary email address as needed.

!!! note 
    - This feature can be invoked via a PUT/PATCH request to the SCIM 2.0 /Users endpoint or /Me endpoint.
    - The verification on update capability is **only** supported for the `http://wso2.org/claims/emailAddresses` and 
    `http://wso2.org/claims/verifiedEmailAddresses` claims.
    - Verification is not triggered if the email address to be updated is the same as the previously verified email 
    address of the user.
    - Triggering an email verification is skipped if the `verifyEmail` claim is not set to true when 
    `UseVerifyClaim` config is enabled.
    - By default, multiple email and mobile per user support is enabled. Add the following property to the above 
    `deployment.toml` config to disabled this server wide and restart the server.
        ```toml
        [identity_mgt.user_claim_update]
        enable_multiple_emails_and_mobile_numbers = false
        ```

## Prerequisites

[Configure the email sending module]({{base_path}}/deploy/configure/email-sending-module/) in {{product_name}}.

## Configure email address verification on update

1. On the {{product_name}} Console, go to **User Attributes & Stores** > **Attributes**.

2. Under **Manage Attributes**, click on **User Attribute Change Verification**.

3. Configure the following property:
    <table>
    <tr>
        <td>Enable User Email Verification on Update</td>
        <td>When enabled, this setting triggers an email verification process whenever a user updates their email 
        address.</td>
    </tr>
    </table>

4. Click **Update** to save the changes.

## Try it out 

### Update the primary email address.

Given below is a sample request and the relevant response for updating the email address via a PATCH operation to 
SCIM 2.0 Users endpoint.

!!! abstract ""
    **Request**
    ```
    curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"], "Operations":[{"op":[operation], "value":{ "emails":[{"primary":true, "value":[new email]}]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[user ID]
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"], "Operations":[{"op":"replace","value":{ "emails":[{"primary":true,"value":"kim.jackson.new@gmail.com"}]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21
    ```
    ---
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
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
            "urn:scim:wso2:schema"
        ],
        "urn:scim:wso2:schema": {
            "emailAddresses": "kimjack@gmail.com",
            "verifiedEmailAddresses": "kimjack@gmail.com",
        },
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

Upon receiving the response outlined above, the user will receive an email notification prompting them to verify their 
updated email address. Once verified, the `emailAddresses` claim (http://wso2.org/claims/emailaddress) and 
`verifiedEmailAddresses` claim (http://wso2.org/claims/verifiedEmailAddresses) will be updated to reflect the 
newly-verified email address.

### Update the verified email address list

If you have multiple email and mobile per user support enabled, you can maintain several verified email addresses and 
select one as your primary email address whenever you need.

To verify a email address, simply click on the verify email address icon next to the email address you'd like to verify.

![Email addresses update]({{base_path}}/assets/img/guides/users/my-account-verify-email.png)

An email will be sent to the specified address for verification. To confirm the email address, simply click on the link provided in the email.
 
Given below is a sample request and the relevant response for updating the verified email addresses via a PATCH 
operation to SCIM 2.0 Users endpoint.

!!! abstract ""
    **Request**
    ```curl
    curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],
    "value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" 
    https://localhost:9443/scim2/Users/[user ID]
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -k --user bob:pass123 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations":[{"op":"replace","value":{"urn:scim:wso2:schema": {"verifiedEmailAddresses": 
    "kimjack@gmail.com,kim.jackson.new@gmail.com"}
    }}]}' 
    --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21
    ```
    ---
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
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
            urn:scim:wso2:schema
        ],
        "urn:scim:wso2:schema": {
            "emailAddresses": "kimjack@gmail.com",
            "verifiedEmailAddresses": "kimjack@gmail.com",
        },
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

Upon receiving the response outlined above, the user will receive an email notification prompting them to verify their 
updated email address. Once verified, `verifiedEmailAddresses` claim (http://wso2.org/claims/verifiedEmailAddresses) 
will be updated to reflect the newly-verified email address.

## Resend email verification

Run the following curl command to resend email verification upon updating the email address. 

!!! abstract ""
    **Request** 
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": <USERNAME>,"realm": <REALM>"},"properties": [{"key":"RecoveryScenario","value":"EMAIL_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
    ```
    The verification scenario should be specified in the properties parameter of the request body as follows :
    ```
    "properties": [{"key": "RecoveryScenario", "value": "EMAIL_VERIFICATION_ON_UPDATE"}]
    ```
    - `EMAIL_VERIFICATION_ON_UPDATE`: Used when verifying a newly updated email address for a user. </br>
    - `EMAIL_VERIFICATION_ON_VERIFIED_LIST_UPDATE`: Used when updating the list of verified email addresses for a 
    user.
    ---
    **Sample Request**
    ```
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":
    {"username": "admin","realm": "PRIMARY"},"properties": 
    [{"key":"RecoveryScenario","value":"EMAIL_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
    ```
    ---
    **Response**
    ```curl
    HTTP/1.1 201 Created
    ```

