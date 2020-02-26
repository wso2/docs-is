# Connecting a LDAP Based User Store

## Steps to Configure
LDAP based userstore can be connected to the Identity Server as follows,

* Login to the admin portal
* Go to Userstores -> Add
* Select the userstore type
* Give a preferred name for the userstore
* Give the database details and other additional properties

<!-- TODO: Add the exact steps to the above-->

## Read-only Mode
If your LDAP is managed externally to the Identity Server, you can connect the LDAP in read-only mode. To configure
 the LDAP in read-only mode,
<!-- TODO: Steps to configure readonly LDAP -->

## Advanced Configuration
<!-- TODO: Describe the properties related to LDAP userstore-->

!!! Tip "Note"
    The database schema to store the users is assumed to follow the WSO2 schema. If you have your own schema, Please use
 a custom userstore manager or export the users to a csv and import the users 

!!! Tip "What's Next"
    - [Managing User Accounts](manage-users-overview.md)
    - [Managing Roles](managing-roles.md)