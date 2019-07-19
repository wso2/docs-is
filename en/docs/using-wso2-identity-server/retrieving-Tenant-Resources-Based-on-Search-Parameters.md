# Retrieving Tenant Resources Based on Search Parameters

This section guides you through using the `         /search        `
endpoint of the [Configuration Management REST
API](_Using_the_Configuration_Management_REST_APIs_) to search for
tenant resources.  
See the sections below for instructions:

-   [/search
    endpoint](#RetrievingTenantResourcesBasedonSearchParameters-/searchendpoint)
-   [Writing a configuration management search
    query](#RetrievingTenantResourcesBasedonSearchParameters-SearchQueryWritingaconfigurationmanagementsearchquery)
    -   [Configuration management primitive search
        condition](#RetrievingTenantResourcesBasedonSearchParameters-Configurationmanagementprimitivesearchcondition)
    -   [Configuration management complex search
        condition](#RetrievingTenantResourcesBasedonSearchParameters-Configurationmanagementcomplexsearchcondition)
-   [Search
    scenarios](#RetrievingTenantResourcesBasedonSearchParameters-Searchscenarios)
    -   [Meta-data based
        search](#RetrievingTenantResourcesBasedonSearchParameters-Meta-databasedsearch)
    -   [Attribute-based
        search](#RetrievingTenantResourcesBasedonSearchParameters-Attribute-basedsearch)

### /search endpoint

The `         /search        ` endpoint of the [Configuration Management
REST API](index) allows you to perform cross-tenant search for resources
.

The search context URL should be as follows:

`         https://{host}:{port}/t/{tenant-domain}/api/identity/config-mgt/v1.0/search?$filter={search-query}        `

Here, the value of `         {search-query}        ` should be in the
form of a configuration management search query. For information on how
to write a search condition that is in the form of a configuration
management search query, see [Writing a configuration management search
query](#RetrievingTenantResourcesBasedonSearchParameters-SearchQuery).

### Writing a configuration management search query

Configuration management search query is a [Open Data
Protocol](https://www.odata.org/) based search query supported via
[Apache
CXF](http://cxf.apache.org/docs/jax-rs-search.html#JAX-RSSearch-OpenDataProtocol)
.

The configuration management search query is a search condition that is
built using primitive configuration management search conditions in the
form of a string. The following topics describe the configuration
management search conditions that you can use to write a configuration
management search query:

-   [Configuration management primitive search
    condition](#RetrievingTenantResourcesBasedonSearchParameters-Configurationmanagementprimitivesearchcondition)
-   [Configuration management complex search
    condition](#RetrievingTenantResourcesBasedonSearchParameters-Configurationmanagementcomplexsearchcondition)
-   [Meta-data based
    search](#RetrievingTenantResourcesBasedonSearchParameters-Meta-databasedsearch)
-   [Attribute-based
    search](#RetrievingTenantResourcesBasedonSearchParameters-Attribute-basedsearch)

#### Configuration management primitive search condition

A primitive search condition is a string in the following form:  
`         {RESOURCE_SEARCH_PARAMETER} {PRIMITIVE_CONDITION_OPERATOR} '{VALUE}'        `

Following are the parameters of a resource supported in a primitive
search condition and the corresponding values to replace the
`         {RESOURCE_SEARCH_PARAMETER}        ` place holder :

<table>
<colgroup>
<col style="width: 59%" />
<col style="width: 40%" />
</colgroup>
<thead>
<tr class="header">
<th>Resource parameter</th>
<th>Value to replace <code>             {RESOURCE_SEARCH_PARAMETER}            </code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Tenant domain</td>
<td><code>             tenantDomain            </code></td>
</tr>
<tr class="even">
<td>ID value of the resource type</td>
<td><code>             resourceTypeId            </code></td>
</tr>
<tr class="odd">
<td>Name of the resource type</td>
<td><code>             resourceTypeName            </code></td>
</tr>
<tr class="even">
<td>ID value of the resource</td>
<td><code>             resourceId            </code></td>
</tr>
<tr class="odd">
<td>Name of the resource</td>
<td><code>             resourceName            </code></td>
</tr>
<tr class="even">
<td>A key of the attribute</td>
<td><code>             attributeKey            </code></td>
</tr>
<tr class="odd">
<td>Value of the attribute</td>
<td><code>             attributeValue            </code></td>
</tr>
</tbody>
</table>

Following are the operators supported in a primitive condition and the
corresponding values to replace the
`         {PRIMITIVE_CONDITION_OPERATOR}        ` place holder :

<table>
<colgroup>
<col style="width: 54%" />
<col style="width: 45%" />
</colgroup>
<thead>
<tr class="header">
<th>Primitive condition operator</th>
<th>Value to replace <code>             {PRIMITIVE_CONDITION_OPERATOR}            </code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Equal</td>
<td><code>             eq            </code></td>
</tr>
<tr class="even">
<td>Not equal</td>
<td><code>             ne            </code></td>
</tr>
<tr class="odd">
<td>Less than</td>
<td><code>             lt            </code></td>
</tr>
<tr class="even">
<td>Less or equal</td>
<td><code>             le            </code></td>
</tr>
<tr class="odd">
<td>Greater than</td>
<td><code>             gt            </code></td>
</tr>
<tr class="even">
<td>Greater or equal</td>
<td><code>             ge            </code></td>
</tr>
</tbody>
</table>

#### Configuration management complex search condition

A complex search condition is generally built by combining primitive
search conditions. The simplest form of a complex search condition
string is as follows:

`         {PRIMITIVE_SEARCH_CONDITION_1} {COMPLEX_CONDITION_OPERATOR} {PRIMITIVE_SEARCH_CONDITION_2}        `

Two complex search condition created as mentioned above can also be
joined as follows to form another complex search condition:

`         {COMPLEX_SEARCH_CONDITION_1} {COMPLEX_CONDITION_OPERATOR} {COMPLEX_SEARCH_CONDITION_2}        `

!!! note
    
    Note
    
    For better readability, it is recommended to use parentheses to group
    complex search conditions when you join conditions using a
    `         COMPLEX_CONDITION_OPERATOR        ` .
    

Following are the operators supported to build a complex search
condition and the corresponding values to replace the
`         {COMPLEX_CONDITION_OPERATOR}        ` place holder :

<table>
<colgroup>
<col style="width: 56%" />
<col style="width: 43%" />
</colgroup>
<thead>
<tr class="header">
<th>Complex condition operator</th>
<th>Value to replace <code>             {COMPLEX_CONDITION_OPERATOR}            </code></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>AND</td>
<td><code>             and            </code></td>
</tr>
<tr class="even">
<td>OR</td>
<td><code>             or            </code></td>
</tr>
</tbody>
</table>

Note

When you join complex search conditions together with complex condition
operators, the result is always another complex condition. Therefore,
any required search condition can be built as a configuration management
complex search condition in this manner.

### Search scenarios

This section demonstrates the different ways of searching for resources
(i.e. different search scenarios). In the scenarios given below, an HTTP
GET request is sent to the following location with
the {search-query} placeholder value replaced accordingly and encoded
for a URL. When you are trying out these scenarios, fill the {host},
{port} and the {tenant-domain} with the relevant values.

<table>
<tbody>
<tr class="odd">
<td><p>Reference</p></td>
<td><div class="content-wrapper">
<p>Super tenant:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">https:<span class="co">//{host}:{port}/api/identity/config-mgt/v1.0/search?$filter={search-query}</span></a></code></pre></div>
</div>
</div>
<p>Tenant:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">https:<span class="co">//{host}:{port}/t/{tenant-domain}/api/identity/config-mgt/v1.0/search?$filter={search-query}</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><p>Sample GET request for the super tenant</p></td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">https:<span class="co">//localhost:9443/t/carbon.super/api/identity/config-mgt/v1.0/search?$filter=tenantDomain eq ‘carbon.super’</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><p>Sample CURL command for a tenant</p></td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">curl -k -v --user admin:admin GET &#39;https:<span class="co">//localhost:9443/api/identity/config-mgt/v1.0/search?$filter=%28tenantDomain%20eq%20%27carbon.super%27%29&#39;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

Assume you have the following resources in your database.

<table>
<colgroup>
<col style="width: 30%" />
<col style="width: 69%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Resource JSON</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>resource_1</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">  <span class="st">&quot;name&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
<a class="sourceLine" id="cb1-3" title="3">  <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-4" title="4">    {</a>
<a class="sourceLine" id="cb1-5" title="5">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span></a>
<a class="sourceLine" id="cb1-7" title="7">    },</a>
<a class="sourceLine" id="cb1-8" title="8">    {</a>
<a class="sourceLine" id="cb1-9" title="9">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-10" title="10">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;123.com&quot;</span></a>
<a class="sourceLine" id="cb1-11" title="11">    }</a>
<a class="sourceLine" id="cb1-12" title="12">  ]</a>
<a class="sourceLine" id="cb1-13" title="13">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>resource_2</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{</a>
<a class="sourceLine" id="cb2-2" title="2">  <span class="st">&quot;name&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
<a class="sourceLine" id="cb2-3" title="3">  <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb2-4" title="4">    {</a>
<a class="sourceLine" id="cb2-5" title="5">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb2-6" title="6">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span></a>
<a class="sourceLine" id="cb2-7" title="7">    },</a>
<a class="sourceLine" id="cb2-8" title="8">    {</a>
<a class="sourceLine" id="cb2-9" title="9">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb2-10" title="10">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span></a>
<a class="sourceLine" id="cb2-11" title="11">    }</a>
<a class="sourceLine" id="cb2-12" title="12">  ]</a>
<a class="sourceLine" id="cb2-13" title="13">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>resource_3</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{</a>
<a class="sourceLine" id="cb3-2" title="2">  <span class="st">&quot;name&quot;</span>: <span class="st">&quot;resource_3&quot;</span>,</a>
<a class="sourceLine" id="cb3-3" title="3">  <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb3-4" title="4">    {</a>
<a class="sourceLine" id="cb3-5" title="5">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb3-6" title="6">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;xyz.com&quot;</span></a>
<a class="sourceLine" id="cb3-7" title="7">    },</a>
<a class="sourceLine" id="cb3-8" title="8">    {</a>
<a class="sourceLine" id="cb3-9" title="9">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb3-10" title="10">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span></a>
<a class="sourceLine" id="cb3-11" title="11">    }</a>
<a class="sourceLine" id="cb3-12" title="12">  ]</a>
<a class="sourceLine" id="cb3-13" title="13">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>resource_4</td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">{</a>
<a class="sourceLine" id="cb4-2" title="2">  <span class="st">&quot;name&quot;</span>: <span class="st">&quot;resource_4&quot;</span>,</a>
<a class="sourceLine" id="cb4-3" title="3">  <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb4-4" title="4">    {</a>
<a class="sourceLine" id="cb4-5" title="5">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb4-6" title="6">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span></a>
<a class="sourceLine" id="cb4-7" title="7">    },</a>
<a class="sourceLine" id="cb4-8" title="8">    {</a>
<a class="sourceLine" id="cb4-9" title="9">      <span class="st">&quot;key&quot;</span>: <span class="st">&quot;server&quot;</span>,</a>
<a class="sourceLine" id="cb4-10" title="10">      <span class="st">&quot;value&quot;</span>: <span class="st">&quot;smtp.com&quot;</span></a>
<a class="sourceLine" id="cb4-11" title="11">    }</a>
<a class="sourceLine" id="cb4-12" title="12">  ]</a>
<a class="sourceLine" id="cb4-13" title="13">}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

There are two approaches to search or filter the resources in your
database:

-   [Meta-data based
    search](#RetrievingTenantResourcesBasedonSearchParameters-Meta-databasedsearch)
-   [Attribute-based
    search](#RetrievingTenantResourcesBasedonSearchParameters-Attribute-basedsearch)

#### Meta-data based search

Use the following meta-data parameters to search for resources.

| Search Parameter of the Resource | {RESOURCE\_SEARCH\_PARAMETER} |
|----------------------------------|-------------------------------|
| Tenant domain                    | tenantDomain                  |
| ID value of the Resource Type    | resourceTypeId                |
| Name of the Resource Type        | resourceTypeName              |
| ID value of the Resource         | resourceId                    |
| Name of the Resource             | resourceName                  |

**Search for resources in a specific tenant domain**

The table below shows a sample search query that is used to search for
resources that are created in the super tenant domain.

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 59%" />
</colgroup>
<thead>
<tr class="header">
<th><p>{search-query}</p></th>
<th><p>Response JSON</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>tenantDomain eq 'carbon.super'</p></td>
<td><div class="content-wrapper">
<div class="panel" style="border-width: 1px;">
<div class="panelContent">
<div id="expander-2103833382" class="expand-container">
<div id="expander-control-2103833382" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
</div>
<div id="expander-content-2103833382" class="expand-content">
<p><br />
</p>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
<a class="sourceLine" id="cb1-3" title="3">        {</a>
<a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba&quot;</span>,</a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:59&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-11" title="11">                {</a>
<a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;aea8665f-d6d7-4ec3-9449-b6423ed9fddf&quot;</span></a>
<a class="sourceLine" id="cb1-15" title="15">                },</a>
<a class="sourceLine" id="cb1-16" title="16">                {</a>
<a class="sourceLine" id="cb1-17" title="17">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-18" title="18">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-19" title="19">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;22f4f25a-3f79-4db3-b805-e53946110fa8&quot;</span></a>
<a class="sourceLine" id="cb1-20" title="20">                }</a>
<a class="sourceLine" id="cb1-21" title="21">            ],</a>
<a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-24" title="24">        },</a>
<a class="sourceLine" id="cb1-25" title="25">        {</a>
<a class="sourceLine" id="cb1-26" title="26">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;aa70ca2e-bd52-4a97-97b6-a3cd3f261a8a&quot;</span>,</a>
<a class="sourceLine" id="cb1-27" title="27">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-28" title="28">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_4&quot;</span>,</a>
<a class="sourceLine" id="cb1-29" title="29">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-30" title="30">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 06:08:30&quot;</span>,</a>
<a class="sourceLine" id="cb1-31" title="31">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-32" title="32">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-33" title="33">                {</a>
<a class="sourceLine" id="cb1-34" title="34">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;server&quot;</span>,</a>
<a class="sourceLine" id="cb1-35" title="35">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;smtp.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-36" title="36">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;f4cd7255-a011-4bbb-ae3c-bbb3f860f553&quot;</span></a>
<a class="sourceLine" id="cb1-37" title="37">                },</a>
<a class="sourceLine" id="cb1-38" title="38">                {</a>
<a class="sourceLine" id="cb1-39" title="39">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-40" title="40">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-41" title="41">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;de0b80e0-66c0-4168-b884-184c38cd6301&quot;</span></a>
<a class="sourceLine" id="cb1-42" title="42">                }</a>
<a class="sourceLine" id="cb1-43" title="43">            ],</a>
<a class="sourceLine" id="cb1-44" title="44">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-45" title="45">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-46" title="46">        },</a>
<a class="sourceLine" id="cb1-47" title="47">        {</a>
<a class="sourceLine" id="cb1-48" title="48">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
<a class="sourceLine" id="cb1-49" title="49">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-50" title="50">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
<a class="sourceLine" id="cb1-51" title="51">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-52" title="52">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
<a class="sourceLine" id="cb1-53" title="53">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-54" title="54">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-55" title="55">                {</a>
<a class="sourceLine" id="cb1-56" title="56">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-57" title="57">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-58" title="58">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;28092ab2-594f-421f-8c7e-9e8d4fbe1a5c&quot;</span></a>
<a class="sourceLine" id="cb1-59" title="59">                },</a>
<a class="sourceLine" id="cb1-60" title="60">                {</a>
<a class="sourceLine" id="cb1-61" title="61">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-62" title="62">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;123.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-63" title="63">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;3633269a-cab9-4e14-a264-dddb1a6001ed&quot;</span></a>
<a class="sourceLine" id="cb1-64" title="64">                }</a>
<a class="sourceLine" id="cb1-65" title="65">            ],</a>
<a class="sourceLine" id="cb1-66" title="66">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-67" title="67">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-68" title="68">        },</a>
<a class="sourceLine" id="cb1-69" title="69">        {</a>
<a class="sourceLine" id="cb1-70" title="70">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;7982a6e0-512a-4ebe-8c14-16f1819967c9&quot;</span>,</a>
<a class="sourceLine" id="cb1-71" title="71">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-72" title="72">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_3&quot;</span>,</a>
<a class="sourceLine" id="cb1-73" title="73">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-74" title="74">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:26:47&quot;</span>,</a>
<a class="sourceLine" id="cb1-75" title="75">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-76" title="76">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-77" title="77">                {</a>
<a class="sourceLine" id="cb1-78" title="78">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-79" title="79">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;xyz.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-80" title="80">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;589f8423-bf57-4906-bf34-2d821358ed13&quot;</span></a>
<a class="sourceLine" id="cb1-81" title="81">                },</a>
<a class="sourceLine" id="cb1-82" title="82">                {</a>
<a class="sourceLine" id="cb1-83" title="83">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-84" title="84">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-85" title="85">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;ffe5acee-d59f-4918-9bfb-85c282490691&quot;</span></a>
<a class="sourceLine" id="cb1-86" title="86">                }</a>
<a class="sourceLine" id="cb1-87" title="87">            ],</a>
<a class="sourceLine" id="cb1-88" title="88">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-89" title="89">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-90" title="90">        }</a>
<a class="sourceLine" id="cb1-91" title="91">    ]</a>
<a class="sourceLine" id="cb1-92" title="92">}</a></code></pre></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**  
Search for resources in a specific tenant domain using the resource
name**

The table below shows a sample search query that is used to search for
resources named "resource\_1" and "resource\_2" in the super tenant
domain using the resource name.

  

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 59%" />
</colgroup>
<thead>
<tr class="header">
<th><p>{search-query}</p></th>
<th><p>Response JSON</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>(tenantDomain eq 'carbon.super') and  ((resourceName eq 'resource_1') or (resourceName eq 'resource_2'))</p></td>
<td><div class="content-wrapper">
<div class="panel" style="border-width: 1px;">
<div class="panelContent">
<div id="expander-51640291" class="expand-container">
<div id="expander-control-51640291" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
</div>
<div id="expander-content-51640291" class="expand-content">
<p><br />
</p>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
<a class="sourceLine" id="cb1-3" title="3">        {</a>
<a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba&quot;</span>,</a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:59&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-11" title="11">                {</a>
<a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;aea8665f-d6d7-4ec3-9449-b6423ed9fddf&quot;</span></a>
<a class="sourceLine" id="cb1-15" title="15">                },</a>
<a class="sourceLine" id="cb1-16" title="16">                {</a>
<a class="sourceLine" id="cb1-17" title="17">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-18" title="18">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-19" title="19">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;22f4f25a-3f79-4db3-b805-e53946110fa8&quot;</span></a>
<a class="sourceLine" id="cb1-20" title="20">                }</a>
<a class="sourceLine" id="cb1-21" title="21">            ],</a>
<a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-24" title="24">        },</a>
<a class="sourceLine" id="cb1-25" title="25">        {</a>
<a class="sourceLine" id="cb1-26" title="26">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
<a class="sourceLine" id="cb1-27" title="27">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-28" title="28">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
<a class="sourceLine" id="cb1-29" title="29">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-30" title="30">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
<a class="sourceLine" id="cb1-31" title="31">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-32" title="32">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-33" title="33">                {</a>
<a class="sourceLine" id="cb1-34" title="34">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-35" title="35">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-36" title="36">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;28092ab2-594f-421f-8c7e-9e8d4fbe1a5c&quot;</span></a>
<a class="sourceLine" id="cb1-37" title="37">                },</a>
<a class="sourceLine" id="cb1-38" title="38">                {</a>
<a class="sourceLine" id="cb1-39" title="39">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
<a class="sourceLine" id="cb1-40" title="40">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;123.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-41" title="41">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;3633269a-cab9-4e14-a264-dddb1a6001ed&quot;</span></a>
<a class="sourceLine" id="cb1-42" title="42">                }</a>
<a class="sourceLine" id="cb1-43" title="43">            ],</a>
<a class="sourceLine" id="cb1-44" title="44">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-45" title="45">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-46" title="46">        }</a>
<a class="sourceLine" id="cb1-47" title="47">    ]</a>
<a class="sourceLine" id="cb1-48" title="48">}</a></code></pre></div>
</div>
</div>
</div>
</div>
<p><br />
</p>
<p><br />
</p>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

