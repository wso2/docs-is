# OpenID Connect Implicit Client Profile

This section provides information about the expected requests and the
relevant responses that the WSO2 Identity Server would generate for the
[OpenID Connect Implicit Client](../../../concepts/authentication/implicit-client-profile/) flow.

### Register a service provider

{!fragments/register-a-service-provider.md!}

3. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

4. Click **Configure.**   

5. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will 
        be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.
        
6.  Click **Add**. 

### Response\_type=id\_token

``` tab="Request Format"
https://<host>:<port>/oauth2/authorize?response_type=id_token&client_id=<client_id>&redirect_uri=<callback_url>&nonce=<nonce_value>&scope=openid
```

``` tab="Sample Request"
https://localhost:9443/oauth2/authorize?response_type=id_token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&nonce=abc&scope=openid
```

!!! note
    The `nonce` value is a mandatory to receive an Id Token.
    
You will receive the following sample response upon successful authorization. 

```
https://localhost/callback#id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJkODM1YmE4ZjIxNjdmNGJiNDg1OGQzMmVmNmNmYzdmYmZiMWEyNzExYzA0YTA5ZmZjMTk3MjQ4ZWMyNjg5ZmNhIiwiYXVkIjoiQ1Z5UWVNNVAzM2dmTjgwdnVyM05jeHpQZ0h3YSIsInN1YiI6ImFkbWluIiwiYXpwIjoiQ1Z5UWVNNVAzM2dmTjgwdnVyM05jeHpQZ0h3YSIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjE1ODc1OTg0LCJpYXQiOjE2MTU4NzIzODQsIm5vbmNlIjoiYWJjIn0.iHkj_Ve1wiYeYATGyt4nd3ko0b0X73Dah2AzgHBtnQJeQtXoo3dxgPTIFcgfrs9lpCCoDmQeZB-I-PUp6rXAPCY0Sen8u1tCs-VfuamOgeIxlvKY7AqGMjA7dOUO66GVtHs0M3WMzeNS22esZr4GbtgZi3Po5GkUqsctUHKVcfSJr0J2JaaGUSap8d1NoJNyxkwu5wD6AA78NjTN-iqxusdjJQSpZFXBnZU99qfnNB0kxK5hc44SlntkQ-o2oBTWSlhDAzXm3kjp-eOdoBWoReSvGHqHqawxRMXiZL_UT80l7F6QQ9UgxXOqdfuL5gzt5fEz9ftwpZfjp0Sm3quQHw&session_state=a68c4f52124d15131f944c201e57d3eebbff0f5154f8503214c688c52f8963b3.6DPeIkygVpE7VTHtKrfbLw
```

Given below is the Base64 decoded value of the Id Token:

```
{
  "isk": "d835ba8f2167f4bb4858d32ef6cfc7fbfb1a2711c04a09ffc197248ec2689fca",
  "aud": "CVyQeM5P33gfN80vur3NcxzPgHwa",
  "sub": "admin",
  "azp": "CVyQeM5P33gfN80vur3NcxzPgHwa",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "https://localhost:9443/oauth2/token",
  "exp": 1615875984,
  "iat": 1615872384,
  "nonce": "abc"
}
```

!!! info
    The Id Token does not contain the `at_hash` value because no access token is generated. An access token is required to
    calculate the `at_hash` value.

### Response\_type : id\_token token

``` tab="Request Format"
https://<host>:<port>/oauth2/authorize?response_type=id_token token&client_id=<client_id>&redirect_uri=<callback_url>&nonce=<nonce_value>&scope=openid

```

``` tab="Sample Request"
https://localhost:9443/oauth2/authorize?response_type=id_token token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://wso2is.local:8080/playground2/oauth2client&nonce=abc&scope=openid
```

!!! note
    The `nonce` value is a mandatory to receive an Id Token.

You will receive the following sample response upon successful authorization. Note that both the access token and the ID Token are returned to the client.

```
http://wso2is.local:8080/playground2/oauth2client#access_token=80c7c0d7-070a-38ff-a1f4-d21a444cdb67&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiI5YWI1MzhiZDIxNDhmMmFhMTdlMmUxZTA1YzliMWQwOGQ2NGY0ZjIwYzk5YmViNTBhYmJhNDRlMjgzZjhlNTRmIiwiYXRfaGFzaCI6IncwUG1fVFp4TlFfQTBRUU91RjJESUEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwic3ViIjoiYWRtaW4iLCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzY4MjUsImlhdCI6MTYxNTg3MzIyNSwibm9uY2UiOiJhYmMifQ.Z3HbYG0tBu30X5BYJ9hvCGQ9O8wUGXC6GWz3e9xQJHqu15AuRIcM2zbkvbHc-pul5DdwmqfU-R8Ilkp9e0fgrAOOtPCoSRqKO8yNeXhOQ0pj8HBQtLgB9iys3HzL-HPcIolMVNv6VWEhMBP253JXo-7n1DvLJqHE0Q5xK7W8BwudTh5kd0NNl6PEud0aaBJChETdMG231bpHEGCmJMhAkb9WsZyztvkuMVsAt50uRMG1DX0gMOKW1ZcAMAe_z3RdADXVMGu1VZ5HNUoTBl8VosHOFGwrcpndoxiyGAkWIhj7kdQ1AZVUse1RlKH9IW2AZI7VXkPvnU-tmcXCsIJsKg&token_type=Bearer&expires_in=3599&session_state=a49751e21bf6fbf8624cffa0904fd77706c48a09ae187672e4dd09cab84d9e9f.G_NOFmMsySRgYgkmQizt6g
```

!!! info "Related Topics"
    - [Concept: OpenID Connect Implicit Client](../../../concepts/authentication/implicit-client-profile/)
    - [Guide: Advanced OpenID Connect Configurations](../../login/oauth-app-config-advanced)
    