# Validating the Scope of OAuth Access Tokens using XACML Policies

WSO2 Identity Server (WSO2 IS) allows you to validate the scope of an 
OAuth access token using XACML policies to provide fine-grained access 
control to APIs.

If you want the XACML scope validator to execute after checking the 
validity of the access token in an OAuth access token validation flow, 
you can select the scope validator as XACML when you configure a service 
provider. This provides fine-grained access control to APIs.

The following sections walk you through the basic steps 
you need to follow to validate the scope of OAuth access tokens using 
XACML policies.

### Register the app

Follow the steps given below to configure an application in WSO2 Identity
Server so that the authentication happens as expected.

1. On the {{ product_name }} Console, go to **Applications**.
2. Click **New Application** and select **Standard-Based Application**.
   ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/register-an-sba.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
3. Provide an application name and select the other options based on your requirements.

    !!! note 
        - You can choose OIDC or SAML as the standard protocol for your application. See the complete list of [OIDC]({{base_path}}/references/app-settings/oidc-settings-for-app/) and [SAML]({{base_path}}/references/app-settings/saml-settings-for-app/)  configurations.
        - If you use OIDC, you can authorize APIs to an app to access the APIs in {{ product_name }}. Learn about [Authorize the API resources for an app]({{base_path}}/guides/authorization/api-authorization/api-authorization/#authorize-the-api-resources-for-an-app).

4. Click **Register** to complete the registration.
5. After the application is registered, you will be redirected into the application.
6. Do the required changes to the application and click **Update**.
7. Get the created application's inbound protocol (OAuth2 / OIDC) configurations 
   by using the following REST API call.
    
    ```java
    curl --location 'https://localhost:9443/t/<TENANT_DOMAIN>/api/server/v1/applications/<APPLICATION_ID>/inbound-protocols/oidc' \
    --header 'Authorization: Basic YWRtaW46YWRtaW4='
    ```

8. Copy the response of the above REST API call and add the following value to the 
   `scopeValidators` array in the response.

    ```json
    "scopeValidators": [
            "XACML Scope Validator"
    ]
    ```

9. Execute the Inbound Protocols PUT REST API call to update the application with the 
   XACML scope validator which added in the step 7. You can get the API call details from
   <a href="{{base_path}}/apis/application-rest-api/#tag/Inbound-Protocols-OAuth-OIDC/operation/updateInboundOAuthConfiguration/">Update OIDC authentication protocol parameters</a>.

### Register an API resource and Authorize for an app

1. Go to the **API Resources** and click **New API Resource**.
2. Add the relevant details to Basic Details, Scopes, Authorization sections and click **Create**.
3. Go to the **API Authorization** tab in the created application.
4. Click **Authorize an API Resource**, select the created API resource, scopes and click **Finish**.

    !!!note
        For more information on API Authorization, see [here](../api-authorization/api-authorization.md)

### Create a user and a role

1. Go to **User Management** > **Users**.
2. Click **Add User** button and select **Single User** option. 
3. Provide the relevant details and click **Save & Continue**.
4. Go to the **User Management** > **Roles**.
5. Click **New Role**, add the Basic Details, Permission Selection and click **Finish**.
6. Go to the **Users** tab of the created role and assign the created user to the role.

    !!!note
        For more information on User Management, see [here](../../users/index.md)

The next step is to configure the XACML policy to validate the XACML scope during OAuth
token issuance.

### Set up the policy

Follow the instructions given below to publish a policy using a XACML policy
template that is available by default with WSO2 Identity Server.

1. Log in to the Management Console via <https://localhost:9443/carbon>.
2. In the **Main** tab of the Management Console, navigate to
   **PAP** \> **Policy Administration** under the **Entitlement** menu.
3. Select the `scope_based_token_issuance_policy_template`
   policy, and click **Edit** to view the selected policy in the policy
   editor.
   

    !!! info        
        XACML template policies provide a pre-configured template with place
        holders to customize the policy depending on your requirement.


4. Edit the policy to customize it depending on your requirement. You
   can change the values of attributes and rules.
5. Click **Save Policy** to save the changes. You can see the policy
   that you created on the policy list (the original policy template
   remains unchanged).
6. Click the link **Publish to My PDP** corresponding to the new
   policy.
7. On the UI that appears, leave the default values as they are and
   click **Publish**.

   To ensure that the policy has been published successfully, click on
   **Policy View** under the **Entitlement \> PDP** section on the
   **Main** tab of the Management Console, and check if the created
   policy is listed.

Now, you have created the policy and enforced it using the policy
template. You can test the policy to evaluate whether XACML scope is
validated at the time of OAuth token issuance.

### Try it out

Follow the steps given below to try out the policy using the above created application.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application, go to the **Protocols** tab of the application and enable the **Password** grant type.
3. Execute the following cURL command to get an access token using the password grant type.

```java
curl --location 'https://localhost:9443/t/<TENANT_DOMAIN>/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic <BASE64_ENCODED(CLIENT_ID:CLIENT_SECRET)>' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=<USER_NAME>' \
--data-urlencode 'password=<USER_PASSWORD>' \
--data-urlencode 'scope=openid SCOPE_1'
```
If the token request can be permitted by the policy, the response will contain an access token. 
If the token request is denied by the policy, the response will contain an error message.

Follow the steps below to try out the policy using the XACML TryIt tool.

!!! tip
    The XACML TryIt tool allows you to test policies easily without having
    to create and send authorization requests to WSO2 IS. It is a tool
    through which authorization requests can be created and evaluated
    against available policies. You can write simple XACML 3.0 requests in
    XML format and try them using the web UI of the TryIt tool.

1.  On the Management Console, click **Tools**, and then click
    **TryIt** under the **XACML** section.

2.  Click **Create Request Using Editor**.

3.  Specify the following as the sample request:

    ``` java
    <Request xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" CombinedDecision="false" ReturnPolicyIdList="false">
        <Attributes Category="http://wso2.org/identity/sp">
            <Attribute AttributeId="http://wso2.org/identity/sp/sp-name" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">test_server</AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="http://wso2.org/identity/identity-action">
            <Attribute AttributeId="http://wso2.org/identity/identity-action/action-name" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">scope_validation</AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="http://wso2.org/identity/oauth-scope">
            <Attribute AttributeId="http://wso2.org/identity/oauth-scope/scope-name" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">openid</AttributeValue>
            </Attribute>
            <Attribute AttributeId="http://wso2.org/identity/oauth-scope/scope-name" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SCOPE_1</AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string"><USER_NAME>@<TENANT_DOMAIN></AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="http://wso2.org/identity/user">
            <Attribute AttributeId="http://wso2.org/identity/user/username" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string"><USER_NAME></AttributeValue>
            </Attribute>
            <Attribute AttributeId="http://wso2.org/identity/user/user-store-domain" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string"><USER_DOMAIN></AttributeValue>
            </Attribute>
            <Attribute AttributeId="http://wso2.org/identity/user/user-tenant-domain" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string"><TENANT_DOMAIN></AttributeValue>
            </Attribute>
            <Attribute AttributeId="http://wso2.org/identity/user/user-type" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string"><USER_TYPE></AttributeValue>
            </Attribute>
        </Attributes>
    </Request>
    ```

4.  Click **Evaluate With PDP**. You will see a response message that
    says either `Permit` or `Deny`
    depending on whether the XACML scope is validated or not at the time
    of OAuth token validation.
