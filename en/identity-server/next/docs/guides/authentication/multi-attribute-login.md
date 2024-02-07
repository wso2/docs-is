# Multi-Attribute Login

{{product_name}} lets you configure multiple attributes as the login identifier. While username is the default login identifier, users can have the option to enter a mobile number, email address or any attribute of their choice.

!!! info "Supported flows"

    Multi-attribute login is supported in the following flows:

    -   Identifier first authenticator
    -   Username & Password Authenticator
    -   Authentication REST APIs
    -   Oauth Password grant
    -   Password recovery flow

The following section explains how to configure WSO2 identity server for multi-attribute login.

## Enable multi-attribute login

To configure multi-attribute login, follow the steps below:

1. On the {{product_name}} Console, go to **Login & Registration** > **Login Identifier** > **Multi Attribute Login**.
2. Toggle the switch to enable multi attribute login.
4. Add attribute URIs for attributes that users are allowed to use as login identifiers.
5. Click **Update** to save the changes.

![adding-attributes-for-multi-attribute-login]({{base_path}}/assets/img/guides/users/adding-attributes-for-multi-attribute-login.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Add regular expressions for allowed attributes

Once you have configured {{product_name}} for multi-attribute login, you need to provide regular expressions for the 
allowed user attributes. Some user attributes have regex defined by default. 

If you need to define regex for a user attribute, follow the steps below.

1.  On the {{product_name}} Console, go to **User Attributes and Stores** > **Attributes**.
2.  Click **Attributes** again under the **Manage Attributes** section.
3.  Click **Edit** for the attribute you want to update.
4.  Enter the regex pattern under the **Regular Expression** field.
5.  Click **Update** to save the changes.

![adding-regex-pattern-to-attributes]({{base_path}}/assets/img/guides/users/adding-regex-pattern-to-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Here are a few examples of regex patterns.

<table>
  <tr>
    <th>Attribute URI</th>
    <th>Example Regex pattern</th>
  </tr>
  <tr>
    <td>http://wso2.org/claims/emailaddress</td>
    <td>^([a-zA-Z0–9_\.\-])+\@(([a-zA-Z0–9\-])+\.)+([a-zA-Z0–9]{2,4})+$</td>
  </tr>
  <tr>
    <td>http://wso2.org/claims/mobile</td>
    <td>^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$</td>
  </tr>
  <tr>
    <td>http://wso2.org/claims/username</td>
    <td>^[a-zA-Z0–9._-]{3,}$</td>
  </tr>
</table>

!!! note
    Username regex configuration is already available in the user store configurations. You can update the regex pattern as needed. Refer to [User Store Properties]({{base_path}}/guides/users/user-stores/user-store-properties/) to learn more.

You have now successfully set up {{product_name}} to allow multi-attribute login.

## Try it out

When multi-attribute login is configured in {{product_name}}, application users can use any of the configured attributes to login. 

In this example scenario, let's allow users to use the mobile number as a login identifier:

1.  Configure multi-attribute login for the attribute `http://wso2.org/claims/mobile` and `http://wso2.org/claims/username`.
2.  Go to the My Account: `https://localhost:9443/myaccount`.
3.  Enter mobile number as the login identifier and click **Sign In**.

![adding-regex-pattern-to-attributes]({{base_path}}/assets/img/guides/users/login-with-mobile-number.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! Tip
    - **What happens if two users use the same value for an attribute?** 

        Multi-attribute login will not work for these users. Retaining uniqueness for attribute values avoids this conflict. Learn about [configuring the uniqueness of attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes).

