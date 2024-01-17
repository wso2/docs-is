{% set admin_role_name = "admin" %}
{% set host_name = "localhost:9443" %}
{% set scim_schema_for_wso2_custom_claims = "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User" %}
{% set admin_user_details = "
<table>
    <tr>
        <th>Username</th>
        <td>A unique identifier to identify the user.</td>
    </tr>
    <tr>
        <th>First Name</th>
        <td>First name of the user. You can change this later.</td>
    </tr>
    <tr>
        <th>Last Name</th>
        <td>Last name of the user. You can change this later.</td>
    </tr>
    <tr>
        <th>Email Address</th>
        <td>An email address of the user. You can change this later</td>
    </tr>
    </table>
" %}

{% set api_authentication_path = "#oauth-based-authentication" %}
{% include "../../../../../includes/guides/organization-management/onboard-sub-org-admins.md" %}
