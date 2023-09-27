# Configure the token exchange flow

You can add a trusted token issuer to exchange tokens received from the configured third-party issuer for {{ product_name }} tokens.

Learn how to configure the OAuth 2.0 token exchange flow in your Asgardeo organization. Refer [Token exchange grant]({{base_path}}/references/grant-types-in-asgardeo/#token-exchange-grant) for more information on how the flow works.

Follow this guide for instructions.

## Register a trusted token issuer

To exchange a third-party token for an Asgardeo token, you need to register the third-party token issuer as a trusted token issuer in your Asgardeo organization.

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
        <td>The name by which the trusted token issuer knows {{ product_name }}. Usually, the <code>aud</code> claim of the token should include the {{ product_name }} organization's issuer value. In case the organization's issuer value is not included in the <code>aud</code> claim, the alias value you assign here will be validated against the <code>aud</code> claim.</td>
      </tr>
    </table>

4. Click **Next** and provide the mode of certificate configuration.

    !!! note
        You can either configure a JWKS endpoint or upload a certificate of the external party. This is required to validate the signature of the assertions sent by the external identity provider.

    - **JWKS endpoint**: The JWKS endpoint of the trusted token issuer.
    - **Use PEM certificate**: Upload or paste the public certificate of the trusted token issuer. The certificate should be in PEM format.

        ??? note "If you have a certificate in other formats such as `.crt`, `.cer` or `.der`, expand here to see how you can convert them to PEM format using [OpenSSL](https://www.openssl.org/)"
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

## Enable token exchange in your app

!!! note "Before you begin"
    You need to register any one of the following application types with {{ product_name }}:

    - [Standard-based OIDC application]({{base_path}}/guides/applications/register-standard-based-app/)
    - [Mobile application]({{base_path}}/guides/applications/register-mobile-app/)
    - [Traditional OIDC web application]({{base_path}}/guides/applications/register-oidc-web-app/)

    Currently, {{ product_name }} does not support the token exchange grant for single-page applications.

To enable token exchange in your application:

1. On the {{ product_name }} Console, go to **Applications**.

2. Open your application from the list and go to the **Protocol** tab.

3. Add `Token Exchange` under the **Allowed grant types**.

    !!! note
        To enable refresh tokens for the token exchange grant, include `Refresh Token` as an **Allowed Grant Type**. Learn more about [how the refresh token grant type works]({{base_path}}/references/grant-types-in-asgardeo/#refresh-token-grant).

4. Click **Update** to save the configurations.

## Try it out

Follow the steps given below.

1. Obtain the JWT token received from the third-party token issuer.
2. Execute the following cURL command to exchange the third-party token for an {{ product_name }} token.

    ``` curl
    curl --location 'https://api.asgardeo.io/t/{organization_name}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
    --data-urlencode 'subject_token=<jwt_token>
    ' \
    --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt' \
    --data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token' \
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange'
    ```

    !!! note
        {{ product_name }} only copies the `sub` claim from the token received from the trusted token issuer to the exchanged {{ product_name }} token.

Upon successful execution, you will receive the exchanged token issued by {{ product_name }}.