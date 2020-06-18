# Configure Single Sign On for a SAML Application

This page guides you through configuring [single sign on authentication](TODO:insert-link-to-concept) between two SAML web applications. This is demonstrated using two **sample applications** called Pickup Dispatch and Pickup Manager. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/sso-for-saml" rel="nofollow noopener">I have my own application</a>

----

## Scenario

Pickup is a cab company that has two SAML web applications called pickup-dispatch and pickup-manager. Both applications use WSO2 Identity Server (IS) as the identity provider. When SSO is configured for both these applications, an employee is only required to provide their credentials to the first application and the user will be automatically logged in to the second application.

![saml-sso-scenario](../assets/img/samples/saml-sso-scenario-diagram.png)

Follow the steps below to deploy two sample applications and see how this works. 

----

## Set up Pickup Dispatch sample

(TODO: dev-portal-fragment)
{!fragments/pickup-dispatch-saml.md!}

----

## Set up Pickup Manager sample

(TODO: dev-portal-fragment)
{!fragments/pickup-manager-saml.md!}

You are now ready to try out SAML SSO with the Pickup Dispatch and Pickup Manager sample web applications.

----

## Try it out

1. Navigate to <http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com> on your browser and click **Login**.

    ![dispatch-login](../assets/img/samples/dispatch-login.png)

2. You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (admin/admin). Provide the required consent.
You will be redirected to the Pickup Dispatch application home page.

3. Now, if you navigate to <http://wso2is.local:8080/saml2-web-app-pickup-manager.com> and click **Login**, you can see that the user has been automatically logged in to this application without being prompted for user credentials.

You have successfully configured SAML Single Sign-On for two web applications using WSO2 IS as the identity provider. 

----

(TODO: dev-portal-content)

## Configure claims

Additionally, you can also configure claims for the service providers.

!!! Info
        For more information, see
        [Configuring Claims for a Service
        Provider](insertlink).

1. On the **Main** menu of the management console, click **Service Providers**>**List**, and **Edit** the "pickup-dispatch" service provider.

2. Expand the **Claim Configuration** section in the service provider form.

3. You can select the claims that must be sent to the service provider. Select **Use Local Claim Dialect** and click **Add Claim URI**.

4. Add the following claims as **Requested Claims**. 
	1. http://wso2.org/claims/fullname
	2. http://wso2.org/claims/emailaddress

5. Select `http://wso2.org/claims/fullname` as the **Subject claim URI** and click **Update** to save the service provider configurations. 

    ![dispatch-configure-claims](../assets/img/samples/dispatch-configure-claims.png)

6. Now, logout of the **Pickup Dispatch** and **Pickup Manager** applications.

7. Access <http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com> on your browser and click **Login**.

8. Note that the user is now prompted for consent to share the **Email Address** claim value with the sample application.  

    ![dispatch-email-consent](../assets/img/samples/dispatch-email-consent.png)

Now you have successfully configured additional claims for your service provider.

----

!!! info "Related Topics"
    - [Concept: Single Sign-On](TODO:insert-link-to-concept)
    - [Guide: Single Sign-On for a SAML Application](../../guides/login/sso-for-saml-apps)

