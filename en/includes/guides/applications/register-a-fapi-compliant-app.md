# Register a FAPI-compliant application

Financial-Grade API (FAPI) is a standard that extends the OAuth and OIDC frameworks to provide enhanced security to applications. Despite being a standard initially defined for financial services, developers that have integrated OAuth and OIDC protocols into their applications may consider making them FAPI compliant to incorporate the highest level of security.

This guide explains how you can create a FAPI-compliant application and implement FAPI-compliant specifications within your application.

## Prerequisite

To enforce FAPI-compliance in {{product_name}}, follow the steps below to include the necessary configurations.

1. Shut down the {{product_name}}

2. Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` folder.

3. Enter the following configurations:

    - Enforce FAPI compliance for Dynamic Client Registration (DCR).

        ```bash
        [oauth.dcr]
        enable_fapi_enforcement=true
        ```

    - Limit cipher suites for TLSv1.2.

        ```bash
        [transport.https.sslHostConfig.properties]
        ciphers="TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
        ```

    - Specify a FAPI-compliant signing algorithm for ID tokens (PS256, ES256).

        ```bash
        [oauth.oidc]
        id_token.signature_algorithm="PS256"
        ```

    - Specify a signing algorithm for tokens issued at the token endpoint.

        ```bash
        [oauth.oidc.token_endpoint]
        signing_algorithms=["PS256","ES256"]
        ```

    - Specify a signing algorithm for the userinfo response.

        ```bash
        [oauth.oidc.user_info]
        jwt_signature_algorithm="PS256"
        ```

    - If your implementation involves TLS termination, specify the following MTLS header name.

        ```bash
         [oauth.mutualtls]
         client_certificate_header = "x-wso2-mtls-cert"
        ```

4. Restart the {{product_name}}.

## Register the application

Follow the steps below to register a FAPI compliant application from the console:

!!! note
    Alternatively, refer to the [Dynamic Client Registration (DCR) API documentation]({{base_path}}/apis/use-the-openid-connect-dynamic-client-registration-rest-apis/) to learn how to register an application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application**.

3. Provide an application name.

4. Select **OAuth2.0 OpenID Connect** as the protocol and select **FAPI Compliant Application**.

    !!! info
        Enabling **FAPI Compliant Application** limits the application configurations to only FAPI compliant protocols. Learn how to implement all FAPI features in the [secure client-server communication](#secure-client-server-communication) section.

    ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/register-a-fapi-application.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Register** to complete the registration.








