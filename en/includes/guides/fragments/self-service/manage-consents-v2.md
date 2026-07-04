<!-- markdownlint-disable-next-line -->
# Manage consents

The My Account portal lets users review and revoke the consents they have given, organized into application consents, policy consents, and communication preferences.

## Manage consents given to applications

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}
!!! note "Prerequisite"
    The consent view in My Account depends on the following configuration in your `deployment.toml`:

    ```toml
    [consent_mgt]
    enable_v2_api = true
    ```

    - **Enabled** — My Account shows a dedicated **Consents** section with Application Consents, Policy Consents, and Communication Preferences, as described below.
    - **Disabled** — My Account shows only **Manage Consents** (application consents only), located under the **Security** tab.
{% endif %}

When a user logs into an application, {{ product_name }} prompts the user to provide consent to the application to access user attributes.

Users can view these consents and if needed, revoke them using the My Account portal by following the steps below.

1. Sign in to the My Account portal.

2. Click **Consents**.

3. Under **Application Consents**, users can view the applications for which they have given consent.

4. Select an application and click **Show more** to display the attributes that are shared with the application.

    ![View consents]({{base_path}}/assets/img/guides/organization/self-service/myaccount/view-consents.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. To revoke consent, the user can do one of the following:

    - Clear attributes individually and click **Update**. This revokes consent for the deselected user attributes.

    - Click **Revoke** in the danger zone to revoke all user attributes shared with that application.

    !!! note
        If a user revokes consent to share an attribute with an application, {{ product_name }} prompts the user again for consent next time the user logs in to the same application.

## Policy consents

Users can review the policies they have agreed to, such as Privacy Policy and Terms of Service.

1. Sign in to the My Account portal.

2. Click **Consents**.

3. Under **Policy Consents**, users can view the list of policies they have accepted, along with the date each policy was accepted.

4. Select a policy and click **Show more** to view its details. Click **View Policy** to open the full policy document.

    ![View policy consents]({{base_path}}/assets/img/guides/organization/self-service/myaccount/view-policy-consents.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. To revoke consent for a policy, click **Revoke** in the danger zone.

    !!! note
        If a user revokes consent for a policy, {{ product_name }} may prompt the user to consent again the next time the user accesses the service.

## Communication preferences

Users can review and manage their communication preferences, such as opting in or out of marketing emails or newsletters.

1. Sign in to the My Account portal.

2. Click **Consents**.

3. Under **Communication Preferences**, users can view the communication types they have consented to, such as newsletters.

4. Select a communication preference and click **Show more** to display the attributes that are shared.

    ![View communication preferences]({{base_path}}/assets/img/guides/organization/self-service/myaccount/view-preference-consents.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. To update or revoke a communication preference, the user can do one of the following:

    - Uncheck the attributes to revoke and click **Update** to save the changes.

    - Click **Revoke** in the danger zone to remove consent for all attributes of that communication preference.
