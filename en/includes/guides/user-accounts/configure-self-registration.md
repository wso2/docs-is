# Configure self-registration

[Users]({{base_path}}/guides/users/manage-users/) can self-register to an organization in {{ product_name }} via an application's login page. This creates a new user account in the organization.

## Enable/Disable self-registration

To disable this capability in your organization or to change the default configurations, see the following instructions:

1. On the {{ product_name }} Console, go to **Login & Registration** > **User Onboarding** and click **Self Registration**.

    ![Configure self registration]({{base_path}}/assets/img/guides/organization/self-registration/configure-self-registration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    The **Self Registration** section indicates whether or not it is already enabled.

2. Configure the below settings.

    - To disable self-registration, turn off the toggle.
    - To configure self-registration, update the following settings and click **Update**.
        <table>
            <tbody>
                <tr>
                    <td><b>Account verification</b></td>
                    <td>
                        Enables email verification at self-registration. That is, an email will be sent to the user's specified email address requesting account confirmation.</br></br>
                        Note that if you also have the <b>Activate account immediately</b> configuration enabled, users will be signed in to the application without waiting for the email confirmation. However, you have the option of using the account verification status to control the user experience and access level that should be granted to the user.
                        [Learn more](#get-the-verification-status-of-user-accounts).
                    </td>
                </tr>
                <tr>
                    <td><b>Account verification link expiry time</b></td>
                    <td>Specifies account verification link expiry time in minutes. If you enter 60 min, the account verification email expires after 60 min.</td>
                </tr>
                <tr>
                    <td><b>Activate account immediately</b></td>
                    <td>
                        Activates the account without waiting for account verification.</br></br>
                        However, you have the option of using the account verification status to control the user experience and access level that should be granted to the user.
                        [Learn more](#get-the-verification-status-of-user-accounts).
                    </td>  
                </tr>
                <tr>
                    <td><b>Enable auto login</b></td>
                    <td>Once a user self-registers,
                           <ul>
                           <li>if MFA is not configured, the user is redirected straight into the application without having to log in.</li>
                           <li>if MFA is configured, the authentication flow will bypass the first level and proceed to the next.</li>
                           </ul>
                        Note that it is mandatory to enable <b>Activate account immediately</b> if you need to enable auto login while <b>Account Verification</b> is enabled.
                    </td>
                </tr>
            </tbody>
        </table>

## Configure self-registration methods

A user is able to self-register to your organization using the same ways that you have configured as sign-in methods for your applications.

Refer to the documentation on how to [configure sign-in options]({{base_path}}/guides/authentication/) for your application.

!!! note
    Currently, {{ product_name }} does not support Magic Links for self-registration.

During user self-registration, the available methods are displayed to the user as shown below.

![Self sign-up methods]({{base_path}}/assets/img/guides/organization/self-registration/sign-up-methods.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

For information on how a user can self-register, refer to [Try self-registration]({{base_path}}/guides/user-self-service/self-register/).

## Customize the self-registration form

If a user decides to self-register using email, the default form that is presented to the user is as follows.

![Self registration form]({{base_path}}/assets/img/guides/organization/self-registration/self-register-form.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Follow the instructions below to customize the attributes that the form requests during self-registration.

1. On the {{ product_name }} Console, go to **Attribute Management** > **Attributes** and under the **Manage Attributes** section, click **Attributes** again.
2. Click **Edit** on the attribute that you want to customize.

    ![customize user attributes in self-registration form]({{base_path}}/assets/img/guides/organization/self-registration/self-registration-form-attributes.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select **Display this attribute on the user's profile**. The attribute will now appear on the self-registration form presented to the user.
4. Select **Make this attribute required on the user's profile** if you want to make the attribute mandatory for self-registration.

!!! note
    Learn more about [user attributes]({{base_path}}/guides/users/attributes/manage-attributes/).

## Get the verification status of user accounts

The verification status of a user account indicates whether or not the user has confirmed the account through email verification. When you develop your application, you can implement some logic based on this parameter setting.

This capability is beneficial when you have self-registered users. For example, you may want self-registered users with unverified accounts only to get read access to your application, whereas they should get full access once account verification is completed.

!!! tip
        To implement this scenario, you must enforce account verification for self-registered users and also allow the same users to access your applications before account verification is completed.</br></br>
        That is, both **Account verification** and **Activate account immediately** configurations should be enabled for self-registration in your organization.

You can get the account verification status of users through the [SCIM2 API]({{base_path}}/apis/{{scim2_api_path}}/) in {{ product_name }}.
Invoke the following SCIM2 endpoints:

- To get your own information, invoke the `/scim2/Me` endpoint:

    ```bash 
    https://{{ host_name }}{{ organization_path_param }}/scim2/Me
    ```

- To get information about other users in your organization, invoke the `/scim2/Users/<user_id>` endpoint:

    ```bash 
    https://{{ host_name }}{{ organization_path_param }}/scim2/Users/<user_id>
    ```

Note the following details in the response payload:

!!! note
    - If the `role.display` parameter is set to `selfsignup`, the user has self-registered.
    - Under the `{{ scim_schema_for_wso2_custom_claims }}` schema, if the `emailVerified` parameter is available, the user has already verified the account through email. This parameter will have the following values:

        - `true` - User has successfully verified the account.
        - `false` - User's account verification attempt has failed.

    - Under the `{{ scim_schema_for_wso2_custom_claims }}` schema, the `accountConfirmedTime` parameter will only be available when email verification is successful for self-registered users.

``` text
"roles": [
    {
        "display": "selfsignup",
        "value": "a85d4baf-2e7a-37b1-a722-d4d427039736",
        "$ref": "https://{{ host_name }}{{ organization_path_param }}/scim2/v2/Roles/a85d4baf-2e7a-37b1-a722-d4d427039736",
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

Once you have identified the `emailVerified` status of the user and the method by which the user is onboarded (self-registration or onboarded by an administrator), you can enforce any access restrictions for that user through your application logic.

