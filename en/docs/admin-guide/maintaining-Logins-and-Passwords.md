# Maintaining Logins and Passwords

This section covers the following topics:

-   [Changing the super admin
    password](#MaintainingLoginsandPasswords-Changingthesuperadminpassword)
-   [Unlocking the admin
    user](#MaintainingLoginsandPasswords-Unlockingtheadminuser)
-   [Recovering a
    password](#MaintainingLoginsandPasswords-Recoveringapassword)
-   [Setting up an email
    login](#MaintainingLoginsandPasswords-Settingupanemaillogin)

### Changing the super admin password

To change the default admin password, log in to the management console
with admin/admin credentials and use the **Change my password** option.
After changing the credentials, change the same in the
`         <PRODUCT_HOME>/repository/conf/user-mgt.xml        ` file:

``` xml
<UserManager>
   <Realm>
      <Configuration>
          ...
          <AdminUser>
             <UserName>admin</UserName>                  
             <Password>admin</Password>
          </AdminUser>
      ...
   </Realm>
</UserManager>
```

!!! tip
    
    **Do you have any special characters in passwords?**
    
    For usernames and passwords inside XML files, take care when giving
    special characters. According to XML specification (
    <http://www.w3.org/TR/xml/> ), some special characters can disrupt the
    configuration. For example, the ampersand character (&) must not appear
    in the literal form in XML files. It can cause a Java Null Pointer
    exception. You must wrap it with CDATA (
    <http://www.w3schools.com/xml/xml_cdata.asp> ) as shown below or remove
    the character:
    
    ``` xml
    <Password>
        <![CDATA[xnvYh?@VHAkc?qZ%Jv855&A4a,%M8B@h]]>
    </Password>
```

`                   `


### Unlocking the admin user

To unlock an admin user who is locked due to an exceeding number of
login failures, restart the server using the -
`         unlockAdmin        ` system property

### Recovering a password

Use `         <PRODUCT_HOME>/bin/chpasswd.sh        ` script.

### Setting up an email login

You can configure WSO2 products to authenticate users using an email or
mobile number instead of a username.

The '@' is a special character in usernames of WSO2 products as it is
used in multi-tenant environments to build the user's fully-qualified
name. For example, user *daniel* from the tenant domain
[WSO2.com](http://WSO2.com) has the fully-qualified name
*<daniel@WSO2.com>* . Before using an email as the username, configure
the WSO2 product to differentiate between the '@' symbol in the user's
emails and usernames as follows:

1.  Open
    `           <PRODUCT_HOME>/repository/conf/carbon.xml          `

2.  Uncomment the commented out configuration
    `           EnableEmailUserName          ` . This enables email
    authentication.

    ``` html/xml
    <EnableEmailUserName>true</EnableEmailUserName>
    ```

    !!! tip
    
        **Tip** : When you do this configuration, the email becomes the
        admin username and you cannot configure your email address as an
        attribute in your user profile.
    

3.  Next, edit \<
    `           PRODUCT_HOME>/repository/conf/user-mgt.xml          ` .
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
    <td><code>               UserNameAttribute              </code></td>
    <td><p>Set the mail attribute of the user.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UserNameAttribute&quot;&gt;mail&lt;/Property&gt;</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UserNameSearchFilter              </code></td>
    <td><p>Use the mail attribute of the user instead of cn or uid.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UserNameSearchFilter&quot;&gt;(&amp;amp;(objectClass=identityPerson)(mail=?))&lt;/Property&gt;</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               UserNameListFilter              </code></td>
    <td><p>Use the mail attribute of the user in the user name filter list as well.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UserNameListFilter&quot;&gt;(&amp;amp;(objectClass=identityPerson)(mail=*))&lt;/Property&gt;</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UsernameJavaRegEx              </code></td>
    <td><p>Use the following email regex.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;Property name=&quot;UsernameJavaRegEx&quot;&gt;^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$&lt;/Property&gt;</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               UserDNPattern              </code></td>
    <td><p>This parameter is used to speed up the LDAP search operations. You can comment out this config.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;!--Property name=&quot;UserDNPattern&quot;&gt;cn={0},ou=Users,dc=wso2,dc=com&lt;/Property--&gt;</code></pre>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td>Realm configurations</td>
    <td><p>The <code>                AdminUser               </code> username should use the email attribute of the admin user.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>&lt;AdminUser&gt;
             &lt;UserName&gt;admin@wso2.com&lt;/UserName&gt;
             &lt;Password&gt;admin&lt;/Password&gt;
    &lt;/AdminUser&gt;</code></pre>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>
