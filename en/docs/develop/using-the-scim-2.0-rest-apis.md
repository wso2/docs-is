# Using the SCIM 2.0 REST APIs

!!! warning     
    This documentation is work in progress!

!!! tip
    Prior to IS 5.4.0, SCIM 2.0 was supported as an external connector that could be plugged in to WSO2 Identity Server. From 5.4.0 onwards, SCIM 2.0 is supported OOTB with WSO2 IS.
    
This REST API implements the SCIM 2.0 Protocol according to the [SCIM
2.0 specification.](https://tools.ietf.org/html/rfc7644) The following
endpoints are supported with WSO2 Identity Server.

## Users endpoint

This endpoint is used to create and manage users and their profile attributes.

#### GET/ Get User by ID

`           GET                       https://localhost/t/{tenant-domain}/scim2/Users/{id                      }          `

This API is used to retrieve users by their user ID. It returns an
`           HTTP 200          ` response if the user is not found.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] https:<span class="co">//localhost:9443/scim2/Users/[user ID]</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>},{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>}],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;roles&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;default&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;Internal/everyone&quot;</span>}],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 10%" />
<col style="width: 68%" />
<col style="width: 6%" />
<col style="width: 8%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
Attribute names of attributes that are to be included in the response.
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd?attributes=userName,name.familyName’</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd?excludedAttributes=userName,name.familyName’</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Valid user is found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid user is not found

#### POST/ Create User

`           POST                       https://localhost/t/{tenant-domain}/scim2/Users                     `

This API creates a user and returns the user details along with the
user's unique ID. It returns `           HTTP 201          ` if the user
is successfully created.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] --data &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:[last name],<span class="st">&quot;givenName&quot;</span>:[name]},<span class="st">&quot;userName&quot;</span>:[username],<span class="st">&quot;password&quot;</span>:[password],<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;primary&quot;</span>:[<span class="kw">true</span>/<span class="kw">false</span>],<span class="st">&quot;value&quot;</span>:[email address],<span class="st">&quot;type&quot;</span>:[home/work]},{<span class="st">&quot;value&quot;</span>:[email address <span class="dv">2</span>],<span class="st">&quot;type&quot;</span>:[home/work]}]}--header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>,<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;password&quot;</span>:<span class="st">&quot;kimwso2&quot;</span>,<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;primary&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>},{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>,<span class="st">&quot;primary&quot;</span>:<span class="kw">true</span>},{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>}],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>,<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 11%" />
<col style="width: 68%" />
<col style="width: 6%" />
<col style="width: 7%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>,<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;password&quot;</span>:<span class="st">&quot;kimwso2&quot;</span>,<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;primary&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>},{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users?attributes=userName,name.familyName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>,<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;password&quot;</span>:<span class="st">&quot;kimwso2&quot;</span>,<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;primary&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>},{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users?excludedAttributes=userName,name.familyName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>A JSON object that contains relevant values for creating a user.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>,<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;password&quot;</span>:<span class="st">&quot;kimwso2&quot;</span>,<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;primary&quot;</span>:<span class="kw">true</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>},{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users</span></a></code></pre></div>
</div>
</div>
<p><br />
</p>
<p><br />
</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 201 - Valid user is created
-   HTTP 401 - Unauthorized
-   HTTP 404 - Invalid user

!!! tip
    
    To create a user in a particular user store, add the
    {domainName}/ prefix in front of the user name.      
    
    ``` java tab="Sample Request"
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"jackson","givenName":"kim"},"userName":"WSO2/kim","password":"kimwso2","emails":[{"primary":true,"value":"kim.jackson@gmail.com","type":"home"},{"value":"kim_j@wso2.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
	```


#### DELETE/ Delete User by ID

`           DELETE                       https://localhost/t/{tenant-domain}/scim2/Users/{id                      }          `

This API deletes a user using the user's unique ID. It returns
`           HTTP 204          ` if the user is successfully deleted.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] -X DELETE https:<span class="co">//localhost:9443/scim2/Users/[user ID] -H &quot;Accept: application/scim+json&quot;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X DELETE https:<span class="co">//localhost:9443/scim2/Users/b228b59d-db19-4064-b637-d33c31209fae -H &quot;Accept: application/scim+json&quot;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">HTTP/<span class="fl">1.</span><span class="dv">1</span> <span class="dv">204</span> No Content</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 10%" />
<col style="width: 68%" />
<col style="width: 6%" />
<col style="width: 8%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 204 - User has been succesfully deleted
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid user is not found

#### GET/ Get Users (User Listing/Filtering)

`           GET                       https://localhost/t/{tenant-domain}/scim2/Users                                `

This API returns users according to the filter, sort and pagination
parameters. It returns an `           HTTP 404          ` response if
the users are not found. Pagination is not supported across user stores
and LDAP multi-attribute group filtering. However, filtering is
supported across multiple user stores.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password]  &#39;https:<span class="co">//localhost:9443/scim2/Users?startIndex=[value]&amp;count=[value]&amp;domain=[value]&amp;filter=[query]&amp;attributes=[attribute names]&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users?startIndex=1&amp;count=10&amp;domain=PRIMARY&amp;filter=userName+sw+ki+and+name.familyName+co+ack&amp;attributes=userName,name.familyName&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>},{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jackson@gmail.com&quot;</span>}],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;roles&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;default&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;Internal/everyone&quot;</span>}],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 10%" />
<col style="width: 68%" />
<col style="width: 6%" />
<col style="width: 8%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users?startIndex=1&amp;count=10&amp;domain=PRIMARY&amp;attributes=userName,name.familyName&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users?startIndex=1&amp;count=10&amp;domain=PRIMARY&amp;filter=userName+sw+ki+and+name.familyName+co+ack&amp;attributes=userName,name.familyName&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>filter</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>A filter expression used to filter users.</p>
<p>Supported filter operators are ‘ <code>                 EQ                </code> ’, ' <code>                 EW'                </code>, ‘ <code>                 CO                </code> ’, ‘ <code>                 SW                </code> ’, and ‘ <code>                 AND                </code> ’.
</p>
<div class="admonition tip">
<p class="admonition-title">Tip</p>
<p>Operators are case-insensitive.</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>startIndex</p>
<p>(optional)</p></td>
<td>The 1-based index of the first query result.</td>
<td>Integer</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>count</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Specifies the desired maximum number of query results per page.</p>
<div class="admonition tip">
<p class="admonition-title">Tip</p>
<p>This parameter is optional but it is recommended to include it in the request.</p>
<p>When this parameter is not included in the request, the response returns all users from a given domain or across all user stores.</p>
<p>When this parameter is set to 0 (zero) or is a negative value, no users are retrieved.</p>
</div>
</div></td>
<td>Integer</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>sortBy</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Specifies the attribute whose value can be used to order the returned responses.</p>
<div class="admonition warning">
<p class="admonition-title">Warning</p>
    <p>This parameter is not supported for this version.</p>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>sortOrder</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>The order in which the "sortBy" parameter is applied. (e.g., ascending order)</p>
