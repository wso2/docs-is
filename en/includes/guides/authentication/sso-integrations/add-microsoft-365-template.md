# Configuring Microsoft 365 SAML2 with {{ product_name }}

This page guides you through using {{ product_name }} to log in to Google.

!!! note "Before you begin"
    - You need an Office 365 Business account with admin access and a domain added as per the [Microsoft documentation](https://learn.microsoft.com/en-gb/microsoft-365/admin/setup/add-domain?view=o365-worldwide&redirectSourcePath=%252fen-us%252farticle%252fadd-a-domain-to-office-365-6383f56d-3d09-4dcb-9b41-b5f5a5efd611).
    - Additionally, ensure a Windows instance with PowerShell is installed.
    

## Create the Microsoft 365 application

Follow the steps given below to register the Microsoft 365 application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and under **SSO Integrations**, select **Microsoft 365**.

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide a name for the application.

    ![Select google workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/microsoft-365-sso/add-microsoft-365-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

## Configure Microsoft 365

Follow the steps below to configure Microsoft 365.

### Install modules

In your Windows system, start Powershell and install the required modules.
 
``` java
#uninstall any existing older version of the AzureAD module
uninstall-module AzureAD


install-module AzureAD
install-module AzureADPreview
install-module MSOnline
```

### Configure Azure AD to trust {{product_name}}

The following steps configure the trust settings for Active Directory.

1. On the Windows Azure Active Directory Powershell, run the following command which prompts for the Azure AD admin credentials. Enter the credentials and click OK.

    ``` java
    $cred=Get-Credential
    ```

3. Run the following command to connect to the service with the stored credentials.

    ``` java
    Connect-MsolService –Credential $cred
    ```

4. Run the following command to verify the availability of the validated domain.

    ``` java
    Get-MsolDomain
    ```
    !!! note
        The `Status` of the domain should be `Verified`, and `Authentication` should be `Managed`.

5. Configure the domain as a federated domain by providing the respective federation settings that match the {{product_name}} IdP. Store the federation settings as parameters. 

6. Run the following command to store your domain.

    ``` java
    $dom = "wso2.cf"
    ```

7. Set the IdP logon URL for the POST SAML authentication request. For this tutorial, you can use the SAML SSO endpoint URL of {{product_name}}.

    {% if product_name == "Asgardeo" %}
    ```java
    $logonurl = "https://api.asgardeo.io/t/{organization_name}/samlsso"
    ```
    {% else %}

    ``` java
    $logonurl = "https://localhost:9443/samlsso"
    ```
    {% endif %}

8. Set the issuer ID of the IdP. This value should be the `Identity Provider Entity Id` that you
   configured in the SAML configuration of the Resident IdP of WSO2 IS.

    ``` java
    $issueruri = "localhost"
    ```

9. Set the IdP logout URL for the POST SAML Logout Request. For
   this tutorial, you can use the SAML SSO endpoint URL of WSO2 IS.

    ``` java
    $logouturl = "https://localhost:9443/samlsso"
    ```

10. Store the IdP certificate. You can get the certificate value from the Guide section in application.

       ``` java
       $cert = "{certificate}"
       ```

       The certificate for the default key store configured in WSO2 IS
       is given below.

       **Sample certificate**

       ``` java
       $cert = "MIIDSTCCAjGgAwIBAgIEAoLQ/TANBgkqhkiG9w0BAQsFADBVMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxDTALBgNVBAoTBFdTTzIxEjAQBgNVBAMTCWxvY2FsaG9zdDAeFw0xNzA3MTkwNjUyNTFaFw0yNzA3MTcwNjUyNTFaMFUxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzENMAsGA1UEChMEV1NPMjESMBAGA1UEAxMJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAluZFdW1ynitztkWLC6xKegbRWxky+5P0p4ShYEOkHs30QI2VCuR6Qo4Bz5rTgLBrky03W1GAVrZxuvKRGj9V9+PmjdGtau4CTXu9pLLcqnruaczoSdvBYA3lS9a7zgFU0+s6kMl2EhB+rk7gXluEep7lIOenzfl2f6IoTKa2fVgVd3YKiSGsyL4tztS70vmmX121qm0sTJdKWP4HxXyqK9neolXI9fYyHOYILVNZ69z/73OOVhkh/mvTmWZLM7GM6sApmyLX6OXUp8z0pkY+vT/9+zRxxQs7GurC4/C1nK3rI/0ySUgGEafO1atNjYmlFN+M3tZX6nEcA6g94IavyQIDAQABoyEwHzAdBgNVHQ4EFgQUtS8kIYxQ8UVvVrZSdgyide9OHxUwDQYJKoZIhvcNAQELBQADggEBABfk5mqsVUrpFCYTZZhOxTRRpGXqoW1G05bOxHxs42Paxw8rAJ06Pty9jqM1CgRPpqvZa2lPQBQqZrHkdDE06q4NG0DqMH8NT+tNkXBe9YTre3EJCSfsvswtLVDZ7GDvTHKojJjQvdVCzRj6XH5Truwefb4BJz9APtnlyJIvjHk1hdozqyOniVZd0QOxLAbcdt946chNdQvCm6aUOputp8Xogr0KBnEy3U8es2cAfNZaEkPU8Va5bU6Xjny8zGQnXCXxPKp7sMpgO93nPBt/liX1qfyXM7xEotWoxmm6HZx8oWQ8U5aiXjZ5RKDWCCq4ZuXl6wVsUz1iE61suO5yWi8="
       ```

11. Run the following command to establish trust.
     ``` java
     Set-MsolDomainAuthentication –DomainName $dom -Authentication Federated -PassiveLogOnUri $logonurl -SigningCertificate $cert -IssuerUri $issueruri -LogOffUri $logouturl -PreferredAuthenticationProtocol SAMLP
     ```

12. Run the following command to verify the federation settings.

     ``` java
     Get-MsolDomainFederationSettings -Domain $dom
     ```
   
You have now successfully set up trust between the on-premise identity
provider of WSO2 IS and the Azure Active Directory.


If you wish to redo the configurations, do the following:

1.  Run the following command to first move your domain back to the
    'Managed' authentication mode.
    
``` bash
Set-MsolDomainAuthentication -DomainName $dom -Authentication Managed
```

2.  Re-set the parameters as listed in step 5 and then set the authentication method again as shown in step 6.

## Try it out

1.  Create a user on the {{ product_name }}.
2. Add that same user to Microsoft using the following command. Here, the ImmutableID should be the UUID of the user.

``` bash
New-MsolUser -UserPrincipalName yourdomain.com -ImmutableID userID -LastName lastNameOfUser -FirstName firstNameOfUser -DisplayName WSO2 Test User
```
