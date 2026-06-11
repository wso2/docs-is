# Password recovery

Password recovery allows users to securely reset their password if they forget it. The user verifies their identity through a secure method, such as an email or SMS code, before setting a new password.

In the **Flow Builder**, you can create the password recovery journey in two ways:

- **Use a starter template** – Load a ready made flow and customize it to your needs.

- **Build from scratch** – Take full control by designing every step yourself.

## Sample use case

Imagine you want to verify the user’s identity via SMS OTP before allowing them to reset their password. The flow works as follows:

- The user enters the **username**.
- {{product_name}} sends a **one-time code** to the user's registered mobile number.
- The user verifies their identity by entering the code.
- The user resets their password.

This ensures that only users with access to the registered mobile number can reset the password, enhancing security.

![Final Flow]({{base_path}}/assets/img/guides/flows/flow-password-recovery.png){: width="auto" style="display: block; margin: 0;"}

## Build the flow

To build the sample use case, you can start from the **Password Recovery with SMS OTP** template and adjust it.

Follow the steps below to configure this flow.

### Step 1 – Load the template

To load the template,

1. On the {{product_name}} console, navigate to Flows.

2. Click on the **password recovery** card.

3. Click the `+` button next to the **Password Recovery with SMS OTP** template to load it onto the canvas.

![Step 1]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-01.png){: width="auto" style="display: block; margin: 0;"}

### Step 2 – Configure the flow completion

The End node determines what the user experiences after successfully resetting their password. Configure actions like auto login or sending a notification email.

1. Click on the green End node on the canvas (labeled "Password Reset Successfully").

2. With the End node selected, click the gear icon (⚙️) on the top-right to open the [Flow Completion Properties](#flow-completion-properties).

3. Configure the desired outcomes:

    - **Auto Login**: Immediately logs the user in once the flow is completed.
  
    - **Send a notification email on flow completion**: Notifies the user via email that their password has been successfully reset.

4. Click **Save Draft** to keep your progress.  

![Step 1]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02.png){: width="auto" style="display: block; margin: 0;"}

### Step 3 – Enable the flow

Once the flow has been fully configured and is ready for users:

1. On the top-right corner of the Flow Builder, turn the toggle ON to publish the flow.

Now that these changes are in place, you have built a secure and user-friendly password recovery flow using SMS OTP.

## Configure for alternative login identifiers

If you have enabled [alternative login identifiers]({{base_path}}/guides/authentication/multi-attribute-login/), users can log in using configured attributes such as email address or mobile number as well as their username. To allow users to use these same identifiers when recovering their password, you need to update the identifier input field in the password recovery flow.

Follow the steps below:

1. On the **Edit Password Recovery Flow** canvas, hover over the **Username** input field and click the gear icon (⚙️) that appears to open the **Input Properties** panel.

2. In the **Attribute** dropdown, select **User Identifier**.

    ![Input properties panel showing User Identifier selected in the Attribute field]({{base_path}}/assets/img/guides/flows/flow-password-recovery-user-identifier-selected.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The **User Identifier** option only appears in the **Attribute** dropdown after [alternative login identifiers]({{base_path}}/guides/authentication/multi-attribute-login/) have been enabled.

3. Click **Save Draft**, then publish the flow.

Users can now enter any of their configured alternative login identifiers (such as email address) on the **Forgot Password?** page to start password recovery.

## Reference

This section provides details on the configuration options available in the Password Recovery Flow.

### Flow completion properties

The Flow Completion Properties, configured on the End node, define the final actions that occur after a user successfully sets their password.

- **Auto Login**: If enabled, the user is automatically logged into their account immediately after successfully completing the password recovery flow.
- **Send a notification email on flow completion:** When enabled, the user will receive an email confirming that their password recovery is complete and their account is ready to use.
