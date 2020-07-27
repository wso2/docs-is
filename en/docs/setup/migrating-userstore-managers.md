# Migrating User Stores

Before doing the actual user store migration, it is recommended to do a dry run and analyze the generated report for 
any recommendations related to the migration. 

## Dry Run

Dry-run capability in the user store migrator will allow the migration utility to validate the system for the 
user store configurations and generate a report regarding the migration compatibility. In the generated migration report, 
if there are any warnings in the generated migration report, it is recommended to contact the WSO2 support to identify the best migration strategy.

### How to Run

Configure the migration report path using the value of `reportPath` `<IS_HOME>/migration-resources/migration-config.yaml` in the migration-config.yaml. 
This path should be an absolute path. 

Run the migration utility with system property “dryRun”. 

Ex:

``` bash tab="Unix/Linux"
sh wso2server.sh -Dmigrate -Dcomponent=identity -DdryRun
```

``` bash tab="Windows"
wso2server.bat -Dmigrate -Dcomponent=identity -DdryRun
```
 
After that analyze the generated report that resides in the provided location.

## Migrating User Stores

If you have multiple tenants and multiple user stores and you only need to migrate a few of them, refer to the 
configuration section below. If you need to migrate all of them, use the `migrateAll` property (This is set to true by default).  

### Special Scenarios

If the user store is an LDAP user store and SCIM is enabled for that user store, migrating that user store is not
 required. 
As SCIM will create a user id for the users in that user store, SCIM id can be used as the unique user id. To do that, 
change the `user_id_attribute` to the value of SCIM id, in the `<IS_HOME>/repository/conf/deployment.toml` file.

## Configurations

| Property Name | Description |
| ------------- | ----------- |
| migrateAll | Migrate all the tenants and all the user store domains in it. |
| reportPath | Absolute path for the dry report. This is required in the dry run mode. |


Following configurations are only needed to migrate a few tenants. Configuration format should be similar to the one mentioned below. tenant-param is a place holder name to represent each tenant uniquely. Ex: tenant1

```  
-
  name: "UserIDMigrator"
  order: 7
  parameters:
    <tenant-param>:
```

| Property Name | Description |
| ------------- | ----------- |
| tenantDomain | Domain name of the tenant. (Mandatory) |
| increment | Number of users to be updated in each iteration. (Optional) |
| startingPoint | Where should the migration start from (Offset). This is useful if the migration stopped middle and needs to restart. (Optional) |
| scimEnabled | Whether SCIM enabled for user stores in this tenant. (Optional) |
| migratingDomains | List of comma separated domain names which should be migrated in this domain. (Optional) |
| forceUpdateUserId | Mark whether user IDs should be updated even though there is already an ID there. (Optional) |
