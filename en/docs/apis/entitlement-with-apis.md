# Entitlement with APIs

For entitlement management, WSO2 Identity server provides two APIs for
Policy Administration and Policy Evaluation.

The following section guides you on invoking the two admin service and
describes the operations available in the WSO2 Identity Server
Entitlement Mangement APIs.

!!! note "Before you begin"
    As admin services are secured to prevent anonymous invocations, you
    cannot view the WSDL of the admin service by default. Follow the steps
    below to view and invoke it:
    
    1.  Set the `           admin_service.wsdl          ` element to
        `           true          ` in
        `           <IS_HOME>/repository/conf/deployment.toml         ` file.
    
        ``` xml
        [admin_service.wsdl]
        enable = true
        ```
    
    2.  Restart the Identity Server.
    3.  If you have started the server in default configurations, use the
        following URL in your browser to see the WSDL of the admin service: 
        eg:
        `                     https://localhost:9443/services/EntitlementService?wsdl                   `
    
    For more information on WSO2 admin services and how to invoke an admin
    service using either SoapUI or any other client program, see [Calling
    Admin Services](../../apis/call-admin-services).
    

The following section guides you on entitlement management in two
different areas,

---

## Policy Administration API

Policy administration includes all the actions that should be done to
manage a policy. Such as adding and updating policy/policies, publishing
policies, removing policies etc. For this, WSO2 Carbon Platform has
provided an admin service called **EntitlementPolicyAdminService** to
manage policy administration stuff.

