# Implement private key JWT client authentication for OIDC

See the instructions below to implement private key JWT (JSON Web Token) client authentication for your OIDC application. This method can be used for confidential client applications that are implemented on secure servers. These clients must identify themselves with the token endpoint of {{ product_name }} (authorization server) before acquiring an access token.

Typically, when you implement a grant type using OIDC in an application, there are several ways to implement client authentication at the token endpoint. With private key JWT client authentication, the client application uses a JWT to identify itself to the token endpoint. Note that the following two parameters are sent in the token request for this purpose: `client_assertion_type = urn:ietf:params:oauth:client-assertion-type:jwt-bearer`
and the JWT that is set as the `client_assertion`.

!!! note
    See the list of client authentication methods in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication){:target="_blank"}.

Listed below are the high-level steps in the private key JWT client authentication process.

1. Prepare a private key and public key pair for the client.
2. Prepare the JSON payload and sign it using the client's private key.
3. Share the public key with the authorization server ({{ product_name }}).
4. Client application sends the JWT and the signature in the token request to the authorization server.
5. The authorization server verifies the JWT using the public key.
6. The authorization server extracts the signature using the public key and authenticates the client.
7. The access token is granted if the client is successfully authenticated.

Follow the steps given below to implement private key JWT client authentication.

## Register the client app in {{ product_name }}

Register the client application in {{ product_name }} as follows:

1. Create an OIDC application:

    - [Standard-based OIDC application]({{base_path}}/guides/applications/register-standard-based-app/)
    - [OIDC web application]({{base_path}}/guides/applications/register-oidc-web-app/)

{% if is_version == "7.0.0" %}

2. Go to the **Protocol** tab of the new application and configure the required grant type.

    ![oidc protocols]({{base_path}}/assets/img/guides/applications/oidc/oidc_protocols.png)

{% else %}

2. Go to the **Protocol** tab of the new application and configure the required grant type.

    ![oidc protocols]({{base_path}}/assets/img/guides/applications/oidc/oidc_protocols.png){: width="700" style="border: 0.3px solid lightgrey;"}

3. In the **Protocol** tab, go to the **Client Authentication** section and under **Client authentication method**, select **Private Key JWT** from the dropdown.

    ![client authentication methods]({{base_path}}/assets/img/guides/applications/oidc/client_authentication_methods.png){: width="700" style="border: 0.3px solid lightgrey;"}

{% endif %}

## Prepare the private key and public key

Generate a public key and private key for the client application. Follow the steps given below.

1. Open a terminal and execute the following keytool command to create the client keystore.

    !!! note
        Replace the following values:

        - `<clinet_ID>`: Specify the client ID generated when registering the client application in {{ product_name }}.
        - `<keystore_name>`: Specify the name of the keystore you are creating.

    ``` bash
    keytool -genkey -alias <client_ID> -keyalg RSA -keystore <keystore_name>.jks
    ```

2. Convert the `.jks` keystore to `PKCS#12` format.

    !!! note
        Replace `<dest_keystore_name>` to specify a name for the new keystore in `PKCS#12` format.

    ``` bash
    keytool -importkeystore -srckeystore <keystore_name>.jks -destkeystore <dest_keystore_name>.p12 -deststoretype PKCS12
    ```

3. Export the public key from the `.p12` keystore.

    !!! note
        Replace `<pub_key_name>` to specify a name for the public key certificate file.

    ``` bash
    openssl pkcs12 -in <dest_keystore_name>.p12 -nokeys -out <pub_key_name>.pem
    ```

4. Export the private key from the `.p12` keystore.

    !!! note
        Replace `<private_key_name>` to specify a name for the private key certificate file.

    ``` bash
    openssl pkcs12 -in <dest_keystore_name>.p12 -nodes -nocerts -out <private_key_name>.pem
    ```

## Upload the public key to {{ product_name }}

Go to the Certificate section in the **Protocol** tab of your application registered in {{ product_name }} and add the public key certificate of your client application.

!!! note
    See the instructions on [adding certificates to applications]({{base_path}}/references/app-settings/oidc-settings-for-app/#certificate).

## Prepare the JWT payload

Prepare the JSON payload required by the authorization server for client authentication. Given below is a sample payload with only the required data. The complete list of required and optional claims that can be used is defined in the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication){:target="_blank"}.

!!! note
    Note that the audience (`aud`) is the token endpoint URL of the authorization server, and the issuer (`iss`) and the subject (`sub`) is the client ID generated for your application by the authorization server in the previous step.

