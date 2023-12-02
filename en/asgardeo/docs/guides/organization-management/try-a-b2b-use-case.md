{% set host_name = "api.asgardeo.io" %}
{% set root_org_description_path = "your-asgardeo" %}
{% set organization_name = "{organization-name}" %}
{% set userstore_name = "DEFAULT" %}
{% set user_details ="
    <table>
        <tr>
            <th>Username (Email)</th>
            <td>Enter an email address as the username.</td>
        </tr>
        <tr>
            <th>First Name</th>
            <td>Enter the first name of the user.</br>
                <code>Alex</code>
            </td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>Enter the last name of the user.</br>
                <code>Doe</code>
            </td>
        </tr>
        <tr>
            <th>Password</th>
            <td>Set a temporary password for the user or invite user to set the password.</td>
        </tr>
    </table>
" %}

{% include "../../../../includes/guides/organization-management/try-a-b2b-use-case.md" %}
