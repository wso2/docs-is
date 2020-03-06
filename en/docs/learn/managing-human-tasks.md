# Managing Human Tasks

Human tasks are the steps that require human interaction in order to allow the process of the operation to proceed.  Follow the steps below, to test the workflow.

1.  Sign in to WSO2 Identity Server with the admin credentials.
2.  Create a user with the name `BOBBY`. After you successfully create the
    user, it will be greyed out as shown below until a manager approves
    the addition of the user account.

    !!! tip
    
        All pending status workflows are denoted in this manner with
        disabled or greyed out functions.
    

    ![workflow-pending-status](../assets/img/using-wso2-identity-server/workflow-pending-status.png)  

    1.  [Sign in to the User Portal](../../learn/user-portal/#accessing-the-user-portal-and-its-components) as a manager at this link: <https://localhost:9443/user-portal>  
        ![pending-approvals](../assets/img/using-wso2-identity-server/pending-approvals.png)   
          
    2.  Click **View details** under **Pending Approvals**.
    3.  In the resulting screen, select the **Workflow Profile engine** you want to access from the drop down menu. You can also filter the tasks from it’s current status by selecting the required       category from the **Task Status** drop down menu. A table of tasks will appear based on the parameters you specified. The “DEFAULT” task status category captures the aggregate task statuses of “READY” and “RESERVED”.

        ![workflow-task-status](../assets/img/using-wso2-identity-server/workflow-task-status.png) 

3.  Click on the relevant **Task Id** to access the details of the  selected task and click on the button corresponding to a state to move the state of the selected task to a new state  and to complete
    the workflow approval process (e.g. clicking **Approve** will approve the pending task and complete the workflow  process).  
    ![approving-pending-task](../assets/img/using-wso2-identity-server/approving-pending-task.png)   

    | Operation  | Description                                                                                                                                                               |
    |------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Claim      | Get the approval task assigned to the logged in user. If there are multiple users eligible for this task, those cannot claim this task until this user releases this task. |
    | Approve    | Approve the task.                                                                                                                                                         |
    | Disapprove | Disapprovethe task. The requested operation will be canceled.                                                                                                             |
    | Release    | Releasethe task so that other user can claim and approve or disapprove it.                                                                                                |

!!! info 
    The workflow comes with some advanced features such as:

    -   [Multi-step approvals](../../learn/using-workflows-with-user-management)
    -   [User specific approvals](../../learn/using-workflows-with-user-management)
    -   [Multiple role based approvals](../../learn/using-workflows-with-user-management)

    Instead of a one-step approval, there can be multiple steps to the approval flow. For example, a workflow with two step approval where in the first step the role to authorize the request is the Manager and in the second step the role to authorize the request is the SeniorManager. In this case, when a user is added to the system, only users with Manager role can initially see the pending approvals. After the users with this role approves the pending tasks, then the users with SeniorManager role can see the pending tasks. After both the users approve, the task is completed.
