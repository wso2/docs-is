# Counting users and roles using Management Console and Admin Services

With WSO2 Identity Server you can easily count the users and roles using
Management Console and Admin Services. First, you should download the
product and configure this feature. Follow the below steps to do this:

1.  Download the product from the [WSO2 product
    page](https://wso2.com/platform).
2.  Add the below property inside
    `           <UserStoreManager class="org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager">          `
    configuration in \<IS\_HOME\>/repository/conf/user-mgt.xml.

    ``` xml
    <Property name="CountRetrieverClass">org.wso2.carbon.identity.user.store.count.jdbc.JDBCUserStoreCountRetriever</Property>
    ```

3.  Start the server.  
      

Once you are done with the configurations, you can count the users and
roles using one of the following ways:

-   [Using the Management
    Console](#CountingusersandrolesusingManagementConsoleandAdminServices-UsingtheManagementConsole)
-   [Using the Admin
    Services](#CountingusersandrolesusingManagementConsoleandAdminServices-UsingtheAdminServices)

#### Using the Management Console

You can access the user store count using the managemet console. Follow
the steps below to do this:

1.  Log in to the Management Console and navigate to users and roles.
2.  Under **Users**, you see a new table named "Count Users" where you
    can count (by clicking **Count Users** button) the number of users
    in each domain for different claims and user name patterns etc. (In
    this example '%admin' is given as search pattern)  
    ![](../../assets/img//103330053/103330054.png) 
3.  Similarly, under **Roles,** you see a table named **Count Roles**
    where you can count roles in different user store domains.  
    ![](../../assets/img//103330053/103330055.png) 

#### Using the Admin Services

If you are using the Admin Services to count the users and roles, follow
the below steps:

1.  Change the `           HideAdminServiceWSDLs          ` property in
    `           <IS_HOME>/repository/conf/carbon.xml          ` to
    **false** to get access to the WSDL's of the admin services.

    ``` xml
        <HideAdminServiceWSDLs>false</HideAdminServiceWSDLs>
    ```

2.  Access the WSDL of UserStoreCountService service by browsing
    <https://localhost:9443/services/UserStoreCountService?wsdl> . I f
    the WSDL is loading, access the methods of the service through
    SoapUI. Here, you will have access to additional methods
    (CountByClaimsInDomain, countClaims) than from the Management
    Console.

!!! note
    
    By default, only JDBC user store implementations support this service
    but the functionality can be extended to LDAP user stores or any other
    type of user store as well.
    
