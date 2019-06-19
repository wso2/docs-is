# Adding and Configuring an Identity Provider

### Introduction

An Identity Provider (IdP) is responsible for authenticating users and
issuing identification information by using security tokens like [SAML
2.0](https://docs.wso2.com/display/IS570/SAML+2.0+Web+SSO) , [OpenID
Connect](https://docs.wso2.com/display/IS570/OAuth2-OpenID+Connect) ,
[OAuth 2.0](https://docs.wso2.com/display/IS570/OAuth2-OpenID+Connect)
and [WS-Trust](https://docs.wso2.com/display/IS570/WS-Trust) . This is a
favourable alternative to explicitly authenticating a user within a
security realm.

The responsibility of the identity provider configuration is to
represent external identity providers. These external identity providers
can be Facebook, Yahoo, Google, Salesforce, Microsoft Windows Live, etc.
If you want to authenticate users against these identity providers, then
you must associate one or more federated authenticators with the WSO2
Identity Server. These identity providers support for different
authentication protocols. For example, if you want to authenticate users
against Salesforce, then you must associate the SAML 2.0 authenticator
with the Salesforce identity provider, if you want to authenticate users
against Yahoo, then you must associate the OpenID Connect authenticator
with it. To make this process much easier, the WSO2 Identity Server also
comes with a set of more specific federated authenticators. For example,
if you want to authenticate against Facebook, you do not need to
configure OAuth 2.0 authenticator. Instead, you can directly use the
Facebook federated authenticator.

Each identity provider configuration can also maintain a claim mapping.
This is to map the identity provider's own set of claims to WSO2
Identity Server's claims. When the response from an external identity
provider is received by the response processor component of the
federated authenticator, before it hands over the control to the
authentication framework, the response processor will create a
name/value pair of user claims received in the response from the
identity provider. These claims are specific to the external identity
provider. Then it is the responsibility of the authentication framework
to read the claim mapping configuration from the identity provider
component and do the conversion. So, while inside the framework, all the
user claim values will be in a common format.

So, in short, WSO2 Identity Server allows you to add identity providers
and specify various details that help you to link the identity provider
to WSO2 Identity Server.  Therefore, you must specify all information
required to send the authentication requests and get a response back
from the identity provider. This topic contains the following sections.

-   [Adding an identity
    provider](#AddingandConfiguringanIdentityProvider-Addinganidentityprovider)
-   [Configuring basic
    claims](#AddingandConfiguringanIdentityProvider-Configuringbasicclaims)
-   [Configuring advanced
    claims](#AddingandConfiguringanIdentityProvider-Configuringadvancedclaims)
-   [Mapping configured claims to an OpenID Connect
    claim](#AddingandConfiguringanIdentityProvider-MappingconfiguredclaimstoanOpenIDConnectclaim)
-   [Configuring JIT provisioning for an identity
    provider](#AddingandConfiguringanIdentityProvider-ConfiguringJITprovisioningforanidentityprovider)
-   [Configuring a resident identity
    provider](#AddingandConfiguringanIdentityProvider-Configuringaresidentidentityprovider)
-   [Exporting SAML2 metadata of the resident
    IdP](#AddingandConfiguringanIdentityProvider-ExportingSAML2metadataoftheresidentIdP)
-   [Managing identity
    providers](#AddingandConfiguringanIdentityProvider-Managingidentityproviders)

### Adding an identity provider

Follow the instructions below to add a new identity provider.

1.  Access the WSO2 Identity Server [Management
    Console](_Getting_Started_with_the_Management_Console_) and sign in
    as an admin user.
2.  On the **Main** tab, click **Identity \> Identity Providers \> Add**
    .  
    ![](attachments/103329675/112391519.png){width="200"}

3.  Fill in the details in the **Basic Information** section.  
    ![](attachments/103329675/112391521.png){width="800"}  
    Note the following when filling the above form.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Identity Provider Name</td>
    <td><p>The <strong>Identity Provider Name</strong> must be unique as it is used as the primary identifier of the identity provider.</p></td>
    <td><code>               FacebookIdP              </code></td>
    </tr>
    <tr class="even">
    <td>Display Name</td>
    <td><p>The <strong>Display Name</strong> is used to identify the identity provider. If this is left blank, the <strong>Identity Provider Name</strong> is used. This is used in the login page when selecting the identity provider that you want to use to log in to the service provider.</p></td>
    <td><code>               Facebook              </code></td>
    </tr>
    <tr class="odd">
    <td>Description</td>
    <td>The <strong>Description</strong> is added in the list of identity providers to provide more information on what the identity provider is. This is particularly useful in situations where there are many identity providers configured and a description is required to differentiate and identify them.</td>
    <td><code>               This is the identity provider configuration for Facebook.              </code></td>
    </tr>
    <tr class="even">
    <td>Federation Hub Identity Provider</td>
    <td><p>Select the <strong>Federation Hub Identity Provider</strong> check-box to indicate if this points to an identity provider that acts as a federation hub. A federation hub is an identity provider that has multiple identity providers configured to it and can redirect users to the correct identity provider depending on their Home Realm identifier or their Identity Provider Name. When we have this check-box selected additional window will pop-up in the multi-option page in the first identity server to get the home realm identifier for the desired identity provider in the identity provider hub.</p></td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td>Home Realm Identifier</td>
    <td><p>The <strong>Home Realm Identifier</strong> value can be specified in each federated IDP and can send the Home Realm Identifier value as the “fidp” query parameter (e.g., fidp=googleIdp) in the authentication request by the service provider. Then WSO2 Identity Server finds the IDP related to the “fidp” value and redirects the end user to the IDP directly rather than showing the SSO login page. By using this, you can avoid multi-option, in a multi-option scenario without redirecting to the multi-option page.</p></td>
    <td><code>               FB              </code></td>
    </tr>
    <tr class="even">
    <td><div class="content-wrapper">
    <p>Identity Provider Public Certificate</p>
    </div></td>
    <td><div class="content-wrapper">
    <p>The <strong>Identity Provider Public Certificate</strong> is the public certificate of the identity provider. Uploading this is necessary to authenticate responses from the identity provider.<br />
    If necessary, you can upload multiple certificates for an identity provider. This is useful in scenarios where one certificate is expired, but the second can be used for certificate validation.</p>
    <p>For example, consider a scenario where a third party IDP needs to change its certificate in one week, but cannot specify the exact time that the certificate would change. In such a scenario, it is useful to be able to upload a secondary certificate to the IDP so that during SAML assertion validation if certificate validation fails with the first certificate, the second certificate can be used for certificate validation.</p>
    !!! note
        <p>To create the identity provider certificate, navigate to the <code>                 &lt;IS_HOME&gt;/repository/resources/security/                </code> directory in a command prompt and execute the following command:</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">keytool -export -alias wso2carbon -file wso2.<span class="fu">crt</span> -keystore wso2carbon.<span class="fu">jks</span> -storepass wso2carbon</a></code></pre></div>
        </div>
        </div>
        <p>Note that the <code>                 wso2.crt                </code> file is generated. This file is located in the <code>                 &lt;IS_HOME&gt;/repository/resources/security/                </code> directory.</p>
        <p>Click <strong>Choose File</strong> and navigate to this location to obtain and the file so that you can upload the file.</p>
        <div>
        See <a href="https://docs.wso2.com/display/ADMIN44x/Using+Asymmetric+Encryption">Using Asymmetric Encryption</a> in the WSO2 Product Administration Guide for more information.
        </div>
        <p>Tip</p>
        <p>If you are adding an identity provider using a configuration file, and you want to specify multiple certificates for the identity provider, use the following sample configuration:</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;<span class="bu">Certificate</span>&gt;</a>
        <a class="sourceLine" id="cb2-2" title="2">-----BEGIN CERTIFICATE-----</a>
        <a class="sourceLine" id="cb2-3" title="3">MIIDUTCCAjmgAwIBAgIEXvHuADANBgkqhkiG9w0BAQsFADBZMQswCQYDVQQGEwJMSzELMAkGA1UE</a>
        <a class="sourceLine" id="cb2-4" title="4">CBMCV1MxCzAJBgNVBAcTAlNMMQ0wCwYDVQQKEwRIb21lMQ0wCwYDVQQLEwRIb21lMRIwEAYDVQQD</a>
        <a class="sourceLine" id="cb2-5" title="5">-----END CERTIFICATE-----</a>
        <a class="sourceLine" id="cb2-6" title="6">-----BEGIN CERTIFICATE-----</a>
        <a class="sourceLine" id="cb2-7" title="7">MIIDUTCCAjmgAwIBAgIEXvHuADANBgkqhkiG9w0BAQsFADBZMQswCQYDVQQGEwJMSzELMAkGA1UE</a>
        <a class="sourceLine" id="cb2-8" title="8">CBMCV1MxCzAJBgNVBAcTAlNMMQ0wCwYDVQQKEwRIb21lMQ0wCwYDVQQLEwRIb21lMRIwEAYDVQQD</a>
        <a class="sourceLine" id="cb2-9" title="9">-----END CERTIFICATE-----</a>
        <a class="sourceLine" id="cb2-10" title="10">-----BEGIN CERTIFICATE-----</a>
        <a class="sourceLine" id="cb2-11" title="11">MIIDUTCCAjmgAwIBAgIEHMcPtzANBgkqhkiG9w0BAQsFADBZMQswCQYDVQQGEwJM</a>
        <a class="sourceLine" id="cb2-12" title="12">SzELMAkGA1UECBMCV1MxCzAJBgNVBAcTAlNMMQ0wCwYDVQQKEwRIb21lMQ0wCwYD</a>
        <a class="sourceLine" id="cb2-13" title="13">-----END CERTIFICATE-----</a>
        <a class="sourceLine" id="cb2-14" title="14">&lt;/<span class="bu">Certificate</span>&gt;</a></code></pre></div>
        </div>
        </div>
    <p>See <a href="https://docs.wso2.com/display/ADMIN44x/Using+Asymmetric+Encryption">Using Asymmetric Encryption</a> in the WSO2 Product Administration Guide for information on how public keys work, and how to get the keys signed by a certification authority.</p>
    </div></td>
    <td><div class="content-wrapper">
    <p>This can be any certificate. If the identity provider is another Identity Server, this can be a wso2.crt file.</p>
    <p><br />
    </p>
    </div></td>
    </tr>
    <tr class="odd">
    <td>Alias</td>
    <td><p>The <strong>Alias</strong> is a value that has an equivalent value specified in the identity provider that we are configuring. This is required for authentication in some scenarios.</p></td>
    <td><code>               http://localhost:9443/oauth2/token              </code></td>
    </tr>
    </tbody>
    </table>

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on the federation hub and the home realm
    identifier

    About the federation hub and the home realm identifier

    The federation hub has multiple identity providers configured to it.
    In a typical federation hub with multiple identity providers, each
    identity provider can have a unique home realm identifier that can
    be used to identify the identity provider you are logging into.

    So when a user tries to log in to a service provider following flow
    will happen,

    -   The Identity Server which this service provider is configured on
        will find the required federated authenticator from the service
        provider configuration
    -   If this Identity Provider configured as a federation hub, the
        user can specify the preferred identity provider in the
        federation hub using the multi-option page of the first Identity
        Server.
    -   This information will pass with the authentication request to
        the federation hub.
    -   When the request comes to the federation hub, it is sent to the
        identity provider that the user specifies from the first
        identity server. For instance, if the users prefer to use their
        Facebook credentials to log in, and Facebook is one of the
        identity providers configured in the federation hub, the user
        simply has to specify Facebook as the domain in the login screen
        of first Identity Server.

    ![](attachments/103329675/103329699.png){width="750"}

    When the Home Realm Identifier is not specified, you can either
    select the domain name from a dropdown in the login page, or you
    have to enter the domain value in a separate page prior to logging
    in. This can be configured as explained below.

    Open the
    `              <IS_HOME>/repository/conf/identity/application-authentication.xml             `
    file. The `              ProxyMode             ` configuration
    allows the framework to operate in either
    `              smart             ` mode or
    `              dumb             ` mode. In
    `              smart             ` mode, both local and federated
    authentication is supported, while in
    `              dumb             ` mode, only federated
    authentication is supported. If `              dumb             `
    mode is configured here, you must provide the Home Realm Identifier,
    or you have to display a separate screen to the user to get it.

    ![](attachments/103329675/103329698.png){width="750"}

    If smart mode is configured, the default behavior applies, where you
    can enter a local username and password, or use federated
    authenticators for authentication.

    `              <ProxyMode>smart</ProxyMode>             `

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on the Alias

    About the Alias

    The **Alias** is used in the following authentication scenario.

    ![](attachments/103329675/103329689.png)

    Here a SAML identity provider sends a SAML token to a web
    application for authentication. The SAML token has an audience
    restriction element that controls access and has a reference to the
    web application in order to access it. Using this token, the
    authentication takes place. Now, if the web application needs to
    access an API that is protected by OAuth 2.0, the same SAML token is
    sent to the token endpoint of the Identity Server. The **Alias**
    value you configure in the Identity Server is associated with this
    token endpoint. This alias value must be added to the audience
    restriction element of the SAML token. When this SAML token is sent
    to the Identity Server, you obtain an access token, which is used to
    access the API.

    So in order to configure this, you must add the SAML identity
    provider as an identity provider in the Identity Server using the
    instructions in this topic. When configuring this in the Identity
    Server, you must specify the token alias for this scenario to work.
    This indicates that any token coming from the SAML identity provider
    must have this alias value in the audience restriction element.

4.  Enter the **Identity Provider Name** and provide a brief
    **Description** of the identity provider. Only **Identity Provider
    Name** is a required field.
5.  Fill in the remaining details where applicable. Click the arrow
    buttons to expand the forms available to update.  
    ![Adding Configurations for the Identity
    Provider](attachments/103329675/103329681.png "Adding Configurations for the Identity Provider")

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for details on how to configure claims

    Configuring claims for an identity provider involves mapping the
    claims available in the identity provider to claims that are local
    to the WSO2 Identity Server. This is done so that the Identity
    Server can identify the user attributes in the response sent from
    the identity provider. As an example, Facebook IdP will return
    authenticated user email as 'email' and identity server will map it
    to the ' http://wso2.org/claims/emailaddress ' using the IdP claim
    mapping. See the [Identity Server
    Architecture](https://docs.wso2.com/display/IS580/Architecture)
    topic for more information on how claim mapping fits into the
    identity provider scenario.

    In the **Claim Configuration** form, there are two sub forms.

    -   [Basic claim
        configuration](#AddingandConfiguringanIdentityProvider-Configuringbasicclaims) -
        This involves a straightforward mapping of the claim that is
        used on the identity provider side with the claims local to the
        Identity Server.
    -   [Advanced claim
        configuration](#AddingandConfiguringanIdentityProvider-Configuringadvancedclaims) -
        This involves more advanced mapping, where the mapped claims can
        have specific default values.

    Let's get started!

    -   [Configuring basic
        claims](#AddingandConfiguringanIdentityProvider-Configuringbasicclaims)
    -   [Configuring advanced
        claims](#AddingandConfiguringanIdentityProvider-Configuringadvancedclaims)
    -   [Mapping configured claims to an OpenID Connect
        claim](#AddingandConfiguringanIdentityProvider-MappingconfiguredclaimstoanOpenIDConnectclaim)

    To view the claim configuration section, expand the **Claim
    Configuration** form.

    ### Configuring basic claims

    S elect the claim mapping dialect by either choosing to use a local
    claim dialect (i.e., a claim dialect local to the Identity Server)
    or define your own custom claim dialect (i.e., a claim dialect which
    exists in the identity provider that must be mapped to the Identity
    Server).

    -   If you choose to **Use Local Claim Dialect** , select the claim
        you require from the **User ID Claim URI** dropdown that
        includes a list of all the claims defined in the Identity
        Server.  
        ![](attachments/103329700/103329701.png){width="710"}  
    -   You can alternatively choose the **Define Custom Claim Dialect**
        option.  
        ![](attachments/103329700/103329702.png){width="843"}  
        For custom claim dialects, you must map the attributes of the
        user in the identity provider to the claims that are local to
        the Identity Server. These claims can be part of the response
        that is sent from the identity provider to the Identity Server.
        This can also be used when provisioning users from the Identity
        Server to an external identity provider. These claim values are
        sent as part of the outbound provisioning request. Do the
        following to configure this.  
        1.  Click the **Add Claim Mapping** button under **Identity
            Provider Claim URIs** . Clicking this button again enables
            you to perform more claim mapping.
        2.  Map the value of the corresponding claim in the identity
            provider to the claim in the Identity Server. Click the
            **Delete** button to remove the claim mapping.  
            ![](attachments/103329700/103329704.png)

            | Property                    | Description                                         | Sample Value                          |
            |-----------------------------|-----------------------------------------------------|---------------------------------------|
            | Identity Provider Claim URI | Claim identifier used in the Identity Provider side | emailID                               |
            | Local Claim URI             | Claim identifier used in the WSO2 Identity Server   | <http://wso2.org/claims/emailaddress> |

        3.  Select the **User ID Claim URI** from the dropdown that
            includes the list of identity provider claims you defined.
            This is used to uniquely identify the user in the response
            sent by the identity provider. This is also used to identify
            the user in provisioning requests.
        4.  Select the **Role ID Claim URI** from the dropdown that
            includes the list of identity provider claims you defined.
            This is used to uniquely identify the role of the user in
            the response sent by the identity provider. This is also
            used to identify the role in provisioning requests.  

    ### Configuring advanced claims

    You can make advanced claim configurations based on the basic
    configurations you have made.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on when advanced claims are useful

    Provisioning scenario where advanced claims can be useful

    The following scenario encompasses two different scenarios where
    provisioning happens. For both these scenarios, advanced claims are
    very useful.

    ![](attachments/103329700/103329703.png)

    In the above scenario, Google Apps is configured as an identity
    provider in the Identity Server and you would configure the Google
    provisioning connector for provisioning requests. When a user is
    added to the management console of the Identity Server, it is
    assumed in this scenario that the Identity Server acts as a resident
    service provider. This user is provisioned to Google Apps using the
    Google Apps identity provider configuration in the Identity Server.
    So when configuring claims for this scenario, we would have multiple
    local claim URIs associated to the user. For example,
    http://wso2.org/claims/emailaddress, http://wso2.org/claims/title,
    etc. From these claims, only some may be required to provision to
    Google Apps. This is where the **Provisioning Claim Filter** comes
    into play.

    The next scenario is for Just-In-Time (JIT) provisioning. Salesforce
    is the service provider and Facebook is the identity provider
    configured in the Identity Server. When JIT provisioning is
    configured in the service provider configuration, the user is
    provisioned to the user store configured in the Identity Server.
    What happens here is that the authentication request is sent from
    Salesforce to the Identity Server, which sends it along to Facebook
    for authentication. Once authentication is done, the response is
    sent back to the Identity Server, and this is when JIT provisioning
    happens. So basically, JIT provisioning happens while in the middle
    of an authentication flow.

    If the same user store is configured in the Google Apps identity
    provider configuration and JIT provisioning is enabled, the user is
    provisioned there as well. Once again, the **Provisioning Claim
    Filter** is vital to map only the required claims for the specific
    identity provider.

    !!! note
        **Note** : The provisioning can happen in a blocking mode or in a
        non-blocking mode. In the blocking mode, the authentication flow
        will be blocked until the provisioning finishes - while in the
        non-blocking mode, provisioning happens in a different thread. This
        can be specified in the [service provider
        configuration](https://docs.wso2.com/display/IS580/Adding+and+Configuring+a+Service+Provider)
        .
    
    In both these scenarios, only some specific user attributes must be
    configured for provisioning as the claims are different for both
    Facebook and Google Apps and must be mapped to the claims in the
    Identity Server.

    Use the following instructions to configure advanced claims.

    -   If you chose to **Use Local Claim Dialect** in the **Basic Claim
        Configuration** , do the following.
        1.  When you send provisioning requests from the Identity Server
            to the external identity provider, it may not be necessary
            to send all the requests. So, you can use the **Provisioning
            Claim Filter** to filter out the user attributes you need to
            send from the other available attributes. To use the
            **Provisioning Claim Filter** , select the claims that exist
            in the Identity Server from the dropdown list and click
            **Add Claim** . Clicking this button again enables you to
            add a new entry.  
            ![Advanced Claim for local
            claims](attachments/103329700/103329707.png "Advanced Claim for local claims"){width="750"}
        2.  Enter a **Default Value** for your claim. This value is the
            default value used when provisioning this claim. This value
            will be used in all instances of this field, e.g., if all
            users are from one organization, you can specify the name of
            the organization as a default value using this field.
            Clicking the **Delete** button will remove this advanced
            claim.
    -   If you chose to **Define Custom Claim Dialect** in the **Basic
        Claim Configuration** , do the following.
        1.  Select the **Identity Provider Claim URI** you defined from
            the dropdown list and click **Add Claim** . Clicking this
            button again will add a new entry.  
            ![Advanced Claim for custom
            claims](attachments/103329700/103329708.png "Advanced Claim for custom claims"){width="750"}
        2.  Enter a **Default Value** for your claim. This value is the
            default value used when provisioning this claim. This value
            will be used in all instances of this field, e.g., if all
            users are from one organization, you can specify the name of
            the organization as a default value using this
            field. Clicking the **Delete** button will remove this
            advanced claim.

    ### Mapping configured claims to an OpenID Connect claim

    Do this only,

    If your IDP is using OIDC claims and your newly added OIDC claims
    are not available in WSO2 OIDC claim dialect, you need to map those
    new OIDC claims to an existing unused OpenID Connect(OIDC) claim in
    WSO2 Identity Server. For that follow the below steps.

    Once you create a claim definition, you need to map that newly added
    claim to an OpenID Connect (OIDC) claim. To do this, do the
    following:

    1.  Select **Home** -\> **Identity** -\> **Claims** -\> **List** -\>
        http://wso2.org/oidc/claim
    2.  In the list select a claim that you do not use and map that to
        the newly added claim.

    See the following topics for samples of claim mapping for an
    identity provider.

    -   [Logging in to your application via Identity Server using
        Facebook
        Credentials](https://docs.wso2.com/display/IS580/Logging+in+to+your+application+via+Identity+Server+using+Facebook+Credentials)
    -   [Logging in to Salesforce with
        Facebook](https://docs.wso2.com/display/IS580/Logging+in+to+Salesforce+with+Facebook)
    -   [Outbound Provisioning with
        Salesforce](https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+Salesforce)

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for details on how to configure roles

    This section provides instructions on how to configure roles for an
    identity provider. Role mapping needs to be done because roles in
    the Identity Server are different to the roles available in the
    identity provider that you are configuring. For example, if you are
    configuring Google Apps as an identity provider in the Identity
    Server, the admin role in the Identity Server needs to be mapped to
    an appropriate role in Google Apps so that the user will have the
    same role in Google Apps and the Identity Server.

    You can configure the roles of the identity provider by doing the
    following.

    1.  Expand the **Role Configuration** section.
    2.  To configure **Identity Provider Roles** , click **Add Role
        Mapping** . The following screen appears.  
        ![Role
        Mapping](attachments/103329728/103329729.png "Role Mapping"){width="750"}
    3.  Enter the **Identity Provider Role** and map it to the **Local
        Role** available in the Identity Server. See
        [here](https://docs.wso2.com/display/IS580/Configuring+Roles+and+Permissions#ConfiguringRolesandPermissions-addU)
        for information on how the local role can be created in the
        Identity Server. Click the **Delete** button to remove the
        mapping.
    4.  Enter the **Identity Provider Provisioning Role** . This
        configuration is very useful if you wish to only provision some
        users and not others. All users who are assigned to this role
        will be provisioned from the Identity Server to the identity
        provider. You can provision users that have multiple roles by
        specifying the roles in a comma-separated list.  
        ![](attachments/103329728/103329730.png){width="750"}

    !!! note
        The Federated IDP role claim value separator is used to separate
        multiple roles in the role claim value obtained from the Identity
        Provider. In order to configure the Federated IDP role claim value
        separator, add the following configuration to the **identity.xml**
        file in `              <carbon-home>/repository/conf             `
        and restart the server.
    
        ``` xml
         <Server>  
            .....
            
            <!--This is the separator that use to separate multiple roles in the role claim value coming from IDP side-->
            <FederatedIDPRoleClaimValueAttributeSeparator>,</FederatedIDPRoleClaimValueAttributeSeparator>
    
          </Server>
        ```
    
        If this is not configured and if the **no MulitAttributeSeparator**
        is configured, the default seperator will be " **,,,** ".
    

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for details on how to configure federated authenticators

    This topic includes information on how to configure federated
    authenticators in WSO2 Identity Server. !!! warning
    
        **Note:** OpenID 2.0 has been removed from the base product as it is
        now an obsolete specification and has been superseded by OpenID
        Connect. We recommend using [OpenID
        Connect](https://docs.wso2.com/display/IS580/Configuring+OAuth2-OpenID+Connect)
        instead.
    
    You can configure the following federated authenticators by
    expanding the **Federated Authenticators** section followed by the
    required subsections.

    ![](attachments/103330930/103330949.png)

    -   [Configuring SAML 2.0 Web
        SSO](https://docs.wso2.com/display/IS580/Configuring+SAML+2.0+Web+SSO)
    -   [Configuring OAuth2-OpenID
        Connect](https://docs.wso2.com/display/IS580/Configuring+OAuth2-OpenID+Connect)
    -   [Configuring
        WS-Federation](https://docs.wso2.com/display/IS580/Configuring+WS-Federation)
    -   [Configuring
        Facebook](https://docs.wso2.com/display/IS580/Configuring+Facebook)
    -   [Configuring
        Yahoo](https://docs.wso2.com/display/IS580/Configuring+Yahoo)
    -   [Configuring
        Google](https://docs.wso2.com/display/IS580/Configuring+Google)
    -   [Configuring Microsoft Windows
        Live](https://docs.wso2.com/display/IS580/Configuring+Microsoft+Windows+Live)
    -   [Configuring IWA on
        Linux](https://docs.wso2.com/display/IS580/Configuring+IWA+on+Linux)
    -   [Configuring AD FS as a Federated
        Authenticator](https://docs.wso2.com/display/IS580/Configuring+AD+FS+as+a+Federated+Authenticator)
    -   [Configuring
        Twitter](https://docs.wso2.com/display/IS580/Configuring+Twitter)
    -   [Configuring SMS
        OTP](https://docs.wso2.com/display/IS580/Configuring+SMS+OTP)
    -   [Configuring Email
        OTP](https://docs.wso2.com/display/IS580/Configuring+Email+OTP)

    !!! tip
        More Federated Authenticators
    
        Some authenticators such as LinkedIn are not provided OOTB with WSO2
        Identity Server but can be downloaded from the [WSO2
        store](https://store.wso2.com/store/) and plugged in to work with
        WSO2 IS. For more information on those authenticators and
        connectors, see the [WSO2 Identity Server Connectors
        documentation](https://docs.wso2.com/display/ISConnectors) .
    

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for details on how to configure just-in-time provisioning

    **Just-in-time provisioning** is about how to provision users to the
    Identity Server at the time of federated authentication. A service
    provider initiates the authentication request, the user gets
    redirected to the Identity Server, and then the Identity Server
    redirects the user to an external identity provider for
    authentication. Just-in-time provisioning gets triggered in such a
    scenario when the Identity Server receives a positive authentication
    response from the external identity provider. The Identity Server
    will provision the user to its internal user store with the user
    claims from the authentication response.

    You configure JIT provisioning against an identity provider – not
    against service providers. Whenever you associate an identity
    provider with a service provider for outbound authentication, if the
    JIT provisioning is enabled for that particular identity provider,
    then the users from the external identity provider will be
    provisioned into the Identity Server's internal user store. In the
    JIT provisioning configuration, you can also select the provisioning
    user store.

    JIT provisioning happens in the middle of an authentication flow.
    You can create users on the fly, without having to create user
    accounts in advance. For example, if you recently added a user to
    your application, you do not need to manually create the user in
    Identity Server or in the underlying user store. The provisioning
    can happen in a blocking mode or in a non-blocking mode. In the
    blocking mode, the authentication flow is blocked until the
    provisioning happens while in the non-blocking mode, provisioning
    happens in a different thread. If you want to allow a user to access
    your application only if the user is authenticated and provisioned ,
    then you should use blocking mode.

    ### Configuring JIT provisioning for an identity provider

    To configure JIT provisioning for an identity provider, follow the
    steps below:

    1.  Start WSO2 Identity Server and access the Management Console via
        `                               https://localhost:9443/carbon                             `
        /. For detailed instructions on starting WSO2 Identity Server,
        see [Running the
        Product](https://docs.wso2.com/display/IS580/Running+the+Product)
        .
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Identity Providers** .
    3.  Click the **Main** tab on the Management Console, navigate to
        **Identity Providers** under the **Identity** menu, and then
        click **Add** . This displays the **Add New Identity Provider**
        screen.
    4.  Enter appropriate values for all required fields in the **Basic
        Information** section.

    5.  Expand the **Just-In-Time Provisioning** section and select the
        JIT provisioning options based on your requirement.  
        ![](attachments/103329733/103329734.png){width="760"
        height="199"}  
        -   If you want to disable JIT provisioning, select **No
            Provisioning** . This is selected by default.
        -   If you want to always provision users to a selected user
            store domain, select **Always provision to User Store
            Domain** , and then select a required user store domain from
            the list of available user store domains.

            !!! tip
            
                        Tip
            
                        The user store domain that you see by default is the
                        **PRIMARY** user store that is provided with WSO2 Identity
                        Server.
            
                        -   If you want to provision users to multiple user stores
                            depending on the user name specified at the time of
                            provisioning, select **As in username** .
            
                            !!! note
                                        
                                                        If you select this option and do not specify the user
                                                        name appropriately, the relevant user is provisioned to
                                                        the PRIMARY user store domain.  
                                                        For example,
                                        
                                                        -   If you specify the user name as
                    , the user is provisioned to the
                    user store domain.
                -   If you specify the user name as
                    `                     user1                    ` ,
                    the user is provisioned to the PRIMARY user store
                    domain.


            -   If you want to select a user store domain other than the
                default primary user store domain, you need to
                [configure a user
                of your preference for it to appear in the list for you
                to select.


        -   When you select **Always provision to User Store Domain** ,
            you should also select one of the following provisioning
            options depending on how you want to prompt users for
            relevant credentials at the time of JIT provisioning. The
            default selection is **Provision silently** .

            -   **Prompt for username, password and consent**
            -   **Prompt for password and consent**
            -   **Prompt for consent**
            -   **Provision silently**

            !!! note
            
                        Provisioning claims should be compatible with the policies
                        defined in the user store manager configuration. For example
                        user name should match
                        `                  UsernameJavaRegEx                 ` and  
                        `                  RolenameJavaScriptRegEx                 `
                        in the [user store
                        configuration](https://docs.wso2.com/display/IS530/Configuring+User+Stores)
                        .
            

    6.  Click **Register** to add the identity provider.

    **Related Topics**

    For information on the JIT provisioning architecture, see
    [Provisioning
    Architecture](https://docs.wso2.com/display/IS580/Provisioning+Architecture)
    .

    For information on how to configure purposes and appropriate user
    attributes to obtain user consent at the time of JIT provisioning,
    see [Configuring Just-In-Time Provisioning Consent
    Purposes](https://docs.wso2.com/display/IS580/Configuring+Just-In-Time+Provisioning+Consent+Purposes)
    .

    For information on how to customize the default user name and
    password provisioning user interfaces, see [Customizing Just-In-Time
    Provisioning User
    Interfaces](https://docs.wso2.com/display/IS580/Customizing+Just-In-Time+Provisioning+User+Interfaces)
    .

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for details on how to configure outbound provisioning
    connectors

    You can configure the WSO2 Identity Server to provision users to
    external applications. See the [Identity Server
    Architecture](https://docs.wso2.com/display/IS580/Architecture) for
    more information on how this process fits into the overall picture

    You can configure outbound provisioning connectors by expanding the
    relevant section.

    ![](attachments/103329711/103329723.png)

    In addition to this, you can also create [custom
    connectors](https://docs.wso2.com/display/IS580/Writing+an+Outbound+Provisioning+Connector)
    that are added to the list of outbound provisioning connectors once
    created.

    -   [Configuring Google
        provisioning](#AddingandConfiguringanIdentityProvider-ConfiguringGoogleprovisioning)
    -   [Configuring Salesforce
        provisioning](#AddingandConfiguringanIdentityProvider-ConfiguringSalesforceprovisioning)
    -   [Configuring SCIM
        provisioning](#AddingandConfiguringanIdentityProvider-ConfiguringSCIMprovisioning)
    -   [Configuring SPML
        provisioning](#AddingandConfiguringanIdentityProvider-ConfiguringSPMLprovisioning)

    #### Configuring Google provisioning

    This configuration involves setting up the Identity Server to send
    provisioning requests to Google applications.

    Expand the **Google Provisioning Configuration** form and fill in
    the following fields where relevant.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable Connector</td>
    <td>Selecting this enables identity provisioning through the Google domain.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Google Domain</td>
    <td>The name of the Google domain used to provision users.</td>
    <td><code>                  mygoogledomain.com                 </code></td>
    </tr>
    <tr class="odd">
    <td>Primary Email</td>
    <td>Claim URI which will be used to retrieve primary email address for the account to be created. This must be a claim that is available and local in the Identity Server.</td>
    <td><code>                                     http://wso2.org/claims/emailaddress                                   </code></td>
    </tr>
    <tr class="even">
    <td>Given Name</td>
    <td>Claim URI which will be used to retrieve given name attribute for the user. This must be a claim that is available and local in the Identity Server.</td>
    <td><code>                                     http://wso2.org/claims/givenname                                   </code></td>
    </tr>
    <tr class="odd">
    <td>Family Name</td>
    <td>Claim URI which will be used to retrieve family name attribute for the user. This must be a claim that is available and local in the Identity Server.</td>
    <td><code>                                     http://wso2.org/claims/lastname                                   </code></td>
    </tr>
    <tr class="even">
    <td>Service Account Email</td>
    <td>This email is used for authentication purposes.</td>
    <td><code>                  d343s86gf@developer.gserviceaccount.com                 </code></td>
    </tr>
    <tr class="odd">
    <td>Private Key</td>
    <td>Browse and attach the private key from your local machine. This is the PKCS12 private key generated at the service account creation</td>
    <td><code>                  &lt;uploaded_file&gt;                 </code></td>
    </tr>
    <tr class="even">
    <td>Administrator's Email</td>
    <td>This is the email of the administrator who owns the service account in the Google Domain specified. Provisioning takes place using this email, so specifying this here serves as a means for authentication.</td>
    <td><code>                  om@mygoogledomain.com                 </code></td>
    </tr>
    <tr class="odd">
    <td>Application Name</td>
    <td>This is the name of the application which is used to represent the Google connector.</td>
    <td><code>                  Domain                 </code></td>
    </tr>
    <tr class="even">
    <td>Google Outbound Provisioning pattern</td>
    <td><p>This pattern is used to build the user id of Google domain. Combination of attributes UD (User Domain), UN (Username), TD (Tenant Domain) and IDP (Identity Provider) can be used to construct a valid pattern.</p>
    <p>This is a way to differentiate following scenarios:<br />
    If there are several tenants and you must configure Google outbound provisioning for same Google domain in those tenants.<br />
    If there are several user stores and you must configure the specific user store that needs to be provisioned.<br />
    If there are multiple identity providers configured for same Google domain.</p></td>
    <td><code>                  {UD, UN, TD, IDP}                 </code></td>
    </tr>
    <tr class="odd">
    <td>Google Provisioning Separator</td>
    <td>This is used to separate the values that you configure in the Google Outbound Provisioning pattern.</td>
    <td>For this, it is better to use a character that is not normally used in the user domain/username/tenant domain/idp name. For example: "_"</td>
    </tr>
    </tbody>
    </table>

    ![](attachments/103329711/103329714.png){width="900" height="542"}

    ####  Configuring Salesforce provisioning

    This configuration involves setting up the Identity Server to send
    provisioning requests to Salesforce. See [Outbound Provisioning with
    Salesforce](https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+Salesforce)
    for more information on how this is configured from end to end.

    1.  Expand the **Salesforce Provisioning Configuration** form.  
        ![](attachments/103329711/103329713.png){width="900"}
    2.  Fill in the following fields where relevant.

        <table>
        <colgroup>
        <col style="width: 33%" />
        <col style="width: 33%" />
        <col style="width: 33%" />
        </colgroup>
        <thead>
        <tr class="header">
        <th>Field</th>
        <th>Description</th>
        <th>Sample value</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd">
        <td>Enable Connector</td>
        <td>Selecting this enables identity provisioning through Salesforce.</td>
        <td>Selected</td>
        </tr>
        <tr class="even">
        <td>API version</td>
        <td>This is the version of the Salesforce API that is used for provisioning. To obtain this, log into <a href="https://developer.salesforce.com/signup">https://developer.salesforce.com/</a> and click <strong>Setup</strong> . On the left navigation pane, click <strong>API</strong> under <strong>Develop</strong> . Generate one of those APIs to check the version.</td>
        <td>v32.0</td>
        </tr>
        <tr class="odd">
        <td>Domain Name</td>
        <td>This is the name of the Salesforce domain used to provision users.  If you do not have a Salesforce domain, you can create a domain by logging into <a href="https://developer.salesforce.com/signup">https://developer.salesforce.com/</a> and clicking Setup. On the left navigation pane, click <strong>My Domain</strong> under <strong>Domain Management</strong> . Make sure you enter the domain with an HTTPS prefix so that it resembles a URL.</td>
        <td>https://identityprovisioning-dev-ed.my.salesforce.com/</td>
        </tr>
        <tr class="even">
        <td>Client ID</td>
        <td>This is the username of the client you are using to access Salesforce. This Consumer Key value is obtained when configuring Salesforce. See <a href="https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+Salesforce">Outbound Provisioning with Salesforce</a> for more information.</td>
        <td>3MVG8123wefw763na2452683KJNsvrgKBwe4gyksKJ22f3g45</td>
        </tr>
        <tr class="odd">
        <td>Client Secret</td>
        <td>This is the password of the client you are using to access Salesforce. This Consumer Secret value is obtained when configuring Salesforce. See <a href="https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+Salesforce">Outbound Provisioning with Salesforce</a> for more information.</td>
        <td>&lt;password&gt;</td>
        </tr>
        <tr class="even">
        <td>Username</td>
        <td>This is the Salesforce username.</td>
        <td>samuel@wso2.com</td>
        </tr>
        <tr class="odd">
        <td>Password</td>
        <td>This is the Salesforce password and must be entered along with the security token. So you would enter this in the following format: &lt;password&gt;&lt;security_token&gt;</td>
        <td>&lt;password&gt;&lt;security_token&gt;</td>
        </tr>
        <tr class="even">
        <td>OAuth2 Token Endpoint</td>
        <td><p>OAuth token endpoint URL of Salesforce.</p></td>
        <td>https://login.salesforce.com/services/oauth2/token</td>
        </tr>
        <tr class="odd">
        <td>Provisioning Pattern</td>
        <td><p>This pattern is used to build the user id of Salesforce domain. Combination of attributes UD (User Domain), UN (Username), TD (Tenant Domain) and IDP (Identity Provider) can be used to construct a valid pattern.</p>
        <p>This is a way to differentiate following scenarios:<br />
        If there are several tenants and you must configure Salesforce outbound provisioning for same Salesforce domain in those tenants.<br />
        If there are several user stores and you must configure the specific user store that needs to be provisioned.<br />
        If there are multiple identity providers configured for same Salesforce domain.</p></td>
        <td>{UD, UN, TD, IDP}</td>
        </tr>
        <tr class="even">
        <td>Provisioning Separator</td>
        <td>This is used to separate the values that you configure in the Salesforce Outbound Provisioning pattern.</td>
        <td>For this, it is better to use a character that is not normally used in the user domain/username/tenant domain/idp name. For example: "_"</td>
        </tr>
        <tr class="odd">
        <td>Provisioning Domain</td>
        <td>The user name of Salesforce is an email address. Here you can configure a specific domain name the username should have.</td>
        <td>yahoo.com</td>
        </tr>
        </tbody>
        </table>

        About claim configuration for Salesforce

        The following claims must be configured when configuring
        Salesforce for outbound provisioning. See [Outbound Provisioning
        with
        Salesforce](https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+Salesforce)
        for more information on how to do this.

        -   Email
        -   EmailEncodingKey
        -   LanguageLocaleKey
        -   LastName
        -   LocaleSidKey
        -   ProfileId
        -   TimeZoneSidKey
        -   Username
        -   UserPermissionsCallCenterAutoLogin
        -   UserPermissionsMarketingUser
        -   UserPermissionsOfflineUser

    #### Configuring SCIM provisioning

    The System for Cross-domain Identity Management (SCIM) specification
    is designed to make managing user identities in the WSO2 Identity
    Server easier. Identity provisioning is a key aspect of any identity
    management solution and, as such, is very relevant to SCIM. In
    simple terms, it is to create, maintain and delete user accounts and
    related identities in one or more systems or applications in
    response to business processes that are initiated either by humans
    directly or by automated tasks.

    This configuration involves setting up the Identity Server to send
    provisioning requests to an external application that supports SCIM.
    See [Outbound Provisioning with
    SCIM](https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+SCIM)
    for more information on how this works in a typical scenario.

    1.  Expand the **SCIM Provisioning Configuration** form.  
        ![](attachments/103329711/103329716.png){width="750"}  
        Fill in the following fields where relevant.

        | Field                        | Description                                                                                                                                                                                                                                                                                               | Sample value                            |
        |------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
        | Enable Connector             | Selecting this enables identity provisioning through SCIM.                                                                                                                                                                                                                                                | Selected                                |
        | Username                     | This is the username of the SCIM application.                                                                                                                                                                                                                                                             | Admin                                   |
        | Password                     | This is the password of the SCIM application.                                                                                                                                                                                                                                                             | \<password\>                            |
        | User Endpoint                | This is the SCIM endpoint of the users.                                                                                                                                                                                                                                                                   | https://localhost:9443/wso2/scim/Users  |
        | Group Endpoint               | This is the SCIM endpoint of the groups.                                                                                                                                                                                                                                                                  | https://localhost:9443/wso2/scim/Groups |
        | User Store Domain            | This is the user store that users are created. You can specify any user store connected to your identity provider.                                                                                                                                                                                        | Domain                                  |
        | Enable Password Provisioning | This is to specify whether to send a default password, or the password sent in the SCIM request, to the server where it gets provisioned. In a scenario where the Identity Server is used as a proxy, and sending the password to some other server is not appropriate, the default password can be sent. | Selected                                |
        | Default Password             | The default password that must be sent.                                                                                                                                                                                                                                                                   | \<password\>                            |

    #### Configuring SPML provisioning

    The Service Provisioning Markup Language (SPML) is the open standard
    for the integration and interoperation of service provisioning
    requests. The goal of SPML is to allow organizations to securely and
    quickly set up user interfaces for Web services and applications, by
    letting enterprise platforms such as Web portals, application
    servers, and service centers generate provisioning requests within
    and across organizations

    This configuration involves setting up the Identity Server to send
    provisioning requests to an external application that supports SPML.
    See [Outbound Provisioning with
    SPML](https://docs.wso2.com/display/IS580/Outbound+Provisioning+with+SPML)
    for more information on how this works in a typical scenario.

    1.  Expand the **SPML Provisioning Configuration** form.  
        ![](attachments/103329711/103329715.png){width="750"}
    2.  Fill in the following fields where relevant.

        | Field            | Description                                                                                                                                 | Sample value                        |
        |------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
        | Enable Connector | Selecting this enables identity provisioning through SPML.                                                                                  | Selected                            |
        | Username         | This is the username of the SPML application.                                                                                               | Configadmin                         |
        | Password         | This is the password of the SPML application.                                                                                               | \<password\>                        |
        | SPML Endpoint    | This is the SPML endpoint URL.                                                                                                              | http://localhost:9847/servelet/spml |
        | SPML ObjectClass | The ObjectClass for SPML. This value is required as it links with the ObjectClass in SPML that is used to provide data from the user store. | spml2person                         |

    **Related Topics**

    -   See [Outbound
        Provisioning](https://docs.wso2.com/display/IS510/Outbound+Provisioning)
        for more information on configuring user stores and service
        providers for outbound provisioning.

6.  Click **Register** to add the Identity Provider.  
      

### Configuring a resident identity provider

Apart from mediating authentication requests between service providers
and identity providers, WSO2 Identity Server can act as a service
provider and an identity provider. When WSO2 Identity Server acts as an
identity provider, it is called the **resident identity provider** .

!!! note
    
    The resident identity provider configuration is helps service providers
    to send authentication or provisioning requests to WSO2 Identity Server
    via SAML, OpenID Connect, SCIM, or WS-Trust. For an example on how a
    resident identity provider is used to implement a security token
    service, see [Configuring WS-Trust Security Token
    Service](_Configuring_WS-Trust_Security_Token_Service_) . The Resident
    identity provider configuration is a one-time configuration for a given
    tenant. It shows WSO2 Identity Server's metadata, e.g., endpoints. The
    resident identity provider configurations can be used to secure the
    WS-Trust endpoint with a security policy.
    

Follow the instructions below to configure a resident identity provider:

1.  Access the WSO2 Identity Server Management Console.
2.  Sign in as an admin user.
3.  On the **Main** tab, click **Identity \> Identity Providers \>
    Resident** .  
    ![](attachments/103329675/112391524.png){width="200"}  
    The Resident Identity Provider page appears.  
    ![](attachments/103329675/112391525.png){width="800"}

4.  Enter the required values as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Home Realm Identifier</strong></td>
    <td>This is the domain name of the identity provider. If you do not enter a value here, when an authentication request comes to WSO2 Identity Server, a user will be prompted to specify a domain. You can enter multiple identifiers as a comma-separated list.</td>
    <td><code>                localhost               </code></td>
    </tr>
    <tr class="even">
    <td><strong>Idle Session Time Out</strong></td>
    <td>This is the duration in minutes for which an SSO session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. The default value is <code>                15               </code> .</td>
    <td><code>                15               </code></td>
    </tr>
    <tr class="odd">
    <td><strong>Remember Me Period</strong></td>
    <td><div class="content-wrapper">
    <p>This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that you have selected the <strong>Remember Me</strong> option in the WSO2 Identity Server login screen.</p>
    <p>The default value is <code>                  2                 </code> weeks.</p>
    </div></td>
    <td><code>                2               </code></td>
    </tr>
    </tbody>
    </table>

5.  You may configure inbound authentication by expanding the **Inbound
    Authentication Configuration** section.  
    1.  To configure SAML2 configurations:
        1.  Click **SAML2 Web SSO Configuration** .  
            ![](attachments/103329675/112391531.png){width="750"}  
            The SAML2 Web SSO Configuration form appears.  
            ![](attachments/103329675/112391532.png){width="750"}
        2.  Enter the required values and learn the fixed values as
            given below.

            | Field                           | Description                                                                                                                                                                             | Sample/Fixed Value                                                                                                      |
            |---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
            | **Identity Provider Entity ID** | This is for tenant identification. The users who are provisioned through this tenant can be identified using this ID.                                                                   | `                    localhost                   `                                                                      |
            | **Destination URLs**            | This defines the destination URL of the identity provider. This helps the service providers that connect to WSO2 Identity Server through a proxy server to locate WSO2 Identity Server. | `                                         https://localhost:9443/samlsso                                       `        |
            | **SSO URL**                     | This is the SAML SSO endpoint of the identity provider.                                                                                                                                 | `                                         https://localhost:9443/samlsso                                       `        |
            | **Logout Url**                  | This is the identity provider's end point that accepts SAML logout requests.                                                                                                            | `                                         https://localhost:9443/samlsso                                       `        |
            | **Artifact Resolution URL**     | This is the identity provider's endpoint that resolves SAML artifacts.                                                                                                                  | `                                         https://localhost:9443/samlartresolve                                       ` |
            | **Metadata Validity Period**    | This is the duration for which the metadata will be valid for.                                                                                                                          | `                    60                   `                                                                             |
            | **Enable metadata signing**     | This facilitates to enable or disable metadata signing                                                                                                                                  | `                    false                   `                                                                          |

    2.  To configure OAuth2 or OIDC, click **OAuth2/OpenID Connect
        Configuration** .  
        ![](attachments/103329675/112391636.png){width="750"}

        | Field                                        | Description                                                                                                                                                                                         | Sample/Fixed Value                                                                                                                     |
        |----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
        | **Identity Provider Entity ID**              | This is for tenant identification. The users who are provisioned through this tenant can be identified using this ID.                                                                               | `                  localhost                 `                                                                                         |
        | **Authorization Endpoint URL**               | This is the identity provider's OAuth2/OpenID Connect authorization endpoint URL.                                                                                                                   | `                                     https://localhost:9443/oauth2/authorize                                   `                      |
        | **Token Endpoint URL**                       | This is the identity provider's token endpoint URL.                                                                                                                                                 | `                                     https://localhost:9443/oauth2/token                                   `                          |
        | **Token Revocation Endpoint URL**            | This is the URL of the endpoint at which access tokens and refresh token are revoked.                                                                                                               | `                                     https://localhost:9443/oauth2/revoke                                   `                         |
        | **Token Introspection Endpoint URL**         | This is the URL of the endpoint at which OAuth tokens are validated.                                                                                                                                | `                                     https://localhost:9443/oauth2/introspect                                   `                     |
        | **User Info Endpoint URL**                   | This the URL of the endpoint through which user information can be retrieved. The information is gathered by passing an access token.                                                               | `                                     https://localhost:9443/oauth2/userinfo                                   `                       |
        | **Session iFrame Endpoint URL**              | This the URL of the endpoint that provides an iframe to synchronize the session states between the client and the identity provider.                                                                | `                                     https://localhost:9443/oidc/checksession                                   `                     |
        | **Logout Endpoint URL**                      | This is the identity provider's endpoint that accepts SAML logout requests.                                                                                                                         | `                                     https://localhost:9443/oidc/logout                                   `                           |
        | **Web finger Endpoint URL**                  | This is the URL of the OpenID Connect token discovery endpoint at which WSO2 Identity Server's meta data are retrieved from.                                                                        | `                                     https://localhost:9443/.well-known/webfinger                                   `                 |
        | **Discovery Endpoint URL**                   | This is the URL of the endpoint that is used to discover the end user's OpenID provider and obtain the information required to interact with the OpenID provider, e.g., OAuth 2 endpoint locations. | `                                     https://localhost:9443/oauth2/oidcdiscovery                                   `                  |
        | **Dynamic Client Registration Endpoint URL** | This is the URL of the endpoint at which OpenID Connect dynamic client registration takes places.                                                                                                   | `                                     https://localhost:9443/api/identity/oauth2/dcr/v1.1/register                                   ` |
        | **JWKS Endpoint URL**                        | This is the URL of the endpoint that returns WSO2 Identity Server's public key set in JSON Web Key Set (JWKS) format.                                                                               | `                                     https://localhost:9443/oauth2/jwks                                   `                           |

    3.  To secure the WS-Trust endpoint with a security policy, click
        **Security Token Service Configuration** section.  
        ![](attachments/103329675/112391635.png){width="750"}  
        For more information on security token service (STS), see
        [Configuring WS-Trust Security Token
        Service](_Configuring_WS-Trust_Security_Token_Service_) .

6.  You may view the inbound provisioning configurations by clicking
    **Inbound Provisioning Configuration** section.
    ![](attachments/103329675/112391638.png){width="750"}

    | Field                   | Description                                                                                                                                                    | Sample Value                                                                                              |
    |-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
    | **SCIM User Endpoint**  | This is the identity provider's endpoint for SCIM user operations, e.g., creating and managing users.                                                          | `                                 https://localhost:9443/wso2/scim/Users                               `  |
    | **SCIM Group Endpoint** | This is the identity provider's endpoint for the SCIM user role operations, e.g., creating user roles, assigning user roles to users, and managing user roles. | `                                 https://localhost:9443/wso2/scim/Groups                               ` |

7.  Click **Update** .

!!! note
    
    To modify the host name of the above-above mentioned URLs,
    
    1.  open the `            carbon.xml           ` file in the
        `            <IS_HOME>/repository/conf           ` directory and
        update the value of the `            <HostName>           `
        parameter.
    
        ``` xml
        <HostName>localhost</HostName>
        ```
    
    2.  Open the `            identity.xml           ` file in the
        `            <IS_HOME>/repository/conf/identity           `
        directory and update the vaule of the
        `            <IdentityPRoviderURL>           ` parameter.
    
        ``` xml
            <IdentityProviderURL>https://localhost:9443/samlsso</IdentityProviderURL>
        ```
    
        To ensure the client application is communicating with the right
        identity provider, WSO2 Identity Server compares the destination
        value in the SAML request with the URL in the above configuration.
    

### <a name="exporting-saml2-metadata-of-the-resident-idp"></a> Exporting SAML2 metadata of the resident IdP

To configure WSO2 Identity Server as a trusted identity provider in a
service provider application, export the SAML2 metadata of the resident
identity provider of WSO2 IS and import the metadata to the relevant
service provider.

!!! tip
    
    Use **one** of the following approaches to do this.
    
    -   Start the server and download the SAML2 metadata by accessing this
        URL: <https://localhost:9443/identity/metadata/saml2> .
    -   **Alternatively** , access the management console and follow the
        steps given below to download the metadata.
    

1.  Expand the **Inbound Authentication Configuration** section and then
    expand **SAML2 Web SSO Configuration** .
2.  Click **Download SAML2 metadata** . A
    `           metadata.xml          ` file will be downloaded on to
    your machine.
3.  Import the `            metadata.xml           ` file to the
    relevant service provider to configure WSO2 Identity Server as a
    trusted identity provider for your application.

    ![](attachments/103329675/119115136.png){width="800"}

### Managing identity providers

This section provides instructions on how to manage identity providers
once they are created.

#### Viewing identity providers

Follow the instructions below to view the list of identity providers
added in the WSO2 Identity Server.

1.  Sign in. Enter your username and password to log on to
    the Management Console.
2.  In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers** . The list of identity providers you
    added appears.  
    ![](attachments/103329675/103329692.png){width="750"}

#### Editing identity providers

Follow the instructions below to edit an identity provider's details.

1.  Sign in. Enter your username and password to log on to
    the Management Console.
2.  In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers** . The list of identity providers you
    added appears.
3.  Locate the identity provider you want to edit and click on the
    corresponding **Edit** link.  
    ![](attachments/103329675/103329691.png){width="750"}
4.  You are directed to the edit screen where you can modify the details
    you configured for the identity provider.

#### Deleting identity providers

Follow the instructions below to delete an identity provider.

1.  Sign in. Enter your username and password to log on to
    the Management Console.
2.  In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers** . The list of identity providers you
    added appears.
3.  Locate the identity provider you want to delete and click on the
    corresponding **Delete** link.  
    ![](attachments/103329675/103329693.png){width="750"}
4.  Confirm your request in the WSO2 Carbon window. Click the **Yes**
    button.

#### Disabling/Enabling identity providers

Follow the instructions below to disable or enable an identity provider.

1.  Sign in. Enter your username and password to log on to
    the Management Console.
2.  In the **Main** menu under the **Identity** section, click **List**
    under **Identity Providers** . The list of identity providers you
    added appears.
3.  Locate the identity provider you want to delete and click on the
    corresponding **Disable** link to disable the identity provider.
    Clicking this link will change the link to **Enable** . To enable
    the identity provider again, click the **Enable** link.
    ![](attachments/103329675/103329694.png){width="750"}
4.  Click **Ok** on the confirmation form that appears when clicking
    **Disable** / **Enable** .  

**Related Topics**

See the following topics for information on configuring service
providers using different specifications.

-   See [Identity Federation](_Identity_Federation_) for information on
    configuring federated authenticators.

See the following topics to configure different applications as service
providers in Identity Server.

-   [Configuring Shibboleth IdP as a Trusted Identity
    Provider](_Configuring_Shibboleth_IdP_as_a_Trusted_Identity_Provider_)
-   [Logging in to Salesforce with
    Facebook](_Logging_in_to_Salesforce_with_Facebook_)
-   [Logging in to Salesforce with Integrated Windows
    Authentication](_Logging_in_to_Salesforce_with_Integrated_Windows_Authentication_)
-   [Logging in to your application via Identity Server using Facebook
    Credentials](_Logging_in_to_your_application_via_Identity_Server_using_Facebook_Credentials_)
