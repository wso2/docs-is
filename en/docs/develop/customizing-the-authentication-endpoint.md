# Customizing the Authentication Endpoint

The authentication endpoint is the authentication URL used in
authentication requests. The following sections discuss methods of
customizing this endpoint for various scenarios. 

### Customizing the authentication endpoint URL

The authentication endpoint URL is the location in your web application
that contains authentication related pages.

Follow the steps below to customize the authentication endpoint URL:

1.  Edit the `<IS_HOME>/repository/conf/identity/application-authentication.properties`  file, and change the value of the following parameter depending on the URL that the web application should run. 

    ```
    [authentication.endpoints] 
    login_url="/sso/login"
    ```

    !!! note 
        If you do not change the default value of this configuration,
        accessing the dashboard redirects you to the WSO2 Identity Server
        management console.
    

2.  Run the web application on the new authentication endpoint URL.

### Controlling the request parameters going to the authentication endpoint

Additional request parameters can be added and customized for the
request sent to the authentication endpoint. To customize this,
uncomment the following configurations in the
`         <IS_HOME>/repository/conf/identity/application-authentication.properties        `
file, under the `         [authentication.endpoint.query_params]        ` element.

``` xml
[authentication.endpoint.query_params] 
filter_policy = exclude 
filter_parameters = [username]
filter_parameters = [password]
```

!!! note
    
    In the above configuration, username and password are just
    given as examples. You can configure any query parameter here for your
    request and customize it according to your specifications.
    

### Loading tenants into the dropdown in the login page of the authentication endpoint web application

This section is useful in scenarios where there are multiple tenants
used, where users can login to web applications with their credentials
for their specified tenants. For instance, for a user in the test.com
tenant with the username test1, the user would have to enter the full
username as <test1@test.com> in order to login. Enabling this feature
will load all the available active tenants onto a dropdown list on the
login page of the web application that the authentication endpoint
points to. This means that the test1 user mentioned above can simply
select the tenant he/she belongs to (test.com) from the dropdown list
and only needs to enter the username (i.e., test1) in the username
textbox on the login page, without having to type it with
"@tenant-domain".  
  
Do the following configurations to enable this feature.

1.  Open the
    `           <IS_HOME>/repository/conf/tomcat/catalina-server.xml          `
    file and ensure that the `           clientAuth          ` attribute
    in the `           Connector          ` tag is set to “
    `           want          ` ” as shown below. This is done to
    disable the certificate authentication on certain occasions (like
    when working on mobile apps). This makes two-way SSL authentication
    optional.

    ``` xml
    clientAuth="want"
    ```

    !!! info
        The `            .jar           ` file enabling usage of Mutual SSL
        is shipped with IS by default from IS versions 5.1.0 and upwards.
        The
        `            org.wso2.carbon.identity.authenticator.mutualssl_X.X.X.jar           `
        file can be found in the
        `            <IS_HOME>/repository/components/plugins           `
        directory.

2.  Open the
    `           <IS_HOME>/repository/conf/security/authenticators.properties          `
    file and add the
    `                       enable="true"                     `
    attribute within the `           <Authenticator>          ` tag for
    the `           MutualSSLAuthenticator          ` to enable the
    Mutual SSL Authenticator.

    ``` xml
    [admin_console.authenticator.mutual_ssl_authenticator]
    enable = true
    priority = 5 
    username_header = UserName
    white_list_enabled = false
    white_list =
    ```

3.  If the `           SAML2SSOAuthenticator          ` is enabled in the
    `           <IS_HOME>/repository/conf/security/authenticators.properties          `
    file, set its priority to 0. Otherwise ignore this step.

    ``` xml
    "[admin_console.authenticator.saml_sso_authenticator]
    enable = true
    priority = 0
    ```