-   You can use the following URL in your browser to see the WSDL of the
    EntitlementPolicyAdminService admin service.

    ``` java
    https://localhost:9443/services/EntitlementPolicyAdminService?wsdl
    ```

    By using any SoapUI, you can call this admin SOAP service.

      

    !!! note
        All the APIs are secured with basic authentication. Follow the steps
        below to add a basic auth header when calling these methods.
    
        1.  Build a string of the form username:password.
        2.  [Encode the string](https://www.base64encode.org/) you created
            above using Base64.
        3.  Define an authorization header with the term "
            `             Basic_            ` ", followed by the encoded
            string. For example, the basic auth authorization header using
            "admin" as both username and password is as follows:

            ``` java
            Authorization: Basic YWRtaW46YWRtaW4=
            ```
      
---

#### Operations included in the EntitlementPolicyAdminService SOAP API

The following commonly used operations are available in the
EntitlementPolicyAdminService.

###### addPolicy()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Adds a new policy.</td>
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
<td><pre><code>policy</code></pre></td>
<td>The policy that should be registered. The XACML policy should be embedded to the SOAP service as a CDATA.</td>
</tr>
<tr class="even">
<td><pre><code>version</code></pre></td>
<td>Version of the policy.</td>
</tr>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be registered.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span> xmlns:xsd1=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb4-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb4-4" title="4">      &lt;xsd:addPolicy&gt;</a>
<a class="sourceLine" id="cb4-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb4-6" title="6">         &lt;xsd:policyDTO&gt;</a>
<a class="sourceLine" id="cb4-7" title="7">            &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb4-8" title="8">            &lt;xsd1:policy&gt;&lt;![CDATA[</a>
<a class="sourceLine" id="cb4-9" title="9">                   &lt;<span class="bu">Policy</span> xmlns=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span>  PolicyId=<span class="st">&quot;sample_policy_template&quot;</span> RuleCombiningAlgId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable&quot;</span> Version=<span class="st">&quot;1.0&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-10" title="10">                   &lt;Description&gt;This policy template provides ability to authorize users to a given service <span class="fu">provider</span>(defined by SP_NAME) in the authentication flow based on the roles of the <span class="fu">user</span> (defined by ROLE_<span class="dv">1</span> and ROLE_<span class="dv">2</span>). Users who have at least one of the given roles, will be allowed and any others will be denied.&lt;/Description&gt;</a>
<a class="sourceLine" id="cb4-11" title="11">                   &lt;<span class="bu">Target</span>&gt;</a>
<a class="sourceLine" id="cb4-12" title="12">                      &lt;AnyOf&gt;</a>
<a class="sourceLine" id="cb4-13" title="13">                         &lt;AllOf&gt;</a>
<a class="sourceLine" id="cb4-14" title="14">                            &lt;Match MatchId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-15" title="15">                               &lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;SP_NAME&lt;/AttributeValue&gt;</a>
<a class="sourceLine" id="cb4-16" title="16">                               &lt;AttributeDesignator AttributeId=<span class="st">&quot;http://wso2.org/identity/sp/sp-name&quot;</span> Category=<span class="st">&quot;http://wso2.org/identity/sp&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;false&quot;</span>&gt;&lt;/AttributeDesignator&gt;</a>
<a class="sourceLine" id="cb4-17" title="17">                            &lt;/Match&gt;</a>
<a class="sourceLine" id="cb4-18" title="18">                         &lt;/AllOf&gt;</a>
<a class="sourceLine" id="cb4-19" title="19">                      &lt;/AnyOf&gt;</a>
<a class="sourceLine" id="cb4-20" title="20">                   &lt;/<span class="bu">Target</span>&gt;</a>
<a class="sourceLine" id="cb4-21" title="21">                   &lt;Rule Effect=<span class="st">&quot;Permit&quot;</span> RuleId=<span class="st">&quot;permit_by_roles&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-22" title="22">                      &lt;<span class="bu">Condition</span>&gt;</a>
<a class="sourceLine" id="cb4-23" title="23">                         &lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:or&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-24" title="24">                            &lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-is-in&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-25" title="25">                               &lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;ROLE_<span class="dv">1_1_1</span>&lt;/AttributeValue&gt;</a>
<a class="sourceLine" id="cb4-26" title="26">                               &lt;AttributeDesignator AttributeId=<span class="st">&quot;http://wso2.org/claims/role&quot;</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:subject-category:access-subject&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;true&quot;</span>&gt;&lt;/AttributeDesignator&gt;</a>
<a class="sourceLine" id="cb4-27" title="27">                            &lt;/Apply&gt;</a>
<a class="sourceLine" id="cb4-28" title="28">                         &lt;/Apply&gt;</a>
<a class="sourceLine" id="cb4-29" title="29">                      &lt;/<span class="bu">Condition</span>&gt;</a>
<a class="sourceLine" id="cb4-30" title="30">                   &lt;/Rule&gt;</a>
<a class="sourceLine" id="cb4-31" title="31">                   &lt;Rule Effect=<span class="st">&quot;Deny&quot;</span> RuleId=<span class="st">&quot;deny_others&quot;</span>&gt;&lt;/Rule&gt;</a>
<a class="sourceLine" id="cb4-32" title="32">                &lt;/<span class="bu">Policy</span>&gt;        </a>
<a class="sourceLine" id="cb4-33" title="33">                ]]&gt;</a>
<a class="sourceLine" id="cb4-34" title="34">            &lt;/xsd1:policy&gt;</a>
<a class="sourceLine" id="cb4-35" title="35">            &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb4-36" title="36">            &lt;xsd1:version&gt;<span class="fl">1.</span><span class="dv">0</span>&lt;/xsd1:version&gt;</a>
<a class="sourceLine" id="cb4-37" title="37">            &lt;xsd1:policyId&gt;sample_policy_template&lt;/xsd1:policyId&gt;</a>
<a class="sourceLine" id="cb4-38" title="38">         &lt;/xsd:policyDTO&gt;</a>
<a class="sourceLine" id="cb4-39" title="39">      &lt;/xsd:addPolicy&gt;</a>
<a class="sourceLine" id="cb4-40" title="40">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb4-41" title="41">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the sample response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb5-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb5-3" title="3">      &lt;ns:addPolicyResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb5-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:nil=<span class="st">&quot;true&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb5-5" title="5">      &lt;/ns:addPolicyResponse&gt;</a>
<a class="sourceLine" id="cb5-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb5-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### getAllPolicyIds()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Retrieve all policy names or policy Ids.</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><p>None</p>
<p><br />
</p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb1-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb1-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb1-4" title="4">      &lt;xsd:getAllPolicyIds&gt;    </a>
<a class="sourceLine" id="cb1-5" title="5">      &lt;/xsd:getAllPolicyIds&gt;</a>
<a class="sourceLine" id="cb1-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb1-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">      &lt;ns:getAllPolicyIdsResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span> xmlns:ax2340=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:ax2338=<span class="st">&quot;http://entitlement.identity.carbon.wso2.org/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">         &lt;ns:<span class="kw">return</span>&gt;authn_role_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;ns:<span class="kw">return</span>&gt;authn_scope_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;ns:<span class="kw">return</span>&gt;authn_time_and_role_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">         &lt;ns:<span class="kw">return</span>&gt;authn_time_and_scope_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-8" title="8">         &lt;ns:<span class="kw">return</span>&gt;authn_time_and_user_claim_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">         &lt;ns:<span class="kw">return</span>&gt;authn_time_and_user_store_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">         &lt;ns:<span class="kw">return</span>&gt;authn_time_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-11" title="11">         &lt;ns:<span class="kw">return</span>&gt;authn_user_claim_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-12" title="12">         &lt;ns:<span class="kw">return</span>&gt;authn_user_store_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-13" title="13">         &lt;ns:<span class="kw">return</span>&gt;provisioning_role_based_policy&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-14" title="14">         &lt;ns:<span class="kw">return</span>&gt;provisioning_role_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-15" title="15">         &lt;ns:<span class="kw">return</span>&gt;provisioning_time_and_role_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-16" title="16">         &lt;ns:<span class="kw">return</span>&gt;provisioning_time_and_user_claim_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-17" title="17">         &lt;ns:<span class="kw">return</span>&gt;provisioning_time_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-18" title="18">         &lt;ns:<span class="kw">return</span>&gt;provisioning_user_claim_based_policy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-19" title="19">         &lt;ns:<span class="kw">return</span>&gt;samplePolicy&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-20" title="20">         &lt;ns:<span class="kw">return</span>&gt;samplePolicy1&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-21" title="21">         &lt;ns:<span class="kw">return</span>&gt;samplepolicy_template&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-22" title="22">      &lt;/ns:getAllPolicyIdsResponse&gt;</a>
<a class="sourceLine" id="cb2-23" title="23">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-24" title="24">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### getPolicy()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Retrieve a pre-defined policy.</td>
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
<td><pre><code>policyId</code></pre></td>
<td>The policy name that is registered.</td>
</tr>
<tr class="even">
<td><pre><code>isPDPPolicy</code></pre></td>
<td>A boolean which tells whether the policy is published to PDP or not.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the request</summary>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">      &lt;xsd:getPolicy&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">         &lt;xsd:policyId&gt;authn_time_and_user_claim_based_policy_template&lt;/xsd:policyId&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb3-8" title="8">         &lt;xsd:isPDPPolicy&gt;<span class="kw">false</span>&lt;/xsd:isPDPPolicy&gt;</a>
<a class="sourceLine" id="cb3-9" title="9">      &lt;/xsd:getPolicy&gt;</a>
<a class="sourceLine" id="cb3-10" title="10">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-11" title="11">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb4-3" title="3">      &lt;ns:getPolicyResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:type=<span class="st">&quot;ax2340:PolicyDTO&quot;</span> xmlns:ax2340=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:ax2338=<span class="st">&quot;http://entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-5" title="5">            &lt;ax2340:active&gt;<span class="kw">true</span>&lt;/ax2340:active&gt;</a>
<a class="sourceLine" id="cb4-6" title="6">            &lt;ax2340:attributeDTOs xsi:type=<span class="st">&quot;ax2340:AttributeDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-7" title="7">               &lt;ax2340:attributeDataType&gt;http:<span class="co">//www.w3.org/2001/XMLSchema#string&lt;/ax2340:attributeDataType&gt;</span></a>
<a class="sourceLine" id="cb4-8" title="8">               &lt;ax2340:attributeId&gt;http:<span class="co">//wso2.org/identity/sp/sp-name&lt;/ax2340:attributeId&gt;</span></a>
<a class="sourceLine" id="cb4-9" title="9">               &lt;ax2340:attributeValue&gt;SP_NAME&lt;/ax2340:attributeValue&gt;</a>
<a class="sourceLine" id="cb4-10" title="10">               &lt;ax2340:category&gt;http:<span class="co">//wso2.org/identity/sp&lt;/ax2340:category&gt;</span></a>
<a class="sourceLine" id="cb4-11" title="11">            &lt;/ax2340:attributeDTOs&gt;</a>
<a class="sourceLine" id="cb4-12" title="12">            &lt;ax2340:attributeDTOs xsi:type=<span class="st">&quot;ax2340:AttributeDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-13" title="13">               &lt;ax2340:attributeDataType&gt;http:<span class="co">//www.w3.org/2001/XMLSchema#string&lt;/ax2340:attributeDataType&gt;</span></a>
<a class="sourceLine" id="cb4-14" title="14">               &lt;ax2340:attributeId&gt;http:<span class="co">//wso2.org/identity/identity-action/action-name&lt;/ax2340:attributeId&gt;</span></a>
<a class="sourceLine" id="cb4-15" title="15">               &lt;ax2340:attributeValue&gt;authenticate&lt;/ax2340:attributeValue&gt;</a>
<a class="sourceLine" id="cb4-16" title="16">               &lt;ax2340:category&gt;http:<span class="co">//wso2.org/identity/identity-action&lt;/ax2340:category&gt;</span></a>
<a class="sourceLine" id="cb4-17" title="17">            &lt;/ax2340:attributeDTOs&gt;</a>
<a class="sourceLine" id="cb4-18" title="18">            &lt;ax2340:attributeDTOs xsi:type=<span class="st">&quot;ax2340:AttributeDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-19" title="19">               &lt;ax2340:attributeDataType&gt;http:<span class="co">//www.w3.org/2001/XMLSchema#time&lt;/ax2340:attributeDataType&gt;</span></a>
<a class="sourceLine" id="cb4-20" title="20">               &lt;ax2340:attributeId&gt;urn:oasis:names:tc:xacml:<span class="fl">1.</span><span class="dv">0</span>:environment:current-time&lt;/ax2340:attributeId&gt;</a>
<a class="sourceLine" id="cb4-21" title="21">               &lt;ax2340:attributeValue&gt;09:<span class="bn">00</span>:<span class="bn">00</span>&lt;/ax2340:attributeValue&gt;</a>
<a class="sourceLine" id="cb4-22" title="22">               &lt;ax2340:category&gt;urn:oasis:names:tc:xacml:<span class="fl">3.</span><span class="dv">0</span>:attribute-category:environment&lt;/ax2340:category&gt;</a>
<a class="sourceLine" id="cb4-23" title="23">            &lt;/ax2340:attributeDTOs&gt;</a>
<a class="sourceLine" id="cb4-24" title="24">            &lt;ax2340:attributeDTOs xsi:type=<span class="st">&quot;ax2340:AttributeDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-25" title="25">               &lt;ax2340:attributeDataType&gt;http:<span class="co">//www.w3.org/2001/XMLSchema#time&lt;/ax2340:attributeDataType&gt;</span></a>
<a class="sourceLine" id="cb4-26" title="26">               &lt;ax2340:attributeId&gt;urn:oasis:names:tc:xacml:<span class="fl">1.</span><span class="dv">0</span>:environment:current-time&lt;/ax2340:attributeId&gt;</a>
<a class="sourceLine" id="cb4-27" title="27">               &lt;ax2340:attributeValue&gt;<span class="dv">17</span>:<span class="bn">00</span>:<span class="bn">00</span>&lt;/ax2340:attributeValue&gt;</a>
<a class="sourceLine" id="cb4-28" title="28">               &lt;ax2340:category&gt;urn:oasis:names:tc:xacml:<span class="fl">3.</span><span class="dv">0</span>:attribute-category:environment&lt;/ax2340:category&gt;</a>
<a class="sourceLine" id="cb4-29" title="29">            &lt;/ax2340:attributeDTOs&gt;</a>
<a class="sourceLine" id="cb4-30" title="30">            &lt;ax2340:attributeDTOs xsi:type=<span class="st">&quot;ax2340:AttributeDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-31" title="31">               &lt;ax2340:attributeDataType&gt;http:<span class="co">//www.w3.org/2001/XMLSchema#string&lt;/ax2340:attributeDataType&gt;</span></a>
<a class="sourceLine" id="cb4-32" title="32">               &lt;ax2340:attributeId&gt;CLAIM_URI_<span class="dv">1</span>&lt;/ax2340:attributeId&gt;</a>
<a class="sourceLine" id="cb4-33" title="33">               &lt;ax2340:attributeValue&gt;CLAIM_VALUE_<span class="dv">1</span>&lt;/ax2340:attributeValue&gt;</a>
<a class="sourceLine" id="cb4-34" title="34">               &lt;ax2340:category&gt;urn:oasis:names:tc:xacml:<span class="fl">3.</span><span class="dv">0</span>:attribute-category:resource&lt;/ax2340:category&gt;</a>
<a class="sourceLine" id="cb4-35" title="35">            &lt;/ax2340:attributeDTOs&gt;</a>
<a class="sourceLine" id="cb4-36" title="36">            &lt;ax2340:attributeDTOs xsi:type=<span class="st">&quot;ax2340:AttributeDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-37" title="37">               &lt;ax2340:attributeDataType&gt;http:<span class="co">//www.w3.org/2001/XMLSchema#string&lt;/ax2340:attributeDataType&gt;</span></a>
<a class="sourceLine" id="cb4-38" title="38">               &lt;ax2340:attributeId&gt;CLAIM_URI_<span class="dv">2</span>&lt;/ax2340:attributeId&gt;</a>
<a class="sourceLine" id="cb4-39" title="39">               &lt;ax2340:attributeValue&gt;CLAIM_VALUE_<span class="dv">2</span>&lt;/ax2340:attributeValue&gt;</a>
<a class="sourceLine" id="cb4-40" title="40">               &lt;ax2340:category&gt;urn:oasis:names:tc:xacml:<span class="fl">3.</span><span class="dv">0</span>:attribute-category:resource&lt;/ax2340:category&gt;</a>
<a class="sourceLine" id="cb4-41" title="41">            &lt;/ax2340:attributeDTOs&gt;</a>
<a class="sourceLine" id="cb4-42" title="42">            &lt;ax2340:lastModifiedTime&gt;<span class="dv">1508817592043</span>&lt;/ax2340:lastModifiedTime&gt;</a>
<a class="sourceLine" id="cb4-43" title="43">            &lt;ax2340:lastModifiedUser xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb4-44" title="44">            &lt;ax2340:policy&gt;&lt;![CDATA[&lt;<span class="bu">Policy</span> xmlns=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span>  PolicyId=<span class="st">&quot;authn_time_and_user_claim_based_policy_template&quot;</span> RuleCombiningAlgId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable&quot;</span> Version=<span class="st">&quot;1.0&quot;</span>&gt;&lt;Description&gt;This template policy provides ability to authorize users to a given service <span class="fu">provider</span>(defined by SP_NAME) in the authentication flow based on the claim values of the <span class="fu">user</span> (CLAIM_URI_<span class="dv">1</span>=CLAIM_VALUE_<span class="dv">1</span> and CLAIM_URI_<span class="dv">2</span>=CLAIM_VALUE_<span class="dv">2</span>) and the time of the <span class="fu">day</span> (eg. between 09:<span class="bn">00</span>:<span class="bn">00</span> to <span class="dv">17</span>:<span class="bn">00</span>:<span class="bn">00</span>). Users with the given claim values and who are logged in within the given time range will be allowed and any other users will be denied.&lt;/Description&gt;&lt;<span class="bu">Target</span>&gt;&lt;AnyOf&gt;&lt;AllOf&gt;&lt;Match MatchId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span>&gt;&lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;SP_NAME&lt;/AttributeValue&gt;&lt;AttributeDesignator AttributeId=<span class="st">&quot;http://wso2.org/identity/sp/sp-name&quot;</span> Category=<span class="st">&quot;http://wso2.org/identity/sp&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;false&quot;</span>&gt;&lt;/AttributeDesignator&gt;&lt;/Match&gt;&lt;Match MatchId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span>&gt;&lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;authenticate&lt;/AttributeValue&gt;&lt;AttributeDesignator AttributeId=<span class="st">&quot;http://wso2.org/identity/identity-action/action-name&quot;</span> Category=<span class="st">&quot;http://wso2.org/identity/identity-action&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;false&quot;</span>&gt;&lt;/AttributeDesignator&gt;&lt;/Match&gt;&lt;/AllOf&gt;&lt;/AnyOf&gt;&lt;/<span class="bu">Target</span>&gt;&lt;Rule Effect=<span class="st">&quot;Permit&quot;</span> RuleId=<span class="st">&quot;permit_by_claims_and_time&quot;</span>&gt;&lt;<span class="bu">Condition</span>&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:and&quot;</span>&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:2.0:function:time-in-range&quot;</span>&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:time-one-and-only&quot;</span>&gt;&lt;AttributeDesignator AttributeId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:environment:current-time&quot;</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:attribute-category:environment&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#time&quot;</span> MustBePresent=<span class="st">&quot;true&quot;</span>&gt;&lt;/AttributeDesignator&gt;&lt;/Apply&gt;&lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#time&quot;</span>&gt;09:<span class="bn">00</span>:<span class="bn">00</span>&lt;/AttributeValue&gt;&lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#time&quot;</span>&gt;<span class="dv">17</span>:<span class="bn">00</span>:<span class="bn">00</span>&lt;/AttributeValue&gt;&lt;/Apply&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span>&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-one-and-only&quot;</span>&gt;&lt;AttributeDesignator AttributeId=<span class="st">&quot;CLAIM_URI_1&quot;</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:attribute-category:resource&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;true&quot;</span>&gt;&lt;/AttributeDesignator&gt;&lt;/Apply&gt;&lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;CLAIM_VALUE_<span class="dv">1</span>&lt;/AttributeValue&gt;&lt;/Apply&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span>&gt;&lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-one-and-only&quot;</span>&gt;&lt;AttributeDesignator AttributeId=<span class="st">&quot;CLAIM_URI_2&quot;</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:attribute-category:resource&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;true&quot;</span>&gt;&lt;/AttributeDesignator&gt;&lt;/Apply&gt;&lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;CLAIM_VALUE_<span class="dv">2</span>&lt;/AttributeValue&gt;&lt;/Apply&gt;&lt;/Apply&gt;&lt;/<span class="bu">Condition</span>&gt;&lt;/Rule&gt;&lt;Rule Effect=<span class="st">&quot;Deny&quot;</span> RuleId=<span class="st">&quot;deny_others&quot;</span>&gt;&lt;/Rule&gt;&lt;/<span class="bu">Policy</span>&gt;]]&gt;&lt;/ax2340:policy&gt;</a>
<a class="sourceLine" id="cb4-45" title="45">            &lt;ax2340:policyEditor xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb4-46" title="46">            &lt;ax2340:policyId&gt;authn_time_and_user_claim_based_policy_template&lt;/ax2340:policyId&gt;</a>
<a class="sourceLine" id="cb4-47" title="47">            &lt;ax2340:policyOrder&gt;<span class="dv">12</span>&lt;/ax2340:policyOrder&gt;</a>
<a class="sourceLine" id="cb4-48" title="48">            &lt;ax2340:policyType&gt;<span class="bu">Policy</span>&lt;/ax2340:policyType&gt;</a>
<a class="sourceLine" id="cb4-49" title="49">            &lt;ax2340:promote&gt;<span class="kw">false</span>&lt;/ax2340:promote&gt;</a>
<a class="sourceLine" id="cb4-50" title="50">            &lt;ax2340:version&gt;<span class="dv">1</span>&lt;/ax2340:version&gt;</a>
<a class="sourceLine" id="cb4-51" title="51">         &lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb4-52" title="52">      &lt;/ns:getPolicyResponse&gt;</a>
<a class="sourceLine" id="cb4-53" title="53">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb4-54" title="54">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### getPolicyVersions()

