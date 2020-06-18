# Configuring Multi-Factor Authentication

This page guides you through configuring [multi-factor authentication](TODO:insert-link-to-concept) for an OAuth/OpenID Connect web application. This is demonstrated using a **sample application** called Pickup Dispatch and uses Nexmo as the sample SMS authenticator. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/mfa/2fa-sms-otp"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

A taxi company called "Pickup" uses an application called "Pickup Dispatch", which is used by their drivers to accept hires. Lately, Pickup has noticed that users who are not drivers employed at Pickup have been logging in via driver accounts.

To ensure that only their own drivers can log into the application, Pickup decided to enhance security by configuring multi-factor authentication. After providing login credentials, the drivers will recieve a one time password (OTP) to their mobile number. They will only be allowed to access the application once they have entered the OTP.

----

(TODO: dev-portal-fragment)
{!fragments/connect-sms-provider.md!}

----

(TODO: dev-portal-fragment)
{!fragments/register-an-identity-provider.md!}

----

(TODO: dev-portal-content)

## Configure SMSOTP

1. Expand the **SMS OTP Configuration** tab under **Federated Authenticators**.

2. Select both check-boxes to **Enable SMSOTP Authenticator** and to make it the **Default**.

3. Enter the **SMS URL**. Do the following to construct the SMS URL for NEXMO.
    1.  Go to <https://dashboard.nexmo.com/sign-up> and sign up.

    2.  Once you have registered successfully, the API **key** and **secret**
        are displayed. Copy and save them as you need them for the next
        step.  
        ![nexmo-config](../assets/img/guides/nexmo-config.png)

    3.  The Nexmo API requires the parameters to be encoded in the URL,
        so the SMS URL would be as follows.

        ``` tab="SMS URL format"
        https://rest.nexmo.com/sms/json?api_key=&api_secret=&from=NEXMO&to=\$ctx.num&text=\$ctx.msg
        ```

        ``` tab="SMS URL example"
        https://rest.nexmo.com/sms/json?api_key=061703d4&api_secret=wenrOOz8JWSmrnxs&from=NEXMO&to=$ctx.num&text=$ctx.msg
        ```

4. Enter `POST` as the **HTTP Method**. 

5. Click **Register**.

----

## Set up Pickup Dispatch sample

(TODO: dev-portal-fragment)
{!fragments/pickup-dispatch-saml.md!}

----

(TODO: dev-portal-content)
## Add authentication steps

1. Click **Service Providers** > **List**.

2.  Click **Edit** to edit the "pickup dispatch" service provider you created for the sample application.

3. Expand **Claim configuration**.
 
4. Select `http://wso2.org/claims/mobile` as the **Subject Claim URI**.

5. Expand **Local and Outbound Authentication Configuration**.

6. Click the **Advanced Configuration** radio button. 

7. Add the following authentication steps. 
    - **Step 1**
        1. Click **Add Authentication Step**.

        2. Select `basic` under **Local Authenticators** and click **Add Authenticator** to add the basic authentication as the first step.

            Adding basic authentication as a first step ensures that the first step of authentication will be done using the user's credentials that are configured with the WSO2 Identity Server.

    - **Step 2**
        1. Click **Add Authentication Step**.

        2. Select `smsotp` under **Federated Authenticators** and click **Add Authenticator** to add SMSOTP authentication as the second step.

            Adding SMSOTP as a second step adds another layer of authentication and security.
    
        <img name='sms-otp-authentication-steps' src='../../../assets/img/guides/sms-otp-authentication-steps.png' class='img-zoomable'/>

8. Click **Update** to save the changes.

----

(TODO: dev-portal-content)

## Add a user 

1. Add a new user called "Alex" with login permission. For instructions, see [Adding Users and Roles](insertlink).

2. Click **Users and Roles > List** and edit Alex's **User Profile**.

3. Update the mobile number which you used to register with NEXMO in the following format.

    ```tab="format"
    <countrycode><mobilenumber>
    ```

    ```tab="example"
    94778888888
    ```

----

## Try it out

1. Navigate to <http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com> on your browser and click **Login**.

    ![dispatch-login](../assets/img/samples/dispatch-login.png)

2. You will be redirected to the login page of WSO2 Identity Server. Log in using Alex's credentials. 

3. Note that you are now prompted to enter a code. The SMSOTP code will be sent to your mobile number. Enter the code and click **Authenticate**. 

    ![authenticate-with-smsotp](../assets/img/samples/authenticating-with-smsotp.png)

You are redirected to the Pickup Dispatch home page. You have succesfully configured and logged in using two factor authentication.
