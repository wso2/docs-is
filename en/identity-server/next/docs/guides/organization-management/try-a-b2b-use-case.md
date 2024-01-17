{% set host_name = "localhost:9443" %}
{% set organization_name = "carbon.super" %}
{% set userstore_name = "PRIMARY" %}
{% set user_details ="
    <table>
        <tr>
            <th>Username</th>
            <td>Enter an unique identifier as the username.</br>
            <code>alex</code>
            </td>
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
          <th>Email</th>
          <td>Enter the email of the user.</br>
             <code>alex@bestcarmart.com</code>
          </td>
       </tr>
        <tr>
            <th>Password</th>
            <td>Set a temporary password for the user or invite user to set the password.</td>
        </tr>
    </table>
" %}

{% include "../../../../../includes/guides/organization-management/try-a-b2b-use-case.md" %}
