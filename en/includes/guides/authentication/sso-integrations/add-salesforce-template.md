# Log in to Salesforce using the {{ product_name }}

This page guides you through using {{ product_name }} to log in to Salesforce.

!!! note
     Ensure your Salesforce edition supports SSO. Check the [Salesforce documentation](https://help.salesforce.com/s/articleView?language=en_US&id=sf.sso_saml_setting_up.htm&type=5){:target="_blank"}.

## Create the Salesforce Service Provider

Follow the steps given below to register the Salesforce application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Salesforce** from **SSO Integrations** section.

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/google-workspace-sso/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide a name for the application.

    ![Select salesforce app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/salesforce-sso/add-salesforce-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

5. Download the **SAML Metadata file** and copy the **Entity ID** from the Guide section.

## Configure Salesforce

1. Log in to [Salesforce](https://login.salesforce.com/).

!!! note
     If using a custom domain, access your organization via the Use Custom Domain option on the [Salesforce](https://login.salesforce.com/) login page.

2. Navigate to Setup > Settings > Identity > Single Sign-On Settings page.

3. On the Single sign-on settings page, check the **SAML Enabled** box under **Federated Single Sign-On Using SAML** to enable the use of SAML SSO.
4. Click on the New From Metadata file button and upload the downloaded SAML metadata file of the {{ product_name }}.
  
     ![salesforce-sso]({{base_path}}/assets/img/guides/authentication/sso-integrations/salesforce-sso/salesforce-sso.png){: width="600" style="border: 0.3px solid lightgrey;"}

5. In the SAML settings form replace **Entity ID** you copied earlier.
6. Choose the same certificate for **Assertion Decryption Certificate** and **Request Signing Certificate**. Add your Salesforce organization’s URL in Custom Logout URL, and click the Save.

     ![add-entity-id]({{base_path}}/assets/img/guides/authentication/sso-integrations/salesforce-sso/add-entity-id.png){: width="600" style="border: 0.3px solid lightgrey;"}

7. Scroll to the Endpoints section and copy the Login (Assertion consumer service URL) and Logout URLs.
8. Download the Request Signing Certificate.


### SAML Configurations in Service Provider

Make the following changes to the created service provider.

1. Go to protocol section.

2. Paste the Login (Assertion consumer service URL) and Logout URL into their respective fields, and upload the downloaded certificate.

## Try it out

Do the following steps to test out the configurations for a new user in
Salesforce and the {{ product_name }}.

1. Add login options to your Salesforce login page following Salesforce [guide](https://help.salesforce.com/s/articleView?id=sf.sso_sp_test_connection.htm&type=5).
2. Create a user in Salesforce.
3. Create a user with the same email address as their Salesforce username in {{ product_name }}.
4. Access your Salesforce login URL on an incognito or private browser.
5. Log in using the newly added login option which is available in login page using the new credentials of the user you just created. Then user will redirected back to Salesforce.

----


## Troubleshooting guidelines

Additional troubleshooting information regarding any Salesforce side SSO
failures can be retrieved by using Salesforce SAML Assertion Validator.
Further information regarding the steps are available
[here](https://developer.salesforce.com/docs/atlas.en-us.sso.meta/sso/sso_saml_validation_errors.htm#!).
