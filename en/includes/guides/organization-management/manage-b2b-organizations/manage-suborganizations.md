# Set up sub organizations

If you are a business having a B2B (Business-to-Business) platform, you can create sub organizations to manage other businesses that are partnered with you.

!!! note
    Explore how you can [structure {{ product_name }} organizations]({{base_path}}/guides/organization-management/) to fit your business model.

## Prerequisites

To create sub organizations:

- You need to first have your [primary business organization]({{base_path}}/guides/organization-management/manage-organizations/) defined.
- You need to be an administrator in the primary business organization.

## Create a sub organization

Follow the steps given below to create a sub organization.

1. First, select your primary organization from the list.
2. On the {{ product_name }} Console, go to **Sub Organizations** and click **Add Sub Organization**.
3. In the **Add Sub Organization** dialog box that opens, enter a name and description for your organization.

    ![Create suborganization]({{base_path}}/assets/img/guides/organization/manage-organizations/add-suborganization.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Register** to add the new sub organization. You will now see your sub organization listed as below.

    ![The list of suborganizations]({{base_path}}/assets/img/guides/organization/manage-organizations/sub-organization-list.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click the **Switch** icon next to the sub organization to go to the sub organization console.

!!! note
    As the creator of the sub organization, you will be assigned to the Administrator role of the sub organization by default, which grants you the following privileges from the console.

    - Update / Delete users.
    - Create a group and assign users.
    - Create identity providers.
    - Update the login options and general information of the applications shared from the primary organization. Learn more about [shared applications]({{base_path}}/guides/organization-management/manage-b2b-organizations/share-applications/).

## Add sub organization attributes

{{ product_name }} lets you maintain additional data about the sub organization.

For example, you can add information about the organization's location, country, number of employees, etc.

To add additional information about your sub organizations:

1. Switch to the primary organization and go to **Sub Organizations**.
2. Select the sub organization to which you wish to add additional attributes.
3. Go to the **Attributes** tab and add attributes by entering a **Name** and **Value**.
4. Click **+** to add the new organization attribute.

    ![Add organization attributes]({{base_path}}/assets/img/guides/organization/manage-organizations/add-organization-attributes.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the configurations.

## Switch between sub organizations

When you have multiple [sub organizations]({{base_path}}/guides/organization-management/manage-b2b-organizations/manage-suborganizations/) for your primary business organization, you can switch between them on the {{ product_name }} Console by selecting the required sub organization from the list as shown below.

![suborganizations]({{base_path}}/assets/img/guides/organization/manage-organizations/sub-organizations.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}


## Create a sub organization for your sub organization

!!! warning
    You need a paid {{ product_name }} subscription to use this feature. If you don't already have one, view the available [subscription plans](https://wso2.com/asgardeo/pricing/) and contact the {{ product_name }} sales team.

Sub organization admins can create new sub organization for their organizations.

To create a new sub organization for your sub organization:

1. On the {{ product_name }} Console, [switch to your suborganization](#switch-between-sub-organizations).
2. Go to **Sub Organizations** and click **+ Add Sub Organization**.
3. In the **Add Sub Organization** dialog box that opens, enter a unique name and description for your sub organization.
4. Click **Register** to add the new sub organization.

## Branding for sub organizations

Sub organizations will inherit the UI branding, email branding, and custom domain branding configurations from the root organization.

!!! note
    See the instructions on:

    - [how to configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/) for organizations.
    - [how to configure custom domains]({{base_path}}/guides/branding/configure-custom-domains/) for organizations.
    - [how to customize email branding]({{base_path}}/guides/branding/customize-email-templates/) for organizations.

## Delete sub organizations

You can delete any of the sub organizations of your primary organization as follows:

1. Switch to your primary organization on the {{ product_name }} Console.
2. Go to **Sub Organizations** to view the list of sub organizations.
3. Click the delete icon next to the sub organization you want to delete.

    ![Delete a suborganization]({{base_path}}/assets/img/guides/organization/manage-organizations/delete-suborganization.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Select the checkbox and confirm your action.
