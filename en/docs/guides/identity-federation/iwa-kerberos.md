# Configure IWA as a federated authenticator

Integrated Windows Authentication (IWA) is a popular authentication
mechanism that is used to authenticate users in Microsoft Windows
servers.

It uses Negotiate/Kerberos or NTLM to authenticate users based
on an encrypted ticket/message passed between a browser and a server.

Follow the instructions in the sections below to configure IWA for local
or federated authentication in WSO2 Identity Server (IS).

??? info "IWA authenticator version"
    This IWA authenticator is provided OOTB and was implemented
    from WSO2 IS 5.3.0 onwards. It uses Kerberos internally and is the
    recommended approach as it overcomes some limitations of the IWA
    authenticator provided in previous versions of WSO2 IS which was based
    on NTLM. 
    
    If you still want to use the previous IWA authenticator that
    was based on NTLM, it is [available as an extension](https://github.com/wso2-extensions/identity-local-auth-iwa-ntlm). For more information on how to setup the NTLM-based IWA authenticator,
    see [Configuring IWA Single-Sign-On](../../learn/configuring-iwa-single-sign-on).
    
    The benefits of using the authenticator based on Kerberos vs the
    authenticator based on NTLM are as follows:
    
    -   Can be used on any operating system unlike NTLM which has to be run
        on a Windows server.
    -   Performance and security on Kerberos are better.
    

!!! info "Related Links"

	-   For more information about IWA, see [Integrated Windows
		Authentication](../../learn/integrated-windows-authentication-overview)
    
	-   To configure Active Directory as a user store, see [Configuring a
		Read-write Active Directory User
		Store](../../setup/configuring-a-read-write-active-directory-user-store).


![iwa-wso2](../assets/img/tutorials/iwa-wso2.png)

![iwa-with-kerberos](../assets/img/tutorials/iwa-with-kerberos.png)  

## Set up IWA

1. Add a DNS host entry in the Active Directory (AD) to map the IP
    address of WSO2 Identity Server to a hostname. 

    !!! info 
        -   If there are multiple Kerberos domains, WSO2 IS should have a virtual host name for each Kerberos domain.
		-   When adding the DNS entry, generally the first part of the hostname is given. The AD will append the rest with its AD domain. For example, if the AD domain is `wso2.com`, after you add a DNS host
		entry, the final result will be similar to the following:
            ``` java
            idp.wso2.com
            ```
		-   Kerberos does not work with IP addresses, it relies on domain names and correct DNS entries only.

2.  Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configuration:

    ``` xml
    [server]
    hostname="idp.wso2.com"
    ```

3.  Open the `jaas.conf` file found in the `<IS_HOME>/repository/conf/identity` folder and
    check if the configuration is as follows: 
    
    !!! Info
        Learn more about [JAAS](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html).

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

4.  Register WSO2 IS using the same hostname `idp.wso2.com` in Active Directory:
    1. Use the [DNS tool](https://technet.microsoft.com/en-us/library/cc753579(v=ws.11).aspx)
    on the machine that is running WSO2 IS to add an entry for the
    hostname (idp.is.local). 
    2. Map it to the local IP address.

5.  Create a service account in the Active Directory for WSO2 IS or use
    an existing account. 
    
    !!! Note
        -   For this tutorial, the sample username of the service account is **is_linux**.
        -   The account used for WSO2 IS needs to be different from the one used by the user to login to the application.

6.  Run the following commands to register WSO2 IS as a service
    principal in Active Directory:

    !!! note
        Replace `is_linux` with the username
        of your service account in the command below. The format of the
        command is as follows:
        `[setspn -A HTTP/<url of Identity Server> <service_account>]`
    

    ``` java
    setspn -A HTTP/idp.wso2.com is_linux
    setspn -A HTTP/idp is_linux
    ```

You can now set up IWA either as a local authenticator or as a federated
authenticator.

## Configure WSO2 IS with IWA

Let's configure WSO2 IS with IWA as a local or federated authenticator.

1. Sign in to the WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console) at `https://<Server Host>:9443/carbon` using your `username` and `password`.
2. Go to **Main** --> **Identity** menu and click **Add** under **Identity Providers**.
3. Fill in the details in the **Basic Information** section.
4. Expand the **Federated Authenticators** section, expand **IWA Federated Configuration**, and fill in the following values:

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
                <td>
                    <div class="content-wrapper">
                    <p>The SPNName should be the SPN you registered in step 6 of <strong>Setting up IWA,</strong> with the Active Directory domain. The SPNName follows this format:</p>
                    <div class="code panel pdl" style="border-width: 1px;">
                        <div class="codeContent panelContent pdl">
                            <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence">
                                <pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="op">&lt;</span><span class="ex">service</span> class<span class="op">&gt;</span>/<span class="op">&lt;</span>host<span class="op">&gt;</span>@<span class="op">&lt;</span>AD domain<span class="op">&gt;</span></a></code></pre>
                            </div>
                        </div>
                    </div>
                    <p>For example,</p>
                    <p>If the SPN is <code>                 HTTP/idp.wso2.com                </code> , where <code>                 HTTP                </code> is a service class (in this case, <code>                 HTTP                </code> is not the standard protocol; it is the service class) and <code>                 IS.wso2.com                </code> is the Active Directory domain, the SPNName will be <code>                                   HTTP/idp.wso2.com@wso2.com                                 </code></p>
                    </div>
                </td>
                <td><code>               HTTP/idp.wso2.com@wso2.com              </code></td>
            </tr>
            <tr class="odd">
                <td>Server Principal Password</td>
                <td>The SPNPassword should be the password of the service account associated with the SPN (the service account created in step 6 of <strong>Setting up IWA</strong> ).</td>
                <td>-</td>
            </tr>
            <tr class="even">
                <td>User store domains</td>
                <td>
                    <p><strong>[Mandatory only if you want to use IWA as a local authenticator]</strong></p>
                    <p>The mounted user stores in which you want the user’s existence to be checked in.</p>
                    <ul>
                    <li>To configure IWA as a <strong>local authenticator</strong> , mount the user store domain names of the relevant user stores that you expect the user to be in.</li>
                    <li>To configure IWA as a <strong>federated authenticator</strong> , leave this field blank.</li>
                    </ul>
                </td>
                <td>PRIMARY</td>
            </tr>
        </tbody>
    </table>

    -   IWA as a Local Authenticator
        ![iwa-as-a-local-authenticator](../assets/img/tutorials/iwa-as-a-local-authenticator.png)
    
    -   IWA as a Federated Authenticator
        ![iwa-as-a-federated-authenticator](../assets/img/tutorials/iwa-as-a-federated-authenticator.png)

6.  Configure your browser to support Kerberos and NTLM.

	??? note "Firefox"
        1. Type `about:config` in the address
        bar, ignore the warning and continue, this will display the advanced
        settings of Firefox.
        2. In the search bar, search for the key `network.negotiate-auth.trusted-uris.`
        
           ![configuring-firefox-for-kerberos](../assets/img/tutorials/configuring-firefox-for-kerberos.png)

        3. Add the WSO2 Identity Server URL and click **OK**.

           ![adding-wso2-is-url](../assets/img/tutorials/adding-wso2-is-url.png)

	??? note "Internet Explorer/Chrome"
        1. Go to **Tools ->Internet Options**.
        2. Go to the “security” tab and select local intranet.

           ![configuring-internet-explorer-chrome](../assets/img/tutorials/configuring-internet-explorer-chrome.png)

        3. Click **Sites** and add the URL of WSO2 Identity Server.

           ![adding-wso2-is-url-ie-chrome](../assets/img/tutorials/adding-wso2-is-url-ie-chrome.png)

        Chrome simply inherits the settings from Internet Explorer. Therefore, you
        don’t have to configure anything additional.  

## Try it

1. Configure the Travelocity sample app as a service provider in WSO2 Identity Server.

3. Edit the service provider you created for the Travelocity sample, and expand the **Local and Outbound Authentication** section.

4. Select **Federated Authentication** as the **Authentication Type** and select the identity provider you created above.  

   ![](../assets/img/tutorials/federated-authentication.png)
    
5. Restart the Apache Tomcat server and run the Travelocity sample application from a Windows machine.  

## Troubleshooting tips

-   Use hostnames only (no IP addresses).
-   Check the configuration of the `jaas.conf`
    file, particularly the `isInitiator=false`
    property under the `Server` section (see the **Set up IWA** section).
-   Make sure that your service principal (IS) is associated with only
    one account.
-   If you get an exception with an error message similar to “Checksum
    failed”, check whether you have given the correct password.
