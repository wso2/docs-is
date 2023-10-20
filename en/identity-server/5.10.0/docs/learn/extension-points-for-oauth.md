# Extension Points for OAuth

This topic includes a list of all the WSO2 Identity Server extension
points related to OAuth and OpenID Connect (OIDC).

### Implementing an OAuth Extension

Any OAuth extension listed below can be implemented, by implementing an
interface or extending an abstract class as defined under each extension
point.  

1. When the implementation is done, package your classes as a .jar file and
place it in the `<IS_HOME>/repository/component/lib` directory.  

2. Next, configure your extension in the
`<IS_HOME>/repository/conf/deployment.toml` file referring to the **Configuration** section of the
respective extension point below. 

3. Restart the server to effect changes.

### OAuth Grant Handler

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td>This extension point is useful when you want to support an OAuth flow that is different from standard grant types. This extension point validates the grant, scopes, and access delegation.</td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth2.token.handlers.grant.AuthorizationGrantHandler</td>
</tr>
<tr class="odd">
<td>Abstract Class</td>
<td>org.wso2.carbon.identity.oauth2.token.handlers.grant.AbstractAuthorizationGrantHandler</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[[oauth.custom_grant_type]] </a>
<a class="sourceLine" id="cb1-3" title="3">name = "name of the grant type" </a>
<a class="sourceLine" id="cb1-3" title="4">handler_class = "full qualified class name of grant handler" </a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Sample</td>
<td>See <a href="../../learn/writing-a-custom-oauth-2.0-grant-type">Writing a Custom OAuth 2.0 Grant Type</a> for a sample implementation of this extension point.</td>
</tr>
</tbody>
</table>

### OAuth Grant Validator

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used to implement a grant validator that validates the grant request sent to the ' <em>/oauth2/token</em> ' endpoint. Request parameters and headers can be validated by implementing this extension point.</p>
<p>If a new grant type is being implemented and defined with a new grant type identifier with the <a 
href="../../learn/extension-points-for-oauth#oauth-grant-handler">OAuth Grant Handler</a> extension, you must also 
implement a grant validator and register
 that against the same grant type identifier from the <em>deployment.toml</em> .</p>
