# Role Based Provisioning

Under [Outbound
Provisioning](../../using-wso2-identity-server/outbound-provisioning)
in general we have discussed how to provision users to trusted identity
providers. In this document we discuss how to provision users based on
the roles they are assigned. In role based provisioning, the user is
provisioned when the user is added to a preconfigured role, and the user
is deleted from the trusted identity provider, when the user is removed
from the role.

To do role-based provisioning, we need to configure the following,

### Step 1: Configuring an identity provider

1.  Download the [WSO2 Identity
    Server](http://wso2.com/products/identity-server/) and [run
    it](../../setup/running-the-product).
2.  Log in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    as an administrator.
3.  Navigate to the **Main** menu and access the **Identity** menu.
    Click **Add** under **Identity Providers**.  
    See the [Configuring an Identity
    Provider](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider)
    topic for more information.
4.  Enter "role-based provisioning" as the Identity Provider name for
    this scenario.
5.  Configure the **Outbound Provisioning Connectors** with
    [SPML](../../using-wso2-identity-server/outbound-provisioning-with-spml),
    [SCIM](../../using-wso2-identity-server/outbound-provisioning-with-scim#configuring-an-identity-provider)
    or [Salesforce connecter](../../using-wso2-identity-server/outbound-provisioning-with-salesforce).
6.  Expand the **Role Configuration** section and enter a role name (or
    set of roles as a comma-separated list) for the **Identity Provider
    OutBound Provisioning Roles** field as seen below.  
    For this flow, a role named "provision" was created and has been
    entered here.

    !!! info
        If you do not have roles already, see the [Configuring Role and
        Permissions](../../using-wso2-identity-server/configuring-roles-and-permissions#adding-a-user-role)
        topic to add roles.

    ![configuring-role-and-perrmissions](../../assets/img/using-wso2-identity-server/configuring-role-and-perrmissions.png)

7.  Click **Update** to save changes.

### Step 2: Configuring outbound provisioning

1.  In the **Main** menu, under the **Identity** section, click
    **Resident** under **Service Providers**.
2.  Expand the **Outbound Provisioning Configuration** section and enter
    the name of the identity provider you just created, and select the
    connector from the dropdown list.

    ![outbound-provisioning-config](../../assets/img/using-wso2-identity-server/outbound-provisioning-config.png)

    !!! info
        If you enable **Blocking**, WSO2 Identity Server will wait for the
        response from the Identity Provider to continue.

3.  Click **Update** to save changes.

Now let's try provisioning user with the defined role.

### Try : Provisioning Users

1.  In the **Main** menu of the management console, click **Add** under
    **Users and Roles** under the **Identity** menu.
2.  Click **Add New User**. See [Configuring
    Users](../../using-wso2-identity-server/configuring-users) for
    more information.
3.  Provide a username and a password(with confirmation) and click
    **Next**.
4.  Click **Finish** to create the user.

    !!! note
    
        At this point, the user is **not** yet provisioned to the identity
        provider.
    

5.  On the **Main** tab in the management console, click **List** under
    **Users and Roles** in the **Identity** menu.
6.  Click **Users** and then click the **Assign Roles** action of the
    newly created user. Select the "provision" role (or any role added
    in the **Role Configuration** section of the identity provider) and
    click **Finish**.

    !!! note
    
        The user is now provisioned to the identity provider.
    

### Remove user from the identity provider

1.  On the **Main** tab in the management console, click **List** under
    **Users and Roles** in the **Identity** menu.
2.  Click **Users** and then click on the **Assign Roles** action of the
    newly created user. De-select the "provision" role (or any role
    added in the **Role Configuration** section of the identity
    provider) and click **Finish**.

    !!! note
    
        The user will now be removed from the identity provider.
    
