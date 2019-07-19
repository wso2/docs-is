# Email Templates

The WSO2 Identity Server enables you to send automated emails to users.
You can also [customize these automated
emails](_Customizing_Automated_Emails_) sent to the user.

1.  Log in to the WSO2 Identity Server management console using your
    tenant credentials.
2.  Under the **Configure** menu of the management console, click
    **Email Templates**.
3.  In the resulting screen, you can customize the email templates that
    are sent to the users in your tenant.

    -   **Select Email Template Type** : You can select the type of
        email template you wish to customize using this dropdown.  
        ![](attachments/103329395/103329396.png)
    -   **Subject** : This is the subject of the email that is sent to
        the user.
    -   **Email Body** : This is the body of the email that is sent to
        the user. Custom information like
        `             {first-name}            ` and
        `             {user-id}            ` are populated from the user
        store configured for this tenant.
    -   **Email Footer** : This is the footer of the email.

        !!! note
        
                **Note** : Ensure that you do not use the "\|" character in your
                **Subject** , **Email Body** or **Email Footer** as this is not
                supported.
        

4.  Click **Save** to save your changes.

**Recommended reading**

-   For an example of how email templates are used, see [Creating Users
    Using the Ask Password
    Option](_Creating_Users_Using_the_Ask_Password_Option_).