<p>If a supported grant type is to be modified you may implement a grant validator if needed, otherwise supported grant type validators can be reused.</p></td>
</tr>
<tr class="even">
<td>Abstract Class</td>
<td>org.wso2.carbon.identity.oauth2.token.handlers.grant.AbstractValidator</td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[[oauth.custom_grant_type]] </a>
<a class="sourceLine" id="cb1-3" title="3">name = "name of the grant type" </a>
<a class="sourceLine" id="cb1-3" title="4">handler_class = "full qualified class name of grant handler" </a>
<a class="sourceLine" id="cb1-4" title="5">grant_validator = "full qualified class name of grant validator" </a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Client Authentication Handler

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td>This extension point can be used when the client credential authentication needs to be customized when issuing tokens. By default WSO2 Identity Server validates the client id and secret.</td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.core.handler.AbstractIdentityHandler</td>
</tr>
<tr class="odd">
<td>Abstract Class</td>
<td>org.wso2.carbon.identity.oauth2.client.authentication.AbstractOAuthClientAuthenticator</td>
</tr>
<tr class="even">
<td>Default Implementation</td>
<td><p>org.wso2.carbon.identity.oauth2.token.handlers.clientauth.BasicAuthClientAuthHandler</p></td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1">&lt;EventListener type=&quot;org.wso2.carbon.identity.core.handler.AbstractIdentityHandler&quot;  name=&quot;full qualified name of client authentication handler&quot; orderId=&quot;order Id&quot; enable=&quot;true&quot;&gt;
<br>&lt;Property name=&quot;name&quot;&gt;property value&lt;/Property&gt;<br>
&lt;/EventListener&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### OAuth Token Generator

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td>This extension point can be used to change the access token, refresh token, authorization code generation logic as preferred. By default a UUID will be generated as the token value.<br />
</td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth2.token.OauthTokenIssuer<br />
</td>
</tr>
<tr class="odd">
<td>Default Implementation</td>
<td><p>org.wso2.carbon.identity.oauth2.token.OauthTokenIssuerImpl</p></td>
</tr>
<tr class="even">
<td>Other Available Implementations</td>
<td>org.wso2.carbon.identity.oauth2.token.JWTTokenIssuer</td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">token_generator = "full qualified class name of oauth token generator"</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### OAuth Callback Handler

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td>This extension point is provided to verify whether the authenticated user is the rightful owner of the resource. There can be multiple active OAuthCallbackHandler implementations at a given time. In run-time, each and every authorization callback handler is invoked to see whether it can handle the given callback. Then the callback with the highest priority is chosen. After handling the callback, the Identity Server can set whether the given callback is authorized or not.</td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth.callback.OAuthCallbackHandler<br />
</td>
</tr>
<tr class="odd">
<td>Abstract Class</td>
<td>org.wso2.carbon.identity.oauth.callback.AbstractOAuthCallbackHandler<br />
</td>
</tr>
<tr class="even">
<td>Default Implementation</td>
<td>org.wso2.carbon.identity.oauth.callback.DefaultCallbackHandler</td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;OAuthCallbackHandlers&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    ...</a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;OAuthCallbackHandler</span><span class="ot"> class=</span><span class="st">&quot;full qualified class name of the oauth call back handler&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">&lt;Priority&gt;</span>an integer value defining priority<span class="kw">&lt;/Priority&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;Properties&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">            ...</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="kw">&lt;Property</span><span class="ot"> Name=</span><span class="st">&quot;property name&quot;</span><span class="kw">&gt;</span>property value<span class="kw">&lt;/Property&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">            ...</a>
<a class="sourceLine" id="cb1-9" title="9">        <span class="kw">&lt;/Properties&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10">    <span class="er">&lt;</span>/<span class="kw">&lt;OAuthCallbackHandler&gt;</span></a>
<a class="sourceLine" id="cb1-11" title="11"><span class="kw">&lt;/OAuthCallbackHandlers&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Token Persistence Processor

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><div class="content-wrapper">
<p>This extension point can be used to process keys and secrets just before storing them in the database. For example you may need to persist encrypted tokens in the database, in which you can use this extension to encrypt tokens before storing them in the database and to decrypt when retrieving back from database.</p>
<div>
<p>If a token persistence processor is to be engaged, it is <strong>recommended</strong> to configure the respective token processor with the very first configuration of the product. Otherwise already persisted data may need to be migrated to the new format later.</p>
</div>
</div></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth.tokenprocessor.TokenPersistenceProcessor</td>
</tr>
<tr class="odd">
<td>Default Implementation</td>
<td><p><code>              org.wso2.carbon.identity.oauth.tokenprocessor.PlainTextPersistenceProcessor             </code></p>
<p>Use this if you want to store access tokens, refresh tokens, authorization codes, and client secrets as plain text values. By default, WSO2 Identity Server hashes access tokens, refresh tokens, authorization codes, and client secrets using two UUIDs and HMAC-SHA1 hash function, which is known to resist the strongest attack known against HMAC. With the default implementation you can use a valid token until it is either revoked or becomes invalid.</p></td>
</tr>
<tr class="even">
<td>Other Available Implementations</td>
<td><div class="content-wrapper">
<pre><code>org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor</code></pre>
<p>Use this if you want to store access tokens, refresh tokens, authorization codes, and client secrets in an encrypted format using the OEAP (RSA/ECB/OAEPwithSHA1andMGF1Padding) algorithm. With this implementation you can use a valid token until it is either revoked or becomes invalid.
<div class="admonition tip">
<p class="admonition-title">Tip</p>
    <p>OAuth2 token encryption protects OAuth2 access tokens, refresh tokens, consumer secrets, and authorization codes. To enable OAuth token encryption, configure the <code>token_persistance_processor</code> as shown below in the <code>                 &lt;IS_HOME&gt;/repository/conf/deployment.toml        </code> file:
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
    <a class="sourceLine" id="cb1-2" title="2">[oauth.extensions]</a>
    <a class="sourceLine" id="cb1-3" title="3">token_persistance_processor = "org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor"</a></code></pre></div>
    </div>
    </div>
    </div>
    </div>
