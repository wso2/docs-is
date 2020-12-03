# Migration Process

This section contains the complete migration process related to the WSO2 Identity Server.
Go through the guidelines given below before attempting to migrate the production environment.

## Recommendations

1.  If you already have a [WSO2 subscription](https://wso2.com/subscription), reach out to our support team through 
your [support account](https://support.wso2.com/jira/secure/Dashboard.jspa).

2.  Always migrate to the [latest version](https://wso2.com/identity-and-access-management) 
    since latest fixes and new features are available in the newest version. If you have a particular 
    requirement to migrate to an intermediate version, contact 
    [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa).

!!! note
    Migrating the production environment requires additional hardware/VM resources since both the old 
    environment and the new environment will be running until all the traffic is routed to the new 
    environment.

---

## Before migrating to a production environment

### Do you have a custom requirement?
    
If your customizations are already available in the latest version, you can remove the 
customization after migration. You can contact [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa) for assistance. 
However, if a custom requirement is not available in the latest version, follow the steps given below to migrate the customizations.

- First update the dependency version of the 
dependant WSO2 components and re-build the customized component.
- As a practice, WSO2 does not make API changes in minor releases of the dependency jars. However, if 
there are API changes, update the custom code and re-build.
-  For more information about migrating customizations, see [Migrating Custom Components](../migration-guide/#migrating-custom-components).

---
                        
###  Step-by-step instructions 

Follow the steps given below once you have followed the steps above to migrate customizations **OR** if you do not have any custom requirements. 

1.  List down the functional and nonfunctional use cases in your deployment and create test cases for them. 
    
    !!! important
        This step is crucial to verify that the migrated environment works as expected.     

2.  Identify the configuration migrations required for the new setup. For more information, see [What Has Changed](../../setup/migrating-what-has-changed).
        
3.  Prepare a test setup of the migrating version with customizations and necessary config changes, and 
test your functional and nonfunctional requirements.

4.  Before starting the migration, run the [token and session 
cleanup scripts](../../setup/removing-unused-tokens-from-the-database#using-stored-procedures-for-token-cleanup)
 in the databases of the environment, if you are not doing regular cleanups.
    
    !!! info
        Clean-up scripts can be found in the relevant db folder in `<IS-HOME>/dbscripts/identity/stored-procedures`
        
5.  Start the migration from the lowest environment such as dev and continue up to the highest before the production 
such as pre-prod. 

6.  Run the test cases in the migrated environments to confirm that your functional and nonfunctional 
requirements are met in the migrated environment.

7. Prior to the production migration, run a pilot migration on your pre-prod environment. It would be 
ideal if the pre-prod environment is similar to the production environment.
    +   If possible, restore a database dump of the production environment to the pre-prod environment and 
    perform the pilot migration.
    +   If the production database dump cannot be used, at least ensure that you have a sufficient amount 
    of data in the database to mimic the production environment.
    
!!! note "Recommendation"
    When you follow the above steps, you can get a rough estimate of the time for the final 
    production update and you can allocate time slots as per the above analysis. WSO2 recommends performing the 
    migration while the system is under minimum traffic. 
    
Once you are satisfied with the above steps, proceed with production migration. After the migration is complete, 
verify it using the following steps.
    
+  Monitor the system health (CPU, memory usage etc).
+  Monitor the WSO2 logs for errors.

!!! note ""
    If you see any problems in the migrated system, revert the traffic back to the previous setup and investigate the problem.



