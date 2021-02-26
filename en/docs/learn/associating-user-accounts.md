# Associating User Accounts

WSO2 Identity Server (WSO2 IS) allows you to associate multiple accounts
you may have, and switch between accounts once you associate accounts.
WSO2 IS also allows you to connect your federated user credentials with
your WSO2 Identity Server account. This topic provides instructions on
how to associate all your user accounts to the account with which you
have logged on.

!!! note
    If you want to associate user accounts of federated users via the
    my account, add the following configuration to the `/repository/conf/deployment.toml`
    file.
    
    ``` toml
    [user.association]
    enable_for_federated_users = true
    ```    

    The **recommended approach** is to have the `enable_for_federated_users` parameter set to `false` so that manual
     federated user association is not allowed by default via the my account.
        

  
Follow one of the two approaches below to associate all your user
accounts:

## Using the AdminService

The first approach is to use the `         AdminService        ` . You
can access this admin service using the following URL: '
`         https://<HOST_NAME>:9443/services/UserAccountAssociationService?wsdl        `
'. If you are new to admin services, see [Calling Admin
Services](../../develop/calling-admin-services).

The following actions can be performed using above admin service.

-   Create a new user account association
-   Delete an existing user account association
-   Get all associated user accounts of the logged in user
-   Switch between associated user accounts without re-authenticate with
    the system

## Using the my account

The WSO2 Identity Server [my account](../learn/my-account.md) can be used to associate the
accounts. You can associate a local user account or a federated user
account. See [Linked Accounts](../learn/my-account.md#linked-accounts) under
My Account for details.
