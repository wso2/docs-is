# Troubleshooting

**Flow Builder** validates your flow to ensure it works correctly. If a validation rule fails, an error appears. Fix all errors before publishing the flow.

## How to find errors

- Click the **bell icon** in the top-right corner of the builder. The bell icon displays a red indicator when errors exist.

    ![Flow Builder Error]({{base_path}}/assets/img/guides/flows/flow-error-01.png){: width="auto" style="display: block; margin: 0;"}

- Click the **Show** button (as shown in the screenshot above) to highlight the component with the error.

    ![Flow Builder Error]({{base_path}}/assets/img/guides/flows/flow-error-02.png){: width="auto" style="display: block; margin: 0;"}

## Common error messages

The following table lists common error messages you may encounter while building flows, along with their recommended solutions.

| **Error Message** | **Context / Flow Type** | **Cause** | **Solution** |
|--------------------|--------------------------|------------|---------------|
| A preceding step must include an email address to use the Email OTP verification. | Self-Registration | The flow has an Email OTP step, but no preceding step collects the user's email address. | Add an Email Input field to a form before the verification step. |
| A preceding step must include a mobile number to use the SMS OTP verification. | Self-Registration | The flow has an SMS OTP step, but no preceding step collects the user's mobile number. | Add a Phone Input component to a form before the verification step. |
| The password recovery flow must contain at least one verification method. | Password Recovery | The flow doesn't include a secure method to verify the user's identity before allowing a password reset. | Add an Email OTP View, SMS OTP View, or a Magic Link step after the initial screen. |
| Forms with a Password field require a Provision Password Action to be configured for the button. | Common (All flows) | A button on a “Set Password” form hasn't been configured to save the new password. | Select the button and in its properties, add the **Provision Password** action. |
| Required fields aren't properly configured for the [input/phone number] field with ID [Component ID] | Common (All flows) | A form input component (like Text or Phone Input) is missing a mandatory configuration — often the Attribute mapping linking the field to a user profile attribute (for example, Username, Mobile). | Select the highlighted component. In its properties panel, locate the required field (usually **Attribute**) and select the correct value from the dropdown. |

{% if product_name == "WSO2 Identity Platform" %}

## Conditional branching and flow variables

The following table lists errors you may encounter while building flows with [conditional branching]({{base_path}}/guides/flows/conditional-branching/) and [flow variables]({{base_path}}/guides/flows/conditional-branching/#use-flow-variables).

| **Error Message** | **Context / Flow Type** | **Cause** | **Solution** |
| -------------------- | -------------------------- | ------------ | --------------- |
| Add at least one branch with a rule to the decision. A decision with only the default branch has nothing to decide. | Common (All flows) | A **Decision** step has only the default branch. | Select the **Decision** step and click **Add another branch**, or remove the **Decision** step. |
| Complete the rules of the decision branches: [branches]. Each condition needs a field, an operator and a value. | Common (All flows) | A condition in the listed branches is missing a field, an operator or a value. | Open each listed branch and complete its conditions, or remove the incomplete ones. |
| Connect the decision branches to the step they lead to: [branches]. | Common (All flows) | A branch of a **Decision** step doesn't lead to any step. | On the canvas, connect the port of each listed branch to the next step. |
| Decision Step Limit Reached | Common (All flows) | The flow already has [limit] **Decision** steps. | Combine decisions where you can. A single **Decision** step can hold several branches. |
| Fix the flow variables on the Start step before saving: [names]. | Common (All flows) | A variable on the **Start** step has an invalid name, a duplicate name or an invalid initial value. | Click **Configure flow variables** on the **Start** step and fix the listed variables. |
| The flow reads more headers than this server allows. Keep up to [limit]. | Common (All flows) | The flow defines more than [limit] request headers. | Remove the headers that the flow's decision steps don't use. |
| The flow defines more runtime values than this server allows. Keep up to [limit]. | Common (All flows) | The flow defines more than [limit] runtime values, not counting `abTestingKey`. | Remove the runtime values that the flow's decision steps don't use. |

!!! tip
    {{product_name}} doesn't fail a flow when it ignores the value of a flow variable. If a decision step doesn't take the branch you expect, see [Invalid values]({{base_path}}/guides/flows/conditional-branching/#invalid-values).

{% endif %}
