# Log in to Microsoft 365 using {{ product_name }}

This page guides you through integrating {{ product_name }} for Single Sign-On (SSO) with Microsoft 365.

!!! note "Before you begin"
    - You need an Office 365 Business account with admin access and a domain added as per the [Microsoft documentation](https://learn.microsoft.com/en-gb/microsoft-365/admin/setup/add-domain?view=o365-worldwide&redirectSourcePath=%252fen-us%252farticle%252fadd-a-domain-to-office-365-6383f56d-3d09-4dcb-9b41-b5f5a5efd611).
    - Additionally, ensure a Windows instance with PowerShell is installed

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

In your Windows system, start Powershell and install the Microsoft Graph Powershell SDK.

``` java
Install-Module Microsoft.Graph -Scope CurrentUser -Repository PSGallery -Force
```

Verify that the Microsoft Graph Powershell SDK is installed.

```java
Get-InstalledModule Microsoft.Graph
```

### Configure Azure Acitve Directory to trust {{product_name}}

1. Run the following command to connect to the Active Directory.

    ``` java
    Connect-MgGraph
    ```

2. Run the following command to verify the availability of the validated domain.

    ``` java
    Confirm-MgDomain
    ```

    !!! note
        The `Status` of the domain should be `Verified`, and `Authentication` should be `Managed`.

3. Configure the domain as a federated domain by providing the respective federation settings that match the {{product_name}} IdP. Store the federation settings as parameters. 

4. Run the following command to store your domain.

    ``` java
    $dom = "wso2.cf"
    ```

5. Set the IdP logon URL for the POST SAML authentication request. For this tutorial, you can use the SAML SSO endpoint URL of {{product_name}}.

    {% if product_name == "Asgardeo" %}
    ```java
    $logonurl = "https://api.asgardeo.io/t/{organization_name}/samlsso"
    ```
    {% else %}

    ``` java
    $logonurl = "https://localhost:9443/samlsso"
    ```
    {% endif %}

6. Set the issuer ID of the IdP.

    {% if product_name == "Asgardeo" %}
    ```java
    $issueruri = "https://api.asgardeo.io/t/{organization_name}"
    ```
    {% else %}

    ``` java
    $issueruri = "https://localhost:9443/oauth2/token"
    ```
    {% endif %}

7. Set the IdP logout URL for the POST SAML Logout Request. For this tutorial, you can use the SAML SSO endpoint URL of WSO2 IS.

   {% if product_name == "Asgardeo" %}
    ```java
    $logonurl = "https://api.asgardeo.io/t/{organization_name}/samlsso"
    ```
    {% else %}

    ``` java
    $logonurl = "https://localhost:9443/samlsso"
    ```
    {% endif %}

8. Store the IdP certificate. You can get the certificate value from the **Guide** of the created Microsoft 365 application.

       ``` java
       $cert = "MIIDCDCCAfCgAwIBAgIEtUo9DDANBgkqhkiG9w0BAQsFADBGMQ0wCwYDVQQGEwROb25lMRQwEgYDVQQKEwtOb25lIEw9Tm9uZTENMAsGA1UECxMETm9uZTEQMA4GA1UEAxMHYWxmaGVpbTAeFw0yNDAyMTgwODM0MzNaFw0zNDAzMTcwODM0MzNaMEYxDTALBgNVBAYTBE5vbmUxFDASBgNVBAoTC05vbmUgTD1Ob25lMQ0wCwYDVQQLEwROb25lMRAwDgYDVQQDEwdhbGZoZWltMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk3tgNcSqohc3Qt1AOYXXUklP1jIgxUBfjV7gWo5NXO9dBjI3ljbATeSP+1QKT9KfOYmz8IcJH00t8dlXeRMeLKywbp3Q2nFLGljL/iBdfzeU8TgyT68M6Evg21STAFx1uQmNwrXpnaB06UcTx2P/Fh5hiMewYpLf907VgQPPTFyMdh+3SanJ1jOX9GtyvUvYWcd2VUh0qeAXw4cei04VzsREhW6Dyx9UxybeqqT54dGOz+QGhkMyY56rwhZdVEHZH1ootdth09aCp66vNaYqIFwBXquyvRuHrG+WvX7oLcxOIwPutajvCXbdO9SepmFZJ5dFteC+Zbi5qYqOMjNPwwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAd/3JJecUOXYbVezUbpq1ICUqZrkDznGBcvjjeUq7NMYtbogC0JlOh+mVRPCn9ypicsF1R5OUfxRG6Bsu3AeyfelEHF870NAS1e5+zprBpWdlHdgznifVs02+1/JBDLWn9uFr35MyC4AE82yOdV5SQ9Xzn3igaXb+4/UtzHKknenHqhdXJ4LfTMVKSDwT8Uxte/XD0NpUZ7YjeOiBcALow7Nbt1JdFqnQ90j79gpJXA3Cz0ar0P58KwPDMurTwAiGaAetYY38XOYNtsyzK9LxLKPH7RX3FOLYYjF4PAZWEGUu7Wxk5t0462Srlru3fMWUksPO6pMEAIm88j7C1LCNc"
       ```

9. Convert certificate string to PEM (Graph expects Base64 encoded DER as plain string)

    ```java
    $certBytes = [System.Convert]::FromBase64String($cert)
    $certBase64 = [System.Convert]::ToBase64String($certBytes)
    ```

10. Run the following command to establish trust.

    ```java
    Update-MgDomain -DomainId $dom -AuthenticationType "Federated"
    ```

    ``` java
    New-MgDomainFederationConfiguration -DomainId $dom `
    -ActiveSignInUri $logonurl `
    -PassiveSignInUri $logonurl `
    -IssuerUri $issueruri `
    -SigningCertificate $certBase64 `
    -SignOutUri $logouturl
    ```

11. Run the following command to verify the federation settings.

     ``` java
     Get-MgDomainFederationConfiguration -DomainId $dom
     ```
   
You have now successfully set up trust between {{product_name}} and the Azure Active Directory. If you wish to redo the configurations, run the following command to move your domain back to the `Managed` authentication mode:
    
``` bash
Update-MgDomain -DomainId $dom -AuthenticationType "Managed"
```

## Try it out

Now that you have integrated {{product_name}} with Microsoft 365, follow the steps below to test it.

1.  Create a user in {{ product_name }}.
2. Add the same user to Microsoft using the following command. Here, the ImmutableID should be the UUID of the user.

    ``` bash
    # Variables
    $upn = "pavindu@tryoutsso.wso2.com"
    $immutableId = "d0aab6be-f960-47b3-bab0-863a04a2926d"
    $firstName = "John"
    $lastName = "Doe"
    $displayName = "John Doe"
    $password = "P@ssw0rd!"  # You must specify an initial password

    # Create the user
    New-MgUser `
    -UserPrincipalName $upn `
    -AccountEnabled:$true `
    -DisplayName $displayName `
    -GivenName $firstName `
    -Surname $lastName `
    -OnPremisesImmutableId $immutableId `
    -MailNickname ($upn.Split("@")[0]) `
    -PasswordProfile @{ 
        ForceChangePasswordNextSignIn = $true
        Password = $password
    }
    ```
