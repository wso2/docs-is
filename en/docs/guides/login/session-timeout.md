# Session Timeout 

Follow the steps given below to change the time for which the SSO session can be idle before the user gets logged out. 

{! fragments/session-timeout.md !}

!!! Tip "Configure timeout values globally" 
    The global configuration can be added in the
    `<IS_HOME>/repository/conf/deployment.toml` file as shown below.
    ```
        [session.timeout]
        idle_session_timeout= "15m"
        remember_me_session_timeout= "14d"
    ```

    Restart the server to save the changes. Once you add these global configurations, each tenant that is created after adding the configuration will inherit the same configurations.

