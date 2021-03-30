# Customize Automated Emails

The WSO2 Identity Server provides the means of customizing automated emails sent to the user. This is particularly useful in the case of tenant users as they can customize their emails specifically for
users configured under the tenant. Furthermore, tenants do not have access to underlying configuration files, therefore, this customization is now possible directly through the management console.

---

## Add an email template type

1.  Sign in to WSO2 Identity Server [Management Console](../../../deploy/get-started/get-started-with-the-management-console/).
2.  On the **Main** tab, click **Manage > Email Templates > Add**.
3.  Click **Add Email Template Type.**
4.  Enter the name that you want to be displayed for the new email
    template type in the **Template Type Display Name** text box.
5.  Click **Add.**

---

## Add an email template

This allows you to add a new email template for a specific email template type and language. As a result, there may be multiple email for a specific email template type based on the language of the email
template.

1.  Sign in to WSO2 Identity Server [Management Console](../../../deploy/get-started/get-started-with-the-management-console/).
2.  On the **Main** tab, click **Manage > Email Templates > Add**.
3.  Click **Add Email Template**.
4.  Select/enter the email template details.  

    -   **Select Email Template Type** : You can select the type of
        email template you wish to customize using this dropdown.  
        ![select-email-template-type](../../../assets/img/guides/select-email-template-type.png)
    -   **Subject** : This is the subject of the email that is sent to
        the user.
    -   **Email Body** : This is the body of the email that is sent to
        the user. Custom information like
        `             {first-name}            ` and
        `             {user-id}            ` are populated from the user
        store configured for this tenant.
    -   **Email Footer** : This is the footer of the email.

        !!! warning
            Ensure that you do not use the "\|" character in your
            **Subject**, **Email Body** or **Email Footer** as this is not
            supported.
        

    ![edit-email-template](../../../assets/img/guides/edit-email-template.png) 

      
    !!! tip "Placeholders and Custom Claim Dialects"
        
        {! fragments/placeholders.md !}
    

5.  Click **Add** to add a new email template.

## Deleting an email template type

!!! warning
    
    This deletes all the email templates that correspond to the selected email template type together with the email template type.
    

1.  Sign in to WSO2 Identity Server [Management Console](../../../deploy/get-started/get-started-with-the-management-console/).
2.  On the **Main** tab, click **Manage > Email Templates > List**.
3.  Select the email template type.
4.  Click **Delete Template Type** and click **ok.**

## Editing an email template

1.  Sign in to WSO2 Identity Server [Management Console](../../../deploy/get-started/get-started-with-the-management-console/).
2.  On the **Main** tab, and click **Manage > Email Templates > List**.
3.  Select/enter the email template details based on the fields that you
    want to update in the email template.  

    -   **Select Email Template Type** : You can select the type of email template you wish to customize using this dropdown.  
        ![select-email-template-type](../../../assets/img/guides/select-email-template-type.png)
    -   **Subject** : This is the subject of the email that is sent to the user.
    -   **Email Body** : This is the body of the email that is sent to the user. Custom information like `{first-name}` and `{user-id}` are populated from the user store that is configured for this tenant.
    -   **Email Footer** : This is the footer of the email.

        !!! note
            Ensure that you do not use the "\|" character in your
            **Subject**, **Email Body** or **Email Footer** as this is not
            supported.
        

    ![edit-email-template](../../../assets/img/guides/edit-email-template.png) 

    !!! tip "Placeholders and Custom Claim Dialects"

        {! fragments/placeholders.md !}

4.  Click **Save** to update.

## Deleting an email template

Using the following steps you can delete a specific email template that
corresponds to an email template type.

1.  Sign in to WSO2 Identity Server [Management Console](../../../deploy/get-started/get-started-with-the-management-console/).
2.  On the **Main** tab, and click **Manage > Email Templates > List**.
3.  Select the email template type and the respective email template.
4.  Click **Delete Template** and click **ok.**

## Updating the locale of a user

Once you have set the template language for the user, it is also necessary to specify the locale for the user. Do the following steps to configure this.

1.  Click on **List** under **Claims** and select <http://wso2.org/claims>.
2.  Select the **Locality** claim and click **Edit**. Select the **Supported by Default** checkbox and click **Update**.
3.  Logout as admin and login as a user with user profile management permissions.
4.  Click on **List** under **Users and Roles** and then select **Users**.
5.  Click on the **User Profile** button corresponding to the logged in user.  
    ![updating-user-locale](../../../assets/img/guides/updating-user-locale.png) 
6.  Enter the locale code for the **Locality** field and click **Update**.

    !!! tip
    
        For example, use **fr\_fr** for the French locale, **pt\_br** for Brazil locale and **it\_it** for the Italian locale. This is the format used for country locales in the Identity Server.
        For more information on country locales, see [Locale codes](http://www.science.co.il/language/Locale-codes.php).
    

Now that this is done, any email notifications you receive will be in the language you specified.
