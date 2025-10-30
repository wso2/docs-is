# Usage

This guide explains how to implement an identity verification flow in your application using Onfido and how to finalize the verification process with {{product_name}}. The typical flow includes the following steps:

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

- Initiate verification using the Onfido SDK - Integrate the Onfido SDK in your application to capture the user’s documents and perform the necessary checks.

Receive webhook notifications from Onfido

Set up a webhook to receive events from Onfido when the verification process is completed or updated.

Validate results with {{product_name}}

Use the {{product_name}} verification API to confirm whether the user’s attributes (e.g., identity, documents) have been successfully verified.

Control access based on verification outcome

Depending on the verification result, allow or deny the user access to your application’s resources.