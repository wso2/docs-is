# Configuring Session Timeout

In IS 5.9.0, you can configure the `deployment.toml` file (as explained below) to set the global configuration for the 
SSO session timeout value. The session timeout value can also be configured tenant wise using the management console.

The global configuration should be added in the `<IS_HOME>/repository/conf/deployment.toml` file as shown below.

```
  [session.timeout]
  idle_session_timeout= "15m"
  remember_me_session_timeout= "14d"
```

To configure the **Session Timeout** and **Remember Me** period tenant
wise, follow the steps below:

1.  Start the IS server and login to the management console.
2.  Click **Resident** under **Identity Providers** on the **Main** tab.
3.  Fill in the fields as seen below to configure the session timeout
    and RememberMe period.  
    ![session-time-out](../assets/img/using-wso2-identity-server/session-time-out.png) 
4.  Restart the server to save the changes

Now the SSO session is timed out according to the newly configured value
and users need to be re-authenticated once the session times out. If a
timeout is not configured, the SSO session simply uses the 15 minutes
default time out value.

!!! info "Related Topics"

    -   After configuring the session timeout **,** see the [Configuring
        Inbound Authentication for a Service
        Provider](../../learn/configuring-inbound-authentication-for-a-service-provider)
        page to setup Single Sign On with WSO2 Identity Server.
    -   See [Single
        Sign-On](../../learn/single-sign-on) for
        more information.
