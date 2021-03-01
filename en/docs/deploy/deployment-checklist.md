# Deployment Checklist

<table>
<thead>
<tr class="header">
<th>Guideline</th>
<th>Details</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Security hardening</td>
<td><div class="content-wrapper">
<p>Guidelines for hardening the security of a WSO2 Identity Server deployment in a production environment can be discussed under three high-level categories:</p>
<ul>
<li>Product-level security</li>
<li>OS-level security</li>
<li>Network-level security<br />
<br />
</li>
</ul>
<div class="panel" style="border-width: 1px;">
<div class="panelHeader" style="border-bottom-width: 1px;">
<strong>Related links</strong>
</div>
<div class="panelContent">
<li><a href="../../../deploy/security/security-guidelines-for-production-deployment">Security Guidelines for Production 
Deployment</a></li>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Hostname</td>
<td><div class="content-wrapper">
<p>By default, WSO2 Identity Server identifies the hostname of the current machine through the Java API. However, this value 
sometimes yields erroneous results on some environments. Therefore, users are recommended to configure the hostname 
by setting the relavent parameter in the <code>               &lt;IS_HOME&gt;/repository/conf/deployment.toml     
    
     </code> file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="panel" style="border-width: 1px;">
<div class="panelHeader" style="border-bottom-width: 1px;">
<strong>Related links</strong>
</div>
<div class="panelContent">
<li><a href="../../../deploy/change-the-hostname">Changing the hostname</a></li>
</ul></li>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Userstores</td>
<td><div class="content-wrapper">
<p>WSO2 products offer three choices to store user details:</p>
<ul>
<li>Using a database</li>
<li>Using an LDAP server</li>
<li>Using an Active Directory service</li>
</ul>
<p>The default is the embedded H2 database, with the userstore schema. Like in the case of the registry database, you can switch to a database like Oracle, MySQL or MSSQL. You can point to an existing LDAP or an Active Directory to make use of existing user bases and grant access privileges for WSO2 products based on those userstores.</p>
<div class="panel" style="border-width: 1px;">
<div class="panelHeader" style="border-bottom-width: 1px;">
<strong>Related links</strong>
</div>
<div class="panelContent">
<li><a href="../../setup/working-with-databases/">Working with Databases</a></li>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Tuning WSO2 products</td>
<td><div class="content-wrapper">
<p>WSO2 Identity Server has additional guidelines for optimizing the performance 
of product-specific features.</p>
<div class="panel" style="border-width: 1px;">
<div class="panelHeader" style="border-bottom-width: 1px;">
<strong>Related links</strong>
</div>
<div class="panelContent">
<div>
<ul>
<li><a href="../../../deploy/performance/performance-tuning-recommendations">Performance Tuning Recommendations</a> </li>
</div></td>
</tr>
<tr class="odd">
<td>Firewalls</td>
<td><div class="content-wrapper">
<p>The following ports must be accessed when operating within a firewall.</p>
<ul>
<li>9443 - Used by the management console and services that use the servlet transport, and is defined in the <code>  
              &lt;IS_HOME&gt;/repository/conf/deployment.toml               </code> file.</li>
</ul>
<div class="panel" style="border-width: 1px;">
<div class="panelHeader" style="border-bottom-width: 1px;">
<strong>Related links</strong>
</div>
<div class="panelContent">
<li><a href="../../../references/default-ports-of-wso2-products">Default Ports of WSO2 Identity Server</a> </li>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Proxy servers</td>
<td><div class="content-wrapper">
<p>If the product is hosted behind a proxy such as ApacheHTTPD, users can configure products to use the proxy server by providing the following system properties at the start-up.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">-Dhttp.<span class="fu">proxyHost</span>=xxxx </a>
<a class="sourceLine" id="cb4-2" title="2">-Dhttp.<span class="fu">proxyPort</span>=xxxx</a></code></pre></div>
</div>
</div>
<p>Alternatively, this can be done by adding the following configurations in the <code>               &lt;
IS_HOME&gt;/repository/conf/deployment.toml              </code> file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<a class="sourceLine" id="cb5-3" title="3">    <span class="kw">[transport.https.properties]<span 
class="kw"></span></a><br/>
<a class="sourceLine" id="cb5-3" title="3">    <span class="kw">proxyhost : </span>"you.proxy.host"<span 
class="kw"></span></a><br/>
<a class="sourceLine" id="cb5-3" title="3">    <span class="kw">proxyPort : </span>"your.proxy.port"<span 
class="kw"></span></a><br/>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>High availability</td>
<td><div class="content-wrapper">
<p>For high availability, WSO2 Identity Server must run on a cluster. Databases used for the repository, user 
management, and business activity monitoring can also be configured in a cluster or can use replication management provided by the RDBMS.</p>
<div class="panel" style="border-width: 1px;">
<div class="panelHeader" style="border-bottom-width: 1px;">
<strong>Related links</strong>
</div>
<div class="panelContent">
<ul>
<li><a href="TBD:../../administer/clustering-overview">Clustering Overview</a> </li>
</ul>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Data backup and archiving</td>
<td>For data backup and for archiving of data, use the functionality provided by the RDBMS.</td>
</tr>
</tbody>
</table>