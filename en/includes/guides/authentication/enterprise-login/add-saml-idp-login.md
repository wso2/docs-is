# Add login with a SAML identity provider

You can add standard [SAML login](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf) to your applications using an external SAML identity provider (IdP) and enable users to log in to your applications while maintaining their accounts in the external identity providers.

![Configure SAML Enterprise IDP login in {{ product_name }}]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/configure-login.png){: width=600"}

Follow this guide to register a SAML IdP in {{ product_name }} and add it to the login flow of your application.

## Register {{ product_name }} in the IdP
You need to register {{ product_name }} as a SAML application in the external identity provider. Follow the identity provider's documentation to know how to register a SAML application.

You can use the following URL as the **Assertion Consumer Service URL** (also known as callback URL/ redirect URL/ ACS URL) in the application that represents {{ product_name }}.

```bash 
{{ product_url_format }}/commonauth
```

!!!note 
    To configure an Identity Server instance as the external identity provider, see [register a SAML web app]({{base_path}}guides/applications/register-saml-web-app)

After you register the app, you should get the required configurations, as explained below.

- If you are manually applying the IdP configurations to {{ product_name }}, you need the following configurations:
    - **Issuer** (also known as entityId)
    - **Single sign on URL** of the identity provider (also known as login URL)
    - **Identity Provider Certificate**

- If you are using metadata to apply the IdP configurations to {{ product_name }}, you need the following:
    - **SAML IdP metadata file** of the identity provider
    - **Identity Provider Certificate**

## Register the SAML IdP

Now, let's register the SAML IdP in {{ product_name }}.

1. On the {{ product_name }} Console, click **Connections**.
2. Click **New Connections** and select **Standard-Based IdP**.
3. Provide a unique **identity provider name**, select **SAML**, and click **Next**.
   ![Create SAML Enterprise IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/register-saml-idp.png){: width=600"}

4. Select one of the following methods and add the SAML configurations:

    <table>
        <tr>
            <th>File Based Configuration</th>
            <td><p>Upload a SAML metadata file with the required configurations.</p> See [Use a SAML metadata file](#use-a-saml-metadata-file).</td>
        </tr>
        <tr>
            <th>Manual Configuration</th>
            <td><p>Use this option to manually specify the required SAML configurations.</p> See [Add SAML configs manually](#add-saml-configs-manually).</td>
        </tr>
    </table>

### Add SAML configs manually

If you selected **Manual Configuration** in the previous step, follow the steps given below.

1. Enter the following details and click **Next**.

    ![Create SAML Enterprise IDP with manual configurations]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/register-saml-idp-with-manual-config.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Service provider entity ID</td>
            <td> This value will be used as the <code>saml2:Issuer</code> in the SAML requests initiated from {{ product_name }} to the external identity provider (IdP).</td>
        </tr>
        <tr>
            <td>Identity provider Single Sign-On URL</td>
            <td>This value specifies the single sign-on URL of the external IdP. This is where {{ product_name }} will send its authentication requests. You need to get this value from the external IdP.</td>
        </tr>
        <tr>
            <td>Identity provider entity ID</td>
            <td>This is the <code>saml2:Issuer</code> value specified in the SAML responses issued by the external IdP. You need to get this value from the external IdP.</td>
        </tr>
    </table>

3. (Optional) Upload the public certificate of the identity provider.
4. Click **Finish** to complete the registration.

### Use a SAML metadata file

If you selected **File Based Configuration** in the previous step, follow the steps given below.

!!! note
    A SAML IdP metadata file contains the following:
    - IdP identifiers (`entityID` or `Issuer`)
    - Endpoints (single sign-on URLs, single logout URLs, etc.)
    - Supported bindings

1. Specify the **service provider entity ID**.

    !!! note
        This value will be used as the <code>saml2:Issuer</code> in the SAML requests initiated from {{ product_name }} to the external identity provider (IdP).

2. Upload the IdP metadata file and click **Next**.

    ![Create SAML Enterprise IDP with Metadata file]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/register-saml-idp-with-metafile.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. (Optional) Upload the public certificate of the identity provider.
4. Click **Finish** to complete the registration.

!!! note
    Once the SAML identity provider is created, you can configure [additional SAML settings]({{base_path}}/references/idp-settings/saml-settings-for-idp/) from the **Protocol** tab.
  
## Enable the SAML IdP for login

!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the {{ product_name }} Console, click **Applications**.
2. Select your application, go to the **Sign-in Method** tab and add SAML identity provider from your preferred editor:

    !!! note "Recommendations"
        {{ product_name }} recommends adding your social and enterprise connections to the first authentication step, as they are used for identifying the user.

    ---
    === "Classic Editor"
        To add SAML identity provider login using the Classic Editor:
        
        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.
        
        2. Click **Add Authentication** on the step, select your SAML identity provider, and click **Add**.

            ![Add SAML IdP login in Asgardeo]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/enable-saml-enterprise-login-with-basic.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add SAML identity provider login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your SAML identity provider connection.

            ![Add SAML IdP login in Asgardeo with visual editor]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/add-saml-idp-with-visual-editor.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    ---

3. Click **Update** to save your changes.

## Configure user attributes

Configuring attributes for an identity provider involves mapping the attributes available in the external SAML IdP to attributes that are local to {{ product_name }}.
This is done so that {{ product_name }} can identify the user attributes in the response sent from the external SAML IdP.

1. On the {{ product_name }} Console, click **Connections**.
2. Select the SAML IdP connection from the list and click **Set up**.
3. Go to the **Attributes** tab and click **Add IdP Attributes**.

    ![Go to attributes section in SAML IdP]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/go-to-user-attribute-page.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Provide the following values and click **Add Attribute Mapping**.

    ![Map SAML IdP attributes]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/map-saml-idp-attributes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>External IdP Attribute</td>
            <td>The attribute from the external IdP that should be mapped to the local attribute.</td>
        </tr>
        <tr>
            <td>Maps to</td>
            <td>The local attribute to which the external IdP attribute is mapped.</td>
        </tr>
    </table>

5. Select one of the mapped attributes as the **subject attribute** for your application and click **Update**.

    ![select a subject attribute]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/select-subject-attributes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note
        By default, {{ product_name }} uses the subject attribute sent by the external SAML IdP as the subject identifier. To configure a different attribute as the subject, enable the **Find user ID from requests** from the **Settings** tab of the SAML IdP.

### How it works

Consider a scenario where a SAML IdP returns the authenticated user's nickname and profile updated time to {{ product_name }} in the SAML authentication response as follows:

- http://schemas.idp.com/nickname   : nickname
- http://schemas.idp.com/updated_at : profile updated time

You may want to convert them to the local attribute URI so that the application can receive them in the local attribute URI. If you don't do that mapping, the application will receive the attributes as sent by the external IdP.

**A sample IdP attribute mapping done from the {{ product_name }} Console**:

![Sample IdP attribute mapping]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/sample-attribute-mapping.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

**Sample attributes in the SAML assertion of the integrated SAML app**:

```xml
<saml2:AttributeStatement>
    <saml2:Attribute Name="http://wso2.org/claims/modified"
                        NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                        >
        <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                xsi:type="xsd:string"
                                >Mon Aug 30 2021 07:26:40 GMT+0000 (Coordinated Universal Time)</saml2:AttributeValue>
    </saml2:Attribute>
    <saml2:Attribute Name="http://wso2.org/claims/nickname"
                        NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
                        >
        <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                xsi:type="xsd:string"
                                >John</saml2:AttributeValue>
    </saml2:Attribute>
</saml2:AttributeStatement>
```

**Sample subject attribute** in the assertion looks as shown below:

```xml 
<saml2:Subject>
    <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">John</saml2:NameID>
    <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml2:SubjectConfirmationData InResponseTo="jimhbeljflkppacldhnjcfjkhoobkddhngnkamom"
                                        NotOnOrAfter="2021-08-30T09:49:21.336Z"
                                        Recipient="http://localhost:8081/sample-app/home.jsp"
                                        />
    </saml2:SubjectConfirmation>
</saml2:Subject>
```  
## Add groups to the connection

{% include "../../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../../fragments/manage-connection/delete-connection.md" %}

## Related links
- [Configure JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/)
- [Configure SAML IdP settings]({{base_path}}/references/idp-settings/saml-settings-for-idp/)