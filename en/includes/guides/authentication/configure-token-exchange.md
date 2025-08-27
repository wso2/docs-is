# Configure token exchange

You can add a trusted token issuer to exchange tokens received from the configured third-party issuer for {{ product_name }} tokens.

Learn how to configure the OAuth 2.0 token exchange flow in your {{ product_name }} organization. Refer [Token exchange grant]({{base_path}}/references/grant-types/#token-exchange-grant) for more information on how the flow works.

Follow this guide for instructions.

## Register a trusted token issuer

To exchange a third-party token for an {{ product_name }}  token, you need to register the third-party token issuer as a trusted token issuer in your {{ product_name }}  organization.

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
        <td>The name by which the trusted token issuer knows {{ product_name }}. The <code>aud</code> claim of the token should include the {{ product_name }} organization's issuer value. If the <code>aud</code> claim doesn't include the organization's issuer value, the system validates the alias value you assign here against the <code>aud</code> claim.</td>
      </tr>
    </table>

4. Click **Next** and provide the mode of certificate configuration.

    - **JWKS endpoint**: The JWKS endpoint of the trusted token issuer.

        {% if product_name == "WSO2 Identity Server" %}

        !!! note
            For JWKS endpoints, the default read timeout equals 1000 milliseconds. To modify this value, add the following parameter to the `deployment.toml` file in the `<PRODUCT_HOME>/conf/repository` directory.

            ```toml
            [oauth.jwks_endpoint]
            read_timeout = <value in milliseconds>
            ```
        {% endif %}
  
    - **Use PEM certificate**: Upload or paste the public certificate of the trusted token issuer. The certificate should be in PEM format.

        ??? note "If you have a certificate in other formats such as `.crt`, `.cer` or `.der`, expand here to see how you can convert them to PEM format using [OpenSSL](https://www.openssl.org/){:target="_blank"}"
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
        To enable refresh tokens for the token exchange grant, include `Refresh Token` as an **Allowed Grant Type**. Learn more about [how the refresh token grant type works]({{base_path}}/references/grant-types/#refresh-token-grant).

4. Click **Update** to save the configurations.

{% if product_name == "Asgardeo" %}

## Configure token exchange for a local user

{{ product_name }} can exchange a third-party token with a token issued for an existing local user account. This is beneficial if you wish to check for blocked/disabled user accounts or to enforce Role-Based Access Control (RBAC).

You can use the following properties to customize how token exchange occurs for identities with local user accounts.

### Prioritize local account attributes

After enabling this configuration, {{ product_name }} includes the local user profile information in the exchanged token if the federated identity has a linked local user account. Otherwise, {{ product_name }} returns the profile information received directly from the federated identity.

To prioritize linked local account attributes:

1. On the {{ product_name }} console, go to **Applications**.

2. Open your application from the list and go to its **User Attributes** tab.

3. Scroll down and under **Attribute Resolution for Linked Accounts**, select **Use linked local account attributes**.

    !!! note
        Select **Require linked local account** for {{ product_name }} to return an error when it can't find a user account linked to the federated identity.

### Implicit account linking

You can use implicit account linking capability in the registered trusted token issuer to automatically create an account link between a local user account in {{ product_name }} and a federated identity during token exchange.

You can configure lookup attributes to search for a matching local user account. If the system finds a matching account, {{ product_name }} automatically links the local user account to the federated identity.

After establishing account links, administrators can't delete them. Users can manage their own accounts links using the <a href="{{base_path}}/guides/user-self-service/manage-linked-accounts">Manage linked accounts</a> capability in the Self-service portal.

!!! note
    {{ product_name }} skips implicit account linking when **Require linked local account** is disabled, even if the implicit linking option remains enabled.

To enable implicit account linking,

1. On the {{ product_name }} console, go to **Connections**.

2. Open the trusted token issuer you configured <a href="#register-a-trusted-token-issuer">above</a> and go to its **Advanced** tab.

3. Select **Implicit account linking**.

4. Select the primary attribute for {{ product_name }} to perform the lookup.

5. Optionally, select a secondary attribute for {{ product_name }} to perform the lookup.

    !!! warning
        Ensure that the chosen lookup attributes undergo verification by the third-party token issuer. If unverified, malicious users can manipulate attributes to gain access to local accounts that don't belong to them.

!!! note
    If {{ product_name }} can't find a matching local user account using the primary lookup attribute, it searches for matching accounts using the secondary lookup attribute.

    Following three attributes can be configured as lookup attributes

    - `http://wso2.org/claims/username`
    - `http://wso2.org/claims/emailaddress`
    - `http://wso2.org/claims/mobile`

    {{ product_name }} will look for the <a href="{{base_path}}/guides/users/attributes/manage-oidc-attribute-mappings/#view-openid-connect-attributes">mapped OpenID Connect attribute</a> in the third-party token.

{% endif %}

## Try it out

Follow the steps given below.

1. Obtain the JWT token received from the third-party token issuer.
2. Execute the following cURL command to exchange the third-party token for an {{ product_name }} token.

    ``` bash
    curl --location '{{ product_url_format }}/oauth2/token'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>'
    --data-urlencode 'scope=<desired scopes>'
    --data-urlencode 'subject_token=<jwt_token>'
    --data-urlencode 'subject_token_type=urn:ietf:params:oauth:token-type:jwt'
    --data-urlencode 'requested_token_type=urn:ietf:params:oauth:token-type:access_token'
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange'
    ```

    !!! note
        {{ product_name }} only copies the `sub` claim from the token received from the trusted token issuer to the exchanged {{ product_name }} token.

Upon successful execution, you will receive the exchanged token issued by {{ product_name }}.
