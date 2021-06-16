# Set Up SAML2 Bearer Assertion Profile

This page guides you through exchanging a SAML2 assertion for a valid OAuth access token in order to access a resource in a sample application.

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/access-delegation/saml2-bearer-assertion-profile"   rel="nofollow noopener">I have my own application</a>

----

## Create a service provider

{!fragments/register-a-service-provider.md!}

----

## Basic OAuth/OpenID Connect configuration

{!fragments/oauth-app-config-basic.md!}

!!! Note
    -   Make sure the **SAML2** grant is enabled under **Allowed Grant Types** when configuring OAuth/OpenID Connect.
    -   You can provide any valid URL as the **Callback Url**. This URL value is not used for any other operations during this sample.

----

## SAML2 Web SSO configuration

1. In the **Inbound Authentication Configuration** section of the previously created service provider, click **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configurations as follows:

        1.  **Issuer**: `travelocity.com`

        2.  **Assertion Consumer URL**: `http://wso2is.local:8080/travelocity.com/home.jsp`  
            Click Yes, in the message that appears.

    2.  Select the following check-boxes:
    
        1.  **Enable Response Signing**

        2.  **Enable Single Logout**

        3.  **Enable Attribute Profile**

        4.  **Include Attributes in the Response Always**  
        
        5.  **Enable Signature Validation in Authentication Requests and Logout Requests**
        
    3. Select the the following check-boxes and enter the following values:
           1. **Enable Audience Restriction**
            - **Audience**: `https://localhost:9443/oauth2/token`
           2. **Enable Recipient Validation**
            - **Recipient**: `https://localhost:9443/oauth2/token`

           ![enable-audience-restriction](../assets/img/samples/enable-audience-restriction.png) 
    
    !!! tip
        For more information on other advanced configurations refer, [Advanced SAML Configurations](../../guides/login/saml-app-config-advanced/)

5.  Click **Register** to save the changes.  

---

## Set up the sample application

{!fragments/deploying-sample-apps.md!}

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. Download the `travelocity.com.war` file from the latest release assets.


### Deploy the sample web app

Deploy this sample web app on a web container.

1.  Copy the `travelocity.com.war`file into the `webapps` folder. For
    example, ` <TOMCAT_HOME>/apache-tomcat-<version>/webapps`
    
2.  Open a terminal window and add the following entry to the
    `/etc/hosts` file of your machine to configure
    the hostname.

    ``` bash
    127.0.0.1   wso2is.local
    ```

    !!!info "Why is this step needed?"
		Some browsers do not allow you to create cookies for a naked
		hostname, such as `localhost`. Cookies are
		required when working with SSO . Therefore, to ensure that the SSO
		capabilities work as expected in this tutorial, you need to
		configure the `etc/host` file as explained in
		this step.

		The `etc/host` file is a read-only file.
		Therefore, you won't be able to edit it by opening the file via a
		text editor. Instead, edit the file using the terminal commands.  
		For example, use the following command if you are working on a
		Mac/Linux environment.

		``` java
		sudo nano /etc/hosts
		```
		
3.  Open the `travelocity.properties` file found in the `
    <TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes ` directory
    and configure the following property with the hostname ( `
    wso2is.local ` ) that you configured above.

    ``` text
    #The URL of the SAML 2.0 Assertion Consumer
    SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```
    
4.  Restart the Tomcat server.

To check the sample application, navigate to
`http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp`
on your browser.

For example,
`http://wso2is.local:8080/travelocity.com/index.jsp`

!!! tip
    
    If you wish to change properties like the issuer ID, consumer
    URL, and IdP URL, you can edit the **travelocity.properties** file found
    in the `         travelocity.com/WEB-INF/classes        ` directory.
    Also if the service provider is configured in a tenant you can use
    "QueryParams" property to send the tenant domain.For example,
    "QueryParams=tenantDomain=wso2.com".
    
    This sample uses the following default values.
    
    | Properties                                                                                                                                                                          | Description                                                        |
    |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
    | `             SAML2.SPEntityId=travelocity.com                         `                                                                                                            | A unique identifier for this SAML 2.0 Service Provider application |
    | `              SAML2.AssertionConsumerURL=                                             http://wso2is.local:8080/travelocity.com/home.jsp                                          ` | The URL of the SAML 2.0 Assertion Consumer                         |
    | `              SAML2.IdPURL=                                             https://localhost:9443/samlsso                                          `                                  | The URL of the SAML 2.0 Identity Provider                          |
    | `             SAML2.IsPassiveAuthn=true                         `                                                                                                                   | Set this to send SAML2 passive authentication requests             |
    
    If you edit the `travelocity.properties` file, restart the
    Apache Tomcat server for the changes to take effect.