<table>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get the version of a given policy.</td>
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
<td><pre><code>policyId</code></pre></td>
<td>The policy name is registered.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to see the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">      &lt;xsd:getPolicyVersions&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;xsd:policyId&gt;authn_time_and_user_claim_based_policy_template&lt;/xsd:policyId&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">      &lt;/xsd:getPolicyVersions&gt;</a>
<a class="sourceLine" id="cb2-8" title="8">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Responae</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">      &lt;ns:getPolicyVersionsResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span> xmlns:ax2340=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:ax2338=<span class="st">&quot;http://entitlement.identity.carbon.wso2.org/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">         &lt;ns:<span class="kw">return</span>&gt;<span class="dv">1</span>&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">      &lt;/ns:getPolicyVersionsResponse&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### getPublisherModuleData()

  

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 94%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get the details of the publisher</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><p>None</p></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb1-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb1-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb1-4" title="4">      &lt;xsd:getPublisherModuleData/&gt;</a>
<a class="sourceLine" id="cb1-5" title="5">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb1-6" title="6">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">      &lt;ns:getPublisherModuleDataResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span> xmlns:ax2340=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:ax2338=<span class="st">&quot;http://entitlement.identity.carbon.wso2.org/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:type=<span class="st">&quot;ax2340:PublisherDataHolder&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">            &lt;ax2340:moduleName&gt;Carbon Basic Auth <span class="bu">Policy</span> Publisher Module&lt;/ax2340:moduleName&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">            &lt;ax2340:propertyDTOs xsi:type=<span class="st">&quot;ax2340:PublisherPropertyDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">               &lt;ax2340:displayName&gt;Subscriber Password&lt;/ax2340:displayName&gt;</a>
<a class="sourceLine" id="cb2-8" title="8">               &lt;ax2340:displayOrder&gt;<span class="dv">3</span>&lt;/ax2340:displayOrder&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">               &lt;ax2340:id&gt;subscriberPassword&lt;/ax2340:id&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">               &lt;ax2340:module&gt;Carbon Basic Auth <span class="bu">Policy</span> Publisher Module&lt;/ax2340:module&gt;</a>
<a class="sourceLine" id="cb2-11" title="11">               &lt;ax2340:required&gt;<span class="kw">true</span>&lt;/ax2340:required&gt;</a>
<a class="sourceLine" id="cb2-12" title="12">               &lt;ax2340:secret&gt;<span class="kw">true</span>&lt;/ax2340:secret&gt;</a>
<a class="sourceLine" id="cb2-13" title="13">               &lt;ax2340:value xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb2-14" title="14">            &lt;/ax2340:propertyDTOs&gt;</a>
<a class="sourceLine" id="cb2-15" title="15">            &lt;ax2340:propertyDTOs xsi:type=<span class="st">&quot;ax2340:PublisherPropertyDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-16" title="16">               &lt;ax2340:displayName&gt;Subscriber <span class="bu">URL</span>&lt;/ax2340:displayName&gt;</a>
<a class="sourceLine" id="cb2-17" title="17">               &lt;ax2340:displayOrder&gt;<span class="dv">1</span>&lt;/ax2340:displayOrder&gt;</a>
<a class="sourceLine" id="cb2-18" title="18">               &lt;ax2340:id&gt;subscriberURL&lt;/ax2340:id&gt;</a>
<a class="sourceLine" id="cb2-19" title="19">               &lt;ax2340:module&gt;Carbon Basic Auth <span class="bu">Policy</span> Publisher Module&lt;/ax2340:module&gt;</a>
<a class="sourceLine" id="cb2-20" title="20">               &lt;ax2340:required&gt;<span class="kw">true</span>&lt;/ax2340:required&gt;</a>
<a class="sourceLine" id="cb2-21" title="21">               &lt;ax2340:secret&gt;<span class="kw">false</span>&lt;/ax2340:secret&gt;</a>
<a class="sourceLine" id="cb2-22" title="22">               &lt;ax2340:value xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb2-23" title="23">            &lt;/ax2340:propertyDTOs&gt;</a>
<a class="sourceLine" id="cb2-24" title="24">            &lt;ax2340:propertyDTOs xsi:type=<span class="st">&quot;ax2340:PublisherPropertyDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-25" title="25">               &lt;ax2340:displayName&gt;Subscriber User <span class="bu">Name</span>&lt;/ax2340:displayName&gt;</a>
<a class="sourceLine" id="cb2-26" title="26">               &lt;ax2340:displayOrder&gt;<span class="dv">2</span>&lt;/ax2340:displayOrder&gt;</a>
<a class="sourceLine" id="cb2-27" title="27">               &lt;ax2340:id&gt;subscriberUserName&lt;/ax2340:id&gt;</a>
<a class="sourceLine" id="cb2-28" title="28">               &lt;ax2340:module&gt;Carbon Basic Auth <span class="bu">Policy</span> Publisher Module&lt;/ax2340:module&gt;</a>
<a class="sourceLine" id="cb2-29" title="29">               &lt;ax2340:required&gt;<span class="kw">true</span>&lt;/ax2340:required&gt;</a>
<a class="sourceLine" id="cb2-30" title="30">               &lt;ax2340:secret&gt;<span class="kw">false</span>&lt;/ax2340:secret&gt;</a>
<a class="sourceLine" id="cb2-31" title="31">               &lt;ax2340:value xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb2-32" title="32">            &lt;/ax2340:propertyDTOs&gt;</a>
<a class="sourceLine" id="cb2-33" title="33">            &lt;ax2340:propertyDTOs xsi:type=<span class="st">&quot;ax2340:PublisherPropertyDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-34" title="34">               &lt;ax2340:displayName&gt;Subscriber Id&lt;/ax2340:displayName&gt;</a>
<a class="sourceLine" id="cb2-35" title="35">               &lt;ax2340:displayOrder&gt;<span class="dv">0</span>&lt;/ax2340:displayOrder&gt;</a>
<a class="sourceLine" id="cb2-36" title="36">               &lt;ax2340:id&gt;subscriberId&lt;/ax2340:id&gt;</a>
<a class="sourceLine" id="cb2-37" title="37">               &lt;ax2340:module&gt;Carbon Basic Auth <span class="bu">Policy</span> Publisher Module&lt;/ax2340:module&gt;</a>
<a class="sourceLine" id="cb2-38" title="38">               &lt;ax2340:required&gt;<span class="kw">true</span>&lt;/ax2340:required&gt;</a>
<a class="sourceLine" id="cb2-39" title="39">               &lt;ax2340:secret&gt;<span class="kw">false</span>&lt;/ax2340:secret&gt;</a>
<a class="sourceLine" id="cb2-40" title="40">               &lt;ax2340:value xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb2-41" title="41">            &lt;/ax2340:propertyDTOs&gt;</a>
<a class="sourceLine" id="cb2-42" title="42">         &lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb2-43" title="43">      &lt;/ns:getPublisherModuleDataResponse&gt;</a>
<a class="sourceLine" id="cb2-44" title="44">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-45" title="45">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### publishToPDP()

  

