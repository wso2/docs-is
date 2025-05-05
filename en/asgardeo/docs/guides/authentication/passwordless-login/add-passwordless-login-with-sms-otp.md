{% set admin_login_note = 

"    !!! note
        You cannot use an administrator account to log in to an application." 
%}

{% set configure_email_sender = "" %}
{% set notification_tab_name = "Notification Channels" %}

{% include "../../../../../includes/guides/authentication/passwordless-login/add-passwordless-login-with-sms-otp.md" %}
