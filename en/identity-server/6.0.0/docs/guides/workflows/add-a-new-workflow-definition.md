# Add a workflow definition

Workflows provide a method of fine-tuning the process of approving accounts. This guide walks through how to add a new workflow in WSO2 Identity Server.

To add a new workflow:

!!! tip "Before you begin"
    1. Create the user roles with which you plan to approve users, along with the following permissions. Note that the domain must be specified as **INTERNAL**, or it will be considered a 'group' instead of a 'role'.
        -   `Login`
        -   `Human Tasks` > `View Task List`
        -   `Workflow Management` > `BPS Profiles` > `View`

        For more details, see how to [configure roles and permissions]({{base_path}}/guides/identity-lifecycles/manage-roles-overview).
    
    2. Assign users to the roles that you created. Note that the users should have `admin` permissions, else it will not be possible to perform workflow approvals. For more instructions, see [Configuring Users]({{base_path}}/guides/identity-lifecycles/manage-user-overview).


1. On the Management Console, go to **Manage > Workflow Definitions > Add**.

2. Enter a name and description for your workflow and click **Next**.
    ![Add workflow definition]({{base_path}}/assets/img/guides/workflows/add-workflow-definitions.png)

3. Click **Add Approval Step**.

    !!! note
        Each approval step represents a user approving an account of another user. The user who approves the account can have a specific role or be a specific user. In this scenario, users are assigned a specific user role to approve accounts.

    1. Search for the required Role/s or User/s and click **Add Selected Users** or **Add Selected Roles** respectively.

        !!! note
            You can click **Add Approval Step** again and follow the above step to add another approval step.
            ![Add multiple approval steps]({{base_path}}/assets/img/guides/workflows/multi-step-approval-step.png)

    2. Click **Next** to move to the next step.
        ![workflow-fields]({{base_path}}/assets/img/guides/workflows/workflow-fields.png)

    !!! info
        The Workflow Template in the above sample defines the template for a specific workflow. A template will have a specific flow where the parameters can be customized (e.g., Send email notifications for some users, get approval from a user to continue).
        WSO2 Identity Server supports custom templates that can be deployed as OSGi services. For more information on writing workflow templates, see [Writing a Custom Workflow Template]({{base_path}}/develop/extend/workflows/write-a-custom-workflow-template).

4. Enter the following deployment information.

    ![deployment-information]({{base_path}}/assets/img/guides/workflows/deployment-information.png)

    | Attribute    | Description    |
    |--------------|----------------|
    | BPS Profile  | This is the name of the required BPS profile. This field defines the deployment type of the workflow template. Other custom execution deployment types are also supported, where you can select the desired executor for a given use case. (i.e., a dropdown will appear in the UI to select the required executor).   |
    | Task Subject | This is the subject of the workflow request for approval.  |
    | Task Detail  | This is the body of the workflow request for approval. |

    !!! note

        The same template can have multiple deployment types (e.g., A notification template may have implementations with sending emails or sending human task notifications), whereas, in some templates, there will only be a single implementation.

5. Click **Finish** to complete the process.
    You will be able to see the workflow you just added.

---

## What's next?

Now you need to add the workflow you created to an operation. For more information, see [Engaging a Workflow in an Operation]({{base_path}}/guides/workflows/engage-a-workflow-in-an-operation).