<table style="width:100%;">
<colgroup>
<col style="width: 7%" />
<col style="width: 92%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Publish a policy to PDP</td>
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
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be published to PDP.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">      &lt;xsd:publishToPDP&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;!--Zero or more repetitions:--&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;xsd:policyIds&gt;provisioning_user_claim_based_policy_template&lt;/xsd:policyIds&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-8" title="8">         &lt;xsd:version&gt;<span class="dv">1</span>&lt;/xsd:version&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">         &lt;xsd:enabled&gt;<span class="kw">false</span>&lt;/xsd:enabled&gt;</a>
<a class="sourceLine" id="cb2-11" title="11">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-12" title="12">         &lt;xsd:order&gt;<span class="dv">30</span>&lt;/xsd:order&gt;</a>
<a class="sourceLine" id="cb2-13" title="13">      &lt;/xsd:publishToPDP&gt;</a>
<a class="sourceLine" id="cb2-14" title="14">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-15" title="15">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">      &lt;ns:publishToPDPResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:nil=<span class="st">&quot;true&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">      &lt;/ns:publishToPDPResponse&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### removePolicy()

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 94%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Remove policy from PDP</td>
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
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be removed.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">      &lt;xsd:removePolicy&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;xsd:policyId&gt;authn_role_based_policy_template&lt;/xsd:policyId&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-8" title="8">         &lt;xsd:dePromote&gt;<span class="kw">true</span>&lt;/xsd:dePromote&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">      &lt;/xsd:removePolicy&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-11" title="11">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">      &lt;ns:removePolicyResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:nil=<span class="st">&quot;true&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">      &lt;/ns:removePolicyResponse&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### updatePolicy()

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 94%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Publish a policy to PDP</td>
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
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be published to PDP.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span> xmlns:xsd1=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">      &lt;xsd:updatePolicy&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;xsd:policyDTO&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">        </a>
<a class="sourceLine" id="cb2-8" title="8">            &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">            &lt;xsd1:policy&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">            &lt;![CDATA[</a>
<a class="sourceLine" id="cb2-11" title="11">                   &lt;<span class="bu">Policy</span> xmlns=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span>  PolicyId=<span class="st">&quot;samplepolicy_template&quot;</span> RuleCombiningAlgId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable&quot;</span> Version=<span class="st">&quot;1.0&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-12" title="12">                   &lt;Description&gt;This policy template provides ability to authorize users to a given service <span class="fu">provider</span>(defined by SP_NAME) in the authentication flow based on the roles of the <span class="fu">user</span> (defined by ROLE_<span class="dv">1</span> and ROLE_<span class="dv">2</span>). Users who have at least one of the given roles, will be allowed and any others will be denied.&lt;/Description&gt;</a>
<a class="sourceLine" id="cb2-13" title="13">                   &lt;<span class="bu">Target</span>&gt;</a>
<a class="sourceLine" id="cb2-14" title="14">                      &lt;AnyOf&gt;</a>
<a class="sourceLine" id="cb2-15" title="15">                         &lt;AllOf&gt;</a>
<a class="sourceLine" id="cb2-16" title="16">                            &lt;Match MatchId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-equal&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-17" title="17">                               &lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;SP_NAME&lt;/AttributeValue&gt;</a>
<a class="sourceLine" id="cb2-18" title="18">                               &lt;AttributeDesignator AttributeId=<span class="st">&quot;http://wso2.org/identity/sp/sp-name&quot;</span> Category=<span class="st">&quot;http://wso2.org/identity/sp&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;false&quot;</span>&gt;&lt;/AttributeDesignator&gt;</a>
<a class="sourceLine" id="cb2-19" title="19">                            &lt;/Match&gt;</a>
<a class="sourceLine" id="cb2-20" title="20">                         &lt;/AllOf&gt;</a>
<a class="sourceLine" id="cb2-21" title="21">                      &lt;/AnyOf&gt;</a>
<a class="sourceLine" id="cb2-22" title="22">                   &lt;/<span class="bu">Target</span>&gt;</a>
<a class="sourceLine" id="cb2-23" title="23">                   &lt;Rule Effect=<span class="st">&quot;Permit&quot;</span> RuleId=<span class="st">&quot;permit_by_roles&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-24" title="24">                      &lt;<span class="bu">Condition</span>&gt;</a>
<a class="sourceLine" id="cb2-25" title="25">                         &lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:or&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-26" title="26">                            &lt;Apply FunctionId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:function:string-is-in&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-27" title="27">                               &lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;myName&lt;/AttributeValue&gt;</a>
<a class="sourceLine" id="cb2-28" title="28">                               &lt;AttributeDesignator AttributeId=<span class="st">&quot;http://wso2.org/claims/role&quot;</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:subject-category:access-subject&quot;</span> DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span> MustBePresent=<span class="st">&quot;true&quot;</span>&gt;&lt;/AttributeDesignator&gt;</a>
<a class="sourceLine" id="cb2-29" title="29">                            &lt;/Apply&gt;</a>
<a class="sourceLine" id="cb2-30" title="30">                         &lt;/Apply&gt;</a>
<a class="sourceLine" id="cb2-31" title="31">                      &lt;/<span class="bu">Condition</span>&gt;</a>
<a class="sourceLine" id="cb2-32" title="32">                   &lt;/Rule&gt;</a>
<a class="sourceLine" id="cb2-33" title="33">                   &lt;Rule Effect=<span class="st">&quot;Deny&quot;</span> RuleId=<span class="st">&quot;deny_others&quot;</span>&gt;&lt;/Rule&gt;</a>
<a class="sourceLine" id="cb2-34" title="34">                &lt;/<span class="bu">Policy</span>&gt;        </a>
<a class="sourceLine" id="cb2-35" title="35">                ]]&gt;</a>
<a class="sourceLine" id="cb2-36" title="36">            &lt;/xsd1:policy&gt;</a>
<a class="sourceLine" id="cb2-37" title="37">          </a>
<a class="sourceLine" id="cb2-38" title="38">            &lt;xsd1:policyEditorData&gt;?&lt;/xsd1:policyEditorData&gt;</a>
<a class="sourceLine" id="cb2-39" title="39">            &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-40" title="40">            &lt;xsd1:policyId&gt;samplepolicy_template&lt;/xsd1:policyId&gt;</a>
<a class="sourceLine" id="cb2-41" title="41">          </a>
<a class="sourceLine" id="cb2-42" title="42">         &lt;/xsd:policyDTO&gt;</a>
<a class="sourceLine" id="cb2-43" title="43">      &lt;/xsd:updatePolicy&gt;</a>
<a class="sourceLine" id="cb2-44" title="44">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-45" title="45">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">      &lt;ns:updatePolicyResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:nil=<span class="st">&quot;true&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">      &lt;/ns:updatePolicyResponse&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

