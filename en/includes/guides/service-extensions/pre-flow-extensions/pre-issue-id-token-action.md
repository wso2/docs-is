# Pre-issue ID token action

The pre-issue ID token action in {{product_name}} lets you execute custom logic before issuing an ID token.

{{product_name}} triggers this action during the OAuth2/OIDC token issuance process. You can modify the ID token claims or add checks before issuing the ID token using the action.

You can use this functionality to:

- Add, change, or remove audience values.
- Change or remove user attributes incorporated into the ID token.
- Add custom claims. You can use string, number, boolean, and string type arrays.
- Update the validity period of the ID token.

When your external service modifies the ID token, {{product_name}} applies the changes before issuing the token to the client.

!!! note
    Currently, this action applies only at the root organization level.
    It supports the following grant types: <code>authorization code</code>, <code>password</code>, <code>refresh token</code>, <code>organization switch</code>, and <code>device code</code>.
    In the OIDC hybrid flow, it supports the response types <code>code id_token token</code>, and <code>code id_token</code>.

## How pre-issue ID token action works

Configure a pre-issue ID token action with your external service endpoint.
{{product_name}} calls your service and waits for a response when an ID token is about to be issued.
Upon receiving the response, {{product_name}} applies any modifications to the ID token as specified in the response and then continues with the flow.

=== "v1.x"
    {% include "./action-versions/pre-issue-id-token-action-v1.x.md" %}
