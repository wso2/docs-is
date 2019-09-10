# Managing Tenants with APIs

This section guides you through invoking and working with the **Tenant**
**ManagementService** and the operations you can work within this
service.

### Invoking the admin service

`         TenantMgtAdminService        ` is an admin service of the WSO2
Carbon platform. As admin services are secured to prevent anonymous
invocations, you cannot view the WSDL of the admin service by default.
Follow the steps below to view and invoke it:

1.  Set the `           <HideAdminServiceWSDLs>          ` element to
    `           false          ` in
    `           <IS_HOME>/repository/conf/carbon.xml          ` file.

    ``` xml
    <HideAdminServiceWSDLs>false</HideAdminServiceWSDLs>
    ```

2.  Restart the Identity Server.
3.  If you have started the server in default configurations, use the
    following URL in your browser to see the WSDL of the admin service:
    `<https://localhost:9443/services/TenantMgtAdminService?wsdl>`.

For more information on WSO2 admin services and how to invoke an admin
service using either SoapUI or any other client program, see [Calling
Admin Services](../../using-wso2-identity-server/calling-admin-services).

### Operations included in the API

The following operations are available in the **TenantManagement**
**Service** :

##### addTenant()

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Adds a new tenant.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean</td>
<td>TenantInfoBean</td>
<td>Contains tenant related data</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.active</td>
<td>Boolean</td>
<td><p>True - activate the tenant</p>
<p>False- deactivate the tenant</p></td>
</tr>
<tr class="even">
<td>tenantInfoBean.admin</td>
<td>String</td>
<td>The admin username</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.adminPassword</td>
<td>String</td>
<td>The admin password</td>
</tr>
<tr class="even">
<td>tenantInfoBean.createdDate</td>
<td>DateTime</td>
<td>The date and time that the tenant was created</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.email</td>
<td>String</td>
<td>The email address of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.firstname</td>
<td>String</td>
<td>The first name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.lastname</td>
<td>String</td>
<td>The last name of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.originatedService</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.successKey</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The tenant domain</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.tenantId</td>
<td>Int</td>
<td>The tenant ID</td>
</tr>
<tr class="even">
<td>tenantInfoBean.usagePlan</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
<details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.tenant.carbon.wso2.org" xmlns:xsd="http://beans.common.stratos.carbon.wso2.org/xsd">
        <soapenv:Header/>
        <soapenv:Body>
            <ser:addSkeletonTenant>
                <!­­Optional:­­>
                <ser:tenantInfoBean>
                    <!­­Optional:­­>
                    <xsd:active>true</xsd:active>
                    <!­­Optional:­­>
                    <xsd:admin>testuser</xsd:admin>
                    <!­­Optional:­­>
                    <xsd:adminPassword>testpw</xsd:adminPassword>
                    <!­­Optional:­­>
                    <xsd:createdDate></xsd:createdDate>
                    <!­­Optional:­­>
                    <xsd:email>testuser@example.com</xsd:email>
                    <!­­Optional:­­>
                    <xsd:firstname>First</xsd:firstname>
                    <!­­Optional:­­>
                    <xsd:lastname>Last</xsd:lastname>
                    <!­­Optional:­­>
                    <xsd:originatedService></xsd:originatedService>
                    <!­­Optional:­­>
                    <xsd:successKey></xsd:successKey>
                    <!­­Optional:­­>
                    <xsd:tenantDomain>example.com</xsd:tenantDomain>
                    <!­­Optional:­­>
                    <xsd:tenantId></xsd:tenantId>
                    <!­­Optional:­­>
                    <xsd:usagePlan></xsd:usagePlan>
                </ser:tenantInfoBean>
            </ser:addSkeletonTenant>
        </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
</details>

</div>
</td>
</tr>
<tr class="odd">
<th>Response</th>
<td><p>None</p></td>
</tr>
</tbody>
</table>

