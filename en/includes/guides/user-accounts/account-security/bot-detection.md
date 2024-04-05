# Configure bot detection

{{ product_name }} uses [reCAPTCHA](https://developers.google.com/recaptcha/){:target="_blank"} to detect bots that attempt unauthorized login or other types of internet abuse. This is a free service provided by Google that verifies whether a user is a human or a robot. It comes in the form of a widget.

When bot detection is enabled, {{ product_name }} enforces reCAPTCHA validation in the following scenarios:

- User login
- User password recovery
- User self-registration

To configure reCAPTCHA:

1. On the {{ product_name }} Console, go to **Organizational Settings** > **Account Security**.

    The **Bot Detention** section indicates whether or not it is already enabled.

2. Click **Configure** to open the **Bot Detection** security page.

3. Turn the toggle on or off to enable or disable reCAPTCHA for your organization.

    ![Enable bot detection]({{base_path}}/assets/img/guides/organization/account-security/bot-detection/enable-bot-detection.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}