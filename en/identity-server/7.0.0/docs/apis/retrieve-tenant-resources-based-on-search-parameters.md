# Retrieve Tenant Resources Based on Search Parameters

This section guides you through using the `         /search        `
endpoint of the [Configuration Management REST
API]({{base_path}}/apis/use-the-configuration-management-rest-apis) to search for
tenant resources.  

---

## /search endpoint

The `         /search        ` endpoint of the Configuration Management
REST API allows you to perform cross-tenant search for resources.

The search context URL should be as follows:

`         https://{host}:{port}/t/{tenant-domain}/api/identity/config-mgt/v1.0/search?$filter={search-query}        `

Here, the value of `         {search-query}        ` should be in the
form of a configuration management search query. For information on how
to write a search condition that is in the form of a configuration
management search query, see [Write a configuration management search
query](#write-a-configuration-management-search-query).

---

## Write a configuration management search query

Configuration management search query is a [Open Data
Protocol](https://www.odata.org/) based search query supported via
[Apache CXF](http://cxf.apache.org/docs/jax-rs-search.html#JAX-RSSearch-OpenDataProtocol).

The configuration management search query is a search condition that is
built using primitive configuration management search conditions in the
form of a string. The following topics describe the configuration
management search conditions that you can use to write a configuration
management search query.

### Configuration management primitive search condition

A primitive search condition is a string in the following form:  
`         {RESOURCE_SEARCH_PARAMETER} {PRIMITIVE_CONDITION_OPERATOR} '{VALUE}'        `

Following are the parameters of a resource supported in a primitive
search condition and the corresponding values to replace the
`         {RESOURCE_SEARCH_PARAMETER}        ` placeholder :

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
`         {PRIMITIVE_CONDITION_OPERATOR}        ` placeholder :

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

### Configuration management complex search condition

A complex search condition is generally built by combining primitive
search conditions. The simplest form of a complex search condition
string is as follows:

`         {PRIMITIVE_SEARCH_CONDITION_1} {COMPLEX_CONDITION_OPERATOR} {PRIMITIVE_SEARCH_CONDITION_2}        `

Two complex search condition created as mentioned above can also be
joined as follows to form another complex search condition:

`         {COMPLEX_SEARCH_CONDITION_1} {COMPLEX_CONDITION_OPERATOR} {COMPLEX_SEARCH_CONDITION_2}        `

!!! tip      
    For better readability, it is recommended to use parentheses to group
    complex search conditions when you join conditions using a
    `         COMPLEX_CONDITION_OPERATOR        `.
    

Following are the operators supported to build a complex search
condition and the corresponding values to replace the
`         {COMPLEX_CONDITION_OPERATOR}        ` placeholder :

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

!!! info
    When you join complex search conditions together with complex condition
    operators, the result is always another complex condition. Therefore,
    any required search condition can be built as a configuration management
    complex search condition in this manner.

---

## Search scenarios

This section demonstrates the different ways of searching for resources
(i.e. different search scenarios). In the scenarios given below, an HTTP
GET request is sent to the following location with
the {search-query} placeholder value replaced accordingly and encoded
for a URL. When you are trying out these scenarios, fill the {host},
{port} and the {tenant-domain} placeholders with the relevant values.

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
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">https:<span class="co">//localhost:9443/api/identity/config-mgt/v1.0/search?$filter=tenantDomain eq ‘carbon.super’</span></a></code></pre></div>
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

-   Meta-data based search
-   Attribute-based search

### Meta-data based search

Use the following meta-data parameters to search for resources.

| Search Parameter of the Resource | {RESOURCE\_SEARCH\_PARAMETER} |
|----------------------------------|-------------------------------|
| Tenant domain                    | `tenantDomain`                |
| ID value of the resource type    | `resourceTypeId`              |
| Name of the resource type        | `resourceTypeName`            |
| ID value of the resource         | `resourceId`                  |
| Name of the resource             | `resourceName`                |

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
<td>
<div class="content-wrapper">
<details class="example" open="">
    <summary>click to see the sample response</summary>
    <p>
    ```
    {
    "resources": [
            {
                "resourceId": "29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba",
                "tenantDomain": "carbon.super",
                "resourceName": "resource_2",
                "resourceType": "e-mail",
                "lastModified": "2019-01-14 03:16:59",
                "files": [],
                "attributes": [
                    {
                        "key": "from",
                        "value": "abc.com",
                        "attributeId": "aea8665f-d6d7-4ec3-9449-b6423ed9fddf"
                    },
                    {
                        "key": "to",
                        "value": "wso2.com",
                        "attributeId": "22f4f25a-3f79-4db3-b805-e53946110fa8"
                    }
                ],
                "hasFile": false,
                "hasAttribute": false
            },
            {
                "resourceId": "aa70ca2e-bd52-4a97-97b6-a3cd3f261a8a",
                "tenantDomain": "carbon.super",
                "resourceName": "resource_4",
                "resourceType": "e-mail",
                "lastModified": "2019-01-14 06:08:30",
                "files": [],
                "attributes": [
                    {
                        "key": "server",
                        "value": "smtp.com",
                        "attributeId": "f4cd7255-a011-4bbb-ae3c-bbb3f860f553"
                    },
                    {
                        "key": "to",
                        "value": "wso2.com",
                        "attributeId": "de0b80e0-66c0-4168-b884-184c38cd6301"
                    }
                ],
                "hasFile": false,
                "hasAttribute": false
            },
            {
                "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
                "tenantDomain": "carbon.super",
                "resourceName": "resource_1",
                "resourceType": "e-mail",
                "lastModified": "2019-01-14 03:16:48",
                "files": [],
                "attributes": [
                    {
                        "key": "from",
                        "value": "abc.com",
                        "attributeId": "28092ab2-594f-421f-8c7e-9e8d4fbe1a5c"
                    },
                    {
                        "key": "to",
                        "value": "123.com",
                        "attributeId": "3633269a-cab9-4e14-a264-dddb1a6001ed"
                    }
                ],
                "hasFile": false,
                "hasAttribute": false
            },
            {
                "resourceId": "7982a6e0-512a-4ebe-8c14-16f1819967c9",
                "tenantDomain": "carbon.super",
                "resourceName": "resource_3",
                "resourceType": "e-mail",
                "lastModified": "2019-01-14 03:26:47",
                "files": [],
                "attributes": [
                    {
                        "key": "from",
                        "value": "xyz.com",
                        "attributeId": "589f8423-bf57-4906-bf34-2d821358ed13"
                    },
                    {
                        "key": "to",
                        "value": "wso2.com",
                        "attributeId": "ffe5acee-d59f-4918-9bfb-85c282490691"
                    }
                ],
                "hasFile": false,
                "hasAttribute": false
            }
        ]
    }
    ```
    </p>
</details>
</td>
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
<td>
	<div class="content-wrapper">
		<details class="example">
    	<summary>Click to see the sample response.</summary>
		<p>
			```
			{
			    "resources": [
			        {
			            "resourceId": "29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_2",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:16:59",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "abc.com",
			                    "attributeId": "aea8665f-d6d7-4ec3-9449-b6423ed9fddf"
			                },
			                {
			                    "key": "to",
			                    "value": "wso2.com",
			                    "attributeId": "22f4f25a-3f79-4db3-b805-e53946110fa8"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        },
			        {
			            "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_1",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:16:48",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "abc.com",
			                    "attributeId": "28092ab2-594f-421f-8c7e-9e8d4fbe1a5c"
			                },
			                {
			                    "key": "to",
			                    "value": "123.com",
			                    "attributeId": "3633269a-cab9-4e14-a264-dddb1a6001ed"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        }
			    ]
			}
			```
		</p>
		</details>	
	</div>
</td>
</tr>
</tbody>
</table>

### Attribute-based search

There are two parameters in any attribute; a key, and a value. The
search queries given below are used to search for a resource using a
combination of its attribute parameters.

!!! note
    
    The configuration management search query does not support a
    resource search parameter that has multiple primitive search conditions
    joined by the complex operator ‘and’. For more information, see the
    section below.
    

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
<td>
	<div class="content-wrapper">
		<p>
			<details class="example">
    		<summary>Click to see the sample response.</summary>
    		<p>
			```
			{
			    "resources": [
			        {
			            "resourceId": "29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_2",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:16:59",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "abc.com",
			                    "attributeId": "aea8665f-d6d7-4ec3-9449-b6423ed9fddf"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        },
			        {
			            "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_1",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:16:48",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "abc.com",
			                    "attributeId": "28092ab2-594f-421f-8c7e-9e8d4fbe1a5c"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        }
			    ]
			}
			```
		</p>
	</details>
	</div></td>
</tr>
</tbody>
</table>

  
!!! note
    
    Although both `           resource_1          ` and
    `           resource_2          ` have another attribute where the key
    is equal to "to", the returned search response only contains the
    requested attribute "from". To retrieve all available attributes for a
    resource using search, you need to search for the resource using the
    resource ID as given below.
    For example, to retrieve resource\_1 using the resource ID, use the
    following search query: 

    ??? example "Click to see the search query"
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
            <details class="example">
            <summary>Click to see the sample response.</summary>
            <p>
                ```
                            {
                    "resources": [
                        {
                            "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
                            "tenantDomain": "carbon.super",
                            "resourceName": "resource_1",
                            "resourceType": "e-mail",
                            "lastModified": "2019-01-14 03:16:48",
                            "files": [],
                            "attributes": [
                                {
                                    "key": "from",
                                    "value": "abc.com",
                                    "attributeId": "28092ab2-594f-421f-8c7e-9e8d4fbe1a5c"
                                },
                                {
                                    "key": "to",
                                    "value": "123.com",
                                    "attributeId": "3633269a-cab9-4e14-a264-dddb1a6001ed"
                                }
                            ],
                            "hasFile": false,
                            "hasAttribute": false
                        }
                    ]
                }
                ```
            </p>
            </details>
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
	<details class="example">
    <summary>Click to see the sample response</summary>
	<p>
		```
		{
	    "resources": [
	        {
	            "resourceId": "29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba",
	            "tenantDomain": "carbon.super",
	            "resourceName": "resource_2",
	            "resourceType": "e-mail",
	            "lastModified": "2019-01-14 03:16:59",
	            "files": [],
	            "attributes": [
	                {
	                    "key": "from",
	                    "value": "abc.com",
	                    "attributeId": "aea8665f-d6d7-4ec3-9449-b6423ed9fddf"
	                }
	            ],
	            "hasFile": false,
	            "hasAttribute": false
	        },
	        {
	            "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
	            "tenantDomain": "carbon.super",
	            "resourceName": "resource_1",
	            "resourceType": "e-mail",
	            "lastModified": "2019-01-14 03:16:48",
	            "files": [],
	            "attributes": [
	                {
	                    "key": "from",
	                    "value": "abc.com",
	                    "attributeId": "28092ab2-594f-421f-8c7e-9e8d4fbe1a5c"
	                }
	            ],
	            "hasFile": false,
	            "hasAttribute": false
	        },
	        {
	            "resourceId": "7982a6e0-512a-4ebe-8c14-16f1819967c9",
	            "tenantDomain": "carbon.super",
	            "resourceName": "resource_3",
	            "resourceType": "e-mail",
	            "lastModified": "2019-01-14 03:26:47",
	            "files": [],
	            "attributes": [
	                {
	                    "key": "from",
	                    "value": "xyz.com",
	                    "attributeId": "589f8423-bf57-4906-bf34-2d821358ed13"
	                }
	            ],
	            "hasFile": false,
	            "hasAttribute": false
	        }
	    	]
		}
		```
	</p>	
</details>
</div></td>
</tr>
</tbody>
</table>

**Search for resources with multiple attributes using the keys**

The table below shows a sample search query for a resource that
satisfies the following conditions:

-   Has an Attribute where the key is equal to “from”.

-   Has an Attribute where the key is equal to “to”.

!!! note
    
    Building the configuration management search query for this
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
    	<details class="example">
    		<summary>Click to see the sample response.</summary>
    		<p>
    		```
    		{
			    "resources": [
			        {
			            "resourceId": "29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_2",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:16:59",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "abc.com",
			                    "attributeId": "aea8665f-d6d7-4ec3-9449-b6423ed9fddf"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        },
			        {
			            "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_1",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:16:48",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "abc.com",
			                    "attributeId": "28092ab2-594f-421f-8c7e-9e8d4fbe1a5c"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        },
			        {
			            "resourceId": "7982a6e0-512a-4ebe-8c14-16f1819967c9",
			            "tenantDomain": "carbon.super",
			            "resourceName": "resource_3",
			            "resourceType": "e-mail",
			            "lastModified": "2019-01-14 03:26:47",
			            "files": [],
			            "attributes": [
			                {
			                    "key": "from",
			                    "value": "xyz.com",
			                    "attributeId": "589f8423-bf57-4906-bf34-2d821358ed13"
			                }
			            ],
			            "hasFile": false,
			            "hasAttribute": false
			        }
			    ]
			}
    		```
    	</p>
    </details>
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
    	<details class="example">
    		<summary>Click to see the sample response.</summary>
    		<p>
    			```
				    			{
				    "resources": [
				        {
				            "resourceId": "29bd5f2d-54b4-4169-8cac-aa2e9cf5c1ba",
				            "tenantDomain": "carbon.super",
				            "resourceName": "resource_2",
				            "resourceType": "e-mail",
				            "lastModified": "2019-01-14 03:16:59",
				            "files": [],
				            "attributes": [
				                {
				                    "key": "to",
				                    "value": "wso2.com",
				                    "attributeId": "22f4f25a-3f79-4db3-b805-e53946110fa8"
				                }
				            ],
				            "hasFile": false,
				            "hasAttribute": false
				        },
				        {
				            "resourceId": "c9b8913f-3ae4-43f5-9552-a8676fd19646",
				            "tenantDomain": "carbon.super",
				            "resourceName": "resource_1",
				            "resourceType": "e-mail",
				            "lastModified": "2019-01-14 03:16:48",
				            "files": [],
				            "attributes": [
				                {
				                    "key": "to",
				                    "value": "123.com",
				                    "attributeId": "3633269a-cab9-4e14-a264-dddb1a6001ed"
				                }
				            ],
				            "hasFile": false,
				            "hasAttribute": false
				        },
				        {
				            "resourceId": "7982a6e0-512a-4ebe-8c14-16f1819967c9",
				            "tenantDomain": "carbon.super",
				            "resourceName": "resource_3",
				            "resourceType": "e-mail",
				            "lastModified": "2019-01-14 03:26:47",
				            "files": [],
				            "attributes": [
				                {
				                    "key": "to",
				                    "value": "wso2.com",
				                    "attributeId": "ffe5acee-d59f-4918-9bfb-85c282490691"
				                }
				            ],
				            "hasFile": false,
				            "hasAttribute": false
				        }
				    ]
				}
    			```
    		</p>
    	</details>    
    </div></td>
    </tr>
    </tbody>
    </table>
