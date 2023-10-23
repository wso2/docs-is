# Configuring Roles for an Identity Provider

This section provides instructions on how to configure roles for an
identity provider. Role mapping needs to be done because roles in the
Identity Server are different to the roles available in the identity
provider that you are configuring. For example, if you are configuring
Google Apps as an identity provider in the Identity Server, the admin
role in the Identity Server needs to be mapped to an appropriate role in
Google Apps so that the user will have the same role in Google Apps and
the Identity Server.

You can configure the roles of the identity provider by doing the
following.

1.  Expand the **Role Configuration** section.
2.  To configure **Identity Provider Roles**, click **Add Role
    Mapping**. The following screen appears.  
    ![Role
    Mapping](../assets/img/using-wso2-identity-server/idp-role-mapping.png) 
3.  Enter the **Identity Provider Role** and map it to the **Local
    Role** available in the Identity Server. See
    [here](../../learn/configuring-roles-and-permissions#adding-a-user-role)
    for information on how the local role can be created in the Identity
    Server. Click the **Delete** button to remove the mapping.
4.  Enter the **Identity Provider Provisioning Role**. This
    configuration is very useful if you wish to only provision some
    users and not others. All users who are assigned to this role will
    be provisioned from the Identity Server to the identity provider.
    You can provision users that have multiple roles by specifying the
    roles in a comma-separated list.  
    ![idp-provisioning-role](../assets/img/using-wso2-identity-server/idp-provisioning-role.png) 

!!! note
    
    The Federated IDP role claim value separator is used to separate
    multiple roles in the role claim value obtained from the Identity
    Provider. In order to configure the Federated IDP role claim value
    separator, add the following configuration to the deployment.toml file
    in `         <carbon-home>/repository/conf        ` and restart the
    server.
    
    ``` xml
     [federated.idp]
      role_claim_value_attribute_separator=","
    ```
    
    If this is not configured and if the **no MulitAttributeSeparator** is
    configured, the default seperator will be " **,,,** ".
    
