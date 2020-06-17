# Enable Login for OpenID Connect Web Application

This page guides you through enabling login for an [OpenID Connect](../../../concepts/authentication/intro-oidc) web application using a **sample application** called Pickup. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/webapp-oidc"   rel="nofollow noopener">I have my own application</a>

----

(TODO: dev-portal-fragment)
{!fragments/pickup-dispatch-oidc.md!}

----

## Log in to the application

1. Start the Tomcat server and access the following URL on your browser: <http://wso2is.local:8080/pickup-dispatch/home.jsp>.

	```
	http://<TOMCAT_HOST>:<TOMCAT_PORT>/pickup-dispatch/home.jsp
	```

2. Click **Login**. You will be redirected to the login page of WSO2 Identity Server. 

3. Log in using your WSO2 Identity Server credentials (e.g., admin/admin). Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

You have successfully configured authentication for an OpenID Connect application.

----

!!! info "Related Topics"
    - [Concept: OpenID Connect](../../../concepts/authentication/intro-oidc)
    - [Guide: Enable Login for a Sample OpenID Connect Web Application](../../../guides/login/webapp-oidc)
    - [Guides: OAuth Grant Types](../../guides/access-delegation/oauth-grant-types)





