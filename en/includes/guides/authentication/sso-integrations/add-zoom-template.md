# Log in to Zoom using {{ product_name }}

This page guides you through integrating {{ product_name }} for Single Sign-On (SSO) with Zoom.

!!! note "Before you begin"
    You need to have a Zoom account that supports SSO. Refer to the [Zoom documentation](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060673){:target="_blank"} for more details.

## Create the Zoom application

Follow the steps given below to register the Zoom application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and under **SSO Integrations**, select **Zoom**..

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide the Zoom domain name and a name for the application.

    !!! info "Domain Name"
        Zoom domain name is the first part of your Zoom vanity URL. If your vanity URL is `https://myorg.zoom.us`, enter `myorg` as the Domain Name. Follow Zoom's guidelines to [request your vanity URL](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061540){:target="_blank"}

    ![Select Zoom workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/zoom/add-zoom-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

-----

## Configure Zoom

Follow the steps below to configure Zoom for SSO with {{product_name}}.

1. Log in to [Zoom](https://zoom.us/signin#/login){:target="_blank"}.

2. Use the following values and configure SSO settings for Zoom. Refer to [Zoom documentation](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060673#h_01EYXTRKFKDGMV8H0T6HHQFJWA){:target="_blank"} for more information.

    - **Sign-in page URL** - `{{ product_url_format }}/samlsso`

    - **Sign-out page URL** - `{{ product_url_format }}/samlsso`

    - **Identity Provider Certificate** - Obtain the certificate from the `Guide` tab of the configured Zoom application in {{product_name}}.

    - **Service Provider (SP) Entity ID** - {{ product_name }} supports a URN-based Entity ID for service providers. Therefore, retain the default URN-based value selected for this which takes the form `<domain-name>.zoom.us`
       
    - **Issuer (IDP Entity ID)** - `{{ issuer_name }}`

    ![Sample Zoom SSO Settings Form]({{base_path}}/assets/img/guides/authentication/sso-integrations/zoom/sso-fill-zoom.png){: width="600" style="border: 0.3px solid lightgrey;"}

## Try it out

Now that you have integrated {{product_name}} with Zoom, follow the steps below to test it.

1. Create a user in {{ product_name }} and ensure the same user exists in your Zoom organization with the same email address.

2. Navigate to the [Zoom SSO sign-in page](https://zoom.us/web/sso/login?en=signin#/sso){:target="_blank"} and enter the company domain. You will then be redirected to the {{ product_name }} login screen.

3. Enter the username and password of the user and complete the login process.

---

## Troubleshooting guidelines

To troubleshoot SSO failures on the Zoom side, refer to the SAML response logs. Follow [Zoom documentation](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061276){:target="_blank"} to learn more.

