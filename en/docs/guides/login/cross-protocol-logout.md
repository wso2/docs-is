# Configure Cross-Protocol Logout

This page guides you through enabling cross-protocol logout across different protocols such as SAML and OpenID Connect in WSO2 Identity Server.

## Register your SAML app with WSO2 Identity Server

{!fragments/pickup-dispatch-saml.md!}

----

## Register your OIDC app with WSO2 Identity Server

Next, register a service provider and configure authentication for it with a different protocol.

{!fragments/pickup-manager-oidc.md!}

----

## Try it

Once you have configured all your applications, access them in separate tabs in your browser. When you logout from one application, it should log you out from all the configured applications.

1. Access `http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com` on your browser and click **Login**.

2. You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (`admin`/`admin`). Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

3. Now, if you access `http://wso2is.local:8080/pickup-manager` and click **Login**, you can see that user has been automatically logged in to this application without being prompted for user credentials.

4. Click **Admin** on the top-right corner and click **Logout** to log out of the OIDC Pickup Manager application. 

5. Switch to the SAML Pickup Dispatch app on your browser. You will see that you have been logged out of the SAML application as well. 

You have successfully tried out cross-protocol logout between a SAML application and an OIDC application.

----

!!! info "Related topics"
    - [Guide: Single Sign-On](../enable-single-sign-on)
    - [Guide: SAML Front-Channel Logout](../saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout](../saml-back-channel-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [Guide: OpenID Connect Logout URL Redirection](../oidc-logout-url-redirection)
    <!--- - [Concept: Cross-Protocol Logout](TODO:insert-link-to-concept)-->