#### Attribute-based search

There are two parameters in any attribute; a key, and a value. The
search queries given below are used to search for a resource using a
combination of its attribute parameters.

!!! tip
    
    **Note:** The configuration management search query does not support a
    resource search parameter that has multiple primitive search conditions
    joined by the complex operator ‘and’. For more information, see the
    section below
    

**Search for resources using an attribute key, value pair**

The table below shows a sample search query used to search for a
resource with an attribute, where the key is equal to "from" and the
value is equal to "abc.com".

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 59%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p>{search-query}</p>
</div></th>
<th><div>
<p>Response JSON</p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>(attributeKey eq 'from') and (attributeValue eq ' <a href="http://abc.com">abc.com</a> ')</p></td>
<td><div class="content-wrapper">
<div class="panel" style="border-width: 1px;">
<div class="panelContent">
<div id="expander-2097152338" class="expand-container">
<div id="expander-control-2097152338" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
</div>
<div id="expander-content-2097152338" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
<a class="sourceLine" id="cb1-3" title="3">        {</a>
<a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba&quot;</span>,</a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:59&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-11" title="11">                {</a>
<a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;aea8665f-d6d7-4ec3-9449-b6423ed9fddf&quot;</span></a>
<a class="sourceLine" id="cb1-15" title="15">                }</a>
<a class="sourceLine" id="cb1-16" title="16">            ],</a>
<a class="sourceLine" id="cb1-17" title="17">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-18" title="18">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-19" title="19">        },</a>
<a class="sourceLine" id="cb1-20" title="20">        {</a>
<a class="sourceLine" id="cb1-21" title="21">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
<a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
<a class="sourceLine" id="cb1-24" title="24">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-25" title="25">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
<a class="sourceLine" id="cb1-26" title="26">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-27" title="27">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-28" title="28">                {</a>
<a class="sourceLine" id="cb1-29" title="29">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-30" title="30">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-31" title="31">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;28092ab2-594f-421f-8c7e-9e8d4fbe1a5c&quot;</span></a>
<a class="sourceLine" id="cb1-32" title="32">                }</a>
<a class="sourceLine" id="cb1-33" title="33">            ],</a>
<a class="sourceLine" id="cb1-34" title="34">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-35" title="35">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-36" title="36">        }</a>
<a class="sourceLine" id="cb1-37" title="37">    ]</a>
<a class="sourceLine" id="cb1-38" title="38">}</a></code></pre></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  
!!! tip
    
    **Note** although both `           resource_1          ` and
    `           resource_2          ` have another attribute where the key
    is equal to "to", the returned search response only contains the
    requested attribute "from". To retrieve all available attributes for a
    resource using search, you need to search for the resource using the
    resource ID as given below.
    
    For example, to retrieve resource\_1 using the resource ID, use the
    following search query:
    
    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
    see the search query
    
    <table>
    <thead>
    <tr class="header">
    <th>{search-query}</th>
    <th>Response JSON</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>resourceId eq 'c9b8913f-3ae4-43f5-9552-a8676fd19646'</td>
    <td><div class="content-wrapper">
    <div class="panel" style="border-width: 1px;">
    <div class="panelContent">
    <div id="expander-1741304674" class="expand-container">
    <div id="expander-control-1741304674" class="expand-control">
    <img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
    </div>
    <div id="expander-content-1741304674" class="expand-content">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
    <a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-3" title="3">        {</a>
    <a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
    <a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
    <a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
    <a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-11" title="11">                {</a>
    <a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
    <a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;28092ab2-594f-421f-8c7e-9e8d4fbe1a5c&quot;</span></a>
    <a class="sourceLine" id="cb1-15" title="15">                },</a>
    <a class="sourceLine" id="cb1-16" title="16">                {</a>
    <a class="sourceLine" id="cb1-17" title="17">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
    <a class="sourceLine" id="cb1-18" title="18">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;123.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-19" title="19">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;3633269a-cab9-4e14-a264-dddb1a6001ed&quot;</span></a>
    <a class="sourceLine" id="cb1-20" title="20">                }</a>
    <a class="sourceLine" id="cb1-21" title="21">            ],</a>
    <a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-24" title="24">        }</a>
    <a class="sourceLine" id="cb1-25" title="25">    ]</a>
    <a class="sourceLine" id="cb1-26" title="26">}</a></code></pre></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>
    

  

  