<p>Once you configure the <code>token_persistance_processor</code> in the <code>  
deployment.toml</code> file, and restart WSO2 Identity Server, RSA encryption with 
<strong>RSA/ECB/OAEPwithSHA1andMGF1Padding</strong> cipher transformation will be enabled by default.</p>
<pre><code>org.wso2.carbon.identity.oauth.tokenprocessor.HashingPersistenceProcessor</code></pre>
<p>Use this if you want to store access tokens, refresh tokens, authorization codes and client secrets as hashed values based on a define hashing algorithm. This implementation provides extra protection to vulnerabilities because a new access token is issued for every access token request. If necessary you can also use a valid token until it is either revoked or becomes invalid.</p>
</p>
<div>
<div class="admonition note">
<p class="admonition-title">Note</p>
    <p>For more information on OAuth token hashing, and for instructions on how to enable OAuth token hashing, see <a href="../../learn/setting-up-oauth-token-hashing">Setting Up OAuth Token Hashing</a>.</p>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">token_persistance_processor = "full qualified class name of the token persistence processor"</a></code></pre></div>   
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### OAuth2 Token Validator

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used if token validation and scope validation needs to be customized when invoking the <a href="../../learn/oauth-token-validation-using-soap-service">token validation endpoint</a> . Token validators can be registered per token type such as ' <em>bearer</em> '.<br />
A default implementation that supports for 'bearer' token type is available.</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth2.validators.OAuth2TokenValidator<br />
</td>
</tr>
<tr class="odd">
<td>Default implementation</td>
<td>org.wso2.carbon.identity.oauth2.validators.DefaultOAuth2TokenValidator<br />
</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[[oauth.custom_token_validator]]</a>
<a class="sourceLine" id="cb1-3" title="3">type = "token type"</a>
<a class="sourceLine" id="cb1-3" title="3">class = "full qualified class name of the oauth2 token validator"</a></code></pre></div>   
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### AuthorizationContext Token Generator

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used to customize the token that can be generated relevant to the authorization context by invoking the <a href="../../learn/oauth-token-validation-using-soap-service">token validation endpoint</a> .<br />
By default, a <a href="../../learn/jwt-token-generation">JWT token generation</a> implementation is supported with following properties encoded to each token validation request.</p>
<ul>
<li>subscriber, applicationName, apiContext, version, tier, and endUserName</li>
<li>Additional properties can be encoded by engaging a <a href="#claims-retriever">claims retriever</a> .</li>
<li>The JWT header and body are base64 encoded separately and concatenated with a dot</li>
</ul>
<p>Finally the token is signed using SHA256 with RSA algorithm.</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth2.authcontext.AuthorizationContextTokenGenerator<br />
</td>
</tr>
<tr class="odd">
<td>Default Implementation</td>
<td>org.wso2.carbon.identity.oauth2.authcontext.JWTTokenGenerator<br />
</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">token_context_generator = "full qualified class name of the authorization context token generator"</a></code></pre></div>
</div>
</div>
<div>
<p>For more infomation on above configuration refer <a href="../../learn/jwt-token-generation">here</a> .</p>
</div>
</div></td>
</tr>
</tbody>
</table>

### Claims Retriever

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used if additional claims or properties needs to be engaged to the <a href="../../learn/jwt-token-generation">JWT token</a> generated in the <a href="../../learn/oauth-token-validation-using-soap-service">token validation response</a> as explained in extension point <a href="#authorizationcontext-token-generator">above</a> .<br />
The default implementation reads user claim values from the default Carbon user store.</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth2.authcontext.ClaimsRetriever<br />
</td>
</tr>
<tr class="odd">
<td>Default Implementation</td>
<td>org.wso2.carbon.identity.oauth2.authcontext.DefaultClaimsRetriever<br />
</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">token_context_claim_retriever = "full qualified class name of the claims retriever"</a></code></pre></div>
</div>
</div>
<div>
<p>For more infomation on above configuration refer <a href="../../learn/jwt-token-generation">here</a> .</p>
</div>
</div></td>
</tr>
</tbody>
</table>

