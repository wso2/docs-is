{% set admin_role_name = "Administrator" %}
{% set host_name = "api.asgardeo.io" %}
{% set scim_schema_for_wso2_custom_claims = "urn:scim:wso2:schema" %}
{% set admin_user_details = "
<table>
    <tr>
        <th>Username (Email)</th>
        <td>A unique email address to identify the user.</td>
    </tr>
    <tr>
        <th>First Name</th>
        <td>First name of the user. You can change this later.</td>
    </tr>
    <tr>
        <th>Last Name</th>
        <td>Last name of the user. You can change this later.</td>
    </tr>
    </table>
" %}
{% set api_authentication_path = "authentication/" %}

{% include "../../../../includes/guides/organization-management/onboard-sub-org-admins.md" %}