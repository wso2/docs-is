{% set product_name = "WSO2 Identity Server" %}
{% set admin_role_name = "admin" %}

# Set up organizations

If you are a business having a B2B (Business-to-Business) platform, you can create organizations to manage other businesses that are partnered with you.

!!! note
    Explore how you can [structure {{ product_name }} organizations]({{base_path}}/guides/organization-management/) to fit your business model.

## Prerequisites

To create organizations, you need to have organization management privileges in the organization (root).

## Create an organization

Follow the steps given below to create an organization.

1. First, login to your organization (root) from the {{ product_name }} Console.
2. On the {{ product_name }} Console, go to **Organization Management** > **Organizations** and click **Add Organization**.
3. In the **Add Organization** dialog box that opens, enter a name and description for your organization.

    ![Create organization]({{base_path}}/assets/img/guides/organization/manage-organizations/add-organization.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Register** to add the new organization. You will now see your organization listed as below.

    ![The list of organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/organization-list.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Switch** next to the organization name to switch to the new organization's console.

!!! note
    As the creator of the organization, you will be assigned to the {{ admin_role_name }} role of the organization by default, which grants you the following privileges from the console.

    - Update / Delete users.
    - Create a group and assign users.
    - Assign users and groups to roles.
    - Create identity providers.
    - Update the login options and general information of the applications shared from the organization (root). Learn more about [shared applications]({{base_path}}/guides/organization-management/manage-b2b-organizations/share-applications/).
    - Configure the branding of the organization. Learn more about [branding]({{base_path}}/guides/branding/configure-ui-branding/).
    - Create organizations.

## Add organization attributes

{{ product_name }} lets you maintain additional data about the organization.

For example, you can add information about the organization's location, country, number of employees, etc.

To add additional attributes of your organization:

1. Login to the organization (root) and go to **Organizations**.
2. Select the organization to which you wish to add additional attributes.
3. Go to the **Attributes** tab and add attributes by entering a **Name** and **Value**.
4. Click **+** to add the new organization attribute.

    ![Add organization attributes]({{base_path}}/assets/img/guides/organization/manage-organizations/add-organization-attributes.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the configurations.

## Switch between organizations

When you have multiple [organizations]({{base_path}}/guides/organization-management/manage-organizations/) for your primary business organization, you can switch between them on the {{ product_name }} Console by selecting the required organization from the list as shown below.

![organizations]({{base_path}}/assets/img/guides/organization/manage-organizations/organizations.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

## Create an organization for your organization

Organization admins can create new organization for their organizations.

To create a new organization for your organization:

1. On the {{ product_name }} Console, [switch to your organization](#switch-between-organizations).
2. Go to **Organizations** and click **+ Add Organization**.
3. In the **Add Organization** dialog box that opens, enter a unique name and description for your organization.
4. Click **Register** to add the new organization.

## Branding for organizations

You can configure UI branding, and email branding for the organization by switching to the organization console on {{ product_name }} Console.

If the organization doesn't have its own branding configurations, it will inherit the UI branding, and email branding configurations from the nearest ancestor organization which has branding configurations.

!!! note
    See the instructions on:

    - [how to configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/) for organizations.
    - [how to customize email branding]({{base_path}}/guides/branding/customize-email-templates/#customize-email-branding) for organizations.

## Delete organizations

You can delete any of the organizations of your organization (root) as follows:

1. Login to your organization (root) on the {{ product_name }} Console.
2. Go to **Organizations** to view the list of organizations.
3. Click the delete icon next to the organization you want to delete.

    ![Delete an organization]({{base_path}}/assets/img/guides/organization/manage-organizations/delete-organization.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Select the checkbox and confirm your action.
