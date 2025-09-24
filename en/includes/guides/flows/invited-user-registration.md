# Invited user registration <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

**Invited User Registration** allows users to securely set their credentials after an administrator registers them in {{product_name}}.

Once registered, the user receives an email to complete the sign-in process or use a link provided by the administrator offline. The user then clicks the email or link, verify their identity through a secure method (like an SMS or email OTP), and then set up a password.

In the **Flow Builder**, you can create the invited user registration journey in two ways:

- **Use a starter template** – Load a ready made flow and customize it to your needs.

- **Build from scratch** – Take full control by designing every step yourself.

## Sample use case

Imagine you want to verify the user’s identity via **SMS OTP** before allowing them to set their password. The flow works as follows:

- The user clicks the link in the invitation email or pastes the URL in their browser.
- {{product_name}} sends a **one-time code** to the user's registered mobile number.
- The user confirms their identity by entering the code.
- The user sets their password.

This ensures that only users with access to the registered mobile number can complete the registration, enhancing security.

![Invited user registration flow]({{base_path}}/assets/img/guides/flows/flow-builder-invited-user-registration-final-flow.png){: width="auto" style="display: block; margin: 0;"}

## Build it

To build the sample use case, you can start from the **Invited User Registration** template and adjust it to:

- Use **SMS OTP** for identity verification.
- Require users to confirm their new password during reset.

### Step 1 - Load the template

To load the template,

1. Navigate to **Home** > **Flows**.

2. Click on the **Invited User Registration** card.

3. Click the `+` button next to the **Invited User Registration** template.

![Step 1]({{base_path}}/assets/img/guides/flows/flow-invited-user-registration-step-01.gif){: width="auto" style="display: block; margin: 0;"}

### Step 2 - Add an SMS OTP verification step

This step verifies the user's mobile number provided during the registration before allowing them to set their password.

1. Expand **Steps**, drag **Blank View** onto the canvas and place it between **Confirmation Code** and **Set Password**.

    ![Step 2.1]({{base_path}}/assets/img/guides/flows/flow-invited-user-registration-step-02-1.gif){: width="auto" style="display: block; margin: 0;"}

2. Remove the connection between **Confirmation Code** and **Set Password** and connect **Confirmation Code** with **Blank view**.

    ![Step 2.2]({{base_path}}/assets/img/guides/flows/flow-invited-user-registration-step-02-2.gif){: width="auto" style="display: block; margin: 0;"}

3. Expand **Widgets** and drag and drop the **continue with SMS OTP** widget into the newly added blank view.

    ![Step 2.3]({{base_path}}/assets/img/guides/flows/flow-invited-user-registration-step-02-3.gif){: width="auto" style="display: block; margin: 0;"}

    !!! note

        Where necessary, rearrange the connections so that the flow follows a proper sequence.

4. Connect the **verify OTP** view with the **set password** view.

    ![Step 2.4]({{base_path}}/assets/img/guides/flows/flow-invited-user-registration-step-02-4.gif){: width="auto" style="display: block; margin: 0;"}

### Step 3 – Require password confirmation

The default password reset screen only asks to enter the new password once. You can make it more secure by asking the user to confirm the entered password before submission. To do so,

1. In the **Set Password** view, click the pencil icon on the **Password field** and check the **Require Confirmation** checkbox.

    ![Step 2.5]({{base_path}}/assets/img/guides/flows/flow-invited-user-registration-step-02-5.gif){: width="auto" style="display: block; margin: 0;"}

2. Click **Save Draft** to save your changes. When ready, toggle the switch on the top right corner to **Enable** and publish the updated flow.

Now that these changes are in place, you have built a secure and user-friendly invited user registration flow.
