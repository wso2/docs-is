# Enable mobile number verification on update

Mobile number verification on update ensures that when a user changes their primary mobile number, an SMS OTP is sent 
to the new number for verification. The existing primary number remains unchanged until the new one is successfully 
verified. If multiple mobile numbers per user support is enabled, users can maintain several verified numbers and 
designate one as the primary number as needed.

!!! note
    - This feature can be invoked via a PUT/PATCH request to the SCIM 2.0 /Users endpoint or /Me endpoint.
    - The verification on update capability is **only** supported for the `http://wso2.org/claims/mobile` and `http://wso2.org/claims/verifiedMobileNumbers` claims.
    - An SMS OTP verification is not triggered if the mobile number to be updated is the same as the previously 
    verified mobile number of the user.
    - Triggering a mobile verification is skipped if the `verifyMobile` claim is not set to true when 
    `UseVerifyClaim` config is enabled.
    - By default, multiple email and mobile per user support is enabled. Add the following property to the above `deployment.toml` config to disabled this server wide and restart the server.
        ```toml
        [identity_mgt.user_claim_update]
        enable_multiple_emails_and_mobile_numbers = false
        ```

## Prerequisites

### Configurations related to SMS providers are located under the **Email & SMS** section.

#### Supported Providers

{{ product_name }} supports Twilio, Vonage, or custom SMS providers by default. To learn how to configure each provider, please see the relevant section.

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

    - Login to [Vonage](https://dashboard.nexmo.com/sign-in){:target="_blank"} and create an account.
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

## Configure mobile number verification on update

1. On the {{product_name}} Console, go to **User Attributes & Stores** > **Attributes**.

2. Under **Manage Attributes**, click on **User Attribute Change Verification**.

3. Configure the following properties:
    <table>
    <tr>
        <td>Enable user mobile number verification on update</td>
        <td>When enabled, this option triggers an SMS One-Time Password (OTP) verification process when the user updates their mobile number.</td>
    </tr>
    <tr>
        <td>Enable mobile number verification by Privileged Users</td>
        <td>Allows privileged users (such as administrators) to initiate mobile number verification on behalf of other users.</td>
    </tr>
    </table>

4. Click **Update** to save the changes.

## Try it out 

### Update the primary mobile number

Given below is a sample request and the relevant response for updating the mobile number via a PATCH operation to SCIM 
2.0 Users endpoint.

!!! abstract ""
    **Request**
    ```curl
    curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],
    "value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[user ID]
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -k --user bob:pass123 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations":[{"op":"replace","value":{"phoneNumbers":[{"type":"mobile","value":"0123456789"}]}}]}' 
    --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21
    ```
    ---
    **Sample Response**
    ```
    {
        "emails": [
            "bobsmith@abc.com"
        ],
        "meta": {
            "location": "https://localhost:9443/scim2/Users/6d433ee7-7cd4-47a3-810b-bc09023bc2ce",
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

If you have multiple email and mobile per user support enabled, you can maintain several verified mobile numbers and 
select one as your primary number whenever you need.

To verify a mobile number, simply click on the verify mobile icon next to the number you'd like to verify.

![Mobile number update]({{base_path}}/assets/img/guides/users/my-account-verify-mobile.png)

A verification code will be sent to your mobile number. Enter this code in the provided field and click the 'Verify' 
button to complete the process.

![Mobile number verification code]({{base_path}}/assets/img/guides/users/my-account-mobile-verification-code.png)
 
Given below is a sample request and the relevant response for updating the verified mobile numbers via a PATCH 
operation to SCIM 2.0 Users endpoint.

!!! abstract ""
    **Request**
    ```curl
    curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],
    "value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/[user ID]
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -k --user bob:pass123 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations":[{"op":"replace","value":{"urn:scim:wso2:schema": {"verifiedMobileNumbers": "0111111111,0123456789"}
    }}]}' 
    --header "Content-Type:application/json" https://localhost:9443/scim2/Users/1e624046-520c-4628-a245-091e04b03f21
    ```
    ---
    **Sample Response**
    ```
    {
        "emails": [
            "bobsmith@abc.com"
        ],
        "meta": {
            "location": "https://localhost:9443/scim2/Users/6d433ee7-7cd4-47a3-810b-bc09023bc2ce",
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

Upon receiving the response given above, the user will receive an SMS notification with a verification code to the new 
mobile number. 
 
### Validate the verification code

The user can submit the SMS OTP code using the validate-code API.
Given below is a sample request and the relevant response to submit the received verification code.

!!! abstract ""
    **Request**
    ```curl
    curl -k -v -X POST -H "Authorization: <Base64Encoded_username:password>" -H "Content-Type: application/json" -d 
    '{ "code": "<validation_code>","properties": []}' "https://localhost:9443/api/identity/user/v1.0/me/validate-code"
    ```
    ---
    **Sample Request**
    ```curl
    curl -k -v -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{ "code": "123{{base_path}}","properties": []}'
    "https://localhost:9443/api/identity/user/v1.0/me/validate-code"
    ```
    ---
    **Response**
    ```
    "HTTP/1.1 202 Accepted"
    ```

### Resend the verification code

The user can request to resend a new SMS OTP code using the resend-code API.
Given below is a sample request and the relevant response to request a new verification code.

!!! abstract ""
    **Request**
    ```curl
    curl -X POST -H "Authorization: Basic <Base64Encoded_username:password>" -H "Content-Type: application/json" -d '{"properties": []}' 
    "https://localhost:9443/api/identity/user/v1.0/me/resend-code"
    ```

    The verification scenario should be specified in the properties parameter of the request body as follows :
    ```
    "properties": [{"key": "RecoveryScenario", "value": "MOBILE_VERIFICATION_ON_VERIFIED_LIST_UPDATE"}]
    ```
    - `MOBILE_VERIFICATION_ON_UPDATE`: Used when verifying a newly updated mobile number for a user. </br>
    - `MOBILE_VERIFICATION_ON_VERIFIED_LIST_UPDATE`: Used when updating the list of verified mobile numbers for a user.
    ---
    **Sample Request**
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"properties": [{"key":"RecoveryScenario","value": "MOBILE_VERIFICATION_ON_UPDATE"}]}' 
    "https://localhost:9443/api/identity/user/v1.0/me/resend-code"
    ```
    ---
    **Response**
    ```
    "HTTP/1.1 201 Created"
    ```

---

Additionally, you can use the following curl command to resend a new SMS OTP code by a privileged user.

**Sample**

!!! abstract ""
    **Request**
    ```curl
    curl -X POST -H "Authorization: Basic <Base64Encoded_username:password>" -H "Content-Type: application/json" -d '{"user":{},"properties": []}'
    "https://localhost:9443/api/identity/user/v1.0/resend-code"
    ```

    The user and the verification scenario should be specified in the request body as follows :
    ```
    "user": {"username": "", "realm": ""}
    "properties": [{"key":"RecoveryScenario", "value":"MOBILE_VERIFICATION_ON_UPDATE"}]
    ```
    - `MOBILE_VERIFICATION_ON_UPDATE`: Used when verifying updated primary mobile number. </br>
    - `MOBILE_VERIFICATION_ON_VERIFIED_LIST_UPDATE`: Used when updating the list of verified mobile numbers.
    ---
    **Sample Request**
    ```curl
    curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": "admin","realm": "PRIMARY"},"properties": [{"key":"RecoveryScenario","value":"MOBILE_VERIFICATION_ON_UPDATE"}]}' "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
    ```
    ---
    **Response**
    ```
    "HTTP/1.1 201 Created"
    ```

