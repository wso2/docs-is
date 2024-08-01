{% set attribute_path = "**User Attributes and Stores**" %}
{% set user_attribute_change_verification = "## Verify attribute updates

To configure verification settings for user attribute updates:

1. On the WSO2 Identity Server Console, go to **User Attributes and Stores** > **Attributes**.

2. Select **User Attribute Change Verification** under **Manage Attributes**.

3. Select the required verification method.

    | Configuration | Description   |
    |---------------|---------------|
    | **Enable user email verification on update**  | Select to receive an email verification when the user's email address is updated. |
    | **Email verification on update link expiry time** | The expiry time of the verification email sent. |
    | **Enable user email notification on update** | Select to receive an email notification to the user's previously registered email address when it is updated. |
    | **Enable user mobile number verification on update** | Select to receive a verification SMS OTP when the user's mobile number is updated. |
    | **Enable mobile number verification by privileged users** | Allow privileged users to initiate mobile number verification on update. |

4. Click **Update** to save the configurations." %}

{% include "../../../../../../includes/guides/users/attributes/manage-attributes.md" %}