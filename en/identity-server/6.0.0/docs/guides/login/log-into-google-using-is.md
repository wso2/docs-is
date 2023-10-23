# Log in to Google using the Identity Server

This page guides you through using WSO2 Identity Server to log in to Google.

-----
!!! tip "Before you begin!"
    You need to have a Google domain. Click
    [here](https://www.bettercloud.com/monitor/the-academy/create-google-apps-domain-three-easy-steps/)
    for more information on creating the domain.
-----

## Configure Google

1. Access your domain's admin console via [https://admin.google.com](https://admin.google.com).

2. Click **Security**.

    !!! info
        Can't see the Security section? Click the **MORE CONTROLS** bar at the bottom and you can see the Security section.

    ![more-controls]({{base_path}}/assets/img/guides/security-google.png)

3. Click **Set up single sign-on (SSO) with a third party IdP**.

    ![third-party-idp]({{base_path}}/assets/img/guides/setup-sso-google.png)

4. Enter the following URLs to your third-party Identity Provider
    (IdP).

    - **Sign-in page URL:**
        `https://<IS_HOSTNAME>:<IS_PORT>/samlsso`

    - **Sign-out page URL:**
        `https://<IS_HOSTNAME>:<IS_POST>/samlsso`

    ![sso-fill-google.png]({{base_path}}/assets/img/guides/sso-fill-google.png)

5. Upload the Identity Server certificate:  
    The certificate file must contain the public key for Google to
    verify the sign-in requests.

    1. Navigate to the
        `<IS_HOME>/repository/resources/security`
        directory via the terminal.
    2. Run the command given below to import the public certificate
        from the keystore to a `.pem` file.

        ``` java
        keytool -export -alias wso2carbon  -keystore wso2carbon.jks -storepass wso2carbon -file mycert.pem
        ```

        !!! info
            The `mycert.pem` file is created in the same directory mentioned in **step** **a** above. If you want to change the name of the file that is being generated, enter a preferred name instead of `mycert` in the above command.

    3. Click **Replace certificate** and upload the
        `.pem` file you just generated.

    4. Click **Save**.

-----

## Configure Email Address as the Username

!!! warning
    Configuring the email address as the username in an **already running
    Identity Server** is not the production recommended way. Therefore,
    **make sure to configure it before you begin working with WSO2 IS**.
    

1.  Log in to the Management Console and click **Claims > List > http://wso2.org/claims**.
   
2. Click the **Edit** link corresponding to the **Username** claim and configure the `Mapped Attribute` property to `mail`.

    ![email-as-username-attribute-mapping]({{base_path}}/assets/img/guides/email-as-username-attribute-mapping.png)
    
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
    <img src="{{base_path}}/assets/img/guides/super-admin.png" width="600" /></p></div>
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

-----

## Create the service provider

{!./includes/register-a-service-provider.md!}

-----

### SAML Configurations

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML Configuration** and click **Configure**.

2. Fill in the value for **Issuer** and **Assertion consumer URL** as shown below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Issuer</td>
    <td><div class="content-wrapper">
    <p><code>                 google.com                </code></p>
    </div></td>
    <td>This is the <code>               &lt;saml:Issuer&gt;              </code> element that contains the unique identifier of the service provider.</td>
    </tr>
    <tr class="even">
    <td>Assertion Consumer URL</td>
    <td><pre><code>https://www.google.com/a/&lt;ENTER_YOUR_DOMAIN&gt;/acs</code></pre>
    <code>              </code></td>
    <td>This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request.</td>
    </tr>
    </table>

3. Select **Enable Response Signing** to sign the SAML2 Responses returned after the authentication process.

4. Select **Enable Attribute Profile** and **Include Attributes in the Response Always** so that the the identity provider will always include the attribute values related to the selected claims in the SAML2 attribute statement.

5. Click **Register**.

-----

## Try it out

Now, you have successfully configured Google and WSO2 Identity Server.

!!! note
    The admin users of your Google domain do not get redirected to WSO2 IS.
    Therefore, to try out the tutorial you need to use a user who is not an
    admin in your Google account.

1. Create a user in WSO2 Identity Server. Make sure that the same user
    exists in your Google domain.  
    In this example, `alex@wso2support.com`
    is in the Google domain. Therefore, we need to create the same user in WSO2 Identity Server.

    {!./includes/create-user-email-username.md!}

2. Navigate to
    `https://google.com/a/<ENTER_YOUR_DOMAIN>/acs`
    and enter the email address (username) of the user you created.  
    You are navigated to WSO2 Identity Server's sign in screen.
3. Enter the username and password of the user you created.  
    You are navigated to the G-Suite of that domain and you can select
    the application you need to use.

  

!!! tip
    If you want to only access Gmail, navigate to
    [mail.google.com](http://mail.google.com), enter the username of the
    user, enter the username and password of the user on the WSO2 Identity
    Server sign in screen, and you are navigated to the user's mail account.

!!! info "Related topics"
    - [Concept: Identity Federation]({{base_path}}/references/concepts/identity-federation/)