# Add login with Integrated Windows Authentication (IWA)

Integrated Windows Authentication (IWA) is a popular authentication mechanism used to authenticate users on Microsoft Windows servers. It uses Kerberos or NTLM to authenticate users based on an encrypted ticket exchange system between a browser and a server.

Follow the sections below to configure IWA as a local or a federated authenticator in {{product_name}}.

## Set up Active Directory for IWA

Follow the steps below to register {{product_name}} in Active Directory (AD).

1. Add a DNS host entry in Active Directory (AD) to map the IP address of {{product_name}} to a hostname.

    !!! info
        -   If there are multiple Kerberos domains, {{product_name}} should have a virtual host name for each Kerberos domain.
		-   The DNS entry is generally created by taking the first part of the hostname and appending the Active Directory (AD) domain to it. For example, if the AD domain is `wso2.com`, the final result will be,
            ``` java
            idp.wso2.com
            ```
		-   Kerberos does not work with IP addresses, it only relies on domain names and correct DNS entries.

2. Add an entry to the DNS tool of the local machine in which {{product_name}} is running to map the specified host name to the local IP address.

3. Create a service account in the Active Directory for {{product_name}} or use
    an existing account.

    !!! Note
        The account used for {{product_name}} needs to be different from the one used by the user to login to the application.

4. Run the following commands to register {{product_name}} as a service
    principal in Active Directory:

    !!! note
        The format of these commands is:
        `[setspn -A HTTP/<url of the identity server> <service_account>]`

    ``` bash
    setspn -A HTTP/idp.wso2.com <username>
    setspn -A HTTP/idp <username>
    ```

## Set up {{product_name}} for IWA

Follow the steps below to configure {{product_name}} for IWA.

1. Set the hostname of {{product_name}} to match its DNS entry in Active Directory. To do so, open the `deployment.toml` found in the `<IS_HOME>/repository/conf` directory and add the following configuration:

    ``` bash
    [server]
    hostname="idp.wso2.com"
    ```

2. Open the `jaas.conf` file found in the `<IS_HOME>/repository/conf/identity` folder and
    check if the configuration is as follows:

    !!! Info
        Learn more about [Java Authentication and Authorization Service (JAAS)](https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html){:target="_blank"}.

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

3. Open the `krb5.conf` file found in the `<IS_HOME>/repository/conf/identity` folder. By default, it contains the following configuration:

    {% if is_version in ["7.0.0", "7.1.0", "7.2.0"] %}
    ``` java
    [libdefaults]
            default_realm = WSO2.COM
            default_tkt_enctypes = rc4-hmac
            default_tgs_enctypes = rc4-hmac
            dns_lookup_kdc = true
            dns_lookup_realm = false

    [realms]
            WSO2.COM = {
                kdc = 127.0.0.1
       }
    ```

    The default configuration uses `rc4-hmac`, which is considered weak and is disabled by default in newer JDKs. Update `default_tkt_enctypes` and `default_tgs_enctypes` to use AES enctypes that are also permitted for the SPN account on your KDC. For most Active Directory environments, the following is a safe replacement:

    ``` java
    default_tkt_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96
    default_tgs_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96
    ```
    {% else %}
    ``` java
    [libdefaults]
            default_realm = WSO2.COM
            default_tkt_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96
            default_tgs_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96
            dns_lookup_kdc = true
            dns_lookup_realm = false

    [realms]
            WSO2.COM = {
                kdc = 127.0.0.1
       }
    ```
    {% endif %}

    Update the properties to match your Kerberos environment.

    **Properties under `[libdefaults]`**

    - `default_realm`: Identifies the default Kerberos realm for the client. Set this to your Active Directory (AD) Kerberos realm — typically the AD domain in uppercase (for example, `WSO2.COM`). If unset, a realm must be specified with every Kerberos principal.
    - `default_tkt_enctypes`: The list of session key encryption types the client requests when making an `AS-REQ` (the initial exchange used to obtain a Ticket-Granting Ticket), in order of preference from highest to lowest.
    - `default_tgs_enctypes`: The list of session key encryption types the client requests when making a `TGS-REQ` (the exchange used to obtain service tickets), in order of preference from highest to lowest.
    - `dns_lookup_kdc`: Indicates whether DNS SRV records should be used to locate the KDC (and other servers) for a realm, if they are not listed explicitly under `[realms]` in `krb5.conf`.
    - `dns_lookup_realm`: Indicates whether the realm of a host should be resolved via DNS TXT records. Typically left `false`, since the realm is normally derived from the principal or from `default_realm`.

    **Properties under `[realms]`**

    - `kdc`: The name or address of a host running a KDC for that realm. An optional port number can be appended after a colon (for example, `kdc.example.com:88`). Each realm subsection must either set this property or rely on DNS SRV records.

    !!! note "About `default_tkt_enctypes` and `default_tgs_enctypes`"
        When the IWA Kerberos authenticator processes a login, {{product_name}} first performs a Kerberos AS-Exchange with the KDC using the configured Service Principal (SPN) credentials. The KDC responds with the encryption type, salt, and key-derivation parameters it has on file for that SPN account, and {{product_name}} uses those to derive the long-term key needed to decrypt the user's SPNEGO ticket.

        - `default_tkt_enctypes` lists the enctypes {{product_name}} is willing to use for that AS-Exchange (the ticket-granting ticket request).
        - `default_tgs_enctypes` covers subsequent service ticket requests.

        The enctype list configured here must overlap with the enctypes permitted for the SPN account on the KDC.

    **Additional property: `permitted_enctypes`**

    Not included in the default `krb5.conf` shipped with {{product_name}}; add it under `[libdefaults]` when you need to constrain the algorithms used overall.

    - `permitted_enctypes`: Identifies all encryption types that are permitted for use in session key encryption.

    For example, to restrict the client to AES enctypes only:

    ``` java
    [libdefaults]
            permitted_enctypes = aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96
    ```

