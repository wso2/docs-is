# Configuring OAuth2-OpenID Connect Single-Sign-On

[OAuth 2.0](https://oauth.net/2/) has three main phases. They are:

- Requesting an Authorization Grant
- Exchanging the Authorization Grant for an Access Token 
- Accessing the resources using the obtained Access Token

[OpenID Connect](http://openid.net/connect/) is another identity layer
on top of OAuth 2.0. OAuth applications can get authentication event
information over the IDToken and can get the extra claims of the
authenticated user from the OpenID Connect UserInfo endpoint.  

To enable OAuth support for your client application, you must first
register your application. Follow the instructions below to add a new
application.

!!! Tip "Before you begin"	
    You must first
    [register a service provider](../../learn/adding-and-configuring-a-service-provider/#adding-a-service-provider).
    To register a service provider:
	 
	 1. Sign in to WSO2 Identity Server Management Console as an admin.
	 2. On the Main menu, click **Identity** > **Service Providers** > **Add**.
	 3. Enter a service provider name.
	 4.	Click Register. The Service Provider Details page appears.
	
Let's get started to configure the service provider you created!

1.  Expand the **Inbound Authentication Configuration** section and then
    expand **OAuth/OpenID Connect Configuration.** Click **Configure**.
2.  Fill in the form that appears. For the **Allowed Grant Types** you
    can disable the ones you do not require or wish to block.

    !!! note
    
        The grant type highlighted below is a **custom** grant type. This
        will only appear on the UI if you have [configured the JWT grant
        type](../../develop/jwt-grant-type-for-oauth2). The value specified as the `name`
        of the `oauth.custom_grant_type` in the `deployment.toml` file when
        creating the custom grant type is the value that will appear on the
        UI. For more information on writing a custom grant type, see
        [Writing a Custom OAuth 2.0 Grant
        Type](../../learn/writing-a-custom-oauth-2.0-grant-type).
    

    ![configure-oauth-oidc](../assets/img/tutorials/configure-oauth-oidc.png)

    When filling out the **New Application** form, the following details
    should be taken into consideration.

    <table style="width:100%;">
   <colgroup>
      <col style="width: 22%" />
      <col style="width: 77%" />
   </colgroup>
   <thead>
      <tr class="header">
         <th>Field</th>
         <th>Notes</th>
      </tr>
   </thead>
   <tbody>
      <tr class="odd">
         <td><strong>OAuth Version</strong></td>
         <td>
            <p>Selecting <strong>OAuth Version</strong> as <strong>1.0a</strong> removes all the configurable <strong>Allowed Grant Types</strong>. This is because this version of OAuth does not support grant types.</p>
         </td>
      </tr>
      <tr class="even">
         <td>
            <div class="content-wrapper">
               <p><strong>Allowed Grant Types</strong></p>
            </div>
         </td>
         <td>
            The following grant types are used to generate the access token:
            <ul>
               <li><strong>Code</strong> : Entering the username and password required at the service provider will result in a code being generated. This code can be used to obtain the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.1">Authorization Code specification</a>.</li>
               <li><strong>Implicit</strong> : This is similar to the code grant type, but instead of generating a code, this directly provides the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.2">Implicit Grant specification</a>.</li>
               <li><strong>Password</strong> : This authenticates the user using the password provided and the access token is provided. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.3">Resource Owner Password Credentials Grant specification</a>.</li>
               <li><strong>Client Credential</strong> : This is the grant type for the client key and client secret. If these two items are provided correctly by the service provider, the access token is sent. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.4">Client Credentials specification.</a></li>
               <li><strong>Refresh Token</strong> : This will enable the user to obtain an access token by using the refresh token once the originally provided access token is used up. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-1.5">Refresh Token specification</a>.</li>
               <li><strong>SAML2</strong> : This uses SAML assertion to obtain the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/id/draft-ietf-oauth-saml2-bearer-23.txt">SAML2 Bearer specification</a>.</li>
               <li><strong>IWA-NTLM</strong> : This is similar to the password grant type, but it is specific to Microsoft Windows users.</li>
               <li><strong>urn:ietf:params:oauth: grant-type:jwt-bearer</strong> : This is a custom grant type. It uses a JWT token to obtain the access token. For more information about this grant type, see this <a href="https://tools.ietf.org/html/rfc7523">JWT specification</a>.</li>
            </ul>
         </td>
      </tr>
      <tr class="odd">
         <td><strong>Callback Url</strong></td>
         <td>
            <div class="content-wrapper">
            <p>This is the exact location in the service provider's application where an access token would be sent. This is a required field (if the grant type is anything other than 'Code' or 'Implicit') and it is important to configure, as it is imperative that the service provider receives the access token. This is necessary for security purposes to ensure that the token is not compromised.</p>
            <div class="admonition note">
               <p class="admonition-title">Configure multiple callback URLs</p>
               <p>From IS 5.2.0 onwards, regex-based consumer URLs are supported when defining the callback URL. This enables you to configure multiple callback URLs for one application by entering a regex pattern as the value for the callback URL field.<br />
                  For example, if you have two service providers that use the same application, you can now define a regex pattern which will work for both callback URLs instead of having to configure two different applications for the two service providers. Assume the two callback URLs for your two service providers are as follows:
               </p>
               <ul>
                  <li><code>                                         https://myapp.com/callback                                       </code></li>
                  <li><code>                                         https://testapp:8000/callback                                       </code></li>
               </ul>
               <p>To configure the callback URL to work for <strong>both</strong> of these URLs, set it using a regex pattern as follows:<br />
               </p>
               <div class="code panel pdl" style="border-width: 1px;">
                  <div class="codeContent panelContent pdl">
                     <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence">
                        <pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">regexp=(https:<span class="co">//myapp.com/callback|https://testapp:8000/callback)</span></a></code></pre>
                     </div>
                  </div>
               </div>
               <p>You must have the prefix ' <strong>regexp=</strong> ' before your regex pattern. To define a normal URL, you can specify the callback URL without this prefix.</p>
               <p>You can also configure a regex pattern that contains dynamic values as seen below.</p>
               <div class="code panel pdl" style="border-width: 1px;">
                  <div class="codeContent panelContent pdl">
                     <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence">
                        <pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">regexp=https:<span class="co">//mchcon.clance.local\?id=(.*)</span></a></code></pre>
                     </div>
                  </div>
               </div>
            </div>
         </td>
      </tr>
      <tr class="even">
         <td><strong>PKCE Mandatory</strong></td>
         <td>Select this if you are using the <strong>Code</strong> grant type. PKCE is a recommended security measure used to mitigate a code interception attack. See <a href="../../administer/mitigating-authorization-code-interception-attacks">Mitigating Authorization Code Interception Attacks</a> for more information.</td>
      </tr>
      <tr class="odd">
         <td><strong>Support PKCE 'Plain' Transform Algorithm</strong></td>
         <td>Select this if you are using PKCE.</td>
      </tr>
      <tr class="even">
         <td><strong>Allow Authentication without the client secret</strong></td>
         <td>This enables authenticating the client without the <code>               client secret              </code>.</td>
      </tr>
      <tr class="odd">
         <td>
            <p><strong>User Access Token Expiry Time, Application Access Token Expiry Time, Refresh Token Expiry Time, Id Token Expiry Time</strong></p>
            <p><strong><br />
               </strong>
            </p>
         </td>
         <td>Set the validity period (in seconds) for User Access Token, Application Access Token, Refresh Token, and Id Token.</td>
      </tr>
      <tr class="even">
         <td><strong>Enable Audience Restriction</strong></td>
         <td>
            <div class="content-wrapper">
               <p>Select this to enable audience restrictions for OAuth applications. If necessary, you can add multiple audiences. To add an audience, specify a required <strong>Audience</strong> value and click <strong>Add</strong>. All audience values that you add would be available in the ID token generated for the corresponding application.</p>
            </div>
         </td>
      </tr>
      <tr class="odd">
         <td><strong>Enable Request Object Signature Validation</strong></td>
         <td>
            <p>This is to define whether to only accept signed request objects in an authorization rqeuest or not. For more information, see <a href="../../learn/enforcing-signature-validation-for-request-objects">Enforcing Signature Validation for Request Objects</a>.</p>
         </td>
      </tr>
      <tr class="even">
         <td><strong>Enable ID Token Encryption</strong></td>
         <td>This is to define whether to ID token encryption should be enabled or not. For a tutorial on this, see <a href="../../learn/testing-oidc-encrypted-id-token-with-is">Testing OIDC Encrypted ID Token with IS</a>.</td>
      </tr>
      <tr class="odd">
         <td><strong>Enable OIDC Back Channel Logout</strong></td>
         <td>This is to define whether OIDC back channel logout should be enabled or not. For more information, see <a href="../../learn/configuring-openid-connect-back-channel-logout">Configuring OpenID Connect Back-Channel Logout</a>.</td>
      </tr>
      <tr class="even">
         <td><strong>Scope Validators</strong></td>
         <td>This is to define the scope validation mechanisms. For more information on XACML scope validation, see <a href="../../learn/validating-the-scope-of-oauth-access-tokens-using-xacml-policies">Validating the Scope of OAuth Access Tokens using XACML Policies</a>.</td>
      </tr>
      <tr class="odd">
         <td><strong>Token Issuer</strong></td>
         <td>
            <div class="content-wrapper">
            <p>Select either <strong>JWT</strong> or <strong>Default</strong> as the token issuer for the service provider.</p>
            <div class="admonition tip">
               <p class="admonition-title">Tip</p>
               <ul>
                  <li>If you want to enable default token generation for a service provider, select <strong>Default</strong> as the <strong>Token Issuer</strong>. This is the default Token Issuer that is selected when you apply the WUM update.<br />
                     When you enable default token generation, the hash value of the token is stored in the ACCESS_TOKEN_HASH column, and the plain text token is stored in the ACCESS_TOKEN column
                  </li>
                  <li>If you want to enable JWT token generation for a service provider, select <strong>JWT</strong> as the <strong>Token Issuer</strong>.<br />
                     When you enable JWT token generation, the hash value of the JWT is stored in the ACCESS_TOKEN_HASH column, and the full JWT is stored in the ACCESS_TOKEN column.
                  </li>
               </ul>
            </div>
         </td>
      </tr>
   </tbody>
</table>

3.  Click **Add**. Note that `          client key         ` and
    `          client secret         ` get generated.  
    ![oidc-clientkey-clientsecret](../assets/img/tutorials/oidc-clientkey-clientsecret.png)

    -   **OAuth Client Key** - This is the client key of the service
        provider, which will be checked for authentication by the
        Identity Server before providing the access token.
    -   **OAuth Client Secret** - This is the client secret of the
        service provider, which will be checked for authentication by
        the Identity Server before providing the access token. Click the
        **Show** button to view the exact value of this.
    -   **Actions -**
        -   **Edit:** Click to edit the OAuth/OpenID Connect
            Configurations

        -   **Revoke:** Click to revoke (deactivate) the OAuth
            application. This action revokes all tokens issued for this
            application. In order to activate the application, you have
            to regenerate the consumer secret.

        -   **Regenerate Secret:** Click to regenerate the secret key of
            the OAuth application.

        -   **Delete:** Click to delete the OAuth/OpenID Connect
            Configurations.

    !!! tip
    
        The OAuth client key and client secret are stored in plain text. To
        encrypt the client secret, access token and refresh token, do the
        following:

        Add the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.
    
        ``` toml
        [oauth]
        hash_tokens_and_secrets= true
        ```

    After updating the configuration, make sure to restart the server
    for the changes to be applied on WSO2 IS.


**Related Topics**

See [Configuring OpenID Connect Single
Logout](../../learn/configuring-openid-connect-single-logout) to configure single
logout or session management with OpenID Connect.

See [Delegated Access Control](../../learn/delegated-access-control) for more
information on working with OAuth2/OpenIDConnect. See the following
topics for samples of configuring delegated access control:

-   [OAuth 2.0 with WSO2 Playground](../../learn/oauth-2.0-with-wso2-playground/)
-   [Setting up a SAML2 Bearer Assertion Profile for OAuth
    2.0](../../learn/setting-up-a-saml2-bearer-assertion-profile-for-oauth-2.0)
