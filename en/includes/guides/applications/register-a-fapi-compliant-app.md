# Register a FAPI-compliant application

{% set fapi_profiles_enabled = product_name == "WSO2 Identity Server" and is_version > "7.2.0" %}

Financial-Grade API (FAPI) specification extends the OAuth and OIDC frameworks and defines additional technical requirements to protect high-value APIs. {% if is_version == "7.1.0" or fapi_profiles_enabled %}{{product_name}} provides full support for both [FAPI 1.0 Advanced](https://openid.net/specs/openid-financial-api-part-2-1_0.html){: target="_blank"} and [FAPI 2.0](https://openid.net/specs/fapi-security-profile-2_0-final.html){: target="_blank"} allowing developers to build applications that meet these advanced security standards.{%else%}{{product_name}} provides full support for [FAPI 1.0 Advanced](https://openid.net/specs/openid-financial-api-part-2-1_0.html){: target="_blank"} allowing developers to build applications that meet advanced security standards.{% endif %}

This guide walks you through creating and configuring a FAPI-compliant application in {{product_name}}.

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}

## Prerequisites

!!! note
    FAPI 2.0 support and the FAPI security policy are available from **update level 7.3.0.26** onwards. See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/).

- Insert a new configuration type into the `IDN_CONFIG_TYPE` table of your database. The relevant DB scripts are shown below.

    ??? Example "DB2"

        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION)
        SELECT '12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.' FROM "SYSIBM".SYSDUMMY1
        WHERE NOT EXISTS (SELECT * FROM IDN_CONFIG_TYPE WHERE id = '12c78d11-65cd-4b6e-b482-98538ecd7a5c')
        /
        ```

    ??? Example "H2"

        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION)
        SELECT '12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.'
        WHERE NOT EXISTS (SELECT * FROM IDN_CONFIG_TYPE WHERE ID = '12c78d11-65cd-4b6e-b482-98538ecd7a5c');
        ```

    ??? Example "MsSQL"

        ```sql
        IF NOT EXISTS (SELECT * FROM IDN_CONFIG_TYPE WHERE id = '12c78d11-65cd-4b6e-b482-98538ecd7a5c')
        BEGIN
          INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION)
          VALUES ('12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.')
        END;
        ```

    ??? Example "MYSQL"

        ```sql
        INSERT IGNORE INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.');
        ```

    ??? Example "MYSQL-Cluster"

        ```sql
        INSERT IGNORE INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.');
        ```

    ??? Example "Oracle"

        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION)
        SELECT '12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.' FROM DUAL
        WHERE NOT EXISTS (SELECT * FROM IDN_CONFIG_TYPE WHERE id = '12c78d11-65cd-4b6e-b482-98538ecd7a5c')
        /
        ```

    ??? Example "OracleRac"

        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION)
        SELECT '12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.' FROM DUAL
        WHERE NOT EXISTS (SELECT * FROM IDN_CONFIG_TYPE WHERE id = '12c78d11-65cd-4b6e-b482-98538ecd7a5c')
        /
        ```

    ??? Example "Postgres"

        ```sql
        INSERT INTO IDN_CONFIG_TYPE (ID, NAME, DESCRIPTION) VALUES
        ('12c78d11-65cd-4b6e-b482-98538ecd7a5c', 'FAPI_CONFIGURATION', 'A resource type to keep the FAPI configurations.')
        ON CONFLICT DO NOTHING;
        ```

- To show the FAPI security policy and the FAPI profile options in the Console, open the `<IS_HOME>/repository/conf/deployment.toml` file, add the following configuration, and restart {{product_name}}.

    ```toml
    [console.fapi]
    enabled = true
    ```

{% endif %}

{% if product_name == "WSO2 Identity Server" %}

## Configure {{product_name}} for FAPI compliance

{{product_name}} supports both FAPI 1.0 Advanced and FAPI 2.0 specifications.

To configure {{product_name}} to issue FAPI-compliant tokens, open the `<IS_HOME>/repository/conf/deployment.toml` file and add the configurations specific to your FAPI version. After saving the changes, restart WSO2 Identity Server to apply the configuration.

{% if is_version != "7.1.0" and not fapi_profiles_enabled %}

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

