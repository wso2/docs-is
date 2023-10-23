# Re-brand the Default Login Page for Your Application

WSO2 Identity Server usually displays a default login page for all service provider applications that send authentication requests to it. WSO2 IS supports re-branding the login page according to your requirements for SAML2 SSO, OAuth, or OpenID Connect applications.

The login pages and other pages, such as error and notification screens of SAML SSO, OAuth, OpenID Connect, and Passive STS are located in the **authenticationendpoint** webapp file, which is found in the `<IS_HOME>/repository/deployment/server/webapps` directory.

You can easily re-brand these pages within this web application by updating the respective JSPs, JavaScript and CSS. If you want to point to a different web application, you can do so by redirecting or forwarding from **authenticationendpoint** to your webapp. In the case of SAML SSO, the `issuer id` of the service provider is also sent to this webapp.
Therefore, different login pages can be given to different service providers by looking at the ' **issuer** ' request parameter.

This page guides you through re-branding the login page for a sample SAML2 SSO web application.

---

First, register two service providers in WSO2 Identity Server.

## Configure travelocity application

{!./includes/travelocity.md!}


## Configure avis application

1. Copy the downloaded `travelocity.com.war` file and rename it to `avis.com.war`.

2. Add it to `<TOMCAT_HOME>/webapps/` folder and restart the Tomcat server.

3. Open the `<TOMCAT_HOME>/webapps/avis.com/avis.properties` file and update the following configurations.
    ```
    #The URL of the SAML 2.0 Assertion Consumer
    SAML2.AssertionConsumerURL=http://wso2.is:8080/avis.com/home.jsp
        
    #openid.return_to parameter
    OpenId.ReturnToURL=http://wso2.is:8080/avis.com/home.jsp
    ```

4. Restart the Tomcat server to apply the configuration changes.

