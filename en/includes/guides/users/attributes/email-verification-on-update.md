# Try out email address update verification

Email address verification ensures that when a user updates their primary email address, a verification request is triggered to the new email address. The primary email address will not change until the new email address is verified. If you have enabled [multiple email addresses per user]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user), users can maintain several verified email addresses and designate one as the primary email address.

!!! note
    - This feature can be invoked via a PUT/PATCH request to the SCIM 2.0 /Users endpoint or /Me endpoint.
    - The verification on update capability is **only** supported for the `http://wso2.org/claims/emailAddresses` and 
    `http://wso2.org/claims/verifiedEmailAddresses` claims.
    - Verification is not triggered if the email address to be updated is the same as a previously verified email address of the user.

## Prerequisites

{% if product_name == "WSO2 Identity Server" %}
- [Configure the email sending module]({{base_path}}/deploy/configure/email-sending-module/) of the {{product_name}}.
{% endif %}

- If required, enable [support for multiple email addresses]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user) for users.

- Update [email verification settings]({{base_path}}/guides/users/attributes/user-attribute-change-verification/).

## Try it out

Follow the guides below to try out different email update scenarios.

### Update the primary email address

If you only support a single email address and wish to update the email address of a user,

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Select a user account and go to its **Profile** tab.

3. Under **Email**, update the user's email address.

4. Click **Update** to save the changes. An email will be sent to the specified address for verification. The user needs to click the link provided in the email to verify the email address.

Alternatively, you may update the email address via a PATCH operation to the [SCIM 2.0 Users endpoint]({{base_path}}/apis/scim2/scim2-users-rest-api/) as shown below.

!!! abstract ""

    === "Request format"
        ```
        curl -v -k -X PATCH 
        https://{{ host_name }}/scim2/Users/<user_ID> \
        -d '{
            "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"], 
            "Operations":[{
                "op":<operation>, 
                "value":
                    { "emails":[{"primary":true, "value":<new_email>}]}
                }]
            }' \
        --header "Content-Type:application/json" 
        --header "Authorization: Bearer <access_token>"
        ```
    === "Sample request"

        ```curl
        curl -X PATCH 
        https://{{ host_name_example }}/scim2/Users/1e624046-520c-4628-a245-091e04b03f21 \
        -d '{
            "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
            "Operations":[{
                "op":"replace",
                "value":
                    { "emails":[{"primary":true,"value":"kim.jackson.new@gmail.com"}]}
                }]
            }' \
        --header "Content-Type:application/json"
        --header "Authorization: Bearer <access_token>"
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
            "location":"https://{{ host_name_example }}/scim2/Users/1e624046-520c-4628-a245-091e04b03f21",
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

Upon receiving the response outlined above, the user will receive an email notification prompting them to verify their updated email address. Once verified, the `emailAddresses` claim (http://wso2.org/claims/emailaddress) and `verifiedEmailAddresses` claim (http://wso2.org/claims/verifiedEmailAddresses) will be updated to reflect the new email address.

### Update the verified email addresses list

If you have enabled support for multiple email addresses and mobile numbers, a user can have several verified email addresses and a single primary email address.

To verify an email address, 

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Select a user account and go to its **Profile** tab.

3. Under **Email Addresses**, click the verify icon on an unverified email address of the user.

    ![Email addresses update]({{base_path}}/assets/img/guides/users/my-account-verify-email.png)

    An email will be sent to the specified address for verification. The user needs to click the link provided in the email to verify the email address.

Alternatively, you may update the email addresses via a PATCH operation to the [SCIM 2.0 Users endpoint]({{base_path}}/apis/scim2/scim2-users-rest-api/) as shown below.

!!! abstract ""
    
    === "Request format"
    
        ```curl
        curl -X PATCH 
        https://{{ host_name }}/scim2/Users/<user_ID> \
        -d '{
            "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
            "Operations":[{
                "op":<operation>,
                "value":{"urn:scim:wso2:schema": {"verifiedEmailAddresses": <list_of_email_addresses>}}
                }]
            }' 
        --header "Content-Type:application/json"
        --header "Authorization: Bearer <access_token>"
        ```
    === "Sample request"

        ```curl
        curl -X PATCH 
        https://{{ host_name_example }}/scim2/Users/1e624046-520c-4628-a245-091e04b03f21 \
        -d '{
            "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
            "Operations":[{
                "op":"replace",
                "value":{"urn:scim:wso2:schema": {"verifiedEmailAddresses": "kimjackson@gmail.com,kim.jackson.new@gmail.com"}}
                }]
            }' 
        --header "Content-Type:application/json"
        --header "Authorization: Bearer <access_token>"
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
            "location":"https://{{ host_name_example }}/scim2/Users/1e624046-520c-4628-a245-091e04b03f21",
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

Upon receiving the response outlined above, the user will receive an email notification prompting them to verify their updated email address. Once verified, the `verifiedEmailAddresses` claim (http://wso2.org/claims/verifiedEmailAddresses) will be updated to reflect the new email address.

## Resend email verification

Run the following curl command in case you want to resend the email verification.

!!! abstract ""

    === "Request format"

        ```curl
        curl -X POST https://{{ host_name }}/api/identity/user/v1.0/resend-code
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{
            "user": {
                "username": <USERNAME>,
                "realm": <REALM>"
            },
            "properties": [{
                "key":"RecoveryScenario",
                "value": <recovery_scenario>
                }]
            }'
        ```
    === "Sample request"

        ```
        curl -X POST https://{{ host_name_example }}/api/identity/user/v1.0/resend-code 
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{
            "user": {
                "username": "bob",
                "realm": "PRIMARY"
            },
            "properties": [{
                "key":"RecoveryScenario",
                "value":"EMAIL_VERIFICATION_ON_UPDATE"
                }]
            }'
        ```
    The verification scenario should be specified in the properties parameter of the request body as follows :
    ```
    "properties": [{"key": "RecoveryScenario", "value": "EMAIL_VERIFICATION_ON_UPDATE"}]
    ```
    - `EMAIL_VERIFICATION_ON_UPDATE`: Used when verifying a newly updated email address for a user. </br>
    - `EMAIL_VERIFICATION_ON_VERIFIED_LIST_UPDATE`: Used when updating the list of verified email addresses for a 
    user.
    ---
    
    **Response**
    ```curl
    HTTP/1.1 201 Created
    ```

