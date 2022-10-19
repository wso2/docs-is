# Call Admin Services

!!! warning
    Admin services are deprecated from IS 6.0.0 onwards. You can use REST-based APIs.

WSO2 Identity Server (WSO2 IS) is managed internally using SOAP Web services known as **admin services**. WSO2 IS comes with a management console UI, which communicates with these admin services to facilitate
administration capabilities through the UI.

A service in WSO2 IS is defined by the following components:

- Service component: provides the actual service.
- UI component: provides the Web user interface to the service.
- Service stub: provides the interface to invoke the service generated from the service Web Services Description Language (WSDL).

There can be instances where you want to call back-end Web services directly. For example, in test automation, to minimize the overhead of having to change automation scripts whenever a UI change happens, developers prefer to call the underlying services in scripts. The topics below explain how to discover and invoke these services from your applications.


---

## Discover the admin services

By default, the WSDLs of admin services are hidden from consumers. Explained below is how to discover them using the OSGi console.

1. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

       ``` 
       [admin_service.wsdl] 
       enable= true
       ```

2. Go to the `<IS_HOME>/bin/` folder and start the WSO2 product as follows:

    ``` java tab="In Linux Environment"
    sh wso2server.sh -DosgiConsole
    ```

    ``` java tab="In Windows Environment"
    wso2server.bat -DosgiConsole
    ```

3. Once the server starts, hit the enter/return key several times to get the OSGI shell in the console.

4. In the OSGi shell, type `listAdminServices` to view the list of admin services of your product.
    <!-- ![Admin services list]({{base_path}}/assets/img/apis/admin-services-list.png) -->

    !!! info
        The admin service's URL appears as follows in the list you discovered:

        ``` java
        RemoteUserStoreManagerService, RemoteUserStoreManagerService, https://<IS_HOST>:<IS_PORT>/services/RemoteUserStoreManagerService/  
        ```
        
        After discovering the admin service, you can restart the server without `-DosgiConsole`.

        To see the service contract of an admin service, select the admin service's URL and then paste it into your browser with **?wsdl** at the end. For example:
    
        `https://localhost:9443/services/RemoteUserStoreManagerService?wsdl`

---

## Invoke an admin service

!!! tip
    To generate the stubs, you can write your client program using the Axis2 client API or use an existing tool like [SoapUI](http://www.soapui.org/) (4.5.1 or later).

!!! info "Related topics"
    -   Reference: [Permissions required to invoke admin services]({{base_path}}/references/permissions-required-to-invoke-admin-services)
    -   The following article guides you through transforming existing SOAP-based services into REST services in WSO2 Identity Server: [Exposing WSO2 Identity Server Admin Services the REST Way](http://wso2.com/library/articles/2016/10/article-exposing-wso2-identity-server-admin-services-the-rest-way/#step2).
