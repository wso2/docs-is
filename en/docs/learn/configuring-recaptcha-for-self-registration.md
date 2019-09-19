# Configuring reCaptcha for Self Registration

Self registration is an important feature when in comes to commercial
applications. This feature allows the users the privilege of being a
part of your community without you having to go through the hassle of
adding them.

This topic guides you through configuring reCaptcha for the self
registration flow. By configuring reCaptcha, you can mitigate or block
brute force attacks.

!!! info 
    -   For more information on setting up self registration, see
        [Self-Registration and Account
        Confirmation](../../learn/self-registration-and-account-confirmation).
    -   For more information on brute force attacks, see [Mitigating Brute
        Force Attacks](../../learn/mitigating-brute-force-attacks).

There are two ways to configure this feature.

The instructions for both these approaches are as follows.

### Configuring self-registration with reCaptcha for a tenant

**To configure self-registration with reCaptcha for a specific tenant:**

1.  Set up reCaptcha with the WSO2 Identity Server. For instructions on
    how to do this and more information about reCaptcha, see [Setting Up
    ReCaptcha](../../learn/setting-up-recaptcha)
    .
2.  Start the WSO2 Identity Server and log in to the management console.
3.  Click on **List** under **Identity Providers** on the **Main** tab
    and then click **Resident Identity Provider**.
4.  Expand the **Account Management Policies** tab and then expand the
    **User Self Registration** tab.
5.  Select the **Enable reCaptcha** checkbox to enable reCaptcha for the
    self registration flow.  
    ![self-registration-enable-recaptcha](../assets/img/using-wso2-identity-server/self-registration-enable-recaptcha.png)
6.  You have now successfully configured reCaptcha for the self
    registration flow. Start the WSO2 Identity Server and log in to the
    end user dashboard using the following link:
    <https://localhost:9443/dashboard>

    !!! tip
    
        If you have changed the port offset or modified the hostname, change the port or
        hostname accordingly.
    

7.  Click the **Register Now** link.  
    ![register-now](../assets/img/using-wso2-identity-server/register-now.png)
8.  At the end of the registration, the following reCaptcha window
    appears.  
    ![recaptcha-window](../assets/img/using-wso2-identity-server/recaptcha-window.png) 

### Configuring self-registration with reCaptcha globally

**To configure self-registration with reCaptcha globally:**

1.  Navigate to the
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file and uncomment the following configuration block.

    !!! tip
    
        **Tip** : To avoid any configuration issues, do this before starting
        up the WSO2 Identity Server product instance.
    

    ``` xml
    <SelfRegistration>
          <Enable>true</Enable>
          <LockOnCreation>true</LockOnCreation>
          <Notification>
              <InternallyManage>true</InternallyManage>
          </Notification>
          <ReCaptcha>true</ReCaptcha>
    </SelfRegistration>
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
    <td><pre><code>Enable</code></pre></td>
    <td>Set this to <code>               true              </code> to enable this configuration at a global level.</td>
    </tr>
    <tr class="even">
    <td><pre><code>LockOnCreation</code></pre></td>
    <td>Setting this to true ensures that the user's account is locked on creation.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>InternallyManage</code></pre></td>
    <td>Setting this value to <code>               true              </code> ensures the internal email sending module is enabled. However, setting this to <code>               false              </code> ensures that the email sending data is available to the application via a Web service. The application can send the email using its own email sender.</td>
    </tr>
    <tr class="even">
    <td><pre><code>ReCaptcha</code></pre></td>
    <td>Set this to <code>               true              </code> to enable reCaptcha for self-registration globally.</td>
    </tr>
    </tbody>
    </table>

2.  Some listeners must be enabled in order for this to work when the
    operations are invoked. In the same identity.xml file make sure the
    following configs are enabled/disabled.

    !!! tip
    
        **Tip** : These are usually set by default in the product unless you
        have made any changes.
    

    ``` xml
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

3.  Configure the email settings for the self-registration
    process. Configure email setting in the
    `           <IS_HOME>/repository/conf/output-event-adapters.xml          `
    file.

    !!! tip
    
        **Tip** : Search for the word ' `           email          ` ' in
        the file and you can find the required configuration block. Provide
        the email provider information and save the file.
    

    ``` xml
    <adapterConfig type="email">
            <!-- Comment mail.smtp.user and mail.smtp.password properties to support connecting SMTP servers which use trust
            based authentication rather username/password authentication -->
            <property key="mail.smtp.from">abcd@gmail.com</property>
            <property key="mail.smtp.user">abcd</property>
            <property key="mail.smtp.password">xxxx</property>
            <property key="mail.smtp.host">smtp.gmail.com</property>
            <property key="mail.smtp.port">587</property>
            <property key="mail.smtp.starttls.enable">true</property>
            <property key="mail.smtp.auth">true</property>
            <!-- Thread Pool Related Properties -->
            <property key="minThread">8</property>
            <property key="maxThread">100</property>
            <property key="keepAliveTimeInMillis">20000</property>
            <property key="jobQueueSize">10000</property>
    </adapterConfig>
    ```

4.  Set up reCaptcha with the WSO2 Identity Server. For instructions on
    how to do this and more information about reCaptcha, see [Setting Up
    ReCaptcha](../../learn/setting-up-recaptcha).
5.  Start the WSO2 Identity Server and log in to the end user dashboard
    using the following link: <https://localhost:9443/dashboard>

    !!! tip
    
        If you have changed the port offset or modified the hostname, change the port or
        hostname accordingly. 

6.  Click the **Register Now** link.  
    ![register-now-link](../assets/img/using-wso2-identity-server/register-now-link.png)
7.  Enter the account creation details and note that reCaptcha is
    available.  
    ![account-creation-details](../assets/img/using-wso2-identity-server/account-creation-details.png)
