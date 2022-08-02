# Entitlement with REST APIs

Entitlement management is the process that grants, resolves, enforces,
revokes and administers fine-grained access privileges.

The WSO2 Identity Server supports REST APIs for entitlement management via the
`https://{IS_IP}:{IS_PORT}/api/identity/entitlement/decision/` endpoint.

If your WSO2 Identity Server is running on localhost (127.0.0.1) and on the default port, the entitlement endpoint is:
    ``` java
    https://localhost:9443/api/identity/entitlement/decision/
    ```

!!! note
    The REST APIs are secured with basic authentication. Follow
    the steps below to add a basic auth header when calling these methods.

    1.  Build a string of the form **username:password** and encode it using **Base64**.
    2.  Define an authorization header with the term `Basic`, followed by the encoded
        string. 
    For example, the basic authorization header for `admin` user with password `admin` is:

        ``` java
        Authorization: Basic YWRtaW46YWRtaW4=
        ```    

---

####  Get API resource list

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get the API resource list according to XACML 3.0 specification.</td>
</tr>
<tr class="even">
<td>Resource Path</td>
<td>/home</td>
</tr>
<tr class="odd">
<td>HTTP Method</td>
<td>GET</td>
</tr>
<tr class="even">
<td>Request/Response Format</td>
<td>application/json
<p>application/xml</p></td>
</tr>
<tr class="odd">
<td>Authentication</td>
<td>Basic</td>
</tr>
<tr class="even">
<td>Username</td>
<td>admin</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>admin</td>
</tr>
<tr class="even">
<td>Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Located In</th>
<th>Description</th>
<th>Required</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Accept</td>
<td>header</td>
<td>Request Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Auth_Type</td>
<td>header</td>
<td>Authentication Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>Authorization</td>
<td>header</td>
<td>Add HTTP Basic Authorization</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Content-type</td>
<td>header</td>
<td>Response Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Code</th>
<th>Description</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>200</td>
<td>XACML JSON/XML Response</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>40010</td>
<td>Error in response</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
<tr class="odd">
<td>40020</td>
<td>Request parse exception</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
</tbody>
</table>
</div>
<p><br />
</p>
<p><br />
</p></td>
</tr>
</tbody>
</table>

A sample request and response is as follows:

<table>
<colgroup>
<col style="width: 18%" />
<col style="width: 81%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Sample request</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>GET Request: cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -X GET   https:<span class="co">//localhost:9443/api/identity/entitlement/decision/home   -H &#39;accept: application/json&#39;   -H &#39;authorization: Basic YWRtaW46YWRtaW4=&#39;   -H &#39;content-type: application/json&#39;  -k</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Sample Response</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample response: JSON</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{</a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="st">&quot;xmlns&quot;</span>: <span class="st">&quot;http://ietf.org/ns/home-documents&quot;</span>,</a>
<a class="sourceLine" id="cb2-3" title="3">    <span class="st">&quot;resources&quot;</span>: [</a>
<a class="sourceLine" id="cb2-4" title="4">        {</a>
<a class="sourceLine" id="cb2-5" title="5">            <span class="st">&quot;link&quot;</span>: {</a>
<a class="sourceLine" id="cb2-6" title="6">                <span class="st">&quot;href&quot;</span>: <span class="st">&quot;/pdp&quot;</span></a>
<a class="sourceLine" id="cb2-7" title="7">            },</a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="st">&quot;rel&quot;</span>: <span class="st">&quot;http://docs.oasis-open.org/ns/xacml/relation/pdp&quot;</span></a>
<a class="sourceLine" id="cb2-9" title="9">        }</a>
<a class="sourceLine" id="cb2-10" title="10">    ]</a>
<a class="sourceLine" id="cb2-11" title="11">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

#### Evaluate XACML request

