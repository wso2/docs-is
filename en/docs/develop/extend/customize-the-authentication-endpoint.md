# Customize the Authentication Endpoint

The authentication endpoint is the authentication URL used in
authentication requests. The following sections discuss methods of
customizing this endpoint for various scenarios. 

---

### Customize the authentication endpoint URL

The authentication endpoint URL is the location in your web application
that contains authentication related pages.

Follow the steps below to customize the authentication endpoint URL:

1.  Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml`  file, and change the value of the login_url parameter depending on the URL on which the web application should run. 

    ```toml
    [authentication.endpoints] 
    login_url="/sso/login"
    ```

2.  Run the web application on the new authentication endpoint URL.

----

## Control the request parameters going to the authentication endpoint

Additional request parameters can be added and customized for the
request sent to the authentication endpoint. To customize this,
add the following configurations in the
`         <IS_HOME>/repository/conf/deployment.toml        `
file.

```toml
[authentication.endpoint.query_params] 
filter_policy = exclude 
filter_parameters = [username]
filter_parameters = [password]
```

!!! note
    
    In the above configuration, username and password are just
    given as examples. You can configure any query parameter here for your
    request and customize it according to your specifications.
    

---

## Load tenants into the dropdown in the login page of the authentication endpoint web application

This section is useful in scenarios where there are multiple tenants
used, where users can login to web applications with their credentials
for their specified tenants. For instance, for a user in the test.com
tenant with the username test1, the user would have to enter the full
username as "test1@test.com" in order to login. Enabling this feature
will load all the available active tenants onto a dropdown list on the
login page of the web application that the authentication endpoint
points to. This means that the test1 user mentioned above can simply
select the tenant he/she belongs to (test.com) from the dropdown list
and only needs to enter the username (i.e., test1) in the username
textbox on the login page, without having to type it with
"@tenant-domain".  
  
Configure the following to enable this feature.

1.  Add the following configuration to the
    `           <IS_HOME>/repository/conf/tomcat/deployment.toml          `
    file. This is done to
    disable the certificate authentication on certain occasions (like
    when working on mobile apps). This makes two-way SSL authentication
    optional.

    ``` toml
    [transport.https.properties]
    clientAuth="want"
    ```

2.  Open the
    `           <IS-HOME>/repository/conf/deployment.toml          `
    file and add the following parameter to enable the Mutual SSL Authenticator.

    ```toml
    [admin_console.authenticator.mutual_ssl_authenticator]
    enable = true
    ```

3.  If the `           saml_sso_authenticator          ` is enabled in the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file, set its priority to 0. Otherwise ignore this step.

    ```toml
    [admin_console.authenticator.saml_sso_authenticator]
    enable = true
    priority = 0
    ```

4.  Add the following configuration into the
    `<IS-HOME>/repository/conf/deployment.toml` file.

    ```toml
    [tenant]
    data_listener_urls = ["url1","url2"]
    [tenant.domain_drop_down]
    enable = true
    ```

    !!! note
    
        When configuring the
        `data_listener_urls` property in the above  configuration, note the
        following.
    
        -   In a clustered setup that has multiple authentication endpoint
            web applications hosted, list all of them under the
            `data_listener_urls` property.
    
        -   For authentication endpoint web applications hosted outside the
            WSO2 Identity Server or in other nodes of a cluster, add the
            absolute URL within the
            `data_listener_urls` property.
    

5.  Restart the server using one of the following commands.

    -   **Windows** : `             wso2server.bat            `

    -   **Linux/Unix** : `             sh wso2server.sh            `

6.  Once the server is restarted, the **authenticationendpoint.war**
    file is deployed. The
    `           <IS_HOME>/repository/conf/deployment.toml         `
    file has to be configured with the required values for properties. The
    following are the default values for the properties to be used in
    this file.

    ``` toml
    [identity.auth_framework.endpoint] 
    tenant_list_enabled="false"
    hostname_verification_enabled="true"
    mutual_ssl_username="admin"
    client_keystore="wso2carbon.jks"
    carbon_security_keystore_password="wso2carbon"
    client_truststore="client-truststore.jks"
    carbon_security_truststore_password="wso2carbon"
    identity_server_service_url="https://localhost:9443/services/"
    username_header="UserName"
    ```

    Do the following updates to this configuration.

    1.  Set `            tenant_list_enabled           ` to
        `            true           ` in order to enable the tenants to
        display as a list.
    2.  For the `             mutual_ssl_username            ` property,
        set the username that is to be used for mutual SSL
        authentication. This user needs to have permission to list down
        tenants. You can add a new username here provided that you
        create a user with that username and grant the following
        permissions to the role of the user.

        **Super Admin Permissions** \> **Manage** \> **Monitor** \>
        **Tenants** \> **List**

    3.  Paths for client keystore and truststore can be relative paths
        or absolute paths. The default paths point to the keystore and
        truststore of the Identity Server itself. A new keystore can be
        created and used for the client if necessary. However, you
        must set the passwords for
        `             carbon_security_keystore_password          ` and
        `             carbon_security_truststore_password            `
        appropriately.

    !!! note
    
        If you are hosting the
        `           autheticationendpoint.war          ` webapp outside the
        Identity Server (i.e in a different Tomcat or WSO2 Application
        Server), then you cannot use the
        `           <IS_HOME>/repository/conf/deployment.toml          `
        file because the webapp does not have access to this file. Instead,
        the same property file can be found at
        `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties`.
    
        The following are the default values for the properties to be used in this file.
        
        ```    
        tenantListEnabled=false
        mutualSSLManagerEnabled=true
        hostname.verification.enabled=true
        mutual.ssl.username=admin
        client.keyStore=./repository/resources/security/wso2carbon.jks
        Carbon.Security.KeyStore.Password=wso2carbon
        client.trustStore=./repository/resources/security/client-truststore.jks
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
        
        -   Provide the full URL to WSO2 Identity Server’s admin services endpoint in the
            `             identity.server.serviceURL            ` property following the format below.
            `identity.server.serviceURL=https://<ip>:<port>/services`
            
        -  Set `tenantListEnabled` to
            `            true           ` in order to enable the tenants to
            display as a list.
        -  For the `mutual.ssl.username` property,
            set the username that is to be used for mutual SSL
            authentication. This user needs to have permission to list down
            tenants. You can add a new username here provided that you
            create a user with that username and grant the following
            permissions to the role of the user.
    
            **Super Admin Permissions** \> **Manage** \> **Monitor** \>
            **Tenants** \> **List**
    
        -  Paths for client keystore and truststore can be relative paths
            or absolute paths. The default paths point to the keystore and
            truststore of the Identity Server itself. A new keystore can be
            created and used for the client if necessary. However, you
            must set the passwords for
            `Carbon.Security.KeyStore.Password` and
            `Carbon.Security.TrustStore.Password`
            appropriately.
            
        1. For more information about hosting the authentication endpoint on a different server, refer [here](/develop/extend/host-authentication-endpoint-on-a-different-server/).
        2. For more information about hosting the authentication endpoint on a different server, refer [here](../../develop/extend/host-authentication-endpoint-on-a-different-server/). 
        3. For more information about hosting the authentication endpoint on a different server, refer [here](/../../develop/extend/host-authentication-endpoint-on-a-different-server/).    
        4. For more information about hosting the authentication endpoint on a different server, refer [here](develop/extend/host-authentication-endpoint-on-a-different-server/).
        5. For more information about hosting the authentication endpoint on a different server, refer [here](../../../develop/extend/host-authentication-endpoint-on-a-different-server/).

