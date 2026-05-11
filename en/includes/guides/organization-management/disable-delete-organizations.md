# Disable or delete an organization

When you no longer need an organization—or need to temporarily restrict access to it—you can disable or permanently delete it from the {{ product_name }} Console. Both actions are performed from the parent organization.

## Disable an organization

Disabling an organization temporarily blocks all user access to that organization's applications and resources, without permanently removing any data.

To disable an organization:

1. Sign in to the parent organization on the {{ product_name }} Console.
2. Go to **Organizations** to view the list of organizations.
3. Select the organization you want to disable.
4. In the **Danger Zone**, turn the **Disable Organization** toggle on to disable the organization. Turn it off to re-enable the organization.

    ![Disable an organization]({{base_path}}/assets/img/guides/organization/manage-organizations/disable-organization.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    - If the organization you want to disable has active child organizations, you must disable those child organizations first.
    - Once an organization is disabled, users lose access to all applications and resources associated with that organization.

## Delete an organization

Deleting an organization permanently removes it from the {{ product_name }} Console and blocks access to all of its resources.

To delete an organization:

1. Sign in to the parent organization on the {{ product_name }} Console.
2. Go to **Organizations** to view the list of organizations.
3. Click the delete icon next to the organization you want to delete.

    ![Delete an organization]({{base_path}}/assets/img/guides/organization/manage-organizations/delete-organization.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Select the checkbox and confirm your action.

!!! note
        - If the organization you want to delete has child organizations, you must delete those child organizations first.
    {% if product_name == "WSO2 Identity Server" %}
        - Deleting an organization removes it from the {{ product_name }} Console and blocks access to its resources. The associated data remains in the database. To permanently remove this data, run the cleanup scripts provided by WSO2. See [Clean up deleted organization resources]({{base_path}}/guides/organization-management/cleanup-organization-resources/) for more information.
    {% endif %}
