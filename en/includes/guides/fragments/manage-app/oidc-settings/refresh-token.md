<!-- markdownlint-disable-next-line -->
These configurations are enabled only if refresh token grant type is added as an allowed grant type.

#### Renew refresh token
{{ product_name }} issues a new refresh token each time when access token is refreshed with refresh token grant type. The previous token gets invalidated.

If the application does not want to get a new refresh token for each request, you can clear the **Renew refresh token** checkbox. Then, the same refresh token will be issued with refresh token grant type until the refresh token expires.

<br>

#### Refresh token expiry time
Provides the validity period of refresh token in seconds. The default value is 86400 seconds.
