{% set product_name = "WSO2 Identity Server" %}
# Manage organizations

If you have a B2C (Business-to-Consumer) platform offering services to direct consumers, you can use a {{ product_name }} organization(root) to manage the identities and access requirements of your users. Note that your first organization (root) on {{ product_name }} is created when starting the {{ product_name }}.

!!! note 
    If you have a B2B platform, this will also be the organization (root) of your platform. Your organization (root) will work with other businesses to make your applications available to their users. Such businesses should be defined as [organizations]({{base_path}}/guides/organization-management/manage-suborganizations/) in your organization (root).

The following guides explain how you can create and manage these organizations in {{ product_name }}.

## Create a new organization (root)

To create a new organization (root) in {{ product_name }}:

1. 

!!! note
    If you a have B2B platform, you can now onboard your organizations. See the instructions on [setting up organizations]({{base_path}}/guides/organization-management/manage-organizations/) and build your B2B organization structure.

## Delete organization (root)

You cannot remove organization (root) using the {{ product_name }} Console.

## What's next?
- Learn about managing administrators and users of an organization (root) in the [user management]({{base_path}}/guides/users/) section.
