# Upgrading From an Older Version of WSO2 IS

!!! warning
    
    Note that these instructions have been tested for migration from WSO2 IS
    5.0.0 to 5.8.0 only with the ORACLE and MySQL databases.
    

The following sections provide instructions that enable you to upgrade
from older versions of WSO2 Identity Server (from version 5.0.0 onwards)
to the latest version of WSO2 Identity Server. In this topic,
`         <OLD_IS_HOME>        ` is the directory that the older version
of WSO2 Identity Server resides in, and `         <NEW_IS_HOME>        `
is the directory that the latest version of WSO2 Identity Server resides
in.

!!! tip
    
    Before you begin
    
    This release is a WUM-only release. This means that there are no manual
    patches. Any further fixes or latest updates for this release can be
    updated through WSO2 Update Manager (WUM).
    
    -   **If you are upgrading to use this version in your production
        environment**, use the WSO2 Update Manager to get the latest
        updates available for WSO2 IS. For more information on how to do
        this, see [Updating WSO2
        Products](https://docs.wso2.com/display/ADMIN44x/Updating+WSO2+Products)
        .
    

-   [Migrating the embedded LDAP user
    store](#UpgradingFromanOlderVersionofWSO2IS-MigratingtheembeddedLDAPuserstore)
-   [Migrating the
    configurations](#UpgradingFromanOlderVersionofWSO2IS-Migratingtheconfigurations)
-   [Migrating the custom
    components](#UpgradingFromanOlderVersionofWSO2IS-Migratingthecustomcomponents)
-   [Migrating the
    data](#UpgradingFromanOlderVersionofWSO2IS-Migratingthedata)

### Migrating the embedded LDAP user store

It is not generally recommended to use the embedded LDAP user store that
is shipped with WSO2 Identity Server in production setups. However, if
migration of the embedded LDAP is required, follow the instructions
below to migrate the existing WSO2 IS LDAP user store to the new version
of WSO2 IS.

1.  Copy the `          <OLD_IS_HOME>/repository/data         ` folder
    to `          <NEW_IS_HOME>/repository/data         ` folder.
2.  Restart the server to save the changes.

### Migrating the configurations

You can use one of the following approaches to migrate depending on your
production environment.

**Migrating by updating the custom configurations**

**This approach is recommended if:**

-   You have done very few configuration changes in your previous
    version of WSO2 IS. These configuration changes have been tracked
    and are easy to redo.

**Steps:**

1.  If you have made configuration changes to the config files in your
    previous version of WSO2 IS, update the files in the
    `              <NEW_IS_HOME>/repository/conf             ` folder
    with your own configurations.
2.  Proceed to the [Migrating the
    data](#UpgradingFromanOlderVersionofWSO2IS-Migratingthedata) section
    to run the migration client.

**Migrating by updating the new configurations in 5.8.0**

**This approach is recommended if:**

-   You have done many configuration changes in your previous version of
    WSO2 IS.
-   These configurations have not been tracked completely and/or are
    difficult to redo.

**Steps:**

Make a copy of the
`              <OLD_IS_HOME>/repository/conf             ` folder. (Do
not change the original configurations. You may use it as a backup in
case there are any issues)

Copy the `               health-check-config.xml              ` file
from the `               <NEW_IS_HOME>/repository/conf              `
directory and paste it in the copy of the
`               <OLD_IS_HOME>/repository/conf              ` directory.

Copy the `               wso2-log-masking.properties              ` file
from the `               <NEW_IS_HOME>/repository/conf              `
directory and paste it in the copy of the
`               <OLD_IS_HOME>/repository/conf              ` directory.

The tabs below list out all the configuration changes from IS 5.0.0 to
IS 5.8.0. You can take a look at the required tabs and change the
relevant configurations according to the features you are using.

!!! note
    
    The configuration changes listed below will not affect the existing
    system because these configurations are applied only at first start up
    and new tenant creation.
    
    If you want to change the configurations for the existing tenants,
    configure it through the management console user interface.
    

**Tip:** Scroll left/right to view the entire table below.

-   [**IS 5.0.0 to 5.1.0**](#7373b16cdf684c77bf07b9b1276212e7)
-   [**IS 5.1.0 to 5.2.0**](#4d50ae56b1eb4658aee939f354e98e19)
-   [**IS 5.2.0 to 5.3.0**](#408831b2e51b4e3e86a26efa1b765769)
-   [**IS 5.3.0 to 5.4.0**](#a25da33daef8445986c326f9825a4a65)
-   [**IS 5.4.0 to 5.5.0**](#63476492ab414ee496ae8952163ccfdc)
-   [**IS 5.5.0 to 5.6.0**](#39ca9f7191a64dbdb45d85799dce47d3)
-   [**IS 5.6.0 to 5.7.0**](#ddae002833a34ca3b44a3bfc2f410779)
-   [**IS 5.7.0 to 5.8.0**](#9185f368b1cb487692609bbb90f6b261)

![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

<table>
<thead>
<tr class="header">
<th>Configuration File</th>
<th>Configuration Change</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><a href="https://docs.wso2.com/display/Carbon430/Configuring+axis2.xml">axis2.xml</a> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/axis2/                          </code> directory.</td>
<td>The following new parameter was added: <code>                           &lt;parameter name="httpContentNegotiation"&gt;true&lt;/parameter&gt;                          </code> . When this is set to 'true', the server will determine the contentType of responses to requests, by using the 'Accept header' of the request.</td>
</tr>
<tr class="even">
<td>identity.xml file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/identity                          </code> directory.</td>
<td><ol>
<li>The <code>                             &lt;TimeConfig&gt;                            </code> element was added. This element contains a global session timeout configuration. To configure session timeouts and remember me periods tenant wise, see <a href="https://docs.wso2.com/display/IS510/Configuring+Session+Timeout">Configuring Session Timeout</a> .</li>
<li>The <code>                             &lt;SessionTimeout&gt;                            </code> parameter under the <code>                             &lt;OpenID&gt;                            </code> element and the <code>                             &lt;SSOService&gt;                            </code> element was removed. This configuration is no longer a constant across all service providers. With Identity Server 5.1.0, you can define the session timeout and remember me period tenant wise using the management console. For more information on how to do this, see <a href="https://docs.wso2.com/display/IS510/Configuring+Session+Timeout">Configuring Session Timeout</a> .</li>
</ol></td>
</tr>
<tr class="odd">
<td>tenant-axis2.xml stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/tomcat/                          </code> directory.</td>
<td>The default value for the "httpContentNegotiation" parameter is set to 'true': <code>                           &lt;parameter name="httpContentNegotiation"&gt;true&lt;/parameter&gt;                          </code> .</td>
</tr>
<tr class="even">
<td><a href="https://docs.wso2.com/display/Carbon430/Configuring+catalina-server.xml">catalina-server.xml</a> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/tomcat/                          </code> directory.</td>
<td><div class="content-wrapper">
<ol>
<li><p>Keystore parameters was added under the <code>                               &lt;Connector&gt;                              </code> element as shown below. This setting allows you to use separate keystore and security certificates to certify SSL connections. Note that the location and password of the default " wso2carbon.jks" keystore is given for these parameters by default.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1">keystoreFile=location of the keystore file</a>
<a class="sourceLine" id="cb1-2" title="2">keystorePass=password for the keystore </a></code></pre></div>
</div>
</div></li>
<li>The ciphers parameter under the <code>                              &lt;Connector&gt;                             </code> element was removed. Depending on the java version you are using, you can define ciphers using the <a href="https://docs.wso2.com/display/Carbon443/Configuring+Transport+Level+Security">Configuring Transport Level Security</a> page as a guide.</li>
<li>The clientAuth parameter setting under the <code>                              &lt;Connector&gt;                             </code> element was changed from <code>                              clientAuth="false"                             </code> to <code>                              clientAuth="want"                             </code> . Setting this parameter to false makes the two-way SSL authentication optional and uses it in instances when it is possible i.e., if you need to disable the certification authentication in certain occasions (e.g., mobile applications). This is recommended since setting it to 'false' will simply disable certificate authentication completely and not use it even when it is possible.<br />
</li>
<li>The <code>                              &lt;Host&gt;                             </code> element was removed. It was a dded to fix XSS and CSRF vulnarabilities in WSO2-CARBON-PATCH-4.2.0-1256. For information on how to fix these vulnerabilities in IS 5.1.0, see the following pages:
<ol>
<li><a href="https://docs.wso2.com/display/IS510/Mitigating+Cross+Site+Request+Forgery+%28CSRF%29+Attacks">Mitigating Cross Site Request Forgery (CSRF) Attacks</a></li>
<li><a href="https://docs.wso2.com/display/IS510/Mitigating+Carriage+Return+Line+Feed+%28CRLF%29+Attacks">Mitigating Carriage Return Line Feed (CRLF)</a></li>
<li><a href="https://docs.wso2.com/display/IS510/Mitigating+Cross+Site+Scripting+%28XSS%29+Attacks">Mitigating Cross Site Scripting (XSS) Attacks</a><br />
</li>
</ol></li>
</ol>
</div></td>
</tr>
<tr class="odd">
<td><a href="https://docs.wso2.com/display/Carbon430/Configuring+master-datasources.xml">master-datasources.xml</a> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/datasources/                          </code> directory.</td>
<td>Default auto-commit setting for a data source is set to false: <code>                           &lt;defaultAutoCommit&gt;false&lt;/defaultAutoCommit&gt;                          </code> .</td>
</tr>
<tr class="even">
<td><a href="https://docs.wso2.com/display/Carbon430/Configuring+carbon.xml">carbon.xml</a> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/                          </code> directory.</td>
<td><div class="content-wrapper">
<ol>
<li><p>New parameters to define proxy context path as shown below;<br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;MgtProxyContextPath&gt;&lt;/MgtProxyContextPath&gt;</span></a>
<a class="sourceLine" id="cb2-2" title="2"><span class="kw">&lt;ProxyContextPath&gt;&lt;/ProxyContextPath&gt;</span></a></code></pre></div>
</div>
</div>
<p>Proxy context path is a useful parameter to add a proxy path when a Carbon server is fronted by reverse proxy. In addition to the proxy host and proxy port this parameter allows you add a path component to external URLs. See <a href="https://docs.wso2.com/display/Carbon430/Adding+a+Custom+Proxy+Path">Adding a Custom Proxy Path</a> for details.</p></li>
<li><p>The following port configurations was removed:<br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="co">&lt;!-- Embedded Qpid broker ports →</span></a>
<a class="sourceLine" id="cb3-2" title="2"><span class="co">&lt;EmbeddedQpid&gt;</span></a>
<a class="sourceLine" id="cb3-3" title="3"><span class="co">&lt;!</span><span class="er">--</span><span class="co"> Broker TCP Port →</span></a>
<a class="sourceLine" id="cb3-4" title="4"><span class="co">&lt;BrokerPort&gt;5672&lt;/BrokerPort&gt;</span></a>
<a class="sourceLine" id="cb3-5" title="5"><span class="co">&lt;!</span><span class="er">--</span><span class="co"> SSL Port →</span></a>
<a class="sourceLine" id="cb3-6" title="6"><span class="co">&lt;BrokerSSLPort&gt;8672&lt;/BrokerSSLPort&gt;</span></a>
<a class="sourceLine" id="cb3-7" title="7"><span class="co">&lt;/EmbeddedQpid&gt;</span></a></code></pre></div>
</div>
</div></li>
<li><p>In Carbon 4.2.0, the following registry keystore configuration was required for configuring the keystore keys that certify encrypting/decrypting meta data to the registry. From Carbon 4.3.0 onwards the primary keystore configuration shown below will be used for this purpose as well. Therefore, it is not necessary to use a separate registry keystore configuration for encrypting/decrypting meta data to the registry. Read more about <a href="https://docs.wso2.com/display/Carbon430/Configuring+Keystores+in+WSO2+Products">keystore configurations in Carbon 4.3.0</a> .<br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;RegistryKeyStore&gt;</span></a>
<a class="sourceLine" id="cb4-2" title="2">            <span class="co">&lt;!-- Keystore file location--&gt;</span></a>
<a class="sourceLine" id="cb4-3" title="3">            <span class="kw">&lt;Location&gt;</span>${carbon.home}/repository/resources/security/wso2carbon.jks<span class="kw">&lt;/Location&gt;</span></a>
<a class="sourceLine" id="cb4-4" title="4">            <span class="co">&lt;!-- Keystore type (JKS/PKCS12 etc.)--&gt;</span></a>
<a class="sourceLine" id="cb4-5" title="5">            <span class="kw">&lt;Type&gt;</span>JKS<span class="kw">&lt;/Type&gt;</span></a>
<a class="sourceLine" id="cb4-6" title="6">            <span class="co">&lt;!-- Keystore password--&gt;</span></a>
<a class="sourceLine" id="cb4-7" title="7">            <span class="kw">&lt;Password&gt;</span>wso2carbon<span class="kw">&lt;/Password&gt;</span></a>
<a class="sourceLine" id="cb4-8" title="8">            <span class="co">&lt;!-- Private Key alias--&gt;</span></a>
<a class="sourceLine" id="cb4-9" title="9">            <span class="kw">&lt;KeyAlias&gt;</span>wso2carbon<span class="kw">&lt;/KeyAlias&gt;</span></a>
<a class="sourceLine" id="cb4-10" title="10">            <span class="co">&lt;!-- Private Key password--&gt;</span></a>
<a class="sourceLine" id="cb4-11" title="11">            <span class="kw">&lt;KeyPassword&gt;</span>wso2carbon<span class="kw">&lt;/KeyPassword&gt;</span></a>
<a class="sourceLine" id="cb4-12" title="12"><span class="kw">&lt;/RegistryKeyStore&gt;</span></a></code></pre></div>
</div>
</div></li>
</ol>
</div></td>
</tr>
<tr class="odd">
<td><p>user-mgt.xml file stored in the /repository/conf/ directory.</p></td>
<td><div class="content-wrapper">
<p>The following property was added under the tag. If you are connecting the database from a previous version of IS, set this property to false.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb5-1" title="1"><span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;isCascadeDeleteEnabled&quot;</span><span class="kw">&gt;</span>true<span class="kw">&lt;/Property&gt;</span></a></code></pre></div>
</div>
</div>
<p>The following properties under the &lt;UserStoreManager&gt; tag were changed as follows:</p>
<ul>
<li>The <code>                              &lt;BackLinks                                                             Enabled&gt;                                                           </code> property was added. If this property is set to 'true', it enables an object that has a reference to another object to inherit the attributes of the referenced object.</li>
<li><p>The following property was added. It provides flexibility to customize the error message.<br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb6-1" title="1"><span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;UsernameJavaRegExViolationErrorMsg&quot;</span><span class="kw">&gt;</span>Username pattern policy violated<span class="kw">&lt;/Property&gt;</span></a>
<a class="sourceLine" id="cb6-2" title="2">            <span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;PasswordJavaRegEx&quot;</span><span class="kw">&gt;</span>^[\S]{5,30}$<span class="kw">&lt;/Property&gt;</span></a></code></pre></div>
</div>
</div></li>
<li><p>The &lt; IsBulkImportSupported&gt; property was added. It specifies whether to enable or disable bulk user import.</p></li>
<li><p>The following properties were added. They provide flexibility to customize the connection pooling parameters.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb7-1" title="1"><span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;ConnectionPoolingEnabled&quot;</span><span class="kw">&gt;</span>false<span class="kw">&lt;/Property&gt;</span></a>
<a class="sourceLine" id="cb7-2" title="2">            <span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;LDAPConnectionTimeout&quot;</span><span class="kw">&gt;</span>5000<span class="kw">&lt;/Property&gt;</span></a>
<a class="sourceLine" id="cb7-3" title="3">            <span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;ReadTimeout&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb7-4" title="4">            <span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;RetryAttempts&quot;</span><span class="kw">/&gt;</span></a></code></pre></div>
</div>
</div></li>
</ul>
</div></td>
</tr>
<tr class="even">
<td><a href="https://docs.wso2.com/display/Carbon430/Configuring+registry.xml">registry.xml</a> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/                          </code> directory.</td>
<td>The default value was changed to 'false' for the following setting: <code>                           &lt;versionResourcesOnChange&gt;false&lt;/versionResourcesOnChange&gt;                          </code> .</td>
</tr>
<tr class="odd">
<td>authenticators.xml file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/security                          </code> directory.</td>
<td><div class="content-wrapper">
<p>The following parameter was added under the &lt;Authenticator&gt; element to specify the AssertionConsumerServiceURL. This is an optional parameter and is used by the requesting party to build the request. For more information, see <a href="https://docs.wso2.com/display/IS510/How+To%3A+Login+to+WSO2+Products+via+Identity+Server#HowTo:LogintoWSO2ProductsviaIdentityServer-Authenticatorsconfiguration">Authenticators Configuration</a> .<br />
<br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb8-1" title="1"><span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;AssertionConsumerServiceURL&quot;</span><span class="kw">&gt;</span>https://localhost:9443/acs<span class="kw">&lt;/Parameter&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

![](images/icons/grey_arrow_down.png){.expand-control-image} API
changes: Click here to view the steps..

The following section describes changes made to admin services in IS
5.1.0 which may affect your migration depending on your client's usage
of the admin service.

1.  Removed authorization and changed input parameters of the
    `                                                   changePasswordByUser                                                 `
    operation exposed through the [userAdmin
    service](https://localhost:9443/services/UserAdmin?wsdl).

    **Changes to the changePasswordByUser operation**

    Make the following change to the client side:

    1.  Remove the username and password as authentication headers in
        the request and send the username, old password and new password
        inside the SOAP body instead. A sample of the request is shown
        below.

    ``` xml
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <xsd:changePasswordByUser>
             <!--Optional:-->
             <xsd:userName>admin</xsd:userName>
             <!--Optional:-->
             <xsd:oldPassword>adminpassword</xsd:oldPassword>
             <!--Optional:-->
             <xsd:newPassword>adminnewpassword</xsd:newPassword>
          </xsd:changePasswordByUser>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

    **How it used to be**

    This operation was previously an admin service where the user had to
    be authenticated before running the operation (i.e, only a user with
    login permissions could perform a password change). In that case,
    the user had to use an authentication mechanism (his/her username
    and current password) to execute the operation and the input
    parameters were as follows:

    1.  old password

    2.  new password

    **How it is now**

    Authentication is no longer required for this operation, which means
    all users (including those without login permissions) can perform
    this operation. Therefore, the input parameters are now as follows:

    1.  username (username of the user whose password needs to be
        changed)

    2.  old password

    3.  new password

**Recommended:** See the [WSO2 IS 5.1.0 migration
guide](https://docs.wso2.com/display/IS510/Upgrading+from+the+Previous+Release)
for more information.

Note that the following files located in the
`                    <IS_HOME>/repository/conf/                   `
folder in 5.0.0 have been moved to the
`                    <IS_HOME>/repository/conf/                                         identity/                                       `
folder in 5.1.0 onwards:

-   `                      provisioning-config.xml                     `

-   `                     identity.xml                    `
-   `                     /security/identity-mgt.properties                    `

![](images/icons/grey_arrow_down.png){.expand-control-image} Behavioral
changes: Click here to view

!!! tip
    
    Due to a fix done in this release, the effective default value of the
    system property
    `                        org.apache.xml.security.ignoreLineBreaks                       `
    has been changed from “true” to “false”. Due to this change, you will
    observe line breaks in SAML responses.
    
    However, if the SAML response consuming client applications have used a
    standard library such as OpenSAML and use canonicalization when
    processing the response, this should not cause any problems. Therefore,
    our recommendation is to use a standard library to process SAML
    responses on consuming applications.
    
    If you have any concerns about this behavioral change or if the SAML
    response consuming client applications does not use canonicalization
    when processing the response and the client cannot be updated to do so,
    add the following jvm parameter to the server startup script located in
    the `                        <IS_HOME>/bin/                       `
    folder to revert back to the previous behavior.
    
    ``` java
    -Dorg.apache.xml.security.ignoreLineBreaks=true
```


![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

Configuration File

Changes

  

`                           oidc-scope-config.xml                          `
file stored in the
`                           <PRODUCT_HOME>/repository/conf/identity/                          `
directory.

The following configuration file was added to enable grouping claims
that are bound to a scope value in OpenID Connect (OIDC). When
requesting for an OIDC token, you can specify a scope value that is
bound to a set of claims in the
`                           oidc-scope-config.xml                          `
file. When sending that OIDC token to the userinfo endpoint, only the
claims that are common to both the oidc-scope-config and the service
provider claim configuration, will be returned.

  

identity-mgt.properties file stored in the
`                           <PRODUCT_HOME>/repository/conf/identity/                          `
directory.

The following parameters were added:

``` xml
# Whether to use hash of username when storing codes. 
# Enable this if Registry is used to store the codes and if username may contain non alphanumeric characters.

UserInfoRecovery.UseHashedUserNames=false
UserInfoRecovery.UsernameHashAlg=SHA-1
```

If you have enabled the [using email address as the
username](https://docs.wso2.com/display/IS520/Using+Email+Address+as+the+Username)
option, the confirmation codes are retained after they are used, due to
the special character '@' contained in the email address. To resolve
this, you can set the
`                             UserInfoRecovery.UseHashedUserNames                            `
parameter to true so that the registry resources will be saved by **hash
of username** instead of the email address username which contains the
'@' sign.

  

The following properties were added to support notification sending for
account enabling and disabling:

``` java
Notification.Sending.Enable.Account.Disable=false
Notification.Sending.Enable.Account.Enable=false
```

For more information, see [User Account Locking and Account
Disabling](https://docs.wso2.com/display/IS520/User+Account+Locking+and+Account+Disabling)
.

  

The following property was added to check if the account has been
locked, at the point of authentication.

``` java
Authentication.Policy.Check.Account.Disable=false
```

  

`                           EndpointConfig.properties                          `
file stored in the
`                           <PRODUCT_HOME>/repository/conf/identity/                          `
directory.

The following properties were replaced:

**Old configuration**

``` xml
identity.server.host=localhost
identity.server.port=9443
identity.server.serviceURL=/services/
```

The properties above were replaced with the following:

**New configuration**

``` xml
#identity.server.serviceURL=https://localhost:9443/services/ 
```

  

entitlement.properties file stored in the
`                           <PRODUCT_HOME>/repository/conf/identity/                          `
directory.

When policy sets are used with entitlements, the default policy set
cache size is 100. This may cause frequent cache eviction if there are
more than 100 policies in the set. To avoid this, configure the
following property. It will cause the cache size to increase depending
on the policy set size for better performance.  

``` xml
PDP.References.MaxPolicyEntries=3000
```

  

`                           identity.xml                          ` file
stored in the
`                           <PRODUCT_HOME>/repository/conf/identity/                          `
directory.

Session data persistence is enabled by default from IS 5.2.0 onwards.

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<SessionDataPersist>
    <Enable>true</Enable>
    <Temporary>true</Temporary>
    <PoolSize>0</PoolSize>
    <SessionDataCleanUp>
        <Enable>true</Enable>
        <CleanUpTimeout>20160</CleanUpTimeout>
        <CleanUpPeriod>1140</CleanUpPeriod>
    </SessionDataCleanUp>
    <OperationDataCleanUp>
        <Enable>true</Enable>
        <CleanUpPeriod>720</CleanUpPeriod>
    </OperationDataCleanUp>
</SessionDataPersist>
```

The following properties were removed:

``` java
<!--SessionContextCache>
    <Enable>true</Enable> 
    <Capacity>100000</Capacity> 
</SessionContextCache-->
```

  

The following property was added to the \<SSOService\> and
\<PassiveSTS\> elements:

``` java
<SLOHostNameVerificationEnabled>true</SLOHostNameVerificationEnabled>
```

For more information on configuring hostname verification, see the info
note at the bottom of the [Configuring
WS-Federation](https://docs.wso2.com/display/IS520/Configuring+WS-Federation)
page.

  

Listeners and properties related to analytics in WSO2 Identity Server
were added. For more information, see [Prerequisites to Publish
Statistics](https://docs.wso2.com/display/IS520/Prerequisites+to+Publish+Statistics)
.

**Listeners**

``` java
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="false" />
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="false" />
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.AuthnDataPublisherProxy" orderId="11" enable="true" />
```

**Properties**

``` java
<ISAnalytics>
        <DefaultValues>
            <userName>NOT_AVAILABLE</userName>
            <userStoreDomain>NOT_AVAILABLE</userStoreDomain>
            <rolesCommaSeperated>NOT_AVAILABLE</rolesCommaSeperated>
            <serviceprovider>NOT_AVAILABLE</serviceprovider>
            <identityProvider>NOT_AVAILABLE</identityProvider>
        </DefaultValues>
    </ISAnalytics>
```

  

The security element was updated:

``` java
<!-- Security configurations-->
<Security>
    <!-- The directory under which all other KeyStore files will be stored-->
    <KeyStoresDir>${carbon.home}/conf/keystores</KeyStoresDir>
    <KeyManagerType>SunX509</KeyManagerType> 
    <TrustManagerType>SunX509</TrustManagerType> 
</Security>
```

  

The following elements were added under the \<OAuth\> element:

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<OIDCCheckSessionEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oidc/checksession</OIDCCheckSessionEPUrl>
<OIDCLogoutEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oidc/logout</OIDCLogoutEPUrl>
<OIDCConsentPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/oauth2_consent.do</OIDCConsentPage>
<OIDCLogoutConsentPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/oauth2_logout_consent.do</OIDCLogoutConsentPage>
<OIDCLogoutPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/oauth2_logout.do</OIDCLogoutPage>

<EnableOAuthCache>false</EnableOAuthCache>
```

!!! tip
    
    Caching Recommendation
    
    It is recommended to keep the OAuth2 local cache and the distributed
    cache disabled as it may cause out-of-memory issues.  
    However, if you want to enable the OAuth2 local cache, you have to
    enable the distributed cache as well.  
      
    To enable the OAuth2 local cache and distributed cache, set the
    `                             <EnableOAuthCache>                            `
    property and
    `                             isDistributed                            `
    to true.
    
    ``` java
    <EnableOAuthCache>true</EnableOAuthCache>
    <Cache name="OAuthCache" enable="true" timeout="1" capacity="5000" isDistributed="true"/>
```


  

The following elements were removed from the \<OAuth\>\<OpenIDConnect\>
element:

``` java
<IDTokenSubjectClaim>http://wso2.org/claims/givenname</IDTokenSubjectClaim>
<UserInfoEndpointClaimDialect>http://wso2.org/claims</UserInfoEndpointClaimDialect>
```

  

The following code was updated. To add audiences to the JWT token, use
the code block below. For more information, see [JWT Token
Generation](https://docs.wso2.com/display/IS520/JWT+Token+Generation).

![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
to expand...

``` java
<OpenIDConnect>
    <IDTokenBuilder>org.wso2.carbon.identity.openidconnect.DefaultIDTokenBuilder</IDTokenBuilder>
    <!-- Comment out to add Audience values to the JWT token (id_token)-->
    <!--Audiences>
        <Audience>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/token</Audience>
    </Audiences-->
    <!--Default value for IDTokenIssuerID, is OAuth2TokenEPUrl.If that doesn't satisfy uncomment the following config and explicitly configure the value-->
    <IDTokenIssuerID>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/token</IDTokenIssuerID>

  ...
  
</OpenIDConnect>
```

  

The \<CacheConfig\> was replaced:

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<CacheConfig>
    <CacheManager name="IdentityApplicationManagementCacheManager">
        <Cache name="AppAuthFrameworkSessionContextCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="AuthenticationContextCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="AuthenticationRequestCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="AuthenticationResultCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="AppInfoCache" enable="true" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="AuthorizationGrantCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="OAuthCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="OAuthSessionDataCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="SAMLSSOParticipantCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="SAMLSSOSessionIndexCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="SAMLSSOSessionDataCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="ServiceProviderCache" enable="true" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="ProvisioningConnectorCache" enable="true" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="ProvisioningEntityCache" enable="false" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="ServiceProviderProvisioningConnectorCache" enable="true" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="IdPCacheByAuthProperty" enable="true" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="IdPCacheByHRI" enable="true" timeout="1" capacity="5000" isDistributed="false" />
        <Cache name="IdPCacheByName" enable="true" timeout="1" capacity="5000" isDistributed="false" />
    </CacheManager>
</CacheConfig>
```

  

-   `                             context.xml                            `
    file stored in the
    `                             <PRODUCT_HOME>/repository/conf/tomcat/carbon/META-INF/                            `
    directory.  
-   `                             context.xml                            `
    file stored in the
    `                             <PRODUCT_HOME>/repository/conf/tomcat/                            `
    directory.  
-   `                             web.xml file                            `
    stored in the
    `                             <PRODUCT_HOME>/repository/conf/tomcat/carbon/WEB-INF/                            `
    directory.

The entire file was replaced.

`                           carbon.xml                          ` file
stored in the
`                           <PRODUCT_HOME>/repository/conf/                          `
directory.

The following elements were added under the \<Security\> tag:

``` java
<STSCallBackHandlerName>org.wso2.carbon.identity.provider.AttributeCallbackHandler</STSCallBackHandlerName>

<XSSPreventionConfig>
    <Enabled>true</Enabled>
    <Rule>allow</Rule>
    <Patterns>
        <!--Pattern></Pattern-->
    </Patterns>
</XSSPreventionConfig>
```

The following elements were removed:

``` java
<!--Configurations to avoid Cross Site Request Forgery vulnerabilities-->
<CSRFPreventionConfig>
    <!--CSRFPreventionFilter configurations that adopts Synchronizer Token Pattern-->
    <CSRFPreventionFilter>
    <!-- Set below to true to enable the CSRFPreventionFilter-->
    <Enabled>false</Enabled>
    <!--Url Pattern to skip application of CSRF protection-->
    <SkipUrlPattern > (.*)(/images|/css | /js|/docs)(.*) </SkipUrlPattern> 
    </CSRFPreventionFilter> 
</CSRFPreventionConfig>

<!-- Configuration to enable or disable CR and LF sanitization filter-->
<CRLFPreventionConfig>
    <!--Set below to true to enable the CRLFPreventionFilter-->
    <Enabled>true</Enabled> 
</CRLFPreventionConfig
```

`                           claim-config.xml                          `
file stored in the
`                           <PRODUCT_HOME>/repository/conf/                          `
directory.

The following claims were added. For more information on configuring
these, see [Configuring
Users](https://docs.wso2.com/display/IS520/Configuring+Users#ConfiguringUsers-Customizingauser'sprofile)
or [User Account Locking and Account
Disabling](https://docs.wso2.com/display/IS520/User+Account+Locking+and+Account+Disabling)
depending on the claim you want to configure.

``` java
<Claim>
    <ClaimURI>http://wso2.org/claims/identity/lastLoginTime</ClaimURI>
    <DisplayName>Last Login</DisplayName>
    <!-- Proper attribute Id in your user store must be configured for this -->
    <AttributeID>carLicense</AttributeID>
    <Description>Last Login Time</Description>
</Claim>
<Claim>
    <ClaimURI>http://wso2.org/claims/identity/lastPasswordUpdateTime</ClaimURI>
    <DisplayName>Last Password Update</DisplayName>
    <!-- Proper attribute Id in your user store must be configured for this -->
    <AttributeID>businessCategory</AttributeID>
    <Description>Last Password Update Time</Description>
</Claim>
<Claim>
    <ClaimURI>http://wso2.org/claims/identity/accountDisabled</ClaimURI>
    <DisplayName>Account Disabled</DisplayName>
    <!-- Proper attribute Id in your user store must be configured for this -->
    <AttributeID>ref</AttributeID>
    <Description>Account Disabled</Description>
</Claim>
```

-   `                             data-agent-config.xml                            `
    file stored in the
    `                             <PRODUCT_HOME>/repository/conf/data-bridge/                            `
    directory.
-   `                             event-processor.xml                            `
    file stored in the
    `                             <PRODUCT_HOME>/repository/conf/                            `
    directory.

  

The file was newly added.

`                           metrics-datasources.xml                          `
file stored in the
`                           <PRODUCT_HOME>/repository/conf/datasources/                          `
directory.

Set the
`                             <defaultAutocommit>                            `
property to true.

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
 <datasource>
            <name>WSO2_METRICS_DB</name>
            <description>The default datasource used for WSO2 Carbon Metrics</description>
            <jndiConfig>
                <name>jdbc/WSO2MetricsDB</name>
            </jndiConfig>
            <definition type="RDBMS">
                <configuration>        <url>jdbc:h2:repository/database/WSO2METRICS_DB;DB_CLOSE_ON_EXIT=FALSE;AUTO_SERVER=TRUE</url>
                    <username>wso2carbon</username>
                    <password>wso2carbon</password>
                    <driverClassName>org.h2.Driver</driverClassName>
                    <maxActive>50</maxActive>
                    <maxWait>60000</maxWait>
                    <testOnBorrow>true</testOnBorrow>
                    <validationQuery>SELECT 1</validationQuery>
                    <validationInterval>30000</validationInterval>
                    <defaultAutoCommit>true</defaultAutoCommit>
                </configuration>
            </definition>
        </datasource>
```

`                           application-authentication.xml                          `
file stored in the
`                           <PRODUCT_HOME>/repository/conf/identity/                          `
directory.

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<AuthenticatorConfig name="EmailOTP" enabled="true">
    <Parameter name="GmailClientId">gmailClientIdValue</Parameter>
    <Parameter name="GmailClientSecret">gmailClientSecretValue</Parameter>
    <Parameter name="SendgridAPIKey">sendgridAPIKeyValue</Parameter>
    <Parameter name="GmailRefreshToken">gmailRefreshTokenValue</Parameter>
    <Parameter name="GmailEmailEndpoint">https://www.googleapis.com/gmail/v1/users/[userId]/messages/send</Parameter>
    <Parameter name="SendgridEmailEndpoint">https://api.sendgrid.com/api/mail.send.json</Parameter>
    <Parameter name="accessTokenRequiredAPIs">Gmail</Parameter>
    <Parameter name="apiKeyHeaderRequiredAPIs">Sendgrid</Parameter>
    <Parameter name="SendgridFormData">sendgridFormDataValue</Parameter>
    <Parameter name="SendgridURLParams">sendgridURLParamsValue</Parameter>
    <Parameter name="GmailAuthTokenType">Bearer</Parameter>
    <Parameter name="GmailTokenEndpoint">https://www.googleapis.com/oauth2/v3/token</Parameter>
    <Parameter name="SendgridAuthTokenType">Bearer</Parameter>
</AuthenticatorConfig>

<AuthenticatorConfig name="x509CertificateAuthenticator" enabled="true">
    <Parameter name="AuthenticationEndpoint">https://localhost:8443/x509-certificate-servlet</Parameter>
</AuthenticatorConfig>

<AuthenticatorConfig name="totp" enabled="true">
    <Parameter name="encodingMethod">Base32</Parameter>
    <Parameter name="timeStepSize">30</Parameter>
    <Parameter name="windowSize">3</Parameter>
    <Parameter name="enableTOTP">false</Parameter>
</AuthenticatorConfig>
```

`                           metrics.xml                          ` file
stored in the
`                           <PRODUCT_HOME>/repository/conf/                          `
directory.

The following elements were added:

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<Metrics xmlns="http://wso2.org/projects/carbon/metrics.xml">
    <Reporting>
        <Console>
            <Enabled>false</Enabled>
            <!-- Polling Period in seconds.
                This is the period for polling metrics from the metric registry and
                printing in the console -->
            <PollingPeriod>60</PollingPeriod>
        </Console>

        <DAS>
            <Enabled>false</Enabled>
            <!-- Source of Metrics, which will be used to
                identify each metric sent in the streams -->
            <!-- Commented to use the hostname
                <Source>Carbon</Source>
            -->
            <!-- Polling Period in seconds.
                This is the period for polling metrics from the metric registry and
                sending events via the Data Publisher -->
            <PollingPeriod>60</PollingPeriod>
            <!-- The type used with Data Publisher -->
            <Type>thrift</Type>
            <!-- Data Receiver URL used by the Data Publisher -->
            <ReceiverURL>tcp://localhost:7611</ReceiverURL>
            <!-- Authentication URL for the Data Publisher -->
            <!-- <AuthURL>ssl://localhost:7711</AuthURL> -->
            <Username>admin</Username>
            <Password>admin</Password>
            <!-- Path for Data Agent Configuration -->
            <DataAgentConfigPath>repository/conf/data-bridge/data-agent-config.xml</DataAgentConfigPath>
        </DAS>
```

`                           output-event-adapters.xml                          `
file stored in the
`                           <PRODUCT_HOME>/repository/conf/                          `
directory.

The following adapter configurations were added:

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<adapterConfig type="http">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
    <!-- HTTP Client Pool Related Properties -->
    <property key="defaultMaxConnectionsPerHost">50</property>
    <property key="maxTotalConnections">1000</property>
</adapterConfig>

<adapterConfig type="jms">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
</adapterConfig>

<adapterConfig type="mqtt">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
    <property key="connectionKeepAliveInterval">60</property>
</adapterConfig>

<adapterConfig type="kafka">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
</adapterConfig>

<adapterConfig type="email">
    <!-- Comment mail.smtp.user and mail.smtp.password properties to support connecting SMTP servers which use trust
        based authentication rather username/password authentication -->
    <property key="mail.smtp.from">abcd@gmail.com</property>
    <property key="mail.smtp.user">abcd</property>
    <property key="mail.smtp.password">xxxx</property>
    <property key="mail.smtp.host">smtp.gmail.com</property>
    <property key="mail.smtp.port">587</property>
    <property key="mail.smtp.starttls.enable">true</property>
    <property key="mail.smtp.auth">true</property>
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
</adapterConfig>

<adapterConfig type="ui">
    <property key="eventQueueSize">30</property>
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
</adapterConfig>

<adapterConfig type="websocket-local">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
</adapterConfig>

<adapterConfig type="websocket">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
</adapterConfig>

<adapterConfig type="soap">
    <!-- Thread Pool Related Properties -->
    <property key="minThread">8</property>
    <property key="maxThread">100</property>
    <property key="keepAliveTimeInMillis">20000</property>
    <property key="jobQueueSize">10000</property>
    <!-- Axis2 Client Connection Related Properties -->
    <property key="axis2ClientConnectionTimeout">10000</property>
    <property key="reuseHTTPClient">true</property>
    <property key="autoReleaseConnection">true</property>
    <property key="maxConnectionsPerHost">50</property>
</adapterConfig>
```

`                           registry.xml                          ` file
stored in the
`                           <PRODUCT_HOME>/repository/conf/                          `
directory.

The following elements were added:

![](images/icons/grey_arrow_down.png){.expand-control-image} Click to
see the code block

``` java
<indexingConfiguration>
    <startIndexing>false</startIndexing>
    <startingDelayInSeconds>35</startingDelayInSeconds>
    <indexingFrequencyInSeconds>5</indexingFrequencyInSeconds>
    <!--number of resources submit for given indexing thread -->
    <batchSize>40</batchSize>
    <!--number of worker threads for indexing -->
    <indexerPoolSize>40</indexerPoolSize>
    <!-- location storing the time the indexing took place-->
    <lastAccessTimeLocation>/_system/local/repository/components/org.wso2.carbon.registry/indexing/lastaccesstime</lastAccessTimeLocation>
    <!-- the indexers that implement the indexer interface for a relevant media type/(s) -->
    <indexers>
        <indexer class="org.wso2.carbon.registry.indexing.indexer.MSExcelIndexer" mediaTypeRegEx="application/vnd.ms-excel" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.MSPowerpointIndexer" mediaTypeRegEx="application/vnd.ms-powerpoint" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.MSWordIndexer" mediaTypeRegEx="application/msword" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.PDFIndexer" mediaTypeRegEx="application/pdf" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.XMLIndexer" mediaTypeRegEx="application/xml" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.XMLIndexer" mediaTypeRegEx="application/(.)+\+xml" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.PlainTextIndexer" mediaTypeRegEx="application/swagger\+json" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.PlainTextIndexer" mediaTypeRegEx="application/(.)+\+json" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.PlainTextIndexer" mediaTypeRegEx="text/(.)+" />
        <indexer class="org.wso2.carbon.registry.indexing.indexer.PlainTextIndexer" mediaTypeRegEx="application/x-javascript" />
    </indexers>
    <exclusions>
        <exclusion pathRegEx="/_system/config/repository/dashboards/gadgets/swfobject1-5/.*[.]html" />
        <exclusion pathRegEx="/_system/local/repository/components/org[.]wso2[.]carbon[.]registry/mount/.*" />
    </exclusions>
</indexingConfiguration>
```

user-mgt.xml file stored in the
`                           <PRODUCT_HOME>/repository/conf/                          `
directory.

The following LDAP/AD property was added:

``` java
<Property name="AnonymousBind">false</Property>
```

**Recommended:** See the [WSO2 IS 5.2.0 migration
guide](https://docs.wso2.com/display/IS520/Upgrading+from+the+Previous+Release)
for more information.

Note that the following new configuration files have been added from
5.2.0 onwards.

-   `                     repository/conf/event-processor.xml                    `
-   `                     repository/conf/security/Owasp.CsrfGuard.Carbon.properties                    `
-   `                     repository/conf/tomcat/carbon/WEB-INF/web.xml                    `
-   `                     repository/conf/identity/oidc-scope-config.xml                    `

![](images/icons/grey_arrow_down.png){.expand-control-image} Behavioral
changes: Click here to view

!!! tip
    
    Due to a fix done in this release, the effective default value of the
    system property
    `                       org.apache.xml.security.ignoreLineBreaks                      `
    has been changed from “true” to “false”. Due to this change, you will
    observe line breaks in SAML responses.
    
    However, if the SAML response consuming client applications have used a
    standard library such as OpenSAML and use canonicalization when
    processing the response, this should not cause any problems. Therefore,
    our recommendation is to use a standard library to process SAML
    responses on consuming applications.
    
    If you have any concerns about this behavioral change or if the SAML
    response consuming client applications does not use canonicalization
    when processing the response and the client cannot be updated to do so,
    add the following jvm parameter to the server startup script located in
    the `                       <IS_HOME>/bin/                      ` folder
    to revert back to the previous behavior.
    
    ``` java
    -Dorg.apache.xml.security.ignoreLineBreaks=true
```


![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

<table>
<thead>
<tr class="header">
<th>Configuration File</th>
<th>Required</th>
<th>Changes</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>                           The                                                                                 carbon.xml                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/                          </code> directory.</p></td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Add the following property to the config file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;HideMenuItemIds&gt;</a>
<a class="sourceLine" id="cb1-2" title="2">&lt;HideMenuItemId&gt;claim_mgt_menu&lt;/HideMenuItemId&gt;</a>
<a class="sourceLine" id="cb1-3" title="3">&lt;HideMenuItemId&gt;identity_mgt_emailtemplate_menu&lt;/HideMenuItemId&gt;</a>
<a class="sourceLine" id="cb1-4" title="4">&lt;HideMenuItemId&gt;identity_security_questions_menu&lt;/HideMenuItemId&gt;</a>
<a class="sourceLine" id="cb1-5" title="5">&lt;/HideMenuItemIds&gt;</a></code></pre></div>
</div>
</div>
<p>Update the following property value to 5.3.0.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;Version&gt;<span class="fl">5.3.</span><span class="dv">0</span>&lt;/Version&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><p>The <code>                           entitlement.properties                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/identity/                          </code> directory.</p></td>
<td>Optional</td>
<td><div class="content-wrapper">
<p>If you are using the service provider authorization feature, add the following property to the config file.</p>
!!! note
    <p>If you have any other <code>                            AttributeDesignators                           </code> configured with the number 2, use the smallest unused number instead of 2 when adding the property below.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1">PIP.AttributeDesignators.Designator.2=org.wso2.carbon.identity.application.authz.xacml.pip.AuthenticationContextAttributePIP</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><p>The <code>                           application-authentication.xml                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/identity/                          </code> directory.</p></td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Add the following property under the <code>                            &lt;Extensions&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;AuthorizationHandler&gt;</span>org.wso2.carbon.identity.application.authz.xacml.handler.impl.XACMLBasedAuthorizationHandler<span class="kw">&lt;/AuthorizationHandler&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><p>The <code>                           application-authentication.xml                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/identity/                          </code> directory.</p></td>
<td>Optional</td>
<td><div class="content-wrapper">
<p>If you are using the mobile connect authenticator feature, add the following element under the <code>                            &lt;AuthenticatorConfigs&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb5-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;MobileConnectAuthenticator&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb5-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;MobileConnectKey&quot;</span><span class="kw">&gt;</span>mobileConnectClientId<span class="kw">&lt;/Parameter&gt;</span></a>
<a class="sourceLine" id="cb5-3" title="3">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;MobileConnectSecret&quot;</span><span class="kw">&gt;</span>mobileConnectClientSecret<span class="kw">&lt;/Parameter&gt;</span></a>
<a class="sourceLine" id="cb5-4" title="4"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><p>The <code>                           Owasp.CsrfGuard.Carbon.properties                          </code> stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/security/                          </code> directory.</p></td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<div class="module toggle-wrap">
<div class="mod-content">
<div class="field-ignore-highlight editable-field inactive" title="Click to edit">
<div class="user-content-block">
<p>Find the following line.</p>
</div>
</div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Old configuration</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb6-1" title="1">org.owasp.csrfguard.unprotected.authiwa=%servletContext%/commonauth/iwa/*</a></code></pre></div>
</div>
</div>
<p>Update the line as follows.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>New Configuration</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb7-1" title="1">org.owasp.csrfguard.unprotected.oauthiwa=%servletContext%/commonauth/iwa/*</a></code></pre></div>
</div>
</div>
<p>Add the following property.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb8-1" title="1">org.owasp.csrfguard.unprotected.mex=%servletContext%/mexut/*</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><p>The <code>                           user-mgt.xml                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/                          </code> directory.</p></td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Add the following element under the <code>                            &lt;Realm&gt; &lt;Configuration&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb9" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb9-1" title="1"><span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;initializeNewClaimManager&quot;</span><span class="kw">&gt;</span>true<span class="kw">&lt;/Property&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><p>The <code>                           email-admin-config.xml                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/                          </code> directory.</p></td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>If you have <strong>not</strong> made any custom changes to this file in your previous version of WSO2 IS:</p>
<ul>
<li><ul>
<li>Copy the <code>                               &lt;NEW_IS_HOME&gt;/repository/conf/email/email-admin-config.xml                              </code> file and replace the existing one.</li>
</ul></li>
</ul>
<p>If you <strong>have</strong> made custom changes to this file in your previous version:</p>
<ul>
<li><ol>
<li>Locate the templates you have updated that differ from the default config file. You can use a diff tool to compare your <code>                               &lt;OLD_IS_HOME&gt;/repository/conf/email/email-admin-config.xml                              </code> file with the <a href="https://raw.githubusercontent.com/wso2/carbon-identity-framework/v5.2.2/features/identity-mgt/org.wso2.carbon.identity.mgt.server.feature/resources/email-admin-config.xml">default file</a> to identify the custom changes you have made. Note these changes/updates.</li>
<li>Copy the file from <code>                               &lt;NEW_IS_HOME&gt;/repository/conf/email/email-admin-config.xml                              </code> to <code>                               &lt;OLD_IS_HOME&gt;/repository/conf/email/                              </code> directory and rename it to email-"admin-config-new.xml".</li>
<li><p>For each template you have modified, do the following:</p>
<p>!!! note</p>
    <p><strong>Note:</strong> If you opt to migrate to the new identity management implementation, follow all the steps below. If you wish to continue with the old identity management implementation, skip steps iii and iv.</p>
</ol></li>
</ul>
<ul>
<li><ol>
<li><ol>
<li><p>Locate the relevant template configuration in the old <code>                                  email-admin-config-new.xml                                 </code> file by searching for ‘&lt;configuration type="xxxxx" where “xxxxx” is the type at <code>                                  email-admin-config.xml                                 </code> .</p></li>
<li><p>Update the subject, body, and footer in the new config file with the values from the existing configuration.</p></li>
<li><p><code>                                                                     [OPTIONAL]                                                                   </code> Update the placeholders so that they are enclosed with double braces (E.g., <code>                                  {user-name} -&gt; {{user-name}} )                                 </code></p></li>
<li><strong><code>                                  [OPTIONAL]                                 </code></strong> Update the user’s attribute related placeholders to follow the <code>                                 {{user.claim.yyyy}}                                </code> format where <code>                                 yyyy                                </code> is the attribute name (E.g., <code>                                 {first-name} -&gt; {{user.claim.givenname}}                                </code> )</li>
</ol></li>
<li><p>Delete the <code>                                &lt;OLD_IS_HOME&gt;/repository/conf/email/email-admin-config.xml                               </code> file and rename the <code>                                email-admin-config-new.xml                               </code> file to "email-admin-config.xml” to finish the update.</p></li>
</ol></li>
</ul>
<div>
<p>For more information about this feature, see <a href="https://docs.wso2.com/display/IS530/Email+Templates">Email Templates</a> .</p>
</div>
</div></td>
</tr>
<tr class="even">
<td><p>The <code>                           output-event-adapters.xml                          </code> file stored in the <code>                           &lt;PRODUCT_HOME&gt;/repository/conf/                          </code> directory.</p></td>
<td>Optional</td>
<td><div class="content-wrapper">
<p>Add the following properties under the <code>                            &lt;outputEventAdaptersConfig&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb10-1" title="1"><span class="kw">&lt;adapterConfig</span><span class="ot"> type=</span><span class="st">&quot;wso2event&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb10-2" title="2">    <span class="kw">&lt;property</span><span class="ot"> key=</span><span class="st">&quot;default.thrift.tcp.url&quot;</span><span class="kw">&gt;</span>tcp://localhost:7612<span class="kw">&lt;/property</span>  </a>
<a class="sourceLine" id="cb10-3" title="3">    <span class="er">&lt;property</span> <span class="er">key=&quot;default.thrift.ssl.url&quot;</span><span class="kw">&gt;</span>ssl://localhost:7712<span class="kw">&lt;/property&gt;</span></a>
<a class="sourceLine" id="cb10-4" title="4">    <span class="kw">&lt;property</span><span class="ot"> key=</span><span class="st">&quot;default.binary.tcp.url&quot;</span><span class="kw">&gt;</span>tcp://localhost:9612<span class="kw">&lt;/property&gt;</span></a>
<a class="sourceLine" id="cb10-5" title="5">    <span class="kw">&lt;property</span><span class="ot"> key=</span><span class="st">&quot;default.binary.ssl.url&quot;</span><span class="kw">&gt;</span>ssl://localhost:9712<span class="kw">&lt;/property&gt;</span></a>
<a class="sourceLine" id="cb10-6" title="6"><span class="er">&lt;</span>/adapterConfig&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>The <code>                          identity.xml                         </code> file stored in the <code>                          &lt;PRODUCT_HOME&gt;/repository/conf/identity                         </code> directory.</td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Add the following event listeners as child elements under the &lt;EventListeners&gt; tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1">&lt;EventListeners&gt;</a>
<a class="sourceLine" id="cb11-2" title="2">    ....</a>
<a class="sourceLine" id="cb11-3" title="3">    ....</a>
<a class="sourceLine" id="cb11-4" title="4">    &lt;<span class="bu">EventListener</span> </a>
<a class="sourceLine" id="cb11-5" title="5">    type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span> </a>
<a class="sourceLine" id="cb11-6" title="6">    name=<span class="st">&quot;org.wso2.carbon.identity.governance.listener.IdentityStoreEventListener&quot;</span></a>
<a class="sourceLine" id="cb11-7" title="7">    orderId=<span class="st">&quot;97&quot;</span> enable=<span class="st">&quot;true&quot;</span>&gt;</a>
<a class="sourceLine" id="cb11-8" title="8">    &lt;Property name=<span class="st">&quot;Data.Store&quot;</span>&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">governance</span>.<span class="fu">store</span>.<span class="fu">JDBCIdentityDataStore</span>&lt;/Property&gt;</a>
<a class="sourceLine" id="cb11-9" title="9">    &lt;/<span class="bu">EventListener</span>&gt;</a>
<a class="sourceLine" id="cb11-10" title="10">            </a>
<a class="sourceLine" id="cb11-11" title="11">    &lt;<span class="bu">EventListener</span> </a>
<a class="sourceLine" id="cb11-12" title="12">    type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span> </a>
<a class="sourceLine" id="cb11-13" title="13">    name=<span class="st">&quot;org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener&quot;</span> </a>
<a class="sourceLine" id="cb11-14" title="14">    orderId=<span class="st">&quot;95&quot;</span> </a>
<a class="sourceLine" id="cb11-15" title="15">    enable=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-16" title="16">    ....</a>
<a class="sourceLine" id="cb11-17" title="17">&lt;/EventListeners&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties under the <code>                            &lt;OAuth&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1">&lt;OIDCWebFingerEPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/.well-known/webfinger&lt;/OIDCWebFingerEPUrl&gt;</span></a>
<a class="sourceLine" id="cb12-2" title="2"></a>
<a class="sourceLine" id="cb12-3" title="3">&lt;!-- For tenants below urls will be modified as https:<span class="co">//&lt;hostname&gt;:&lt;port&gt;/t/&lt;tenant domain&gt;/&lt;path&gt;--&gt;</span></a>
<a class="sourceLine" id="cb12-4" title="4">&lt;OAuth2DCREPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/identity/connect/register&lt;/OAuth2DCREPUrl&gt;</span></a>
<a class="sourceLine" id="cb12-5" title="5">&lt;OAuth2JWKSPage&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/oauth2/jwks&lt;/OAuth2JWKSPage&gt;</span></a>
<a class="sourceLine" id="cb12-6" title="6">&lt;OIDCDiscoveryEPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/oauth2/oidcdiscovery&lt;/OIDCDiscoveryEPUrl&gt;</span></a></code></pre></div>
</div>
</div>
<p>Add the following property under the <code>                            &lt;SSOService&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1">&lt;!--&lt;SAMLSSOAssertionBuilder&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">sso</span>.<span class="fu">saml</span>.<span class="fu">builders</span>.<span class="fu">assertion</span>.<span class="fu">ExtendedDefaultAssertionBuilder</span>&lt;/SAMLSSOAssertionBuilder&gt;--&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties at the top level.</p>
<div id="expander-1153568665" class="expand-container">
<div id="expander-control-1153568665" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to view the properties...
</div>
<div id="expander-content-1153568665" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1">&lt;!--Recovery&gt;</a>
<a class="sourceLine" id="cb14-2" title="2">        &lt;<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb14-3" title="3">            &lt;Password&gt;</a>
<a class="sourceLine" id="cb14-4" title="4">                &lt;Enable&gt;<span class="kw">false</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-5" title="5">            &lt;/Password&gt;</a>
<a class="sourceLine" id="cb14-6" title="6">            &lt;Username&gt;</a>
<a class="sourceLine" id="cb14-7" title="7">                &lt;Enable&gt;<span class="kw">false</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-8" title="8">            &lt;/Username&gt;</a>
<a class="sourceLine" id="cb14-9" title="9">            &lt;InternallyManage&gt;<span class="kw">true</span>&lt;/InternallyManage&gt;</a>
<a class="sourceLine" id="cb14-10" title="10">        &lt;/<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb14-11" title="11">        &lt;Question&gt;</a>
<a class="sourceLine" id="cb14-12" title="12">            &lt;Password&gt;</a>
<a class="sourceLine" id="cb14-13" title="13">                &lt;Enable&gt;<span class="kw">false</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-14" title="14">                &lt;NotifyStart&gt;<span class="kw">true</span>&lt;/NotifyStart&gt;</a>
<a class="sourceLine" id="cb14-15" title="15">                &lt;Separator&gt;!&lt;/Separator&gt;</a>
<a class="sourceLine" id="cb14-16" title="16">                &lt;MinAnswers&gt;<span class="dv">2</span>&lt;/MinAnswers&gt;</a>
<a class="sourceLine" id="cb14-17" title="17">                &lt;ReCaptcha&gt;</a>
<a class="sourceLine" id="cb14-18" title="18">                    &lt;Enable&gt;<span class="kw">true</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-19" title="19">                    &lt;MaxFailedAttempts&gt;<span class="dv">3</span>&lt;/MaxFailedAttempts&gt;</a>
<a class="sourceLine" id="cb14-20" title="20">                &lt;/ReCaptcha&gt;</a>
<a class="sourceLine" id="cb14-21" title="21">            &lt;/Password&gt;</a>
<a class="sourceLine" id="cb14-22" title="22">        &lt;/Question&gt;</a>
<a class="sourceLine" id="cb14-23" title="23">        &lt;ExpiryTime&gt;<span class="dv">3</span>&lt;/ExpiryTime&gt;</a>
<a class="sourceLine" id="cb14-24" title="24">        &lt;NotifySuccess&gt;<span class="kw">true</span>&lt;/NotifySuccess&gt;</a>
<a class="sourceLine" id="cb14-25" title="25">        &lt;AdminPasswordReset&gt;</a>
<a class="sourceLine" id="cb14-26" title="26">            &lt;Offline&gt;<span class="kw">false</span>&lt;/Offline&gt;</a>
<a class="sourceLine" id="cb14-27" title="27">            &lt;OTP&gt;<span class="kw">false</span>&lt;/OTP&gt;</a>
<a class="sourceLine" id="cb14-28" title="28">            &lt;RecoveryLink&gt;<span class="kw">false</span>&lt;/RecoveryLink&gt;</a>
<a class="sourceLine" id="cb14-29" title="29">        &lt;/AdminPasswordReset&gt;</a>
<a class="sourceLine" id="cb14-30" title="30">    &lt;/Recovery&gt;</a>
<a class="sourceLine" id="cb14-31" title="31"></a>
<a class="sourceLine" id="cb14-32" title="32">    &lt;EmailVerification&gt;</a>
<a class="sourceLine" id="cb14-33" title="33">        &lt;Enable&gt;<span class="kw">false</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-34" title="34">        &lt;LockOnCreation&gt;<span class="kw">false</span>&lt;/LockOnCreation&gt;</a>
<a class="sourceLine" id="cb14-35" title="35">        &lt;<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb14-36" title="36">            &lt;InternallyManage&gt;<span class="kw">true</span>&lt;/InternallyManage&gt;</a>
<a class="sourceLine" id="cb14-37" title="37">        &lt;/<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb14-38" title="38">    &lt;/EmailVerification&gt;</a>
<a class="sourceLine" id="cb14-39" title="39"></a>
<a class="sourceLine" id="cb14-40" title="40">    &lt;SelfRegistration&gt;</a>
<a class="sourceLine" id="cb14-41" title="41">    &lt;Enable&gt;<span class="kw">false</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-42" title="42">    &lt;LockOnCreation&gt;<span class="kw">false</span>&lt;/LockOnCreation&gt;</a>
<a class="sourceLine" id="cb14-43" title="43">    &lt;<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb14-44" title="44">        &lt;InternallyManage&gt;<span class="kw">true</span>&lt;/InternallyManage&gt;</a>
<a class="sourceLine" id="cb14-45" title="45">    &lt;/<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb14-46" title="46">    &lt;ReCaptcha&gt;<span class="kw">false</span>&lt;/ReCaptcha&gt;</a>
<a class="sourceLine" id="cb14-47" title="47">    &lt;/SelfRegistration--&gt;</a></code></pre></div>
</div>
</div>
</div>
</div>
<p>Remove the following section:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1">&lt;ISAnalytics&gt;</a>
<a class="sourceLine" id="cb15-2" title="2">        &lt;DefaultValues&gt;</a>
<a class="sourceLine" id="cb15-3" title="3">            &lt;userName&gt;NOT_AVAILABLE&lt;/userName&gt;</a>
<a class="sourceLine" id="cb15-4" title="4">            &lt;userStoreDomain&gt;NOT_AVAILABLE&lt;/userStoreDomain&gt;</a>
<a class="sourceLine" id="cb15-5" title="5">            &lt;rolesCommaSeperated&gt;NOT_AVAILABLE&lt;/rolesCommaSeperated&gt;</a>
<a class="sourceLine" id="cb15-6" title="6">            &lt;serviceprovider&gt;NOT_AVAILABLE&lt;/serviceprovider&gt;</a>
<a class="sourceLine" id="cb15-7" title="7">            &lt;identityProvider&gt;NOT_AVAILABLE&lt;/identityProvider&gt;</a>
<a class="sourceLine" id="cb15-8" title="8">        &lt;/DefaultValues&gt;</a>
<a class="sourceLine" id="cb15-9" title="9">    &lt;/ISAnalytics&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties to the top level.</p>
<div id="expander-1521548081" class="expand-container">
<div id="expander-control-1521548081" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to view the properties...
</div>
<div id="expander-content-1521548081" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1">&lt;ResourceAccessControl&gt;</a>
<a class="sourceLine" id="cb16-2" title="2">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb16-3" title="3">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/recovery/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb16-4" title="4">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/.well-known(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb16-5" title="5">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/identity/register(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb16-6" title="6">            &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb16-7" title="7">        &lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb16-8" title="8">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/identity/connect/register(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb16-9" title="9">            &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/create&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb16-10" title="10">        &lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb16-11" title="11">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/oauth2/introspect(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb16-12" title="12">            &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb16-13" title="13">        &lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb16-14" title="14">        &lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/entitlement/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb16-15" title="15">            &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/pep&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb16-16" title="16">        &lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb16-17" title="17">    &lt;/ResourceAccessControl&gt;</a>
<a class="sourceLine" id="cb16-18" title="18"></a>
<a class="sourceLine" id="cb16-19" title="19">    &lt;ClientAppAuthentication&gt;</a>
<a class="sourceLine" id="cb16-20" title="20">        &lt;Application name=<span class="st">&quot;dashboard&quot;</span> hash=<span class="st">&quot;66cd9688a2ae068244ea01e70f0e230f5623b7fa4cdecb65070a09ec06452262&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb16-21" title="21">    &lt;/ClientAppAuthentication&gt;</a>
<a class="sourceLine" id="cb16-22" title="22"></a>
<a class="sourceLine" id="cb16-23" title="23">    &lt;TenantContextsToRewrite&gt;</a>
<a class="sourceLine" id="cb16-24" title="24">        &lt;WebApp&gt;</a>
<a class="sourceLine" id="cb16-25" title="25">            &lt;<span class="bu">Context</span>&gt;/api/identity/user/v0<span class="fl">.9</span>&lt;/<span class="bu">Context</span>&gt;</a>
<a class="sourceLine" id="cb16-26" title="26">            &lt;<span class="bu">Context</span>&gt;/api/identity/recovery/v0<span class="fl">.9</span>&lt;/<span class="bu">Context</span>&gt;</a>
<a class="sourceLine" id="cb16-27" title="27">            &lt;<span class="bu">Context</span>&gt;/oauth2&lt;/<span class="bu">Context</span>&gt;</a>
<a class="sourceLine" id="cb16-28" title="28">            &lt;<span class="bu">Context</span>&gt;/api/identity/entitlement&lt;/<span class="bu">Context</span>&gt;</a>
<a class="sourceLine" id="cb16-29" title="29">        &lt;/WebApp&gt;</a>
<a class="sourceLine" id="cb16-30" title="30">        &lt;Servlet&gt;</a>
<a class="sourceLine" id="cb16-31" title="31">            &lt;<span class="bu">Context</span>&gt;/identity/(.*)&lt;/<span class="bu">Context</span>&gt;</a>
<a class="sourceLine" id="cb16-32" title="32">        &lt;/Servlet&gt;</a>
<a class="sourceLine" id="cb16-33" title="33">    &lt;/TenantContextsToRewrite&gt;</a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>The <code>                          web.xml                         </code> file stored in the <code>                          &lt;PRODUCT_HOME&gt;/repository/conf                         </code> <code>                          /tomcat/carbon/WEB_INF                         </code> directory.</td>
<td>Optional</td>
<td><div class="content-wrapper">
<p>Add the following properties after the <code>                            CsrfGuardHttpSessionListener.                           </code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1">&lt;filter&gt;</a>
<a class="sourceLine" id="cb17-2" title="2">      &lt;filter-name&gt;CaptchaFilter&lt;/filter-name&gt;</a>
<a class="sourceLine" id="cb17-3" title="3">      &lt;filter-<span class="kw">class</span>&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">captcha</span>.<span class="fu">filter</span>.<span class="fu">CaptchaFilter</span>&lt;/filter-<span class="kw">class</span>&gt;</a>
<a class="sourceLine" id="cb17-4" title="4">    &lt;/filter&gt;</a>
<a class="sourceLine" id="cb17-5" title="5"></a>
<a class="sourceLine" id="cb17-6" title="6">    &lt;filter-mapping&gt;</a>
<a class="sourceLine" id="cb17-7" title="7">      &lt;filter-name&gt;CaptchaFilter&lt;/filter-name&gt;</a>
<a class="sourceLine" id="cb17-8" title="8">      &lt;url-pattern&gt;/samlsso&lt;/url-pattern&gt;</a>
<a class="sourceLine" id="cb17-9" title="9">      &lt;url-pattern&gt;/oauth2&lt;/url-pattern&gt;</a>
<a class="sourceLine" id="cb17-10" title="10">      &lt;url-pattern&gt;/commonauth&lt;/url-pattern&gt;</a>
<a class="sourceLine" id="cb17-11" title="11">      &lt;dispatcher&gt;FORWARD&lt;/dispatcher&gt;</a>
<a class="sourceLine" id="cb17-12" title="12">      &lt;dispatcher&gt;REQUEST&lt;/dispatcher&gt;</a>
<a class="sourceLine" id="cb17-13" title="13">    &lt;/filter-mapping&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>The <code>                          catalina-server                         </code> <code>                          .xml                         </code> file stored in the <code>                          &lt;PRODUCT_HOME&gt;/repository/conf                         </code> <code>                          /tomcat/                         </code> directory.</td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Add the following valves under the <code>                            &lt;Host&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1">&lt;!-- Authentication and Authorization valve <span class="kw">for</span> the rest apis and we can configure context <span class="kw">for</span> <span class="kw">this</span> in identity.<span class="fu">xml</span>  --&gt;</a>
<a class="sourceLine" id="cb18-2" title="2">                &lt;Valve className=<span class="st">&quot;org.wso2.carbon.identity.auth.valve.AuthenticationValve&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb18-3" title="3">                &lt;Valve className=<span class="st">&quot;org.wso2.carbon.identity.authz.valve.AuthorizationValve&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb18-4" title="4">                &lt;Valve className=<span class="st">&quot;org.wso2.carbon.identity.context.rewrite.valve.TenantContextRewriteValve&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>The <code>                          carbon                         </code> . <code>                          xml                         </code> file stored in the <code>                          &lt;PRODUCT_HOME&gt;/repository/conf/                         </code> directory.</td>
<td>Optional</td>
<td><div class="content-wrapper">
<p>Add the following properties after the <code>                            &lt;/Security&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1">&lt;HideMenuItemIds&gt;</a>
<a class="sourceLine" id="cb19-2" title="2">&lt;HideMenuItemId&gt;identity_mgt_emailtemplate_menu&lt;/HideMenuItemId&gt;</a>
<a class="sourceLine" id="cb19-3" title="3">&lt;HideMenuItemId&gt;identity_security_questions_menu&lt;/HideMenuItemId&gt;</a>
<a class="sourceLine" id="cb19-4" title="4">&lt;/HideMenuItemIds&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>The <code>                          log4j.properties                         </code> file stored in the <code>                          &lt;PRODUCT_HOME&gt;/repository/conf/                         </code> directory.</td>
<td>Optional</td>
<td><div class="content-wrapper">
<p>Add the following property.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1">log4j.<span class="fu">logger</span>.<span class="fu">org</span>.<span class="fu">springframework</span>=WARN</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>The <code>                          data-agent-config.xml                         </code> filestored in the <code>                          &lt;NEW_IS_HOME&gt;/repository/conf/data-bridge                         </code> directory.</td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Add the following properties under the <code>                            &lt;Agent&gt; ThriftDataEndpoint                           </code> and under the <code>                            &lt;Agent&gt;                           </code> <code>                            BinaryDataEndpoint                           </code> tags.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1">&lt;!--&lt;sslEnabledProtocols&gt;TLSv1,TLSv1<span class="fl">.1</span>,TLSv1<span class="fl">.2</span>&lt;/sslEnabledProtocols&gt;--&gt;</a>
<a class="sourceLine" id="cb21-2" title="2">&lt;!--&lt;ciphers&gt;SSL_RSA_WITH_RC4_128_MD5,SSL_RSA_WITH_RC4_128_SHA,TLS_RSA_WITH_AES</a>
<a class="sourceLine" id="cb21-3" title="3">_128_CBC_SHA,TLS_DHE_RSA_WITH_AES_128_CBC_SHA,TLS_DHE_DSS_WITH_AES_128_CBC_SHA,SSL</a>
<a class="sourceLine" id="cb21-4" title="4">_RSA_WITH_3DES_EDE_CBC_SHA,SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA,SSL_DHE_DSS_WITH_</a>
<a class="sourceLine" id="cb21-5" title="5">3DES_EDE_CBC_SHA&lt;/ciphers&gt;--&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>The <code>                          claim-config.xml                         </code> file stored in the <code>                          &lt;NEW_IS_HOME&gt;/repository/conf/                         </code> directory</td>
<td>Mandatory</td>
<td><div class="content-wrapper">
<p>Replace the following attribute found under the <code>                            &lt;Claim&gt;                           </code> <code>                            &lt;ClaimURI&gt;                                                                                       http://wso2.org/claims/locality                                                                                     &gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1">Replace <span class="kw">this</span> attribute:</a>
<a class="sourceLine" id="cb22-2" title="2">&lt;AttributeID&gt;localityName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb22-3" title="3"> </a>
<a class="sourceLine" id="cb22-4" title="4">with <span class="kw">this</span>:</a>
<a class="sourceLine" id="cb22-5" title="5">&lt;AttributeID&gt;local&lt;/AttributeID&gt;</a></code></pre></div>
</div>
</div>
<p>Modify the following claims as follows.</p>
<div id="expander-1799664892" class="expand-container">
<div id="expander-control-1799664892" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the modified claims...
</div>
<div id="expander-content-1799664892" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb23" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb23-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-2" title="2">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/userid&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-3" title="3">  &lt;DisplayName&gt;User ID&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-4" title="4">  &lt;AttributeID&gt;scimId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-5" title="5">  &lt;Description&gt;Unique ID of the user&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-6" title="6">  &lt;ReadOnly/&gt;</a>
<a class="sourceLine" id="cb23-7" title="7">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-8" title="8">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-9" title="9">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/externalid&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-10" title="10">  &lt;DisplayName&gt;External User ID&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-11" title="11">  &lt;AttributeID&gt;externalId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-12" title="12">  &lt;Description&gt;Unique ID of the user used in external systems&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-13" title="13">  &lt;ReadOnly/&gt;</a>
<a class="sourceLine" id="cb23-14" title="14">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-15" title="15">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-16" title="16">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/created&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-17" title="17">  &lt;DisplayName&gt;Created <span class="bu">Time</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-18" title="18">  &lt;AttributeID&gt;createdDate&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-19" title="19">  &lt;Description&gt;Created timestamp of the user&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-20" title="20">  &lt;ReadOnly/&gt;</a>
<a class="sourceLine" id="cb23-21" title="21">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-22" title="22">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-23" title="23">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/modified&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-24" title="24">  &lt;DisplayName&gt;Last Modified <span class="bu">Time</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-25" title="25">  &lt;AttributeID&gt;lastModifiedDate&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-26" title="26">  &lt;Description&gt;Last Modified timestamp of the user&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-27" title="27">  &lt;ReadOnly/&gt;</a>
<a class="sourceLine" id="cb23-28" title="28">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-29" title="29">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-30" title="30">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/location&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-31" title="31">  &lt;DisplayName&gt;<span class="bu">Location</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-32" title="32">  &lt;AttributeID&gt;location&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-33" title="33">  &lt;Description&gt;<span class="bu">Location</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-34" title="34">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-35" title="35">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-36" title="36">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/formattedName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-37" title="37">  &lt;DisplayName&gt;<span class="bu">Name</span> - Formatted <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-38" title="38">  &lt;AttributeID&gt;formattedName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-39" title="39">  &lt;Description&gt;Formatted <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-40" title="40">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-41" title="41">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-42" title="42">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/middleName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-43" title="43">  &lt;DisplayName&gt;Middle <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-44" title="44">  &lt;AttributeID&gt;middleName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-45" title="45">  &lt;Description&gt;Middle <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-46" title="46">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-47" title="47">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-48" title="48">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/honorificPrefix&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-49" title="49">  &lt;DisplayName&gt;<span class="bu">Name</span> - Honoric Prefix&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-50" title="50">  &lt;AttributeID&gt;honoricPrefix&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-51" title="51">  &lt;Description&gt;Honoric Prefix&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-52" title="52">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-53" title="53">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-54" title="54">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/honorificSuffix&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-55" title="55">  &lt;DisplayName&gt;<span class="bu">Name</span> - Honoric Suffix&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-56" title="56">  &lt;AttributeID&gt;honoricSuffix&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-57" title="57">  &lt;Description&gt;Honoric Suffix&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-58" title="58">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-59" title="59">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-60" title="60">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/userType&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-61" title="61">  &lt;DisplayName&gt;User <span class="bu">Type</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-62" title="62">  &lt;AttributeID&gt;userType&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-63" title="63">  &lt;Description&gt;User <span class="bu">Type</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-64" title="64">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-65" title="65">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-66" title="66">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/preferredLanguage&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-67" title="67">  &lt;DisplayName&gt;Preferred Language&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-68" title="68">  &lt;AttributeID&gt;preferredLanguage&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-69" title="69">  &lt;Description&gt;Preferred Language&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-70" title="70">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-71" title="71">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-72" title="72">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/local&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-73" title="73">  &lt;DisplayName&gt;Local&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-74" title="74">  &lt;AttributeID&gt;local&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-75" title="75">  &lt;Description&gt;Local&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-76" title="76">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-77" title="77">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-78" title="78">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/timeZone&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-79" title="79">  &lt;DisplayName&gt;<span class="bu">Time</span> Zone&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-80" title="80">  &lt;AttributeID&gt;timeZone&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-81" title="81">  &lt;Description&gt;<span class="bu">Time</span> Zone&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-82" title="82">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-83" title="83">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-84" title="84">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/emails.work&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-85" title="85">  &lt;DisplayName&gt;Emails - Work Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-86" title="86">  &lt;AttributeID&gt;workEmail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-87" title="87">  &lt;Description&gt;Work Email&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-88" title="88">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-89" title="89">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-90" title="90">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/emails.home&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-91" title="91">  &lt;DisplayName&gt;Emails - Home Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-92" title="92">  &lt;AttributeID&gt;homeEmail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-93" title="93">  &lt;Description&gt;Home Email&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-94" title="94">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-95" title="95">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-96" title="96">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/emails.other&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-97" title="97">  &lt;DisplayName&gt;Emails - Other Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-98" title="98">  &lt;AttributeID&gt;otherEmail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-99" title="99">  &lt;Description&gt;Other Email&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-100" title="100">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-101" title="101">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-102" title="102">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/phoneNumbers&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-103" title="103">  &lt;DisplayName&gt;Phone Numbers&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-104" title="104">  &lt;AttributeID&gt;phoneNumbers&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-105" title="105">  &lt;Description&gt;Phone Numbers&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-106" title="106">  &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb23-107" title="107">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-108" title="108">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-109" title="109">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.home&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-110" title="110">  &lt;DisplayName&gt;Phone Numbers - Home Phone <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-111" title="111">  &lt;AttributeID&gt;homePhone&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-112" title="112">  &lt;Description&gt;Home Phone&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-113" title="113">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-114" title="114">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-115" title="115">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.work&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-116" title="116">  &lt;DisplayName&gt;Phone Numbers - Work Phone <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-117" title="117">  &lt;AttributeID&gt;workPhone&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-118" title="118">  &lt;Description&gt;Work Phone&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-119" title="119">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-120" title="120">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-121" title="121">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.fax&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-122" title="122">  &lt;DisplayName&gt;Phone Numbers - Fax <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-123" title="123">  &lt;AttributeID&gt;fax&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-124" title="124">  &lt;Description&gt;Fax <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-125" title="125">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-126" title="126">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-127" title="127">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.pager&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-128" title="128">  &lt;DisplayName&gt;Phone Numbers - Pager <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-129" title="129">  &lt;AttributeID&gt;pager&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-130" title="130">  &lt;Description&gt;Pager <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-131" title="131">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-132" title="132">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-133" title="133">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.other&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-134" title="134">  &lt;DisplayName&gt;Phone Numbers - Other&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-135" title="135">  &lt;AttributeID&gt;otherPhoneNumber&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-136" title="136">  &lt;Description&gt;Other Phone <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-137" title="137">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-138" title="138">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-139" title="139">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/gtalk&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-140" title="140">  &lt;DisplayName&gt;IM - Gtalk&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-141" title="141">  &lt;AttributeID&gt;imGtalk&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-142" title="142">  &lt;Description&gt;IM - Gtalk&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-143" title="143">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-144" title="144">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-145" title="145">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/skype&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-146" title="146">  &lt;DisplayName&gt;IM - Skype&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-147" title="147">  &lt;AttributeID&gt;imSkype&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-148" title="148">  &lt;Description&gt;IM - Skype&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-149" title="149">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-150" title="150">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-151" title="151">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/photos&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-152" title="152">  &lt;DisplayName&gt;Photo&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-153" title="153">  &lt;AttributeID&gt;photos&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-154" title="154">  &lt;Description&gt;Photo&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-155" title="155">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-156" title="156">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-157" title="157">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/photourl&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-158" title="158">  &lt;DisplayName&gt;Photo URIL&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-159" title="159">  &lt;AttributeID&gt;photoUrl&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-160" title="160">  &lt;Description&gt;Photo <span class="bu">URL</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-161" title="161">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-162" title="162">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-163" title="163">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/thumbnail&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-164" title="164">  &lt;DisplayName&gt;Photo - Thumbnail&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-165" title="165">  &lt;AttributeID&gt;thumbnail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-166" title="166">  &lt;Description&gt;Photo - Thumbnail&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-167" title="167">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-168" title="168">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-169" title="169">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/addresses&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-170" title="170">  &lt;DisplayName&gt;Address&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-171" title="171">  &lt;AttributeID&gt;addresses&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-172" title="172">  &lt;Description&gt;Address&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-173" title="173">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-174" title="174">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-175" title="175">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/addresses.formatted&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-176" title="176">  &lt;DisplayName&gt;Address - Formatted&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-177" title="177">  &lt;AttributeID&gt;formattedAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-178" title="178">  &lt;Description&gt;Address - Formatted&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-179" title="179">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-180" title="180">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-181" title="181">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/streetaddress&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-182" title="182">  &lt;DisplayName&gt;Address - Street&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-183" title="183">  &lt;AttributeID&gt;streetAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-184" title="184">  &lt;Description&gt;Address - Street&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-185" title="185">  &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb23-186" title="186">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-187" title="187">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-188" title="188">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/addresses.locality&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-189" title="189">  &lt;DisplayName&gt;Address - Locality&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-190" title="190">  &lt;AttributeID&gt;localityAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-191" title="191">  &lt;Description&gt;Address - Locality&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-192" title="192">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-193" title="193">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-194" title="194">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/groups&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-195" title="195">  &lt;DisplayName&gt;Groups&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-196" title="196">  &lt;AttributeID&gt;groups&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-197" title="197">  &lt;Description&gt;Groups&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-198" title="198">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-199" title="199">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-200" title="200">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/verifyEmail&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-201" title="201">  &lt;DisplayName&gt;Verify Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-202" title="202">  &lt;AttributeID&gt;manager&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-203" title="203">  &lt;Description&gt;Temporary claim to invoke email verified feature&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-204" title="204">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-205" title="205">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-206" title="206">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/askPassword&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-207" title="207">  &lt;DisplayName&gt;Ask Password&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-208" title="208">  &lt;AttributeID&gt;postOfficeBox&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-209" title="209">  &lt;Description&gt;Temporary claim to invoke email ask Password feature&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-210" title="210">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-211" title="211">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-212" title="212">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/adminForcedPasswordReset&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-213" title="213">  &lt;DisplayName&gt;Force Password Reset&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-214" title="214">  &lt;AttributeID&gt;departmentNumber&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-215" title="215">  &lt;Description&gt;Temporary claim to invoke email force password feature&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-216" title="216">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-217" title="217">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-218" title="218">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/entitlements&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-219" title="219">  &lt;DisplayName&gt;Entitlements&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-220" title="220">  &lt;AttributeID&gt;entitlements&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-221" title="221">  &lt;Description&gt;Entitlements&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-222" title="222">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-223" title="223">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-224" title="224">  &lt;ClaimURI&gt;urn:scim:schemas:core:<span class="fl">1.</span><span class="dv">0</span>:roles&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb23-225" title="225">  &lt;DisplayName&gt;Roles&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-226" title="226">  &lt;AttributeID&gt;roles&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-227" title="227">  &lt;Description&gt;Roles&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-228" title="228">  &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb23-229" title="229">  &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb23-230" title="230">  &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/role&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb23-231" title="231">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-232" title="232">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-233" title="233">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/x509Certificates&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-234" title="234">  &lt;DisplayName&gt;X509Certificates&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-235" title="235">  &lt;AttributeID&gt;x509Certificates&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-236" title="236">  &lt;Description&gt;X509Certificates&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-237" title="237">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-238" title="238">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-239" title="239">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/failedPasswordRecoveryAttempts&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-240" title="240">  &lt;DisplayName&gt;Failed Password Recovery Attempts&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-241" title="241">  &lt;AttributeID&gt;postalCode&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-242" title="242">  &lt;Description&gt;<span class="bu">Number</span> of consecutive failed attempts done <span class="kw">for</span> password recovery&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-243" title="243">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-244" title="244">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-245" title="245">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/emailVerified&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-246" title="246">  &lt;DisplayName&gt;Email Verified&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-247" title="247">  &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb23-248" title="248">  &lt;AttributeID&gt;postalAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-249" title="249">  &lt;Description&gt;Email Verified&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-250" title="250">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb23-251" title="251">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb23-252" title="252">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/failedLoginLockoutCount&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb23-253" title="253">  &lt;DisplayName&gt;Failed Lockout Count&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb23-254" title="254">  &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb23-255" title="255">  &lt;AttributeID&gt;employeeNumber&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb23-256" title="256">  &lt;Description&gt;Failed Lockout Count&lt;/Description&gt;</a>
<a class="sourceLine" id="cb23-257" title="257">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
</div>
</div>
<p>Remove the following claim.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb24" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb24-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb24-2" title="2">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/lastLoginTime&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb24-3" title="3">  &lt;DisplayName&gt;Last Login&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb24-4" title="4">  &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb24-5" title="5">  &lt;AttributeID&gt;carLicense&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb24-6" title="6">  &lt;Description&gt;Last Login <span class="bu">Time</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb24-7" title="7">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following claim.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb25" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb25-1" title="1">&lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/lastLogonTime&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb25-2" title="2">&lt;DisplayName&gt;Last Logon&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb25-3" title="3">&lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb25-4" title="4">&lt;AttributeID&gt;carLicense&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb25-5" title="5">&lt;Description&gt;Last Logon <span class="bu">Time</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb25-6" title="6">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the following attribute from under the <code>                            &lt;Claim&gt;                            &lt;ClaimURI&gt;                                                                                       http://wso2.org/claims/challengeQuestion1                                                                                                                                                                         </code> tag.</p>
<div>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb26" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb26-1" title="1">Replace <span class="kw">this</span> attribute:</a>
<a class="sourceLine" id="cb26-2" title="2">&lt;AttributeID&gt;localityName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb26-3" title="3"> </a>
<a class="sourceLine" id="cb26-4" title="4">with <span class="kw">this</span>:</a>
<a class="sourceLine" id="cb26-5" title="5">&lt;AttributeID&gt;firstChallenge&lt;/AttributeID&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the following attribute from under the the <code>                             &lt;Claim&gt;                             &lt;ClaimURI&gt;                                                                                          http://wso2.org/claims/challengeQuestion2                                                                                                                                                                               </code></p>
</div>
<div>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb27" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb27-1" title="1">Replace <span class="kw">this</span> attribute:</a>
<a class="sourceLine" id="cb27-2" title="2">&lt;AttributeID&gt;localityName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb27-3" title="3"> </a>
<a class="sourceLine" id="cb27-4" title="4">with <span class="kw">this</span>:</a>
<a class="sourceLine" id="cb27-5" title="5">&lt;AttributeID&gt;secondChallenge&lt;/AttributeID&gt;</a></code></pre></div>
</div>
</div>
<p>Modify this claim as follows:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb28" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb28-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb28-2" title="2">  &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/active&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb28-3" title="3">  &lt;DisplayName&gt;Active&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb28-4" title="4">  &lt;AttributeID&gt;active&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb28-5" title="5">  &lt;Description&gt;Status of the account&lt;/Description&gt;</a>
<a class="sourceLine" id="cb28-6" title="6">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Recommended:** See the [WSO2 IS 5.3.0 migration
guide](https://docs.wso2.com/display/IS530/Upgrading+from+the+Previous+Release)
for more information.

![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

<table>
<thead>
<tr class="header">
<th>Configuration File</th>
<th>Changes</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<p><code>                            carbon.xml                           </code> file stored in the <code>                            &lt;IS_HOME&gt;/repository/conf                           </code> folder.</p>
</div></td>
<td><div class="content-wrapper">
<p>Change the version property value to 5.4.0.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;Version&gt;<span class="fl">5.4.</span><span class="dv">0</span>&lt;/Version&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><p><code>                           identity-event.properties                          </code> file stored in the <code>                           &lt;IS_HOME&gt;/repository/conf/identity                          </code> folder.</p></td>
<td><div class="content-wrapper">
<p>Add the following property.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">account.<span class="fu">lock</span>.<span class="fu">handler</span>.<span class="fu">notification</span>.<span class="fu">manageInternally</span>=<span class="kw">true</span></a></code></pre></div>
</div>
</div>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-1031535586" class="expand-container">
<div id="expander-control-1031535586" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click for more information about the account.lock.handler.notification.manageInternally property
</div>
<div id="expander-content-1031535586" class="expand-content">
<p>The property given above allows you to enable or disable sending emails<br />
via the WSO2 Identity Server when an account is locked or unlocked.</p>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          identity.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following property within the <code>                            &lt;SessionDataCleanUp&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;DeleteChunkSize&gt;<span class="dv">50000</span>&lt;/DeleteChunkSize&gt;</a></code></pre></div>
</div>
</div>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-1637126529" class="expand-container">
<div id="expander-control-1637126529" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click for more information about the DeleteChunkSize property
</div>
<div id="expander-content-1637126529" class="expand-content">
<p>In a production environment, there is a possibility for a deadlock/database lock<br />
to occur when running a session data cleanup task in high load scenarios.<br />
To mitigate this, the property given above was introduced to clean data in chunks.<br />
Configure this property with the required chunk size. For more information, see <a href="https://docs.wso2.com/display/IS540/Deployment+Guidelines+in+Production#DeploymentGuidelinesinProduction-Configuringchunksize">Deployment Guidelines in Production</a> .</p>
</div>
</div>
</div>
</div>
<p>Remove the following property found within the <code>                            &lt;OperationDataCleanUp&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1"> &lt;CleanUpPeriod&gt;<span class="dv">720</span>&lt;/CleanUpPeriod&gt;</a></code></pre></div>
</div>
</div>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-814123935" class="expand-container">
<div id="expander-control-814123935" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click for more information about the CleanUpPeriod property
</div>
<div id="expander-content-814123935" class="expand-content">
<p>WSO2 IS 5.3.0 had two separate tasks for session data cleanup and operation data cleanup.<br />
This is now combined and done through one task.<br />
Therefore the property given above is no longer needed.<br />
You can still configure the <code>                                &lt;CleanUpPeriod&gt;                               </code> property within the <code>                                &lt;SessionDataCleanUp&gt;                               </code> tag<br />
to specify the cleanup period for the combined task.</p>
</div>
</div>
</div>
</div>
<p>Change the default value of the following property from 300 to 0.</p>
!!! warning
    <p>You can skip this step if you have already configured the <code>                            &lt;TimestampSkew&gt;                           </code> property with your own value.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">&lt;TimestampSkew&gt;<span class="dv">0</span>&lt;/TimestampSkew&gt;</a></code></pre></div>
</div>
</div>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-1206677911" class="expand-container">
<div id="expander-control-1206677911" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click for more information about the TimestampSkew property
</div>
<div id="expander-content-1206677911" class="expand-content">
<p>The property given above specifies the maximum tolerance limit<br />
for the clock skewed between the sender and recipient.<br />
The default value was changed to 0 as the best practice is to assume<br />
that the sender and recipient clocks are synchronized and are in the same time stamp.<br />
Configure this accordingly if the clocks are not in the same timestamp.</p>
</div>
</div>
</div>
</div>
<p>Add the following JWT bearer grant type within the <code>                            &lt;SupportedGrantTypes&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;SupportedGrantType&gt;</a>
<a class="sourceLine" id="cb6-2" title="2">&lt;GrantTypeName&gt;urn:ietf:params:oauth:grant-type:jwt-bearer&lt;/GrantTypeName&gt;</a>
<a class="sourceLine" id="cb6-3" title="3">&lt;GrantTypeHandlerImplClass&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth2</span>.<span class="fu">grant</span>.<span class="fu">jwt</span>.<span class="fu">JWTBearerGrantHandler</span>&lt;/GrantTypeHandlerImplClass&gt;</a>
<a class="sourceLine" id="cb6-4" title="4">&lt;GrantTypeValidatorImplClass&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth2</span>.<span class="fu">grant</span>.<span class="fu">jwt</span>.<span class="fu">JWTGrantValidator</span>&lt;/GrantTypeValidatorImplClass&gt;</a>
<a class="sourceLine" id="cb6-5" title="5">&lt;/SupportedGrantType&gt;</a></code></pre></div>
</div>
</div>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-560210340" class="expand-container">
<div id="expander-control-560210340" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click for more information about the JWT bearer grant type
</div>
<div id="expander-content-560210340" class="expand-content">
<p>The JWT bearer grant type is supported out-of-the-box with WSO2 IS 5.4.0.<br />
For more information, see <a href="https://docs.wso2.com/display/ISCONNECTORS/Configuring+JWT+Grant+Type">Configuring JWT Grant Type</a> in the ISConnectors documentation.</p>
</div>
</div>
</div>
</div>
<p>Update the <code>                            &lt;EmailVerification&gt;                           </code> code block with the following code.</p>
<p>The properties shown below at line numbers 3,8,9,10 &amp; 11 were added in 5.4.0.</p>
!!! warning
    <p>This step is optional.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1">&lt;EmailVerification&gt;</a>
<a class="sourceLine" id="cb7-2" title="2">    &lt;Enable&gt;<span class="kw">false</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb7-3" title="3">    &lt;ExpiryTime&gt;<span class="dv">1440</span>&lt;/ExpiryTime&gt;</a>
<a class="sourceLine" id="cb7-4" title="4">    &lt;LockOnCreation&gt;<span class="kw">true</span>&lt;/LockOnCreation&gt;</a>
<a class="sourceLine" id="cb7-5" title="5">    &lt;<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb7-6" title="6">        &lt;InternallyManage&gt;<span class="kw">true</span>&lt;/InternallyManage&gt;</a>
<a class="sourceLine" id="cb7-7" title="7">    &lt;/<span class="bu">Notification</span>&gt;</a>
<a class="sourceLine" id="cb7-8" title="8">    &lt;AskPassword&gt;</a>
<a class="sourceLine" id="cb7-9" title="9">        &lt;ExpiryTime&gt;<span class="dv">1440</span>&lt;/ExpiryTime&gt;</a>
<a class="sourceLine" id="cb7-10" title="10">        &lt;PasswordGenerator&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">user</span>.<span class="fu">mgt</span>.<span class="fu">common</span>.<span class="fu">DefaultPasswordGenerator</span>&lt;/PasswordGenerator&gt;</a>
<a class="sourceLine" id="cb7-11" title="11">    &lt;/AskPassword&gt;</a>
<a class="sourceLine" id="cb7-12" title="12">&lt;/EmailVerification&gt;</a></code></pre></div>
</div>
</div>
<p>Update the following property found within the <code>                            &lt;SelfRegistration&gt;                           </code> tag to true.</p>
!!! warning
    <p>This step is optional.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb8-1" title="1">&lt;LockOnCreation&gt;<span class="kw">true</span>&lt;/LockOnCreation&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties within the <code>                            &lt;SelfRegistration&gt;                           </code> tag.</p>
!!! warning
    <p>This step is optional.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb9" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb9-1" title="1">&lt;VerificationCode&gt;</a>
<a class="sourceLine" id="cb9-2" title="2">  &lt;ExpiryTime&gt;<span class="dv">1440</span>&lt;/ExpiryTime&gt;</a>
<a class="sourceLine" id="cb9-3" title="3">&lt;/VerificationCode&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties within the <code>                            &lt;Server&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1">&lt;AuthenticationPolicy&gt;</a>
<a class="sourceLine" id="cb10-2" title="2">    &lt;CheckAccountExist&gt;<span class="kw">false</span>&lt;/CheckAccountExist&gt;</a>
<a class="sourceLine" id="cb10-3" title="3">&lt;/AuthenticationPolicy&gt;</a></code></pre></div>
</div>
</div>
<p>Change the default values within the <code>                            &lt;CacheManager&gt;                           </code> tag.</p>
!!! warning
    <ul>
    <li><strong>If you have already configured all the properties</strong> within the <code>                             &lt;CacheManager&gt;                            </code> tag with your own values, skip this step.<br />
    <br />
    </li>
    <li><strong>If you have only configured some properties</strong> within the <code>                             &lt;CacheManager&gt;                            </code> tag with your own values,<br />
    replace the properties that are not been changed/configured with the relevant default values shown below.<br />
    <br />
    </li>
    <li><strong>If you have not configured or changed any of the properties</strong> within the <code>                             &lt;CacheManager&gt;                            </code> tag with your own values,<br />
    copy the entire code block below and replace the <code>                             &lt;CacheManager&gt;                            </code> tag in the <code>                             identity.xml                            </code> file with the code block given below.</li>
    </ul>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1">&lt;CacheManager name=<span class="st">&quot;IdentityApplicationManagementCacheManager&quot;</span>&gt;</a>
<a class="sourceLine" id="cb11-2" title="2">    &lt;Cache name=<span class="st">&quot;AppAuthFrameworkSessionContextCache&quot;</span> enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-3" title="3">    &lt;Cache name=<span class="st">&quot;AuthenticationContextCache&quot;</span> enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-4" title="4">    &lt;Cache name=<span class="st">&quot;AuthenticationRequestCache&quot;</span> enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-5" title="5">    &lt;Cache name=<span class="st">&quot;AuthenticationResultCache&quot;</span>  enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-6" title="6">    &lt;Cache name=<span class="st">&quot;AppInfoCache&quot;</span>               enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-7" title="7">    &lt;Cache name=<span class="st">&quot;AuthorizationGrantCache&quot;</span>    enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-8" title="8">    &lt;Cache name=<span class="st">&quot;OAuthCache&quot;</span>                 enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-9" title="9">    &lt;Cache name=<span class="st">&quot;OAuthScopeCache&quot;</span>            enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-10" title="10">    &lt;Cache name=<span class="st">&quot;OAuthSessionDataCache&quot;</span>      enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-11" title="11">    &lt;Cache name=<span class="st">&quot;SAMLSSOParticipantCache&quot;</span>    enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-12" title="12">    &lt;Cache name=<span class="st">&quot;SAMLSSOSessionIndexCache&quot;</span>   enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-13" title="13">    &lt;Cache name=<span class="st">&quot;SAMLSSOSessionDataCache&quot;</span>    enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-14" title="14">    &lt;Cache name=<span class="st">&quot;ServiceProviderCache&quot;</span>       enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-15" title="15">    &lt;Cache name=<span class="st">&quot;ProvisioningConnectorCache&quot;</span> enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-16" title="16">    &lt;Cache name=<span class="st">&quot;ProvisioningEntityCache&quot;</span>    enable=<span class="st">&quot;true&quot;</span> timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-17" title="17">    &lt;Cache name=<span class="st">&quot;ServiceProviderProvisioningConnectorCache&quot;</span> enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-18" title="18">    &lt;Cache name=<span class="st">&quot;IdPCacheByAuthProperty&quot;</span>     enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-19" title="19">    &lt;Cache name=<span class="st">&quot;IdPCacheByHRI&quot;</span>              enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-20" title="20">    &lt;Cache name=<span class="st">&quot;IdPCacheByName&quot;</span>             enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;900&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb11-21" title="21">&lt;/CacheManager&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;CacheManager&gt;                           </code> tag if it does not already exist.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1">&lt;Cache name=<span class="st">&quot;OAuthScopeCache&quot;</span> enable=<span class="st">&quot;true&quot;</span>  timeout=<span class="st">&quot;300&quot;</span> capacity=<span class="st">&quot;5000&quot;</span> isDistributed=<span class="st">&quot;false&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties within the <code>                            &lt;OAuth&gt;                           </code> tag. The code comments explain the usage and applicable values for the properties.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1">&lt;!-- Specify the Token issuer <span class="kw">class</span> to be used.</a>
<a class="sourceLine" id="cb13-2" title="2">Default: org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth2</span>.<span class="fu">token</span>.<span class="fu">OauthTokenIssuerImpl</span>.</a>
<a class="sourceLine" id="cb13-3" title="3">Applicable values: org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth2</span>.<span class="fu">token</span>.<span class="fu">JWTTokenIssuer</span>--&gt;</a>
<a class="sourceLine" id="cb13-4" title="4">    &lt;!--&lt;IdentityOAuthTokenGenerator&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth2</span>.<span class="fu">token</span>.<span class="fu">JWTTokenIssuer</span>&lt;/IdentityOAuthTokenGenerator&gt;--&gt;</a>
<a class="sourceLine" id="cb13-5" title="5"></a>
<a class="sourceLine" id="cb13-6" title="6">&lt;!-- This configuration is used to specify the access token value generator.</a>
<a class="sourceLine" id="cb13-7" title="7">Default: org.<span class="fu">apache</span>.<span class="fu">oltu</span>.<span class="fu">oauth2</span>.<span class="fu">as</span>.<span class="fu">issuer</span>.<span class="fu">UUIDValueGenerator</span></a>
<a class="sourceLine" id="cb13-8" title="8">Applicable values: org.<span class="fu">apache</span>.<span class="fu">oltu</span>.<span class="fu">oauth2</span>.<span class="fu">as</span>.<span class="fu">issuer</span>.<span class="fu">UUIDValueGenerator</span>,</a>
<a class="sourceLine" id="cb13-9" title="9">    org.<span class="fu">apache</span>.<span class="fu">oltu</span>.<span class="fu">oauth2</span>.<span class="fu">as</span>.<span class="fu">issuer</span>.<span class="fu">MD5Generator</span>,</a>
<a class="sourceLine" id="cb13-10" title="10">    org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth</span>.<span class="fu">tokenvaluegenerator</span>.<span class="fu">SHA256Generator</span> --&gt;</a>
<a class="sourceLine" id="cb13-11" title="11">    &lt;!--&lt;AccessTokenValueGenerator&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">oauth</span>.<span class="fu">tokenvaluegenerator</span>.<span class="fu">SHA256Generator</span>&lt;/AccessTokenValueGenerator&gt;--&gt;</a>
<a class="sourceLine" id="cb13-12" title="12"></a>
<a class="sourceLine" id="cb13-13" title="13">&lt;!-- This configuration is used to specify whether the <span class="bu">Service</span> <span class="bu">Provider</span> tenant domain should be used when generating</a>
<a class="sourceLine" id="cb13-14" title="14">access token.<span class="fu">Otherwise</span> user domain will be used.<span class="fu">Currently</span> <span class="kw">this</span> value is only supported by the JWTTokenIssuer. --&gt;</a>
<a class="sourceLine" id="cb13-15" title="15">    &lt;!--&lt;UseSPTenantDomain&gt;True&lt;/UseSPTenantDomain&gt;--&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties related to token persistence within the <code>                            &lt;OAuth&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1">&lt;TokenPersistence&gt;</a>
<a class="sourceLine" id="cb14-2" title="2">    &lt;Enable&gt;<span class="kw">true</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb14-3" title="3">    &lt;PoolSize&gt;<span class="dv">0</span>&lt;/PoolSize&gt;</a>
<a class="sourceLine" id="cb14-4" title="4">    &lt;RetryCount&gt;<span class="dv">5</span>&lt;/RetryCount&gt;</a>
<a class="sourceLine" id="cb14-5" title="5">&lt;/TokenPersistence&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;OpenIDConnect&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1">&lt;SignJWTWithSPKey&gt;<span class="kw">false</span>&lt;/SignJWTWithSPKey&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the <code>                            &lt;OAuth2RevokeEPUrll&gt;                           </code> property with the following.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1">&lt;OAuth2RevokeEPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/oauth2/revoke&lt;/OAuth2RevokeEPUrl&gt;</span></a></code></pre></div>
</div>
</div>
<p>Add the following event listener within the <code>                            &lt;EventListeners&gt;                           </code> tag. Uncomment this listener if you are using SCIM 2.0.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1">&lt;!-- Uncomment the following event listener <span class="kw">if</span> SCIM2 is used. --&gt;</a>
<a class="sourceLine" id="cb17-2" title="2">&lt;!--<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
<a class="sourceLine" id="cb17-3" title="3">name = <span class="st">&quot;org.wso2.carbon.identity.scim2.common.listener.SCIMUserOperationListener&quot;</span></a>
<a class="sourceLine" id="cb17-4" title="4">orderId = <span class="st">&quot;93&quot;</span></a>
<a class="sourceLine" id="cb17-5" title="5">enable = <span class="st">&quot;true&quot;</span> /--&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties within the <code>                            &lt;ResourceAccessControl&gt;                           </code> tag. These properties specify the access levels and permissions for the SCIM 2.0 resources.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Users&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-2" title="2">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/create&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-3" title="3">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-4" title="4">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Users&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-5" title="5">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/list&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-6" title="6">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-7" title="7">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Groups&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-8" title="8">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/rolemgt/create&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-9" title="9">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-10" title="10">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Groups&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-11" title="11">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/rolemgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-12" title="12">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-13" title="13">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Users/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-14" title="14">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-15" title="15">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-16" title="16">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Users/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;PUT&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-17" title="17">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/update&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-18" title="18">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-19" title="19">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Users/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;PATCH&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-20" title="20">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/update&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-21" title="21">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-22" title="22">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Users/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-23" title="23">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-24" title="24">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-25" title="25">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Groups/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-26" title="26">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/rolemgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-27" title="27">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-28" title="28">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Groups/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;PUT&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-29" title="29">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/rolemgt/update&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-30" title="30">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-31" title="31">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Groups/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;PATCH&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-32" title="32">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/rolemgt/update&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-33" title="33">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-34" title="34">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Groups/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-35" title="35">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/rolemgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-36" title="36">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-37" title="37">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Me&quot;</span> secured=<span class="st">&quot;true&quot;</span>    http-method=<span class="st">&quot;GET&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-38" title="38">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/login&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-39" title="39">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-40" title="40">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Me&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-41" title="41">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-42" title="42">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-43" title="43">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Me&quot;</span> secured=<span class="st">&quot;true&quot;</span>    http-method=<span class="st">&quot;PUT&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-44" title="44">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/login&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-45" title="45">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-46" title="46">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Me&quot;</span> secured=<span class="st">&quot;true&quot;</span>   http-method=<span class="st">&quot;PATCH&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-47" title="47">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/login&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-48" title="48">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-49" title="49">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/scim2/Me&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-50" title="50">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/create&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-51" title="51">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-52" title="52">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;/scim2/ServiceProviderConfig&quot;</span> secured=<span class="st">&quot;false&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-53" title="53">    &lt;<span class="bu">Permissions</span>&gt;&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-54" title="54">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-55" title="55">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;/scim2/ResourceType&quot;</span> secured=<span class="st">&quot;false&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-56" title="56">    &lt;<span class="bu">Permissions</span>&gt;&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-57" title="57">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-58" title="58">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;/scim2/Bulk&quot;</span> secured=<span class="st">&quot;true&quot;</span>  http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-59" title="59">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-60" title="60">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb18-61" title="61">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/oauth2/dcr/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb18-62" title="62">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb18-63" title="63">&lt;/<span class="bu">Resource</span>&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties within the <code>                            &lt;TenantContextsToRewrite&gt;&lt;WebApp&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1">&lt;<span class="bu">Context</span>&gt;/scim2&lt;/<span class="bu">Context</span>&gt;</a>
<a class="sourceLine" id="cb19-2" title="2">&lt;<span class="bu">Context</span>&gt;/api/identity/oauth/dcr/v1<span class="fl">.0</span>&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
</div>
</div>
<p>Remove the following property found within the <code>                            &lt;OAuth&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1">&lt;AppInfoCacheTimeout&gt;-<span class="dv">1</span>&lt;/AppInfoCacheTimeout&gt;</a>
<a class="sourceLine" id="cb20-2" title="2">&lt;AuthorizationGrantCacheTimeout&gt;-<span class="dv">1</span>&lt;/AuthorizationGrantCacheTimeout&gt;</a>
<a class="sourceLine" id="cb20-3" title="3">&lt;SessionDataCacheTimeout&gt;-<span class="dv">1</span>&lt;/SessionDataCacheTimeout&gt;</a>
<a class="sourceLine" id="cb20-4" title="4">&lt;ClaimCacheTimeout&gt;-<span class="dv">1</span>&lt;/ClaimCacheTimeout&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following commented property within the <code>                            &lt;OAuth&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1">&lt;!-- True, <span class="kw">if</span> access token alias is stored in the database instead of access token.</a>
<a class="sourceLine" id="cb21-2" title="2">Eg.<span class="fu">token</span> alias and token is same when</a>
<a class="sourceLine" id="cb21-3" title="3"><span class="kw">default</span> AccessTokenValueGenerator is used.</a>
<a class="sourceLine" id="cb21-4" title="4">When JWTTokenIssuer is used, jti is used as the token alias</a>
<a class="sourceLine" id="cb21-5" title="5">Default: <span class="kw">true</span>.</a>
<a class="sourceLine" id="cb21-6" title="6">Applicable values: <span class="kw">true</span>, <span class="kw">false</span>--&gt;</a>
<a class="sourceLine" id="cb21-7" title="7"></a>
<a class="sourceLine" id="cb21-8" title="8">    &lt;!--&lt;PersistAccessTokenAlias&gt;<span class="kw">false</span>&lt;/PersistAccessTokenAlias&gt;--&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the <code>                            &lt;                           </code> <code>                            OAuth2DCREPUrl&gt;                           </code> property with the property value given below.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1">&lt;OAuth2DCREPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/api/identity/oauth2/dcr/v1.0/register&lt;/OAuth2DCREPUrl&gt;</span></a></code></pre></div>
</div>
</div>
<p>Uncomment the following property and add line number 3 given below to the file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb23" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb23-1" title="1">&lt;TokenValidators&gt;</a>
<a class="sourceLine" id="cb23-2" title="2">    &lt;TokenValidator type=<span class="st">&quot;bearer&quot;</span> <span class="kw">class</span>=<span class="st">&quot;org.wso2.carbon.identity.oauth2.validators.DefaultOAuth2TokenValidator&quot;</span> /&gt;</a>
<a class="sourceLine" id="cb23-3" title="3">    &lt;TokenValidator type=<span class="st">&quot;jwt&quot;</span> <span class="kw">class</span>=<span class="st">&quot;org.wso2.carbon.identity.oauth2.validators.OAuth2JWTTokenValidator&quot;</span> /&gt;</a>
<a class="sourceLine" id="cb23-4" title="4">&lt;/TokenValidators&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following commented property to the file. You can place it after the <code>                            &lt;/EnableAssertions&gt;                           </code> closing tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb24" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb24-1" title="1">&lt;!-- This should be <span class="kw">true</span> <span class="kw">if</span> subject identifier in the token validation response needs to adhere to the</a>
<a class="sourceLine" id="cb24-2" title="2">following SP configuration.</a>
<a class="sourceLine" id="cb24-3" title="3"></a>
<a class="sourceLine" id="cb24-4" title="4">- Use tenant domain in local subject identifier. - Use user store domain in local subject identifier.</a>
<a class="sourceLine" id="cb24-5" title="5"></a>
<a class="sourceLine" id="cb24-6" title="6"><span class="kw">if</span> the value is <span class="kw">false</span>, subject identifier will be set as the fully qualified username.</a>
<a class="sourceLine" id="cb24-7" title="7"></a>
<a class="sourceLine" id="cb24-8" title="8">Default value: <span class="kw">false</span></a>
<a class="sourceLine" id="cb24-9" title="9"></a>
<a class="sourceLine" id="cb24-10" title="10">Supported versions: IS <span class="fl">5.4.</span><span class="dv">0</span> beta onwards--&gt;</a>
<a class="sourceLine" id="cb24-11" title="11">    &lt;!--&lt;BuildSubjectIdentifierFromSPConfig&gt;<span class="kw">true</span>&lt;/BuildSubjectIdentifierFromSPConfig&gt;--&gt;</a></code></pre></div>
</div>
</div>
<p>Uncomment the <code>                            &lt;UserType&gt;                           </code> property that has the value "Federated" and comment out the <code>                            &lt;UserType&gt;                           </code> property that has the value "Local" as seen below.<br />
The property can be found within the <code>                            &lt;SAML2Grant&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb25" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb25-1" title="1">&lt;SAML2Grant&gt;</a>
<a class="sourceLine" id="cb25-2" title="2">    &lt;!--SAML2TokenHandler&gt;&lt;/SAML2TokenHandler--&gt;</a>
<a class="sourceLine" id="cb25-3" title="3">    &lt;!-- UserType conifg decides whether the SAML assertion carrying user is local user or a federated user.</a>
<a class="sourceLine" id="cb25-4" title="4">            Only Local Users can access claims from local userstore. LEGACY users will have to have tenant domain appended username.</a>
<a class="sourceLine" id="cb25-5" title="5">            They will not be able to access claims from local userstore. To get claims by mapping users with exact same username from local</a>
<a class="sourceLine" id="cb25-6" title="6">            <span class="fu">userstore</span> (<span class="kw">for</span> non LOCAL scenarios) use mapFederatedUsersToLocal config --&gt;</a>
<a class="sourceLine" id="cb25-7" title="7">    &lt;!--&lt;UserType&gt;LOCAL&lt;/UserType&gt;--&gt;</a>
<a class="sourceLine" id="cb25-8" title="8">    &lt;UserType&gt;FEDERATED&lt;/UserType&gt;</a>
<a class="sourceLine" id="cb25-9" title="9">    &lt;!--UserType&gt;LEGACY&lt;/UserType--&gt;</a>
<a class="sourceLine" id="cb25-10" title="10">&lt;/SAML2Grant&gt;</a></code></pre></div>
</div>
</div>
<p>Remove the following properties found within the <code>                            &lt;SSOService&gt;                           </code> tag.</p>
!!! warning
    <p>This step is optional.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb26" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb26-1" title="1">&lt;PersistanceCacheTimeout&gt;<span class="dv">157680000</span>&lt;/PersistanceCacheTimeout&gt;</a>
<a class="sourceLine" id="cb26-2" title="2">&lt;SessionIndexCacheTimeout&gt;<span class="dv">157680000</span>&lt;/SessionIndexCacheTimeout&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties to the file. You can place the code block after the <code>                            &lt;/SCIM&gt;                           </code> closing tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb27" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb27-1" title="1">&lt;SCIM2&gt;</a>
<a class="sourceLine" id="cb27-2" title="2">    &lt;!--Default value <span class="kw">for</span> UserEPUrl and GroupEPUrl are built in following format</a>
<a class="sourceLine" id="cb27-3" title="3">            https:<span class="co">//&lt;HostName&gt;:&lt;MgtTrpProxyPort except 443&gt;/&lt;ProxyContextPath&gt;/&lt;context&gt;/&lt;path&gt;</span></a>
<a class="sourceLine" id="cb27-4" title="4">            If that doesn&#39;t satisfy uncomment the following config and explicitly configure the value--&gt;</a>
<a class="sourceLine" id="cb27-5" title="5">    &lt;!--UserEPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/scim2/Users&lt;/UserEPUrl--&gt;</span></a>
<a class="sourceLine" id="cb27-6" title="6">    &lt;!--GroupEPUrl&gt;${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/scim2/Groups&lt;/GroupEPUrl--&gt;</span></a>
<a class="sourceLine" id="cb27-7" title="7">&lt;/SCIM2&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties to the file. You can place it after the <code>                            &lt;/EnableAskPasswordAdminUI&gt;                           </code> closing tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb28" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb28-1" title="1">&lt;EnableRecoveryEndpoint&gt;<span class="kw">true</span>&lt;/EnableRecoveryEndpoint&gt;</a>
<a class="sourceLine" id="cb28-2" title="2">&lt;EnableSelfSignUpEndpoint&gt;<span class="kw">true</span>&lt;/EnableSelfSignUpEndpoint&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties within the <code>                            &lt;ResourceAccessControl&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb29" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb29-1" title="1">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/oauth2/dcr/v1.0/register(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb29-2" title="2">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/create&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb29-3" title="3">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb29-4" title="4">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/oauth2/dcr/v1.0/register(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb29-5" title="5">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb29-6" title="6">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb29-7" title="7">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/oauth2/dcr/v1.0/register(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;PUT&quot;</span>&gt;</a>
<a class="sourceLine" id="cb29-8" title="8">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/update&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb29-9" title="9">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb29-10" title="10">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/oauth2/dcr/v1.0/register(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>&gt;</a>
<a class="sourceLine" id="cb29-11" title="11">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/applicationmgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb29-12" title="12">&lt;/<span class="bu">Resource</span>&gt;</a></code></pre></div>
</div>
</div>
<p><br />
</p>
</div></td>
</tr>
<tr class="even">
<td><code>                          oidc-scope-config.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Replace the <code>                            &lt;Claim&gt;                           </code> tag within the <code>                            &lt;Scope id                                                         =                                                                                     "openid"                                                       </code> &gt; tag with the following.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb30" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb30-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb30-2" title="2">    sub, email, email_verified, name, family_name, given_name, middle_name, nickname, preferred_username, profile,</a>
<a class="sourceLine" id="cb30-3" title="3">    picture, website, gender, birthdate, zoneinfo, locale, updated_at, phone_number, phone_number_verified,</a>
<a class="sourceLine" id="cb30-4" title="4">    address,street_address,country, formatted, postal_code, locality, region </a>
<a class="sourceLine" id="cb30-5" title="5">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the <code>                            &lt;Claim&gt;                           </code> tag within the <code>                            &lt;Scope id                                                         =                                                                                     "address"                                                       </code> &gt; tag with the following.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb31" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb31-1" title="1">&lt;Claim&gt;address,street&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          authenticators.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/security                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Update the parameter name of the <code>                            JITUserProvisioning                           </code> parameter to the following.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb32" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb32-1" title="1">&lt;<span class="bu">Parameter</span> name=<span class="st">&quot;JITUserProvisioningEnabled&quot;</span>&gt;<span class="kw">true</span>&lt;/<span class="bu">Parameter</span>&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<p><code>                                                                                    web.xml                           </code> file stored in the <code>                            &lt;IS_HOME&gt;/repository/conf/tomcat                           </code> folder.</p>
</div></td>
<td><div class="content-wrapper">
<p>Add the following property under the <code>                            &lt;session-config&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb33" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb33-1" title="1">&lt;tracking-mode&gt;COOKIE&lt;/tracking-mode&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties below the <code>                            &lt;servlet-class&gt;org.apache.jasper.servlet.JspServlet&lt;/servlet-class&gt;                           </code> property.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb34" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb34-1" title="1">&lt;init-param&gt;</a>
<a class="sourceLine" id="cb34-2" title="2">   &lt;param-name&gt;compilerSourceVM&lt;/param-name&gt;</a>
<a class="sourceLine" id="cb34-3" title="3">   &lt;param-value&gt;<span class="fl">1.</span><span class="dv">8</span>&lt;/param-value&gt;</a>
<a class="sourceLine" id="cb34-4" title="4">&lt;/init-param&gt;</a>
<a class="sourceLine" id="cb34-5" title="5">&lt;init-param&gt;</a>
<a class="sourceLine" id="cb34-6" title="6">   &lt;param-name&gt;compilerTargetVM&lt;/param-name&gt;</a>
<a class="sourceLine" id="cb34-7" title="7">   &lt;param-value&gt;<span class="fl">1.</span><span class="dv">8</span>&lt;/param-value&gt;</a>
<a class="sourceLine" id="cb34-8" title="8">&lt;/init-param&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          email-admin-config.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/email                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Replace "https://localhost:9443" in all instances of the <code>                            accountrecoveryendpoint                           </code> URL with the <strong><code>                             {{carbon.product-url}}                            </code></strong> placeholder.<br />
The URL should look similiar to the URL shown in the code block below. The placeholder will retrieve the value configured in the <code>                            carbon.xml                           </code> file.</p>
!!! warning
    <p>You can skip this step if you have already configured this with your load balancer URL.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb35" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb35-1" title="1">{{carbon.<span class="fu">product</span>-url}}/accountrecoveryendpoint/confirmregistration.<span class="fu">do</span>?confirmation={{confirmation-code}}&amp;amp;userstoredomain={{userstore-domain}}&amp;amp;username={{url:user-name}}&amp;amp;tenantdomain={{tenant-domain}}</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          cipher-tool.properties                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following property.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb36" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb36-1" title="1">ThirftBasedEntitlementConfig.<span class="fu">KeyStore</span>.<span class="fu">Password</span>=repository/conf/identity/identity.<span class="fu">xml</span><span class="co">//Server/EntitlementSettings/ThirftBasedEntitlementConfig/KeyStore/Password,true</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          cipher-text.properties                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following property.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb37" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb37-1" title="1">ThirftBasedEntitlementConfig.<span class="fu">KeyStore</span>.<span class="fu">Password</span>=[wso2carbon]</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          claim-config.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following claims within the <code>                                                                                                                  dialectURI                                                                                     =                                                                                     "                                                                                          http://wso2.org/claims                                                                                        "                                                       </code> &gt; tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb38" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb38-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb38-2" title="2">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/identity/phoneVerified&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb38-3" title="3">    &lt;DisplayName&gt;Phone Verified&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb38-4" title="4">    &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb38-5" title="5">    &lt;AttributeID&gt;phoneVerified&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb38-6" title="6">    &lt;Description&gt;Phone Verified&lt;/Description&gt;</a>
<a class="sourceLine" id="cb38-7" title="7">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb38-8" title="8"></a>
<a class="sourceLine" id="cb38-9" title="9"></a>
<a class="sourceLine" id="cb38-10" title="10">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb38-11" title="11">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/department&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb38-12" title="12">    &lt;DisplayName&gt;Department&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb38-13" title="13">    &lt;AttributeID&gt;departmentNumber&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb38-14" title="14">    &lt;Description&gt;Department&lt;/Description&gt;</a>
<a class="sourceLine" id="cb38-15" title="15">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb38-16" title="16">    &lt;ReadOnly /&gt;</a>
<a class="sourceLine" id="cb38-17" title="17">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following claims. This new claim dialect and the claims within it are required for SCIM 2.0.</p>
<div id="expander-1229092613" class="expand-container">
<div id="expander-control-1229092613" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to view the SCIM 2 claims
</div>
<div id="expander-content-1229092613" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb39" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb39-1" title="1">&lt;Dialect dialectURI=<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0&quot;</span>&gt;</a>
<a class="sourceLine" id="cb39-2" title="2">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-3" title="3">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:id&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-4" title="4">        &lt;DisplayName&gt;Id&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-5" title="5">        &lt;AttributeID&gt;scimId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-6" title="6">        &lt;Description&gt;Id&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-7" title="7">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-8" title="8">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-9" title="9">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-10" title="10">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/userid&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-11" title="11">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-12" title="12">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-13" title="13">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:externalId&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-14" title="14">        &lt;DisplayName&gt;External Id&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-15" title="15">        &lt;AttributeID&gt;externalId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-16" title="16">        &lt;Description&gt;External Id&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-17" title="17">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-18" title="18">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-19" title="19">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-20" title="20">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/externalid&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-21" title="21">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-22" title="22">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-23" title="23">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:meta.<span class="fu">created</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-24" title="24">        &lt;DisplayName&gt;Meta - Created&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-25" title="25">        &lt;AttributeID&gt;createdDate&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-26" title="26">        &lt;Description&gt;Meta - Created&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-27" title="27">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-28" title="28">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-29" title="29">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-30" title="30">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/created&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-31" title="31">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-32" title="32">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-33" title="33">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:meta.<span class="fu">lastModified</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-34" title="34">        &lt;DisplayName&gt;Meta - Last Modified&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-35" title="35">        &lt;AttributeID&gt;lastModifiedDate&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-36" title="36">        &lt;Description&gt;Meta - Last Modified&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-37" title="37">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-38" title="38">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-39" title="39">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-40" title="40">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/modified&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-41" title="41">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-42" title="42">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-43" title="43">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:meta.<span class="fu">location</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-44" title="44">        &lt;DisplayName&gt;Meta - <span class="bu">Location</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-45" title="45">        &lt;AttributeID&gt;location&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-46" title="46">        &lt;Description&gt;Meta - <span class="bu">Location</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-47" title="47">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-48" title="48">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-49" title="49">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-50" title="50">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/location&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-51" title="51">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-52" title="52">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-53" title="53">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:meta.<span class="fu">resourceType</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-54" title="54">        &lt;DisplayName&gt;Meta - <span class="bu">Location</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-55" title="55">        &lt;AttributeID&gt;ref&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-56" title="56">        &lt;Description&gt;Meta - <span class="bu">Location</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-57" title="57">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-58" title="58">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-59" title="59">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-60" title="60">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/resourceType&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-61" title="61">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-62" title="62">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-63" title="63">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:meta.<span class="fu">version</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-64" title="64">        &lt;DisplayName&gt;Meta - Version&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-65" title="65">        &lt;AttributeID&gt;im&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-66" title="66">        &lt;Description&gt;Meta - Version&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-67" title="67">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-68" title="68">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-69" title="69">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-70" title="70">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/im&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-71" title="71">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-72" title="72">&lt;/Dialect&gt;</a>
<a class="sourceLine" id="cb39-73" title="73">&lt;Dialect dialectURI=<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>&gt;</a>
<a class="sourceLine" id="cb39-74" title="74">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-75" title="75">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:userName&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-76" title="76">        &lt;DisplayName&gt;User <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-77" title="77">        &lt;AttributeID&gt;uid&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-78" title="78">        &lt;Description&gt;User <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-79" title="79">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-80" title="80">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-81" title="81">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-82" title="82">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/username&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-83" title="83">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-84" title="84">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-85" title="85">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:name.<span class="fu">givenName</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-86" title="86">        &lt;DisplayName&gt;<span class="bu">Name</span> - Given <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-87" title="87">        &lt;AttributeID&gt;givenName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-88" title="88">        &lt;Description&gt;Given <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-89" title="89">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-90" title="90">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-91" title="91">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-92" title="92">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/givenname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-93" title="93">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-94" title="94">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-95" title="95">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:name.<span class="fu">familyName</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-96" title="96">        &lt;DisplayName&gt;<span class="bu">Name</span> - Family <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-97" title="97">        &lt;AttributeID&gt;sn&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-98" title="98">        &lt;Description&gt;Family <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-99" title="99">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-100" title="100">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-101" title="101">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-102" title="102">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/lastname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-103" title="103">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-104" title="104">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-105" title="105">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:name.<span class="fu">formatted</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-106" title="106">        &lt;DisplayName&gt;<span class="bu">Name</span> - Formatted <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-107" title="107">        &lt;AttributeID&gt;formattedName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-108" title="108">        &lt;Description&gt;Formatted <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-109" title="109">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-110" title="110">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-111" title="111">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-112" title="112">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/formattedName&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-113" title="113">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-114" title="114">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-115" title="115">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:name.<span class="fu">middleName</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-116" title="116">        &lt;DisplayName&gt;<span class="bu">Name</span> - Middle <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-117" title="117">        &lt;AttributeID&gt;middleName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-118" title="118">        &lt;Description&gt;Middle <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-119" title="119">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-120" title="120">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-121" title="121">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-122" title="122">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/middleName&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-123" title="123">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-124" title="124">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-125" title="125">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:name.<span class="fu">honorificPrefix</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-126" title="126">        &lt;DisplayName&gt;<span class="bu">Name</span> - Honoric Prefix&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-127" title="127">        &lt;AttributeID&gt;honoricPrefix&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-128" title="128">        &lt;Description&gt;Honoric Prefix&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-129" title="129">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-130" title="130">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-131" title="131">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-132" title="132">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/honorificPrefix&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-133" title="133">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-134" title="134">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-135" title="135">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:name.<span class="fu">honorificSuffix</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-136" title="136">        &lt;DisplayName&gt;<span class="bu">Name</span> - Honoric Suffix&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-137" title="137">        &lt;AttributeID&gt;honoricSuffix&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-138" title="138">        &lt;Description&gt;Honoric Suffix&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-139" title="139">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-140" title="140">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-141" title="141">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-142" title="142">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/honorificSuffix&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-143" title="143">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-144" title="144">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-145" title="145">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:displayName&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-146" title="146">        &lt;DisplayName&gt;Display <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-147" title="147">        &lt;AttributeID&gt;displayName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-148" title="148">        &lt;Description&gt;Display <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-149" title="149">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-150" title="150">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-151" title="151">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-152" title="152">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/displayName&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-153" title="153">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-154" title="154">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-155" title="155">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:nickName&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-156" title="156">        &lt;DisplayName&gt;Nick <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-157" title="157">        &lt;AttributeID&gt;nickName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-158" title="158">        &lt;Description&gt;Nick <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-159" title="159">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-160" title="160">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-161" title="161">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-162" title="162">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/nickname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-163" title="163">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-164" title="164">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-165" title="165">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:profileUrl&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-166" title="166">        &lt;DisplayName&gt;Profile <span class="bu">URL</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-167" title="167">        &lt;AttributeID&gt;url&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-168" title="168">        &lt;Description&gt;Profile <span class="bu">URL</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-169" title="169">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-170" title="170">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-171" title="171">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-172" title="172">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/url&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-173" title="173">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-174" title="174">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-175" title="175">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:title&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-176" title="176">        &lt;DisplayName&gt;Title&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-177" title="177">        &lt;AttributeID&gt;title&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-178" title="178">        &lt;Description&gt;Title&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-179" title="179">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-180" title="180">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-181" title="181">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-182" title="182">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/title&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-183" title="183">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-184" title="184">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-185" title="185">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:userType&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-186" title="186">        &lt;DisplayName&gt;User <span class="bu">Type</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-187" title="187">        &lt;AttributeID&gt;userType&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-188" title="188">        &lt;Description&gt;User <span class="bu">Type</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-189" title="189">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-190" title="190">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-191" title="191">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-192" title="192">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/userType&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-193" title="193">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-194" title="194">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-195" title="195">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:preferredLanguage&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-196" title="196">        &lt;DisplayName&gt;Preferred Language&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-197" title="197">        &lt;AttributeID&gt;preferredLanguage&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-198" title="198">        &lt;Description&gt;Preferred Language&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-199" title="199">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-200" title="200">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-201" title="201">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-202" title="202">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/preferredLanguage&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-203" title="203">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-204" title="204">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-205" title="205">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:locale&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-206" title="206">        &lt;DisplayName&gt;Locality&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-207" title="207">        &lt;AttributeID&gt;localityName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-208" title="208">        &lt;Description&gt;Locality&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-209" title="209">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-210" title="210">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-211" title="211">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-212" title="212">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/local&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-213" title="213">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-214" title="214">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-215" title="215">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:timezone&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-216" title="216">        &lt;DisplayName&gt;<span class="bu">Time</span> Zone&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-217" title="217">        &lt;AttributeID&gt;timeZone&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-218" title="218">        &lt;Description&gt;<span class="bu">Time</span> Zone&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-219" title="219">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-220" title="220">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-221" title="221">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-222" title="222">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/timeZone&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-223" title="223">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-224" title="224">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-225" title="225">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:active&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-226" title="226">        &lt;DisplayName&gt;Active&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-227" title="227">        &lt;AttributeID&gt;active&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-228" title="228">        &lt;Description&gt;Active&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-229" title="229">        &lt;DisplayOrder&gt;<span class="dv">2</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-230" title="230">        &lt;Required /&gt;</a>
<a class="sourceLine" id="cb39-231" title="231">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-232" title="232">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/active&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-233" title="233">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-234" title="234">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-235" title="235">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:emails.<span class="fu">work</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-236" title="236">        &lt;DisplayName&gt;Emails - Work Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-237" title="237">        &lt;AttributeID&gt;workEmail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-238" title="238">        &lt;Description&gt;Work Email&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-239" title="239">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-240" title="240">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-241" title="241">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-242" title="242">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/emails.work&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-243" title="243">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-244" title="244">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-245" title="245">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:emails.<span class="fu">home</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-246" title="246">        &lt;DisplayName&gt;Emails - Home Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-247" title="247">        &lt;AttributeID&gt;homeEmail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-248" title="248">        &lt;Description&gt;Home Email&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-249" title="249">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-250" title="250">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-251" title="251">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-252" title="252">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/emails.home&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-253" title="253">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-254" title="254">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-255" title="255">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:emails.<span class="fu">other</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-256" title="256">        &lt;DisplayName&gt;Emails - Other Email&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-257" title="257">        &lt;AttributeID&gt;otherEmail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-258" title="258">        &lt;Description&gt;Other Email&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-259" title="259">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-260" title="260">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-261" title="261">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-262" title="262">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/emails.other&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-263" title="263">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-264" title="264">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-265" title="265">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:phoneNumbers.<span class="fu">mobile</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-266" title="266">        &lt;DisplayName&gt;Phone Numbers - Mobile <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-267" title="267">        &lt;AttributeID&gt;mobile&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-268" title="268">        &lt;Description&gt;Mobile <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-269" title="269">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-270" title="270">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-271" title="271">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-272" title="272">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/mobile&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-273" title="273">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-274" title="274">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-275" title="275">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:phoneNumbers.<span class="fu">home</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-276" title="276">        &lt;DisplayName&gt;Phone Numbers - Home Phone <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-277" title="277">        &lt;AttributeID&gt;homePhone&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-278" title="278">        &lt;Description&gt;Home Phone&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-279" title="279">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-280" title="280">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-281" title="281">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-282" title="282">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.home&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-283" title="283">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-284" title="284">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-285" title="285">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:phoneNumbers.<span class="fu">work</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-286" title="286">        &lt;DisplayName&gt;Phone Numbers - Work Phone <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-287" title="287">        &lt;AttributeID&gt;workPhone&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-288" title="288">        &lt;Description&gt;Work Phone&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-289" title="289">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-290" title="290">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-291" title="291">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-292" title="292">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.work&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-293" title="293">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-294" title="294">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-295" title="295">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:phoneNumbers.<span class="fu">other</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-296" title="296">        &lt;DisplayName&gt;Phone Numbers - Other&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-297" title="297">        &lt;AttributeID&gt;otherPhoneNumber&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-298" title="298">        &lt;Description&gt;Other Phone <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-299" title="299">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-300" title="300">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-301" title="301">        &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb39-302" title="302">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/phoneNumbers.other&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-303" title="303">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-304" title="304">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-305" title="305">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:ims.<span class="fu">gtalk</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-306" title="306">        &lt;DisplayName&gt;IM - Gtalk&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-307" title="307">        &lt;AttributeID&gt;imGtalk&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-308" title="308">        &lt;Description&gt;IM - Gtalk&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-309" title="309">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-310" title="310">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-311" title="311">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/gtalk&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-312" title="312">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-313" title="313">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-314" title="314">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:ims.<span class="fu">skype</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-315" title="315">        &lt;DisplayName&gt;IM - Skype&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-316" title="316">        &lt;AttributeID&gt;imSkype&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-317" title="317">        &lt;Description&gt;IM - Skype&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-318" title="318">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-319" title="319">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-320" title="320">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/skype&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-321" title="321">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-322" title="322">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-323" title="323">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:photos.<span class="fu">photo</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-324" title="324">        &lt;DisplayName&gt;Photo&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-325" title="325">        &lt;AttributeID&gt;photoUrl&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-326" title="326">        &lt;Description&gt;Photo&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-327" title="327">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-328" title="328">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-329" title="329">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/photourl&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-330" title="330">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-331" title="331">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-332" title="332">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:photos.<span class="fu">thumbnail</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-333" title="333">        &lt;DisplayName&gt;Photo - Thumbnail&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-334" title="334">        &lt;AttributeID&gt;thumbnail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-335" title="335">        &lt;Description&gt;Photo - Thumbnail&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-336" title="336">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-337" title="337">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-338" title="338">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/thumbnail&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-339" title="339">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-340" title="340">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-341" title="341">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:addresses.<span class="fu">home</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-342" title="342">        &lt;DisplayName&gt;Address - Home&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-343" title="343">        &lt;AttributeID&gt;localityAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-344" title="344">        &lt;Description&gt;Address - Home&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-345" title="345">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-346" title="346">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-347" title="347">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/addresses.locality&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-348" title="348">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-349" title="349">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-350" title="350">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:addresses.<span class="fu">work</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-351" title="351">        &lt;DisplayName&gt;Address - Work&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-352" title="352">        &lt;AttributeID&gt;region&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-353" title="353">        &lt;Description&gt;Address - Work&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-354" title="354">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-355" title="355">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-356" title="356">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/region&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-357" title="357">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-358" title="358">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-359" title="359">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:groups&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-360" title="360">        &lt;DisplayName&gt;Groups&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-361" title="361">        &lt;AttributeID&gt;groups&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-362" title="362">        &lt;Description&gt;Groups&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-363" title="363">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-364" title="364">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-365" title="365">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/groups&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-366" title="366">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-367" title="367">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-368" title="368">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:entitlements.<span class="fu">default</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-369" title="369">        &lt;DisplayName&gt;Entitlements&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-370" title="370">        &lt;AttributeID&gt;entitlements&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-371" title="371">        &lt;Description&gt;Entitlements&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-372" title="372">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-373" title="373">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-374" title="374">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/entitlements&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-375" title="375">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-376" title="376">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-377" title="377">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:roles.<span class="fu">default</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-378" title="378">        &lt;DisplayName&gt;Roles&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-379" title="379">        &lt;AttributeID&gt;roles&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-380" title="380">        &lt;Description&gt;Roles&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-381" title="381">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-382" title="382">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-383" title="383">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/role&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-384" title="384">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-385" title="385">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb39-386" title="386">        &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:x509Certificates.<span class="fu">default</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb39-387" title="387">        &lt;DisplayName&gt;X509Certificates&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb39-388" title="388">        &lt;AttributeID&gt;x509Certificates&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb39-389" title="389">        &lt;Description&gt;X509Certificates&lt;/Description&gt;</a>
<a class="sourceLine" id="cb39-390" title="390">        &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb39-391" title="391">        &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb39-392" title="392">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/x509Certificates&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb39-393" title="393">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb39-394" title="394">&lt;/Dialect&gt;</a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          application-authentication.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following parameter within the <code>                                                         FacebookAuthenticator                                                       </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb40" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb40-1" title="1">&lt;!--&lt;<span class="bu">Parameter</span> name=<span class="st">&quot;ClaimDialectUri&quot;</span>&gt;http:<span class="co">//wso2.org/facebook/claims&lt;/Parameter&gt;--&gt;</span></a></code></pre></div>
</div>
</div>
<p>Add the following parameter within the relevant tags of the following authenticators:<br />
MobileConnectAuthenticator, <code>                            EmailOTP                           </code>, <code>                            SMSOTP                           </code> and <code>                            totp                           </code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb41" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb41-1" title="1">&lt;<span class="bu">Parameter</span> name=<span class="st">&quot;redirectToMultiOptionPageOnFailure&quot;</span>&gt;<span class="kw">false</span>&lt;/<span class="bu">Parameter</span>&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          entitlement.properties                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>WSO2 IS 5.4.0 introduces a set of new XACML policies that load at server startup when the <code>                            PAP.Policy.Add.Start.Enable                           </code> property is set to <code>                            true                           </code> .<br />
Therefore, when you upgrade to IS 5.4.0, follow one of the steps below depending on whether you want to add the new policies:</p>
<ul>
<li>If you want to add the new policies on server startup, set both <code>                             PDP.Balana.Config.Enable                            </code> and <code>                             PAP.Policy.Add.Start.Enable                            </code> properties to <code>                             true                            </code> .</li>
<li>If you do not want to add the new policies on server startup, set both <code>                             PDP.Balana.Config.Enable                            </code> and <code>                             PAP.Policy.Add.Start.Enable                            </code> properties to <code>                             false                            </code> .</li>
</ul>
!!! warning
    <p>Note</p>
    <p>If you set the <code>                            PDP.Balana.Config.Enable                           </code> property to <code>                            false                           </code>, while the <code>                            PAP.Policy.Add.Start.Enable                           </code> property is set to <code>                            true                           </code>, the server does not look for the <code>                            balana-config.xml                           </code> file on startup. This results in an error as follows because the balana-config.xml file includes functions required by the new XACML policies:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb42" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb42-1" title="1">TID: [-<span class="dv">1234</span>] [] [<span class="dv">2018</span>-<span class="bn">01</span>-<span class="bn">01</span> <span class="bn">01</span>:<span class="dv">16</span>:<span class="dv">37</span>,<span class="dv">547</span>] ERROR</a>
    <a class="sourceLine" id="cb42-2" title="2">{org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">entitlement</span>.<span class="fu">EntitlementUtil</span>}</a>
    <a class="sourceLine" id="cb42-3" title="3"><span class="bu">Error</span> <span class="kw">while</span> adding sample XACML policies</a>
    <a class="sourceLine" id="cb42-4" title="4">java.<span class="fu">lang</span>.<span class="fu">IllegalArgumentException</span>: <span class="bu">Error</span> <span class="kw">while</span> parsing start up policy</a></code></pre></div>
    </div>
    </div>
</div></td>
</tr>
</tbody>
</table>

**Recommended:** See the [WSO2 IS 5.4.0 migration
guide](https://docs.wso2.com/display/IS540/Upgrading+from+the+Previous+Release)
for more information.

![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

<table>
<thead>
<tr class="header">
<th>Configuration File</th>
<th>Changes</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>                          carbon.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Change the version property value to 5.5.0.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;Version&gt;<span class="fl">5.5.</span><span class="dv">0</span>&lt;/Version&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><p><code>                           application-authentication.xml                          </code> file stored in the <code>                           &lt;IS_HOME&gt;/repository/conf/identity                          </code> folder.</p></td>
<td><div class="content-wrapper">
<p>Replace the following property found within the <code>                            &lt;Extensions&gt;                           </code> list.</p>
!!! warning
    <p>If you are using a custom <code>                            &lt;StepBasedSequenceHandler&gt;                           </code>, skip this step.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;StepBasedSequenceHandler&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">application</span>.<span class="fu">authentication</span>.<span class="fu">framework</span>.<span class="fu">handler</span>.<span class="fu">sequence</span>.<span class="fu">impl</span>.<span class="fu">DefaultStepBasedSequenceHandler</span>&lt;/StepBasedSequenceHandler&gt;</a></code></pre></div>
</div>
</div>
<p>with the one given below.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;StepBasedSequenceHandler&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">application</span>.<span class="fu">authentication</span>.<span class="fu">framework</span>.<span class="fu">handler</span>.<span class="fu">sequence</span>.<span class="fu">impl</span>.<span class="fu">GraphBasedSequenceHandler</span>&lt;/StepBasedSequenceHandler&gt;</a></code></pre></div>
</div>
</div>
<p>If you are using a custom authorization handler, see <a href="https://docs.wso2.com/display/IS550/Migrating+Custom+Authorization+Handlers">Migrating Custom Authorization Handlers</a> .</p>
<p>The OpenIDAuthenticator is no longer available. Remove the following configurations that are related to it.</p>
<p>Remove the following property found within the <code>                            &lt;AuthenticatorNameMappings&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">&lt;AuthenticatorNameMapping name=<span class="st">&quot;OpenIDAuthenticator&quot;</span> alias=<span class="st">&quot;openid&quot;</span> /&gt; </a></code></pre></div>
</div>
</div>
<p>Remove the whole configuration block that starts with the config given below found within the <code>                            &lt;AuthenticatorConfigs&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">&lt;AuthenticatorConfig name=<span class="st">&quot;OpenIDAuthenticator&quot;</span> enabled=<span class="st">&quot;true&quot;</span>&gt;</a>
<a class="sourceLine" id="cb5-2" title="2">.....</a>
<a class="sourceLine" id="cb5-3" title="3">.....</a>
<a class="sourceLine" id="cb5-4" title="4">&lt;/AuthenticatorConfig&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the <code>                            AuthenticatorConfig                           </code> block for the <strong><code>                             MobileConnectAuthenticator                            </code></strong> found within the <code>                            &lt;AuthenticatorConfigs&gt;                           </code> tag, with the following configuration.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;AuthenticatorConfig name=<span class="st">&quot;MobileConnectAuthenticator&quot;</span> enabled=<span class="st">&quot;true&quot;</span>&gt;</a>
<a class="sourceLine" id="cb6-2" title="2">    &lt;<span class="bu">Parameter</span> name=<span class="st">&quot;MCAuthenticationEndpointURL&quot;</span>&gt;mobileconnectauthenticationendpoint/mobileconnect.<span class="fu">jsp</span>&lt;/<span class="bu">Parameter</span>&gt;</a>
<a class="sourceLine" id="cb6-3" title="3">    &lt;<span class="bu">Parameter</span> name=<span class="st">&quot;MCDiscoveryAPIURL&quot;</span>&gt;https:<span class="co">//discover.mobileconnect.io/gsma/v2/discovery/&lt;/Parameter&gt;</span></a>
<a class="sourceLine" id="cb6-4" title="4">    &lt;<span class="bu">Parameter</span> name=<span class="st">&quot;redirectToMultiOptionPageOnFailure&quot;</span>&gt;<span class="kw">false</span>&lt;/<span class="bu">Parameter</span>&gt;</a>
<a class="sourceLine" id="cb6-5" title="5">&lt;/AuthenticatorConfig&gt;</a></code></pre></div>
</div>
</div>
<p>Remove the following property found within the <code>                            &lt;AuthenticatorNameMappings&gt;                           </code> tag. The <code>                            AuthorizationHandler                           </code> property has been removed from this file for newer versions of this product.</p>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1">&lt;AuthorizationHandler&gt;org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">application</span>.<span class="fu">authz</span>.<span class="fu">xacml</span>.<span class="fu">handler</span>.<span class="fu">impl</span>.<span class="fu">XACMLBasedAuthorizationHandler</span>&lt;/AuthorizationHandler&gt;</a></code></pre></div>
</div>
</div>
<p><br />
</p>
<p><br />
</p>
<p><br />
</p>
</div></td>
</tr>
<tr class="odd">
<td><code>                          identity-event.properties                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following properties that are required for Request Object Support. For more information about the feature, see <a href="https://docs.wso2.com/display/IS550/Request+Object+Support">Request Object Support</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb8-1" title="1">module.<span class="fu">name</span><span class="fl">.11</span>=handleRequestObject</a>
<a class="sourceLine" id="cb8-2" title="2">handleRequestObject.<span class="fu">subscription</span><span class="fl">.1</span>=POST_REVOKE_ACESS_TOKEN</a>
<a class="sourceLine" id="cb8-3" title="3">handleRequestObject.<span class="fu">subscription</span><span class="fl">.2</span>=POST_REVOKE_CODE</a>
<a class="sourceLine" id="cb8-4" title="4">handleRequestObject.<span class="fu">subscription</span><span class="fl">.3</span>=POST_REVOKE_ACESS_TOKEN_BY_ID</a>
<a class="sourceLine" id="cb8-5" title="5">handleRequestObject.<span class="fu">subscription</span><span class="fl">.4</span>=POST_REVOKE_CODE_BY_ID</a>
<a class="sourceLine" id="cb8-6" title="6">handleRequestObject.<span class="fu">subscription</span><span class="fl">.5</span>=POST_REFRESH_TOKEN</a>
<a class="sourceLine" id="cb8-7" title="7">handleRequestObject.<span class="fu">subscription</span><span class="fl">.6</span>=POST_ISSUE_CODE</a>
<a class="sourceLine" id="cb8-8" title="8">handleRequestObject.<span class="fu">subscription</span><span class="fl">.7</span>=POST_ISSUE_ACCESS_TOKEN</a></code></pre></div>
</div>
</div>
<p>Add the following properties to enable the user event handler used to delete user consents when users are deleted.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb9" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb9-1" title="1">module.<span class="fu">name</span><span class="fl">.12</span>=user.<span class="fu">consent</span>.<span class="fu">delete</span></a>
<a class="sourceLine" id="cb9-2" title="2">user.<span class="fu">consent</span>.<span class="fu">delete</span>.<span class="fu">subscription</span><span class="fl">.1</span>=POST_DELETE_USER</a>
<a class="sourceLine" id="cb9-3" title="3">user.<span class="fu">consent</span>.<span class="fu">delete</span>.<span class="fu">receipt</span>.<span class="fu">search</span>.<span class="fu">limit</span>=<span class="dv">500</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          identity.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Remove the <code>                            &lt;ClientAuthHandlers&gt;                           </code> code block found within the <code>                            &lt;OAuth&gt;                           </code> tag. From WSO2 IS 5.5.0 onwards, client authentication is handled differently. For more information, see the introduction of the <a href="https://docs.wso2.com/display/IS550/Writing+A+New+OAuth+Client+Authenticator">Writing A New OAuth Client Authenticator</a> topic.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1">&lt;ClientAuthHandlers&gt;</a>
<a class="sourceLine" id="cb10-2" title="2">    &lt;ClientAuthHandler <span class="bu">Class</span>=<span class="st">&quot;org.wso2.carbon.identity.oauth2.token.handlers.clientauth.BasicAuthClientAuthHandler&quot;</span>&gt;</a>
<a class="sourceLine" id="cb10-3" title="3">        &lt;Property <span class="bu">Name</span>=<span class="st">&quot;StrictClientCredentialValidation&quot;</span>&gt;<span class="kw">false</span>&lt;/Property&gt;</a>
<a class="sourceLine" id="cb10-4" title="4">    &lt;/ClientAuthHandler&gt;</a>
<a class="sourceLine" id="cb10-5" title="5">&lt;/ClientAuthHandlers&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;ScopeValidators&gt;                           </code> tag. For more information about the XACML based scope validator, see <a href="https://docs.wso2.com/display/IS550/Validating+the+Scope+of+OAuth+Access+Tokens+using+XACML+Policies">Validating the Scope of OAuth Access Tokens using XACML Policies</a> .</p>
!!! tip
    <p><strong>Tip:</strong> To migrate custom scope validators, see <a href="https://docs.wso2.com/display/IS550/Migrating+Custom+Scope+Validators">Migrating Custom Scope Validators</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1">&lt;ScopeValidator <span class="kw">class</span>=<span class="st">&quot;org.wso2.carbon.identity.oauth2.validators.xacml.XACMLScopeValidator&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;OpenIDConnect&gt;                           </code> tag to enable the service provider wise audience configuration. For more information about this, see</p>
!!! tip
    <p>This feature requires a new database table that is created when running the migration script. If you do not wish to use this feature, you can set the value of the property given below to false.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1">&lt;EnableAudiences&gt;<span class="kw">true</span>&lt;/EnableAudiences&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;OpenIDConnect&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1">&lt;LogoutTokenExpiration&gt;<span class="dv">120</span>&lt;/LogoutTokenExpiration&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;EventListeners&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
<a class="sourceLine" id="cb14-2" title="2">                       name=<span class="st">&quot;org.wso2.carbon.user.mgt.listeners.UserDeletionEventListener&quot;</span></a>
<a class="sourceLine" id="cb14-3" title="3">                       orderId=<span class="st">&quot;98&quot;</span> enable=<span class="st">&quot;false&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following code block within the root tag after the <code>                            &lt;EventListeners&gt;                           </code> code block. For more information about this configuration, see <a href="https://docs.wso2.com/display/IS550/Configuring+Users#ConfiguringUsers-Trackinguserdeletionondeletingauser">Tracking user deletion on deleting a user</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1">&lt;UserDeleteEventRecorders&gt;</a>
<a class="sourceLine" id="cb15-2" title="2">    &lt;UserDeleteEventRecorder name=<span class="st">&quot;org.wso2.carbon.user.mgt.recorder.DefaultUserDeletionEventRecorder&quot;</span> enable=<span class="st">&quot;false&quot;</span>&gt;</a>
<a class="sourceLine" id="cb15-3" title="3">        &lt;!-- Un comment below line <span class="kw">if</span> you need to write entries to a separate .<span class="fu">csv</span> file. Otherwise <span class="kw">this</span> will be</a>
<a class="sourceLine" id="cb15-4" title="4">            written in to a log file using a separate appender. --&gt;</a>
<a class="sourceLine" id="cb15-5" title="5">        &lt;!--&lt;Property name=<span class="st">&quot;path&quot;</span>&gt;${carbon.<span class="fu">home</span>}/repository/logs/delete-records.<span class="fu">csv</span>&lt;/Property&gt;--&gt;</a>
<a class="sourceLine" id="cb15-6" title="6">    &lt;/UserDeleteEventRecorder&gt;</a>
<a class="sourceLine" id="cb15-7" title="7">&lt;/UserDeleteEventRecorders&gt;</a></code></pre></div>
</div>
</div>
<p>Do the following configuration changes to enable fine grained access control introduced with Identity Server 5.5.0</p>
<p>Remove the following property found within the &lt; <code>                            ResourceAccessControl&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following set of resources within the &lt; <code>                            ResourceAccessControl&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/validate-code&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-2" title="2">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/resend-code&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-3" title="3">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/me&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-4" title="4">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/me&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-5" title="5">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/pi-info&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-6" title="6">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-7" title="7">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-8" title="8">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/pi-info/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-9" title="9">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-10" title="10">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-11" title="11">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-12" title="12">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/receipts/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-13" title="13">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purposes&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-14" title="14">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/add&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-15" title="15">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-16" title="16">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-17" title="17">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.+)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-18" title="18">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-19" title="19">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-20" title="20">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-21" title="21">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/add&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-22" title="22">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-23" title="23">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-24" title="24">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.+)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-25" title="25">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-26" title="26">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-27" title="27">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-28" title="28">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/add&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-29" title="29">&lt;/<span class="bu">Resource</span>&gt;</a>
<a class="sourceLine" id="cb17-30" title="30">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb17-31" title="31">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.+)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
<a class="sourceLine" id="cb17-32" title="32">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
<a class="sourceLine" id="cb17-33" title="33">&lt;/<span class="bu">Resource</span>&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the following property found within the <code>                            &lt;WebApp&gt;                           </code> tag under the <code>                            &lt;TenantContextsToRewrite&gt;                           </code> tag.</p>
<div>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1">&lt;<span class="bu">Context</span>&gt;/api/identity/user/v0<span class="fl">.9</span>/&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
</div>
</div>
<p>with the one given below</p>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1">&lt;<span class="bu">Context</span>&gt;/api/identity/user/v1<span class="fl">.0</span>/&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following new property within the <code>                            &lt;WebApp&gt;                           </code> tag found under the <code>                            &lt;TenantContextsToRewrite&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1">&lt;<span class="bu">Context</span>&gt;/api/identity/consent-mgt/v1<span class="fl">.0</span>/&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following code block within the root tag after the <code>                            &lt;SSOService&gt;                           </code> code block.</p>
<p>This configuration specifies whether consent management should be enabled during single sign-on authentication. For more information, see <a href="https://docs.wso2.com/display/IS550/Consent+Management+with+Single-Sign-On">Consent Management with Single-Sign-On</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1">&lt;Consent&gt;</a>
<a class="sourceLine" id="cb21-2" title="2">    &lt;!--Specify whether consent management should be enable during SSO.--&gt;</a>
<a class="sourceLine" id="cb21-3" title="3">    &lt;EnableSSOConsentManagement&gt;<span class="kw">true</span>&lt;/EnableSSOConsentManagement&gt;</a>
<a class="sourceLine" id="cb21-4" title="4">&lt;/Consent&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following code block within the <code>                            &lt;OAuth&gt;                           </code> tag. This configuration is used to specify the grant types that filter claims based on user consents. The grant types given below are out-of-the-box grant types that prompt the user for consent.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1">&lt;!--Defines the grant types that will filter user claims based on user consent in their responses such as id_token or user info response.<span class="fu">Default</span> grant types that filter user claims based on user consent are &#39;authorization_code&#39; and &#39;implicit&#39;.</a>
<a class="sourceLine" id="cb22-2" title="2">Supported versions: IS <span class="fl">5.5.</span><span class="dv">0</span> onwards. --&gt;</a>
<a class="sourceLine" id="cb22-3" title="3"> </a>
<a class="sourceLine" id="cb22-4" title="4">&lt;UserConsentEnabledGrantTypes&gt;</a>
<a class="sourceLine" id="cb22-5" title="5">    &lt;UserConsentEnabledGrantType&gt;</a>
<a class="sourceLine" id="cb22-6" title="6">        &lt;GrantTypeName&gt;authorization_code&lt;/GrantTypeName&gt;</a>
<a class="sourceLine" id="cb22-7" title="7">    &lt;/UserConsentEnabledGrantType&gt;</a>
<a class="sourceLine" id="cb22-8" title="8">    &lt;UserConsentEnabledGrantType&gt;</a>
<a class="sourceLine" id="cb22-9" title="9">        &lt;GrantTypeName&gt;implicit&lt;/GrantTypeName&gt;</a>
<a class="sourceLine" id="cb22-10" title="10">    &lt;/UserConsentEnabledGrantType&gt;</a>
<a class="sourceLine" id="cb22-11" title="11">&lt;/UserConsentEnabledGrantTypes&gt;</a></code></pre></div>
</div>
</div>
<p><br />
</p>
</div></td>
</tr>
<tr class="odd">
<td><code>                          log4j.properties                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following properties.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb23" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb23-1" title="1">log4j.<span class="fu">logger</span>.<span class="fu">DELETE_EVENT_LOGGER</span>=INFO, DELETE_EVENT_LOGFILE</a>
<a class="sourceLine" id="cb23-2" title="2">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">FileAppender</span></a>
<a class="sourceLine" id="cb23-3" title="3">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">File</span>=${carbon.<span class="fu">home</span>}/repository/logs/delete-event.<span class="fu">log</span></a>
<a class="sourceLine" id="cb23-4" title="4">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">Append</span>=<span class="kw">true</span></a>
<a class="sourceLine" id="cb23-5" title="5">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">layout</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">PatternLayout</span></a>
<a class="sourceLine" id="cb23-6" title="6">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">layout</span>.<span class="fu">ConversionPattern</span>=%m %n</a>
<a class="sourceLine" id="cb23-7" title="7">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">threshold</span>=INFO</a>
<a class="sourceLine" id="cb23-8" title="8">log4j.<span class="fu">additivity</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>=<span class="kw">false</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>provisioning-config.xml file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Remove the <code>                            &lt;scim-providers&gt;                           </code> and <code>                            &lt;scim-consumers&gt;                           </code> code blocks from the file.</p>
</div></td>
</tr>
</tbody>
</table>

**Recommended:** See the [WSO2 IS 5.5.0 migration
guide](https://docs.wso2.com/display/IS550/Upgrading+from+the+Previous+Release)
for more information.

![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

<table>
<thead>
<tr class="header">
<th>Configuration File</th>
<th>Changes</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>                          carbon.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Change the version property value to 5.6.0.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;Version&gt;<span class="fl">5.6.</span><span class="dv">0</span>&lt;/Version&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following new property within the <code>                            &lt;cache&gt;                           </code> tag. Setting this property to <code>                            true                           </code> enables local cache invalidation for clustered nodes.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">&lt;ForceLocalCache&gt;<span class="kw">false</span>&lt;/ForceLocalCache&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          axis2.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/axis2                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Change the following property values to 5.6.0.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;parameter name=<span class="st">&quot;userAgent&quot;</span> locked=<span class="st">&quot;true&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-2" title="2">        WSO2 <span class="bu">Identity</span> Server-<span class="fl">5.6.</span><span class="dv">0</span></a>
<a class="sourceLine" id="cb3-3" title="3">&lt;/parameter&gt;</a>
<a class="sourceLine" id="cb3-4" title="4">&lt;parameter name=<span class="st">&quot;server&quot;</span> locked=<span class="st">&quot;true&quot;</span>&gt;</a>
<a class="sourceLine" id="cb3-5" title="5">    WSO2 <span class="bu">Identity</span> Server-<span class="fl">5.6.</span><span class="dv">0</span></a>
<a class="sourceLine" id="cb3-6" title="6">&lt;/parameter&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><p><code>                           application-authentication.xml                          </code> file stored in the <code>                           &lt;IS_HOME&gt;/repository/conf/identity                          </code> folder.</p></td>
<td><div class="content-wrapper">
<p>Add the following new property within the root tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">&lt;AuthenticationEndpointMissingClaimsURL&gt;/authenticationendpoint/claims.<span class="fu">do</span>&lt;/AuthenticationEndpointMissingClaimsURL&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          entitlement.properties                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following property. Setting this property to true will shorten the SAML JSON response format.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">JSON.<span class="fu">Shorten</span>.<span class="fu">Form</span>.<span class="fu">Enabled</span>=<span class="kw">false</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          identity.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following properties within the <code>                            &lt;JDBCPersistenceManager&gt;&lt;SessionDataPersist&gt;                           </code> tag. These configurations are relevant for cleaning<br />
temporary authentication context data after each authentication flow.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;TempDataCleanup&gt;</a>
<a class="sourceLine" id="cb6-2" title="2">    &lt;!-- Enabling separated cleanup <span class="kw">for</span> temporary authentication context data --&gt;</a>
<a class="sourceLine" id="cb6-3" title="3">    &lt;Enable&gt;<span class="kw">true</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb6-4" title="4">    &lt;!-- When PoolZize &gt; <span class="dv">0</span>, temporary data which have no usage after the authentication flow will be deleted immediately</a>
<a class="sourceLine" id="cb6-5" title="5">                 When PoolZise = <span class="dv">0</span>, data will be deleted only by the scheduled cleanup task--&gt;</a>
<a class="sourceLine" id="cb6-6" title="6">    &lt;PoolSize&gt;<span class="dv">20</span>&lt;/PoolSize&gt;</a>
<a class="sourceLine" id="cb6-7" title="7">    &lt;!-- All temporary authentication context data older than CleanUpTimeout value are considered as expired</a>
<a class="sourceLine" id="cb6-8" title="8">                and would be deleted during cleanup task --&gt;</a>
<a class="sourceLine" id="cb6-9" title="9">    &lt;CleanUpTimeout&gt;<span class="dv">40</span>&lt;/CleanUpTimeout&gt;</a>
<a class="sourceLine" id="cb6-10" title="10">&lt;/TempDataCleanup&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following property within the <code>                            &lt;OAuth&gt;                           </code> tag for OAuth key hashing. For more information, see <a href="https://docs.wso2.com/display/IS560/Setting+Up+OAuth+Token+Hashing">Setting Up OAuth Token Hashing</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1">&lt;!-- This should be <span class="kw">true</span> <span class="kw">if</span> the oauth <span class="fu">keys</span> (consumer secret, access token, refresh token and authorization code) need to be hashed,before storing them in the database. If the value is <span class="kw">false</span>, the oauth keys will be saved in a plain text format.</a>
<a class="sourceLine" id="cb7-2" title="2">By <span class="kw">default</span> : <span class="kw">false</span>.</a>
<a class="sourceLine" id="cb7-3" title="3">Supported versions: IS <span class="fl">5.6.</span><span class="dv">0</span> onwards.</a>
<a class="sourceLine" id="cb7-4" title="4">   --&gt;</a>
<a class="sourceLine" id="cb7-5" title="5">&lt;EnableClientSecretHash&gt;<span class="kw">false</span>&lt;/EnableClientSecretHash&gt;</a></code></pre></div>
</div>
</div>
!!! tip
    <p><strong>Tip:</strong> Use a fresh server to enable hashing.</p>
<p>Add the following configurations within the <code>                            &lt;EventListeners&gt;                           </code> tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb8-1" title="1">&lt;!-- Audit Loggers --&gt;</a>
<a class="sourceLine" id="cb8-2" title="2">&lt;!-- Old Audit <span class="bu">Logger</span> --&gt;</a>
<a class="sourceLine" id="cb8-3" title="3">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
<a class="sourceLine" id="cb8-4" title="4">                       name=<span class="st">&quot;org.wso2.carbon.user.mgt.listeners.UserMgtAuditLogger&quot;</span></a>
<a class="sourceLine" id="cb8-5" title="5">                       orderId=<span class="st">&quot;0&quot;</span> enable=<span class="st">&quot;false&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb8-6" title="6">&lt;!-- New Audit Loggers--&gt;</a>
<a class="sourceLine" id="cb8-7" title="7">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
<a class="sourceLine" id="cb8-8" title="8">                       name=<span class="st">&quot;org.wso2.carbon.user.mgt.listeners.UserManagementAuditLogger&quot;</span></a>
<a class="sourceLine" id="cb8-9" title="9">                       orderId=<span class="st">&quot;1&quot;</span> enable=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb8-10" title="10">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserManagementErrorEventListener&quot;</span></a>
<a class="sourceLine" id="cb8-11" title="11">                       name=<span class="st">&quot;org.wso2.carbon.user.mgt.listeners.UserMgtFailureAuditLogger&quot;</span></a>
<a class="sourceLine" id="cb8-12" title="12">                       orderId=<span class="st">&quot;0&quot;</span> enable=<span class="st">&quot;true&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following properties related to the validitating JWT based on JWKS capability. For more information, see <a href="https://docs.wso2.com/display/IS560/Validating+JWT+based+on+JWKS">Validating JWT based on JWKS</a> .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb9" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb9-1" title="1">&lt;!-- JWT validator configurations --&gt;</a>
<a class="sourceLine" id="cb9-2" title="2">&lt;JWTValidatorConfigs&gt;</a>
<a class="sourceLine" id="cb9-3" title="3">    &lt;Enable&gt;<span class="kw">true</span>&lt;/Enable&gt;</a>
<a class="sourceLine" id="cb9-4" title="4">    &lt;JWKSEndpoint&gt;</a>
<a class="sourceLine" id="cb9-5" title="5">        &lt;HTTPConnectionTimeout&gt;<span class="dv">1000</span>&lt;/HTTPConnectionTimeout&gt;</a>
<a class="sourceLine" id="cb9-6" title="6">        &lt;HTTPReadTimeout&gt;<span class="dv">1000</span>&lt;/HTTPReadTimeout&gt;</a>
<a class="sourceLine" id="cb9-7" title="7">        &lt;HTTPSizeLimit&gt;<span class="dv">51200</span>&lt;/HTTPSizeLimit&gt;</a>
<a class="sourceLine" id="cb9-8" title="8">    &lt;/JWKSEndpoint&gt;</a>
<a class="sourceLine" id="cb9-9" title="9">&lt;/JWTValidatorConfigs&gt;</a></code></pre></div>
</div>
</div>
<p>If you are using SCIM 1.1, disable the following SCIM 2.0 event listener.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
<a class="sourceLine" id="cb10-2" title="2">                        name=<span class="st">&quot;org.wso2.carbon.identity.scim2.common.listener.SCIMUserOperationListener&quot;</span></a>
<a class="sourceLine" id="cb10-3" title="3">                        orderId=<span class="st">&quot;93&quot;</span> enable=<span class="st">&quot;false&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>If you are using SCIM 2.0, disable the following SCIM 1.1 event listener (this listener is disabled by default in 5.6.0).</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
<a class="sourceLine" id="cb11-2" title="2">                        name=<span class="st">&quot;org.wso2.carbon.identity.scim.common.listener.SCIMUserOperationListener&quot;</span></a>
<a class="sourceLine" id="cb11-3" title="3">                        orderId=<span class="st">&quot;90&quot;</span> enable=<span class="st">&quot;false&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><code>                          oidc-scope-config.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/identity                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Append the values "upn" and "groups" to the comma separated list within the <code>                            &lt;Scope id="openid"&gt;&lt;Claim&gt;                           </code> element.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb12-2" title="2">sub,email,email_verified,name,family_name,given_name,middle_name,nickname,preferred_username,upn,groups,profile,picture,website,gender,birthdate,zoneinfo,locale,updated_at,phone_number,phone_number_verified,address,street_address,country,formatted,postal_code,locality,region</a>
<a class="sourceLine" id="cb12-3" title="3">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>These are MP-JWT supported claims. The MP-JWT 1.0 specification has introduced two claims; namely "upn" and "groups", which are mandatory to generate a JWT token that is supported by the MicroProfile JWT authentication framework.</p>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">

</div></td>
<td><div class="content-wrapper">

</div></td>
</tr>
<tr class="even">
<td><code>                          catalina-server.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/tomcat                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Disable the following properties by setting the relevant properties to false to avoid displaying unneccessary information.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1">&lt;!--<span class="bu">Error</span> pages --&gt;</a>
<a class="sourceLine" id="cb13-2" title="2">&lt;Valve className=<span class="st">&quot;org.apache.catalina.valves.ErrorReportValve&quot;</span> showServerInfo=<span class="st">&quot;false&quot;</span> showReport=<span class="st">&quot;false&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td><code>                          claim-config.xml                         </code> file stored in the <code>                          &lt;IS_HOME&gt;/repository/conf/                         </code> folder.</td>
<td><div class="content-wrapper">
<p>Add the following claims within the <code>                            &lt;Dialect dialectURI="http://wso2.org/claims"&gt;                           </code> dialect tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb14-2" title="2">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/userprincipal&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb14-3" title="3">    &lt;DisplayName&gt;User <span class="bu">Principal</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb14-4" title="4">    &lt;AttributeID&gt;uid&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb14-5" title="5">    &lt;Description&gt;User <span class="bu">Principal</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb14-6" title="6">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb14-7" title="7">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb14-8" title="8">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/extendedRef&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb14-9" title="9">    &lt;DisplayName&gt;Extended <span class="bu">Ref</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb14-10" title="10">    &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb14-11" title="11">    &lt;AttributeID&gt;extendedRef&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb14-12" title="12">    &lt;Description&gt;Extended <span class="bu">Ref</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb14-13" title="13">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb14-14" title="14">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb14-15" title="15">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/extendedDisplayName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb14-16" title="16">    &lt;DisplayName&gt;Extended Display <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb14-17" title="17">    &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb14-18" title="18">    &lt;AttributeID&gt;extendedDisplayName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb14-19" title="19">    &lt;Description&gt;Extended Display <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb14-20" title="20">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb14-21" title="21">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb14-22" title="22">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/costCenter&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb14-23" title="23">    &lt;DisplayName&gt;Cost Center&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb14-24" title="24">    &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb14-25" title="25">    &lt;AttributeID&gt;costCenter&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb14-26" title="26">    &lt;Description&gt;Cost Center&lt;/Description&gt;</a>
<a class="sourceLine" id="cb14-27" title="27">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb14-28" title="28">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb14-29" title="29">    &lt;ClaimURI&gt;http:<span class="co">//wso2.org/claims/extendedExternalId&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb14-30" title="30">    &lt;DisplayName&gt;Extended External ID&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb14-31" title="31">    &lt;!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --&gt;</a>
<a class="sourceLine" id="cb14-32" title="32">    &lt;AttributeID&gt;extendedExternalId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb14-33" title="33">    &lt;Description&gt;Extended External ID&lt;/Description&gt;</a>
<a class="sourceLine" id="cb14-34" title="34">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following claims within the <code>                            &lt;Dialect dialectURI="                                                         http://wso2.org/oidc/claim                                                        "&gt;                           </code> dialect tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb15-2" title="2">    &lt;ClaimURI&gt;upn&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb15-3" title="3">    &lt;DisplayName&gt;User <span class="bu">Principal</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb15-4" title="4">    &lt;AttributeID&gt;uid&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb15-5" title="5">    &lt;Description&gt;The user principal name&lt;/Description&gt;</a>
<a class="sourceLine" id="cb15-6" title="6">    &lt;DisplayOrder&gt;<span class="dv">11</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb15-7" title="7">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb15-8" title="8">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/userprincipal&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb15-9" title="9">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb15-10" title="10">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb15-11" title="11">    &lt;ClaimURI&gt;groups&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb15-12" title="12">    &lt;DisplayName&gt;User Groups&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb15-13" title="13">    &lt;AttributeID&gt;role&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb15-14" title="14">    &lt;Description&gt;<span class="bu">List</span> of group names that have been assigned to the principal. This typically will require a mapping at the application container level to application deployment roles.&lt;/Description&gt;</a>
<a class="sourceLine" id="cb15-15" title="15">    &lt;DisplayOrder&gt;<span class="dv">12</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb15-16" title="16">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb15-17" title="17">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/role&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb15-18" title="18">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following claims within the <code>                            &lt;Dialect dialectURI="urn:ietf:params:scim:schemas:core:2.0:User"&gt;                           </code> dialect tag.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb16-2" title="2">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:emails&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb16-3" title="3">    &lt;DisplayName&gt;Emails&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb16-4" title="4">    &lt;AttributeID&gt;mail&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb16-5" title="5">    &lt;Description&gt;Email Addresses&lt;/Description&gt;</a>
<a class="sourceLine" id="cb16-6" title="6">    &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb16-7" title="7">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb16-8" title="8">    &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb16-9" title="9">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/emailaddress&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb16-10" title="10">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb16-11" title="11">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb16-12" title="12">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:phoneNumbers&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb16-13" title="13">    &lt;DisplayName&gt;Phone Numbers&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb16-14" title="14">    &lt;AttributeID&gt;phoneNumbers&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb16-15" title="15">    &lt;Description&gt;Phone Numbers&lt;/Description&gt;</a>
<a class="sourceLine" id="cb16-16" title="16">    &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb16-17" title="17">    &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb16-18" title="18">    &lt;RegEx&gt;^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-<span class="dv">9</span>\-])+\.)+([a-zA-Z0-<span class="dv">9</span>]{<span class="dv">2</span>,<span class="dv">4</span>})+$&lt;/RegEx&gt;</a>
<a class="sourceLine" id="cb16-19" title="19">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/phoneNumbers&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb16-20" title="20">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb16-21" title="21">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb16-22" title="22">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:photos&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb16-23" title="23">    &lt;DisplayName&gt;Photo&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb16-24" title="24">    &lt;AttributeID&gt;photos&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb16-25" title="25">    &lt;Description&gt;Photo&lt;/Description&gt;</a>
<a class="sourceLine" id="cb16-26" title="26">    &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb16-27" title="27">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb16-28" title="28">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/photos&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb16-29" title="29">&lt;/Claim&gt;</a>
<a class="sourceLine" id="cb16-30" title="30">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb16-31" title="31">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:core:<span class="fl">2.</span><span class="dv">0</span>:User:addresses&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb16-32" title="32">    &lt;DisplayName&gt;Address&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb16-33" title="33">    &lt;AttributeID&gt;addresses&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb16-34" title="34">    &lt;Description&gt;Address&lt;/Description&gt;</a>
<a class="sourceLine" id="cb16-35" title="35">    &lt;DisplayOrder&gt;<span class="dv">5</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb16-36" title="36">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb16-37" title="37">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/addresses&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb16-38" title="38">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the following property values within the <code>                            urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:employeeNumber                           </code> claim URI.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb17-2" title="2">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:extension:enterprise:<span class="fl">2.</span><span class="dv">0</span>:User:employeeNumber&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb17-3" title="3">    &lt;DisplayName&gt;Employee <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb17-4" title="4">    &lt;AttributeID&gt;extendedExternalId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb17-5" title="5">    &lt;Description&gt;Employee <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb17-6" title="6">    &lt;Required /&gt;</a>
<a class="sourceLine" id="cb17-7" title="7">    &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb17-8" title="8">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb17-9" title="9">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/extendedExternalId&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb17-10" title="10">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the following property values within the urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:costCenter claim URI.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb18-2" title="2">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:extension:enterprise:<span class="fl">2.</span><span class="dv">0</span>:User:costCenter&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb18-3" title="3">    &lt;DisplayName&gt;Cost Center&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb18-4" title="4">    &lt;AttributeID&gt;costCenter&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb18-5" title="5">    &lt;Description&gt;Cost Center&lt;/Description&gt;</a>
<a class="sourceLine" id="cb18-6" title="6">    &lt;Required /&gt;</a>
<a class="sourceLine" id="cb18-7" title="7">    &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb18-8" title="8">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb18-9" title="9">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/costCenter&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb18-10" title="10">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Replace the following property values within the <code>                            urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.$ref                           </code> claim URI.</p>
<p><br />
</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb19-2" title="2">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:extension:enterprise:<span class="fl">2.</span><span class="dv">0</span>:User:manager.$ref&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb19-3" title="3">    &lt;DisplayName&gt;Manager - home&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb19-4" title="4">    &lt;AttributeID&gt;extendedRef&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb19-5" title="5">    &lt;Description&gt;Manager - home&lt;/Description&gt;</a>
<a class="sourceLine" id="cb19-6" title="6">    &lt;Required /&gt;</a>
<a class="sourceLine" id="cb19-7" title="7">    &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb19-8" title="8">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb19-9" title="9">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/extendedRef&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb19-10" title="10">&lt;/Claim&gt; </a></code></pre></div>
</div>
</div>
<p>Replace the following property values within the <code>                            urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.displayName                           </code> claim URI.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1">&lt;Claim&gt;</a>
<a class="sourceLine" id="cb20-2" title="2">    &lt;ClaimURI&gt;urn:ietf:params:scim:schemas:extension:enterprise:<span class="fl">2.</span><span class="dv">0</span>:User:manager.<span class="fu">displayName</span>&lt;/ClaimURI&gt;</a>
<a class="sourceLine" id="cb20-3" title="3">    &lt;DisplayName&gt;Manager - Display <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb20-4" title="4">    &lt;AttributeID&gt;extendedDisplayName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb20-5" title="5">    &lt;Description&gt;Manager - Display <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb20-6" title="6">    &lt;Required /&gt;</a>
<a class="sourceLine" id="cb20-7" title="7">    &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb20-8" title="8">    &lt;SupportedByDefault /&gt;</a>
<a class="sourceLine" id="cb20-9" title="9">    &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/extendedDisplayName&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb20-10" title="10">&lt;/Claim&gt;</a></code></pre></div>
</div>
</div>
<p>Add the following claims within the root tag. This new claim dialect and the claims within it are required for eiDAS.</p>
<p>For more information, see <a href="https://docs.wso2.com/display/IS560/eIDAS+SAML+Attribute+Profile+Support+via+WSO2+Identity+Server">eIDAS SAML Attribute Profile Support via WSO2 Identity Server</a> .</p>
<div id="expander-1836831152" class="expand-container">
<div id="expander-control-1836831152" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click to view the claims
</div>
<div id="expander-content-1836831152" class="expand-content">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1">&lt;Dialect dialectURI=<span class="st">&quot;http://eidas.europa.eu/attributes/naturalperson&quot;</span>&gt;</a>
<a class="sourceLine" id="cb21-2" title="2">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-3" title="3">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/PersonIdentifier&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-4" title="4">        &lt;DisplayName&gt;Person Identifier&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-5" title="5">        &lt;AttributeID&gt;scimId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-6" title="6">        &lt;Description&gt;Person Identifier&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-7" title="7">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-8" title="8">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-9" title="9">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-10" title="10">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/userid&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-11" title="11">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-12" title="12">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-13" title="13">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/CurrentFamilyName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-14" title="14">        &lt;DisplayName&gt;<span class="bu">Current</span> Family <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-15" title="15">        &lt;AttributeID&gt;sn&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-16" title="16">        &lt;Description&gt;<span class="bu">Current</span> Family <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-17" title="17">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-18" title="18">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-19" title="19">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-20" title="20">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/lastname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-21" title="21">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-22" title="22">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-23" title="23">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/CurrentGivenName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-24" title="24">        &lt;DisplayName&gt;<span class="bu">Current</span> Given <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-25" title="25">        &lt;AttributeID&gt;givenName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-26" title="26">        &lt;Description&gt;<span class="bu">Current</span> Given <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-27" title="27">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-28" title="28">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-29" title="29">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-30" title="30">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/givenname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-31" title="31">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-32" title="32">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-33" title="33">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/DateOfBirth&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-34" title="34">        &lt;DisplayName&gt;<span class="bu">Date</span> of birth&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-35" title="35">        &lt;AttributeID&gt;dateOfBirth&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-36" title="36">        &lt;Description&gt;<span class="bu">Date</span> of birth&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-37" title="37">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-38" title="38">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-39" title="39">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-40" title="40">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/dob&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-41" title="41">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-42" title="42">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-43" title="43">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/BirthName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-44" title="44">        &lt;DisplayName&gt;Birth <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-45" title="45">        &lt;AttributeID&gt;uid&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-46" title="46">        &lt;Description&gt;Birth <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-47" title="47">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-48" title="48">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-49" title="49">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-50" title="50">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/username&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-51" title="51">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-52" title="52">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-53" title="53">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/PlaceOfBirth&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-54" title="54">        &lt;DisplayName&gt;Place of Birth&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-55" title="55">        &lt;AttributeID&gt;country&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-56" title="56">        &lt;Description&gt;Place of Birth&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-57" title="57">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-58" title="58">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-59" title="59">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-60" title="60">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/country&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-61" title="61">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-62" title="62">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-63" title="63">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/CurrentAddress&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-64" title="64">        &lt;DisplayName&gt;<span class="bu">Current</span> Address&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-65" title="65">        &lt;AttributeID&gt;localityAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-66" title="66">        &lt;Description&gt;<span class="bu">Current</span> Address&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-67" title="67">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-68" title="68">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-69" title="69">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-70" title="70">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/addresses&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-71" title="71">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-72" title="72">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-73" title="73">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/naturalperson/Gender&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-74" title="74">        &lt;DisplayName&gt;Gender&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-75" title="75">        &lt;AttributeID&gt;gender&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-76" title="76">        &lt;Description&gt;Gender&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-77" title="77">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-78" title="78">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-79" title="79">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-80" title="80">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/gender&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-81" title="81">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-82" title="82">&lt;/Dialect&gt;</a>
<a class="sourceLine" id="cb21-83" title="83">&lt;Dialect dialectURI=<span class="st">&quot;http://eidas.europa.eu/attributes/legalperson&quot;</span>&gt;</a>
<a class="sourceLine" id="cb21-84" title="84">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-85" title="85">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/LegalPersonIdentifier&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-86" title="86">        &lt;DisplayName&gt;Legal Person Identifier&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-87" title="87">        &lt;AttributeID&gt;extendedExternalId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-88" title="88">        &lt;Description&gt;Legal Person Identifier&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-89" title="89">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-90" title="90">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-91" title="91">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-92" title="92">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/extendedExternalId&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-93" title="93">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-94" title="94">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-95" title="95">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/LegalName&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-96" title="96">        &lt;DisplayName&gt;Legal Person <span class="bu">Name</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-97" title="97">        &lt;AttributeID&gt;extendedDisplayName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-98" title="98">        &lt;Description&gt;Legal Person <span class="bu">Name</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-99" title="99">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-100" title="100">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-101" title="101">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-102" title="102">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/extendedDisplayName&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-103" title="103">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-104" title="104">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-105" title="105">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/LegalPersonAddress&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-106" title="106">        &lt;DisplayName&gt;Legal Person Address&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-107" title="107">        &lt;AttributeID&gt;localityAddress&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-108" title="108">        &lt;Description&gt;Legal Person Address&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-109" title="109">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-110" title="110">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-111" title="111">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-112" title="112">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/addresses&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-113" title="113">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-114" title="114">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-115" title="115">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/VATRegistrationNumber&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-116" title="116">        &lt;DisplayName&gt;VAT Registration <span class="bu">Number</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-117" title="117">        &lt;AttributeID&gt;im&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-118" title="118">        &lt;Description&gt;VAT Registration <span class="bu">Number</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-119" title="119">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-120" title="120">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-121" title="121">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-122" title="122">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/im&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-123" title="123">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-124" title="124">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-125" title="125">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/TaxReference&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-126" title="126">        &lt;DisplayName&gt;Tax <span class="bu">Reference</span>&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-127" title="127">        &lt;AttributeID&gt;postalcode&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-128" title="128">        &lt;Description&gt;Tax <span class="bu">Reference</span>&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-129" title="129">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-130" title="130">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-131" title="131">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-132" title="132">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/postalcode&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-133" title="133">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-134" title="134">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-135" title="135">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/D-2012-17-EUIdentifier&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-136" title="136">        &lt;DisplayName&gt;EU Identifier&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-137" title="137">        &lt;AttributeID&gt;externalId&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-138" title="138">        &lt;Description&gt;EU Identifier&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-139" title="139">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-140" title="140">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-141" title="141">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-142" title="142">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/externalid&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-143" title="143">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-144" title="144">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-145" title="145">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/LEI&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-146" title="146">        &lt;DisplayName&gt;LEI&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-147" title="147">        &lt;AttributeID&gt;extendedRef&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-148" title="148">        &lt;Description&gt;LEI&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-149" title="149">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-150" title="150">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-151" title="151">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-152" title="152">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/extendedRef&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-153" title="153">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-154" title="154">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-155" title="155">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/EORI&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-156" title="156">        &lt;DisplayName&gt;Economic Operator Registration and Identification&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-157" title="157">        &lt;AttributeID&gt;departmentNumber&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-158" title="158">        &lt;Description&gt;Economic Operator Registration and Identification&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-159" title="159">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-160" title="160">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-161" title="161">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-162" title="162">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/department&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-163" title="163">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-164" title="164">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-165" title="165">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/SEED&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-166" title="166">        &lt;DisplayName&gt;<span class="bu">System</span> <span class="kw">for</span> Exchange of Excise <span class="bu">Data</span> Identifier&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-167" title="167">        &lt;AttributeID&gt;nickName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-168" title="168">        &lt;Description&gt;<span class="bu">System</span> <span class="kw">for</span> Exchange of Excise <span class="bu">Data</span> Identifier&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-169" title="169">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-170" title="170">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-171" title="171">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-172" title="172">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/nickname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-173" title="173">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-174" title="174">    &lt;Claim&gt;</a>
<a class="sourceLine" id="cb21-175" title="175">        &lt;ClaimURI&gt;http:<span class="co">//eidas.europa.eu/attributes/legalperson/SIC&lt;/ClaimURI&gt;</span></a>
<a class="sourceLine" id="cb21-176" title="176">        &lt;DisplayName&gt;Standard Industrial Classification&lt;/DisplayName&gt;</a>
<a class="sourceLine" id="cb21-177" title="177">        &lt;AttributeID&gt;nickName&lt;/AttributeID&gt;</a>
<a class="sourceLine" id="cb21-178" title="178">        &lt;Description&gt;Standard Industrial Classification&lt;/Description&gt;</a>
<a class="sourceLine" id="cb21-179" title="179">        &lt;Required/&gt;</a>
<a class="sourceLine" id="cb21-180" title="180">        &lt;DisplayOrder&gt;<span class="dv">1</span>&lt;/DisplayOrder&gt;</a>
<a class="sourceLine" id="cb21-181" title="181">        &lt;SupportedByDefault/&gt;</a>
<a class="sourceLine" id="cb21-182" title="182">        &lt;MappedLocalClaim&gt;http:<span class="co">//wso2.org/claims/nickname&lt;/MappedLocalClaim&gt;</span></a>
<a class="sourceLine" id="cb21-183" title="183">    &lt;/Claim&gt;</a>
<a class="sourceLine" id="cb21-184" title="184">&lt;/Dialect&gt;</a></code></pre></div>
</div>
</div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

**Recommended:** See the [WSO2 IS 5.6.0 migration
guide](https://docs.wso2.com/display/IS560/Upgrading+from+the+Previous+Release)
for more information.

![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

Configuration File

Changes

`                          carbon.xml                         ` file
stored in the
`                          <IS_HOME>/repository/conf                         `
directory.

Change the version property value to 5.7.0.

``` java
<Version>5.7.0</Version>
```

`                          axis2.xml                         ` file
stored in the
`                          <IS_HOME>/repository/conf/axis2                         `
directory.

Change the following property values to 5.7.0.

``` java
<parameter name="userAgent" locked="true">
        WSO2 Identity Server-5.7.0
</parameter>
<parameter name="server" locked="true">
    WSO2 Identity Server-5.7.0
</parameter>
```

`                           application-authentication.xml                          `
file stored in the
`                           <IS_HOME>/repository/conf/identity                          `
directory.

Under
`                            <Extensions>                           `,
do the following changes to enable adaptive authentication:

\- Change the value of
`                            <StepBasedSequenceHandler>                           `
from
`                            org.wso2.carbon.identity.application.authentication.framework.handler.sequence.impl.DefaultStepBasedSequenceHandler                           `
to
`                            org.wso2.carbon.identity.application.authentication.framework.handler.sequence.impl.GraphBasedSequenceHandler                           `
.

\- Change the value of
`                            <StepHandler>                           `
from
`                            org.wso2.carbon.identity.application.authentication.framework.handler.step.impl.DefaultStepHandler                           `
to
`                            org.wso2.carbon.identity.application.authentication.framework.handler.step.impl.GraphBasedStepHandler                           `
.

Add the following configuration under \<AuthenticatorConfigs\>:

``` java
<AuthenticatorConfig name="IdentifierExecutor" enabled="true">
     <Parameter name="ValidateUsername">false</Parameter>
</AuthenticatorConfig>
```

`                          identity.xml                         ` file
stored in the
`                          <IS_HOME>/repository/conf/identity                         `
directory.

  

  

  

  

  

  

  

Add the following configuration under
`                            <OAuth>                           ` :

``` java
<!-- Token cleanup feature config to clean IDN_OAUTH2_ACCESS_TOKEN table-->
        <TokenCleanup>
            <!--If true old access token cleaning feature is enabled -->
            <EnableTokenCleanup>true</EnableTokenCleanup>
            <!--If true  old access token retained in audit table  -->
            <RetainOldAccessToken>true</RetainOldAccessToken>
        </TokenCleanup>
```

This configuration is required to clean the
`                            IDN_OAUTH2_ACCESS_TOKEN                           `
table.

Under `                           <OAuth>                          `,
change the value of
`                           <OAuth2DCREPUrl>                          `
from
`                           ${carbon.protocol}://${carbon.host}:${carbon.management.port}/api/identity/oauth2/dcr/v1.0/register                          `
to
`                           ${carbon.protocol}://${carbon.host}:${carbon.management.port}/api/identity/oauth2/dcr/v1.1/register                          `
. This reflects the DCR version update.

Do the following changes under \<SupportedResponseTypes\> to replace the
deprecated
`                          TokenResponseTypeHandler                         `
class: - Change
`                          <SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</ResponseTypeHandlerImplClass>                         `
to
`                          <SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.AccessTokenResponseTypeHandler</ResponseTypeHandlerImplClass>                         `
. - Change
`                          <SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</ResponseTypeHandlerImplClass>                         `
to
`                          <SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.IDTokenResponseTypeHandler</ResponseTypeHandlerImplClass>                         `
. - Change
`                          <SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</ResponseTypeHandlerImplClass>                         `
to
`                          <SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.IDTokenTokenResponseTypeHandler</ResponseTypeHandlerImplClass>                         `
.

Under
`                            <SSOService>                           `,
add the following SAML2 artifact validity period configuration:

``` java
<SAML2ArtifactValidityPeriodInMinutes>4</SAML2ArtifactValidityPeriodInMinutes>
```

Under `                            <SCIM>                           `,
add the following configuration that allows you to get all the details
of a user from SCIM endpoint if necessary:

``` java
<ShowAllUserDetails>false</ShowAllUserDetails>
```

Add the following configuration that is introduced to support filtering
roles when you have configured a service provider role mapping:

``` java
<!--
         This configuration is used to filter the SP configured role mappings. If the property value is,

         true : If SP role mappings are configured, returns only the mapped SP roles. If SP role mappings are not
         configured returns all the mapped local roles.

         false : If SP role mappings are configured, returns mapped SP roles for the mapped roles and the local mapped
         roles for others. If SP role mappings are not configured returns all the mapped local roles.

         Default - false.
     -->

    <!--SPRoleManagement>
        <ReturnOnlyMappedLocalRoles>false</ReturnOnlyMappedLocalRoles>
    </SPRoleManagement-->
```

Add the following configuration that allows you to customize the default
user interfaces displayed at the time of just-in-time provisioning:

``` java
<JITProvisioning>
     <UserNameProvisioningUI>/accountrecoveryendpoint/register.do</UserNameProvisioningUI>
     <PasswordProvisioningUI>/accountrecoveryendpoint/signup.do</PasswordProvisioningUI>
</JITProvisioning>
```

Add the following configuration to include post authentication handlers
introduced via JIT provisioning improvements:

``` java
<!-- Post Authentication handlers for JIT provisioning, association and for handling subject identifier -->
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
                       name="org.wso2.carbon.identity.application.authentication.framework.handler.request.impl.JITProvisioningPostAuthenticationHandler"
                       orderId="20" enable="true"/>
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
                       name="org.wso2.carbon.identity.application.authentication.framework.handler.request.impl.PostAuthAssociationHandler"
                       orderId="25" enable="true"/>
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
                       name="org.wso2.carbon.identity.application.authentication.framework.handler.request.impl.PostAuthenticatedSubjectIdentifierHandler"
                       orderId="30" enable="true"/>
```

Do the following changes under
`                            <ResourceAccessControl>                           `
: - To reflect the changes introduced via security advisory
WSO2-2018-0462, replace the following set of resources

``` java
<Resource context="(.*)/api/identity/user/v1.0/validate-code" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/user/v1.0/resend-code" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/user/v1.0/me" secured="true" http-method="POST"/>
<Resource context="(.*)/api/identity/user/v1.0/me" secured="true" http-method="GET"/>


<Resource context="(.*)/api/identity/consent-mgt/v1.0/consents/purposes" secured="true" http-method="POST">
<Resource context="(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories" secured="true" http-method="POST">
<Resource context="(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories" secured="true" http-method="POST">


<Resource context="(.*)/scim2/Users" secured="true" http-method="POST">
<Resource context="(.*)/scim2/Groups" secured="true" http-method="POST">
<Resource context="/scim2/Bulk" secured="true"  http-method="all">
```

with the following:

``` java
<Resource context="(.*)/api/identity/user/v1.0/validate-code(.*)" secured="true" http-method="all">
            <Permissions>/permission/admin/manage/identity/identitymgt</Permissions></Resource>
<Resource context="(.*)/api/identity/user/v1.0/resend-code(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/user/v1.0/me(.*)" secured="true" http-method="POST"/>
<Resource context="(.*)/api/identity/user/v1.0/me(.*)" secured="true" http-method="GET"/>


<Resource context="(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.*)" secured="true" http-method="POST">
<Resource context="(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.*)" secured="true" http-method="POST">
<Resource context="(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.*)" secured="true" http-method="POST">


<Resource context="(.*)/scim2/Users(.*)" secured="true" http-method="POST">
<Resource context="(.*)/scim2/Groups(.*)" secured="true" http-method="POST">
<Resource context="/scim2/Bulk(.*)" secured="true"  http-method="all">
```

\- Replace
`                            <Resource context="(.*)/api/identity/recovery/(.*)" secured="true" http-method="all"/>                           `
with the following resource:

``` java
<Resource context="(.*)/api/identity/recovery/(.*)" secured="true" http-method="all">
    <Permissions>/permission/admin/manage/identity/identitymgt</Permissions>
</Resource>
```

This introduces changes done with regard to access permission for
account recovery endpoint.

\- Add the following resource that allows using /api/identity/auth/ to
retrieve data from authentication endpoint itself instead of obtaining
via the URL:

``` java
<Resource context="(.*)/api/identity/auth/(.*)" secured="true" http-method="all"/>
```

\- To reflect the DCR version upgrade, replace the following set of
resources

``` java
<Resource context="(.*)/api/identity/oauth2/dcr/v1.0/register(.*)" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/applicationmgt/create</Permissions>
</Resource>
<Resource context="(.*)/api/identity/oauth2/dcr/v1.0/register(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/applicationmgt/delete</Permissions>
</Resource>
<Resource context="(.*)/api/identity/oauth2/dcr/v1.0/register(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/applicationmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/oauth2/dcr/v1.0/register(.*)" secured="true" http-method="GET">
    <Permissions>/permission/admin/manage/identity/applicationmgt/view</Permissions>
</Resource>
```

with the following:

``` java
<Resource context="(.*)/api/identity/oauth2/dcr/v1.1/register(.*)" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/applicationmgt/create</Permissions>
</Resource>
<Resource context="(.*)/api/identity/oauth2/dcr/v1.1/register(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/applicationmgt/delete</Permissions>
</Resource>
<Resource context="(.*)/api/identity/oauth2/dcr/v1.1/register(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/applicationmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/oauth2/dcr/v1.1/register(.*)" secured="true" http-method="GET">
    <Permissions>/permission/admin/manage/identity/applicationmgt/view</Permissions>
</Resource>
```

Add the following property that was introduced to restrict federated
user association done via the
`                            UserProfileAdmin                           `
admin service:

``` java
<!--
This property restricts federated user association done through UserProfileAdmin admin service.
Would not affect associations done through provisioning
-->
<EnableFederatedUserAssociation>false</EnableFederatedUserAssociation>
```

Under
`                          <TenantContextsToRewrite>                         `
`                          <WebApp>                         `, replace
`                          <Context>/api/identity/oauth2/dcr/v1.0/</Context>                         `
with
`                          <Context>/api/identity/oauth2/dcr/v1.1/</Context>                         `
to reflect the DCR version upgrade.

Under
`                            <AdaptiveAuth><EventPublisher>                           `
, replace
`                            <receiverURL>                                                         http://localhost:8280/                                                        >                           `
with the following configuration:

``` java
<ReceiverURL>https://localhost:8280/</ReceiverURL>
<BasicAuthentication>
         <Enable>true</Enable>
          <Username>admin</Username>
          <Password>admin</Password>
</BasicAuthentication>
```

This introduces the default configurations for event publisher.

Under
`                            <AdaptiveAuth>                           `
, add the following configurations introduced to support external
analytics calls in adaptive authentication:

``` java
<MaxTotalConnections>20</MaxTotalConnections>
<MaxTotalConnectionsPerRoute>20</MaxTotalConnectionsPerRoute>

<!--Timeouts in milliseconds-->
<!--Default configs for timeouts-->
<!--<HTTPConnectionTimeout>5000</HTTPConnectionTimeout>-->
<!--<HTTPReadTimeout>5000</HTTPReadTimeout>-->
<!--<HTTPConnectionRequestTimeout>5000</HTTPConnectionRequestTimeout>-->
<!--End of default configs for timeouts-->

<!--<RefreshInterval>500</RefreshInterval>-->
<!--End of timeouts in milliseconds-->

<!--<PromptOnLongWait>false</PromptOnLongWait>-->        
<!--Timeout in milliseconds for the waiting external calls-->
<LongWaitTimeout>10000</LongWaitTimeout>
```

`                          carbon.xml                         ` file
stored in the
`                          <IS_HOME>/repository/conf                         `
directory.

Add the following configuration that introduces parameters related to
Carbon Crypto Service, which is a crypto framework used inside Carbon
products:

``` java
<!--
 Configurations related to Carbon Crypto Service which is a crypto framework used inside Carbon products.
-->
<CryptoService>

 <Enabled>true</Enabled>

 <!-- The crypto provider which is used for internal data encryption and decryption -->
 <InternalCryptoProviderClassName>org.wso2.carbon.crypto.provider.KeyStoreBasedInternalCryptoProvider</InternalCryptoProviderClassName>

 <!--
   The crypto provider which is used for the crypto needs which come when communicating with external parties.
   e.g. Signing, Decrypting.
 -->
 <ExternalCryptoProviderClassName>org.wso2.carbon.core.encryption.KeyStoreBasedExternalCryptoProvider</ExternalCryptoProviderClassName>
 <!--
   The list of key resolvers which will be used based on the context when handling crypto with external parties.
   e.g. Resolving the public key of an external entity.
 -->
 <KeyResolvers>
    <KeyResolver className="org.wso2.carbon.crypto.defaultProvider.resolver.ContextIndependentKeyResolver" priority="-1"/>
 </KeyResolvers>

</CryptoService>
```

Under
`                            <Security>                           `,
add the following keystore parameters introduced to
encrypting/decrypting internal data:

``` java
<!--
  The KeyStore which is used for encrypting/decrypting internal data.
  This block is read by Carbon Crypto Service.
-->
<InternalKeyStore>
  <!-- Keystore file location-->
  <Location>${carbon.home}/repository/resources/security/wso2carbon.jks</Location>
  <!-- Keystore type (JKS/PKCS12 etc.)-->
  <Type>JKS</Type>
  <!-- Keystore password-->
  <Password>wso2carbon</Password>
  <!-- Private Key alias-->
  <KeyAlias>wso2carbon</KeyAlias>
  <!-- Private Key password-->
  <KeyPassword>wso2carbon</KeyPassword>
</InternalKeyStore>
```

`                          log4j.properties                         `
file stored in the
`                          <IS_HOME>/repository/conf                         `
directory.

Add the following lines that include the properties introduced to
support masking sensitive information in your logs:

``` java
# Log masking configuration. Please uncomment the following log4j property, if you need to mask any
# information in your carbon logs.
# When enabled, the logs will be matched with the  provided patterns and masked .
# The 'path-to-masking-patterns' path should be an absolute file path to a properties file. This file should contain
# the patterns that should be checked for masking as key value pairs. (mask-name=masking-regex-pattern)
# If this file cannot be found, wso2-log-masking.properties file will be used as default. If the following
# configuration is not enabled, no masking process will be applied.
#log4j.appender.CARBON_CONSOLE.maskingPatternFile=path-to-masking-patterns


# Log masking configuration. Please uncomment the following log4j property, if you need to mask any
# information in your carbon logs.
# When enabled, the logs will be matched with the  provided patterns and masked .
# The 'path-to-masking-patterns' path should be an absolute file path to a properties file. This file should contain
# the patterns that should be checked for masking as key value pairs. (mask-name=masking-regex-pattern)
# If this file cannot be found, wso2-log-masking.properties file will be used as default. If the following
# configuration is not enabled, no masking process will be applied.
#log4j.appender.CARBON_LOGFILE.maskingPatternFile=path-to-masking-patterns
```

**Recommended:** See the [WSO2 IS 5.7.0 migration
guide](_Upgrading_from_the_Previous_Release_) for more information.

![](images/icons/grey_arrow_down.png){.expand-control-image}
Configuration changes: Click here to view the table..

Configuration File

Changes

`                           carbon.xml                          ` file
stored in the
`                           <IS_HOME>/repository/conf                          `
directory.

The version property value has been changed to 5.8.0.

``` java
<Version>5.8.0</Version>
```

**Why?**

This property indicates the version of WSO2 IS.

`                           axis2.xml                          ` file
stored in the
`                           <IS_HOME>/repository/conf/axis2                          `
directory.

The following property values have been changed to 5.8.0.

``` java
<parameter name="userAgent" locked="true">
        WSO2 Identity Server-5.8.0
</parameter>
<parameter name="server" locked="true">
    WSO2 Identity Server-5.8.0
</parameter>
```

The following property has been added.

``` java
<parameter name="forceIncludeNullElements">false</parameter>
```

**Why?**

Enabling this property forces elements that have the
`                             @IgnoreNullElement                            `
annotation to be returned as well even though the value is null. The
default value for this property is 'false'.

`                            Endpointconfig.properties                           `
file stored in the
`                            <IS_HOME>/repository/conf/identity                           `
directory.

The following property has been added.

``` java
mutualSSLManagerEnabled=true
```

**Why?**

Enabling this property allows the
`                             MutualSSLManager                            `
to initialize the keystores. If it is set to 'false', the
`                             MutualSSLManager                            `
will not initialize the keystore.

`                           application-authentication.xml                          `
file stored in the
`                           <IS_HOME>/repository/conf/identity                          `
directory.

  

  

  

  

  

  

  

  

  

  

  

  

  

  

The following property has been added to the following authenticators
under the relevant tags.

-   BasicAuthenticator -
    `                              <AuthenticatorConfig name="BasicAuthenticator" enabled="true">                             `
-   BasicAuthRequestPathAuthenticator -
    `                              <AuthenticatorConfig name="BasicAuthRequestPathAuthenticator" enabled="true">                             `

``` java
<Parameter name="AuthMechanism">basic</Parameter>
```

**Why?**

This property is used to help identify the authentication mechanism used
by the authenticator.

The following parameters were added under the
`                             <AuthenticatorConfig name="EmailOTP" enabled="true">                            `
tag.

``` java
<Parameter name="EMAILOTPAuthenticationEndpointURL">emailotpauthenticationendpoint/emailotp.jsp</Parameter>
<Parameter name="EmailOTPAuthenticationEndpointErrorPage">emailotpauthenticationendpoint/emailotpError.jsp</Parameter>
<Parameter name="EmailAddressRequestPage">emailotpauthenticationendpoint/emailAddress.jsp</Parameter>
```

**Why?**

The following parameters make the Email OTP URLs configurable.

The `                             totp                            `
authenticator configurations were uncommented and the following
parameters have been added under the
`                             <AuthenticatorConfig name="totp" enabled="true">                            `
tag.

``` java
<Parameter name="Issuer">WSO2</Parameter>
<Parameter name="UseCommonIssuer">true</Parameter>
```

**Why?**

The added parameters make the
`                             totp                            ` issuer
configurable instead of showing the domain name.

The following parameter has been removed from the totp authenticator as
it is redundant.

``` java
<Parameter name="redirectToMultiOptionPageOnFailure">false</Parameter>
```

The following property has been added under the
`                             <ApplicationAuthentication>                            `
tag. `                            `

``` xml
<!--Similar to the 'AuthenticationEndpointQueryParams' above, the following section defines the parameters that should be included/excluded in the redirection responses from authentication framework. These parameters may be generated internally from the framework, handlers or authenticators. The filtered parameters will be available via the REST API for authentication framework. "removeOnConsumeFromAPI" defines whether to make the filtered parameters unavailable from the API on the first consumption. -->
<AuthenticationEndpointRedirectParams action="exclude" removeOnConsumeFromAPI="true">
    <AuthenticationEndpointRedirectParam name="loggedInUser"/>
</AuthenticationEndpointRedirectParams>
```

`                             captcha-config.properties                            `
file stored in the
`                             <IS_HOME>/repository/conf/identity                            `
directory.

The following properties have been added.

``` java
#reCaptcha failed redirect urls
#recaptcha.failed.redirect.urls=
```

**Why?**

The properties listed above allow configuring the list of URLs that can
be used for redirection when reCaptcha fails.

`                           scim2-schema-extension.config                          `
file stored in the \<IS\_HOME\>/repository/conf/ directory.

The
`                             EnterpriseUser                            `
attribute name has been changed from what is reflected in the 5.7.0 code
block to the configuration shown in the 5.8.0 code block.

**5.7.0**

``` java
"attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",

"attributeName":"EnterpriseUser",
```

**5.8.0**

``` java
attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",

"attributeName":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
```

**Why?**

This change is done in order to comply with the [SCIM2
specification](https://tools.ietf.org/html/rfc7643#section-3.3). For
more details, see [behavioral change \#1 in the behavioral changes
table](#UpgradingFromanOlderVersionofWSO2IS-1) given above.

`                             identity-event.properties                            `
file stored in the
`                             <IS_HOME>/repository/conf/identity                            `
directory.

  

The password policy error message has been modified as follows.

``` java
passwordPolicy.errorMsg='Password pattern policy violated. Password should contain a digit[0-9], a lower case letter[a-z], an upper case letter[A-Z], and one of !@#$%&* characters'
```

The following handlers have been added.

``` java
module.name.17=SAMLLogoutHandler
SAMLLogoutHandler.subscription.1=SESSION_TERMINATE
SAMLLogoutHandler.enable=true

# To delete registration code in database once the user deletion
module.name.18=confirmationCodesInvalidate
confirmationCodesInvalidate.subscription.1=POST_DELETE_USER
```

**Why?**

These handlers are introduced to support the cross-protocol logout
feature and for migration of existing data publishers to event handlers
that subscribe to authentication events. For more information about
migrating existing data publishers to event handlers, see [Migrating
Data
Publishers](https://docs.wso2.com/display/IS580/Migrating+Data+Publishers)
.  

The following properties were added.

``` java
module.name.14=analyticsLoginDataPublisher
analyticsLoginDataPublisher.subscription.1=AUTHENTICATION_STEP_SUCCESS
analyticsLoginDataPublisher.subscription.2=AUTHENTICATION_STEP_FAILURE
analyticsLoginDataPublisher.subscription.3=AUTHENTICATION_SUCCESS
analyticsLoginDataPublisher.subscription.4=AUTHENTICATION_FAILURE
analyticsLoginDataPublisher.enable=false

module.name.15=analyticsSessionDataPublisher
analyticsSessionDataPublisher.subscription.1=SESSION_CREATE
analyticsSessionDataPublisher.subscription.2=SESSION_UPDATE

analyticsSessionDataPublisher.subscription.3=SESSION_TERMINATE
analyticsSessionDataPublisher.enable=true

module.name.13=authenticationAuditLogger
authenticationAuditLogger.subscription.1=AUTHENTICATION_STEP_SUCCESS
authenticationAuditLogger.subscription.2=AUTHENTICATION_STEP_FAILURE
authenticationAuditLogger.subscription.3=AUTHENTICATION_SUCCESS
authenticationAuditLogger.subscription.4=AUTHENTICATION_FAILURE
authenticationAuditLogger.subscription.5=SESSION_TERMINATE
authenticationAuditLogger.enable=true"

module.name.16=failLoginAttemptValidator
failLoginAttemptValidator.subscription.1=AUTHENTICATION_STEP_FAILURE
failLoginAttemptValidator.enable=true
```

**Why?**

The properties listed above are added to support the event listeners
that were added for migrating data publishers to event handlers. For
more details, see [behavioral change \#3 in the behavioral changes
table](#UpgradingFromanOlderVersionofWSO2IS-3) given above.

`                             identity.xml                            `
file stored in the
`                             <IS_HOME>/repository/conf/identity                            `
directory.

  

  

  

  

  

  

  

  

  

  

  

  

  

The following property has been added to the
`                             IntrospectionDataProvider                            `
interface.

``` java
<Introspection>
    <EnableDataProviders>false</EnableDataProviders>
</Introspection>
```

**Why?**

This property is used to inject additional data to the introspection
response.

The default
`                             CleanUpPeriod                            `
value has been modified to 1440.

``` java
<CleanUpPeriod>1440</CleanUpPeriod>
```

The default value of the following property has been changed from false
to **true**.

``` java
<SignJWTWithSPKey>true</SignJWTWithSPKey>
```

**Why?**

For details about this change, see [behavioral change \#2 in the
behavioral changes table](#UpgradingFromanOlderVersionofWSO2IS-2) given
above.

The following property has been added under the
`                             <SessionDataPersist>                            `
tag.

``` java
<UserSessionMapping>
    <Enable>true</Enable>
</UserSessionMapping>
```

**Why?**

This property enables terminating all the active sessions of a user
during password reset, user deletion, and username renaming.

The following event listeners have been removed.

``` java
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"                name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="true"/>

<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="true"/>

<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.captcha.validator.FailLoginAttemptValidator" orderId="10" enable="true"/>
```

**Why?**

From WSO2 IS 5.8.0 onwards, data publishers are migrated to act as event
handlers that subscribe to authentication events. Hence, the event
listeners listed above have been removed by default. For more details,
see [behavioral change \#3 in the behavioral changes
table](#UpgradingFromanOlderVersionofWSO2IS-3) given above.

The following property has been added.

``` java
<FilterUsersAndGroupsOnlyFromPrimaryDomain>false</FilterUsersAndGroupsOnlyFromPrimaryDomain>
```

**Why?**

Enabling this property filters users or groups only from the PRIMARY
user store, regardless of the Users and Groups endpoints. If it is set
to 'false' it filters users or groups across all user stores.

The following property has been added.

``` java
<MandateDomainForUsernamesAndGroupNamesInResponse>false</MandateDomainForUsernamesAndGroupNamesInResponse>
```

**Why?**

Enabling this property prepends the "PRIMARY/" prefix to the user name
and role name (group name) that belongs to the PRIMARY user store, in
the SCIM2 response regardless of the Users and Groups endpoint. When it
is set to 'false', the "PRIMARY/" prefix will not be prepended. For more
details, see [behavioral change \#4 in the behavioral changes
table](#UpgradingFromanOlderVersionofWSO2IS-4) given above.

The following property has been added.

``` java
<MandateDomainForGroupNamesInGroupsResponse>false</MandateDomainForGroupNamesInGroupsResponse>
```

**Why?**

Enabling this property in the Groups endpoints prepends the "PRIMARY/"
prefix to the role name (group name) that belongs to the PRIMARY user
store. When it is set to 'false', the "PRIMARY/" prefix will not be
prepended. For more details, see [behavioral change \#4 in the
behavioral changes table](#UpgradingFromanOlderVersionofWSO2IS-4) given
above.

The following properties have been added under the
`                             <Server>                            ` tag.

``` java
<!--This configuration is used to define the Service Provider name regex in DCR and IdentityApplicationManagementService-->
    <!--<ServiceProviders>-->
        <!--<SPNameRegex>^[a-zA-Z0-9._-]*$</SPNameRegex>-->
    <!--</ServiceProviders>-->
```

The following properties have been added under the
`                            <OAuth>                           ` tag.

``` java
<!-- If enabled, resident Idp entity id will be honoured as the issuer location in OpenId Connect Discovery -->
        <UseEntityIdAsIssuerInOidcDiscovery>true</UseEntityIdAsIssuerInOidcDiscovery>
```

The UMA grant type has been added as a supported grant type under the
`                             <SupportedGrantTypes>                            `
tag.

``` java
<!-- Supported versions: IS 5.7.0 onwards.-->
<SupportedGrantType>
    <GrantTypeName>urn:ietf:params:oauth:grant-type:uma-ticket</GrantTypeName>
    <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth.uma.grant.UMA2GrantHandler</GrantTypeHandlerImplClass>
    <GrantTypeValidatorImplClass>org.wso2.carbon.identity.oauth.uma.grant.GrantValidator</GrantTypeValidatorImplClass>
</SupportedGrantType>
```

The following properties have been added under the
`                             <OAuth>                            ` tag.

``` java
<!-- Configurations for JWT bearer grant. Supported versions: IS 5.8.0 onwards. -->
<JWTGrant>
    <!-- Validate issued at time (iat) of JWT token. The validity can be set using 'IATValidity' configuration.
             Default value is 'true'.
             -->
    <EnableIATValidation>true</EnableIATValidation>
    <!-- Reject the JWT if the iat of JWT is pass a certain time period. Time period is in minutes.
             'EnableIATValidation' configuration should be set to 'true' in order to make use of the validity 
             period.
             Default value is '30' minutes.
             -->
    <IATValidityPeriod>30</IATValidityPeriod>
</JWTGrant>
```

The following properties have been added under the
`                             <OpenIDConnect>                            `
tag.

``` java
<!-- Add tenant domain to 'realm' claim of ID Token-->
<AddTenantDomainToIdToken>false</AddTenantDomainToIdToken>
<!-- Add userstore domain to 'realm' claim of ID Token-->
<AddUserstoreDomainToIdToken>false</AddUserstoreDomainToIdToken>
```

The following properties have been added under the
`                             <OAuth>                            ` tag.

``` java
<!--Configuration provides the ability to renew the access token and the refresh token(where applicable) per each token request and revoke previously available active token for a matching clientid, user and scopes combination.
Not applicable for refresh token grant type and when when self-contained access tokens are used.
Default value : false
Supported versions : IS 5.8.0 onwards -->
<!--<RenewTokenPerRequest>true</RenewTokenPerRequest>-->

<!--By enabling this property, in a logout request if the opbs cookie or a valid session does not exist instead of showing the invalid request error page the user will be redirected to the successfully logged out page of the IS or if a valid id_token_hint and a valid post_logout_redirect_uri is available user will be redirected to the post_logout_redirect_uri-->
<HandleAlreadyLoggedOutSessionsGracefully>false</HandleAlreadyLoggedOutSessionsGracefully>
```

The following properties have been added under the
`                             <SSOService>                            `
tag.

``` java
<ArtifactResolutionEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlartresolve</ArtifactResolutionEndpoint>
<SAMLECPEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlecp</SAMLECPEndpoint>
```

**Why?**

These properties allow adding the Artifact URL as a Resident IDP
property in the WSO2 IS management console.

The following properties have been added under the \<SCIM2\> tag.

``` java
<!--<ComplexMultiValuedAttributeSupportEnabled>true</ComplexMultiValuedAttributeSupportEnabled>-->
<!--<EnableFilteringEnhancements>true</EnableFilteringEnhancements>-->
```

**Why?**

The
`                             <EnableFilteringEnhancements>                            `
property was introduced for the purpose of applying filtering
enhancements for SCIM2 filter results. Enabling this ensures that the Eq
filter strictly checks for a string match (in this case cross user store
search should not be performed). This configuration also enforces
consistency on the filtered attribute formats in the response when
filtering is done via different endpoints. e.g. Users and Groups
endpoints.

The following properties have been added under the
`                             <Recovery>                            `
tag.

``` java
 <ReCaptcha>
    <Password>
        <Enable>false</Enable>
    </Password>
    <Username>
        <Enable>false</Enable>
    </Username>
</ReCaptcha>
<CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
```

**Why?**

This configuration block is used to enable ReCaptcha verification for
password recovery and username recovery.

The following property have been added under the
`                             <SelfRegistration>                            `
tag.

``` java
<CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
```

**Why?**

This property enables configuring a regex pattern for the callback URLs
of the account recovery and self registration APIs. The callbackURL
included in the requests is then validated with the configured regex
pattern.

The following new event listener has been added under the
`                             <EventListeners>                            `
tag.

``` java
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
                       name="org.wso2.carbon.identity.data.publisher.oauth.listener.OAuthTokenIssuanceLogPublisher"
                       orderId="12" enable="false">
                      <Property name="Log.Token">false</Property>
</EventListener>

<EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                       name="org.wso2.carbon.identity.mgt.listener.UserSessionTerminationListener"
                       orderId="85" enable="true"/>

<EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                       name="org.wso2.carbon.user.mgt.listeners.UserClaimsAuditLogger"
                       orderId="9" enable="false"/>
```

**Why?**

`                             AbstractIdentityHandler                            `
- Enabling this listener logs the audit data for OAuth token issuance
and token introspection. Adding this property allows you to disable
logging, else if this property is not present in the configuration file,
logging is enabled by default. For more information about auditing, see
[OAuth Transaction
Logs](https://docs.wso2.com/display/IS580/OAuth+Transaction+Logs).

`                             UserOperationEventListener                            `
- This event listener is used to support session termination at the
point renaming the username.

`                             UserOperationEventListener                            `
- This event listener allows adding claims to the audit logs.

The following caches have been added under the
`                             <CacheManager name="IdentityApplicationManagementCacheManager">                            `
tag.

``` java
<Cache name="JWKSCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
<Cache name="ServiceProviderCache.ID" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
<Cache name="ServiceProvideCache.InboundAuth" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
```

**Why?**

`                             JKWSCache                            ` -
This property has been added to support JWKS Endpoint Cache
invalidation.

`                             ServiceProviderCache.ID                            `
and
`                             ServiceProvideCache.InboundAuthKey                            `
- These two properties have been added in order to cache the service
provider against the ID and inboundAuth. If these new properties is not
present in the configuration file, the configuration value of the
`                             ServiceProviderCache                            `
is applied for these caches.

The following resources have been added under the \<
`                             ResourceAccessControl>                            `
tag.

``` java
<Resource context="(.*)/api/identity/config-mgt/v1.0/search(.*)" secured="true" http-method="GET">
    <Permissions>/permission/admin/manage/identity/configmgt/list</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type/(.*)" secured="true" http-method="GET"/>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type/(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="GET"/>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)/(.*)" secured="true" http-method="GET"/>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)/(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
</Resource>
```

**Why?**

These resources control access to the configuration management resources
in WSO2 IS.

The resource context
`                             /scim2/ResourceType                            `
to
`                             /scim2/ResourceTypes                            `
found under the
`                             <ResourceAccessControl>                            `
tag has been modified as shown below.

``` java
<Resource context="/scim2/ResourceTypes" secured="false" http-method="all">
```

**Why?**

This change is done in order to comply with the [SCIM2
specification](https://tools.ietf.org/html/rfc7643#section-3.3).

The following resource found under the \<
`                             ResourceAccessControl>                            `
tag has been removed.

``` java
<Resource context="(.*)/api/identity/auth/(.*)" secured="true" http-method="all"/>
```

**Why?**

This change has been made in order to remove protection for the
`                             /api/identity/auth/v1.2/authenticate                            `
API. This is because the API itself authenticates the user.

The following resources have been added under the \<
`                             ResourceAccessControl>                            `
tag.

``` java
<Resource context="(.*)/api/identity/auth/v1.2/data(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/auth/v1.2/context(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/template/mgt/v1.0.0/(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/user/v1.0/update-username(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
</Resource>
```

**Why?**

These resources have been added to secure the
`                             update-username                            `
API.

The following properties have been added under the
`                             <Server>                            `
tag..

``` java
<!--Intermediate certificate validation for certificate based requests-->
<IntermediateCertValidation enable="false">
    <IntermediateCerts>
        <!--Add intermediate certificate CN. Multiple <CertCN> elements can be used for multiple certificates.-->
        <CertCN>localhost</CertCN>
    </IntermediateCerts>
    <ExemptContext>
        <!--Add exemptable context paths. Multiple <Context> elements can be used for multiple contexts.-->
        <Context>scim2</Context>
    </ExemptContext>
</IntermediateCertValidation>
<!--This is the separator that use to separate multiple roles in the role claim value coming from IDP side-->
<FederatedIDPRoleClaimValueAttributeSeparator>,</FederatedIDPRoleClaimValueAttributeSeparator>
<!--This configuration is used for X509 Certificate based authentication. -->
<!--<X509>-->
<!--During ssl termination at LB, the X509 certificate is passed over the HTTP header. This configuration
        provides the facility to configure HTTP request header name which is configured at LB.  -->
<!--<X509RequestHeaderName>X-SSL-CERT</X509RequestHeaderName>-->
<!--</X509>-->
<!-- This configuration specifies the claims that should be logged to "audit.log" upon changes. -->
<!--<LoggableUserClaims>-->
<!--<LoggableUserClaim>http://wso2.org/claims/identity/accountLocked</LoggableUserClaim>-->
<!--<LoggableUserClaim>http://wso2.org/claims/role</LoggableUserClaim>-->
<!--</LoggableUserClaims>-->
<!--Configuration Store properties-->
<ConfigurationStore>
    <!--Set an upper limit to the database call queries. Configuration store uses dynamic query generation,
        specially for searching resources. This property will prevent any unwanted errors due to too large queries.
        Default value is the maximum packet size for MySQL 5.7 in bytes.-->
    <MaximumQueryLength>4194304</MaximumQueryLength>
</ConfigurationStore>
```

`                           jaas.conf                          ` file
stored in the
`                           <IS_HOME>/repository/conf/identity                          `
directory.

The value of the following property value has been corrected from
'tfalse' to 'false'.

``` java
useKeyTab=false
```

`                             Webapp-classloading-environments.xml                            `
file stored in the
`                             <IS_HOME>/repository/conf/                            `
directory.

The following ExclusiveEnvironment has been added under the
`                             <Classloading>                            `
tag.

``` java
<ExclusiveEnvironments>
        <ExclusiveEnvironment>
            <Name>CXF3</Name>
            <Classpath>${carbon.home}/lib/runtimes/cxf3/*.jar;${carbon.home}/lib/runtimes/cxf3/</Classpath>
        </ExclusiveEnvironment>
    </ExclusiveEnvironments>
```

`                           carbon.xml                          ` file
stored in the
`                           <IS_HOME>/repository/conf                          `
directory.

The following properties related to the tenant deletion feature have
been added under the
`                             <Server> <Tenant>                            `
tag.

``` java
<!-- Flag to enable or disable tenant deletion. By default tenant deletion is enabled-->
<TenantDelete>true</TenantDelete>
<!-- Configurations related to listener invocation by tenant admin service-->
<ListenerInvocationPolicy>
    <!-- Flag to enable or disable listener invocation on tenant delete. This is disabled by default-->
    <InvokeOnDelete>false</InvokeOnDelete>
</ListenerInvocationPolicy>
```

The following property has been added under the
`                             <Server>                            ` tag.

``` java
<!--EnablePasswordTrim>false</EnablePasswordTrim--> 
```

The following property has been added.

``` java
<ForceLocalCache>true</ForceLocalCache>
```

**Why?**

Enabling this property forces all the caches to behave as local caches.
It is required to enable this in order to have cache invalidation in
between the IS nodes in a clustered enviornment. For more details, see
[behavioral change \#5 in the behavioral changes
table](#UpgradingFromanOlderVersionofWSO2IS-6) given above.

`                           claim-config.xml                          `
file stored in the
`                           <IS_HOME>/repository/conf                          `
directory.

The AttributeID of the
`                                                           http://wso2.org/claims/resourceType                                                         `
claim has been modified to "resourceType".

``` java
<AttributeID>resourceType</AttributeID>
```

The RegEx of the
`                                                           http://wso2.org/claims/phoneNumbers                                                         `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The RegEx of the
`                             urn:scim:schemas:core:1.0:phoneNumbers                            `
claim has been modified as follows.  

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The AttributeID of the claim
`                             urn:ietf:params:scim:schemas:core:2.0:meta.resourceType                            `
claim has been modified to "resourceType" instead of "userType".

``` java
<AttributeID>resourceType</AttributeID>
```

**Why?**

The value "Ref" is reserved in open LDAPs for referrals. Therefore, this
attributeID was modified to avoid the errors when using Active Directory
open LDAPs.

The RegEx of the
`                             urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers                            `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The Regex of the
`                             urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.mobile                            `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The RegEx of the
`                             urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.home                            `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>  
```

The RegEx of the
`                             urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.work                            `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The RegEx of the
`                             urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.other                            `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

**Why?** The d efault regular expression values for phone numbers were
modified in the claim-config.xml file in order to recognize US and
Canadian numbers with the extension code as well.

`                           log4j.properties                          `
file stored in the
`                           <IS_HOME>/repository/conf                          `
directory.

The following properties have been added.

``` java
log4j.logger.TRANSACTION_LOGGER=INFO, TRANSACTION_LOGGER

log4j.appender.TRANSACTION_LOGGER=org.apache.log4j.FileAppender
log4j.appender.TRANSACTION_LOGGER.File=${carbon.home}/repository/logs/transaction.log
log4j.appender.TRANSACTION_LOGGER.Append=true
log4j.appender.TRANSACTION_LOGGER.layout=org.apache.log4j.PatternLayout
log4j.appender.TRANSACTION_LOGGER.layout.ConversionPattern=[%d] - %m %n
log4j.appender.TRANSACTION_LOGGER.threshold=INFO
log4j.additivity.TRANSACTION_LOGGER=false


# Appender config to put correlation Log.
log4j.logger.correlation=INFO, CORRELATION
log4j.additivity.correlation=false
log4j.appender.CORRELATION=org.apache.log4j.RollingFileAppender
log4j.appender.CORRELATION.File=${carbon.home}/repository/logs/${instance.log}/correlation.log
log4j.appender.CORRELATION.MaxFileSize=10MB
log4j.appender.CORRELATION.layout=org.apache.log4j.PatternLayout
log4j.appender.CORRELATION.Threshold=INFO
log4j.appender.CORRELATION.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS}|%X{Correlation-ID}|%t|%m%n
```

`                           user-mgt.xml                          ` file
stored in the
`                           <IS_HOME>/repository/conf                          `
directory.

The following properties have been added under the
`                             <UserManager> <Realm> <Configuration>                            `
tag.

``` java
<!-- Enable username claim retrieve from the UM_USER_NAME in JDBC datasources -->
<OverrideUsernameClaimFromInternalUsername>true</OverrideUsernameClaimFromInternalUsername
```

The following property has been under under the
`                             JDBCUserStoreManager                            `
configuration block.

``` java
<Property name="LeadingOrTrailingSpaceAllowedInUserName">false</Property>
```

The value of the
`                             <UserNameListFilter>                            `
property under the
`                             ReadOnlyLDAPUserStoreManager                            `
configuration block has been modified to the value given below.

``` java
(&amp;(objectClass=person)(!(sn=Service)))
```

The value of the
`                             <UserNameListFilter>                            `
property under the
`                             ActiveDirectoryUserStoreManager                            `
and
`                             ReadWriteLDAPUserStoreManager                            `
configuration blocks has been modified as follows.

``` java
(&amp;(objectClass=user)(!(sn=Service)))
```

The following property has been added under the
`                             ActiveDirectoryUserStoreManager                            `
and the
`                             ReadWriteLDAPUserStoreManager                            `
configuration blocks.

``` java
<Property name="StartTLSEnabled">false</Property>
```

**Recommended:** See the [WSO2 IS 5.8.0 migration
guide](_Upgrading_from_the_Previous_Release_) for more information.

Replace the `               <NEW_IS_HOME>/repository/conf              `
folder with the modified copy of the
`               <OLD_IS_HOME>/repository/conf              ` folder.

Proceed to the [Migrating the
data](#UpgradingFromanOlderVersionofWSO2IS-Migratingthedata) section to
run the migration client.

### Migrating the custom components

Any custom OSGI bundles which were added manually should be recompiled
with new dependency versions that are relevant to the new WSO2 IS
version. All custom OSGI components reside in the
`         <OLD_IS_HOME>/repository/components/dropins        `
directory.

Get the source codes of the custom OSGI components located in the
`          dropins         ` directory.  

Change the dependency versions in the relevant POM files according to
the WSO2 IS version that you are upgrading to, and compile them. The
compatible dependency versions for each release of WSO2 IS is given
below.

-   `                         WSO2 Identity Server 5.1.0                       `

-   `                         WSO2 Identity Server 5.2.0                                   `

-   `                         WSO2 Identity Server 5.3.0                                   `

-   `                         WSO2 Identity Server 5.4.0                                   `

-   `                         WSO2 Identity Server 5.5.0                       `

-   [WSO2 Identity Server
    5.6.0](https://github.com/wso2/product-is/blob/v5.6.0/pom.xml)

-   [WSO2 Identity Server
    5.7.0](https://github.com/wso2/product-is/blob/v5.7.0/pom.xml)

If you come across any compile time errors, refer to the WSO2 IS code
base and make the necessary changes related to that particular component
version.

Add the compiled JAR files to the
`           <NEW_IS_HOME>/repository/components/dropins          `
directory.

If there were any custom OSGI components in
`           <OLD_IS_HOME>/repository/components/lib          `
directory, add newly compiled versions of those components to the
`           <NEW_IS_HOME>/repository/components/lib          `
directory.

### Migrating the data

To upgrade the version of WSO2 Identity Server, the user store database
should be upgraded. Note that there are no registry schema changes
between versions.

Follow the steps below as needed to complete the migration process.

Download the latest version of WSO2 Identity Server and unzip it in the
`         <NEW_IS_HOME>        ` directory.

1.  Take a backup of the existing database used by the
    `          <OLD_IS>.         ` This backup is necessary in case the
    migration causes issues in the existing database.  
    Make the following database updates as indicated below.  
    1.  Download the [migration
        resources](https://docs.wso2.com/download/attachments/56986329/wso2is-5.8.0-migration.zip?version=1&modificationDate=1557719865000&api=v2)
        and unzip it to a local directory. This folder is referred to as
        `             <IS5.x.x_MIGRATION_TOOL_HOME>            ` .

    2.  Navigate to the `             migration-service            `
        directory. Change the build version of the .pom file to the
        version of WSO2 Identity Server that you want to upgrade to, and
        build it.

    3.  Copy the
        `             org.wso2.carbon.is.migration-5.x.x.jar            `
        and the `             snakeyaml-1.16.0.wso2v1.jar            `
        found in the
        `             <IS5.x.x_MIGRATION_TOOL_HOME>            ` folder,
        and paste it in the
        `             <NEW_IS_HOME>/repository/components/dropins            `
        directory.

    4.  Copy migration-resources folder to the
        `             <NEW_IS_HOME>            ` root folder.

    5.  Set the following property values accordingly in the
        `             migration-config.yaml            ` file found in
        the `             <NEW_IS_HOME>/migration-resources            `
        folder. Specify the current WSO2 Identity Server version as the
        `             currentVersion            ` value and specify the
        new version of WSO2 Identity Server that you want to migrate to,
        as the `             migrateVersion            ` .

        !!! tip
        
                If your current version of WSO2 Identity Server is 5.4.1, set
                the value of the `             currentVersion            `
                parameter to 5.4.0 in the
                `             migration-config.yaml            ` instead. This
                is because data migration is not required when migrating from
                5.4.0 to 5.4.1.
        

        ``` java
        migrationEnable: "true"

        currentVersion: "5.x.x"

        migrateVersion: "5.x.x"
        ```

2.  Copy any custom OSGI bundles that were added manually from the
    `          <OLD_IS_HOME>/repository/components/dropins         `
    folder and paste it in the
    `          <NEW_IS_HOME>/repository/components/dropins         `
    folder.
3.  Copy any added JAR files from the
    `           <OLD_IS_HOME>/repository/components/lib          `
    folder and paste it in the
    `           <NEW_IS_HOME>/repository/components/lib          `
    folder.

4.  Copy the `           .jks          ` files from the
    `           <OLD_IS_HOME>/repository/resources/security          `
    folder and paste them in
    `           <NEW_IS_HOME>/repository/resources/security          `
    folder.

5.  If you have created tenants in the previous WSO2 Identity Server
    version and if there are any resources in the
    `          <OLD_IS_HOME>/repository/tenants         ` directory,
    copy the content to the
    `          <NEW_IS_HOME>/repository/tenants         ` directory.
6.  If you have created secondary user stores in the previous WSO2 IS
    version, copy the content in the
    `           <OLD_IS_HOME>/repository/deployment/server/userstores          `
    directory to the
    `           <NEW_IS_HOME>/repository/deployment/server/userstores          `
    directory.

    !!! tip
    
        **Note:** If your current version is 5.0.0, run the following
        queries on the database that is referenced in the
        `           identity.xml          ` file in order to identify if
        there is any corrupted data.
    
        ``` java
            SELECT * FROM IDN_OAUTH2_ACCESS_TOKEN WHERE AUTHZ_USER LIKE '% @%' AND TOKEN_STATE='ACTIVE';
            SELECT * FROM IDN_OAUTH2_ACCESS_TOKEN WHERE AUTHZ_USER NOT LIKE '%@%' AND TOKEN_STATE='ACTIVE';
    ```


7.  Start WSO2 Identity Server with the following command to perform the
    data migration for all components.

    1.  Linux/Unix:

        ``` bash
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    2.  Windows:

        ``` bash
                wso2server.bat -Dmigrate -Dcomponent=identity
        ```

8.  Once the migration is successful, stop the server and remove the
    following files and folders from the
    `           <NEW_IS_HOME>/repository/components/dropins          `
    directory.

    1.  `             org.wso2.carbon.is.migration-5.x.x.jar            `

    2.  `             snakeyaml-1.16.0.wso2v1.jar            `

    3.  `             migration-resources            ` directory
