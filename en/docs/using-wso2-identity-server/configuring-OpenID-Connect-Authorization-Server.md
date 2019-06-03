# Configuring OpenID Connect Authorization Server

This topic guides you through configuring the OpenID Connect
Authorization Server by modifying the identity.xml file found in the
`         <PRODUCT_HOME>/repository/conf/identity/        ` directory.

The `         <OpenIDConnect>        ` element contains the sub elements
which can be configured accordingly as explained below.

``` xml
<OpenIDConnect>
            <IDTokenBuilder>org.wso2.carbon.identity.openidconnect.DefaultIDTokenBuilder</IDTokenBuilder>
            <!--
                Default value for IDTokenIssuerID, is OAuth2TokenEPUrl.
                If that doesn't satisfy uncomment the following config and explicitly configure the value
            -->
            <IDTokenIssuerID>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/token</IDTokenIssuerID>
            <IDTokenCustomClaimsCallBackHandler>org.wso2.carbon.identity.openidconnect.SAMLAssertionClaimsCallback</IDTokenCustomClaimsCallBackHandler>
            <IDTokenExpiration>3600</IDTokenExpiration>
            <UserInfoEndpointClaimRetriever>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoUserStoreClaimRetriever</UserInfoEndpointClaimRetriever>
            <UserInfoEndpointRequestValidator>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInforRequestDefaultValidator</UserInfoEndpointRequestValidator>
            <UserInfoEndpointAccessTokenValidator>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoISAccessTokenValidator</UserInfoEndpointAccessTokenValidator>
            <UserInfoEndpointResponseBuilder>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoJSONResponseBuilder</UserInfoEndpointResponseBuilder>
            <SkipUserConsent>false</SkipUserConsent>
            <!-- Sign the ID Token with Service Provider Tenant Private Key-->
            <SignJWTWithSPKey>false</SignJWTWithSPKey> 
        </OpenIDConnect>
```

The following sub elements are the important configurations for
configuring the OpenID Connect Authorization Server.

<table>
<thead>
<tr class="header">
<th>Element</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>             &lt;IDTokenIssuerID&gt;            </code></td>
<td>The value of <code>             TokenIssuerID            </code> of the <code>             IDToken            </code> . This should be changed according to the deployment values.</td>
</tr>
<tr class="even">
<td><code>             &lt;IDTokenExpiration&gt;            </code></td>
<td>The expiration value of the <code>             IDToken            </code> in seconds.</td>
</tr>
<tr class="odd">
<td><code>             &lt;IDTokenCustomClaimsCallBackHandler&gt;            </code></td>
<td>This can be used to return extra custom claims with the <code>             IDToken            </code> . You can implement a claims call back handler to push the custom claims to the <code>             IDToken            </code> . This class needs to implement the interface <code>             CustomClaimsCallbackHandler            </code> . You can find the default implementation <a href="https://svn.wso2.org/repos/wso2/carbon/platform/branches/turing/components/identity/org.wso2.carbon.identity.oauth/4.2.0/src/main/java/org/wso2/carbon/identity/openidconnect/SAMLAssertionClaimsCallback.java">here</a> as a reference.</td>
</tr>
<tr class="even">
<td><code>             &lt;UserInfoEndpointClaimRetriever&gt;            </code></td>
<td>Defines the class which builds the claims for the User Info Endpoint's response. This class needs to implement the interface <code>             UserInfoClaimRetriever            </code> . The default implementation can be found <a href="https://svn.wso2.org/repos/wso2/carbon/platform/branches/turing/components/identity/org.wso2.carbon.identity.oauth.endpoint/4.2.0/src/main/java/org/wso2/carbon/identity/oauth/endpoint/user/impl/UserInfoUserStoreClaimRetriever.java">here</a> as a reference.</td>
</tr>
<tr class="odd">
<td><code>             &lt;UserInfoEndpointResponseBuilder&gt;            </code></td>
<td><div class="content-wrapper">
<p>The value that is set to get JWT response from user info endpoint. Change the value as follows:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;UserInfoEndpointResponseBuilder&gt;</span>org.wso2.carbon.identity.oauth.endpoint.user.impl.UserInfoJWTResponse<span class="kw">&lt;/UserInfoEndpointResponseBuilder&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>
