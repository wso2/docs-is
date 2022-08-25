# Configuring Office365 SAML2 with WSO2 Identity Server for Multiple Domains

This tutorial guides you through configuring SAML2 authentication for
Office365 with WSO2 Identity Server (WSO2 IS) in multiple domains.
Follow the instructions in the sections below to set this up.

## The flow

The diagram below demonstrates the flow of how Microsoft Office365 uses
WSO2 Identity Server as a SAML2 federated authenticator to authenticate
a user.

<!-- ![saml2-fed-authenticator-flow]({{base_path}}/assets/img/tutorials/saml2-fed-authenticator-flow.png) -->

### Prerequisites

- Office 365 Business Account with access to the [Office 365 Admin
    Portal](https://portal.office.com/adminportal/home).

    !!! tip
        If you do not already have an account, you can use a 30-day
        [trial version](https://products.office.com/en/compare-all-microsoft-office-products?tab=2)
        to try out this feature.

- Add a new domain to Office 365 using the [Office 365 Admin
    Portal](https://portal.office.com/adminportal/home). For
    instructions on how to do this, see [Add A Domain to Office
    365](https://support.office.com/en-us/article/add-a-domain-to-office-365-6383f56d-3d09-4dcb-9b41-b5f5a5efd611)
    in the Microsoft documentation.

    !!! tip
        Office 365 SSO requires an internet-resolvable domain name
        to use as the suffix in each user’s username. You cannot federate
        the default domain that is provided by Microsoft that ends with "
        [onmicrosoft.com](http://onmicrosoft.com) ".

        You can register a free domain using a site such as
        [www.dot.tk](http://www.dot.tk/) if you do not already have a
        registered domain name.

- A Windows platform Windows Azure Active Directory Powershell
    installed. If you do not already have the Azure AD module, run the
    following commands to install the required modules.

    ``` java
    #uninstall any existing older version of the AzureAD module
    uninstall-module AzureAD


    install-module AzureAD
    install-module AzureADPreview
    install-module MSOnline
    ```

## Configuring the claims

1. Click **Add** under **Claims** and then click **Add Local Claim**.  
    Add the following local claims.


    <table>
    <colgroup>
    <col style="width: 43%" />
    <col style="width: 56%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Sample value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>Dialect URI</p></td>
    <td><p>http://wso2.org/claims</p></td>
    </tr>
    <tr class="even">
    <td><p>Claim URI</p></td>
    <td><p>http://wso2.org/claims/upn</p></td>
    </tr>
    <tr class="odd">
    <td><p>Display Name *</p></td>
    <td><p>userPrincipalName</p></td>
    </tr>
    <tr class="even">
    <td><p>Description</p></td>
    <td><p>userPrincipalName</p></td>
    </tr>
    <tr class="odd">
    <td><p>Mapped Attribute (s)</p></td>
    <td><p><strong>User Store Domain Name:</strong> PRIMARY</p>
    <p><strong>Mapped Attribute:</strong> userPrincipalName</p></td>
    </tr>
    <tr class="even">
    <td><p>Supported by Default</p></td>
    <td><p>true</p></td>
    </tr>
    </tbody>
    </table>

    <!-- ![configure-saml2-claims]({{base_path}}/assets/img/tutorials/configure-saml2-claims.png) -->

    <table>
    <colgroup>
    <col style="width: 41%" />
    <col style="width: 58%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Sample value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>Dialect URI</p></td>
    <td><p>http://wso2.org/claims</p></td>
    </tr>
    <tr class="even">
    <td><p>Claim URI</p></td>
    <td><p>http://wso2.org/claims/objectguid</p></td>
    </tr>
    <tr class="odd">
    <td><p>Display Name *</p></td>
    <td><p>ObjectGuid</p></td>
    </tr>
    <tr class="even">
    <td><p>Description</p></td>
    <td><p>ObjectGuid</p></td>
    </tr>
    <tr class="odd">
    <td><p>Mapped Attribute (s)</p></td>
    <td><p><strong>User Store Domain Name:</strong> PRIMARY</p>
    <p><strong>Mapped Attribute:</strong> objectGuid</p></td>
    </tr>
    <tr class="even">
    <td><p>Supported by Default</p></td>
    <td>true</td>
    </tr>
    </tbody>
    </table>

**Remove unsupported claims**

The following attributes are not supported by Active Directory by
default. Disable the following claims in WSO2 Identity Server to avoid
errors when updating the user profile.

To disable the claims, do the following.

1. Click **List** under **Claims** and select the
    [http://wso2.org/claims](https://localhost:9443/carbon/identity-claim-mgt/list-local-claims.jsp)
    dialect.
2. Click Edit next to the following claims and unselect the **Supported
    by Default** checkbox to disable the claim.
    - Country
    - Organization
    - IM

### Configuring service providers

For each Office 365 domain follow these steps.

1. Click **Add** under **Service Providers** and create a new service
    provider.
2. Expand **Claim Configuration** and select **Define Custom Claim
    Dialect.**
3. Click **Add Claim URI** and add the following claims.


    | Service Provider Claim | Local Claim                       | Requested Claim |
    |------------------------|-----------------------------------|-----------------|
    | IDPEmail               | http://wso2.org/claims/upn        | Selected (True) |
    | NameID                 | http://wso2.org/claims/objectguid | Selected (True) |

4. Set NameID as the **Subject Claim URI.**

5. Expand **Inbound Authentication Configuration** and then expand
    **SAML2 Web SSO Configuration**.

    The following table provides configuration for two Office 365
    domains named [abc.com](http://abc.com/) , and
    [xyz.com](http://xyz.com/). You can configure more than two SPs
    based on your requirement.


    <table>
    <col width="70%">
    <col width="15%">
    <col width="15%">
    <thead>
    <tr class="header">
    <th><p><strong>Field</strong></p></th>
    <th><p><strong>Value for domain</strong> - <a href="http://abc.com">abc.com</a></p></th>
    <th><p><strong>Value for domain</strong> - <a href="http://xyz.com">xyz.com</a></p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>Issuer</p></td>
    <td><p>urn:federation:MicrosoftOnline</p></td>
    <td><p>urn:federation:MicrosoftOnline</p></td>
    </tr>
    <tr class="even">
    <td><div class="content-wrapper">
    <p>Service Provider Qualifier</p>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>This value is needed to configure multiple SAML SSO inbound authentication configurations for the same <strong><code>                        Issuer                       </code></strong> value. When a <strong><code>Service Provider Qualifier</code></strong> is defined here, it is appended to the end of the <strong><code>Issuer</code></strong> value when registering the SAML SP in the Identity Server.</p>
    <p>For example, if you specify "travelocity.com" as the <code>Issuer</code> and "sp1" as the <code>Service Provider Qualifier</code> , the configuration will be registered in WSO2 IS with the value "travelocity.com:<zero-width-space>urn:sp:qualifier:sp1".</p>
    <p>You can configure any number of SAML SPs using the same <code>Issuer</code> but with different <code>Service Provider Qualifiers</code>.</p>
    </div>
    </div>
    </td>
    <td><p><a href="http://abc.com">abc.com</a></p></td>
    <td><p><a href="http://xyz.com">xyz.com</a></p></td>
    </tr>
    <tr class="odd">
    <td><p>Assertion Consumer URLs</p></td>
    <td><p><a href="https://login.microsoftonline.com/login.srf">https://login.microsoftonline.com/login.srf</a></p></td>
    <td><p><a href="https://login.microsoftonline.com/login.srf">https://login.microsoftonline.com/login.srf</a></p></td>
    </tr>
    <tr class="even">
    <td><p>NameID format</p></td>
    <td><p>urn:oasis:names:tc<zero-width-space>:SAML:2.0:nameid-format:persistent</p></td>
    <td><p>urn:oasis:names:tc<zero-width-space>:SAML:2.0:nameid-format:persistent</p></td>
    </tr>
    <tr class="odd">
    <td><p>Enable Response Signing</p></td>
    <td><p>Ticked (True)</p></td>
    <td><p>Ticked (True)</p></td>
    </tr>
    <tr class="even">
    <td><p>Enable Signature Validation in Authentication Requests and Logout Request</p></td>
    <td><p>Un-Ticked (False)</p></td>
    <td><p>Un-Ticked (False)</p></td>
    </tr>
    <tr class="odd">
    <td><p>Enable Attribute Profile</p></td>
    <td><p>Ticked (True)</p></td>
    <td><p>Ticked (True)</p></td>
    </tr>
    <tr class="even">
    <td><p>Include Attributes in the Response Always</p></td>
    <td><p>Ticked (True)</p></td>
    <td><p>Ticked (True)</p></td>
    </tr>
    <tr class="odd">
    <td><div class="content-wrapper">
    <p>IdP Entity ID Alias</p>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>This value overrides the <strong><code>                        Identity Provider Entity ID</code></strong> specified under the SAML SSO Inbound Authentication configuration in the Resident IdP. The <strong><code>Identity Provider Entity ID</code></strong> is used as the <code>issuer</code> of the SAML responses that are generated from WSO2 IS.</p>
    <p>By default, the issuer value of all SAML responses issued by WSO2 IS is the same as the <code>Identity Provider Entity ID </code> in the Resident IdP’s SAML SSO inbound authentication configuration. If you want that value to be unique for your SAML SP configuration, specify the unique value here so that the <code>IdP Entity ID</code> is overridden with this <code>IdP Entity ID Alias</code> value.</p>
    </div>
    </div>
    </div>
    </div>
    </div></td>
    <td><p>Any valid URL/URI unique for <a href="http://abc.com">abc.com</a> domain</p></td>
    <td><p>Any valid URL/URI unique for <a href="http://xyz.com">xyz.com</a> domain</p></td>
    </tr>
    </tbody>
    </table>

    <!-- ![sp-config]({{base_path}}/assets/img/tutorials/sp-config.png) -->

    Note that “ Service Provider Qualifier ” and “IdP Entity ID” values
    configured for each service provider are needed when configuring
    Azure AD.

6. Click **Register** to save changes.

### Configure Azure AD to trust WSO2 IS

1. Log in to a Windows machine and start Windows Azure Active Directory
    Powershell.
2. Run the following command. It prompts for the Azure AD admin
    credentials.

    ``` java
    $cred=Get-Credential
    ```

    ![configure-azure-to-trust-wso2is]({{base_path}}/assets/img/tutorials/configure-azure-to-trust-wso2is.jpg)

3. Enter the credentials and click OK. Run the following command to
    connect to the service with the stored credentials.

    ``` java
    Connect-MsolService –Credential $cred
    ```

4. Run the following command to verify the availability of the
    validated domains.  
    The ‘Status’ of the domains should be ‘Verified’, and
    ‘Authentication’ should be ‘Managed’.

    ``` java
    Get-MsolDomain
    ```

5. Configure each domain as a federated domain by providing the
    respective federation settings that match the WSO2 IS IdP. Store the
    federation settings in parameters.

    1. Store your domain.

        ``` java
        $dom = "abc.com"
        ```

    2. Set the IdP Logon URL for the POST SAML Authentication Request.
        For this tutorial, you can use the SAML SSO endpoint URL of WSO2
        IS with Service Provider Qualifier name appended as a query
        parameter. Note that the Service Provider Qualifier name should
        be the value you have provided when creating SAML
        inbound authentication configuration for the particular service
        provider.

        **Logon URL format**

        ``` java
        $logonurl = "https://{Hostname}:{Port}/samlsso?spQualifier={Service Provider Qualifier}"
        ```

        **Sample Logon URL**

        ``` java
        $logonurl = "https://localhost:9443/samlsso?spQualifier=abc.com"
        ```

    3. Set the issuer ID of the IdP. This value should be the
        `IdP Entity ID Alias` that you
        configured in the SAML inbound authentication configuration of
        the relevant service provider.

        ``` java
        $issueruri = "wso2is.abc.com"
        ```

    4. Set the IdP Logout URL for the POST SAML Logout Request. For
        this tutorial, you can use the SAML SSO endpoint URL of WSO2 IS
        with Service Provider Qualifier name appended as a query
        parameter. Note that the Service Provider Qualifier name should
        be the value you have provided when creating SAML
        inbound authentication configuration for the particular service
        provider.

        **Logout URL format**

        ``` java
        $logouturl = "https://{Hostname}:{Port}/samlsso?spQualifier={Service Provider Qualifier}"
        ```

        **Sample Logout URL**

        ``` java
        $logouturl = "https://localhost:9443/samlsso?spQualifier=abc.com"
        ```

    5. Store the IdP certificate. Enter the Base64 encoded signing
        certificate of WSO2 IS.

        !!! tip
             Note that the certificate value should be given in a single line without a break.

        !!! info "How to obtain the PEM encoded certificate"
                The PEM content of a certificate in a JKS file, can be obtained
                by following the steps below:

                1\. Export the certificate from the keystone. The exported certificate will be in binary format.

                ``` java
                keytool -export -keystore <keystore-path> -alias <alias-of-the-certificate> -file <path-of-the-expected-certificate-file>

                e.g. keytool -export -keystore wso2carbon.jks -alias wso2carbon -file wso2carbon.crt
                ```

                2\. Convert the above binary encoded certificate to a PEM encoded certificate.

                ``` java
                openssl x509 -inform der -in <path-of-binary-certificate> -out <path-of-expected-pem-content>
                
                e.g. openssl x509 -inform der -in wso2carbon.crt -out wso2carbon.pem
                ```

                3\. Open the obtained PEM encoded certificate using a text editor and
                copy the certificate content excluding the BEGIN CERTIFICATE and END
                CERTIFICATE placeholders.

        ``` java
        $cert = "{certificate}"
        ```

        The certificate for the default key store configured in WSO2 IS
        is given below.

        **Sample certificate**

        ``` java
        $cert = "MIIDSTCCAjGgAwIBAgIEAoLQ/TANBgkqhkiG9w0BAQsFADBVMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxDTALBgNVBAoTBFdTTzIxEjAQBgNVBAMTCWxvY2FsaG9zdDAeFw0xNzA3MTkwNjUyNTFaFw0yNzA3MTcwNjUyNTFaMFUxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzENMAsGA1UEChMEV1NPMjESMBAGA1UEAxMJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAluZFdW1ynitztkWLC6xKegbRWxky+5P0p4ShYEOkHs30QI2VCuR6Qo4Bz5rTgLBrky03W1GAVrZxuvKRGj9V9+PmjdGtau4CTXu9pLLcqnruaczoSdvBYA3lS9a7zgFU0+s6kMl2EhB+rk7gXluEep7lIOenzfl2f6IoTKa2fVgVd3YKiSGsyL4tztS70vmmX121qm0sTJdKWP4HxXyqK9neolXI9fYyHOYILVNZ69z/73OOVhkh/mvTmWZLM7GM6sApmyLX6OXUp8z0pkY+vT/9+zRxxQs7GurC4/C1nK3rI/0ySUgGEafO1atNjYmlFN+M3tZX6nEcA6g94IavyQIDAQABoyEwHzAdBgNVHQ4EFgQUtS8kIYxQ8UVvVrZSdgyide9OHxUwDQYJKoZIhvcNAQELBQADggEBABfk5mqsVUrpFCYTZZhOxTRRpGXqoW1G05bOxHxs42Paxw8rAJ06Pty9jqM1CgRPpqvZa2lPQBQqZrHkdDE06q4NG0DqMH8NT+tNkXBe9YTre3EJCSfsvswtLVDZ7GDvTHKojJjQvdVCzRj6XH5Truwefb4BJz9APtnlyJIvjHk1hdozqyOniVZd0QOxLAbcdt946chNdQvCm6aUOputp8Xogr0KBnEy3U8es2cAfNZaEkPU8Va5bU6Xjny8zGQnXCXxPKp7sMpgO93nPBt/liX1qfyXM7xEotWoxmm6HZx8oWQ8U5aiXjZ5RKDWCCq4ZuXl6wVsUz1iE61suO5yWi8="
        ```

6. Run the following command to establish trust.

    ``` java
    Set-MsolDomainAuthentication –DomainName $dom -Authentication Federated -PassiveLogOnUri $logonurl -SigningCertificate $cert -IssuerUri $issueruri -LogOffUri $logouturl -PreferredAuthenticationProtocol SAMLP
    ```

7. Run the following command to verify the federation settings for each
    domain.

    ``` java
    Get-MsolDomainFederationSettings -Domain $dom
    ```

    <!-- ![command-to-establish-trust]({{base_path}}/assets/img/tutorials/command-to-establish-trust.png) -->

You have now successfully set up trust between the on-premise identity
provider of WSO2 IS and the Azure Active Directory.

!!! tip
    If you wish to redo the configurations, do the following:

    1.  Run the following command to first move your domain back to the
        'Managed' authentication mode.
    
        ``` java
        Set-MsolDomainAuthentication -DomainName $dom -Authentication Managed
        ```

    2.  Re-set the parameters as listed in step 5 and then set the authentication method again as shown in step 6.

