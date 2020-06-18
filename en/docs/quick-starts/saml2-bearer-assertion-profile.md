# Set Up SAML2 Bearer Assertion Profile

This page guides you through exchanging a SAML2 assertion for a valid OAuth access token in order to access a resource in a sample application.

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/access-delegation/saml2-bearer-assertion-profile"   rel="nofollow noopener">I have my own application</a>

----

{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

!!! tip
    -   Make sure the **SAML2** grant is enabled under **Allowed Grant Types** when configuring OAuth/OpenID Connect.

    -   You can provide any valid URL as the **Callback URL**. This URL value is not used for any other operations during this sample.

----

## Set up the sample application

{!fragments/travelocity.md!}

----

## Configure SSO for the sample app

1. Click **List** under **Service Providers**.

2. Click **Edit** to modify the service provider you created for the Travelocity sample. 

3. Modify the **SAML2 Web SSO Configuration** and enable the following fields.
    - **Enable Audience Restriction**
    - **Enable Recipient Validation**

4. Enter the following values. 
    - **Audience**: `https://localhost:9443/oauth2/token`
    - **Recipient**: `https://localhost:9443/oauth2/token`

    ![enable-audience-restriction](../assets/img/samples/enable-audience-restriction.png) 

5. Click **Update** to save changes. 

-----

    
## Enable SAML2 grant

1. Open the `travelocity.properties` file found in the `<TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes` folder.

2. Edit the following configurations.

    Enter the client ID and client secret you recieved when registering the OAuth/OpenID Connect application.

    ``` java
    EnableOAuth2SAML2Grant=true
    OAuth2.ClientId= (enter the client ID received at the application registration)
    OAuth2.ClientSecret= (enter the client secret received at the application registration)
    ```

    
2. Restart the Tomcat server to apply the changes. 

-----

## Try it out

1. Start the Tomcat server and access the following URL on your browser: <http://wso2is.local:8080/travelocity.com>

	```
	http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com
	```

2. Click **Click here to login with SAML from Identity Server (Post binding or Redirect Binding)**. 

    You are redirected to WSO2 Identity Server for authentication. 

3.  Enter the username and password and click **SIGN IN**.  

    ![travelocity-sign-in](../assets/img/samples/travelocity-sign-in.png) 

4.  Click **Request OAuth2 Access Token** to receive the access token.  

    ![request-oauth2-access-token](../assets/img/samples/request-oauth2-access-token.png)  

    You will receive an access token as shown below.

    ![oauth2-token-details](../assets/img/samples/oauth2-token-details.png) 

6.  Use the introspection endpoint of WSO2 Identity Server to get the token information.

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

6.  Since the Travelocity application has now exchanged the SAML assertion for a valid OAuth access token, you can use the received access token to access a protected resource in WSO2 Identity Server. 

    Use the [SCIM User Endpoint](insertlink) which is secured with OAuth to retrieve users. 

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
