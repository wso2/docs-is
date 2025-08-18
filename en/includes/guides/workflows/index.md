Workflows are series of steps that require to complete a selected operation in the {{ product_name }}. These workflows
should be configured by the administrators by defining the steps and the participants involved in each step.

### Create a workflow
To create a workflow, visit the **Workflows** section in the admin console and go to the **Approval Workflows** section.
Now you can create a new workflow by clicking on the **New Approval Workflow** button. You will be prompted to provide a
 name and description for the workflow.

### Configure workflow operations
Once you have provided the name and description, you can select the operations that this workflow should support.
The workflows are supported following types of operations:

- **User Creation**: Triggered when a new user is created.
- **User Deletion**: Triggered when a user is deleted.
- **Role Creation**: Triggered when a new role is created.
- **User Role Assignment**: Triggered when a users of a role has changed.

!!! note
    In the workflow creation page, you can select the multiple operations if approval steps are common for those operations.

### Configure workflow steps
The final configuration of the workflow creation is to configure the steps of the workflow. You can add multiple steps to a workflow and
each step can have multiple participants. The participants can be either users or roles. 

![Workflow steps configuration]({{base_path}}/assets/img/guides/workflows/workflow-steps-configuration.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Once you have configured the steps, you can save the workflow. The workflow will now be available for use in the system.

!!! note
    If you assign admin user in the first step of approval and if admin creates a user, still workflow will be triggered.
    And also other participants of the first step will also receive the approval request.


Once the workflow is created, you can view the details of the workflow, edit it or delete it. 
To approve the workflow, you need to go the approvals section under the User Management. See [Approve a workflow]({{base_path}}/guides/workflows/approve-workflow/) for more information on how to approve a workflow.

