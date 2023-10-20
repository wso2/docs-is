# Manage Tenants with SOAP APIs

This section guides you through invoking and working with the **Tenant**
**ManagementService** and the operations you can work within this
service.

---

## Invoke the admin service

`         TenantMgtAdminService        ` is an admin service of the WSO2
Carbon platform. As admin services are secured to prevent anonymous
invocations, you cannot view the WSDL of the admin service by default.
Follow the steps below to view and invoke it:

1.  Set the  bellow configuration in
        `           <IS_HOME>/repository/conf/deployment.toml          ` file.

    ``` 
    [admin_service.wsdl]
    enable = true
    ```

2.  Restart the Identity Server.
3.  If you have started the server in default configurations, use the
    following URL in your browser to see the WSDL of the admin service:
    <https://localhost:9443/services/TenantMgtAdminService?wsdl>.

For more information on WSO2 admin services and how to invoke an admin
service using either SoapUI or any other client program, see [Call
Admin Services]({{base_path}}/develop/apis/call-admin-services).

---

## Operations included in the API

The following operations are available in the **TenantManagement**
**Service** :

### addTenant()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new tenant.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean</td>
<td>TenantInfoBean</td>
<td>Contains tenant related data</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.active</td>
<td>Boolean</td>
<td><p>True - activate the tenant</p>
<p>False- deactivate the tenant</p></td>
</tr>
<tr class="even">
<td>tenantInfoBean.admin</td>
<td>String</td>
<td>The admin username</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.adminPassword</td>
<td>String</td>
<td>The admin password</td>
</tr>
<tr class="even">
<td>tenantInfoBean.createdDate</td>
<td>DateTime</td>
<td>The date and time that the tenant was created</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.email</td>
<td>String</td>
<td>The email address of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.firstname</td>
<td>String</td>
<td>The first name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.lastname</td>
<td>String</td>
<td>The last name of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.originatedService</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.successKey</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The tenant domain</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.tenantId</td>
<td>Int</td>
<td>The tenant ID</td>
</tr>
<tr class="even">
<td>tenantInfoBean.usagePlan</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the request</summary>
<p><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">&lt;ser:addTenant&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="kw">&lt;ser:tenantInfoBean&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-8" title="8">                <span class="kw">&lt;xsd:active&gt;</span>true<span class="kw">&lt;/xsd:active&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-10" title="10">                <span class="kw">&lt;xsd:admin&gt;</span>testuser<span class="kw">&lt;/xsd:admin&gt;</span></a>
<a class="sourceLine" id="cb1-11" title="11">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-12" title="12">                <span class="kw">&lt;xsd:adminPassword&gt;</span>testpw<span class="kw">&lt;/xsd:adminPassword&gt;</span></a>
<a class="sourceLine" id="cb1-13" title="13">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-14" title="14">                <span class="kw">&lt;xsd:createdDate&gt;&lt;/xsd:createdDate&gt;</span></a>
<a class="sourceLine" id="cb1-15" title="15">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-16" title="16">                <span class="kw">&lt;xsd:email&gt;</span>testuser@example.com<span class="kw">&lt;/xsd:email&gt;</span></a>
<a class="sourceLine" id="cb1-17" title="17">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-18" title="18">                <span class="kw">&lt;xsd:firstname&gt;</span>First<span class="kw">&lt;/xsd:firstname&gt;</span></a>
<a class="sourceLine" id="cb1-19" title="19">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-20" title="20">                <span class="kw">&lt;xsd:lastname&gt;</span>Last<span class="kw">&lt;/xsd:lastname&gt;</span></a>
<a class="sourceLine" id="cb1-21" title="21">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-22" title="22">                <span class="kw">&lt;xsd:originatedService&gt;&lt;/xsd:originatedService&gt;</span></a>
<a class="sourceLine" id="cb1-23" title="23">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-24" title="24">                <span class="kw">&lt;xsd:successKey&gt;&lt;/xsd:successKey&gt;</span></a>
<a class="sourceLine" id="cb1-25" title="25">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-26" title="26">                <span class="kw">&lt;xsd:tenantDomain&gt;</span>example.com<span class="kw">&lt;/xsd:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb1-27" title="27">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-28" title="28">                <span class="kw">&lt;xsd:tenantId&gt;&lt;/xsd:tenantId&gt;</span></a>
<a class="sourceLine" id="cb1-29" title="29">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-30" title="30">                <span class="kw">&lt;xsd:usagePlan&gt;&lt;/xsd:usagePlan&gt;</span></a>
<a class="sourceLine" id="cb1-31" title="31">            <span class="kw">&lt;/ser:tenantInfoBean&gt;</span></a>
<a class="sourceLine" id="cb1-32" title="32">        <span class="kw">&lt;/ser:addTenant&gt;</span></a>
<a class="sourceLine" id="cb1-33" title="33">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-34" title="34"><span class="kw">&lt;/soapenv:Envelope&gt;</span>             </a></code></pre></div>
</p></div></details>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

