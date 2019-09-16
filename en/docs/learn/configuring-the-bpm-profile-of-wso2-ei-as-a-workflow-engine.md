# Configuring the BPM Profile of WSO2 EI as a Workflow Engine

Follow the steps given below to configure the Business Process
Management (BPM) profile of WSO2 EI so that it integrates and runs with
WSO2 Identity Server to define work flows.

!!! tip "Before you begin!"  
    Make sure to download [WSO2 Enterprise
    Integrator](https://wso2.com/integration) (WSO2 EI). The BPM profile is
    packaged inside WSO2 EI.
    
!!! info 
    The `          <EI_HOME>/wso2/business-process         ` is referred to
    as `          <BPM_HOME         ` \> throughout this document.

1.  Configure the
    `           <BPM_HOME>/repository/conf/user-mgt.xml          ` file.

    1.  Comment the
        `             <UserStoreManager class="org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager">            `
        tag upto its closing tag
        `             <UserStoreManager>            ` to remove the
        existing user store configuration from the file.

    2.  Uncomment the
        `             <!--ISUserStoreManager class="org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager">            `
        `             t            ` ag.  
        Make sure to uncomment the
        `             </ISUserStoreManager-->            ` closing tag
        too.

    3.  Rename `             ISUserStoreManager            ` to
        `             UserStoreManager            ` .

    4.  Configure the BPS to use the same primary user store as IS. By
        default WSO2 IS uses an embedded LDAP user store as the primary
        user store. You can update the following property to point it to
        the LDAP server in IS.

        ``` xml
        <Property name="ConnectionURL">ldap://localhost:10389</Property>
        ```

2.  Start WSO2 IS if you have not started it already and start the WSO2
    EI business-process profile.

    ``` java
        cd <EI_HOME>/bin
        ./business-process.sh
    ```

### What's Next?

Now you need to create a new work flow definition. For more information,
see [Adding a New Workflow
Definition](../../learn/adding-a-new-workflow-definition).
