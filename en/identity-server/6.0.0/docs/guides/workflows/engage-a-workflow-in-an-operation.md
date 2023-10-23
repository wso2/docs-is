# Engage a Workflow in an Operation

You can engage workflows in certain operations, such as engaging the approval workflow for the operation of adding a user. This section explains the steps to do this.

1. On the Management Console, go to **Manage > Workflow Engagements > Add**.
2. Enter the required details under **Association Details** and **Workflow Details** as given below.

    ![new-workflow-engagement]({{base_path}}/assets/img/guides/workflows/new-workflow-engagement.png)

    **Association Details**

    | Parameter | Description   |
    |-----------|---------------|
    | Association name  | This is a name to identify the association.   |
    | Operation category    | Select the operation category for the workflow engagement. |
    | Operation name    | This is the operation to be selected. |

    **Workflow Details**

    This is the workflow you need to engage for the event. You may either use an existing workflow definition or [create a new workflow definition]({{base_path}}/guides/workflows/add-a-new-workflow-definition).

    You can use the following three options to filter requests that need to be managed by the selected workflow.

    | Application condition | Definition    | Example   |
    |-----------------------|---------------|-----------|
    | Apply to all Requests | If this option is selected, the selected workflow will be triggered for all the requests of the selected operation.   | N/A   |
    | Apply If  | If this option is selected, the selected workflow only gets triggered if the condition is satisfied.  | The following configuration will select add user operations where username contains 'sys'. (This option supports simple conditions. Use the Advanced section for complex conditions.) ![Apply if example]({{base_path}}/assets/img/guides/workflows/apply-if.png)  |
    | Advanced  | If this option is selected, you can define an XPath expression to filter the requests that need to go through the selected workflow.  | The following configuration will select add user operations where username contains `sys`. Code: ```boolean(//*[local-name()='parameter'][@name='Username']/*[local-name()='value']/*[local-name()='itemValue'][contains(text(),'sys')])``` ![Advanced example]({{base_path}}/assets/img/guides/workflows/advanced-workflow.png)    |

3. Click **Add** to complete adding the engagement.
    You can view, disable, or delete the association by navigating to **Manage > Workflow Engagements > List**.  

---

## What's Next?

Now that all the configurations are done when you add a user, it will not be displayed under the users' section immediately, and the user will not be able to log in. The user will be enabled once the user addition task is approved by a user who has the role of Manager. To try this out, see [Managing Human Tasks]({{base_path}}/guides/workflows/manage-human-tasks).