**Search for resources using an attribute key**

The table below shows a sample search query used to search for a
resource with an attribute where the key is equal to "from". In this
case, the value for the attribute can be any value.

  

<table>
<colgroup>
<col style="width: 40%" />
<col style="width: 59%" />
</colgroup>
<thead>
<tr class="header">
<th><p>{search-query}</p></th>
<th><p>Response JSON</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>attributeKey eq 'from'</p></td>
<td><div class="content-wrapper">
<div class="panel" style="border-width: 1px;">
<div class="panelContent">
<div id="expander-2120939087" class="expand-container">
<div id="expander-control-2120939087" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
</div>
<div id="expander-content-2120939087" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
<a class="sourceLine" id="cb1-3" title="3">        {</a>
<a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba&quot;</span>,</a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
<a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:59&quot;</span>,</a>
<a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-11" title="11">                {</a>
<a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;aea8665f-d6d7-4ec3-9449-b6423ed9fddf&quot;</span></a>
<a class="sourceLine" id="cb1-15" title="15">                }</a>
<a class="sourceLine" id="cb1-16" title="16">            ],</a>
<a class="sourceLine" id="cb1-17" title="17">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-18" title="18">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-19" title="19">        },</a>
<a class="sourceLine" id="cb1-20" title="20">        {</a>
<a class="sourceLine" id="cb1-21" title="21">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
<a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
<a class="sourceLine" id="cb1-24" title="24">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-25" title="25">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
<a class="sourceLine" id="cb1-26" title="26">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-27" title="27">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-28" title="28">                {</a>
<a class="sourceLine" id="cb1-29" title="29">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-30" title="30">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-31" title="31">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;28092ab2-594f-421f-8c7e-9e8d4fbe1a5c&quot;</span></a>
<a class="sourceLine" id="cb1-32" title="32">                }</a>
<a class="sourceLine" id="cb1-33" title="33">            ],</a>
<a class="sourceLine" id="cb1-34" title="34">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-35" title="35">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-36" title="36">        },</a>
<a class="sourceLine" id="cb1-37" title="37">        {</a>
<a class="sourceLine" id="cb1-38" title="38">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;7982a6e0-512a-4ebe-8c14-16f1819967c9&quot;</span>,</a>
<a class="sourceLine" id="cb1-39" title="39">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
<a class="sourceLine" id="cb1-40" title="40">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_3&quot;</span>,</a>
<a class="sourceLine" id="cb1-41" title="41">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
<a class="sourceLine" id="cb1-42" title="42">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:26:47&quot;</span>,</a>
<a class="sourceLine" id="cb1-43" title="43">            <span class="st">&quot;files&quot;</span>: [],</a>
<a class="sourceLine" id="cb1-44" title="44">            <span class="st">&quot;attributes&quot;</span>: [</a>
<a class="sourceLine" id="cb1-45" title="45">                {</a>
<a class="sourceLine" id="cb1-46" title="46">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
<a class="sourceLine" id="cb1-47" title="47">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;xyz.com&quot;</span>,</a>
<a class="sourceLine" id="cb1-48" title="48">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;589f8423-bf57-4906-bf34-2d821358ed13&quot;</span></a>
<a class="sourceLine" id="cb1-49" title="49">                }</a>
<a class="sourceLine" id="cb1-50" title="50">            ],</a>
<a class="sourceLine" id="cb1-51" title="51">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
<a class="sourceLine" id="cb1-52" title="52">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
<a class="sourceLine" id="cb1-53" title="53">        }</a>
<a class="sourceLine" id="cb1-54" title="54">    ]</a>
<a class="sourceLine" id="cb1-55" title="55">}</a></code></pre></div>
</div>
</div>
<p><br />
</p>
<p><br />
</p>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Search for resources with multiple attributes using the keys**

