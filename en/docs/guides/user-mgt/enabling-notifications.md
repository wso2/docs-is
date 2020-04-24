# Enabling Notifications for User Operations

The primary objective of this is to send a notification to an external endpoint once a user operation has taken place. For example, you may want to send an email to an email address once a new user is created or the password of an existing user is changed. This can be achieved by enabling notifications for user operations.

The configuration differs based on the type of notifications you may want to send to the external endpoint. The following instructions provide information on how to send an email when a user operation takes place.

{!fragments/configure-email-sending.md!}

---

Configure the `<IS_HOME>/repository/conf/identity/msg-mgt.properties` file with the desired destination configurations and template configurations. The following is a sample configuration for sending an email to an email address on user operation event.

For example user operations can be account recovery, account locking/disabling, or ask password.

```java
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
    <td>The first subscription by the email module is ' <code>               userOperation              </code> '. When there is a user operation, an event is triggered from the system. By configuring this property, you can make the email module subscribe to that particular event send emails on events. You can define this subscription name as <code>               userOperation              </code>. This needs to be defined since this is the name of the event that is published by the publishing party. From this point onwards, you will be using <code>               email.subscription.userOperation              </code> as the prefix for properties relevant to this subscription.</td>
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
    <p>This property can be used to replace a placeholder in the email template. In this particular scenario, this property has no value or usage since there is no place holder for this. Suppose you have a template as mentioned below, this value replaces the placeholder of {salutation}.</p>
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
    <td>This is a module-specific property and is specific to the email module. You can define the subject of the mail using this property. Now you are done with subscription-level configurations and progressing towards defining the endpoint information.</td>
    </tr>
    <tr class="even">
    <td><code>               email.subscription.userOperation.endpoint.1              </code></td>
    <td>This is the first endpoint definition for the <code>               userOperation              </code> event subscription. From this point onwards, you are defining properties that are relevant to this endpoint. You defined the name of the first endpoint as <code>               privateMail              </code> . From this point onwards, you must use <code>               email.subscription.userOperation.endpoint.privateMail              </code> as the prefix for properties relevant to this endpoint.</td>
    </tr>
    <tr class="odd">
    <td><code>               email.subscription.userOperation.endpoint.privateMail.address              </code></td>
    <td>This is an endpoint configuration that is used to define the email address.</td>
    </tr>
    <tr class="even">
    <td><code>               email.subscription.userOperation.endpoint.privateMail.salutation              </code></td>
    <td><div class="content-wrapper">
    <p>This is an endpoint level configuration and the same as the property “ <code>                 email.subscription.userOperation.salutation=Admin                </code> ”.</p>
    <p>This property can be used to replace a placeholder in the email template. In the scenario mentioned in this topic, this property has no value or usage since there is no placeholder for this. Suppose we had a template similar to the one shown below, this value replaces the placeholder of {salutation}.</p>
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
