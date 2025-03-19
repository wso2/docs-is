# Enable mobile number verification on update

Mobile number verification ensures that when a user updates their primary mobile number, an SMS OTP is sent to the new number for verification. The primary mobile number remains unchanged until the new one is successfully verified. If you have enabled [multiple mobile numbers per user]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user), users can maintain several verified mobile numbers and designate one as the primary mobile number.

!!! note
    - This feature can be invoked via a PUT/PATCH request to the SCIM 2.0 /Users endpoint or /Me endpoint.
    - The verification on update capability is **only** supported for the `http://wso2.org/claims/mobile` and `http://wso2.org/claims/verifiedMobileNumbers` claims.
    - An SMS OTP verification is not triggered if the mobile number to be updated is the same as a previously verified mobile number of the user.

## Prerequisites

- Configure your preferred SMS provider in {{product_name}}.

    ??? note "Configuring Twilio"
        To configure Twilio as your SMS provider, follow the steps below:

        - Go to [Twilio](https://www.twilio.com/try-twilio){:target="_blank"} and create an account.
        - After signing up for your account, navigate to the Phone Numbers page in your console. You’ll see the phone number that has been selected for you. Note the phone number’s capabilities, such as "Voice", "SMS", and "MMS".
        - After signing up, navigate to the Phone Numbers page in your console and note the phone number’s capabilities.
        - Get your first Twilio phone number and use that as the “Sender” in the settings. For more information, see this tutorial in the Twilio documentation.
        - Copy the Account SID and Auth Token from the Twilio console dashboard.
        - Go to **SMS Provider** section in the {{ product_name }} Console and click the **Twilio** tab and fill the required fields.

        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Twilio Account SID</td>
            <td>Account SID received in the previous step.</td>
            <td><code>YourAccountSID</code></td>
          </tr>
          <tr>
            <td>Twilio Auth Token</td>
            <td>Auth token received in the previous step.</td>
            <td><code>YourAuthToken</code></td>
          </tr>
          <tr>
            <td>Sender</td>
            <td>Phone number that you received when creating the Twilio account.</td>
            <td><code>+1234567890</code></td>
          </tr>
        </table>

    ??? note "Configuring Vonage"
    
        To configure Vonage as your SMS provider, follow the steps below:

        - Login to [Vonage](https://dashboard.nexmo.com/sign-in){:target="_blank"} and create an  account.
        - Fill in the required fields and create the account.
        - Login to the Vonage dashboard and copy the API Key and API Secret.
        - Go to **SMS Provider** section in the {{ product_name }} Console and click the **Vonage** tab and fill the required fields.

        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Vonage API Key</td>
            <td>Use the API Key from the previous step.</td>
            <td><code>YourAPIKey</code></td>
          </tr>
          <tr>
            <td>Vonage API Secret</td>
            <td>Use the API Secret from the previous step.</td>
            <td><code>YourAPISecret</code></td>
          </tr>
          <tr>
            <td>Sender</td>
            <td>The number that the receiver will see when you send an SMS.</td>
            <td><code>+1234567890</code></td>
          </tr>
        </table>

    ??? note "Configuring a Custom Provider"
    
        If you are not using either Twilio or Vonage as the SMS provider, you can configure a custom SMS provider. Custom SMS provider configuration will pass the SMS data to the given URL as an HTTP request.

        To configure a custom SMS provider, in the  **SMS Provider** section click the **Custom** tab and fill the required fields.

        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>SMS Provider URL</td>
            <td>URL of the SMS gateway where the payload should be published.</td>
            <td><code>https://api.example.com/api/v1</code></td>
          </tr>
          <tr>
            <td>Content Type</td>
            <td>Content type of the payload. Possible values are <code>JSON</code> or <code>FORM</code> (Optional).</td>
            <td><code>JSON</code></td>
          </tr>
          <tr>
            <td>HTTP Method</td>
            <td>HTTP method that should be used when publishing the payload to the provider URL. Possible values: <code>PUT</code>, <code>POST</code> (Optional). </td>
            <td><code>POST</code></td>
          </tr>
          <tr>
            <td>Payload Template</td>
            <td>How the payload template should be. </br>Placeholders: </br><code>\{\{body\}\}</code> - Generated body of the SMS. (Example - This can be the OTP). </br><code>\{\{mobile\}\}</code> - Number that this sms should be sent to.</td>
            <td>Example JSON payload template: </br><code>{“content”: \{\{body\}\},“to”: \{\{mobile\}\}}}</code></br></br>(<code>\{\{mobile\}\}</code> and <code>\{\{body\}\}</code> will be replaced with the corresponding values at the runtime.)</td>
          </tr>
          <tr>
            <td>Headers</td>
            <td>Custom static headers need to be passed. If multiple headers need to be passed, they should be comma separated. (Optional)</td>
            <td><code>authorisation: qwer1234asdfzxcv, x-csrf: true, x-abc: some-value</code></td>
          </tr>
        </table>

- If required, enable [support for multiple mobile numbers]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user) for users.