The table below shows a sample search query for a resource that
satisfies the following conditions:

-   Has an Attribute where the key is equal to “from”.

-   Has an Attribute where the key is equal to “to”.

!!! tip
    
    **Note:** Building the configuration management search query for this
    scenario will create the following search query:
    `            attributeKey eq 'from' and attributeKey eq 'to'.           `
    
    However, the Search API does not allow multiple search conditions joined
    by the 'and' complex operator for the same Resource search parameter.
    Therefore, this requirement cannot be achieved using a single search and
    has to be done in two steps. See the instructions given below for sample
    search queries.
    

1.  Retrieve all the resources with an attribute where the key is equal
    to "from".

    <table>
    <colgroup>
    <col style="width: 38%" />
    <col style="width: 61%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th><p>{search-query}</p></th>
    <th><p>Response JSON</p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>attributeKey eq</p>
    <p>'from''</p></td>
    <td><div class="content-wrapper">
    <div class="panel" style="border-width: 1px;">
    <div class="panelContent">
    <div id="expander-58342272" class="expand-container">
    <div id="expander-control-58342272" class="expand-control">
    <img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
    </div>
    <div id="expander-content-58342272" class="expand-content">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
    <a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-3" title="3">        {</a>
    <a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba&quot;</span>,</a>
    <a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
    <a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:59&quot;</span>,</a>
    <a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-11" title="11">                {</a>
    <a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
    <a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;aea8665f-d6d7-4ec3-9449-b6423ed9fddf&quot;</span></a>
    <a class="sourceLine" id="cb1-15" title="15">                }</a>
    <a class="sourceLine" id="cb1-16" title="16">            ],</a>
    <a class="sourceLine" id="cb1-17" title="17">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-18" title="18">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-19" title="19">        },</a>
    <a class="sourceLine" id="cb1-20" title="20">        {</a>
    <a class="sourceLine" id="cb1-21" title="21">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
    <a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
    <a class="sourceLine" id="cb1-24" title="24">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-25" title="25">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
    <a class="sourceLine" id="cb1-26" title="26">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-27" title="27">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-28" title="28">                {</a>
    <a class="sourceLine" id="cb1-29" title="29">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
    <a class="sourceLine" id="cb1-30" title="30">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;abc.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-31" title="31">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;28092ab2-594f-421f-8c7e-9e8d4fbe1a5c&quot;</span></a>
    <a class="sourceLine" id="cb1-32" title="32">                }</a>
    <a class="sourceLine" id="cb1-33" title="33">            ],</a>
    <a class="sourceLine" id="cb1-34" title="34">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-35" title="35">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-36" title="36">        },</a>
    <a class="sourceLine" id="cb1-37" title="37">        {</a>
    <a class="sourceLine" id="cb1-38" title="38">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;7982a6e0-512a-4ebe-8c14-16f1819967c9&quot;</span>,</a>
    <a class="sourceLine" id="cb1-39" title="39">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-40" title="40">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_3&quot;</span>,</a>
    <a class="sourceLine" id="cb1-41" title="41">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-42" title="42">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:26:47&quot;</span>,</a>
    <a class="sourceLine" id="cb1-43" title="43">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-44" title="44">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-45" title="45">                {</a>
    <a class="sourceLine" id="cb1-46" title="46">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;from&quot;</span>,</a>
    <a class="sourceLine" id="cb1-47" title="47">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;xyz.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-48" title="48">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;589f8423-bf57-4906-bf34-2d821358ed13&quot;</span></a>
    <a class="sourceLine" id="cb1-49" title="49">                }</a>
    <a class="sourceLine" id="cb1-50" title="50">            ],</a>
    <a class="sourceLine" id="cb1-51" title="51">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-52" title="52">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-53" title="53">        }</a>
    <a class="sourceLine" id="cb1-54" title="54">    ]</a>
    <a class="sourceLine" id="cb1-55" title="55">}</a></code></pre></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>

