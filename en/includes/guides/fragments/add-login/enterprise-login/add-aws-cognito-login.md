!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

To enable AWS Cognito login:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application, go to the **Login Flow** tab and add AWS Cognito login from your preferred editor:

    {% if product_name == 'WSO2 Identity Platform' %}
    === "Classic Editor"
        To add AWS Cognito login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the step, select your AWS Cognito connection, and click **Add**.

            ![Add AWS Cognito login in {{ product_name }}]({{base_path}}/assets/img/guides/idp/aws-cognito/add-aws-cognito-login-option-classic-option.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add AWS Cognito login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your AWS Cognito connection.

            ![Add AWS Cognito login in {{ product_name }} using the Visual Editor]({{base_path}}/assets/img/guides/idp/aws-cognito/add-aws-cognito-login-option.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}

    1. Click **Add Sign In Option** to add a new authenticator to the first step.

    2. Select the AWS Cognito connection.

    3. Click **Confirm** to add AWS Cognito login to the sign-in flow.

        ![Add AWS Cognito login in {{ product_name }} using the Visual Editor]({{base_path}}/assets/img/guides/idp/aws-cognito/add-aws-cognito-login-option.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    {% endif %}

    {% include "../recommendation.md" %}

3. Click **Update** to save your changes.
