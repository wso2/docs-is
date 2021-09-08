# Managing Human Tasks

Human tasks are the steps that require human interaction in order to allow the process of the operation to proceed.  Follow the steps below to test the workflow.

1.  Sign in to WSO2 Identity Server with the admin credentials.
2.  Create a user with the name `Alex`. After you successfully create the
    user, it will be greyed out as shown below until a manager approves
    the addition of the user account.

    !!! tip
        All pending status workflows are denoted in this manner with
        disabled or greyed out functions.
    
    ![workflow-pending-status](../assets/img/using-wso2-identity-server/console.png)  

3.  Access the console URL (`https://<IS_HOST>:<IS_PORT>/console`) and sign in as a manager.

4.  In the **Manage** tab, choose **Approvals** from the left panel.  

5.  Select the approval task corresponding to the request made for user, Alex.
    
6.  Click **Approve** to approve the pending task and complete the workflow process. Now the approval task will be changed to **Completed** state. 

    | Operation  | Description                                                                                                                                                               |
    |------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Claim      | Get the approval task assigned to the logged in user. If there are multiple users eligible for this task, those cannot claim this task until this user releases this task. |
    | Approve    | Approve the task.                                                                                                                                                         |
    | Reject | Disapprove the task. The requested operation will be canceled.                                                                                                             |
    | Release    | Release the task so that other user can claim and approve or disapprove it.                                                                                                |

!!! info 
    The workflow comes with some advanced features such as:

    -   [Multi-step approvals](../../learn/using-workflows-with-user-management)
    -   [User specific approvals](../../learn/using-workflows-with-user-management)
    -   [Multiple role based approvals](../../learn/using-workflows-with-user-management)

    Instead of a one-step approval, there can be multiple steps to the approval flow. For example, a workflow with two-step approval where in the first step the role to authorize the request is the Manager and in the second step the role to authorize the request is the SeniorManager. In this case, when a user is added to the system, only users with Manager role can initially see the pending approvals. After the users with this role approves the pending tasks, then the users with SeniorManager role can see the pending tasks. After both the users approve, the task is completed.