##### activateTenant()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Activates an existing tenant.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/modify/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:activateTenant>
                    <!­­Optional:­­>
                    <ser:tenantDomain>example.com</ser:tenantDomain>
                </ser:activateTenant>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:activateTenantResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org">
                    <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance" />
                </ns:activateTenantResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### deactivateTenant()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Deactivates an existing tenant.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/modify/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:deactivateTenant>
                    <!­­Optional:­­>
                    <ser:tenantDomain>example.com</ser:tenantDomain>
                </ser:deactivateTenant>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:deactivateTenantResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org">
                    <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance" />
                </ns:deactivateTenantResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### getTenant()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Retrieves tenant details by domain name.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:getTenant>
                    <!­­Optional:­­>
                    <ser:tenantDomain>example.com</ser:tenantDomain>
                </ser:getTenant>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:getTenantResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org">
                    <ns:return xsi:type="ax2582:TenantInfoBean" xmlns:ax2584="http://beans.mgt.tenant.carbon.wso2.org/xsd" xmlns:ax2582="http://beans.common.stratos.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance">
                        <ax2582:active>true</ax2582:active>
                        <ax2582:admin>test</ax2582:admin>
                        <ax2582:adminPassword xsi:nil="true" />
                        <ax2582:createdDate>2015­02­13T07:27:17.543+05:30</ax2582:createdDate>
                        <ax2582:email>test@example.com</ax2582:email>
                        <ax2582:firstname>Test</ax2582:firstname>
                        <ax2582:lastname>User</ax2582:lastname>
                        <ax2582:originatedService xsi:nil="true" />
                        <ax2582:successKey xsi:nil="true" />
                        <ax2582:tenantDomain>example.com</ax2582:tenantDomain>
                        <ax2582:tenantId>1</ax2582:tenantId>
                        <ax2582:usagePlan/>
                    </ns:return>
                </ns:getTenantResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### retrievePaginatedPartialSearchTenants()

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Retrieves the tenant information based on the partial search.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenant</td>
<td>String</td>
<td>Partial tenant domain name</td>
</tr>
<tr class="even">
<td>pageNumber</td>
<td>Int</td>
<td>Page number</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:retrievePaginatedPartialSearchTenants>
                    <!­­Optional:­­>
                    <ser:domain>.com</ser:domain>
                    <!­­Optional:­­>
                    <ser:pageNumber>1</ser:pageNumber>
                </ser:retrievePaginatedPartialSearchTenants>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:retrievePaginatedPartialSearchTenantsResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org">
                    <ns:return xsi:type="ax2584:PaginatedTenantInfoBean" xmlns:ax2584="http://beans.mgt.tenant.carbon.wso2.org/xsd" xmlns:ax2582="http://beans.common.stratos.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance">
                        <ax2584:numberOfPages>1</ax2584:numberOfPages>
                        <ax2584:tenantInfoBeans xsi:type="ax2582:TenantInfoBean">
                            <ax2582:active>true</ax2582:active>
                            <ax2582:admin xsi:nil="true" />
                            <ax2582:adminPassword xsi:nil="true" />
                            <ax2582:createdDate>2015­02­13T07:27:17.543+05:30</ax2582:createdDate>
                            <ax2582:email>test@example.com</ax2582:email>
                            <ax2582:firstname xsi:nil="true" />
                            <ax2582:lastname xsi:nil="true" />
                            <ax2582:originatedService xsi:nil="true" />
                            <ax2582:successKey xsi:nil="true" />
                            <ax2582:tenantDomain>example.com</ax2582:tenantDomain>
                            <ax2582:tenantId>1</ax2582:tenantId>
                            <ax2582:usagePlan xsi:nil="true" />
                        </ax2584:tenantInfoBeans>
                    </ns:return>
                </ns:retrievePaginatedPartialSearchTenantsResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### retrievePaginatedTenants()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Activates an existing tenant.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>pageNumber</td>
