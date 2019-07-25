# Using Email Address as the Username

!!! note
    
    Note!
    
    Configuring the email address as the username in an **already running
    Identity Server** is not the production recommended way. Therefore,
    **make sure to configure it before you begin working with WSO2 IS**.
    

1.  Open the \<
    `          PRODUCT_HOME>/repository/conf/carbon.xml         ` file.
2.  Look for the commented out configuration
    `           EnableEmailUserName          ` . Uncomment the
    configuration to enable email authentication.

    ``` html/xml
    <EnableEmailUserName>true</EnableEmailUserName>
    ```

3.  Open the \<
    `           IS_HOME>/repository/conf/claim-config.xml          `
    file and configure the `           AttributeID          ` property
    of the
    `                       http://wso2.org/claims/username                     `
    claim ID that is under
    `           <Dialect dialectURI="                       http://wso2.org/claims                      ">          `
    to `           mail          ` .

    ``` java
        <Claim>
           <ClaimURI>http://wso2.org/claims/username</ClaimURI>
           <DisplayName>Username</DisplayName>
           <AttributeID>mail</AttributeID>
           <Description>Username</Description>
        </Claim>
    ```

    !!! note
    
        This file is checked only when WSO2 IS is starting for the first
        time. Therefore, if you haven't configured this property at the time
        of starting up the server for the first time, you will get errors at
        the start up.
    

4.  Open the `           <IS_HOME>/repository/conf/          `
    `           identity/                       identity-mgt.properties           `
    file and set the following property to `           true          ` .

    This step is required due to a known issue that prevents the
    confirmation codes from being removed after they are used when email
    usernames are enabled. This occurs because the '@' character (and
    some special characters) are not allowed in the registry. To
    overcome this issue, enable hashed usernames when saving the
    confirmation codes by configuring the properties below.

    ``` xml
    UserInfoRecovery.UseHashedUserNames=true
    ```

    Optionally, y ou can also configure the following property to
    determine which hash algorithm to use.

    ``` xml
        UserInfoRecovery.UsernameHashAlg=SHA-1
    ```

5.  Configure the following set of parameters in the user store
    configuration, depending on the type of user store you are connected
    to (LDAP/Active Directory/ JDBC).

    <table>
    <thead>
    <tr class="header">
    <th>Parameter</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p><code>                UserNameAttribute               </code></p>
    <p><br />
    </p></td>
    <td><div class="content-wrapper">
    <p>Set the mail attribute of the user. <strong>LDAP/Active Directory only</strong></p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UserNameAttribute&quot;&gt;mail&lt;/Property&gt;</code></pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UserNameSearchFilter              </code></td>
    <td><div class="content-wrapper">
    <p>Use the mail attribute of the user instead of <code>                 cn                </code> or <code>                 uid                </code> . <strong>LDAP/Active Directory only</strong></p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UserNameSearchFilter&quot;&gt;(&amp;amp;(objectClass=identityPerson)(mail=?))&lt;/Property&gt;</code></pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               UserNameListFilter              </code></td>
    <td><div class="content-wrapper">
    <p>Use the mail attribute of the user. <strong>LDAP/Active Directory only</strong></p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UserNameListFilter&quot;&gt;(&amp;amp;(objectClass=identityPerson)(mail=*))&lt;/Property&gt;</code></pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UserDNPattern              </code></td>
    <td><div class="content-wrapper">
    <p>This parameter is used to speed up the LDAP search operations. You can comment out this config. <strong>LDAP/Active Directory only</strong></p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;!--Property name=&quot;UserDNPattern&quot;&gt;cn={0},ou=Users,dc=wso2,dc=com&lt;/Property--&gt;</code></pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><pre><code>UsernameJavaScriptRegEx</code></pre>
    <p><code>                               </code></p></td>
    <td><div class="content-wrapper">
    <p>Change this property that is under the relevant user store manager tag as follows. This property allows you to add special characters like "@" in the username.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb6-1" title="1"><span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;UsernameJavaScriptRegEx&quot;</span><span class="kw">&gt;</span>^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$<span class="kw">&lt;/Property&gt;</span></a></code></pre></div>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><pre><code>UsernameJavaRegEx</code></pre></td>
    <td><div class="content-wrapper">
    <p>This is a regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb8-1" title="1"><span class="kw">&lt;Property</span><span class="ot"> name=</span><span class="st">&quot;UsernameJavaRegEx&quot;</span><span class="kw">&gt;</span>^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$<span class="kw">&lt;/Property&gt;</span></a></code></pre></div>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td>Realm configurations</td>
    <td><div class="content-wrapper">
    <p>The <code>                 AdminUser                </code> username must use the email attribute of the admin user.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;AdminUser&gt;
             &lt;UserName&gt;admin@wso2.com&lt;/UserName&gt;
             &lt;Password&gt;admin&lt;/Password&gt;
    &lt;/AdminUser&gt;</code></pre>
    </div>
    </div>
    !!! note
        <p>Before this configuration, the user having the username <strong>admin</strong> and password <strong>admin</strong> was considered the super administrator. The super administrator user cannot be deleted.</p>
        <p>After this configuration, the user having the username <strong><code>                  admin@wso2.com                 </code></strong> is considered the super administrator. The user having the username admin is considered as a normal administrator.<br />
        <img src=" ../../assets/img/103330456/103330457.png" width="878" height="250" /></p>
        <p>If you changed the password of the admin user to something other than 'admin', start the WSO2 IS server using the -Dsetup parameter as shown in the command below.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1">sh wso2server.<span class="fu">sh</span> -Dsetup</a></code></pre></div>
        </div>
        </div>
    </div></td>
    </tr>
    </tbody>
    </table>

    With these configuration users can log in to super tenant with both
    email user name ( *[bob@gmal.com](mailto:bob@wso2.com)* ) or
    non-email user names (alice). But for tenant only email user names
    allowed (tod@ [gmail.com](http://gmail.com) @
    [wso2.com](http://wso2.com) )

    !!! note
    
        You can configure email user name without enabling
        **`            EnableEmailUserName           `** property, then
        users can login to both super tenant and tenant using email and
        non-email user names. But super tenant users should always use
        ***@carbon.super*** at the end of user names.
    

6.  Restart the server.

**Related Topics**

For more information on how to configure primary and secondary user
stores, see [Configuring User Stores](_Configuring_User_Stores_).