<div class="admonition warning">
<p class="admonition-title">Warning</p>
    <p>This parameter is not supported for this version.</p>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>domain</p>
<p>(optional)</p></td>
<td>The name of the user store to which filtering needs to be applied.</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Valid users are found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid users are not found

!!! tip
    
    There are two ways to retrieve users from a particular user store:
    
    1.  **Using the `              domain             ` query parameter**  
        Filter or list users from a particular domain by setting the domain
        query parameter as shown in the example below.
    
        ``` java tab="Sample Request"
        curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users?startIndex=1&count=10&domain=WSO2
    	```

	2.  **Adding the “ `              {domain}/             ` ” prefix in
	    front of the filter value**  
	    Filter or list users from a particular domain by specifying the
	    domain in front of the filter value as shown in the example below.  
	    Note that this feature can only be used with “userName” and “groups”
	    attributes.  
	    If the domain name is specified in both the query parameter and the
	    filter value, an ERROR is thrown if the two values are not equal.

	    ``` java
	    curl -v -k --user admin:admin 'https://localhost:9443/scim2/Users?startIndex=1&count=10&filter=userName+sw+WSO2/ki'
	    ```


#### POST/ Search Users

`           POST                       https://localhost/t/{tenant-domain}/scim2/Users/.search                     `

This API returns users according to the filter, sort and pagination
parameters. It returns an `           HTTP 404          ` response if
the users are not found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] --data &#39;{<span class="st">&quot;schemas&quot;</span>: [<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:SearchRequest&quot;</span>],<span class="st">&quot;attributes&quot;</span>: [attribute names],<span class="st">&quot;filter&quot;</span>: [filter query],<span class="st">&quot;domain&quot;</span>: [domain name],<span class="st">&quot;startIndex&quot;</span>: [value],<span class="st">&quot;count&quot;</span>: [value]}&#39; --header <span class="st">&quot;Content-Type:application/scim+json&quot;</span>  &#39;https:<span class="co">//localhost:9443/scim2/Users/.search&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;schemas&quot;</span>: [<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:SearchRequest&quot;</span>],<span class="st">&quot;attributes&quot;</span>: [<span class="st">&quot;name.familyName&quot;</span>, <span class="st">&quot;userName&quot;</span>],<span class="st">&quot;filter&quot;</span>:<span class="st">&quot;userName sw ki and name.familyName co ack&quot;</span>,<span class="st">&quot;domain&quot;</span>:<span class="st">&quot;PRIMARY&quot;</span>,<span class="st">&quot;startIndex&quot;</span>: <span class="dv">1</span>,<span class="st">&quot;count&quot;</span>: <span class="dv">10</span>}&#39; --header <span class="st">&quot;Content-Type:application/scim+json&quot;</span>  &#39;https:<span class="co">//localhost:9443/scim2/Users/.search&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 77%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>This is a JSON object that contains relevant values used to search for a user.</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Valid users are found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid users are not found

#### PATCH/ Update User

`            PATCH                         https://localhost/t/{tenant-domain}/scim2/Users/{id                        }           `

This API updates user details and returns the updated user details using
a PATCH operation. It returns an `            HTTP 404           `
response if the user is not found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:[operation],<span class="st">&quot;value&quot;</span>:{[attributeName]:[attribute value]}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/[user ID]</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;nickName&quot;</span>:<span class="st">&quot;shaggy&quot;</span>}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>},{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jack@gmail.com&quot;</span>}],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T14:46:07Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;nickName&quot;</span>:<span class="st">&quot;shaggy&quot;</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;roles&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;default&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;Internal/everyone&quot;</span>}],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
<p><br />
</p>
<p><br />
</p>
<p><br />
</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;nickName&quot;</span>:<span class="st">&quot;shaggy&quot;</span>}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd?attributes=userName,name.familyName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;nickName&quot;</span>:<span class="st">&quot;shaggy&quot;</span>}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd?excludedAttributes=userName,name.familyName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td>This is a JSON object that contains relevant values used to search for a user.</td>
<td><br />
</td>
<td><br />
</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - User has been successfully updated
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid user is not found

  

  

#### PUT/ Update User

`            PUT                         https://localhost/t/{tenant-domain}/scim2/Users/{id                        }                       `

This API updates user details and returns the updated user details using
a PUT operation. It returns an `            HTTP 404           `
response if the user is not found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] -X PUT -d &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:[last name],<span class="st">&quot;givenName&quot;</span>:[name]},<span class="st">&quot;userName&quot;</span>:[username],<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;value&quot;</span>:[email address],<span class="st">&quot;type&quot;</span>:[home/work]},{<span class="st">&quot;value&quot;</span>:[email address <span class="dv">2</span>],<span class="st">&quot;type&quot;</span>:[home/work]}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/[user ID]</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PUT -d &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>,<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>},{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jack@gmail.com&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;emails&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;work&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim_j@wso2.com&quot;</span>},{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;home&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;kim.jack@gmail.com&quot;</span>}],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-15T14:55:23Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T14:24:00Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;roles&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;default&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;Internal/everyone&quot;</span>}],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;jackson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c8c821ba-1200-495e-a775-79b260e717bd&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
<p><br />
</p>
<p><br />
</p>
<p><br />
</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;nickName&quot;</span>:<span class="st">&quot;shaggy&quot;</span>}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd?attributes=userName,name.familyName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;nickName&quot;</span>:<span class="st">&quot;shaggy&quot;</span>}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Users/c8c821ba-1200-495e-a775-79b260e717bd?excludedAttributes=userName,name.familyName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td>This is a JSON object that contains relevant values used to search for a user.</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - User has been successfully updated
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid users are not found

  

