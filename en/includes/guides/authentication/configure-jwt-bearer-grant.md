# Configure JWT bearer grant

You can add a trusted token issuer to exchange JWT assertion with an OAuth 2.0 access token to access protected resources on behalf of the resource owner.

Learn how to configure the OAuth 2.0 JWT bearer grant flow in {{product_name}}. Refer [JWT Bearer grant]({{base_path}}/references/grant-types/#jwt-bearer-grant) for more information on how the flow works.

Follow this guide for instructions.

## Register a trusted token issuer

To exchange a third-party token for an {{ product_name }} token, you need to register the third-party token issuer as a trusted token issuer in your {{ product_name }}  organization.

To register a trusted token issuer:

1. On the {{ product_name }} console, go to **Connections**.
2. Click **New Connections** and click **Create** on the **Trusted Token Issuer**.
3. Enter the following details of the trusted token issuer:

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Trusted token issuer name</td>
        <td>A unique name for the new trusted token issuer.</td>
      </tr>
      <tr>
        <td>Issuer</td>
        <td>A unique issuer value of the trusted token issuer. This is the value of the `iss` claim in the JWT token generated from the configured identity provider. <br>
        Example: <code>https://third-party-token-issuers.io/oauth2/token</code></td>
      </tr>
      <tr>
        <td>Alias</td>
        <td>The name by which the trusted token issuer knows {{ product_name }}. The <code>aud</code> claim of the token should include the {{ product_name }} organization's issuer value. If the <code>aud</code> claim doesn't include the organization's issuer value, the system validates the alias value you assign here against the <code>aud</code> claim. <br>
       Example: <code>https://third-party-token-issuers.io/oauth2/token</code></td>
       </td>
      </tr>
    </table>

4. Click **Next** and provide the mode of certificate configuration.

    - **JWKS endpoint**: The JWKS endpoint of the trusted token issuer.

      {% if product_name == "WSO2 Identity Server" %}

        !!! note
            For JWKS endpoints, the default read timeout equals 1000 milliseconds. To update this value, add the following parameter to the `deployment.toml` file in the `<PRODUCT_HOME>/conf/repository` directory.

            ```toml
            [oauth.jwks_endpoint]
            read_timeout = <value in milliseconds>
            ```
      {% endif %}

    - **Use PEM certificate**: Upload or paste the public certificate of the trusted token issuer in the PEM format.

        ??? note "Convert `.crt`, `.cer` or `.der` to the `.pem` format using [OpenSSL](https://www.openssl.org/){:target="_blank"}"
            **Convert CRT to PEM**
            ```bash
            openssl x509 -in cert.crt -out cert.pem
            ```
            **Convert CER to PEM:**
            ```bash
            openssl x509 -in cert.cer -out cert.pem
            ```
            **Convert DER to PEM:**
            ```bash
            openssl x509 -in cert.der -out cert.pem
            ```

5. Click **Finish** to add the new trusted token issuer.

## Enable JWT bearer grant in your app

!!! note "Before you begin"

    You need to register  [Standard-based OIDC application]({{base_path}}/guides/applications/register-standard-based-app/) application types with {{product_name}}.

To enable JWT bearer grant in your application:

1. On the {{ product_name }} Console, go to **Applications**.

2. Open your application from the list and go to the **Protocol** tab.

3. Add `JWT Bearer` under the **Allowed grant types**.

4. Click **Update** to save the configurations.

## Try it out

Follow the steps given below.

1. Get the JWT token received from the third-party token issuer.

2. The application sends the access request to the token endpoint in {{product_name}} with the following:

    - JWT bearer grant type.

    - `JWT assertion` created by the third-party token issuer.

    - Service provider's `client ID` and `client secret`.

3. Execute the following cURL command to exchange the third-party token for an {{ product_name }} token.

    ```bash
    curl -v -k -X POST {{base_url}}/oauth2/token \
    --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
    --header "Content-Type:application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer" \
    --data-urlencode "assertion=<jwt_token>"
    ```

    Upon successful execution, you will receive the exchanged token issued by {{ product_name }}.
  
{% if product_name == "WSO2 Identity Server" %}

!!! note

    While configuring the JWT bearer grant type, the iat validating time period can also be configured in the `deployment.toml` file in the `<IS_HOME>/repository/conf` as shown below. The default value is 30 minutes.

   ```toml
    [oauth.grant_type.jwt]
    enable_iat_validation="true"
    iat_validity_period=30
   ```

{% endif %}

Refer to [JWT Bearer grant]({{base_path}}/references/grant-types/#jwt-bearer-grant) for more information on how the flow works.
