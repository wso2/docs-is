# Add Identity Verification with Onfido

Onfido is an identity verification service that allows users to securely verify their identity using a combination 
of biometric checks and government-issued identity documents such as passports, driver's licenses, and national ID. 
This guide explains how you can use Onfido to perform identity verification with {{ product_name }}.

## Prerequisites

Before you begin, ensure you have the following:

- [Onfido Account](https://onfido.com/signup/): An active administrative account on Onfido. 
Ensure that Comparison Checks are enabled to the account. For more details, refer to the 
[Onfido Comparison Checks documentation](https://documentation.onfido.com/api/latest/#data_comparison).
- [{{ product_name }} Account](https://asgardeo.io/signup): Access to your {{ product_name }} console with 
administrative privileges.
- [{{ product_name }} Application]({{base_path}}/guides/applications/): A registered application in {{ product_name }}. 
You can register your own application or use the [Onfido Sample Application](https://github.com/wso2-extensions/identity-verification-onfido/tree/main/samples/react-sample-app) provided.
- [{{ product_name }} User Account]({{base_path}}/guides/users/manage-users/#onboard-a-user): A user account with 
values set for the attributes that require verification.

## Configure Onfido via the Dashboard

### Create an API token.
   1. Log in to the [Onfido Dashboard](https://dashboard.onfido.com/).
   2. Go to **Settings > Developers > Tokens**.
   3. Click **Generate API token**.
   4. Select **Live** as the environment and click **Generate**.
   5. Copy the generated API token and store it securely for later use.

### Set Up a Workflow in Onfido Studio.
   1. In the Onfido Dashboard, navigate to **Onfido Studio > Workflows**.
   2. Click **New Workflow**, provide a name, and click **Create**.
   3. Click **New Version** to open the Workflow Builder.
   4. Select to **Create a new workflow**.
   5. Use the drag-and-drop interface to build a workflow similar to the reference image. In this example, 
    we’ve created a basic workflow that includes document reports and face similarity reports to 
    perform identity verification.

    !!! note
        At a minimum, the workflow must include document capture for verification. Optionally, can integrate additional 
        features, such as face capture: photo, face capture: motion etc, based on your requirements.

    ![sample-workflow]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-sample-workflow.png)

   6. Configure the workflow to accept first name and last name as input attributes. For detailed instructions on 
    setting up inputs, refer to the [Onfido Studio workflow input documentation](https://documentation.onfido.com/getting-started/onfido-studio-product/#workflow-input-data).

    !!! note
        If using the sample application, ensure that date of birth is also enabled.

    ![onfido-workflow-input]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-workflow-input.png)

   7. Set up the workflow outputs to include data comparison results from the document report.

    - Go to the **Workflow Output** section. Refer [Onfido Studio workflow output documentation](https://documentation.onfido.com/getting-started/onfido-studio-product/#workflow-output-data).
    - Under the **Configure** tab, click **Add custom property** and create a new property named `data_comparison`, 
    setting its format to **Other**.

    ![onfido-workflow-output]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-workflow-output.png)

    - Navigate to the **Sources** tab. For both **APPROVE APPLICANT** and **DECLINE APPLICANT**, select 
    **Document report - Breakdown - Data comparison - Breakdown**.
    - Click **Done** to finalize the configuration.

    ![onfido-workflow-output-sources]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-workflow-output-sources.png)

    !!! note
        It is essential to configure this output in the specified format, as the verification status of user attributes 
        depends on the data comparison result in conjunction with the workflow status. Additionally, ensure that 
        **Comparison Checks** are enabled for your Onfido account to ensure these results are sent in the webhook 
        response. For more details, refer to [Onfido's Comparison Checks documentation](https://documentation.onfido.com/api/latest/#data_comparison).

   8. To specify the criteria for approving or declining an applicant, click on the **if/else condition** task block. 
    Set the condition to check that both the document report and face capture report results are marked as clear for 
    approving the applicant else decline.
   9. Copy the **Workflow ID** for later use when setting up Onfido with {{ product_name }}.
   10. Click **Save** in the top-right corner.

### Create a webhook token

Onfido provides webhooks to notify your system about changes in the status of identity verifications. 
For more information, refer to the [Onfido webhooks documentation](https://documentation.onfido.com).

To integrate Onfido webhooks with {{ product_name }}, use the Open API endpoint provided in the **Setup Guide** of 
the Onfido connector created in {{ product_name }}. By configuring this endpoint, {{ product_name }} will 
automatically update users' verification status based on notifications from Onfido.

Follow the steps below to create a webhook token:

1. In the [Onfido Dashboard](https://dashboard.onfido.com/), navigate to **Settings > Developers > Webhooks**.
2. Click **Create webhook**.
3. Copy the URL from the **Setup Guide** tab in the {{ product_name }} console for the Onfido connector.
4. Paste the copied URL into the webhook URL field and select only the **workflow_run.completed** event.
5. Click **Save**.
6. Copy the webhook token, as it will be needed to complete the webhook configuration in {{ product_name }}.

## Add Onfido as a connection in {{ product_name }}

To register Onfido as a connection in {{ product_name }}, follow the steps below.

1. Log in to the {{ product_name }} Console as an administrator.
2. Navigate to **Connections** in the left-hand panel.
3. Click **New Connection** and select **Onfido** from the available templates.
4. Provide a **Name** for the connection (e.g., "Onfido Verification").
5. Enter the **API Token** and **Workflow ID** obtained from the Onfido Dashboard.

    !!! note
        The default regional base URL for Onfido API calls is **`https://api.eu.onfido.com/v3.6`**. If this URL changes, update it accordingly.

6. Click **Create** to save the configuration.

### Configure the Webhook

1. After saving, you will be redirected to the Onfido Connector’s **Setup Guide** page, which provides instructions for 
    completing the connector setup.
2. Copy the webhook URL provided in the **Setup Guide**.
3. Follow the steps in the [Create a Webhook Token](#create-a-webhook-token) section to set up the webhook in the 
     Onfido Dashboard.
4. In the {{ product_name }} Console, go to the **Settings** tab of the Onfido connection and paste the Webhook Token 
     in the Webhook Token field.
5. Click **Update** to finalize the webhook configuration.

    !!! note
        Configuring the webhook is mandatory to ensure the verification status of user claims is updated. Additionally, 
         make sure the workflow outputs the data comparison breakdown results.

### Configure Attribute Mappings

1. Navigate to the **Attributes** tab in the Onfido connection.
2. Verify that first name and last name are already configured as mandatory attributes.
3. To add other attribute mappings:
   - Click **Add Attribute Mapping**.
   - Enter the External IDVP Attribute name used in Onfido.
   - Select the corresponding {{ product_name }} Claim URI.
   - Click **Add Attribute Mapping** and then **Update**.

    !!! note
        If using the sample application, add the mapping **`dob -> http://wso2.org/claims/dob`**.

The Onfido connection is now configured and ready for use. You can proceed to integrate it with your application.

## Integrating Onfido Identity Verification into Your Application

To integrate Onfido's identity verification with your application, use the [Identity Verification User APIs]() 
provided by {{ product_name }}. This process involves initiating verification requests and managing the verification 
status of claims through {{ product_name }}, while the actual launching of the Onfido SDK and the verification 
flow are handled by the external application. The Onfido SDK guides users through the verification process, including 
capturing and uploading documents or photos for biometric checks. For practical examples, refer to the 
[Onfido Sample App](https://github.com/wso2-extensions/identity-verification-onfido/tree/main/samples/react-sample-app).

To integrate Onfido Identity Verification with {{ product_name }} in your external application, follow steps below.

1. Import the Onfido SDK to your external application project. For more information, refer to the [Onfido SDK documentation](https://documentation.onfido.com/sdk/).
2. To initiate verification with Onfido, make a POST request to the **`<Base URL>/api/users/v1/me/idv/verify`** endpoint with the following payload.

    ```json
    {
        "idVProviderId": "<Onfido identity verification provider's ID>",
        "claims": [
            "http://wso2.org/claims/givenname",
            "http://wso2.org/claims/lastname"
        ],
        "properties": [
            {
                "key": "status",
                "value": "INITIATED"
            }
        ]
    }
    ```

    !!! note
        The Onfido identity verification provider's ID can be found on the **Setup Guide** page of the Onfido connector in the {{ product_name }} console. It is mandatory to include the Claim URIs for first name and last name. Additionally, make sure to add any other claims that were configured in the Onfido connector within the {{ product_name }} console.

3. Use the **`sdk_token`** and **`onfido_workflow_run_id`** extracted from the initiation response to launch the Onfido SDK in your application.
4. After the user completes the document submission and face capture with the Onfido SDK, update the verification status by sending a POST request to **`<Base URL>/api/users/v1/me/idv/verify`** endpoint with the following payload.

    ```json
    {
        "idVProviderId": "<Onfido identity verification provider's ID>",
        "claims": [
            "http://wso2.org/claims/givenname",
            "http://wso2.org/claims/lastname"
        ],
        "properties": [
            {
                "key": "status",
                "value": "COMPLETED"
            }
        ]
    }
    ```

5. [Optional] To reinitiate the verification process when it is interrupted or paused (with a workflow status of "awaiting_input", indicating that Onfido is waiting for user input), send a POST request to **`<Base URL>/api/users/v1/me/idv/verify`**.

    ```json
    {
        "idVProviderId": "<Onfido identity verification provider's ID>",
        "claims": [
            "http://wso2.org/claims/givenname",
            "http://wso2.org/claims/lastname"
        ],
        "properties": [
            {
                "key": "status",
                "value": "REINITIATED"
            }
        ]
    }
    ```

## Try it out

To test the integration, use the [Onfido Sample Application](https://github.com/wso2-extensions/identity-verification-onfido/tree/main/samples/react-sample-app) and follow the setup instructions precisely as outlined in the sample application.

1. Log in to the sample application using the pre-configured {{ product_name }} user account.

    ![onfido-sample-app-login]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-sample-app-login.png)

2. Click the **Verify Age** button to begin the age and identity verification process.

    ![onfido-sample-app-verification-initiation]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-sample-app-verification-initiation.png)

3. Follow the prompts from the Onfido SDK to upload documents and capture a selfie.
4. After submitting the documents, you will be redirected to a page displaying **Age Verification in Progress!**. Click **Back to Home**.

    !!! note
        The verification process typically takes 3-4 minutes.

    ![onfido-sample-app-verification-inprogress]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-sample-app-verification-inprogress.png)

5. After waiting for 3-4 minutes, refresh the page and you will notice the verification has been successful.

    !!! note
        If you encounter an error message stating that age verification failed, it may be due to a mismatch between the provided **First Name**, **Last Name**, or **Birth Date** and the information extracted from the documents submitted during the Onfido verification process. In such cases, correct the information and try again.

    ![onfido-sample-app-verification-completion]({{base_path}}/assets/img/guides/identity-verification/onfido/onfido-sample-app-verification-completion.png)
