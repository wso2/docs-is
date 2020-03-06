# Before you begin

This section walks you through the steps you need to follow to upgrade
WSO2 Identity Server to version 5.10.0. 

## Should I migrate?

WSO2 recommends upgrading to the latest version in order to ensure that
users receive the latest updates for the product.

-   For a high level overview of what has been added, changed, or
    deprecated in this release, see [About this
    release](../../get-started/about-this-release).
-   For a detailed overview of behavioral changes in this release, see
    [What Has Changed](../../setup/migrating-what-has-changed).
    
## Prerequisites

1.  Review what has been changed in this release. For a detailed list of
    changes from 5.9.0 to 5.10.0, see
    [What Has Changed](../../setup/migrating-what-has-changed).

2.  Before you migrate, refer to [Migration Process](../../setup/migration-process/) 
    to get an understanding on the migration process.

3.  This release is a WUM-only release. This means that there are no
    manual patches. You can use [WSO2 Update Manager](https://wso2.com/updates/wum)(WUM) to get any
    fixes or latest updates for this release.

    !!! note "Important"
        If you are upgrading to use this version in your production
        environment, use WSO2 Update Manager to get the latest updates
        available for WSO2 IS 5.10.0. For more information on how to use WSO2
        Update Manager, see [Updating WSO2 Products](https://docs.wso2.com/display/updates/Using+WSO2+Update+Manager).

4.  Take a backup of the existing database used by the current WSO2 Identity Server. 
    This backup is necessary in case the migration causes any issues in the existing database.

5.  Download WSO2 Identity Server 5.10.0 and unzip it in the `<NEW_IS_HOME>` directory.

6.  Next, refer to the [Preparing for migration](../../setup/migrating-preparing-for-migration) section.