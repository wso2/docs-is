# Log in to Google Workspace using {{ product_name }}

!!! note "Legacy SSO Profile"
    Google has marked their old SSO profile as legacy and now supports a new profile. We recommend using the new profile for better compatibility. If you still need to set up the legacy profile, refer to [Google's legacy guide](https://support.google.com/a/answer/12032922?hl=en&ref_topic=7579248&sjid=3736947215943977003-AP#legacy_profile&zippy=%2Cconfigure-the-legacy-sso-profile){:target="_blank"} and use our [Standard-Based SAML template]({{base_path}}/guides/applications/register-saml-web-app/).

This page guides you through integrating {{ product_name }} for Single Sign-On (SSO) with Google.

!!! note "Before you begin"
    You need to have a Google domain. Further, ensure you have a Google Workspace account and your account supports SSO by referring to the [Google documentation](https://support.google.com/a/answer/182076?sjid=13406338490513240799-AP){:target="_blank"}.
    {% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
    If you're testing the integration locally, make sure to [configure a hostname]({{base_path}}/deploy/change-the-hostname/).
    {% endif %}

## Create the Google Workspace application

Follow the steps given below to register the Google Workspace application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and under **SSO Integrations**, select **Google Workspace**.

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide the Entity ID and a Name for the application.

    !!! info "Entity ID"
        A unique URL dynamically generated for your Google SAML SSO profile. To find it, follow [Google's guide](https://support.google.com/a/answer/12032922?hl=en&ref_topic=7579248&sjid=3736947215943977003-AP#create_profile){:target="_blank"} on creating a SAML SSO profile. Once completed, copy the `Entity ID` from the `SP Details` section of the specific SAML SSO profile.

        **Note:** While setting up the SAML SSO profile in Google, simply provide a name first. The IdP details can be added later.

    ![Select google workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/google-workspace-sso/add-google-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

5. Download {{product_name}}'s certificate from the `Guide` tab of the created application.

-----

## Configure Google

Follow the steps below to configure Google for SSO authentication with {{product_name}}.

1. Access your Google domain's [admin console](https://admin.google.com){: target="_blank"}.

2. Follow Google’s instructions to [configure the SSO profile for your organization](https://support.google.com/a/answer/12032922?hl=en&ref_topic=7579248&sjid=3736947215943977003-AP#org_profile){: target="_blank"}. Use the details below:

    - IDP entity ID:
      `{{ issuer_name }}`

    - Sign-in page URL:
      `{{ product_url_format }}/samlsso`

    - Sign-out page URL:
      `{{ product_url_format }}/samlsso`
   
    - Password URL:
      `{{ my_account_host_path }}/myaccount/security`

3. Upload {{product_name}}'s certificate you downloaded earlier.

    ![sso-fill-google.png]({{base_path}}/assets/img/guides/authentication/sso-integrations/google-workspace-sso/sso-fill-google.png){: width="600" style="border: 0.3px solid lightgrey;"}
-----

## Try it out

Now that you have integrated {{product_name}} with Google Workspace, follow the steps below to test it.

!!! note
    Google restricts administrators from being redirected to external identity providers. Therefore, use a non-administrator account to try it out.

1. Create a new account in {{product_name}} for a user that already exists in Google Workspace under the same email address.

2. Navigate to [Google](http://accounts.google.com) and enter the email address of the user you created. You will be navigated to {{ product_name }}'s login page.

3. Enter the username and password for the user to login. Once authenticated, you will be navigated to the relevant domain's G-Suite.

!!! note
    If you only wish to access Gmail, navigate to [mail.google.com](http://mail.google.com), and repeat the process.

