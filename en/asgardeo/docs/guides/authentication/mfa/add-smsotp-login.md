# Add MFA with SMS OTP

SMS OTP is a One-Time Password (OTP) sent to the user's registered mobile number on Asgardeo. The OTP is typically valid for a short period, preventing unauthorized users from accessing the OTP and thereby adding an extra layer of security to the authentication process.

Follow the instructions below to configure MFA using SMS OTP in Asgardeo.

## Prerequisites
To get started, you need to [register an application with Asgardeo]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) <a :href="$withBase('/get-started/try-samples/')">sample applications</a> provided.

!!! info
    - You can use SMS OTP for multi-factor authentication only if a previous authentication step is configured with `username and password`, `magic link`, or any federated authenticator.
    - SMS OTP cannot be used as the first step in your login flow.
    - Asgardeo SMS OTP uses Asgardeo events to publish the OTP Notification data.


## Set up SMS OTP

To enable SMS OTP for the organization:

1. On the [Asgardeo Console](https://console.asgardeo.io), go to **Connections** and select **SMS OTP**.

2. Update the following parameters in the **Settings** tab:

    ![Setup SMS OTP in Asgardeo]({{base_path}}/assets/img/guides/mfa/smsotp/configure-sms-otp-settings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <td><b>SMS OTP expiry time</b></td>
        <td>The generated OTP will not be valid after this expiry time.</td>
      </tr>
      <tr>
        <td><b>Use only numeric characters for OTP</b></td>
        <td>If this checkbox is checked, the generated OTP will only contain digits (0-9).
            If the checkbox is unchecked, the OTP will contain alphanumeric characters.
        </td>
      </tr>
      <tr>
        <td><b>SMS OTP length</b></td>
        <td>Specifies the number of characters allowed in the OTP.</td>
      </tr>
    </table>

3. Click **update** to save your configurations.

## Add SMS OTP for an app

To add **SMS OTP** to the authentication flow of the app:

1. On the Asgardeo Console, go to **Applications**.
2. Select the application to which you wish to add SMS OTP.
3. Go to the **Sign-in Method** tab of the application and add the SMS OTP authenticator from your preferred editor:

    ---
    === "Classic Editor"
        - If you don't have a customized login flow, you can click **Add SMS OTP as a second factor**.

          ![Add SMS OTP authenticator]({{base_path}}/assets/img/guides/mfa/smsotp/sms-otp-authenticator.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
          This opens the customized login flow with SMS OTP as a second-factor authenticator:
    
        - If you have an already customized login flow, you can add a second step and add SMS OTP as the authenticator.

          ![Customize the login flow]({{base_path}}/assets/img/guides/mfa/totp/view-totp-authenticator.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add SMS OTP as a second-factor authenticator using the Visual Editor:
  
        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Multi-factor login**.

        2. Select `Username + Password -> SMS OTP`.

        3. Click **Confirm** to add SMS OTP as a second factor to the sign-in flow.

        ![Configuring SMS OTP authenticator in Asgardeo using the visual editor]({{base_path}}/assets/img/guides/mfa/smsotp/add-sms-otp-authenticator-using-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---

    !!! note "Enable backup codes"
        Once the SMS OTP authenticator is added, select **Enable backup codes**. This allows users to use their backup codes to log in to the application when they cannot obtain the required MFA codes.

        === "Using the Classic Editor"
            ![Enable backup codes for sms otp authenticator]({{base_path}}/assets/img/guides/mfa/smsotp/enable-backup-codes.png){: width="600" style="display: block; border: 0.3px solid lightgrey;"}

        === "Using the Visual Editor"
            ![Enable backup codes for sms otp authenticator using the visual editor]({{base_path}}/assets/img/guides/mfa/smsotp/enable-backup-codes-with-visual-editor.png){: width="600" style="display: block; border: 0.3px solid lightgrey;"}

        Learn more about <a :href="$withBase('/guides/user-self-service/manage-backup-codes/')">configuring backup codes for business users</a>.

4. Click **Update** to save your changes.

## Implement business logic for SMS OTP notification events

Asgardeo's SMS OTP authenticator publishes notification data events. You can create a webhook in [Choreo](https://wso2.com/choreo/), WSO2's integration platform, to subscribe to these events and execute custom business logic, such as to send an SMS via an SMS gateway.

### Define the business logic

Follow the steps below to programmatically define the business logic to send an SMS OTP via an SMS gateway whenever a notification event occurs.

!!! info "Prerequisites"
    - You need to have a Github repository to host the business logic.

    - Download [Ballerina](https://ballerina.io/downloads/), the programming language used to define business logic for Asgardeo events.

1. Create a new Ballerina package. Learn how to do so in the [Ballerina documentation](https://ballerina.io/learn/get-started/){: target="_blank"}.

2. Navigate to the **Ballerina.toml** file and rename the organization name to that of your Asgardeo organization.

3. Navigate to your **main.bal** file and define the business logic.

    !!! note "New to Ballerina?"

        Learn more about the **Asgardeo trigger** module and how to program business logic for SMS OTP notification data events in the [Ballerina documentation](https://central.ballerina.io/ballerinax/trigger.asgardeo/latest).

    The following sample logic logs the notification event in the Choreo console and sends an SMS Message via an SMS Gateway.

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

    ??? details "SmsOtpNotificationEvent Metadata"

        The payload of the `SmsOtpNotificationEvent` contains the following metadata:

        - **Security Data** object: The security data object is the same as all other [Asgardeo events](https://    wso2com/   asgardeo/docs/guides/asgardeo-events). This contains the following security metadata about the event.
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
        - **Event Data** object - The event data object contains the details of the event. This contains thefollowing   metadata about the notification event.

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

3. Commit your changes and push the code to your remote Github repository.

### Create a webhook in Choreo

Follow the steps below to create and deploy a webhook in Choreo.

1. Navigate to [Choreo](https://console.choreo.dev/login){: target="_blank"} and if you don't have one already, create an organization with the same name and email address you used to create your Asgardeo organization.

    !!! info
        Organizations in Asgardeo and Choreo synchronize based on their names.

2. Select a project from the **Project** dropdown.

3. Go to **Components**, and click **Create**.

4. Under the **Select a Type** tab, select **Webhook**. Learn more about webhooks in the Choreo [documentation](https://wso2.com/choreo/docs/develop/components/webhook/#develop-a-webhook).

    ![Create a Webhook in Choreo]({{base_path}}/assets/img/guides/asgardeo-events/asgardeo-events-create-webhook-in-choreo.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a name and a description for your webhook.

5. Click **Authorize with Github** and connect the relevant organization, repository and the branch of the Github repository you created in the above section.

6. Select **Ballerina** to be the Buildpack and select the **Ballerina Project Directory** from your Github repository.

7. Select the **Access Mode** as External and click **Create**.

    ![Connect Github repository to Choreo]({{base_path}}/assets/img/guides/mfa/smsotp/choreo-webhook-add-details.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

8. Follow the Choreo documentation and [deploy your webhook](https://wso2.com/choreo/docs/develop-components/develop-a-webhook/#step-2-deploy){: target="_blank"}.


## How it works

When SMS OTP is enabled for the organization and added to the login flow of your application, the user is prompted to enter an SMS OTP after the preceding authentication steps are complete.

Given below are the steps involving SMS OTP.

1. Asgardeo sends the OTP to the user's registered mobile number.

2. Asgardeo prompts the user to enter the OTP code.

   ![Authenticate with SMS OTP in Asgardeo]({{base_path}}/assets/img/guides/mfa/smsotp/enter-sms-otp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. The user can request Asgardeo to resend a new OTP.

    !!! info
        Asgardeo sends a new OTP only if the user has not exceeded the resend attempt count. The new OTP invalidates the previously sent OTP.

4. The user enters the OTP and clicks **Continue**.

5. On successful authentication, the user can access the application.