---

### addSkeletonTenant()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new tenant without userstore operations. The tenant will not be persisted in user store level and can be used to trigger post-tenant listeners without actually creating the tenant. </td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean</td>
<td>TenantInfoBean</td>
<td>Contains tenant related data</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.active</td>
<td>Boolean</td>
<td><p>True - activate the tenant</p>
<p>False- deactivate the tenant</p></td>
</tr>
<tr class="even">
<td>tenantInfoBean.admin</td>
<td>String</td>
<td>The admin username</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.adminPassword</td>
<td>String</td>
<td>The admin password</td>
</tr>
<tr class="even">
<td>tenantInfoBean.createdDate</td>
<td>DateTime</td>
<td>The date and time that the tenant was created</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.email</td>
<td>String</td>
<td>The email address of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.firstname</td>
<td>String</td>
<td>The first name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.lastname</td>
<td>String</td>
<td>The last name of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.originatedService</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.successKey</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The tenant domain</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.tenantId</td>
<td>Int</td>
<td>The tenant ID</td>
</tr>
<tr class="even">
<td>tenantInfoBean.usagePlan</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the request</summary>
<p><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">&lt;ser:addSkeletonTenant&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="kw">&lt;ser:tenantInfoBean&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-8" title="8">                <span class="kw">&lt;xsd:active&gt;</span>true<span class="kw">&lt;/xsd:active&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-10" title="10">                <span class="kw">&lt;xsd:admin&gt;</span>testuser<span class="kw">&lt;/xsd:admin&gt;</span></a>
<a class="sourceLine" id="cb1-11" title="11">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-12" title="12">                <span class="kw">&lt;xsd:adminPassword&gt;</span>testpw<span class="kw">&lt;/xsd:adminPassword&gt;</span></a>
<a class="sourceLine" id="cb1-13" title="13">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-14" title="14">                <span class="kw">&lt;xsd:createdDate&gt;&lt;/xsd:createdDate&gt;</span></a>
<a class="sourceLine" id="cb1-15" title="15">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-16" title="16">                <span class="kw">&lt;xsd:email&gt;</span>testuser@example.com<span class="kw">&lt;/xsd:email&gt;</span></a>
<a class="sourceLine" id="cb1-17" title="17">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-18" title="18">                <span class="kw">&lt;xsd:firstname&gt;</span>First<span class="kw">&lt;/xsd:firstname&gt;</span></a>
<a class="sourceLine" id="cb1-19" title="19">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-20" title="20">                <span class="kw">&lt;xsd:lastname&gt;</span>Last<span class="kw">&lt;/xsd:lastname&gt;</span></a>
<a class="sourceLine" id="cb1-21" title="21">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-22" title="22">                <span class="kw">&lt;xsd:originatedService&gt;&lt;/xsd:originatedService&gt;</span></a>
<a class="sourceLine" id="cb1-23" title="23">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-24" title="24">                <span class="kw">&lt;xsd:successKey&gt;&lt;/xsd:successKey&gt;</span></a>
<a class="sourceLine" id="cb1-25" title="25">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-26" title="26">                <span class="kw">&lt;xsd:tenantDomain&gt;</span>example.com<span class="kw">&lt;/xsd:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb1-27" title="27">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-28" title="28">                <span class="kw">&lt;xsd:tenantId&gt;&lt;/xsd:tenantId&gt;</span></a>
<a class="sourceLine" id="cb1-29" title="29">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-30" title="30">                <span class="kw">&lt;xsd:usagePlan&gt;&lt;/xsd:usagePlan&gt;</span></a>
<a class="sourceLine" id="cb1-31" title="31">            <span class="kw">&lt;/ser:tenantInfoBean&gt;</span></a>
<a class="sourceLine" id="cb1-32" title="32">        <span class="kw">&lt;/ser:addSkeletonTenant&gt;</span></a>
<a class="sourceLine" id="cb1-33" title="33">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-34" title="34"><span class="kw">&lt;/soapenv:Envelope&gt;</span>             </a></code></pre></div>
</p></div></details>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

