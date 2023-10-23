# Configuring Azure Active Directory to Trust WSO2 Identity Server

This section provides instructions on how to configure the Azure Active
Directory to trust the on-premise IdP (the WSO2 Identity Server) as the
first part of the process of configuring WS-Federation with Office 365.

### Prerequisites

-   [Office 365 Business
    Account](https://products.office.com/en/business/office-365-business)
    with access to the Admin Portal
-   An internet-resolvable domain name (Office 365 SSO requires each
    user's username to have an Internet-resolvable domain name as the
    suffix. You cannot federate the default domain that is provided by
    Microsoft that ends with "onmicrosoft.com")
-   A Windows Platform with [Windows Azure Active Directory
    Powershell](https://technet.microsoft.com/library/jj151815.aspx)
    installed
-   [WSO2 Identity Server 5.1.0 or a later
    version](https://github.com/wso2/product-is/releases)

### Configuring Azure AD

1.  Start the Windows Azure Active Directory Powershell.

2.  The following commands connect with Windows Azure AD Powershell.

    1.  This command prompts user credentials.

        ``` powershell
        Run $cred=Get-Credential
        ```
        
        !!! tip 
			This will prompt for Windows Azure AD Admin credentials for the
			Office365 domain. The admin user’s domain credentials are
			usually in the following format: <user@domain.onmicrosoft.com>.

    2.  This command connects with the stored credentials. Provided that
        the credentials are accurate, the connection will be successful.

        ``` powershell
        Connect-MsolService -Credential $cred
        ```

    3.  This command verifies the availability of the validated domain.
        This will return the **Status** and **Authentication**. The
        ‘Status’ of our domain should be ‘Verified’, and
        ‘Authentication’ should be ‘Managed’.

        ``` powershell
        Get-MsolDomain
        ```

3.  Configure the domain as a federated domain, providing respective
    federation settings that match the IdP. Store the following
    federation settings in parameters. Replace the values below with
    your own.  
    -   Store your domain

        ``` powershell
		$dom = "wso2test.com"
		$brandname = "wso2"
        ```

    -   Set the Issuer Id of the IdP. This value should be the same as
        the **Identity Provider Entity Id** in the Resident IDP of WSO2
        Identity server.

        ``` powershell
        $issuerUri = "https://wso2test.com"
        ```

    -   Set the Passive STS Endpoint URL of the IdP. This should be the
        Passive STS endpoint of the WSO2 Identity server.

        ``` powershell
        $passiveLogonUri = "https://wso2test.com/passivests"
        ```

        !!! note
			If you will be configuring Office365 Active STS clients
			(complying with the WS-Trust protocol) through WSO2 Identity
			Server as well, you can do the following configuration along
			with these configurations.  

			Set the Active STS Endpoint URL of the IdP. This should be the
			Security Token Service endpoint of the WSO2 Identity
			server. Note that this endpoint is specific to WS-Trust and will
			not be used for the Passive STS use case.

			``` powershell
			$activeLogonUri="https://wso2test.com/services/wso2carbon-sts.wso2carbon-stsHttpsSoap12Endpoint"
			```
        

    -   Set the MetaData Exchange endpoint URL of the IdP.

        ``` powershell
         $mex = "https://wso2test.com/services/mex-ut"
        ```

    -   Store the IdP Certificate. Base64 encoded signing certificate of
        WSO2 IS should be given here. For default keystore configured in
        WSO2 IS certificate is as below.

        !!! note
			The certificate should be given in a single line
			without a break.
        

        ``` powershell
        $cert = "MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTousMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQIDAQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44iQlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJRO4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo="
        ```

4.  Run the following command to establish the trust.

    ``` powershell
	Set-MsolDomainAuthentication -DomainName $dom -Authentication Federated -ActiveLogOnUri $activeLogonUri -IssuerUri $issuerUri -SigningCertificate $cert -LogOffUri $passiveLogonUri -FederationBrandName $brandname -MetadataExchangeUri $mex -PassiveLogOnUri $passiveLogonUri -PreferredAuthenticationProtocol WsFed
    ```

5.  Run the following command to verify the federation settings

    ``` java
    Get-MsolDomainFederationSettings -Domain $domain
    ``` 

!!! info 
	You have now successfully configured the Azure Active Directory to trust
	our on-premises IdP (WSO2 Identity Server). For the next part of the
	process of configuring WS-Federation with Office 365, see [Configuring
	Office 365 WS-Federation with Identity
	Server](../../learn/configuring-office-365-ws-federation-with-identity-server).
