# Setting up a SAML2 Bearer Assertion Profile for OAuth 2.0

As an OAuth 2.0 Authorization Server, WSO2 Identity Server can accept
SAML2 Assertions from OAuth 2.0 clients as a means of resource owner
authentication and authorization. Additionally, it can exchange it with
OAuth 2.0 access tokens in order to access protected resources on behalf
of the resource owner.

In this sample use case, you will see how a user will be authenticated
for Travelocity sample application over [SAML 2.0](_SAML_2.0_Web_SSO_)
via WSO2 Identity Server. You will also see how Travelocity application
exchanges the SAML assertion received, with the WSO2 Identity Server to
receive an OAuth access token using [SAML2 Bearer Assertion
Profile](../../using-wso2-identity-server/saml2-bearer-assertion-profile-for-oauth-2.0). Finally, you
will see how an OAuth protected resource can be accessed using the
access token received.

  
Below diagram illustrates the request/response flow with respect to this
sample use case where WSO2 Identity Server acts as the Authorization
Server and as well as the Resource Server.

![](../../assets/img//103329974/103329975.png) 

### Configure OAuth/OpenID and SAML SSO

1.  See the [Configuring Inbound Authentication for a Service
    Provider](https://docs.wso2.com/display/IS530/Configuring+Inbound+Authentication+for+a+Service+Provider)
    to configure the OAuth/OpenID Connect service provider. Access token
    will be issued for this application, exchanging with SAML2
    assertion .

    !!! note
    
        -   Make sure **SAML2** grant type is enabled under " Allowed Grant
            Types " in configured OAuth/OpenID Connect application.
        -   You can provide any valid URL as the **Callback URL** while
            configuring the OAuth2 application. This URL value is not used
            for any other operations during this sample.
    

2.  Configure single sign-on with the Travelocity sample.

    See [Configuring Single Sign-On](_Configuring_Single_Sign-On_) to
    configure Travelocity application with WSO2 Identity Server.

3.  Navigate to **Main\>Service Providers\>List** and click **Edit** to
    modify the service provider you just created. Modify the following
    fields of the SAML configuration and click **Update**.

    Select the **Enable Audience Restriction** and **Enable Recipient
    Validation** fields and enter the following values:

    **Audience** :
    `                           https://localhost:9443/oauth2/token                         `

    **Recipient** :
    `                           https://localhost:9443/oauth2/token                         `

    If you have configured the service provider in a tenant, you have to
    add the tenant domain as a query parameter to the access token
    endpoint. If the tenant domain is
    `             wso2.com            `, enter the following values:

    **Audience** :
    `                                          https://localhost:9443/oauth2/token?tenantDomain=wso2.com                                       `

    **Recipient** :
    `                           https://localhost:9443/oauth2/token?tenantDomain=wso2.com                         `

    ![](../../assets/img//103329974/103329976.png) 

4.  Open the `           travelocity.properties          ` file found in
    the
    `           <TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes          `
    folder and edit the following configurations and restart the tomcat
    server.

    ``` java
    EnableOAuth2SAML2Grant=true
    OAuth2.ClientId=(enter the client id received at the application registration)
    OAuth2.ClientSecret= (enter the client secret received at the application registration)
    ```

    Optionally, you can provide the type of the user identified from the
    subject identifier of the SAMl2 assertion. By default, the user type
    is set to `            FEDERATED           ` .

    Add the following configuration to the
    `            <CARBON_HOME>/repository/conf/identity/identity.xml           `
    under the `            <SAML2Grant>           ` configuration to
    enable this feature.

    If your users are local, you can enable user type as,

    ``` java
        <UserType>LOCAL</UserType>
    ```

    If your users are federated, you can enable user type as,

    ``` java
        <UserType>FEDERATED<UserType>
    ```

    If you need backward compatibility, enable user type as,

    ``` java
        <UserType>LEGACY</UserType>
    ```

    Also, you can set the user type per request as,

    ``` java
        <UserType>PER_REQUEST</UserType>
    ```

    Restart the server to apply the configuration changes.

### Running the sample

1.  Access the following URL:
    `                     http://wso2is.local:8080/travelocity.com                   `
    .  
    You are directed to the following page.  
    ![](../../assets/img//103329974/103329981.png) 
2.  Click **Click here to login with SAML from Identity Server (Post
    binding or Redirect Binding)**. You are redirected to the Identity
    Server for authentication.
3.  Enter the username and password and click **SIGN IN**.  
    ![](../../assets/img//103329974/103329980.png) 
4.  Click **Request OAuth2 Access Token** to receive the access token.  
    ![](../../assets/img//103329974/103329979.png)   
    You receive an access token as shown below:  
    ![](../../assets/img//103329974/103329978.png) 
5.  Now, you can use the introspection endpoint of the Identity Server
    to get the token information.

    **Request**

    ``` java
        curl -k -u <username>:<password> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
    
        Example:
        curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=f3116b04-924f-3f1a-b323-4f0988b94f9f' https://localhost:9443/oauth2/introspect
    ```

    **Response**

    ``` java
        {"active":true,"token_type":"Bearer","exp":1508927700,"iat":1508924100,"client_id":"EiqKsYfVH6dffF0b6LmrFBJW95Aa","username":"admin@carbon.super"}
    ```

6.  Now since the Travelocity application has exchanged the SAML
    assertion for a valid access token, you can use the received access
    token to access a protected resource in WSO2 Identity Server. Here,
    to retrieve users, you can use the [SCIM User
    Endpoint](_SCIM_1.1_APIs_) which is secured with OAuth.

    **Response**

    ``` java
        {"totalResults":1,"schemas":["urn:scim:schemas:core:1.0"],"Resources":[{"meta":{"created":"2017-11-15T11:23:25","location":"https://localhost:9443/wso2/scim/Users/admin","lastModified":"2017-11-15T11:23:25"},"id":"0fb2af3f-03f2-4d6b-8340-957012df23f4","userName":"admin"}]}
    ```

    **Request**

    ``` java
        curl -v -k --header "Authorization: Bearer <access token>" https://<IS_HOST>:<IS_PORT>/wso2/scim/Users
    
        Example:
        curl -v -k --header "Authorization: Bearer 865c60a5-969b-36b4-95e2-721a1fb5c867" https://localhost:9443/wso2/scim/Users
    ```
