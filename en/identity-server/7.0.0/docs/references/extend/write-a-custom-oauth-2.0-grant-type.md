
# Write a Custom OAuth 2.0 Grant Type

OAuth 2.0 authorization servers support four main grant types according to the [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749). It also has the flexibility to support any custom grant types. This topic provides instructions on how to implement a custom grant type for the OAuth 2.0 authorization server and how to extend the behavior of default grant types.

The WSO2 Identity Server is used as the OAuth 2.0 authorization server implementation, which is an open-source implementation.

## Implement a new grant type

Follow the steps given below to implement a new grant type.

1. Implement the following two extensions.

    - `GrantTypeHandler` - This extension specifies the validation process and token issuance mechanism.. This can be achieved either by implementing the `AuthorizationGrantHandler` interface or by extending the pre-existing `AbstractAuthorizationGrantHandler`. In many scenarios within the WSO2 OAuth component, extending the AbstractAuthorizationGrantHandler is sufficient.

    - `GrantTypeValidator` - This extension validates the grant request sent to the `/token` endpoint. You can define what parameters must be in the request and define the validation of them. This can be implemented by extending the `AbstractValidator` in the Apache Amber component.

2. When the implementation is done, package your class as a `.jar` file and add it to the `<IS_HOME>/repository/component/lib` directory.

3. To register the custom grant type, add the following configuration to `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [[oauth.custom_grant_type]]
    name="grant type identifier"
    grant_handler="full qualified class name of grant handler"
    grant_validator="full qualified class name of grant validator"
    [oauth.custom_grant_type.properties]
    IdTokenAllowed=true
    ```

    !!! info
        Setting the `<IdTokenAllowed>` parameter to `true`, provides flexibility to control the issuing of IDtoken for each grant and also allows the OIDC scope validator to validate the grant types that should support the openid scope.

4. Restart the server to apply changes.

To test this out, follow the instructions below to implement a custom-grant type sample.

## Use the sample grant type

In this section of the guide, we will use a sample defining a custom grant type called the `mobile` grant.
It is similar to the password grant type; the only difference is that users will pass a mobile number instead of a password. The request to the `/token` API must contain the following two request parameters.

- `grant_type=mobile`
- `mobileNumber=044322433`