## Groups endpoint

This endpoint is used to create and manage groups and group members.

!!! info
	From WSO2 5.8.0 onwards, new configurations have been added to support filtering users and groups only from the PRIMARY domain. If these properties are enabled, the responses recieved for the users endpoint and groups endpoint will change. For more information, see [behavioral change #4 in the Migration Guide: Understanding What Has Changed topic](../../setup/understanding-what-has-changed#behavioral-changes).

#### GET/ Group by ID

`           GET                       https://localhost/t/{tenant-domain}/scim2/Groups/{id                      }          `

This API returns the group details of a particular group using its
unique ID. It returns an `           HTTP 200          ` response if the
group is found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password]  https:<span class="co">//localhost:9443/scim2/Groups/[group ID]</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
<p><br />
</p>
<p><br />
</p>
<p><br />
</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36?attributes=displayName’</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36?excludedAttributes=displayName’</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Valid group is found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid group is not found

#### POST/ Create Group

`           POST                       https://localhost/t/{tenant-domain}/scim2/Groups                                `

This API creates a group and returns the details of the created group
including its unique ID. It returns an `           HTTP 201          `
response if the group is successfully created.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] --data &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;displayName&quot;</span>: [group name], <span class="st">&quot;members&quot;</span>: [{<span class="st">&quot;value&quot;</span>: [user ID],<span class="st">&quot;$ref&quot;</span>:[ref url],<span class="st">&quot;display&quot;</span>: [user name] }]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;Group&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups?attributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups?excludedAttributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>This is a JSON object that contains relevant values used to create a group.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 201 - Valid group is created
-   HTTP 401 - Unauthorized
-   HTTP 404 - Group is not found

#### POST/ Create Group

`           POST                       https://localhost/t/{tenant-domain}/scim2/Groups                                `

This API creates a group and returns the details of the created group
including its unique ID. It returns an `           HTTP 201          `
response if the group is successfully created.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] --data &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;displayName&quot;</span>: [group name], <span class="st">&quot;members&quot;</span>: [{<span class="st">&quot;value&quot;</span>: [user ID],<span class="st">&quot;$ref&quot;</span>:[ref url],<span class="st">&quot;display&quot;</span>: [user name] }]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;Group&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups?attributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups?excludedAttributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>This is a JSON object that contains relevant values used to create a group.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 201 - Valid group is created
-   HTTP 401 - Unauthorized
-   HTTP 404 - Invalid group

!!! tip
    
    To create a user in a particular user store, add the
    {domainName}/ prefix in front of the user name as shown in the example
    below.
        
    ``` java tab="Sample Request"
    curl -v -k --user admin:admin --data '{"displayName":"WSO2DOMAIN/manager"}' --header "Content-Type:application/json" https://localhost:9443/scim2/Groups
	```


#### DELETE/ Delete Group By ID

`           DELETE                       https://localhost/t/{tenant-domain}/scim2/Groups/{id                      }          `

This API deletes a particular group using its unique ID. It returns an
`           HTTP 204          ` reponse if the group is successfully
deleted.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] -X DELETE https:<span class="co">//localhost:9443/scim2/Groups/[group ID] -H &quot;Accept: application/json&quot;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X DELETE https:<span class="co">//localhost:9443/scim2/Groups/0d32c19e-7a74-4c22-b1ad-1d21317d5b04 -H &quot;Accept:application/json&quot;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">HTTP/<span class="fl">1.</span><span class="dv">1</span> <span class="dv">204</span> No Content</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 204 - Valid group has been successfully deleted.
-   HTTP 401 - Unauthorized
-   HTTP 404 - Invalid group

#### GET/ Filter Groups

`           GET                       https://localhost/t/{tenant-domain}/scim2/Groups                                `

This API deletes a particular group using its unique ID. It returns an
`           HTTP 204          ` reponse if the group is successfully
deleted.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] &#39;https:<span class="co">//localhost:9443/scim2/Groups?startIndex=[value]&amp;count=[value]&amp;filter=[query]&amp;attributes=[attribute names]&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups?filter=displayName+eq+manager&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>},{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups?filter=displayName+eq+manager&amp;attributes=displayName&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups?filter=displayName+eq+manager&amp;excludedAttributes=displayName&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>filter</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>A filter expression used to filter users.</p>
<p>Supported filter operators are ‘ <code>                  EQ                 </code> ’, ' <code>                  EW'                 </code>, ‘ <code>                  CO                 </code> ’, ‘ <code>                  SW                 </code> ’, and ‘ <code>                  AND                 </code> ’.</p>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>Operators are case-insensitive.</p>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>startIndex</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>The 1-based index of the first query result.</p>
<div class="admonition warning">
<p class="admonition-title">Warning</p>
<p>Pagination is not supported.</p>
</div>
</div></td>
<td>Integer</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>count</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Specifies the desired maximum number of query results per page.</p>
<div class="admonition warning">
<p class="admonition-title">Warning</p>
<p>Pagination is not supported.</p>
</div>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>When this parameter is not included in the request, the response returns all groups from the given domain or across all user stores. When the count is zero or any value less than zero, no groups are returned.</p>
</div>
</div></td>
<td>Integer</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>sortBy</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Specifies the attribute whose value can be used to order the returned responses.</p>
<div class="admonition warning">
<p class="admonition-title">Warning</p>
<p>This parameter is not supported for this version.</p>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>sortOrder</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>The order in which the "sortBy" parameter is applied. (e.g., ascending order)</p>
<div class="admonition warning">
<p class="admonition-title">Warning</p>
<p>This parameter is not supported for this version.</p>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>domain</p>
<p>(optional)</p></td>
<td>The name of the user store to which filtering needs to be applied.</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 204 - Valid group has been successfully deleted.
-   HTTP 401 - Unauthorized
-   HTTP 404 - Invalid group

