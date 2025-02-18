# Set up organizations

As a B2B (Business-to-Business) service provider, you can use {{product_name}} organizations to represent your partner businesses. This guide explains how you can manage these organizations.

!!! note "Before you begin"

    {% if product_name == "Asgardeo" %}
    - [Define your primary business organization]({{base_path}}/guides/your-asgardeo/manage-root-organizations/).
    - Ensure you have organization management privileges in the organization (root).
    {% else %}
    Ensure you have organization management privileges in the organization (root).
    {% endif %}

## Create an organization

Follow the steps given below to create an organization.

1. Login to your organization (root) from the {{ product_name }} Console.
2. On the {{ product_name }} Console, go to **Organization Management** > **Organizations** and click **Add Organization**.
3. In the **Add Organization** dialog box that opens, enter a name and description for your organization.

    ![Create organization]({{base_path}}/assets/img/guides/organization/manage-organizations/add-organization.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Register** to add the new organization.

5. View the created organization under **Organizations**.

    ![The list of organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-list.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click the **Switch** icon next to the organization name to switch to its console.

!!! note
    As the creator of the organization, you will be assigned to the {{ admin_role_name }} role of the Console application by default, which grants you the following privileges.

    - Update / Delete users.
    - Create a group and assign users.
    - Assign users and groups to roles.
    - Create identity providers.
    - Update the login options and general information of the applications shared from the organization (root). Learn more about [shared applications]({{base_path}}/guides/organization-management/share-applications/).
    - Configure the branding of the organization. Learn more about [branding]({{base_path}}/guides/branding/configure-ui-branding/).
    - Build an oragnziation hierarchy by creating organizations.

## Add organization attributes

{{ product_name }} lets you maintain additional data about organizations. For example, you can add information about the organization's location, country, number of employees, etc.

To add additional attributes for your organization:

1. Login to the organization (root) and go to **Organizations**.
2. Select the organization to which you wish to add additional attributes.
3. Go to the **Attributes** tab and add attributes by entering a **Name** and **Value**.
4. Click **+** to add the new organization attribute.

    ![Add organization attributes]({{base_path}}/assets/img/guides/organization/manage-organizations/add-organization-attributes.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the configurations.

{% if organization_search_content %}
{{ organization_search_content }}
{% endif %}

## Switch to an organization

You can switch to a child organization on the {{ product_name }} Console by selecting the required organization from the list as shown below.

![organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-switch.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Build an organizational hierarchy

Organizations can be structured hierarchically in {{product_name}}. This means that if you are a parent organization, you may have multiple child organizations and each child organization can have their own child organizations and so on. This enables you to easily reflect the real-world structure of your business in {{product_name}}.

If you are a parent organization admin and you wish to create a new organization in your child organization:

1. On the {{ product_name }} Console, [switch to your organization](#switch-between-organizations).
2. Go to **Organizations** and click **Add Organization**.
3. In the **Add Organization** dialog box that opens, enter a unique name and description for your organization.
4. Click **Register** to add the new organization.

## Branding for organizations

You can configure UI branding, and email branding for your own organization from the {{ product_name }} Console.

If the organization doesn't have its own branding configurations, it will inherit the UI branding, and email branding configurations from the nearest ancestor that has configured branding.

!!! note
    See the instructions on:

    - [how to configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/) for organizations.
    - [how to customize email branding]({{base_path}}/guides/branding/customize-email-templates/#customize-email-branding) for organizations.

## Disable organizations

You can disable an organization by logging into its parent organization.

To disable an organization:

1. Login to the parent organization on the {{ product_name }} Console.
2. Go to **Organizations** to view the list of organizations.
3. Select the organization you want to disable.
4. In the **Danger Zone**, turn the **Disable Organization** toggle on to disable the organization. Turn it off to enable the organization.

    ![Disable an organization]({{base_path}}/assets/img/guides/organization/manage-organizations/disable-organization.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    - If the organization you want to disable has any active child organizations, you will not be able to proceed until those child organizations are disabled.
    - Once an organization is disabled, users will lose access to applications and any other resources associated with that organization.

## Delete organizations

You can delete an organization by login into its parent organization.

To delete an organization:

1. Login to the parent organization on the {{ product_name }} Console.
2. Go to **Organizations** to view the list of organizations.
3. Click the delete icon next to the organization you want to delete.

    ![Delete an organization]({{base_path}}/assets/img/guides/organization/manage-organizations/delete-organization.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Select the checkbox and confirm your action.

!!! note
    If the organization you intend to delete has child organizations, you won't be able to proceed until you have deleted them.
