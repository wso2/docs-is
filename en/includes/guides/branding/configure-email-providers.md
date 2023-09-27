# Configure the email provider

You can configure a custom email provider to send emails with your own email address to your organization users during the flows such as sign-up and account recovery.

By configuring a custom email provider with your organization domain, users will get a familiar email address as the sender when they receive emails from your {{ product_name }} organization.

## Prerequisites

- You need to have an organization in {{ product_name }}. [Create an organization]({{base_path}}/get-started/create-asgardeo-account/) if you don’t have one.

- You need to have a **custom email provider (SMTP server)**, which you have control over and can use to send emails to your users.

## Update the email provider

Follow the steps given below to configure the email provider for your organization.

1. On the {{ product_name }}, go to **Organizational Settings** > **Email Provider**.

    ![{{ product_name }} Console - Email Provider UI]({{base_path}}/assets/img/guides/branding/email-provider-console-ui.png)

2. Update the following fields with the configuration information provided by your email provider.

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Server Host</td>
            <td>
                This is the address of the server that handles outgoing emails. Your email service provider provides it and typically starts with <code>smtp.</code> followed by the domain name.
            </td>
        </tr>
        <tr>
            <td>Server Port</td>
            <td>
                This is the specific network port used for communication with the email server.
                Default ports include <code>25</code>, <code>587</code>, or <code>465</code>, but the exact port number can vary depending on your email service provider's configuration.
            </td>
        </tr>
        <tr>
            <td>From Address</td>
            <td>
                This is the email address that appears as the sender of your outgoing emails. Make sure to provide a valid and correctly formatted email address that you have access to and control over.
            </td>
        </tr>
        <tr>
            <td>Reply-to Address</td>
            <td>
                This is the email address that recipients can use to respond to your emails. It allows you to specify a different email address than the one in the <code>From</code> field for receiving replies.
            </td>
        </tr>
        <tr>
            <td>Username</td>
            <td>
                This is used to authenticate and verify your identity when connecting to the email server. It is typically your email address, but certain email service providers may provide a unique username.
            </td>
        </tr>
        <tr>
            <td>Password</td>
            <td>
                This is a security credential used to authenticate and protect access to your email account when sending emails through the email server.
            </td>
        </tr>
        <tr>
            <td>Display Name</td>
            <td>
                This is the name that recipients will see when they receive an email from you. It is typically your name or the name of your organization.
                The display name helps recipients quickly identify the sender of the email.
            </td>
        </tr>
    </table>

## Revert email provider configurations

To revert your email provider configurations,

1. Scroll down to the **Danger Zone** and click **Revert**.
2. Select the checkbox to confirm your action.
3. Click **Confirm**.

![{{ product_name }} Console - Email Provider Danger Zone]({{base_path}}/assets/img/guides/branding/email-provider-danger-zone.png)

The email provider configurations will now be restored to {{ product_name }}'s default configurations.
