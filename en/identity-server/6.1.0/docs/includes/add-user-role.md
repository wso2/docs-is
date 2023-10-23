
1.  Navigate **Main** > **Identity** and click **Users and Roles > Add**.

2.  Click **Add New Role**.

3.  In the **Domain** list, select the user store in which you want to create this role and enter the **Role Name** (e.g., "Manager").

    !!! info "Important"
        The **PRIMARY** domain represents the primary user store of your server and (if available) any secondary user stores configured for your server will also be listed as domains.
        Learn more about [user stores](../../../deploy/configure-user-stores).

        Note that the user roles stored in primary and secondary user stores are always considered as user groups and they cannot be mapped to [roles in federated identity providers](../../../guides/identity-federation/roles-idp). Therefore, if you have a requirement to map local user roles to roles in your federated identity providers, be sure to define those local roles under the **INTERNAL** domain.

4. Click **Finish** or you can click **Next** to specify permissions for the role.
