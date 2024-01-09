<!-- markdownlint-disable-next-line -->
Once the user is logged in to {{ product_name }}, {{ product_name }} requests consent from the end user to share user attributes with the application.

If the user **does not have** the attribute details in the [user profile]({{base_path}}/guides/users/manage-users/#manage-user-profiles), {{ product_name }} will prompt the user to enter the **mandatory** user attributes during login.  

The user can do one of the following during login:

- Select specific user attributes and click **Allow**.

    This will share only the selected user attributes with the application. However, note that the user cannot unselect the mandatory user attributes.

- If the user does not want to share any of the requested user attributes, they can click **Deny**.

{{ product_name }} will not prompt for consent for the allowed attributes again unless a user revokes the provided consent via MyAccount.