- Update [mobile number verification settings]({{base_path}}/guides/users/attributes/user-attribute-change-verification/).


## Try it out 

Follow the guides below to try out different mobile number update scenarios.

### Update the primary mobile number

If you only support a single mobile number and wish to update the mobile number of a user,

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Select a user account and go to its **Profile** tab.

3. Under **Mobile**, update the user's mobile number.

4. Click **Update** to save the changes. An SMS OTP will be sent to the specified mobile number for verification. The user needs to enter the SMS OTP to verify the mobile number.

Alternatively, you may update the mobile number via a PATCH operation to the [SCIM 2.0 Users endpoint]({{base_path}}/apis/scim2/scim2-users-rest-api/) as shown below.

!!! abstract ""
    
    === "Request format"
        ```
        curl -X PATCH 
        https://{{ host_name }}/scim2/Users/<user_ID> \
        -d '{
            "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"], 
            "Operations":[{
                "op":<operation>, 
                "value":
                    { "mobileNumbers":[{"type":"mobile", "value":<new_mobile>}]}
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
                    { "phoneNumbers":[{"type": "mobile", "value":"0123456789"}]}
                }]
            }' \
        --header "Content-Type:application/json"
        --header "Authorization: Bearer <access_token>"
        ```
    ---
    **Sample Response**
    ```
    {
        "emails": [
            "bobsmith@abc.com"
        ],
        "meta": {
            "location": "https://{{ host_name_example }}/scim2/Users/6d433ee7-7cd4-47a3-810b-bc09023bc2ce",
            "lastModified": "2020-10-12T13:35:24.579Z",
            "resourceType": "User"
        },
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
            "urn:scim:wso2:schema"
        ],
        "roles": [
            {
                "type": "default",
                "value": "Internal/everyone"
            }
        ],
        "name": {
            "givenName": "Bob",
            "familyName": "Smith"
        },
        "id": "6d433ee7-7cd4-47a3-810b-bc09023bc2ce",
        "userName": "bob123",
        "phoneNumbers": [
            {
                "type": "mobile",
                "value": "0111111111"
            }
        ],
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
            "pendingMobileNumber": "0123456789"
        }
    }
    ```

### Update the verified mobile numbers list

If you have enabled support for multiple mobile numbers, a user can have several verified mobile numbers and a single primary mobile number.

To verify a mobile number, 

1. On the {{product_name}} Console, go to **User Management** > **Users**.

2. Select a user account and go to its **Profile** tab.

3. Under **Mobile**, click the verify icon on an unverified mobile number of the user.

A verification code will be sent to your mobile number.

![Mobile number update]({{base_path}}/assets/img/guides/users/my-account-verify-mobile.png)

An SMS OTP will be sent to the specified mobile number for verification. The user needs to provide the OTP to verify the mobile number.
 
Alternatively, you may update the mobile numbers via a PATCH operation to the [SCIM 2.0 Users endpoint]({{base_path}}/apis/scim2/scim2-users-rest-api/) as shown below.

!!! abstract ""

    === "Request format"
    
        ```curl
        curl -X PATCH 
        https://{{ host_name }}/scim2/Users/<user_ID> \
        -d '{
            "schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
            "Operations":[{
                "op":<operation>,
                "value":{"urn:scim:wso2:schema": {"verifiedMobileNumbers": <list_of_mobile_numbers>}}
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
                "value":{"urn:scim:wso2:schema": {"verifiedMobileNumbers": "0111111111,0123456789"}}
                }]
            }' 
        --header "Content-Type:application/json"
        --header "Authorization: Bearer <access_token>"
        ```

    ---
    **Sample Response**
    ```
    {
        "emails": [
            "bobsmith@abc.com"
        ],
        "meta": {
            "location": "https://{{ host_name_example }}/scim2/Users/6d433ee7-7cd4-47a3-810b-bc09023bc2ce",
            "lastModified": "2020-10-12T13:35:24.579Z",
            "resourceType": "User"
        },
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
            "urn:scim:wso2:schema"
        ],
        "roles": [
            {
                "type": "default",
                "value": "Internal/everyone"
            }
        ],
        "name": {
            "givenName": "Bob",
            "familyName": "Smith"
        },
        "id": "6d433ee7-7cd4-47a3-810b-bc09023bc2ce",
        "userName": "bob123",
        "phoneNumbers": [
            {
                "type": "mobile",
                "value": "0111111111"
            }
        ],
        "urn:scim:wso2:schema": {
            "mobileNumbers": "0111111111",
            "verifiedMobileNumbers": "0111111111",
        },
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
            "pendingMobileNumber": "0123456789"
        }
    }
    ```

