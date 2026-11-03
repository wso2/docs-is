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
    It supports the following grant types: <code>authorization code</code>, <code>client credentials</code>, <code>password</code>, and <code>refresh token</code>.

## How pre-issue access token action works

Configure a pre-issue access token action with your external service endpoint.
{{product_name}} calls your service and waits for a response whenever a token request arrives.
Upon receiving the response, {{product_name}} applies any modifications to the access token as specified in the response and then continues with the flow.

=== "v1.x"
    {% include "./action-versions/pre-issue-access-token-action-v1.x.md" %}

{% if product_name == "WSO2 Identity Server" %}

## Restrict request headers and parameters

{% if is_version == "7.1.0" %}
The pre-issue access token action forwards all HTTP headers and parameters of the access token request to your external service.
{% else %}
If you don't configure **Allowed headers** or **Allowed parameters** for a pre-issue access token action, {{product_name}} forwards all HTTP headers and parameters of the access token request to your external service. This preserves backward compatibility with actions created before allowed headers and parameters were introduced.
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
