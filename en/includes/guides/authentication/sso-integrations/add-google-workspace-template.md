# Log in to Google Workspace using {{ product_name }}

This page guides you through integrating {{ product_name }} for Single Sign-On (SSO) with Google.

!!! note "Before you begin"
    You need to have a Google domain. Further, ensure you have a Google Workspace account and your account supports SSO by referring to the [Google documentation](https://support.google.com/a/answer/182076?sjid=13406338490513240799-AP){:target="_blank"}.

## Create the Google Workspace application

Follow the steps given below to register the Google Workspace application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and under **SSO Integrations**, select **Google Workspace**.

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide the Google domain name and a name for the application.

    ![Select google workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/google-workspace-sso/add-google-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

5. Download {{product_name}}'s certificate from the `Guide` tab of the created application.

-----

## Configure Google

Follow the steps below to configure Google for SSO authentication with {{product_name}}.

1. Access your Google domain's [admin console](https://admin.google.com){: target="_blank"}.

2. Follow Google’s instructions to [configure the SSO profile for your organization](https://support.google.com/a/answer/12032922?hl=en&ref_topic=7579248&sjid=3736947215943977003-AP#org_profile){: target="_blank"}. Use the details below:

    - Sign-in page URL:
      ` {{ product_url_format }}/samlsso`

    - Sign-out page URL:
      `{{ product_url_format }}/samlsso`
   
    - Password URL:
       `{{ product_url_format }}/t/carbon.super/myaccount/security`

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

