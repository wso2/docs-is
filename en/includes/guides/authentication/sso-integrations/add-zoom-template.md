# Log in to Zoom using {{ product_name }}

This page guides you through setting up {{ product_name }} to add SSO (Single Sign-On) login to a Zoom organization.

!!! note "Before you begin"
    Ensure you have a Zoom account and your account supports SSO by referring to the [Zoom documentation](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060673){:target="_blank"}.

## Create the Zoom Service Provider

Follow the steps given below to register the Zoom application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and under **SSO Integrations**, select **Zoom**..

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide the Zoom domain name and a name for the application.

    !!! info "Domain Name"
        Zoom domain name is the first part of your Zoom Vanity URL. If your Vanity URL is `https://myorg.zoom.us`, enter `myorg` as the Domain Name. Follow Zoom's guidelines to [request your Vanity URL](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061540){:target="_blank"}

    ![Select Zoom workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/zoom/add-zoom-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

-----

## Configure Zoom

Follow the steps below to configure Zoom for SSO authentication with {{product_name}}.

1. Log in to [Zoom](https://zoom.us/signin#/login){:target="_blank"}.

2. Configure the following properties in Zoom's SSO settings section. Refer to [Zoom's guide](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060673#h_01EYXTRKFKDGMV8H0T6HHQFJWA){:target="_blank"} to locate the configuration fields mentioned below.

    - **Sign-in page URL:**
      `{{ product_url_format }}/samlsso`

    - **Sign-out page URL:**
      `{{ product_url_format }}/samlsso`

    !!! info "Identity Provider Certificate"
        You can copy the public certificate of the Zoom application from the `Guide` tab under the `Setup {{ product_name }} SSO in Zoom` step.

    !!! warning "Service Provider (SP) Entity ID"
        {{ product_name }} supports a URN-based Entity ID for Service Providers. Therefore, retain the default URN-based value selected for the `Service Provider (SP) Entity ID`. You can see the `Service Provider (SP) Entity ID` value from the `Guide` tab under the `Setup {{ product_name }} SSO in Zoom` step.

    - **Issuer (IDP Entity ID):**
      `{{ issuer_name }}`

    ![Sample Zoom SSO Settings Form]({{base_path}}/assets/img/guides/authentication/sso-integrations/zoom/sso-fill-zoom.png){: width="600" style="border: 0.3px solid lightgrey;"}

-----

## Try it out

Now, you have successfully configured Zoom SSO in {{ product_name }}.

1. Create a user in {{ product_name }} and ensure the same user exists in your Zoom organization with the same email address.

2. Navigate to [Zoom SSO Sign-In Page](https://zoom.us/web/sso/login?en=signin#/sso){:target="_blank"} and enter the Company Domain. You will then be redirected to the {{ product_name }} sign-in screen.

3. Enter the username and password of the user you created in {{ product_name }}, and complete the login process.

-----

## Troubleshooting guidelines

For additional troubleshooting of SSO failures on the Zoom side, refer to the SAML response logs. Follow [Zoom's guide](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061276){:target="_blank"} to access the SAML responses.

