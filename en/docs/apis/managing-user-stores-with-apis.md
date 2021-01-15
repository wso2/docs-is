# Manage UserStores with APIs

The `UserStoreConfigAdminService` allows you to add, retrieve, edit, and delete user stores within WSO2 Identity Server. 

This section guides you through invoking and working with the `UserStoreConfigAdminService` and the operations you can work within this service.

## Invoke the admin service

`UserStoreConfigAdminService` is an admin service of WSO2 Identity Server. As admin services are secured to prevent anonymous invocations, you cannot view the WSDL of the admin service by
default. Follow the steps below to view and invoke it:

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and set the `admin_service.wsdl` element to `true`.

    ```toml
    [admin_service.wsdl]
    enable = "true"
    ```

2.  Restart WSO2 Identity Server.
3.  If you have started WSO2 Identity Server in default configurations, use the following URL in your browser to see the WSDL of the admin service:
    <https://localhost:9443/services/UserStoreConfigAdminService?wsdl>.

    !!! info

        For more information on WSO2 admin services and how to invoke an admin service using either SoapUI or any other client program, see [Calling
        Admin Services](../../apis/calling-admin-services).

---

## API operations

The following operations are available in **UserStoreConfigAdminService**.

### addUserStore()

<table>
    <tbody>
        <tr class="even">
            <th>Description</th>
            <td>This operation adds a secondary user store.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
                <p>
                    <ul>
                        <li><code>className</code> <code>[string]</code>: This is the user store manager class name. A list of available class names can be obtained using the <a href="#getavailableuserstoreclasses">getAvailableUserStoreClasses</a> function.</li>
                        <li><code>description</code><code>[string]</code> : This is the description of the user store.</li>
                        <li><code>disabled</code><code>[boolean]</code> : To disable, mark as <code>true</code>. To enable, mark as <code>false</code>.</li>
                        <li><code>domainID</code><code>[string]</code> : This is the domain name of the user store. This is a unique name that identifies the user store.</li>
                        <li><code>properties</code><code>[property]</code> : These are various properties related to the user store such as connection URL and connection password.</li>
                        <li><code>properties.name</code><code>[string]</code> : This is the name of the property.</li>
                        <li><code>properties.value</code><code>[string]</code> : This is the value of the property.</li>
                    </ul>
                </p>
                <p>
                    <div class="admonition tip">
                        <p class="admonition-title">Tip</p>
                        <p>For a full list of possible input parameters including optional parameters, see the relevant topic from the following list depending on the type of user store you are creating:</p>
                            <ul>    
                                <li><a href="../../../guides/identity-lifecycles/configuring-a-jdbc-user-store">Properties used in JDBC user store manager</a></li>
                                <li><a href="../../../guides/identity-lifecycles/configuring-a-read-write-active-directory-user-store">Properties used in Read-write Active Directory user store manager</a></li>
                                <li><a href="../../../guides/identity-lifecycles/configuring-a-read-only-ldap-user-store">Properties used in Read-only LDAP user store manager</a></li>
                                <li><a href="../../../guides/identity-lifecycles/configuring-a-read-write-ldap-user-store">Properties used in Read-write LDAP user store manager</a></li>
                                <li><a href="../../../extend/user-management-for-developers/carbon-remote-user-store-manager">Properties used in Carbon Remote user store manager</a></li>
                            </ul>
                        <p>Note that some of these parameters such as connection URL, username, password, and driver name are mandatory when creating a secondary keystore. See the relevant sample request in the code block below.</p>
                    </div>
                </p>
            </td>
        </tr>
        <tr>
            <th>Requests</th>
            <td>See below</td>
        </tr>
    </tbody>
</table>

??? info "Click to view requests"

    ``` xml tab="JDBC"
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

    ``` xml tab="Active Directory"
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

    ``` xml tab="Read Only LDAP"
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

    ``` xml tab="Read Write LDAP"
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

    ``` xml tab="Carbon Reomte"
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
---

### changeUserStoreState()

<table>
    <tbody>
    <tr class="even">
        <th>Description</th>
        <td>This enables or disables the user store.</td>
    </tr>
    <tr class="odd">
        <th>Permission Level</th>
        <td>/permission/admin</td>
    </tr>
    <tr class="even">
        <th>Input Parameters</th>
        <td>
            <ul>
                <li><code>domain</code> <code>[string]</code>: This domain name of the user store.</li>
                <li><code>isDisable</code> <code>[string]</code>: To disable, mark as <code>true</code>. To enable, mark as <code>false</code>.</li>
            </ul>
        </td>
    </tr>
    <tr class="odd">
        <th>Output Parameters</th>
        <td>A boolean parameter indicating if the user store is read only or not.</td>
    </tr>
    <tr>
        <th>Request</th>
        <td>See below</td>
    </tr>
    </tbody>
</table>

??? info "Click to view request"

    ``` xml tab="Request"
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
---

### deleteUserStore()

<table>
    <tbody>
        <tr class="even">
            <th>Description</t>
            <td>This operation deletes a user store.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
                <ul>
                    <li><code>domainName</code> <code>[string]</code>: This is the domain name of the user store. This is a unique name that identifies the user store.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>        
    </tbody>
</table>

