# Manage Human Tasks

Human tasks are the steps that require human interaction to allow the process of the operation to proceed. Follow the steps below to test the workflow.

1. Sign in to WSO2 Identity Server with the admin credentials.
2. Create a new user. After you successfully create the user, you will be able to see the user details are greyed-out until a user with the `Manager` role approves adding the user account.

    ![workflow-pending-status]({{base_path}}/assets/img/guides/workflows/console.png)  

3. Sign in to the Console app as a user with the `Manager` role.

4. Go to **Manage** > **Approvals**. You will see all the approval tasks in this page.

    ![pending-approvals]({{base_path}}/assets/img/guides/workflows/approvals.png)

5. Click on the approval task with the `RESERVED` state tag. You can view more information about the approval tasks and perform any of the following operations:

    | Operation  | Description  |
    |------------|--------------|
    | Claim      | Get the approval task assigned to the logged-in user. If there are multiple users eligible for this task, they cannot claim this task until this user releases this task. |
    | Approve    | Approve the task.    |
    | Reject | Disapprove the task. The requested operation will be canceled.   |

    ![workflow-task-status]({{base_path}}/assets/img/guides/workflows/pending-approval-task.png)

    For example, clicking **Approve** will approve the pending task and complete the workflow process. Once a pending task is approved the state of the approval task will be updated to `COMPLETED`.
    
    ![approving-pending-task]({{base_path}}/assets/img/guides/workflows/approved.png)


!!! info
    The workflow comes with some advanced features, such as:

    - Multi-step approvals
    - User-specific approvals
    - Multiple role-based approvals

    Instead of a one-step approval, there can be multiple steps to the approval flow. 
    
    **Example**
    
    Consider a workflow with two-step approval as follows: 

    - Step 1: The role to authorize the request is the `Manager`
    - Step 2: The role to authorize the request is the `SeniorManager`
    
    In this case, only users with a `Manager` role can initially see the pending approvals when a user is added to the system. After the users with this role approve the pending tasks, the users with the `SeniorManager` role can see the pending tasks. After both users approve, the task is completed.