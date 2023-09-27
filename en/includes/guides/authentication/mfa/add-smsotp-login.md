# Add MFA with SMS OTP

SMS OTP is a One-Time Password (OTP) sent to the user's registered mobile number on {{ product_name }}. The OTP is typically valid for a short period, preventing unauthorized users from accessing the OTP and thereby adding an extra layer of security to the authentication process.

Follow the instructions below to configure MFA using SMS OTP in {{ product_name }}.

## Prerequisites
To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

!!! note
    - You can use SMS OTP for multi-factor authentication only if a previous authentication step is configured with `username and password`, `magic link`, or any federated authenticator.
    - SMS OTP cannot be used as the first step in your login flow.
    - {{ product_name }} SMS OTP uses {{ product_name }} events to publish the OTP Notification data.

## Set up SMS OTP

To enable SMS OTP for the organization:

1. On the {{ product_name }}, go to **Connections** and select **SMS OTP**.
2. Update the following parameters in the **Settings** tab:

    ![Setup SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/smsotp/configure-sms-otp-settings.png){: width="600"}

    <table>
        <tr>
            <th>Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>SMS OTP expiry time</td>
            <td>The generated OTP will not be valid after this expiry time.</td>
        </tr>
        <tr>
            <td>Use only numeric characters for OTP</td>
            <td>If this checkbox is checked, the generated OTP will only contain digits (0-9).
                If the checkbox is unchecked, the OTP will contain alphanumeric characters.
            </td>
        </tr>
        <tr>
            <td>SMS OTP length</td>
            <td>Specifies the number of characters allowed in the OTP.</td>
        </tr>
    </table>

3. Click **update** to save your configurations.

## Add SMS OTP for an app
To add **SMS OTP** to the authentication flow of the app:

1. On the {{ product_name }} Console, go to **Applications**.
2. Select the application to which you wish to add SMS OTP.

3. Go to the **Sign-in Method** tab of the application and add the SMS OTP authenticator from your preferred editor:

    ---
    === "Classic Editor"
        - If you don't have a customized login flow, you can click **Add SMS OTP as a second factor**.

            ![Add SMS OTP authenticator]({{base_path}}/assets/img/guides/mfa/smsotp/sms-otp-authenticator.png){: width="600"}

        This opens the customized login flow with SMS OTP as a second-factor authenticator:

        - If you have an already customized login flow, you can add a second step and add SMS OTP as the authenticator.

            ![Customize the login flow]({{base_path}}/assets/img/guides/mfa/totp/view-totp-authenticator.png){: width="600"}

    === "Visual Editor"
        To add SMS OTP as a second-factor authenticator using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Multi-factor login**.

        2. Select `Username + Password -> SMS OTP`.

        3. Click **Confirm** to add SMS OTP as a second factor to the sign-in flow.

            ![Configuring SMS OTP authenticator in Asgardeo using the visual editor]({{base_path}}/assets/img/guides/mfa/smsotp/add-sms-otp-authenticator-using-visual-editor.png){: width="600"}

    ---

    !!! note "Enable backup codes"
        Once the SMS OTP authenticator is added, select **Enable backup codes**. This allows users to use their backup codes to log in to the application when they cannot obtain the required MFA codes.

        === "Using the classic editor"
            ![Enable backup codes for SMS otp authenticator]({{base_path}}/assets/img/guides/mfa/smsotp/enable-backup-codes.png){: width="500"}
        
        === "Using the visual editor"
            ![Enable backup codes for SMS otp authenticator using the visual editor]({{base_path}}/assets/img/guides/mfa/smsotp/enable-backup-codes-with-visual-editor.png){: width="500"}

        Learn more about [configuring backup codes for business users]({{base_path}}/guides/user-self-service/manage-backup-codes/).

4. Click **Update** to save your changes.

## Create a webhook to consume OTP notifications

{{ product_name }}'s SMS OTP authenticator uses {{ product_name }} events to publish the OTP Notification data. You can consume these notifications by creating webhooks in [Choreo](https://console.choreo.dev/login).

To create a webhook on Choreo:

