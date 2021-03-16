# Enable Login for SAML Web Application

This page guides you through enabling login for a [SAML](../../../references/concepts/authentication/intro-saml/) web application using a **sample application** called Pickup. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/webapp-saml"   rel="nofollow noopener">I have my own application</a>

----


{!fragments/pickup-dispatch-saml.md!}

----

## Log in to the application

1. Start the Tomcat server and access the following URL on your browser: `http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com`.

	```
	http://<TOMCAT_host>:<TOMCAT_port>/saml2-web-app-pickup-dispatch.com
	```

2. Click **Login**.

3. Log in using your WSO2 Identity Server credentials (e.g., admin/admin). Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

You have successfully configured authentication for a SAML application.

----

## Configure single logout

1. Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`) and click **List** under **Service Providers**. 

2. Click **Edit** to edit the SAML service provider you created.

3. Expand **Inbound Authentication Configuration** and then expand **SAML2 Web SSO Configuration**. Edit the configuration.

4. Select **Enable Single Logout**. For more information, see [SAML Advanced Configurations](../../../guides/login/saml-parameters-in-auth-request).

-----

!!! info "Related Topics"
    - [Concept: SAML](../../../references/concepts/authentication/intro-saml/)
    - [Guide: Enable Login for a SAML Web Application](../../../guides/login/webapp-saml/)
    - [Guide: SAML Front-Channel Logout](../../../guides/login/saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout](../../../guides/login/saml-back-channel-logout)

