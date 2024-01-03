<!-- markdownlint-disable-next-line -->
These configurations appear if the `Refresh Token` grant type is added as an allowed grant type.

#### Renew refresh token

By default, whenever the refresh token is exchanged for a new access token, {{product_name}} issues the same refresh token back, as long as it is not expired.

If you select the **Renew refresh token** option, each time the refresh token is exchanged for a new access token, {{product_name}} invalidates the existing refresh token and issues a new refresh token.

#### Refresh token expiry time
This option specifies the validity period of a refresh token in seconds. The default value is 86400 seconds.