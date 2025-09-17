# Self registration <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

Self registration allows new users to create an account without admin intervention. The flow can include steps to collect user details, verify identity and set credentials before the account becomes active.

In the **Flow Builder**, you can create a self registration journey in two ways:

- **Use a starter template** – Load a ready made flow and customize it to match your onboarding requirements.

- **Build from scratch** – Take full control by designing every step yourself.

## Sample use case

Imagine you want to simplify user sign up by asking only for essential details, but also enforce stronger security with mobile verification.

In this flow:

- The user provides **Email**, **mobile number**, and **password**.
- The system sends an **SMS OTP** to verify the mobile number.
- Only after OTP verification, the account is created.

This ensures that every registered user has a valid mobile number, reducing the chance of fake sign ups.

![Final Flow]({{base_path}}/assets/img/guides/flows/flow-builder-registration-final-flow.png){: width="auto" style="display: block; margin: 0;"}

## Build it

This use case is a minimal sign up journey that collects only Email, Mobile, and Password, and requires SMS OTP verification before completing registration. We’ll start from the Basic Details template and modify it as follows:

- Keep only **Email, Mobile, Password**.
- Mark **Mobile** as **Required**.
- Change the **Sign Up** button action to **Navigation**.
- Insert an **SMS OTP** step before the success state.

Follow the steps below to configure it.

### Step 1 – Load the basic template

1. Navigate to **Home** > **Flows**.
2. Click on the **Self Registration** card.
3. Click the `+` button next to the **Basic Details** template.

![Step 1]({{base_path}}/assets/img/guides/flows/flow-registration-step-01.gif){: width="auto" style="display: block; margin: 0;"}

### Step 2 – Keep only email, mobile, and password fields

We can simplify the form to collect only the essentials for registration and ensure that mobile is mandatory for SMS OTP verification later.

1. In the first Sign Up view, keep only the fields **Email**, **Mobile**, and **Password**, and delete the rest.

    ![Step 2.1]({{base_path}}/assets/img/guides/flows/flow-registration-step-02-1.gif){: width="auto" style="display: block; margin: 0;"}

2. Click on the **Mobile** field and tick the **Required** checkbox in **Input Properties** pane to make it mandatory.

    ![Step 2.2]({{base_path}}/assets/img/guides/flows/flow-registration-step-02-2.gif){: width="auto" style="display: block; margin: 0;"}

3. Click **Save Draft** to keep your progress.

### Step 3 – Remove the existing connection

We can now remove the direct link from the sign up button to the success state so we can insert the SMS OTP verification step in between.

1. Locate the line that connects the **Sign Up** button to the **green tick**.
2. Click on this line and delete it.

![Step 3]({{base_path}}/assets/img/guides/flows/flow-registration-step-03.gif){: width="auto" style="display: block; margin: 0;"}

### Step 4 – Change sign up button action to navigation

We should now make the sign up button move the user to the next step (SMS OTP) instead of finalizing the registration immediately.

1. Click the **Sign Up** button.
2. Change its action from **Onboard Password** to **Navigation**.

![Step 4]({{base_path}}/assets/img/guides/flows/flow-registration-step-04.gif){: width="auto" style="display: block; margin: 0;"}

### Step 5 – Add an SMS OTP verification step

This step verifies the mobile number provided during sign up before completing account creation.

1. Navigate to the **Steps** section and drag and drop an **SMS OTP View** onto the canvas.
        ![Step 5.1]({{base_path}}/assets/img/guides/flows/flow-registration-step-05-1.gif){: width="auto" style="display: block; margin: 0;"}
2. Connect the **Sign Up** button to the **SMS OTP View** and connect the **Verify** button to the green tick.
        ![Step 5.2]({{base_path}}/assets/img/guides/flows/flow-registration-step-05-2.gif){: width="auto" style="display: block; margin: 0;"}
3. Click **Save Draft** to save your changes. When ready, toggle the switch on the top right corner to **Enable** and publish the updated flow.
        ![Step 5.3]({{base_path}}/assets/img/guides/flows/flow-registration-step-05-3.gif){: width="auto" style="display: block; margin: 0;"}

With these changes, new users will only provide the essentials **Email**, **mobile number**, and **password** and must verify their mobile via SMS OTP before completing registration.

!!! Note
        When using a connection based sign up option (such as Google or Microsoft), configure the authorized redirect URL as: `https://accounts.asgardeo.io/t/{tenant-domain}/accounts/register`
