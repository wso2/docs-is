{% if (product_name == "WSO2 Identity Server" and is_version > "7.2.0") or product_name == "Asgardeo" %}
{% include "../fragments/self-service/manage-consents-v2.md" %}
{% else %}
{% include "../fragments/self-service/manage-consents.md" %}
{% endif %}
