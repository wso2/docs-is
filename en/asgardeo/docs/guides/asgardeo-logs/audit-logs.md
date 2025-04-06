# Audit logs

Audit logs in Asgardeo are designed for developers to access and analyze vital state changes that happen to resources in Asgardeo. These logs are important for enhancing system security as they proactively identify suspicious activities and potential security threats.

In the event of incidents or errors, audit logs serve as a valuable forensic tool, facilitating the investigation process by providing detailed insights into the sequence of events and identifying the responsible parties.

This guide provides instructions on how to access and analyze audit logs to monitor and investigate system activities effectively.

## Access audit logs

To access audit logs:

1. On the Asgardeo Console, go to **Log**

2. Switch to the **Audit** tab.

    ![Audit logs UI]({{base_path}}/assets/img/guides/asgardeo-logs/audit-logs/audit-logs-ui.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

By default, the console displays logs that occurred in the last 15 minutes.

## Search for logs

You can use the search bar to search for logs based on the properties of an audit log. For example, `initiatorType`, `targetType`, `actionId`, etc. Learn more about these parameters in the [structure of audit logs](#structure-of-an-audit-log) section.

For example, the diagram below shows the results for a search filtered with the `actionId`.

![Search audit logs]({{base_path}}/assets/img/guides/asgardeo-logs/audit-logs/search-audit-logs.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Structure of an audit log

When you expand an audit log in Asgardeo by clicking on it, you will get the following view.

![Expanded audit log view]({{base_path}}/assets/img/guides/asgardeo-logs/audit-logs/expanded-view-audit-log.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

The following are the properties of an audit log:

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>id</code></td>
        <td>Unique ID for each log event.</td>
    </tr>
    <tr>
        <td><code>recordedAt</code></td>
        <td>Timestamp of event occurrence.</td>
    </tr>
    <tr>
        <td><code>requestId</code></td>
        <td>A unique identifier for the trace associated with the action that triggered the audit event.</td>
    </tr>
    <tr>
        <td><code>initiatorId</code></td>
        <td>The ID of the User or System that initiated the event.</td>
    </tr>
    <tr>
        <td><code>initiatorType</code></td>
        <td>The type of the initiator, such as <code>User</code> or <code>System</code></td>
    </tr>
    <tr>
        <td><code>targetId</code></td>
        <td>The ID of the resource or object that was the target of the event.</td>
    </tr>
    <tr>
        <td><code>targetType</code></td>
        <td>The type of the target resource, such as <code>user</code> or <code>application</code>. <br><br> Note that Asgardeo currently publishes audit logs for the <code>targetTypes</code>: <b>User</b>, <b>Group</b>, <b>Role</b>, <b>Application</b></td>
    </tr>
    <tr>
        <td><code>actionId</code></td>
        <td>A description of the action that was performed and triggered the audit event. <br> For example : <code>add-user</code>, <code>update-role</code>, <code>delete-group</code></td>
    </tr>
    <tr>
        <td><code>impersonatorId</code></td>
        <td>In impersonation resource modification flow, this attribute represents the ID of the impersonator who initiated the audit event.</td>
    </tr>
    <tr>
        <td><code>data</code></td>
        <td>Additional data related to the action, such as parameters or metadata. You can <b>View</b> and <b>Download</b> this content.</td>
    </tr>
</table>

## Sample Scenario: User Onboarding

Follow the steps below to observe an audit log due to user onboarding:

1. <a :href="$withBase('/guides/users/manage-users/#onboard-single-user')">Onboard a user</a> to Asgardeo.

2. On the Asgardeo Console, go to **Logs**.

3. Switch to the **Audit** tab, expand the latest with the `add-user` tag, and observe the following audit log.

    ![Audit log for user onboarding]({{base_path}}/assets/img/guides/asgardeo-logs/audit-logs/audit-logs-scenario.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click on **View** next to the `data` property to see additional data related to this action.

    ![auditlog data viewer]({{base_path}}/assets/img/guides/asgardeo-logs/audit-logs/auditlog-data-viewer.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    You can also **Copy** and **Download** the additional data presented in the Auditlog Data Viewer.