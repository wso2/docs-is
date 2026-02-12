### Create a workflow

To create a workflow, visit the **Workflows** section in the admin console and go to the **Approval Workflows** section.
Now you can create a new workflow by clicking on the **New Approval Workflow** button. You will be prompted to provide a
 name and description for the workflow.

### Configure workflow operations

Once you have provided the name and description, you can select the operations that this workflow should support.
The workflows support the following types of operations:

- **User Creation**: Triggered when a new user is created.
- **Self User Registration**: Triggered when a new user is self-registered.
- **User Deletion**: Triggered when a user is deleted.
- **Role Creation**: Triggered when a new role is created.
- **User Role Assignment**: Triggered when users are assigned to or removed from a role.

!!! note
    In the workflow creation page, you can select multiple operations if approval steps are common for those operations.

### Configure workflow steps

The final step in creating a workflow is to configure its steps. You can add multiple steps to a workflow, and each step can have multiple approvers. Approvers can belong to a configured role or be defined as individual users.

![Workflow steps configuration]({{base_path}}/assets/img/guides/workflows/workflow-steps-configuration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Once you have configured the steps, you can save the workflow. The workflow will now be available for use in the system.

!!! note
    If you assign admin user in the first step of approval and if admin creates a user, still workflow will be triggered.
    Other participants in the first step will also receive the approval request.

After creating the workflow, you can view its details, edit it, or delete it.

![Approval Workflow configuration]({{base_path}}/assets/img/guides/workflows/workflow-approval-edit.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To learn how to review the approval requests, see [Manage Approvals]({{base_path}}/guides/user-self-service/manage-approvals/).

{% if product_name == "WSO2 Identity Server" %}

## Handle users with pending approvals at login

Configure {{ product_name }} to handle login attempts from users with pending approval requests.

Add the following configuration to the `deployment.toml` file:

```toml
[[event_handler]]
name= "WorkflowPendingUserAuthnHandler"
subscriptions =["PRE_AUTHENTICATE_CLAIM_WITH_ID"]
```

Users with pending approvals see the following message when they attempt to log in.

![Signin Pending Approval]({{base_path}}/assets/img/guides/workflows/signin-pending-approval.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}
