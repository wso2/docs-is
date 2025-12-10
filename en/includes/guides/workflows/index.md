The new workflow framework supports long-running approval workflows for critical user management operations.

Workflows are a series of steps that are required to complete a selected operation in the {{ product_name }}. These workflows
should be configured by the administrators by defining the steps and the approvers involved in each step.

This new implementation enables organizations to design multi-step approval processes, where approvers can be assigned
based on roles or users, reflecting their permission levels and responsibilities. Administrators can configure these
workflows through the Console, while approvers can review and act on approval requests seamlessly from the My Account portal.

{% if product_name == "WSO2 Identity Server" %}
!!! note "Legacy BPS-based workflow connector"
    {{ product_name }} previously used a BPS (Business Process Server)-based approval workflow implementation. This implementation is still available as an [external connector](https://store.wso2.com/connector/identity-workflow-impl-bps){:target="_blank"}.

    **Key differences:**
    
    - The new workflow feature and the BPS-based implementation run independently.
    - Approval requests from the new workflow feature appear in **My Account** for review.
    - Approval requests from the BPS-based implementation remain accessible via the legacy approval API.
{% endif %}

## Workflow support in organizations

Approval-based workflow capabilities are available for organizations as well.

!!! note
    Workflows support user creation and role creation in organizations. However, they don't support the following sharing operations:

    - User sharing
    - Role sharing
    - Inviting parent users
