# Usage

This guide explains how to implement an identity verification flow in your application using Onfido and how to finalize the verification process with {{product_name}}. The typical flow includes the following steps:

## Prerequisites

- [Set up Onfido]({{base_path}}/connectors/onfido/set-up/) in your {{product_name}} installation.
- Make sure the webhook is correctly configured in Onfido to send verification results to {{product_name}}.

## Step 1: Create a verification workflow in Onfido

Onfido Studio lets you create a dynamic end-user verification experience by designing customizable workflows that guide users through document submission, identity checks, and any other required steps.

### Step 1.1 Design the workflow

When using the Onfido connector in {{product_name}}, you must create a connector that includes at least document data capture. You can also optionally add face capture to the workflow. Refer to [Onfido studio documentation](https://documentation.onfido.com/getting-started/onfido-studio-product/#building-your-workflow){: target="_blank"} for instructions.

The following shows a sample workflow you can create using Onfido studio.

![sample Onfido workflow]({{base_path}}/assets/img/connectors/onfido/onfido-sample-workflow.png)

### Step 1.2 Configure workflow inputs

After designing the workflow, configure the input attributes that Onfido will validate. {{product_name}} requires first name and last name as mandatory attributes. Optionally, select any other attributes necessary for your application that Onfido should validate.

Refer to [Onfido input data documentation](https://documentation.onfido.com/getting-started/onfido-studio-product/#workflow-input-data){: target="_blank"} for instructions.

![Onfido workflow inputs]({{base_path}}/assets/img/connectors/onfido/onfido-workflow-input.png)

### Step 1.3 Configure workflow outputs

Workflow outputs specify the data returned at the end of a workflow run. {{product_name}} receives this response in a webhook, which contains all the configured output properties such as document verification results and data comparison details.

1. Create a property called `data_comparison` and specify its format as **Other** to allow storing a complex JSON structure.

    ![Configure workflow output property]({{base_path}}/assets/img/connectors/onfido/workflow-output-configure.png)

2. Specify the sources as **Document report - Breakdown - Data comparison - Breakdown** for both approve applicant and decline applicant paths.

    ![Configure workflow output sources]({{base_path}}/assets/img/connectors/onfido/workflow-output-sources.png)

Refer to [Onfido output data documentation](https://documentation.onfido.com/getting-started/onfido-studio-product/#workflow-output-data){: target="_blank"} for instructions.

!!! note

    Ensure comparison checks are enabled in your Onfido account. For more details, refer to the [comparison checks documentation](https://documentation.onfido.com/api/latest/#data_comparison){: target="_blank"}.

### Step 1.3 Set workflow conditions

Workflow conditions determine the criteria used to approve or decline a user. To set these conditions, click on the **If/Else** condition in the workflow builder.

- **Basic condition**: Check whether the Document Report and, optionally, the Face Capture results are marked **Clear**.

    - If both are Clear, the workflow should **Approve** the user.

    - If either is not Clear, the workflow should **Decline** the user.

- You can add any other conditions such as other data comparison results and additional document checks.

!!! note

    {{product_name}} only marks the attribute verification as successful if the workflow returns an approved status.

## Step 2: Integrate your application with Onfido

To verify user identity using Onfido, you need to integrate your application with Onfido using the Onfido SDK. The SDK provides a seamless way to capture user documents and faces, and submit them to Onfido for verification.

Refer to the [Onfido SDK documentation](https://documentation.onfido.com/sdk/overview){: target="_blank"} for instructions.

## Step 3: Perform the verification process

{{product_name}} provides a verification API that you can use to start and complete the identity verification process with Onfido.

```bash
https://<IS_HOST>:<IS_PORT>/api/users/v1/me/idv/verify
```

### Step 3.1 Start the verification process

To start the identity verification process, make a POST request with the following payload.

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

    - Replace `<Onfido identity verification provider's ID>` with the actual ID of your Onfido connection in {{product_name}}.

    - Including the URLs for the first name and last name is mandatory. You can include any other claims that you configured as workflow inputs in Onfido.

The response looks as follows:

```json
{
  "idVProviderId": "<Onfido identity verification provider's ID>",
  "claims": [
     {
        "id": "<ID>",
        "uri": "<WSO2 Claim URI>",
        "isVerified": false,
        "claimMetadata": {
           "onfido_applicant_id": "<Onfido applicant ID>",
           "onfido_workflow_run_id": "<Onfido workflow run ID>",
           "sdk_token": "<Onfido SDK token>",
           "onfido_workflow_status": "AWAITING_INPUT"
        }
     }
   ]
}

```

### Step 3.2 Use the Onfido SDK to capture user documents

The response from the previous step contains the `sdk_token` and the `onfido_workflow_run_id`. Use these to initialize the Onfido SDK in your application and capture user documents and faces. 

Refer to [Intializing Onfido SDK](https://documentation.onfido.com/sdk/web/#initializing-the-sdk){: target="_blank"} for instructions.

### Step 3.3 Complete the verification process

After the user completes the document submission using the Onfido SDK, make another POST request with the following payload to complete the verification process.

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

!!! note

    - Replace `<Onfido identity verification provider's ID>` with the actual ID of your Onfido connection in {{product_name}}.

    - Including the URLs for the first name and last name is mandatory. You can include any other claims that you configured as workflow inputs in Onfido.

### Step 3.4 (Optional) Restart an interrupted verification process

If the user verification process gets interrupted before completion, you can restart it by making a POST request with the following payload.

!!! note

    - You can only restart a verification process if the workflow status is `AWAITING_INPUT`.
    - After restarting, follow step 3.2 and step 3.3 to complete the verification process.

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

!!! note

    - Replace `<Onfido identity verification provider's ID>` with the actual ID of your Onfido connection in {{product_name}}.

    - Including the URLs for the first name and last name is mandatory. You can include any other claims that you configured as workflow inputs in Onfido.
