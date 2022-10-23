# Identity Provider Session Extending API

!!! info
    To access this API, use the following endpoint URL.
    ```
    https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/identity/extend-session
    ```

This API can be used to extend the user's session at the identity provider. To identify the session that
 needs to be extended, this API requires one of the following.

1. **Session identifier as a request parameter:** This can be obtained from the ID token.
2. **Session identifier cookie:** This is the `commonAuthId` cookie.

!!! info
    Currently, the session identifier value can only be obtained via OIDC flows that have sessions involved.

### Extracting the session identifier value

If the above config has been enabled, the session identifier can be extracted from the ID token. 
To do this, decode the ID token and read the value of the claim `isk`, which is the identifier of the session.

### Supported requests

##### Sending session identifier as a request parameter

```java
curl --location --request GET 'https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/identity/extend-session?idpSessionKey=<SESSION_IDENTIFIER>'
```

Replace the `<SESSION_IDENTIFIER>` with the `isk` value obtained from the ID token. This method is ideal
 in cases where the use of third party cookies has been blocked.

##### Sending session identifier as a cookie

```java
curl --location --request GET 'https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/identity/extend-session' \
--header 'Cookie: commonAuthId=<COMMON_AUTH_ID_COOKIE>'
```

In this case, replace the `<COMMON_AUTH_ID_COOKIE>` with the `commonAuthId` cookie value.

### API responses

If session extension has been successful, a `200 OK` response will be returned.

If session extension has failed, the response could be one of the following.

| Response status code  |  Error code  | Description                                      |
|-----------------------|--------------|--------------------------------------------------|
| 500                   | ISE-65001    | Unexpected server error                          |
| 400                   | ISE-60001    | Invalid request                                  |                                                                                                                
| 400                   | ISE-60002    | Session Key param value invalid                  |
| 400                   | ISE-60003    | Session cookie invalid                           |
| 400                   | ISE-60004    | Session not available/already expired            |