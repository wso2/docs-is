# Engaging a Workflow in an Operation

Workflows can be engaged in certain operations such as engaging the
approval workflow for the operation of adding a user. This section
demonstrates the steps used to do this.

1.  On the **Main** tab in the Management Console, click **Add** under
    **Workflows** **Engagements** in the **Manage** section.
2.  Fill in the details using the descriptions below as a guide. Use the
    screen capture below as a guide to enter sample values.  

    1.  Association name: A name to identify the association

    2.  Operation category: The category of the operation to be selected
        to the workflow engagement

    3.  Operation name: The operation to be selected

    4.  Workflow: The workflow you need to engage for the event. You can
        use an existing workflow definition or [create a workflow
        definition](https://docs.wso2.com/display/IS540/Adding+a+New+Workflow+Definition)
        .

    5.  The Application condition:

    There are three options which we can use to filter requests which
    need to be managed by the selected workflow.

    **Apply to all Requests**

    If this option is selected, the selected workflow will be triggered
    for all the requests of the selected operation.

    **Apply If**

    If this option is selected, the selected workflow only get triggered
    if the condition is satisfied. As an example, following
    configuration will select add user operations where username
    contains 'sys'. (This option supports simple conditions. If the
    condition is complex where multiple conditions are evaluated with
    connectors (and/or) use the Advance section.)

    ![](attachments/103330276/103330278.png){width="465" height="170"}

    **Advanced**  
    If this option is selected, you can define an XPath expression to
    filter the requests that need to go through the selected workflow.
    As an example, following configuration will select add user
    operations where username contains 'sys'.

    ``` java
    boolean(//*[local-name()='parameter'][@name='Username']/*[local-name()='value']/*[local-name()='itemValue'][contains(text(),'sys')])
    ```

    ![](attachments/103330276/103330279.png){width="286" height="81"}

    ![](attachments/103330276/103330277.png){width="829" height="398"}

3.  Click **Add** to finish adding the engagement. You can view, disable
    or delete the association by navigating to **WorkFlows
    Engagements \> List** under the **Manage** Section.  

### What's Next?

Now that all the configurations are done, when you add a user it won’t
be displayed under the users section immediately and the user won’t be
able to login. The user will be enabled once the user addition task is
approved by a user who has the role of Manager. To try this out, see
[Managing Human Tasks](_Managing_Human_Tasks_).
