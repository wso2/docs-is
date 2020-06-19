# Edit or delete a role

## Edit or delete a role using the admin portal

{insert-fragment}

---

### Edit or delete a role using SCIM

In SCIM roles are considered as **groups.** You can edit or delete a
group using SCIM. Please read more about
[SCIM](insert-scim2-concept) for further
details.

---

## Edit or delete a role using SOAP

A role can be edited or deleted by calling the service
`         RemoteUserStoreManager        ` . If you are new to admin
services, see [Calling Admin
Services.](insert-calling-admin-services)

1.  Disable the hidden admin service property in the
    `           <IS_HOME>/repository/conf/deployment.toml          ` file.  
    By default, the admin services are disabled as it is not recommended
    to expose these URLs to users. However, this can be enabled by the
    administrators if it needs to be accessed.

    ``` toml
    [admin_service.wsdl]
    enable = false
    ```

2.  Open the following Admin Service from [SOAP UI](https://www.soapui.org/downloads/latest-release.html):
    [https://localhost:9443/services/RemoteUserStoreManagerService?wsdl  
    ](https://localhost:9443/services/RemoteUserStoreManagerService?wsdl)

    !!! info 
        If you have configured WSO2 IS to use an IP or hostname, replace
        `            localhost           ` with your IP or hostname.

3.  Call the method **updateRoleName `            ()           `** to
    rename a role and **deleteRole()** to delete a role.

    **SOAP Request : Update Role name**

    ``` xml
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
        <soap:Header/>
        <soap:Body>
            <ser:updateRoleName>
                <!--Optional:-->
                <ser:roleName>roleOld</ser:roleName>
                <!--Optional:-->
                <ser:newRoleName>roleNew</ser:newRoleName>
            </ser:updateRoleName>
        </soap:Body>
    </soap:Envelope>
    ```

    **SOAP Request: Delete role**

    ``` xml
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://service.ws.um.carbon.wso2.org">
        <soap:Header/>
        <soap:Body>
            <ser:deleteRole>
                <!--Optional:-->
                <ser:roleName>roleOld</ser:roleName>
            </ser:deleteRole>
        </soap:Body>
    </soap:Envelope>
    ```
----

## Update special role names
Even-though we can rename the role names using WSO2 Identity Server using one of the above methods, the two special roles
`admin` and `Internal/everyone` require a special way to update their names. You can use one of the following methods for this;

### Update role names before the first startup (recommended)

You can change the default role name before starting the WSO2 Identity
Server. To do this, change the properties in the `         <IS_HOME>/repository/conf/deployment.toml       ` file as shown below.
Change the value of `admin_role` to ` New role name`. 


           [super_admin]
           username = "admin"
           password = "admin"
           create_admin_account = true
           admin_role = "admin"
           [realm_manager]
           data_source = "jdbc/WSO2CarbonDB"


---

### Update role names before the first startup (recommended)

If you have already updated the role names before the first startup of
the product, these steps are not necessary. The following steps guide
you through updating the role names after you have used the product for
some time.

1.  Make the configuration changes indicated in the above
        section.
2.  Do the following user store level changes for existing users:  
       -   If you are connected to the
            `JDBCUserStoreManager`, update the
            `UM_USER_ROLE` table with the existing
            users and the new role names that you defined in place of the
            'admin' and 'everyone' roles. If you have changed the
            permissions of the 'everyone' role, update the
            `UM_ROLE_PERMISSION` table the
            permissions of the new role.

       -   If you are connected to the `ReadWriteLdapUserStoreManager`, populate the members of the previous admin role to the new
            role under **Groups**.

3.  After the changes have been made, restart the server.

!!! info 
    The schema can be located by referring to the data source
    defined in the `deployment.toml` file. The data source definition
    can also be found in the same file. 

-----

!!! info "Related Topics"
    - [Concept: User Roles](TODO:insert-link-to-concept)
    - [Guide: Add Roles](../add-user-roles)
    - [Guide: Role Based Permissions](../edit-delete-roles)

