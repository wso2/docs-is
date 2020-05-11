# Invoke the OAuth Introspection Endpoint

The OAuth Introspection endpoint is:

``` 
https://localhost:9443/oauth2/introspect
```

This page guides you through invoking the [OAuth Introspection Endpoint](../../../concepts/authorization/introspection). 

-----

{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

----

## Invoking the endpoint for the super tenant

Use the cURL commands given in the following sections to invoke the OAuth introspection endpoint for the super tenant users.

!!! tip
    
    -   For requests that require `CLIENT_ID:CLIENT_SECRET`, use the client ID and client secret of the OAuth service provider you configured above. 

    -   For requests that require `USERNAME:PASSWORD` by default, you can use credentials of any user with `/permission/admin/manage/identity/applicationmgt/view` permissions.
        
        To allow users with other permissions to send validation requests, add the permissions to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
        ``` toml
        [resource_access_control.introspect]
        permissions = ["/permission/admin/manage/identity/applicationmgt/view","/permission/admin/login"]
        ```
    

### Get a valid token

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u <span class="op">&lt;</span>CLIENT_ID<span class="op">&gt;</span>:<span class="op">&lt;</span>CLIENT_SECRET<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;expires_in&quot;</span>:<span class="dv">3600</span>,<span class="st">&quot;access_token&quot;</span>:<span class="st">&quot;fbc4e794-23db-3394-b1e5-f2c3e511d01f&quot;</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Validate the token

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&lt;ACCESS_TOKEN&gt;&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"><span class="ex">curl</span> -k -u admin:admin -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=fbc4e794-23db-3394-b1e5-f2c3e511d01f&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div>
<p>You can pass the token type as an optional parameter in the request (e.g., <code>token_type_hint=access_token </code> or <code>token_type_hint=refresh_token</code>).</p></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;exp&quot;</span>:<span class="dv">1464161608</span>,<span class="st">&quot;username&quot;</span>:<span class="st">&quot;admin@carbon.super&quot;</span>,<span class="st">&quot;active&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;client_id&quot;</span>:<span class="st">&quot;rgfKVdnMQnJSSr_pKFTxj3apiwYa&quot;</span>,<span class="st">&quot;iat&quot;</span>:<span class="dv">1464158008</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Get a valid token with a scope

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u <span class="op">&lt;</span>CLIENT_ID<span class="op">&gt;</span>:<span class="op">&lt;</span>CLIENT_SECRET<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&amp;scope=test1 test2&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&amp;scope=test1 test2&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;access_token&quot;</span>:<span class="st">&quot;34060588-dd4e-36a5-ad93-440cc77a1cfb&quot;</span>,<span class="st">&quot;scope&quot;</span>:<span class="st">&quot;test1 test2&quot;</span>,<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;expires_in&quot;</span>:<span class="dv">3600</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Validate the token

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&lt;ACCESS_TOKEN&gt;&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"><span class="ex">curl</span> -k -u admin:admin -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=334060588-dd4e-36a5-ad93-440cc77a1cfb&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;exp&quot;</span>:<span class="dv">1464161560</span>,<span class="st">&quot;username&quot;</span>:<span class="st">&quot;admin@carbon.super&quot;</span>,<span class="st">&quot;scope&quot;</span>:<span class="st">&quot;test1 test2&quot;</span>,<span class="st">&quot;active&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;client_id&quot;</span>:<span class="st">&quot;rgfKVdnMQnJSSr_pKFTxj3apiwYa&quot;</span>,<span class="st">&quot;iat&quot;</span>:<span class="dv">1464157960</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Invalid token

If the token that you used is invalid, you get the following response:

``` java
{'active':false}
```

### Empty token

If you leave the token parameter empty as shown below, you get the 
following response :

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"> <span class="ex">curl</span> -k -u admin:admin -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{&#39;error&#39;: &#39;Invalid input&#39;}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

-----

## Invoking the endpoint for tenants

Use the following cURL commands given in the following sections to
invoke the OAuth introspection endpoint for tenant users.

!!! tip
    
    -   For requests that require `CLIENT_ID:CLIENT_SECRET`, use the client ID and client secret of the OAuth service provider you configured above. 

    -   For requests that require `USERNAME@TENANT_DOMAIN:PASSWORD` by default, you can use credentials of any user with `/permission/admin/manage/identity/applicationmgt/view` permissions.
        
        To allow users with other permissions to send validation requests, add the permissions to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
        ``` toml
        [resource_access_control.introspect]
        permissions = ["/permission/admin/manage/identity/applicationmgt/view","/permission/admin/login"]
        ```
    

### Get a valid token

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u <span class="op">&lt;</span>CLIENT_ID<span class="op">&gt;</span>:<span class="op">&lt;</span>CLIENT_SECRET<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;expires_in&quot;</span>:<span class="dv">3600</span>,<span class="st">&quot;access_token&quot;</span>:<span class="st">&quot;fbc4e794-23db-3394-b1e5-f2c3e511d01f&quot;</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Validate the token

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><p>You can use any of the request formats given below:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>@<span class="op">&lt;</span>TENAND_DOMAIN<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&lt;ACCESS_TOKEN&gt;&#39;</span> https://localhost:9443/t/<span class="op">&lt;</span>TENANT_DOMAIN<span class="op">&gt;</span>/oauth2/introspect</a></code></pre></div>
</div>
</div>
<p>Or</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k -H &#39;Authorization: Basic &lt;<span class="fu">BASE64ENCODED</span>(USERNAME<span class="at">@TENAND_DOMAIN</span>:PASSWORD)&gt;&#39; -H &#39;Content-<span class="bu">Type</span>: application/x-www-form-urlencoded&#39; -X POST --data &#39;token=&lt;ACCESS_TOKEN&gt;&#39; https:<span class="co">//localhost:9443/t/&lt;TENANT_DOMAIN&gt;/oauth2/introspect</span></a></code></pre></div>
<p>You can pass the token type as an optional parameter in the request (e.g., <code>token_type_hint=access_token </code> or <code>token_type_hint=refresh_token</code>).</p>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">curl -k -u admin<span class="at">@foo</span>.<span class="fu">com</span>:admin -H &#39;Content-<span class="bu">Type</span>: application/x-www-form-urlencoded&#39; -X POST --data &#39;token=fbc4e794-23db-<span class="dv">3394</span>-b1e5-f2c3e511d01f&#39; https:<span class="co">//localhost:9443/t/foo.com/oauth2/introspect</span></a></code></pre></div>
</div>
</div>
</td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">{<span class="st">&quot;active&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;exp&quot;</span>:<span class="dv">1517922556</span>,<span class="st">&quot;iat&quot;</span>:<span class="dv">1517918956</span>,<span class="st">&quot;client_id&quot;</span>:<span class="st">&quot;okaN2IXAsLx5SBH9Los1C6zX1RIa&quot;</span>,<span class="st">&quot;username&quot;</span>:<span class="st">&quot;admin@foo.com”}</span></a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Get a valid token with a scope

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u <span class="op">&lt;</span>CLIENT_ID<span class="op">&gt;</span>:<span class="op">&lt;</span>CLIENT_SECRET<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&amp;scope=test1 test2&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"><span class="ex">curl</span> -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded;charset=UTF-8&#39;</span> -k -d <span class="st">&#39;grant_type=client_credentials&amp;scope=test1 test2&#39;</span> https://localhost:9443/oauth2/token</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;access_token&quot;</span>:<span class="st">&quot;34060588-dd4e-36a5-ad93-440cc77a1cfb&quot;</span>,<span class="st">&quot;scope&quot;</span>:<span class="st">&quot;test1&quot;</span>,<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;expires_in&quot;</span>:<span class="dv">3600</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Validate the token

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><p>You can use any of the request formats given below:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>@<span class="op">&lt;</span>TENANT_DOMAIN<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&lt;ACCESS_TOKEN&gt;&#39;</span> https://localhost:9443/t/<span class="op">&lt;</span>TENANT_DOMAIN<span class="op">&gt;</span>/oauth2/introspect</a></code></pre></div>
</div>
</div>
<p>Or</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k -H &#39;Authorization: Basic &lt;<span class="fu">BASE64ENCODED</span>(USERNAME<span class="at">@TENANT_DOMAIN</span>:PASSWORD)&gt;&#39; -H &#39;Content-<span class="bu">Type</span>: application/x-www-form-urlencoded&#39; -X POST --data &#39;token=&lt;ACCESS_TOKEN&gt;&#39; https:<span class="co">//localhost:9443/t/&lt;TENANT_DOMAIN&gt;/oauth2/introspect</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb3-1" title="1"><span class="ex">curl</span> -k -u admin@foo.com:admin -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=334060588-dd4e-36a5-ad93-440cc77a1cfb&#39;</span> https://localhost:9443/t/foo.com/oauth2/introspect</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">{<span class="st">&quot;scope&quot;</span>:<span class="st">&quot;1 test&quot;</span>,<span class="st">&quot;active&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;token_type&quot;</span>:<span class="st">&quot;Bearer&quot;</span>,<span class="st">&quot;exp&quot;</span>:<span class="dv">1517922663</span>,<span class="st">&quot;iat&quot;</span>:<span class="dv">1517919063</span>,<span class="st">&quot;client_id&quot;</span>:<span class="st">&quot;okaN2IXAsLx5SBH9Los1C6zX1RIa&quot;</span>,<span class="st">&quot;username&quot;</span>:<span class="st">&quot;admin@foo.com&quot;</span>}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Invalid token

If the token that you used is invalid, you get the following response:


**Response**

``` java
{'active':false}
```

### Empty token

If you leave the token parameter empty as shown below, you get the
following response:

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><p>Example:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>@<span class="op">&lt;</span>TENANT_DOMAIN<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&#39;</span> https://localhost:9443/t/<span class="op">&lt;</span>TENANT_DOMAIN<span class="op">&gt;</span>/oauth2/introspect</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"> <span class="ex">curl</span> -k -u admin:admin -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{&#39;error&#39;: &#39;Invalid input&#39;}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

The samples given above only demonstrate how to validate a token obtained for the client credentials grant using the **introspect endpoint**. Similarly, you can [invoke introspection endpoint](#validate-the-token) with a token obtained from any other grant type as well.

----

{!fragments/oauth-transaction-logs.md!}