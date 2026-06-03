## Getting started

Before using IAM-CTL, you need to register Machine-to-Machine (M2M) applications in your target environments. If you are propagating resources between root organizations, you need to create M2M apps in root organizations. These applications will be used by IAM-CTL to authenticate and perform operations on your behalf.

### Register tool management application

Follow the steps below to register an M2M application.

1. [Register an M2M application]({{base_path}}/guides/applications/register-machine-to-machine-app/){:target="_blank"} with the following API authorization.

<!-- vale off -->
<table>
    <tr>
        <td>Management --> Application Management API</td>
        <td>Create Application, Update Application, Delete Application, View Application, Update authorized business APIs of an Application, Update authorized internal APIs of an Application, View application client secret, Regenerate Application Secret</td>
    </tr>
    <tr>
        <td>Management --> Application Authentication Script Management API</td>
        <td>Update Application Authentication Script</td>
    </tr>
    <tr>
        <td>Management --> Claim Management API</td>
        <td>Create Claim, Update Claim, Delete Claim, View Claim</td>
    </tr>
    <tr>
        <td>Management --> Identity Provider Management API</td>
        <td>Create Identity Provider, Update Identity Provider, Delete Identity Provider, View Identity Provider</td>
    </tr>
    <tr>
        <td>Management --> Userstore Management API</td>
        <td>Create Userstore, Update Userstore, Delete Userstore, View Userstore</td>
    </tr>
    <tr>
        <td>Management --> API Resource Management API</td>
        <td>Create API Resource, Update API Resource, Delete API Resource, View API Resource</td>
    </tr>
    <tr>
        <td>Management --> OIDC Scope Management API</td>
        <td>Create OIDC Scopes, Update OIDC Scopes, Delete OIDC Scopes, View OIDC Scopes</td>
    </tr>
    <tr>
        <td>Management --> SCIM2 Roles V1/V2 API</td>
        <td>Create Role, Update Role, Delete Role, View Role, Update Permissions of Role</td>
    </tr>
    <tr>
        <td>Management --> Identity Governance Management API</td>
        <td>View Identity Governance, Update Identity Governance</td>
    </tr>
    <tr>
        <td>Management --> Validation Rules API</td>
        <td>Update Validation Rule</td>
    </tr>
    <tr>
        <td>Management --> Organization Management API</td>
        <td>Create Organizations, Update Organizations, Delete Organizations, View Organizations</td>
    </tr>
    <tr>
        <td>Management --> Branding Preference Management API</td>
        <td>Update Branding Preference</td>
    </tr>
     {% if server_version == "7.0" %}
    <tr>
        <td>Management --> Email Template Management API v1/v2</td>
        <td>Create Email Template, Update Email Template, Delete Email Template, View Email Template</td>
    </tr>
    {% endif %}
    {% if product_name == "Asgardeo" or server_version >= "7.1" %}
    <tr>
        <td>Management --> Notification Template Management API</td>
        <td>Create Notification Template, Update Notification Template, Delete Notification Template, View Notification Template</td>
    </tr>
    <tr>
        <td>Management --> Action Management API</td>
        <td>Create Action, Update Action, Delete Action, View Action</td>
    </tr>
    {% endif %}
    {% if product_name == "Asgardeo" or server_version >= "7.2" %}
    <tr>
        <td>Management --> Notification Sender Management API</td>
        <td>Create Notification Senders, Update Notification Senders, Delete Notification Senders, View Notification Senders</td>
    </tr>
    <tr>
        <td>Management --> Workflow Management API</td>
        <td>Create Workflow, Update Workflow, Delete Workflow, View Workflow</td>
    </tr>
    <tr>
        <td>Management --> Workflow Association Management API</td>
        <td>Create Workflow Association, Update Workflow Association, Delete Workflow Association, View Workflow Association</td>
    </tr>
    <tr>
        <td>Management --> Flow Management API</td>
        <td>View Flow, Update Flow</td>
    </tr>
    {% endif %}
</table>
<!-- vale on -->

Take note of the **Client ID** and **Client Secret** of the M2M application you created.
