# Managing Human Tasks

Human tasks refer to steps that require human interaction in order to
allow the process of the operation to proceed. This is a main feature of
WSO2 Business Process Server, however the capability has been added to
IS as well. To test the workflow, follow the steps below.

1.  Log in to the WSO2 IS with the admin user credentials.
2.  Create a user with the name BOBBY. After you successfully create the
    user, it will be greyed out as shown below until a manager approves
    the addition of the user account.

    !!! tip
    
        All pending status workflows are denoted in this manner with
        disabled or greyed out functions.
    

    ![](attachments/103330281/103330282.png)  

    1.  [Login to the IS User
        Portal](Using-the-End-User-Dashboard_103330474.html#UsingtheEndUserDashboard-Accessingthedashboardanditscomponents)
        as a manager at this link: <https://localhost:9443/dashboard>  
        ![](attachments/103330281/103330283.jpg){width="700"}  
          
    2.  Click **View details** under **Pending Approvals**.
    3.  In the resulting screen, select the **Workflow Profile engine**
        you want to access from the drop down menu. You can also filter
        the tasks from it’s current status by selecting the required
        category from the **Task Status** drop down menu. A table of
        tasks will appear based on the parameters you specified. The
         “DEFAULT” task status category captures the aggregate task
        statuses of “READY” and “RESERVED”.

        ![](attachments/103330281/103330284.png){width="700"}

3.  Click on the relevant **Task Id** to access the details of the
    selected task and click on the button corresponding to a state to
    move the state of the selected task to a new state  and to complete
    the workflow approval process (e.g. clicking **Start** and then
    **Approve** will approve the pending task and complete the workflow
    process) .  
    ![](attachments/103330281/103330285.png){width="700"}  

    | Operation  | Description                                                                                                                                                               |
    |------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Claim      | Get the approval task assigned to the logged in user. If there are multiple users eligible for this task, those can't claim this task until this user releases this task. |
    | Approve    | Approve the task.                                                                                                                                                         |
    | Disapprove | Disapprovethe task. The requested operation will be canceled.                                                                                                             |
    | Release    | Releasethe task so that other user can claim and approve or disapprove it.                                                                                                |

The workflow comes with some advanced features such as:

-   [Multi-step
    approvals](https://docs.wso2.com/display/IS540/Using+Workflows+with+User+Management)
-   [User specific
    approvals](https://docs.wso2.com/display/IS540/Using+Workflows+with+User+Management)
-   [Multiple role based
    approvals](https://docs.wso2.com/display/IS540/Using+Workflows+with+User+Management)

Instead of a one step approval, there can be multiple steps to the
approval flow. For example, a workflow with two step approval where in
the first step the role to authorize the request is the M anager and in
the second step the role to authorize the request is the S eniorManager
. In this case, when a user is added to the system, only users with M
anager role can initially see the pending approvals. After the users
with this role approves the pending tasks, then the users with S
eniorManager role can see the pending tasks. After both the users
approve, the task is completed.