??? info "Click to view request"
    ``` xml tab="Request"
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
---

### deleteUserStoresSet()

<table>
    <tbody>
        <tr class="even">
            <th>Description</th>
            <td>This operation deletes multiple user stores.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
                <ul>
                    <li><code>domains</code> <code>[string]</code>: This is array of domain names of the user stores that are to be deleted.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
    </tbody>
</table>

??? info "Click to view request"

    ``` xml tab="Request"
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

---

### editUserStore()

<table>
    <tbody>
        <tr class="even">
            <th>Description</th>
            <td>This is operation edits a user store.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
                <p>
                    <ul>
                        <li><code>className</code> <code>[string]</code>: This is the user store manager class name. A list of available class names can be obtained using the <a href="  #getavailableuserstoreclasses">getAvailableUserStoreClasses</a> function.</li>
                        <li><code>description</code><code>[string]</code> : This is the description of the user store.</li>
                        <li><code>disabled</code><code>[boolean]</code> : To disable, mark as <code>true</code>. To enable, mark as <code>false</code>.</li>
                        <li><code>domainID</code><code>[string]</code> : This is the domain name of the user store. This is a unique name that identifies the user store.</li>
                        <li><code>properties</code><code>[property]</code> : These are various properties related to the user store such as connection URL and connection password.</li>
                        <li><code>properties.name</code><code>[string]</code> : This is the name of the property.</li>
                        <li><code>properties.value</code><code>[string]</code> : This is the value of the property.</li>
                    </ul>
                </p>
                <p>
                    <div class="admonition tip">
                        <p class="admonition-title">Tip</p>
                        <p>To use this operation, do the following:</p>
                            <ol>    
                                <li>Use the <a href="#getsecondaryrealmconfigurations">getSecondaryRealmConfigurations</a> operation to retrieve the unique ID of the userstore.</li>
                                <li>Include the Unique ID as a property when sending the <code>editUserStore()</code> request as seen in the sample request below.</li>
                                <pre><code>&lt;!--Optional:--&gt;
    &lt;xsd1:name&gt;UniqueID&lt;/xsd1:name&gt;
    &lt;!--Optional:--&gt;
    &lt;xsd1:value&gt;467eebo-3f96-4cad-9578-7ae3fe450yhe&lt;/xsd1:value&gt;
                                </code></pre>
                            </ol>                        
                    </div>
                </p>
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
    </tbody>
</table>

??? info "Click to view request"

    ``` xml tab="Request"
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

---

### editUserStoreWithDomainName()

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation edits a user store and change its domain name.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>
                <ul>
                    <li><code>className</code> <code>[string]</code>: This is the user store manager class name. A list of available class names can be obtained using the <a href="  #getavailableuserstoreclasses">getAvailableUserStoreClasses</a> function.</li>
                    <li><code>description</code><code>[string]</code> : This is the description of the user store.</li>
                    <li><code>disabled</code><code>[boolean]</code> : To disable, mark as <code>true</code>. To enable, mark as <code>false</code>.</li>
                    <li><code>domainID</code><code>[string]</code> : This is the domain name of the user store. This is a unique name that identifies the user store.</li>
                    <li><code>properties</code><code>[property]</code> : These are various properties related to the user store such as connection URL and connection password.</li>
                    <li><code>properties.name</code><code>[string]</code> : This is the name of the property.</li>
                    <li><code>properties.value</code><code>[string]</code> : This is the value of the property.</li>
                </ul>                
            </td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view request"

    ``` xml tab="Request"
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

---

### getAvailableUserStoreClasses()

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the available user store classes.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>None</td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view request and response"

    ``` xml tab="Request"
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
       <soapenv:Header/>
       <soapenv:Body>
          <xsd:getAvailableUserStoreClasses/>
       </soapenv:Body>
    </soapenv:Envelope>
    ```
 
    ``` xml tab="Response"
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

---

### getSecondaryRealmConfigurations()

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the configurations of secondary user stores.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>None</td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view request and response"

    ``` xml tab="Request"
    <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsd="http://org.apache.axis2/xsd">
       <soap:Header/>
       <soap:Body>
          <xsd:getSecondaryRealmConfigurations/>
       </soap:Body>
    </soap:Envelope>
    ```

    ``` xml tab="Response"
    <soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
       <soapenv:Body>
          <ns:getSecondaryRealmConfigurationsResponse xmlns:ns="http://org.apache.axis2/xsd">
             <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
          </ns:getSecondaryRealmConfigurationsResponse>
       </soapenv:Body>
    </soapenv:Envelope>
    ```

---

### getUserStoreManagerProperties()

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation retrieves the properties of secondary user stores.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>None</td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view request and response"

    ``` xml tab="Request"
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

    ``` xml tab="Response"
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

---

### testRDBMSConnection()

<table>
    <tbody>        
        <tr class="even">
            <th>Description</th>
            <td>This operation tests the connection to the datasource used by a JDBC user store manager.</td>
        </tr>
        <tr class="odd">
            <th>Permission Level</th>
            <td>/permission/admin</td>  
        </tr>
        <tr class="even">
            <th>Input Parameters</th>
            <td>None</td>
        </tr>
        <tr>
            <th>Request</th>
            <td>See below</td>
        </tr>
        <tr>
            <th>Response</th>
            <td>See below</td>
        </tr>
    </tbody>    
</table>

??? info "Click to view request and response"

    ``` xml tab="Request"
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

    ``` xml tab="Response"
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