<table>
<colgroup>
<col style="width: 23%" />
<col style="width: 76%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get a response by evaluating the JSON/XML XACML request.</td>
</tr>
<tr class="even">
<td>Resource Path</td>
<td>/pdp</td>
</tr>
<tr class="odd">
<td>HTTP Method</td>
<td>POST</td>
</tr>
<tr class="even">
<td>Request/Response Format</td>
<td><p>application/json</p>
<p>application/xml</p></td>
</tr>
<tr class="odd">
<td>Authentication</td>
<td>Basic</td>
</tr>
<tr class="even">
<td>Username</td>
<td>admin</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>admin</td>
</tr>
<tr class="even">
<td>Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Located In</th>
<th>Description</th>
<th>Required</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Accept</td>
<td>header</td>
<td>Request Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Auth_Type</td>
<td>header</td>
<td>Authentication Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>Authorization</td>
<td>header</td>
<td>Add HTTP Basic Authorization</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Content-type</td>
<td>header</td>
<td>Response Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>body</td>
<td>body</td>
<td>XACML JSON/XML Request</td>
<td>Yes</td>
<td>string</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Code</th>
<th>Description</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>200</td>
<td>XACML JSON/XML Response</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>40010</td>
<td>Error in response</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
<tr class="odd">
<td>40020</td>
<td>Request parse exception</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
</tbody>
</table>
</div>
<p><br />
</p>
<p><br />
</p></td>
</tr>
</tbody>
</table>

A sample request and response is as follows:

