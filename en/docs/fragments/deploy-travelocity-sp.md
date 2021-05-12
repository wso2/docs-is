### Configure the service provider

!!! note "Important"

    SAML2 POST Binding requires CORS configurations. Before configuring the service provider, add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file to allow HTTP POST requests. 

    ```toml
    [cors]
    allow_generic_http_requests = true
    allow_any_origin = false
    allowed_origins = [
        "http://localhost:8080"
    ]
    allow_subdomains = false
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

The next step is to configure the service provider.

1.  Return to the WSO2 IS management console.

2.  Navigate to **Main**>**Identity**>**Service Providers** and click **Add**.

3.  Enter **travelocity.com** in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configurations as follows:

        1.  **Issuer** : `               travelocity.com              `

        2.  **Assertion Consumer URL** :
            `                               http://wso2is.local:8080/travelocity.com/home.jsp                        `  
            Click Yes, in the message that appears.

    2.  Select the following check-boxes:
        1.  **Enable Response Signing**

        2.  **Enable Single Logout**

        3.  **Enable Attribute Profile**

        4.  **Include Attributes in the Response Always**  
        
        5.  **Enable Signature Validation in Authentication Requests and Logout Requests**
            

    ![edit-service-provider](/assets/img/fragments/edit-service-provider-configs.png)
    
    !!! tip
        For more information on the advanced configurations
        see, [Configuring SAML2 WEB Single-Sign-On](../../../guides/identity-federation/configure-saml-2.0-web-sso).

5.  Click **Register** to save the changes.  
    Now you are sent back to the Service Providers page.
