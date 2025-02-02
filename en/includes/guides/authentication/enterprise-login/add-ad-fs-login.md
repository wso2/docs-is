# Add login with Active Directory Federation Services (AD FS)

Active Directory Federation Service (AD FS) enables federated identity and access management by securely sharing digital identity and entitlements rights across organizational and security boundaries.

Follow this guide for to configure AD FS as a federated authenticator with {{product_name}}.

!!! note
    Refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/ad-fs-overview){:target="_blank"} for instructions on configuring AD FS.

## Step 1: Configure WSO2 IS as a relying party trust

Follow the steps below on your AD to register {{product_name}} as a relying party trust:

1. Open the **Server Manager** application.
2. Click on **Tools** and select **AD FS Management** to open the AD FS Management Console.

    ![Open the AD FS Management Console]({{base_path}}/assets/img/guides/idp/ad-fs-idp/open-server-management-console.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Under **AD FS**, right-click **Relying Party Trusts** and select **Add Relying Party Trust**.

    ![Add relying party trust]({{base_path}}/assets/img/guides/idp/ad-fs-idp/add-relying-party-trust.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. In the wizard that opens, select **Claims aware** and click **Start**.

    ![Select claims aware]({{base_path}}/assets/img/guides/idp/ad-fs-idp/select-claims-aware.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Select **Enter data about the relying party manually** and click **Next**.

    ![Enter data about the relying party manually]({{base_path}}/assets/img/guides/idp/ad-fs-idp/enter-data-manually.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Enter a preferred display name to represent {{product_name}} as the relying party. For this tutorial, we will be using the name **WSO2 Identity Server**. Optionally, you may also add notes about the relying party.

    ![Enter relying party display name]({{base_path}}/assets/img/guides/idp/ad-fs-idp/enter-display-name.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Click **Next**.
8. On the encryption certificate page, click **Next** again as an encryption profile is not necessary.
9. Select **Enable support for the SAML 2.0 WebSSO protocol** and set the **Relying party SAML 2.0 SSO Service URL** to `https://<IS_HOST>:<PORT>/commonauth`.

    ![Configure SAML SSO]({{base_path}}/assets/img/guides/idp/ad-fs-idp/configure-saml-sso.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

10. Enter a preferred value for the **relying party trust identifier** and click **Add**. 

    !!! note "Important"
        This is the value that will be used as the service provider entity id later when configuring the federated authenticator connection in WSO2 Identity Server, therefore take note of this value.

    ![Set relying party trust identifier]({{base_path}}/assets/img/guides/idp/ad-fs-idp/set-trust-identifier.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

11. Click **Next**.
12. Set the access policy as necessary. For this tutorial, we will be using **Permit everyone**.

    ![Set relying party access policy]({{base_path}}/assets/img/guides/idp/ad-fs-idp/set-access-policy.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

13. Click **Next**.
14. Review the details of the trust and click **Next**.
15. Click **Close** to finish adding the relying party trust.

    ![Complete adding relying party trust]({{base_path}}/assets/img/guides/idp/ad-fs-idp/complete-adding-relying-party-trust.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Step 2: Configure the claim issuance policies for the relying party trust

Follow the steps below on your AD to configure the claims that AD FS will send to {{product_name}}:

1. Right-click the newly added relying party trust "WSO2 Identity Server" and select **Edit Claim Issuance Policy**.
2. Click **Add Rule**.
3. Set the claim rule template to **Send LDAP Attributes as Claims** and click **Next**.

    ![Select rule template to send LDAP Attributes as claims]({{base_path}}/assets/img/guides/idp/ad-fs-idp/send-ldap-attributes-as-claims.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a suitable value for the name of the claim rule.
5. Set the **Active Directory** as the attribute store.
6. Map the **SAM-Account-Name** LDAP attribute with the **E-Mail Address** outgoing claim type.

    ![Map LDAP attribute with claim]({{base_path}}/assets/img/guides/idp/ad-fs-idp/map-ldap-attribute-to-claim.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Click **Finish** to add the first rule.
8. Click **Add Rule** again.
9. Set the claim rule template to **Transform an Incoming Claim** and click **Next**.

    ![Select rule template to transform an incoming claim]({{base_path}}/assets/img/guides/idp/ad-fs-idp/transform-an-incoming-claim.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

10. Enter a suitable value for the name of the claim rule.
11. Select **E-Mail Address** as the incoming claim type.
12. Select **Name ID** as the outgoing claim type.
13. Set **Unspecified** as the outgoing name ID format.
14. Check **Pass through all claim values** and click **Finish**.

    ![Map incoming claim with outgoing claim]({{base_path}}/assets/img/guides/idp/ad-fs-idp/map-incoming-claim-with-outgoing-claim.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

12. Click **Apply**.

## Step 3: Configure the relying party trust signature properties

The following steps involve establishing a trust relationship between AD FS and {{product_name}}, ensuring secure communication and authentication.

### Step 3.1: Extract the public certificate of WSO2 IS

This step extracts the public key from the {{product_name}} keystore which will then be uploaded to AD FS in the following step. Depending on the tenant in which your application is created, the certificate extraction differs as outlined below.

- If the application is in the `carbon.super` super tenant, the public certificate of {{product_name}} needs to be uploaded. It can be exported as follows.

    1. Navigate to `<IS-HOME>/repository/resources/security`.
    2. Run the following command to export the `wso2carbon` public certificate of the super tenant.

        ```keytool -exportcert -keystore wso2carbon.jks -alias wso2carbon -file exported_certificate.cer```

- However, if the application is under another tenant, the public certificate of the relevant tenant needs to be uploaded.

    1. Login to the Carbon Management Console at `https://localhost:9443/carbon/admin/login.jsp` with the tenant admin credentials.
    2. In the left-hand menu, under **Main > Manage > Keystores**, click on **List**.
    3. Click **Public Key** to download the public certificate of the tenant.

        ![Export the public certificate of the tenant]({{base_path}}/assets/img/guides/idp/ad-fs-idp/export-tenant-public-certificate.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

In this guide, we are using an application created in the super tenant and the default keystore remains unchanged. As a result, the default `wso2carbon` certificate located in the `<IS_HOME>/repository/resources/security` directory is used.

### Step 3.2: Upload the public certificate to AD FS

AD FS uses the public certificate of {{product_name}} to verify the signatures of incoming SAML requests and responses. To upload the public certificate,

1. On the AD FS management console, right-click the relying party trust "WSO2 Identity Server" and select **Properties**.

    ![Configure relying party properties]({{base_path}}/assets/img/guides/idp/ad-fs-idp/configure-relying-party-properties.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Open the **Signature** tab and click **Add**.

3. Upload the certificate that was exported in the previous step.

    ![Upload the public certificate]({{base_path}}/assets/img/guides/idp/ad-fs-idp/add-certificate.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Apply**.

## Step 4: Configure the relying party trust endpoint properties

This step involves establishing the specific URLs and protocols AD FS will use to communicate with {{product_name}}. To do so,

1. Switch to the **Endpoint** tab under the relying party trust properties and click **Add SAML**.
5. Set **SAML Logout** as the endpoint type.
6. Set **POST** as the binding.
7. Set the **Trusted URL** as `https://<AD_FS_server>/adfs/ls`.
8. Set the **Response URL** as the `https://<IS_HOST>:<IS_PORT>/commonauth` endpoint of WSO2 IS.

    ![Configure the SAML Endpoint]({{base_path}}/assets/img/guides/idp/ad-fs-idp/configure-saml-endpoint.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

9. Click **OK**, then **Apply**.

## Step 5: Export the token signing certificate of the relying party trust

{{product_name}} uses the token signing certificate of AD FS to validate tokens issued during federated authentication. To export the token signing certificate,

1. On the AD FS management console, under AD FS, expand **Service**.
    
    ![Expand services configurations]({{base_path}}/assets/img/guides/idp/ad-fs-idp/ad-fs-services.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Certificates**.
3. Right-click on the token-signing certificate and select **View Certificate**.

    ![Expand services configurations]({{base_path}}/assets/img/guides/idp/ad-fs-idp/ad-fs-certificates.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Open the **Details** tab and click **Copy to File**.

    ![Certificate Details]({{base_path}}/assets/img/guides/idp/ad-fs-idp/certificate-details.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. In the wizard that opens, click **Next**.
6. Select the **Base-64 encoded X.509 (.CER)** option and click **Next**.
7. Specify a name for the certificate file to be exported.
8. Click **Browser** to select the desired location to which the certificate should be saved. If no location is set, the certificate is saved to `C:Windows\ADFS` by default. 
9. Click **Next > Finish**.

    ![Export token signing certificate]({{base_path}}/assets/img/guides/idp/ad-fs-idp/export-token-signing-certificate.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Step 6: Configure AD FS as a connection

Now that you have successfully configured {{product_name}} as a relying party in AD FS, it is time to configure AD FS as a connection in {{product_name}}. To do so,

1. Log in to the {{product_name}} Console at `https://<IS_HOST>:<IS_PORT>/console` as an admin.
2. Navigate to **Connections** and click **New Connection**.

    ![Open connections page]({{base_path}}/assets/img/guides/idp/ad-fs-idp/open-connections-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
3. Under **Standard-Based IdP**, click **Create**.

    ![Create Standard-based IdP]({{base_path}}/assets/img/guides/idp/ad-fs-idp/create-standard-based-idp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a suitable name for the connection and select **SAML** as the protocol. 

    ![Configure SAML IdP]({{base_path}}/assets/img/guides/idp/ad-fs-idp/configure-saml-idp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Next**.
6. Enter the **Service Provider Entity ID**. This should be the same value configured as the relying party trust identifier in step 1.
7. Select **Manual Configuration** as the mode of configuration.
8. Enter the **Identity provider Single Sign-On URL**, usually in the format `http://<AD_FS_server>/adfs/ls`.
9. Enter the **Identity provider entity ID**. This can be found in `https://<AD_FS_server>/FederationMetadata/2007-06/FederationMetadata.xml` under the `entityID` attribute and usually takes the form `http://<AD_FS_server>/adfs/services/trust`.

    ![Entity ID in the Federation Metadata]({{base_path}}/assets/img/guides/idp/ad-fs-idp/federation-metadata.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

10. Click **Next**.

    ![Configure SAML IdP values]({{base_path}}/assets/img/guides/idp/ad-fs-idp/configure-saml-idp-values.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

11. Upload the token signing certificate exported in step 5 and click **Finish**.

    ![Upload the token signing certificate]({{base_path}}/assets/img/guides/idp/ad-fs-idp/upload-token-signing-certificate.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

12. Switch to the **Settings** tab in the newly created connection.

    ![Connection settings]({{base_path}}/assets/img/guides/idp/ad-fs-idp/connection-settings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

13. Scroll down to the **Request & Response Signing** settings and check **Logout request signing**.

    ![Enable logout request signing]({{base_path}}/assets/img/guides/idp/ad-fs-idp/enable-logout-request-signing.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

14. Click **Update** to save the changes.

## Step 7: Enable AD FS login in your application

Now that you have registered AD FS as a connection in {{product_name}}, let's look at how you can add this connection as a login option to your application. The following steps explain the process for the **My Account** application.

1. On the left-hand menu, click **Applications**.
2. Click on the settings icon corresponding to **My Account**.

    ![My Account application settings]({{base_path}}/assets/img/guides/idp/ad-fs-idp/my-account-application.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Switch to the **Login Flow** tab of the application.

    ![My Account login flow]({{base_path}}/assets/img/guides/idp/ad-fs-idp/my-account-login-flow.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Add Sign-in Option**.
5. Select the AD FS connection and click **Add**.

    ![Add My Account sign-in option]({{base_path}}/assets/img/guides/idp/ad-fs-idp/add-ad-fs-sign-in.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Update**.

## Try it Out

7. Now open the my account page at `https://<IS_HOST>:<IS_PORT>/t/<tenantdomain>/myaccount`.

    ![My Account sign-in page]({{base_path}}/assets/img/guides/idp/ad-fs-idp/my-account-sign-in-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

8. Click **Sign In With AD FS IdP**.
9. You will be successfully redirected to the AD FS sign in page.

    ![AD FS sign-in page]({{base_path}}/assets/img/guides/idp/ad-fs-idp/ad-fs-sign-in-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
