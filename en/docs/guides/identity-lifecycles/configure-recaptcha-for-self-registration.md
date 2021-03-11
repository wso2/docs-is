# Configure reCaptcha for Self-Registration

Self-registration is an important feature when it comes to commercial
applications. This feature gives the users the privilege of being a
part of your community without you having to go through the hassle of
adding them.

This topic guides you through configuring reCaptcha for the self
registration flow. By configuring reCaptcha, you can mitigate or block
brute force attacks.

!!! info 
    -   For more information on setting up self registration, see
        [Self-Registration and Account
        Confirmation](../../../guides/identity-lifecycles/self-registration-workflow).
    -   For more information on brute force attacks, see [Mitigating Brute
        Force Attacks](../../../deploy/mitigate-attacks/mitigate-brute-force-attacks).

You can either configure the recaptcha for a tenant, or configure it globally. 

---

## Configure self-registration with reCaptcha for a specific tenant

{! fragments/set-up-recaptcha.md !}

2.  Start the WSO2 Identity Server and log in to the management console.
3.  Click **Resident** under **Identity Providers** on the **Main** tab.
4.  Expand **User Onboarding** > **Self Reigstration**.
5.  Enable **User self registration**.
6.  Keep the remaining configurations as it is and click **Update**.
    ![self-registration-enable-recaptcha](../../../assets/img/guides/self-registration-enable-recaptcha.png)
6.  You have now successfully configured reCaptcha for the self
    registration flow. Start the WSO2 Identity Server and log in to the
    user portal using the following link:
    <https://localhost:9443/myaccount>

    !!! tip
        If you have changed the port offset or modified the hostname, change the port or
        hostname accordingly.
    
7.  Click the **Create Account** link.  
    ![register-now](../../../assets/img/guides/register-now-option.png)
8.  At the end of the registration, the following reCaptcha window
    appears.  
    ![recaptcha-window](../../../assets/img/guides/recaptcha-window.png) 

---

## Configure self-registration with reCaptcha globally

1.  Navigate to the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file and add the following configurations.

    !!! tip
        To avoid any configuration issues, do this before starting
        the WSO2 Identity Server product instance.
    

    ```toml
    [identity_mgt.user_self_registration]
    allow_self_registration=true
    lock_on_creation=true
    enable_recaptcha=true
    verification_email_validity=1440
    callback_url="${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do"
    [identity_mgt.user_self_registration.notification]
    manage_internally=true    
    ```
    
    The following table lists out more information pertaining to these
    configurations.

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
    <td>Set this to <code>               true              </code> to enable reCaptcha for self-registration globally.</td>
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
    priority= "50"
    enable = false
    [event.default_listener.governance_identity_store]
    priority= "97"
    enable = true
    [event.default_listener.scim]
    priority= "90"
    enable = true
    ```

3.  To configure sending a confirmation email for
    self-registration, enable the email sending configurations
    of the WSO2 Identity Server as explained
    [here](../../../deploy/configure-email-sending).
    
4.  Set up reCaptcha with the WSO2 Identity Server. For instructions on
    how to do this and more information about reCaptcha, see the [section](#configure-self-registration-with-recaptcha-for-a-specific-tenant) above. 
5.  Start the WSO2 Identity Server and log in to the user portal
    using the following link: `<https://localhost:9443/user-portal>`

    !!! tip
        If you have changed the port offset or modified the hostname, change the port or
        hostname accordingly. 

6.  Click **Create Account**.  
    ![register-now-link](../../../assets/img/guides/register-now-option.png)
7.  Enter the account creation details and note that a reCaptcha is available.  
    ![account-creation-details](../../../assets/img/guides/account-creation-details.png)
