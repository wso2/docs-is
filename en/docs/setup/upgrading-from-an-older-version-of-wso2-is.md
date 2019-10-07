# Upgrading From an Older Version of WSO2 IS

The following sections provide instructions that enable you to upgrade
from older versions of WSO2 Identity Server (from version 5.0.0 onwards)
to the latest version of WSO2 Identity Server. In this topic,
`         <OLD_IS_HOME>        ` is the directory that the older version
of WSO2 Identity Server resides in, and `         <NEW_IS_HOME>        `
is the directory that the latest version of WSO2 Identity Server resides
in.

!!! tip "Before you begin"    
    This release is a WUM-only release. This means that there are no manual
    patches. Any further fixes or latest updates for this release can be
    updated through WSO2 Update Manager (WUM).
    
    -   **If you are upgrading to use this version in your production
        environment** , use the WSO2 Update Manager to get the latest
        updates available for WSO2 IS. For more information on how to do
        this, see [Updating WSO2
        Products](https://docs.wso2.com/display/ADMIN44x/Updating+WSO2+Products)
        .  

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

#### Migrating by updating the custom configurations

!!!info 
    This approach is recommended if you have done very few configuration changes in your previous
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

#### Migrating by updating the new configurations in 5.8.0**

!!!info 
    This approach is recommended if: 

    -   You have done many configuration changes in your previous version of WSO2 IS.     
    
    -   These configurations have not been tracked completely and/or are difficult to redo.

**Steps:**

1. Make a copy of the
`              <OLD_IS_HOME>/repository/conf             ` folder. (Do
not change the original configurations. You may use it as a backup in
case there are any issues)

2. Copy the `               health-check-config.xml              ` file
from the `               <NEW_IS_HOME>/repository/conf              `
directory and paste it in the copy of the
`               <OLD_IS_HOME>/repository/conf              ` directory.

3. Copy the `               wso2-log-masking.properties              ` file
from the `               <NEW_IS_HOME>/repository/conf              `
directory and paste it in the copy of the
`               <OLD_IS_HOME>/repository/conf              ` directory.

4. Following are all the configuration changes from IS 5.0.0 to
IS 5.8.0. You can change the
relevant configurations according to the features you are using. 

    !!! note    
        The configuration changes listed below will not affect the existing
        system because these configurations are applied only at first start up
        and new tenant creation.
        If you want to change the configurations for the existing tenants,
        configure it through the management console user interface.

    

    ??? abstract "From WSO2 IS 5.0.0 to 5.1.0" 

        ??? info "Configuration changes"     
            <table>
            <thead>
            <tr class="header">
            <th>Configuration File</th>
            <th>Configuration Change</th>
            </tr>
            </thead>
            <tbody>
            <tr class="odd">
            <td><a href="https://docs.wso2.com/display/Carbon430/Configuring+axis2.xml">axis2.xml</a> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/axis2/                          </code> directory.</td>
            <td>The following new parameter was added: <code>                           <parameter name="httpContentNegotiation">true</parameter>                          </code> . When this is set to 'true' , the server will determine the contentType of responses to requests, by using the 'Accept header' of the request.</td>
            </tr>
            <tr class="even">
            <td>identity.xml file stored in the <code>                           <PRODUCT_HOME>/repository/conf/identity                          </code> directory.</td>
            <td><ol>
            <li>The <code>                             <TimeConfig>                            </code> element was added. This element contains a global session timeout configuration. To configure session timeouts and remember me periods tenant wise, see <a href="https://docs.wso2.com/display/IS510/Configuring+Session+Timeout">Configuring Session Timeout</a> .</li>
            <li>The <code>                             <SessionTimeout>                            </code> parameter under the <code>                             <OpenID>                            </code> element and the <code>                             <SSOService>                            </code> element was removed. This configuration is no longer a constant across all service providers. With Identity Server 5.1.0, you can define the session timeout and remember me period tenant wise using the management console. For more information on how to do this, see <a href="https://docs.wso2.com/display/IS510/Configuring+Session+Timeout">Configuring Session Timeout</a> .</li>
            </ol></td>
            </tr>
            <tr class="odd">
            <td>tenant-axis2.xml stored in the <code>                           <PRODUCT_HOME>/repository/conf/tomcat/                          </code> directory.</td>
            <td>The default value for the "httpContentNegotiation" parameter is set to 'true': <code>                           <parameter name="httpContentNegotiation">true</parameter>                          </code> .</td>
            </tr>
            <tr class="even">
            <td><a href="https://docs.wso2.com/display/Carbon430/Configuring+catalina-server.xml">catalina-server.xml</a> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/tomcat/                          </code> directory.</td>
            <td><div class="content-wrapper">
            <ol>
            <li><p>Keystore parameters was added under the <code>                               <Connector>                              </code> element as shown below. This setting allows you to use separate keystore and security certificates to certify SSL connections. Note that the location and password of the default " wso2carbon.jks" keystore is given for these parameters by default.</p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1">keystoreFile=location of the keystore file</a>
            <a class="sourceLine" id="cb1-2" title="2">keystorePass=password for the keystore </a></code></pre></div>
            </div>
            </div></li>
            <li>The ciphers parameter under the <code>                              <Connector>                             </code> element was removed. Depending on the java version you are using, you can define ciphers using the <a href="https://docs.wso2.com/display/Carbon443/Configuring+Transport+Level+Security">Configuring Transport Level Security</a> page as a guide.</li>
            <li>The clientAuth parameter setting under the <code>                              <Connector>                             </code> element was changed from <code>                              clientAuth="false"                             </code> to <code>                              clientAuth="want"                             </code> . Setting this parameter to false makes the two-way SSL authentication optional and uses it in instances when it is possible i.e., if you need to disable the certification authentication in certain occasions (e.g., mobile applications). This is recommended since setting it to 'false' will simply disable certificate authentication completely and not use it even when it is possible.<br />
            </li>
            <li>The <code>                              <Host>                             </code> element was removed. It was a dded to fix XSS and CSRF vulnarabilities in WSO2-CARBON-PATCH-4.2.0-1256. For information on how to fix these vulnerabilities in IS 5.1.0, see the following pages:
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
            <td><a href="https://docs.wso2.com/display/Carbon430/Configuring+master-datasources.xml">master-datasources.xml</a> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/datasources/                          </code> directory.</td>
            <td>Default auto-commit setting for a data source is set to false: <code>                           <defaultAutoCommit>false</defaultAutoCommit>                          </code> .</td>
            </tr>
            <tr class="even">
            <td><a href="https://docs.wso2.com/display/Carbon430/Configuring+carbon.xml">carbon.xml</a> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/                          </code> directory.</td>
            <td><div class="content-wrapper">
            <ol>
            <li><p>New parameters to define proxy context path as shown below;<br />
            </p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw"><MgtProxyContextPath></MgtProxyContextPath></span></a>
            <a class="sourceLine" id="cb2-2" title="2"><span class="kw"><ProxyContextPath></ProxyContextPath></span></a></code></pre></div>
            </div>
            </div>
            <p>Proxy context path is a useful parameter to add a proxy path when a Carbon server is fronted by reverse proxy. In addition to the proxy host and proxy port this parameter allows you add a path component to external URLs. See <a href="https://docs.wso2.com/display/Carbon430/Adding+a+Custom+Proxy+Path">Adding a Custom Proxy Path</a> for details.</p></li>
            <li><p>The following port configurations was removed:<br />
            </p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="co"><!-- Embedded Qpid broker ports →</span></a>
            <a class="sourceLine" id="cb3-2" title="2"><span class="co"><EmbeddedQpid></span></a>
            <a class="sourceLine" id="cb3-3" title="3"><span class="co"><!</span><span class="er">--</span><span class="co"> Broker TCP Port →</span></a>
            <a class="sourceLine" id="cb3-4" title="4"><span class="co"><BrokerPort>5672</BrokerPort></span></a>
            <a class="sourceLine" id="cb3-5" title="5"><span class="co"><!</span><span class="er">--</span><span class="co"> SSL Port →</span></a>
            <a class="sourceLine" id="cb3-6" title="6"><span class="co"><BrokerSSLPort>8672</BrokerSSLPort></span></a>
            <a class="sourceLine" id="cb3-7" title="7"><span class="co"></EmbeddedQpid></span></a></code></pre></div>
            </div>
            </div></li>
            <li><p>In Carbon 4.2.0, the following registry keystore configuration was required for configuring the keystore keys that certify encrypting/decrypting meta data to the registry. From Carbon 4.3.0 onwards the primary keystore configuration shown below will be used for this purpose as well. Therefore, it is not necessary to use a separate registry keystore configuration for encrypting/decrypting meta data to the registry. Read more about <a href="https://docs.wso2.com/display/Carbon430/Configuring+Keystores+in+WSO2+Products">keystore configurations in Carbon 4.3.0</a> .<br />
            </p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw"><RegistryKeyStore></span></a>
            <a class="sourceLine" id="cb4-2" title="2">            <span class="co"><!-- Keystore file location--></span></a>
            <a class="sourceLine" id="cb4-3" title="3">            <span class="kw"><Location></span>${carbon.home}/repository/resources/security/wso2carbon.jks<span class="kw"></Location></span></a>
            <a class="sourceLine" id="cb4-4" title="4">            <span class="co"><!-- Keystore type (JKS/PKCS12 etc.)--></span></a>
            <a class="sourceLine" id="cb4-5" title="5">            <span class="kw"><Type></span>JKS<span class="kw"></Type></span></a>
            <a class="sourceLine" id="cb4-6" title="6">            <span class="co"><!-- Keystore password--></span></a>
            <a class="sourceLine" id="cb4-7" title="7">            <span class="kw"><Password></span>wso2carbon<span class="kw"></Password></span></a>
            <a class="sourceLine" id="cb4-8" title="8">            <span class="co"><!-- Private Key alias--></span></a>
            <a class="sourceLine" id="cb4-9" title="9">            <span class="kw"><KeyAlias></span>wso2carbon<span class="kw"></KeyAlias></span></a>
            <a class="sourceLine" id="cb4-10" title="10">            <span class="co"><!-- Private Key password--></span></a>
            <a class="sourceLine" id="cb4-11" title="11">            <span class="kw"><KeyPassword></span>wso2carbon<span class="kw"></KeyPassword></span></a>
            <a class="sourceLine" id="cb4-12" title="12"><span class="kw"></RegistryKeyStore></span></a></code></pre></div>
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
            <div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb5-1" title="1"><span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"isCascadeDeleteEnabled"</span><span class="kw">></span>true<span class="kw"></Property></span></a></code></pre></div>
            </div>
            </div>
            <p>The following properties under the <UserStoreManager> tag were changed as follows:</p>
            <ul>
            <li>The <code>                              <BackLinks                                                             Enabled>                                                           </code> property was added. If this property is set to 'true', it enables an object that has a reference to another object to inherit the attributes of the referenced object.</li>
            <li><p>The following property was added. It provides flexibility to customize the error message.<br />
            </p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb6-1" title="1"><span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"UsernameJavaRegExViolationErrorMsg"</span><span class="kw">></span>Username pattern policy violated<span class="kw"></Property></span></a>
            <a class="sourceLine" id="cb6-2" title="2">            <span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"PasswordJavaRegEx"</span><span class="kw">></span>^[\S]{5,30}$<span class="kw"></Property></span></a></code></pre></div>
            </div>
            </div></li>
            <li><p>The < IsBulkImportSupported> property was added. It specifies whether to enable or disable bulk user import.</p></li>
            <li><p>The following properties were added. They provide flexibility to customize the connection pooling parameters.</p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb7-1" title="1"><span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"ConnectionPoolingEnabled"</span><span class="kw">></span>false<span class="kw"></Property></span></a>
            <a class="sourceLine" id="cb7-2" title="2">            <span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"LDAPConnectionTimeout"</span><span class="kw">></span>5000<span class="kw"></Property></span></a>
            <a class="sourceLine" id="cb7-3" title="3">            <span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"ReadTimeout"</span><span class="kw">/></span></a>
            <a class="sourceLine" id="cb7-4" title="4">            <span class="kw"><Property</span><span class="ot"> name=</span><span class="st">"RetryAttempts"</span><span class="kw">/></span></a></code></pre></div>
            </div>
            </div></li>
            </ul>
            </div></td>
            </tr>
            <tr class="even">
            <td><a href="https://docs.wso2.com/display/Carbon430/Configuring+registry.xml">registry.xml</a> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/                          </code> directory.</td>
            <td>The default value was changed to 'false' for the following setting: <code>                           <versionResourcesOnChange>false</versionResourcesOnChange>                          </code> .</td>
            </tr>
            <tr class="odd">
            <td>authenticators.xml file stored in the <code>                           <PRODUCT_HOME>/repository/conf/security                          </code> directory.</td>
            <td><div class="content-wrapper">
            <p>The following parameter was added under the <Authenticator> element to specify the AssertionConsumerServiceURL. This is an optional parameter and is used by the requesting party to build the request. For more information, see <a href="https://docs.wso2.com/display/IS510/How+To%3A+Login+to+WSO2+Products+via+Identity+Server#HowTo:LogintoWSO2ProductsviaIdentityServer-Authenticatorsconfiguration">Authenticators Configuration</a> .<br />
            <br />
            </p>
            <div class="code panel pdl" style="border-width: 1px;">
            <div class="codeContent panelContent pdl">
            <div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb8-1" title="1"><span class="kw"><Parameter</span><span class="ot"> name=</span><span class="st">"AssertionConsumerServiceURL"</span><span class="kw">></span>https://localhost:9443/acs<span class="kw"></Parameter></span></a></code></pre></div>
            </div>
            </div>
            </div></td>
            </tr>
            </tbody>
            </table>

        ??? info "API changes"
            This section describes changes made to admin services in IS
            5.1.0 that may affect your migration depending on your client's usage
            of the admin service.

            Removed authorization and changed input parameters of the
            `                                                   changePasswordByUser                                                 `
            operation exposed through the [userAdmin
            service](https://localhost:9443/services/UserAdmin?wsdl) .

            <b>Changes to the changePasswordByUser operation</b>
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

        !!! tip 
            For more information, see the [WSO2 IS 5.1.0 migration guide](https://docs.wso2.com/display/IS510/Upgrading+from+the+Previous+Release).
            
        !!! Note 
            Following files located in the
            `                    <IS_HOME>/repository/conf/                   `
            folder in 5.0.0 have been moved to the
            `                    <IS_HOME>/repository/conf/                                         identity/                                       `
            folder in 5.1.0 onwards:

            -   `                      provisioning-config.xml                     `

            -   `                     identity.xml                    `
            -   `                     /security/identity-mgt.properties                    `


    ??? abstract "From WSO2 IS 5.1.0 to 5.2.0" 

        ??? info "Behavioral changes"    
            Due to a fix done in this release, the effective default value of the system property `org.apache.xml.security.ignoreLineBreaks` has been changed from “true” to “false”. Due to this change, you will observe line breaks in SAML responses.     
            However, if the SAML response consuming client applications have used a standard library such as OpenSAML and use canonicalization when
            processing the response, this should not cause any problems. Therefore, our recommendation is to use a standard library to process SAML
            responses on consuming applications.     
            If you have any concerns about this behavioral change or if the SAML response consuming client applications does not use canonicalization
            when processing the response and the client cannot be updated to do so, add the following jvm parameter to the server startup script located in
            the `<IS_HOME>/bin/` folder to revert back to the previous behavior.     
            ``` java
            -Dorg.apache.xml.security.ignoreLineBreaks=true
            ```


        ??? info "Configuration changes" 
            <table>
                <thead>
                    <tr class="header">
                        <th>Configuration File</th>
                        <th>Changes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                             <div class="content-wrapper">
                                <p><code>oidc-scope-config.xml</code>> file  in the <code><PRODUCT_HOME>/repository/conf/identity/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                             <div class="content-wrapper">
                                <p>The following configuration file was added to enable grouping claims that are bound to a scope value in OpenID Connect (OIDC). Whenrequesting for an OIDC token, you can specify a scope value that is bound to a set of claims in the <code>oidc-scope-config.xml</code> file. When sending that OIDC token to the userinfo endpoint, only the claims that are common to both the oidc-scope-config and the service provider claim configuration, will be returned.</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>identity-mgt.properties</code> file stored in the <code><PRODUCT_HOME>/repository/conf/dentity/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following parameters were added: 
                                ``` xml
                                # Whether to use hash of username when storing codes. 
                                # Enable this if Registry is used to store the codes and if username may contain non alphanumeric characters.

                                UserInfoRecovery.UseHashedUserNames=false
                                UserInfoRecovery.UsernameHashAlg=SHA-1
                                ```
                                </p>
                                <hr>
                                <p>If you have enabled the [using email address as the username](../../learn/using-email-address-as-the-username) option, the confirmation codes are retained after they are used, due to the special character '@' contained in the email address. To resolve this, you can set the <code>UserInfoRecovery.UseHashedUserNames</code> parameter to true so that the registry resources will be saved by <b>hash of username</b> instead of the email address username which contains the '@' sign.</p>
                                <hr>
                                <p>The following properties were added to support notification sending for account enabling and disabling: 
                                ``` java
                                Notification.Sending.Enable.Account.Disable=false
                                Notification.Sending.Enable.Account.Enable=false
                                ```
                                </p>
                                <p>For more information, see [User Account Locking and Account Disabling](../../learn/user-account-locking-and-account-disabling).</p>
                                <hr>
                                <p>The following property was added to check if the account has been locked, at the point of authentication.</p>
                                ``` java
                                Authentication.Policy.Check.Account.Disable=false
                                ```
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>EndpointConfig.properties</code> file stored in the <code><PRODUCT_HOME>/repository/conf/identity/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following properties were replaced:</p>
                                <p><b>Old configuration</b></p>
                                ``` xml
                                identity.server.host=localhost
                                identity.server.port=9443
                                identity.server.serviceURL=/services/
                                ```
                                <p> The properties above were replaced with the following:</p> 
                                <p><b>New configuration</b></p> 
                                ``` xml
                                #identity.server.serviceURL=https://localhost:9443/services/ 
                                ```
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>entitlement.properties</code> file stored in the <code><PRODUCT_HOME>/repository/conf/identity/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>When policy sets are used with entitlements, the default policy set cache size is 100. This may cause frequent cache eviction if there are more than 100 policies in the set. To avoid this, configure the following property. It will cause the cache size to increase depending on the policy set size for better performance.</p> 
                                ``` xml
                                PDP.References.MaxPolicyEntries=3000
                                ``` 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper"> 
                                <p><code>identity.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/identity/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>Session data persistence is enabled by default from IS 5.2.0 onwards. 
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
                                <hr>
                                <p>The following properties were removed:</p>
                                ``` java
                                <!--SessionContextCache>
                                    <Enable>true</Enable> 
                                    <Capacity>100000</Capacity> 
                                </SessionContextCache-->
                                ```
                                <hr>
                                <p>The following property was added to the <code>\<SSOService\></code> and <code>\<PassiveSTS\></code> elements: 
                                ``` java
                                <SLOHostNameVerificationEnabled>true</SLOHostNameVerificationEnabled>
                                ```
                                <p>For more information on configuring hostname verification, see the info note at the bottom of the [Configuring WS-Federation](../../learn/configuring-ws-federation)page.</p>
                                <p>Listeners and properties related to analytics in WSO2 Identity Server were added. For more information, see [Prerequisites to Publish Statistics](../../using-wso2-is/prerequisites-to-publish-statistics).</p>
                                <p><b>Listeners</b></p>
                                ``` java
                                <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="false" />
                                <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="false" />
                                <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.AuthnDataPublisherProxy" orderId="11" enable="true" />
                                ```
                                <p><b>Properties</b></p>
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
                                <hr>
                                <p>The security element was updated:</p>
                                ``` java
                                <!-- Security configurations-->
                                <Security>
                                    <!-- The directory under which all other KeyStore files will be stored-->
                                    <KeyStoresDir>${carbon.home}/conf/keystores</KeyStoresDir>
                                    <KeyManagerType>SunX509</KeyManagerType> 
                                    <TrustManagerType>SunX509</TrustManagerType> 
                                </Security>
                                ```
                                <hr>
                                <p>The following elements were added under the <code>\<OAuth\></code> element:</p>
                                ``` java
                                <OIDCCheckSessionEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oidc/checksession</OIDCCheckSessionEPUrl>
                                <OIDCLogoutEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oidc/logout</OIDCLogoutEPUrl>
                                <OIDCConsentPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/oauth2_consent.do</OIDCConsentPage>
                                <OIDCLogoutConsentPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/oauth2_logout_consent.do</OIDCLogoutConsentPage>
                                <OIDCLogoutPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/oauth2_logout.do</OIDCLogoutPage>

                                <EnableOAuthCache>false</EnableOAuthCache>
                                ```
                                <details class="tip">
                                    <summary>Caching Recommendation</summary>
                                        <p>It is recommended to keep the OAuth2 local cache and the distributed cache disabled as it may cause out-of-memory issues. However, if you want to enable the OAuth2 local cache, you have to enable the distributed cache as well.<p>
                                        <p>To enable the OAuth2 local cache and distributed cache, set the <code><EnableOAuthCache></code> property and <code>isDistributed</code> to <code>true</code>.</p>     
                                        ``` java
                                        <EnableOAuthCache>true</EnableOAuthCache>
                                        <Cache name="OAuthCache" enable="true" timeout="1" capacity="5000" isDistributed="true"/>
                                        ```
                                </details>
                                <hr>
                                <p>The following elements were removed from the <code>\<OAuth\>\<OpenIDConnect\></code> element:</p>
                                ``` java
                                <IDTokenSubjectClaim>http://wso2.org/claims/givenname</IDTokenSubjectClaim>
                                <UserInfoEndpointClaimDialect>http://wso2.org/claims</UserInfoEndpointClaimDialect>
                                ```
                                <hr>
                                <p>The following code was updated. To add audiences to the JWT token, use the code block below. For more information, see [JWT Token Generation](../../using-wso2-is/jwt-token-generation).</p> 
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
                                <hr>
                                <p>The <code>\<CacheConfig\></code> was replaced:</p>
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>context.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/tomcat/carbon/META-INF/</code> directory.</p>
                                <p><code>context.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/tomcat/</code> directory.</p>
                                <p><code>web.xml file</code> stored in the <code><PRODUCT_HOME>/repository/conf/tomcat/carbon/WEB-INF/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The entire file was replaced.</p> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>carbon.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following elements were added under the <code>\<Security\></code> tag:</p>
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
                                <hr>
                                <p>The following elements were removed:</p>
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>claim-config.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following claims were added. For more information on configuring these, see [Configuring Users](../../learn/configuring-users#ConfiguringUsers-Customizingauser'sprofile) or [User Account Locking and Account Disabling](../../learn/user-account-locking-and-account-disabling) depending on the claim you want to configure.</p>
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>data-agent-config.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/data-bridge/</code> directory.</p>
                                <p><code>event-processor.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code>directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The file was newly added.</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>metrics-datasources.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/datasources/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>Set the <code><defaultAutocommit></code> property to true.</p>
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>application-authentication.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/identity/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>
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
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>metrics.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following elements were added:</p>                      
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>output-event-adapters.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following adapter configurations were added:</p>
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
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>registry.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>
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
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>user-mgt.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>The following LDAP/AD property was added:</p> 
                                ``` java
                                <Property name="AnonymousBind">false</Property>
                                ```
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        !!! tip
            
            For more information, see [WSO2 IS 5.2.0 migration guide](https://docs.wso2.com/display/IS520/Upgrading+from+the+Previous+Release).


        !!! Note

            The following new configuration files have been added from
            5.2.0 onwards.

            -   `repository/conf/event-processor.xml`
            -   `repository/conf/security/Owasp.CsrfGuard.Carbon.properties`
            -   `repository/conf/tomcat/carbon/WEB-INF/web.xml`
            -   `repository/conf/identity/oidc-scope-config.xml`


    ??? abstract "From WSO2 IS 5.2.0 to 5.3.0"

        ??? info "Behavioral changes"
    
            Due to a fix done in this release, the effective default value of the system property
            `                       org.apache.xml.security.ignoreLineBreaks                      ` has been changed from “true” to “false”. Due to this change, you will
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
            the `<IS_HOME>/bin/` folder
            to revert back to the previous behavior.
            
            ``` java
            -Dorg.apache.xml.security.ignoreLineBreaks=true
            ```

        ??? info "Configuration changes"
            <table>
                <thead class="header">
                    <tr>
                        <th>Configuration File</th>
                        <th>Required</th>
                        <th>Changes</th>
                    </tr>
                </thead>                
                <tbody>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>carbon.xml</code> file stored in the <code><PRODUCT_HOME>/repository/conf/</code> directory.</p>
                            </div>
                        </td>
                        <td>Mandatory</td> 
                        <td>
                            <div class="content-wrapper">
                                <p>Add the following property to the config file.</p>
                                ```
                                <HideMenuItemIds>
                                    <HideMenuItemId>claim_mgt_menu</HideMenuItemId>
                                    <HideMenuItemId>identity_mgt_emailtemplate_menu</HideMenuItemId>
                                    <HideMenuItemId>identity_security_questions_menu</HideMenuItemId>
                                </HideMenuItemIds>
                                ```
                                <hr>                         
                                <p>Update the following property value to 5.3.0.</p>
                                ```
                                <Version>5.3.0</Version>
                                ```
                            </div>
                        </td>                        
                    </tr>                     
                        <td>
                            <p>The <code>                           entitlement.properties                          </code> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/identity/                          </code> directory.</p>
                        </td>
                        <td>Optional</td>
                        <td><div class="content-wrapper">
                            <p>If you are using the service provider authorization feature, add the following property to the config file.</p>
                            <div class="admonition note">
                                <p class="admonition-title">Note</p>
                                <p>If you have any other <code>AttributeDesignators</code> configured with the number 2, use the smallest unused number instead of 2 when adding the property below.</p>
                            </div>
                            ```
                            PIP.AttributeDesignators.Designator.2=org.wso2.carbon.identity.application.authz.xacml.pip.AuthenticationContextAttributePIP
                            ```
                        </td>
                    </tr>
                    <tr>                       
                        <td>
                            <div class="content-wrapper">
                                <p>The <code>                           application-authentication.xml                          </code> file stored in the <code><PRODUCT_HOME>/repository/conf/identity/</code> directory.</p>
                            </div>
                        </td> 
                        <td>Mandatory</td>
                        <td>
                            <div class="content-wrapper">
                                <p>Add the following property under the <code><Extensions></code> tag.</p>
                                ```
                                <AuthorizationHandler>org.wso2.carbon.identity.application.authz.xacml.handler.impl.XACMLBasedAuthorizationHandler</AuthorizationHandler>
                                ```
                            </div>
                        </td>
                    </tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>                           application-authentication.xml                          </code> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/identity/                          </code> directory.
                                </p>
                            </div> 
                        </td>
                        <td>Optional</td>
                        <td>
                            <div class="content-wrapper">
                                <p>If you are using the mobile connect authenticator feature, add the following element under the <code><AuthenticatorConfigs></code> tag.</p>
                                ```
                                <AuthenticatorConfig name="MobileConnectAuthenticator" enabled="true">
                                    <Parameter name="MobileConnectKey">mobileConnectClientId</Parameter>
                                    <Parameter name="MobileConnectSecret">mobileConnectClientSecret</Parameter>
                                </AuthenticatorConfig>
                                ```
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>Owasp.CsrfGuard.Carbon.properties</code> stored in the <code>                           <PRODUCT_HOME>/repository/conf/security/                          </code> directory.</p>
                            </div>    
                        </td>                        
                        <td>Mandatory</td>
                        <td>
                            <div class="content-wrapper">                                
                                <p>Find the following line.</p>
                                <p><b>Old configuration</b></p> 
                                ```
                                org.owasp.csrfguard.unprotected.authiwa=%servletContext%/commonauth/iwa/*

                                ```
                                <p>Uodate the line as follows.</p>
                                <p><b>New configuration</b></p> 
                                ```
                                org.owasp.csrfguard.unprotected.mex=%servletContext%/mexut/*
                                ```
                                <hr>
                                <p>Add the following property.</p>
                                ```
                                org.owasp.csrfguard.unprotected.mex=%servletContext%/mexut/*
                                ```
                            </div>
                        </td>
                    </tr>                       
                    <tr>
                        <td>
                            <p><code>                           user-mgt.xml                          </code> file stored in the <code><PRODUCT_HOME>/repository/conf/                          </code> directory.</p>
                        </td>
                        <td>Mandatory</td>
                        <td>
                            <div class="content-wrapper">
                                <p>Add the following element under the <code><Realm> <Configuration>                           </code> tag.</p>
                                ```
                                <Property name="initializeNewClaimManager">true</Property>
                                ```
                       </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><code>                           email-admin-config.xml                          </code> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/                          </code> directory.
                        </p>
                    </td>
                    <td>Mandatory</td>
                    <td>
                        <div class="content-wrapper">
                            <p>If you have <strong>not</strong> made any custom changes to this file in your previous version of WSO2 IS, copy the <code> <NEW_IS_HOME>/repository/conf/email/email-admin-config.xml</code> file and replace the existing one.</p>
                            <p>If you <strong>have</strong> made custom changes to this file in your previous version:</p>
                                <ol type="a">
                                    <li>Locate the templates you have updated that differ from the default config file. You can use a diff tool to compare your <code>                               <OLD_IS_HOME>/repository/conf/email/email-admin-config.xml                              </code> file with the <a href="https://raw.githubusercontent.com/wso2/carbon-identity-framework/v5.2.2/features/identity-mgt/org.wso2.carbon.identity.mgt.server.feature/resources/email-admin-config.xml">default file</a> to identify the custom changes you have made. Note these changes/updates.</li>
                                    <li>Copy the file from <code>                               <NEW_IS_HOME>/repository/conf/email/email-admin-config.xml                              </code> to <code>                               <OLD_IS_HOME>/repository/conf/email/                              </code> directory and rename it to email-"admin-config-new.xml".</li>
                                    <li>
                                        <p>For each template you have modified, do the following:</p>                                        
                                        <p>
                                            <div class="admonition note">
                                            <p class="admonition-title">Note</p>
                                            <p>If you opt to migrate to the new identity management implementation, follow all the steps below. If you wish to continue with the old identity management implementation, skip steps iii and iv.</p>
                                            </div>
                                            <ol type="i">
                                                <li><p>Locate the relevant template configuration in the old <code>                                  email-admin-config-new.xml</code> .</p></li>
                                                <li><p>Update the subject, body, and footer in the new config file with the values from the existing configuration.</p></li>
                                                <li><p><code><b>[OPTIONAL]</b></code> Update the placeholders so that they are enclosed with double braces (E.g., <code>{user-name} -> {{user-name}} )</code></p></li>
                                                <li><strong><code>[OPTIONAL]</code></strong> Update the user’s attribute related placeholders to follow the <code>                                 {{user.claim.yyyy}}</code> format where <code>                                 yyyy                                </code> is the attribute name (E.g., <code>                                 {first-name} -> {{user.claim.givenname}}                                </code> )</li>
                                            </ol>
                                    </li>
                                    <li><p>Delete the <code>                                <OLD_IS_HOME>/repository/conf/email/email-admin-config.xml                               </code> file and rename the <code>                                email-admin-config-new.xml                               </code> file to "email-admin-config.xml” to finish the update.</p></li>
                                </ol>
                            <div class="admonition info">
                            <p class="admonition-title">Info</p>
                            <p>For more information about this feature, see [Email Templates](../../learn/email-templates).</p>
                            </div>
                        </div>
                    </td>                        
                </tr>
                <tr class="even">
                    <td><p>The <code>                           output-event-adapters.xml                          </code> file stored in the <code>                           <PRODUCT_HOME>/repository/conf/                          </code> directory.</p></td>
                     <td>Optional</td>
                    <td>
                        <div class="content-wrapper">
                            <p>Add the following properties under the <code><outputEventAdaptersConfig>                           </code> tag.</p>
                            ```
                            <adapterConfig type="wso2event">
                            <property key="default.thrift.tcp.url">tcp://localhost:7612</property 
                            <property key="default.thrift.ssl.url">ssl://localhost:7712</property>
                            <property key="default.binary.tcp.url">tcp://localhost:9612</property>
                            <property key="default.binary.ssl.url">ssl://localhost:9712</property>
                            </adapterConfig>
                            ```
                        </td>
                </tr>
                <tr>
                    <td>The <code>                          identity.xml                         </code> file stored in the <code>                          <PRODUCT_HOME>/repository/conf/identity                         </code> directory.</td>
                    <td>Mandatory</td>
                    <td>
                        <div class="content-wrapper">
                            <p>Add the following event listeners as child elements under the <EventListeners> tag.</p>
                            ```
                            <EventListeners>
                            ....
                            ....
                            <EventListener
                            type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                            name="org.wso2.carbon.identity.governance.listener.IdentityStoreEventListener"
                            orderId="97" enable="true">
                            <Property name="Data.Store">org.wso2.carbon.identity.governance.store.JDBCIdentityDataStore</Property>
                            </EventListener>
                                     
                            <EventListener
                            type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                            name="org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener"
                            orderId="95"
                            enable="true"/>
                            ....
                            </EventListeners>
                            ```
                        <hr>
                        <p>Add the following properties under the <code>                            <OAuth>                           </code> tag.</p>
                        ```
                        <OIDCWebFingerEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/.well-known/webfinger</OIDCWebFingerEPUrl>

                        <!-- For tenants below urls will be modified as https://<hostname>:<port>/t/<tenant domain>/<path>-->
                        <OAuth2DCREPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/identity/connect/register</OAuth2DCREPUrl>
                        <OAuth2JWKSPage>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/jwks</OAuth2JWKSPage>
                        <OIDCDiscoveryEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/oidcdiscovery</OIDCDiscoveryEPUrl>
                        ```
                        <hr>
                        <p>Add the following properties at the top level.</p>
                        ```
                        <!--Recovery>
                        <Notification>
                            <Password>
                                <Enable>false</Enable>
                            </Password>
                            <Username>
                                <Enable>false</Enable>
                            </Username>
                            <InternallyManage>true</InternallyManage>
                        </Notification>
                        <Question>
                            <Password>
                                <Enable>false</Enable>
                                <NotifyStart>true</NotifyStart>
                                <Separator>!</Separator>
                                <MinAnswers>2</MinAnswers>
                                <ReCaptcha>
                                    <Enable>true</Enable>
                                    <MaxFailedAttempts>3</MaxFailedAttempts>
                                </ReCaptcha>
                            </Password>
                        </Question>
                        <ExpiryTime>3</ExpiryTime>
                        <NotifySuccess>true</NotifySuccess>
                        <AdminPasswordReset>
                            <Offline>false</Offline>
                            <OTP>false</OTP>
                            <RecoveryLink>false</RecoveryLink>
                        </AdminPasswordReset>
                        </Recovery>
                     
                        <EmailVerification>
                            <Enable>false</Enable>
                            <LockOnCreation>false</LockOnCreation>
                            <Notification>
                                <InternallyManage>true</InternallyManage>
                            </Notification>
                        </EmailVerification>
                     
                        <SelfRegistration>
                        <Enable>false</Enable>
                        <LockOnCreation>false</LockOnCreation>
                        <Notification>
                            <InternallyManage>true</InternallyManage>
                        </Notification>
                        <ReCaptcha>false</ReCaptcha>
                        </SelfRegistration-->
                        ```
                        <hr> 
                        <p>Remove the following section:</p>
                        ```
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
                        <hr> 
                        <p>Add the following properties to the top level.</p> 
                        ```
                        <ResourceAccessControl>
                        <Resource context="(.*)/api/identity/user/(.*)" secured="true" http-method="all"/>
                        <Resource context="(.*)/api/identity/recovery/(.*)" secured="true" http-method="all"/>
                        <Resource context="(.*)/.well-known(.*)" secured="true" http-method="all"/>
                        <Resource context="(.*)/identity/register(.*)" secured="true" http-method="all">
                            <Permissions>/permission/admin/manage/identity/applicationmgt/delete</Permissions>
                        </Resource>
                        <Resource context="(.*)/identity/connect/register(.*)" secured="true" http-method="all">
                            <Permissions>/permission/admin/manage/identity/applicationmgt/create</Permissions>
                        </Resource>
                        <Resource context="(.*)/oauth2/introspect(.*)" secured="true" http-method="all">
                            <Permissions>/permission/admin/manage/identity/applicationmgt/view</Permissions>
                        </Resource>
                        <Resource context="(.*)/api/identity/entitlement/(.*)" secured="true" http-method="all">
                            <Permissions>/permission/admin/manage/identity/pep</Permissions>
                        </Resource>
                        </ResourceAccessControl>
                     
                        <ClientAppAuthentication>
                            <Application name="dashboard" hash="66cd9688a2ae068244ea01e70f0e230f5623b7fa4cdecb65070a09ec06452262"/>
                        </ClientAppAuthentication>
                     
                        <TenantContextsToRewrite>
                            <WebApp>
                                <Context>/api/identity/user/v0.9</Context>
                                <Context>/api/identity/recovery/v0.9</Context>
                                <Context>/oauth2</Context>
                                <Context>/api/identity/entitlement</Context>
                            </WebApp>
                            <Servlet>
                                <Context>/identity/(.*)</Context>
                            </Servlet>
                        </TenantContextsToRewrite>
                        ```                    
                    </div>
                </td>
            </tr>
            <tr>
                <td>The <code>                          web.xml                         </code> file stored in the <code>                          <PRODUCT_HOME>/repository/conf                         </code> <code>                          /tomcat/carbon/WEB_INF                         </code> directory.</td>
                <td>Optional</td>
                <td>
                    <div class="content-wrapper">
                        <p>Add the following properties after the <code>                            CsrfGuardHttpSessionListener.                           </code></p>
                        ```
                        <filter>
                        <filter-name>CaptchaFilter</filter-name>
                        <filter-class>org.wso2.carbon.identity.captcha.filter.CaptchaFilter</filter-class>
                        </filter>
                 
                        <filter-mapping>
                        <filter-name>CaptchaFilter</filter-name>
                        <url-pattern>/samlsso</url-pattern>
                        <url-pattern>/oauth2</url-pattern>
                        <url-pattern>/commonauth</url-pattern>
                        <dispatcher>FORWARD</dispatcher>
                        <dispatcher>REQUEST</dispatcher>
                        </filter-mapping>
                        ```
                    </div>
                </td>
            </tr>
            <tr>
                <td>The <code>                          catalina-server                         </code> <code>                          .xml                         </code> file stored in the <code>                          <PRODUCT_HOME>/repository/conf                         </code> <code>                          /tomcat/                         </code> directory.</td>
                    <td>Mandatory</td>
                    <td>
                        <div class="content-wrapper">
                        <p>Add the following valves under the <code><Host></code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1"><!-- Authentication and Authorization valve <span class="kw">for</span> the rest apis and we can configure context <span class="kw">for</span> <span class="kw">this</span> in identity.<span class="fu">xml</span>  --></a>
                        <a class="sourceLine" id="cb18-2" title="2">                <Valve className=<span class="st">"org.wso2.carbon.identity.auth.valve.AuthenticationValve"</span>/></a>
                        <a class="sourceLine" id="cb18-3" title="3">                <Valve className=<span class="st">"org.wso2.carbon.identity.authz.valve.AuthorizationValve"</span>/></a>
                        <a class="sourceLine" id="cb18-4" title="4">                <Valve className=<span class="st">"org.wso2.carbon.identity.context.rewrite.valve.TenantContextRewriteValve"</span>/></a></code></pre></div>
                        </div>
                        </div>
                        </div>
                    </td>
                </tr>
                <tr class="even">
                    <td>The <code>                          carbon                         </code> . <code>                          xml                         </code> file stored in the <code>                          <PRODUCT_HOME>/repository/conf/                         </code> directory.</td>
                    <td>Optional</td>
                    <td><div class="content-wrapper">
                        <p>Add the following properties after the <code>                            </Security>                           </code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1"><HideMenuItemIds></a>
                        <a class="sourceLine" id="cb19-2" title="2"><HideMenuItemId>identity_mgt_emailtemplate_menu</HideMenuItemId></a>
                        <a class="sourceLine" id="cb19-3" title="3"><HideMenuItemId>identity_security_questions_menu</HideMenuItemId></a>
                        <a class="sourceLine" id="cb19-4" title="4"></HideMenuItemIds></a></code></pre></div>
                        </div>
                        </div>
                        </div>
                    </td>
                </tr>
                <tr class="odd">
                    <td>The <code>                          log4j.properties                         </code> file stored in the <code>                          <PRODUCT_HOME>/repository/conf/                         </code> directory.</td>
                    <td>Optional</td>
                    <td><div class="content-wrapper">
                        <p>Add the following property.</p>
                        ```
                        log4j.logger.org.springframework=WARN
                        ```
                        </div>
                    </td>
                </tr>
                <tr class="even">
                    <td>The <code>                          data-agent-config.xml                         </code> filestored in the <code>                          <NEW_IS_HOME>/repository/conf/data-bridge                         </code> directory.</td>
                    <td>Mandatory</td>
                    <td><div class="content-wrapper">
                        <p>Add the following properties under the <code>                            <Agent> ThriftDataEndpoint                           </code> and under the <code>                            <Agent>                           </code> <code>                            BinaryDataEndpoint                           </code> tags.</p>
                        ```
                        <!--<sslEnabledProtocols>TLSv1,TLSv1.1,TLSv1.2</sslEnabledProtocols>-->
                        <!--<ciphers>SSL_RSA_WITH_RC4_128_MD5,SSL_RSA_WITH_RC4_128_SHA,TLS_RSA_WITH_AES
                        _128_CBC_SHA,TLS_DHE_RSA_WITH_AES_128_CBC_SHA,TLS_DHE_DSS_WITH_AES_128_CBC_SHA,SSL
                        _RSA_WITH_3DES_EDE_CBC_SHA,SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA,SSL_DHE_DSS_WITH_
                        3DES_EDE_CBC_SHA</ciphers>-->
                        ```                        
                        </div>
                    </td>
                </tr>
                <tr class="odd">
                    <td><p>The <code>claim-config.xml</code> file stored in the <code><NEW_IS_HOME>/repository/conf/</code> directory</p></td>
                    <td><p>Mandatory</p></td>
                    <td><div class="content-wrapper">
                        <p>Replace the following attribute found under the <code><Claim></code> <code><ClaimURI>http://wso2.org/claims/locality</code> tag.</p>
                        ```
                        Replace this attribute:
                        <AttributeID>localityName</AttributeID>
                          
                        with this:
                        <AttributeID>local</AttributeID>
                        ```
                        <hr>
                        <p>Modify the following claims as follows.</p>
                        <details class="info">
                        <summary>click here to expand</summary>
                        <p>
                            ```
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/userid</ClaimURI>
                              <DisplayName>User ID</DisplayName>
                              <AttributeID>scimId</AttributeID>
                              <Description>Unique ID of the user</Description>
                              <ReadOnly/>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/externalid</ClaimURI>
                              <DisplayName>External User ID</DisplayName>
                              <AttributeID>externalId</AttributeID>
                              <Description>Unique ID of the user used in external systems</Description>
                              <ReadOnly/>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/created</ClaimURI>
                              <DisplayName>Created Time</DisplayName>
                              <AttributeID>createdDate</AttributeID>
                              <Description>Created timestamp of the user</Description>
                              <ReadOnly/>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/modified</ClaimURI>
                              <DisplayName>Last Modified Time</DisplayName>
                              <AttributeID>lastModifiedDate</AttributeID>
                              <Description>Last Modified timestamp of the user</Description>
                              <ReadOnly/>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/location</ClaimURI>
                              <DisplayName>Location</DisplayName>
                              <AttributeID>location</AttributeID>
                              <Description>Location</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/formattedName</ClaimURI>
                              <DisplayName>Name - Formatted Name</DisplayName>
                              <AttributeID>formattedName</AttributeID>
                              <Description>Formatted Name</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/middleName</ClaimURI>
                              <DisplayName>Middle Name</DisplayName>
                              <AttributeID>middleName</AttributeID>
                              <Description>Middle Name</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/honorificPrefix</ClaimURI>
                              <DisplayName>Name - Honoric Prefix</DisplayName>
                              <AttributeID>honoricPrefix</AttributeID>
                              <Description>Honoric Prefix</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/honorificSuffix</ClaimURI>
                              <DisplayName>Name - Honoric Suffix</DisplayName>
                              <AttributeID>honoricSuffix</AttributeID>
                              <Description>Honoric Suffix</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/userType</ClaimURI>
                              <DisplayName>User Type</DisplayName>
                              <AttributeID>userType</AttributeID>
                              <Description>User Type</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/preferredLanguage</ClaimURI>
                              <DisplayName>Preferred Language</DisplayName>
                              <AttributeID>preferredLanguage</AttributeID>
                              <Description>Preferred Language</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/local</ClaimURI>
                              <DisplayName>Local</DisplayName>
                              <AttributeID>local</AttributeID>
                              <Description>Local</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/timeZone</ClaimURI>
                              <DisplayName>Time Zone</DisplayName>
                              <AttributeID>timeZone</AttributeID>
                              <Description>Time Zone</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/emails.work</ClaimURI>
                              <DisplayName>Emails - Work Email</DisplayName>
                              <AttributeID>workEmail</AttributeID>
                              <Description>Work Email</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/emails.home</ClaimURI>
                              <DisplayName>Emails - Home Email</DisplayName>
                              <AttributeID>homeEmail</AttributeID>
                              <Description>Home Email</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/emails.other</ClaimURI>
                              <DisplayName>Emails - Other Email</DisplayName>
                              <AttributeID>otherEmail</AttributeID>
                              <Description>Other Email</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/phoneNumbers</ClaimURI>
                              <DisplayName>Phone Numbers</DisplayName>
                              <AttributeID>phoneNumbers</AttributeID>
                              <Description>Phone Numbers</Description>
                              <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/phoneNumbers.home</ClaimURI>
                              <DisplayName>Phone Numbers - Home Phone Number</DisplayName>
                              <AttributeID>homePhone</AttributeID>
                              <Description>Home Phone</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/phoneNumbers.work</ClaimURI>
                              <DisplayName>Phone Numbers - Work Phone Number</DisplayName>
                              <AttributeID>workPhone</AttributeID>
                              <Description>Work Phone</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/phoneNumbers.fax</ClaimURI>
                              <DisplayName>Phone Numbers - Fax Number</DisplayName>
                              <AttributeID>fax</AttributeID>
                              <Description>Fax Number</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/phoneNumbers.pager</ClaimURI>
                              <DisplayName>Phone Numbers - Pager Number</DisplayName>
                              <AttributeID>pager</AttributeID>
                              <Description>Pager Number</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/phoneNumbers.other</ClaimURI>
                              <DisplayName>Phone Numbers - Other</DisplayName>
                              <AttributeID>otherPhoneNumber</AttributeID>
                              <Description>Other Phone Number</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/gtalk</ClaimURI>
                              <DisplayName>IM - Gtalk</DisplayName>
                              <AttributeID>imGtalk</AttributeID>
                              <Description>IM - Gtalk</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/skype</ClaimURI>
                              <DisplayName>IM - Skype</DisplayName>
                              <AttributeID>imSkype</AttributeID>
                              <Description>IM - Skype</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/photos</ClaimURI>
                              <DisplayName>Photo</DisplayName>
                              <AttributeID>photos</AttributeID>
                              <Description>Photo</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/photourl</ClaimURI>
                              <DisplayName>Photo URIL</DisplayName>
                              <AttributeID>photoUrl</AttributeID>
                              <Description>Photo URL</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/thumbnail</ClaimURI>
                              <DisplayName>Photo - Thumbnail</DisplayName>
                              <AttributeID>thumbnail</AttributeID>
                              <Description>Photo - Thumbnail</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/addresses</ClaimURI>
                              <DisplayName>Address</DisplayName>
                              <AttributeID>addresses</AttributeID>
                              <Description>Address</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/addresses.formatted</ClaimURI>
                              <DisplayName>Address - Formatted</DisplayName>
                              <AttributeID>formattedAddress</AttributeID>
                              <Description>Address - Formatted</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/streetaddress</ClaimURI>
                              <DisplayName>Address - Street</DisplayName>
                              <AttributeID>streetAddress</AttributeID>
                              <Description>Address - Street</Description>
                              <DisplayOrder>5</DisplayOrder>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/addresses.locality</ClaimURI>
                              <DisplayName>Address - Locality</DisplayName>
                              <AttributeID>localityAddress</AttributeID>
                              <Description>Address - Locality</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/groups</ClaimURI>
                              <DisplayName>Groups</DisplayName>
                              <AttributeID>groups</AttributeID>
                              <Description>Groups</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/identity/verifyEmail</ClaimURI>
                              <DisplayName>Verify Email</DisplayName>
                              <AttributeID>manager</AttributeID>
                              <Description>Temporary claim to invoke email verified feature</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/identity/askPassword</ClaimURI>
                              <DisplayName>Ask Password</DisplayName>
                              <AttributeID>postOfficeBox</AttributeID>
                              <Description>Temporary claim to invoke email ask Password feature</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/identity/adminForcedPasswordReset</ClaimURI>
                              <DisplayName>Force Password Reset</DisplayName>
                              <AttributeID>departmentNumber</AttributeID>
                              <Description>Temporary claim to invoke email force password feature</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/entitlements</ClaimURI>
                              <DisplayName>Entitlements</DisplayName>
                              <AttributeID>entitlements</AttributeID>
                              <Description>Entitlements</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>urn:scim:schemas:core:1.0:roles</ClaimURI>
                              <DisplayName>Roles</DisplayName>
                              <AttributeID>roles</AttributeID>
                              <Description>Roles</Description>
                              <DisplayOrder>5</DisplayOrder>
                              <SupportedByDefault />
                              <MappedLocalClaim>http://wso2.org/claims/role</MappedLocalClaim>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/x509Certificates</ClaimURI>
                              <DisplayName>X509Certificates</DisplayName>
                              <AttributeID>x509Certificates</AttributeID>
                              <Description>X509Certificates</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/identity/failedPasswordRecoveryAttempts</ClaimURI>
                              <DisplayName>Failed Password Recovery Attempts</DisplayName>
                              <AttributeID>postalCode</AttributeID>
                              <Description>Number of consecutive failed attempts done for password recovery</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/identity/emailVerified</ClaimURI>
                              <DisplayName>Email Verified</DisplayName>
                              <!-- Proper attribute Id in your user store must be configured for this -->
                              <AttributeID>postalAddress</AttributeID>
                              <Description>Email Verified</Description>
                            </Claim>
                            <Claim>
                              <ClaimURI>http://wso2.org/claims/identity/failedLoginLockoutCount</ClaimURI>
                              <DisplayName>Failed Lockout Count</DisplayName>
                              <!-- Proper attribute Id in your user store must be configured for this -->
                              <AttributeID>employeeNumber</AttributeID>
                              <Description>Failed Lockout Count</Description>
                            </Claim>
                            ```
                            </p>
                        </details>
                        <hr>
                        <p>Remove the following claim.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb24" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb24-1" title="1"><Claim></a>
                        <a class="sourceLine" id="cb24-2" title="2">  <ClaimURI>http:<span class="co">//wso2.org/claims/identity/lastLoginTime</ClaimURI></span></a>
                        <a class="sourceLine" id="cb24-3" title="3">  <DisplayName>Last Login</DisplayName></a>
                        <a class="sourceLine" id="cb24-4" title="4">  <!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --></a>
                        <a class="sourceLine" id="cb24-5" title="5">  <AttributeID>carLicense</AttributeID></a>
                        <a class="sourceLine" id="cb24-6" title="6">  <Description>Last Login <span class="bu">Time</span></Description></a>
                        <a class="sourceLine" id="cb24-7" title="7"></Claim></a></code></pre></div>
                        </div>
                        </div>
                        <hr>
                        <p>Add the following claim.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb25" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb25-1" title="1"><ClaimURI>http:<span class="co">//wso2.org/claims/identity/lastLogonTime</ClaimURI></span></a>
                        <a class="sourceLine" id="cb25-2" title="2"><DisplayName>Last Logon</DisplayName></a>
                        <a class="sourceLine" id="cb25-3" title="3"><!-- Proper attribute Id in your user store must be configured <span class="kw">for</span> <span class="kw">this</span> --></a>
                        <a class="sourceLine" id="cb25-4" title="4"><AttributeID>carLicense</AttributeID></a>
                        <a class="sourceLine" id="cb25-5" title="5"><Description>Last Logon <span class="bu">Time</span></Description></a>
                        <a class="sourceLine" id="cb25-6" title="6"></Claim></a></code></pre></div>
                        </div>
                        </div>
                        <hr>
                        <p>Replace the following attribute from under the <code>                            <Claim>                            <ClaimURI>                                                                                       http://wso2.org/claims/challengeQuestion1                                                                                                                                                                         </code> tag.</p>
                        <div>
                        <p><br />
                        </p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb26" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb26-1" title="1">Replace <span class="kw">this</span> attribute:</a>
                        <a class="sourceLine" id="cb26-2" title="2"><AttributeID>localityName</AttributeID></a>
                        <a class="sourceLine" id="cb26-3" title="3"> </a>
                        <a class="sourceLine" id="cb26-4" title="4">with <span class="kw">this</span>:</a>
                        <a class="sourceLine" id="cb26-5" title="5"><AttributeID>firstChallenge</AttributeID></a></code></pre></div>
                        </div>
                        </div>
                        <hr>
                        <p>Replace the following attribute from under the the <code>                             <Claim>                             <ClaimURI>                                                                                          http://wso2.org/claims/challengeQuestion2                                                                                                                                                                               </code></p>
                        </div>
                        <div>
                        <p>
                        </p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb27" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb27-1" title="1">Replace <span class="kw">this</span> attribute:</a>
                        <a class="sourceLine" id="cb27-2" title="2"><AttributeID>localityName</AttributeID></a>
                        <a class="sourceLine" id="cb27-3" title="3"> </a>
                        <a class="sourceLine" id="cb27-4" title="4">with <span class="kw">this</span>:</a>
                        <a class="sourceLine" id="cb27-5" title="5"><AttributeID>secondChallenge</AttributeID></a></code></pre></div>
                        </div>
                        </div>
                        <hr>
                        <p>Modify this claim as follows:</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb28" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb28-1" title="1"><Claim></a>
                        <a class="sourceLine" id="cb28-2" title="2">  <ClaimURI>http:<span class="co">//wso2.org/claims/active</ClaimURI></span></a>
                        <a class="sourceLine" id="cb28-3" title="3">  <DisplayName>Active</DisplayName></a>
                        <a class="sourceLine" id="cb28-4" title="4">  <AttributeID>active</AttributeID></a>
                        <a class="sourceLine" id="cb28-5" title="5">  <Description>Status of the account</Description></a>
                        <a class="sourceLine" id="cb28-6" title="6"></Claim></a></code></pre></div>
                        </div>
                        </div>
                        </div>
                        </div>
                    </td>
                </tr>
                </tbody>
                </table>         
        
        !!! tip        
            For more information, see the [WSO2 IS 5.3.0 migration guide](https://docs.wso2.com/display/IS530/Upgrading+from+the+Previous+Release). 


    ??? abstract "From WSO2 IS 5.3.0 to 5.4.0"
        ??? info "Configuration changes"
            <table>
                <thead class="header">
                    <th>Configuration File</th>
                    <th>Changes</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="content-wrapper">
                                <p><code>                            carbon.xml                           </code> file stored in the <code>                            <IS_HOME>/repository/conf                           </code> folder.</p>
                            </div>
                        </td>
                        <td>
                            <div class="content-wrapper">
                                <p>Change the version property value to 5.4.0.</p>
                                ```
                                5.4.0
                                ```
                        </td>
                    </tr>
                    <tr>
                    <td><p><code>                           identity-event.properties                          </code> file stored in the <code>                           <IS_HOME>/repository/conf/identity                          </code> folder.</p></td>
                    <td><div class="content-wrapper">
                        <p>Add the following property.</p>
                        ```
                        account.lock.handler.notification.manageInternally=true
                        ```               
                        <p>The property given above allows you to enable or disable sending emails via the WSO2 Identity Server when an account is locked or unlocked.</p>                
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><code>                          identity.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
                    <td><div class="content-wrapper">
                        <p>Add the following property within the `<SessionDataCleanUp`</code> tag.</p>
                        ```
                        50000

                        ```
                        <p>In a production environment, there is a possibility for a deadlock/database lock<br />
                        to occur when running a session data cleanup task in high load scenarios.<br />
                        To mitigate this, the property given above was introduced to clean data in chunks.<br />
                        Configure this property with the required chunk size. For more information, see <a href="https://docs.wso2.com/display/IS540/Deployment+Guidelines+in+Production#DeploymentGuidelinesinProduction-Configuringchunksize">Deployment Guidelines in Production</a> .</p>
                        </div>
                        <hr>               
                        <p>Remove the following property found within the <code>                            <OperationDataCleanUp>                           </code> tag.</p>
                        ```
                        <CleanUpPeriod>720</CleanUpPeriod>
                        ```                        
                        <p>WSO2 IS 5.3.0 had two separate tasks for session data cleanup and operation data cleanup. This is now combined and done through one task. Therefore the property given above is no longer needed. You can still configure the <code><CleanUpPeriod></code> property within the <code><SessionDataCleanUp></code> tag to specify the cleanup period for the combined task.</p>
                        </div>
                        <hr>
                        <p>Change the default value of the following property from 300 to 0.</p>
                        <div class="admonition warning">
                        <p class="admonition-title">Warning</p>
                        <p>You can skip this step if you have already configured the <code><TimestampSkew></code> property with your own value.</p>
                        </div>
                        ```
                        <TimestampSkew>0</TimestampSkew>
                        ```              
                        <p>The property given above specifies the maximum tolerance limit for the clock skewed between the sender and recipient. The default value was changed to 0 as the best practice is to assume that the sender and recipient clocks are synchronized and are in the same time stamp. Configure this accordingly if the clocks are not in the same timestamp.</p>
                        <hr>                
                        <p>Add the following JWT bearer grant type within the <code>                            <SupportedGrantTypes>                           </code> tag.</p>
                        ```
                        <SupportedGrantType>
                        <GrantTypeName>urn:ietf:params:oauth:grant-type:jwt-bearer</GrantTypeName>
                        <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.grant.jwt.JWTBearerGrantHandler</GrantTypeHandlerImplClass>
                        <GrantTypeValidatorImplClass>org.wso2.carbon.identity.oauth2.grant.jwt.JWTGrantValidator</GrantTypeValidatorImplClass>
                        </SupportedGrantType>
                        ```
                        <p>The JWT bearer grant type is supported out-of-the-box with WSO2 IS 5.4.0. For more information, see <a href="https://docs.wso2.com/display/ISCONNECTORS/Configuring+JWT+Grant+Type">Configuring JWT Grant Type</a> in the ISConnectors documentation.</p>
                        <hr>                
                        <p>Update the <code>                            <EmailVerification>                           </code> code block with the following code.</p>
                        <p>The properties shown below at line numbers 3,8,9,10 &amp; 11 were added in 5.4.0.</p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>This step is optional.</p>
                        </div> 
                        ```
                        <EmailVerification>
                                <Enable>false</Enable>
                                <ExpiryTime>1440</ExpiryTime>
                                <LockOnCreation>true</LockOnCreation>
                                <Notification>
                                    <InternallyManage>true</InternallyManage>
                                </Notification>
                                <AskPassword>
                                    <ExpiryTime>1440</ExpiryTime>
                                    <PasswordGenerator>org.wso2.carbon.user.mgt.common.DefaultPasswordGenerator</PasswordGenerator>
                                </AskPassword>
                           </EmailVerification>
                        <EmailVerification>
                                <Enable>false</Enable>
                                <ExpiryTime>1440</ExpiryTime>
                                <LockOnCreation>true</LockOnCreation>
                                <Notification>
                                    <InternallyManage>true</InternallyManage>
                                </Notification>
                                <AskPassword>
                                    <ExpiryTime>1440</ExpiryTime>
                                    <PasswordGenerator>org.wso2.carbon.user.mgt.common.DefaultPasswordGenerator</PasswordGenerator>
                                </AskPassword>
                        </EmailVerification>
                        ```                         
                        <hr>
                        <p>Update the following property found within the <code>                            <SelfRegistration>                           </code> tag to true.</p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>This step is optional.</p>
                        </div> 
                        ```
                        <LockOnCreation>true</LockOnCreation>
                        ```                        
                        <hr>
                        <p>Add the following properties within the <code>                            <SelfRegistration>                           </code> tag.</p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>This step is optional.</p>
                        </div> 
                        ```
                        <VerificationCode>
                        <ExpiryTime>1440</ExpiryTime>
                        </VerificationCode>
                        ```
                        <hr>
                        <p>Add the following properties within the <code>                            <Server>                           </code> tag.</p>
                        ```
                        <AuthenticationPolicy>
                        <CheckAccountExist>false</CheckAccountExist>
                        </AuthenticationPolicy>
                        ```
                        <hr>
                        <p>Change the default values within the `<CacheManager></code>` tag.</p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>
                            <ul>
                            <li><strong>If you have already configured all the properties</strong> within the <code>                             <CacheManager>                            </code> tag with your own values, skip this step.</li>
                            <li><strong>If you have only configured some properties</strong> within the <code>                             <CacheManager>                            </code> tag with your own values, replace the properties that are not been changed/configured with the relevant default values shown below.</li>
                            <li><strong>If you have not configured or changed any of the properties</strong> within the <code>                             <CacheManager>                            </code> tag with your own values, copy the entire code block below and replace the <code>                             <CacheManager>                            </code> tag in the <code>                             identity.xml                            </code> file with the code block given below.</li>
                        </ul>
                        ```
                        <CacheManager name="IdentityApplicationManagementCacheManager">
                            <Cache name="AppAuthFrameworkSessionContextCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="AuthenticationContextCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="AuthenticationRequestCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="AuthenticationResultCache"  enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="AppInfoCache"               enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="AuthorizationGrantCache"    enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="OAuthCache"                 enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="OAuthScopeCache"            enable="true"  timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="OAuthSessionDataCache"      enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="SAMLSSOParticipantCache"    enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="SAMLSSOSessionIndexCache"   enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="SAMLSSOSessionDataCache"    enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="ServiceProviderCache"       enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="ProvisioningConnectorCache" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="ProvisioningEntityCache"    enable="true" timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="ServiceProviderProvisioningConnectorCache" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="IdPCacheByAuthProperty"     enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="IdPCacheByHRI"              enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="IdPCacheByName"             enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                        </CacheManager>
                        ```
                        <hr>
                        <p>Add the following property within the <code>                            <CacheManager>                           </code> tag if it does not already exist.</p>
                        ```
                        <Cache name="OAuthScopeCache" enable="true"  timeout="300" capacity="5000" isDistributed="false"/>
                        ```
                        <hr>
                        <p>Add the following properties within the <code>                            <OAuth>                           </code> tag. The code comments explain the usage and applicable values for the properties.</p>
                        ```
                        <!-- Specify the Token issuer class to be used.
                        Default: org.wso2.carbon.identity.oauth2.token.OauthTokenIssuerImpl.
                        Applicable values: org.wso2.carbon.identity.oauth2.token.JWTTokenIssuer-->
                            <!--<IdentityOAuthTokenGenerator>org.wso2.carbon.identity.oauth2.token.JWTTokenIssuer</IdentityOAuthTokenGenerator>-->
                         
                        <!-- This configuration is used to specify the access token value generator.
                        Default: org.apache.oltu.oauth2.as.issuer.UUIDValueGenerator
                        Applicable values: org.apache.oltu.oauth2.as.issuer.UUIDValueGenerator,
                            org.apache.oltu.oauth2.as.issuer.MD5Generator,
                            org.wso2.carbon.identity.oauth.tokenvaluegenerator.SHA256Generator -->
                            <!--<AccessTokenValueGenerator>org.wso2.carbon.identity.oauth.tokenvaluegenerator.SHA256Generator</AccessTokenValueGenerator>-->
                         
                        <!-- This configuration is used to specify whether the Service Provider tenant domain should be used when generating
                        access token.Otherwise user domain will be used.Currently this value is only supported by the JWTTokenIssuer. -->
                            <!--<UseSPTenantDomain>True</UseSPTenantDomain>-->
                        ```
                        <hr> 
                        <p>Add the following properties related to token persistence within the <code>                            <OAuth>                           </code> tag.</p>
                        ```
                        <TokenPersistence>
                            <Enable>true</Enable>
                            <PoolSize>0</PoolSize>
                            <RetryCount>5</RetryCount>
                        </TokenPersistence>
                        ```
                        <hr>
                        <p>Add the following property within the <code>                            <OpenIDConnect>                           </code> tag.</p>
                        ```
                        <SignJWTWithSPKey>false</SignJWTWithSPKey>
                        ```
                        <hr>
                        <p>Replace the <code>                            <OAuth2RevokeEPUrll>                           </code> property with the following.</p>
                        ```
                        <OAuth2RevokeEPUrl>${carbon.protocol}://${carbon.host}:${carbon.management.port}/oauth2/revoke</OAuth2RevokeEPUrl>
                        ```
                        <hr>
                        <p>Add the following event listener within the <code>                            <EventListeners>                           </code> tag. Uncomment this listener if you are using SCIM 2.0.</p>
                        ```
                        <!-- Uncomment the following event listener if SCIM2 is used. -->
                        <!--EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                        name = "org.wso2.carbon.identity.scim2.common.listener.SCIMUserOperationListener"
                        orderId = "93"
                        enable = "true" /-->
                        ```
                        <hr>
                        <p>Add the following properties within the <code>                            <ResourceAccessControl>                           </code> tag. These properties specify the access levels and permissions for the SCIM 2.0 resources.</p>
                            <details class="info">
                                <summary>Click here to view</summary>>
                                <p>
                                ```
                                <Resource context="(.*)/scim2/Users" secured="true" http-method="POST">
                                    <Permissions>/permission/admin/manage/identity/usermgt/create</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Users" secured="true" http-method="GET">
                                    <Permissions>/permission/admin/manage/identity/usermgt/list</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Groups" secured="true" http-method="POST">
                                    <Permissions>/permission/admin/manage/identity/rolemgt/create</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Groups" secured="true" http-method="GET">
                                    <Permissions>/permission/admin/manage/identity/rolemgt/view</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="GET">
                                    <Permissions>/permission/admin/manage/identity/usermgt/view</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="PUT">
                                    <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="PATCH">
                                    <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Users/(.*)" secured="true" http-method="DELETE">
                                    <Permissions>/permission/admin/manage/identity/usermgt/delete</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="GET">
                                    <Permissions>/permission/admin/manage/identity/rolemgt/view</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="PUT">
                                    <Permissions>/permission/admin/manage/identity/rolemgt/update</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="PATCH">
                                    <Permissions>/permission/admin/manage/identity/rolemgt/update</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Groups/(.*)" secured="true" http-method="DELETE">
                                    <Permissions>/permission/admin/manage/identity/rolemgt/delete</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Me" secured="true"    http-method="GET">
                                    <Permissions>/permission/admin/login</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Me" secured="true" http-method="DELETE">
                                    <Permissions>/permission/admin/manage/identity/usermgt/delete</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Me" secured="true"    http-method="PUT">
                                    <Permissions>/permission/admin/login</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Me" secured="true"   http-method="PATCH">
                                    <Permissions>/permission/admin/login</Permissions>
                                </Resource>
                                <Resource context="(.*)/scim2/Me" secured="true" http-method="POST">
                                    <Permissions>/permission/admin/manage/identity/usermgt/create</Permissions>
                                </Resource>
                                <Resource context="/scim2/ServiceProviderConfig" secured="false" http-method="all">
                                    <Permissions></Permissions>
                                </Resource>
                                <Resource context="/scim2/ResourceType" secured="false" http-method="all">
                                    <Permissions></Permissions>
                                </Resource>
                                <Resource context="/scim2/Bulk" secured="true"  http-method="all">
                                    <Permissions>/permission/admin/manage/identity/usermgt</Permissions>
                                </Resource>
                                <Resource context="(.*)/api/identity/oauth2/dcr/(.*)" secured="true" http-method="all">
                                    <Permissions>/permission/admin/manage/identity/applicationmgt</Permissions>
                                </Resource>
                                ```
                        <hr>
                        <p>Add the following properties within the `<TenantContextsToRewrite><WebApp>` tag.</p>
                        ```
                        <Context>/scim2</Context>
                        <Context>/api/identity/oauth/dcr/v1.0</Context>
                        ```
                        <hr>
                        <p>Remove the following property found within the `<OAuth>` tag.</p>
                        ```
                        <AppInfoCacheTimeout>-1</AppInfoCacheTimeout>
                        <AuthorizationGrantCacheTimeout>-1</AuthorizationGrantCacheTimeout>
                        <SessionDataCacheTimeout>-1</SessionDataCacheTimeout>
                        <ClaimCacheTimeout>-1</ClaimCacheTimeout>
                        ```
                        <hr
                        <p>Add the following commented property within the <code>                            <OAuth>                           </code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1"><!-- True, <span class="kw">if</span> access token alias is stored in the database instead of access token.</a>
                        <a class="sourceLine" id="cb21-2" title="2">Eg.<span class="fu">token</span> alias and token is same when</a>
                        <a class="sourceLine" id="cb21-3" title="3"><span class="kw">default</span> AccessTokenValueGenerator is used.</a>
                        <a class="sourceLine" id="cb21-4" title="4">When JWTTokenIssuer is used, jti is used as the token alias</a>
                        <a class="sourceLine" id="cb21-5" title="5">Default: <span class="kw">true</span>.</a>
                        <a class="sourceLine" id="cb21-6" title="6">Applicable values: <span class="kw">true</span>, <span class="kw">false</span>--></a>
                        <a class="sourceLine" id="cb21-7" title="7"></a>
                        <a class="sourceLine" id="cb21-8" title="8">    <!--<PersistAccessTokenAlias><span class="kw">false</span></PersistAccessTokenAlias>--></a></code></pre></div>
                        </div>
                        </div>
                        <p>Replace the <code>                            <                           </code> <code>                            OAuth2DCREPUrl>                           </code> property with the property value given below.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1"><OAuth2DCREPUrl>${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/api/identity/oauth2/dcr/v1.0/register</OAuth2DCREPUrl></span></a></code></pre></div>
                        </div>
                        </div>
                        <p>Uncomment the following property and add line number 3 given below to the file.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb23" data-syntaxhighlighter-params="brush: java; gutter: true; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: true; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb23-1" title="1"><TokenValidators></a>
                        <a class="sourceLine" id="cb23-2" title="2">    <TokenValidator type=<span class="st">"bearer"</span> <span class="kw">class</span>=<span class="st">"org.wso2.carbon.identity.oauth2.validators.DefaultOAuth2TokenValidator"</span> /></a>
                        <a class="sourceLine" id="cb23-3" title="3">    <TokenValidator type=<span class="st">"jwt"</span> <span class="kw">class</span>=<span class="st">"org.wso2.carbon.identity.oauth2.validators.OAuth2JWTTokenValidator"</span> /></a>
                        <a class="sourceLine" id="cb23-4" title="4"></TokenValidators></a></code></pre></div>
                        </div>
                        </div>
                        <p>Add the following commented property to the file. You can place it after the `</EnableAssertions>` closing tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb24" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb24-1" title="1"><!-- This should be <span class="kw">true</span> <span class="kw">if</span> subject identifier in the token validation response needs to adhere to the</a>
                        <a class="sourceLine" id="cb24-2" title="2">following SP configuration.</a>
                        <a class="sourceLine" id="cb24-3" title="3"></a>
                        <a class="sourceLine" id="cb24-4" title="4">- Use tenant domain in local subject identifier. - Use user store domain in local subject identifier.</a>
                        <a class="sourceLine" id="cb24-5" title="5"></a>
                        <a class="sourceLine" id="cb24-6" title="6"><span class="kw">if</span> the value is <span class="kw">false</span>, subject identifier will be set as the fully qualified username.</a>
                        <a class="sourceLine" id="cb24-7" title="7"></a>
                        <a class="sourceLine" id="cb24-8" title="8">Default value: <span class="kw">false</span></a>
                        <a class="sourceLine" id="cb24-9" title="9"></a>
                        <a class="sourceLine" id="cb24-10" title="10">Supported versions: IS <span class="fl">5.4.</span><span class="dv">0</span> beta onwards--></a>
                        <a class="sourceLine" id="cb24-11" title="11">    <!--<BuildSubjectIdentifierFromSPConfig><span class="kw">true</span></BuildSubjectIdentifierFromSPConfig>--></a></code></pre></div>
                        </div>
                        </div>
                        <p>Uncomment the <code>                            <UserType>                           </code> property that has the value "Federated" and comment out the <code>                            <UserType>                           </code> property that has the value "Local" as seen below.<br />
                        The property can be found within the <code>                            <SAML2Grant>                           </code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb25" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb25-1" title="1"><SAML2Grant></a>
                        <a class="sourceLine" id="cb25-2" title="2">    <!--SAML2TokenHandler></SAML2TokenHandler--></a>
                        <a class="sourceLine" id="cb25-3" title="3">    <!-- UserType conifg decides whether the SAML assertion carrying user is local user or a federated user.</a>
                        <a class="sourceLine" id="cb25-4" title="4">            Only Local Users can access claims from local userstore. LEGACY users will have to have tenant domain appended username.</a>
                        <a class="sourceLine" id="cb25-5" title="5">            They will not be able to access claims from local userstore. To get claims by mapping users with exact same username from local</a>
                        <a class="sourceLine" id="cb25-6" title="6">            <span class="fu">userstore</span> (<span class="kw">for</span> non LOCAL scenarios) use mapFederatedUsersToLocal config --></a>
                        <a class="sourceLine" id="cb25-7" title="7">    <!--<UserType>LOCAL</UserType>--></a>
                        <a class="sourceLine" id="cb25-8" title="8">    <UserType>FEDERATED</UserType></a>
                        <a class="sourceLine" id="cb25-9" title="9">    <!--UserType>LEGACY</UserType--></a>
                        <a class="sourceLine" id="cb25-10" title="10"></SAML2Grant></a></code></pre></div>
                        </div>
                        </div>
                        <p>Remove the following properties found within the <code>                            <SSOService>                           </code> tag.</p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>This step is optional.</p>
                        <hr>
                        <p>Add the following properties to the file. You can place the code block after the <code>                            </SCIM>                           </code> closing tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb27" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb27-1" title="1"><SCIM2></a>
                        <a class="sourceLine" id="cb27-2" title="2">    <!--Default value <span class="kw">for</span> UserEPUrl and GroupEPUrl are built in following format</a>
                        <a class="sourceLine" id="cb27-3" title="3">            https:<span class="co">//<HostName>:<MgtTrpProxyPort except 443>/<ProxyContextPath>/<context>/<path></span></a>
                        <a class="sourceLine" id="cb27-4" title="4">            If that doesn&#39;t satisfy uncomment the following config and explicitly configure the value--></a>
                        <a class="sourceLine" id="cb27-5" title="5">    <!--UserEPUrl>${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/scim2/Users</UserEPUrl--></span></a>
                        <a class="sourceLine" id="cb27-6" title="6">    <!--GroupEPUrl>${carbon.<span class="fu">protocol</span>}:<span class="co">//${carbon.host}:${carbon.management.port}/scim2/Groups</GroupEPUrl--></span></a>
                        <a class="sourceLine" id="cb27-7" title="7"></SCIM2></a></code></pre></div>
                        </div>
                        </div>
                        <p>Add the following properties to the file. You can place it after the <code>                            </EnableAskPasswordAdminUI>                           </code> closing tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb28" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb28-1" title="1"><EnableRecoveryEndpoint><span class="kw">true</span></EnableRecoveryEndpoint></a>
                        <a class="sourceLine" id="cb28-2" title="2"><EnableSelfSignUpEndpoint><span class="kw">true</span></EnableSelfSignUpEndpoint></a></code></pre></div>
                        </div>
                        </div>
                        <p>Add the following properties within the <code>                            <ResourceAccessControl>                           </code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb29" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb29-1" title="1"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/oauth2/dcr/v1.0/register(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"POST"</span>></a>
                        <a class="sourceLine" id="cb29-2" title="2">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/applicationmgt/create</<span class="bu">Permissions</span>></a>
                        <a class="sourceLine" id="cb29-3" title="3"></<span class="bu">Resource</span>></a>
                        <a class="sourceLine" id="cb29-4" title="4"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/oauth2/dcr/v1.0/register(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"DELETE"</span>></a>
                        <a class="sourceLine" id="cb29-5" title="5">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/applicationmgt/delete</<span class="bu">Permissions</span>></a>
                        <a class="sourceLine" id="cb29-6" title="6"></<span class="bu">Resource</span>></a>
                        <a class="sourceLine" id="cb29-7" title="7"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/oauth2/dcr/v1.0/register(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"PUT"</span>></a>
                        <a class="sourceLine" id="cb29-8" title="8">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/applicationmgt/update</<span class="bu">Permissions</span>></a>
                        <a class="sourceLine" id="cb29-9" title="9"></<span class="bu">Resource</span>></a>
                        <a class="sourceLine" id="cb29-10" title="10"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/oauth2/dcr/v1.0/register(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"GET"</span>></a>
                        <a class="sourceLine" id="cb29-11" title="11">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/applicationmgt/view</<span class="bu">Permissions</span>></a>
                        <a class="sourceLine" id="cb29-12" title="12"></<span class="bu">Resource</span>></a></code></pre></div>
                        </div>
                        </div>
                        <p><br />
                        </p>
                        </div></td>
                        </tr>
                        <tr class="even">
                        <td><code>                          oidc-scope-config.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>Replace the <code>                            <Claim>                           </code> tag within the <code>                            <Scope id                                                         =                                                                                     "openid"                                                       </code> > tag with the following.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb30" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb30-1" title="1"><Claim></a>
                        <a class="sourceLine" id="cb30-2" title="2">    sub, email, email_verified, name, family_name, given_name, middle_name, nickname, preferred_username, profile,</a>
                        <a class="sourceLine" id="cb30-3" title="3">    picture, website, gender, birthdate, zoneinfo, locale, updated_at, phone_number, phone_number_verified,</a>
                        <a class="sourceLine" id="cb30-4" title="4">    address,street_address,country, formatted, postal_code, locality, region </a>
                        <a class="sourceLine" id="cb30-5" title="5"></Claim></a></code></pre></div>
                        </div>
                        </div>
                        <p>Replace the <code>                            <Claim>                           </code> tag within the <code>                            <Scope id                                                         =                                                                                     "address"                                                       </code> > tag with the following.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb31" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb31-1" title="1"><Claim>address,street</Claim></a></code></pre></div>
                        </div>
                        </div>
                        </div></td>
                        </tr>
                        <tr class="odd">
                        <td><code>                          authenticators.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/security                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>Update the parameter name of the <code>                            JITUserProvisioning                           </code> parameter to the following.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb32" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb32-1" title="1"><<span class="bu">Parameter</span> name=<span class="st">"JITUserProvisioningEnabled"</span>><span class="kw">true</span></<span class="bu">Parameter</span>></a></code></pre></div>
                        </div>
                        </div>
                        </div></td>
                        </tr>
                        <tr class="even">
                        <td><div class="content-wrapper">
                        <p><code>                                                                                    web.xml                           </code> file stored in the <code>                            <IS_HOME>/repository/conf/tomcat                           </code> folder.</p>
                        </div></td>
                        <td><div class="content-wrapper">
                        <p>Add the following property under the <code>                            <session-config>                           </code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb33" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb33-1" title="1"><tracking-mode>COOKIE</tracking-mode></a></code></pre></div>
                        </div>
                        </div>
                        <p>Add the following properties below the <code>                            <servlet-class>org.apache.jasper.servlet.JspServlet</servlet-class>                           </code> property.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb34" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb34-1" title="1"><init-param></a>
                        <a class="sourceLine" id="cb34-2" title="2">   <param-name>compilerSourceVM</param-name></a>
                        <a class="sourceLine" id="cb34-3" title="3">   <param-value><span class="fl">1.</span><span class="dv">8</span></param-value></a>
                        <a class="sourceLine" id="cb34-4" title="4"></init-param></a>
                        <a class="sourceLine" id="cb34-5" title="5"><init-param></a>
                        <a class="sourceLine" id="cb34-6" title="6">   <param-name>compilerTargetVM</param-name></a>
                        <a class="sourceLine" id="cb34-7" title="7">   <param-value><span class="fl">1.</span><span class="dv">8</span></param-value></a>
                        <a class="sourceLine" id="cb34-8" title="8"></init-param></a></code></pre></div>
                        </div>
                        </div>
                        </div></td>
                        </tr>
                        <tr class="odd">
                        <td><code>                          email-admin-config.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/email                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>Replace "https://localhost:9443" in all instances of the <code>                            accountrecoveryendpoint                           </code> URL with the <strong><code>                             {{carbon.product-url}}                            </code></strong> placeholder.<br />
                        The URL should look similiar to the URL shown in the code block below. The placeholder will retrieve the value configured in the <code>                            carbon.xml                           </code> file.</p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>You can skip this step if you have already configured this with your load balancer URL.</p>
                        </div>
                        </div>
                        </div>
                        </div></td>
                        </tr>
                        <tr class="even">
                        <td><code>                          cipher-tool.properties                         </code> file stored in the <code>                          <IS_HOME>/repository/conf                         </code> folder.</td>
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
                        <td><code>                          cipher-text.properties                         </code> file stored in the <code>                          <IS_HOME>/repository/conf                         </code> folder.</td>
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
                        <td><code>                          claim-config.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>Add the following claims within the <code>dialectURI=http://wso2.org/claims</code> > tag.</p>
                        ```
                        <Claim>
                            <ClaimURI>http://wso2.org/claims/identity/phoneVerified</ClaimURI>
                            <DisplayName>Phone Verified</DisplayName>
                            <!-- Proper attribute Id in your user store must be configured for this -->
                            <AttributeID>phoneVerified</AttributeID>
                            <Description>Phone Verified</Description>
                        </Claim>
                         
                         
                        <Claim>
                            <ClaimURI>http://wso2.org/claims/department</ClaimURI>
                            <DisplayName>Department</DisplayName>
                            <AttributeID>departmentNumber</AttributeID>
                            <Description>Department</Description>
                            <SupportedByDefault />
                            <ReadOnly />
                        </Claim>
                        ```                        
                        <p>Add the following claims. This new claim dialect and the claims within it are required for SCIM 2.0.</p>
                        <details class="info">
                        <summary>click here to expand</summary>
                            <p>
                            ```
                                <Dialect dialectURI="urn:ietf:params:scim:schemas:core:2.0">
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:id</ClaimURI>
                                    <DisplayName>Id</DisplayName>
                                    <AttributeID>scimId</AttributeID>
                                    <Description>Id</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/userid</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:externalId</ClaimURI>
                                    <DisplayName>External Id</DisplayName>
                                    <AttributeID>externalId</AttributeID>
                                    <Description>External Id</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/externalid</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:meta.created</ClaimURI>
                                    <DisplayName>Meta - Created</DisplayName>
                                    <AttributeID>createdDate</AttributeID>
                                    <Description>Meta - Created</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/created</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:meta.lastModified</ClaimURI>
                                    <DisplayName>Meta - Last Modified</DisplayName>
                                    <AttributeID>lastModifiedDate</AttributeID>
                                    <Description>Meta - Last Modified</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/modified</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:meta.location</ClaimURI>
                                    <DisplayName>Meta - Location</DisplayName>
                                    <AttributeID>location</AttributeID>
                                    <Description>Meta - Location</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/location</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:meta.resourceType</ClaimURI>
                                    <DisplayName>Meta - Location</DisplayName>
                                    <AttributeID>ref</AttributeID>
                                    <Description>Meta - Location</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/resourceType</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:meta.version</ClaimURI>
                                    <DisplayName>Meta - Version</DisplayName>
                                    <AttributeID>im</AttributeID>
                                    <Description>Meta - Version</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/im</MappedLocalClaim>
                                </Claim>
                            </Dialect>
                            <Dialect dialectURI="urn:ietf:params:scim:schemas:core:2.0:User">
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:userName</ClaimURI>
                                    <DisplayName>User Name</DisplayName>
                                    <AttributeID>uid</AttributeID>
                                    <Description>User Name</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/username</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:name.givenName</ClaimURI>
                                    <DisplayName>Name - Given Name</DisplayName>
                                    <AttributeID>givenName</AttributeID>
                                    <Description>Given Name</Description>
                                    <Required />
                                    <DisplayOrder>1</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/givenname</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:name.familyName</ClaimURI>
                                    <DisplayName>Name - Family Name</DisplayName>
                                    <AttributeID>sn</AttributeID>
                                    <Description>Family Name</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/lastname</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:name.formatted</ClaimURI>
                                    <DisplayName>Name - Formatted Name</DisplayName>
                                    <AttributeID>formattedName</AttributeID>
                                    <Description>Formatted Name</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/formattedName</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:name.middleName</ClaimURI>
                                    <DisplayName>Name - Middle Name</DisplayName>
                                    <AttributeID>middleName</AttributeID>
                                    <Description>Middle Name</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/middleName</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:name.honorificPrefix</ClaimURI>
                                    <DisplayName>Name - Honoric Prefix</DisplayName>
                                    <AttributeID>honoricPrefix</AttributeID>
                                    <Description>Honoric Prefix</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/honorificPrefix</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:name.honorificSuffix</ClaimURI>
                                    <DisplayName>Name - Honoric Suffix</DisplayName>
                                    <AttributeID>honoricSuffix</AttributeID>
                                    <Description>Honoric Suffix</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/honorificSuffix</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:displayName</ClaimURI>
                                    <DisplayName>Display Name</DisplayName>
                                    <AttributeID>displayName</AttributeID>
                                    <Description>Display Name</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/displayName</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:nickName</ClaimURI>
                                    <DisplayName>Nick Name</DisplayName>
                                    <AttributeID>nickName</AttributeID>
                                    <Description>Nick Name</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/nickname</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:profileUrl</ClaimURI>
                                    <DisplayName>Profile URL</DisplayName>
                                    <AttributeID>url</AttributeID>
                                    <Description>Profile URL</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/url</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:title</ClaimURI>
                                    <DisplayName>Title</DisplayName>
                                    <AttributeID>title</AttributeID>
                                    <Description>Title</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/title</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:userType</ClaimURI>
                                    <DisplayName>User Type</DisplayName>
                                    <AttributeID>userType</AttributeID>
                                    <Description>User Type</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/userType</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:preferredLanguage</ClaimURI>
                                    <DisplayName>Preferred Language</DisplayName>
                                    <AttributeID>preferredLanguage</AttributeID>
                                    <Description>Preferred Language</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/preferredLanguage</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:locale</ClaimURI>
                                    <DisplayName>Locality</DisplayName>
                                    <AttributeID>localityName</AttributeID>
                                    <Description>Locality</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/local</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:timezone</ClaimURI>
                                    <DisplayName>Time Zone</DisplayName>
                                    <AttributeID>timeZone</AttributeID>
                                    <Description>Time Zone</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/timeZone</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:active</ClaimURI>
                                    <DisplayName>Active</DisplayName>
                                    <AttributeID>active</AttributeID>
                                    <Description>Active</Description>
                                    <DisplayOrder>2</DisplayOrder>
                                    <Required />
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/active</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:emails.work</ClaimURI>
                                    <DisplayName>Emails - Work Email</DisplayName>
                                    <AttributeID>workEmail</AttributeID>
                                    <Description>Work Email</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/emails.work</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:emails.home</ClaimURI>
                                    <DisplayName>Emails - Home Email</DisplayName>
                                    <AttributeID>homeEmail</AttributeID>
                                    <Description>Home Email</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/emails.home</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:emails.other</ClaimURI>
                                    <DisplayName>Emails - Other Email</DisplayName>
                                    <AttributeID>otherEmail</AttributeID>
                                    <Description>Other Email</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/emails.other</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.mobile</ClaimURI>
                                    <DisplayName>Phone Numbers - Mobile Number</DisplayName>
                                    <AttributeID>mobile</AttributeID>
                                    <Description>Mobile Number</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/mobile</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.home</ClaimURI>
                                    <DisplayName>Phone Numbers - Home Phone Number</DisplayName>
                                    <AttributeID>homePhone</AttributeID>
                                    <Description>Home Phone</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/phoneNumbers.home</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.work</ClaimURI>
                                    <DisplayName>Phone Numbers - Work Phone Number</DisplayName>
                                    <AttributeID>workPhone</AttributeID>
                                    <Description>Work Phone</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/phoneNumbers.work</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.other</ClaimURI>
                                    <DisplayName>Phone Numbers - Other</DisplayName>
                                    <AttributeID>otherPhoneNumber</AttributeID>
                                    <Description>Other Phone Number</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                    <MappedLocalClaim>http://wso2.org/claims/phoneNumbers.other</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:ims.gtalk</ClaimURI>
                                    <DisplayName>IM - Gtalk</DisplayName>
                                    <AttributeID>imGtalk</AttributeID>
                                    <Description>IM - Gtalk</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/gtalk</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:ims.skype</ClaimURI>
                                    <DisplayName>IM - Skype</DisplayName>
                                    <AttributeID>imSkype</AttributeID>
                                    <Description>IM - Skype</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/skype</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:photos.photo</ClaimURI>
                                    <DisplayName>Photo</DisplayName>
                                    <AttributeID>photoUrl</AttributeID>
                                    <Description>Photo</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/photourl</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:photos.thumbnail</ClaimURI>
                                    <DisplayName>Photo - Thumbnail</DisplayName>
                                    <AttributeID>thumbnail</AttributeID>
                                    <Description>Photo - Thumbnail</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/thumbnail</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:addresses.home</ClaimURI>
                                    <DisplayName>Address - Home</DisplayName>
                                    <AttributeID>localityAddress</AttributeID>
                                    <Description>Address - Home</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/addresses.locality</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:addresses.work</ClaimURI>
                                    <DisplayName>Address - Work</DisplayName>
                                    <AttributeID>region</AttributeID>
                                    <Description>Address - Work</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/region</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:groups</ClaimURI>
                                    <DisplayName>Groups</DisplayName>
                                    <AttributeID>groups</AttributeID>
                                    <Description>Groups</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/groups</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:entitlements.default</ClaimURI>
                                    <DisplayName>Entitlements</DisplayName>
                                    <AttributeID>entitlements</AttributeID>
                                    <Description>Entitlements</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/entitlements</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:roles.default</ClaimURI>
                                    <DisplayName>Roles</DisplayName>
                                    <AttributeID>roles</AttributeID>
                                    <Description>Roles</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/role</MappedLocalClaim>
                                </Claim>
                                <Claim>
                                    <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:x509Certificates.default</ClaimURI>
                                    <DisplayName>X509Certificates</DisplayName>
                                    <AttributeID>x509Certificates</AttributeID>
                                    <Description>X509Certificates</Description>
                                    <DisplayOrder>5</DisplayOrder>
                                    <SupportedByDefault />
                                    <MappedLocalClaim>http://wso2.org/claims/x509Certificates</MappedLocalClaim>
                                </Claim>
                            </Dialect>
                            ```
                            </p>
                        </details>
                        </div></td>
                        </tr>
                        <tr class="odd">
                        <td><code>                          application-authentication.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>Add the following parameter within the <code>                                                         FacebookAuthenticator                                                       </code> tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb40" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb40-1" title="1"><!--<<span class="bu">Parameter</span> name=<span class="st">"ClaimDialectUri"</span>>http:<span class="co">//wso2.org/facebook/claims</Parameter>--></span></a></code></pre></div>
                        </div>
                        </div>
                        <p>Add the following parameter within the relevant tags of the following authenticators:<br />
                        MobileConnectAuthenticator , <code>                            EmailOTP                           </code> , <code>                            SMSOTP                           </code> and <code>                            totp                           </code></p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb41" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb41-1" title="1"><<span class="bu">Parameter</span> name=<span class="st">"redirectToMultiOptionPageOnFailure"</span>><span class="kw">false</span></<span class="bu">Parameter</span>></a></code></pre></div>
                        </div>
                        </div>
                        </div></td>
                        </tr>
                        <tr class="even">
                        <td><code>                          entitlement.properties                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>WSO2 IS 5.4.0 introduces a set of new XACML policies that load at server startup when the <code>                            PAP.Policy.Add.Start.Enable                           </code> property is set to <code>                            true                           </code> .<br />
                        Therefore, when you upgrade to IS 5.4.0, follow one of the steps below depending on whether you want to add the new policies:</p>
                        <ul>
                        <li>If you want to add the new policies on server startup, set both <code>                             PDP.Balana.Config.Enable                            </code> and <code>                             PAP.Policy.Add.Start.Enable                            </code> properties to <code>                             true                            </code> .</li>
                        <li>If you do not want to add the new policies on server startup, set both <code>                             PDP.Balana.Config.Enable                            </code> and <code>                             PAP.Policy.Add.Start.Enable                            </code> properties to <code>                             false                            </code> .</li>
                        </ul>
                        <div class="admonition warning">
                        <p class="admonition-title">Warning</p>
                        <p>If you set the <code>                            PDP.Balana.Config.Enable                           </code> property to <code>                            false                           </code> , while the <code>                            PAP.Policy.Add.Start.Enable                           </code> property is set to <code>                            true                           </code> , the server does not look for the <code>                            balana-config.xml                           </code> file on startup. This results in an error as follows because the balana-config.xml file includes functions required by the new XACML policies:</p>
                        </div>
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
            !!! Tip
                For more information, see the [WSO2 IS 5.4.0 migration guide](https://docs.wso2.com/display/IS540/Upgrading+from+the+Previous+Release).


    ??? abstract "From WSO2 IS 5.4.0 to 5.5.0" 

        ??? info "Configuration changes" 
            <table>
                <thead>
                <tr class="header">
                <th>Configuration File</th>
                <th>Changes</th>
                </tr>
                </thead>
                <tbody>
                <tr class="odd">
                <td><code>                          carbon.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf                         </code> folder.</td>
                <td><div class="content-wrapper">
                <p>Change the version property value to 5.5.0.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1"><Version><span class="fl">5.5.</span><span class="dv">0</span></Version></a></code></pre></div>
                </div>
                </div>
                </div></td>
                </tr>
                <tr class="even">
                <td><p><code>                           application-authentication.xml                          </code> file stored in the <code>                           <IS_HOME>/repository/conf/identity                          </code> folder.</p></td>
                <td><div class="content-wrapper">
                <p>Replace the following property found within the <code>                            <Extensions>                           </code> list.</p>
                !!! warning
                    <p>If you are using a custom <code>                            <StepBasedSequenceHandler>                           </code> , skip this step.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1"><StepBasedSequenceHandler>org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">application</span>.<span class="fu">authentication</span>.<span class="fu">framework</span>.<span class="fu">handler</span>.<span class="fu">sequence</span>.<span class="fu">impl</span>.<span class="fu">DefaultStepBasedSequenceHandler</span></StepBasedSequenceHandler></a></code></pre></div>
                </div>
                </div>
                <p>with the one given below.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1"><StepBasedSequenceHandler>org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">application</span>.<span class="fu">authentication</span>.<span class="fu">framework</span>.<span class="fu">handler</span>.<span class="fu">sequence</span>.<span class="fu">impl</span>.<span class="fu">GraphBasedSequenceHandler</span></StepBasedSequenceHandler></a></code></pre></div>
                </div>
                </div>
                <p>If you are using a custom authorization handler, see <a href="https://docs.wso2.com/display/IS550/Migrating+Custom+Authorization+Handlers">Migrating Custom Authorization Handlers</a> .</p>
                <p>The OpenIDAuthenticator is no longer available. Remove the following configurations that are related to it.</p>
                <p>Remove the following property found within the <code>                            <AuthenticatorNameMappings>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1"><AuthenticatorNameMapping name=<span class="st">"OpenIDAuthenticator"</span> alias=<span class="st">"openid"</span> /> </a></code></pre></div>
                </div>
                </div>
                <p>Remove the whole configuration block that starts with the config given below found within the <code>                            <AuthenticatorConfigs>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1"><AuthenticatorConfig name=<span class="st">"OpenIDAuthenticator"</span> enabled=<span class="st">"true"</span>></a>
                <a class="sourceLine" id="cb5-2" title="2">.....</a>
                <a class="sourceLine" id="cb5-3" title="3">.....</a>
                <a class="sourceLine" id="cb5-4" title="4"></AuthenticatorConfig></a></code></pre></div>
                </div>
                </div>
                <p>Replace the <code>                            AuthenticatorConfig                           </code> block for the <strong><code>                             MobileConnectAuthenticator                            </code></strong> found within the <code>                            <AuthenticatorConfigs>                           </code> tag, with the following configuration.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1"><AuthenticatorConfig name=<span class="st">"MobileConnectAuthenticator"</span> enabled=<span class="st">"true"</span>></a>
                <a class="sourceLine" id="cb6-2" title="2">    <<span class="bu">Parameter</span> name=<span class="st">"MCAuthenticationEndpointURL"</span>>mobileconnectauthenticationendpoint/mobileconnect.<span class="fu">jsp</span></<span class="bu">Parameter</span>></a>
                <a class="sourceLine" id="cb6-3" title="3">    <<span class="bu">Parameter</span> name=<span class="st">"MCDiscoveryAPIURL"</span>>https:<span class="co">//discover.mobileconnect.io/gsma/v2/discovery/</Parameter></span></a>
                <a class="sourceLine" id="cb6-4" title="4">    <<span class="bu">Parameter</span> name=<span class="st">"redirectToMultiOptionPageOnFailure"</span>><span class="kw">false</span></<span class="bu">Parameter</span>></a>
                <a class="sourceLine" id="cb6-5" title="5"></AuthenticatorConfig></a></code></pre></div>
                </div>
                </div>
                <p>Remove the following property found within the <code>                            <AuthenticatorNameMappings>                           </code> tag. The <code>                            AuthorizationHandler                           </code> property has been removed from this file for newer versions of this product.</p>
                <p><br />
                </p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1"><AuthorizationHandler>org.<span class="fu">wso2</span>.<span class="fu">carbon</span>.<span class="fu">identity</span>.<span class="fu">application</span>.<span class="fu">authz</span>.<span class="fu">xacml</span>.<span class="fu">handler</span>.<span class="fu">impl</span>.<span class="fu">XACMLBasedAuthorizationHandler</span></AuthorizationHandler></a></code></pre></div>
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
                <td><code>                          identity-event.properties                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
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
                <td><code>                          identity.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
                <td><div class="content-wrapper">
                <p>Remove the <code>                            <ClientAuthHandlers>                           </code> code block found within the <code>                            <OAuth>                           </code> tag. From WSO2 IS 5.5.0 onwards, client authentication is handled differently. For more information, see the introduction of the <a href="https://docs.wso2.com/display/IS550/Writing+A+New+OAuth+Client+Authenticator">Writing A New OAuth Client Authenticator</a> topic.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1"><ClientAuthHandlers></a>
                <a class="sourceLine" id="cb10-2" title="2">    <ClientAuthHandler <span class="bu">Class</span>=<span class="st">"org.wso2.carbon.identity.oauth2.token.handlers.clientauth.BasicAuthClientAuthHandler"</span>></a>
                <a class="sourceLine" id="cb10-3" title="3">        <Property <span class="bu">Name</span>=<span class="st">"StrictClientCredentialValidation"</span>><span class="kw">false</span></Property></a>
                <a class="sourceLine" id="cb10-4" title="4">    </ClientAuthHandler></a>
                <a class="sourceLine" id="cb10-5" title="5"></ClientAuthHandlers></a></code></pre></div>
                </div>
                </div>
                <p>Add the following property within the <code>                            <ScopeValidators>                           </code> tag. For more information about the XACML based scope validator, see <a href="https://docs.wso2.com/display/IS550/Validating+the+Scope+of+OAuth+Access+Tokens+using+XACML+Policies">Validating the Scope of OAuth Access Tokens using XACML Policies</a> .</p>
                !!! tip
                    <p><strong>Tip:</strong> To migrate custom scope validators, see <a href="https://docs.wso2.com/display/IS550/Migrating+Custom+Scope+Validators">Migrating Custom Scope Validators</a> .</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1"><ScopeValidator <span class="kw">class</span>=<span class="st">"org.wso2.carbon.identity.oauth2.validators.xacml.XACMLScopeValidator"</span>/></a></code></pre></div>
                </div>
                </div>
                <p>Add the following property within the <code>                            <OpenIDConnect>                           </code> tag to enable the service provider wise audience configuration. For more information about this, see</p>
                !!! tip
                    <p>This feature requires a new database table that is created when running the migration script. If you do not wish to use this feature, you can set the value of the property given below to false.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1"><EnableAudiences><span class="kw">true</span></EnableAudiences></a></code></pre></div>
                </div>
                </div>
                <p>Add the following property within the <code>                            <OpenIDConnect>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1"><LogoutTokenExpiration><span class="dv">120</span></LogoutTokenExpiration></a></code></pre></div>
                </div>
                </div>
                <p>Add the following property within the <code>                            <EventListeners>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1"><<span class="bu">EventListener</span> type=<span class="st">"org.wso2.carbon.user.core.listener.UserOperationEventListener"</span></a>
                <a class="sourceLine" id="cb14-2" title="2">                       name=<span class="st">"org.wso2.carbon.user.mgt.listeners.UserDeletionEventListener"</span></a>
                <a class="sourceLine" id="cb14-3" title="3">                       orderId=<span class="st">"98"</span> enable=<span class="st">"false"</span>/></a></code></pre></div>
                </div>
                </div>
                <p>Add the following code block within the root tag after the <code>                            <EventListeners>                           </code> code block. For more information about this configuration, see <a href="https://docs.wso2.com/display/IS550/Configuring+Users#ConfiguringUsers-Trackinguserdeletionondeletingauser">Tracking user deletion on deleting a user</a> .</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1"><UserDeleteEventRecorders></a>
                <a class="sourceLine" id="cb15-2" title="2">    <UserDeleteEventRecorder name=<span class="st">"org.wso2.carbon.user.mgt.recorder.DefaultUserDeletionEventRecorder"</span> enable=<span class="st">"false"</span>></a>
                <a class="sourceLine" id="cb15-3" title="3">        <!-- Un comment below line <span class="kw">if</span> you need to write entries to a separate .<span class="fu">csv</span> file. Otherwise <span class="kw">this</span> will be</a>
                <a class="sourceLine" id="cb15-4" title="4">            written in to a log file using a separate appender. --></a>
                <a class="sourceLine" id="cb15-5" title="5">        <!--<Property name=<span class="st">"path"</span>>${carbon.<span class="fu">home</span>}/repository/logs/delete-records.<span class="fu">csv</span></Property>--></a>
                <a class="sourceLine" id="cb15-6" title="6">    </UserDeleteEventRecorder></a>
                <a class="sourceLine" id="cb15-7" title="7"></UserDeleteEventRecorders></a></code></pre></div>
                </div>
                </div>
                <p>Do the following configuration changes to enable fine grained access control introduced with Identity Server 5.5.0</p>
                <p>Remove the following property found within the < <code>                            ResourceAccessControl>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>/></a></code></pre></div>
                </div>
                </div>
                <p>Add the following set of resources within the < <code>                            ResourceAccessControl>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/v1.0/validate-code"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>/></a>
                <a class="sourceLine" id="cb17-2" title="2"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/v1.0/resend-code"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>/></a>
                <a class="sourceLine" id="cb17-3" title="3"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/v1.0/me"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"POST"</span>/></a>
                <a class="sourceLine" id="cb17-4" title="4"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/v1.0/me"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"GET"</span>/></a>
                <a class="sourceLine" id="cb17-5" title="5"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/v1.0/pi-info"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>></a>
                <a class="sourceLine" id="cb17-6" title="6">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/usermgt/view</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-7" title="7"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-8" title="8"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/user/v1.0/pi-info/(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>></a>
                <a class="sourceLine" id="cb17-9" title="9">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/usermgt/view</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-10" title="10"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-11" title="11"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>/></a>
                <a class="sourceLine" id="cb17-12" title="12"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/receipts/(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"all"</span>/></a>
                <a class="sourceLine" id="cb17-13" title="13"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/purposes"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"POST"</span>></a>
                <a class="sourceLine" id="cb17-14" title="14">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/consentmgt/add</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-15" title="15"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-16" title="16"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"GET"</span>/></a>
                <a class="sourceLine" id="cb17-17" title="17"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.+)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"DELETE"</span>></a>
                <a class="sourceLine" id="cb17-18" title="18">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/consentmgt/delete</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-19" title="19"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-20" title="20"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"POST"</span>></a>
                <a class="sourceLine" id="cb17-21" title="21">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/consentmgt/add</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-22" title="22"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-23" title="23"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"GET"</span>/></a>
                <a class="sourceLine" id="cb17-24" title="24"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.+)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"DELETE"</span>></a>
                <a class="sourceLine" id="cb17-25" title="25">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/consentmgt/delete</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-26" title="26"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-27" title="27"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"POST"</span>></a>
                <a class="sourceLine" id="cb17-28" title="28">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/consentmgt/add</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-29" title="29"></<span class="bu">Resource</span>></a>
                <a class="sourceLine" id="cb17-30" title="30"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.*)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"GET"</span>/></a>
                <a class="sourceLine" id="cb17-31" title="31"><<span class="bu">Resource</span> context=<span class="st">"(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.+)"</span> secured=<span class="st">"true"</span> http-method=<span class="st">"DELETE"</span>></a>
                <a class="sourceLine" id="cb17-32" title="32">    <<span class="bu">Permissions</span>>/permission/admin/manage/identity/consentmgt/delete</<span class="bu">Permissions</span>></a>
                <a class="sourceLine" id="cb17-33" title="33"></<span class="bu">Resource</span>></a></code></pre></div>
                </div>
                </div>
                <p>Replace the following property found within the <code>                            <WebApp>                           </code> tag under the <code>                            <TenantContextsToRewrite>                           </code> tag.</p>
                <div>
                <p><br />
                </p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1"><<span class="bu">Context</span>>/api/identity/user/v0<span class="fl">.9</span>/</<span class="bu">Context</span>></a></code></pre></div>
                </div>
                </div>
                <p>with the one given below</p>
                </div>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1"><<span class="bu">Context</span>>/api/identity/user/v1<span class="fl">.0</span>/</<span class="bu">Context</span>></a></code></pre></div>
                </div>
                </div>
                <p>Add the following new property within the <code>                            <WebApp>                           </code> tag found under the <code>                            <TenantContextsToRewrite>                           </code> tag.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1"><<span class="bu">Context</span>>/api/identity/consent-mgt/v1<span class="fl">.0</span>/</<span class="bu">Context</span>></a></code></pre></div>
                </div>
                </div>
                <p>Add the following code block within the root tag after the <code>                            <SSOService>                           </code> code block.</p>
                <p>This configuration specifies whether consent management should be enabled during single sign-on authentication. For more information, see <a href="https://docs.wso2.com/display/IS550/Consent+Management+with+Single-Sign-On">Consent Management with Single-Sign-On</a> .</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1"><Consent></a>
                <a class="sourceLine" id="cb21-2" title="2">    <!--Specify whether consent management should be enable during SSO.--></a>
                <a class="sourceLine" id="cb21-3" title="3">    <EnableSSOConsentManagement><span class="kw">true</span></EnableSSOConsentManagement></a>
                <a class="sourceLine" id="cb21-4" title="4"></Consent></a></code></pre></div>
                </div>
                </div>
                <p>Add the following code block within the <code>                            <OAuth>                           </code> tag. This configuration is used to specify the grant types that filter claims based on user consents. The grant types given below are out-of-the-box grant types that prompt the user for consent.</p>
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1"><!--Defines the grant types that will filter user claims based on user consent in their responses such as id_token or user info response.<span class="fu">Default</span> grant types that filter user claims based on user consent are &#39;authorization_code&#39; and &#39;implicit&#39;.</a>
                <a class="sourceLine" id="cb22-2" title="2">Supported versions: IS <span class="fl">5.5.</span><span class="dv">0</span> onwards. --></a>
                <a class="sourceLine" id="cb22-3" title="3"> </a>
                <a class="sourceLine" id="cb22-4" title="4"><UserConsentEnabledGrantTypes></a>
                <a class="sourceLine" id="cb22-5" title="5">    <UserConsentEnabledGrantType></a>
                <a class="sourceLine" id="cb22-6" title="6">        <GrantTypeName>authorization_code</GrantTypeName></a>
                <a class="sourceLine" id="cb22-7" title="7">    </UserConsentEnabledGrantType></a>
                <a class="sourceLine" id="cb22-8" title="8">    <UserConsentEnabledGrantType></a>
                <a class="sourceLine" id="cb22-9" title="9">        <GrantTypeName>implicit</GrantTypeName></a>
                <a class="sourceLine" id="cb22-10" title="10">    </UserConsentEnabledGrantType></a>
                <a class="sourceLine" id="cb22-11" title="11"></UserConsentEnabledGrantTypes></a></code></pre></div>
                </div>
                </div>
                <p><br />
                </p>
                </div></td>
                </tr>
                <tr class="odd">
                <td><code>                          log4j.properties                         </code> file stored in the <code>                          <IS_HOME>/repository/conf                         </code> folder.</td>
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
                <td>provisioning-config.xml file stored in the <code>                          <IS_HOME>/repository/conf/identity                         </code> folder.</td>
                <td><div class="content-wrapper">
                <p>Remove the <code>                            <scim-providers>                           </code> and <code>                            <scim-consumers>                           </code> code blocks from the file.</p>
                </div></td>
                </tr>
                </tbody>
            </table>

        !!! tip
            For more information, see the [WSO2 IS 5.5.0 migration guide](https://docs.wso2.com/display/IS550/Upgrading+from+the+Previous+Release).


    ??? abstract "From WSO2 IS 5.5.0 to 5.6.0"
        ??? info "Configuration changes"
            <table>
                <thead>
                    <tr class="header">
                        <th>Configuration File</th>
                        <th>Changes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd">
                        <td><code>                          carbon.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf                         </code> folder.</td>
                        <td><div class="content-wrapper">
                            <p>Change the version property value to 5.6.0.</p>
                            <div class="code panel pdl" style="border-width: 1px;">
                            <div class="codeContent panelContent pdl">
                            <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1"><Version><span class="fl">5.6.</span><span class="dv">0</span></Version></a></code></pre></div>
                            </div>
                            </div>
                            <p>Add the following new property within the <code>                            <cache>                           </code> tag. Setting this property to <code>                            true                           </code> enables local cache invalidation for clustered nodes.</p>
                            <div class="code panel pdl" style="border-width: 1px;">
                            <div class="codeContent panelContent pdl">
                            <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1"><ForceLocalCache><span class="kw">false</span></ForceLocalCache></a></code></pre></div>
                            </div>
                            </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="even">
                        <td><code>                          axis2.xml                         </code> file stored in the <code>                          <IS_HOME>/repository/conf/axis2                         </code> folder.</td>
                        <td><div class="content-wrapper">
                        <p>Change the following property values to 5.6.0.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1"><parameter name=<span class="st">"userAgent"</span> locked=<span class="st">"true"</span>></a>
                        <a class="sourceLine" id="cb3-2" title="2">        WSO2 <span class="bu">Identity</span> Server-<span class="fl">5.6.</span><span class="dv">0</span></a>
                        <a class="sourceLine" id="cb3-3" title="3"></parameter></a>
                        <a class="sourceLine" id="cb3-4" title="4"><parameter name=<span class="st">"server"</span> locked=<span class="st">"true"</span>></a>
                        <a class="sourceLine" id="cb3-5" title="5">    WSO2 <span class="bu">Identity</span> Server-<span class="fl">5.6.</span><span class="dv">0</span></a>
                        <a class="sourceLine" id="cb3-6" title="6"></parameter></a></code></pre></div>
                        </div>
                        </div>
                        </div></td>
                    </tr>
                    <tr class="odd">
                        <td><p><code>                           application-authentication.xml                          </code> file stored in the <code>                           <IS_HOME>/repository/conf/identity                          </code> folder.</p></td>
                        <td><div class="content-wrapper">
                        <p>Add the following new property within the root tag.</p>
                        <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                        <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1"><AuthenticationEndpointMissingClaimsURL>/authenticationendpoint/claims.<span class="fu">do</span></AuthenticationEndpointMissingClaimsURL></a></code></pre></div>
                        </div>
                        </div>
                        </div></td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`axis2.xml` file stored in the `<IS_HOME>/repository/conf/axis2` folder.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Change the following property values to 5.6.0.</p>
                            ```
                            <parameter name="userAgent" locked="true">
                                    WSO2 Identity Server-5.6.0
                            </parameter>
                            <parameter name="server" locked="true">
                                WSO2 Identity Server-5.6.0
                            </parameter>
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`application-authentication.xml` file stored in the `<IS_HOME>/repository/conf/identity` folder.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Add the following new property within the root tag.</p>
                            ```
                            <AuthenticationEndpointMissingClaimsURL>/authenticationendpoint/claims.do</AuthenticationEndpointMissingClaimsURL>
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`entitlement.properties` file stored in the `<IS_HOME>/repository/conf/identity` folder.</p>.
                        </td>
                        <td class="content-wrapper"> 
                            <p>Add the following property. Setting this property to true will shorten the SAML JSON response format.</p>
                            ```
                            JSON.Shorten.Form.Enabled=false
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="conte">
                            <p>`identity.xml` file stored in the `<IS_HOME>/repository/conf/identity` folder.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Add the following properties within the `<JDBCPersistenceManager><SessionDataPersist>` tag. These configurations are relevant for cleaning temporary authentication context data after each authentication flow.</p>
                            ```
                            <TempDataCleanup>
                                <!-- Enabling separated cleanup for temporary authentication context data -->
                                <Enable>true</Enable>
                                <!-- When PoolZize > 0, temporary data which have no usage after the authentication flow will be deleted immediately
                                             When PoolZise = 0, data will be deleted only by the scheduled cleanup task-->
                                <PoolSize>20</PoolSize>
                                <!-- All temporary authentication context data older than CleanUpTimeout value are considered as expired
                                            and would be deleted during cleanup task -->
                                <CleanUpTimeout>40</CleanUpTimeout>
                            </TempDataCleanup>
                            ```
                            <hr>
                            <p>Add the following property within the `<OAuth>` tag for OAuth key hashing. For more information, see [Setting Up OAuth Token Hashing](../../learn/setting-up-oauth-token-hasing).</p>
                            ```
                            <!-- This should be true if the oauth keys (consumer secret, access token, refresh token and authorization code) need to be hashed,before storing them in the database. If the value is false, the oauth keys will be saved in a plain text format.
                            By default : false.
                            Supported versions: IS 5.6.0 onwards.
                               -->
                            <EnableClientSecretHash>false</EnableClientSecretHash>
                            ```
                            <div class="admonition tip">
                            <p class="admonition-title">Tip</p>
                            <p>Use a fresh server to enable hashing.</p>
                            </div>
                            <hr>
                            <p>Add the following configurations within the `<EventListeners>` tag.</p>
                            ```
                            <!-- Audit Loggers -->
                            <!-- Old Audit Logger -->
                            <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                                                   name="org.wso2.carbon.user.mgt.listeners.UserMgtAuditLogger"
                                                   orderId="0" enable="false"/>
                            <!-- New Audit Loggers-->
                            <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                                                   name="org.wso2.carbon.user.mgt.listeners.UserManagementAuditLogger"
                                                   orderId="1" enable="true"/>
                            <EventListener type="org.wso2.carbon.user.core.listener.UserManagementErrorEventListener"
                                                   name="org.wso2.carbon.user.mgt.listeners.UserMgtFailureAuditLogger"
                                                   orderId="0" enable="true"/>
                            ```
                            <hr>
                            <p>Add the following properties related to the validitating JWT based on JWKS capability. For more information, see Validating JWT based on JWKS.</p>
                            ```
                            <!-- JWT validator configurations -->
                            <JWTValidatorConfigs>
                                <Enable>true</Enable>
                                <JWKSEndpoint>
                                    <HTTPConnectionTimeout>1000</HTTPConnectionTimeout>
                                    <HTTPReadTimeout>1000</HTTPReadTimeout>
                                    <HTTPSizeLimit>51200</HTTPSizeLimit>
                                </JWKSEndpoint>
                            </JWTValidatorConfigs>
                            ```
                            <hr>
                            <p>If you are using SCIM 1.1, disable the following SCIM 2.0 event listener.</p>
                            ```
                            <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                                    name="org.wso2.carbon.identity.scim2.common.listener.SCIMUserOperationListener"
                                    orderId="93" enable="false"/>
                            ```
                            <hr>
                            <p>If you are using SCIM 2.0, disable the following SCIM 1.1 event listener (this listener is disabled by default in 5.6.0).</p>
                            ```
                            <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                                    name="org.wso2.carbon.identity.scim.common.listener.SCIMUserOperationListener"
                                    orderId="90" enable="false"/>
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`oidc-scope-config.xml` file stored in the `<IS_HOME>/repository/conf/identity` folder.</p>
                        </td>
                        <td class="content-wrapper">  
                            <p>Append the values `"upn"` and `"groups"` to the comma separated list within the `<Scope id="openid"><Claim>` element.</p>
                            ```
                            <Claim>
                            sub,email,email_verified,name,family_name,given_name,middle_name,nickname,preferred_username,upn,groups,profile,picture,website,gender,birthdate,zoneinfo,locale,updated_at,phone_number,phone_number_verified,address,street_address,country,formatted,postal_code,locality,region
                            </Claim>
                            ```
                            <p>These are MP-JWT supported claims. The MP-JWT 1.0 specification has introduced two claims; namely "upn" and "groups", which are mandatory to generate a JWT token that is supported by the MicroProfile JWT authentication framework.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`catalina-server.xml` file stored in the `<IS_HOME>/repository/conf/tomcat` folder.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Disable the following properties by setting the relevant properties to false to avoid displaying unneccessary information.</p>
                            ```
                            <!--Error pages -->
                            <Valve className="org.apache.catalina.valves.ErrorReportValve" showServerInfo="false" showReport="false"/>
                            ``` 
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`claim-config.xml` file stored in the `<IS_HOME>/repository/conf/` folder.</p>
                        </td>
                        <td>
                            <p>Add the following claims within the `<Dialect dialectURI="http://wso2.org/claims">` dialect tag.</p>
                            ```
                            <Claim>
                                <ClaimURI>http://wso2.org/claims/userprincipal</ClaimURI>
                                <DisplayName>User Principal</DisplayName>
                                <AttributeID>uid</AttributeID>
                                <Description>User Principal</Description>
                            </Claim>
                            <Claim>
                                <ClaimURI>http://wso2.org/claims/extendedRef</ClaimURI>
                                <DisplayName>Extended Ref</DisplayName>
                                <!-- Proper attribute Id in your user store must be configured for this -->
                                <AttributeID>extendedRef</AttributeID>
                                <Description>Extended Ref</Description>
                            </Claim>
                            <Claim>
                                <ClaimURI>http://wso2.org/claims/extendedDisplayName</ClaimURI>
                                <DisplayName>Extended Display Name</DisplayName>
                                <!-- Proper attribute Id in your user store must be configured for this -->
                                <AttributeID>extendedDisplayName</AttributeID>
                                <Description>Extended Display Name</Description>
                            </Claim>
                            <Claim>
                                <ClaimURI>http://wso2.org/claims/costCenter</ClaimURI>
                                <DisplayName>Cost Center</DisplayName>
                                <!-- Proper attribute Id in your user store must be configured for this -->
                                <AttributeID>costCenter</AttributeID>
                                <Description>Cost Center</Description>
                            </Claim>
                            <Claim>
                                <ClaimURI>http://wso2.org/claims/extendedExternalId</ClaimURI>
                                <DisplayName>Extended External ID</DisplayName>
                                <!-- Proper attribute Id in your user store must be configured for this -->
                                <AttributeID>extendedExternalId</AttributeID>
                                <Description>Extended External ID</Description>
                            </Claim>
                            ```
                            <hr>
                            <p>Add the following claims within the `<Dialect dialectURI="http://wso2.org/oidc/claim">` dialect tag.</p>
                            ```
                            <Claim>
                                <ClaimURI>upn</ClaimURI>
                                <DisplayName>User Principal</DisplayName>
                                <AttributeID>uid</AttributeID>
                                <Description>The user principal name</Description>
                                <DisplayOrder>11</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/userprincipal</MappedLocalClaim>
                            </Claim>
                            <Claim>
                                <ClaimURI>groups</ClaimURI>
                                <DisplayName>User Groups</DisplayName>
                                <AttributeID>role</AttributeID>
                                <Description>List of group names that have been assigned to the principal. This typically will require a mapping at the application container level to application deployment roles.</Description>
                                <DisplayOrder>12</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/role</MappedLocalClaim>
                            </Claim>
                            ```
                            <hr>
                            <p>Add the following claims within the `<Dialect dialectURI="urn:ietf:params:scim:schemas:core:2.0:User">` dialect tag.</p>
                            ```
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:emails</ClaimURI>
                                <DisplayName>Emails</DisplayName>
                                <AttributeID>mail</AttributeID>
                                <Description>Email Addresses</Description>
                                <DisplayOrder>5</DisplayOrder>
                                <SupportedByDefault />
                                <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                <MappedLocalClaim>http://wso2.org/claims/emailaddress</MappedLocalClaim>
                            </Claim>
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers</ClaimURI>
                                <DisplayName>Phone Numbers</DisplayName>
                                <AttributeID>phoneNumbers</AttributeID>
                                <Description>Phone Numbers</Description>
                                <DisplayOrder>5</DisplayOrder>
                                <SupportedByDefault/>
                                <RegEx>^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$</RegEx>
                                <MappedLocalClaim>http://wso2.org/claims/phoneNumbers</MappedLocalClaim>
                            </Claim>
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:photos</ClaimURI>
                                <DisplayName>Photo</DisplayName>
                                <AttributeID>photos</AttributeID>
                                <Description>Photo</Description>
                                <DisplayOrder>5</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/photos</MappedLocalClaim>
                            </Claim>
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:core:2.0:User:addresses</ClaimURI>
                                <DisplayName>Address</DisplayName>
                                <AttributeID>addresses</AttributeID>
                                <Description>Address</Description>
                                <DisplayOrder>5</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/addresses</MappedLocalClaim>
                            </Claim>
                            ```
                            <hr>
                            <p>Replace the following property values within the `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:employeeNumber` claim URI.</p>
                            ```
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:employeeNumber</ClaimURI>
                                <DisplayName>Employee Number</DisplayName>
                                <AttributeID>extendedExternalId</AttributeID>
                                <Description>Employee Number</Description>
                                <Required />
                                <DisplayOrder>1</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/extendedExternalId</MappedLocalClaim>
                            </Claim>
                            ```
                            <hr>
                            <p>Replace the following property values within the `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:costCenter` claim URI.</p>
                            ```
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:costCenter</ClaimURI>
                                <DisplayName>Cost Center</DisplayName>
                                <AttributeID>costCenter</AttributeID>
                                <Description>Cost Center</Description>
                                <Required />
                                <DisplayOrder>1</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/costCenter</MappedLocalClaim>
                            </Claim>
                            ```
                            <hr>
                            <p>Replace the following property values within the `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.$ref` claim URI.</p>
                            ```
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.$ref</ClaimURI>
                                <DisplayName>Manager - home</DisplayName>
                                <AttributeID>extendedRef</AttributeID>
                                <Description>Manager - home</Description>
                                <Required />
                                <DisplayOrder>1</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/extendedRef</MappedLocalClaim>
                            </Claim>
                            ```
                            <hr>
                            <p>Replace the following property values within the `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.displayName` claim URI.</p>
                            ```
                            <Claim>
                                <ClaimURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager.displayName</ClaimURI>
                                <DisplayName>Manager - Display Name</DisplayName>
                                <AttributeID>extendedDisplayName</AttributeID>
                                <Description>Manager - Display Name</Description>
                                <Required />
                                <DisplayOrder>1</DisplayOrder>
                                <SupportedByDefault />
                                <MappedLocalClaim>http://wso2.org/claims/extendedDisplayName</MappedLocalClaim>
                            </Claim>
                            ```
                            <hr>
                            <p>Add the following claims within the root tag. This new claim dialect and the claims within it are required for eiDAS.</p>
                            <p>For more information, see [eIDAS SAML Attribute Profile Support via WSO2 Identity Server](../../learn/eidas-saml-attribute-profile-via-wso2-identity-server).</p>
                            <details class="note" open="">
                                <summary>click here to view the claims</summary>
                                <p>
                                    ```
                                    <Dialect dialectURI="http://eidas.europa.eu/attributes/naturalperson">
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/PersonIdentifier</ClaimURI>
                                            <DisplayName>Person Identifier</DisplayName>
                                            <AttributeID>scimId</AttributeID>
                                            <Description>Person Identifier</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/userid</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/CurrentFamilyName</ClaimURI>
                                            <DisplayName>Current Family Name</DisplayName>
                                            <AttributeID>sn</AttributeID>
                                            <Description>Current Family Name</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/lastname</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/CurrentGivenName</ClaimURI>
                                            <DisplayName>Current Given Name</DisplayName>
                                            <AttributeID>givenName</AttributeID>
                                            <Description>Current Given Name</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/givenname</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/DateOfBirth</ClaimURI>
                                            <DisplayName>Date of birth</DisplayName>
                                            <AttributeID>dateOfBirth</AttributeID>
                                            <Description>Date of birth</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/dob</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/BirthName</ClaimURI>
                                            <DisplayName>Birth Name</DisplayName>
                                            <AttributeID>uid</AttributeID>
                                            <Description>Birth Name</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/username</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/PlaceOfBirth</ClaimURI>
                                            <DisplayName>Place of Birth</DisplayName>
                                            <AttributeID>country</AttributeID>
                                            <Description>Place of Birth</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/country</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/CurrentAddress</ClaimURI>
                                            <DisplayName>Current Address</DisplayName>
                                            <AttributeID>localityAddress</AttributeID>
                                            <Description>Current Address</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/addresses</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/naturalperson/Gender</ClaimURI>
                                            <DisplayName>Gender</DisplayName>
                                            <AttributeID>gender</AttributeID>
                                            <Description>Gender</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/gender</MappedLocalClaim>
                                        </Claim>
                                    </Dialect>
                                    <Dialect dialectURI="http://eidas.europa.eu/attributes/legalperson">
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/LegalPersonIdentifier</ClaimURI>
                                            <DisplayName>Legal Person Identifier</DisplayName>
                                            <AttributeID>extendedExternalId</AttributeID>
                                            <Description>Legal Person Identifier</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/extendedExternalId</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/LegalName</ClaimURI>
                                            <DisplayName>Legal Person Name</DisplayName>
                                            <AttributeID>extendedDisplayName</AttributeID>
                                            <Description>Legal Person Name</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/extendedDisplayName</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/LegalPersonAddress</ClaimURI>
                                            <DisplayName>Legal Person Address</DisplayName>
                                            <AttributeID>localityAddress</AttributeID>
                                            <Description>Legal Person Address</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/addresses</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/VATRegistrationNumber</ClaimURI>
                                            <DisplayName>VAT Registration Number</DisplayName>
                                            <AttributeID>im</AttributeID>
                                            <Description>VAT Registration Number</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/im</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/TaxReference</ClaimURI>
                                            <DisplayName>Tax Reference</DisplayName>
                                            <AttributeID>postalcode</AttributeID>
                                            <Description>Tax Reference</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/postalcode</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/D-2012-17-EUIdentifier</ClaimURI>
                                            <DisplayName>EU Identifier</DisplayName>
                                            <AttributeID>externalId</AttributeID>
                                            <Description>EU Identifier</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/externalid</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/LEI</ClaimURI>
                                            <DisplayName>LEI</DisplayName>
                                            <AttributeID>extendedRef</AttributeID>
                                            <Description>LEI</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/extendedRef</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/EORI</ClaimURI>
                                            <DisplayName>Economic Operator Registration and Identification</DisplayName>
                                            <AttributeID>departmentNumber</AttributeID>
                                            <Description>Economic Operator Registration and Identification</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/department</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/SEED</ClaimURI>
                                            <DisplayName>System for Exchange of Excise Data Identifier</DisplayName>
                                            <AttributeID>nickName</AttributeID>
                                            <Description>System for Exchange of Excise Data Identifier</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/nickname</MappedLocalClaim>
                                        </Claim>
                                        <Claim>
                                            <ClaimURI>http://eidas.europa.eu/attributes/legalperson/SIC</ClaimURI>
                                            <DisplayName>Standard Industrial Classification</DisplayName>
                                            <AttributeID>nickName</AttributeID>
                                            <Description>Standard Industrial Classification</Description>
                                            <Required/>
                                            <DisplayOrder>1</DisplayOrder>
                                            <SupportedByDefault/>
                                            <MappedLocalClaim>http://wso2.org/claims/nickname</MappedLocalClaim>
                                        </Claim>
                                    </Dialect>
                                    ```
                                </p>
                            </details>
                        </td>
                    </tr>
                </tbody>
            </table>


        !!! tip
            For more information, see the [WSO2 IS 5.6.0 migration guide](https://docs.wso2.com/display/IS560/Upgrading+from+the+Previous+Release).



    ??? abstract "From WSO2 IS 5.6.0 to 5.7.0"
        ??? info "Configuration changes"
            <table>
                <thead>
                    <tr class="header">
                        <th>Configuration File</th>
                        <th>Changes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="content-wrapper">
                            <p>`carbon.xml` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Change the version property value to `5.7.0`.</p>
                            ```
                            <Version>5.7.0</Version>
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`axis2.xml` file stored in the `<IS_HOME>/repository/conf/axis2` directory.</p>                            
                        </td>
                        <td class="content-wrapper">
                            <p>Change the following property values to 5.7.0.</p>
                            ```
                            <parameter name="userAgent" locked="true">
                                    WSO2 Identity Server-5.7.0
                            </parameter>
                            <parameter name="server" locked="true">
                                WSO2 Identity Server-5.7.0
                            </parameter>
                            ```                            
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">                            
                            <p>`application-authentication.xml` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                                <p>Under `<Extensions>`, do the following changes to enable adaptive authentication:</p>
                                    <ul>
                                        <li>Change the value of `<StepBasedSequenceHandler>` from `org.wso2.carbon.identity.application.authentication.framework.handler.sequence.impl.DefaultStepBasedSequenceHandler` to `org.wso2.carbon.identity.application.authentication.framework.handler.sequence.impl.GraphBasedSequenceHandler`.</li>
                                        <li>Change the value of `<StepHandler>` from `org.wso2.carbon.identity.application.authentication.framework.handler.step.impl.DefaultStepHandler` to `org.wso2.carbon.identity.application.authentication.framework.handler.step.impl.GraphBasedStepHandler`.</li>
                                    </ul>
                                <hr>
                                <p>Add the following configuration under `<AuthenticatorConfigs>`:</p>
                                ```
                                <AuthenticatorConfig name="IdentifierExecutor" enabled="true">
                                     <Parameter name="ValidateUsername">false</Parameter>
                                </AuthenticatorConfig>
                                ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`identity.xml` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Add the following configuration under `<OAuth>`:</p>
                            ```
                            <!-- Token cleanup feature config to clean IDN_OAUTH2_ACCESS_TOKEN table-->
                                    <TokenCleanup>
                                        <!--If true old access token cleaning feature is enabled -->
                                        <EnableTokenCleanup>true</EnableTokenCleanup>
                                        <!--If true  old access token retained in audit table  -->
                                        <RetainOldAccessToken>true</RetainOldAccessToken>
                                    </TokenCleanup>
                            ```
                            <p>This configuration is required to clean the IDN_OAUTH2_ACCESS_TOKEN table.</p>
                            <hr>
                            <p>Under `<OAuth>`, change the value of `<OAuth2DCREPUrl>` from `${carbon.protocol}://${carbon.host}:${carbon.management.port}/api/identity/oauth2/dcr/v1.0/register` to `${carbon.protocol}://${carbon.host}:${carbon.management.port}/api/identity/oauth2/dcr/v1.1/register`. This reflects the DCR version update.</p>
                            <hr>
                            <p>Do the following changes under <SupportedResponseTypes> to replace the deprecated TokenResponseTypeHandler class:</p>
                                <ul>
                                    <li>Change `<SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</ResponseTypeHandlerImplClass>` to `<SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.AccessTokenResponseTypeHandler</ResponseTypeHandlerImplClass>`.</li>
                                    <li>Change `<SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</ResponseTypeHandlerImplClass>` to `<SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.IDTokenResponseTypeHandler</ResponseTypeHandlerImplClass>`.</li>
                                    <li>Change `<SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.TokenResponseTypeHandler</ResponseTypeHandlerImplClass>` to `<SupportedResponseType><ResponseTypeHandlerImplClass>org.wso2.carbon.identity.oauth2.authz.handlers.IDTokenTokenResponseTypeHandler</ResponseTypeHandlerImplClass>`.</li>
                                </ul>
                            <hr>
                            <p>Under `<SSOService>`, add the following SAML2 artifact validity period configuration:</p>
                            ```
                            <SAML2ArtifactValidityPeriodInMinutes>4</SAML2ArtifactValidityPeriodInMinutes>
                            ```
                            <hr>
                            <p>Under `<SCIM>`, add the following configuration that allows you to get all the details of a user from SCIM endpoint if necessary:</p>
                            ```
                            <ShowAllUserDetails>false</ShowAllUserDetails>
                            ```
                            <hr>
                            <p>Add the following configuration that is introduced to support filtering roles when you have configured a service provider role mapping:</p>
                            ```
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
                            <hr>
                            <p>Add the following configuration that allows you to customize the default user interfaces displayed at the time of just-in-time provisioning:</p>
                            ```
                            <JITProvisioning>
                                 <UserNameProvisioningUI>/accountrecoveryendpoint/register.do</UserNameProvisioningUI>
                                 <PasswordProvisioningUI>/accountrecoveryendpoint/signup.do</PasswordProvisioningUI>
                            </JITProvisioning>
                            ```
                            <hr>
                            <p>Add the following configuration to include post authentication handlers introduced via JIT provisioning improvements:</p>
                            ```
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
                            <hr>
                            <p>Do the following changes under `<ResourceAccessControl>`:</p>
                                <p>- To reflect the changes introduced via security advisory WSO2-2018-0462, replace the following set of resources</p>
                                        ```
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
                                <p>with the following:</p>
                                        ```
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
                                <p>- Replace `<Resource context="(.*)/api/identity/recovery/(.*)" secured="true" http-method="all"/>` with the following resource:</p>
                                        ```
                                        <Resource context="(.*)/api/identity/recovery/(.*)" secured="true" http-method="all">
                                            <Permissions>/permission/admin/manage/identity/identitymgt</Permissions>
                                        </Resource>
                                        ```
                                <p>This introduces changes done with regard to access permission for account recovery endpoint.</p>
                                <p>- Add the following resource that allows using /api/identity/auth/ to retrieve data from authentication endpoint itself instead of obtaining via the URL:</p>
                                        ```
                                        <Resource context="(.*)/api/identity/auth/(.*)" secured="true" http-method="all"/>
                                        ```
                                <p>- To reflect the DCR version upgrade, replace the following set of resources </p>
                                        ```
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
                                <p>with the following:</p>
                                        ```
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
                                <hr>
                                <p>Add the following property that was introduced to restrict federated user association done via the UserProfileAdmin admin service:</p>
                                ```
                                <!--
                                This property restricts federated user association done through UserProfileAdmin admin service.
                                Would not affect associations done through provisioning
                                -->
                                <EnableFederatedUserAssociation>false</EnableFederatedUserAssociation>
                                ```
                                <hr>
                                <p>Under `<TenantContextsToRewrite> <WebApp>`, replace `<Context>/api/identity/oauth2/dcr/v1.0/</Context>` with `<Context>/api/identity/oauth2/dcr/v1.1/</Context>` to reflect the DCR version upgrade.</p>
                                <hr>
                                <p>Under `<AdaptiveAuth><EventPublisher>`, replace `<receiverURL>http://localhost:8280/>` with the following configuration:</p>
                                ```
                                <ReceiverURL>https://localhost:8280/</ReceiverURL>
                                <BasicAuthentication>
                                         <Enable>true</Enable>
                                          <Username>admin</Username>
                                          <Password>admin</Password>
                                </BasicAuthentication>
                                ```
                                <hr>
                                <p>This introduces the default configurations for event publisher.</p>
                                <hr>
                                <p>Under `<AdaptiveAuth>`, add the following configurations introduced to support external analytics calls in adaptive authentication:</p>
                                ```
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
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`carbon.xml` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Add the following configuration that introduces parameters related to Carbon Crypto Service, which is a crypto framework used inside Carbon products:</p>
                            ```
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
                            <hr>
                            <p>Under `<Security>`, add the following keystore parameters introduced to encrypting/decrypting internal data:</p>
                            ```
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
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`log4j.properties` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>Add the following lines that include the properties introduced to support masking sensitive information in your logs:</p>
                            ```
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
                        </td>
                    </tr>
                </tbody>
            </table>

        !!! Tip
            For more information, see [WSO2 IS 5.7.0 migration guide](https://docs.wso2.com/display/IS570/Upgrading+from+the+Previous+Release).

    ??? abstract "From WSO2 IS 5.7.0 to 5.8.0"
        ??? info "Configuration changes"
            <table>
                <thead class="header">
                    <th>Configuration File</th>
                    <th>Changes</th>                    
                </thead>
                <tbody>
                    <tr>
                        <td class="content-wrapper">
                            <p>`carbon.xml` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The version property value has been changed to `5.8.0`.</p>
                            ```
                            <Version>5.8.0</Version>
                            ```
                            <p><b>Why?</b></p>
                            <p>This property indicates the version of WSO2 IS.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`axis2.xml` file stored in the `<IS_HOME>/repository/conf/axis2` directory.</p>
                        </td>
                        <td>
                            <p>The following property values have been changed to `5.8.0`.</p>
                            ```
                            <parameter name="userAgent" locked="true">
                                    WSO2 Identity Server-5.8.0
                            </parameter>
                            <parameter name="server" locked="true">
                                WSO2 Identity Server-5.8.0
                            </parameter>
                            ```
                            <hr>
                            <p>The following property has been added.</p>
                            ```
                            <parameter name="forceIncludeNullElements">false</parameter>
                            ```
                            <p><b>Why?</b></p>
                            <p>Enabling this property forces elements that have the `@IgnoreNullElement` annotation to be returned as well even though the value is `null`. The default value for this property is `false`.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`Endpointconfig.properties` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following property has been added.</p>
                            ```
                            mutualSSLManagerEnabled=true
                            ```
                            <p><b>Why?</b></p>
                            <p>Enabling this property allows the `MutualSSLManager` to initialize the keystores. If it is set to `false`, the `MutualSSLManager` will not initialize the keystore.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`application-authentication.xml` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following property has been added to the following authenticators under the relevant tags.</p>
                                <ul>
                                    <li>BasicAuthenticator - `<AuthenticatorConfig name="BasicAuthenticator" enabled="true"`></li>
                                    <li>BasicAuthRequestPathAuthenticator - `<AuthenticatorConfig name="BasicAuthRequestPathAuthenticator" enabled="true">`</li>
                                </ul>
                            ```
                            <Parameter name="AuthMechanism">basic</Parameter>
                            ```
                            <p><b>Why?</b></p>
                            <p>This property is used to help identify the authentication mechanism used by the authenticator.</p>
                            <hr>
                            <p>The following parameters were added under the `<AuthenticatorConfig name="EmailOTP" enabled="true">` tag.</p>
                            ```
                            <Parameter name="EMAILOTPAuthenticationEndpointURL">emailotpauthenticationendpoint/emailotp.jsp</Parameter>
                            <Parameter name="EmailOTPAuthenticationEndpointErrorPage">emailotpauthenticationendpoint/emailotpError.jsp</Parameter>
                            <Parameter name="EmailAddressRequestPage">emailotpauthenticationendpoint/emailAddress.jsp</Parameter>
                            ```
                            <p><b>Why?</b></p>
                            <p>The following parameters make the Email OTP URLs configurable.</p>
                            <hr>
                            <p>The totp authenticator configurations were uncommented and the following parameters have been added under the `<AuthenticatorConfig name="totp" enabled="true">` tag.</p>
                            ```
                            <Parameter name="Issuer">WSO2</Parameter>
                            <Parameter name="UseCommonIssuer">true</Parameter>
                            ```
                            <p><b>Why?</b></p>
                            <p>The added parameters make the totp issuer configurable instead of showing the domain name.</p>
                            <hr>
                            <p>The following parameter has been removed from the totp authenticator as it is redundant.</p>
                            ```
                            <Parameter name="redirectToMultiOptionPageOnFailure">false</Parameter>
                            ```
                            <hr>
                            <p>The following property has been added under the `<ApplicationAuthentication>` tag.</p>
                            ```
                            <!--Similar to the 'AuthenticationEndpointQueryParams' above, the following section defines the parameters that should be included/excluded in the redirection responses from authentication framework. These parameters may be generated internally from the framework, handlers or authenticators. The filtered parameters will be available via the REST API for authentication framework. "removeOnConsumeFromAPI" defines whether to make the filtered parameters unavailable from the API on the first consumption. -->
                            <AuthenticationEndpointRedirectParams action="exclude" removeOnConsumeFromAPI="true">
                                <AuthenticationEndpointRedirectParam name="loggedInUser"/>
                            </AuthenticationEndpointRedirectParams>
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`captcha-config.properties` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following properties have been added.</p>
                            ```
                            #reCaptcha failed redirect urls
                            #recaptcha.failed.redirect.urls=
                            ```
                            <p><b>Why?</b></p>
                            <p>The properties listed above allow configuring the list of URLs that can be used for redirection when reCaptcha fails.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`scim2-schema-extension.config` file stored in the `<IS_HOME>/repository/conf/` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The `EnterpriseUser` attribute name has been changed from what is reflected in the 5.7.0 code block to the configuration shown in the 5.8.0 code block.</p>
                                <p><b>5.7.0</b></p>
                                ```
                                "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
 
                                "attributeName":"EnterpriseUser",
                                ```
                                <p><b>5.8.0</b></p>
                                ```
                                attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
 
                                "attributeName":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
                                ```
                            <p><b>Why?</b></p>
                            <p>This change is done in order to comply with the [SCIM2 specification](https://tools.ietf.org/html/rfc7643#section-3.3). For more details, see [behavioral change #1 in the behavioral changes table](../../setup/upgrading-from-an-older-version-of-wso2-is#upgradingfromanolderversionofwso2is-1) given above.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`identity-event.properties` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The password policy error message has been modified as follows.</p>
                            ```
                            passwordPolicy.errorMsg='Password pattern policy violated. Password should contain a digit[0-9], a lower case letter[a-z], an upper case letter[A-Z], and one of !@#$%&* characters'
                            ```
                            <hr>
                            <p>The following handlers have been added.</p>
                            ```
                            module.name.17=SAMLLogoutHandler
                            SAMLLogoutHandler.subscription.1=SESSION_TERMINATE
                            SAMLLogoutHandler.enable=true
                             
                            # To delete registration code in database once the user deletion
                            module.name.18=confirmationCodesInvalidate
                            confirmationCodesInvalidate.subscription.1=POST_DELETE_USER
                            ```
                            <p><b>Why?</b></p>
                            <p>These handlers are introduced to support the cross-protocol logout feature and for migration of existing data publishers to event handlers that subscribe to authentication events. For more information about migrating existing data publishers to event handlers, see [Migrating Data Publishers](../../setup/migrading-data-publishers).</p>
                            <hr>
                            <p>The following properties were added.</p>
                            ```
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
                            <p><b>Why?</b></p>
                            <p>The properties listed above are added to support the event listeners that were added for migrating data publishers to event handlers.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`identity.xml` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following property has been added to the `IntrospectionDataProvider` interface.</p>
                            ```
                            <Introspection>
                                <EnableDataProviders>false</EnableDataProviders>
                            </Introspection>
                            ```
                            <p><b>Why?</b></p>
                            <p>This property is used to inject additional data to the introspection response.</p>
                            <hr>
                            <p>The default `CleanUpPeriod` value has been modified to `1440`.</p>
                            ```
                            <CleanUpPeriod>1440</CleanUpPeriod>
                            ```
                            <hr>
                            <p>The default value of the following property has been changed from `false` to `true`.</p>
                            ```
                            <SignJWTWithSPKey>true</SignJWTWithSPKey>
                            ```
                            <hr>
                            <p>The following property has been added under the `<SessionDataPersist>` tag.</p>
                            ```
                            <UserSessionMapping>
                                <Enable>true</Enable>
                            </UserSessionMapping>
                            ```
                            <p><b>Why?</b></p>
                            <p>This property enables terminating all the active sessions of a user during password reset, user deletion, and username renaming.</p>
                            <hr>
                            <p>The following event listeners have been removed.</p>
                            ```
                            <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"                name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="true"/>
 
                            <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="true"/>
                             
                            <EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.captcha.validator.FailLoginAttemptValidator" orderId="10" enable="true"/>
                            ```
                            <p><b>Why?</b></p>
                            <p>From WSO2 IS 5.8.0 onwards, data publishers are migrated to act as event handlers that subscribe to authentication events. Hence, the event listeners listed above have been removed by default.</p>
                            <hr>
                            <p>The following property has been added.</p>
                            ```
                            <FilterUsersAndGroupsOnlyFromPrimaryDomain>false</FilterUsersAndGroupsOnlyFromPrimaryDomain>
                            ```
                            <p><b>Why?</b></p>
                            <p>Enabling this property filters users or groups only from the PRIMARY user store, regardless of the Users and Groups endpoints. If it is set to `false` it filters users or groups across all user stores.</p>
                            <hr>
                            <p>The following property has been added.</p>
                            ```
                            <MandateDomainForUsernamesAndGroupNamesInResponse>false</MandateDomainForUsernamesAndGroupNamesInResponse>
                            ```
                            <p><b>Why?</b></p>
                            <p>Enabling this property prepends the "PRIMARY/" prefix to the user name and role name (group name) that belongs to the PRIMARY user store, in the SCIM2 response regardless of the Users and Groups endpoint. When it is set to `false`, the "PRIMARY/" prefix will not be prepended.</p>
                            <hr>
                            <p>The following properties have been added under the `<Server>` tag.</p>
                            ```
                            <!--This configuration is used to define the Service Provider name regex in DCR and IdentityApplicationManagementService-->
                            <!--<ServiceProviders>-->
                                <!--<SPNameRegex>^[a-zA-Z0-9._-]*$</SPNameRegex>-->
                            <!--</ServiceProviders>-->
                            ```
                            <hr>
                            <p>The following properties have been added under the `<OAuth>` tag.</p>
                            ```
                            <!-- If enabled, resident Idp entity id will be honoured as the issuer location in OpenId Connect Discovery -->
                            <UseEntityIdAsIssuerInOidcDiscovery>true</UseEntityIdAsIssuerInOidcDiscovery>
                            ```
                            <hr>
                            <p>The UMA grant type has been added as a supported grant type under the `<SupportedGrantTypes>` tag.</p>
                            ```
                            <!-- Supported versions: IS 5.7.0 onwards.-->
                            <SupportedGrantType>
                                <GrantTypeName>urn:ietf:params:oauth:grant-type:uma-ticket</GrantTypeName>
                                <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth.uma.grant.UMA2GrantHandler</GrantTypeHandlerImplClass>
                                <GrantTypeValidatorImplClass>org.wso2.carbon.identity.oauth.uma.grant.GrantValidator</GrantTypeValidatorImplClass>
                            </SupportedGrantType>
                            ```
                            <hr>
                            <p>The following properties have been added under the `<OAuth>` tag.</p>
                            ```
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
                            <hr>
                            <p>The following properties have been added under the `<OpenIDConnect>` tag.</p>
                            ```
                            <!-- Add tenant domain to 'realm' claim of ID Token-->
                            <AddTenantDomainToIdToken>false</AddTenantDomainToIdToken>
                            <!-- Add userstore domain to 'realm' claim of ID Token-->
                            <AddUserstoreDomainToIdToken>false</AddUserstoreDomainToIdToken>
                            ```
                            <hr>
                            <p>The following properties have been added under the `<OAuth>` tag.</p>
                            ```
                            <!--Configuration provides the ability to renew the access token and the refresh token(where applicable) per each token request and revoke previously available active token for a matching clientid, user and scopes combination.
                            Not applicable for refresh token grant type and when when self-contained access tokens are used.
                            Default value : false
                            Supported versions : IS 5.8.0 onwards -->
                            <!--<RenewTokenPerRequest>true</RenewTokenPerRequest>-->
                             
                            <!--By enabling this property, in a logout request if the opbs cookie or a valid session does not exist instead of showing the invalid request error page the user will be redirected to the successfully logged out page of the IS or if a valid id_token_hint and a valid post_logout_redirect_uri is available user will be redirected to the post_logout_redirect_uri-->
                            <HandleAlreadyLoggedOutSessionsGracefully>false</HandleAlreadyLoggedOutSessionsGracefully>
                            ```
                            <hr>
                            <p>The following properties have been added under the `<SSOService>` tag.</p>
                            ```
                            <ArtifactResolutionEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlartresolve</ArtifactResolutionEndpoint>
                            <SAMLECPEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlecp</SAMLECPEndpoint>
                            ```
                            <p><b>Why?</b></p>
                            <p>These properties allow adding the Artifact URL as a Resident IDP property in the WSO2 IS management console.</p>
                            <hr>
                            <p>The following properties have been added under the `<SCIM2>` tag.</p>
                            ```
                            <!--<ComplexMultiValuedAttributeSupportEnabled>true</ComplexMultiValuedAttributeSupportEnabled>-->
                            <!--<EnableFilteringEnhancements>true</EnableFilteringEnhancements>-->
                            ```
                            <p><b>Why?</b></p>
                            ```
                            The `<EnableFilteringEnhancements>` property was introduced for the purpose of applying filtering enhancements for SCIM2 filter results. Enabling this ensures that the Eq filter strictly checks for a string match (in this case cross user store search should not be performed). This configuration also enforces consistency on the filtered attribute formats in the response when filtering is done via different endpoints. e.g. Users and Groups endpoints.
                            ```
                            <hr>
                            <p>The following properties have been added under the `<Recovery>` tag.</p>
                            ```
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
                            <p><b>Why?</b></p>
                            <p>This configuration block is used to enable ReCaptcha verification for password recovery and username recovery.</p>
                            <hr>
                            <p>The following property have been added under the `<SelfRegistration>` tag.</p>
                            ```
                            <CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
                            ```
                            <p><b>Why?</b></p>
                            <p>This property enables configuring a regex pattern for the callback URLs of the account recovery and self registration APIs. The callbackURL included in the requests is then validated with the configured regex pattern.</p>
                            <hr>
                            <p>The following new event listener has been added under the `<EventListeners>` tag.</p>
                            ```
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
                            <p><b>Why?</b></p>
                                <ul>
                                    <li>AbstractIdentityHandler - Enabling this listener logs the audit data for OAuth token issuance and token introspection. Adding this property allows you to disable logging, else if this property is not present in the configuration file, logging is enabled by default. For more information about auditing, see [OAuth Transaction Logs](../../learn/oauth-transaction-logs).</li>
                                    <li>UserOperationEventListener - This event listener is used to support session termination at the point renaming the username.</li>
                                    <li>UserOperationEventListener - This event listener allows adding claims to the audit logs.</li>
                                </ul>
                            <hr>
                            <p>The following caches have been added under the `<CacheManager name="IdentityApplicationManagementCacheManager">` tag.</p>
                            ```
                            <Cache name="JWKSCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
                            <Cache name="ServiceProviderCache.ID" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            <Cache name="ServiceProvideCache.InboundAuth" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
                            ```
                            <p><b>Why?</b></p>
                                <ul>
                                    <li>`JKWSCache` - This property has been added to support JWKS Endpoint Cache invalidation.</li>
                                    <li>.`ServiceProviderCache.ID` and `ServiceProvideCache.InboundAuthKey` - These two properties have been added in order to cache the service provider against the ID and inboundAuth. If these new properties is not present in the configuration file, the configuration value of the ServiceProviderCache is applied for these caches.</li>
                                </ul>
                            <hr>
                            <p>The following resources have been added under the `<ResourceAccessControl>` tag.</p>
                            ```
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
                            <p><b>Why?</b></p>
                            <p>These resources control access to the configuration management resources in WSO2 IS.</p>
                            <hr>
                            <p>The resource context `/scim2/ResourceType to /scim2/ResourceTypes` found under the `<ResourceAccessControl>` tag has been modified as shown below.</p>
                            ```
                            <Resource context="/scim2/ResourceTypes" secured="false" http-method="all">
                            ```
                            <p><b>Why?</b></p>
                            <p>This change is done in order to comply with the [SCIM2 specification](https://tools.ietf.org/html/rfc7643#section-3.3).</p>
                            <hr>
                            <p>The following resource found under the `<ResourceAccessControl>` tag has been removed.</p>
                            ```
                            <Resource context="(.*)/api/identity/auth/(.*)" secured="true" http-method="all"/>
                            ```
                            <p><b>Why?</b></p>
                            ```
                            This change has been made in order to remove protection for the `/api/identity/auth/v1.2/authenticate` API. This is because the API itself authenticates the user.
                            ```
                            <hr>
                            <p>The following resources have been added under the `<ResourceAccessControl>` tag.</p>
                            ```
                            <Resource context="(.*)/api/identity/auth/v1.2/data(.*)" secured="true" http-method="all"/>
                            <Resource context="(.*)/api/identity/auth/v1.2/context(.*)" secured="true" http-method="all"/>
                            <Resource context="(.*)/api/identity/template/mgt/v1.0.0/(.*)" secured="true" http-method="all"/>
                            <Resource context="(.*)/api/identity/user/v1.0/update-username(.*)" secured="true" http-method="PUT">
                                <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
                            </Resource>
                            ```
                            <p><b>Why?</b></p>
                            <p>These resources have been added to secure the `update-username` API.</p>
                            <hr>
                            <p>The following properties have been added under the `<Server>` tag.</p>
                            ```
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
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`jaas.conf` file stored in the `<IS_HOME>/repository/conf/identity` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The value of the following property value has been corrected from `tfalse` to `false`.</p>
                            ```
                            useKeyTab=false
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`Webapp-classloading-environments.xml` file stored in the `<IS_HOME>/repository/conf/` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following ExclusiveEnvironment has been added under the `<Classloading>` tag.</p>
                            ```
                            <ExclusiveEnvironments>
                                <ExclusiveEnvironment>
                                    <Name>CXF3</Name>
                                    <Classpath>${carbon.home}/lib/runtimes/cxf3/*.jar;${carbon.home}/lib/runtimes/cxf3/</Classpath>
                                </ExclusiveEnvironment>
                            </ExclusiveEnvironments>
                            ```
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`carbon.xml` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following properties related to the tenant deletion feature have been added under the `<Server> <Tenant>` tag.</p>
                            ```
                            <!-- Flag to enable or disable tenant deletion. By default tenant deletion is enabled-->
                            <TenantDelete>true</TenantDelete>
                            <!-- Configurations related to listener invocation by tenant admin service-->
                            <ListenerInvocationPolicy>
                                <!-- Flag to enable or disable listener invocation on tenant delete. This is disabled by default-->
                                <InvokeOnDelete>false</InvokeOnDelete>
                            </ListenerInvocationPolicy>
                            ```
                            <hr>
                            <p>The following property has been added under the `<Server>` tag.</p>
                            ```
                            <!--EnablePasswordTrim>false</EnablePasswordTrim-->
                            ```
                            <hr>
                            <p>The following property has been added.</p>
                            ```
                            <ForceLocalCache>true</ForceLocalCache>
                            ```
                            <p><b>Why?</b></p>
                            <p>Enabling this property forces all the caches to behave as local caches. It is required to enable this in order to have cache invalidation in between the IS nodes in a clustered enviornment.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`claim-config.xml` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The AttributeID of the `http://wso2.org/claims/resourceType` claim has been modified to `resourceType`.</p>
                            ```
                            <AttributeID>resourceType</AttributeID>
                            ```
                            <hr>
                            <p>The RegEx of the `http://wso2.org/claims/phoneNumbers` claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <hr>
                            <p>The RegEx of the `urn:scim:schemas:core:1.0:phoneNumbers` claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <hr>
                            <p>The AttributeID of the `claim urn:ietf:params:scim:schemas:core:2.0:meta.resourceType` claim has been modified to `resourceType` instead of `userType`.</p>
                            ```
                            <AttributeID>resourceType</AttributeID>
                            ```
                            <p><b>Why?</b></p>
                            <p>The value "Ref" is reserved in open LDAPs for referrals. Therefore, this attributeID was modified to avoid the errors when using Active Directory open LDAPs.</p>
                            <hr>
                            <p>The RegEx of the `urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers` claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <hr>
                            <p>The Regex of the `urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.mobile` claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <hr>
                            <p>The RegEx of the `urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.home` claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <hr>
                            <p>The RegEx of the urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.work claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <hr>
                            <p>The RegEx of the `urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.other` claim has been modified as follows.</p>
                            ```
                            <RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
                            ```
                            <p><b>Why?</b></p>
                            <p>The default regular expression values for phone numbers were modified in the `claim-config.xml` file in order to recognize US and Canadian numbers with the extension code as well.</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`log4j.properties` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following properties have been added.</p>
                            ```
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
                        </td>
                    </tr>
                    <tr>
                        <td class="content-wrapper">
                            <p>`user-mgt.xml` file stored in the `<IS_HOME>/repository/conf` directory.</p>
                        </td>
                        <td class="content-wrapper">
                            <p>The following properties have been added under the `<UserManager> <Realm> <Configuration>` tag.</p>
                            ```
                            <!-- Enable username claim retrieve from the UM_USER_NAME in JDBC datasources -->
                            <OverrideUsernameClaimFromInternalUsername>true</OverrideUsernameClaimFromInternalUsername
                            ```
                            <hr>
                            <p>The following property has been under under the `JDBCUserStoreManager` configuration block.</p>
                            ```
                            <Property name="LeadingOrTrailingSpaceAllowedInUserName">false</Property>
                            ```
                            <p>The value of the `<UserNameListFilter>` property under the `ReadOnlyLDAPUserStoreManager` configuration block has been modified to the value given below.</p>
                            ```
                            (&amp;(objectClass=person)(!(sn=Service)))
                            ```
                            <p>The value of the `<UserNameListFilter>` property under the `ActiveDirectoryUserStoreManager` and `ReadWriteLDAPUserStoreManager` configuration blocks has been modified as follows.</p>
                            ```
                            (&amp;(objectClass=user)(!(sn=Service)))
                            ```
                            <p>The following property has been added under the `ActiveDirectoryUserStoreManager` and the `ReadWriteLDAPUserStoreManager` configuration blocks.</p>
                            ```
                            <Property name="StartTLSEnabled">false</Property>
                            ```
                        </td>
                    </tr>
                </tbody>
            </table>


        !!! Tip
            For more information, see [WSO2 IS 5.8.0 migration guide](https://docs.wso2.com/display/IS580/Upgrading+from+the+Previous+Release).

5. Replace the `<NEW_IS_HOME>/repository/conf` folder with the modified copy of the `<OLD_IS_HOME>/repository/conf` folder.

6. Proceed to the Migrating the data section to run the migration client.



### Migrating the custom components

Any custom OSGI bundles which were added manually should be recompiled with new dependency versions that are relevant to the new WSO2 IS version.  All custom OSGI components reside in the `<OLD_IS_HOME>/repository/components/dropins` directory.

1. Get the source codes of the custom OSGI components located in the dropins directory. 

2. Change the dependency versions in the relevant POM files according to the WSO2 IS version that you are upgrading to, and compile them. The compatible dependency versions for each release of WSO2 IS is given below. 
    * [WSO2 Identity Server 5.1.0](https://github.com/wso2/product-is/blob/v5.1.0/pom.xml) 
    * [WSO2 Identity Server 5.2.0](https://github.com/wso2/product-is/blob/v5.2.0/pom.xml)
    * [WSO2 Identity Server 5.3.0](https://github.com/wso2/product-is/blob/v5.3.0/pom.xml) 
    * [WSO2 Identity Server 5.4.0](https://github.com/wso2/product-is/blob/v5.4.0/pom.xml) 
    * [WSO2 Identity Server 5.5.0](https://github.com/wso2/product-is/blob/v5.5.0/pom.xml)
    * [WSO2 Identity Server 5.6.0](https://github.com/wso2/product-is/blob/v5.6.0/pom.xml)
    * [WSO2 Identity Server 5.7.0](https://github.com/wso2/product-is/blob/v5.7.0/pom.xml)

3. If you come across any compile time errors, refer to the WSO2 IS code base and make the necessary changes related to that particular component version.

4. Add the compiled JAR files to the `<NEW_IS_HOME>/repository/components/dropins` directory.

5. If there were any custom OSGI components in `<OLD_IS_HOME>/repository/components/lib` directory, add newly compiled versions of those components to the `<NEW_IS_HOME>/repository/components/lib`  directory.

### Migrating the data

To upgrade the version of WSO2 Identity Server, the user store database should be upgraded. Note that there are no registry schema changes between versions. 

Follow the steps below as needed to complete the migration process.

Download the latest version of WSO2 Identity Server and unzip it in the <NEW_IS_HOME> directory.

<ol type="1">
    <li>Take a backup of the existing database used by the <code><OLD_IS></code>. This backup is necessary in case the migration causes issues in the existing database.
   Make the following database updates as indicated below.
   <ol type="a">
        <li>Download the migration resources and unzip it to a local directory. This folder is referred to as <code><IS5.x.x_MIGRATION_TOOL_HOME></code>. </li>
        <li>Navigate to the migration-service directory. Change the build version of the .pom file to the version of WSO2 Identity Server that you want to upgrade to, and build it.</li>
        <li>Copy the `org.wso2.carbon.is.migration-5.x.x.jar` and the <code>snakeyaml-1.16.0.wso2v1.jar</code> found in the <code><IS5.x.x_MIGRATION_TOOL_HOME></code> folder, and paste it in the <code><NEW_IS_HOME>/repository/components/dropins</code> directory.</li>
        <li>Copy migration-resources folder to the <code><NEW_IS_HOME></code> root folder.</li>
        <li>Set the following property values accordingly in the migration-config.yaml file found in the <code><NEW_IS_HOME>/migration-resources</code> folder. Specify the current WSO2 Identity Server version as the currentVersion value and specify the new version of WSO2 Identity Server that you want to migrate to, as the <code>migrateVersion</code>.</li>
        <li type="none">
            <div class="admonition tip">
                <p class="admonition-title">Tip</p>
                <p>If your current version of WSO2 Identity Server is 5.4.1, set the value of the `currentVersion` parameter to 5.4.0 in the `migration-config.yaml` instead. This is because data migration is not required when migrating from 5.4.0 to 5.4.1.</p>
            </div>
            <div>
            ```
            migrationEnable: "true"         
            currentVersion: "5.x.x"         
            migrateVersion: "5.x.x"
            ```
            </div>
        </li>
    </ol>
    </li>
    <li>Copy any custom OSGI bundles that were added manually from the <code><OLD_IS_HOME>/repository/components/dropins</code> folder and paste it in the <code><NEW_IS_HOME>/repository/components/dropins</code> folder. </li>
    <li>Copy any added JAR files from the <code><OLD_IS_HOME>/repository/components/lib</code> folder and paste it in the <code><NEW_IS_HOME>/repository/components/lib</code> folder.</li>
    <li>Set <code>defaultAutoCommit </code> as <code>'<defaultAutoCommit>false</defaultAutoCommit>'</code> in the <PRODUCT_HOME>/repository/conf/datasources/master-datasources.xml directory.
    <li>Copy the <code>.jks</code> files from the <code><OLD_IS_HOME>/repository/resources/security</code> folder and paste them in <code><NEW_IS_HOME>/repository/resources/security</code> folder.</li>
    <li>If you have created tenants in the previous WSO2 Identity Server version and if there are any resources in the `<OLD_IS_HOME>/repository/tenants` directory, copy the content to the <code><NEW_IS_HOME>/repository/tenants</code> directory.</li>
    <li>If you have created secondary user stores in the previous WSO2 IS version, copy the content in the <code><OLD_IS_HOME>/repository/deployment/server/userstores</code> directory to the <code><NEW_IS_HOME>/repository/deployment/server/userstores</code> directory.
        <div class="admonition note">
                <p class="admonition-title">Note</p>
                <p>
                If your current version is 5.0.0, run the following queries on the database that is referenced in the `identity.xml` file in order to identify if there is any corrupted data. 
                ```
                SELECT * FROM IDN_OAUTH2_ACCESS_TOKEN WHERE AUTHZ_USER LIKE '% @%' AND TOKEN_STATE='ACTIVE';
                SELECT * FROM IDN_OAUTH2_ACCESS_TOKEN WHERE AUTHZ_USER NOT LIKE '%@%' AND TOKEN_STATE='ACTIVE';
                ```
                </p>
            </div>
            <div>
    </li>
    <li>Start WSO2 Identity Server with the following command to perform the data migration for all components.
        <ol type="a">
            <li>Linux/Unix:
                ```
                sh wso2server.sh -Dmigrate -Dcomponent=identity
                ```
            </li>
            <li>
                Windows:
                ```
                wso2server.bat -Dmigrate -Dcomponent=identity
                ```
            </li>            
        </ol>
    </li>
    <li>Once the migration is successful, stop the server and remove the following files and folders  from the <code><NEW_IS_HOME>/repository/components/dropins</code> directory.
        <ol type="a">
            <li><code>org.wso2.carbon.is.migration-5.x.x.jar</code></li>
            <li><code>snakeyaml-1.16.0.wso2v1.jar</code></li>
            <li><code>migration-resources directory</code></li>
        </ol>
    </li>
    <li>Revert back <code>defaultAutoCommit </code> as <code>'<defaultAutoCommit>true</defaultAutoCommit>'</code> in the <PRODUCT_HOME>/repository/conf/datasources/master-datasources.xml directory after migration is successful.</li>

