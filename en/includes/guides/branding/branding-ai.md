# Branding AI

!!! warning "Beta feature"
    The **AI Branding** feature is currently in **Beta**. We are actively working to enhance its capabilities and improve performance.

AI-powered branding simplifies the process of creating a cohesive branding theme by using AI to analyze your website's existing visual elements. This innovative service automates the identification and application of design elements such as colors, fonts, and button styles, ensuring brand consistency and reducing manual effort.

By leveraging AI Branding, you can ensure that your the user prompted pages not only look great but also align perfectly with your brand's identity.

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
!!! note "Enable AI-powered features"

    To enable AI-powered features, {{product_name}} requires a subscription key from the [WSO2 AI subscription portal](https://ai-subscriptions.wso2.com/){target="_blank"}. See the [guide]({{base_path}}/get-started/subscribe-to-ai-features/) for step by step instructions.

{% endif %}

## Generate branding with Branding AI

To generate branding using Branding AI:

1. On the {{product_name}} Console, go to **Branding** > **Styles & Text**.

2. Click on **Try Branding AI**.

    ![AI Branding button]({{base_path}}/assets/img/guides/branding/ai-branding-try.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the website URL you'd like to use as the basis for branding.

    ![AI Branding URL input]({{base_path}}/assets/img/guides/branding/ai-branding-input.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Press enter to automate branding for your organization based on the website you provided.

    The system will then process the website and start generating the branding theme.

    ![AI Branding generating]({{base_path}}/assets/img/guides/branding/ai-branding-generating.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Review and customize generated branding

Once Branding AI processes your website, you'll find the branding **Design** tab populated with recommendations for the following **Theme Preferences**:

- Color palette derived from your website.
- Fonts and typography styles.
- Button styles and other UI elements.

![AI Branding output]({{base_path}}/assets/img/guides/branding/ai-branding-output.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You can further customize these branding guidelines by:

- Adjusting the color schemes to match your brand identity.
- Choosing alternative fonts that reflect your brand's personality.
- Modifying UI element styles to align with your brand's aesthetic.

By reviewing and customizing the generated branding, you can ensure that it perfectly aligns with your organization's unique identity and enhances your brand presence across all {{product_name}} interfaces.

## Apply branding

Once you've reviewed and customized the generated branding to your satisfaction, click **Save & Publish** to apply it across your organization's user interfaces.
