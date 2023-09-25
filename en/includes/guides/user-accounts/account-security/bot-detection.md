# Configure bot detection

{{ product_name }} uses [reCAPTCHA](https://developers.google.com/recaptcha/) to detect bots that attempt unauthorized login or other types of internet abuse. This is a free service provided by Google that verifies whether a user is a human or a robot. It comes in the form of a widget.

When bot detection is enabled, {{ product_name }} enforces reCAPTCHA validation in the following scenarios:
- User login
- User password recovery
- User self-registration

To configure reCAPTCHA:

1. On the {{ product_name }} Console, click **Account Security**.

   The **Bot Detention** section indicates whether or not it is already enabled.

2. Click **Configure** to open the **Bot Detection** security page.
3. Turn the toggle on or off to enable or disable reCAPTCHA for your organization.
   ![Enable bot detection](../../../assets/img/guides/organization/account-security/bot-detection/enable-bot-detection.png)