# Self-contained Access Tokens

Access tokens are credentials used to access protected resources.
Typically, an access token is a string representing an authorization
issued to the client. The string is usually opaque to the client.

The [OAuth 2.0](https://tools.ietf.org/html/rfc6749) specification does
not mandate any particular implementation for access tokens but it
[mentions](https://tools.ietf.org/html/rfc6749#section-1.4) two possible
strategies.

1.  The access token is an identifier that is hard to guess. For
    example, a randomly generated string of sufficient length, that the
    server handling the protected resource can use to lookup the
    associated authorization information.
2.  The access token self-contains the authorization information in a
    manner that can be verified. For example, by encoding authorization
    information along with a signature into the token.

So by default, a UUID is issued as an access token in WSO2 Identity
Server, which is of the first type above. But, it also can be configured
to issue a self-contained access token, which is of the second type
above.

### Why do we need self-contained access tokens?

When short string identifiers are used as access tokens, a network
request to the Authorization server is required to retrieve the
authorization information associated with each access token. But with
self-contained access tokens there is no need for a network call to
retrieve the authorization information, as it’s self-contained. Thus,
access token processing may be significantly quicker and more efficient.
However, when it comes to token revocation self-contained access tokens
lag, whereas access tokens with string identifiers can be revoked with
almost immediate effect. The common practice is to have a short
expiration time with self-contained access tokens, but that may result
in more refresh token requests at the Authorization server.

### Configuring WSO2 Identity Server to issue self-contained access tokens

WSO2 Identity Server needs to be configured to issue above explained
self-contained JWT access tokens as below.

1.  Add the following configuration property to the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder.
    ``` toml
    [oauth.token_generation]
    access_token_type= "self_contained"
    ```

2.  Restart the server.
3.  Configure an [OAuth service
    provider](../../learn/adding-and-configuring-a-service-provider).
4.  Initiate an access token request to the WSO2 Identity Server, over a
    known [grant type](../../learn/oauth-2.0-grant-types). For example, the
    following cURL command illustrates the syntax of an access token
    request that can be initiated over the [Resource Owner Password
    Credential](../../learn/resource-owner-password-credentials-grant) grant type.

    <table>
    <tbody>
    <tr class="odd">
    <td>cURL command</td>
    <td><div class="content-wrapper">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
    <strong>Request</strong>
    </div>
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: powershell; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: powershell; gutter: false; theme: Confluence"><pre class="sourceCode powershell"><code class="sourceCode powershell"><a class="sourceLine" id="cb1-1" title="1"><span class="fu">curl</span> -u &lt;CLIENT_ID&gt;:&lt;CLIENT_SECRET&gt; -k -d <span class="st">&quot;grant_type=password&amp;username=&lt;USERNAME&gt;&amp;password=&lt;PASSWORD&gt;&quot;</span> -H <span class="st">&quot;Content-Type:application/x-www-form-urlencoded&quot;</span> https://&lt;IS_HOST&gt;:&lt;IS_HTTPS_PORT&gt;/oauth2/token</a></code></pre></div>
    </div>
    </div>
    <ul>
    <li>Navigate to your service provider, expand Inbound Authenitcaion Configurations and expand OAuth/OpenID Connect Configuration.
    <ul>
    <li>Copy the OAuth Client Key as the value for <code>                    &lt;CLIENT_ID&gt;                   </code> .</li>
    <li>Copy the OAuth Client Secret as the value for <code>                    &lt;CLIENT_SECRET&gt;                   </code> .</li>
    </ul></li>
    <li>Enter the username and password of the user you want to get the token as the value for <code>                  &lt;USERNAME&gt;                 </code> and <code>                  &lt;PASSWORD&gt;                 </code> respectively.</li>
    <li>By default, <code>                  &lt;IS_HOST&gt;                 </code> is <code>                  localhost.                 </code> However, if you are using a public IP, the respective IP address or domain needs to be specified.</li>
    <li>By default, <code>                  &lt;IS_HTTPS_PORT&gt;                 </code> has been set to 9443. However, if the port offset has been incremented by <code>                  n                 </code>, the default port value needs to be incremented by <code>                  n                 </code> .</li>
    </ul>
    <p>Example:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -u liXJsel4bJ76arbg3DXC3rU4w60a:wQEYq83njU29ZFbpQWdZsUlXcnga -k -d <span class="st">&quot;grant_type=password&amp;username=testuser2&amp;password=testuser2 -H &quot;</span>Content-<span class="bu">Type</span>:application/x-www-form-urlencoded<span class="st">&quot; https://localhost:9443/oauth2/token</span></a></code></pre></div>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td>Response</td>
    <td><div class="content-wrapper">
    <p>In response, the self-contained JWT access token will be returned as shown below.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
    <strong>Response</strong>
    </div>
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{  </a>
    <a class="sourceLine" id="cb3-2" title="2"><span class="st">&quot;access_token&quot;</span>:<span class="st">&quot;eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6WyJkZDlVM1FGd05GMlBRZnZsSHpUY1NTdU5DMndhIl0sImF6cCI6ImRkOVUzUUZ3TkYyUFFmdmxIelRjU1N1TkMyd2EiLCJpc3</span></a>
    <a class="sourceLine" id="cb3-3" title="3">MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1MTA4MjQ5MzUsImlhdCI6MTUxMDgyMTMzNSwianRpIjoiNDA1YjRkNGUtODUwMS00ZTFhLWExMzgtZWQ4NDU1Y2QxZDQ3I</a>
    <a class="sourceLine" id="cb3-4" title="4">n0.<span class="fu">FCk3Wo8DnFEHb02JCd9BWAHQ48BBt3n2YLQV6TpLMpFvTRNCZJAA</span>-aEH4LrE7oVejvGd7YWGDy2Vzb7x-Bpg7yMYxozUerCkMy_F4Iw_xctgEJ3WF_TTJFhISGNoWlFXspM5d9EQvMvk0JxAovhE0HfXv5GCosGy</a>
    <a class="sourceLine" id="cb3-5" title="5">-0oT7ShQrwZLBIwE9d0ceUcmly42dvDZSsqHDIzPjrFzvpXwbZqq_sRFnh6MHlmmug7t1UCs85caoLhfSweaT0z7ED8P2Tsg_HgmnaaeDapszG6LckeBglqYwbRHy6X6LAcJfAkkwAlqrU0Vu4azsuE8BsLPKMYzu9Ze</a>
    <a class="sourceLine" id="cb3-6" title="6">CoHdLHYdtz-I0yKQ<span class="st">&quot;,</span></a>
    <a class="sourceLine" id="cb3-7" title="7">   <span class="st">&quot;refresh_token&quot;</span>:<span class="st">&quot;5974cdcc-865e-3144-82c5-4f147ddcb519&quot;</span>,</a>
    <a class="sourceLine" id="cb3-8" title="8">   <span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,</a>
    <a class="sourceLine" id="cb3-9" title="9">   <span class="st">&quot;expires_in&quot;</span>:<span class="dv">589</span></a>
    <a class="sourceLine" id="cb3-10" title="10">}</a></code></pre></div>
    </div>
    </div>
    <p>The access token you receive is a signed <a href="https://tools.ietf.org/html/rfc7519">JSON Web Token (JWT)</a> . Use a JWT decoder to decode the access token and you are able to see the payload of the token that includes the following JWT claims:</p>
    <div class="table-wrap">
    <table>
    <thead>
    <tr class="header">
    <th>Claim Name</th>
    <th>Type</th>
    <th>Claim Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>iss</td>
    <td>string</td>
    <td>The issuer of the JWT. The ' <em>Identity Provider Entity Id</em> ' value of the OAuth2/OpenID Connect Inbound Authentication configuration of the <a href="../../learn/adding-and-configuring-an-identity-provider">Resident Identity Provider</a> is returned here.</td>
    </tr>
    <tr class="even">
    <td>aud</td>
    <td>string array</td>
    <td>The token audience list. The client identifier of the OAuth clients that the JWT is intended for, is sent herewith.</td>
    </tr>
    <tr class="odd">
    <td>azp</td>
    <td>string</td>
    <td>The autorized party for which the token is issued to. The client identifier of the OAuth client that the token is issued for, is sent herewith.</td>
    </tr>
    <tr class="even">
    <td>iat</td>
    <td>integer</td>
    <td>The token issue time.</td>
    </tr>
    <tr class="odd">
    <td>exp</td>
    <td>integer</td>
    <td>The token expiration time.</td>
    </tr>
    <tr class="even">
    <td>jti</td>
    <td>string</td>
    <td>Unique identifier for the JWT token.</td>
    </tr>
    </tbody>
    </table>
    </div>
    <div>
    <p>In addition, a user claims can be obtained by an authorized user over this JWT as per <a href="http://openid.net/specs/openid-connect-core-1_0.html#Claims">OpenID Connect claim</a> configurations, by <a href="../../learn/configuring-claims-for-a-service-provider">configuring requested user claims</a> in the OAuth service provider. After configuring the service provider you can run the cURL command given below by providing the required details.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">curl -u &lt;CLIENT_ID&gt;:&lt;CLIENT_SECRET&gt; -k -d <span class="st">&quot;grant_type=password&amp;username=&lt;USERNAME&gt;&amp;password=&lt;PASSWORD&gt;&amp;scope=openid&quot;</span> -H <span class="st">&quot;Content-Type:application/x-www-form-urlencoded&quot;</span> https:<span class="co">//&lt;IS_HOST&gt;:&lt;IS_HTTPS_PORT&gt;/oauth2/token</span></a></code></pre></div>
    </div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>
