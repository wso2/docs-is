<!-- markdownlint-disable-next-line -->
These configurations appear if the `Refresh Token` grant type is added as an allowed grant type.

!!! note
    Learn about [refresh token rotation and runtime behavior]({{base_path}}/references/tokens/refresh-tokens/).

#### Renew refresh token

By default, whenever the refresh token is exchanged for a new access token, {{product_name}} issues the same refresh token back, as long as it is not expired.

If you select the **Renew refresh token** option, each time the refresh token is exchanged for a new access token, {{product_name}} invalidates the existing refresh token and issues a new refresh token.

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}
#### Extend expiry time of renewed refresh token

!!! note
    This option is only applicable when **Renew refresh token** is enabled.

When you set this configuration to `false`, renewed refresh tokens carry the remaining validity period of the original refresh token.
{% endif %}

#### Refresh token expiry time

This option specifies the validity period of a refresh token in seconds. The default value is 86400 seconds.

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

#### Graceful refresh token rotation

!!! note
    This option is only applicable when **Renew refresh token** is enabled.

Enabling **Graceful refresh token rotation** lets the previous refresh token stay usable for a short grace window after rotation. The client can then recover from missed token deliveries without interrupting the user session.

![Graceful-Refresh-Token-Rotation]({{base_path}}/assets/img/guides/authorization/access-token/graceful-refresh-token-rotation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    Learn about the [graceful refresh token rotation runtime rules]({{base_path}}/references/tokens/refresh-tokens/#graceful-refresh-token-rotation) including replay behavior and error responses.

#### Graceful refresh token rotation validity period

The number of seconds the previous refresh token remains usable after rotation. This period cannot extend beyond the refresh token's absolute expiry time set by **Refresh token expiry time**.

{% if product_name == "WSO2 Identity Platform" %}
The maximum allowed validity period on WSO2 Identity Platform is **60 seconds**.
{% endif %}

#### Graceful refresh token reuse limit

The maximum number of times the previous refresh token may be replayed inside the grace window. Once this limit is reached, further replay attempts are rejected.

{% if product_name == "WSO2 Identity Platform" %}
The maximum allowed reuse limit on WSO2 Identity Platform is **5**.
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

{% endif %}