!!! tip
    
    There are two ways to retrieve users from a particular user store:
    
    1.  **Using the `              domain             ` query parameter**  
        Setting the domain parameter enables both filtering and listing
        groups in a specified user store.
    
        **Sample Request**
    
        ``` java
        curl -v -k --user admin:admin 'https://localhost:9443/scim2/Groups?startIndex=3&count=20&domain=WSO2’
    	```

	2.  **Adding the “ `              {domain}/             ` ” prefix in
	    front of the filter value**  
	    Filter or list users from a particular domain by specifying the
	    domain in front of the filter value as shown in the example below.  
	    Note that this feature can only be used with "displayName",
	    "members.display" and "members.value" attributes.  
	    If the domain name is specified in both the query parameter and the
	    filter value, an ERROR is thrown if the two values are not equal.

	    ``` java
	    curl -v -k --user admin:admin 'https://localhost:9443/scim2/Groups?startIndex=2&count=20&filter=displayName+eq+WSO2/manager'
	    ```


#### POST/ Search Groups

`           POST                       https://localhost/t/{tenant-domain}/scim2/Groups/.search                     `

This API returns groups according to the specified filter, sort and
pagination parameters. It returns an `           HTTP 404          `
response if the groups are not found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] --data &#39;{<span class="st">&quot;schemas&quot;</span>: [],<span class="st">&quot;startIndex&quot;</span>: [value], <span class="st">&quot;filter&quot;</span>: [query]}&#39; --header <span class="st">&quot;Content-Type:application/scim+json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/.search</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;schemas&quot;</span>: [<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:SearchRequest&quot;</span>],<span class="st">&quot;startIndex&quot;</span>: <span class="dv">1</span>, <span class="st">&quot;filter&quot;</span>: <span class="st">&quot;displayName eq manager&quot;</span>}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/.search</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>},{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>This is a JSON object that contains relevant values used to search for a group.</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Valid groups are found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Groups are not found

#### PATCH/ Update Group

`           PATCH                       https://localhost/t/{tenant-domain}/scim2/Groups/{id                      }          `

This API updates the group details and returns the updated group details
using a PATCH operation. It returns an `           HTTP 404          `
response if the group is not found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>: [operation],<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>: [name],<span class="st">&quot;$ref&quot;</span>: [ref],<span class="st">&quot;value&quot;</span>: [member user ID] }] } }]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/[group ID]</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>: <span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;$ref&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>,<span class="st">&quot;value&quot;</span>: <span class="st">&quot;81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>}]}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:51:45Z&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>},{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>,<span class="st">&quot;$ref&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
<p><br />
</p>
<p><br />
</p>
<p><br />
</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>: <span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;$ref&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>,<span class="st">&quot;value&quot;</span>: <span class="st">&quot;81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>}]}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36?attributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PATCH -d &#39;{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:PatchOp&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;op&quot;</span>:<span class="st">&quot;add&quot;</span>,<span class="st">&quot;value&quot;</span>:{<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>: <span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;$ref&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>,<span class="st">&quot;value&quot;</span>: <span class="st">&quot;81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>}]}}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36?excludedAttributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td>This is a JSON object that contains relevant values used to search for a user.</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Group has been successfully updated
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid group is not found

#### PUT/ Update Group

`           PUT                       https://localhost/t/{tenant-domain}/scim2/Groups/{id                      }                     `

This API updates the group details and returns the updated group details
using a PUT operation. It returns an `           HTTP 404          `
reponse if the group is not found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user[username]:[password] -X PUT -d &#39;{<span class="st">&quot;displayName&quot;</span>:[group name],<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;value&quot;</span>:[user ID],<span class="st">&quot;display&quot;</span>:[user&#39;s name]}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/[group ID]</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PUT -d &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>,<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>,<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2018-08-16T15:27:42Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2018-08-16T15:42:56Z&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>],<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;a43fe003-d90d-43ca-ae38-d2332ecc0f36&quot;</span>}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Path</td>
<td><p>id</p>
<p>(required)</p></td>
<td><div class="content-wrapper">
<p>Unique ID of the resource type.</p>
<p><br />
</p>
<p><br />
</p>
<p><br />
</p>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Query</td>
<td><p>attributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be included in the response.</p>
<p>All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin -X PUT -d &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>,<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>,<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36?attributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>Query</td>
<td><p>excludedAttributes</p>
<p>(optional)</p></td>
<td><div class="content-wrapper">
<p>Attribute names of attributes that are to be exclused from the response.<br />
All the of the users dialect and meta dialect are supported. For more information about this parameter, see <a href="https://tools.ietf.org/html/rfc7644#section-3.4.2.5">the SCIM 2.0 specification</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin -X PUT -d &#39;{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;manager&quot;</span>,<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;value&quot;</span>:<span class="st">&quot;b3c07363-f0ed-4798-97f9-0cb26d9d79c0&quot;</span>,<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}&#39; --header <span class="st">&quot;Content-Type:application/json&quot;</span> https:<span class="co">//localhost:9443/scim2/Groups/a43fe003-d90d-43ca-ae38-d2332ecc0f36?excludedAttributes=displayName</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td>This is a JSON object that contains relevant values used to search for a user.</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Group has been successfully updated
-   HTTP 401 - Unauthorized
-   HTTP 404 - Valid group is not found

## Me Endpoint 
This endpoint is used to create and manage the currently authenticated user. 

#### POST/ Create Users in Bulk
`POST https://localhost/t/{tenant-domain}/scim2/Me`

This API is used to register a user anonymously. It returns an HTTP 201 response if the user is successfully created. These endpoints are secured by default. Therefore, to invoke this API anonymously, set the secured property for the SCIM2 resource in the identity.xml file to false. For more information, see [Authenticating and Authorizing REST APIs](../../develop/authenticating-and-authorizing-rest-apis). 

```java tab="Request"
curl -v -k  --data '{"schemas":[],"name:{"familyName":[last name],"givenName":[name]},"userName":[username],"password":[password],"emails":[{"primary":[true/false],"value":[email address],"type":[home/work]},{"value":[email address 2],"type":[home/work]}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":[employee ID],"manager":{"value":[manager's name]}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

```java tab="Sample cURL"
curl -v -k --data '{"schemas":[],"name":{"familyName":"Johnson","givenName":"Alex"},"userName":"alex","password":"alexwso2","emails":[{"primary":true,"value":"alex.j@gmail.com","type":"home"},{"value":"alex_j@wso2.com","type":"work"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

