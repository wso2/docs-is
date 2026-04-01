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
</table>
<!-- vale on -->

Take note of the **Client ID** and **Client Secret** of the M2M application you created.
