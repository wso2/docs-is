# Upgrading from a Previous Release

The following instructions guide you through upgrading from WSO2
Identity Server 5.4.0 to WSO2 Identity Server 5.5.0. In this topic,
`         <OLD_IS_HOME>        ` is the directory that Identity Server
5.4.0 resides in and `         <NEW_IS_HOME>        ` is the directory
that Identity Server 5.5.0 resides in.

!!! tip
    
    Before you begin
    
    This release is a WUM-only release. This means that there are no manual
    patches. Any further fixes or latest updates for this release can be
    updated through the WSO2 Update Manager (WUM).
    
    -   **If you are upgrading to this version to use this version in your
        production environment**, use the WSO2 Update Manager and get the
        latest available updates for WSO2 IS 5.5.0. For more information on
        how to do this, see [Updating WSO2
        Products](https://docs.wso2.com/display/ADMIN44x/Updating+WSO2+Products)
        .
    

Migrating the embedded LDAP user store

It is not generally recommended to use the embedded LDAP user store that
is shipped with WSO2 Identity Server in production setups. However, if
migration of the embedded LDAP is required, follow the instructions
below to migrate the existing IS 5.4.0 LDAP user store to IS 5.5.0.

-   Copy the `           <OLD_IS_HOME>/repository/data          ` folder
    to `           <NEW_IS_HOME>/repository/data          ` folder.
-   Restart the server to save the changes.

To upgrade the version of WSO2 Identity Server, the user store database
should be upgraded. Note that there are no registry schema changes
between versions.

Follow the steps below as needed to complete the migration process.

1.  Download Identity Server 5.5.0 and unzip it in the
    `          <NEW_IS_HOME>         ` directory.
2.  Take a backup of the existing database used by Identity Server
    5.4.0. This backup is necessary in case the migration causes issues
    in the existing database.
3.  Make the following database updates as indicated below.  
    1.  Download the [migration
        resources](https://docs.wso2.com/download/attachments/56986329/wso2is-5.5.0-migration.zip?version=7&modificationDate=1543908941000&api=v2)
        and unzip it to a local directory. This folder is referred to as
        `             <IS5.5.0_MIGRATION_TOOL_HOME>            ` .

    2.  Copy the
        `             org.wso2.carbon.is.migration-5.5.0.jar            `
        and the `             snakeyaml-1.16.0.wso2v1.jar            `
        found in the
        `             <IS5.5.0_MIGRATION_TOOL_HOME>            ` folder,
        and paste it in the
        `             <NEW_IS_HOME>/repository/components/dropins            `
        directory.

    3.  Copy migration-resources folder to the
        `             <NEW_IS_HOME>            ` root folder.

    4.  Ensure that the following property values are as follows in the
        `             migration-config.yaml            ` file found in
        the `             <NEW_IS_HOME>/migration-resources            `
        folder.

        ``` java
        migrationEnable: "true"

        currentVersion: "5.4.0"

        migrateVersion: "5.5.0"
        ```

4.  Copy any custom OSGI bundles that were added manually from the
    `          <OLD_IS_HOME>/repository/components/dropins         `
    folder and paste it in the
    `          <NEW_IS_HOME>/repository/components/dropins         `
    folder.
5.  Copy any added JAR files from the
    `           <OLD_IS_HOME>/repository/components/lib          `
    folder and paste it in the
    `           <NEW_IS_HOME>/repository/components/lib          `
    folder.

6.  Copy the `           .jks          ` files from the
    `           <OLD_IS_HOME>/repository/resources/security          `
    folder and paste them in
    `           <NEW_IS_HOME>/repository/resources/security          `
    folder.

7.  If you have created tenants in the previous WSO2 Identity Server
    version and if there are any resources in the
    `          <OLD_IS_HOME>/repository/tenants         ` directory,
    copy the content to the
    `          <NEW_IS_HOME>/repository/tenants         ` directory.
8.  If you have created secondary user stores in the previous WSO2 IS
    version, copy the content in the
    `           <OLD_IS_HOME>/repository/deployment/server/userstores          `
    directory to the
    `           <NEW_IS_HOME>/repository/deployment/server/userstores          `
    directory.

9.  You can use one of the following approaches to migrate depending on
    your production evironment.

    -   **Migrating by updating the custom configurations**

        **This approach is recommended if:**

        -   You have done very few configuration changes in your
            previous version of WSO2 IS. These configuration changes
            have been tracked and are easy to redo.

        **Steps:**

        1.  If you have made configuration changes to the config files
            in your previous version of WSO2 IS, update the files in the
            `                <NEW_IS_HOME>/repository/conf               `
            folder with your own configurations.
        2.  Proceed to [step 10](#UpgradingfromaPreviousRelease-step11)
            to run the migration client.

    -   **Migrating by updating the new configurations in 5.5.0**

        **This approach is recommended if:**

        -   You have done many configuration changes in your previous
            version of WSO2 IS.
        -   These configurations have not been tracked completely and/or
            are difficult to redo.

        **Steps:**

        Make a copy of the
        `                <OLD_IS_HOME>/repository/conf               `
        folder. (Do not change the original configs. You may use it as a
        backup in case there are any issues)
        Copy the following configuration files from the
        `                <NEW_IS_HOME>               ` and paste it in
        the copy of the `                <OLD_IS_HOME>               `
        in the relevant path.
        -   `                  <IS_HOME>/repository/conf/carbon.properties                 `

        -   `                  <IS_HOME>/repository/conf/consent-mgt-config.xml                 `

        The table below lists out all the configuration changes from IS
        5.4.0 to IS 5.5.0. You can scroll through the table and change
        the relevant configurations according to the features you are
        using.

        !!! tip
                **Tip:** Scroll left/right to view the entire table below.
        
                **Note:** The configuration changes listed below will not affect
                the existing system because these configurations are applied
                only at first start up and new tenant creation.  
                If you wish to change the configurations for the existing
                tenants, configure it through the management console user
                interface.
        
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
        <td><code>                        carbon.xml                       </code> file stored in the <code>                        &lt;IS_HOME&gt;/repository/conf/identity                       </code> folder.</td>
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
        <td><p><code>                         application-authentication.xml                        </code> file stored in the <code>                         &lt;IS_HOME&gt;/repository/conf/identity                        </code> folder.</p></td>
        <td><div class="content-wrapper">
        <p>Replace the following property found within the <code>                          &lt;Extensions&gt;                         </code> list.</p>
        !!! warning
                <p>If you are using a custom <code>                          &lt;StepBasedSequenceHandler&gt;                         </code>, skip this step.</p>
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
        <p>If you are using a custom authorization handler, see <a href="https://docs.wso2.com/pages/viewpage.action?pageId=103328980">Migrating Custom Authorization Handlers</a> .</p>
        <p>The OpenIDAuthenticator is no longer available. Remove the following configurations that are related to it.</p>
        <p>Remove the following property found within the <code>                          &lt;AuthenticatorNameMappings&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">&lt;AuthenticatorNameMapping name=<span class="st">&quot;OpenIDAuthenticator&quot;</span> alias=<span class="st">&quot;openid&quot;</span> /&gt; </a></code></pre></div>
        </div>
        </div>
        <p>Remove the whole configuration block that starts with the config given below found within the <code>                          &lt;AuthenticatorConfigs&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">&lt;AuthenticatorConfig name=<span class="st">&quot;OpenIDAuthenticator&quot;</span> enabled=<span class="st">&quot;true&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb5-2" title="2">.....</a>
        <a class="sourceLine" id="cb5-3" title="3">.....</a>
        <a class="sourceLine" id="cb5-4" title="4">&lt;/AuthenticatorConfig&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Replace the <code>                          AuthenticatorConfig                         </code> block for the <strong><code>                           MobileConnectAuthenticator                          </code></strong> found within the <code>                          &lt;AuthenticatorConfigs&gt;                         </code> tag, with the following configuration.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;AuthenticatorConfig name=<span class="st">&quot;MobileConnectAuthenticator&quot;</span> enabled=<span class="st">&quot;true&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb6-2" title="2">    &lt;<span class="bu">Parameter</span> name=<span class="st">&quot;MCAuthenticationEndpointURL&quot;</span>&gt;mobileconnectauthenticationendpoint/mobileconnect.<span class="fu">jsp</span>&lt;/<span class="bu">Parameter</span>&gt;</a>
        <a class="sourceLine" id="cb6-3" title="3">    &lt;<span class="bu">Parameter</span> name=<span class="st">&quot;MCDiscoveryAPIURL&quot;</span>&gt;https:<span class="co">//discover.mobileconnect.io/gsma/v2/discovery/&lt;/Parameter&gt;</span></a>
        <a class="sourceLine" id="cb6-4" title="4">    &lt;<span class="bu">Parameter</span> name=<span class="st">&quot;redirectToMultiOptionPageOnFailure&quot;</span>&gt;<span class="kw">false</span>&lt;/<span class="bu">Parameter</span>&gt;</a>
        <a class="sourceLine" id="cb6-5" title="5">&lt;/AuthenticatorConfig&gt;</a></code></pre></div>
        </div>
        </div>
        </div></td>
        </tr>
        <tr class="odd">
        <td><code>                        identity-event.properties                       </code> file stored in the <code>                        &lt;IS_HOME&gt;/repository/conf/identity                       </code> folder.</td>
        <td><div class="content-wrapper">
        <p>Add the following properties that are required for Request Object Support. For more information about the feature, see <a href="_Request_Object_Support_">Request Object Support</a> .</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1">module.<span class="fu">name</span><span class="fl">.11</span>=handleRequestObject</a>
        <a class="sourceLine" id="cb7-2" title="2">handleRequestObject.<span class="fu">subscription</span><span class="fl">.1</span>=POST_REVOKE_ACESS_TOKEN</a>
        <a class="sourceLine" id="cb7-3" title="3">handleRequestObject.<span class="fu">subscription</span><span class="fl">.2</span>=POST_REVOKE_CODE</a>
        <a class="sourceLine" id="cb7-4" title="4">handleRequestObject.<span class="fu">subscription</span><span class="fl">.3</span>=POST_REVOKE_ACESS_TOKEN_BY_ID</a>
        <a class="sourceLine" id="cb7-5" title="5">handleRequestObject.<span class="fu">subscription</span><span class="fl">.4</span>=POST_REVOKE_CODE_BY_ID</a>
        <a class="sourceLine" id="cb7-6" title="6">handleRequestObject.<span class="fu">subscription</span><span class="fl">.5</span>=POST_REFRESH_TOKEN</a>
        <a class="sourceLine" id="cb7-7" title="7">handleRequestObject.<span class="fu">subscription</span><span class="fl">.6</span>=POST_ISSUE_CODE</a>
        <a class="sourceLine" id="cb7-8" title="8">handleRequestObject.<span class="fu">subscription</span><span class="fl">.7</span>=POST_ISSUE_ACCESS_TOKEN</a></code></pre></div>
        </div>
        </div>
        <p>Add the following properties to enable the user event handler used to delete user consents when users are deleted.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb8-1" title="1">module.<span class="fu">name</span><span class="fl">.12</span>=user.<span class="fu">consent</span>.<span class="fu">delete</span></a>
        <a class="sourceLine" id="cb8-2" title="2">user.<span class="fu">consent</span>.<span class="fu">delete</span>.<span class="fu">subscription</span><span class="fl">.1</span>=POST_DELETE_USER</a>
        <a class="sourceLine" id="cb8-3" title="3">user.<span class="fu">consent</span>.<span class="fu">delete</span>.<span class="fu">receipt</span>.<span class="fu">search</span>.<span class="fu">limit</span>=<span class="dv">500</span></a></code></pre></div>
        </div>
        </div>
        </div></td>
        </tr>
        <tr class="even">
        <td><code>                        identity.xml                       </code> file stored in the <code>                        &lt;IS_HOME&gt;/repository/conf/identity                       </code> folder.</td>
        <td><div class="content-wrapper">
        <p>Remove the <code>                          &lt;ClientAuthHandlers&gt;                         </code> code block found within the <code>                          &lt;OAuth&gt;                         </code> tag. From WSO2 IS 5.5.0 onwards, client authentication is handled differently. For more information, see the introduction of the <a href="_Writing_A_New_OAuth_Client_Authenticator_">Writing A New OAuth Client Authenticator</a> topic.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb9" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb9-1" title="1">&lt;ClientAuthHandlers&gt;</a>
        <a class="sourceLine" id="cb9-2" title="2">    &lt;ClientAuthHandler <span class="bu">Class</span>=<span class="st">&quot;org.wso2.carbon.identity.oauth2.token.handlers.clientauth.BasicAuthClientAuthHandler&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb9-3" title="3">        &lt;Property <span class="bu">Name</span>=<span class="st">&quot;StrictClientCredentialValidation&quot;</span>&gt;<span class="kw">false</span>&lt;/Property&gt;</a>
        <a class="sourceLine" id="cb9-4" title="4">    &lt;/ClientAuthHandler&gt;</a>
        <a class="sourceLine" id="cb9-5" title="5">&lt;/ClientAuthHandlers&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following property within the <code>                          &lt;ScopeValidators&gt;                         </code> tag. For more information about the XACML based scope validator, see <a href="_Validating_the_Scope_of_OAuth_Access_Tokens_using_XACML_Policies_">Validating the Scope of OAuth Access Tokens using XACML Policies</a> .</p>
        !!! tip
                <p><strong>Tip:</strong> To migrate custom scope validators, see <a href="_Migrating_Custom_Scope_Validators_">Migrating Custom Scope Validators</a> .</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1">&lt;ScopeValidator <span class="kw">class</span>=<span class="st">&quot;org.wso2.carbon.identity.oauth2.validators.XACMLScopeValidator&quot;</span>/&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following property within the <code>                          &lt;OpenIDConnect&gt;                         </code> tag to enable the service provider wise audience configuration. For more information about this, see</p>
        !!! tip
                <p>This feature requires a new database table that is created when running the migration script. If you do not wish to use this feature, you can set the value of the property given below to false.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1">&lt;EnableAudiences&gt;<span class="kw">true</span>&lt;/EnableAudiences&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following property within the <code>                          &lt;OpenIDConnect&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1">&lt;LogoutTokenExpiration&gt;<span class="dv">120</span>&lt;/LogoutTokenExpiration&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following property within the <code>                          &lt;EventListeners&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.user.core.listener.UserOperationEventListener&quot;</span></a>
        <a class="sourceLine" id="cb13-2" title="2">                       name=<span class="st">&quot;org.wso2.carbon.user.mgt.listeners.UserDeletionEventListener&quot;</span></a>
        <a class="sourceLine" id="cb13-3" title="3">                       orderId=<span class="st">&quot;98&quot;</span> enable=<span class="st">&quot;false&quot;</span>/&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following code block within the root tag after the <code>                          &lt;EventListeners&gt;                         </code> code block. For more information about this configuration, see <a href="Configuring-Users_103330327.html#ConfiguringUsers-Trackinguserdeletionondeletingauser">Tracking user deletion on deleting a user</a> .</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1">&lt;UserDeleteEventRecorders&gt;</a>
        <a class="sourceLine" id="cb14-2" title="2">    &lt;UserDeleteEventRecorder name=<span class="st">&quot;org.wso2.carbon.user.mgt.recorder.DefaultUserDeletionEventRecorder&quot;</span> enable=<span class="st">&quot;false&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb14-3" title="3">        &lt;!-- Un comment below line <span class="kw">if</span> you need to write entries to a separate .<span class="fu">csv</span> file. Otherwise <span class="kw">this</span> will be</a>
        <a class="sourceLine" id="cb14-4" title="4">            written in to a log file using a separate appender. --&gt;</a>
        <a class="sourceLine" id="cb14-5" title="5">        &lt;!--&lt;Property name=<span class="st">&quot;path&quot;</span>&gt;${carbon.<span class="fu">home</span>}/repository/logs/delete-records.<span class="fu">csv</span>&lt;/Property&gt;--&gt;</a>
        <a class="sourceLine" id="cb14-6" title="6">    &lt;/UserDeleteEventRecorder&gt;</a>
        <a class="sourceLine" id="cb14-7" title="7">&lt;/UserDeleteEventRecorders&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Do the following configuration changes to enable fine grained access control introduced with Identity Server 5.5.0</p>
        <p>Remove the following property found within the &lt; <code>                          ResourceAccessControl&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following set of resources within the &lt; <code>                          ResourceAccessControl&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/validate-code&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-2" title="2">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/resend-code&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-3" title="3">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/me&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-4" title="4">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/me&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-5" title="5">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/pi-info&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-6" title="6">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-7" title="7">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-8" title="8">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/user/v1.0/pi-info/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-9" title="9">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/usermgt/view&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-10" title="10">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-11" title="11">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-12" title="12">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/receipts/(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;all&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-13" title="13">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purposes&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-14" title="14">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/add&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-15" title="15">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-16" title="16">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-17" title="17">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purposes(.+)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-18" title="18">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-19" title="19">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-20" title="20">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-21" title="21">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/add&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-22" title="22">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-23" title="23">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-24" title="24">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/pii-categories(.+)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-25" title="25">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-26" title="26">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-27" title="27">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;POST&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-28" title="28">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/add&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-29" title="29">&lt;/<span class="bu">Resource</span>&gt;</a>
        <a class="sourceLine" id="cb16-30" title="30">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.*)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;GET&quot;</span>/&gt;</a>
        <a class="sourceLine" id="cb16-31" title="31">&lt;<span class="bu">Resource</span> context=<span class="st">&quot;(.*)/api/identity/consent-mgt/v1.0/consents/purpose-categories(.+)&quot;</span> secured=<span class="st">&quot;true&quot;</span> http-method=<span class="st">&quot;DELETE&quot;</span>&gt;</a>
        <a class="sourceLine" id="cb16-32" title="32">    &lt;<span class="bu">Permissions</span>&gt;/permission/admin/manage/identity/consentmgt/delete&lt;/<span class="bu">Permissions</span>&gt;</a>
        <a class="sourceLine" id="cb16-33" title="33">&lt;/<span class="bu">Resource</span>&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Replace the following property found within the <code>                          &lt;WebApp&gt;                         </code> tag under the <code>                          &lt;TenantContextsToRewrite&gt;                         </code> tag.</p>
        <div>
        <p><br />
        </p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1">&lt;<span class="bu">Context</span>&gt;/api/identity/user/v0<span class="fl">.9</span>/&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
        </div>
        </div>
        <p>with the one given below</p>
        </div>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1">&lt;<span class="bu">Context</span>&gt;/api/identity/user/v1<span class="fl">.0</span>/&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following new property within the <code>                          &lt;WebApp&gt;                         </code> tag found under the <code>                          &lt;TenantContextsToRewrite&gt;                         </code> tag.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1">&lt;<span class="bu">Context</span>&gt;/api/identity/consent-mgt/v1<span class="fl">.0</span>/&lt;/<span class="bu">Context</span>&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following code block within the root tag after the <code>                          &lt;SSOService&gt;                         </code> code block.</p>
        <p>This configuration specifies whether consent management should be enabled during single sign-on authentication. For more information, see <a href="_Consent_Management_with_Single-Sign-On_">Consent Management with Single-Sign-On</a> .</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1">&lt;Consent&gt;</a>
        <a class="sourceLine" id="cb20-2" title="2">    &lt;!--Specify whether consent management should be enable during SSO.--&gt;</a>
        <a class="sourceLine" id="cb20-3" title="3">    &lt;EnableSSOConsentManagement&gt;<span class="kw">true</span>&lt;/EnableSSOConsentManagement&gt;</a>
        <a class="sourceLine" id="cb20-4" title="4">&lt;/Consent&gt;</a></code></pre></div>
        </div>
        </div>
        <p>Add the following code block within the <code>                          &lt;OAuth&gt;                         </code> tag. This configuration is used to specify the grant types that filter claims based on user consents. The grant types given below are out-of-the-box grant types that prompt the user for consent.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1">&lt;!--Defines the grant types that will filter user claims based on user consent in their responses such as id_token or user info response.<span class="fu">Default</span> grant types that filter user claims based on user consent are &#39;authorization_code&#39; and &#39;implicit&#39;.</a>
        <a class="sourceLine" id="cb21-2" title="2">Supported versions: IS <span class="fl">5.5.</span><span class="dv">0</span> onwards. --&gt;</a>
        <a class="sourceLine" id="cb21-3" title="3"> </a>
        <a class="sourceLine" id="cb21-4" title="4">&lt;UserConsentEnabledGrantTypes&gt;</a>
        <a class="sourceLine" id="cb21-5" title="5">    &lt;UserConsentEnabledGrantType&gt;</a>
        <a class="sourceLine" id="cb21-6" title="6">        &lt;GrantTypeName&gt;authorization_code&lt;/GrantTypeName&gt;</a>
        <a class="sourceLine" id="cb21-7" title="7">    &lt;/UserConsentEnabledGrantType&gt;</a>
        <a class="sourceLine" id="cb21-8" title="8">    &lt;UserConsentEnabledGrantType&gt;</a>
        <a class="sourceLine" id="cb21-9" title="9">        &lt;GrantTypeName&gt;implicit&lt;/GrantTypeName&gt;</a>
        <a class="sourceLine" id="cb21-10" title="10">    &lt;/UserConsentEnabledGrantType&gt;</a>
        <a class="sourceLine" id="cb21-11" title="11">&lt;/UserConsentEnabledGrantTypes&gt;</a></code></pre></div>
        </div>
        </div>
        <p><br />
        </p>
        </div></td>
        </tr>
        <tr class="odd">
        <td><code>                        log4j.properties                       </code> file stored in the <code>                        &lt;IS_HOME&gt;/repository/conf                       </code> folder.</td>
        <td><div class="content-wrapper">
        <p>Add the following properties.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1">log4j.<span class="fu">logger</span>.<span class="fu">DELETE_EVENT_LOGGER</span>=INFO, DELETE_EVENT_LOGFILE</a>
        <a class="sourceLine" id="cb22-2" title="2">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">FileAppender</span></a>
        <a class="sourceLine" id="cb22-3" title="3">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">File</span>=${carbon.<span class="fu">home</span>}/repository/logs/delete-event.<span class="fu">log</span></a>
        <a class="sourceLine" id="cb22-4" title="4">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">Append</span>=<span class="kw">true</span></a>
        <a class="sourceLine" id="cb22-5" title="5">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">layout</span>=org.<span class="fu">apache</span>.<span class="fu">log4j</span>.<span class="fu">PatternLayout</span></a>
        <a class="sourceLine" id="cb22-6" title="6">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">layout</span>.<span class="fu">ConversionPattern</span>=%m %n</a>
        <a class="sourceLine" id="cb22-7" title="7">log4j.<span class="fu">appender</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>.<span class="fu">threshold</span>=INFO</a>
        <a class="sourceLine" id="cb22-8" title="8">log4j.<span class="fu">additivity</span>.<span class="fu">DELETE_EVENT_LOGFILE</span>=<span class="kw">false</span></a></code></pre></div>
        </div>
        </div>
        </div></td>
        </tr>
        <tr class="even">
        <td>provisioning-config.xml file stored in the <code>                        &lt;IS_HOME&gt;/repository/conf/identity                       </code> folder.</td>
        <td><div class="content-wrapper">
        <p>Remove the <code>                          &lt;scim-providers&gt;                         </code> and <code>                          &lt;scim-consumers&gt;                         </code> code blocks from the file.</p>
        </div></td>
        </tr>
        </tbody>
        </table>

        Replace the
        `                 <NEW_IS_HOME>/repository/conf                `
        folder with the modified copy of the
        `                 <OLD_IS_HOME>/repository/conf                `
        folder.

        Proceed to [step 10](#UpgradingfromaPreviousRelease-step11) to
        run the migration client.

10. Start the Identity Server 5.5.0 with the following command to
    perform the data migration for all components.

    1.  Linux/Unix:

        ``` bash
        sh wso2server.sh -Dmigrate -Dcomponent=identity
        ```

    2.  Windows:

        ``` bash
                wso2server.bat -Dmigrate -Dcomponent=identity
        ```

11. Once the migration is successful, stop the server and start using
    the appropriate command.  
    1.  Linux/Unix:

        ``` xml
                sh wso2server.sh
        ```

    2.  Windows:

        ``` xml
                wso2server.bat
        ```