```java tab="Response"
{"emails":[{"type":"home","value":"alex.j@gmail.com","primary":true},{"type":"work","value":"alex_j@wso2.com"}],"meta":{"created":"2018-08-17T10:34:29Z","location":"https://localhost:9443/scim2/Users/008bba85-451d-414b-87de-c03b5a1f4217","lastModified":"2018-08-17T10:34:29Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"manager":{"value":"Taylor"},"employeeNumber":"123A"},"name":{"familyName":"Johnson","givenName":"Alex"},"id":"008bba85-451d-414b-87de-c03b5a1f4217","userName":"alex"}
```

**Parameters**
<table>
	<thead>
		<tr>
		<th>Type</th>
		<th>Name</th>
		<th>Description</th>
		<th>Schema</th>
		<th>Default</th>
	</tr>
	</thead>
	<tbody>
		<tr>
			<td>Query</td>
			<td>attributes (optional)</td>
			<td>
				<p>Attribute names of attributes that are to be included in the response. When this parameter is included in the request, the response returns only the attributes that are specified in the request. All the attributes of the users dialect and meta dialect are supported. For more information about this parameter, see the SCIM 2.0 specification.</p>
				<details class="example">
    			<summary>Click to see the Sample Request</summary>
    			<p><code>curl -v -k --data '{"schemas":[],"name":{"familyName":"Johnson","givenName":"Alex"},"userName":"alex","password":"alexwso2","emails":[{"primary":true,"value":"alex.j@gmail.com","type":"home"},{"value":"alex_j@wso2.com","type":"work"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me?attributes=userName,name.familyName</code>
    			</p></details>
			</td>
			<td>String</td>
			<td>-</td>
		</tr>
		<tr>
			<td>Query</td>
			<td>excludedAttributes (optional)</td>
			<td>
				<p>Attribute names of attributes that are to be excluded from the response. When this parameter is included in the request, the response returns all attributes except the excluded attributes that are specified in the request. All the attributes of the users dialect and meta dialect are supported. For more information about this parameter, see the SCIM 2.0 specification.</p>
				<details class="example">
    			<summary>Click to see the Sample Request</summary>
    			<p><code>curl -v -k --data '{"schemas":[],"name":{"familyName":"Johnson","givenName":"Alex"},"userName":"alex","password":"alexwso2","emails":[{"primary":true,"value":"alex.j@gmail.com","type":"home"},{"value":"alex_j@wso2.com","type":"work"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me?excludedAttributes=userName,name.familyName</code>
    			</p></details>
			</td>
			<td>String</td>
			<td>-</td>
		</tr>
		<tr>
			<td>Body</td>
			<td>body (optional)</td>
			<td>A JSON object that contains relevant values for creating a user.</td>
			<td>String</td>
			<td>-</td>
		</tr>
	</tbody>
</table>

**Responses**

-	HTTP 201 - Valid user is created
-	HTTP 401 - Unauthorized
-	HTTP 404 - Invalid user

### DELETE/ Delete Me

`DELETE https://localhost/t/{tenant-domain}/scim2/Me`

This API is used to delete the currently authenticated user. It returns `HTTP 204` if the user is successfully deleted.

```curl tab="Request"
curl -v -k --user  [username]:[password] -X DELETE https://localhost:9443/scim2/Me
```

```curl tab="Sample cURL"
curl -v -k --user alex:alexwso2 -X DELETE https://localhost:9443/scim2/Me
```

```curl tab="Response"
HTTP/1.1 204 NOT IMPLEMENTED
```

<table>
	<thead>
		<tr>
			<th>Type</th>
			<th>Name</th>
			<th>Description</th>
			<th>Schema</th>
			<th>Default Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Path</td>
			<td>id (required)</td>
			<td>Unique ID of the resource type.</td>
			<td>String</td>
			<td>-</td>
		</tr>
	</tbody>
</table>

**Response** 
-	HTTP 204 - User has been succesfully deleted
-	HTTP 401 - Unauthorized
-	HTTP 404 - Valid user is not found

### GET/ Get Me
`GET https://localhost/t/{tenant-domain}/scim2/Me`

This API returns the user details of the currently authenticated user. These endpoints are secured by default. Therefore, to invoke this API anonymously, set the secured property for the SCIM2 resource in the identity.xml file to false. For more information, see [Authenticating and Authorizing REST APIs](../../develop/authenticating-and-authorizing-rest-apis).

```cur tab="Request"
curl -v -k --user [username]:[password] https://localhost:9443/scim2/Me
```

```curl tab="Sample cURL"
curl -v -k --user kim:kimwso2 https://localhost:9443/scim2/Me
```

```curl tab="Response"
{"schemas":["urn:ietf:params:scim:schemas:core:2.0:ResourceType"],"resourceType":[{"schema":"urn:ietf:params:scim:schemas:core:2.0:User","endpoint":"/Users","meta":{"location":"https://localhost:9443/scim2/ResourceType/User","resourceType":"ResourceType"},"name":"User","description":"User Account","schemaExtensions":{"schema":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User","required":false},"id":"User"},{"schema":"urn:ietf:params:scim:schemas:core:2.0:Group","endpoint":"/Groups","meta":{"location":"https://localhost:9443/scim2/ResourceType/Group","resourceType":"ResourceType"},"name":"Group","description":"Group","id":"Group"}]}
```

**Parameters**
None

**Responses**

-	HTTP 200 - Schema is found
-	HTTP 401 - Unauthorized
-	HTTP 404 - Schema is not found

### PATCH/ Update Me

`PATCH https://localhost/t/{tenant-domain}/scim2/Me`

This API uses a PATCH operation to update user details Returns `HTTP 404` if the user is not found.

```curl tab="Request"
curl -v -k --user [username]:[password] -X PATCH -d '{"schemas":[],"Operations":[{"op":[operation],"value":{[attributeName]:[attribute value]}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

```curl tab="Sample cURL"
curl -v -k --user kim:kimwso2 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"shaggy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

