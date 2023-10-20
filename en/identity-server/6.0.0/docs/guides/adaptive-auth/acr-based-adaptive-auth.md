# Configure ACR-based adaptive authentication

This page guides you through configuring Authentication-Context-Reference-based (ACR-based) adaptive authentication for a sample web application.

## Scenario

Consider a scenario where you want users to be authenticated into an application based on the authentication context value used when logging in.

----

{!./includes/deploying-sample-apps.md!}


{!./includes/deploy-playground.md!}


{!./includes/deploy-playground-with-check-session.md!}

---

## Register a service provider

1. On WSO2 Identity Server Management Console, go to **Main** > **Identity** > **Service Providers** and click **Add**.

2. Enter `playground2` as the **Service Provider Name** text box, and click **Register**.

3. Expand the **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

4. Fill in the form that appears. By default, all **Allowed Grant Types** are selected; you can disable the grant types that are not required.

    !!! note
        The **custom** grant type will only appear on the UI if you have configured the JWT grant type. The value specified as the `name` of the `oauth.custom_grant_type` in the `deployment.toml` file when creating the custom grant type is the value that will appear on the UI. For more information on writing a custom grant type, see [Write a Custom OAuth 2.0 Grant Type]({{base_path}}/references/extend/oauth2/write-a-custom-oauth-2.0-grant-type).

5. Enter the **Callback Url** as `http://wso2is.local:8080/playground2/oauth2client`.

    !!! tip
        For more information on other advanced configurations refer, [Advanced OpenID Connect]({{base_path}}/guides/login/oidc-parameters-in-auth-request/).

7. Click **Add**. Note that `client key` and `client secret` are generated.

8. Click **Update**.

----

## Configure acr-based authentication

To configure ACR-based authentication for an application:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to the **ACR-Based** template.

    ![ACR-based template]({{base_path}}/assets/img/samples/acr-based-template.png)

6. Click **Ok** to add the authentication script. The authentication script and authentication steps will be configured.

    !!! info
        The authentication script prompts authentication steps based on the acr values as follows.

        - 'acr1' - step 1 (basic authentication)
        - 'acr2' - step 1 and 2 (basic authentication and TOTP)
        - 'acr3' - step 1 and 3 (basic authentication and Security Key/Biometrics (FIDO))

7. Click **Update** to save your configurations.

----

## Try it out

1. Access the following sample Playground application URL: `http://wso2is.local:8080/playground2/index.jsp`

2. Click **Import Photos**.  

3. Enter the `client ID` of the OAuth service provider application you registered above and enter 'acr2' as the **Authentication Context Class** value.  

    Leave the rest of the configurations as they are.  

    ![Authentication context class]({{base_path}}/assets/img/samples/authentication-context-class.png)

4. You are now prompted for basic authentication followed by TOTP authentication. Step 1 and Step 2 are prompted as the ACR value entered was `acr2`.

    !!! tip
        You can re-try this flow using the ACR value 'acr3'. Note that you
        are then prompted for steps 1 and 3 (basic authentication and Security Key/Biometrics (FIDO) authentication).

    ![TOTP authenticator]({{base_path}}/assets/img/samples/totp-code-verification.png)

6. Enter the TOTP code and click **Continue**.
    ![ACR-based login successful]({{base_path}}/assets/img/samples/login-successful-acr-based.png)

7. Logout from the application and try this flow with different ACR values.
