# Managing Claims with APIs

The Claim Management component of WSO2 Carbon allows you to map a set of
attributes from the underlying user store to a set of defined
claims. This section guides you through invoking and working with the
**`          ClaimMetadataManagementService         `** and the
operations you can work within this service.

-   [Invoking the admin
    service](#ManagingClaimswithAPIs-Invokingtheadminservice)
-   [Operations included in the
    API](#ManagingClaimswithAPIs-OperationsincludedintheAPI)

### Invoking the admin service

The `         ClaimMetadataManagementService        ` is an admin
service of the WSO2 Carbon platform. As admin services are secured to
prevent anonymous invocations, you cannot view the WSDL of the admin
service by default. Follow the steps given below to view and invoke the
admin service:

1.  Set the element `           <HideAdminServiceWSDLs>          ` to
    `           false          ` in
    `           <IS_HOME>/repository/conf/carbon.xml          ` file.

    ``` xml
    <HideAdminServiceWSDLs>false</HideAdminServiceWSDLs>
    ```

2.  Restart WSO2 Identity Server.
3.  If you started the server using the default configurations, copy the
    following URL to your browser to see the WSDL of the admin service:
    `                       https://localhost:9443/services/ClaimMetadataManagementService?wsdl                     `
    .

    The default hostname of WSO2 IS is
    `            localhost           ` . If you are using a different
    hostname, make sure to replace `            localhost           `
    with the new hostname.

For more information on WSO2 admin services and how to invoke an admin
service using either SoapUI or any other client program, see [Calling
Admin Services from
Apps](https://docs.wso2.org/display/Carbon420/Calling+Admin+Services+from+Apps)
section in WSO2 Carbon documentation.

### Operations included in the API

The following operations are available in the
ClaimMetadataManagementService.

##### addClaimDialect ()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new claim dialect.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>claimDialectURI</code></pre></td>
<td>The URI which defines the new claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-1059081487" class="expand-container">
<div id="expander-control-1059081487" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-1059081487" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb2-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://service.ws.um.carbon.wso2.org&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://api.user.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">      <span class="kw">&lt;xsd:addClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">         <span class="kw">&lt;xsd:claimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">            <span class="kw">&lt;xsd1:claimDialectURI&gt;</span>new dialect<span class="kw">&lt;/xsd1:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">         <span class="kw">&lt;/xsd:claimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">      <span class="kw">&lt;/xsd:addClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-1918792294" class="expand-container">
<div id="expander-control-1918792294" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-1918792294" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3">      <span class="kw">&lt;ns:addClaimDialectResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="kw">&lt;/ns:addClaimDialectResponse&gt;</span></a>
<a class="sourceLine" id="cb3-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

##### getClaimDialects()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Lists out all the claim dialects which are used.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><p>None</p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-49194735" class="expand-container">
<div id="expander-control-49194735" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-49194735" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">      <span class="kw">&lt;xsd:getClaimDialects/&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-314227242" class="expand-container">
<div id="expander-control-314227242" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-314227242" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">      <span class="kw">&lt;ns:getClaimDialectsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:ax2333=</span><span class="st">&quot;http://base.identity.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2336=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2332=</span><span class="st">&quot;http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>http://wso2.org/claims<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>http://schemas.xmlsoap.org/ws/2005/05/identity<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>urn:scim:schemas:core:1.0<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>urn:ietf:params:scim:schemas:core:2.0:User<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>http://wso2.org/oidc/claim<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-20" title="20">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>urn:ietf:params:scim:schemas:core:2.0<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-21" title="21">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-22" title="22">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-23" title="23">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>http://schema.openid.net/2007/05/claims<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-24" title="24">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-25" title="25">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-26" title="26">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>http://axschema.org<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-27" title="27">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-28" title="28">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-29" title="29">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-30" title="30">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-31" title="31">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimDialectDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-32" title="32">            <span class="kw">&lt;ax2336:claimDialectURI&gt;</span>http://abc.org/claims<span class="kw">&lt;/ax2336:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-33" title="33">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-34" title="34">      <span class="kw">&lt;/ns:getClaimDialectsResponse&gt;</span></a>
<a class="sourceLine" id="cb2-35" title="35">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-36" title="36"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

##### addExternalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new claim claim</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim dialect.</td>
</tr>
<tr class="even">
<td><pre><code>externalClaimUR</code></pre></td>
<td>The URI of the external claim</td>
</tr>
<tr class="odd">
<td><pre><code>mappedLocalClaimURI</code></pre></td>
<td>The URI of the mapped claim.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-1270408295" class="expand-container">
<div id="expander-control-1270408295" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-1270408295" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:xsd1=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb4-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb4-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb4-4" title="4">      <span class="kw">&lt;xsd:addExternalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-6" title="6">         <span class="kw">&lt;xsd:externalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-7" title="7">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-8" title="8">            <span class="kw">&lt;xsd1:externalClaimDialectURI&gt;</span>external cliam dialect<span class="kw">&lt;/xsd1:externalClaimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb4-9" title="9">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-10" title="10">            <span class="kw">&lt;xsd1:externalClaimURI&gt;</span>external claim uri<span class="kw">&lt;/xsd1:externalClaimURI&gt;</span></a>
<a class="sourceLine" id="cb4-11" title="11">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-12" title="12">            <span class="kw">&lt;xsd1:mappedLocalClaimURI&gt;</span>mapped local claim<span class="kw">&lt;/xsd1:mappedLocalClaimURI&gt;</span></a>
<a class="sourceLine" id="cb4-13" title="13">         <span class="kw">&lt;/xsd:externalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-14" title="14">      <span class="kw">&lt;/xsd:addExternalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-15" title="15">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb4-16" title="16"><span class="kw">&lt;/soapenv:Envelope&gt;</span>            </a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-960505582" class="expand-container">
<div id="expander-control-960505582" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-960505582" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb5-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb5-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb5-3" title="3">      <span class="kw">&lt;ns:addExternalClaimResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb5-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb5-5" title="5">      <span class="kw">&lt;/ns:addExternalClaimResponse&gt;</span></a>
<a class="sourceLine" id="cb5-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb5-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span>     </a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

##### addLocalClaim()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new local claim.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>attributeName</code></pre></td>
<td>The attribute name</td>
</tr>
<tr class="even">
<td><pre><code>userStoreDomain</code></pre></td>
<td>The user-store domain of the attribute</td>
</tr>
<tr class="odd">
<td><pre><code>propertyName</code></pre></td>
<td>Name of the property</td>
</tr>
<tr class="even">
<td><pre><code>propertyValue</code></pre></td>
<td>Value of the property</td>
</tr>
<tr class="odd">
<td><pre><code>localClaimURI</code></pre></td>
<td>The URI of the local claim</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-126051444" class="expand-container">
<div id="expander-control-126051444" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-126051444" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb6-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:xsd1=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb6-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb6-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb6-4" title="4">      <span class="kw">&lt;xsd:addLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb6-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-6" title="6">         <span class="kw">&lt;xsd:localClaim&gt;</span></a>
<a class="sourceLine" id="cb6-7" title="7">            <span class="co">&lt;!--Zero or more repetitions:--&gt;</span></a>
<a class="sourceLine" id="cb6-8" title="8">            <span class="kw">&lt;xsd1:attributeMappings&gt;</span></a>
<a class="sourceLine" id="cb6-9" title="9">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-10" title="10">               <span class="kw">&lt;xsd1:attributeName&gt;</span>email<span class="kw">&lt;/xsd1:attributeName&gt;</span></a>
<a class="sourceLine" id="cb6-11" title="11">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-12" title="12">               <span class="kw">&lt;xsd1:userStoreDomain&gt;</span>primary<span class="kw">&lt;/xsd1:userStoreDomain&gt;</span></a>
<a class="sourceLine" id="cb6-13" title="13">            <span class="kw">&lt;/xsd1:attributeMappings&gt;</span></a>
<a class="sourceLine" id="cb6-14" title="14">            <span class="co">&lt;!--Zero or more repetitions:--&gt;</span></a>
<a class="sourceLine" id="cb6-15" title="15">            <span class="kw">&lt;xsd1:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb6-16" title="16">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-17" title="17">               <span class="kw">&lt;xsd1:propertyName&gt;</span>email<span class="kw">&lt;/xsd1:propertyName&gt;</span></a>
<a class="sourceLine" id="cb6-18" title="18">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-19" title="19">               <span class="kw">&lt;xsd1:propertyValue&gt;</span>www.sample@email.com<span class="kw">&lt;/xsd1:propertyValue&gt;</span></a>
<a class="sourceLine" id="cb6-20" title="20">            <span class="kw">&lt;/xsd1:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb6-21" title="21">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-22" title="22">            <span class="kw">&lt;xsd1:localClaimURI&gt;</span>http://abc.org/email<span class="kw">&lt;/xsd1:localClaimURI&gt;</span></a>
<a class="sourceLine" id="cb6-23" title="23">         <span class="kw">&lt;/xsd:localClaim&gt;</span></a>
<a class="sourceLine" id="cb6-24" title="24">      <span class="kw">&lt;/xsd:addLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb6-25" title="25">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb6-26" title="26"><span class="kw">&lt;/soapenv:Envelope&gt;</span>         </a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-1683044103" class="expand-container">
<div id="expander-control-1683044103" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-1683044103" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb7-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb7-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb7-3" title="3">      <span class="kw">&lt;ns:addLocalClaimResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb7-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb7-5" title="5">      <span class="kw">&lt;/ns:addLocalClaimResponse&gt;</span></a>
<a class="sourceLine" id="cb7-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb7-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

##### getExternalClaims()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Returns all the external claims.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-539092128" class="expand-container">
<div id="expander-control-539092128" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-539092128" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">      <span class="kw">&lt;xsd:getExternalClaims&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="kw">&lt;xsd:externalClaimDialectURI&gt;</span>external claim dialect uri<span class="kw">&lt;/xsd:externalClaimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">      <span class="kw">&lt;/xsd:getExternalClaims&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-1199545105" class="expand-container">
<div id="expander-control-1199545105" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-1199545105" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3">      <span class="kw">&lt;ns:getExternalClaimsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:ax2333=</span><span class="st">&quot;http://base.identity.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2336=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2332=</span><span class="st">&quot;http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb3-4" title="4">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

##### getLocalClaims()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Returns all the local claims available.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><p>None</p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-386461580" class="expand-container">
<div id="expander-control-386461580" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-386461580" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">      <span class="kw">&lt;xsd:getLocalClaims/&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-763045913" class="expand-container">
<div id="expander-control-763045913" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the reponse
</div>
<div id="expander-content-763045913" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">      <span class="kw">&lt;ns:getLocalClaimsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:ax2333=</span><span class="st">&quot;http://base.identity.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2336=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2332=</span><span class="st">&quot;http://exception.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:LocalClaimDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">            <span class="kw">&lt;ax2336:attributeMappings</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:AttributeMappingDTO&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">               <span class="kw">&lt;ax2336:attributeName&gt;</span>unlockTime<span class="kw">&lt;/ax2336:attributeName&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">               <span class="kw">&lt;ax2336:userStoreDomain&gt;</span>PRIMARY<span class="kw">&lt;/ax2336:userStoreDomain&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="kw">&lt;/ax2336:attributeMappings&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">            <span class="kw">&lt;ax2336:claimProperties</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimPropertyDTO&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">               <span class="kw">&lt;ax2336:propertyName&gt;</span>Description<span class="kw">&lt;/ax2336:propertyName&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">               <span class="kw">&lt;ax2336:propertyValue&gt;</span>Unlock Time<span class="kw">&lt;/ax2336:propertyValue&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">            <span class="kw">&lt;/ax2336:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">            <span class="kw">&lt;ax2336:claimProperties</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimPropertyDTO&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">               <span class="kw">&lt;ax2336:propertyName&gt;</span>DisplayName<span class="kw">&lt;/ax2336:propertyName&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">               <span class="kw">&lt;ax2336:propertyValue&gt;</span>Unlock Time<span class="kw">&lt;/ax2336:propertyValue&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">            <span class="kw">&lt;/ax2336:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">            <span class="kw">&lt;ax2336:localClaimURI&gt;</span>http://wso2.org/claims/identity/unlockTime<span class="kw">&lt;/ax2336:localClaimURI&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">......</a>
<a class="sourceLine" id="cb2-20" title="20">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:LocalClaimDTO&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-21" title="21">            <span class="kw">&lt;ax2336:attributeMappings</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:AttributeMappingDTO&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-22" title="22">               <span class="kw">&lt;ax2336:attributeName&gt;</span>email<span class="kw">&lt;/ax2336:attributeName&gt;</span></a>
<a class="sourceLine" id="cb2-23" title="23">               <span class="kw">&lt;ax2336:userStoreDomain&gt;</span>PRIMARY<span class="kw">&lt;/ax2336:userStoreDomain&gt;</span></a>
<a class="sourceLine" id="cb2-24" title="24">            <span class="kw">&lt;/ax2336:attributeMappings&gt;</span></a>
<a class="sourceLine" id="cb2-25" title="25">            <span class="kw">&lt;ax2336:claimProperties</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2336:ClaimPropertyDTO&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-26" title="26">               <span class="kw">&lt;ax2336:propertyName&gt;</span>email<span class="kw">&lt;/ax2336:propertyName&gt;</span></a>
<a class="sourceLine" id="cb2-27" title="27">               <span class="kw">&lt;ax2336:propertyValue&gt;</span>www.sample@email.com<span class="kw">&lt;/ax2336:propertyValue&gt;</span></a>
<a class="sourceLine" id="cb2-28" title="28">            <span class="kw">&lt;/ax2336:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb2-29" title="29">            <span class="kw">&lt;ax2336:localClaimURI&gt;</span>http://abc.org/email<span class="kw">&lt;/ax2336:localClaimURI&gt;</span></a>
<a class="sourceLine" id="cb2-30" title="30">         <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-31" title="31">      <span class="kw">&lt;/ns:getLocalClaimsResponse&gt;</span></a>
<a class="sourceLine" id="cb2-32" title="32">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-33" title="33"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**removeClaimDialect()**

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove an existing claim dialect.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>claimDialectURI</code></pre></td>
<td>The URI which defines the deleting claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-780350223" class="expand-container">
<div id="expander-control-780350223" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-780350223" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:xsd1=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">      <span class="kw">&lt;xsd:removeClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="kw">&lt;xsd:claimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="kw">&lt;xsd1:claimDialectURI&gt;</span>claim dialect uri<span class="kw">&lt;/xsd1:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">         <span class="kw">&lt;/xsd:claimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">      <span class="kw">&lt;/xsd:removeClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-722905048" class="expand-container">
<div id="expander-control-722905048" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-722905048" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3">      <span class="kw">&lt;ns:removeClaimDialectResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="kw">&lt;/ns:removeClaimDialectResponse&gt;</span></a>
<a class="sourceLine" id="cb3-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**removeExternalClaim()**

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove an existing external claim</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim which need to be deleted.</td>
</tr>
</tbody>
</table>
</div>
<p><strong></strong></p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-2072785527" class="expand-container">
<div id="expander-control-2072785527" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-2072785527" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">      <span class="kw">&lt;xsd:removeExternalClaim&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="kw">&lt;xsd:externalClaimDialectURI&gt;</span>http://abc.org/email<span class="kw">&lt;/xsd:externalClaimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">         <span class="kw">&lt;xsd:externalClaimURI&gt;</span>sample@email.com<span class="kw">&lt;/xsd:externalClaimURI&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">      <span class="kw">&lt;/xsd:removeExternalClaim&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-1605257534" class="expand-container">
<div id="expander-control-1605257534" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-1605257534" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3">      <span class="kw">&lt;ns:removeExternalClaimResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="kw">&lt;/ns:removeExternalClaimResponse&gt;</span></a>
<a class="sourceLine" id="cb3-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**removeLocalClaim()**

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove an existing local claim.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>localClaimURI</code></pre></td>
<td>The URI which defines the local claim.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-1358357877" class="expand-container">
<div id="expander-control-1358357877" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-1358357877" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">      <span class="kw">&lt;xsd:removeLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="kw">&lt;xsd:localClaimURI&gt;</span>local claim uri<span class="kw">&lt;/xsd:localClaimURI&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">      <span class="kw">&lt;/xsd:removeLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-955617804" class="expand-container">
<div id="expander-control-955617804" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-955617804" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3">      <span class="kw">&lt;ns:removeLocalClaimResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="kw">&lt;/ns:removeLocalClaimResponse&gt;</span></a>
<a class="sourceLine" id="cb3-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**renameClaimDialect()**

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Renaming an existing claim dialect.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>claimDialectURI</code></pre></td>
<td>The URI which defines the claim dialect.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-1730016814" class="expand-container">
<div id="expander-control-1730016814" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-1730016814" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:xsd1=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">      <span class="kw">&lt;xsd:renameClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">         <span class="kw">&lt;xsd:oldClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">            <span class="kw">&lt;xsd1:claimDialectURI&gt;</span>old claim dialect uri<span class="kw">&lt;/xsd1:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">         <span class="kw">&lt;/xsd:oldClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">         <span class="kw">&lt;xsd:newClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">            <span class="kw">&lt;xsd1:claimDialectURI&gt;</span>new claim dialect uri<span class="kw">&lt;/xsd1:claimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">         <span class="kw">&lt;/xsd:newClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">      <span class="kw">&lt;/xsd:renameClaimDialect&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-393139777" class="expand-container">
<div id="expander-control-393139777" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-393139777" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3">      <span class="kw">&lt;ns:renameClaimDialectResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb3-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="kw">&lt;/ns:renameClaimDialectResponse&gt;</span></a>
<a class="sourceLine" id="cb3-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb3-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**updateExternalClaim()**

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Update an external claim.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>externalClaimDialectURI</code></pre></td>
<td>The URI which defines the external claim dialect.</td>
</tr>
<tr class="even">
<td><pre><code>externalClaimURI</code></pre></td>
<td>The URI which defines the external claim.</td>
</tr>
<tr class="odd">
<td><pre><code>mappedLocalClaimURI</code></pre></td>
<td>The URI which defines the mapped local claim.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-1413771610" class="expand-container">
<div id="expander-control-1413771610" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-1413771610" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:xsd1=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb4-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb4-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb4-4" title="4">      <span class="kw">&lt;xsd:updateExternalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-6" title="6">         <span class="kw">&lt;xsd:externalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-7" title="7">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-8" title="8">            <span class="kw">&lt;xsd1:externalClaimDialectURI&gt;</span>external claim dialect<span class="kw">&lt;/xsd1:externalClaimDialectURI&gt;</span></a>
<a class="sourceLine" id="cb4-9" title="9">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-10" title="10">            <span class="kw">&lt;xsd1:externalClaimURI&gt;</span>external claim uri<span class="kw">&lt;/xsd1:externalClaimURI&gt;</span></a>
<a class="sourceLine" id="cb4-11" title="11">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb4-12" title="12">            <span class="kw">&lt;xsd1:mappedLocalClaimURI&gt;</span>mapped local claim value<span class="kw">&lt;/xsd1:mappedLocalClaimURI&gt;</span></a>
<a class="sourceLine" id="cb4-13" title="13">         <span class="kw">&lt;/xsd:externalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-14" title="14">      <span class="kw">&lt;/xsd:updateExternalClaim&gt;</span></a>
<a class="sourceLine" id="cb4-15" title="15">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb4-16" title="16"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-1538020354" class="expand-container">
<div id="expander-control-1538020354" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-1538020354" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb5-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb5-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb5-3" title="3">      <span class="kw">&lt;ns:updateExternalClaimResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb5-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb5-5" title="5">      <span class="kw">&lt;/ns:updateExternalClaimResponse&gt;</span></a>
<a class="sourceLine" id="cb5-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb5-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**updateLocalClaim()**

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Update a local claim</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>attributeName</code></pre></td>
<td>The attribute name</td>
</tr>
<tr class="even">
<td><pre><code>userStoreDomain</code></pre></td>
<td>The user-store domain</td>
</tr>
<tr class="odd">
<td><pre><code>propertyName</code></pre></td>
<td>The property name</td>
</tr>
<tr class="even">
<td><pre><code>propertyValue</code></pre></td>
<td>The property value</td>
</tr>
<tr class="odd">
<td><pre><code>localClaimURI</code></pre></td>
<td>The URI which defines the local claim</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<div id="expander-740874138" class="expand-container">
<div id="expander-control-740874138" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the request
</div>
<div id="expander-content-740874138" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb6-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="ot"> xmlns:xsd1=</span><span class="st">&quot;http://dto.mgt.metadata.claim.identity.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb6-2" title="2">   <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb6-3" title="3">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb6-4" title="4">      <span class="kw">&lt;xsd:updateLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb6-5" title="5">         <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-6" title="6">         <span class="kw">&lt;xsd:localClaim&gt;</span></a>
<a class="sourceLine" id="cb6-7" title="7">            <span class="co">&lt;!--Zero or more repetitions:--&gt;</span></a>
<a class="sourceLine" id="cb6-8" title="8">            <span class="kw">&lt;xsd1:attributeMappings&gt;</span></a>
<a class="sourceLine" id="cb6-9" title="9">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-10" title="10">               <span class="kw">&lt;xsd1:attributeName&gt;</span>attribute name<span class="kw">&lt;/xsd1:attributeName&gt;</span></a>
<a class="sourceLine" id="cb6-11" title="11">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-12" title="12">               <span class="kw">&lt;xsd1:userStoreDomain&gt;</span>userstore domain<span class="kw">&lt;/xsd1:userStoreDomain&gt;</span></a>
<a class="sourceLine" id="cb6-13" title="13">            <span class="kw">&lt;/xsd1:attributeMappings&gt;</span></a>
<a class="sourceLine" id="cb6-14" title="14">            <span class="co">&lt;!--Zero or more repetitions:--&gt;</span></a>
<a class="sourceLine" id="cb6-15" title="15">            <span class="kw">&lt;xsd1:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb6-16" title="16">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-17" title="17">               <span class="kw">&lt;xsd1:propertyName&gt;</span>property name<span class="kw">&lt;/xsd1:propertyName&gt;</span></a>
<a class="sourceLine" id="cb6-18" title="18">               <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-19" title="19">               <span class="kw">&lt;xsd1:propertyValue&gt;</span>property value<span class="kw">&lt;/xsd1:propertyValue&gt;</span></a>
<a class="sourceLine" id="cb6-20" title="20">            <span class="kw">&lt;/xsd1:claimProperties&gt;</span></a>
<a class="sourceLine" id="cb6-21" title="21">            <span class="co">&lt;!--Optional:--&gt;</span></a>
<a class="sourceLine" id="cb6-22" title="22">            <span class="kw">&lt;xsd1:localClaimURI&gt;</span>local claim uri<span class="kw">&lt;/xsd1:localClaimURI&gt;</span></a>
<a class="sourceLine" id="cb6-23" title="23">         <span class="kw">&lt;/xsd:localClaim&gt;</span></a>
<a class="sourceLine" id="cb6-24" title="24">      <span class="kw">&lt;/xsd:updateLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb6-25" title="25">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb6-26" title="26"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<div id="expander-723204301" class="expand-container">
<div id="expander-control-723204301" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the response
</div>
<div id="expander-content-723204301" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb7-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb7-2" title="2">   <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb7-3" title="3">      <span class="kw">&lt;ns:updateLocalClaimResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://org.apache.axis2/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb7-4" title="4">         <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb7-5" title="5">      <span class="kw">&lt;/ns:rupdateLocalClaimResponse&gt;</span></a>
<a class="sourceLine" id="cb7-6" title="6">   <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb7-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>
