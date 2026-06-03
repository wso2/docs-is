<!-- markdownlint-disable-next-line -->
These configurations appear if the `Refresh Token` grant type is added as an allowed grant type.

#### Renew refresh token

By default, whenever the refresh token is exchanged for a new access token, {{product_name}} issues the same refresh token back, as long as it is not expired.

If you select the **Renew refresh token** option, each time the refresh token is exchanged for a new access token, {{product_name}} invalidates the existing refresh token and issues a new refresh token.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}
#### Extend expiry time of renewed refresh token

!!! note
    This option is only applicable when **Renew refresh token** is enabled.

When you set this configuration to `false`, renewed refresh tokens carry the remaining validity period of the original refresh token.
{% endif %}

#### Refresh token expiry time

This option specifies the validity period of a refresh token in seconds. The default value is 86400 seconds.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}
#### Graceful refresh token rotation

!!! note
    This option is only applicable when **Renew refresh token** is enabled.

When **Renew refresh token** is enabled, a client that never received the newly issued refresh token (for example, due to a dropped network connection) would normally be forced to re-authenticate. Enabling **Graceful refresh token rotation** lets the previous refresh token remain usable for a short, configurable grace window after it has been rotated, so the client can recover without interrupting the user session.


#### Graceful refresh token rotation validity period

The number of seconds the previous refresh token remains usable after rotation. This period cannot extend beyond the refresh token's absolute expiry time set by **Refresh token expiry time**.

{% if product_name == "Asgardeo" %}
The maximum allowed validity period on Asgardeo is **60 seconds**.
{% endif %}

#### Graceful refresh token reuse limit

The maximum number of times the previous refresh token may be replayed inside the grace window. Once this limit is reached, further replay attempts are rejected.

{% if product_name == "Asgardeo" %}
The maximum allowed reuse limit on Asgardeo is **5**.
{% endif %}

{% if product_name == "WSO2 Identity Server" %}
!!! note
    Maximum allowed values for the validity period and reuse limit can be modified by setting the following in `deployment.toml`:

    ```toml
    [oauth.graceful_refresh_token_rotation]
    maximum_validity_period = <seconds>
    maximum_reuse_limit = <count>
    ```

    Application-level values cannot exceed these server maxima.
{% endif %}

The following runtime rules apply during the grace window:

- **Replay inside the grace window .** If the client replays the old refresh token (RT0) inside the grace window, {{product_name}} issues a new access token and a new  refresh token, and revokes the previously issued rotated token (RT1). Only one child of the parent token is honoured at a time; the most recent replay always wins.
- **Using the new refresh token closes the grace window.** Once the client successfully uses the rotated token (RT1), the previous gracefully-rotated token (RT0) is immediately revoked. Any subsequent attempt to replay RT0 returns `400 invalid_grant`.
- **Reuse limit.** If the old refresh token is replayed more times than the configured limit within the window, further replays return `400 invalid_grant`.
- **Grace window expiry.** If the old refresh token is replayed after the validity period has elapsed, the request returns `400 invalid_grant`.

{% endif %}