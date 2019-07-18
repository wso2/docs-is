# Enabling Notifications for User Operations

The primary objective of this is to send a notification to an external
endpoint once a user operation has taken place. For example, you want to
send an email to an email address once a new user is created or the
password of an existing user is changed. This can be achieved by
enabling notifications for user operations.

The configuration differs based on the type of notifications you want to
send to the external endpoint. The following instructions provide
information on how to send an email when a user operation takes place.

1.  Enable axis2 email transport sender by uncommenting the relevant
    section in the
    `           <PRODUCT_HOME>/repository/conf/axis2/axis2.xml          `
    file and add your SMTP provider values to it. The following is an
    example of the uncommented
    `           MailTransportSender          ` .

    -   **mail.smtp.from** - The mail address from where you want to
        send the notification. It can be any working mail address.

    -   **mail.smtp.user** - User name of the the mail you have provide
        in **mail.smtp.from.**

    -   **mail.smtp.password** - Password of the mail you have provided
        in **mail.smtp.from.**

    -   **mail.smtp.host** - The SMTP server to connect to.

    -   **mail.smtp.port** - The SMTP server port to connect to, if the
        connect() method does not explicitly specify one. Defaults
        to 25.

    -   **mail.smtp.starttls.enable** - If true, enables the use of the
        `             STARTTLS            ` command (if supported by the
        server) to switch the connection to a TLS-protected connection
        before issuing any login commands. Note that an appropriate
        trust store must configured so that the client will trust the
        server's certificate. Defaults to false.

    -   **mail.smtp.auth** - If true, attempt to authenticate the user
        using the AUTH command. Defaults to false.

    For information about the SMTP, see
    [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html)
    .

    ``` xml
    <transportSender name="mailto" class="org.apache.axis2.transport.mail.MailTransportSender">
        <parameter name="mail.smtp.from">wso2demomail@gmail.com</parameter>
        <parameter name="mail.smtp.user">wso2demomail</parameter>
        <parameter name="mail.smtp.password">mailpassword</parameter>
        <parameter name="mail.smtp.host">smtp.gmail.com</parameter>
        <parameter name="mail.smtp.port">587</parameter>
        <parameter name="mail.smtp.starttls.enable">true</parameter>
        <parameter name="mail.smtp.auth">true</parameter>
    </transportSender>
    ```

    !!! note
    
        If you are using a Google mail account, note that Google has
        restricted third-party apps and less secure apps from sending emails
        by default. Therefore, you need to configure your account to disable
        this restriction, as WSO2 IS acts as a third-party application when
        sending emails to confirm user registrations or notification for
        password reset WSO2 IS.
    
        ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here for instructions on how to set this up.
    
        Follow the steps given below to enable your Google mail account to
        provide access to third-party applications.
    
        1.  Navigate to <https://myaccount.google.com/security> .
        2.  Click **Signing in to Google** on the left menu and make sure
            that the **2-step Verification** is disabled or off.  
            ![](attachments/103330460/103330461.png){width="600"
            height="279"}
        3.  Click **Connected apps and sites** on the left menu and enable
            **Allow less secure apps**.  
            ![](attachments/103330460/103330462.png){width="597"
            height="171"}
    

