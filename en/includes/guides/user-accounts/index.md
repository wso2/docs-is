# Account management

This section explains how owners can create multiple organizations in the {{ product_name }} Console, switch between them, manage user attributes, perform account recovery, provide users with self-service capabilities, and mitigate risks via configuring security measures for user accounts.

- Organization owners can manage the resources within their organizations.

    See [Manage multiple organizations]({{base_path}}/guides/organization-management/manage-organizations/) for instructions.

- User attributes represent a user's information within an organization. These default attributes can either be mapped to OpenID Connect claims or SCIM 2 attributes.

    See [Manage user attributes]({{base_path}}/guides/users/attributes/) for instructions.

- In {{ product_name }}, accounts can be recovered by administrators or by the users themselves. Users can recover their forgotten passwords using the self-service passwords recovery option.

    See [Configure password recovery]({{base_path}}/guides/user-accounts/password-recovery/) for instructions.

- Users can self-register to an organization in {{ product_name }} via an application's login page.

    See [Configure self-registration]({{base_path}}/guides/user-accounts/configure-self-registration/) for instructions.

- When you onboard several users onto your organization, it is of utmost importance to secure their accounts from unauthorized logins or other unfavorable misuses. Some popularly effective methods include locking the account on consecutive failed login attempts and using reCAPTCHA to detect bots.

  See the following sections for instructions on configuring these security measures:

  - [Configure login-attempts security]({{base_path}}/guides/user-accounts/account-security/login-attempts-security/)
  - [Configure bot detection]({{base_path}}/guides/user-accounts/account-security/bot-detection/)