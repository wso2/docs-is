# Register a FAPI-compliant application

Financial-Grade API (FAPI) specification is an extension to the OAuth and OIDC frameworks that defines additional technical requirements to enhance API security. This guide explains how you can create a FAPI-compliant application in {{product_name}}.

## Prerequisites

Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` folder, enter the following configurations and restart the {{product_name}}.

- Limit cipher suites for TLSv1.2.
    ```bash
    [transport.https.sslHostConfig.properties]
    ciphers="TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
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

## Create a FAPI-compliant application

Follow the guides below to create a FAPI-compliant application either using the Console or using Dynamic Client Registration (DCR).

### Use the Console

If you wish to register your application manually using the Console, follow the steps below to make it FAPI-compliant.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application**.

3. Provide an application name.

4. Select **OAuth2.0 OpenID Connect** as the protocol and select **FAPI Compliant Application**.

    !!! note
        When an application is made FAPI-compliant, {{product_name}} restricts several configurations to only allow FAPI-compliant options.

    ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/register-a-fapi-application.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Register** to complete the registration.


### Use Dynamic Client Registration (DCR)

If you have applications that need to dynamically register with {{product_name}} during runtime, follow the steps below to make them FAPI-compliant.

1. Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory, add the following configuration and restart {{product_name}}.

    ```bash
    [oauth.dcr]
    enable_fapi_enforcement=true
    ```

    !!! note
        This configuration enforces FAPI compliance for applications registering with DCR.

2. Refer to the [Dynamic Client Registration (DCR) API documentation]({{base_path}}/apis/use-the-openid-connect-dynamic-client-registration-rest-apis/) to learn how to register an application with DCR.

## What's next?

Refer to the [Financial-grade API]({{base_path}}/references/financial-grade-api) documentation to learn about the FAPI-compliant configurations available in {{product_name}} and how to configure them.
