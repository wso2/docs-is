# Outbound Provisioning with SPML

WSO2 Identity Server enables you to manage users with SPML compliant
providers. The following steps illustrate how to do this.

1.  Install and configure a SPML compliant provider. Sun Identity
    Manager, Oracle waveset, and ActiveRoles Server SPML provider are
    some examples for SPML compliant providers.
2.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](../../setup/running-the-product).
3.  Log in to the [Management
    Console](../../setup/getting-started-with-the-management-console) as an
    administrator.
4.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Identity Providers**. See
    [here](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider) for more
    information on this.
5.  Enter "spml Identity provider" as Identity Provider name for the
    purposes of this scenario.
6.  Under the **Outbound Provisioning Connectors** section, expand the
    **SPML Provisioning Connector** form.  
    ![spml-provisioning-connector-form](../../assets/img/using-wso2-identity-server/spml-provisioning-connector-form.png)  
    Do the following changes:
    1.  Select the **Enable Connector** checkbox.

    2.  Enter a **Username** for your SPML compliant provider.

    3.  Enter a **Password** for the SPML compliant provider.

    4.  Enter the SPML endpoint URL as **SPML Endpoint**.

    5.  Enter the supported **SPML ObjectClass** from the server. This
        object class defines the user attributes passed to the server.

7.  Click **Update** to save changes.

8.  In the **Main** menu under the **Identity** section, click
    **Resident** under **Service Providers**.
9.  Then expand the **Outbound Provisioning Configuration** section and
    add the created identity provider and select **spml** from the
    dropdown list.  
    ![spml-dropdown](../../assets/img/using-wso2-identity-server/spml-dropdown.png)

    !!! info 
        -   If **Blocking** is enabled, WSO2 IS will wait for the response
                from the Identity Provider to continue provisioning.

        -   If **Enable Rules** is enabled, the users will be provisioned
                based on pre-defined XACML rules. For more information about
                this, see [Rule Based Provisioning](../../using-wso2-identity-server/rule-based-provisioning).

10. Click **Update**.
11. On the **Main** tab in the management console, click **Add** under
    **Users and Roles** in the **Identity** menu.
12. Click **Add New Role** and add a role named "spml". See [Configuring
    Roles and Permissions](../../using-wso2-identity-server/configuring-roles-and-permissions) for more
    information on this process.
13. On the **Main** tab in the management console, click **Add** under
    **Users and Roles** in the ****Identity**** menu .
14. Click **Add New User**. See [Configuring
    Users](../../using-wso2-identity-server/configuring-users) for more information on this process.
15. Provide a username and a password(with confirmation) and Click
    **Next**.
16. Add "spml" as the role in the resulting screen.
17. Click **Finish** to create the user.

The user you created is now provisioned to the SPML provider server.