2.  Configure the
    `           <PRODUCT_HOME>/repository/conf/identity/msg-mgt.properties          `
    file with the desired destination configurations and template
    configurations. The following is a sample configuration for sending
    an email to an email address on user operation event.

    For example user operations can be account recovery, account
    locking/disabling, ask password.

    ``` java
    module.name.1=email
    email.subscription.1=userOperation
    email.subscription.userOperation.template=/home/user/Desktop/johnsmith (If you are using windows machine the path would be C:\Users\Administrator\Desktop\johnsmith)
    email.subscription.userOperation.salutation=Admin
    email.subscription.userOperation.subject=User operation change information
    email.subscription.userOperation.endpoint.1=privateMail
    email.subscription.userOperation.endpoint.privateMail.address=receiver@gmail.com
    email.subscription.userOperation.endpoint.privateMail.salutation=Admin private mail
    email.subscription.userOperation.endpoint.privateMail.subject=User operation change information to private mail
    ```

    Before going into a detailed description about each property, one of
    the important facts that you must keep in your mind is that the
    properties included in this file can be secured using secure vault.
    You may refer [Carbon Secure Vault
    Implementation](https://docs.wso2.com/display/ADMIN44x/Carbon+Secure+Vault+Implementation)
    in the WSO2 Product Administration Guide for more information on how
    to use secure vault to encrypt sensitive information in this
    property file. The following table lists out the properties and
    their description  (You can click on the column header to scroll
    through the description).

    <table>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>               module.name.1=email              </code></td>
    <td>By defining this property, you can register the email sending module in the Notification-Mgt framework, so that the email sending module acts as a listener.</td>
    </tr>
    <tr class="even">
    <td><code>               email.subscription.1              </code></td>
    <td>The first subscription by the email module is ' <code>               userOperation              </code> '. When a user operation happens, an event is triggered from the system. From this configuration you can make the email module to subscribe for that particular event and send an email on events. You can define this subscription name as <code>               userOperation              </code> (you must use this since this is the name of the event that is published by the publishing party) and from this point onwards you will be using <code>               email.subscription.userOperation              </code> as the prefix for properties relevant to this subscription.</td>
    </tr>
    <tr class="odd">
    <td><code>               email.subscription.userOperation.template              </code></td>
    <td><div class="content-wrapper">
    <p>This is the template for the email. You can configure your template such that it has placeholders. These placeholders are replaced with dynamic values that are coming from the event or you can define values for these placeholders using your configurations.</p>
    <p>The following is a sample email template with placeholders.</p>
    <div class="panel" style="background-color: White;border-width: 1px;">
    <div class="panelContent" style="background-color: White;">
    <p>Hi {username}</p>
    <p>This is a test mail to your private mail. The operation occurred was: {operation}.</p>
    </div>
    </div>
    <p>The following are the dynamic data used in the user operation event.</p>
    <p>- operation: The type of user operation that took place.<br />
    - username: The username of the user that is subject to the information change.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               email.subscription.userOperation.salutation              </code></td>
    <td><div class="content-wrapper">
    <p>This property can be used to replace a placeholder in the email template. In this particular scenario, this property has no value or usage since there is no place holder for this. Supposing you had a template like the following, this value replaces the placeholder of {salutation}.</p>
    <div class="panel" style="background-color: White;border-width: 1px;">
    <div class="panelContent" style="background-color: White;">
    <p>Hi {salutation}</p>
    <p>This is a test mail to your private mail. The operation occurred was: {operation}</p>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               email.subscription.userOperation.subject              </code></td>
    <td>This is a module specific property and is specific to the email module. You can define the subject of the mail using this property. Now you are done with subscription level configurations and progressing towards defining endpoint information.</td>
    </tr>
    <tr class="even">
    <td><code>               email.subscription.userOperation.endpoint.1              </code></td>
    <td>This is the first endpoint definition for the <code>               userOperation              </code> event subscription. From this point onwards, you are defining properties that are relevant to this endpoint. You defined the name of the first endpoint as <code>               privateMail              </code> . From this point onwards you must use <code>               email.subscription.userOperation.endpoint.privateMail              </code> as the prefix for properties relevant to this endpoint.</td>
    </tr>
    <tr class="odd">
    <td><code>               email.subscription.userOperation.endpoint.privateMail.address              </code></td>
    <td>This is an endpoint configuration that is used to define the email address.</td>
    </tr>
    <tr class="even">
    <td><code>               email.subscription.userOperation.endpoint.privateMail.salutation              </code></td>
    <td><div class="content-wrapper">
    <p>This is an endpoint level configuration and the same as the property “ <code>                 email.subscription.userOperation.salutation=Admin                </code> ”.</p>
    <p>This property can be used to replace a placeholder in email template. In the scenario mentioned in this topic, this property has no value or usage since there is no placeholder for this. Suppose we had a template like following, this value replaces the placeholder of {salutation}.</p>
    <div class="panel" style="background-color: White;border-width: 1px;">
    <div class="panelContent" style="background-color: White;">
    <p>Hi {salutation}</p>
    <p>This is a test mail to your private mail. The operation occurred was: {operation}</p>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               email.subscription.userOperation.endpoint.privateMail.subject              </code></td>
    <td>This is an endpoint level configuration to define the subject of the email. Notice that it is possible to define the subject of the email using <code>               email.subscription.userOperation.subject=User operation change information              </code> as mentioned earlier. However, since this is a more specific level property (this is an endpoint level property and not an event level property) this overrides the previous property.</td>
    </tr>
    </tbody>
    </table>
