# Concurrent-session-based adaptive authentication

This page guides you through setting up active user session limiting for a sample application based on a particular criterion.

----

## Scenario

Consider a scenario where you want a user with an administrator role that cannot have more than three active concurrent session at a time. If there are three active user sessions, you can either terminate a session or deny authentication for a user.

----

## Prerequisites

- You need to [set up the sample]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) application.

## Configure concurrent-session-based authentication

To configure concurrent-session-based authentication:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

4. You will be redirected to **Advanced Configuration**, expand **Script Based Conditional Authentication**.

5. In the **Templates** section, click on the **`+`** corresponding to **Concurrent-Session-Management** template.

    ![Concurrent-Session-Management template]({{base_path}}/assets/img/samples/limit-active-sessions-template.png)

6. Click **Ok** to add the authentication script. Update the value of the `MaxSessionCount` variable to `3`.

    !!! note
        - The authentication script defines a conditional step that executes the session handling prompt only if the user belongs to an `admin` or `manager` role. Here you can specify the value of the `MaxSessionCount` variable to indicate the maximum number of sessions allowed. The default value is 1. For this demo, we use `3` as the `MaxSessionCount` value.

    ![Limit active sessions]({{base_path}}/assets/img/samples/limit-active-sessions.png)

    !!! note
        You can configure the `MaxSessionCount` variable via the `deployment.toml` file in the  `<IS_HOME>/repository/conf/` directory as well. Priority will be given to the configuration in the adaptive authentication script. To configure the `MaxSessionCount` variable through the `deployment.toml` file, append the following configuration with the intended value for `MaxSessionCount`.

        ```
        authentication.authenticator.session_handler.parameters.max_session_count = “3”
        ```

6. Click **Add Authentication Step**.

7. Select **Active Sessions Limit** from the dropdown under **Local Authenticators** and click **Add Authenticator**.

8. Click **Update** to save your configurations.

----

## Try it out

1. Access the sample PickUp application using the following URL: `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`

2. Click **Login** and enter admin/admin credentials.

3. Log in to the same application as admin with three different web browsers, e.g., Firefox, Safari, and Opera.

    ![View active sessions adaptive auth]({{base_path}}/assets/img/samples/view-active-sessions-adaptive-auth.png)

4. You can terminate one or more active sessions or deny the login.

    !!! tip
        -   If you select and terminate the active sessions exceeding the maximum limit, you will be navigated to the application home page. Otherwise, you will be re-prompted until the minimum required number of sessions are terminated. 
        -   You can use the **Refresh Sessions** button to re-check active user sessions.

5. If you deny the login, an authentication error screen appears.

    ![Authentication error screen]({{base_path}}/assets/img/samples/authentication-error.png)
