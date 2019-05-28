# Configuring Session Timeout

In previous versions of WSO2 Identity Server, the default time period
for a SSO session is 10 hours and this default SSO Session Expire time
value cannot be changed according to the user's needs. However, from
WSO2 IS 5.1.0 onwards, a global configuration is specified in the
`         identity.xml        ` file (as explained below) and the SSO
session timeout can be configured tenant wise using the management
console.

The global configuration can be found in the
`         <IS_HOME>/repository/conf/identity/identity.xml        ` file
under the `         <TimeConfig>        ` element.  
These property values are in minutes.

``` html/xml
  <TimeConfig>
       <SessionIdleTimeout>15</SessionIdleTimeout>
       <RememberMeTimeout>20160</RememberMeTimeout>
  </TimeConfig>
```

To configure the **Session Timeout** and **Remember Me** period tenant
wise, follow the steps below:

1.  Start the IS server and login to the management console.
2.  Click **Resident** under **Identity Providers** on the **Main** tab.
3.  Fill in the fields as seen below to configure the session timeout
    and RememberMe period.  
    ![](attachments/103329891/103329892.png){width="711"}
4.  Restart the server to save the changes

Now the SSO session is timed out according to the newly configured value
and users need to be re-authenticated once the session times out. If a
timeout is not configured, the SSO session simply uses the 15 minutes
default time out value.

**Related Topics**

-   After configuring the session timeout **,** see the [Configuring
    Inbound Authentication for a Service
    Provider](_Configuring_Inbound_Authentication_for_a_Service_Provider_)
    page to setup Single Sign On with WSO2 Identity Server.
-   See [Single
    Sign-On](https://docs.wso2.com/display/IS510/Single+Sign-On) for
    more information.
