# Send notifications through an external scheduled task

This document explains the steps to configure WSO2 Identity Server to send notifications via an external scheduled task to specific users within your organization.

1. Password expired users

2. Idle user accounts

The WSO2 Identity Server 7.0.0 provides API support to fetch the user IDs for individuals falling under these categories. By configuring an external scheduler task, you can retrieve the list of users and send notifications through the preferred channel.

This tutorial illustrates how to send email notifications daily for users whose passwords will expire in 3 days with the [Azure Function App](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview?pivots=programming-language-python){:target="_blank"}.

### Configure WSO2 Identity Server

**Step 1:** [Create a user account]({{base_path}}/guides/users/manage-users/#onboard-single-user) in WSO2 Identity Server and provide a password at user creation.

**Step 2:** [Activate the Password Expiration]({{base_path}}/guides/account-configurations/login-security/password-validation/#password-validation) checkbox and set the value to 3 days for the purpose of this example.

**Step 3:** Configure the application in the WSO2 Identity Server to obtain an access token for invoking [Password Expiring User Identification API]({{base_path}}/apis/password-expiring-users-identification-rest-api/)

- [Register a standard OIDC application]({{base_path}}/guides/applications/register-oidc-web-app/#register-an-openid-connect-web-app).

- Navigate to `API Authorization` tab, and add the 

- Take note of the client ID and secret as you will require them later in this guide.

### Setup Azure Function App

**Step 4:** Sign in to [Azure portal](https://portal.azure.com/#home){:target="_blank"} with your Azure subscription.

**Step 5:** Create a function app in Azure as discribed [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-app-portal?pivots=programming-language-python#create-a-function-app){:target="_blank"}. Select `Python` as the `Runtime stack` and `Linux` as the `Operating System`.

### Develop Azure Function with Visual Studio Code

**Step 6:** First [Setup the Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v3%2Cpython-v2%2Cisolated-process&pivots=programming-language-python#prerequisites){:target="_blank"} and [local environment](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v3%2Cpython-v2%2Cisolated-process&pivots=programming-language-python#prerequisites){:target="_blank"} to develop a Azure Function with Visual Studio Code.

**Step 7:** Click the button below to download the sample Azure Funtion. You can also choose to view the source before doing so.

<div class="centered-container">
  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/java-logo.svg" alt="OIDC" width=50><br>
    <a href="https://github.com/wso2/samples-is/releases/download/v4.6.2/notification-sender-ext-schedular.zip" target="_blank">Download sample</a>
  </div>

  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/github-logo.svg" alt="Github" width=50><br>
    <a href="https://github.com/wso2/samples-is/tree/v4.6.2/etc/notification-sender-ext-schedular" target="_blank">View source</a>
  </div>
</div>

**Step 8:** Unzip the downloaded sample. Navigate to the config.json file and provide the corresponding values for the following properties.

<table>
    <tr>
        <th>WSO2 IS Server property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>client_id</td>
        <td>Client ID of the OIDC application creatde in WSO2 IS Server.</td>
    </tr>
    <tr>
        <td>client_secret</td>
        <td>Client secret of the OIDC application creatde in WSO2 IS Server.</td>
    </tr>
    <tr>
        <td>oragnization</td>
        <td>Name of the organization.</td>
    </tr>
    <tr>
        <td>hostname</td>
        <td>The hostname of the WSO2 Identity Server.</td>
    </tr>
    <tr>
        <td>alert_before_in_days</td>
        <td>The number of days before the notification needs to be sent.</td>
    </tr>
</table>

<table>
    <tr>
        <th>Email notification sender property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>sender_email</code></td>
        <td>Provide the username of the SMTP account.</td>
    </tr>
    <tr>
        <td><code>sender_password</code></td>
        <td>Provide the password of the SMTP account.</td>
    </tr>
    <tr>
        <td><code>smtp_server</code></td>
        <td>The SMTP server to connect to.</td>
    </tr>
    <tr>
        <td><code>smtp_server</code></td>
        <td>The SMTP server port to connect.</td>
    </tr>
</table>

**Step 9:** In the VS Code, select the Azure icon, then select the + button in the Workspace tab. Click on `Azure Functions` icon and select `Create Function` option.  As you progress, provide the values as outlined below.

<table>
    <tr>
        <th>Property</th>
        <th>Value</th>
    </tr>
    <tr>
        <td>Directory location</td>
        <td>Preferred empty file directory loaction</td>
    </tr>
    <tr>
        <td>Language</td>
        <td>Python</td>
    </tr>
    <tr>
        <td>Python Programming model</td>
        <td>Model V2</td>
    </tr>
    <tr>
        <td>Python interpreter</td>
        <td>python3</td>
    </tr>
    <tr>
        <td>template for the function</td>
        <td>Skip for now</td>
    </tr>
    <tr>
        <td>Project open option</td>
        <td>Add to workspace</td>
    </tr>
</table>

**Step 10:** Copy and replace the files from the sample Azure Function into the directory created in the previous step.

**Step 11:** You can test the Funtion App locally as described [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-add-output-binding-storage-queue-vs-code?pivots=programming-language-python&tabs=isolated-process#run-the-function-locally){:target="_blank"} befor deploying it to Azure.

### Deploy Function App to Azure

**Step 12** Deploy the Azure Function App as described [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v3%2Cpython-v2%2Cisolated-process&pivots=programming-language-python#republish-project-files){:target="_blank"}.

The Azure Function is now configured to send daily email notifications for users whose passwords will expire in 3 days.