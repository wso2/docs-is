# Configure WS-Federation Single Sign-On

This page guides you through enabling [single sign-on]({{base_path}}/references/concepts/single-sign-on) (SSO) for a WS-Federation based application using WSO2 Identity Server.

!!! info 
    WSO2 Identity Server's passive security token service (Passive STS) is used as the WS-Federation implementation. 
    The Passive STS is capable of issuing SAML 1.1 and 2.0 security tokens.
	To request a SAML 2.0 security token, the Request Security Token (RST) should be sent to the passive STS endpoint 
	with the TokenType `SAMLV2.0` when sending the token request. If there is no RST specified, WSO2 Identity Server 
	will issue a SAML 1.1 token by default.


## Scenario

Pickup is a cab company that has two web applications that use WS-Federation. Both applications use WSO2 IS as the identity provider. When SSO is configured for both these applications, an employee is only required to provide their credentials to the first application and the user will be automatically logged in to the second application.

This tutorial demonstrates configuring WS-Federation for one application and retrieving a SAML token that can be used for single sign-on.


!!! tip "Before you begin" 
    Install Apache Tomcat 8.x.


This tutorial demonstrates configuring WS-Federation for one application and retrieving a SAML token that can be used for single sign-on. 

## Set up

1. [Download WSO2 Identity Server](https://wso2.com/identity-and-access-management/).

2. Navigate to `<IS_HOME>/bin` and start the server by executing one of the following commands.

    ``` java tab="Linux/MacOS"
    sh wso2server.sh
    ```

    ``` java tab="Windows"
    wso2server.bat run
    ```
    
3. Log in to the management console using admin/admin credentials and create a new user called "Alex" with login permission.

    !!! info
        'admin' is the default administrative user in WSO2 Identity Server.

4. Click **List** under **Users and Roles** and edit Alex's user profile. Enter an email address for Alex.





### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download a sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).
2. [Download](https://github.com/wso2/samples-is/releases/download/v4.5.2/PassiveSTSSampleApp.war) the `PassiveSTSSampleApp.war` file from the
   latest release assets.

### Deploying the PassiveSTSSampleApp webapp

Deploy this sample web app on a web container.

1.  Copy the .war file into the `           webapps          `
    folder. For example,
    `           <TOMCAT_HOME>/apache-tomcat-<version>/webapps          `
    .
2.  Start the Tomcat server.
    

### Configure sample properties

Open the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps/PassiveSTSSampleApp/WEB-INF/web.xml` file and configure the following. 
    
1.  Specify ` idpUrl ` as the URL of Identity Server's Passive STS. The
    following is an example.

    ``` xml
    <init-param>
            <param-name>idpUrl</param-name>
            <param-value>https://localhost:9443/passivests</param-value>
    </init-param> 
    ```

2.  Specify the ` replyURL ` as the URL of the web app. The following
    specifies ` PassiveSTSSampleApp ` as the web app.

    ``` xml
    <init-param>
            <param-name>replyUrl</param-name>
            <param-value>http://localhost:8080/PassiveSTSSampleApp/index.jsp</param-value>
    </init-param>
    ```

3.  Specify the ` realm ` . This should be a unique identifier for the
    web app as seen in the example below.

    ``` xml
    <init-param>
            <param-name>realm</param-name>
            <param-value>PassiveSTSSampleApp</param-value>
    </init-param> 
    ```
    
4.  For tenant user logins, specify the ` tenantDomain ` .

    ``` xml
    <init-param>
            <param-name>requestParams</param-name>
            <param-value>tenantDomain=tenant4.com</param-value>
    </init-param>
    ```
    
5. Restart the tomcat server.

To check the sample application,
navigate to `http://<TOMCAT_HOST>:<TOMCAT_PORT>/PassiveSTSSampleApp/home.jsp ` on your browser.

For example, ` http://localhost:8080/PassiveSTSSampleApp/home.jsp .`


## Configuring the service provider

The next step is to configure the service provider.

1.  Return to the WSO2 IS management console.

2.  Navigate to **Main**>**Identity**>**Service Providers** and click **Add**.

3.  Enter **PassiveSTSSampleApp** in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, set following configurations
    under the **WS-Federation (Passive) Configuration** section.

     

    -   **Passive STS Realm** :`               PassiveSTSSampleApp             `

    -   **Assertion Consumer URL** :`http://localhost:8080/PassiveSTSSampleApp/index.jsp`
                 
    Click Yes, in the message that appears.

    

5. Expand the **Claim Configuration** section and click **Add Requested Claim** to add the following claims. 
    -  http://wso2.org/claims/username
    -  http://wso2.org/claims/emailaddress

6. Select `http://wso2.org/claims/emailaddress` as the **Subject Claim URI**. 

    ![passive-sts-claims]({{base_path}}/assets/img/samples/passive-sts-claims.png)

7.  Click **Update** to save the changes.  
    Now you are sent back to the Service Providers page.
    
    
## Try it out

!!! info 
    When redirecting your users to WSO2 IS Passive STS endpoint, the following (optional) parameters are sent in the request from the sample application.

    - **wa=wsignin1.0**: specifies whether WSO2 IS should issue a token for the relying party (this is the default action).
    - **wa=wsignout1.0**: specifies whether WSO2 IS should log the user out.
    - **wreply={replyUrl}**: specifies where the response should be sent to.

    It is recommended to use a Network tracer such as a SAML tracer to analyze the HTTP request and responses in this scenario. With a tracer, you will be able to view the parameters mentioned above and also see the SAML token that is issued from WSO2 IS. 

1. Navigate to one of the following links on your browser and click **Login**.
    - To get a SAML 1.1 token: <http://localhost:8080/PassiveSTSSampleApp/index.jsp>
    - To get a SAML 2.0 token: <http://localhost:8080/PassiveSTSSampleApp?samlv=2-0>

2. Log in using Alex's credentials. You will be redirected to the WSO2 IS Passive STS Service and then redirected back to the configured `replyUrl`.

3. On the screen, you will see the passive STS response with the requested claims. Click **Logout** to logout from the application.
   
    ![passive-sts-response]({{base_path}}/assets/img/samples/passive-sts-response.png)

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
    - [Concept: WS-Federation]({{base_path}}/guides/login/webapp-ws-federation.md)
