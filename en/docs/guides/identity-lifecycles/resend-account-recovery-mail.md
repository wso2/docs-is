# Resending Account Recovery Confirmation Emails

This section explains how to resend the account recovery confirmation mail in the following account recovery scenarios:

- User creation through ask password option
- Notification-based password recovery
- Admin-initiated password reset through an email link
- Admin-initiated password reset via OTP
- Self-registration

Follow the steps below to configure WSO2 Identity Server to resend account recovery confirmation emails:

!!! tip
    Sign in to the WSO2 Identity Server Management Console.

1. On the Main menu, click **Manage > Email Template > Add**.

<!--![manage-email-template](../assets/img/using-wso2-identity-server/manage-email-template.png) -->

2. Click **Add Email Template**.

<!--![email-template-management](../assets/img/using-wso2-identity-server/email-template-management.png) -->

3. To create an email template for account registration through password request:

    1. Enter resendAskPassword  as the Template Type Display Name and click Add.

        <!--![template-type](../assets/img/using-wso2-identity-server/template-type.png) -->

        A success message about the email template creation and the Add a New Email Template screen appears.  

        <!--![template-creation](../assets/img/using-wso2-identity-server/template-creation.png) -->

    2. Enter the following values:

        1. **Email Template Type**: resendAskPassword
        2. **Email Template Locale**: English (United States)
        3. **Email Content Type**: text/html
        4. **Email Template Subject**: WSO2 - Resend Create Password for New Account
        5. **Email Body**:  

            ??? note "Click to View"
                ```html
                <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
                <tr>
                <td style="padding: 30px 30px 20px 30px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
                    <tr>
                        <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                            <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                            <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                                Resend Password Reset
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 0px 50px 20px 50px;" valign="top">
                            <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                                Hi {{user.claim.givenname}},
                            </p>
                            <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                                We received a request to reset the password for the <b>{{user-name}}</b> account that is associated with this email address.<br>
                                If you made this request, please click the button below to securely reset your password.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0px 50px 0px 50px; text-align: left;">
                            <table align="left" cellpadding="0" cellspacing="0" border="0" style="border-radius: 4px; background-color: #ff5000;">
                                <tr>
                                    <td style="border-radius: 6px;  padding: 14px 0px;">
                                        <a href="{{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}&amp;callback={{callback}}"
                                        target="_blank" style="width: 230px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif;  font-size: 18px; line-height: 21px; font-weight: 600; color: #fff; text-decoration: none; background-color: #ff5000; text-align: center; display: inline-block; cursor: pointer;">Reset Password</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 40px 50px 0px 50px;" valign="top">
                            <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                                If clicking the button doesn't seem to work, you can copy and paste the following link into your browser. <br/>
                                <a style="word-break: break-all; color: #ff5000;font-size: 14px;" target="_blank"
                                href="{{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}&amp;callback={{callback}}">
                                    {{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}&amp;callback={{callback}}</a>
                            </p>
                            <br>
                            <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                                If you did not request to have your {{user-name}} password reset, disregard this email and no changes to your account will be made.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                            <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                                Thanks,<br/>WSO2 Identity Server Team
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                            <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                                &copy; 2018
                                <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                                <br>
                                787 Castro Street, Mountain View, CA 94041.
                            </p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
                </table>```
        6. **Email Footer** :  --

