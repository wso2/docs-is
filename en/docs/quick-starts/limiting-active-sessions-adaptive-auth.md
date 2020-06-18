# Configure Limiting Active User Sessions 

This page guides you through setting up active user session limiting for a sample application based on a particular criteria, using sample authenticators.

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/configure-adaptive-auth"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

Consider a scenario where you want a user who has an administrator role that cannot have more than one active concurrent session at a time. If there are one or more active user sessions, you can either terminate a session or deny authentication for a user.

----

{!fragments/adaptive-auth-samples.md!}

----

## Configure concurrent-session-based authentication

1.  Click **Service Providers > List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Expand the **Local and Outbound Configuration** section and click **Advanced Authentication**.

4.  Expand **Script Based Conditional Authentication**.

5.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **Concurrent-Session-Management**. 

    ![limit-active-sessions-template](../../assets/img/samples/limit-active-sessions-template.png)

7.  Click **Ok**. The authentication script and authentication steps
    are configured. 
    
    The authentication script defines a conditional step that executes session handling prompt only if the user belongs to an 'admin' or 'manager' role.  Here you can specify the value of `MaxSessionCount` variable to indicate the maximum number of sessions allowed. The default value is 1. For the purpose of this demo, change the value to 3. 

    ![limit-active-sessions](../../assets/img/samples/limit-active-sessions.png)
    
    !!! note
        You can configure the `MaxSessionCount` variable via the `deployment.toml` file in the  `<IS_HOME>/repository/conf/` directory as well. Priority will be given to the configuration in the adaptive authentication script. To configure the `MaxSessionCount` variable through the `deployment.toml` file, append the following configuration with the intended value for `MaxSessionCount`. 

        ```
        authentication.authenticator.session_handler.parameters.max_session_count = “3”
        ```

6.  Click **Add Authentication Step**.

    ![add-authentication-step](../../assets/img/samples/add-authentication-step.png)

7.  Select **active-sessions-limit-handler** from the dropdown under **Local Authenticators** and click **Add Authenticator**. 

    ![session-limit-handler-authenticator](../../assets/img/samples/session-limit-handler-authenticator.png)

8.  Click **Update**.

----

## Try it out

1.  Access the sample PickUp application using the following URL: 
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>

2.  Click **Login** and enter admin/admin credentials.
    ![pickup-sign-in.png](../../assets/img/samples/pickup-sign-in.png)

3.  Repeat the previous two steps in three different web browsers, e.g. Firefox, Safari, and Opera.
    ![view-active-sessions-adaptive-auth](../../assets/img/samples/view-active-sessions-adaptive-auth.png)

4.  Now you can either terminate one or more active sessions or deny the login. 

    !!! tip 
        -   If you select and terminate the active sessions exceeding the maximum limit, you will be navigated to the application home page. Otherwise you will be re-prompted until the minimum required number of sessions are terminated. 
        -   You can use the **Refresh Sessions** button to re-check active user sessions.

5.  If you deny the login, the Authentication Error screen appears.

    ![authentication-error](../../assets/img/samples/authentication-error.png)
