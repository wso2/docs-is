# Introduction to Identity Federation

## What is identity federation? 

Identity federation is an authentication method that allows users to use their user account and credentials from one application, to log in to a different application. 

This means that an application does not really need to store the user's credentials in order to authenticate them. It can simply authenticate the user by communicating with a different trusted application, which acts as an identity provider and is already maintaining the user's electronic identity. A user's digital identity that has been linked or shared across multiple trust domains this way is called a **federated identity**. 

Identity federation makes gaining access to applications quick and easy, as users do not have to remember a different set of credentials for every application they use. 

----

## How does identity federation work?

- The application in which the user has created his/her account is called the **identity provider (IdP)** and is responsible for maintaining the user's digital identity. 

- The application that is depending upon the identity provider to maintain and vouch for the user's identity is called the **relying party (RP)**. 

1. The user attempts to access a service provided by the RP or log in to the RP application. 

2. The RP needs to authenticate the user, but is configured and set up to trust the IdP to do this on behalf of it. 

3. The unauthenticated user is redirected to the IdP's login page and prompted to provide their credentials to authenticate themselves to the IdP. 

    In some cases, the RP may check session data with the IdP and skip this step if the user is already authenticated with the IdP. For more information, see [Single Sign-On vs Identity Federation](TODO:link-to-concept).

4. If the user is successfully validated and authenticated, the user is redirected back to the RP application with an access token, which allows the user to access the application. 

(TODO: insert-diagram)

----

## Identity federation with WSO2 Identity Server

In a real-world implementation, organizations may have multiple relying party applications that need trust relationships with multiple identity providers in order to authenticate users. This requires an **identity broker** or a federated identity management system such as WSO2 Identity Server that already has trust relationships with external identity providers, and mechanisms to set up a federation arrangement for multiple relying party applications. 

WSO2 Identity Server has federated authenticators for social idenity providers such as Google, Facebook, LinkedIn, Twitter, Salesforce, etc., as well as authenticators for protocols such as SAML 2.0, OpenID Connect, OAuth 2.0, and WS-Federation (passive). A federated authenticator for a protocol (such as SAML) has to be associated with an identity provider using the same protocol. 

You can register relying party applications in WSO2 Identity Server and configure which federated authenticators are to be used for each relying party. As WSO2 Identity Server is highly extensible, you can also develop your own federated authenticator and plug it into WSO2 IS if required. 

