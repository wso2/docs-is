# Basic Client Profile with Playground

This section demonstrates the WSO2 Identity Server's OpenID Connect
Basic Client Profile implementation with the WSO2 OAuth2 playground
sample.

### Setting up the playground sample

First follow the instructions in the [Deploying the Sample App](../../develop/deploying-the-sample-app/#deploying-playground2-webapp)  to set up
the playground sample and register it in WSO2 IS. Once you have done so,
complete the user profile by adding user attributes and try out the
scenario.

1.  Make sure to update `              param-value             `
    parameter in the `              web.xml             ` file
    in `<TOMCAT_HOME>/apache-tomcat-<version>/webapps/playground2/WEB-INF` with the server URL of the Identity Server
    if required.  Make sure to enter the port the application is running on, in the
    URL. If you have started the Identity Server with a port off set,
    then the respective port needs to be configured here.

    ``` java
    <init-param>
        <description>serverUrl</description>
        <param-name>serverUrl</param-name>
        <param-value>https://localhost:9443/services/</param-value>
    </init-param>
    ```

    !!! info 
        Note that localhost is the server that hosts WSO2 Identity Server
        and 9443 is the default SSL port of it. In order to access the admin
        services you should have the values in step 1 and 2. Since
        playground application is accessing the admin service
        OAuth2TokenValidationService, you should have the correct
        serverUrl,username and password as described in step 1 and 2.

2.  Update **`               param-value              `** parameter with
    credentials of an admin user if required.

    ``` java
        <init-param>
            <description>userName</description>
            <param-name>userName</param-name>
            <param-value>admin</param-value>
        </init-param>
        <init-param>
            <description>password</description>
            <param-name>password</param-name>
            <param-value>admin</param-value>
        </init-param>
    ```

3.  Restart Apache Tomcat and access
    `              http://wso2is.local:8080/playground2/             `  
    By default Tomcat runs on port 8080. If you have configured it to
    run on a different port make sure to update the URL and access the
    playground application.  
    You are directed to the landing page of the sample application.
    Click on **Import Photos** and the following page appears.  
    ![click-on-import-photos](../assets/img/using-wso2-identity-server/click-on-import-photos.png) 

!!! note "Are you getting the error that is given below?"        
    
    ``` java
        javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
    ```
    
    The sample applications do not have a keystore in them. Therefore, after
    changing the tomcat hostname you might get this error because the public
    key of the WSO2 Identity Server does not exist in the Java certificate
    store. 
    

This application is used to request access tokens using the four OAuth2
grant types:

-   [Authorization Code
    Grant](../../learn/try-authorization-code-grant)
-   [Client Credentials
    Grant](../../learn/try-client-credentials-grant)
-   [Implicit
    Grant](../../learn/try-implicit-grant)
-   [Try Password/Resource Owner
    Grant](../../learn/try-password-grant)


[OAuth 2.0](https://oauth.net/2/) has three main phases. They are;
requesting an Authorization Grant, exchanging the Authorization Grant
for an Access Token and accessing the resources using this Access Token.
[OpenID Connect](http://openid.net/connect/) is another identity layer
on top of OAuth 2.0. OAuth applications can get authentication event
information over the IDToken and can get the extra claims of the
authenticated user from the OpenID Connect UserInfo endpoint.  

!!! tip
    For more information on OAuth2-OpenID Connect
    refer, [Configuring OAuth2-OpenID Connect Single-Sign-On](../../learn/configuring-oauth2-openid-connect-single-sign-on)

    After updating the configuration, make sure to restart the server
    for the changes to be applied on WSO2 IS.


??? note "Complete the user profile"
    1.  [Create a user](../../learn/configuring-users).
    2.  Log in as the user you created and go to the
        [dashboard](../../learn/using-the-end-user-dashboard).
    3.  [Update your
        profile](../../learn/configuring-users#update-users)
        filling the user attributes.
        
        !!! info 
            You can also do this at **Main** \> **List** \> **Users and
            Roles** \> **Users**, then select the user and update the profile.

    4.  Click **Update** to save your changes.

------------------------------------------------------------------------

### Try out scenario

1.  Visit the URL
    `                       http://wso2is.local:8080/playground2/oauth2.jsp                     `
    to start the scenario with the sample application.
2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Authorization Code
    -   **Client ID:** (the client id received at the application
        registration step in Identity Server)
    -   **Scope:** openid (This scope is a requirement to provide user
        information. Any token without this scope will not be allowed to
        access user information.)
    -   **Callback URL:**
        http://wso2is.local:8080/playground2/oauth2client
    -   **Authorize Endpoint:** https://localhost:9443/oauth2/authorize

    !!! note
    
        To try out this scenario with different consent values,
        see step 7.
    

    ![different-consent-values](../assets/img/using-wso2-identity-server/different-consent-values.png) 

      

3.  Provide user credentials and sign in with the previously created
    user.  
    ![sign-in-with-pkce](../assets/img/using-wso2-identity-server/sign-in-with-pkce.png)   
    
4.  Click **Approve** to provide consent to this action. The screen
    mentions the service provider by name and requests for user consent
    to provide user information to that particular service provider. The
    user can either

    1.  **Deny** to provide information to the service provider.
    2.  **Approve** to provide user profile information to this service
        provider only for this time.
    3.  **Approve Always** to provide approval to share user profile
        information with the service provider even in the future without
        prompting for consent again.

    ![approve-consent](../assets/img/using-wso2-identity-server/approve-consent.png) 

    !!! tip
        After approval is provided, the application receives an
        authorization code issued from WSO2 Identity Server. This
        authorization code can only be used once to get a valid access token
        and has a expiry time that can be configured by adding the
        following property in the
        `            <IS_HOME>/repository/conf/deployment.toml           `
        file. The default expiry time is 300 seconds.
    
        ``` xml
        [oauth.token_validation]
        authorization_code_validity= "300"
        ```


5.  Enter the following details in the form that appears and click **Get
    Access Token**.

    -   **Callback URL:**
        http://wso2is.local:8080/playground2/oauth2client
    -   **Access Token Endpoint:** https://localhost:9443/oauth2/token
    -   **Client Secret:** (client secret received at the application
        registration)

    ![access-token-details](../assets/img/using-wso2-identity-server/access-token-details.png) 

6.  At this point, the application receives the **Access Token** with
    the id token, which follows the format shown in step 7. Enter the
    UserInfo endpoint of the WSO2 Identity Server, (i.e.,
    `                         https://localhost:9443/oauth2/userinfo?schema=openid                       `
    ), in the form as seen below, to get user information.

    ![logged-in-user-info](../assets/img/using-wso2-identity-server/logged-in-user-info.png) 

    Since the received access token has the scope
    `            openid           `, the
    `            userinfo           ` endpoint provides the user
    attribute details when the request is made. You receive the
    following response from the Identity Server.

    **Response**

    ``` groovy
    {  
       "scope":"openid",
       "token_type":"Bearer",
       "expires_in":3600,
       "refresh_token":"74d0d7e6d4b3c19484f5135593c2dc88",            
       "id_token":"eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0NTIxNzAxNzYsImV4cCI6MTQ1MjE3Mzc3Niwic3ViIjoidXNlQGNhcmJvbi5zdXBlciIsImF6cCI6IjF5TDFfZnpuekdZdXRYNWdCMDNMNnRYR3lqZ2EiLCJhdF9oYXNoIjoiWWljbDFlNTI5WlhZOE9zVDlvM3ktdyIsImF1ZCI6WyIxeUwxX2Z6bnpHWXV0WDVnQjAzTDZ0WEd5amdhIl0sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImlhdCI6MTQ1MjE3MDE3Nn0.RqAgm0ybe7tQYvQYi7uqEtzWf6wgDv5sJq2UIQRC4OJGjn_fTqftIWerZc7rIMRYXi7jzuHxX_GabUhuj7m1iRzi1wgxbI9yQn825lDVF4Lt9DMUTBfKLk81KIy6uB_ECtyxumoX3372yRgC7R56_L_hAElflgBsclEUwEH9psE",
       "access_token":"f1824ef345f0565ab88a06a51db98d24"
    }
    ```

    The returned ID token carries the user details. It follows the
    following format:
    `            <header>.<body>.<signature>           ` . The decoded
    ID token can be seen below.

    **Decoded ID Token**

    ``` groovy
        {"alg":"RS256"}.
        {  
           "auth_time":1452170176,
           "exp":1452173776,
           "sub":"use@carbon.super",
           "azp":"1yL1_fznzGYutX5gB03L6tXGyjga",
           "at_hash":"Yicl1e529ZXY8OsT9o3y-w",
           "aud":[  
              "1yL1_fznzGYutX5gB03L6tXGyjga"
           ],
           "iss":"https:\/\/localhost:9443\/oauth2\/token",
           "iat":1452170176
        }.<signature value>
         
    ```

    !!! tip
        Alternatively, you can get user information by running the
        following cURL command on the terminal.
    
        -   **cURL Command**

        ``` powershell
            curl -k -H "Authorization: Bearer <Acess_token>" https://localhost:9443/oauth2/userinfo?schema=openid
        ```
        
        -   **Response**
        
        ``` groovy
            {  
            "sub":"admin",
            "email":"admin@wso2.com",
            "website":"https://wso2.com",
            "name":"admin",
            "family_name":"admin",
            "preferred_username":"admin",
            "given_name":"admin",
            "profile":"https://wso2.com",
            "country":"Sri Lanka"
            }
        ``` 

7.  You can also try out this scenario with different consent values
    {none, login and consent}. To do this, try the following URLs when
    entering the Authorization Endpoint URL in step 2 of the **Try out
    scenario** section.

    <table>
    <thead>
    <tr class="header">
    <th>Authorization Endpoint URL</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt=none                                                </code></td>
    <td>The Identity Server does not display any authentication or consent user interface pages. An error is returned if an end user is not already authenticated or the client does not have pre-configured consent for the requested claims or if there are any other unfulfilled conditions for processing the request.</td>
    </tr>
    <tr class="even">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt=login                                                </code></td>
    <td>Even if the end user is already authenticated, it will prompt the end user for re-authentication.</td>
    </tr>
    <tr class="odd">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt=consent                                                </code></td>
    <td>Even if the consent is already given, it will prompt the end user for consent again before returning information to the client.</td>
    </tr>
    <tr class="even">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt                                                 =consent login               </code></td>
    <td><div class="content-wrapper">
    <p>The user will be prompted to login as well as for consent when returning information to the client.</p>
    <div>
    <div class="admonition info">
    <p class="admonition-title">Info</p>
    <p>you can send multiple prompt parameters (e.g., prompt=consent login) in a format similar to this URL.</p>
    </div></div>
    </div></td>
    </tr>
    </tbody>
    </table>

    !!! note
        To skip user consent, you can also edit the following
        property in the
        `            <IS_HOME>/repository/conf/deployment.toml           `
        file. To skip user
        consent, set this property to false.
    
        ``` xml
        [oauth]
        consent_prompt= true
        ```
        !!! info 
            Note that even if this property is set to true so that it will skip
            user consent, if you use an Authorization Endpoint URL that prompts
            user consent (e.g.,
            `                           https://localhost:9443/oauth2/authorize?prompt=consent                         `
            ), it will still prompt consent from the user.
        