{% if is_version in ["7.0.0", "7.1.0", "7.2.0"] %}
4. Set the Kerberos configuration file location as a JVM system property.

    Open `<IS_HOME>/bin/wso2server.sh` and add the following parameter to the JVM startup arguments so that {{product_name}} loads the updated `krb5.conf` file at startup:

    ``` bash
    -Djava.security.krb5.conf="$CARBON_HOME/repository/conf/identity/krb5.conf"
    ```
{% endif %}

## Register the IWA IdP

Now, let's register IWA as an authenticator in {{product_name}}.

1. On the {{ product_name }} Console, go to **Connections**.

2. Click **Create Connection** and select **Custom Connector**.

3. Provide a name and a description for the connector and click **Finish**.

      ![Create a custom connector]({{base_path}}/assets/img/samples/iwa-custom-connector.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. On the created custom connector, go to the **Settings** tab.

5. Click **New Authenticator**, select **IWA Kerberos** and click **Next**.

6. Enter the following details and click **Finish**.

      ![Configure the X connector]({{base_path}}/assets/img/samples/iwa-configure-connector.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <td>Service Principal Name</td>
            <td>The SPN registered above when setting up IWA with Active Directory in the form of </br> <code>&lt;service class&gt;/&lt;host&gt;@&lt;AD domain&gt;</code>. </br>
            e.g. <code>HTTP/idp.wso2.com@wso2.com</code>
        </tr>
        <tr>
            <td>Service Principal Password</td>
            <td>The password of the service account associated with the SPN.
        </tr>
        <tr>
            <td>User Store Domains</td>
            <td><b>Fill only if you wish to configure IWA as a local authenticator. Leave this blank to set up IWA as a federated authenticator.</b> </br>
            <p>Enter the name of a mounted user store (or a comma-separated list of multiple user stores) you want {{product_name}} to search for the presence of the user account.</br>
            e.g. <code>PRIMARY</code>
            </td>
        </tr>

    </table>

## Enable IWA login

{% include "../../../guides/fragments/add-login/enterprise-login/add-iwa-login.md" %}

## Try it out

??? details "Configure your browser to support Kerberos and NTLM."

    Before you proceed, add the relevant configurations to the browser of your choice by following the steps below.

    ??? details "Microsoft Edge and Chrome"
        1. Open the **Start** menu.

        2. Search for **Internet Options** and click on it.

        3. Go to its **Security** tab.
        
        4. Select **Local intranet** and click **sites**.

            ![Select local intranet from internet options]({{base_path}}/assets/img/guides/idp/iwa-idp/local-intranet-iwa-idp.png){: width="300" style="border: 0.3px solid lightgrey;"}

        4. On the dialog box that appears, click **Advanced**.
        
        5. Enter the URL of {{product_name}} and click **Add**.

            ![Add {{product_name}} site]({{base_path}}/assets/img/guides/idp/iwa-idp/add-site-iwa-idp.png){: width="300" style="border: 0.3px solid lightgrey;"}

        6. Click **Close** and click **OK**.
    
        !!! info
            Chrome inherits the above settings and no additional configurations are necessary.
    
    ??? details "Mozilla Firefox"

        1. On the address bar, type `about:config` and press Enter.

        2. Ignore the warning and continue to the advanced settings of Firefox.

        3. Search for `network.negotiate-auth.trusted-uris` from the address bar and click its "Edit" icon.

        4. Enter the URL of {{product_name}} and click the **Save** icon.

            ![Add {{product_name}} site]({{base_path}}/assets/img/guides/idp/iwa-idp/firefox-settings-iwa-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with IWA**.

    ![Login with IWA]({{base_path}}/assets/img/guides/idp/iwa-idp/sign-in-with-iwa.png){: width="300" style="border: 0.3px solid lightgrey;"}

## Configure user attributes

{% include "../../fragments/manage-connection/manage-attributes.md" %}

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login) documentation.

## Troubleshooting tips

- Use hostnames only (no IP addresses).

- Verify the configurations in the `jaas.conf` file, particularly the `isInitiator=false` property under the `Server` section (see the [Set up Active Directory for IWA](#set-up-wso2-identity-server-for-iwa) section).

- Make sure that your service principal (IS) is associated with only one account.

- If you get an exception with an error message along the lines of “Checksum failed”, check whether you have given the correct password.