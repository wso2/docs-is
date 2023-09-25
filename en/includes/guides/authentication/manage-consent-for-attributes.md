# Manage consent for user attributes

If user attributes are enabled for applications registered in {{ product_name }}, the applications can access these attributes when the user logs in to the app. However, it may be necessary to get the user's consent before sharing the user's information. Learn more about [configuring user attributes for applications](../../guides/authentication/user-attributes/).

In {{ product_name }}, you can either display a screen to request consent for user attributes or skip this step, as explained below.

## Get consent for user attributes

Once the user is logged in, {{ product_name }} requests consent to share the user's attributes with the application.

![Provides consent for attributes in {{ product_name }}](../../assets/img/guides/applications/attributes/oidc/provide-consent.png){: width="300"}

If the application requires **mandatory** attributes for which values are not specified in the [user profile](../../guides/users/manage-customers/#manage-the-customer-s-profile), {{ product_name }} will prompt the user to enter those values during login.

The user can do one of the following during login:

- Select specific user attributes and click **Allow**.

    This will share only the selected user attributes with the application. However, note that the user cannot unselect the mandatory user attributes.

- If the user does not want to share any of the requested user attributes, they can click **Deny**.

{{ product_name }} will not prompt for consent for the allowed attributes again unless a user revokes the provided consent via MyAccount.

## Disable the consent screen

If user consent is not required for your application to access user information, you can disable the consent screen as follows:

1. Sign in to the {{ product_name }} and select the application for which user consent needs to be disabled.
2. Go to the **Advanced** tab and enable **Skip login consent**.

   ![Skip login consent in {{ product_name }}](../../assets/img/guides/applications/attributes/skip-login-consent.png)