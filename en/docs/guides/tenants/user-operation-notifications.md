# Enabling Notifications for User Operations

This feature is used to notify an external endpoint once a user operation has occurred.

For example, you may want to send an email to an email address once a new user is created or the password of an existing user is changed. This can be achieved by enabling notifications for user operations.

The configuration differs based on the type of notifications you want to send to the external endpoint. The following instructions provide information on how to send an email when a user operation takes place.

## Prerequisites
You need to configure the [email sending module]({{base_path}}/deploy/configure-email-sending/#configure-the-email-sender-globally) in the `deployment.toml` file.

## Add the email notification handler
To add the email notification handler onto the WSO2 IS pack:

1. Download the [Email Notification Handler](https://store.wso2.com/store/assets/isconnector/details/959b792a-efce-4b12-af9b-4744c650f6b2).

2. Add the downloaded `org.wso2.carbon.identity.notification.mgt.email-x.x.x.jar` file into the `<IS_HOME>/repository/components/dropins` directory.

## Configure the notification management framework

Configure the `<IS_HOME>/repository/conf/identity/msg-mgt.properties` file with the desired destination and template configurations.

The following is a sample configuration for sending an email to an email address on a user operation event.

For example, user operations can include profile updates, account recovery, account locking/disabling, and asking for passwords.

```
module.name.1=email
email.subscription.1=userOperation
email.subscription.userOperation.template=/home/user/Desktop/user-operation-notification-template
# (If you are using a windows machine, the path would be C:\Users\Administrator\Desktop\user-operation-notification-template)
email.subscription.userOperation.subject=User operation change information
email.subscription.userOperation.endpoint.1=privateMail
email.subscription.userOperation.endpoint.privateMail.address=receiver@gmail.com
email.subscription.userOperation.endpoint.privateMail.salutation=Admin privateMail
email.subscription.userOperation.endpoint.privateMail.subject=User operation change information to private mail
```

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
        <th>Sample Value</th>
    </tr>
    <tr>
        <td><code>module.name.1</code></td>
        <td>This property is used to register the email-sending module in the notification management framework. </td>
        <td><code>email</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.1</code></td>
        <td>This property is used to identify when an email notification should be sent. The sample value is <code>userOperation</code>, which means that when a user operation happens, an event is triggered, and an email will be sent.</td>
        <td><code>userOperation</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.userOperation.template</code></td>
        <td>This property is used to locate the email template file. The email template file can have any file extension. Following is an example email template with placeholders which will be replaced with dynamic values that are coming from the event:<br>
        <code>Hi {username} <br>This is a test mail to your private mail. The operation occurred was: {operation}.</code</td>
        <td><code>/home/wso2/user-event</code></td>
    </tr>
        <tr>
        <td><code>email.subscription.userOperation.salutation</code></td>
        <td>This property is used to predefine the email's salutation. If you are using this property, you should change the <code>{username}</code> placeholder to <code>{salutation}</code> in the email template.</td>
        <td><code>Admin</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.userOperation.subject</code></td>
        <td>This property is used to define the email's subject.</td>
        <td><code>User operation change information</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.userOperation.endpoint.1</code></td>
        <td>This property is used to name the endpoint to which the emails will be sent.</td>
        <td><code>privateMail</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.userOperation.endpoint.privateMail.address</code></td>
        <td>This property is used to add the email address of the email receiver of the endpoint defined in the <code>email.subscription.userOperation.endpoint.1</code> property.</td>
        <td><code>reciever@gmail.com</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.userOperation.endpoint.privateMail.salutation</code></td>
        <td>This property is used to predefine the salutation of the email for the endpoint defined in the <code>email.subscription.userOperation.endpoint.1</code> property. If you are using this property, you should change the <code>{username}</code> placeholder to <code>{salutation}</code> in the email template.</td>
        <td><code>Admin privatemail</code></td>
    </tr>
    <tr>
        <td><code>email.subscription.userOperation.endpoint.privateMail.subject</code></td>
        <td>This property is used to define the subject of the email specifically for the endpoint defined in the <code>email.subscription.userOperation.endpoint.1</code> property.</td>
        <td><code>User operation change information to private mail</code></td>
    </tr>
</table>
