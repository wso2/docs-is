<!--
!!! warning
    Configuring the email address as the username in an **already running
    Identity Server** is not the production recommended way. Therefore,
    **make sure to configure it before you begin working with WSO2 IS**.
    

1.  Log in to the Management Console and click **Claims > List > http://wso2.org/claims**.
   
2. Click the **Edit** link corresponding to the **Username** claim and configure the `Mapped Attribute` property to `mail`.

    ![email-as-username-attribute-mapping](../../../../assets/img/guides/email-as-username-attribute-mapping.png)
    
3. Click **Update** to save the changes.

4.  Open the `<IS_HOME>/repository/conf/deployment.toml` file.

5.  Add the following configuration to enable email authentication.

    ``` toml
    [tenant_mgt]
    enable_email_domain= true
    ```
    
6. Configure the following set of parameters in the userstore
    configuration, depending on the type of userstore you are connected
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
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>user_name_attribute = &quot;mail&quot;</code></pre>
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
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"> In LDAP,<code>[user_store]<br>user_name_search_filter = `"(&amp;(objectClass=person)(mail=?))"`</code> <br> In Active Directory, <code>[user_store]<br>user_name_search_filter = `"(&amp;(objectClass=user)(mail=?))"`</pre></code>
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
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"> In LDAP,<code>[user_store]<br>user_name_list_filter = `"(&amp;(objectClass=person)(!(sn=Service)))"`</code> <br> In Active Directory, <code>[user_store]<br>user_name_list_filter = `"(&amp;(objectClass=user)(!(sn=Service)))"`</code>
    </pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UsernameJavaScriptRegEx              </code></td>
    <td><div class="content-wrapper">
    <p>Change this property that is under the relevant userstore manager tag as follows. This property allows you to add special characters like "@" in the username.</p>
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
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>username_java_regex = &apos;^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}&apos;</code></pre></div>
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
    <img src="../../../../assets/img/guides/super-admin.png" width="600" /></p></div>
    </div></td>
    </tr>
    </tbody>
    </table>

    !!! info 
        - With these configuration users can log in to super tenant with both
        email username (**`alex@gmail.com`**) or
        non-email usernames (`larry`). However, for tenants, only email usernames are allowed. (**`tod@gmail.com@wso2.com`**). 
        - You can configure email username without enabling the **`enable_email_domain`** property (step 5). Then users can log in to both the super tenant and the tenant using email and non-email usernames. However, super tenant users should always use
        ***@carbon.super*** at the end of usernames.

7.  Restart the server.
-->
