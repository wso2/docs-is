# Provisioning Patterns

Provisioning patterns are used to build the username that is needed to
create the user in the identity provider. This functionality is
available with the google provisioning connector and salesforce
provisioning connector. If two users with the same username need to be
created in two different user store domains, the user cannot be
provisioned to the identity provider with the username only. For such
scenarios, provisioning patterns can be used.

Provisioning pattern can be used to create a pattern for the username.
It can combine 4 user attributes to create the user id.

-   Username - UN
-   User Domain -UD
-   Tenant Domain -TD
-   Identity Provider -IDP

Then provisioning separator can be specified to combine the above
mentioned user attributes.

!!! tip
    
    If provisioning pattern is specified as "{UN, UD, TD, IDP}"
    and Provisioning Separator is "-", for a user created with the username
    "user@provisioning.com", in super tenant, primary userstore user will be
    provisioned to Salesforce with username "
    <primary-user@provisioning.com-carbon.super-salesforce> " from a
    identity provider named as salesforce.
    

### Configure Provisioning Pattern

1.  Login to the management console using administrator credentials.
2.  Navigate to the **Main** menu and click **List** under **Identity
    Providers.**
3.  Configure the [salesforce outbound provisioning
    connector](../../using-wso2-identity-server/outbound-provisioning-with-salesforce)
    or the google outbound provisioning connector.

    !!! info 
        This functionality has been demonstrated on this page, using the
        salesforce outbound provisioning connector.

4.  Edit the outbound provisioning connector configuration of the
    identity provider and enter a provisioning pattern and seperator for
    the following fields.

    -   **Provisioning Pattern** - Enter a combination of user
        attributes of the user ID as the pattern, for
        example {UD,UN,TD,IDP}
    -   **Provisioning Seperator** - This can be a character such as a
        dash ( - ) which is used to seperate the attributes.
    -   **Provisioning Domain** - This refers to the user store domain
        in WSO2 Identity Server. If no value is entered here, the WSO2
        IS will take the primary user store domain by default.

    ![provisioning-pattern](../../assets/img/using-wso2-identity-server/provisioning-pattern.png)

5.  Click **Update** to save the changes.

### Working with users

1.  On the **Main** tab in the management console, click **Add** under
    **Users and Roles** in the **Identity** menu.
2.  Click **Add New User**. See [Configuring
    Users](../../using-wso2-identity-server/configuring-users) for
    more information on this process.
3.  Provide a username and a password(with confirmation) and click
    **Next**.  
    ![enter-username-password](../../assets/img/using-wso2-identity-server/enter-username-password.png)
4.  Click **Finish** to create the user.
5.  Login to your already created Salesforce account. O n the left
    navigation pane, click **Users** under **Manage Users**. You will
    see that the user you created in the WSO2 Identity Server has been
    added to Salesforce as well.  
    ![manage-users](../../assets/img/using-wso2-identity-server/manage-users.png)  
    Observe the username used for the provisioning. It is build using
    the provisioning pattern you specified in the configuration.  
