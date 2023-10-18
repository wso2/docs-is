# Authorization policies for apps

In the context of {{ product_name }}, an authorization policy can be engaged when authorizing an API resource to an application. The policy selection determines the enforcement mechanism for controlling access to the API resource. {{ product_name }} offers two options:

- **Role-Based Access Control (RBAC)**: This approach allows developers to enforce authorization to API resources based on application roles. The process flow once a user selects RBAC is as follows

    1. The user attempts to access an application with controlled access to API resources.
    2. {{ product_name }} verifies the user's group assignment.
    3. {{ product_name }} retrieves the user's roles by checking the group-to-role mappings.
    4. {{ product_name }} evaluates the permissions associated with the user's roles.
    5. Based on the assigned permissions, {{ product_name }} grants or denies the user with controlled access to the API resources.

    To summarize, {{ product_name }} validates the user's group assignment, determines the roles based on the group-to-role mappings, examines the permissions associated with the roles, and decides whether to permit or restrict the user's access to the API resources.

- **No Authorization Policy**: If an authorization policy is not required for an API resource, no authorization will be applied by default. This option allows users to access the API resource based on authentication and consent without any additional authorization requirements. Choosing this policy will provide unrestricted access for the API resource.

When configuring an authorization policy, it is important to carefully consider the security requirements of the API resource and select the appropriate policy that aligns with the desired level of access control.