There is no REST API available for the policy management.

##  Policy Evaluation API

Policy evaluation includes all the actions that should be done during
the policy evaluation such as getting the decision, getting all
entitlement attributes, etc. For this, WSO2 Carbon Platform has provided
an admin service called **EntitlementService** to evaluate a policy.

-   You can use the following URL in your browser to see the WSDL of the
    **EntitlementService** admin service.

      

    ``` java
    https://localhost:9443/services/EntitlementService?wsdl
    ```

    By using any SoapUI, you can call this admin SOAP service.

      

    !!! note
    
        **Note:**
    
        All the APIs are secured with basic authentication. Follow the steps
        below to add a basic auth header when calling these methods.
    
        1.  Build a string of the form username:password.
        2.  [Encode the string](https://www.base64encode.org/) you created
            above using Base64.
        3.  Define an authorization header with the term "
            `             Basic_            ` ", followed by the encoded
            string. For example, the basic auth authorization header using
            "admin" as both username and password is as follows:
    
            ``` java
            Authorization: Basic YWRtaW46YWRtaW4=
            ```
---

#### Operations included in **EntitlementService SOAP** API

!!! note
    
    Before you begin,
    
    In order to try this EntitlementService using [SOAP UI](https://www.soapui.org/downloads/latest-release.html), You need to
    publish a Policy to the PDP. For this, you can use
    EntitlementPolicyAdminService or management console UI.
    
    We use the following sample policy to evaluate using EntitlementService
    admin service.
    
    ``` java
    <Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" PolicyId="samplePolicy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides" Version="1.0">
        <Target>
            <AnyOf>
                <AllOf>
                    <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
                        <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"/>
                    </Match>
                </AllOf>
            </AnyOf>
        </Target>
        <Rule Effect="Permit" RuleId="permit"/>
    </Policy>
    ```

The following commonly used operations are available in the
EntitlementPolicyAdminService. A sample SOAP request and response will
be available with each of the operation.

---

###### getDecision()

  

<table style="width:100%;">
<colgroup>
<col style="width: 9%" />
<col style="width: 90%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get the decision after evaluating the request with the policy.</td>
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
<td><pre style="white-space: pre-wrap;"><code>request</code></pre></td>
<td>The XML request to be evaluated as a CDATA</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">      &lt;xsd:getDecision&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;xsd:request&gt;&lt;![CDATA[</a>
<a class="sourceLine" id="cb2-7" title="7">         &lt;<span class="bu">Request</span> CombinedDecision=<span class="st">&quot;false&quot;</span> ReturnPolicyIdList=<span class="st">&quot;false&quot;</span> xmlns=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-8" title="8"> &lt;<span class="bu">Attributes</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:subject-category:access-subject&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-9" title="9">      &lt;<span class="bu">Attribute</span> IncludeInResult=<span class="st">&quot;false&quot;</span> AttributeId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:subject:subject-id&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">         &lt;AttributeValue DataType=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:data-type:rfc822Name&quot;</span>&gt;bs<span class="at">@simpsons</span>.<span class="fu">com</span>&lt;/AttributeValue&gt;</a>
<a class="sourceLine" id="cb2-11" title="11">      &lt;/<span class="bu">Attribute</span>&gt;</a>
<a class="sourceLine" id="cb2-12" title="12">   &lt;/<span class="bu">Attributes</span>&gt;</a>
<a class="sourceLine" id="cb2-13" title="13">    &lt;<span class="bu">Attributes</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:attribute-category:action&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-14" title="14">        &lt;<span class="bu">Attribute</span> AttributeId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:action:action-id&quot;</span> IncludeInResult=<span class="st">&quot;false&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-15" title="15">            &lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;read&lt;/AttributeValue&gt;</a>
<a class="sourceLine" id="cb2-16" title="16">        &lt;/<span class="bu">Attribute</span>&gt;</a>
<a class="sourceLine" id="cb2-17" title="17">    &lt;/<span class="bu">Attributes</span>&gt;</a>
<a class="sourceLine" id="cb2-18" title="18">    &lt;<span class="bu">Attributes</span> Category=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:attribute-category:resource&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-19" title="19">        &lt;<span class="bu">Attribute</span> AttributeId=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:resource:resource-id&quot;</span> IncludeInResult=<span class="st">&quot;false&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-20" title="20">            &lt;AttributeValue DataType=<span class="st">&quot;http://www.w3.org/2001/XMLSchema#string&quot;</span>&gt;http:<span class="co">//127.0.0.1/service/very_secure/ &lt;/AttributeValue&gt;</span></a>
<a class="sourceLine" id="cb2-21" title="21">        &lt;/<span class="bu">Attribute</span>&gt;</a>
<a class="sourceLine" id="cb2-22" title="22">    &lt;/<span class="bu">Attributes</span>&gt;</a>
<a class="sourceLine" id="cb2-23" title="23">&lt;/<span class="bu">Request</span>&gt;</a>
<a class="sourceLine" id="cb2-24" title="24">         ]]&gt;&lt;/xsd:request&gt;</a>
<a class="sourceLine" id="cb2-25" title="25">      &lt;/xsd:getDecision&gt;</a>
<a class="sourceLine" id="cb2-26" title="26">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-27" title="27">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">      &lt;ns:getDecisionResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">         &lt;ns:<span class="kw">return</span>&gt;&lt;![CDATA[&lt;<span class="bu">Response</span> xmlns=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span>&gt;&lt;<span class="bu">Result</span>&gt;&lt;Decision&gt;Permit&lt;/Decision&gt;&lt;Status&gt;&lt;StatusCode Value=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:status:ok&quot;</span>/&gt;&lt;/Status&gt;&lt;/<span class="bu">Result</span>&gt;&lt;/<span class="bu">Response</span>&gt;]]&gt;&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">      &lt;/ns:getDecisionResponse&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

  