4. To create an email template for **notification-based password recovery**, enter the following values:

    1. **Email Template Type**: resendPasswordReset
    2. **Email Template Locale**: English (United States)
    3. **Email Content Type**: text/html
    4. **Email Template Subject**: WSO2 - Resend Password Reset
    5. **Email Body**:  

        ??? note "Click to View"
            ```html
            <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
            <tr>
            <td style="padding: 30px 30px 20px 30px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
                <tr>
                    <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                        <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                        <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                            Resend Password Reset
                        </h1>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 0px 50px 20px 50px;" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            Hi {{user.claim.givenname}},
                        </p>
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            We received a request to reset the password for the <b>{{user-name}}</b> account that is associated with this email address.<br>
                            If you made this request, please click the button below to securely reset your password.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0px 50px 0px 50px; text-align: left;">
                        <table align="left" cellpadding="0" cellspacing="0" border="0" style="border-radius: 4px; background-color: #ff5000;">
                            <tr>
                                <td style="border-radius: 6px;  padding: 14px 0px;">
                                    <a href="{{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}&amp;callback={{callback}}"
                                    target="_blank" style="width: 230px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif;  font-size: 18px; line-height: 21px; font-weight: 600; color: #fff; text-decoration: none; background-color: #ff5000; text-align: center; display: inline-block; cursor: pointer;">Reset Password</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 40px 50px 0px 50px;" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                            If clicking the button doesn't seem to work, you can copy and paste the following link into your browser. <br/>
                            <a style="word-break: break-all; color: #ff5000;font-size: 14px;" target="_blank"
                            href="{{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}&amp;callback={{callback}}">
                                {{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}&amp;callback={{callback}}</a>
                        </p>
                        <br>
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            If you did not request to have your {{user-name}} password reset, disregard this email and no changes to your account will be made.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                            Thanks,<br/>WSO2 Identity Server Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                        <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                            &copy; 2018
                            <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                            <br>
                            787 Castro Street, Mountain View, CA 94041.
                        </p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
            </table>```

    6. **Email Footer** :  --

5. To create an email template for an **admin-initiated password reset through an email link**, enter the following values:

    1. **Email Template Type**: resendAdminForcedPasswordReset
    2. **Email Template Locale**: English (United States)
    3. **Email Content Type**: text/html
    4. **Email Template Subject**: WSO2 - Resend Admin Forced Password Reset
    5. **Email Body**:  

        ??? note "Click to View"
            ```html
            <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
            <tr>
            <td style="padding: 30px 30px 20px 30px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
                <tr>
                    <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                        <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                        <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                            Resend Admin Forced Password Reset
                        </h1>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 0px 50px 20px 50px;" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            Hi {{user.claim.givenname}},
                        </p>
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            Please click the button below to reset your password for the account <b>{{user-name}}</b>.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0px 50px 0px 50px; text-align: left;">
                        <table align="left" cellpadding="0" cellspacing="0" border="0" style="border-radius: 4px; background-color: #ff5000;">
                            <tr>
                                <td style="border-radius: 6px;  padding: 14px 0px;">
                                    <a href="{{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}"
                                    target="_blank" style="width: 230px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif;  font-size: 18px; line-height: 21px; font-weight: 600; color: #fff; text-decoration: none; background-color: #ff5000; text-align: center; display: inline-block;cursor: pointer;">Reset Password</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 40px 50px 0px 50px;" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                            If clicking the button doesn't seem to work, you can copy and paste the following link into your browser. <br/>
                            <a style="word-break: break-all; color: #ff5000; font-size: 14px" target="_blank"
                            href="{{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}">
                                {{carbon.product-url}}/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}
                            </a>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 30px 50px 50px 50px;" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                            Thanks,<br/>WSO2 Identity Server Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                        <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                            &copy; 2018
                            <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                            <br>
                            787 Castro Street, Mountain View, CA 94041.
                        </p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
            </table>```
    6. **Email Footer** :  --

6. To create an email template for an **admin-initiated password reset through an OTP**, enter the following values:

    1. **Email Template Type**: resendAdminForcedPasswordResetWithOTP
    2. **Email Template Locale**: English (United States)
    3. **Email Content Type**: text/html
    4. **Email Template Subject**: WSO2 - Resend Admin Forced Password Reset
    5. **Email Body**:  

        ??? note "Click to View"
            ```html
            <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
            <tr>
            <td style="padding: 30px 30px 20px 30px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
                <tr>
                    <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                        <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                        <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                            Resend Admin Forced Password Reset
                        </h1>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 0px 50px;" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            Hi {{user.claim.givenname}},
                        </p>
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                            We received a request to reset the password for the <b>{{user-name}}</b> account that is associated with this email address.<br>
                            Please use below OTP as the password at next login and then reset your password.<br>
                            OTP : <b>{{confirmation-code}}</b>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                        <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                            Thanks,<br/>WSO2 Identity Server Team
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                        <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                            &copy; 2018
                            <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                            <br>
                            787 Castro Street, Mountain View, CA 94041.
                        </p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>
            </table>```
    6. **Email Footer** :  --

!!! tip
    For information on the REST API for resending confirmation code, see [Resend-Code Using REST API](https://docs.wso2.com/display/IS590/apidocs/self-registration/#!/operations#ResendConfirmation#resendCodePost).
