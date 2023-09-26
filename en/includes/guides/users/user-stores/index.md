# Manage user stores

Administrators in an organization can use **user stores** to store information about users of an organization.

{{ product_name }} maintains the following two types of user stores:

<table>
    <tr>
        <td>Internal user store</td>
        <td>This is the <code>DEFAULT</code> user store of {{ product_name }}. You can add users and groups to this user store and make changes to them via the {{ product_name }} Console.</td>
    </tr>
    <tr>
        <td>Remote user store</td>
        <td>
           This is a remote user store that administrators can connect to {{ product_name }}. These user stores can be configured with two access types: <br>
            <ul>
                <li>Read-only  - The users and groups of read-only user stores cannot be modified through {{ product_name }}.</li>
                <li>Read-write - You can perform <b>create</b>, <b>read</b>, <b>update</b>, and <b>delete</b> operations on users in the user store
                and <b>read</b> and <b>update</b> operations on groups through {{ product_name }}.</li>
           </ul>
        </td>
    </tr>
</table>

## What's Next

- [Connect a remote user store]({{base_path}}/guides/users/user-stores/configure-a-user-store/)
- [Configure high availability for a remote user store]({{base_path}}/guides/users/user-stores/configure-high-availability/)
- [Update the configurations of a remote user store]({{base_path}}/guides/users/user-stores/update-user-stores/)