----

### CORS configuration

{!fragments/cors-config.md!}

-----

    
## Enable SAML2 grant in the sample application

1. Open the `travelocity.properties` file found in the `<TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes` folder.

2. Edit the following configurations.

    Enter the client ID and client secret you received when registering the OAuth/OpenID Connect application.

    ``` java
    EnableOAuth2SAML2Grant=true
    OAuth2.ClientId= (enter the client ID received at the application registration)
    OAuth2.ClientSecret= (enter the client secret received at the application registration)
    ```

    
2. Restart the Tomcat server to apply the changes. 

-----

## Try it out

1. Start the Tomcat server and access the following URL on your browser: `http://wso2is.local:8080/travelocity.com`

2. Click **Click here to login with SAML from Identity Server (Post binding or Redirect Binding)**. 

    You are redirected to WSO2 Identity Server for authentication. 

3.  Enter the username and password and click **Continue**.  

    ![login-page](../assets/img/samples/sign-in-sample.png) 

4.  Click **Request OAuth2 Access Token** to receive the access token.  

    ![request-oauth2-access-token](../assets/img/samples/request-oauth2-access-token.png)  

    You will receive an access token as shown below.

    ![oauth2-token-details](../assets/img/samples/oauth2-token-details.png) 

6.  Use the introspection endpoint of WSO2 Identity Server to get the token information.

    **Request**

    !!! abstract ""
        **Request Format**
        ``` java
        curl -k -u <username>:<password> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<access token>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
        ```
        ---
        **Sample Request**
        ``` java
        curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=f3116b04-924f-3f1a-b323-4f0988b94f9f' https://localhost:9443/oauth2/introspect
        ```

    **Response**

    ``` java
    {
        "active":true,
        "token_type":"Bearer",
        "exp":1508927700,
        "iat":1508924100,
        "client_id":"EiqKsYfVH6dffF0b6LmrFBJW95Aa"
        "username":"admin@carbon.super"
    }
    ```

7.  Since the Travelocity application has now exchanged the SAML assertion for a valid OAuth access token, you can use the received access token to access a protected resource in WSO2 Identity Server. 

    Use the [SCIM User Endpoint](../../develop/apis/scim2-rest-apis/#/Users%20Endpoint) which is secured with OAuth to retrieve users. 

    **Request**

    !!! abstract ""
        **Request Format**
        ``` java
        curl -v -k --header "Authorization: Bearer <access token>" https://<IS_HOST>:<IS_PORT>/wso2/scim/Users
        ```
        ---
        **Sample Request**
        ``` java
        curl -v -k --header "Authorization: Bearer 865c60a5-969b-36b4-95e2-721a1fb5c867" https://localhost:9443/wso2/scim/Users
        ```
    
    **Response**

    ``` java
    {
        "totalResults":1,
        "schemas":["urn:scim:schemas:core:1.0"],
        "Resources":[{
            "meta":{
                "created":"2017-11-15T11:23:25",
                "location":"https://localhost:9443/wso2/scim/Users/admin"
                "lastModified":"2017-11-15T11:23:25"
            },
            "id":"0fb2af3f-03f2-4d6b-8340-957012df23f4",
            "userName":"admin"
        }]
    }
    ```

!!! info "Related topics"
    -   [Concept: SAML2 Bearer Assertion Profile for OAuth 2.0](../../references/concepts/authorization/saml2-bearer-assertion-profile)
    -   [Guide: Set Up SAML2 Bearer Assertion Profile](../../guides/access-delegation/saml2-bearer-assertion-profile/)
