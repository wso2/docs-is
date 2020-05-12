# Migration MySql v5.5 to v5.7 Process

This section contains the migration process related to the MySql.

1.  Start MySql v5.7 with the dump of MySql v5.5.

2.  Now execute following command to make database tables compatible with MySql v5.7:
      mysql_upgrade
   
3.  Now you need to run [wso2is_script.sql](../setup/wso2is_script.sql) to make mysql database compatible for WSO2 IS 5.7.0.

**Note:** The script mentioned above is for wso2is 5.3.0.
