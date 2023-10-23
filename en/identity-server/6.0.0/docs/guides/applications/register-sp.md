# Registering a service provider

You can connect your application with Identity Server and control how users log into your app. This guide provides instructions on how to add and configure a [service provider]({{base_path}}/guides/applications/service-provider-overview) to Identity Server through the management console.

For more information on how the service provider fits into the WSO2 IS architecture, see [Architecture]({{base_path}}/references/architecture/architecture).

## Register a service provider

To add a new service provider on WSO2 Identity Server:

1. On WSO2 IS Management Console, go to **Main > Identity > Service Providers > Add**.

2. Select **Manual Configuration**, and enter the following details:

    | Field | Description   |
    |-------|---------------|
    | Service Provider Name | A name for your service provider. This field is required to register an SP.  |
    | Description   | A short description of the service provider    |
    | Management Application    | Select this checkbox if the application is used to access the management APIs.    |

    ![sp-details]({{base_path}}/assets/img/guides/register-a-sp.png)

    ??? note "Modify validation for service provider name"
           The default javascript regex used to validate the service provider name is `^[a-zA-Z0-9\\s.+_-]*$`.
           You can modify this regex by adding the following configuration to the `deployment.toml` file.

            ``` java
            [service_provider]
            sp_name_java_script_regex = '<required_javascript_regex>'
            ```

3. Click **Register** to complete the registration.

!!! info
    You can also [import a service provider](#import-a-service-provider) using the **File configuration** option.

## Import a service provider

To import a service provider:

1. On WSO2 IS Management Console, go to **Main > Identity > Service Providers > Add**.
2. Select **File Configuration**, and upload the **.XML** file.
    ![import-service-provider]({{base_path}}/assets/img/guides/import-a-sp.png)
3. Click **Import** to add the service provider using the XML file.

## Service provider configurations

You can find the basic configurations of a service provider under **Service Providers** section of the selected application.

| Field | Description   |
|-------|---------------|
| Select SP Certificate Type | A certificate is used to validate requests from the SP. You can either **Use SP JWKS endpoint** or **Upload SP certificate**.  |
| JWKS URI    | If you have selected **Use SP JWKS endpoint** in the above field, this field will appear. You need to add the JWKS endpoint URI in this field.        |
| Application Certificate    | If you have selected **Upload SP certificate** in the above field, paste the public certificate into the given text area or upload the certificate file in **PEM** format. Learn more about [public certificates for service providers](#public-certificates-for-service-providers).   |
| SaaS Application   | Enable this to allow users to allow tenants to log in to the application. Disabling this allows only users of the current tenant (the tenant you use to configure the SP) to login into the application. |
| Discoverable Application  | Enable this to make the application discoverable to users. |
| Access URL    | Access URL for the Service Provider.   |
| Logo URL  | Add a link to the logo for your application here.   |
| Logout Return URL or regex    | The URL that the users will be redirected to during a direct IdP logout   |
| Management Application    | The selection you made for Management Application during the application creation will be shown here. This cannot be updated. WSO2 Identity Server exposes all the management capabilities as [REST APIs]({{base_path}}/apis/overview/). These APIs are protected by OAuth2 access tokens and other API authentication mechanisms. The applications that are marked as management applications can only be used to access these management APIs in the OAuth2 flow. This can only be configured when creating the application.|

### Public certificates for service providers
A certificate is used to validate the signatures of the signed requests received from the application (service provider) to WSO2 IS.

#### Usage of the certificate

The certificate is used in the following scenarios:

- To validate the signature of the SAML2 authentication requests and the SAML2 logout requests sent by the service provider during [SAML SSO flows]({{base_path}}/guides/login/sso-for-saml).
- When [passing OIDC authentication request parameters]({{base_path}}/guides/login/oidc-parameters-in-auth-request) the certificate is used to:

    - Encrypt the `id_token` sent to the service provider in the OIDC Authentication Response.
    - Validate the signed `Request` `Object` sent in the OAuth2/OIDC Authorization Request.

#### Obtain the PEM encoded certificate

WSO2 IS expects the certificate to be in PEM format.

To obtain the PEM content of a certificate in a JKS file:

1. Export the certificate from the key store using the following command.

    ``` java
    keytool -export -keystore <keystore-path> -alias <alias-of-the-certificate> -file <path-of-the-expected-certificate-file>
    ```

    Example:
    `keytool -export -keystore wso2carbon.jks -alias wso2carbon -file wso2carbon.crt`

2. The exported certificate will be in binary format. Convert this binary encoded certificate to a PEM-coded certificate using the following command.

    ``` java
    openssl x509 -inform der -in <path-of-binary-certificate> -out <path-of-expected-pem-content>
    ```
    Example:
    `openssl x509 -inform der -in wso2carbon.crt -out wso2carbon.pem`

#### What happens if you don't add the certificate

If the **Application Certificate** field is left blank, as WSO2 IS is backward compatible and follows the previous implementation to locate the certificates in the key store.  

- For a SAML SSO flow, the certificate alias mentioned in SAML inbound authentication configuration will be used when the certificate is not updated via the management console.

- For an OIDC request object signature validation, the certificate will be retrieved from the default key store, an alias to the consumer key of the auth application.

!!! info "Related Topics"

    See the following topics to configure different applications as service providers in Identity Server.

    -   [Logging in to SaaS applications using Identity Server]({{base_path}}/guides/login/log-into-simplesaml-using-is)
    -   [Logging in to Salesforce using the Identity Server]({{base_path}}/guides/login/log-into-salesforce-using-is)
    -   [Logging in to Salesforce with Facebook]({{base_path}}/guides/login/log-into-salesforce-using-fb)
    -   [Logging in to Salesforce with Integrated Windows Authentication]({{base_path}}/guides/login/log-into-salesforce-using-iwa)
<!--    -   [Logging in to WSO2 Products via the Identity Server]({{base_path}}/learn/logging-in-to-wso2-products-via-the-identity-server) -->
