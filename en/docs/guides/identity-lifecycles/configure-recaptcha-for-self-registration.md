# Configure reCAPTCHA for Self-Registration

Self-registration is an important feature when it comes to commercial applications. This feature gives the users the privilege of being a part of your community without you having to go through the hassle of adding them.

This topic guides you through configuring reCAPTCHA for the self registration flow. By configuring reCAPTCHA, you can mitigate or block brute force attacks.

!!! info 
    For more information on setting up self registration, see [Self-Registration and Account Confirmation]({{base_path}}/guides/identity-lifecycles/self-registration-workflow).

    For more information on brute force attacks, see [Mitigating Brute Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks).

You can either configure the reCAPTCHA for a tenant or configure it globally. 

## Prerequisites

[Setting Up reCAPTCHA]({{base_path}}/deploy/configure-recaptcha.md) with WSO2 Identity Server.

## Configure self-registration with reCAPTCHA for a specific tenant

1.  Start the WSO2 Identity Server and log in to the management console.
2.  On the **Main** tab, click **Identity** > **Identity Provider** > **Resident Identity Provider**.
3.  Expand **User Onboarding** > **Self Registration**.
4.  Enable **User self registration** and make sure **Prompt reCaptcha** is enabled.
5.  Keep the remaining configurations as it is and click **Update**.
    ![self-registration-enable-recaptcha]({{base_path}}/assets/img/guides/self-registration-enable-recaptcha.png)
6.  You have now successfully configured reCAPTCHA for the self
    registration flow. 


## Configure self-registration with reCAPTCHA globally

1.  Navigate to the `<IS_HOME>/repository/conf/deployment.toml`file and add the following configurations.

    !!! tip
        To avoid any configuration issues, do this before starting
        the WSO2 Identity Server product instance.
    

    ```toml
    [identity_mgt.user_self_registration]
    allow_self_registration=true
    lock_on_creation=true
    enable_recaptcha=true
    verification_email_validity="1440m"
    callback_url="[${carbon.protocol}://${carbon.host}:${carbon.management.port}].*[/authenticationendpoint/login.do]*"

    [identity_mgt.user_self_registration.notification]
    manage_internally=true    
    ```
    
    The following table lists out more information pertaining to these configurations.

    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Configuration</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><pre><code>allow_self_registration</code></pre></td>
    <td>Set this to <code>               true              </code> to enable this configuration at a global level.</td>
    </tr>
    <tr class="even">
    <td><pre><code>lock_on_creation</code></pre></td>
    <td>Setting this to true ensures that the user's account is locked on creation.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>manage_internally</code></pre></td>
    <td>Setting this value to <code>               true              </code> ensures the internal email sending module is enabled. However, setting this to <code>               false              </code> ensures that the email sending data is available to the application via a web service. The application can send the email using its own email sender.</td>
    </tr>
    <tr class="even">
    <td><pre><code>enable_recaptcha</code></pre></td>
    <td>Set this to <code>               true              </code> to enable reCAPTCHA for self-registration globally.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>verification_email_validity</code></pre></td>
    <td>The validity period of the email in minutes.
    </tr>
    <tr class="even">
    <td><pre><code>callback_url</code></pre></td>
    <td>RegEx pattern to validate the callback URL sent in the email.</td>
    </tr>
    </tbody>
    </table>

2.  Some listeners must be enabled in order for this to work when the
    operations are invoked.

    !!! tip
        These are usually set by default in the product unless you
        have made any changes.
    

    ```toml
    [event.default_listener.identity_mgt]
    priority="50"
    enable=false

    [event.default_listener.governance_identity_store]
    priority="97"
    enable=true

    [event.default_listener.scim]
    priority="90"
    enable=true
    ```

3.  Save the configuration changes and restart the server.

## Try it

Start WSO2 Identity Server and log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application.

![register-now]({{base_path}}/assets/img/guides/register-now-option.png)

!!! tip
    If you have changed the port offset or modified the hostname, change the port or hostname accordingly.
    
Click **Create Account** and then enter the new user's username.

![register-users-for-tenant]({{base_path}}/assets/img/guides/register-users-for-tenant.png)

At the end of the registration, the following reCAPTCHA logo appears at the bottom right of the screen. 

![recaptcha-window]({{base_path}}/assets/img/guides/recaptcha-window.png) 