2.  Search within the results received above for resources with an
    attribute where the key is equal to "to". This will retrieve search
    results that satisfies both conditions (i.e. resources with an
    attribute where the key is equal to "from" and an attribute where
    the key is equal to "to").

    <table>
    <colgroup>
    <col style="width: 43%" />
    <col style="width: 56%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th><p>{search-query}</p></th>
    <th><p>Response JSON</p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>attributeKey eq 'to' and (resourceId eq '29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba' or resourceId eq 'c9b8913f-3ae4-43f5-9552-a8676fd19646' or resourceId eq '7982a6e0-512a-4ebe-8c14-16f1819967c9')</p>
    <p><br />
    </p></td>
    <td><div class="content-wrapper">
    <div class="panel" style="border-width: 1px;">
    <div class="panelContent">
    <div id="expander-134731318" class="expand-container">
    <div id="expander-control-134731318" class="expand-control">
    <img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to see the sample response...
    </div>
    <div id="expander-content-134731318" class="expand-content">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">{</a>
    <a class="sourceLine" id="cb1-2" title="2">    <span class="st">&quot;resources&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-3" title="3">        {</a>
    <a class="sourceLine" id="cb1-4" title="4">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba&quot;</span>,</a>
    <a class="sourceLine" id="cb1-5" title="5">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-6" title="6">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_2&quot;</span>,</a>
    <a class="sourceLine" id="cb1-7" title="7">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-8" title="8">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:59&quot;</span>,</a>
    <a class="sourceLine" id="cb1-9" title="9">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-10" title="10">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-11" title="11">                {</a>
    <a class="sourceLine" id="cb1-12" title="12">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
    <a class="sourceLine" id="cb1-13" title="13">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-14" title="14">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;22f4f25a-3f79-4db3-b805-e53946110fa8&quot;</span></a>
    <a class="sourceLine" id="cb1-15" title="15">                }</a>
    <a class="sourceLine" id="cb1-16" title="16">            ],</a>
    <a class="sourceLine" id="cb1-17" title="17">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-18" title="18">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-19" title="19">        },</a>
    <a class="sourceLine" id="cb1-20" title="20">        {</a>
    <a class="sourceLine" id="cb1-21" title="21">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;c9b8913f-3ae4-43f5-9552-a8676fd19646&quot;</span>,</a>
    <a class="sourceLine" id="cb1-22" title="22">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-23" title="23">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_1&quot;</span>,</a>
    <a class="sourceLine" id="cb1-24" title="24">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-25" title="25">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:16:48&quot;</span>,</a>
    <a class="sourceLine" id="cb1-26" title="26">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-27" title="27">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-28" title="28">                {</a>
    <a class="sourceLine" id="cb1-29" title="29">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
    <a class="sourceLine" id="cb1-30" title="30">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;123.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-31" title="31">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;3633269a-cab9-4e14-a264-dddb1a6001ed&quot;</span></a>
    <a class="sourceLine" id="cb1-32" title="32">                }</a>
    <a class="sourceLine" id="cb1-33" title="33">            ],</a>
    <a class="sourceLine" id="cb1-34" title="34">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-35" title="35">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-36" title="36">        },</a>
    <a class="sourceLine" id="cb1-37" title="37">        {</a>
    <a class="sourceLine" id="cb1-38" title="38">            <span class="st">&quot;resourceId&quot;</span>: <span class="st">&quot;7982a6e0-512a-4ebe-8c14-16f1819967c9&quot;</span>,</a>
    <a class="sourceLine" id="cb1-39" title="39">            <span class="st">&quot;tenantDomain&quot;</span>: <span class="st">&quot;carbon.super&quot;</span>,</a>
    <a class="sourceLine" id="cb1-40" title="40">            <span class="st">&quot;resourceName&quot;</span>: <span class="st">&quot;resource_3&quot;</span>,</a>
    <a class="sourceLine" id="cb1-41" title="41">            <span class="st">&quot;resourceType&quot;</span>: <span class="st">&quot;e-mail&quot;</span>,</a>
    <a class="sourceLine" id="cb1-42" title="42">            <span class="st">&quot;lastModified&quot;</span>: <span class="st">&quot;2019-01-14 03:26:47&quot;</span>,</a>
    <a class="sourceLine" id="cb1-43" title="43">            <span class="st">&quot;files&quot;</span>: [],</a>
    <a class="sourceLine" id="cb1-44" title="44">            <span class="st">&quot;attributes&quot;</span>: [</a>
    <a class="sourceLine" id="cb1-45" title="45">                {</a>
    <a class="sourceLine" id="cb1-46" title="46">                    <span class="st">&quot;key&quot;</span>: <span class="st">&quot;to&quot;</span>,</a>
    <a class="sourceLine" id="cb1-47" title="47">                    <span class="st">&quot;value&quot;</span>: <span class="st">&quot;wso2.com&quot;</span>,</a>
    <a class="sourceLine" id="cb1-48" title="48">                    <span class="st">&quot;attributeId&quot;</span>: <span class="st">&quot;ffe5acee-d59f-4918-9bfb-85c282490691&quot;</span></a>
    <a class="sourceLine" id="cb1-49" title="49">                }</a>
    <a class="sourceLine" id="cb1-50" title="50">            ],</a>
    <a class="sourceLine" id="cb1-51" title="51">            <span class="st">&quot;hasFile&quot;</span>: <span class="kw">false</span>,</a>
    <a class="sourceLine" id="cb1-52" title="52">            <span class="st">&quot;hasAttribute&quot;</span>: <span class="kw">false</span></a>
    <a class="sourceLine" id="cb1-53" title="53">        }</a>
    <a class="sourceLine" id="cb1-54" title="54">    ]</a>
    <a class="sourceLine" id="cb1-55" title="55">}         </a></code></pre></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>
