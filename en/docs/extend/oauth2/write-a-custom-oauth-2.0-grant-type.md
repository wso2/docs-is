# Write a Custom OAuth 2.0 Grant Type

------------------------------------------------------------------------

OAuth 2.0 authorization servers provide support for four main grant
types according to the [OAuth 2.0
specification](http://tools.ietf.org/html/draft-ietf-oauth-v2-22). It
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
        write the new implementation by implementing the “
        `            AuthorizationGrantHandler           ` ” interface
        or by extending “
        `            AbstractAuthorizationGrantHandler           ` ”. In
        most cases, it is enough to extend the “
        `            AbstractAuthorizationGrantHandler           ` ” in
        the WSO2 OAuth component.
    -   `            GrantTypeValidator           ` - This is used to
        validate the grant request that is sent to the
        `            /token           ` endpoint. You can define what
        parameters must be in the request and define the validation of
        them. You can write the new implementation by extending the “
        `            AbstractValidator           ` ” in Apache Amber
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

    To test this out, follow the instructions below to implement a
    custom-grant type sample.

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

### Resources

The following Maven buildable source is compatible with WSO2 Identity
Server 5.1.0 onwards. The attached `          .jar         ` file can be
directly used as well.

| Buildable Source   | [custom-grant.zip](../../assets/attachments/custom-grant.zip)           |
|--------------------|-------------------------------------------------------------------|
| **Built Jar File** | [custom-grant-1.0.0.jar](../../assets/attachments/custom-grant-1.0.0.jar) |

1.  To generate the .jar file, run the following Apache Maven
    command in the sample's location using the command line.

    ``` java
    mvn clean install
    ```

2.  Copy the .jar file in target directory into the
    `          <IS_HOME>/repository/component/lib         `
    directory. You can also modify the project and build it using Apache
    Maven 3.
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

5.  Configure the new OAuth grant type.  
    1.  Sign in to the WSO2 Identity Server. Enter your username and
        password to log on to the [Management
        Console](../../../deploy/get-started/run-the-product/)
        .
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Service Providers**.
    3.  Fill in the **Service Provider Name** and provide a brief
        **Description** of the service provider. 
    4.  Expand the **OAuth/OpenID Connect Configuration** and click
        **Configure**.
    5.  Enter a callback URL. For example,
        http://localhost:8080/playground2/oauth2client .
    6.  Click **Add**.   
    7.  The **OAuth Client Key** and **OAuth Client Secret** will now be
        visible.

6.  Send the grant request to the `          /token         ` API using
    a cURL command.
    1.  The HTTP POST body must contain the following two parameters:
        `             grant_type=mobile            ` and
        `             mobileNumber            ` .

        ``` java
        grant_type=mobile&mobileNumber=0333444
        ```

    2.  Replace `             clientid:clientsecret            ` with
        the OAuth Client Key and OAuth Client Secret respectively and
        run the following sample cURL command in a new terminal window.

        ``` java
        curl --user clientid:clientsecret -k -d "grant_type=mobile&mobileNumber=0333444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
        ```

    3.  You will receive the following JSON response with the access
        token.

        ``` java
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

This section provides instructions on how to

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

4.  Configure the OAuth grant type you customized.  
    1.  Sign in to the WSO2 Identity Server. Enter your username and
        password to log on to the [Management
        Console](../../../deploy/get-started/run-the-product/)
        .
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Service Providers**.
    3.  Fill in the **Service Provider Name** and provide a brief
        **Description** of the service provider. 
    4.  Expand the **OAuth/OpenID Connect Configuration** and click
        **Configure**.
    5.  Enter a callback URL. For example,
        http://localhost:8080/playground2/oauth2client.
    6.  Click **Add**.
    7.  The **OAuth Client Key** and **OAuth Client Secret** will now be
        visible.
5.  Send the password grant request to the `           /token          `
    API using a cURL command.

    1.  Replace `             clientid:clientsecret            ` with
        the OAuth Client Key and OAuth Client Secret respectively and
        run the following sample cURL command in a new terminal window.

        ``` java
        curl --user clientid:clientsecret -k -d "grant_type=password&username=admin&password=admin" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
        ```

    2.  You will see the following json response and the modified access
        token with an email address.

        ``` java
        {"token_type":"bearer","expires_in":2955,"refresh_token":"6865c8d67b42c0c23e634a8fc5aa81f","access_token":"982f40d4-0bb6-41ce-ac5a-1da06a83e475asela@soasecurity.org"}
        ```

??? note "Sending Custom Error Codes"

    This page guides you through a mechanism you can use to send custom
    error codes to the client side in case of defined/identified errors,
    using a custom grant handler.

    This simply uses the mobile grant sample and adds the specific error
    codes/messages to it. See the above
    topic for instructions on how to implement and use the mobile grant
    sample before adding the custom error codes to it.

    ### Resources

    The following Maven buildable source is compatible with WSO2 Identity
    Server 5.1.0 onwards. The attached `             .jar            ` file
    can be directly used as well.

    | Buildable Source   | [custom-grant.zip](../../assets/attachments/custom-grant.zip)           |
    |--------------------|-------------------------------------------------------------------|
    |Built Jar File|[custom-grant-1.0.0.jar](../../assets/attachments/custom-grant-1.0.0.jar) |

    ### Sample Code

    The following code segment in the sample class
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
        
        The code within lines 71-75 sets a custom response header in case an
        invalid mobile number is sent.
        

    ### Try out Scenario

    **Happy Path**

    ``` powershell
    curl --user <Client_id>:<Client_secret> -k -d "grant_type=mobile&mobileNumber=0333444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
    ```

    **Erroneous** **Path**

    ``` powershell
    curl -v --user vSfeQ9jfNodY1tv9KLNNxLOw7kwa:CEUWu7fDNy_RYg5lO_mp8PLf7nQa -k -d "grant_type=mobile&mobileNumber=0363444" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
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
        Line 12 shows the custom header appearing in the headers.

    Similarly this can be used to transfer any custom information to the
    client, in a flexible manner.
