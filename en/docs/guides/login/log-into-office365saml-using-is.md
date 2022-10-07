# Configuring Office365 SAML2 with WSO2 Identity Server

This tutorial guides you through configuring SAML2 authentication for
Office365 with WSO2 Identity Server (WSO2 IS). Follow the instructions
in the sections below to set this up.

## The flow

The diagram below demonstrates the flow of how Microsoft Office365 uses
WSO2 Identity Server as a SAML2 federated authenticator to authenticate
a user.

<!-- ![office365-saml2-flow]({{base_path}}/assets/img/tutorials/office365-saml2-flow.png) -->

## Prerequisites

- Office 365 Business Account with access to the [Office 365 Admin
    Portal](https://portal.office.com/adminportal/home).

    !!! tip
        If you do not already have an account, you can use a 30-day
        [trial version](https://products.office.com/en/compare-all-microsoft-office-products?tab=2)
        to try out this feature.

- Add a new domain to Office 365 using the [Office 365 Admin
    Portal](https://portal.office.com/adminportal/home) . For
    instructions on how to do this, see [Add A Domain to Office
    365](https://support.office.com/en-us/article/add-a-domain-to-office-365-6383f56d-3d09-4dcb-9b41-b5f5a5efd611)
    in the Microsoft documentation.

    !!! tip
        Office 365 SSO requires an internet-resolvable domain name
        to use as the suffix in each user’s username. You cannot federate
        the default domain that is provided by Microsoft that ends with
        "onmicrosoft.com".

        You can register a free domain using a site such as
        [www.dot.tk](http://www.dot.tk) if you do not already have a
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

## Configuring the WSO2 IS issuer

1. Navigate to `<IS_HOME>/bin/` and run the following command to start WSO2 Identity Server.

    - **On Windows**

    ``` java
    .\wso2server.bat
    ```

    - **On Linux/Unix**

    ``` java
    sh wso2server.sh
    ```

2. Access the following URL and log in to the management console: `<https://localhost:9443/carbon/>`

3. Click **Resident Identity Provider** under **Identity Providers** on the **Main** tab.
4. Expand the **Inbound Authentication Configuration** section and then expand **SAML2 Web SSO Configuration**.
5. Enter " `wso2.microsoft"` as the **Identity Provider Entity Id** value.  
    <!-- ![entity-id]({{base_path}}/assets/img/tutorials/entity-id.png) -->

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
    <td><p>Mapped Attribute (s) *</p></td>
    <td><p><strong>User Store Domain Name:</strong> PRIMARY</p>
    <p><strong>Mapped Attribute:</strong> userPrincipalName</p></td>
    </tr>
    <tr class="even">
    <td><p>Supported by Default</p></td>
    <td><p>true</p></td>
    </tr>
    </tbody>
    </table>

    <!-- ![configure-claims]({{base_path}}/assets/img/tutorials/configure-claims.png) -->

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
    <td><p>Display Name</p></td>
    <td><p>ObjectGuid</p></td>
    </tr>
    <tr class="even">
    <td><p>Description</p></td>
    <td><p>ObjectGuid</p></td>
    </tr>
    <tr class="odd">
    <td><p>Mapped Attribute (s) *</p></td>
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

## Configuring the service provider

1. Click **Add** under **Service Providers** and create a new service
    provider called 'Office365'.
2. Expand **Inbound Authentication Configuration** and then expand
    **SAML2 Web SSO Configuration**.  
    Configure the following fields and leave the rest of the default
    configurations as it is.


    | Field                                                                     | Value                                                |
    |---------------------------------------------------------------------------|------------------------------------------------------|
    | Issuer                                                                    | urn:federation:MicrosoftOnline                       |
    | Assertion Consumer URLs                                                   | https://login.microsoftonline.com/login.srf          |
    | NameID format                                                             | urn:oasis:names:tc<zero-width-space>:SAML:2.0:nameid-format:persistent
    | Enable Response Signing                                                   | Selected (True)                                      |
    | Enable Signature Validation in Authentication Requests and Logout Request | Unselected (False)                                   |
    | Enable Attribute Profile                                                  | Selected (True)                                      |
    | Include Attributes in the Response Always                                 | Selected (True)                                      |


    <!-- ![configure-sp-fields]({{base_path}}/assets/img/tutorials/configure-sp-fields.png) -->

3. Expand **Claim Configuration** and select **Define Custom Claim
    Dialect**.

4. Click **Add Claim URI** and add the following claims.

    | Service Provider Claim | Local Claim                       | Requested Claim |
    |------------------------|-----------------------------------|-----------------|
    | IDPEmail               | http://wso2.org/claims/upn        | Selected (True) |
    | NameID                 | http://wso2.org/claims/objectguid | Selected (True) |

5. Set NameID as the **Subject Claim URI** and click **Update** to save
    changes.

### Configure Azure AD to trust WSO2 IS

1. Log in to a Windows machine and start Windows Azure Active Directory
    Powershell.
2. Run the following command. It prompts for the Azure AD admin
    credentials.

    ``` java
    $cred=Get-Credential
    ```

    ![azure-ad-admin-credentials]({{base_path}}/assets/img/tutorials/azure-ad-admin-credentials.jpg)

3. Enter the credentials and click OK. Run the following command to
    connect to the service with the stored credentials.

    ``` java
    Connect-MsolService –Credential $cred
    ```

4. Run the following command to verify the availability of the
    validated domain.  
    The ‘Status’ of the domain should be ‘Verified’, and
    ‘Authentication’ should be ‘Managed’.

    ``` java
    Get-MsolDomain
    ```

    ![verify-domain-availability]({{base_path}}/assets/img/tutorials/verify-domain-availability.jpg)

5. Configure the domain as a federated domain by providing the
    respective federation settings that match the WSO2 IS IdP. Store the
    federation settings in parameters.

    1. Store your domain.

        ``` java
        $dom = "wso2.cf"
        ```

    2. Set the IdP Logon URL for the POST SAML Authentication Request.
        For this tutorial, you can use the SAML SSO endpoint URL of WSO2
        IS.

        ``` java
        $logonurl = "https://localhost:9443/samlsso"
        ```

    3. Set the issuer ID of the IdP. This value should be the
        `Identity Provider Entity Id` that you
        configured in the SAML configuration of the Resident IdP of WSO2
        IS.

        ``` java
        $issueruri = "wso2is.microsoft"
        ```

    4. Set the IdP Logout URL for the POST SAML Logout Request. For
        this tutorial, you can use the SAML SSO endpoint URL of WSO2 IS.

        ``` java
        $logouturl = "https://localhost:9443/samlsso"
        ```

    5. Store the IdP certificate. Enter the Base64 encoded signing
        certificate of WSO2 IS.  
        For the default key store configured in WSO2 IS, the certificate
        is as given below.

        !!! tip
            Note that the certificate value should be given in a single line without a break.


        !!! info "How to obtain the PEM encoded certificate"
                The PEM content of a certificate in a JKS file, can be obtained by following the steps below:

                1. Export the certificate from the keystone. The exported certificate will be in binary format.

                ``` java
                keytool -export -keystore <keystore-path> -alias <alias-of-the-certificate> -file <path-of-the-expected-certificate-file>

                e.g. keytool -export -keystore wso2carbon.jks -alias wso2carbon -file wso2carbon.crt
                ```

                2. Convert the above binary encoded certificate to a PEM encoded certificate.

                ``` java
                openssl x509 -inform der -in <path-of-binary-certificate> -out <path-of-expected-pem-content>
                
                e.g. openssl x509 -inform der -in wso2carbon.crt -out wso2carbon.pem
                ```

                3. Open the obtained PEM encoded certificate using a text editor and copy the certificate content excluding the BEGIN CERTIFICATE and END CERTIFICATE placeholders.

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

7. Run the following command to verify the federation settings.

    ``` java
    Get-MsolDomainFederationSettings -Domain $dom
    ```

    ![verify-federation-settings]({{base_path}}/assets/img/tutorials/verify-federation-settings.jpg)

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


## What's Next?

To see how this feature works, try out the [Configuring On-Demand Provisioning with Azure AD]({{base_path}}/guides/identity-lifecycles/configure-on-demand-provisioning-with-azure-ad) tutorial to provision users directly to Azure AD at the point of authentication.