```curl tab="Response"
{"emails":[{"type":"work","value":"jackson_k@wso2.com"},{"type":"home","value":"jacksonk@gmail.com"}],"meta":{"created":"2018-08-16T17:19:43Z","location":"https://localhost:9443/scim2/Users/f60e6ddd-8d04-411f-92b9-c7ba95fb0fa9","lastModified":"2018-08-17T11:43:34Z","resourceType":"User"},"nickName":"shaggy","schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"manager":{"value":"Taylor"},"employeeNumber":"123A"},"roles":[{"type":"default","value":"manager,Internal/everyone,admin"}],"name":{"givenName":"Kim","familyName":"JacksonJohn"},"groups":[{"display":"manager","value":"a43fe003-d90d-43ca-ae38-d2332ecc0f36"}],"id":"f60e6ddd-8d04-411f-92b9-c7ba95fb0fa9","userName":"kim"}
```

**Parameters**

<table>
	<thead>
		<thead>
			<tr>		
			<th>Type</th>
			<th>Name</th>
			<th>Description</th>
			<th>	<td>Schema</th>
			<th>Default Value</th>
			</tr>
		</thead>
	</thead>
	<tbody>
		<tr>
			<td>Query</td>
			<td>attributes (optional)</td>
			<td>
				<p>Attribute names of attributes that are to be included in the response. When this parameter is included in the request, the response returns only the attributes that are specified in the request. All the attributes of the users dialect and meta dialect are supported. For more information about this parameter, see the SCIM 2.0 specification.</p>
				<p>
				<details class="example">
    			<summary>Click to see the sample request</summary>
    			<p><code>curl -v -k --user kim:kimwso2 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"shaggy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me?attributes=userName,name.familyName</code></p>
				</details>
				</p>
			</td>
			<td>String</td>
			<td>-</td>
		</tr>
		<tr>
			<td>Query</td>
			<td>excludedAttributes (optional)</td>
			<td>
				<p>Attribute names of attributes that are to be excluded from the response. When this parameter is included in the request, the response returns all attributes except the excludedattributes that are specified in the request. All the attributes of the users dialect and meta dialect are supported. For more information about this parameter, see the SCIM 2.0 specification.</p>
				<p>
				<details class="example">
    			<summary>Click to see the sample request</summary>
    			<p><code>curl -v -k --user kim:kimwso2 -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp"],"Operations":[{"op":"add","value":{"nickName":"shaggy"}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me?excludedAttributes=userName,name.familyName</code></p>
				</details>
				</p>
			</td>
			<td>String</td>
			<td>-</td>
		</tr>
		<tr>
			<td>Body</td>
			<td>body (optional)</td>
			<td>This is a JSON object that contains relevant values used to search for a user.</td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>

**Response**

-	HTTP 200 - User has been successfully updated
-	HTTP 401 - Unauthorized
-	HTTP 404 - Valid user is not found 

### PUT/ Update User

`PUT https://localhost/t/{tenant-domain}/scim2/Me`

This API uses a PUT operation to update user details. It returns `HTTP 404` if the user is not found.