5. Register a new service provider with the name `avis.com` similarly by following the steps given in [configure travelocity application](#register-a-service-provider) by replacing `travelocity.com` references to `avis.com`.

Start the application server and access the following URLs to make sure both apps are running.

- **travelocity.com**

    URL:
    [http://wso2is.local:8080/travelocity.com/index.jsp](http://localhost:8080/travelocity.com/index.jsp)

    ![Travelocity screen]({{base_path}}/assets/img/samples/travelocity-screen.png)

- **avis.com**

    URL:
    [http://wso2is.local:8080/avis.com/index.jsp](http://localhost:8080/avis.com/index.jsp)

    ![Avis screen]({{base_path}}/assets/img/samples/avis-screen.png) 

When attempting to log in with SAML from WSO2 Identity Server in **Travelocity.com** and **Avis.com** applications, you can see the following default page located at `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/login.jsp`.
  
![Identity Server sign in screen]({{base_path}}/assets/img/samples/identity-server-sign-in-screen.png)

---

## Configure the login page

### authenticationendpoint web application

The login page that is displayed during SAML2 SSO, OAuth, OpenID Connect and Passive-STS flows is located inside the webapp named **authenticationendpoint**. The reason for storing this in a web app is:

- To easily customize the page according to user requirements.
- To place the whole web application in an external application server, if needed.

WSO2 Identity Server is aware of the location of this web application as it is specified with the configurations in the `<IS_HOME>/repository/conf/deployment.toml` file. The configurations are as follows:

```
[authentication.endpoints] 
login_url="/authenticationendpoint/login.do"
retry_url="/authenticationendpoint/retry.do" 
```

By default, the configuration points to a location inside WSO2 Identity Server itself, which is reprensted by the relative path. If it is necessary to point to an external application, the full path should be given instead.

!!! note
    If this web app is moved outside the Identity Server, ensure that no one can access the login credentials that are passed between this application and the Identity Server. This means that the external location should ideally be either inside a secured intranet or the transport should be HTTPS. Other similar precautions may be necessary to secure the communication.

The structure of this web app is as follows:

![authentication-web-app-folder-structure]({{base_path}}/assets/img/extend/authentication-web-app-folder-structure.png)

The **authenticationendpoint** web application uses a carbon component called `org.wso2.carbon.identity.application.authentication.endpoint.util`. This bundle includes a filter called the `org.wso2.carbon.identity.application.authentication.endpoint.util.filter`. `AuthenticationEndpointFilter` acts as the Front Controller.

When a request is made to the **authenticationendpoint** web application, based on the authentication protocol type identified by the request parameter ‘type’, the controller first forwards the request to the protocol based login url patterns defined.
For example, if the request to the **authenticationendpoint** web application is initiated as a result of a SAML SSO authentication request, the controller will forward the request to the url pattern `/samlsso_login.do` . In **web.xml**, this URL is mapped to the **login.jsp** file. The request is finally forwarded to this **login.jsp** page.

Everything on the **authenticationendpoint** web application can be modified according to your requirements. You can either add JSP pages or modify them and configure the **web.xml** respectively.

The only restriction involved is that the content already sent back by the pages inside the default web app must be submitted to the Identity Server. Additionally, you must point to the correct location via the `<IS_HOME>/repository/conf/identity/application-authentication.xml` file.

---

## Re-brand the login page

When a request comes to the default login page, you will see several parameters being passed in the address bar. For this example, the focus is on the following two parameters:

- **sessionDataKey** : This is an identifier used by the Identity Server to maintain state information related to this particular request by the service provider.

    !!! note
        The 'sessionDataKey' query parameter is used to coordinate the request state across components participating in the request flow. It does not correlate with the user session. Furthermore, the request state maintained against the 'sessionDataKey' parameter value is cleared by each participating component at the end of request flow. This means that even if an external party grabs the 'sessionDataKey' they will not be able to get into the authentication sequence, as the user session is not associated with that key.

 -   **relyingParty** : This is the value we gave for the "Issuer" field when we registered the SAML2 SSO service provider (e.g.,travelocity.com). This value is used to display different login pages to different service providers.

When modifying the pages, ensure that the following is applied.

1. Form submissions should happen to the "commonauth" servlet as a POST.

    ``` xml
    <form id="form" name="form" action="{{base_path}}/commonauth" method="POST"> 
    ```

2. Make sure to send back the "sessionDataKey" with the form submission, by using a hidden input field.

    ``` xml
    <%@ page import="org.owasp.encoder.Encode" %>

    <input type="hidden" name="sessionDataKey" value="<%=Encode.forHtmlAttribute(request.getParameter("sessionDataKey"))%>"/>
    ```

#### **Use a JSP to redirect to SP relevant pages**

1. Rename the existing `login.jsp` as `default\_login.jsp`
2. Create a new file named `login.jsp` and add the following code:

    ``` java
    <%  
    String relyingParty = request.getParameter("relyingParty");

    if (relyingParty.equals("travelocity.com")) {
        RequestDispatcher dispatcher = request.getRequestDispatcher("travelocity_login.jsp");
        dispatcher.forward(request, response);
    } else {
        RequestDispatcher dispatcher = request.getRequestDispatcher("default_login.jsp");
        dispatcher.forward(request, response);
    } 
    %>
    ```

    This code forwards the request to a different login page by checking the value of `relyingParty` parameter.

3. Get the [`travelocity\_login.jsp`](https://github.com/wso2/samples-is/blob/master/re-branding-the-default-login-page/authenticationendpoint/travelocity_login.jsp) file and add it parallel to `login.jsp`. 

4. Download the contents of the `css` and `images` folders from this [link](https://github.com/wso2/samples-is/tree/master/re-branding-the-default-login-page/authenticationendpoint) and add them inside the respective folders in the `authenticationendpoint`.

5. Log in to the travelocity.com web app again. You are presented with the re-branded page.

![Travelocity login screen]({{base_path}}/assets/img/samples/travelocity-login-screen.png)

