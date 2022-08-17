# Configure reCAPTCHA for account recovery

The user account recovery feature implemented in the WSO2 Identity Server (WSO2 IS) helps to recover the username of the account if the user has forgotten it. This recovery process is also secured with captcha verification.

By configuring reCAPTCHA, you can mitigate or block brute force attacks.

!!! info 
    For more information on setting up account recovery, see [Configure Account Recovery]({{base_path}}/guides/identity-lifecycles/recover-username).

    For more information on brute force attacks, see [Mitigating Brute Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks).

You can either configure the reCAPTCHA for a tenant or configure it globally.

## Prerequisites

[Setting Up reCAPTCHA]({{base_path}}/deploy/configure-recaptcha.md) with WSO2 Identity Server.

## Enable account recovery with reCAPTCHA for a spefific tenant

Follow the instructions given below to configure reCAPTCHA per tenant for account recovery. 

1. Start WSO2 Identity Server and log in to the management console as tenant admin.
2. On the **Main** tab, click **Identity Provider** > **Resident Identity Provider**.
3. Expand **Account Management** and then click **Account Recovery.**
4. Select **Enable reCaptcha for Username Recovery** checkbox to enable reCAPTCHA for the account recovery flow.

    ![enable-recaptcha]({{base_path}}/assets/img/using-wso2-identity-server/enable-recaptcha.png)

You have now successfully configured reCAPTCHA for the account recovery flow.

## Enable account recovery with reCAPTCHA for a globally

Follow the instructions given below to configure reCAPTCHA globally for account recovery.  

1. Open the `deployment.toml` file in the `IS_HOME/repository/conf` folder and add the following configuration:

    !!! tip
        To avoid any configuration issues, perform **Step-1** before starting the WSO2 Identity Server product instance.

    ``` toml
    [identity_mgt.username_recovery.email] 
    enable_recaptcha= true
    ```

You have now successfully configured reCAPTCHA for the account recovery flow.

## Try it

Start WSO2 Identity Server and log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application.

!!! tip
    If you have changed the port offset or modified the hostname, change the port or hostname accordingly.

Click **Username**.

![forgot-username]({{base_path}}/assets/img/using-wso2-identity-server/register-now-option.png)

It will redirect you to the following page where you can see the reCAPTCHA logo on the bottom right of your screen.

![proceed-to-username-recovery]({{base_path}}/assets/img/using-wso2-identity-server/recaptcha-for-username-recovery.png)