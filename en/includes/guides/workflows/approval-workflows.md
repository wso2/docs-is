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

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

By default, approval workflows trigger for all configured operations. You can optionally define rules to control when an approval workflow engages. This allows dynamic approval enforcement based on business requirements such as user attributes, roles, or user store domains.

To learn more on how to configure rules, see [Approval workflow rules]({{base_path}}/guides/workflows/workflow-rules/).
{% endif %}

### Configure workflow steps

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
The next step in creating a workflow is to configure its steps. You can add multiple steps to a workflow, and each step can have multiple approvers. Approvers can belong to a configured role or be defined as individual users.
{% else %}
The final step in creating a workflow is to configure its steps. You can add multiple steps to a workflow, and each step can have multiple approvers. Approvers can belong to a configured role or be defined as individual users.
{% endif %}

![Workflow steps configuration]({{base_path}}/assets/img/guides/workflows/workflow-steps-configuration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    If you assign admin user in the first step of approval and if admin creates a user, still workflow will be triggered.
    Other participants in the first step will also receive the approval request.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

### Configure notifications

After configuring the approval steps, you can set up notifications to keep approvers and the initiator informed about the workflow progress.

The following notification channels are available:

![Notification configuration]({{base_path}}/assets/img/guides/workflows/workflow-notification-configuration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- **Approver Notifications**: Notify the approvers assigned to review the request when a new approval task is ready. Select **Email**, **SMS**, or both.

    When enabled, approvers receive a notification with the request details and a link to review and take action.

    ![Approver notification email]({{base_path}}/assets/img/guides/workflows/workflow-notification-approver-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- **Notify Initiator on Completion**: Notify the user who initiated the request once the workflow reaches a final decision. Select **Email**, **SMS**, or both.

    When enabled, the initiator receives a notification with the outcome of the approval request.

    ![Initiator notification email]({{base_path}}/assets/img/guides/workflows/workflow-notification-initiator-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

Once you have configured the steps, you can save the workflow. The workflow will now be available for use in the system.

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
