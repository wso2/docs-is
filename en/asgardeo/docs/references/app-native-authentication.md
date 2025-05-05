{% set api_base_path = "https://api.asgardeo.io/t/{organization_name}/oauth2/authorize/" %}
{% set api_example_base_path = "https://api.asgardeo.io/t/bifrost/oauth2/authorize/" %}
{% set authn_path = "https://api.asgardeo.io/t/{organization_name}/oauth2/authn/" %}
{% set check_status_endpoint = "https://api.asgardeo.io/t/{organization_name}/" %}
{% include "../../../includes/references/app-native-authentication.md" %}
{% include "../../../includes/references/push-notification-app-native-reference.md" %}
{% set session_control_scenario_id = "7" %}
{% include "../../../includes/references/concurrent-session-based-access-control-app-native-reference.md" %}