# Introduction to Identity Federation

## What is identity federation? 

Identity federation is, very simply, a mechanism that delegates authentication to a third-party application thereby allowing users to use their user account and credentials from one application, to log in to a different application. 

This means that an application does not really need to store the user's credentials in order to authenticate them. It can simply authenticate the user by communicating with a different trusted application, which acts as an identity provider and is already maintaining the user's electronic identity. In an identity federation flow, authentication is delegated to the identity provider. Authorization can also be a part of this federation arrangement if required. 

A user's digital identity that has been linked or shared across multiple trust domains in this manner is called a **federated identity**. Identity federation makes gaining access to applications quick and easy, as users do not have to remember a different set of credentials for every application they use. 

----

## How does identity federation work?

The main parties involved in an identity federation flow are:

- **Identity Provider (IdP)**: The application in which the user has created their account is called the identity provider and it is responsible for maintaining the user's digital identity. 

- **Relying Party (RP)**: The application that depends upon the identity provider, to maintain and vouch for the user's identity is called the relying party. 

The identity federation flow is as follows:

1. The user attempts to log in to the RP application. 

2. The RP needs to authenticate the user and is configured to trust the IdP to do this on behalf of it. 

3. The unauthenticated user is redirected to the IdP's login page and prompted to provide their credentials to authenticate themselves to the IdP. 

    In some cases, the IdP may check session data and skip this step if the user is already authenticated with the IdP. <!-- For more information, see [Single Sign-On vs Identity Federation](TODO:link-to-concept).-->

4. If the user is successfully validated and authenticated, the user is redirected back to the RP application with an access token, which allows the user to access the application. 

<!-- (TODO: insert-diagram)-->

----

## Identity federation with WSO2 Identity Server

WSO2 Identity Server can be used as an identity provider to authenticate users for multiple client applications. 

Furthermore, in a real-world implementation, organizations may have multiple relying party applications that need trust relationships with multiple identity providers, in order to authenticate users. Another requirement may be to enable relying party applications or services to provide access to identities that are *outside* the organization's traditional boundary/trust domain. These scenarios require an **identity broker** or a federated identity management system such as WSO2 Identity Server (WSO2 IS), which already has trust relationships with external identity providers. The identity broker can be used to set up a federation arrangement for multiple relying party applications. 

WSO2 IS has federated authenticators for social identity providers such as Google, Facebook, LinkedIn, Twitter, Salesforce, etc., as well as authenticators for protocols such as SAML 2.0, OpenID Connect, OAuth 2.0, and WS-Federation (passive).

You can register relying party applications in WSO2 IS and configure which federated authenticators are to be used for each relying party. As it is highly extensible, you can also develop your own federated authenticator and plug it into WSO2 IS if required. 

