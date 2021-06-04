# Configure Email Notifications for Account Locking

Once you have configured WSO2 Identity Server for user account locking,
you can also configure the WSO2 IS to email to the user's email address
when the user account is locked. To configure this, follow the steps
below.

Enable the email sending configurations of the WSO2 Identity Server as explained below.

{! fragments/configure-email-sending.md !}

!!! tip
    The email template used to send the email notification for
    account locking is the **AccountLock** template and the template
    used for account disabling is the **AccountDisable** template. You
    can edit and customize the email template. For more information on
    how to do this, see [Customize Automated
    Emails](../../../guides/tenants/customize-automated-mails).

WSO2 Identity Server uses separate email templates for notifying, 

- Account locking by administrator
- Account unlocking by administrator 

There are default email templates available for the above-mentioned emails. However, you can choose to modify them if necessary as well. 

## View email templates in the management console

1.  Navigate to **Main** > **Manage** > **Email Templates** > **List**. 

2.  From the **Select Email Template Type** dropdown, select either  `AccountLockAdmin` or `AccountUnlockAdmin` to notify the locked and unlocked user respectively.

3.  You can customize the subject, body, and footer based on your requirement. 

4.  Click **Save**. 

!!! info "Related topics"
    -   [Guides: Lock and Unlock User Accounts](../../../guides/identity-lifecycles/lock-account)
    -   [Guides: Customize Automated Emails](../../../guides/tenants/customize-automated-mails)
    -   [Deploy: Configure Email Sending Configuration](../../../deploy/configure-email-sending)
    