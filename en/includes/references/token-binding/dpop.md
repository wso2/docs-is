# Demonstrating Proof of Possession (DPoP)

Demonstrating Proof of Possession (DPoP) [(RFC 9449)](https://datatracker.ietf.org/doc/rfc9449/) defines a token binding mechanism that ensures the client binds the access token to its private key. This mechanism requires the client to include a DPoP proof, in the `DPoP` header of each request. The proof demonstrates possession of the private key, ensuring that only the legitimate client that obtained the token can use it.

DPoP enhances security by preventing token misuse and replay attacks, making it a robust solution for securing access tokens across all OAuth 2.0 grant types.

## Configuring your application for DPoP.

1. On the {{product_name}} Console, [create a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/) by selecting **OAuth2.0** as the protocol.

2. Go to its **Protocol** tab and under **Allowed grant types**, select **Client Credentials**.

3. In **Protocol** > **Access Token**,
        - select **DPoP** as the **Token binding type**.

4. Click **Update** to save your changes.

    ![Enabling DPoP]({{base_path}}/assets/img/references/token-binding/enable-dpop.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


## Try it out

You can test DPoP in {{product_name}} by following the steps below.

Generate a DPoP Proof for the Token Request. The client includes this proof in the `DPoP` header when making a token request. You can refer to the sample DPoP proof generator [here](https://github.com/wso2/samples-is/tree/master/oauth2/org.wso2.dpop.proof.generator#dpop-client-application).


### Using client credentials grant

Step 1: Get the access token using client credentials grant. 

=== "Sample request (/token)"

    ```curl
     curl -X POST {{base_url}}/oauth2/token \
    -u \"<client_id>:<client_secret>\" \
    -H \"Content-Type: application/x-www-form-urlencoded\" \
    -H \"DPoP: <dpop_proof>\" \
    -d \"grant_type=client_credentials\"
    ```

=== "Sample response (/token)"

    ```json
    {
        "access_token":"a53e7ebc-8771-34eb-9351-67af7232d301",
        "token_type":"DPoP",
        "expires_in":3600
    }
    ```

### Using authorization code grant

Step 1: Get the authorization code. You can optionally include the `dpop_jkt` (the JWK thumbprint of the client's public key) parameter to bind the code to the client.

```curl
{{base_url}}/oauth2/authorize?scope={scope}&response_type=code&redirect_uri={redirect_uri}&client_id={client_id}&dpop_jkt={dpop_jkt}
```

Step 2: Get the access token using authorization code grant.

=== "Sample request (/oauth2/token)"

    ```curl
     curl -X POST {{base_url}}/oauth2/token \
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
