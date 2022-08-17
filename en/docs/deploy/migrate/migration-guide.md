# Before you begin

This section walks you through the steps you need to follow to upgrade
WSO2 Identity Server to version 6.0.0.

## Should I migrate?

WSO2 recommends upgrading to the latest version in order to ensure that
users receive the latest updates for the product.

- For a high level overview of what has been added, changed, or
    deprecated in this release, see [About this
    release]({{base_path}}/get-started/about-this-release).
- For a detailed overview of behavioral changes in this release, see
    [What Has Changed]({{base_path}}/setup/migrating-what-has-changed).

## Prerequisites

1. Review what has been changed in this release. For a detailed list of
    changes from 5.11.0 to 6.0.0, see [What Has Changed]({{base_path}}/setup/migrating-what-has-changed).

2. Before you migrate, refer to [Migration Process]({{base_path}}/setup/migration-process/) to get an understanding on the migration process.

3. You can use the [Update Management Tool](https://updates.docs.wso2.com/en/latest/) (UMT) to get any
    fixes or latest updates for this release.

4. Take a backup of the existing database used by the current WSO2 Identity Server. This backup is necessary in case the migration causes any issues in the existing database.

5. Download WSO2 Identity Server 6.0.0 and unzip it in the `<NEW_IS_HOME>` directory.

6. Next, refer to the [Preparing for migration]({{base_path}}/setup/migrating-preparing-for-migration) section.