{% else %}
=== "FAPI 2.0"
    - Limit cipher suites for TLSv1.2.

        ```bash
        [transport.https.sslHostConfig.properties]
        ciphers="TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
        ```
{% if fapi_profiles_enabled %}
        !!! note
            Cipher suites apply to the whole server. FAPI 1.0 Advanced also allows these cipher suites, so use them when your organizations support both FAPI profiles.
{% endif %}
{% if is_version == "7.1.0" %}
    - Specify a time skew for JWT token validation.

        ```bash
        [oauth]
        timestamp_skew = 10
        ```

    - Specify supported FAPI version.
        
        ```bash
        [oauth.oidc]
        fapi.version= "2"
        ```

    - Specify the id-token issuer and force using entity id as the issuer in jwt tokens.
        
        ```bash
        [oauth.oidc]
        id_token.issuer = "https://$ref{server.hostname}:${carbon.management.port}/oauth2/oidcdiscovery"
        id_token.use_entityid_as_issuer = true
        ```
{% endif %}

    - Specify a FAPI 2.0 compliant signing algorithm for ID tokens (PS256).

        ```bash
        [oauth.oidc]
        id_token.signature_algorithm="PS256"
        ```
{% if is_version == "7.1.0" %}
    - Specify the authorization code validity as 50 seconds.

        ```bash
        [oauth.token_validation]
        authorization_code_validity = 50
        ```
{% endif %}

    - If your implementation involves TLS termination, specify the following MTLS header name.

        ```bash
        [oauth.mutualtls]
        client_certificate_header = "x-wso2-mtls-cert"
        ```
{% if is_version == "7.1.0" %}
    - Change the well-known endpoint of the Console and MyAccount applications.
  
        ```bash
        [myaccount.idp_configs]
        wellKnownEndpoint = "https://<IS_HOST>/oauth2/token/.well-known/openid-configuration"

        [console.idp_configs]
        wellKnownEndpoint = "https://<IS_HOST>/oauth2/token/.well-known/openid-configuration"
        ```
{% endif %}

=== "FAPI 1.0 Advanced"

    - Limit cipher suites for TLSv1.2.

        ```bash
        [transport.https.sslHostConfig.properties]
        ciphers="TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
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

{% endif %}
{% endif %}

{% if fapi_profiles_enabled %}

## Configure the FAPI security policy

The FAPI security policy defines the FAPI profiles that applications in an organization can use. By default, an organization supports only FAPI 1.0 Advanced.

Follow the steps below to configure the FAPI security policy of an organization.

1. On the {{ product_name }} Console, go to **Login & Registration**.

2. Under **Organization Settings**, click **FAPI Security Policy**.

    ![FAPI Security Policy entry]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-security-policy-entry.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Under **Supported FAPI Profiles**, select the FAPI profiles that applications in the organization can use. You need to select at least one profile.

    ![Supported FAPI profiles]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-security-policy.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! warning
        When you enable **FAPI 2.0 Security**, the issuer of the organization changes to the organization's base URL, for example `https://<IS_HOST>` for the super organization and `https://<IS_HOST>/t/<tenant_domain>` for other organizations. Clients can retrieve the server metadata from `<issuer>/.well-known/openid-configuration`.

        The new issuer applies to the tokens issued to all applications in the organization, except the Console and My Account. Before you enable FAPI 2.0, update the applications and resource servers that validate the issuer.

4. Click **Update** to save the changes.

!!! note
    If you remove a FAPI profile that existing applications use, those applications keep their profile and continue to work. The Console shows a warning on the **Protocol** tab of such an application until you select a supported profile.

    ![Unsupported FAPI profile warning]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-unsupported-profile-warning.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Use the FAPI 2.0 configuration of WSO2 Identity Server 7.1.0

If you used FAPI 2.0 with WSO2 Identity Server 7.1.0, you may have the following configuration in the `deployment.toml` file.

```toml
[oauth.oidc]
fapi.version = "2"
```

With this configuration, organizations that haven't saved a FAPI security policy support both FAPI profiles, and new FAPI-compliant applications use FAPI 2.0 by default. The issuer of an organization that supports FAPI 2.0 is the entity ID of its resident identity provider instead of its base URL.
{% endif %}

## Create a FAPI-compliant application

Follow the guides below to create a FAPI-compliant application either using the Console or using Dynamic Client Registration (DCR).

### Use the Console

If you wish to register your application manually using the Console, follow the steps below to make it FAPI-compliant.

{% if fapi_profiles_enabled %}

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application**.

3. Provide an application name.

4. Select **OAuth2.0 OpenID Connect** as the protocol and select **Enforce FAPI security profile compliance for this application**.

