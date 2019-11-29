# Setting up a SAML2 Bearer Assertion Profile for OAuth 2.0

As an OAuth 2.0 Authorization Server, WSO2 Identity Server can accept
SAML2 Assertions from OAuth 2.0 clients as a means of resource owner
authentication and authorization. Additionally, it can exchange it with
OAuth 2.0 access tokens in order to access protected resources on behalf
of the resource owner.

In this sample use case, you will see how a user will be authenticated
for Travelocity sample application over [SAML 2.0](../../learn/saml-2.0-web-sso)
via WSO2 Identity Server. You will also see how Travelocity application
exchanges the SAML assertion received, with the WSO2 Identity Server to
receive an OAuth access token using [SAML2 Bearer Assertion
Profile](../../learn/saml2-bearer-assertion-profile-for-oauth-2.0). Finally, you
will see how an OAuth protected resource can be accessed using the
access token received.

  
Below diagram illustrates the request/response flow with respect to this
sample use case where WSO2 Identity Server acts as the Authorization
Server and as well as the Resource Server.

![request-response-flow](../assets/img/using-wso2-identity-server/request-response-flow.png) 

### Configure OAuth/OpenID and SAML SSO

1.  See the [Configuring Inbound Authentication for a Service
        Provider](../../learn/configuring-oauth2-openid-connect-single-sign-on)
    to configure the OAuth/OpenID Connect service provider. Access token
    will be issued for this application, exchanging with SAML2
    assertion.

    !!! note
        -   Make sure **SAML2** grant type is enabled under " Allowed Grant
            Types " in configured OAuth/OpenID Connect application.
        -   You can provide any valid URL as the **Callback URL** while
            configuring the OAuth2 application. This URL value is not used
            for any other operations during this sample.
    

2.  Configure single sign-on with the Travelocity sample.

    See [Deploying the Sample App](../../learn/deploying-the-sample-app) to
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

    ![enable-audience-restriction](../assets/img/using-wso2-identity-server/enable-audience-restriction.png) 

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

    !!! info 
        Optionally, you can provide the type of the user identified from the
        subject identifier of the SAMl2 assertion. By default, the user type
        is set to `            FEDERATED           ` .

        Add the following configuration to the
        `            <IS_HOME>/repository/conf/deployment.toml           ` file to
        enable this feature.

        If your users are local, you can enable user type as,

        ``` java
        [oauth.grant_type.saml_bearer]
        user_type= "LOCAL"
        ```

        If your users are federated, you can enable user type as,

        ``` java
        [oauth.grant_type.saml_bearer]
        user_type= "FEDERATED"
        ```

        If you need backward compatibility, enable user type as,

        ``` java
        [oauth.grant_type.saml_bearer]
        user_type= "LEGACY"
        ```

        Also, you can set the user type per request as,

        ``` java
        [oauth.grant_type.saml_bearer]
        user_type= "PER_REQUEST"  
        ```

        Restart the server to apply the configuration changes.

### Running the sample

1.  Access the following URL:
    `                     http://wso2is.local:8080/travelocity.com                   `
    .  
    You are directed to the following page.  
    ![running-travelocity](../assets/img/using-wso2-identity-server/running-travelocity.png) 
2.  Click **Click here to login with SAML from Identity Server (Post
    binding or Redirect Binding)**. You are redirected to the Identity
    Server for authentication.
3.  Enter the username and password and click **SIGN IN**.  
    ![travelocity-sign-in](../assets/img/using-wso2-identity-server/travelocity-sign-in.png) 
4.  Click **Request OAuth2 Access Token** to receive the access token.  
    ![request-oauth2-access-token](../assets/img/using-wso2-identity-server/request-oauth2-access-token.png)   
5.  You'll receive an access token as shown below:  
    ![oauth2-token-details](../assets/img/using-wso2-identity-server/oauth2-token-details.png) 
6.  Now, you can use the introspection endpoint of the Identity Server
    to get the token information.

    **Request**

    ``` java tab="Request Format"
    curl -k -u <username>:<password> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
    ```

    ``` java tab="Sample Request"
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
    Endpoint](../../develop/scim-1.1-apis) which is secured with OAuth.

    **Request**

    ``` java tab="Request Format"
    curl -v -k --header "Authorization: Bearer <access token>" https://<IS_HOST>:<IS_PORT>/wso2/scim/Users
    ```

    ``` java tab="Sample Request"
    curl -v -k --header "Authorization: Bearer 865c60a5-969b-36b4-95e2-721a1fb5c867" https://localhost:9443/wso2/scim/Users
    ```
    
    **Response**

    ``` java
    {"totalResults":1,"schemas":["urn:scim:schemas:core:1.0"],"Resources":[{"meta":{"created":"2017-11-15T11:23:25","location":"https://localhost:9443/wso2/scim/Users/admin","lastModified":"2017-11-15T11:23:25"},"id":"0fb2af3f-03f2-4d6b-8340-957012df23f4","userName":"admin"}]}
    ```