<table style="width:100%;">
<colgroup>
<col style="width: 6%" />
<col style="width: 93%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XACML Policy Evaluated</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>XACML Policy</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;Policy</span><span class="ot"> xmlns=</span><span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span><span class="ot"> PolicyId=</span><span class="st">&quot;samplePolicy&quot;</span><span class="ot"> RuleCombiningAlgId=</span><span class="st">&quot;urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides&quot;</span><span class="ot"> Version=</span><span class="st">&quot;1.0&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="kw">&lt;Target&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">        <span class="kw">&lt;AnyOf&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">            <span class="kw">&lt;AllOf&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">                <span class="kw">&lt;Match</span><span class="ot"> MatchId=</span><span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">                    <span class="kw">&lt;AttributeValue</span><span class="ot"> DataType=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span><span class="kw">&gt;</span>read<span class="kw">&lt;/AttributeValue&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7">                    <span class="kw">&lt;AttributeDesignator</span><span class="ot"> AttributeId=</span><span class="st">&quot;urn:oasis:names:tc:xacml:1.0:action:action-id&quot;</span><span class="ot"> Category=</span><span class="st">&quot;urn:oasis:names:tc:xacml:3.0:attribute-category:action&quot;</span><span class="ot"> DataType=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span><span class="ot"> MustBePresent=</span><span class="st">&quot;true&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">                <span class="kw">&lt;/Match&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">            <span class="kw">&lt;/AllOf&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10">        <span class="kw">&lt;/AnyOf&gt;</span></a>
<a class="sourceLine" id="cb1-11" title="11">    <span class="kw">&lt;/Target&gt;</span></a>
<a class="sourceLine" id="cb1-12" title="12">    <span class="kw">&lt;Rule</span><span class="ot"> Effect=</span><span class="st">&quot;Permit&quot;</span><span class="ot"> RuleId=</span><span class="st">&quot;permit&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb1-13" title="13"><span class="kw">&lt;/Policy&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Sample Request</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request: JSON</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{</a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="st">&quot;Request&quot;</span>: {</a>
<a class="sourceLine" id="cb2-3" title="3">             <span class="st">&quot;AccessSubject&quot;</span>: {</a>
<a class="sourceLine" id="cb2-4" title="4">                     <span class="st">&quot;Attribute&quot;</span>: [</a>
<a class="sourceLine" id="cb2-5" title="5">                           {</a>
<a class="sourceLine" id="cb2-6" title="6">                                  <span class="st">&quot;AttributeId&quot;</span>: <span class="st">&quot;urn:oasis:names:tc:xacml:1.0:subject:subject-id&quot;</span>,</a>
<a class="sourceLine" id="cb2-7" title="7">                                  <span class="st">&quot;Value&quot;</span>: <span class="st">&quot;Andreas&quot;</span></a>
<a class="sourceLine" id="cb2-8" title="8">                           }</a>
<a class="sourceLine" id="cb2-9" title="9">           ]</a>
<a class="sourceLine" id="cb2-10" title="10">              },        <span class="st">&quot;Action&quot;</span>: {</a>
<a class="sourceLine" id="cb2-11" title="11">            <span class="st">&quot;Attribute&quot;</span>: [</a>
<a class="sourceLine" id="cb2-12" title="12">                {</a>
<a class="sourceLine" id="cb2-13" title="13">                    <span class="st">&quot;AttributeId&quot;</span>: <span class="st">&quot;urn:oasis:names:tc:xacml:1.0:action:action-id&quot;</span>,</a>
<a class="sourceLine" id="cb2-14" title="14">                    <span class="st">&quot;Value&quot;</span>: <span class="st">&quot;read&quot;</span></a>
<a class="sourceLine" id="cb2-15" title="15">                }</a>
<a class="sourceLine" id="cb2-16" title="16">            ]</a>
<a class="sourceLine" id="cb2-17" title="17">        },</a>
<a class="sourceLine" id="cb2-18" title="18">        <span class="st">&quot;Resource&quot;</span>: {</a>
<a class="sourceLine" id="cb2-19" title="19">            <span class="st">&quot;Attribute&quot;</span>: [</a>
<a class="sourceLine" id="cb2-20" title="20">                {</a>
<a class="sourceLine" id="cb2-21" title="21">                    <span class="st">&quot;AttributeId&quot;</span>: <span class="st">&quot;urn:oasis:names:tc:xacml:1.0:resource:resource-id&quot;</span>,</a>
<a class="sourceLine" id="cb2-22" title="22">                    <span class="st">&quot;Value&quot;</span>: <span class="st">&quot;http://127.0.0.1/service/very_secure/&quot;</span></a>
<a class="sourceLine" id="cb2-23" title="23">                }</a>
<a class="sourceLine" id="cb2-24" title="24">            ]</a>
<a class="sourceLine" id="cb2-25" title="25">        }</a>
<a class="sourceLine" id="cb2-26" title="26">    }</a>
<a class="sourceLine" id="cb2-27" title="27">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Sample Response</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response: JSON</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{</a>
<a class="sourceLine" id="cb3-2" title="2">  <span class="st">&quot;Response&quot;</span>: [</a>
<a class="sourceLine" id="cb3-3" title="3">    {</a>
<a class="sourceLine" id="cb3-4" title="4">      <span class="st">&quot;Decision&quot;</span>: <span class="st">&quot;Permit&quot;</span>,</a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="st">&quot;Status&quot;</span>: {</a>
<a class="sourceLine" id="cb3-6" title="6">        <span class="st">&quot;StatusCode&quot;</span>: {</a>
<a class="sourceLine" id="cb3-7" title="7">          <span class="st">&quot;Value&quot;</span>: <span class="st">&quot;urn:oasis:names:tc:xacml:1.0:status:ok&quot;</span></a>
<a class="sourceLine" id="cb3-8" title="8">        }</a>
<a class="sourceLine" id="cb3-9" title="9">      }</a>
<a class="sourceLine" id="cb3-10" title="10">    }</a>
<a class="sourceLine" id="cb3-11" title="11">  ]</a>
<a class="sourceLine" id="cb3-12" title="12">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---  

#### Evaluate XACML request by attributes

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get a response by evaluating attributes.</td>
</tr>
<tr class="even">
<td>Resource Path</td>
<td>/by-attrib</td>
</tr>
<tr class="odd">
<td>HTTP Method</td>
<td>POST</td>
</tr>
<tr class="even">
<td>Request/Response Format</td>
<td>application/json
<p>application/xml</p></td>
</tr>
<tr class="odd">
<td>Authentication</td>
<td>Basic</td>
</tr>
<tr class="even">
<td>Username</td>
<td>admin</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>admin</td>
</tr>
<tr class="even">
<td>Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Located In</th>
<th>Description</th>
<th>Required</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Accept</td>
<td>header</td>
<td>Request Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Auth_Type</td>
<td>header</td>
<td>Authentication Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>Authorization</td>
<td>header</td>
<td>Add HTTP Basic Authorization</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Content-type</td>
<td>header</td>
<td>Response Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>body</td>
<td>body</td>
<td>Decision Request Model</td>
<td>Yes</td>
<td><pre style="margin-left: 30.0px;"><code>DecisionRequestModel {
 
    subject:string
    action:string
    resource:string
    environment:[
            string
    ]
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Code</th>
<th>Description</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>200</td>
<td>Method call success</td>
<td><code>                                     HomeResponseModel {                                    }                 </code></td>
</tr>
<tr class="even">
<td>40010</td>
<td>Error in response</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
<tr class="odd">
<td>40020</td>
<td>Request parse exception</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>

A sample request and response are as follows,

<table>
<colgroup>
<col style="width: 15%" />
<col style="width: 84%" />
</colgroup>
<tbody>
<tr class="odd">
<td>A sample request</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request: cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl --request POST \</a>
<a class="sourceLine" id="cb1-2" title="2">  --url https:<span class="co">//localhost:9443/api/identity/entitlement/decision/by-attrib \</span></a>
<a class="sourceLine" id="cb1-3" title="3">  --header &#39;accept: application/json&#39; \</a>
<a class="sourceLine" id="cb1-4" title="4">  --header &#39;authorization: Basic YWRtaW46YWRtaW4=&#39; \</a>
<a class="sourceLine" id="cb1-5" title="5">  --header &#39;content-type: application/json&#39; \</a>
<a class="sourceLine" id="cb1-6" title="6">  --data &#39;{</a>
<a class="sourceLine" id="cb1-7" title="7">  <span class="st">&quot;action&quot;</span>:<span class="st">&quot;read&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">  <span class="st">&quot;resource&quot;</span>:<span class="st">&quot;http://127.0.0.1/service/very_secure/&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">  <span class="st">&quot;subject&quot;</span> : <span class="st">&quot;admin&quot;</span></a>
<a class="sourceLine" id="cb1-10" title="10">}&#39; -k</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>A sample response</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response: JSON</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{</a>
<a class="sourceLine" id="cb2-2" title="2">  <span class="st">&quot;Response&quot;</span>: [</a>
<a class="sourceLine" id="cb2-3" title="3">    {</a>
<a class="sourceLine" id="cb2-4" title="4">      <span class="st">&quot;Decision&quot;</span>: <span class="st">&quot;Permit&quot;</span>,</a>
<a class="sourceLine" id="cb2-5" title="5">      <span class="st">&quot;Status&quot;</span>: {</a>
<a class="sourceLine" id="cb2-6" title="6">        <span class="st">&quot;StatusCode&quot;</span>: {</a>
<a class="sourceLine" id="cb2-7" title="7">          <span class="st">&quot;Value&quot;</span>: <span class="st">&quot;urn:oasis:names:tc:xacml:1.0:status:ok&quot;</span></a>
<a class="sourceLine" id="cb2-8" title="8">        }</a>
<a class="sourceLine" id="cb2-9" title="9">      }</a>
<a class="sourceLine" id="cb2-10" title="10">    }</a>
<a class="sourceLine" id="cb2-11" title="11">  ]</a>
<a class="sourceLine" id="cb2-12" title="12">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

#### Evaluate XACML request by attributes and receive boolean response

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get a boolean response by evaluating attributes.</td>
</tr>
<tr class="even">
<td>Resource Path</td>
<td>/by-attrib-boolean</td>
</tr>
<tr class="odd">
<td>HTTP Method</td>
<td>POST</td>
</tr>
<tr class="even">
<td>Request/Response Format</td>
<td><p>application/json</p>
<p>application/xml</p></td>
</tr>
<tr class="odd">
<td>Authentication</td>
<td>Basic</td>
</tr>
<tr class="even">
<td>Username</td>
<td>admin</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>admin</td>
</tr>
<tr class="even">
<td>Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Located In</th>
<th>Description</th>
<th>Required</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Accept</td>
<td>header</td>
<td>Request Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Auth_Type</td>
<td>header</td>
<td>Authentication Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>Authorization</td>
<td>header</td>
<td>Add HTTP Basic Authorization</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Content-type</td>
<td>header</td>
<td>Response Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>body</td>
<td>body</td>
<td>Decision Request Model</td>
<td>Yes</td>
<td><pre style="margin-left: 30.0px;"><code>DecisionRequestModel {
 
    subject:string
    action:string
    resource:string
    environment:[
            string
    ]
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Code</th>
<th>Description</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>200</td>
<td>XACML JSON/XML Response</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>40010</td>
<td>Error in response</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
<tr class="odd">
<td>40020</td>
<td>Request parse exception</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>

A sample request and response are as follows,

<table>
<colgroup>
<col style="width: 15%" />
<col style="width: 84%" />
</colgroup>
<tbody>
<tr class="odd">
<td>A sample request</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request: cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl --request POST \</a>
<a class="sourceLine" id="cb1-2" title="2">  --url https:<span class="co">//localhost:9443/api/identity/entitlement/decision/by-attrib-boolean \</span></a>
<a class="sourceLine" id="cb1-3" title="3">  --header &#39;accept: application/json&#39; \</a>
<a class="sourceLine" id="cb1-4" title="4">  --header &#39;authorization: Basic YWRtaW46YWRtaW4=&#39; \</a>
<a class="sourceLine" id="cb1-5" title="5">  --header &#39;content-type: application/json&#39; \</a>
<a class="sourceLine" id="cb1-6" title="6">  --data &#39;{</a>
<a class="sourceLine" id="cb1-7" title="7">  <span class="st">&quot;action&quot;</span>:<span class="st">&quot;read&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">  <span class="st">&quot;resource&quot;</span>:<span class="st">&quot;http://127.0.0.1/service/very_secure/&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">  <span class="st">&quot;subject&quot;</span> : <span class="st">&quot;admin&quot;</span></a>
<a class="sourceLine" id="cb1-10" title="10">}&#39; -k</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>A sample response</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response: Boolean</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">true</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

--- 

#### Get entitled attributes

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get entitled attributes for a given set of parameters.</td>
</tr>
<tr class="even">
<td>Resource Path</td>
<td>/entitled-attribs</td>
</tr>
<tr class="odd">
<td>HTTP Method</td>
<td>POST</td>
</tr>
<tr class="even">
<td>Request/Response Format</td>
<td><p>application/json</p>
<p>application/xml</p></td>
</tr>
<tr class="odd">
<td>Authentication</td>
<td>Basic</td>
</tr>
<tr class="even">
<td>Username</td>
<td>admin</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>admin</td>
</tr>
<tr class="even">
<td>Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Located In</th>
<th>Description</th>
<th>Required</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Accept</td>
<td>header</td>
<td>Request Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Auth_Type</td>
<td>header</td>
<td>Authentication Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>Authorization</td>
<td>header</td>
<td>Add HTTP Basic Authorization</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Content-type</td>
<td>header</td>
<td>Response Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>body</td>
<td>body</td>
<td>Decision Request Model</td>
<td>Yes</td>
<td><pre style="margin-left: 30.0px;"><code>EntitledAttributesRequestModel {
    subjectName:string
    resourceName:string
    subjectId:string
    action:string
    enableChildSearch:boolean
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Code</th>
<th>Description</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>200</td>
<td>Entitled attributes response</td>
<td><pre style="margin-left: 30.0px;"><code>EntitledAttributesResponseModel {
    entitledResultSetDTO:EntitledResultSetDTO {
        entitledAttributesDTOs:[
            EntitledAttributesDTO {
                resourceName:string
                action:string
                environment:string
                allActions:boolean
                allResources:boolean
                attributeDTOs:[
                    AttributeDTO {
                        attributeValue:string
                        attributeDataType:string
                        attributeId:string
                        category:string
                    }
                ]
            }
        ]
        advanceResult:boolean
        message:string
        messageType:string
    }
}</code></pre></td>
</tr>
<tr class="even">
<td>40010</td>
<td>Error in response</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
<tr class="odd">
<td>40020</td>
<td>Request parse exception</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>

A sample request and response are as follows,

<table>
<colgroup>
<col style="width: 15%" />
<col style="width: 84%" />
</colgroup>
<tbody>
<tr class="odd">
<td>A sample request</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request: cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl --request POST \</a>
<a class="sourceLine" id="cb1-2" title="2">  --url https:<span class="co">//localhost:9443/api/identity/entitlement/decision/entitled-attribs \</span></a>
<a class="sourceLine" id="cb1-3" title="3">  --header &#39;accept: application/json&#39; \</a>
<a class="sourceLine" id="cb1-4" title="4">  --header &#39;authorization: Basic YWRtaW46YWRtaW4=&#39; \</a>
<a class="sourceLine" id="cb1-5" title="5">  --header &#39;content-type: application/json&#39; \</a>
<a class="sourceLine" id="cb1-6" title="6">  --data &#39;{</a>
<a class="sourceLine" id="cb1-7" title="7">  <span class="st">&quot;subjectName&quot;</span> : <span class="st">&quot;admin&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">  <span class="st">&quot;enableChildSearch&quot;</span> : <span class="st">&quot;false&quot;</span></a>
<a class="sourceLine" id="cb1-9" title="9">}&#39; -k</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>A sample response</td>
<td><div class="content-wrapper" style="margin-left: 30.0px;">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Response: JSON</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{</a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="st">&quot;entitledResultSetDTO&quot;</span>: {</a>
<a class="sourceLine" id="cb2-3" title="3">      <span class="st">&quot;entitledAttributesDTOs&quot;</span>: [</a>
<a class="sourceLine" id="cb2-4" title="4">         {</a>
<a class="sourceLine" id="cb2-5" title="5">            <span class="st">&quot;resourceName&quot;</span>: <span class="kw">null</span>,</a>
<a class="sourceLine" id="cb2-6" title="6">            <span class="st">&quot;action&quot;</span>: <span class="st">&quot;read&quot;</span>,</a>
<a class="sourceLine" id="cb2-7" title="7">            <span class="st">&quot;environment&quot;</span>: <span class="kw">null</span>,</a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="st">&quot;allActions&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb2-9" title="9">            <span class="st">&quot;allResources&quot;</span>: <span class="kw">true</span>,</a>
<a class="sourceLine" id="cb2-10" title="10">            <span class="st">&quot;attributeDTOs&quot;</span>: []</a>
<a class="sourceLine" id="cb2-11" title="11">         }</a>
<a class="sourceLine" id="cb2-12" title="12">      ],</a>
<a class="sourceLine" id="cb2-13" title="13">      <span class="st">&quot;advanceResult&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb2-14" title="14">      <span class="st">&quot;message&quot;</span>: <span class="kw">null</span>,</a>
<a class="sourceLine" id="cb2-15" title="15">      <span class="st">&quot;messageType&quot;</span>: <span class="kw">null</span></a>
<a class="sourceLine" id="cb2-16" title="16">   }</a>
<a class="sourceLine" id="cb2-17" title="17">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

#### Get all entitlements

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get all entitlements for a given set of parameters</td>
</tr>
<tr class="even">
<td>Resource Path</td>
<td>/entitlements-all</td>
</tr>
<tr class="odd">
<td>HTTP Method</td>
<td>POST</td>
</tr>
<tr class="even">
<td>Request/Response Format</td>
<td><p>application/json</p>
<p>application/xml</p></td>
</tr>
<tr class="odd">
<td>Authentication</td>
<td>Basic</td>
</tr>
<tr class="even">
<td>Username</td>
<td>admin</td>
</tr>
<tr class="odd">
<td>Password</td>
<td>admin</td>
</tr>
<tr class="even">
<td>Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Located In</th>
<th>Description</th>
<th>Required</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Accept</td>
<td>header</td>
<td>Request Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Auth_Type</td>
<td>header</td>
<td>Authentication Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>Authorization</td>
<td>header</td>
<td>Add HTTP Basic Authorization</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="even">
<td>Content-type</td>
<td>header</td>
<td>Response Media Type</td>
<td>Yes</td>
<td>string</td>
</tr>
<tr class="odd">
<td>body</td>
<td>body</td>
<td>All Entitlements Model</td>
<td>Yes</td>
<td><pre style="margin-left: 30.0px;"><code>AllEntitlementsRequestModel {
    identifier:string
    givenAttributes:[
        AttributeDTO {
            attributeValue:string
            attributeDataType:string
            attributeId:string
            category:string
        }
    ]
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Code</th>
<th>Description</th>
<th>Schema</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>200</td>
<td>All entitlements response</td>
<td><pre style="margin-left: 30.0px;"><code>AllEntitlementsResponseModel {
    entitledResultSetDTO:EntitledResultSetDTO {
        entitledAttributesDTOs:[
            EntitledAttributesDTO {
                resourceName:string
                action:string
                environment:string
                allActions:boolean
                allResources:boolean
                attributeDTOs:[
                    AttributeDTO {
                        attributeValue:string
                        attributeDataType:string
                        attributeId:string
                        category:string
                    }
                ]
            }
        ]
        advanceResult:boolean
        message:string
        messageType:string
    }
}</code></pre></td>
</tr>
<tr class="even">
<td>40010</td>
<td>Error in response</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
<tr class="odd">
<td>40020</td>
<td>Request parse exception</td>
<td><pre style="margin-left: 30.0px;"><code>ExceptionBean {
    code:integer
    message:string
}</code></pre></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>