5. Under **Apply FAPI Profile**, select the FAPI profile of the application.

    !!! note
        When an application is made FAPI-compliant, {{product_name}} restricts several configurations to only allow options that comply with the selected profile. See [FAPI profile restrictions](#fapi-profile-restrictions).

    ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/register-a-fapi-application.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Create** to complete the registration.

7. [Enable the application]({{base_path}}/guides/applications/#enabledisable-an-application) when it is ready for users to log in.

You can change the FAPI profile of the application later from the **FAPI Profile** section of its **Protocol** tab.

#### FAPI profile restrictions

The selected FAPI profile restricts the following configurations on the **Protocol** tab of the application.

| Configuration | FAPI 1.0 Advanced | FAPI 2.0 Security |
|---------------|-------------------|-------------------|
| Allowed grant types | **Implicit** and **Password** are disabled. | **Implicit** and **Password** are disabled. |
| Hybrid flow | Allowed. | Disabled. |
| PKCE | Optional. The `plain` code challenge method is not allowed. | Mandatory. The `plain` code challenge method is not allowed. |
| Pushed Authorization Requests (PAR) | Optional. | Mandatory. |
| Token binding type | **Certificate** | **Certificate** or **DPoP** |
| Reuse of private key JWTs | Not allowed. | Not allowed. |
| Refresh token renewal | Allowed. | Disabled. |

![FAPI profile of an application]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi2-protocol-profile.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% else %}

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application**.

3. Provide an application name.

4. Select **OAuth2.0 OpenID Connect** as the protocol and select **FAPI Compliant Application**.

    !!! note
        When an application is made FAPI-compliant, {{product_name}} restricts several configurations to only allow FAPI-compliant options.

    ![Register a standard-based application]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/register-a-fapi-application.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Register** to complete the registration.

6. [Enable the application]({{base_path}}/guides/applications/#enabledisable-an-application) when it is ready for users to log in.
{% endif %}

### Use Dynamic Client Registration (DCR)

If you have applications that need to dynamically register with {{product_name}} during runtime, follow the steps below to make them FAPI-compliant.

{% if product_name == "WSO2 Identity Platform" %}

1. Configure DCR properties in {{product_name}}. To do so,

    1. On the {{product_name}} Console, go to **Applications**.

    2. Click the gear icon at the top to open **Dynamic Client Registration** settings.

    3. Configure the following properties:

        ![DCR settings]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-dcr-settings.png){width="600px"}

        - **Require Authentication** is enabled by default. You may deselect the option to not require authentication to create an application with DCR.
        - Select **Mandate SSA Validation** to require a valid Software Statement Assertion (SSA) during creation. Provide the necessary JWKS to validate the SSA. If authentication is not required by the endpoint, this is made mandatory.
        - Select **Enforce FAPI Conformance** to make the created application FAPI compliant.

    4. Click **Update** to save the changes.

2. Refer to the [Dynamic Client Registration (DCR) API]({{base_path}}/apis/dynamic-client-registration-rest-api/) documentation to learn how to register an application with DCR.

{% elif fapi_profiles_enabled %}

1. Configure FAPI enforcement for DCR in the FAPI security policy. To do so,

    1. On the {{ product_name }} Console, go to **Login & Registration**.

    2. Under **Organization Settings**, click **FAPI Security Policy**.

    3. Under **Dynamic Client Registration**, select **Mandate FAPI for applications registered using DCR**.

    4. Under **Apply FAPI Profile**, select the FAPI profile of the applications registered using DCR.

        ![DCR settings of the FAPI security policy]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-security-policy-dcr.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    5. Click **Update** to save the changes.

2. Refer to the [Dynamic Client Registration (DCR) API]({{base_path}}/apis/dynamic-client-registration-rest-api/) documentation to learn how to register an application with DCR.

{% else %}

1. Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory, add the following configuration and restart WSO2 Identity Server.

    ```bash
    [oauth.dcr]
    enable_fapi_enforcement=true
    ```

    !!! note

        This configuration enforces FAPI compliance for applications registering with DCR.

2. Refer to the [Dynamic Client Registration (DCR) API]({{base_path}}/apis/dynamic-client-registration-rest-api/) documentation to learn how to register an application with DCR.

{% endif %}

## What's next?

{% if fapi_profiles_enabled %}
Refer to the [FAPI 1.0 Advanced]({{base_path}}/references/financial-grade-api/) and [FAPI 2.0]({{base_path}}/references/financial-grade-api-2.0/) documentation to learn about the FAPI-compliant configurations available in {{product_name}} and how to configure them.
{% else %}
Refer to the [Financial-grade API]({{base_path}}/references/financial-grade-api/) documentation to learn about the FAPI-compliant configurations available in {{product_name}} and how to configure them.
{% endif %}
