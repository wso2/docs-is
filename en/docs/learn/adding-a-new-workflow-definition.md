# Adding a New Workflow Definition

The instructions in this section guide you through the process of adding
a new workflow in the WSO2 Identity Server. These workflows provide a
means of fine-tuning the process of approving accounts.

!!! note "Important"

    Before adding a new workflow,
    
    1.  Create the required roles to do the approval. To do this, follow the
        instructions available in the [Configuring Roles and
        Permissions](../../using-wso2-identity-server/configuring-roles-and-permissions) topic.

        !!! info 
            To enable users assigned to these roles to approve human tasks, the
            following permissions need to be enabled:
        
            -   Login
            -   Human Tasks\>View Task List
            -   Workflow Management\>BPS Profiles\>View
    
    2.  Assign users to the roles that you created. See [Configuring
        Users](../../using-wso2-identity-server/configuring-users) for more information on how to do this.
    

To add a new workflow, do the following.

1.  On the **Main** tab in the Management Console, click **Add** under
    **Workflow Definitions** in the **Manage** section.  
2.  Enter the name and description of the workflow and click **Next**
    .  
    ![add-workflow-definitions](../../assets/img/using-wso2-identity-server/add-workflow-definitions.png)
3.  Set the levels of approval that are required. For instance, you may
    require that users with a Manager role must first approve user
    accounts followed by approval from users with a SeniorManager role.
    To set up this scenario, you must do the following.

    1.  Add an approval level by clicking the **Add Approval Step**
        button. Each approval step represents a user approving an
        account of another user. The user that approves the account can
        have a specific role or can simply be a specific user. In this
        scenario, users assigned to a specific role can do the account
        approval.
    2.  You can search for the role in a specific user store by
        selecting the **Search Roles** radio button. Alternatively, you
        can search for a specific user by selecting the Search Users
        radio button.
    3.  Select the user store that your user or role resides in by
        choosing it from the **Select Domain** drop-down.
    4.  Enter the role name or username and click **Search Roles**.
    5.  Select the check-box associated with the username or role name
        that you require and click **Add Selected Roles** or **Add
        Selected Users**.
    6.  Click **Next** to move to the next step.  
        ![workflow-fields](../../assets/img/using-wso2-identity-server/workflow-fields.png)

          
    !!! info 
        The Workflow Template seen above defines the template for a
        specific workflow. A template will have a specific flow where
        the parameters can be customized (eg. Send an email notification
        for some users, get approval from a user to continue). Identity
        Server supports custom templates that can be deployed as OSGi
        services. More information on writing workflow templates can be
        found [here](../../develop/writing-a-custom-workflow-template).

4.  Fill in the deployment information of the template as described
    below. Use the screen capture as a guide for the sample values to
    enter.

    | Attribute    | Description                                                                                                                                                                                                                                                                                                            |
    |--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | BPS Profile  | Name of the required BPS Profile. This field defines the deployment type of the workflow template. O ther custom execution deployment types are also supported, where you will be able to select the desired executor for a given use case. (i.e Dropdown will be appeared in the UI to select the required executor). |
    | Task Subject | Subject of the workflow request for  approval                                                                                                                                                                                                                                                                          |
    | Task Detail  | Body of the Workflow request for approval                                                                                                                                                                                                                                                                              |

    ![deployment-information](../../assets/img/using-wso2-identity-server/deployment-information.png) 

    !!! note
    
        The same template can have multiple deployment types (eg. A
        notification template may have implementations with sending emails
        or sending human task notifications), whereas in some templates
        there will only be a single implementation.
    

5.  Click **Finish** to complete the process. You will be able to view
    the workflow you just added, by navigating to **Workflow Defi
    **nitions** \> List** under the **Manage** Section.

### What's next?

Now you need to add the workflow you created to an operation. For more
information, see [Engaging a Workflow in an
Operation](../../using-wso2-identity-server/engaging-a-workflow-in-an-operation).