### Response Type Handler

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This is intended to perform access delegation, scope validation and to issue tokens based on token type such as ' <em>code</em> ', ' <em>token</em> ' etc. Multiple implementations can be registered upon the token type.<br />
This extension can be used if a specific token type needs to be supported or customized.</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth2.authz.handlers.ResponseTypeHandler</td>
</tr>
<tr class="odd">
<td>Abstract Class</td>
<td>org.wso2.carbon.identity.oauth2.authz.handlers.AbstractResponseTypeHandler</td>
</tr>
<tr class="even">
<td>Available Implementations</td>
<td><p>org.wso2.carbon.identity.oauth2.authz.handlers.CodeResponseTypeHandler<br />
org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</p></td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[[oauth.custom_response_type]]</a>
<a class="sourceLine" id="cb1-3" title="3">name = "token"</a>
<a class="sourceLine" id="cb1-3" title="4">class = "full qualified class name of the response type handler"</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### UserInfo Access Token Validator

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used if access token validation, when accessing ' <em>/oauth2/userinfo</em> ' resource, needs to be changed.<br />
By default, the access token issued is validated against the token validation service and ' <em>scope</em> ' request parameter is validated to have ' <em>openid</em> ' scope.</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth.user.UserInfoAccessTokenValidator</td>
</tr>
<tr class="odd">
<td>Default implementation</td>
<td>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoISAccessTokenValidator</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.oidc.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">user_info_access_token_validator = "user_info_access_token_validator"</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### UserInfo Claim Retriever

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used if the user claim set returned when invoking ' <em>/oauth2/userinfo</em> ' resource needs to be modified.</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth.user.UserInfoClaimRetriever</td>
</tr>
<tr class="odd">
<td>Default implementation</td>
<td>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoUserStoreClaimRetriever</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.oidc.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">user_info_claim_retriever = "full qualified class name of the userinfo claim retriever"</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### UserInfo Request Validator

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used if the request validation logic, for requests initiated for ' <em>/oauth2/userinfo</em> ', needs to be changed.<br />
</p>
<p>The default behavior is validating the schema and authorization header according to <a href="http://openid.net/specs/openid-connect-basic-1_0-22.html#anchor6">the specification</a> .</p></td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth.user.UserInfoRequestValidator</td>
</tr>
<tr class="odd">
<td>Default implementation</td>
<td>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInforRequestDefaultValidator</td>
</tr>
<tr class="even">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.oidc.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">user_info_request_validator = "full qualified class name of the userinfo endpoint request validator"</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### UserInfo Response Builder

<table>
<tbody>
<tr class="odd">
<td>Usage</td>
<td><p>This extension point can be used if the user info response returned when accessing ' <em>/oauth2/userinfo</em> ' resource needs to be changed.<br />
Implementations supporting both JSON and JWT response formats are available. By default JSON format supported implementation is configured.</td>
</tr>
<tr class="even">
<td>Interface</td>
<td>org.wso2.carbon.identity.oauth.user.UserInfoResponseBuilder</td>
</tr>
<tr class="odd">
<td>Default Implementation</td>
<td>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoJSONResponseBuilder</td>
</tr>
<tr class="even">
<td>Other Available Implementations</td>
<td><p>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoJWTResponse</p></td>
</tr>
<tr class="odd">
<td>Configuration</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode"><a class="sourceLine" id="cb1-1" title="1"><span class="kw"></span></a>
<a class="sourceLine" id="cb1-2" title="2">[oauth.oidc.extensions]</a>
<a class="sourceLine" id="cb1-3" title="3">user_info_response_builder = "full qualified class name of the userinfo response builder"</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

  

  
