Configuring attributes for an Identity Provider (IdP) involves mapping the attributes available in the external IdP to local attributes. This is done so that {{ product_name }} can identify the user attributes in the response sent from the external IdP.

To do so,

1. On the {{ product_name }} Console, click **Connections**.

2. Select the relevant IdP connection from the list and click **Set up**.

3. Go to the **Attributes** tab and under **Identity Provider Attribute Mappings**,  click **Add Attribute Mapping**.

    ![Go to attributes section in IdP]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/go-to-user-attribute-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter the external attribute, select the corresponding local attribute to which it maps and click **Add Attribute Mapping**.

    ![Map IdP attributes]({{base_path}}/assets/img/guides/idp/saml-enterprise-idp/map-saml-idp-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Save** to save the entries.

6. Under **Subject**, select a **Subject Attribute** that will be used to uniquely identify the user.

7. Under **Provisioning Attributes Selection**, select the required attributes that needs to be sent in the response to provision the user in {{product_name}}.

8. Click **Update** to save the changes.


