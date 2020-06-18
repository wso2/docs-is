# Configure Session Time Out and Remember Me

## Session time out

This is the duration in minutes for which an Single Sign-On (SSO) session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. The default value is **15 minutes**.

-----

## Remember me

This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that you have selected the Remember Me option in the WSO2 Identity Server login screen. The default value is **2 weeks**.


Follow the steps given below to change the time for which the SSO session can be idle before the user gets logged out. 


{! fragments/session-timeout.md !}

Follow the steps given below to change the duration for which the user's SSO session will be remembered. 

{! fragments/remember-me.md !}

---

## Configure timeout values globally 
The global configuration can be added to the
`<IS_HOME>/repository/conf/deployment.toml` file as shown below. The `idle_session_timeout` property that defines the session time out period. The `remember_me_session_timeout` property defines the period of time for which the WSO2 Identity Server will remember the user's SSO session.

```
[session.timeout]
idle_session_timeout= "15m"
remember_me_session_timeout= "14d"
```

Restart the server to save the changes. Once you add these global configurations, each tenant that is created after adding the configuration will inherit the same configurations.

-----

!!! info "Related Topics"
    - [Guide: Enable Single Sign-On for a SAML Application](../sso-for-saml)
    - [Guide: Enable Single Sign-On for an OpenID Connect Application](../sso-for-oidc)

