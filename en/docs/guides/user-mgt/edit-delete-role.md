# Editing or deleting a role

## Editing or deleting a role using the admin portal

{!fragments/xxx!}

---

### Editing or deleting a role using SCIM

In SCIM roles are considered as **groups.** You can edit or delete a
group using SCIM. Please read more about
[SCIM](insert-scim2-concept) for further
details.

---

## Editing or deleting a role using SOAP

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

!!! info "Related Links"
    -   See [Role-based Permissions](insert-role-based-permissions)
        for more information.
    -   See [Permissions Required to Invoke Admin Services](insert-permissions-required-to-invoke-admin-services) for a
        complete list of permissions required to invoke admin services.
