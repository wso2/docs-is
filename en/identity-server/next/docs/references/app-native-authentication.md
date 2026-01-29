{% set api_base_path = "https://localhost:9443/oauth2/authorize/" %}
{% set api_example_base_path = "https://localhost:9443/oauth2/authorize/" %}
{% set authn_path = "https://localhost:9443/oauth2/authn/" %}
{% set check_status_endpoint = "https://localhost:9443/" %}
{% include "../../../../includes/references/app-native-authentication.md" %}
{% include "../../../../includes/references/push-notification-app-native-reference.md" %}
{% set session_control_scenario_id = "7" %}
{% include "../../../../includes/references/concurrent-session-based-access-control-app-native-reference.md" %}
{% set api_oauth2_path = "https://localhost:9443/oauth2" %}
{% include "../../../../includes/references/device-flow-app-native-reference.md" %}
{% include "../../../includes/references/custom-authentication-app-native-reference.md" %}
