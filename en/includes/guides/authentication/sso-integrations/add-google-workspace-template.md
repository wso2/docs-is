# Log in to Google Workspace using the {{ product_name }}

This page guides you through using {{ product_name }} to log in to Google.

!!! note
    You need to have a Google domain. Further, ensure you have a Google Workspace account and your account supports SSO by referring to the [Google documentation](https://support.google.com/a/answer/182076?sjid=13406338490513240799-AP){:target="_blank"}.

## Create the Google Workspace Service Provider

Follow the steps given below to register the Google Workspace application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Google Workspace** from **SSO Integrations** section.

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide the Google domain name and a name for the application.

    ![Select google workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/google-workspace-sso/add-google-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

5. Download the Certificate from the Guide section.

-----

## Configure Google

1. Access your domain's [admin console](https://admin.google.com).

2. Follow Google’s instructions to [configure the SSO profile for your organization](https://support.google.com/a/answer/12032922?hl=en&ref_topic=7579248&sjid=3736947215943977003-AP#org_profile). During this process, use the details below:

    - **Sign-in page URL:**
      ` {{ product_url_format }}/samlsso`

    - **Sign-out page URL:**
      `{{ product_url_format }}/samlsso`
   
    - **Password URL:**
       `{{ product_url_format }}/t/carbon.super/myaccount/security`

3. Upload the downloaded Identity Server certificate.

    ![sso-fill-google.png]({{base_path}}/assets/img/guides/authentication/sso-integrations/google-workspace-sso/sso-fill-google.png){: width="600" style="border: 0.3px solid lightgrey;"}
-----

## Try it out

Now, you have successfully configured Google and {{ product_name }}.

!!! note
    The admin users of your Google domain do not get redirected to WSO2 IS.
    Therefore, to try out the tutorial you need to use a user who is not an
    admin in your Google account.

1. Create a user in {{ product_name }}. Make sure that the same user
   exists in your Google domain.  
   In this example, `alex@wso2support.com`
   is in the Google domain. Therefore, we need to create the same user in {{ product_name }}.

2. Navigate to [http://accounts.google.com](http://accounts.google.com)
   and enter the email address of the user you created.  
   You are navigated to {{ product_name }}'s sign in screen.
3. Enter the username and password of the user you created.  
   You are navigated to the G-Suite of that domain and you can select
   the application you need to use.

!!! note
    If you want to only access Gmail, navigate to
    [mail.google.com](http://mail.google.com), enter the username of the
    user, enter the username and password of the user on the {{ product_name }}
    sign in screen, and you are navigated to the user's mail account.

