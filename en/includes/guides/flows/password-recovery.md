# Password recovery <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

Password recovery allows users to reset their accounts when they lose access. This involves verifying their identity through a secure method, such as an email or SMS code, before letting them set a new password.

In the **Flow Builder**, you can create a password recovery journey in two ways:

- **Use a starter template** – Load a ready made flow and customize it to your needs.

- **Build from scratch** – Take full control by designing every step yourself.

## Sample use case

Imagine you want to verify the user’s identity via **Email OTP** before allowing them to reset their password. The flow works as follows:

- The user enters their **username**.
- A **one-time code** is sent to their registered email.
- The user verifies the code.
- The user resets their password.

To improve the default template, we’ll add a **“Back to application”** link for easier navigation and require **password confirmation** during reset for extra security.

![Final Flow]({{base_path}}/assets/img/guides/flows/flow-builder-password-recovery-final-flow.png){: width="auto" style="display: block; margin: 0;"}

## Build it

This password recovery journey is based on the **Email OTP template**. Starting from the template, we’ll adjust it to:

- Provide a **Back to application** link on the “Forgot Password?” screen.
- Require users to **confirm their new password** during reset.

Follow the steps below to configure this flow.

### Step 1 – Load the Email OTP Template

![Step 1]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-01.gif){: width="auto" style="display: block; margin: 0;"}

1. Navigate to **Home** > **Flows**.
2. Click on the **password recovery** card.
3. Click the `+` button next to the **Password Recovery with Email OTP** template.

### Step 2 – Add a “Back to application” link

If a user changes their mind or clicks the wrong option, they should have an easy way back to the application. Let’s make that possible by adding a link at the bottom of the `Forgot Password?` screen.

1. From the **Components** section, drag and drop a **Rich Text** component to the **Forgot Password?** view.

    ![Step 2.1]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02-1.gif){: width="auto" style="display: block; margin: 0;"} <br>

2. Configure the Rich Text. To do so,

    - In the Rich Text Editor, type: `Back to application`.  

    - Change the style to **Heading 5** and **center align**.  

    - Highlight the text, click the **Link** button, then click **Edit** in the popup window.  

   ![Step 2.2]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02-2.gif){: width="auto" style="display: block; margin: 0;"} <br>

3. From the dropdown, select **Callback or Application Access URL** and save.

   ![Step 2.3]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02-3.gif){: width="auto" style="display: block; margin: 0;"} <br>

4. Click **Save Draft** to keep your progress.  

### Step 3 – Require password confirmation

The default reset screen asks for a new password once. Let’s make it more secure by requiring the user to confirm their password before submission.

1. Navigate to the `Reset Password` view and click the pencil icon on the **Password field**.
2. Tick the **Require Confirmation** checkbox.
3. Click **Save Draft** to keep your changes, or **Enable** to publish the updated flow.

![Step 3]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-03.gif){: width="auto" style="display: block; margin: 0;"}

With these two changes, our Email OTP password recovery journey is both more user-friendly and more secure.
