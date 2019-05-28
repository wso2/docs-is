# Configuring AD FS as a Federated Authenticator

!!! warning
    
    This document is work in progress!
    

In this tutorial, you configure Active Directory Federation Services (AD
FS) 3.0 as the federated authenticator in WSO2 Identity Server (WSO2 IS)
using SAML. Let's take a look at the steps you need to follow:

-   [Configuring Active Directory Federation Services (AD
    FS)](#ConfiguringADFSasaFederatedAuthenticator-ConfiguringActiveDirectoryFederationServices(ADFS))
-   [Configuring WSO2 IS for Federated
    Authentication](#ConfiguringADFSasaFederatedAuthenticator-ConfiguringWSO2ISforFederatedAuthentication)

### Configuring Active Directory Federation Services (AD FS)

Follow the steps given below to add WSO2 IS as the relying party AD FS.

Go to the AD FS management console and expand **Trust Relationship** .

Right click on **Relying Party Trust** and select **Add Relying Party
Trust** .  

Click Start \> . Next  on the wizard.

Enter a preferred name to represent WSO2 Identity Server (relying party)
and click **Next** .

Select the **AD FS Profile** and click **Next** .  

Click **Next** again as you are not using an encryption profile for this
tutorial.

Enter the SAML 2.0 SSO service URL of the relying party as the
commonauth endpoint .  
The endpoint for WSO2 IS is https://localhost:9443/commonauth .

Enter a value for the **relying party trust identifier** and click
**Next** .  

The same value that is entered here needs to be used when configuring
the identity provider on WSO2 IS.

Click **Next** as multi factor authentication is not required for this
tutorial.

Select **Permit all users to access this relying party** and click
**Next** .

Review the settings and click **Next** .  

Click **Close** to finish adding the relying party trust.  
The Claim Rules dialogue wizard opens.  

In the Edit Claim Rule dialogue specify the claims that needs to be sent
to the relying party.  
In this tutorial, let's send the SAM-Account-Name LDAP attribute as a
NameID claim.

  

1.  Click **Add Rule** .

2.  Set a Claim rule name and map the **SAM-Account-Name** to the
    **E-Mail Address** .

3.  Click **Finish** .  

4.  Click **Add Rule** again to transform the email address claim to a
    NameID claim.  

5.  Select **Transform an Incoming Claim** and click **Next** .  

6.  Set the **Claim rule name** .

7.  Select the incoming claim type as E-Mail Address and outgoing claim
    type and ID format as Name ID and Unspecified respectively.

8.  Click **Finish \>** **Apply** .

9.  Close the claim rules dialogue box

Configure the Relying Party Trust properties.

1.  Right click on the **Relying Party Trust** you just created and
    select **Properties** .  

2.  Open the **Signature** tab and click **Add** .  

3.  Add the certificate.  

    You can use any of the two methods listed below depending on your
    WSO2 IS configurations.  

    -   When the Service Provider in WSO2 IS is under the super tenant
        domain, the public certificate of WSO2 IS needs to be uploaded

    -   Else, the public certificate of the tenant domain needs to be
        selected. The public certificate of the tenant can be exported
        from the Key Management feature of the WSO2 IS management
        console.

    In this tutorial, the service provider is added in the super tenant
    domain and the default keystore is not changed. Therefore, the
    default `            wso2carbon           ` certificate that is in
    the `            <IS_HOME>/repository/resources/security           `
    directory is used.

4.  Yes to proceed when following dialogue appears.  

5.  Open the **Endpoint** tab to set the SAML logout endpoint.

6.  Click **Add SAML** .  

7.  Select SAML Logout as the value for the **Endpoint Type** and the
    Binding as the value **POST** .

8.  Set the Trusted URL as https://\<AD\_FS\_server\>/adfs/ls and the
    Response URL as the `            /commonauth           ` endpoint of
    WSO2 IS.

9.  Save the property settings of the relying party.  

Configure AD FS as an Identity Provider in WSO2 IS. You need to add the
Token signing certificate of AD FS when configuring WSO2 IS.  
Follow the steps given below to export the token signing certificate of
WSO2 IS:

1.  In the AD FS management close, click **Certificates** that is under
    **Service.**

2.  Right click on the **Token-signing certificate** and select **View
    Certificate** .

3.  Open the **Details** tab and click **Copy to File** .

4.  Follow the Certificate Export Wizard by clicking **Next** .  

5.  Select the **Base-64 encoded X.509 (.cer)** option and click
    **Next** .

6.  Save the certificate to a desired location and click **Finish** .  

You have successfully configured AF DS. Next , you need to configure
WSO2 IS for federated authentication.

### Configuring WSO2 IS for Federated Authentication

Follow the steps given below to configure WSO2 IS to use AF DS as the
Identity Provider (IdP).

1.  Login to IS Management console.
2.  Click Add under Identity Providers.
3.  Provide a unique name for the IdP and add the **Token-signing
    certificate of ADFS** by clicking the Browse button.
4.  Expand **Federated Authenticators** and **Expand SAML Web SSO
    Configuration** .
5.  Click **Configure** to start configuring the SAML 2 Web SSO
    configurations.  
    1.  Check **Enable SAML2 Web SSO** .
    2.  Identity Provider Entity Id: This can be found in
        FederationMetadata.xml under entityID attribute. The
        FederationMetadata.xml can be accessed through
        https://\<AD\_FS\_server\>/FederationMetadata/2007-06/
        FederationMetadata.xml . The Entity ID is usually in the form
        `            http://<AD_FS_server>/adfs/services/trust           `
    3.  Service Provider Entity Id should be same as what’s given in AD
        FS RP trust identifier. **eg:wso2-is**
    4.  SSO URL should be in the form of
        http://\<AD\_FS\_server\>/adfs/ls.
    5.  Check Enable Logout.
    6.  Logout URL should be the same as SSO URL.
    7.  Check Enable Logout Request Signing.
    8.  Select HTTP Binding as POST.
6.  Click Register to save the IdP.  
