# Customize the Authentication Endpoint

The authentication endpoint is the URL used in authentication requests. The following sections discuss methods of customizing this endpoint for various scenarios.

## Customize the authentication endpoint URL

The authentication endpoint URL is the location in your web application that contains authentication related pages. To customize this endpoint,

1. Add the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory and change the value of the `login_url` parameter depending on the URL on which the web application should run. 

    ```toml
    [authentication.endpoints] 
    login_url="/sso/login"
    ```

2. Run the web application on the new authentication endpoint URL.

## Customize the request parameters

In addition to the authentication URL itself, you may customize the request parameters sent with the authentication URL by adding the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory.

```toml
[authentication.endpoint.query_params] 
filter_policy = exclude 
filter_parameters = [username]
filter_parameters = [password]
```

!!! note
    In the above configuration, username and password are simply examples. You can add any query parameter of your choosing and here for your request and customize it according to your specifications.

---

## Enable multitenancy for the login page

If your {{product_name}} setup includes multiple tenants, users typically log in by entering their username in the format `username@domain-name`. However, you can simplify this process by displaying a dropdown menu on the login page that lists all available tenants. Users can then select their tenant from the dropdown and enter their username without needing to specify the domain. To enable this feature:

1. Add the following configurations to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory.

    -  This configuration disables the certificate authentication on certain occasions (e.g.
    when working on mobile apps). This makes two-way SSL authentication optional.

        ``` toml
        [transport.https.properties]
        clientAuth="want"
        ```

    - The following configuration enables the Mutual SSL Authenticator.

        ```toml
        [admin_console.authenticator.mutual_ssl_authenticator]
        enable = true
        ```

    - If the `saml_sso_authenticator` is enabled as shown below, set its priority to 0. Otherwise ignore this step.

        ```toml
        [admin_console.authenticator.saml_sso_authenticator]
        enable = true
        priority = 0
        ```

    - Add the following configuration to enable multitenancy.

        ```toml
        [tenant]
        data_listener_urls = ["url1","url2"]
        [tenant.domain_drop_down]
        enable = true
        ```

        !!! note
        
            When configuring the `data_listener_urls` property in the above  configuration, note the
            following.
            
            -  In a clustered setup that has multiple authentication endpoint web applications hosted, list all of them under the `data_listener_urls` property.
            
            -  For authentication endpoint web applications hosted outside the WSO2 Identity Server or in other nodes of a cluster, add the absolute URL within the `data_listener_urls` property.

2. Restart the server using one of the following commands.

    - **Windows** : `wso2server.bat`
    - **Linux/Unix** : `sh wso2server.sh`

3. Once the server is restarted, the **authenticationendpoint.war** file is deployed. The required properties should be configured in the `<IS_HOME>/repository/conf/deployment.toml`. The following are the default values for the properties to be configured.

    ``` toml
    [identity.auth_framework.endpoint] 
    tenant_list_enabled="false"
    hostname_verification_enabled="true"
    mutual_ssl_username="admin"
    client_keystore="wso2carbon.{{default_keystore_ext}}"
    carbon_security_keystore_password="wso2carbon"
    client_truststore="client-truststore.{{default_keystore_ext}}"
    carbon_security_truststore_password="wso2carbon"
    identity_server_service_url="https://localhost:9443"
    username_header="UserName"
    ```

    Make the following updates:

    - Set `tenant_list_enabled` to `true` in order for the tenants to be displayed as a list.
    
    - For the `mutual_ssl_username` property, set a username to be used for mutual SSL authentication. This user needs to have permission to list down tenants.

    - Paths for client keystore and truststore can be relative paths or absolute paths. The default paths point to the keystore and truststore of the Identity Server itself. A new keystore can be created and used for the client if necessary. However, you must set the passwords for `carbon_security_keystore_password` and `carbon_security_truststore_password` appropriately.

    !!! note
        If you are hosting the `autheticationendpoint.war` webapp outside the Identity Server (i.e in a different Tomcat or WSO2 Application Server), you cannot add these configurations to the `<IS_HOME>/repository/conf/deployment.toml` file as the webapp does not have access to it. Instead, the same property file can be found at `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties`.

        The following are the default values for the properties to be used in this file.
        
        ```   
        tenantListEnabled=false
        mutualSSLManagerEnabled=true
        hostname.verification.enabled=true
        mutual.ssl.username=admin
        client.keyStore=./repository/resources/security/wso2carbon.{{default_keystore_ext}}
        Carbon.Security.KeyStore.Password=wso2carbon
        client.trustStore=./repository/resources/security/client-truststore.{{default_keystore_ext}}
        Carbon.Security.TrustStore.Password=wso2carbon
        identity.server.serviceURL=https://localhost:9443/services/
        username.header=UserName
        key.manager.type=SunX509
        trust.manager.type=SunX509
        tls.protocol=TLSv1.2
        app.name=dashboard
        app.password=dashboard
        identity.server.origin=${carbon.protocol}://${carbon.host}:${carbon.management.port}
        ```

        In this scenario, do the following:
        
        - Provide the full URL of the {{product_name}} admin services endpoint to the `identity.server.serviceURL` property in the format `identity.server.serviceURL=https://<ip>:<port>/services`.
            
        -  Set `tenant_list_enabled` to `true` in order for the tenants to be displayed as a list.
        -  For the `mutual_ssl_username` property, set a username to be used for mutual SSL authentication. This user needs to have permission to list down tenants.
    
        -  Paths for client keystore and truststore can be relative paths or absolute paths. The default paths point to the keystore and truststore of the Identity Server itself. A new keystore can be created and used for the client if necessary. However, you must set the passwords for `carbon_security_keystore_password` and `carbon_security_truststore_password` appropriately.

