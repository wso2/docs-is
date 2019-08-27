# Writing a Web Service Client for Authentication and User Admin Services

This topic demonstrates how to use different web services API exposed by
Identity Server, to write a client application(
[remote-user-mgt](https://github.com/wso2/product-is/tree/release-5.3.0/modules/samples/user-mgt/remote-user-mgt)
) to handle user management functionality of WSO2 Identity Server
remotely. The
[remote-user-mgt](https://github.com/wso2/product-is/tree/release-5.3.0/modules/samples/user-mgt/remote-user-mgt)
sample uses
`         AuthenticationAdmin, RemoteUserStoreManagerService        `
and `         RemoteAuthorizationManagerService        ` admin services
to perform different operations.

You can learn more about the admin services used in this sample by
referring [Calling Admin
Services](../../using-wso2-identity-server/calling-admin-services),
[Managing Users and Roles with
APIs](https://docs.wso2.com/display/IS540/Managing+Users+and+Roles+with+APIs)
and [Managing Permissions with
APIs](https://docs.wso2.com/display/IS540/Managing+Permissions+with+APIs)
.

1.  The code for the sample can be checked out from the GitHub
    repository. To do this, follow the instructions on the [Downloading
    a Sample](https://docs.wso2.com/display/IS540/Downloading+a+Sample)
    topic.
2.  Once downloaded the identity server samples, go inside to
    `           IS_SAMPLES/modules/samples/user-mgt/remote-user-mgt          `
    directory to build the remote user management cliant.

3.  Make sure the URL of the remote server
    (remote.server.url), credentials of the user who performs user
    management operations (user.name, user.password) and truststore
    (truststore.path, truststore.password) configured in
    IS\_SAMPLES/modules/samples/
    user-mgt/remote-user-mgt/client.propeties are correct with respect
    to your environment. If you have changed the private key in the
    identity server, import the public certificate of the identity
    server to truststore (client-truststore.jks) of the sample client in
    IS\_SAMPLES/modules/samples/user-mgt/remote-user-mgt/src/main/resources/keystore.

4.  Build the client using `           mvn install          ` .  

5.  Once the client is built successfully, run
    the remote-user-mgt-client `           .sh          ` file in Unix
    or remote-user-mgt-client `           .bat          ` in
    Windows. You can see that the issues performed is being printed by
    the client.  
    ![]( ../../assets/img/103329897/103329898.png)   
      

!!! note
    
    **Note** : The service stubs are available at WSO2 Maven Repository and
    can be added as dependencies to the project. Also, you can generate the
    service stubs from the WSDL file available at
    <https://localhost:9443/services/> \<ServiceName\>?wsdl
    
    In order to access the WSDL file, update the following configuration in
    the `         <IS_HOME>/repository/conf/carbon.xml        ` file.
    
    ``` xml
    <HideAdminServiceWSDLs>false</HideAdminServiceWSDLs>
    ```
    
