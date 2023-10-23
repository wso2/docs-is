# Monitor workflow requests

You can monitor the workflow requests through the management console.

To analyze the workflow request data, on the Management Console, go to **Monitor > Workflow Requests**. You will be able to see the workflow requests.

!!! info
    To monitor these requests, a user needs be assigned to a role with the following permissions:

    - `/permission/admin/manage/identity/workflow/association/view`
    - `/permission/admin/manage/identity/workflow/monitor/view`

    For more details, see how to [configure roles and permissions]({{base_path}}/guides/identity-lifecycles/manage-roles-overview).


## Filter workflow requests
The displayed workflow requests can be filtered based on the following criteria:

- request type
- status of the workflow request
- timestamp that the requests were triggered or updated

## Workflow request sample

![workflow-request-list]({{base_path}}/assets/img/guides/workflows/workflow-request-list.png)

In addition, the **Event Type**, you can view the following request parameters.

- Workflow Request ID
- Workflow Name
- Current status

To view the request parameters, click **Workflows** under the **Actions** column in the **Workflow Request List**.