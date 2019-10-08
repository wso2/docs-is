# Configuring SAML2 Single-Sign-On Across Different WSO2 Products

With the SAML2 relying party capabilities of Carbon, it is possible to
set up Single Sign-On between different WSO2 Product instances where
WSO2 Identity Server acts as the identity provider while other WSO2
products act as the relying party. This topic provides instructions on
how to set up Single Sign-On between different WSO2 products. 

## Configuring the Carbon Server to use the SAML2-based authentication

This step is to configure Carbon Server Server to use the SAML2-based authentication instead of default username/password-based authentication.  It is necessary to configure the SAML2 SSO
authentication component to communicate with WSO2 Identity Server for
user authentication. This can be configured in the
`         IS_HOME/repository/conf/deployment.toml        `
file.

``` toml
[admin_console.authenticator.saml_sso_authenticator]
enable = false
priority = 10
login_page = /carbon/admin/login.jsp
service_provider_id = carbonServer
identity_provider_sso_service_url = https://localhost:9443/samlsso
name_id_policy_format = urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified 
idp_cert_alias = wso2carbon
```

-   `          Authenticator disabled         ` - This should be set to
    `          false         ` .
-   `          Priority         ` - This is the priority level of the
    authenticator. In the Carbon Runtime, the authenticator with the
    highest priority will be picked up. This value should be greater
    than 5 in order to supersede the default username/password-based
    authenticator.
-   `          Parameter LoginPage         ` - This is the default login
    page URL of Carbon. All requests coming to this page will be
    intercepted for authentication. It is not necessary to change this
    value from the value given in the sample configuration.
-   `          Parameter ServiceProviderID         ` - This is the
    unique identifier for the Carbon Server in an SSO setup. This value
    should be used as the value of the issuer in the Identity Server
    configuration.
-   `          Parameter IdentityProviderSSOServiceURL         ` - This
    is the Identity Server URL to which the users will be redirected for
    authentication. It should have this format:
    `                     https://(host-name):(port)/samlsso                   `
    .
-   `          Parameter NameIDPolicyFormat         ` - This specifies
    the name identifier format that the Carbon server wants to receive
    in the subject of an assertion from a particular identity provider.
-   `          Parameter IdPCertAlias         ` -  This is the alias of the identity provider certificate.
    This is specifically used whenever a Carbon server uses IS as the
    identity provider.

## Configuring WSO2 Identity Server as the SSO provider

Finally, you need to configure the Identity Server to act as the Single
Sign-on provider. Each relying party should be registered as a service
provider at the Identity Server-end. The following is a sample
configuration for registering a Carbon server as a service provider.

1.  Sign in. Enter your username and password to log on to the
    [Management
    Console](../../setup/getting-started-with-the-management-console)
    .
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Service Providers**.
3.  Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider. Only **Service Provider
    Name** is a required field.
4.  Click **Register** to add the new service provider.
5.  Expand the **Inbound Authentication Configuration** section,
    followed by the **SAML2 Web SSO Configuration** section and click
    **Configure**.
6.  Fill in the form that appears.
    -   Specify the **Issuer**. This should be equal to the
        `            service_provider_id           ` value mentioned in
        the `            deployment.toml           ` of the relying
        party Carbon server.
    -   Specify the **Assertion Consumer URL**. This is the URL to
        which the browser should be redirected after the authentication
        is successful. It should have this format:
        `                         https://(host-name):(port)/acs                       `
        .
    -   Select **Use fully qualified username in SAML Response** if that
        feature is required.
    -   Select **Enable Response Signing** to sign the SAML2 Responses
        returned after the authentication.
    -   Select **Enable Assertion Signing** to sign the SAML2 Assertions
        returned after the authentication. SAML2 relying party
        components expect these assertions to be signed by the Identity
        Server.
    -   Select **Enable Signature Validation in Authentication Requests
        and Logout Requests** if you need this feature configured.
    -   Select **Enable Single Logout** so that all sessions are
        terminated once the user signs out from one server. You can
        enter a **Custom Logout URL** if required.
    -   Select **Enable Attribute Profile** to enable this and add a
        claim by entering the claim link and clicking the **Add Claim**
        button.
    -   Select **Enable Audience Restriction** to restrict the audience.
        You may add audience members using the **Audience** text box and
        clicking the **Add Audience** button.
7.  Expand the **Local & Outbound Authentication Configuration** section
    and do the following.  
    -   Select **Use tenant domain in local subject identifier**
        to append the tenant domain to the local subject identifier.
    -   Select **Use user store domain in local subject identifier**
        to append the user store domain that the user resides in the
        local subject identifier.  
        ![](../assets/img/53125544/53287694.png) 
8.  Click the **Update** button to update the details of the service
    provider.
