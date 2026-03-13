# Configure CIBA grant

[Client Initiated Backchannel Authentication (CIBA)]({{base_path}}/references/grant-types/#ciba-grant) is designed for scenarios where the device used to consume a service is different from the device used for authentication. For example, a user may initiate a login on a smart TV or kiosk and approve the authentication request on their mobile phone.

In a CIBA flow, the consuming device initiates the authentication request through the client application. The authorization server then sends an authentication request to the user’s authenticating device, where the user can approve the login.

Follow this guide for instructions on configuring the CIBA grant type in your application.

## Prerequisites

- You need to register a [Standard-Based Application]({{base_path}}/guides/applications/register-standard-based-app/) in {{product_name}}.

## Enable CIBA grant in your app

To enable the CIBA grant type in your application:

1. On the {{ product_name }} Console, go to **Applications**.
2. Open your application from the list and go to the **Protocol** tab.
3. Under the **Allowed grant types** section, check the box for **CIBA**.

    Once enabled, you can configure the specific CIBA properties:

    - **Expiry Time:** The validity period of the authentication request (`auth_req_id`) in seconds. Default: `120`. Increase this value if users need more time to authenticate on the separate device (e.g., when using email or SMS notifications).
    - **Notification Channels:** The mechanisms by which the user will be notified to authenticate. The supported channels are:

        - **Email** - Sends an authentication notification to the user's registered email address. The organization must have an email notification channel configured, and the user must have a verified email address in their profile.

        - **SMS** - Sends an authentication notification to the user's registered mobile number. The organization must have an SMS notification channel configured, and the user must have a mobile number in their profile.

        - **External** - Delegates the notification delivery to the client application. Instead of {{product_name}} sending the notification directly, it returns an `auth_url` in the backchannel authentication response, and the client application is responsible for delivering the authentication link to the user.

    !!! note
        You can enable multiple notification channels for an application. However, when multiple channels are configured, only **Email** and **SMS** are triggered automatically. The **External** channel is triggered only if:

        - It is the only notification channel configured for the application, or
        - It is explicitly requested via the `notification_channel` parameter in the CIBA request.

        When an application has multiple notification channels enabled, you can request a specific channel by including the `notification_channel` parameter in the authentication request. Supported values are `email`, `sms`, and `external`.

4. Click **Update** to save the configurations.

## Try it out

Follow the steps given below to test the CIBA flow.

1. The client application sends a backchannel authentication request to the `/oauth2/ciba` endpoint:

    ```bash
    curl -v -k -X POST {{base_url_sample}}/oauth2/ciba \
    --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
    --header "Content-Type:application/x-www-form-urlencoded" \
    --data-urlencode "scope=openid profile" \
    --data-urlencode "login_hint=admin" \
    --data-urlencode "binding_message=Please authenticate to My App"
    ```

    !!! tip
        To trigger a specific notification channel, include the `notification_channel` parameter in the request. For example, add `--data-urlencode "notification_channel=email"` to send the notification via email. Supported values are `email`, `sms`, and `external`.

2. If successful, you will receive a response with an `auth_req_id`.

    - If the **Email** or **SMS** channel is used, the user receives a notification through the respective channel with an authentication link. The response will contain:

        ```json
        {
            "auth_req_id": "015a2f21-6844-4e9c-80dd-a608544dcd8f",
            "interval": 2,
            "expires_in": 120
        }
        ```

    - If the **External** channel is used, an `auth_url` is also returned in the response. The client application is responsible for delivering this URL to the user.

        ```json
        {
            "auth_req_id": "015a2f21-6844-4e9c-80dd-a608544dcd8f",
            "interval": 2,
            "auth_url": "{{base_url_sample}}/oauth2/ciba_authorize?authCodeKey=2d9999e0-debb-4f9d-860b-ec221a478e42",
            "expires_in": 120
        }
        ```

3. The user opens the authentication link (received via email, SMS, or delivered by the client application), logs in, and grants consent.

4. While or after the user authenticates, the client application polls the `/oauth2/token` endpoint using the `auth_req_id`:

    ```bash
    curl -v -k -X POST {{base_url_sample}}/oauth2/token \
    --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
    --header "Content-Type:application/x-www-form-urlencoded" \
    --data-urlencode "grant_type=urn:openid:params:grant-type:ciba" \
    --data-urlencode "auth_req_id=015a2f21-6844-4e9c-80dd-a608544dcd8f"
    ```

    Upon successful execution (and after user authentication is complete), you will receive the requested access and ID tokens.

Refer to the [CIBA grant reference]({{base_path}}/references/grant-types/#ciba-grant) for more information on how the complete flow works.
