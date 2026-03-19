# Configure outbound provisioning with SCIM2

This guide explains how you can configure a System for Cross-domain Identity Management (SCIM) 2.0 (SCIM2) outbound connector for provisioning users from {{product_name}} to an external system that supports the SCIM2 protocol.

## Configure the SCIM2 outbound connector

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
[Set up outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/setup-outbound-provisioning) and enter the following details to configure the SCIM2 outbound connector.

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Authentication Mode</td>
        <td>The authentication method used to connect to the SCIM2 endpoint. Select one of the following:
            <ul>
                <li><b>Basic</b> (default): Authenticate using a username and password.</li>
                <li><b>Bearer</b>: Authenticate using an access token.</li>
                <li><b>API Key</b>: Authenticate using an API key sent in a custom request header.</li>
            </ul>
            Only the properties for the selected method are required.
        </td>
    </tr>
    <tr>
        <td>Username</td>
        <td>Username for Basic authentication.</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>Password for Basic authentication.</td>
    </tr>
    <tr>
        <td>Access Token</td>
        <td>Access token for Bearer authentication.</td>
    </tr>
    <tr>
        <td>API Key Header Name</td>
        <td>The name of the request header that carries the API key (e.g., <code>X-API-Key</code>).</td>
    </tr>
    <tr>
        <td>API Key Value</td>
        <td>The API key value for API Key authentication.</td>
    </tr>
    <tr>
        <td>User Endpoint</td>
        <td>The SCIM2 user endpoint of the application.<br/>
        e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Users</code></td>
    </tr>
    <tr>
        <td>Group Endpoint</td>
        <td>The SCIM2 group endpoint of the application.<br/>
        e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Groups</code></td>
    </tr>
    <tr>
        <td>User Store Domain</td>
        <td>The user store to which users will be provisioned.</td>
    </tr>
    <tr>
        <td>Enable Password Provisioning</td>
        <td>When selected, the user's password is included in the SCIM2 provisioning request. If the password is available at the time of provisioning (e.g., during user creation), it is sent as-is. If it is not available (e.g., when provisioning is triggered by group assignment for an existing user whose password is already hashed), a randomly generated value is sent instead. If not selected, you can set a <b>Default Password</b> to be assigned to the provisioned user account in the external system.</td>
    </tr>
</table>
{% else %}
Create an [organization-level]({{base_path}}/guides/users/outbound-provisioning/setup-outbound-provisioning) outbound provisioning connection and enter the following details to configure the SCIM2 outbound connector.

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Username</td>
        <td>Username used in the SCIM2 application.</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>Password used in the SCIM2 application.</td>
    </tr>
    <tr>
        <td>User Endpoint</td>
        <td>The SCIM2 user endpoint of the application.<br/>
        e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Users</code></td>
    </tr>
    <tr>
        <td>Group Endpoint</td>
        <td>The SCIM2 group endpoint of the application.<br/>
        e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Groups</code></td>
    </tr>
    <tr>
        <td>User Store Domain</td>
        <td>The user store to which users will be provisioned.</td>
    </tr>
    <tr>
        <td>Enable Password Provisioning</td>
        <td>When selected, the user's password is included in the SCIM2 provisioning request. If the password is available at the time of provisioning (e.g., during user creation), it is sent as-is. If it is not available (e.g., when provisioning is triggered by group assignment for an existing user whose password is already hashed), a randomly generated value is sent instead. If not selected, you can set a <b>Default Password</b> to be assigned to the provisioned user account in the external system.</td>
    </tr>
</table>
{% endif %}
