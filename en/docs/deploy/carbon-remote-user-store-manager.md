# Carbon Remote User Store Manager

Carbon Remote User Store Manager is a way of using a user store that is already configured in a WSO2 product.

Consider a scenario where two instances of the WSO2 Identity Server are configured. The first instance (IS1) has a `ReadOnlyLDAPUserStoreManager` (configured on OpenLDAP) and the second instance (IS2) has `JDBCUserStoreManager` configured on OracleDB. To expose the users in IS2 to IS1 through the `UserStoreManager` API, you can call the `UserStoreManager` admin service operations. WSO2 IS has a standard implementation which uses the admin services. The diagram below illustrates this scenario.

![Carbon remote user store manager scenario](../assets/img/guides/carbon-remote-user-store-manager.png)

---

## Configure a carbon remote user store manager 

To configure a carbon remote user store manager, you can follow the following steps.

1.  Log in to the management console of the the local server (IS1) and click **User Stores > Add** in the **Main** menu.

2.  Fill in the following values in the form as seen below. The image below shows a sample configuration.
    -   **User Store Manager Class:** `org.wso2.carbon.identity.user.store.remote.CarbonRemoteUserstoreManger`
    -   **Domain Name:** `<desired_secondary_userstore_name>`
    -   **Remote Server Username:** `<remote_admin_login>`
    -   **Remote Server Password:** `<remote_admin_password>`
    -   **Remote Server URL(s):** `https://<remote_sever_url>:<remote_server_port>/services`   

    !!! note        
        Make sure that you insert the same credentials used to invoke the admin services in the remote server and the same remote services URL.
        

    ![Add new user store](../../assets/img/extend/add-new-user-store.png) 

3.  Update other fields as required (description is give for each property) and click **Add**.

4.  Import the public certificate of the remote WSO2 Identity Server (IS2) to the primary WSO2 Identity Server's (IS1) truststore (`client-truststore.jks`) that is in the `<IS_HOME>/repository/resources/security` directory and restart WSO2 Identity Server.