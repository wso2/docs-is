# Organizations

If you have a business that offers Business-to-Business (B2B) solutions, you need to define the structure of your organization in {{ product_name }} so as to represent all your partner/supplier organizations. You can then share your applications and services with your partner/supplier organizations and allow them to manage their own identity and access management requirements.

- All partner/supplier organizations of your business should be set up as sub organizations of your primary organization in {{ product_name }}.

    !!! note
        See [Manage sub organizations]({{base_path}}/guides/organization-management/manage-suborganizations/) for instructions.

- Once the sub organizations are set up, you should onboard administrators to them. These Administrators can then use a separate administration portal created using {{ product_name }}'s B2B APIs to manage their respective sub organizations.

    !!! note
        See [Manage administration]({{base_path}}/guides/organization-management/manage-b2b-administration/) for instructions.

- The primary business organization needs to share applications with its sub organizations so that the users managed by the sub organizations can log in and use them.

    !!! note
        See [Share applications]({{base_path}}/guides/organization-management/share-applications/) for instructions.

- Try out a complete B2B use case.

    !!! note
        See  [Try a B2B use case]({{base_path}}/guides/organization-management/try-a-b2b-use-case/) for instructions.