---  

###### getBooleanDecision()

  

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 85%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get the decision after evaluating the request with the policy published in a boolean format.</td>
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
<td><pre style="white-space: pre-wrap;"><code>subject</code></pre></td>
<td>The subject/user who is using the resource.</td>
</tr>
<tr class="even">
<td><pre style="white-space: pre-wrap;"><code>resource</code></pre></td>
<td>The resource which is accessed by the user.</td>
</tr>
<tr class="odd">
<td><pre style="white-space: pre-wrap;"><code>action</code></pre></td>
<td>The action performed by the user.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb4-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb4-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb4-4" title="4">      &lt;xsd:getBooleanDecision&gt;</a>
<a class="sourceLine" id="cb4-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb4-6" title="6">         &lt;xsd:subject&gt;admin&lt;/xsd:subject&gt;</a>
<a class="sourceLine" id="cb4-7" title="7">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb4-8" title="8">         &lt;xsd:resource&gt;http:<span class="co">//127.0.0.1/service/very_secure/&lt;/xsd:resource&gt;</span></a>
<a class="sourceLine" id="cb4-9" title="9">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb4-10" title="10">         &lt;xsd:action&gt;read&lt;/xsd:action&gt;</a>
<a class="sourceLine" id="cb4-11" title="11">      &lt;/xsd:getBooleanDecision&gt;</a>
<a class="sourceLine" id="cb4-12" title="12">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb4-13" title="13">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb5-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb5-3" title="3">      &lt;ns:getBooleanDecisionResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb5-4" title="4">         &lt;ns:<span class="kw">return</span>&gt;<span class="kw">true</span>&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb5-5" title="5">      &lt;/ns:getBooleanDecisionResponse&gt;</a>
<a class="sourceLine" id="cb5-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb5-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### getDecisionByAttributes()

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 87%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get the decision by evaluating attributes with the policy.</td>
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
<th><h6 id="EntitlementwithAPIs-Parameter">Parameter</h6></th>
<th><h6 id="EntitlementwithAPIs-Description">Description</h6></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre style="white-space: pre-wrap;"><code>subject</code></pre></td>
<td><h6 id="EntitlementwithAPIs-Thesubject/userwhoisusingtheresource.">The subject/user who is using the resource.</h6></td>
</tr>
<tr class="even">
<td><h6 id="EntitlementwithAPIs-resource" style="white-space: pre-wrap;">resource</h6></td>
<td><h6 id="EntitlementwithAPIs-Theresourcewhichisaccessedbytheuser.">The resource which is accessed by the user.</h6></td>
</tr>
<tr class="odd">
<td><h6 id="EntitlementwithAPIs-action" style="white-space: pre-wrap;">action</h6></td>
<td><h6 id="EntitlementwithAPIs-Theactionperformedbytheuser.">The action performed by the user.</h6></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb2-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb2-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-4" title="4">      &lt;xsd:getDecisionByAttributes&gt;</a>
<a class="sourceLine" id="cb2-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-6" title="6">         &lt;xsd:subject&gt;admin&lt;/xsd:subject&gt;</a>
<a class="sourceLine" id="cb2-7" title="7">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-8" title="8">         &lt;xsd:resource&gt;http:<span class="co">//127.0.0.1/service/very_secure/&lt;/xsd:resource&gt;</span></a>
<a class="sourceLine" id="cb2-9" title="9">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb2-10" title="10">         &lt;xsd:action&gt;read&lt;/xsd:action&gt;</a>
<a class="sourceLine" id="cb2-11" title="11">      &lt;/xsd:getDecisionByAttributes&gt;</a>
<a class="sourceLine" id="cb2-12" title="12">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb2-13" title="13">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-3" title="3">      &lt;ns:getDecisionByAttributesResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">         &lt;ns:<span class="kw">return</span>&gt;&lt;![CDATA[&lt;<span class="bu">Response</span> xmlns=<span class="st">&quot;urn:oasis:names:tc:xacml:3.0:core:schema:wd-17&quot;</span>&gt;&lt;<span class="bu">Result</span>&gt;&lt;Decision&gt;Permit&lt;/Decision&gt;&lt;Status&gt;&lt;StatusCode Value=<span class="st">&quot;urn:oasis:names:tc:xacml:1.0:status:ok&quot;</span>/&gt;&lt;/Status&gt;&lt;/<span class="bu">Result</span>&gt;&lt;/<span class="bu">Response</span>&gt;]]&gt;&lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">      &lt;/ns:getDecisionByAttributesResponse&gt;</a>
<a class="sourceLine" id="cb3-6" title="6">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb3-7" title="7">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

