# Manage organizations

If you have a B2C (Business-to-Consumer) platform offering services to direct consumers, you can use an {{ product_name }} organization to manage the identities and access requirements of your users. Note that your first organization on {{ product_name }} is created when you [sign up to {{ product_name }}](../../get-started/create-asgardeo-account/).

!!! note
    If you have a B2B platform, this will also be the primary organization of your platform. Your primary organization will work with other businesses to make your applications available to their users. Such businesses should be defined as [sub organizations](../../guides/organization-management/manage-b2b-organizations/manage-suborganizations/) in your primary organization.

The following guides explain how you can create and manage these organizations in {{ product_name }}.

## Create a new organization

To create a new organization in {{ product_name }}:

1. Select the organization list and click **New Organization**.
    ![Create new organization](../../assets/img/guides/organization/manage-organizations/create-new-organization.png)
2. Enter a name for your organization and click **Create**.
    ![Create guardio organization](../../assets/img/guides/organization/manage-organizations/create-guardio-org.png)

The new organization is now available in the organization list.

!!! note
    If you a have B2B platform, you can now onboard your sub organizations. See the instructions on [setting up sub organizations](../../get-started/create-asgardeo-account/) and build your B2B organization structure.

## Switch between organizations

When you have multiple organizations, you can switch between them on the {{ product_name }} Console by selecting the required organization from the list.

The list of primary organizations will show all the organizations you own or to which you have administrator access.

![Root organizations](../../assets/img/guides/organization/manage-organizations/root-organizations.png)

## Delete organizations

You cannot remove organziations using the {{ product_name }} Console. If you have such a requirement, contact the {{ product_name }} team at **asgardeo-help@wso2.com**.
If you are a B2B platform and you want to remove a sub organization in your primary organization, see the instructions on [deleting sub organizations](../../guides/organization-management/manage-b2b-organizations/manage-suborganizations/#delete-suborganizations).

!!! note Before you begin
    Note the following before you proceed to delete a primary organization: </br>
    - A deleted organization cannot be restored. Proceed with caution.
    - Only an organization owner can request a primary organization to be deleted.
    - Be sure to use the same email address of your owner user account to send the request.
    - If you remove all the primary organizations you own in {{ product_name }}, your user account will also be deleted from {{ product_name }}. <br/>

To remove any of your primary organizations, send an email to `asgardeo-help@wso2.com` with the required details listed below. This information will help the {{ product_name }} team confirm the authenticity of your request.
- The name of the organization you want to delete.
- The first name, last name, and email address of your (owner’s) {{ product_name }} user account.

## What’s next?
- Learn about managing administrators and users of an organization in the [user management](../../guides/users/) section.
- Learn about [managing the environments of your SDLC](../../guides/organization-management/manage-environments/).
