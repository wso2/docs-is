# Configuring OAuth2-OpenID Connect

[OAuth 2.0](https://oauth.net/2/) is an authorization framework that is
capable of providing a way for clients to access a resource with
restricted access on behalf of the resource owner. OAuth 2.0 is capable
of authorizing the flows for web applications, desktop applications, and
mobile applications among others.

OpenID Connect is an authentication protocol built on top of OAuth 2.0,
which facilitates clients to verify the end-user identity against the
authentication performed by an authorization server. At the same time,
it provides methods to transfer the end user information through claims.

With OAuth as its base, OpenID Connect allows many types of clients such
as web-based clients, mobile clients and javascript clients to verify
the users with an authorization server-based authentication.

1.  Sign in. Enter your username and password to log on to the
    [Management
    Console](https://docs.wso2.com/display/IS540/Getting+Started+with+the+Management+Console)
    .
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Identity Providers** .  
    For more information, see [Adding and Configuring an Identity
    Provider](https://docs.wso2.com/display/IS540/Adding+and+Configuring+an+Identity+Provider)
    .
3.  Fill in the details in the **Basic Information** section.
4.  Expand the **Federated Authenticators** section and then the
    **OAuth2/OpenID Connect Configuration** form.  
    ![](attachments/103330970/103330971.png)
5.  Fill in the following fields where relevant.

    Prior to this, you need to configure an application for Identity
    server in the federated authorization server and get the application
    information such as client ID and secret. For more information, see
    [configuring OAuth2-OpenID Connect single
    sign-on](_Configuring_OAuth2-OpenID_Connect_Single-Sign-On_) .

    !!! tip
    
        Tip
    
        By default, the **Client Id** and **Client Secret** are stored as
        plain text values, where the **Client Secret** is generally stored
        as a random number generated using two UUIDs and HMAC-SHA1 hash
        function, which is known to resist the strongest attack known
        against HMAC.
    
        If you want to change the format in which the **Client Secret** is
        stored, you need to change the
        `           <TokenPersistenceProcessor>          ` property in the
        `           <IS_HOME>/repository/conf/identity/identity.xml          `
        file, depending on how you want to store tokens. For information on
        possible values that you can specify as
        `           <TokenPersistenceProcessor>          ` based on your
        requirement, see [Supported token persistence
        processors](Extension-Points-for-OAuth_103329664.html#ExtensionPointsforOAuth-TokenPersistenceProcessor)
        .
    
        Once you configure a required token persistence processor, be sure
        to restart the server for the changes to be applied to WSO2 Identity
        Server.
    

    | Field                           | Description                                                                                                                                                                                                                          | Sample value                               |
    |---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
    | Enable OAuth2/OpenIDConnect     | Selecting this option enables OAuth2/OpenID Connect to be used as an authenticator for users provisioned to the Identity Server.                                                                                                     | Selected                                   |
    | Default                         | Selecting the **Default** check box signifies that the OAuth2/OpenID Connect credentials are the main/default form of authentication. This removes the selection made for any other **Default** checkboxes for other authenticators. | Selected                                   |
    | Authorization Endpoint URL      | This is a standard OAuth Authorization Endpoint URL of the federated IDP.                                                                                                                                                            | <https://localhost:9443/oauth2/authorize/> |
    | Token Endpoint URL              | This is a standard OAuth Token Endpoint URL of the federated IDP.                                                                                                                                                                    | <https://localhost:9443/oauth2/token/>     |
    | Client Id                       | Client ID of the application you registered in the IDP for Identity server.                                                                                                                                                          | 1421263438188909                           |
    | Client Secret                   | Client Secret of the application you registered in the IDP for Identity server. Click the **Show** button to view the value you enter.                                                                                               | 12ffb4dfb2fed67a00846b42126991f8           |
    | Callback URL                    | This is the URL to which the browser should be redirected after the authentication is successful. It should be the commonauth endpoint of Identity server                                                                            | <https://localhost:9443/commonauth>        |
    | OpenID Connect User ID Location | Select whether the User ID is found in the 'sub' attribute that is sent with the OpenID Connect request or if it is found among claims.                                                                                              | User ID found in 'sub' attribute           |
    | Additional Query Parameters     | This is necessary if you are connecting to another Identity Server or application. Sometimes extra parameters are required by this IS or application so these can be specified here.                                                 | paramName1=value1                          |

**Related Topics**

-   Identity Federation is part of the process of configuring an
    identity provider. For more information on how to configure an
    identity provider, see [Configuring an Identity
    Provider.](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
-   See [Log into Identity Server using another Identity Server -
    OAuth2](_Login_to_Identity_Server_using_another_Identity_Server_-_OAuth2_)
    for a sample of using OAuth2/OpenIDConnect for federated
    authentication.
