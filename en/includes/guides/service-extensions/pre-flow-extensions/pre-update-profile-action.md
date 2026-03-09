# Pre-update profile action

The pre-update profile action in {{product_name}} lets you verify user attributes during profile update processes. This action helps you automate verification of updated data, save changes, or send notifications to updated contact details.

## How pre-update profile action works

Configure a pre-update profile action with your external service endpoint.
{{product_name}} calls your service and waits for a response whenever a profile update action starts.
Upon receiving the response, {{product_name}} returns a client error, server error, or executes based on the response.

=== "v1.x"
    {% include "./action-versions/pre-update-profile-action-v1.x.md" %}
