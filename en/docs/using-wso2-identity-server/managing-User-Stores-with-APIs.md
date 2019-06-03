# Managing User Stores with APIs

The **UserStoreConfigAdminService** allows you to add, retrieve, edit,
and delete user stores within the WSO2 Identity Server. This section
guides you through invoking and working with the
**UserStoreConfigAdminService** and the operations you can work within
this service.

-   [Invoking the admin
    service](#ManagingUserStoreswithAPIs-Invokingtheadminservice)
-   [Operations included in the API and sample
    requests](#ManagingUserStoreswithAPIs-OperationsincludedintheAPIandsamplerequests)

### Invoking the admin service

`         UserStoreConfigAdminService        ` is an admin service of
the WSO2 Carbon platform. As admin services are secured to prevent
anonymous invocations, you cannot view the WSDL of the admin service by
default. Follow the steps below to view and invoke it:

1.  Set the `           <HideAdminServiceWSDLs>          ` element to
    `           false          ` in
    `           <IS_HOME>/repository/conf/carbon.xml          ` file.

    ``` xml
    <HideAdminServiceWSDLs>false</HideAdminServiceWSDLs>
    ```

2.  Restart the Identity Server.
3.  If you have started the server in default configurations, use the
    following URL in your browser to see the WSDL of the admin service:
    <https://localhost:9443/services/UserStoreConfigAdminService?wsdl> .

For more information on WSO2 admin services and how to invoke an admin
service using either SoapUI or any other client program, see [Calling
Admin Services from
Apps](https://docs.wso2.org/display/Carbon420/Calling+Admin+Services+from+Apps)
section in WSO2 Carbon documentation.

### Operations included in the API and sample requests

The following operations are available in the
**UserStoreConfigAdminService** :

-   [addUserStore()](#ManagingUserStoreswithAPIs-addUserStore())
-   [changeUserStoreState()](#ManagingUserStoreswithAPIs-changeUserStoreState())
-   [deleteUserStore()](#ManagingUserStoreswithAPIs-deleteUserStore())
-   [deleteUserStoresSet()](#ManagingUserStoreswithAPIs-deleteUserStoresSet())
-   [editUserStore()](#ManagingUserStoreswithAPIs-editUserStore())
-   [editUserStoreWithDomainName()](#ManagingUserStoreswithAPIs-editUserStoreWithDomainName())
-   [getAvailableUserStoreClasses()](#ManagingUserStoreswithAPIs-getAvailableUserStoreClasses())
-   [getSecondaryRealmConfigurations()](#ManagingUserStoreswithAPIs-getSecondaryRealmConfigurations())
-   [getUserStoreManagerProperties()](#ManagingUserStoreswithAPIs-getUserStoreManagerProperties())
-   [testRDBMSConnection()](#ManagingUserStoreswithAPIs-testRDBMSConnection())

##### addUserStore()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>addUserStore</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Add a secondary user store.</td>
</tr>
<tr class="odd">
<td>Permission Level</td>
<td>/permission/admin</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="content-wrapper">
<div class="table-wrap">
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
<td>className</td>
<td>string</td>
<td><p>The user store manager class name.<br />
A list of available class names can be obtained using the <a href="#ManagingUserStoreswithAPIs-getAvailableUserStoreClasses()">getAvailableUserStoreClasses</a> function.</p></td>
</tr>
<tr class="even">
<td>description</td>
<td>string</td>
<td>Description of the user store.</td>
</tr>
<tr class="odd">
<td>disabled</td>
<td>boolean</td>
<td><p>Mark as <strong>true</strong> to disable the user store.<br />
Mark as <strong>false</strong> to enable the user store.</p></td>
</tr>
<tr class="even">
<td>domainID</td>
<td>string</td>
<td>Domain name of the user store.<br />
This is a unique name that identifies the user store.</td>
</tr>
<tr class="odd">
<td>properties</td>
<td>property</td>
<td>Various properties related to the user store such as connection URL, connection password etc.</td>
</tr>
<tr class="even">
<td><a href="http://properties.name">properties.name</a></td>
<td>string</td>
<td>Name of the property.</td>
</tr>
<tr class="odd">
<td>properties.value</td>
<td>string</td>
<td>Value of the property.</td>
</tr>
</tbody>
</table>
</div>
!!! tip
    <p>For a full list of possible input parameters including optional parameters, see the relevant topic from the following list depending on the type of user store you are creating:</p>
    <ul>
    <li><ul>
    <li><a href="https://docs.wso2.com/display/IS540/Configuring+a+JDBC+User+Store#ConfiguringaJDBCUserStore-PropertiesusedinJDBCuserstoremanager">Properties used in JDBC user store manager</a></li>
    <li><a href="https://docs.wso2.com/display/IS540/Configuring+a+Read-write+Active+Directory+User+Store#ConfiguringaRead-writeActiveDirectoryUserStore-PropertiesusedinRead-writeActiveDirectoryuserstoremanager">Properties used in Read-write Active Directory user store manager</a></li>
    <li><a href="https://docs.wso2.com/display/IS540/Configuring+a+Read-only+LDAP+User+Store#ConfiguringaRead-onlyLDAPUserStore-PropertiesusedinRead-onlyLDAPuserstoremanager">Properties used in Read-only LDAP user store manager</a></li>
    <li><a href="https://docs.wso2.com/display/IS540/Configuring+a+Read-write+LDAP+User+Store#ConfiguringaRead-writeLDAPUserStore-PropertiesusedinRead-writeLDAPuserstoremanager">Properties used in Read-write LDAP user store manager</a></li>
    <li><a href="Carbon-Remote-User-Store-Manager_103330074.html#CarbonRemoteUserStoreManager-Configuringacarbonremoteuserstoremanager">Properties used in Carbon Remote user store manager</a></li>
    </ul></li>
    </ul>
    <p>Note that some of these parameters such as connection URL, username, password, and driver name are mandatory when creating a secondary keystore. See the relevant sample request in the code block below.</p>
</div></td>
</tr>
</tbody>
</table>

  
  

-   [**JDBC Userstore**](#a5596ce39f6a4d0e8d69276a904b4b55)
-   [**Active Directory Userstore**](#ed48dc5bf13e42c58e0ecc506ad5d1ba)
-   [**Read Only LDAP Userstore**](#538940c9b8ee47069f797ba9704a1d53)
-   [**Read Write LDAP Userstore**](#9053379f73b24b5b9bce83248e6e9339)
-   [**Carbon Remote Userstore**](#cd5c3d697938408f901a4ba193c1215f)

**Request**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:addUserStore>
            <!--Optional:-->
            <xsd:userStoreDTO>
                <!--Optional:-->
                <xsd1:className>org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager</xsd1:className>
                <!--Optional:-->
                <xsd1:description></xsd1:description>
                <!--Optional:-->
                <xsd1:disabled>false</xsd1:disabled>
                <!--Optional:-->
                <xsd1:domainId>JDBC-SECONDARY</xsd1:domainId>
                <!--Zero or more repetitions:-->
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>url</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>jdbc:mysql://192.168.48.154:3306/test</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>userName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>password</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>driverName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>com.mysql.jdbc.Driver</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxActive</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>50</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxWait</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>60000</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>validationQuery</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>SELECT 1</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>UsernameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>RoleNameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
            </xsd:userStoreDTO>
        </xsd:addUserStore>
    </soap:Body>
</soap:Envelope>
```

**Request**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:addUserStore>
            <!--Optional:-->
            <xsd:userStoreDTO>
                <!--Optional:-->
                <xsd1:className>org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager</xsd1:className>
                <!--Optional:-->
                <xsd1:description></xsd1:description>
                <!--Optional:-->
                <xsd1:disabled>false</xsd1:disabled>
                <!--Optional:-->
                <xsd1:domainId>AD-SECONDARY</xsd1:domainId>
                <!--Zero or more repetitions:-->
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>url</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>jdbc:mysql://192.168.48.154:3306/test</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>userName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>password</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>driverName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>com.mysql.jdbc.Driver</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxActive</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>50</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxWait</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>60000</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>validationQuery</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>SELECT 1</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>UsernameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>RoleNameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
            </xsd:userStoreDTO>
        </xsd:addUserStore>
    </soap:Body>
</soap:Envelope>
```

**Request**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:addUserStore>
            <!--Optional:-->
            <xsd:userStoreDTO>
                <!--Optional:-->
                <xsd1:className>org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager</xsd1:className>
                <!--Optional:-->
                <xsd1:description></xsd1:description>
                <!--Optional:-->
                <xsd1:disabled>false</xsd1:disabled>
                <!--Optional:-->
                <xsd1:domainId>ReadOnly-LDAP-SECONDARY</xsd1:domainId>
                <!--Zero or more repetitions:-->
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>url</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>jdbc:mysql://192.168.48.154:3306/test</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>userName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>password</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>driverName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>com.mysql.jdbc.Driver</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxActive</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>50</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxWait</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>60000</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>validationQuery</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>SELECT 1</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>UsernameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>RoleNameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
            </xsd:userStoreDTO>
        </xsd:addUserStore>
    </soap:Body>
</soap:Envelope>
```

**Request**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:addUserStore>
            <!--Optional:-->
            <xsd:userStoreDTO>
                <!--Optional:-->
                <xsd1:className>org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager</xsd1:className>
                <!--Optional:-->
                <xsd1:description></xsd1:description>
                <!--Optional:-->
                <xsd1:disabled>false</xsd1:disabled>
                <!--Optional:-->
                <xsd1:domainId>Read-write-LDAP-SECONDARY</xsd1:domainId>
                <!--Zero or more repetitions:-->
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>url</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>jdbc:mysql://192.168.48.154:3306/test</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>userName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>password</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>driverName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>com.mysql.jdbc.Driver</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxActive</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>50</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxWait</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>60000</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>validationQuery</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>SELECT 1</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>UsernameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>RoleNameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
            </xsd:userStoreDTO>
        </xsd:addUserStore>
    </soap:Body>
</soap:Envelope>
```

**Request**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsd="http://org.apache.axis2/xsd"
    xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:addUserStore>
            <!--Optional:-->
            <xsd:userStoreDTO>
                <!--Optional:-->
                <xsd1:className>org.wso2.carbon.identity.user.store.remote.CarbonRemoteUserStoreManger</xsd1:className>
                <!--Optional:-->
                <xsd1:description></xsd1:description>
                <!--Optional:-->
                <xsd1:disabled>false</xsd1:disabled>
                <!--Optional:-->
                <xsd1:domainId>CARBON-REMOTE-SECONDARY</xsd1:domainId>
                <!--Zero or more repetitions:-->
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>url</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>jdbc:mysql://192.168.48.154:3306/test</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>userName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>password</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>root</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>driverName</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>com.mysql.jdbc.Driver</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxActive</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>50</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>maxWait</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>60000</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <!--Optional:-->
                    <xsd1:name>validationQuery</xsd1:name>
                    <!--Optional:-->
                    <xsd1:value>SELECT 1</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>UsernameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>RoleNameJavaScriptRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
                <xsd1:properties>
                    <xsd1:name>PasswordJavaRegEx</xsd1:name>
                    <xsd1:value>^[\S]{5,30}$</xsd1:value>
                </xsd1:properties>
            </xsd:userStoreDTO>
        </xsd:addUserStore>
    </soap:Body>
</soap:Envelope>
```

##### changeUserStoreState()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>changeUserStoreState</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Enable or disable the user store.</td>
</tr>
<tr class="odd">
<td>Permission Level</td>
<td>/permission/admin</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
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
<td>string</td>
<td>Domain name of the user store.</td>
</tr>
<tr class="even">
<td>isDisable</td>
<td>string</td>
<td>Mark as <strong>true</strong> to disable the user store.<br />
Mark as <strong>false</strong> to enable the user store.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<td>Output Parameters</td>
<td>A boolean parameter indicating if the user store is read only or not</td>
</tr>
</tbody>
</table>

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:changeUserStoreState>
         <!--Optional:-->
         <xsd:domain>CARBON-REMOTE-SECONDARY</xsd:domain>
         <!--Optional:-->
         <xsd:isDisable>true</xsd:isDisable>
      </xsd:changeUserStoreState>
   </soapenv:Body>
</soapenv:Envelope>
```

##### deleteUserStore()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>deleteUserStore</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Delete a user store.</td>
</tr>
<tr class="odd">
<td>Permission Level</td>
<td>/permission/admin</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
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
<td>domainName</td>
<td>string</td>
<td>Domain name of the user store.<br />
This is a unique name that identifies the user store.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:deleteUserStore>
         <!--Optional:-->
         <xsd:domainName>CARBON-REMOTE-SECONDARY</xsd:domainName>
      </xsd:deleteUserStore>
   </soapenv:Body>
</soapenv:Envelope>
```

##### deleteUserStoresSet()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>deleteUserStoresSet</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Delete multiple user stores.</td>
</tr>
<tr class="odd">
<td>Permission Level</td>
<td>/permission/admin</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
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
<td>domains</td>
<td>string</td>
<td>Array of domain names of the user stores that are to be deleted.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:deleteUserStoresSet>
         <!--Zero or more repetitions:-->
         <xsd:domains>ADSECONDARY,JDBCSECONDARY</xsd:domains>
      </xsd:deleteUserStoresSet>
   </soapenv:Body>
</soapenv:Envelope>
```

##### editUserStore()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>editUserStore</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Edit a user store.</td>
</tr>
<tr class="odd">
<td>Permission Level</td>
<td>/permission/admin</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
<td><div class="content-wrapper">
<div class="table-wrap">
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
<td>className</td>
<td>string</td>
<td>The user store manager class name.<br />
A list of available class names can be obtained using the <a href="#ManagingUserStoreswithAPIs-getAvailableUserStoreClasses()">getAvailableUserStoreClasses</a> function.</td>
</tr>
<tr class="even">
<td>description</td>
<td>string</td>
<td>Description of the user store.</td>
</tr>
<tr class="odd">
<td>disabled</td>
<td>boolean</td>
<td><p>Mark as <strong>true</strong> to disable the user store.<br />
Mark as <strong>false</strong> to enable the user store.</p></td>
</tr>
<tr class="even">
<td>domainID</td>
<td>string</td>
<td>Domain name of the user store.<br />
This is a unique name that identifies the user store.</td>
</tr>
<tr class="odd">
<td>properties</td>
<td>property</td>
<td>Various properties related to the user store such as connection URL, connection password etc.</td>
</tr>
<tr class="even">
<td><a href="http://properties.name/">properties.name</a></td>
<td>string</td>
<td>Name of the property.</td>
</tr>
<tr class="odd">
<td>properties.value</td>
<td>string</td>
<td>Value of the property.</td>
</tr>
</tbody>
</table>
</div>
<br />
!!! tip
    <p><strong>Tip:</strong> To use this operation, do the following:</p>
    <ol>
    <li>Use the <a href="#ManagingUserStoreswithAPIs-getSecondaryRealmConfigurations()">getSecondaryRealmConfigurations</a> operation to retrieve the unique ID of the userstore.</li>
    <li><p>Include the Unique ID as a property when sending the editUserStore() request as seen in the sample request below.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;!--Optional:--&gt;</a>
    <a class="sourceLine" id="cb1-2" title="2">&lt;xsd1:name&gt;UniqueID&lt;/xsd1:name&gt;</a>
    <a class="sourceLine" id="cb1-3" title="3">&lt;!--Optional:--&gt;</a>
    <a class="sourceLine" id="cb1-4" title="4">&lt;xsd1:value&gt;467eebo-3f96-4cad-<span class="dv">9578</span>-7ae3fe450yhe&lt;/xsd1:value&gt;</a></code></pre></div>
    </div>
    </div></li>
    </ol>
</div></td>
</tr>
</tbody>
</table>

**Request**

``` xml
soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:editUserStore>
         <!--Optional:-->
         <xsd:userStoreDTO>
            <!--Optional:-->
            <xsd1:className>?</xsd1:className>
            <!--Optional:-->
            <xsd1:description>?</xsd1:description>
            <!--Optional:-->
            <xsd1:disabled>?</xsd1:disabled>
            <!--Optional:-->
            <xsd1:domainId>?</xsd1:domainId>
            <!--Zero or more repetitions:-->
            <xsd1:properties>
               <!--Optional:-->
               <xsd1:name>UniqueID</xsd1:name>
               <!--Optional:-->
               <xsd1:value>?</xsd1:value>
            </xsd1:properties>
         </xsd:userStoreDTO>
      </xsd:editUserStore>
   </soapenv:Body>
</soapenv:Envelope>
```

##### editUserStoreWithDomainName()

<table>
<tbody>
<tr class="odd">
<td>Method</td>
<td>editUserStoreWithDomainName</td>
</tr>
<tr class="even">
<td>Description</td>
<td>Edit a user store and change its domain name.</td>
</tr>
<tr class="odd">
<td>Permission Level</td>
<td>/permission/admin</td>
</tr>
<tr class="even">
<td>Input Parameters</td>
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
<td>previousDomainName</td>
<td>string</td>
<td>Current domain name of the user store.</td>
</tr>
<tr class="even">
<td>className</td>
<td>string</td>
<td>The user store manager class name.<br />
A list of available class names can be obtained using the <a href="#ManagingUserStoreswithAPIs-getAvailableUserStoreClasses()">getAvailableUserStoreClasses</a> function.</td>
</tr>
<tr class="odd">
<td>description</td>
<td>string</td>
<td>Description of the user store.</td>
</tr>
<tr class="even">
<td>disabled</td>
<td>boolean</td>
<td><p>Mark as <strong>true</strong> to disable the user store.<br />
Mark as <strong>false</strong> to enable the user store.</p></td>
</tr>
<tr class="odd">
<td>domainID</td>
<td>string</td>
<td>New domain name of the user store.</td>
</tr>
<tr class="even">
<td>properties</td>
<td>property</td>
<td>Various properties related to the user store such as connection URL, connection password etc.</td>
</tr>
<tr class="odd">
<td><a href="http://properties.name/">properties.name</a></td>
<td>string</td>
<td>Name of the property.</td>
</tr>
<tr class="even">
<td>properties.value</td>
<td>string</td>
<td>Value of the property.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
</tbody>
</table>

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:editUserStoreWithDomainName>
         <!--Optional:-->
         <xsd:previousDomainName>?</xsd:previousDomainName>
         <!--Optional:-->
         <xsd:userStoreDTO>
            <!--Optional:-->
            <xsd1:className>?</xsd1:className>
            <!--Optional:-->
            <xsd1:description>?</xsd1:description>
            <!--Optional:-->
            <xsd1:disabled>?</xsd1:disabled>
            <!--Optional:-->
            <xsd1:domainId>?</xsd1:domainId>
            <!--Zero or more repetitions:-->
            <xsd1:properties>
               <!--Optional:-->
               <xsd1:name>?</xsd1:name>
               <!--Optional:-->
               <xsd1:value>?</xsd1:value>
            </xsd1:properties>
         </xsd:userStoreDTO>
      </xsd:editUserStoreWithDomainName>
   </soapenv:Body>
</soapenv:Envelope>
```

##### getAvailableUserStoreClasses()

|                  |                                            |
|------------------|--------------------------------------------|
| Method           | getAvailableUserStoreClasses               |
| Description      | Retrieve the available user store classes. |
| Permission Level | /permission/admin                          |
| Input Parameters | None                                       |

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getAvailableUserStoreClasses/>
   </soapenv:Body>
</soapenv:Envelope>
```

**Response**

``` xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
   <soapenv:Body>
      <ns:getAvailableUserStoreClassesResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2466="http://api.user.carbon.wso2.org/xsd" xmlns:ax2462="http://utils.configuration.store.user.identity.carbon.wso2.org/xsd" xmlns:ax2464="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd">
         <ns:return>org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager</ns:return>
         <ns:return>org.wso2.carbon.user.core.ldap.ReadOnlyLDAPUserStoreManager</ns:return>
         <ns:return>org.wso2.carbon.user.core.ldap.ReadWriteLDAPUserStoreManager</ns:return>
         <ns:return>org.wso2.carbon.identity.user.store.remote.CarbonRemoteUserStoreManger</ns:return>
         <ns:return>org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager</ns:return>
      </ns:getAvailableUserStoreClassesResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

##### getSecondaryRealmConfigurations()

|                  |                                                       |
|------------------|-------------------------------------------------------|
| Method           | getSecondaryRealmConfigurations                       |
| Description      | Retrieve the configurations of secondary user stores. |
| Permission Level | /permission/admin                                     |
| Input Parameters | None                                                  |

**Request**

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd">
   <soap:Header/>
   <soap:Body>
      <xsd:getSecondaryRealmConfigurations/>
   </soap:Body>
</soap:Envelope>
```

**Response**

``` xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
   <soapenv:Body>
      <ns:getSecondaryRealmConfigurationsResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:getSecondaryRealmConfigurationsResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

##### getUserStoreManagerProperties()

|                  |                                                   |
|------------------|---------------------------------------------------|
| Method           | getUserStoreManagerProperties                     |
| Description      | Retrieve the properties of secondary user stores. |
| Permission Level | /permission/admin                                 |
| Input Parameters | None                                              |

**Request**

``` xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd">
   <soap:Header/>
   <soap:Body>
      <xsd:getUserStoreManagerProperties>
         <!--Optional:-->
         <xsd:className>org.wso2.carbon.user.core.jdbc.JDBCUserStoreManager</xsd:className>
      </xsd:getUserStoreManagerProperties>
   </soap:Body>
</soap:Envelope>
```

**Response**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getUserStoreManagerPropertiesResponse
            xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:type="ax2384:Properties"
                xmlns:ax2384="http://api.user.carbon.wso2.org/xsd"
                xmlns:ax2386="http://dto.configuration.store.user.identity.carbon.wso2.org/xsd"
                xmlns:ax2388="http://common.ndatasource.carbon.wso2.org/xsd"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance">
                <ax2384:advancedProperties xsi:nil="true"/>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>Connection Name#This should be the DN (Distinguish Name) of the admin user in LDAP</ax2384:description>
                    <ax2384:name>ConnectionName</ax2384:name>
                    <ax2384:value>CN=,DC=</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>Connection URL#Connection URL for the user store</ax2384:description>
                    <ax2384:name>ConnectionURL</ax2384:name>
                    <ax2384:value>ldaps://</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>Connection Password#Password of the admin user</ax2384:description>
                    <ax2384:name>ConnectionPassword</ax2384:name>
                    <ax2384:value/>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>User Search Base#DN of the context under which user entries are stored in LDAP</ax2384:description>
                    <ax2384:name>UserSearchBase</ax2384:name>
                    <ax2384:value>CN=Users,DC=WSO2,DC=Com</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>Diabled#Whether user store is disabled</ax2384:description>
                    <ax2384:name>Disabled</ax2384:name>
                    <ax2384:value>false</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>User Object Class#Filtering criteria for listing all the user entries in LDAP</ax2384:description>
                    <ax2384:name>UserNameListFilter</ax2384:name>
                    <ax2384:value>(objectClass=person)</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>Username Attribute#Attribute used for uniquely identifying a user entry. Users can be authenticated using their email                                   address, uid and
etc</ax2384:description>
                    <ax2384:name>UserNameAttribute</ax2384:name>
                    <ax2384:value>cn</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>User Search Filter#Filtering criteria for searching a particular user entry</ax2384:description>
                    <ax2384:name>UserNameSearchFilter</ax2384:name>
                    <ax2384:value>(&amp;amp;(objectClass=user)(cn=?))</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:mandatoryProperties xsi:type="ax2384:Property">
                    <ax2384:description>User Entry Object Class#Object Class used to construct user entries</ax2384:description>
                    <ax2384:name>UserEntryObjectClass</ax2384:name>
                    <ax2384:value>user</ax2384:value>
                </ax2384:mandatoryProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Group Entry Object Class#Object Class used to construct group entries</ax2384:description>
                    <ax2384:name>GroupEntryObjectClass</ax2384:name>
                    <ax2384:value>group</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Maximum User List Length#Maximum number of users retrieved at once</ax2384:description>
                    <ax2384:name>MaxUserNameListLength</ax2384:name>
                    <ax2384:value>100</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Maximum Role List Length#Maximum number of roles retrieved at once</ax2384:description>
                    <ax2384:name>MaxRoleNameListLength</ax2384:name>
                    <ax2384:value>100</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Enable User Role Cache#This is to indicate whether to cache the role list of a user</ax2384:description>
                    <ax2384:name>UserRolesCacheEnabled</ax2384:name>
                    <ax2384:value>true</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Enable SCIM#Whether SCIM is enabled for the user store</ax2384:description>
                    <ax2384:name>SCIMEnabled</ax2384:name>
                    <ax2384:value>false</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:childProperties xsi:type="ax2384:Property">
                        <ax2384:description>Group Search Base#DN of the context under which user entries are stored in LDAP</ax2384:description>
                        <ax2384:name>GroupSearchBase</ax2384:name>
                        <ax2384:value>CN=Users,DC=WSO2,DC=Com</ax2384:value>
                    </ax2384:childProperties>
                    <ax2384:childProperties xsi:type="ax2384:Property">
                        <ax2384:description>Group Filter#Filtering criteria for listing all the group entries in LDAP</ax2384:description>
                        <ax2384:name>GroupNameListFilter</ax2384:name>
                        <ax2384:value>(objectcategory=group)</ax2384:value>
                    </ax2384:childProperties>
                    <ax2384:childProperties xsi:type="ax2384:Property">
                        <ax2384:description>Group Name Attribute#Attribute used for uniquely identifying a user entry</ax2384:description>
                        <ax2384:name>GroupNameAttribute</ax2384:name>
                        <ax2384:value>cn</ax2384:value>
                    </ax2384:childProperties>
                    <ax2384:childProperties xsi:type="ax2384:Property">
                        <ax2384:description>Membership Attribute#Attribute used to define members of LDAP groups</ax2384:description>
                        <ax2384:name>MembershipAttribute</ax2384:name>
                        <ax2384:value>member</ax2384:value>
                    </ax2384:childProperties>
                    <ax2384:childProperties xsi:type="ax2384:Property">
                        <ax2384:description>Group Search Filter#Filtering criteria for searching a particular group entry</ax2384:description>
                        <ax2384:name>GroupNameSearchFilter</ax2384:name>
                        <ax2384:value>(&amp;amp;(objectClass=group)(cn=?))</ax2384:value>
                    </ax2384:childProperties>
                    <ax2384:description>Read Groups#Specifies whether groups should be read from LDAP</ax2384:description>
                    <ax2384:name>ReadGroups</ax2384:name>
                    <ax2384:value>true</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Group Search Base#DN of the context under which user entries are stored in LDAP</ax2384:description>
                    <ax2384:name>GroupSearchBase</ax2384:name>
                    <ax2384:value>CN=Users,DC=WSO2,DC=Com</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Group Object Class#Filtering criteria for listing all the group entries in LDAP</ax2384:description>
                    <ax2384:name>GroupNameListFilter</ax2384:name>
                    <ax2384:value>(objectcategory=group)</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Group Name Attribute#Attribute used for uniquely identifying a user entry</ax2384:description>
                    <ax2384:name>GroupNameAttribute</ax2384:name>
                    <ax2384:value>cn</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Membership Attribute#Attribute used to define members of LDAP groups</ax2384:description>
                    <ax2384:name>MembershipAttribute</ax2384:name>
                    <ax2384:value>member</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Member Of Attribute#MemberOfAttribute</ax2384:description>
                    <ax2384:name>MemberOfAttribute</ax2384:name>
                    <ax2384:value/>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Group Search Filter#Filtering criteria for searching a particular group entry</ax2384:description>
                    <ax2384:name>GroupNameSearchFilter</ax2384:name>
                    <ax2384:value>(&amp;amp;(objectClass=group)(cn=?))</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Password Hashing Algorithm#Password Hash method to use when storing user entries</ax2384:description>
                    <ax2384:name>PasswordHashMethod</ax2384:name>
                    <ax2384:value>PLAIN_TEXT</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Password RegEx (Javascript)#Policy that defines the password format</ax2384:description>
                    <ax2384:name>PasswordJavaScriptRegEx</ax2384:name>
                    <ax2384:value>^[\S]{5,30}$</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Username RegEx (Javascript)#The regular expression used by the front­end components for username validation</ax2384:description>
                    <ax2384:name>UserNameJavaScriptRegEx</ax2384:name>
                    <ax2384:value>^[\S]{3,30}$</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Username RegEx (Java)#A regular expression to validate user names</ax2384:description>
                    <ax2384:name>UserNameJavaRegEx</ax2384:name>
                    <ax2384:value>[a­zA­Z0­9._­|//]{3,30}$</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Role Name RegEx (Javascript)#The regular expression used by the front­end components for role name validation</ax2384:description>
                    <ax2384:name>RoleNameJavaScriptRegEx</ax2384:name>
                    <ax2384:value>^[\S]{3,30}$</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Role Name RegEx (Java)#A regular expression to validate role names</ax2384:description>
                    <ax2384:name>RoleNameJavaRegEx</ax2384:name>
                    <ax2384:value>[a­zA­Z0­9._­|//]{3,30}$</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Enable Write Groups#Indicate whether write groups enabled</ax2384:description>
                    <ax2384:name>WriteGroups</ax2384:name>
                    <ax2384:value>true</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>User DN Pattern#The patten for user's DN. It can be defined to improve the LDAP search</ax2384:description>
                    <ax2384:name>UserDNPattern</ax2384:name>
                    <ax2384:value>uid={0},ou=Users,dc=wso2,dc=org</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Allow Empty Roles#Specifies whether the underlying user store allows empty roles to be added</ax2384:description>
                    <ax2384:name>EmptyRolesAllowed</ax2384:name>
                    <ax2384:value>true</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Default Realm Name#Default name for the realm</ax2384:description>
                    <ax2384:name>defaultRealmName</ax2384:name>
                    <ax2384:value>WSO2.ORG</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Enable KDC#Whether key distribution center enabled</ax2384:description>
                    <ax2384:name>kdcEnabled</ax2384:name>
                    <ax2384:value>false</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Display Name Attribute#The display name which usually is the combination of the users first name, middle initial, and last name</ax2384:description>
                    <ax2384:name>DisplayNameAttribute</ax2384:name>
                    <ax2384:value>cn</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Is ADLDS Role#Whether an Active Directory Lightweight Directory Services role</ax2384:description>
                    <ax2384:name>isADLDSRole</ax2384:name>
                    <ax2384:value>false</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>User Account Control#Flags that control the behavior of the user account</ax2384:description>
                    <ax2384:name>userAccountControl</ax2384:name>
                    <ax2384:value>512</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Referral#Guides the requests to a domain controller in the correct domain</ax2384:description>
                    <ax2384:name>Referral</ax2384:name>
                    <ax2384:value>follow</ax2384:value>
                </ax2384:optionalProperties>
                <ax2384:optionalProperties xsi:type="ax2384:Property">
                    <ax2384:description>Enable Back Links# Whether to allow attributes to be result from references to the object from other objects</ax2384:description>
                    <ax2384:name>BackLinksEnabled</ax2384:name>
                    <ax2384:value>true</ax2384:value>
                </ax2384:optionalProperties>
            </ns:return>
        </ns:getUserStoreManagerPropertiesResponse>
    </soapenv:Body>
</soapenv:Envelope>
```

##### testRDBMSConnection()

|                  |                                                                          |
|------------------|--------------------------------------------------------------------------|
| Method           | testRDBMSConnection                                                      |
| Description      | Test the connection to the datasource used by a JDBC user store manager. |
| Permission Level | /permission/admin                                                        |
| Input Parameters | None                                                                     |

**Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:testRDBMSConnection>
         <!--Optional:-->
         <xsd:domainName>JDBCSECONDARY</xsd:domainName>
         <!--Optional:-->
         <xsd:driverName>com.mysql.jdbc.Driver</xsd:driverName>
         <!--Optional:-->
         <xsd:connectionURL>jdbc:mysql://192.168.48.154:3306/test</xsd:connectionURL>
         <!--Optional:-->
         <xsd:username>root</xsd:username>
         <!--Optional:-->
         <xsd:connectionPassword>root</xsd:connectionPassword>
         <!--Optional:-->
         <xsd:messageID></xsd:messageID>
      </xsd:testRDBMSConnection>
   </soapenv:Body>
</soapenv:Envelope>
```

**Response**

``` xml
<soapenv:Envelope
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:testRDBMSConnectionResponse
            xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return>true</ns:return>
        </ns:testRDBMSConnectionResponse>
    </soapenv:Body>
</soapenv:Envelope>
```
