# Manage attributes

An attribute is a piece of information about a particular user. It can be anything associated with the user, such as name, group, preferences, etc.

User attributes represent information directly related to the user, such as the street address, username, email, first name, and more.

You need user attributes to maintain the required user information in an organization. You can select the user information for your applications by using these attributes. Also, the user information displayed in user profiles is managed using attributes.

See the information given below to manage attributes in your organization.

## View attributes
To view the attributes available for your organization:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** again under the **Manage Attributes** section.

    ![Attributes]({{base_path}}/assets/img/guides/organization/attributes/local-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You can now see the complete list of attributes along with **Attribute Display Name** and **Attribute** name.

![View attributes]({{base_path}}/assets/img/guides/organization/attributes/view-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Add custom attributes

To add a custom attribute:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **New Attribute** and enter values for the following properties:

    ![Custom attribute]({{base_path}}/assets/img/guides/organization/attributes/new-custom-attribute.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
       <tbody>
          <tr>
             <td><b>Attribute Name</b></td>
             <td>The name that will be shared with applications.</td>
          </tr>
          <tr>
              <td><b>Protocol Mappings</b></td>
              <td>Mappings are auto-generated for the protocols. You can customize them here. </td>
         </tr>
         <tr>
             <td><b>Attribute Display Name</b></td>
             <td>The name that will be used in a user's profile.</td>
         </tr>
       </tbody>
    </table>

4. Click **Finish**.

## Update attributes
To update the properties of a user attribute:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **Edit** for the attribute you want to update.

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The **Attribute** field specifies the unique identifier of the attribute. It always starts with `http://wso2.org/claims`. This cannot be edited.

4. In the **General** tab, update the following values.

    <table>
       <tbody>
          <tr>
             <td><b>Attribute Display Name</b></td>
             <td>Update the display name of the attribute that will show in user profiles.</td>
          </tr>
          <tr>
               <td><b>Description</b></td>
               <td>Update the description for the attribute.</td>
          </tr>
        <tr>
              <td><b>Display this attribute on the user's profile</b></td>
              <td>If this checkbox is selected, the attribute is displayed in user profiles.</ td>
         </tr>
         <tr>
             <td><b>Make this attribute required on user's profile</b></td>
             <td>If this checkbox is selected, users are required to specify a value for this attribute on their profile.</td>
         </tr>
         <tr>
            <td><b>Make this attribute read-only on user's profile</b></td>
            <td>If this checkbox is selected, the value for this attribute will be read-only in user profiles.</td>
       </tr>
     </tbody>
    </table>

5. Go to the **Mapped Attributes** tab and enter the attribute from each user store that you need to map.

    ![Edit attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-mappings.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Go to the **Additional Properties** tab and add additional properties that can be used when writing an extension.

    ![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{{ user_attribute_change_verification }}

{% if product_name == "WSO2 Identity Server" %}
### Try it out

You can try out the follwoing flows using the provided cURLs:

- Update mobile number

    === "Request"
        ```
        curl -v -k -X PATCH \
        -H "Authorization: Basic <Base64Encoded_username:password>" \
        -d '{
            "schemas": [],
            "Operations": [
                {
                    "op": "[operation]",
                    "value": {
                        "[attributeName]": "[attribute value]"
                    }
                }
            ]
        }' \
        --header "Content-Type:application/json" \
        https://localhost:9443/scim2/Users/[user ID]
        ```

    === "Sample Request"
        ```
        curl -v -k -X PATCH \
        -H "Authorization: Basic YWRtaW46YWRtaW4=" \
        -d '{
            "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
            "Operations": [
                {
                    "op": "replace",
                    "value": {
                        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                            "verifyMobile": "true"
                        },
                        "phoneNumbers": [
                            {
                                "type": "mobile",
                                "value": "0123456789"
                            }
                        ]
                    }
                }
            ]
        }' \
        --header "Content-Type:application/json" \
        https://localhost:9443/scim2/Users/f276ff1a-1324-4d9a-af43-c307a77364f0

        ```

    === "Sample Response"
        ```
        {
            "meta": {
                "location": "https://localhost:9443/scim2/Users/f276ff1a-1324-4d9a-af43-c307a77364f0",
                "lastModified": "2024-05-20T08:53:07.524978614Z",
                "resourceType": "User"
            },
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
                "urn:scim:wso2:schema"
            ],
            "roles": [
                {
                    "audienceValue": "10084a8d-113f-4211-a0d5-efe36b082211",
                    "display": "admin",
                    "audienceType": "organization",
                    "value": "bf870fc2-bfc9-4baf-a4fc-eaae7bb74d51",
                    "$ref": "https://localhost:9443/scim2/v2/Roles/bf870fc2-bfc9-4baf-a4fc-eaae7bb74d51",
                    "audienceDisplay": "Super"
                },
                {
                    "audienceValue": "7d44cd44-d59b-48f3-987d-fa2b29d7c8c3",
                    "display": "Administrator",
                    "audienceType": "application",
                    "value": "647ba2c6-03ab-42e1-b72e-51218222f565",
                    "$ref": "https://localhost:9443/scim2/v2/Roles/647ba2c6-03ab-42e1-b72e-51218222f565",
                    "audienceDisplay": "Console"
                },
                {
                    "audienceValue": "10084a8d-113f-4211-a0d5-efe36b082211",
                    "display": "everyone",
                    "audienceType": "organization",
                    "value": "aba1b71a-34b2-456e-aaa4-535b5890e25f",
                    "$ref": "https://localhost:9443/scim2/v2/Roles/aba1b71a-34b2-456e-aaa4-535b5890e25f",
                    "audienceDisplay": "Super"
                }
            ],
            "groups": [
                {
                    "display": "admin",
                    "value": "64b27794-3fa7-4b70-83c3-f5320a7c0023",
                    "$ref": "https://localhost:9443/scim2/Groups/64b27794-3fa7-4b70-83c3-f5320a7c0023"
                }
            ],
            "id": "f276ff1a-1324-4d9a-af43-c307a77364f8",
            "userName": "admin",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                "pendingMobileNumber": "0123456789"
            }
        }
        ```

- Validate verification code

    === "Request"
        ```
        curl -k -v -X POST \
        -H "Authorization: Basic <Base64Encoded_username:password>" \
        -H "Content-Type: application/json" \
        -d '{ 
            "code": "<validation_code>",
            "properties": []
        }' \
        "https://localhost:9443/api/identity/user/v1.0/me/validate-code"
        ```

    === "Sample Request"
        ```
        curl -k -v -X POST \
        -H "Authorization: Basic YWRtaW46YWRtaW4=" \
        -H "Content-Type: application/json" \
        -d '{ 
            "code": "123456",
            "properties": []
        }' \
        "https://localhost:9443/api/identity/user/v1.0/me/validate-code"
        ```

    === "Sample Response"
        ```
        "HTTP/1.1 202 Accepted"
        ```

- Resend verification code

    === "Request"
        ```
        curl -X POST \
        -H "Authorization: Basic <Base64Encoded_username:password>" \
        -H "Content-Type: application/json" \
        -d '{ "properties": [] }' \
        "https://localhost:9443/api/identity/user/v1.0/me/resend-code"
        ```

        The verification scenario should be specified in the properties parameter of the request body as follows :

        ```
        {
            "properties": [
                {
                    "key": "RecoveryScenario",
                    "value": "MOBILE_VERIFICATION_ON_UPDATE"
                }
            ]
        }
        ```

    === "Sample Request"
        ```
        curl -X POST \
        -H "Authorization: Basic YWRtaW46YWRtaW4=" \
        -H "Content-Type: application/json" \
        -d '{ 
            "properties": [
                {
                    "key": "RecoveryScenario",
                    "value": "MOBILE_VERIFICATION_ON_UPDATE"
                }
            ] 
        }' \
        "https://localhost:9443/api/identity/user/v1.0/me/resend-code"
        ```

    === "Sample Response"
        ```
        "HTTP/1.1 201 Created"
        ```

    Additionally, you can use the following curl command to resend a new SMS OTP code by a privileged user.

    === "Request"
        ```
        curl -X POST \
        -H "Authorization: Basic <Base64Encoded_username:password>" \
        -H "Content-Type: application/json" \
        -d '{
            "user": {},
            "properties": []
        }' \
        "https://localhost:9443/api/identity/user/v1.0/resend-code"
        ```

        The user and the verification scenario should be specified in the request body as follows :

        ```
        {
            "user": {"username": "", "realm": ""},
            "properties": [
                {
                    "key": "RecoveryScenario",
                    "value": "MOBILE_VERIFICATION_ON_UPDATE"
                }
            ]
        }
        ```

    === "Sample Request"
        ```
        curl -X POST \
        -H "Authorization: Basic YWRtaW46YWRtaW4=" \
        -H "Content-Type: application/json" \
        -d '{
            "user": {"username": "admin", "realm": "PRIMARY"},
            "properties": [
                {
                    "key": "RecoveryScenario",
                    "value": "MOBILE_VERIFICATION_ON_UPDATE"
                }
            ]
        }' \
        "https://localhost:9443/api/identity/user/v1.0/resend-code" -k -v
        ```

    === "Sample Response"
        ```
        "HTTP/1.1 201 Created"
        ```
{% endif %}