# Connecting a CustomUser Store

## Developing an Extension for Custom User Store

## Deploying the Custom User Store Extension

## Steps to Configure
Database based userstore can be connected to the Identity Server as follows,

* Login to the admin portal
* Go to Userstores -> Add
* Select the userstore type
* Give a preferred name for the userstore
* Give the database details and other additional properties

<!-- TODO: Add the exact steps to the above-->

## Advanced Configuration
<!-- TODO: Describe the properties related to JDBC userstore-->

!!! Tip "Note"
    The database schema to store the users is assumed to follow the WSO2 schema. If you have your own schema, Please use
 a custom userstore manager or export the users to a csv and import the users 

!!! Tip "What's Next"
    - [Managing User Accounts](manage-users-overview.md)
    - [Managing Roles](managing-roles.md)