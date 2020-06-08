# Configure Session Timeout and Remember Me

## Session time out

This is the duration in minutes for which an SSO session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. The default value is **15 minutes**.

## Remember me

This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that you have selected the Remember Me option in the WSO2 Identity Server login screen. The default value is **2 weeks**.


Follow the steps given below to change the time for which the SSO session can be idle before the user gets logged out. 


{! fragments/session-timeout.md !}

---

Follow the steps given below to change the duration for which the user's SSO session will be remembered. 

{! fragments/remember-me.md !}

---

!!! Tip "Configure timeout values globally" 
    The global configuration can be added in the
    `<IS_HOME>/repository/conf/deployment.toml` file as shown below.
    ```
    [session.timeout]
    idle_session_timeout= "15m"
    remember_me_session_timeout= "14d"
    ```

    Restart the server to save the changes. Once you add these global configurations, each tenant that is created after adding the configuration will inherit the same configurations.


