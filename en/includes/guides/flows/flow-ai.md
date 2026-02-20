# Flow AI

!!! warning "Beta feature"
    The **AI Flow Builder** feature is currently in **Beta**. We are actively working to enhance its capabilities and improve performance.

AI-powered flow building simplifies the process of creating complex user journeys by using AI to translate your requirements into functional flows. This automates the setup of registration and recovery flows based on plain language descriptions, reducing manual configuration effort.

By leveraging Flow AI, you can ensure that your user interactions are optimized for both security and user experience without needing deep knowledge of the underlying flow configuration syntax.

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
!!! note "Enable AI-powered features"

    To enable AI-powered features, {{product_name}} requires a subscription key from the [WSO2 AI subscription portal](https://ai-subscriptions.wso2.com/){target="_blank"}. See the [guide]({{base_path}}/get-started/subscribe-to-ai-features/) for step by step instructions.

{% endif %}

## Generate flow with Flow AI

To generate a flow using Flow AI:

1. On the {{product_name}} Console, go to **Flows**.

2. Select the flow type you wish to configure (e.g., **Self Registration**, **Password Recovery**, etc.).

3. Click on the **Generate with AI** option.

    ![Flow builder AI]({{base_path}}/assets/img/guides/flows/flow-builder-generate-with-ai.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a description of the flow you want to create.
   
    For example: "Create a registration flow that collects the user's first name, last name, and email address, and requires email OTP verification."

5. Press **Enter** or click the generate button to build the flow.

    The system will analyze your description and automatically construct the flow components on the canvas.

## Review and customize generated flow

Once Flow AI processes your input, the **Flow Builder** canvas will be populated with a complete flow diagram, including:

- Required steps for the user journey.
- Input fields mapped to user attributes.
- Verification steps if requested.

You can further customize this generated flow by:

- Adding or removing [widgets]({{base_path}}/guides/flows/build-a-flow/#widgets) to enhance functionality.
- Modifying [components]({{base_path}}/guides/flows/build-a-flow/#components) to change field properties or labels.
- Reordering steps to better suit your user experience requirements.

By reviewing and customizing the generated flow, you can ensure that it perfectly satisfies your organization's security policies and business rules.

## Enable flow

Once you've reviewed and customized the generated flow to your satisfaction, use the **Enable** toggle in the Flow Builder to make the flow active for your users.
