# Configuring the BPM Profile of WSO2 EI as a Workflow Engine

Follow the steps given below to configure the Business Process
Management (BPM) profile of WSO2 EI so that it integrates and runs with
WSO2 Identity Server to define work flows.

!!! tip "Before you begin!"  
    Make sure to download [WSO2 Enterprise
    Integrator](https://wso2.com/integration) (WSO2 EI). The BPM profile is
    packaged inside WSO2 EI.
    
!!! info 
    The `<EI_HOME>/wso2/business-process` is referred to as `<BPM_HOME>` throughout this document.

1.  Configure the `<BPM_HOME>/repository/conf/deployment.toml` file.

    1. Add following configuration to point it to the Identity Server user store.
       ``` toml
       [user_store]
       type = "read_write_ldap"
       connection_url = "ldap://<IS_HOST>:10389"
       connection_name = "uid=admin,ou=wso2is"
       connection_password = "$secret{ldap_password}"
       base_dn = "dc=example,dc=com"
       ```

    2.  Configure the BPS to use the same primary user store as IS. By
        default WSO2 IS uses an embedded LDAP user store as the primary
        user store. You can update the following property to point it to
        the LDAP server in IS.

        ``` toml
        connection_url = ldap://localhost:10389
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
