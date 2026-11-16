# Profile update

Profile update allows signed-in users to securely update their own profile information, such as their name, email address, or mobile number. The user verifies their identity through a secure method, such as an email or SMS code, before updating the profile.

In the **Flow Builder**, you can create the profile update journey in two ways:

- **Use a starter template** – Load a ready-made flow and customize it to your needs.
- **Build from scratch** – Take full control by designing every step yourself.

## Sample use case

Imagine a user is signed in to your application and wants to update their profile. You want to verify the user's identity via Email OTP before allowing them to make the change. The flow works as follows:

1. The application starts the flow with the ID token of the signed-in user, using the [Flow Execution API]({{base_path}}/guides/flows/flow-execution-api/).
2. {{product_name}} identifies the user from the ID token and returns a one-time link to the profile management page.
3. The application opens the link in the browser.
4. {{product_name}} sends a **one-time code** to the user's registered email address.
5. The user verifies their identity by entering the code.
6. The user updates the profile.

This ensures that only the signed-in user with access to the registered email address can update the profile, enhancing security.

![Profile update flow]({{base_path}}/assets/img/guides/flows/flow-profile-update.png){: width="auto" style="display: block; margin: 0;"}

## Build the flow

To build the sample use case, start from the **Profile Update with Email OTP** template and adjust it.

Follow the steps below to configure this flow.

### Step 1 - Load the template

To load the template:

1. On the {{product_name}} console, navigate to Flows.
2. Click on the **Profile Update** card. This loads the **Profile Update with Email OTP** template onto the canvas by default.
3. If the template isn't loaded automatically, click the `+` button next to the **Profile Update with Email OTP** template to load it onto the canvas.

![Step 1]({{base_path}}/assets/img/guides/flows/flow-profile-update-step-01.png){: width="auto" style="display: block; margin: 0;"}

### Step 2 - Add the attributes to update

By default, the form in the **Update Profile** step doesn't contain any input fields. Add the attributes that users are allowed to update.

1. From the Components panel, drag and drop a field component, such as **Text Input**, onto the form in the **Update Profile** step.
2. Click the pencil icon on the field and, from the **Attribute** dropdown, select the attribute it updates (for example, **First Name**).
3. Repeat for each attribute that users are allowed to update.

![Step 2]({{base_path}}/assets/img/guides/flows/flow-profile-update-step-02.png){: width="auto" style="display: block; margin: 0;"}

!!! note
    The username and read-only attributes can't be added to the form. When the user submits the form, {{product_name}} saves only the attributes that the user changed.

### Step 3 - Configure the flow completion

The End node determines what the user experiences after successfully updating the profile.

1. Click on the green End node on the canvas (labeled "Profile Updated Successfully").
2. With the End node selected, click the gear icon (⚙️) on the top-right to open the [Flow Completion Properties](#flow-completion-properties).
3. (Optional) Enable **Send a notification email on flow completion** to notify the user that their profile has been updated.
4. Click **Save Draft** to keep your progress.

### Step 4 - Enable the flow

Once the flow has been fully configured and is ready for users:

1. On the top-right corner of the Flow Builder, turn the toggle ON to publish the flow.

Now that these changes are in place, you have built a secure profile update flow that uses Email OTP for identity verification.

## Start the flow from your application

The **Verify Signed-in User** step identifies the user from the ID token that your application holds. To accept the ID token, {{product_name}} requires the `urn:wso2:identity:flow:user-verification` audience in it.

To start the flow from your application:

1. On the {{product_name}} Console, go to **Applications** and select your application.
2. In the **Protocol** tab, under **ID Token**, add `urn:wso2:identity:flow:user-verification` as an [audience]({{base_path}}/references/app-settings/oidc-settings-for-app/#id-token) and click **Update**.
3. Once the user signs in, call the Flow Execution API with the user's ID token.

    ```bash
    curl --location '{{api_base_path}}/api/server/v1/flow/execute' \
    --header 'Content-Type: application/json' \
    --data '{
      "flowType": "PROFILE_UPDATE",
      "applicationId": "<application_id>",
      "inputs": {
        "token": "<id_token>",
        "tokenType": "urn:ietf:params:oauth:token-type:id_token"
      }
    }'
    ```

4. The response is a `REDIRECTION` type response. Open the link in `data.url` in the browser, where the user continues the flow.

!!! note
    The ID token must be issued within the **Maximum token age** of the **Verify Signed-in User** step, and the link is valid only once, within the time set in the **Continue Elsewhere** step. See [Verify signed-in user properties](#verify-signed-in-user-properties) and [Continue elsewhere properties](#continue-elsewhere-properties).

## Start the flow without a token

Instead of the **Verify Signed-in User** step, you can start the flow with a **User Resolve View**, where the user enters the username. In this case, the flow must have at least one verification step after it, such as an **Email OTP View**, **SMS OTP View**, or **Magic Link View**.

## Reference

This section provides details on the configuration options available in the Profile Update flow.

### Verify signed-in user properties

The **Verify Signed-in User** step identifies the user from the ID token that the application sends when it starts the flow.

- **Maximum token age:** Set the duration (in minutes) within which the ID token must have been issued. The default value is 5 minutes.

### Continue elsewhere properties

The **Continue Elsewhere** step returns a one-time link, so that the user continues the flow in the browser.

- **Continue at:** The page the link points to, where the flow continues. Leave it empty to use the default profile management page of {{product_name}}.
- **Link valid for:** Set the duration (in seconds) for which the link is valid. The default value is 60 seconds.

### Flow completion properties

The Flow Completion Properties, configured on the End node, define the final actions that occur after a user successfully updates the profile.

- **Send a notification email on flow completion:** When enabled, the user will receive a notification confirming that their profile has been updated. The notification is sent to the user's preferred channel, by email or SMS.