<td>Int</td>
<td>Page number</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:retrievePaginatedTenants>
                    <!­­Optional:­­>
                    <ser:pageNumber>1</ser:pageNumber>
                </ser:retrievePaginatedTenants>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:retrievePaginatedTenantsResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org">
                    <ns:return xsi:type="ax2584:PaginatedTenantInfoBean" xmlns:ax2584="http://beans.mgt.tenant.carbon.wso2.org/xsd" xmlns:ax2582="http://beans.common.stratos.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance">
                        <ax2584:numberOfPages>1</ax2584:numberOfPages>
                        <ax2584:tenantInfoBeans xsi:type="ax2582:TenantInfoBean">
                            <ax2582:active>true</ax2582:active>
                            <ax2582:admin xsi:nil="true" />
                            <ax2582:adminPassword xsi:nil="true" />
                            <ax2582:createdDate>2015­02­13T07:27:17.543+05:30</ax2582:createdDate>
                            <ax2582:email>test@example.com</ax2582:email>
                            <ax2582:firstname xsi:nil="true" />
                            <ax2582:lastname xsi:nil="true" />
                            <ax2582:originatedService xsi:nil="true" />
                            <ax2582:successKey xsi:nil="true" />
                            <ax2582:tenantDomain>example.com</ax2582:tenantDomain>
                            <ax2582:tenantId>1</ax2582:tenantId>
                            <ax2582:usagePlan xsi:nil="true" />
                        </ax2584:tenantInfoBeans>
                    </ns:return>
                </ns:retrievePaginatedTenantsResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### retrievePartialSearchTenants()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Retrieves all tenants that contain the specified part of the domain name (e.g., All tenant domains with ‘.com’)</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>domain</td>
<td>String</td>
<td>Partial tenant domain name</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:retrievePartialSearchTenants>
                    <!­­Optional:­­>
                    <ser:domain>.com</ser:domain>
                </ser:retrievePartialSearchTenants>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:retrievePartialSearchTenantsResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org" xmlns:ax2584="http://beans.mgt.tenant.carbon.wso2.org/xsd" xmlns:ax2582="http://beans.common.stratos.carbon.wso2.org/xsd">
                    <ns:return xsi:type="ax2582:TenantInfoBean" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance">
                        <ax2582:active>true</ax2582:active>
                        <ax2582:admin xsi:nil="true" />
                        <ax2582:adminPassword xsi:nil="true" />
                        <ax2582:createdDate>2015­02­13T07:27:17.543+05:30</ax2582:createdDate>
                        <ax2582:email>test@example.com</ax2582:email>
                        <ax2582:firstname xsi:nil="true" />
                        <ax2582:lastname xsi:nil="true" />
                        <ax2582:originatedService xsi:nil="true" />
                        <ax2582:successKey xsi:nil="true" />
                        <ax2582:tenantDomain>example.com</ax2582:tenantDomain>
                        <ax2582:tenantId>1</ax2582:tenantId>
                        <ax2582:usagePlan xsi:nil="true" />
                    </ns:return>
                </ns:retrievePartialSearchTenantsResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### retrieveTenants()

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Retrieves all tenants.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/monitor/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><p>None</p></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:ser="http://services.mgt.tenant.carbon.wso2.org">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:retrieveTenants/>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:retrieveTenantsResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org" xmlns:ax2584="http://beans.mgt.tenant.carbon.wso2.org/xsd" xmlns:ax2582="http://beans.common.stratos.carbon.wso2.org/xsd">
                    <ns:return xsi:type="ax2582:TenantInfoBean" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance">
                        <ax2582:active>true</ax2582:active>
                        <ax2582:admin xsi:nil="true" />
                        <ax2582:adminPassword xsi:nil="true" />
                        <ax2582:createdDate>2015­02­13T07:27:17.543+05:30</ax2582:createdDate>
                        <ax2582:email>test@example.com</ax2582:email>
                        <ax2582:firstname xsi:nil="true" />
                        <ax2582:lastname xsi:nil="true" />
                        <ax2582:originatedService xsi:nil="true" />
                        <ax2582:successKey xsi:nil="true" />
                        <ax2582:tenantDomain>example.com</ax2582:tenantDomain>
                        <ax2582:tenantId>1</ax2582:tenantId>
                        <ax2582:usagePlan xsi:nil="true" />
                    </ns:return>
                </ns:retrieveTenantsResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