Upon receiving the response outlined above, the user will receive an SMS notification prompting them to verify their updated mobile number. Once verified, the `verifiedMobileNumbers` claim (http://wso2.org/claims/verifiedMobileNumbers) will be updated to reflect the new mobile number.

## Validate the verification code

When going through the mobile number verification process, users can enter the SMS OTP in the provided prompt and click **Verify** to verify the mobile number.

![Mobile number verification code]({{base_path}}/assets/img/guides/users/my-account-mobile-verification-code.png)

Alternatively, the validation-code API can be used to submit the SMS OTP as shown below.

{% if product_name == "WSO2 Identity Server" %}
### By a non-privileged user

Users can verify the SMS OTP by executing the following API request.
{% endif %}

!!! abstract ""

    === "Request format"

        ```curl
        curl -X POST https://{{ host_name }}/api/identity/user/v1.0/me/validate-code 
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ "code": "<validation_code>",
              "properties": []
            }'
        ```
    === "Sample request"

        ```curl
        curl -X POST https://{{ host_name_example }}/api/identity/user/v1.0/me/validate-code 
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ "code": "1234",
              "properties": []
            }' 
        ```
    ---
    **Response**
    ```
    "HTTP/1.1 200 Accepted"
    ```

{% if product_name == "WSO2 Identity Server" %}
### By a privileged user

Privileged users can verify the SMS OTP on behalf of a user by executing the following API request.

!!! abstract ""

    === "Request format"

        ```curl
        curl -X POST https://{{ host_name }}/api/identity/user/v1.0/validate-code
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ "code": "<validation_code>",
              "properties": []
            }'
        ```
    === "Sample request"

        ```curl
        curl -v -k -X POST https://{{ host_name_example }}/api/identity/user/v1.0/validate-code 
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ "code": "1234",
              "properties": []
            }' 
        ```
    ---
    **Response**
    ```
    "HTTP/1.1 200 Accepted"
    ```
{% endif %}

## Resend the verification code

Users can request for a new SMS OTP code by simply clicking the `Resend verification code` button in the shown prompt 

![Mobile number verification code]({{base_path}}/assets/img/guides/users/my-account-mobile-verification-code.png)

Alternatively, the resend-code API can be used to resend the SMS OTP as shown below.

{% if product_name == "WSO2 Identity Server" %}
### By a non-privileged user

Users can request a new SMS OTP by using the following API request.
{% endif %}

!!! abstract ""

    === "Request format"
    
        ```curl
        curl -X POST https://{{ host_name }}/api/identity/user/v1.0/me/resend-code 
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ "properties": [{
                "key": "RecoveryScenario", 
                "value": "<recovery_scenario>"
              }]
            }'
        ```
    === "Sample request"

        ```curl
        curl -X POST https://{{ host_name_example }}/api/identity/user/v1.0/me/resend-code 
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ "properties": [{
                "key": "RecoveryScenario", 
                "value": "MOBILE_VERIFICATION_ON_UPDATE"
              }]
            }' 
        ```

    The verification scenario should be specified in the `properties` parameter of the request body as follows:

    - `MOBILE_VERIFICATION_ON_UPDATE`: Used when verifying a newly updated mobile number for a user. </br>
    - `MOBILE_VERIFICATION_ON_VERIFIED_LIST_UPDATE`: Used when updating the list of verified mobile numbers for a user.
    ---

    **Response**
    ```
    "HTTP/1.1 201 Created"
    ```

{% if product_name == "WSO2 Identity Server" %}
### By a privileged user

Privileged users can resend an SMS OTP on behalf of a user using the following API request.

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
                "value":<recovery_scenario>
                }]
            }'
        ```
    === "Sample request"

        ```curl
        curl -X POST https://{{ host_name_example }}/api/identity/user/v1.0/resend-code
        -H "Authorization: Bearer <access_token>"
        -H "Content-Type: application/json" \
        -d '{ 
              "user": {
                "username": "bob",
                "realm": PRIMARY"
            },
              "properties": [{
                "key":"RecoveryScenario",
                "value":"MOBILE_VERIFICATION_ON_UPDATE"
                }]
            }'
        ```

    The verification scenario should be specified in the request body as follows:

    - `MOBILE_VERIFICATION_ON_UPDATE`: Used when verifying updated primary mobile number.
    - `MOBILE_VERIFICATION_ON_VERIFIED_LIST_UPDATE`: Used when updating the list of verified mobile numbers.

    ---
    **Response**
    ```
    "HTTP/1.1 201 Created"
    ```
{% endif %}
