# Bot detection

This guide explains how you can enable bot detection for your applications to mitigate abuse from bots and other automated attacks. {{product_name}} supports [reCAPTCHA](https://developers.google.com/recaptcha/){:target="_blank"}, a service provided by Google which can protect your applications from spam or other forms of internet abuse by distinguishing human requests from automated ones.

{% if product_name == "Asgardeo" %}
{% else %}
{% include "../../../guides/fragments/bot-detection.md" %}
{% endif %}

## Enable reCAPTCHA from the Console

To enable bot detection, proceed with the following:

1. On the {{product_name}} Console, go to **Login & Registration** > **Login Security** > **Bot Detection**.
2. Toggle the switch on to activate reCAPTCHA for your organization.

![Bot Detection Configuration]({{base_path}}/assets/img/guides/account-configurations/bot-detection.png){: width="900" style="display: block; margin: 0;"}

!!! tip
    Bot detection enables reCAPTCHA for the following flows:
    <ul>
    <li>Single sign-on (SSO)</li>
    <li>Self-registration</li>
    <li>Password recovery</li>
    <li>Account recovery</li>