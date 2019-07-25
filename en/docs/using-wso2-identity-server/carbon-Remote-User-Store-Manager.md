# Carbon Remote User Store Manager

Carbon Remote User Store Manager is a way of using a user store that is
already configured in a WSO2 Carbon product.

Consider a scenario where two instances of the WSO2 Identity Server are
configured. The first instance (IS1) has a
`         ReadOnlyLDAPUserStoreManager        ` (configured on OpenLDAP)
and the second instance (IS2) has
`         JDBCUserStoreManager        ` configured on OracleDB. To
expose the users in IS2 to IS1 through the
`         UserStoreManager        ` API, you can call the
`         UserStoreManager        ` admin service operations. WSO2 IS
has a standard implementation which uses the admin services. The diagram
below illustrates this scenario.

![]( ../../assets/img/103330074/103330075.png)

### Configuring a carbon remote user store manager 

To configure a carbon remote user store manager, you can follow the
following steps.

1.  Log in to the management console of the the local server (IS1) and
    click **User Stores\>Add** in the **Main** menu.

2.  Fill in the following values in the form as seen below. The image
    below shows a sample configuration.
    -   **User Store Manager Class:**
        org.wso2.carbon.identity.user.store.remote.CarbonRemoteUserstoreManger
    -   **Domain Name:** \<desired\_secondary\_userstore\_name\>
    -   **Remote Server Username:** \<remote\_admin\_login\>
    -   **Remote Server Password:** \<remote\_admin\_password\>
    -   **Remote Server URL(s):**
        https://\<remote\_sever\_url\>:\<remote\_server\_port\>/services  

        !!! note
        
                Make sure that you insert the same credentials used to invoke
                the admin services in the remote server and the same remote
                services URL.
        

        ![]( ../../assets/img/103330074/103330077.png) 

3.  Update other fields as required (description is give for each
    property) and click **Add**.
