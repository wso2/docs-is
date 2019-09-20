# Setting up IBM DB2

The following sections describe how to set up an IBM DB2 database to
replace the default H2 database in your WSO2 product:

### Prerequisites

Download the latest version of [DB2
Express-C](http://www-01.ibm.com/software/data/db2/express/download.html)
and install it on your computer.

!!! info 
    For instructions on installing DB2 Express-C, see this
    [ebook](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/Big%20Data%20University/page/FREE%20eBook%20-%20Getting%20Started%20with%20DB2%20Express-C).

### Setting up the database and users

Create the database using either DB2 command processor DB2 control center as described below.

#### Using the DB2 command processor

1.  Run DB2 console and execute the `          db2start         `
    command on a CLI to open DB2.
2.  Create the database using the following command:  
    `          create database <DB_NAME>         `
3.  Before issuing an SQL statement, establish the connection to the
    database using the following command:  
    `          connect to <DB_NAME> user <USER_ID> using <PASSWORD>         `
4.  Grant required permissions for users as follows:

    ``` actionscript3
    connect to DB_NAME
    grant <AUTHORITY> on database to user <USER_ID>
    ```

    For example:

    ![](../assets/img/53125504/53287380.png) 

    !!! info 
        For more information on DB2 commands, see the [DB2 Express-C Guide](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/Big%20Data%20University/page/FREE%20eBook%20-%20Getting%20Started%20with%20DB2%20Express-C).

#### Using the DB2 control center

1.  Open the DB2 control center using the `          db2cc         `
    command as follows:  

    ![](../assets/img/53125504/53287383.png)

2.  Right-click **All Databases** in the control center tree (inside the
    object browser), click **Create Database**, and then click
    **Standard** and follow the steps in the **Create New Database**
    wizard.  
    ![](../assets/img/53125504/53287398.png) 
3.  Click **User and Group Objects** in the control center tree to
    create users for the newly created database.  
    ![](../assets/img/53125504/53287381.png) 
4.  Give the required permissions to the newly created users.  
    ![](../assets/img/53125504/53287382.png) 

### Setting up DB2 JDBC drivers

Copy the DB2 JDBC drivers ( `         db2jcc.jar        ` and
`         db2jcc_license_c0u.jar        ` ) from
`         <DB2_HOME>/SQLLIB/java/        ` directory to the
`         <IS_HOME>/repository/components/lib/        ` directory.

![](../assets/img/53125504/53287393.png)

!!! info
    `          <DB2_HOME>         ` refers to the installation directory of
    DB2 Express-C, and \< `          PRODUCT         `
    `          _HOME>         ` refers to the directory where you run the
    WSO2 product instance.

## What's next

By default, all WSO2 products are configured to use the embedded H2
database. To configure your product with IBM DB2, see [Changing to IBM
DB2](../../administer/changing-to-ibm-db2).