``` curl tab="Request"
curl -v -k --user [username]:[password] -X PUT -d '{"schemas":[],"name":{"familyName":[last name],"givenName":[name]},"emails":[{"primary":[true/false],"value":[email address],"type":[home/work]},{"value":[email address 2],"type":[home/work]}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

```curl tab="Sample cURL"
curl -v -k --user kim:kimwso2 -X PUT -d '{"schemas":[],"name":{"familyName":"JacksonJohn","givenName":"Kim"},"userName":"kim","emails":[{"primary":true,"value":"jacksonk@gmail.com","type":"home"},{"value":"jackson_k@wso2.com","type":"work"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Me
```

```curl tab="Response"
{"emails":[{"type":"work","value":"jackson_k@wso2.com"},{"type":"home","value":"jacksonk@gmail.com"}],"meta":{"created":"2018-08-16T17:19:43Z","location":"https://localhost:9443/scim2/Users/f60e6ddd-8d04-411f-92b9-c7ba95fb0fa9","lastModified":"2018-08-16T17:43:17Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"manager":{"value":"Taylor"},"employeeNumber":"123A"},"roles":[{"type":"default","value":"manager,Internal/everyone,admin"}],"name":{"givenName":"Kim","familyName":"JacksonJohn"},"groups":[{"display":"manager","value":"a43fe003-d90d-43ca-ae38-d2332ecc0f36"}],"id":"f60e6ddd-8d04-411f-92b9-c7ba95fb0fa9","userName":"kim"}
```

**Parameters**

<table>
	<thead>
		<tr>		
			<th>Type</th>
			<th>Name</th>
			<th>Description</th>
			<th>Schema</th>
			<th>Default Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Query</td>
			<td>attributes (optional)</td>
			<td>
				<p>Attribute names of attributes that are to be included in the response. When this parameter is included in the request, the response returns only the attributes that are specified in the request. All the attributes of the users dialect and meta dialect are supported. For more information about this parameter, see the SCIM 2.0 specification.</p>
				<p>
					<details class="example">
    				<summary>Click to see the sample request</summary>
    				<p><code>curl -v -k --user kim:kimwso2 -X PUT -d '{"schemas":[],"name":{"familyName":"JacksonJohn","givenName":"Kim"},"userName":"kim","emails":[{"primary":true,"value":"jacksonk@gmail.com","type":"home"},{"value":"jackson_k@wso2.com","type":"work"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Meattributes=userName,name.familyName</code></p>
					</details>
				</p>
			</td>
			<td>String</td>
			<td>-</td>
		</tr>
		<tr>
			<td>Query</td>
			<td>excludedAttributes (optional)</td>
			<td>
				<p>Attribute names of attributes that are to be excluded from the response. When this parameter is included in the request, the response returns all attributes except the excluded attributes that are specified in the request. All the attributes of the users dialect and meta dialect are supported. For more information about this parameter, see the SCIM 2.0 specification.</p>
				<p>
					<details class="example">
    				<summary>Click to see the sample request</summary>
    				<p><code>curl -v -k --user kim:kimwso2 -X PUT -d '{"schemas":[],"name":{"familyName":"JacksonJohn","givenName":"Kim"},"userName":"kim","emails":[{"primary":true,"value":"jacksonk@gmail.com","type":"home"},{"value":"jackson_k@wso2.com","type":"work"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber":"123A","manager":{"value":"Taylor"}}}' --header "Content-Type:application/json" https://localhost:9443/scim2/MeexcludedAttributes=userName,name.familyName</code></p>
					</details>					
				</p>
			</td>
			<td>String</td>
			<td>-</td>
		</tr>
		<tr>
			<td>Body</td>
			<td>body (optional)</td>
			<td>This is a JSON object that contains relevant values used to search for a user.</td>
			<td>String</td>
			<td>-</td>
		</tr>
	</tbody>
</table>

**Responses**

-	HTTP 200 - User has been successfully updated
-	HTTP 401 - Unauthorized
-	HTTP 404 - Valid users are not found



## Bulk Endpoint 

#### POST/ Create Users in Bulk

`           POST                       https://localhost/t/{tenant-domain}/scim2/Bulk                     `

This API is used to create multiple users at once. It returns an
`           HTTP 201          ` response if the users are successfully
created.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] --data &#39;{<span class="st">&quot;failOnErrors&quot;</span>: [value],<span class="st">&quot;schemas&quot;</span>:[],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;method&quot;</span>: [request type],<span class="st">&quot;path&quot;</span>: [end point],<span class="st">&quot;bulkId&quot;</span>: [bulk id],<span class="st">&quot;data&quot;</span>: [input user details] }] }&#39; --header <span class="st">&quot;Content-Type:application/scim+json&quot;</span> https:<span class="co">//localhost:9443/scim2/Bulk</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin --data &#39;{<span class="st">&quot;failOnErrors&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:BulkRequest&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;method&quot;</span>: <span class="st">&quot;POST&quot;</span>,<span class="st">&quot;path&quot;</span>: <span class="st">&quot;/Users&quot;</span>,<span class="st">&quot;bulkId&quot;</span>: <span class="st">&quot;qwerty&quot;</span>,<span class="st">&quot;data&quot;</span>:{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>],<span class="st">&quot;userName&quot;</span>: <span class="st">&quot;Kris&quot;</span>,<span class="st">&quot;password&quot;</span>:<span class="st">&quot;krispass&quot;</span>}},{<span class="st">&quot;method&quot;</span>: <span class="st">&quot;POST&quot;</span>,<span class="st">&quot;path&quot;</span>: <span class="st">&quot;/Users&quot;</span>,<span class="st">&quot;bulkId&quot;</span>:<span class="st">&quot;ytrewq&quot;</span>,<span class="st">&quot;data&quot;</span>:{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;Jesse&quot;</span>,<span class="st">&quot;password&quot;</span>:<span class="st">&quot;jessepass&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>:{<span class="st">&quot;employeeNumber&quot;</span>: <span class="st">&quot;11250&quot;</span>,<span class="st">&quot;manager&quot;</span>: {<span class="st">&quot;value&quot;</span>: <span class="st">&quot;bulkId:qwerty&quot;</span>}}}}]}&#39; --header <span class="st">&quot;Content-Type:application/scim+json&quot;</span> https:<span class="co">//localhost:9443/scim2/Bulk</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:BulkResponse&quot;</span>],<span class="st">&quot;Operations&quot;</span>:[{<span class="st">&quot;bulkId&quot;</span>:<span class="st">&quot;qwerty&quot;</span>,<span class="st">&quot;method&quot;</span>:<span class="st">&quot;POST&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1&quot;</span>,<span class="st">&quot;status&quot;</span>:{<span class="st">&quot;code&quot;</span>:<span class="dv">201</span>}},{<span class="st">&quot;bulkId&quot;</span>:<span class="st">&quot;ytrewq&quot;</span>,<span class="st">&quot;method&quot;</span>:<span class="st">&quot;POST&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Users/b489dacc-fc89-449c-89f6-7acc37422031&quot;</span>,<span class="st">&quot;status&quot;</span>:{<span class="st">&quot;code&quot;</span>:<span class="dv">201</span>}}]}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

<table style="width:100%;">
<colgroup>
<col style="width: 4%" />
<col style="width: 9%" />
<col style="width: 75%" />
<col style="width: 5%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th>Type</th>
<th>Name</th>
<th>Description</th>
<th>Schema</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Body</td>
<td><p>body</p>
<p>(optional)</p></td>
<td>This is a JSON object that contains relevant values used to create the users.</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>

**Responses**

-   HTTP 200 - Valid users are created
-   HTTP 401 - Unauthorized
-   HTTP 404 - Invalid users

## ResourceType Endpoint

#### GET/ Get Resource Types

`           GET                       https://localhost/t/{tenant-domain}/scim2/ResourceType                     `

This API lists and returns metadata about resource types. It returns an
`           HTTP 200          ` response if the schema is found.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password] https:<span class="co">//localhost:9443/scim2/ResourceType</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin https:<span class="co">//localhost:9443/scim2/ResourceType</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:ResourceType&quot;</span>],<span class="st">&quot;resourceType&quot;</span>:[{<span class="st">&quot;schema&quot;</span>:<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;endpoint&quot;</span>:<span class="st">&quot;/Users&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/ResourceType/User&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;ResourceType&quot;</span>},<span class="st">&quot;name&quot;</span>:<span class="st">&quot;User&quot;</span>,<span class="st">&quot;description&quot;</span>:<span class="st">&quot;User Account&quot;</span>,<span class="st">&quot;schemaExtensions&quot;</span>:{<span class="st">&quot;schema&quot;</span>:<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>,<span class="st">&quot;required&quot;</span>:<span class="kw">false</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;User&quot;</span>},{<span class="st">&quot;schema&quot;</span>:<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:Group&quot;</span>,<span class="st">&quot;endpoint&quot;</span>:<span class="st">&quot;/Groups&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/ResourceType/Group&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;ResourceType&quot;</span>},<span class="st">&quot;name&quot;</span>:<span class="st">&quot;Group&quot;</span>,<span class="st">&quot;description&quot;</span>:<span class="st">&quot;Group&quot;</span>,<span class="st">&quot;id&quot;</span>:<span class="st">&quot;Group&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

