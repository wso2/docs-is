# Migration Process

This section contains the complete migration process related to the WSO2 Identity Server.
Go through the guidelines given below before attempting to migrate the production environment.

1.  If you already have a **WSO2 subscription**, reach out to our support team through your support account.
2.  Always migrate to the **latest** available version. This is because all the latest fixes and new features are available 
    in the newest version. If you have a particular requirement to migrate to an intermediate version, contact WSO2 support.
3.  It should be noted that migrating the production environment requires additional hardware/VM resources. This is 
    because both the old environment and the new environment will be running until all the traffic is routed to the new environment.
4.  If you have customizations in your setup, check if they are supported out of the box in the latest version. 
       <ul>
            <li>If it is available, you can remove the customization after migration. You can contact WSO2 support for assistance.</li>
            <li>If the custom requirement is not available in the latest version, migrate the customization to support the 
                latest product version. Note the following points when you are doing this.</li> 
            <ul style="list-style-type:circle; padding-left: 25px;">
                <li>When migrating the customizations, first update the dependency version of the dependant WSO2 
                    components and re-build the customized component.</li>
                <li>As a practice, WSO2 does not make API changes in minor releases of the dependency jars. However, if 
                    there are API changes, please update the custom code and re-build.</li>
                <li>For more information about migrating customizations, see [Migrating Custom Components](../migration-guide/#migrating-custom-components).</li>
            </ul>
        </ul>
5.  List down the functional and nonfunctional use cases in your deployment and create test cases for them if you have 
    not already done so. This step is crucial to verify that the migrated environment works as expected.     
6.  Identify the configuration migrations required for the new setup. For more information about what has changed in 
    this release, see [What Has Changed](../setup/migrating-what-has-changed).
7.  Prepare a setup of the new version you are migrating to with customizations and necessary config changes, and test 
    your functional and nonfunctional requirements.
8.  If you are not doing regular cleanups, run the token and session cleanup scripts as mentioned [here](../administer/removing-unused-tokens-from-the-database#using-stored-procedures-for-token-cleanup) in the databases 
    of the environment **before starting the migration**.
    
    !!! info
        Clean-up scripts can be found in the relevant db folder in <IS-HOME>/dbscripts/identity/stored-procedures
        
9.  Start the migration from the lowest environment such as dev and continue up to the highest before the production such 
    as pre-prod. Run the test cases in the migrated environments to confirm that your functional and nonfunctional requirements 
    are met in the migrated environment.
10. Prior to the production migration, run a pilot migration on your pre-prod environment. It would be ideal if the 
    pre-prod environment is similar to the production environment.
    +   If possible, restore a database dump of the production environment to the pre-prod environment and perform the 
        pilot migration.
    +   If the production database dump cannot be used, at least ensure that you have a sufficient amount of data in the 
        database to mimic the production environment.
11. When you follow the steps given above, you can get a rough estimate of the time it will take for the final production 
    update and you can allocate time slots as per the above analysis. WSO2 recommends performing the migration while the 
    system is under minimum traffic. 
    

Once you are satisfied with the above steps, proceed with production migration. After the migration is completed do the 
following verification steps.
    
+   Monitor the system health (CPU, memory usage etc).
+  Monitor the WSO2 logs to see if there are errors logged in the log files.

If you see any problems in the migrated system, revert the traffic back to the previous setup and investigate the problem.



