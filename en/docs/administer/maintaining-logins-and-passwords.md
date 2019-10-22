# Maintaining Logins and Passwords

This section covers the following topics:

### Changing the super admin password

To change the default admin password, log in to the management console
with admin/admin credentials and use the **Change my password** option.
After changing the credentials, change the same in the
`         <IS_HOME>/repository/conf/deployment.toml        ` file:

``` xml
[super_admin]
username = "admin"
password = "admin"
create_admin_account = true
```

### Unlocking the admin user

To unlock an admin user who is locked due to an exceeding number of
login failures, restart the server using the -
`         DunlockAdmin        ` system property

### Recovering a password

Use `         <IS_HOME>/bin/chpasswd.sh        ` script.

### Setting up an email login

You can configure WSO2 products to authenticate users using an email or
mobile number instead of a username.

The '@' is a special character in usernames of WSO2 products as it is
used in multi-tenant environments to build the user's fully-qualified
name. For example, user *daniel* from the tenant domain
[WSO2.com](http://WSO2.com) has the fully-qualified name
*<daniel@WSO2.com>*. Before using an email as the username, configure
the WSO2 product to differentiate between the '@' symbol in the user's
emails and usernames as follows:

1.  Open
    `           <IS_HOME>/repository/conf/deployment.toml          `

2.  Add the configuration
    `           enable_email_domain         ` . This enables email
    authentication.

    ``` html/xml
    [tenant_mgt]
    enable_email_domain= true
    ```

    !!! tip
        When you do this configuration, the email becomes the
        admin username and you cannot configure your email address as an
        attribute in your user profile.
    
3.  Next, edit \
    `           <IS_HOME>/repository/conf/deployment.toml          ` .
    You might be connected to an LDAP, Active Directory, or a JDBC-based
    user store. Regardless of the user store manager, change the
    following:
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
    <td><code>               user_name_attribute              </code></td>
    <td><p>Set the mail attribute of the user.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>user_name_attribute="mail"</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               user_name_search_filter              </code></td>
    <td><p>Use the mail attribute of the user instead of cn or uid.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>user_name_search_filter="(&amp;(objectClass=identityPerson)(mail=?))"</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               user_name_list_filter              </code></td>
    <td><p>Use the mail attribute of the user in the user name filter list as well.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>user_name_list_filter="(&amp;(objectClass=identityPerson)(mail=*))"</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               username_java_regex              </code></td>
    <td><p>Use the following email regex.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>username_java_regex = "^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$"</code></pre>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>
