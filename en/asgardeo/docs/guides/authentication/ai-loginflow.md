# Login Flow AI

!!! note
    The AI Login Flow Generation feature is currently in the **Beta** stage. We are actively working to enhance its capabilities.

AI-powered login flow generation simplifies the setup of authentication sequences in Asgardeo by using an AI-driven approach. This tool allows users to efficiently create tailored authentication sequences without needing in-depth knowledge of the underlying authenticators or scripting languages.

## Generate login flows with Login Flow AI

To generate your login flow with LoginFlow AI:

1. On the Asgardeo Console, go to **Applications**.

2. Select your application and go to its **Login Flow** tab.

3. Click **Try Login Flow AI**.

    ![LoginFlow AI button]({{base_path}}/assets/img/guides/ai-loginflow-try.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter the login scenario you want to configure and press enter.

    !!! note
        If you wish to add connections to your login sequence, make sure to [set up the required connection]({{base_path}}/guides/authentication/#manage-connections). Only existing connections can be incorporated into the login flow.

    ![LoginFLow AI input]({{base_path}}/assets/img/guides//ai-loginflow-input.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    The system will analyze the input and generate the appropriate authentication sequence.

## Customize the generated authentication sequence

The AI system processes your input and provides an authentication sequence, you can further customize the authentication sequence by:

- Adding or removing authenticators as needed.
- Modifying the suggested steps.

## Apply Login Flow

Once you've reviewed and customized the generated login flow, click **Update** to apply it to your application.
