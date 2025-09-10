# Login and registration settings inheritance

<<<<<<< Updated upstream
In {{product_name}}, child organizations inherit configurations related to login and registration from the organizational hierarchy. Child organizations can make their own customizations to these inherited settings.

Organization administrators can access login and registration settings in the {{product_name}} Console under **Login & Registration**.
=======
In {{product_name}}, child organizations inherit configurations related to login and registration from their parent organizations. Child organizations can make their own customizations to these inherited settings.

Organization administrators can access these settings in the {{product_name}} Console under **Login & Registration**.
>>>>>>> Stashed changes

## How it works

Inheritance for login and registration configurations works as follows:

- Child organizations inherit settings from the nearest ancestor with a custom configuration. If no ancestor has customized settings, the default value applies.

- Organizations can customize their own settings, overriding the inherited values. These overridden settings then pass down to the organization’s descendants.

- Organizations can also revert their customizations, restoring the inherited values.
<<<<<<< Updated upstream
=======

!!! note "Important"
    Child organizations can't override `Idle Session Timeout` and `Remember Me Period` configurations related to session management.

## Configure login and registration settings
>>>>>>> Stashed changes

!!! note "Important"
    Child organizations can't override `Idle Session Timeout` and `Remember Me Period` configurations related to session management.

## Configure login and registration settings

To learn how to configure login and registration settings for an organization, see the [Account configurations]({{base_path}}/guides/account-configurations/) guides.