---

### activateTenant()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Activates an existing tenant.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/modify/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb1-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;ser:activateTenant&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="kw">&lt;ser:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ser:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">        <span class="kw">&lt;/ser:activateTenant&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10"><span class="kw">&lt;/soapenv:Envelope&gt;</span>              </a></code></pre></div>
<p></details>
</div></div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the response</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:activateTenantResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">        <span class="kw">&lt;/ns:activateTenantResponse&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### deactivateTenant()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Deactivates an existing tenant.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/modify/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb1-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;ser:deactivateTenant&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="kw">&lt;ser:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ser:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">        <span class="kw">&lt;/ser:deactivateTenant&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10"><span class="kw">&lt;/soapenv:Envelope&gt;</span>               </a></code></pre></div></details>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:deactivateTenantResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">        <span class="kw">&lt;/ns:deactivateTenantResponse&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### getTenant()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Retrieves tenant details by domain name.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb1-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;ser:getTenant&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="kw">&lt;ser:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ser:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">        <span class="kw">&lt;/ser:getTenant&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10"><span class="kw">&lt;/soapenv:Envelope&gt;</span>              </a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:getTenantResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2582:TenantInfoBean&quot;</span><span class="ot"> xmlns:ax2584=</span><span class="st">&quot;http://beans.mgt.tenant.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2582=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">                <span class="kw">&lt;ax2582:active&gt;</span>true<span class="kw">&lt;/ax2582:active&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">                <span class="kw">&lt;ax2582:admin&gt;</span>test<span class="kw">&lt;/ax2582:admin&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">                <span class="kw">&lt;ax2582:adminPassword</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">                <span class="kw">&lt;ax2582:createdDate&gt;</span>2015­02­13T07:27:17.543+05:30<span class="kw">&lt;/ax2582:createdDate&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">                <span class="kw">&lt;ax2582:email&gt;</span>test@example.com<span class="kw">&lt;/ax2582:email&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">                <span class="kw">&lt;ax2582:firstname&gt;</span>Test<span class="kw">&lt;/ax2582:firstname&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">                <span class="kw">&lt;ax2582:lastname&gt;</span>User<span class="kw">&lt;/ax2582:lastname&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">                <span class="kw">&lt;ax2582:originatedService</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">                <span class="kw">&lt;ax2582:successKey</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">                <span class="kw">&lt;ax2582:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ax2582:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">                <span class="kw">&lt;ax2582:tenantId&gt;</span>1<span class="kw">&lt;/ax2582:tenantId&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">                <span class="kw">&lt;ax2582:usagePlan/&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">            <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">        <span class="kw">&lt;/ns:getTenantResponse&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-20" title="20"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### retrievePaginatedPartialSearchTenants()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Retrieves the tenant information based on the partial search.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenant</td>
<td>String</td>
<td>Partial tenant domain name</td>
</tr>
<tr class="even">
<td>pageNumber</td>
<td>Int</td>
<td>Page number</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">&lt;ser:retrievePaginatedPartialSearchTenants&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="kw">&lt;ser:domain&gt;</span>.com<span class="kw">&lt;/ser:domain&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-8" title="8">            <span class="kw">&lt;ser:pageNumber&gt;</span>1<span class="kw">&lt;/ser:pageNumber&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">        <span class="kw">&lt;/ser:retrievePaginatedPartialSearchTenants&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-11" title="11"><span class="kw">&lt;/soapenv:Envelope&gt;</span>             </a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:retrievePaginatedPartialSearchTenantsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2584:PaginatedTenantInfoBean&quot;</span><span class="ot"> xmlns:ax2584=</span><span class="st">&quot;http://beans.mgt.tenant.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2582=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">                <span class="kw">&lt;ax2584:numberOfPages&gt;</span>1<span class="kw">&lt;/ax2584:numberOfPages&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">                <span class="kw">&lt;ax2584:tenantInfoBeans</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2582:TenantInfoBean&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">                    <span class="kw">&lt;ax2582:active&gt;</span>true<span class="kw">&lt;/ax2582:active&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">                    <span class="kw">&lt;ax2582:admin</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">                    <span class="kw">&lt;ax2582:adminPassword</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">                    <span class="kw">&lt;ax2582:createdDate&gt;</span>2015­02­13T07:27:17.543+05:30<span class="kw">&lt;/ax2582:createdDate&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">                    <span class="kw">&lt;ax2582:email&gt;</span>test@example.com<span class="kw">&lt;/ax2582:email&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">                    <span class="kw">&lt;ax2582:firstname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">                    <span class="kw">&lt;ax2582:lastname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">                    <span class="kw">&lt;ax2582:originatedService</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">                    <span class="kw">&lt;ax2582:successKey</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">                    <span class="kw">&lt;ax2582:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ax2582:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">                    <span class="kw">&lt;ax2582:tenantId&gt;</span>1<span class="kw">&lt;/ax2582:tenantId&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">                    <span class="kw">&lt;ax2582:usagePlan</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">                <span class="kw">&lt;/ax2584:tenantInfoBeans&gt;</span></a>
<a class="sourceLine" id="cb2-20" title="20">            <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-21" title="21">        <span class="kw">&lt;/ns:retrievePaginatedPartialSearchTenantsResponse&gt;</span></a>
<a class="sourceLine" id="cb2-22" title="22">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-23" title="23"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### retrievePaginatedTenants()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Activates an existing tenant.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>pageNumber</td>
<td>Int</td>
<td>Page number</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb1-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;ser:retrievePaginatedTenants&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="kw">&lt;ser:pageNumber&gt;</span>1<span class="kw">&lt;/ser:pageNumber&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">        <span class="kw">&lt;/ser:retrievePaginatedTenants&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10"><span class="kw">&lt;/soapenv:Envelope&gt;</span>          </a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:retrievePaginatedTenantsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2584:PaginatedTenantInfoBean&quot;</span><span class="ot"> xmlns:ax2584=</span><span class="st">&quot;http://beans.mgt.tenant.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2582=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">                <span class="kw">&lt;ax2584:numberOfPages&gt;</span>1<span class="kw">&lt;/ax2584:numberOfPages&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">                <span class="kw">&lt;ax2584:tenantInfoBeans</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2582:TenantInfoBean&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">                    <span class="kw">&lt;ax2582:active&gt;</span>true<span class="kw">&lt;/ax2582:active&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">                    <span class="kw">&lt;ax2582:admin</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">                    <span class="kw">&lt;ax2582:adminPassword</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">                    <span class="kw">&lt;ax2582:createdDate&gt;</span>2015­02­13T07:27:17.543+05:30<span class="kw">&lt;/ax2582:createdDate&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">                    <span class="kw">&lt;ax2582:email&gt;</span>test@example.com<span class="kw">&lt;/ax2582:email&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">                    <span class="kw">&lt;ax2582:firstname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">                    <span class="kw">&lt;ax2582:lastname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">                    <span class="kw">&lt;ax2582:originatedService</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">                    <span class="kw">&lt;ax2582:successKey</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">                    <span class="kw">&lt;ax2582:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ax2582:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">                    <span class="kw">&lt;ax2582:tenantId&gt;</span>1<span class="kw">&lt;/ax2582:tenantId&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">                    <span class="kw">&lt;ax2582:usagePlan</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">                <span class="kw">&lt;/ax2584:tenantInfoBeans&gt;</span></a>
<a class="sourceLine" id="cb2-20" title="20">            <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-21" title="21">        <span class="kw">&lt;/ns:retrievePaginatedTenantsResponse&gt;</span></a>
<a class="sourceLine" id="cb2-22" title="22">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-23" title="23"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### retrievePartialSearchTenants()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Retrieves all tenants that contain the specified part of the domain name (e.g., All tenant domains with ‘.com’)</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>domain</td>
<td>String</td>
<td>Partial tenant domain name</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p> 
<div id="expander-content-288952916" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="ot"> xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">&lt;ser:retrievePartialSearchTenants&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="kw">&lt;ser:domain&gt;</span>.com<span class="kw">&lt;/ser:domain&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7">        <span class="kw">&lt;/ser:retrievePartialSearchTenants&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-9" title="9"><span class="kw">&lt;/soapenv:Envelope&gt;</span>             </a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:retrievePartialSearchTenantsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="ot"> xmlns:ax2584=</span><span class="st">&quot;http://beans.mgt.tenant.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2582=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2582:TenantInfoBean&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">                <span class="kw">&lt;ax2582:active&gt;</span>true<span class="kw">&lt;/ax2582:active&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">                <span class="kw">&lt;ax2582:admin</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">                <span class="kw">&lt;ax2582:adminPassword</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">                <span class="kw">&lt;ax2582:createdDate&gt;</span>2015­02­13T07:27:17.543+05:30<span class="kw">&lt;/ax2582:createdDate&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">                <span class="kw">&lt;ax2582:email&gt;</span>test@example.com<span class="kw">&lt;/ax2582:email&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">                <span class="kw">&lt;ax2582:firstname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">                <span class="kw">&lt;ax2582:lastname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">                <span class="kw">&lt;ax2582:originatedService</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">                <span class="kw">&lt;ax2582:successKey</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">                <span class="kw">&lt;ax2582:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ax2582:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">                <span class="kw">&lt;ax2582:tenantId&gt;</span>1<span class="kw">&lt;/ax2582:tenantId&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">                <span class="kw">&lt;ax2582:usagePlan</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">            <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">        <span class="kw">&lt;/ns:retrievePartialSearchTenantsResponse&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-20" title="20"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### retrieveTenants()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Retrieves all tenants.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><p>None</p></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb1-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;ser:retrieveTenants/&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span>             </a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:retrieveTenantsResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="ot"> xmlns:ax2584=</span><span class="st">&quot;http://beans.mgt.tenant.carbon.wso2.org/xsd&quot;</span><span class="ot"> xmlns:ax2582=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:type=</span><span class="st">&quot;ax2582:TenantInfoBean&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">                <span class="kw">&lt;ax2582:active&gt;</span>true<span class="kw">&lt;/ax2582:active&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">                <span class="kw">&lt;ax2582:admin</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7">                <span class="kw">&lt;ax2582:adminPassword</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-8" title="8">                <span class="kw">&lt;ax2582:createdDate&gt;</span>2015­02­13T07:27:17.543+05:30<span class="kw">&lt;/ax2582:createdDate&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">                <span class="kw">&lt;ax2582:email&gt;</span>test@example.com<span class="kw">&lt;/ax2582:email&gt;</span></a>
<a class="sourceLine" id="cb2-10" title="10">                <span class="kw">&lt;ax2582:firstname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-11" title="11">                <span class="kw">&lt;ax2582:lastname</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-12" title="12">                <span class="kw">&lt;ax2582:originatedService</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-13" title="13">                <span class="kw">&lt;ax2582:successKey</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-14" title="14">                <span class="kw">&lt;ax2582:tenantDomain&gt;</span>example.com<span class="kw">&lt;/ax2582:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb2-15" title="15">                <span class="kw">&lt;ax2582:tenantId&gt;</span>1<span class="kw">&lt;/ax2582:tenantId&gt;</span></a>
<a class="sourceLine" id="cb2-16" title="16">                <span class="kw">&lt;ax2582:usagePlan</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-17" title="17">            <span class="kw">&lt;/ns:return&gt;</span></a>
<a class="sourceLine" id="cb2-18" title="18">        <span class="kw">&lt;/ns:retrieveTenantsResponse&gt;</span></a>
<a class="sourceLine" id="cb2-19" title="19">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-20" title="20"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