7.  For mutual SSL authentication, the public certificate of the
    Identity Server has to be imported to the truststore of the client
    and the public certificate of the client has to be imported to the
    client-truststore of Identity Server.

    **Sample commands**

    The following two commands are examples if you are using the
    keystore and client-truststore of the Identity Server itself for the
    client. This is executed from the
    `             <IS_HOME>/repository/resources/security            `
    directory.

    ``` java
    keytool -export -alias wso2carbon -file carbon_public2.crt -keystore wso2carbon.jks -storepass wso2carbon
    ```

    ``` java
    keytool -import -trustcacerts -alias carbon -file carbon_public2.crt -keystore client-truststore.jks -storepass wso2carbon
    ```

    !!! note
    
        If you are not using mutual SSL authentication, you can stop the
        **MutualSSLManager** from loading the keystore by
        setting the `           mutual_ssl_manager_enabled          `
        property in the `<IS_HOME>/repository/conf/deployment.toml`
        file to false.
        This property is enabled by default.
    
        ``` toml
        mutual_ssl_manager_enabled="false"
        ```
        
        Alternatively, if the authentication endpoint is hosted externally, then set the `mutualSSLManagerEnabled` 
        property to false in `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file.
        
        ```
        mutualSSLManagerEnabled=false
        ```
    
        Make sure to restart the server to apply the configuration changes.
        
---
## Remove the tenant list from the login page

If it is required to remove the tenant domain dropdown list in SSO Login
page, follow the steps below.

1.  Shutdown the server if it is already started.

2.  Navigate to `<IS_HOME>/repository/conf/deployment.toml` file.

3.  Set the
    `            tenant_list_enabled           ` property to **false**.
    ``` toml
    [identity.auth_framework.endpoint] 
    tenant_list_enabled = "false"
    ```
    
    !!! note
        Alternatively, if the authentication endpoint is hosted externally, then set the `tenantListEnabled` 
        property to false in `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file.
    
        ```
        tenantListEnabled=false
        ```