##### updateTenant()

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Updates the tenant details based on the specified tenantId. To update the password, the respective admin name should be included.</td>
</tr>
<tr class="even">
<th>Permission Level</th>
<td>/permission/protected/manage/modify/tenants</td>
</tr>
<tr class="odd">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>tenantInfoBean</td>
<td>TenantInfoBean</td>
<td>Contains tenant related data</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The domain name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.active</td>
<td>Boolean</td>
<td><p>True - activate the tenant</p>
<p>False- deactivate the tenant</p></td>
</tr>
<tr class="even">
<td>tenantInfoBean.admin</td>
<td>String</td>
<td>The admin username</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.adminPassword</td>
<td>String</td>
<td>The admin password</td>
</tr>
<tr class="even">
<td>tenantInfoBean.createdDate</td>
<td>DateTime</td>
<td>The date and time that the tenant was created</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.email</td>
<td>String</td>
<td>The email address of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.firstname</td>
<td>String</td>
<td>The first name of the tenant</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.lastname</td>
<td>String</td>
<td>The last name of the tenant</td>
</tr>
<tr class="even">
<td>tenantInfoBean.originatedService</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.successKey</td>
<td>String</td>
<td>-</td>
</tr>
<tr class="even">
<td>tenantInfoBean.tenantDomain</td>
<td>String</td>
<td>The tenant domain</td>
</tr>
<tr class="odd">
<td>tenantInfoBean.tenantId</td>
<td>Int</td>
<td>The tenant ID</td>
</tr>
<tr class="even">
<td>tenantInfoBean.usagePlan</td>
<td>String</td>
<td>-</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="even">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
        xmlns:ser="http://services.mgt.tenant.carbon.wso2.org" xmlns:xsd="http://beans.common.stratos.carbon.wso2.org/xsd">
            <soapenv:Header/>
            <soapenv:Body>
                <ser:updateTenant>
                    <!­­Optional:­­>
                    <ser:tenantInfoBean>
                        <!­­Optional:­­>
                        <xsd:active>true</xsd:active>
                        <!­­Optional:­­>
                        <xsd:admin>test</xsd:admin>
                        <!­­Optional:­­>
                        <xsd:adminPassword>testpw</xsd:adminPassword>
                        <!­­Optional:­­>
                        <xsd:createdDate></xsd:createdDate>
                        <!­­Optional:­­>
                        <xsd:email>testuser@example.com</xsd:email>
                        <!­­Optional:­­>
                        <xsd:firstname>test</xsd:firstname>
                        <!­­Optional:­­>
                        <xsd:lastname>user</xsd:lastname>
                        <!­­Optional:­­>
                        <xsd:originatedService></xsd:originatedService>
                        <!­­Optional:­­>
                        <xsd:successKey></xsd:successKey>
                        <!­­Optional:­­>
                        <xsd:tenantDomain>example.com</xsd:tenantDomain>
                        <!­­Optional:­­>
                        <xsd:tenantId>1</xsd:tenantId>
                        <!­­Optional:­­>
                        <xsd:usagePlan></xsd:usagePlan>
                    </ser:tenantInfoBean>
                </ser:updateTenant>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="odd">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Body>
                <ns:updateTenantResponse xmlns:ns="http://services.mgt.tenant.carbon.wso2.org">
                    <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance" />
                </ns:updateTenantResponse>
            </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>
