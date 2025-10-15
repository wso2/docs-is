### Create a workflow

To create a workflow, visit the **Workflows** section in the admin console and go to the **Approval Workflows** section.
Now you can create a new workflow by clicking on the **New Approval Workflow** button. You will be prompted to provide a
 name and description for the workflow.

### Configure workflow operations

Once you have provided the name and description, you can select the operations that this workflow should support.
The workflows are supported following types of operations:

- **User Creation**: Triggered when a new user is created.
- **Self User Registration**: Triggered when a new user is self registered.
- **User Deletion**: Triggered when a user is deleted.
- **Role Creation**: Triggered when a new role is created.
- **User Role Assignment**: Triggered when users of a role have changed.

!!! note
    In the workflow creation page, you can select multiple operations if approval steps are common for those operations.

### Configure workflow steps

The final configuration of the workflow creation is to configure the steps of the workflow. You can add multiple steps to a workflow and each step can have multiple approvers. The approvers can be belongs to a configured role or defined users.

![Workflow steps configuration]({{base_path}}/assets/img/guides/workflows/workflow-steps-configuration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Once you have configured the steps, you can save the workflow. The workflow will now be available for use in the system.

!!! note
    If you assign admin user in the first step of approval and if admin creates a user, still workflow will be triggered.
    And also other participants of the first step will also receive the approval request.

After creating the workflow, you can view its details, edit it, or delete it.

![Approval Workflow configuration]({{base_path}}/assets/img/guides/workflows/workflow-approval-edit.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To learn how to review the approval requests, see [Manage Approvals]({{base_path}}/guides/user-self-service/manage-approvals/).