4.  Add the following configuration into the
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file under the `           ApplicationAuthentication          ` tag.

    ``` xml
    [tenant]
    data_listener_urls = ["url1","url2"]
    [tenant.domain_drop_down]
    enable = true
    ```

    !!! note
    
        When configuring the
        `           TenantDataListenerURL          ` tag, note the
        following.
    
        -   In a clustered setup that has multiple authentication endpoint
            web applications hosted, list all of them under the
            `             TenantDataListenerURL            ` tag.
    
        -   For authentication endpoint web applications hosted outside the
            WSO2 Identity Server or in other nodes of a cluster, add the
            absolute URL within the
            `             TenantDataListenerURL            ` tag.
    

5.  Restart the server using one of the following commands.

    -   **Windows** : `             wso2server.bat            `

    -   **Linux/Unix** : `             sh wso2server.sh            `

6.  Once the server is restarted, the **authenticationendpoint.war**
    file is deployed. The
    `           <IS_HOME>/repository/conf/identity/EndpointConfig.properties          `
    file has to be changed with the required values for properties. The
    following are the default values for the properties to be used in
    this file.

    ``` java
    tenantListEnabled=false
    hostname.verification.enabled=true
    mutual.ssl.username=admin
    client.keyStore=./repository/resources/security/wso2carbon.jks
    Carbon.Security.KeyStore.Password=wso2carbon
    client.trustStore=./repository/resources/security/client-truststore.jks
    Carbon.Security.TrustStore.Password=wso2carbon
    #identity.server.serviceURL=https://localhost:9443/services/
    username.header=UserName
    ```

    Do the following updates to this configuration.

    1.  Set `            tenantListEnabled           ` to
        `            true           ` in order to enable the tenants to
        display as a list.
    2.  For the `             mutual.ssl.username            ` property,
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
        created and used for the client if necessary, however, you
        must set the passwords for
        `             client.keyStore.password            ` and
        `             client.trustStore.password            `
        appropriately.

    !!! note
    
        If you are hosting the
        `           autheticationendpoint.war          ` webapp outside the
        Identity Server (i.e in a different Tomcat or WSO2 Application
        Server), then you cannot use the
        `           <IS_HOME>/repository/conf/identity/EndpointConfig.properties          `
        file because the webapp does not have access to this file. Instead,
        the same property file can be found at
        `           <WebApp_HOME>/          `
        `           authenticationendpoint/WEB-INF/classes/EndpointConfig.properties.          `
    
        In this scenario, do the following:
    
        -   Open the `<WebApp_HOME>/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties            ` file and p rovide the full URL to WSO2 Identity Server’s admin services endpoint in the
            `             identity.server.serviceURL            ` property following the format below.
            <code>identity.server.serviceURL=https://<ip>:<port>/services</code>
    
        -   Copy the `                           org.wso2.carbon.identity.application.authentication.endpoint.util-5.0.7.jar                         ` file and paste it in the
            `             <WebApp_HOME>/authenticationendpoint/WEB-INF/lib            ` folder. 
            -   If you have applied the <code> WSO2-CARBON-PATCH-4.4.0-0073</code>
                security patch, copy the
                <code>.jar</code> file found in the
                <code><CARBON_PATCH_HOME>/patch0073</code>
                folder.
            -   If you have **not** applied the
                <code>WSO2-CARBON-PATCH</code>, copy
                the <code>.jar</code> file found in the
                <code><IS_HOME>/repository/components/plugins</code> folder.
    

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
        `           MutualSSLManager          ` from loading the keystore by
        disabling the `           mutualSSLManagerEnabled          `
        property in the `           EndpointConfig.properties          `
        file in `           <IS_HOME>/repository/conf/identity.          `
        This property is enabled by default.
    
        ``` java
        mutualSSLManagerEnabled=true
        ```
    

#### Removing the tenant list from the login page

If it is required to remove the tenant domain dropdown list in SSO Login
page, follow the steps below.

