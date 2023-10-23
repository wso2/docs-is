# Configure AD FS as a Federated Authenticator

In this guide, you configure Active Directory Federation Services (AD
FS) 3.0 as the federated authenticator in WSO2 Identity Server (WSO2 IS)
using SAML. Let's take a look at the steps you need to follow:

---

## Configure Active Directory Federation Services (AD FS)

Follow the steps given below to add WSO2 IS as the relying party AD FS.

1. Go to the AD FS management console and expand **Trust Relationship**.

2. Right click on **Relying Party Trust** and select **Add Relying Party
Trust**.  

3. Click **Start > Next** on the wizard.

4. Enter a preferred name to represent WSO2 Identity Server (relying party)
and click **Next**.

5. Select the **AD FS Profile** and click **Next**.  

6. Click **Next** again as you are not using an encryption profile.

7. Enter the SAML 2.0 SSO service URL of the relying party as the
commonauth endpoint .  
The endpoint for WSO2 IS is `https://<IS_HOST>:<PORT>/commonauth`.

8. Enter a value for the **relying party trust identifier** and click
**Next**.  

	!!! info 
		The same value that is entered here needs to be used when configuring
		the identity provider on WSO2 IS.

9. Click **Next** as multi factor authentication is not required for this guide.

10. Select **Permit all users to access this relying party** and click
**Next**.

11. Review the settings and click **Next**.  

12. Click **Close** to finish adding the relying party trust. The Claim Rules dialogue wizard opens.  

13. In the Edit Claim Rule dialogue specify the claims that needs to be sent
	to the relying party.  
	In this guide, let's send the SAM-Account-Name LDAP attribute as a
	NameID claim.

	a.  Click **Add Rule**.

	b.  Set a Claim rule name and map the **SAM-Account-Name** to the
    **E-Mail Address**.

	c.  Click **Finish**.  

	d.  Click **Add Rule** again to transform the email address claim to a
    NameID claim.  

	e.  Select **Transform an Incoming Claim** and click **Next**.  

	f.  Set the **Claim rule name**.

	g.  Select the incoming claim type as E-Mail Address and outgoing claim
    type and ID format as Name ID and Unspecified respectively.

	h.  Click **Finish \>** **Apply**.

	i.  Close the claim rules dialogue box.

14. Configure the Relying Party Trust properties.

	a.  Right click on the **Relying Party Trust** you just created and
    select **Properties**.  

	b.  Open the **Signature** tab and click **Add**.  

	c.  Add the certificate.  
	
	!!! info 
		You can use any of the two methods listed below depending on your
		WSO2 IS configurations.  

		-   When the Service Provider in WSO2 IS is under the super tenant
			domain, the public certificate of WSO2 IS needs to be uploaded

		-   Else, the public certificate of the tenant domain needs to be
			selected. The public certificate of the tenant can be exported
			from the Key Management feature of the WSO2 IS management
			console.

    In this guide, the service provider is added in the super tenant
    domain and the default keystore is not changed. Therefore, the
    default `            wso2carbon           ` certificate that is in
    the `            <IS_HOME>/repository/resources/security           `
    directory is used.

	d.  Yes to proceed when following dialogue appears.  

	e.  Open the **Endpoint** tab to set the SAML logout endpoint.

	f.  Click **Add SAML**.  

	g.  Select SAML Logout as the value for the **Endpoint Type** and the
    Binding as the value **POST**.

	h.  Set the Trusted URL as `https://<AD_FS_server>/adfs/ls` and the
    Response URL as the `            /commonauth           ` endpoint of
    WSO2 IS.

	i.  Save the property settings of the relying party.  

15. Configure AD FS as an Identity Provider in WSO2 IS. You need to add the
	Token signing certificate of AD FS when configuring WSO2 IS.  
	Follow the steps given below to export the token signing certificate of
	WSO2 IS:

	a.  In the AD FS management close, click **Certificates** that is under
    **Service.**

	b.  Right click on the **Token-signing certificate** and select **View
    Certificate**.

	c.  Open the **Details** tab and click **Copy to File**.

	d.  Follow the Certificate Export Wizard by clicking **Next**.  

	e.  Select the **Base-64 encoded X.509 (.cer)** option and click
    **Next**.

	f.  Save the certificate to a desired location and click **Finish**.  

You have successfully configured AF DS. Next , you need to configure
WSO2 IS for federated authentication.

---

## Configure WSO2 IS for federated authentication

Follow the steps given below to configure WSO2 IS to use AF DS as the
Identity Provider (IdP).

1.  Log in to the WSO2 IS Management console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Navigate to **Main** > **Identity** > **Identity Providers** > **Add**.

3.  Provide a unique name for the IdP and select the **Upload IDP certificate** option in **Choose IDP certificate type**.

4.	Select **Choose file** and add the Token-signing certificate of ADFS.
    
5.  Expand **Federated Authenticators** and **Expand SAML Web SSO Configuration**.
    
6.  Click **Configure** to start configuring the SAML 2 Web SSO
    configurations.  
	
    a.  Check **Enable SAML2 Web SSO**.
    
    b.  The **Identity Provider Entity Id** can be found in `https://<AD_FS_server>/FederationMetadata/2007-06/FederationMetadata.xml` under the `entityID` attribute. The Entity ID is usually in the form `http://<AD_FS_server>/adfs/services/trust`.
        
    c.  The **Service Provider Entity Id** should be the same as what is given in the ADFS RP trust identifier, e.g., wso2-is.
        
    d.  SSO URL should be in the form of `http://<AD_FS_server>/adfs/ls`.
        
    e.  Select **Enable Logout Request Signing**.
    
    f.  The **Logout URL** should be the same as SSO URL.
    
    g.  Select **HTTP Binding** as **HTTP-POST**.
    
6.  Click **Register**.
