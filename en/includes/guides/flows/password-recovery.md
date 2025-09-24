# Password recovery <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

Password recovery allows users to securely reset their password if they forget it. The flow generally involves verifying user identity through a secure method, such as an email or SMS code, before letting them set a new password.

In the **Flow Builder**, you can create the password recovery journey in two ways:

- **Use a starter template** – Load a ready made flow and customize it to your needs.

- **Build from scratch** – Take full control by designing every step yourself.

## Sample use case

Imagine you want to verify the user’s identity via **Email OTP** before allowing them to reset their password. The flow works as follows:

- The user enters the **username**.
- {{product_name}} sends a **one-time code** to the user's registered email address.
- The user verifies the email address by entering the code.
- The user resets their password.

This ensures that only users with access to the registered email address can reset the password, enhancing security.

![Final Flow]({{base_path}}/assets/img/guides/flows/flow-builder-password-recovery-final-flow.png){: width="auto" style="display: block; margin: 0;"}

## Build it

To build the sample use case, you can start from the Password Recovery with Email OTP template and adjust it to:

- Provide a **Back to application** link on the “Forgot Password?” screen to navigate back to the login screen.

- Require users to confirm their new password during reset.

Follow the steps below to configure this flow.

### Step 1 – Load the template

To load the template,

1. Navigate to **Home** > **Flows**.

2. Click on the **password recovery** card.

3. Click the `+` button next to the **Password Recovery with Email OTP** template.

![Step 1]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-01.gif){: width="auto" style="display: block; margin: 0;"}

### Step 2 – Add a “Back to application” link

If users change their minds or click the button by accident, they should be able to return to the application easily. For this, we'll add a "Back to application" button at the bottom of the `Forgot Password?` screen.

1. From the **Components** section, drag and drop a **Rich Text** component to the **Forgot Password?** view.

    ![Step 2.1]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02-1.gif){: width="auto" style="display: block; margin: 0;"} <br>

2. Change the rich text content and styling. To do so,

    - In the Rich Text Editor, type: `Back to application`.  

    - Change the style to **Heading 5** and **center align**.  

        ![Step 2.2]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02-2.gif){: width="auto" style="display: block; margin: 0;"} <br>

3. Add a hyperlink to the text pointing to the application access URL. To do so,

    - Highlight the text and click the **Link** button.
  
    - In the link editor popup window, then click **Edit** in the popup window.

    - From the dropdown, select **Callback or Application Access URL** and save.

        ![Step 2.3]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-02-3.gif){: width="auto" style="display: block; margin: 0;"} <br>

4. Click **Save Draft** to keep your progress.  

### Step 3 – Require password confirmation

The default password reset screen only asks to enter the new password once. You can make it more secure by asking the user to confirm the entered password before submission. To do so,

1. Navigate to the Reset Password view and click the pencil icon on the Password field.

2. Tick the **Require Confirmation** checkbox.

3. Click **Save Draft** to save your changes. When ready, toggle the switch on the top right corner to **Enable** and publish the updated flow.

    ![Step 3]({{base_path}}/assets/img/guides/flows/flow-password-recovery-step-03.gif){: width="auto" style="display: block; margin: 0;"}

Now that these changes are in place, you have built a secure and user-friendly password recovery flow.
