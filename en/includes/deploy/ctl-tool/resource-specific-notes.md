## Resource-specific notes

Note the following resource-type-specific behavior when using IAM-CTL.

!!! note
    IAM-CTL treats users and groups as dynamic configurations that are not portable across environments. When a resource contains embedded user or group data, IAM-CTL strips that data during export. As a result, import removes this data from the affected resource in the target environment. For resources that contain dynamic data, use IAM-CTL for initial resource creation only. Add the dynamic configurations manually, then exclude the resource in future imports using **`EXCLUDE`** to preserve the data.

### Roles

Users and groups assigned to roles are not exported or imported by IAM-CTL.

### Claims

Claim dialect names may contain characters that are not valid in file names (e.g., `http://wso2.org/oidc/claim`). IAM-CTL uses an escaped version of the dialect name as the file name (e.g., `http_wso2_org_oidc_claim`). When referencing a claim dialect in tool configurations such as **`EXCLUDE`** or keyword mappings, use the exact claim dialect name, not the escaped file name.

### User stores

When propagating user stores, do not exclude the local claim dialect (`http://wso2.org/claims`). Excluding it will prevent new claim attribute mappings of user stores from being propagated.

### Applications

When propagating applications, do not exclude roles. Excluding roles will prevent new application roles from being propagated.

### Governance connectors

Group-based password expiry rules of the password expiry connector are not exported by IAM-CTL. As a result, these rules will be removed from the connector on import, when **`ALLOW_DELETE`** is enabled.

{% if product_name == "WSO2 Identity Platform" or server_version >= "7.3" %}

### Identity providers

Outbound provisioning groups of outbound provisioning connectors are not exported by IAM-CTL. As a result, these groups will be removed from the identity provider on import.

{% endif %}

### Organizations

{% if product_name != "WSO2 Identity Platform" %}
When referencing organizations in tool configurations such as **`EXCLUDE`** or keyword mappings, use the organization handle as the resource name.
{% endif %}

When IAM-CTL creates organizations using the management application credentials, no user is assigned as the creator. As a result, no user has access to the newly created organization after creation. You can [manually assign an organization admin]({{base_path}}/guides/organization-management/onboard-org-admins/self-service-approach/#maintain-admins-within-the-organization){:target="_blank"} after IAM-CTL creates the organization.

{% if product_name != "WSO2 Identity Platform" and server_version >= "7.0" and server_version < "7.3" %}

To assign a creator at import time, configure **`CREATOR_ID`** and **`CREATOR_USERNAME`** under `ORGANIZATIONS` in `toolConfig.json`.

=== "toolConfig.json"
    ```json
    {
        "ORGANIZATIONS": {
            "CREATOR_ID": "<user-id>",
            "CREATOR_USERNAME": "<username>"
        }
    }
    ```

When both values are set, IAM-CTL assigns the specified user as the organization creator on import. IAM-CTL strips these attributes on export and does not store them in the exported files, as they are environment-specific and not portable.

{% endif %}

### Branding

Branding contains two sub-resource types: **Branding Preferences** and **Custom Texts**. When referencing branding in tool configurations such as **`EXCLUDE`** or keyword mappings, use the sub-resource type names as shown below.

=== "toolConfig.json"
    ```json
    {
        "EXCLUDE": ["BrandingPreferences"],
        "CUSTOM_TEXTS": {
            "EXCLUDE": ["screen1"]
        }
    }
    ```

{% if product_name == "WSO2 Identity Platform" or server_version >= "7.2" %}

### Workflows

Users included in approval steps are not exported by IAM-CTL. These users will be removed from the exported workflow, and any approval steps that contained only users will also be removed. As a result, these users and steps will be removed from the workflow on import.

{% endif %}
