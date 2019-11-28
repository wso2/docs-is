# Using Email Address as the Username

!!! note
    Configuring the email address as the username in an **already running
    Identity Server** is not the production recommended way. Therefore,
    **make sure to configure it before you begin working with WSO2 IS**.
    

1.  Open the 
    `          <IS_HOME>/repository/conf/deployment.toml         ` file.
2.  Add the followign configuration.

    ``` toml
    [tenant_mgt]
    enable_email_domain= true
    ```

3.  Login to the management console and configure the ` Mapped Attribute
    ` property of the ` http://wso2.org/claims/username ` claim ID that
    is under **Dialect dialectURI** `http://wso2.org/claims` to ` mail
    `.

4.  Open the `<IS_HOME>/repository/conf/identity/identity-mgt.properties           `
    file and set the following property to `           true          ` .

    !!! info 
        This step is required due to a known issue that prevents the
        confirmation codes from being removed after they are used when email
        usernames are enabled. This occurs because the '@' character (and
        some special characters) are not allowed in the registry. To
        overcome this issue, enable hashed usernames when saving the
        confirmation codes by configuring the properties below.

    ``` xml
    UserInfoRecovery.UseHashedUserNames=true
    ```

    Optionally, you can also configure the following property to
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
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store] <br> user_name_attribute=&quot;mail&quot;</code></pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UserNameSearchFilter              </code></td>
    <td><div class="content-wrapper">
    <p>Use the mail attribute of the user instead of <code>                 cn                </code> or <code>                 uid                </code> . <strong>LDAP/Active Directory only</strong> <br/>For example:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"> In LDAP,<code>[user_store] <br> user_name_search_filter=`"(&amp;(objectClass=person)(mail=?))"`</code> <br> In Active Directory, <code>[user_store] <br> user_name_search_filter = `"(&amp;(objectClass=user)(mail=?))"`</pre></code>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               UserNameListFilter              </code></td>
    <td><div class="content-wrapper">
    <p>Use the mail attribute of the user if <strong>necessary. LDAP/Active Directory only</strong> <br/>For example:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"> <code>[user_store] <br> user_name_list_filter=`"(&amp;(objectClass=user)(mail=?))"`</code>
    </pre>
    <div class="admonition tip">
    <p class="admonition-title">Tip</p>
    <p>you are trying with the default embedded LDAP user store, this configuration change is not needed.</p>
    </div> 
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UsernameJavaScriptRegEx              </code></td>
    <td><div class="content-wrapper">
    <p>Change this property that is under the relevant user store manager tag as follows. This property allows you to add special characters like "@" in the username.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>username_java_script_regex = &apos;^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$&apos;</code></pre></div>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>          UsernameJavaRegEx           </code></td>
    <td><div class="content-wrapper">
    <p>This is a regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>username_java_regex=&apos;^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}&apos;</code></pre></div>
    </div>
    </div>
    </td>
    </tr>
    <tr class="even">
    <td>Realm configurations</td>
    <td><div class="content-wrapper">
    <p>The username must use the email attribute of the admin user.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[super_admin]<br>username = &quot;admin@wso2.com&quot;<br>password = &quot;admin&quot;</code></pre>
    </div>
    </div>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>Before this configuration, the user having the username <strong>admin</strong> and password <strong>admin</strong> was considered the super administrator. The super administrator user cannot be deleted.</p>
    <p>After this configuration, the user having the username <strong><code>                  admin@wso2.com                 </code></strong> is considered the super administrator. The user having the username admin is considered as a normal administrator.<br />
    <img src="../../assets/img/using-wso2-identity-server/super-admin.png" width="600" /></p></div>
    </div></td>
    </tr>
    </tbody>
    </table>

    !!! info 
        With these configuration users can log in to super tenant with both
        email user name ( *[bob@gmal.com](mailto:bob@wso2.com)* ) or
        non-email user names (alice). But for tenant only email user names
        allowed (tod@ [gmail.com](http://gmail.com) @
        [wso2.com](http://wso2.com) )

    !!! note
    
        You can configure email user name without enabling
        **`            enable_email_domain           `** property, then
        users can login to both super tenant and tenant using email and
        non-email user names. But super tenant users should always use
        ***@carbon.super*** at the end of user names.
    

6.  Restart the server.

!!! info "Related Topics"

    For more information on how to configure primary and secondary user
    stores, see [Configuring User Stores](../../setup/configuring-user-stores).
