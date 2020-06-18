# Configure Single Sign On for a Open ID Connect Application

This page guides you through configuring [single sign on authentication](TODO:insert-link-to-concept) between two OIDC web applications. This is demonstrated using two **sample applications** called Pickup Dispatch and Pickup Manager. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/sso-for-oidc" rel="nofollow noopener">I have my own application</a>

----

## Scenario

Pickup is a cab company that has two OIDC web applications called pickup-dispatch and pickup-manager. Both applications use WSO2 Identity Server (IS) as the identity provider. When SSO is configured for both these applications, a user is only required to provide their credentials to the first application and the user will be automatically logged in to the second application.

![oidc-sso-scenario](../assets/img/samples/oidc-sso-scenario-diagram.png)

Follow the steps below to deploy the sample applications and see how this works. 

----

## Set up Pickup Dispatch sample

(TODO: dev-portal-fragment)

{!fragments/pickup-dispatch-oidc.md!}

----

## Set up Pickup Manager sample

(TODO: dev-portal-fragment)

{!fragments/pickup-manager-oidc.md!}

You are now ready to try out OpenID Connect SSO with the Pickup Dispatch and Pickup Manager sample web applications.

----

## Try it out

1. Navigate to <http://wso2is.local:8080/pickup-dispatch> on your browser and click **Login**.

    ![dispatch-login](../assets/img/samples/dispatch-login.png)

2. You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (admin/admin). Provide the required consent.
You will be redirected to the Pickup Dispatch application home page.

3. Now, if you navigate to <http://wso2is.local:8080/pickup-manager> and click **Login**, you can see that user has been automatically logged in to this application without being prompted for user credentials.

You have successfully configured OpenID Connect Single Sign-On for two web applications using WSO2 IS as the identity provider.

----

!!! info "Related Topics"
    - [Concept: Single Sign-On](TODO:insert-link-to-concept)
    - [Guide: Single Sign-On for an OpenID Connect Application](../../guides/login/sso-for-oidc)