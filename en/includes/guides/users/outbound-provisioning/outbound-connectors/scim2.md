# Configure outbound provisioning with SCIM2

This guide explains how you can configure a SCIM2 Identity Provider (IdP) as an outbound connector in {{product_name}}.

## Configure the SCIM2 outbound connector

Create an [organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) or [IdP-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/idp-level) outbound provisioning and enter the following details to configure a SCIM2 outbound connector.

<table>
    <tr>
        <td>Username</td>
        <td>Username used in the SCIM2 application</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>Password used in the SCIM2 application</td>
    </tr>
    <tr>
        <td>User Endpoint</td>
        <td>The SCIM2 user endpoint of the application</br>
        e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Users</code></td>
    </tr>
    <tr>
        <td>Group Endpoint</td>
        <td>The SCIM2 group endpoint of the application</br>
        e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Groups</code></td>
    </tr>
    <tr>
        <td>User Store Domain</td>
        <td>The user store to which users will be provisioned.</td>
    </tr>
    <tr>
        <td>Enable Password Provisioning</td>
        <td>Select the checkbox to set a default password for the user with the SCIM2 request and enter the default password.</td>
    </tr>
</table>