### updateTenant()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Updates the tenant details based on the specified tenantId. To update the password, the respective admin name should be included.</td>
</tr>
<tr class="even">
<td>Permission Level</td>
<td>/permission/protected/manage/modify/tenants</td>
</tr>
<tr class="odd">
<td>Input Parameters</td>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean</td>
<td>TenantInfoBean</td>
<td>Contains tenant related data</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.active</td>
<td>Boolean</td>
<td><p>True - activate the tenant</p>
<p>False- deactivate the tenant</p></td>
</tr>
<tr class="even">
<td>tenantInfoBean.admin</td>
<td>String</td>
<td>The admin username</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.adminPassword</td>
<td>String</td>
<td>The admin password</td>
</tr>
<tr class="even">
<td>tenantInfoBean.createdDate</td>
<td>DateTime</td>
<td>The date and time that the tenant was created</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.email</td>
<td>String</td>
<td>The email address of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.firstname</td>
<td>String</td>
<td>The first name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.lastname</td>
<td>String</td>
<td>The last name of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.originatedService</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.successKey</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The tenant domain</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.tenantId</td>
<td>Int</td>
<td>The tenant ID</td>
</tr>
<tr class="even">
<td>tenantInfoBean.usagePlan</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the request</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="er"> </span></a>
<a class="sourceLine" id="cb1-2" title="2"><span class="ot">xmlns:ser=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="ot"> xmlns:xsd=</span><span class="st">&quot;http://beans.common.stratos.carbon.wso2.org/xsd&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;soapenv:Header/&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">        <span class="kw">&lt;ser:updateTenant&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="kw">&lt;ser:tenantInfoBean&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-9" title="9">                <span class="kw">&lt;xsd:active&gt;</span>true<span class="kw">&lt;/xsd:active&gt;</span></a>
<a class="sourceLine" id="cb1-10" title="10">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-11" title="11">                <span class="kw">&lt;xsd:admin&gt;</span>test<span class="kw">&lt;/xsd:admin&gt;</span></a>
<a class="sourceLine" id="cb1-12" title="12">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-13" title="13">                <span class="kw">&lt;xsd:adminPassword&gt;</span>testpw<span class="kw">&lt;/xsd:adminPassword&gt;</span></a>
<a class="sourceLine" id="cb1-14" title="14">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-15" title="15">                <span class="kw">&lt;xsd:createdDate&gt;&lt;/xsd:createdDate&gt;</span></a>
<a class="sourceLine" id="cb1-16" title="16">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-17" title="17">                <span class="kw">&lt;xsd:email&gt;</span>testuser@example.com<span class="kw">&lt;/xsd:email&gt;</span></a>
<a class="sourceLine" id="cb1-18" title="18">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-19" title="19">                <span class="kw">&lt;xsd:firstname&gt;</span>test<span class="kw">&lt;/xsd:firstname&gt;</span></a>
<a class="sourceLine" id="cb1-20" title="20">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-21" title="21">                <span class="kw">&lt;xsd:lastname&gt;</span>user<span class="kw">&lt;/xsd:lastname&gt;</span></a>
<a class="sourceLine" id="cb1-22" title="22">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-23" title="23">                <span class="kw">&lt;xsd:originatedService&gt;&lt;/xsd:originatedService&gt;</span></a>
<a class="sourceLine" id="cb1-24" title="24">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-25" title="25">                <span class="kw">&lt;xsd:successKey&gt;&lt;/xsd:successKey&gt;</span></a>
<a class="sourceLine" id="cb1-26" title="26">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-27" title="27">                <span class="kw">&lt;xsd:tenantDomain&gt;</span>example.com<span class="kw">&lt;/xsd:tenantDomain&gt;</span></a>
<a class="sourceLine" id="cb1-28" title="28">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-29" title="29">                <span class="kw">&lt;xsd:tenantId&gt;</span>1<span class="kw">&lt;/xsd:tenantId&gt;</span></a>
<a class="sourceLine" id="cb1-30" title="30">                <span class="er">&lt;</span>!--­­Optional:­­--&gt;</a>
<a class="sourceLine" id="cb1-31" title="31">                <span class="kw">&lt;xsd:usagePlan&gt;&lt;/xsd:usagePlan&gt;</span></a>
<a class="sourceLine" id="cb1-32" title="32">            <span class="kw">&lt;/ser:tenantInfoBean&gt;</span></a>
<a class="sourceLine" id="cb1-33" title="33">        <span class="kw">&lt;/ser:updateTenant&gt;</span></a>
<a class="sourceLine" id="cb1-34" title="34">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb1-35" title="35"><span class="kw">&lt;/soapenv:Envelope&gt;</span>            </a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary>Click here to see the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;soapenv:Envelope</span><span class="ot"> xmlns:soapenv=</span><span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-3" title="3">        <span class="kw">&lt;ns:updateTenantResponse</span><span class="ot"> xmlns:ns=</span><span class="st">&quot;http://services.mgt.tenant.carbon.wso2.org&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb2-4" title="4">            <span class="kw">&lt;ns:return</span><span class="ot"> xsi:nil=</span><span class="st">&quot;true&quot;</span><span class="ot"> xmlns:xsi=</span><span class="st">&quot;http://www.w3.org/2001/XMLSchema­instance&quot;</span> <span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb2-5" title="5">        <span class="kw">&lt;/ns:updateTenantResponse&gt;</span></a>
<a class="sourceLine" id="cb2-6" title="6">    <span class="kw">&lt;/soapenv:Body&gt;</span></a>
<a class="sourceLine" id="cb2-7" title="7"><span class="kw">&lt;/soapenv:Envelope&gt;</span></a></code></pre></div></p></details><div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>