---

###### getEntitledAttributes()

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 87%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Description</td>
<td>Get all the details of the entitled attributes.</td>
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
<td><pre><code>subjectName</code></pre></td>
<td>Subject/Username of the subject which access the resource.</td>
</tr>
<tr class="even">
<td><pre><code>resourceName</code></pre></td>
<td>Name of the resource which is accessed by the subject.</td>
</tr>
<tr class="odd">
<td><pre><code>subjectId</code></pre></td>
<td>XACML id of the subject</td>
</tr>
<tr class="even">
<td><pre><code>action</code></pre></td>
<td>Action which is performed by the subject.</td>
</tr>
<tr class="odd">
<td><pre><code>enableChildSearch</code></pre></td>
<td>Enable search over child attributes.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Request</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the request</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span> xmlns:xsd=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb6-2" title="2">   &lt;soapenv:Header/&gt;</a>
<a class="sourceLine" id="cb6-3" title="3">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb6-4" title="4">      &lt;xsd:getEntitledAttributes&gt;</a>
<a class="sourceLine" id="cb6-5" title="5">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb6-6" title="6">         &lt;xsd:subjectName&gt;admin&lt;/xsd:subjectName&gt;</a>
<a class="sourceLine" id="cb6-7" title="7">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb6-8" title="8">         &lt;xsd:resourceName&gt;http:<span class="co">//127.0.0.1/service/very_secure/&lt;/xsd:resourceName&gt;</span></a>
<a class="sourceLine" id="cb6-9" title="9">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb6-10" title="10">         &lt;xsd:subjectId&gt;urn:oasis:names:tc:xacml:<span class="fl">1.</span><span class="dv">0</span>:subject:subject-id&lt;/xsd:subjectId&gt;</a>
<a class="sourceLine" id="cb6-11" title="11">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb6-12" title="12">         &lt;xsd:action&gt;read&lt;/xsd:action&gt;</a>
<a class="sourceLine" id="cb6-13" title="13">         &lt;!--Optional:--&gt;</a>
<a class="sourceLine" id="cb6-14" title="14">         &lt;xsd:enableChildSearch&gt;<span class="kw">true</span>&lt;/xsd:enableChildSearch&gt;</a>
<a class="sourceLine" id="cb6-15" title="15">      &lt;/xsd:getEntitledAttributes&gt;</a>
<a class="sourceLine" id="cb6-16" title="16">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb6-17" title="17">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="content-wrapper">
<details class="info">
<summary> Click here to expand the response</summary>
<p> 
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1">&lt;soapenv:Envelope xmlns:soapenv=<span class="st">&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;</span>&gt;</a>
<a class="sourceLine" id="cb7-2" title="2">   &lt;soapenv:Body&gt;</a>
<a class="sourceLine" id="cb7-3" title="3">      &lt;ns:getEntitledAttributesResponse xmlns:ns=<span class="st">&quot;http://org.apache.axis2/xsd&quot;</span>&gt;</a>
<a class="sourceLine" id="cb7-4" title="4">         &lt;ns:<span class="kw">return</span> xsi:type=<span class="st">&quot;ax2348:EntitledResultSetDTO&quot;</span> xmlns:ax2346=<span class="st">&quot;http://entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:ax2348=<span class="st">&quot;http://dto.entitlement.identity.carbon.wso2.org/xsd&quot;</span> xmlns:xsi=<span class="st">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>&gt;</a>
<a class="sourceLine" id="cb7-5" title="5">            &lt;ax2348:advanceResult&gt;<span class="kw">false</span>&lt;/ax2348:advanceResult&gt;</a>
<a class="sourceLine" id="cb7-6" title="6">            &lt;ax2348:entitledAttributesDTOs xsi:type=<span class="st">&quot;ax2348:EntitledAttributesDTO&quot;</span>&gt;</a>
<a class="sourceLine" id="cb7-7" title="7">               &lt;ax2348:action&gt;read&lt;/ax2348:action&gt;</a>
<a class="sourceLine" id="cb7-8" title="8">               &lt;ax2348:allActions&gt;<span class="kw">false</span>&lt;/ax2348:allActions&gt;</a>
<a class="sourceLine" id="cb7-9" title="9">               &lt;ax2348:allResources&gt;<span class="kw">true</span>&lt;/ax2348:allResources&gt;</a>
<a class="sourceLine" id="cb7-10" title="10">               &lt;ax2348:environment xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb7-11" title="11">               &lt;ax2348:resourceName xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb7-12" title="12">            &lt;/ax2348:entitledAttributesDTOs&gt;</a>
<a class="sourceLine" id="cb7-13" title="13">            &lt;ax2348:message xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb7-14" title="14">            &lt;ax2348:messageType xsi:nil=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb7-15" title="15">         &lt;/ns:<span class="kw">return</span>&gt;</a>
<a class="sourceLine" id="cb7-16" title="16">      &lt;/ns:getEntitledAttributesResponse&gt;</a>
<a class="sourceLine" id="cb7-17" title="17">   &lt;/soapenv:Body&gt;</a>
<a class="sourceLine" id="cb7-18" title="18">&lt;/soapenv:Envelope&gt;</a></code></pre></div></p></details></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

!!! info "REST API"
    WSO2 Identity Server provides a REST API and a REST endpoint for the
    policy evaluation. Please read more about this REST API from [here](../../apis/entitlement-with-rest-apis).

  

  
