<!-- markdownlint-disable-next-line -->
When a user logs in to applications, {{ product_name }} prompts for the user's consent to access the user attributes the application requires. The user can view the consents given to applications and revoke them if needed.

Given below are the steps to follow.

1. Sign in to the My Account portal.
2. Click **Security > Manage Consents**.
3. View the applications for which consent is given.
4. Select an application and click **See more**. The attributes shared with the selected application are listed.
   ![View consents]({{base_path}}/assets/img/guides/organization/self-service/myaccount/view-consents.png)
5. You can do one of the following:
    - Clear the attributes individually and click **Update**. This removes access to the unselected user attributes for the given application.
    - Click **Revoke** to revoke all the user attributes shared with that application.

If consent is revoked for a user attribute, the user will be prompted for consent in the next login attempt to that application.
