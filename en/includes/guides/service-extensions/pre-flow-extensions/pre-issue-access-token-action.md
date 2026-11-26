# Pre-issue access token action

The pre-issue access token action in {{product_name}} lets you execute custom logic before issuing an access token.

{{product_name}} triggers this action during the OAuth2 token issuance process. You can change the access token or add checks before issuing the token using the action.

You can use this functionality to:

- Add, change, or remove scopes.
- Add, change, or remove audience values.
- Change or remove user attributes incorporated into the access token.
- Add custom claims. You can use string, number, boolean, and string type arrays.
- Update the validity period of the access token.
- Add custom parameters to the token endpoint response.
- Suppress optional standard parameters, such as <code>refresh_token</code> or <code>id_token</code>, from the token endpoint response.

When your external service modifies an access token, {{product_name}} saves the changes as transactional data for the token's active period.
In later flows, {{product_name}} provides the updated access token to applications, resource servers, and any actions.
For example, when your service modifies an access token during the authorization code flow, {{product_name}} uses the same updated access token in the refresh token flow.

!!! note
    Currently, this action applies only at the root organization level and is available only for <code>JWT</code> tokens.
{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}
    It supports the following grant types: <code>authorization code</code>, <code>client credentials</code>, <code>password</code>, <code>refresh token</code>, and <code>token exchange</code>. For token exchange, see [Use the action with token exchange](#use-the-action-with-token-exchange).
{% else %}
    It supports the following grant types: <code>authorization code</code>, <code>client credentials</code>, <code>password</code>, and <code>refresh token</code>.
{% endif %}

## How pre-issue access token action works

Configure a pre-issue access token action with your external service endpoint.
{{product_name}} calls your service and waits for a response whenever a token request arrives.
Upon receiving the response, {{product_name}} applies any modifications to the access token as specified in the response and then continues with the flow.

=== "v1.x"
    {% include "./action-versions/pre-issue-access-token-action-v1.x.md" %}

{% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}

## Use the action with token exchange

{{product_name}} can trigger the pre-issue access token action for the [token exchange]({{base_path}}/guides/authentication/configure-token-exchange/) grant (`urn:ietf:params:oauth:grant-type:token-exchange`). Your external service can then change exchanged tokens the same way it changes tokens of other grant types, for example, by adding custom claims.

### Availability

{% if product_name == "WSO2 Identity Platform" %}
Token exchange triggers the action in organizations created on or after November 26, 2026. If your organization was created before that date and you need this, contact {{ product_name }} support through the [WSO2 cloud support portal](https://cloud-support.wso2.com/){:target="_blank"}.
{% else %}
Token exchange triggers the action in organizations created on or after November 26, 2026.

In organizations created before that date, token exchange doesn't trigger the action, so existing actions keep receiving the same requests as before. This includes organizations that existed before you migrated to this version of {{product_name}}. To turn it on for these organizations, use one of the following options.

- **All organizations created before the date**: Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file and restart the server.

    ```toml
    [compatibility_setting.pre_issue_access_token_action.enable_for_token_exchange_grant]
    target_value = true
    ```

- **A single organization**: Send the following request with an access token of the organization that has the `internal_config_update` scope. The change applies without a restart.

    ```bash
    curl --location --request PATCH 'https://localhost:9443/t/<tenant-domain>/api/server/v1/configs/compatibility-settings' \
    --header 'Authorization: Bearer <access-token>' \
    --header 'Content-Type: application/json' \
    --data '{
        "preIssueAccessTokenAction": {
            "enableForTokenExchangeGrant": true
        }
    }'
    ```

    To turn it off for the organization, send the same request with `false`. A value set for an organization this way takes precedence over the `deployment.toml` configuration.
{% endif %}

{% if product_name == "WSO2 Identity Platform" %}
In a sub-organization, the creation date of its root organization applies.
{% else %}
In a sub-organization, the creation date and setting of its root organization apply.
{% endif %}

### How the action behaves for token exchange

- **Narrow it with a rule**: An action without a rule runs for every supported grant type, including token exchange. To run it only for token exchange, or for every grant type except token exchange, add a rule with the **Grant Type** field set to **token exchange**. See [Conditional invocation of pre-issue access token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-access-token-action/#conditional-invocation-of-pre-issue-access-token-action).
- **Refreshing exchanged tokens**: When the client refreshes a token it obtained through token exchange, {{product_name}} triggers the action for the refresh token request as well, unless a rule excludes the refresh token grant. A rule matches a refresh request by the **refresh token** grant type, not by the grant that issued the original token. If a rule limits the action to token exchange and you also need it for refresh requests, add a second **Grant Type** condition set to **refresh token**, combined with OR.
- **User type**: The `event.user` object includes `userType`, which is `LOCAL` or `FEDERATED`. For a federated user, such as the subject of a token from a trusted token issuer that isn't linked to a local account, it also includes `federatedIdP`, the name of the identity provider.
- **Actor**: For [impersonation]({{base_path}}/guides/authorization/user-impersonation/) and [delegation]({{base_path}}/guides/authentication/configure-token-exchange/#delegation), the access token claims in the event include the `act` claim that {{product_name}} will add to the token.
- **Subject and actor tokens**: {{product_name}} never sends the `subject_token` and `actor_token` parameters to your external service, even if the action allows them. The event already carries the user and the actor resolved from these tokens.
- **Claims your service can't add**: {{product_name}} sets the `act` and `may_act` claims from the verified token exchange request. If your external service adds either claim to an exchanged token, {{product_name}} ignores it.

{% endif %}

{% if product_name == "WSO2 Identity Server" %}

## Restrict request headers and parameters

{% if is_version == "7.1.0" %}
The pre-issue access token action forwards all HTTP headers and parameters of the access token request to your external service.
{% else %}
By default, the pre-issue access token action forwards all HTTP headers and parameters of the access token request to your external service. This happens when you don't configure **Allowed headers** or **Allowed parameters** for the action. This preserves backward compatibility with actions created before allowed headers and parameters were introduced.
{% endif %}
The forwarded values can include credentials, such as the `Authorization` header that carries the application's client ID and client secret, or the `client_secret` and `password` parameters.

To exclude headers and parameters only for the pre-issue access token action, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file and restart the server.

```toml
[actions.types.pre_issue_access_token.action_request]
excluded_headers = ["authorization", "cookie"]
excluded_parameters = ["client_secret", "password"]
```

{{product_name}} also excludes the headers and parameters configured for all action types. See [Restrict request headers and parameters]({{base_path}}/guides/service-extensions/pre-flow-extensions/setting-up-actions/#restrict-request-headers-and-parameters).
{% endif %}