None

**Responses**

-   HTTP 200 - Schema is found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Schema is not found

## ServiceProviderConfig Endpoint

#### GET/ Get Service Provider Config

`           GET                       https://localhost/t/{tenant-domain}/scim2/ServiceProviderConfig                     `

This API is used to create multiple users at once. It returns an
`           HTTP 201          ` response if the users are successfully
created.

  

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user [username]:[password]  https:<span class="co">//localhost:9443/scim2/ServiceProviderConfig</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">curl -v -k --user admin:admin  https:<span class="co">//localhost:9443/scim2/ServiceProviderConfig</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{<span class="st">&quot;patch&quot;</span>:{<span class="st">&quot;supported&quot;</span>:<span class="kw">true</span>},<span class="st">&quot;filter&quot;</span>:{<span class="st">&quot;maxResults&quot;</span>:<span class="dv">200</span>,<span class="st">&quot;supported&quot;</span>:<span class="kw">true</span>},<span class="st">&quot;documentationUri&quot;</span>:<span class="st">&quot;http://example.com/help/scim.html&quot;</span>,<span class="st">&quot;authenticationSchemes&quot;</span>:[{<span class="st">&quot;name&quot;</span>:<span class="st">&quot;OAuth Bearer Token&quot;</span>,<span class="st">&quot;description&quot;</span>:<span class="st">&quot;Authentication scheme using the OAuth Bearer Token Standard&quot;</span>,<span class="st">&quot;specUri&quot;</span>:<span class="st">&quot;http://www.rfc-editor.org/info/rfc6750&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;oauthbearertoken&quot;</span>,<span class="st">&quot;primary&quot;</span>:<span class="kw">true</span>},{<span class="st">&quot;name&quot;</span>:<span class="st">&quot;HTTP Basic&quot;</span>,<span class="st">&quot;description&quot;</span>:<span class="st">&quot;Authentication scheme using the HTTP Basic Standard&quot;</span>,<span class="st">&quot;specUri&quot;</span>:<span class="st">&quot;http://www.rfc-editor.org/info/rfc2617&quot;</span>,<span class="st">&quot;type&quot;</span>:<span class="st">&quot;httpbasic&quot;</span>,<span class="st">&quot;primary&quot;</span>:<span class="kw">false</span>}],<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig&quot;</span>],<span class="st">&quot;etag&quot;</span>:{<span class="st">&quot;supported&quot;</span>:<span class="kw">false</span>},<span class="st">&quot;sort&quot;</span>:{<span class="st">&quot;supported&quot;</span>:<span class="kw">false</span>},<span class="st">&quot;bulk&quot;</span>:{<span class="st">&quot;maxPayloadSize&quot;</span>:<span class="dv">1048576</span>,<span class="st">&quot;maxOperations&quot;</span>:<span class="dv">1000</span>,<span class="st">&quot;supported&quot;</span>:<span class="kw">true</span>},<span class="st">&quot;changePassword&quot;</span>:{<span class="st">&quot;supported&quot;</span>:<span class="kw">false</span>}}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

**Parameters**

None

**Responses**

-   HTTP 200 - Schema is found
-   HTTP 401 - Unauthorized
-   HTTP 404 - Schema is not found

## Required permissions for SCIM 2.0 APIs

The default permissions required to access each resource in SCIM 2.0 are
given below.

<table>
<thead>
<tr class="header">
<th>Endpoint</th>
<th>HTTP Method</th>
<th>Permission</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>/scim2/Users</td>
<td><pre><code>POST
        </code></pre></td>
<td><pre><code>/permission/admin/manage/identity/usermgt/create
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Users
        </code></pre></td>
<td><pre><code>GET
        </code></pre></td>
<td><pre><code>/permission/admin/manage/identity/usermgt/list
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Groups
        </code></pre></td>
<td><pre><code>POST
        </code></pre></td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/create
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Groups
        </code></pre></td>
<td><pre><code>GET
        </code></pre></td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/view
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Users/(.*)
        </code></pre></td>
<td><pre><code>GET
        </code></pre></td>
<td><pre><code>/permission/admin/manage/identity/usermgt/view
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Users/(.*)
        </code></pre></td>
<td>PUT</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/update
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Users/(.*)
        </code></pre></td>
<td>PATCH</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/update
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Users/(.*)
        </code></pre></td>
<td>DELETE</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/delete
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Groups/(.*)
        </code></pre></td>
<td><pre><code>GET
        </code></pre></td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/view
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Groups/(.*)
        </code></pre></td>
<td>PUT</td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/update
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Groups/(.*)
        </code></pre></td>
<td>PATCH</td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/update
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Groups/(.*)
        </code></pre></td>
<td>DELETE</td>
<td><pre><code>/permission/admin/manage/identity/rolemgt/delete
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Me
        </code></pre></td>
<td>GET</td>
<td><pre><code>/permission/admin/login
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Me
        </code></pre></td>
<td>DELETE</td>
<td><pre><code>/permission/admin/login
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Me
        </code></pre></td>
<td>PUT</td>
<td><pre><code>/permission/admin/login
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Me
        </code></pre></td>
<td>PATCH</td>
<td><pre><code>/permission/admin/login
        </code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/Me
        </code></pre></td>
<td>POST</td>
<td><pre><code>/permission/admin/manage/identity/usermgt/create
        </code></pre></td>
</tr>
<tr class="even">
<td><pre><code>/scim2/ServiceProviderConfig
        </code></pre></td>
<td>all</td>
<td>-</td>
</tr>
<tr class="odd">
<td><pre><code>/scim2/ResourceType
        </code></pre></td>
<td>all</td>
<td>-</td>
</tr>
<tr class="even">
<td><pre><code>/scim2/Bulk
        </code></pre></td>
<td>all</td>
<td><pre><code>/permission/admin/manage/identity/usermgt
        </code></pre></td>
</tr>
</tbody>
</table>

!!! info
	More information about how to secure the REST APIs and configure
	authorization level can be found from [Authenticating and Authorizing
	REST APIs](../../develop/authenticating-and-authorizing-rest-apis)