4. For mutual SSL authentication, the public certificate of the {{product_name}} has to be imported to the truststore of the client and the public certificate of the client to the {{product_name}}'s client-truststore.

    To achieve this, execute the following commands from the `<IS_HOME>/repository/resources/security` directory.

    === "Export to client truststore"

        ``` java
        keytool -export -alias wso2carbon -file carbon_public2.crt -keystore wso2carbon.{{default_keystore_ext}} -storetype {{default_keystore_type}} -storepass  wso2carbon
        ```

    === "Import to WSO2 Identity Server truststore"
    
        ``` java
        keytool -import -trustcacerts -alias carbon -file carbon_public2.crt -keystore client-truststore.{{default_keystore_ext}} -storetype {{default_keystore_type}} -storepass wso2carbon
        ```

    !!! note
        If you are not using mutual SSL authentication, you can stop the **MutualSSLManager** from loading the keystore by setting the `mutual_ssl_manager_enabled` property in the `<IS_HOME>/repository/conf/deployment.toml` file to false. This property is enabled by default.

        ``` toml
        mutual_ssl_manager_enabled="false"
        ```
        
        Alternatively, if the authentication endpoint is hosted externally, then set the `mutualSSLManagerEnabled` property to false in `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file.
        
        ``` toml
        mutualSSLManagerEnabled=false
        ```
    
        Make sure to restart the server to apply the configuration changes.

---
## Disable multitenancy for the login page

If you want to disable the tenant domain dropdown list from your SSO login page, follow the steps below.

1. Shutdown {{product_name}} if it is already started.

2. Navigate to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory and do the following:

    - Set the `tenant_list_enabled` property to **false**.

        ``` toml
        [identity.auth_framework.endpoint] 
        tenant_list_enabled = "false"
        ```

        !!! note
        
            If the authentication endpoint is hosted externally, then set the `tenantListEnabled`
            property to false in `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file.
            
            ```bash
            tenantListEnabled=false
            ```

    - Set the following parameter to `false` in the same `deployment.toml` file.

        ``` toml
        [tenant.domain_drop_down]
        enable = false
        ```

    - If you only used `MutualSSLAuthenticator` to list tenant domains, disable it.

        ``` toml
        [admin_console.authenticator.mutual_ssl_authenticator]
        enable = false
        ```

3. Restart the server.

---

## Handle browser back buttons and bookmarked login pages

To gracefully handle scenarios where the user may click the back button from an authenticated application or decides to bookmark the endpoint login page URL, you need to redirect the users to the access URL of the application. To do so,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Specify the access URL of your application as shown below.

    ![service provider access url]({{base_path}}/assets/img/references/`add-access-url-to-app`.png){: style="border: 0.3px solid lightgrey;"}

3. Click **Update** to save the changes.

## Add Custom Filters and Listeners

Filters can be used to perform various pre-processing and post-processing tasks on the requests and responses such as logging and input validation. To configure custom filters, add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` directory.

``` toml
[[authenticationendpoint.filter]]
name="CustomFilter"
class="org.wso2.CustomFilter"
url_pattern="/*"
dispatchers=["FORWARD", "REQUEST"]

[[authenticationendpoint.filter.init_param]]
name="ParamName"
value= "ParamValue"
```

Listeners can be used to monitor and respond to specific events such as the creation or destruction of servlet contexts, sessions, or request objects. To configure custom listeners, add the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

``` toml
[[authenticationendpoint.listener]]
class="org.wso2.CustomListener"
```