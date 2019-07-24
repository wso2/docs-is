# Customizing Automated Emails

The WSO2 Identity Server (WSO2 IS) provides the means of customizing
automated emails sent to the user. This is particularly useful in the
case of tenant users as they can customize their emails specifically for
users configured under the tenant. Furthermore, tenants do not have
access to underlying configuration files, therefore, this customization
is now possible directly through the management console.

-   [Adding an email template
    type](#CustomizingAutomatedEmails-Addinganemailtemplatetype)
-   [Adding an email
    template](#CustomizingAutomatedEmails-Addinganemailtemplate)
-   [Deleting an email template
    type](#CustomizingAutomatedEmails-Deletinganemailtemplatetype)
-   [Editing an email
    template](#CustomizingAutomatedEmails-Editinganemailtemplate)
-   [Deleting an email
    template](#CustomizingAutomatedEmails-Deletinganemailtemplate)
-   [Updating the locale of a
    user](#CustomizingAutomatedEmails-Updatingthelocaleofauser)

### Adding an email template type

1.  Log in to the WSO2 Identity Server [management
    console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    .
2.  Navigate to the **Main** tab and click **Add** under **Email
    Templates**, which is available under the **Manage** section **.**
3.  Click **Add Email Template Type.**
4.  Enter the name that you want to be displayed for the new email
    template type in the **Template Type Display Name**.
5.  Click **Add.**

### Adding an email template

This allows you to add a new email template for a specific email
template type and language. As a result, there may be multiple email for
a specific email template type based on the language of the email
template.

1.  Log in to the WSO2 Identity Server [management
    console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    .
2.  Navigate to the **Main** tab and click **Add** under **Email
    Templates**, which is available under the **Manage** section **.**
3.  Click **Add Email Template.**
4.  Select/enter the email template details.  

    -   **Select Email Template Type** : You can select the type of
        email template you wish to customize using this dropdown.  
        ![]( ../../assets/img/103329395/103329396.png)
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
                **Subject**, **Email Body** or **Email Footer** as this is not
                supported.
        

    ![]( ../../assets/img/103330503/103330505.png) 

      
    !!! tip
    
        Placeholders and Custom Claim Dialects
    
        **Tip:** You can set different placeholders in order to populate
        custom information such as `            {first-name}           ` and
        `            {user-id}           ` in the subject, body and footer
        of the email template.
    
        You can also specify any custom claim URI created in the WSO2 claim
        dialect:
    
        -   If it an identity claim, specify the claim as seen in the
            example below.
    
            The claim <http://wso2.org/claims/identity/homeAddress> should
            be specified as
            `                {{user.claim.identity.homeAddress}}               `
    
        -   If it is a normal claim, specify the claim as seen in the
            example below.
    
            The claim <http://wso2.org/claims/homeAddress> should be
            specified as
            `                {{user.claim.homeAddress}}               ` .
    
        Before sending the email, the WSO2 IS will retrieve the user details
        from the user store configured for this tenant and replace the
        placeholders with the corresponding values of the user.
    

5.  Click **Add** to add a new email template.

### Deleting an email template type

!!! warning
    
    This deletes all the email templates that correspond to the selected
    email template type together with the email template type.
    

1.  Log in to the WSO2 Identity Server [management
    console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    .
2.  Navigate to the **Main** tab and click **List** under **Email
    Templates**, which is available under the **Manage** section **.**
3.  Select the email template type.
4.  Click **Delete Template Type** and click **ok.**

### Editing an email template

1.  Log in to the WSO2 Identity Server [management
    console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    .
2.  Navigate to the **Main** tab and click **List** under **Email
    Templates**, which is available under the **Manage** section **.**
3.  Select/enter the email template details based on the fields that you
    want to update in the email template.  

    -   **Select Email Template Type** : You can select the type of
        email template you wish to customize using this dropdown.  
        ![]( ../../assets/img/103329395/103329396.png)
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
                **Subject**, **Email Body** or **Email Footer** as this is not
                supported.
        

    ![]( ../../assets/img/103330503/103330505.png) 

    !!! tip
    
        Placeholders and Custom Claim Dialects
    
        **Tip:** You can set different placeholders in order to populate
        custom information such as `           {first-name}          ` and
        `           {user-id}          ` in the subject, body and footer of
        the email template.
    
        You can also specify any custom claim URI created in the WSO2 claim
        dialect:
    
        -   If it an identity claim, specify the claim as seen in the
            example below.
    
            The claim <http://wso2.org/claims/identity/homeAddress> should
            be specified as
            `               {{user.claim.identity.homeAddress}}              `
    
        -   If it is a normal claim, specify the claim as seen in the
            example below.
    
            The claim <http://wso2.org/claims/homeAddress> should be
            specified as
            `               {{user.claim.homeAddress}}              ` .
    
        Before sending the email, the WSO2 IS will retrieve the user details
        from the user store configured for this tenant and replace the
        placeholders with the corresponding values of the user.
    

4.  Click **Save** to update.

### Deleting an email template

Using the following steps you can delete a specific email template that
corresponds to an email template type.

1.  Log in to the WSO2 Identity Server [management
    console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    .
2.  Navigate to the **Main** tab and click **List** under **Email
    Templates**, which is available under the **Manage** section **.**
3.  Select the email template type and the respective email template.
4.  Click **Delete Template** and click **ok.**

### Updating the locale of a user

Once you have set the template language for the user, it is also
necessary to specify the locale for the user. Do the following steps to
configure this.

1.  Click on **List** under **Claims** and select
    <http://wso2.org/claims> .
2.  Select the **Locality** claim and click **Edit**. Select the
    **Supported by Default** checkbox and click **Update**.
3.  Logout as admin and login as a user with user profile management
    permissions.
4.  Click on **List** under **Users and Roles** and then select
    **Users**.
5.  Click on the **User Profile** button corresponding to the logged in
    user.  
    ![]( ../../assets/img/103330503/103330504.png) 
6.  Enter the locale code for the **Locality** field and click
    **Update**.

    !!! tip
    
        **Tip** : For example, use **fr\_fr** for the French locale,
        **pt\_br** for Brazil locale and **it\_it** for the Italian locale.
        This is the format used for country locales in the Identity Server.
        For more information on country locales, see
        [here](http://www.science.co.il/language/Locale-codes.php).
    

Now that this is done, any email notifications you receive will be in
the language you specified.
