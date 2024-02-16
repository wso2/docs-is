{% set product_name = "WSO2 Identity Server" %}

{% set admin_login_note = "" %}

{% set configure_email_sender = "- You need to [configure the email sending module](../../../../deploy/configure/email-sending-module) for the WSO2 Identity Server to send the email OTP to the users." %}

{% include "../../../../../../includes/guides/authentication/passwordless-login/add-passwordless-login-with-email-otp.md" %}