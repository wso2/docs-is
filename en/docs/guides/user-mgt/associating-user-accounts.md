# Associating User Accounts

WSO2 Identity Server (WSO2 IS) allows you to associate multiple accounts
you may have, and switch between accounts once you associate accounts.
WSO2 IS also allows you to connect your federated user credentials with
your WSO2 Identity Server account. This topic provides instructions on
how to associate all your user accounts to the account with which you
have logged on.
         
Follow one of the two approaches below to associate all your user
accounts:

## Using the AdminService

The first approach is to use the `         AdminService        ` . You
can access this admin service using the following URL: '
`         https://<HOST_NAME>:9443/services/UserAccountAssociationService?wsdl        `
'. If you are new to admin services, see [Calling Admin
Services](TODO:insert-link).

The following actions can be performed using this admin service.

-   Create a new user account association
-   Delete an existing user account association
-   Get all associated user accounts of the logged in user
-   Switch between associated user accounts without re-authenticating to 
    the system

## Using the user portal

The WSO2 Identity Server [user portal](TODO:insert-link) can be used to associate the
accounts. You can associate a local user account or a federated user
account. See [Linked Accounts](TODO:insert-link) under
User Portal for details.

## Using SCIM

To carry out operations related to user associations using SCIM 2.0 rest APIs, see [Association Rest API](insert-link-api).