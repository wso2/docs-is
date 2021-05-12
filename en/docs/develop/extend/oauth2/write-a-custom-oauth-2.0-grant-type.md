# Write a Custom OAuth 2.0 Grant Type

OAuth 2.0 authorization servers provide support for four main grant
types according to the [OAuth 2.0
specification](https://tools.ietf.org/html/rfc6749). It
also has the flexibility to support any custom grant types. This topic
provides instructions on how to implement a custom grant type for OAuth
2.0 authorization server and how to extend the behavior of default grant
types.

The WSO2 Identity Server is used as the OAuth 2.0 authorization server
implementation, which is an open source implementation.

------------------------------------------------------------------------

## Implement a new grant type

Follow the steps given below to implement a new grant type.

1.  Implement the following two extensions.
    -   `            GrantTypeHandler           ` - This is the
        implementation of the grant type. Here you can implement the
        way, it must be validated and how token must be issued. You can
        write the new implementation by implementing the 
        `            AuthorizationGrantHandler           `  interface
        or by extending 
        `            AbstractAuthorizationGrantHandler           ` . In
        most cases, it is enough to extend the 
        `            AbstractAuthorizationGrantHandler           `  in
        the WSO2 OAuth component.
    -   `            GrantTypeValidator           ` - This is used to
        validate the grant request that is sent to the
        `            /token           ` endpoint. You can define what
        parameters must be in the request and define the validation of
        them. You can write the new implementation by extending the 
        `            AbstractValidator           `  in Apache Amber
        component.
2.  When implementation is done, package your class as a .jar file and
    place it in the
    `          <IS_HOME>/repository/component/lib         ` directory.
3.  To register the custom grant type, configure the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file by adding a new entry, in a manner similar to the following
    example;

    ```toml
    [[oauth.custom_grant_type]]
    name="grant type identifier"
    grant_handler="full qualified class name of grant handler"
    grant_validator="full qualified class name of grant validator"
    [oauth.custom_grant_type.properties]
    IdTokenAllowed=true
    ```

    !!! info 
        Setting the `            <IdTokenAllowed>           ` parameter to
        `            true           `, provides flexibility to control the
        issuing of IDtoken for each grant, and also allows the OIDC scope
        validator to validate the grant types that should support the openid
        scope.

4. Restart the server to apply changes.

To test this out, follow the instructions below to implement a custom-grant type sample.

------------------------------------------------------------------------

## Use the grant type sample

The sample demonstrated here defines a new sample grant type called the
"mobile" grant type. It is similar to the password grant type and the
only difference is that a mobile number will be passed through instead
of a password. The request to the `         /token        ` API must
contain the following two request parameters.

-   `          grant_type=mobile         `
-   `          mobileNumber=044322433         `

You can access the new grant type project sample from
[here](https://github.com/wso2/samples-is/tree/master/oauth2/custom-grant)
. The grant handler and validator class is inside the
`         org.wso2.sample.identity.oauth2.grant.mobile        ` package.
This can be modified as required.

### Configure the resource

The following Maven buildable source is compatible with WSO2 Identity
Server 5.1.0 onwards. The attached `          .jar         ` file can be
directly used as well.

| Buildable source   | [custom-grant.zip](/assets/attachments/custom-grant.zip)           |
|--------------------|-------------------------------------------------------------------|
| Built jar file | [custom-grant-1.0.0.jar](/assets/attachments/custom-grant-1.0.0.jar) |

!!! note
    To generate the .jar file from the buildable source, run the following Apache Maven
    command in the sample's location using the command line.

    ``` java
    mvn clean install
    ```
    
2.  Copy the .jar file in target directory into the
    `          <IS_HOME>/repository/component/lib         `
    directory. 
3.  Configure the following in the 
`           <IS_HOME>/repository/conf/deployment.toml          `
    file. 
    ```toml
    [[oauth.custom_grant_type]]
    name="mobile"
    grant_handler="org.wso2.sample.identity.oauth2.grant.mobile.MobileGrant"
    grant_validator="org.wso2.sample.identity.oauth2.grant.mobile.MobileGrantValidator"
    [oauth.custom_grant_type.properties]
    IdTokenAllowed=true
    ```

4.  Restart the server.

###  Configure a service provider with the custom grant type

{! fragments/register-a-service-provider.md !}

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Make sure the custom  grant type (`mobile`) is selected from the **Allowed Grant Types** list.

2. Enter the **Callback Url**.  

    !!! note
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Add**. Note the **OAuth Client Key** and **OAuth Client Secret** that appear. 

    !!! tip
        To configure more advanced configurations, see [OAuth/OpenID Connect Configurations](../../../../guides/login/oauth-app-config-advanced).

### Obtain an access token

Send the grant request to the `          /token         ` API using a cURL command.

!!! note
    The HTTP POST body must contain the following two parameters: `grant_type=mobile` and `mobileNumber`. 

    ``` 
    grant_type=mobile&mobileNumber=<MOBILE_NUMBER>
    ```
    
``` tab="Request Format"
curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=<CUSTOM_GRANT_TYPE>&mobileNumber=<MOBILE_NUMBER>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
```

``` tab="Sample Request"
curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k -d "grant_type=mobile&mobileNumber=0333444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You will receive a response similar to the following JSON response with the access token.

```
{"token_type":"bearer","expires_in":2823,"refresh_token":"26e1ebf16cfa4e67c3bf39d72d5c276","access_token":"d9ef87802a22cf7682c2e77df72c735"}
```

------------------------------------------------------------------------

## Customize an existing grant type

As an alternative to creating a custom OAuth grant type, you can
customize one of the existing grant types. The following two classes are
sample implementations of customizing the password grant type in
particular but any other grant type can be customized as well.

-   [RoleBasedPasswordGrant](https://github.com/wso2/samples-is/blob/master/oauth2/custom-grant/src/main/java/org/wso2/sample/identity/oauth2/grant/password/RoleBasedPasswordGrant.java) -
    This does some RBAC validation apart from the authentication before
    granting access.
-   [ModifiedAccessTokenPasswordGrant](https://github.com/wso2/samples-is/blob/master/oauth2/custom-grant/src/main/java/org/wso2/sample/identity/oauth2/grant/password/ModifiedAccessTokenPasswordGrant.java) -
    This implementation customized the access token value.

### Configure the resource

1.  Copy the .jar file into the
    `          <IS_HOME>/repository/component/lib         `
    directory. You can also modify the project and build it using Apache
    Maven 3.
2.  Configure the following in the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file.

    ```toml
    [oauth.grant_type.password]
    grant_handler="org.wso2.sample.identity.oauth2.grant.password.ModifiedAccessTokenPasswordGrant"
    ```

3.  Restart the server.

###  Configure a service provider with the customized password grant type

{! fragments/register-a-service-provider.md !}

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Make sure the **Password**  grant type is selected from the **Allowed Grant Types** list.

2. Enter the **Callback Url**.  

    !!! note
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Add**. Note the **OAuth Client Key** and **OAuth Client Secret** that appear. 

    !!! tip
        To configure more advanced configurations, see [OAuth/OpenID Connect Configurations](../../../../guides/login/oauth-app-config-advanced).

### Obtain an access token 
        
Send the password grant request to the `           /token          ` API using a cURL command.

``` tab="Request Format"
curl --user <OAUTH_CLIENT_KEY>:<OAUTH_CLIENT_SECRET> -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" -H "Content-Type: application/x-www-form-urlencoded" https://<IS_HOST>:<IS_PORT>/oauth2/token
```

``` tab="Sample Request"
curl --user 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -k -d "grant_type=password&username=admin&password=admin" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You will receive a response similar to the following JSON response with the access token.

```
{"token_type":"bearer","expires_in":2955,"refresh_token":"6865c8d67b42c0c23e634a8fc5aa81f","access_token":"982f40d4-0bb6-41ce-ac5a-1da06a83e475asela@soasecurity.org"}
```

??? note "Sending Custom Error Codes"

    You can send custom
    error codes to the client side in case of defined/identified errors,
    using a custom grant handler.

    This simply uses the mobile grant sample and adds the specific error
    codes/messages to it. 
    
    !!! tip
        See [here](#use-the-grant-type-sample) for instructions on how to implement and use the mobile grant
        sample before adding the custom error codes to it.

    In the downloaded Maven [buildable source](/assets/attachments/custom-grant.zip), add  the following code segment in the sample class
    `             org             .wso2.sample.identity.oauth2.grant.mobile.MobileGrant            `
    inside `             validateGrant()            ` method is the relevant
    code used for this mechanism.

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
        
        The `ResponseHeader` code chunk sets a custom response header in case an
        invalid mobile number is sent.
        
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
        This is erroneous according to the mobile custom grant sample because
        the mobile number does not start with '003'. You can use the -v option
        in the cURL command to see the header of the response which should be as
        seen in the code block below.

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

    Similarly this can be used to transfer any custom information to the
    client, in a flexible manner.
