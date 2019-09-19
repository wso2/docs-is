# Monitoring Workflow Requests

Workflow Requests can be monitored through the management console. To do
this, go to **Monitor \> Workflow Requests** to analyze the workflow
request data.

!!! info 
    In order to monitor these requests, a user needs to have
    `          /permission/admin/manage/identity/workflow/association/view         `
    and
    `          /permission/admin/manage/identity/workflow/monitor/view         `
    permissions.

    ![monitor-workflow-requests](../assets/img/using-wso2-identity-server/monitor-workflow-requests.png) 

Workflow requests can also be filtered based on the request type, the
status of the Workflow request and based on the timestamp that the
requests were triggered or requests updated. In addition, Event Type
(user store operation) and request parameters can be viewed through this
page.

![workflow-request-list](../assets/img/using-wso2-identity-server/workflow-request-list.png)

The corresponding Workflow Request ID, Workflow Name and current status
of each workflow associated to the request can be viewed by clicking the
**Workflows** button under the **Actions** column in the **Workflow
Request List.**
