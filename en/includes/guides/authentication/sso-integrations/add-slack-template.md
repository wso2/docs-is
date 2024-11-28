# Log in to Slack using the {{ product_name }}

This page guides you through using {{ product_name }} to log in to Slack.

!!! note
    Ensure you have a Slack Workspace account and your account supports SSO by referring to the [Slack documentation](https://slack.com/intl/en-gb/help/articles/203772216-SAML-single-sign-on){:target="_blank"}.

## Create the Slack Service Provider

Follow the steps given below to register the Slack application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Slack** from **SSO Integrations** section.

    ![Select app type in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/common/add-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

3. Provide the Slack issuer name, domain name and a name for the application.

    !!! info "Issuer Name"
        By default, Slack uses `https://slack.com` as the Issuer Name. You only need to modify this value if creating multiple Slack SSO applications. If you choose `Slack Workspace URL` as the Issuer Name, ensure that Slack's configuration is updated accordingly.

    !!! info "Domain Name"
        Slack domain name is the first part of your Slack workspace URL. If your Slack workspace URL is `https://myorg.slack.com`, enter `myorg` as the Domain Name. Follow Slack's guidelines to [locate your Slack URL](https://slack.com/intl/en-gb/help/articles/221769328-Locate-your-Slack-URL-or-ID){:target="_blank"}

    ![Select slack workspace app in the {{ product_name }}]({{base_path}}/assets/img/guides/authentication/sso-integrations/slack/add-slack-app.png){: width="600" style="border: 0.3px solid lightgrey;"}

4. Click **Create** to complete the registration.

-----

## Configure Slack

1. Follow [Slack's documentation](https://slack.com/intl/en-gb/help/articles/212681477-Sign-in-to-Slack){:target="_blank"} to log in to your workspace.

2. Configure the following properties in Slack's SSO settings section. Refer to [Slack's guide](https://slack.com/intl/en-gb/help/articles/203772216-SAML-single-sign-on#step-2u58-set-up-saml-sso){:target="_blank"} to locate the configuration fields mentioned below.

    - **SAML 2.0 Endpoint:**
      `{{ product_url_format }}/samlsso`

    - **Identity provider issuer:**
      `{{ issuer_name }}`
   
    !!! info "Public certificate"
        You can copy the public certificate of the Slack application from the `Guide` tab under the `Setup {{ product_name }} SSO in Slack` step.

    !!! warning "Service provider issuer"
        If you change the Issuer Name to `Slack Workspace URL` when creating the application, you must also configure it in Slack's settings. You can copy the `Service provider issuer` value from the `Guide` tab under the `Setup {{ product_name }} SSO in Slack` step.

    ![Sample Slack SSO Settings Form]({{base_path}}/assets/img/guides/authentication/sso-integrations/slack/sso-fill-slack.png){: width="600" style="border: 0.3px solid lightgrey;"}

-----

## Try it out

Now, you have successfully configured Slack and {{ product_name }}.

!!! note
    When the workspace owner enables SSO for the Slack workspace, existing users will receive an email at their registered email address to bind their {{ product_name }} account. New users will be auto-provisioned during login. For more details, refer to Slack's documentation on [What to expect after SSO is enabled](https://slack.com/intl/en-gb/help/articles/203772216-SAML-single-sign-on#what-to-expect){:target="_blank"} and [Sign in to Slack](https://slack.com/intl/en-gb/help/articles/212681477-Sign-in-to-Slack){:target="_blank"}.

1. Create a user in {{ product_name }}.

2. Navigate to [https://slack.com/workspace-signin](https://slack.com/workspace-signin){:target="_blank"} and enter the Slack workspace URL. This will take you to the Workspace Sign-In page, where you can select the SSO Sign-In option. You will then be redirected to the {{ product_name }} sign-in screen.

3. Enter the username and password of the user you created in {{ product_name }}, and complete the login process.

-----

## Troubleshooting guidelines

Additional troubleshooting information regarding any Slack side SSO failures are available [here](https://slack.com/intl/en-gb/help/articles/360037402653-Troubleshoot-SAML-authorisation-errors){:target="_blank"}.