You can access the new grant-type project sample from the [GitHub repository](https://github.com/wso2/samples-is/tree/master/oauth2/custom-grant). The grant handler and validator class is inside the `org.wso2.sample.identity.oauth2.grant.mobile` package. This can be modified as required.

### Configure the resource

The following Maven buildable source is compatible with WSO2 Identity Server 5.1.0 onwards. The attached `.jar` file can be directly used as well.

|   |   |
|---|---|
| Buildable source   | [custom-grant](https://github.com/wso2/samples-is/tree/master/oauth2/custom-grant) |
| Built jar file | [custom-grant-4.4.2.jar]({{base_path}}/assets/attachments/custom-grant-4.4.2.jar)       |

!!! note
    To generate the `.jar` file from the buildable source, run the following Apache Maven command in the sample's location using the command line.

    ```java
    mvn clean install
    ```

1. Copy the `.jar` file in the target directory into the `<IS_HOME>/repository/component/lib` directory.

2. Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [[oauth.custom_grant_type]]
    name="mobile"
    grant_handler="org.wso2.sample.identity.oauth2.grant.mobile.MobileGrant"
    grant_validator="org.wso2.sample.identity.oauth2.grant.mobile.MobileGrantValidator"
    [oauth.custom_grant_type.properties]
    IdTokenAllowed=true
    ```

4. Restart the server.

### Configure a service provider with the custom grant

!!! note "Before you begin"
    You need to have an OIDC application created on the WSO2 Identity Server. If you don't already have one use the following guides to create one.

    - [Register an OpenID Connect web app]({{base_path}}/guides/applications/register-oidc-web-app/)
    
    - [Register a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/)

To add the custom grant type to your application:

1. On the WSO2 Identity Server Console, go to **Applications**.
2. Select your application, go to the **Protocol** tab and select the **mobile** from the **Allowed Grant Types** list.
3. Click **Update** to save the configurations.

!!! tip
    To configure more advanced configurations, see [OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced).

### Obtain an access token

Send the grant request to the `/token` API using a cURL command.

!!! note
    The HTTP POST body must contain the parameters `grant_type=mobile` and `mobileNumber`.

    ```java
    grant_type=mobile&mobileNumber=<MOBILE_NUMBER>
    ```

!!! abstract ""
    **Request format**
    ```
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=<CUSTOM_GRANT_TYPE>&mobileNumber=<MOBILE_NUMBER>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```
    ---
    **Sample request**
    ```curl
    curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k -d "grant_type=mobile&mobileNumber=0333444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```

You will receive a response similar to the following JSON response with the access token.

```java
{
    "token_type":"bearer",
    "expires_in":2823,
    "refresh_token":"26e1ebf16cfa4e67c3bf39d72d5c276",
    "access_token":"d9ef87802a22cf7682c2e77df72c735"
}
```

!!! note
    The sample application randomly generates the access token and the refresh token received with the response. Those tokens are not valid.

## Customize an existing grant type

You can customize one of the existing grant types as an alternative to creating a custom OAuth grant type.

The following two classes are sample implementations of customizing the password grant type in particular, but any other grant type can be customized as well.

- [RoleBasedPasswordGrant](https://github.com/wso2/samples-is/blob/master/oauth2/custom-grant/src/main/java/org/wso2/sample/identity/oauth2/grant/password/RoleBasedPasswordGrant.java) - This does RBAC validation apart from the authentication before granting access.

- [ModifiedAccessTokenPasswordGrant](https://github.com/wso2/samples-is/blob/master/oauth2/custom-grant/src/main/java/org/wso2/sample/identity/oauth2/grant/password/ModifiedAccessTokenPasswordGrant.java) - This implementation customize the access token value.

### Configure the resource

1. Copy the .jar file into the `<IS_HOME>/repository/component/lib` directory. You can also modify the project and build it using Apache Maven 3.

2. Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [oauth.grant_type.password]
    grant_handler="org.wso2.sample.identity.oauth2.grant.password.ModifiedAccessTokenPasswordGrant"
    ```

3. Restart the server.

### Configure a service provider with the customized grant

!!! note "Before you begin"
    You need to have an OIDC application created on the WSO2 Identity Server. If you don't already have one, use the following guides to create one.

    - [Register an OpenID Connect web app]({{base_path}}/guides/applications/register-oidc-web-app/)
    
    - [Register a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/)

To add the customized grant type to your application:

1. On the WSO2 Identity Server Console, go to **Applications**.
2. Select your application, go to the **Protocol** tab and select the **Password** from the **Allowed Grant Types** list.

    !!! note
        Note the **Client ID** and **Client Secret** that appear.

3. Click **Update** to save the configurations.

!!! tip
    To configure more advanced configurations, see [OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced).

### Obtain an access token

Send the password grant request to the `/token` API using a cURL command.

!!! abstract
    **Request format**
    ```
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```
    ---
    **Sample request**
    ```curl
    curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k -d "grant_type=password&username=admin&password=admin" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```

You will receive a response similar to the following JSON response with the access token.

```java
{
    "token_type":"bearer",
    "expires_in":2955,
    "refresh_token":"6865c8d67b42c0c23e634a8fc5aa81f",
    "access_token":"982f40d4-0bb6-41ce-ac5a-1da06a83e475asela@soasecurity.org"
}
```

??? note "Sending Custom Error Codes"
    Using a custom grant handler, you can send custom error codes to the client side in case of defined/identified errors.

    This uses the mobile grant sample and adds the specific error codes/messages to it. 
    
    !!! tip
        See [here](#use-the-grant-type-sample) for instructions on implementing and using the mobile grant sample before adding the custom error codes to it.

    In the downloaded Maven [buildable source]({{base_path}}/assets/attachments/custom-grant.zip), add the following code segment in the sample class `org.wso2.sample.identity.oauth2.grant.mobile.MobileGrant` inside `validateGrant()` method is the relevant code used for this mechanism.

    ``` java
    if(mobileNumber != null) {
        //validate mobile number
        authStatus =  isValidMobileNumber(mobileNumber);

        if(authStatus) {
            // if valid set authorized mobile number as grant user
            AuthenticatedUser mobileUser = new AuthenticatedUser();
            mobileUser.setUserName(mobileNumber);
            oAuthTokenReqMessageContext.setAuthorizedUser(mobileUser);
            oAuthTokenReqMessageContext.setScope(oAuthTokenReqMessageContext.getOauth2AccessTokenReqDTO().getScope());
        } else{
            ResponseHeader responseHeader = new ResponseHeader();
            responseHeader.setKey("SampleHeader-999");
            responseHeader.setValue("Provided Mobile Number is Invalid.");
            oAuthTokenReqMessageContext.addProperty("RESPONSE_HEADERS", new ResponseHeader[]{responseHeader});
        }

    }
    ```

    !!! note
        
        The `ResponseHeader` code chunk sets a custom response header in case an invalid mobile number is sent.
        
    Build the project and copy the modified jar to the `<IS_HOME>/repository/component/lib` directory.   

    **Try it out**

    - Happy Path

    ``` powershell
    curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=mobile&mobileNumber=0333444" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```

    - Erroneous Path

    ``` powershell
    curl -v --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=mobile&mobileNumber=0363444" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```

    !!! info 
        According to the mobile custom grant sample, this is erroneous because the mobile number does not start with '003'. You can use the -v option in the cURL command to see the response's header, which should be as seen in the code block below.

    ``` powershell
    > POST /oauth2/token HTTP/1.1
    > Authorization: Basic dlNmZVE5amZOb2RZMXR2OUtMTk54TE93N2t3YTpDRVVXdTdmRE55X1JZZzVsT19tcDhQTGY3blFh
    > User-Agent: curl/7.29.0
    > Host: localhost:9443
    > Accept: */*
    > Content-Type: application/x-www-form-urlencoded
    > Content-Length: 38
    > 
    * upload completely sent off: 38 out of 38 bytes
    < HTTP/1.1 400 Bad Request
    < Date: Wed, 13 Jan 2016 06:05:33 GMT
    < SampleHeader-999: Provided Mobile Number is Invalid.
    < Content-Type: application/json
    < Content-Length: 87
    < Connection: close
    < Server: WSO2 Carbon Server
    < 
    * Closing connection 0
    * SSLv3, TLS alert, Client hello (1):
    {"error":"invalid_grant","error_description":"Provided Authorization Grant is invalid"}
    ```

    !!! info 
        `SampleHeader-999...` shows the custom header appearing in the headers.

    Similarly, this can be used to transfer any custom information to the client's flexibly.
