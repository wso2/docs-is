
## Cookie

Cookie token binding method binds the token to the cookie named `atbv` with `Secure` and `httpOnly` parameters. This method is supported with the **authorization code** grant type.

## SSO-session

SSO-session token binding method binds the access token to the login session. {{product_name}} issues a new access token for each new login and revoke the token upon logout. This method is supported with the **authorization_code** grant type.


## Certificate

Certificate token binding method binds the access token to the hash of the TLS certificate passed in the request. This method is supported with all grant types.

## Device flow

Device flow binding method binds the token to the `device_code` sent in the **device flow** grant type token call.