1. Create an organization in [Choreo](https://console.choreo.dev/login) with the same name and email address you used to create your {{ product_name }} organization.

    !!! note
        Organizations in {{ product_name }} and Choreo will synchronize based on the organization name.

2. Select the **Default Project** under **All Projects**. Alternatively, you can create a new project or use an existing project.

3. Start creating a webhook in Choreo from the list of components. Learn more about webhooks in the Choreo [documentation](https://wso2.com/choreo/docs/develop/components/webhook/#develop-a-webhook).

    ![Create a Webhook in Choreo]({{base_path}}/assets/img/guides/asgardeo-events/asgardeo-events-create-webhook-in-choreo.png){: width="600"}

4. Provide general details of the webhook and click **Next**

    ![General details of the choreo webhook.]({{base_path}}/assets/img/guides/mfa/smsotp/choreo-webhook-add-details.png){: width="600"}

5. Authorize and connect the GitHub repository that you want your webhook code to be hosted on and click **Next**.

    !!! note
        Be sure to select **Start with a sample**, which will create a pull request in your GitHub repository with the starter code required for the webhook.

    ![Configure repository for choreo webhook.]({{base_path}}/assets/img/guides/mfa/smsotp/choreo-webhook-configure-repository.png){: width="600"}

6. Select **{{ product_name }}** as the **Trigger Type** and click **Next**.

    ![Select {{ product_name }} trigger type]({{base_path}}/assets/img/guides/asgardeo-events/choreo-select-asgardeo-trigger-type.png){: width="600"}

7. Select **NotificationService** as the **Trigger Channel** and click **Create**.

    !!! note
        The `NotificationService` trigger channel listens to all notification events from the organization in {{ product_name }}.

    ![Select NotificationService as the webhook trigger channel.]({{base_path}}/assets/img/guides/mfa/smsotp/choreo-webhook-trigger-channel.png){: width="550"}

8. After the webhook is created, Choreo will create a pull request in your connected Github repository with the sample starter code. Go to your repository and merge this code to complete the setup.


## Define the business logic

1. Navigate to your connected GitHub repository and open the **webhook.bal** file. Your boilerplate code may look as below.

    ``` java
    import ballerinax/trigger.asgardeo;
    import ballerina/http;

    configurable asgardeo:ListenerConfig config = ?;

    listener http:Listener httpListener = new(8090);
    listener asgardeo:Listener webhookListener =  new(config,httpListener);

    service asgardeo:NotificationService on webhookListener {
  
        remote function onSmsOtp(asgardeo:SmsOtpNotificationEvent event ) returns error? {
        //Not Implemented
        }
    }

    service /ignore on httpListener {}

    ```

2. Define your business logic in the webhook.bal file.

    !!! note
        The following sample logic is defined on an {{ product_name }} webhook that uses the `NotificationService` trigger channel. This webhook is programmed to send the SMS Message via an SMS Gateway.

    ``` java
    import ballerinax/trigger.asgardeo;
    import ballerina/http;
    import ballerina/log;
    import wso2/choreo.sendsms;
    
    configurable asgardeo:ListenerConfig config = ?;
    
    listener http:Listener httpListener = new(8090);
    listener asgardeo:Listener webhookListener =  new(config,httpListener);

    sendsms:Client sendSmsClient = check new ();
    
    service asgardeo:NotificationService on webhookListener {
        
        remote function onSmsOtp(asgardeo:SmsOtpNotificationEvent event) returns error? {
          
          //logging the event.
          log:printInfo(event.toJsonString());

          //read required data from the event.
          asgardeo:SmsOtpNotificationData? eventData = event.eventData;
          string toNumber = <string> check eventData.toJson().sendTo;
          string message = <string> check eventData.toJson().messageBody;

          string response = check sendSmsClient -> sendSms(toNumber, message);
          log:printInfo(response);
        } 
    }
    
    service /ignore on httpListener {}
    ```

    ??? note "SmsOtpNotificationEvent Metadata"
        The payload of the `SmsOtpNotificationEvent` contains the following metadata:

        - **Security Data** object: The security data object is the same as all other [{{ product_name }} events](https://wso2.com/asgardeo/docs/guides/asgardeo-events). This contains the following security metadata about the event.
        <table>
            <thead>
                <tr>
                    <th><b>Property Name</b></th>
                    <th><b>Type</b></th>
                    <th><b>Description</b></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>iss</code></td>
                    <td>String</td>
                    <td>Issuer of the event</td>
                </tr>
                <tr>
                    <td><code>iat</code></td>
                    <td>String</td>
                    <td>Event published timestamp.</td>
                </tr>
                <tr>
                    <td><code>jti</code></td>
                    <td>String</td>
                    <td>Unique identifier for the event.</td>
                </tr>
                <tr>
                    <td><code>aud</code></td>
                    <td>String</td>
                    <td>Audience of the event.</td>
                </tr>
            </tbody>
        </table>

        Sample security data object:

        ``` js
        {
            "iss": "Asgardeo",
            "jti": "3b69b103-fa6c-424a-bbf4-a974d0c2d2a3",
            "iat": 1659732032884,
            "aud": "https://websubhub/topics/myorg/NOTIFICATIONS"
        }
        ```

        - **Event Data** object - The event data object contains the details of the event. This contains the following metadata about the notification event.
    
        <table>
            <thead>
                <tr>
                    <th><b>Property Name</b></th>
                    <th><b>Type</b></th>
                    <th><b>Description</b></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>organizationId</code></td>
                    <td>int</td>
                    <td>Organization Identifier</td>
                </tr>
                <tr>
                    <td><code>organizationName</code></td>
                    <td>String</td>
                    <td>Organization name</td>
                </tr>
                <tr>
                    <td><code>sendTo</code></td>
                    <td>String</td>
                    <td>Mobile number receiving the SMS OTP.</td>
                </tr>
                <tr>
                    <td><code>messageBody</code></td>
                    <td>String</td>
                    <td>Content of the SMS OTP Message</td>
                </tr>
            </tbody>
        </table>

        Sample event data object:

        ``` js
        {
        "organizationId": 3,
        "organizationName": "myorg",
        "sendTo": "+1234567890"
        "messageBody": "Your one-time password for the myapp is 075052. This expires in 5 minutes.",
        }
        ```

3. Once you have defined your logic, you can [deploy your webhook](https://wso2.com/choreo/docs/webhook/#deploy-a-webhook) to capture {{ product_name }} notification events.

## How it works

When SMS OTP is enabled for the organization and added to the login flow of your application, the application user will be prompted with the SMS OTP authentication step once the first authentication step is completed. Given below are the high-level steps that follow:

1. {{ product_name }} sends the OTP to the user's registered mobile number.
2. {{ product_name }} prompts the user to enter the OTP code.

    ![Authenticate with SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/smsotp/enter-sms-otp.png){: width="300"}

3. If required, the user can request {{ product_name }} to resend the OTP. A new OTP will be sent if the current resend attempt count is less than the maximum allowed resend attempt count. The new OTP invalidates the previously sent OTP.
4. The user enters the OTP and clicks **Continue**.
5. On successful authentication, the user can access the application.
