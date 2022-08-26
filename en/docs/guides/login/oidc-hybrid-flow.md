# OpenID Connect Hybrid Flow

WSO2 Identity Server supports the [OpenID Connect hybrid flow]({{base_path}}/references/concepts/authentication/hybrid-client-profile/) for authentication.

Specifying any of the following `response_type` values in an authorization request selects the hybrid flow for authentication.

- [code token](#get-code-and-access-token)
- [code id\_token](#get-code-and-id-token)
- [code id\_token token](#get-code-access-token-and-id-token)

To understand how the `response_type` value specified in an authorization request selects the hybrid flow to be the authentication flow, let's take a look at the following `response_type` values in detail.

-----

## Register a service provider

{!./includes/register-a-service-provider.md!}

---

## Configure the service provider

{!./includes/oauth-app-config-basic.md!}

{!./includes/oauth-app-config-advanced-tip.md!}

---

## Try out the flows

Let's try out the different OIDC hybrid flows by specifyin the following response types in the authorization request.

### Get code and access token

This `response_type` requests a code and an access token from the authorization endpoint.  
  
1. Use the following authorization request with `code token` as the `response_type`. 

    !!! abstract ""
        **Request Format**
        ```
        https://<host>:<port>/oauth2/authorize?response_type=code token&client_id=<oauth_client_key>&nonce=asd&redirect_uri=<redirect_uri>&scope=openid
        ```
        ---
        **Sample Request**
        ```curl
        https://localhost:9443/oauth2/authorize?response_type=code token&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
        ```

    You will receive the following sample response upon successful authorization. 

    ```
    http://localhost:8080/playground2/oauth2client#access_token=1940a308-d492-3660-a9f8-46723cc582e9&code=99b34587-5483-374d-8b25-50485498e761&token_type=Bearer&expires_in=299999&session_state=baae9a71cdabe38b4643b9d59bd9f65ffaf5a9b8c453f4256c085e5a1c57e624.-EA3ZqPzLvsk25CKmt56YA
    ```

2. Send the code to the token endpoint using the following curl command to request for an access token, refresh token, and id\_token.

    !!! abstract ""
        **Request Format**
        ```
        curl -k -v --basic -u <oauth_client_key>:<oauth_client_secret> -d "grant_type=<grant_type>&code=<code>&redirect_uri=<redirect_uri>" https://<host>:<port>/oauth2/token
        ```
        ---
        **Sample Request**
        ```curl
        curl -k -v --basic -u N_nhS_UXctKHofSyLju1rbt_Cbwa:AOkWrH42XKRSsFongXpUnR6mpHYa -d "grant_type=authorization_code&code=99b34587–5483–374d-8b25–50485498e761&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
        ```

    You will receive the following response from the token endpoint.

    ```
    {
        "access_token":"1940a308-d492–3660-a9f8–46723cc582e9",
        "refresh_token":"6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",
        "scope":"openid",
        "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJmZDI3NTk4ZWI5ZTBmYTAxN2I1NmNlYjllZjIwZDk2OTk1M2Q2YWZmMTc3NDg5YWEwNGNjZjA1MTY0OTI1YjlkIiwiYXRfaGFzaCI6IjViYlowOHpFQjVlNVNINUJCRFdmaVEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoibURSRmNLcDFid19fZG1MaTRRRC1tQSIsInN1YiI6ImFkbWluIiwibmJmIjoxNjE1ODY4OTMzLCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzI1MzMsImlhdCI6MTYxNTg2ODkzMywibm9uY2UiOiJhc2QifQ.cODLbsrcaZpf6NUwI19Nb2LRCcv5Qxwmz3YbarVyrXnEoD0_ZB-CfJPogCD4JKXekzjOEE28ykBx8GlZaMtHY7z5K4DuIlxwWlmjs6grqzZbUhUme3YhBqM7l2cmBXZ3yp4czudh4rTdzuu1zjvJfwBAiMjTc2FDAliV4fGSYK4e8ZzLxuqCqxPzp0cMuyBEWD_447Nun9LJfcJW4cmb32AMcMizE2sQgc1T4vIPXrihJJ8Vz4n6ekWA59JG5z10b-1Thrq4FshM3vGPLEVfWVlBXyDwI-u4YALXThJFJhmdxAB9Rsx-LSqHjBew39Yatti91SF9lqscMgQmQKuYPw",
        "token_type":"Bearer",
        "expires_in":299494
    }
    ```

3. Optionally, you can decrypt the `id_token`. It will be similar to the decrypted `id_token` shown below.

    ``` 
    {
      "isk": "fd27598eb9e0fa017b56ceb9ef20d969953d6aff177489aa04ccf05164925b9d",
      "at_hash": "5bbZ08zEB5e5SH5BBDWfiQ",
      "aud": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "c_hash": "mDRFcKp1bw__dmLi4QD-mA",
      "sub": "admin",
      "nbf": 1615868933,
      "azp": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "amr": [
        "BasicAuthenticator"
      ],
      "iss": "https://localhost:9443/oauth2/token",
      "exp": 1615872533,
      "iat": 1615868933,
      "nonce": "asd"
    }
    ```

There can be instances where you get two access tokens. One from the authorization endpoint and the other from the token endpoint. These two access tokens may or may not be same.

---

### Get code and id token

This `response_type` requests a code and an id\_token from the authorization endpoint.

1. Use the following authorization request with `code id_token` as the `response_type`. 

    !!! abstract ""
        **Request Format**
        ```
        https://<host>:<port>/oauth2/authorize?response_type=code id_token&client_id=<oauth_client_key>&nonce=asd&redirect_uri=<redirect_uri>&scope=openid
        ```
        ---
        **Sample Request**
        ```curl
        https://localhost:9443/oauth2/authorize?response_type=code id_token&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
        ```

    You will receive the following response upon successful authorization:

    ```
    http://localhost:8080/playground2/oauth2client#code=e2f2571d-932b-31c4-9138-95b22025c289&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJjYWFkOWRlYjM2NjQxMjdiMDJkNWM5ZTQzNWQ2NDcyMzI0ZTc4MmMyMjIwZWY2NDQ0ZWQ5YWZlNDJlYTU3OTNmIiwiYXRfaGFzaCI6IjViYlowOHpFQjVlNVNINUJCRFdmaVEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoic090SW44SV9UMEV1RGdaQVBsUGxVZyIsInN1YiI6ImFkbWluIiwiYXpwIjoiQ1Z5UWVNNVAzM2dmTjgwdnVyM05jeHpQZ0h3YSIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjE1ODczMDkxLCJpYXQiOjE2MTU4Njk0OTEsIm5vbmNlIjoiYXNkIn0.QSPBEET61MQlac6K9PwCSM1eq1aW0zcVX4mXpoBpHUt7ti9qij59hzaQgVyiXqAC1ouVnUPZjWBqi181QZ1sN8ee9xEGLAB_PukHdXFTG2ExjK8vVTLI28l-_mhg7TBRME7Z4bTICapzmGiCoE01pyyLJ26jj1A2YtENY3eA64gKqlGwj_q65nLt8Wss3-iB5Oi1hanSI-XwA8cwP1ziYvJjQfSKv7HWnHTXK72hXsDovcrAcNs39d2DvgvrEzwiT7oncQA4tBRvOR-OM6n-2eWhjbTFdLs1WNhRVdBnYhkJIZO3_g0l4BZ8dzwglJyU1JArQ1OJkRE9xLDzD4GBGw&session_state=ce34ca2d8f7823cab95dcb9f843735b908c0fe507822654a57fafd79a377a9d9.HLiwEX5EJdI2vlJACqHxYg
    ```
    
    !!! note
        You will not receive an Id Token if the `nonce` value is a not present in the request.
        
2. Optionally, you can decrypt the `id_token`. It will be similar to the decrypted `id_token` shown below.

    ``` 
    {
      "isk": "241051e68ba582c666c01e0c95cb926cd869841f9da3299da7e162960ed94624",
      "at_hash": "OloIgUvAFrV5cCHAXOF6Lg",
      "aud": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "c_hash": "WYZEvUJ88jFo5fHMaqFxCg",
      "sub": "admin",
      "azp": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "amr": [
        "BasicAuthenticator"
      ],
      "iss": "https://localhost:9443/oauth2/token",
      "exp": 1615868617,
      "iat": 1615865017,
      "nonce": "asd"
    }
    ```

    !!! note
        Here, the id\_token is required to have a `c_hash` value.
        
        `c_hash` is the base64url encoding of the left-most half of a hash of the octets in the ASCII representation of a code value, where the hash algorithm used is the hash algorithm of the `alg` header parameter of the ID token’s JOSE header.
        
        The `c_hash` value is mandatory when an id_token is issued with code, and the `response_type` is equal to `code id_token` or `code id_token token` .


3. You can send the code to the token endpoint to request for an access token, refresh token and id\_token. For this you can use the same curl command provided for the code token specified [above](#curl).
    
    You will receive the following response from the token endpoint.

    ```
    {
        "access_token":"97696e2a-46e3-34d4-b29e-5ef601c8c2ca",
        "refresh_token":"18917dd6-4566-3294-92a9-01ec89cccf4d",
        "scope":"openid",
        "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJjYWFkOWRlYjM2NjQxMjdiMDJkNWM5ZTQzNWQ2NDcyMzI0ZTc4MmMyMjIwZWY2NDQ0ZWQ5YWZlNDJlYTU3OTNmIiwiYXRfaGFzaCI6IjViYlowOHpFQjVlNVNINUJCRFdmaVEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoic090SW44SV9UMEV1RGdaQVBsUGxVZyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjE1ODY5NTE2LCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzMxMTYsImlhdCI6MTYxNTg2OTUxNiwibm9uY2UiOiJhc2QifQ.IimyN_iztv0ImkJXRYMBYqSWpGw7RBbhq20Xj1CDhX_gR3XP02ph2gTBuJwJthHY_taW8g-2eDrjhTpJ_KgbX4ntumAY0zpw1KpqaMfn_41uR4DNTkJmRsx0CA_wcK5y4o3dXRhStTkwzBh5_qwCCmVq5jD4WzYhA8bnLloHEJMZQuoE6pS5TfbtC6lLmtx7OGseZNT1SgId31rFDvP2fUlkdWLlJJPooCdd-S9YVopt7hekQykg9VZ6HzPI2o_9ZB5WgmcYYVonP0Rd6fiUyAykMd2CoiMoNcCL0nc8fdaQZq9DAFVRWdnLitJ-GJqr4jrz4C2dteU_FKYMS_Sq3Q",
        "token_type":"Bearer",
        "expires_in":2926
    } 
    ```

4. You can decrypt this `id_token` as well. It will be similar to the decrypted `id_token` shown below.

    ``` 
    {
      "isk": "caad9deb3664127b02d5c9e435d6472324e782c2220ef6444ed9afe42ea5793f",
      "at_hash": "5bbZ08zEB5e5SH5BBDWfiQ",
      "aud": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "c_hash": "sOtIn8I_T0EuDgZAPlPlUg",
      "sub": "admin",
      "nbf": 1615869516,
      "azp": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "amr": [
        "BasicAuthenticator"
      ],
      "iss": "https://localhost:9443/oauth2/token",
      "exp": 1615873116,
      "iat": 1615869516,
      "nonce": "asd"
    }
    ```

5. If there are two id\_tokens issued, where one id\_token is from authorization endpoint and other is from token endpoint, be sure to perform the [neccessary validations](#id_token-validations), which are based on the OpenID Connect specification.

-----

### Get code, access token, and id token

This `response_type` requests a code, an access token, and an id\_token from the authorization endpoint.

1. Use the following authorization request with `code id_token token` as the `response_type`. 

    !!! abstract ""
        **Request Format**
        ```
        https://<host>:<port>/oauth2/authorize?response_type=code id_token token&client_id=<oauth_client_key>&nonce=asd&redirect_uri=<redirect_uri>&scope=openid
        ```
        ---
        **Sample Request**
        ```curl
        https://localhost:9443/oauth2/authorize?response_type=code id_token token&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
        ```

    You will receive the following upon successful authorization. 

    ``` 
    http://localhost:8080/playground2/oauth2client#access_token=97696e2a-46e3-34d4-b29e-5ef601c8c2ca&code=9a727979-3858-3ad1-8b03-1e79c68f26e6&id_token=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiI1YjU2ZTU1ODhiZjcyMGRhNDYxYzA1YTk5ZGRhNzFmOTI1MDdhMGZlNGY2YjA1ZTc1MDdiZWM3NjFmMDNmZjllIiwiYXRfaGFzaCI6IjViYlowOHpFQjVlNVNINUJCRFdmaVEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoiZEN5eW5lZTA1QkptQmtRNHZab3M2QSIsInN1YiI6ImFkbWluIiwiYXpwIjoiQ1Z5UWVNNVAzM2dmTjgwdnVyM05jeHpQZ0h3YSIsImFtciI6WyJCYXNpY0F1dGhlbnRpY2F0b3IiXSwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjE1ODc0MjkwLCJpYXQiOjE2MTU4NzA2OTAsIm5vbmNlIjoiYXNkIn0.lcSQ2_xfA4HR_2I5cNHRbXkTFe7-CLsZOSZvNOqlfVaPxZuYkuNTKZ0nOkxBRCgzLCIdBTzL3Z4QerYNp8AKlKvzYCM2gV8r1XSVEUekhYK4ZVX5EwR0FRtfMSAaYMTQbC_PHR04YDhVRkM6-i2Cl1FLE-TeqpOoPnRE9vJPwIh2tOKTNJb2ADCkzvDVPlY2qsj0rl_WLQuPlZRZqSV3KoF1ggw6b8_143EOCsXxJctU1wDLk46Stbv6RZX04-r6ieCrzi6NeQN-9iqK9nT-GqkiFBOS8NDtfuIFBApPskOWQ8y0ZK69YlfQq8dqrIW-0s1NaLN7tbTodjf219B8EQ&token_type=Bearer&expires_in=1752&session_state=82799c049f99c13b7d292c5d5caa6113bf29caaa28512f8bda4c4e84b10dacec.tHCazWFb006J5Kn-v7DJbQ
    ```

2. Optionally, you can decrypt the `id_token`. It will be similar to the decrypted `id_token` shown below.

    ``` java
    {
      "isk": "5b56e5588bf720da461c05a99dda71f92507a0fe4f6b05e7507bec761f03ff9e",
      "at_hash": "5bbZ08zEB5e5SH5BBDWfiQ",
      "aud": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "c_hash": "dCyynee05BJmBkQ4vZos6A",
      "sub": "admin",
      "azp": "CVyQeM5P33gfN80vur3NcxzPgHwa",
      "amr": [
        "BasicAuthenticator"
      ],
      "iss": "https://localhost:9443/oauth2/token",
      "exp": 1615874290,
      "iat": 1615870690,
      "nonce": "asd"
    }
    ```

3. You can send the code to the token endpoint to request for an access token, refresh token and id\_token. You can use the same curl command provided for the code token specified [above](#curl).

    You will receive the following response from the token endpoint. 

    ``` 
    {
        "access_token":"97696e2a-46e3-34d4-b29e-5ef601c8c2ca",
        "refresh_token":"18917dd6-4566-3294-92a9-01ec89cccf4d",
        "scope":"openid",
        "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiI1YjU2ZTU1ODhiZjcyMGRhNDYxYzA1YTk5ZGRhNzFmOTI1MDdhMGZlNGY2YjA1ZTc1MDdiZWM3NjFmMDNmZjllIiwiYXRfaGFzaCI6IjViYlowOHpFQjVlNVNINUJCRFdmaVEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoiZEN5eW5lZTA1QkptQmtRNHZab3M2QSIsInN1YiI6ImFkbWluIiwibmJmIjoxNjE1ODcwNzYxLCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzQzNjEsImlhdCI6MTYxNTg3MDc2MSwibm9uY2UiOiJhc2QifQ.SVlEYFEPd5JvdjnkjuSJrZDB1DYA-8BNLXjX2olbFtLEXK10DSrmDn5kXi3W8Txv5MVpOJnKaMHsgZeZEj67EMXatXj_UidvPBRslbhA8SHkUMJ1ZwbukOhIKLzBVXAJjupYvQpbRWfJ6wx3C38W9KvQKvUKK0pBL06idFi56AWNPydZIq4KDqGC2-YPSCftMWGAYA-T380-ITUVOrtZKHZE-sl8U-Ie-TjR6kNgZqyrNBcmefM1w2CzAwngFz0Oj-hO3rLnEN5rk8bkPFLNnB2o6Wva2Gc72EqG8Wsf0T19o6d9qubNzRs30S1T-IFhur37XE8evQ8dZWMCSscKXQ",
        "token_type":"Bearer",
        "expires_in":1681
    }
    ```

4. If there are two id\_tokens issued, where one id\_token is from authorization endpoint and other is from token endpoint, be sure to perform the [neccessary validations](#id_token-validations), which are based on the OpenID Connect specification.

----

## id_token validations

1.  Ensure that the `iss` and `sub` claim values are identical in the two `id_tokens` .

2.  If any one of the ID tokens contain claims about the end user, and are present in both, the values of the claims should be the same in both.

3.  All claims about the authentication event that is present in either should be present in both.

4.  The `at_hash` and `c_hash` claims may be omitted from the ID token returned from the token endpoint even when the claims are present in
    the ID token returned from the authorization endpoint.

!!! info "Related topics"
    - [Concept: OpenID Connect Hybrid Flow]({{base_path}}/references/concepts/authentication/hybrid-client-profile)
    - [Guide: Advanced OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced)