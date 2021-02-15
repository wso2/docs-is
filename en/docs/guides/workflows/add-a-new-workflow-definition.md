# Add a New Workflow Definition

This section explains how to add a new workflow in WSO2 Identity Server. These workflows provide a means of fine-tuning the process of approving accounts.

Let's get started.

!!! tip "Before you begin"
    
    1.  Create the user roles that you plan to approve users with along with the following permissions. Note that the domain must be specified as **Internal**, else it will be considered as a 'group' instead of a 'role'. 
        -   Login
        -   Human Tasks > View Task List
        -   Workflow Management > BPS Profiles >View

        For instructions, see [Configuring Roles and Permissions](../../../guides/identity-lifecycles/manage-roles-overview).
    
    2.  Assign users to the roles that you created. For instructions, see [Configuring Users](../../../guides/identity-lifecycles/manage-user-overview).
    

1.  On the **Main** tab of the Management Console, click **Manage > Workflow Definition > Add**.

2.  Enter a `workflow name` and `description` and click **Next**.     
    <html>
    <head>        
    </head>
    <body>
        <img src="../../../assets/img/guides/workflows/add-workflow-definitions.png" width="500">
    
    </body>
    </html> 

3.  Set the required approval levels. 

    !!! example

        You may require the users with a `Manager` role to first approve user accounts followed by approval from users with a `SeniorManager` role. To set up this scenario:

        1.  To add an approval level, click **Add Approval Step**.    
            Each approval step represents a user approving an account of another user. The user that approves the account can have a specific role or can simply be a specific user. In this
            scenario, users that are assigned to a specific user role approve accounts.
        2.  To serach a user role in a specific user store, select the **Search Roles** radio button. Alternatively, to search for a specific user, select the **Search Users** radio button.
        3.  To select the user store that your user or role resides in, choose it from the **Select Domain** drop-down.
        4.  Enter the `role name` or `user name` and click **Search Roles**.
        5.  Select the check-box associated with the user name or user role name that you require and click **Add Selected Roles** or **Add Selected Users**.
        6.  Click **Next** to move to the next step.   
            ![workflow-fields](../../../assets/img/guides/workflows/workflow-fields.png)

              
    !!! info 
        The Workflow Template that is seen in the above sample, defines the template for a specific workflow. A template will have a specific flow where the parameters can be customized (eg. Send an email notification for some users, get approval from a user to continue). WSO2 Identity Server supports custom templates that can be deployed as OSGi services. For more information on writing workflow templates, see [Writing a Custom Workflow Template](../../../extend/workflows/write-a-custom-workflow-template).

4.  Enter the deployment information of the template as described below.

    | Attribute    | Description                                                                                                                                                                                                                                                                                                            |
    |--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | BPS Profile  | This is the name of the required BPS profile. This field defines the deployment type of the workflow template. Other custom execution deployment types are also supported, where you will be able to select the desired executor for a given use case. (i.e Dropdown will be appeared in the UI to select the required executor). |
    | Task Subject | This is the subject of the workflow request for approval.                                                                                                                                                                                                                                                                          |
    | Task Detail  | This is the body of the workflow request for approval.                                                                                                                                                                                                                                                                              |

    ![deployment-information](../../../assets/img/guides/workflows/deployment-information.png) 

    !!! note
    
        The same template can have multiple deployment types (eg. A
        notification template may have implementations with sending emails
        or sending human task notifications), whereas in some templates
        there will only be a single implementation.
    

5.  Click **Finish** to complete the process. You will be able to view
    the workflow you just added, by navigating to **Workflow Definitions \> List** under the **Manage** Section.

---

## What's next?

Now you need to add the workflow you created to an operation. For more
information, see [Engaging a Workflow in an
Operation](../../../guides/workflows/engage-a-workflow-in-an-operation).