1.  Shutdown the server if it is already started.
2.  Set the property
    **`            tenantListEnabled=false           `** in the
    `           EndpointConfig.properties          ` file.

    -   If you are hosting the
        **`               authenticationendpoint.war              `**
        webapp within WSO2 Identity Server, set this property in the
        `              <IS_HOME>/repository/conf/identity/EndpointConfig.properties             `
        file.  

    -   If you are hosting it outside the WSO2 Identity Server (i.e.,
        external Tomcat or WSO2 Application Server), set this property
        in the
        `             <IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties            `
        file.

3.  Set `           TenantDomainDropDownEnabled          ` parameter to
    `           false          ` in the
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file.

    ``` xml
    <TenantDomainDropDownEnabled>false</TenantDomainDropDownEnabled>
    ```

4.  If the `           MutualSSLAuthenticator          ` is only used
    for the purpose of listing tenant domains in the drop down, disable
    it in the
    `           <IS_HOME>/repository/conf/security/authenticators.xml          `
    file.

    ``` xml
    [admin_console.authenticator.mutual_ssl_authenticator]
    enable = true
    ```

5.  Restart the server.

### Handling browser back button and bookmarked login page

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

1.  Start the Identity Server and l og in to the Admin Console.

2.  Click on **Main Menu**, under **Registry**, click **Browse** to
    see the registry browser.  
    ![Registry Browse menu item](../assets/img/using-wso2-identity-server/registry-browse-menu-item.png)

3.  Browse the registry and go to
    `          /_system/config/identity/config.         `  
    ![Registry browser](../assets/img/using-wso2-identity-server/registry-browser.png)  
    Once you navigate to
    `          /_system/config/identity/config         `, follow the
    steps below to add a registry resource.
4.  Click **Add Resource**.  
    ![Add resource option](../assets/img/using-wso2-identity-server/add-resource-option.png) 
5.  Fill the form with following information.
    -   Method : Select **Create text content** from the dropdown.

    -   Name : Enter **relyingPartyRedirectUrls** as Name.

    ![Add resource form](../assets/img/using-wso2-identity-server/add-resource-form.png) 
6.  Click in **Add** button. The created registry resource can be seen
    once you click on **Add** button.  
    ![Registry resource](../assets/img/using-wso2-identity-server/registry-resource.png) 
7.  Click on the added resource (relyingPartyRedirectUrls). You can see
    the **Properties** section.  
    ![Resource properties](../assets/img/using-wso2-identity-server/resource-properties.png) 
8.  Click the “+” sign at the right hand corner of **Properties**
    section. This allows you to add a property to the resource.
9.  Click **Add New Property**.  
    ![Add New Property option](../assets/img/using-wso2-identity-server/add-new-property-option.png)
10. Enter the relying party name for name and the redirect URL for
    value.  
    ![Add New Property form](../assets/img/using-wso2-identity-server/add-new-property-form.png)

    !!! note
    
        The redirectURL is the URL you want the application to be redirected
        when the back button is pressed.
    

    !!! info
        - Relying party name with redirect URL needs to be configured like below:
           <code>
           \<Oauth2\_client\_id\>=\<login\_redirect\_url\>  
           \<Issuer Name\>=\<login\_redirect\_url\>
           </code>        

        - Also note the following settings:
            - Relying party for SAML = Issuer Name
            - Relying party for Oauth2 = OAuth Client Key  

        - Following are two sample values for Name and value:
            - Name : [wso2.my](http://wso2.my/).dashboard
            - Value : <https://localhost:9443/dashboard/index.jag>         

        - If you are using travelocity as the sample app, you can use the below values:
            - Name : travelocity.com
            - Value : <http://localhost:8080/travelocity.com/home.jsp>

11. Once you fill name and the value, click the **Add** button.

12. Now try out the back button and book marking scenarios.

    !!! note
    
        These configurations are per-tenant. You need to do this
        configuration after logging into Service Providers tenant Admin
        Console.
    