4.  Set following parameter to
    `           false          `.

    ``` toml
    [tenant.domain_drop_down]
    enable = false
    ```

5.  If the `           MutualSSLAuthenticator          ` is only used
    for the purpose of listing tenant domains in the drop down, disable
    it in the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file.

    ``` toml
    [admin_console.authenticator.mutual_ssl_authenticator]
    enable = false
    ```

6.  Restart the server.

---

## Handle the browser back button and bookmarked login page

This section describes how to enhance the usability of authentication
endpoint webapp with different user behavioral patterns. One such
behavioral pattern is that the user may click the back button from
authenticated application or keep the endpoint login page URL
bookmarked. In such situations, the user should be directed to the
appropriate page.

Let's see how this can be achieved.

First, you need to add a registry resource that will contain the
redirect URLs of different service providers. To do that, follow the
below steps:

1.  Start the Identity Server and log in to the Management Console.

2.  Navigate to **Main** > **Registry** > **Browse** to
    see the registry browser.  
    
    ![Registry Browse menu item](../../assets/img/guides/registry.png)

3.  Browse the registry and go to
    `          /_system/config/identity/config         `.
     
    ![Registry browser](../../assets/img/extend/registry-browser.png)

4.  Click **Add Resource**.  
    
    ![Add registy resource](../../assets/img/extend/add-registry-resource.png)

5.  Fill the form with following information.
    -   Method : Select **Create Text content** from the dropdown.

    -   Name : Enter **relyingPartyRedirectUrls** as Name.

    ![Add registry resource form](../../assets/img/extend/add-registry-resource-form.png) 

6.  Click the **Add** button. The created registry resource can be seen
    once you click on **Add** button.  
    
    ![Added registry resource](../../assets/img/extend/added-registry-resource.png) 

7.  Click on the added resource (relyingPartyRedirectUrls). You can see
    the **Properties** section.  
    
    ![Registry resource properties](../../assets/img/extend/registry-resource-properties.png) 

8.  Click the `+` sign at the right hand corner of **Properties**
    section. This allows you to add a property to the resource.

9.  Click **Add New Property**.  
    
    ![Registry resource Add New Property option](../../assets/img/extend/registry-resource-add-new-property.png)

10. Enter the relying party name for name and the redirect URL for
    value.  
    
    ![Registy resource Add New Property form](../../assets/img/extend/registry-resource-add-new-property-form.png)

    !!! note
    
        The redirectURL is the URL you want the application to be redirected
        when the back button is pressed.
    

    !!! info
        
        -  Note the following settings:
            - Relying party for SAML = Issuer Name
            - Relying party for Oauth2 = OAuth Client Key  

        - Following are two sample values for Name and value:
            - Name : USER_PORTAL
            - Value : https://localhost:9443/user-portal/overview        

        - If you are using travelocity as the sample app, you can use the below values:
            - Name : travelocity.com
            - Value : http://localhost:8080/travelocity.com/home.jsp

11. Once you fill the name and the value, click the **Add** button.

12. Now try out the back button and book marking scenarios.

    !!! note
    
        These configurations are per-tenant. You need to do this
        configuration after logging into Service Providers tenant Admin
        Console.
    
