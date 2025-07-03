# Demonstrating Proof of Possession (DPoP)

Demonstrating Proof of Possession (DPoP) [(RFC 9449)](https://datatracker.ietf.org/doc/rfc9449/) defines a binding mechanism that ties an access token to the client’s private key. To prove possession of the key, the client includes a signed DPoP proof in the `DPoP` header of each request. This ensures that only the legitimate client holding the corresponding private key can use the access token.

DPoP enhances security by preventing token misuse and replay attacks, making it a robust solution for securing access tokens across all OAuth 2.0 grant types.

## Configure your application for DPoP

Follow these steps to enable DPoP for your application:

1. On the {{product_name}} Console, [create a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/) by selecting **OAuth2.0** as the protocol.

2. Go to the application's **Protocol** tab and do the following:

    1. Under **Allowed grant types**, select **Client Credentials**.

    2. Under **Access Token**, select **DPoP** as the **Token binding type**.

        ![Enabling DPoP]({{base_path}}/assets/img/references/token-binding/enable-dpop.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save your changes.

## Try it out

You can test DPoP support in {{product_name}} using either the [Client Credentials]({{base_path}}/references/grant-types/#client-credentials-grant) or [Authorization Code grant]({{base_path}}/references/grant-types/#authorization-code-grant). Follow the steps below to generate a DPoP proof and use it in token requests.

### Generate a DPoP proof

Before making a token request, the client must generate a DPoP proof that proves possession of the private key. The client should include this proof in the DPoP header of the request. You can refer to the sample DPoP proof generator on [Github](https://github.com/wso2/samples-is/tree/master/oauth2/org.wso2.dpop.proof.generator#dpop-client-application){:target="_blank"}.

### Try with the client credentials grant

Use the following command to get a token using the client credentials grant:

=== "Sample request (/token)"

    ```curl
     curl -X POST https://{{base_url}}/oauth2/token \
    -u "<client_id>:<client_secret>" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -H "DPoP: <dpop_proof>" \
    -d "grant_type=client_credentials"
    ```

=== "Sample response (/token)"

    ```json
    {
        "access_token":"a53e7ebc-8771-34eb-9351-67af7232d301",
        "token_type":"DPoP",
        "expires_in":3600
    }
    ```

### Try with the authorization code grant

Follow the steps below to get a token using the authorization code grant:

1. Get an authorization code. To bind the code to the client, you can optionally include the  [thumbprint](https://datatracker.ietf.org/doc/html/rfc9449#section-10) of the client’s public key using the `dpop_jkt` parameter.

    ```curl
    https://{{base_url}}/oauth2/authorize?scope={scope}&response_type=code&redirect_uri={redirect_uri}&client_id=   {client_id}&dpop_jkt={dpop_jkt}
    ```

2. Use the following command to get a token using the authorization code grant.

    === "Sample request (/oauth2/token)"

        ```curl
         curl -X POST https://{{base_url}}/oauth2/token \
        -H "Content-Type: application/x-www-form-urlencoded" \
        -H "DPoP: <dpop_proof>" \
        -d "grant_type=authorization_code" \
        -d "code=<authorization_code>" \
        -d "client_id=<client_id>" \
        -d "client_secret=<client_secret>" \
        -d "redirect_uri=<redirect_uri>"
        ```

    === "Sample response (/oauth2/token)"

        ```json
        {
            "access_token":"a53e7ebc-8771-34eb-9351-67af7232d301",
            "token_type":"DPoP",
            "expires_in":3600
        }
        ```
