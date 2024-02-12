# Configure outbound provisioning with Google

This guide explains how you can provision users to Google Workspace at the time a user is onboarded to {{product_name}}.

## Configure Google Workspace for provisioning

Follow the steps below to learn how you can configure Google Workspace for provisioning.

!!! info "Before you begin"
    Learn how to subscribe to Google Workspace in the [Google documentation](https://support.google.com/domains/answer/6069226?hl=en){: target="#"}.

1. Create a service account in Google.

    1. Open the [Google developers console](https://console.developers.google.com/cloud-resource-manager) and create a new project.

    2. Search for the project you created and click it.

    3. Under **IAM & Admin**, click **Service Accounts**.

    4. Click **CREATE SERVICE ACCOUNT** on the top panel.  

    5. Fill in the form to create the service account:

        ![add-account-name]({{base_path}}/assets/img/guides/outbound-provisioning/google/service-account-name.png){: width="400" style="border: 0.3px solid lightgrey;"}

        - Optionally, assign a role from the list of roles given and click **Done** to create the service account.

    6. Select your service account and go to its **KEYS** tab.

    7. From the dropdown, select **ADD KEY** > **Create new key** > **P12** and click **CREATE**. The following message will be displayed.

        !!! note
            The service account's `P12` file will be downloaded to your machine. Remember the location and the name of this downloaded file as it is required later on in this guide.

        ![key-created]({{base_path}}/assets/img/guides/outbound-provisioning/google/key-created.png){: width="700" style="border: 0.3px solid lightgrey;"}

    8. From **IAM & Admin** > **Service accounts**, take note of the client ID of your service account.

    9. Select the service account and in the **DETAILS** tab, expand **Advanced settings**.

    10. Delegate domain-wide authority to the service account.

        !!! note
            Learn how to do so in the [Google documentation](https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority){: target="#"}.

5. Delegate domain-wide authority to the service account:

    1. Go to your domain's [admin console](https://admin.google.com).

    2. Navigate to **Security** > **Access and data control** > **API Controls** > **Domain-wide Delegation**.

    3. Do the following:
        1. Clck **Add new** and paste the client ID of the service account.

        2. Enter the following as the value for scopes.
            `https://www.googleapis.com/auth/admin.directory.user,https://www.googleapis.com/auth/admin.directory.orgunit,https://www.googleapis.com/auth/admin.directory.group`

        3. Click **Authorize**.

7. Enable the Admin SDK.

    1. Open the [Google developers console](https://console.developers.google.com/cloud-resource-manager).

    2. Click the menu icon, and click **APIs & Services** > **Dashboards**.

    3. Click **Enable APIs & Services**.

    4. Search for Admin SDK and click **Enable**.

## Configure the Google outbound connector

To register Google as an outbound provisioning connector,

1. On the {{ product_name }} Console, click **Connections** and click **New Connection**.

2. Click **Create Connection** and select **Custom Connector**.

3. Provide a name and a description for the connector and click **Finish**.

4. Go to the **Outbound Provisioning** tab of the created connection.

    ![New outbound connector]({{base_path}}/assets/img/guides/outbound-provisioning/new-outbound-connector.png){: width="700" style="border: 0.3px solid lightgrey;"}

5. Select **New Connector** > **Google** and click **Next**.

6. Enter the following details:

    <table>
        <tr>
            <td>Google Domain</td>
            <td>The name of the Google domain used to provision users.</br>
                e.g.<code> mygoogledomain.com</code></td>
        </tr>
        <tr>
            <td>Primary Email Claim</td>
            <td>Claim URI that will be used to retrieve the primary email address of the created account. This must be an attribute that is available locally in {{product_name}}.</br>
                e.g. <code>http://wso2.org/claims/emailaddress</code></td>
        </tr>
        <tr>
            <td>Given Name Claim</td>
            <td>Claim URI which will be used to retrieve the given name attribute of the user. This must be an attribute that is available locally in {{product_name}}.</br>
                e.g. <code>http://wso2.org/claims/givenname</code></td>
        </tr>
        <tr>
            <td>Family Name Claim</td>
            <td>Claim URI which will be used to retrieve the family name attribute of the user. This must be an attribute that is available locally in {{product_name}}.</br>
                e.g. <code>http://wso2.org/claims/lastnname</code></td>
        </tr>
        <tr>
            <td>Service Account Email</td>
            <td>Email used for authentication.</br>
            e.g. <code>d343s86gf@developer.gserviceaccount.com</code></td>
        </tr>
        <tr>
            <td>Private Key</td>
            <td>Browse and attach the private key from your local machine. This is the PKCS12 private key generated during service account creation.</td>
        </tr>
        <tr>
            <td>Administrator's Email</td>
            <td>Email of the administrator who owns the service account in the specified Google Domain.</td>
        </tr>
        <tr>
            <td>Application Name</td>
            <td>A name for your application to identify requests made by the Google client.</td>
        </tr>
        <tr>
            <td>Google Outbound Provisioning Pattern</td>
            <td>{{product_name}} uses this pattern to build the user ID of the provisioned user account. Learn more about <a href="{{base_path}}/guides/users/outbound-provisioning/provisioning-patterns">provisioning patterns</a>.</br>
            e.g. <code>{UD,UN,TD,IDP}</code></td>
        </tr>
        <tr>
            <td>Google Provisioning Separator </td>
            <td>Used to separate provisioning pattern attributes of the user ID. Learn more about <a href="{{base_path}}/guides/users/outbound-provisioning/provisioning-patterns">provisioning patterns</a></br>
            e.g. <code>-</code>(hyphen).</td>
            </td>
        </tr>
    </table>

7. Click **Next**, review the details  and click **Register** to add the connector.

8. Under **Outbound Provisioning**, switch on the toggle corresponding to the created connector to enable outbound provisioning.

    ![New outbound connector]({{base_path}}/assets/img/guides/outbound-provisioning/google/enable-google-connector.png){: width="700" style="border: 0.3px solid lightgrey;"}

9. Click **Update** to save the changes.

