# Self registration

You can enable users to self-register to your organization from the login page of the application. This creates a new user account for the user.

## Enable/Disable self-registration

To enable/disable user self-registration or to change the default configurations, see the following instructions:

1. On the {{ product_name }} Console, go to **Login & Registration**.

2. Under **User Onboarding**, click **Self Registration**.

    ![Configure self registration]({{base_path}}/assets/img/guides/organization/self-registration/configure-self-registration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Turn the toggle on to enable self-registration or off to disable it.

4. Configure the settings below.

    <table>
  <tbody>
    <tr>
      <td><b>Account verification</b></td>
      <td>
        If enabled, an email will be sent to the user's specified email address requesting account confirmation.<br><br>
        If this option is enabled along with the <b>Activate account immediately</b> option, users will be signed into the application without waiting for verification. However, you may leverage the account verification status to control the user experience and the level of access granted for the user. 
        [Learn how to get verification status](#get-the-verification-status-of-user-accounts).
      </td>
    </tr>
    <tr>
      <td><b>Account verification link expiry time</b></td>
      <td>Specifies the duration (in minutes) after which the confirmation link expires.</td>
    </tr>
    <tr>
      <td><b>Activate account immediately</b></td>
      <td>
        Activates the account without waiting for account verification.<br><br>
        However, you may leverage the account verification status to control the user experience and the level of access granted for the user. 
        [Learn how to get verification status](#get-the-verification-status-of-user-accounts).
      </td>
    </tr>
    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
    <tr>
      <td><b>Display message if username unavailable</b></td>
      <td>
        Display a message to the user from the registration page if the selected username is already taken. Enable this with caution, as it may lead to username enumeration.
      </td>
    </tr>
    {% endif %}
    <tr>
      <td><b>Enable auto login</b></td>
      <td>
        When a user self-registers:
        <ul>
          <li>If MFA is not configured, the user is redirected straight into the application without having to log in.</li>
          <li>If MFA is configured, the initial level of authentication is bypassed, and the user is directed straight to the next configured authentication steps.</li>
        </ul>
        Note that if <b>Account Verification</b> is enabled, it is mandatory to also enable <b>Activate account immediately</b> to enable auto login.
      </td>
    </tr>
  </tbody>
</table>


## Configure self-registration methods

Users may self-register to your organization using the same methods configured as sign-in options in your application.

Refer to the documentation on how to [configure sign-in options]({{base_path}}/guides/authentication/) for your application.

!!! note
    Currently, {{ product_name }} does not support Magic Links for self-registration.

During user self-registration, the available methods are displayed to the user as shown below.

![Self sign-up methods]({{base_path}}/assets/img/guides/organization/self-registration/sign-up-methods.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

For information on how a user can self-register, refer to [Try self-registration]({{base_path}}/guides/user-self-service/self-register/).

## Customize the self-registration form

If a user decides to self-register using email, the following form is displayed to the user.

![Self registration form]({{base_path}}/assets/img/guides/organization/self-registration/self-register-form.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You can follow the instructions below and customize the attributes presented during self-registration.

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click on **Attributes**.
2. Click the **Edit** icon on the attribute that you wish to add/remove from the registration form.

    ![customize user attributes in self-registration form]({{base_path}}/assets/img/guides/organization/self-registration/self-registration-form-attributes.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select **Display this attribute on the user's profile**. The attribute will now appear on the self-registration form presented to the user (Uncheck the attribute to remove from the registration form).
4. Select **Make this attribute required on the user's profile** if it is a mandatory attribute.

!!! note
    Learn more about [user attributes]({{base_path}}/guides/users/attributes/manage-attributes/).

## Get the verification status of user accounts

The verification status of a user account indicates whether or not the user has confirmed the account through email verification. You may leverage this status to enforce access control or tailor the user interface of your application.

This capability is especially useful when you have self-registered users. For example, you may want self-registered users with unverified accounts to only have read access to your application, whereas verified users may get complete access.

!!! tip
    
    To implement this scenario, you must enforce account verification for self-registered users and activate accounts immediately without waiting for verification.</br></br> Learn more in [enable/disable self-registration](#enabledisable-self-registration).

You can get the account verification status of users through the [SCIM2 API]({{base_path}}/apis/scim2/scim2-users-rest-api/) as shown below.

{% if product_name == "Asgardeo" %}

- To get your own information, invoke the `/scim2/Me` endpoint:

    ```bash 
    https://api.asgardeo.io/t/{organization_name}/scim2/Me
    ```

- To get information about other users in your organization, invoke the `/scim2/Users/<user_id>` endpoint:

    ```bash 
    https://api.asgardeo.io/t/{organization_name}/scim2/Users/{user_id}
    ```

{% else %}

- To get your own information, invoke the `/scim2/Me` endpoint:

    ```bash 
    https://localhost:9443/scim2/Me
    ```

- To get information about other users in your organization, invoke the `/scim2/Users/<user_id>` endpoint:

    ```bash 
    https://localhost:9443/scim2/Users/{user_id}
    ```

{% endif %}

The following is part of the API response:

``` text
"roles": [
    {
        "display": "selfsignup",
        "value": "a85d4baf-2e7a-37b1-a722-d4d427039736",
        "$ref": "https://{{ host_name }}{{ organization_path_param }}/scim2/v2/Roles/16ba9acb-fa30-42ef-8e25-29b557862124",
        "audienceValue": "<organization id>",
        "audienceType": "organization",
        "audienceDisplay": "<organization name>"
    },
    ......
    ],
"{{ scim_schema_for_wso2_custom_claims }}": {
    "emailVerified": "true",
    "accountConfirmedTime": "2023-02-16T03:07:34.392293Z"
    .....
}
```
Note the following details in the response payload:



!!! abstract ""
    - If the `role.display` parameter is set to `selfsignup`, the user has self-registered.
    - Under the `urn:scim:wso2:schema` schema, if the `emailVerified` parameter is available, the user has already clicked the email link to verify the account. This parameter will have the following values:

        - `true` - User has successfully verified the account.
        - `false` - User's account verification attempt has failed.

    - The `accountConfirmedTime` parameter will only be available under the same schema when email verification is successful for self-registered users.

Once you have identified the `emailVerified` status of the user and the method by which the user is onboarded (self-registration or onboarded by an administrator), you can enforce any access restrictions for that user through your application logic.

