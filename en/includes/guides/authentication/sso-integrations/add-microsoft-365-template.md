# Log in to Microsoft 365 using {{ product_name }}

This page guides you through integrating {{ product_name }} for Single Sign-On (SSO) with Microsoft 365.

!!! note "Before you begin"
    - Have an Office 365 Business account with admin access.
    - Add a domain by following the [Microsoft documentation](https://learn.microsoft.com/en-gb/microsoft-365/admin/setup/add-domain?view=o365-worldwide&redirectSourcePath=%252fen-us%252farticle%252fadd-a-domain-to-office-365-6383f56d-3d09-4dcb-9b41-b5f5a5efd611).
    - Install PowerShell on your system.

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

Start Powershell and install the Microsoft Graph Powershell SDK.

```powershell
Install-Module Microsoft.Graph -Scope CurrentUser -Repository PSGallery -Force
```

Verify that the Microsoft Graph Powershell SDK is installed.

```powershell
Get-InstalledModule Microsoft.Graph
```

### Configure Azure Acitve Directory Domain Federation

1. Run the following command to connect to the Active Directory.

    ```powershell
    Connect-MgGraph -Scopes "Domain.ReadWrite.All"
    ```

2. Configure the domain as a federated domain by providing the respective federation settings that match the {{product_name}}. Store the federation settings as parameters.

    ```powershell
    $Domain="yourdomain.com"
    $DisplayName="Login with ${productName}"
    {% if product_name == "Asgardeo" %}$LogOnUrl="https://api.asgardeo.io/t/{organization_name}/samlsso" {% else %} $LogOnUrl="https://localhost:9443/samlsso" {% endif %}
    {% if product_name == "Asgardeo" %}$LogOffUrl="https://api.asgardeo.io/t/{organization_name}/samlsso"{% else %}$LogOffUrl="https://localhost:9443/samlsso"{% endif %}
    {% if product_name == "Asgardeo" %}$IssuerName = "https://api.asgardeo.io/t/{organization_name}"{% else %}$IssuerName="https://localhost:9443"{% endif %}
    $Protocol="saml"
    $MfaBehavior="rejectMfaByFederatedIdp"
    ```

    - Store the IdP certificate. You can get the certificate value from the **Guide** of the created Microsoft 365 application.

        ```powershell
        $IDPResponseSigningCert = "MIIDCDCCAfCgAwIBAgIEtUo9DDANBgkqhkiG9w0BAQsFADBGMQ0wCwYDVQQGEwROb25lMRQwEgYDVQQKEwtOb25lIEw9Tm9uZTENMAsGA1UECxMETm9uZTEQMA4GA1UEAxMHYWxmaGVpbTAeFw0yNDAyMTgwODM0MzNaFw0zNDAzMTcwODM0MzNaMEYxDTALBgNVBAYTBE5vbmUxFDASBgNVBAoTC05vbmUgTD1Ob25lMQ0wCwYDVQQLEwROb25lMRAwDgYDVQQDEwdhbGZoZWltMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk3tgNcSqohc3Qt1AOYXXUklP1jIgxUBfjV7gWo5NXO9dBjI3ljbATeSP+1QKT9KfOYmz8IcJH00t8dlXeRMeLKywbp3Q2nFLGljL/iBdfzeU8TgyT68M6Evg21STAFx1uQmNwrXpnaB06UcTx2P/Fh5hiMewYpLf907VgQPPTFyMdh+3SanJ1jOX9GtyvUvYWcd2VUh0qeAXw4cei04VzsREhW6Dyx9UxybeqqT54dGOz+QGhkMyY56rwhZdVEHZH1ootdth09aCp66vNaYqIFwBXquyvRuHrG+WvX7oLcxOIwPutajvCXbdO9SepmFZJ5dFteC+Zbi5qYqOMjNPwwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAd/3JJecUOXYbVezUbpq1ICUqZrkDznGBcvjjeUq7NMYtbogC0JlOh+mVRPCn9ypicsF1R5OUfxRG6Bsu3AeyfelEHF870NAS1e5+zprBpWdlHdgznifVs02+1/JBDLWn9uFr35MyC4AE82yOdV5SQ9Xzn3igaXb+4/UtzHKknenHqhdXJ4LfTMVKSDwT8Uxte/XD0NpUZ7YjeOiBcALow7Nbt1JdFqnQ90j79gpJXA3Cz0ar0P58KwPDMurTwAiGaAetYY38XOYNtsyzK9LxLKPH7RX3FOLYYjF4PAZWEGUu7Wxk5t0462Srlru3fMWUksPO6pMEAIm88j7C1LCNc"
        ```

3. Run the following command to define a new domain federation configuration.

    ```powershell
    New-MgDomainFederationConfiguration `
      -DomainId $Domain `
      -DisplayName $DisplayName `
      -IssuerUri $IssuerName `
      -PassiveSignInUri $LogOnUrl `
      -PreferredAuthenticationProtocol $Protocol `
      -SignOutUri $LogOffUrl `
      -SigningCertificate $IDPResponseSigningCert `
      -FederatedIdpMfaBehavior $MfaBehavior
    ```

4. Run the following command to verify the federation settings.

     ```powershell
     Get-MgDomainFederationConfiguration -DomainId $Domain
     ```

You have now successfully set up trust between {{product_name}} and the Azure Active Directory. If you wish to redo the configurations, run the following command to move your domain back to the `Managed` authentication mode:

```powershell
Remove-MgDomainFederationConfiguration `
  -DomainId "yourdomain.com" `
  -InternalDomainFederationId "2a8ce608-bb34-473f-9e0f-f373cbc5a"
```

## Try it out

Now that you have integrated {{product_name}} with Microsoft 365, follow the steps below to test it.

1. Create a user in {{ product_name }}.
2. Add the same user to Microsoft using the following command. Here, the `OnPremisesImmutableId` should be the UUID of the user.

    ```powershell
    $Password = "p@ssword*123"
    $PasswordProfile = @{ Password = "$Password" }

    New-MgUser `
      -UserPrincipalName "john@yourdomain.com" `
      -DisplayName "John Doe" `
      -GivenName "John" `
      -Surname "Doe" `
      -AccountEnabled `
      -MailNickName "JohnDoe" `
      -OnPremisesImmutableId "4ae2cb728-bb34-433f-4e0f-r489cbe4p" `
      -PasswordProfile $PasswordProfile `
      -UsageLocation "US"
    ```

!!! note

    Alternatively, you can automate the user synchronization using Powershell Cmdlets as well. For more information, refer to the [Microsoft Entra ID documentation](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-fed-saml-idp#provision-user-principals-to-microsoft-entra-id--microsoft-365).

You can access Microsoft 365 portal via [https://portal.office.com](https://portal.office.com). When you enter the user's email address (eg: `john@yourdomain.com`), you'll be automatically redirected to the WSO2 Identity Server login page to complete the authentication.
