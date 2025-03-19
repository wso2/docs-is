# Configure alternative login identifiers

!!! note
    The feature is in the Beta stage. We are working on adding more capabilities for this feature.

You can now configure alternative login identifiers so that the users of your Asgardeo organization have the capability to use these identifiers to log in.

!!! note
    The primary login identifier is the attribute you configure as your username. Learn more about [configuring username validation]({{base_path}}/guides/user-accounts/account-login/username-validation/).

Asgardeo allows admins to assign the following attributes as alternative login identifiers of the organization:

- `Email`
- `Mobile`

To configure alternative login identifiers for your organization:

1. On the Asgardeo Console, go to **Login & Registration**.

2. Under **Login Identifier**, click on **Alternative Login Identifier**.

3. Select `Email` and/or `Mobile` as alternative login identifiers.

    ![Configure alternative login identifiers]({{base_path}}/assets/img/guides/organization/account-login/configure-alternate-login-identifiers.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        - Ensure that every user within your organization has a unique value assigned to the chosen login identifiers. For new users, Asgardeo will ensure it's uniqueness.

        - If you have chosen `Email` as the [username type]({{base_path}}/guides/user-accounts/account-login/username-validation/), it automatically becomes the primary login identifier. Therefore, configuring it as an alternative login identifier will be disabled.

4. Click **Update** to save the changes.

    {% if attribute_uniqueness_validation %}
    !!! note
        A consent prompt will appear if [uniqueness validation]({{base_path}}/guides/users/attributes/configure-unique-attributes/) is not already configured for the selected attribute(s). Without confirmation, the alternative login identifier configuration will not be applied.
    {% endif %}

Upon successful configuration, the login and recovery user interfaces will update according to the defined login identifier attributes.