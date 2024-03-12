{% set product_name = "Asgardeo" %}

{% set admin_login_note = 

"    !!! note
        You cannot use an administrator account to log in to an application." 
%}

{% set configure_email_sender = "" %}

{% include "../../../../../includes/guides/authentication/passwordless-login/add-passwordless-login-with-email-otp.md" %}