``` json
{
"iss": "RN0I55bldQftY97uNq9iIXQA21wa",
"sub": "RN0I55bldQftY97uNq9iIXQA21wa",
"exp": 1643650350,
"iat": 1643650346,
"jti": "10003",
"aud": "{{ product_url_format }}/oauth2/token"
}
```

Once you have created the payload, generate a signature for it using the client application's private key. This JWT is known as the **client_assertion**.

## Get the access token

Listed below are the main steps for invoking the token endpoint and acquiring an access token using the JWT.

1. Client application sends the JWT and the signature in the token request to the authorization server.

    !!! note
        Note the following two parameters that should be set in the token request:
        
        - `client_assertion`: The authentication token (JWT assertion) must be sent as the value of this parameter.
        - `client_assertion_type`: The value of this parameter must be `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

2. The authorization server verifies the JWT using the public key.
3. Authorization server extracts the signature using the public key and authenticates the client.
4. The access token is granted if the client is successfully authenticated.

Let's look at how this works for different grant types.

### Authorization code flow

If you are implementing the authorization code flow, you have enabled **code** as the grant type when registering your application. You can now send the following requests to get the access token.

1. First, invoke the authorization endpoint in {{ product_name }} and get an authorization code.

    ``` bash
    {{ product_url_format }}/oauth2/authorize?scope={scope}&response_type=code&redirect_uri={redirect_uri}&client_id={client_id}
    ```

2. Invoke the token endpoint and get the access token.

    ``` bash
    curl --location --request POST '{{ product_url_format }}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code={authorization_code}' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer'\
    --data-urlencode 'client_assertion={jwt_assertion}' \
    --data-urlencode 'redirect_uri={redirect_uri}'
    ```

    Be sure to replace the following values in the request:
 
    <table>
     <tr>
         <th>
             <code>{organization_name}</code>
         </th>
         <td>
             Name of the organization that you are accessing.
         </td>
     </tr>
     <tr>
         <th>
             <code>{authorization_code}</code>
         </th>
         <td>
             The authorization code that was received by invoking the authorization endpoint.
         </td>
     </tr>
     <tr>
         <th>
             <code>{jwt_assertion}</code>
         </th>
         <td>
             The JWT assertion that was created for your client application.
         </td>
     </tr>
     <tr>
         <th>
             <code>{redirect_uri}</code>
         </th>
         <td>
             The callback URL of your client application.
         </td>
     </tr>
    </table>

### Client credential flow

If you are implementing the client credentials flow, you have enabled **client credentials** as the grant type when registering your application. You can now send the following requests to get the access token.

``` bash
curl --location --request POST '{{ product_url_format }}/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \
--data-urlencode 'client_assertion={jwt_assertion}’
```

Be sure to replace the following values in the request:

<table>
    <tr>
        <th>
            <code>{organization_name}</code>
        </th>
        <td>
            Name of the organization that you are accessing.
        </td>
    </tr>
    <tr>
        <th>
            <code>{jwt_assertion}</code>
        </th>
        <td>
            The JWT assertion that was created for your client application.
        </td>
    </tr>
</table>

{% if is_version == "7.0.0" %}

## Reuse tokens (optional)

The `jti` (JWT ID) claim is a unique identifier included in the JWT token, which controls the reuse of the access token. By default, token reuse is disabled in {{ product_name }}. If you enable token reuse, the `jti` can be reused within its expiration period.

To enable token reuse in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Login & Registration**.
2. Under **Login Security**, click **Private Key JWT Client Authentication (OIDC)**.
3. Switch on the toggle to enable token reuse.  
    ![configure JWT reuse]({{base_path}}/assets/img/guides/applications/oidc/private-key-jwt-config.png)

{% else %}

## Private key JWT Reuse (optional)

The `jti` (JWT ID) claim is a unique identifier included in the JWT token, which controls the reuse of the access token. 

By default, Private key JWT reuse is disabled for an application which uses **Private Key JWT** as the **Client authentication method**. If you enable token reuse, the `jti` can be reused within its expiration period. 

To enable Private key JWT reuse for an application in {{ product_name }},

1. Go to the **Protocol** tab of the selected application.
2. Click on the **Private Key JWT Reuse Enabled** checkbox under the **Client authentication method**.

    ![configure JWT reuse]({{base_path}}/assets/img/guides/applications/oidc/private-key-jwt-config.png){: width="700" style="border: 0.3px solid lightgrey;"}

{% endif %}
