# Configure IWA on Linux

For information on Integrated Windows Authentication (IWA), see [IWA](TO-DO: concepts).

!!! tip
    
    This IWA authenticator is provided OOTB and was implemented
    from WSO2 IS 5.3.0 onwards. It uses Kerberos internally and is the
    recommended approach as it overcomes some limitations of the IWA
    authenticator provided in previous versions of WSO2 IS which was based
    on NTLM. If you still want to use the previous IWA authenticator that
    was based on NTLM, it is [available as an extension](https://github.com/wso2-extensions/identity-local-auth-iwa-ntlm)
    . For more information on how to setup the NTLM-based IWA authenticator,
    see [Configuring IWA Single-Sign-On](../../../guides/login/configure-iwa-single-sign-on).
    
    The benefits of using the authenticator based on Kerberos vs the
    authenticator based on NTLM are as follows:
    
    -   Can be used on any operating system unlike NTLM which has to be run
        on a Windows server.
    -   Performance and security on Kerberos are better.
    

!!! info "Related Links"

	-   For more information about IWA, see [Integrated Windows
		Authentication](../../../references/concepts/authentication/integrated-windows-authentication-overview)
    
	-   To configure Active Directory as a user store, see [Configuring a
		Read-write Active Directory Userstore](../../../deploy/configuring-a-read-write-active-directory-user-store/).

---

## How IWA with Kerberos works

![iwa-wso2](../../../assets/img/guides/iwa-wso2.png)

![iwa-with-kerberos](../../../assets/img/guides/iwa-with-kerberos.png)  

---

## Set up IWA

1.  Add a DNS host entry in the Active Directory (AD) to map the IP
    address of the WSO2 Identity Server to a hostname. If there are
    multiple Kerberos domains, WSO2 IS should have a virtual host name
    for each Kerberos domain.

    !!! info 
        When adding the DNS entry, generally the first part of the hostname
        is given. The AD will append the rest with its AD domain. For
        example, if the AD domain is 'wso2.com, after you add a DNS host
        entry, the final result will be similar to the following:

        ``` java
        idp.wso2.com
        ```
                
        Kerberos does not work with IP addresses, it relies on
        domain names and correct DNS entries only.

2.  Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configuration.

    ``` xml
    [server]
    hostname="idp.wso2.com"
    ```

3.  Open the `           jaas.conf          ` file found in the
    `           <IS_HOME>/repository/conf/identity          ` folder and
    check if the configuration is as follows. (Refer
    [this](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html)
    for more information on JAAS)

    ``` java
    Server {
    com.sun.security.auth.module.Krb5LoginModule required
    useKeyTab=false
    storeKey=true
    useTicketCache=false
    isInitiator=false;
    };
    
    Client {
    com.sun.security.auth.module.Krb5LoginModule required
    useTicketCache=false;
    };
    ```

4.  Register WSO2 IS using the same hostname (
    `           idp.wso2.com          ` ) in Active Directory. To do
    this, use the [DNS
    tool](https://technet.microsoft.com/en-us/library/cc753579(v=ws.11).aspx)
    on the machine that is running WSO2 IS to add an entry for the
    hostname (idp.is.local), and map it to the local IP address.

5.  Create a service account in the Active Directory for WSO2 IS or use
    an existing account. (For this tutorial, the sample username of the
    service account is **is_linux** ).

    !!! note
        The account used for WSO2 IS needs to be different from
        the one used by the user to login to the application.

6.  Run the following commands to register WSO2 IS as a service
    principal in Active Directory.

    !!! note
        Replace `           is_linux          ` with the username
        of your service account in the command below. The format of the
        command is as follows:
        `           [setspn -A HTTP/<url of Identity Server> <service_account>]          `
    

    ``` java
    setspn -A HTTP/idp.wso2.com is_linux
    setspn -A HTTP/idp is_linux
    ```

You can now set up IWA either as a local authenticator or as a federated
authenticator.

---

## Configure WSO2 IS with IWA as a local or federated authenticator

1.  Follow the steps above to set up IWA.

2.  Start the WSO2 IS server and log in to the management console.
3.  Navigate to **Main\>Identity Providers** and click **Add**. Enter a
    name for the identity provider.
4.  Expand the **Federated Authenticators** section and then expand
    **IWA Federated Configuration**.
5.  Fill in the fields as follows:

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>Enable this to enable a custom authenticator for the identity provider.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Server Principal Name</td>
    <td><div class="content-wrapper">
    <p>The SPNName should be the SPN you registered in step 6 of <strong>Setting up IWA,</strong> with the Active Directory domain. The SPNName follows this format:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="op">&lt;</span><span class="ex">service</span> class<span class="op">&gt;</span>/<span class="op">&lt;</span>host<span class="op">&gt;</span>@<span class="op">&lt;</span>AD domain<span class="op">&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>For example,</p>
    <p>If the SPN is <code>                 HTTP/idp.wso2.com                </code> , where <code>                 HTTP                </code> is a service class (in this case, <code>                 HTTP                </code> is not the standard protocol; it is the service class) and <code>                 IS.wso2.com                </code> is the Active Directory domain, the SPNName will be <code>                                   HTTP/idp.wso2.com@wso2.com                                 </code></p>
    </div></td>
    <td><code>               HTTP/idp.wso2.com@wso2.com              </code></td>
    </tr>
    <tr class="odd">
    <td>Server Principal Password</td>
    <td>The SPNPassword should be the password of the service account associated with the SPN (the service account created in step 6 of <strong>Setting up IWA</strong> ).</td>
    <td>-</td>
    </tr>
    <tr class="even">
    <td>User store domains</td>
    <td><p><strong>[Mandatory only if you want to use IWA as a local authenticator]</strong></p>
    <p>The mounted user stores in which you want the user’s existence to be checked in.</p>
    <ul>
    <li>To configure IWA as a <strong>local authenticator</strong>, mount the user store domain names of the relevant user stores that you expect the user to be in.</li>
    <li>To configure IWA as a <strong>federated authenticator</strong>, leave this field blank.</li>
    </ul></td>
    <td>PRIMARY</td>
    </tr>
    </tbody>
    </table>

    -   IWA as a Local Authenticator
    ![iwa-as-a-local-authenticator](../../../assets/img/guides/iwa-as-a-local-authenticator.png)
    
    -   IWA as a Federated Authenticator
    ![iwa-as-a-federated-authenticator](../../../assets/img/guides/iwa-as-a-federated-authenticator.png)

6.  Configure your browser to support Kerberos and NTLM. The points below
    explain how to configure each browser.

	**Configure firefox**
    
	1. Type `                about:config               ` in the address
	bar, ignore the warning and continue, this will display the advanced
	settings of Firefox.

	2\. In the search bar, search for the key "
	`                network.negotiate-auth.trusted-uris.               `

	![configuring-firefox-for-kerberos](../../../assets/img/guides/configuring-firefox-for-kerberos.png)

	3\. Add the WSO2 Identity Server URL and click OK.

	![adding-wso2-is-url](../../../assets/img/guides/adding-wso2-is-url.png)

	**Configure Internet Explorer/Chrome**

	1. Go to Tools -\>Internet Options.

	2\. In the “security” tab select local intranet.

	![configuring-internet-explorer-chrome](../../../assets/img/guides/configuring-internet-explorer-chrome.png)

	3\. Click the **Sites** button. Then add the URL of WSO2 Identity Server
	there.

	![adding-wso2-is-url-ie-chrome](../../../assets/img/guides/adding-wso2-is-url-ie-chrome.png)

	Chrome simply inherits the settings from Internet Explorer. So you
	don’t have to configure anything additionally.  

---

## Test the IWA authenticator

Set up IWA as a local authenticator or as a federated authenticator by following the steps above.

{! fragments/travelocity.md !}

3.  Edit the service provider you created for the Travelocity sample,
    and expand the **Local and Outbound Authentication** section.

4.  Select **Federated Authentication** as the **Authentication Type**
    and select the identity provider you created above.  
    ![](../../../assets/img/guides/federated-authentication.png)
    
5.  Restart the Apache Tomcat server and run the Travelocity sample
    application from a Windows machine.  

!!! tips "Troubleshooting Tips"

	-   Use hostnames only (no IP addresses).
	-   Check the configuration of the `            jaas.conf           `
		file, particularly the `            isInitiator=false           `
		property under the `            Server           ` section (see step
		3 of the **Setting Up IWA** section).
	-   Make sure that your service principal (IS) is associated with only
		one account.

	-   If you get an exception with an error message similar to “Checksum
		failed”, check whether you have given the correct password.
