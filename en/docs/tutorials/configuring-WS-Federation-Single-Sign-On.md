# Configuring WS-Federation Single Sign-On

To configure WS-Federation SSO:

1.  Expand the **Inbound Authentication Configuration** followed by the
    **WS-Federation (Passive) Configuration** section and provide the
    following values.

    -   **Passive STS Realm** - This should be an unique identifier for
        the web app. Provide the same realm name given to the web app
        you are configuring WS-Federation for.

    -   **Passive STS WReply URL** - Provide the URL of the web app you
        are configuring WS-Federation for.  This endpoint URL will
        handle the token response.

        !!! tip
        
                If you want to configure an expiration time for the security
                token, you need to add the following configuration in the
                `             <IS_HOME>/repository/conf/carbon.xml            `
                file, under the `             <Server>            ` element:
        
                ``` java
                        <STSTimeToLive>1800000</STSTimeToLive>
        ```

        Here, the expiration time should be specified in milliseconds.


    ![](attachments/103330844/112392543.png){width="750"}

2.  Expand the **Claim Configuration** section and map the relevant
    claims. See [Configuring Claims for a Service
    Provider](_Configuring_Claims_for_a_Service_Provider_) for more
    information.
3.  Click **Update** to save changes.

**Related Topics**

-   To test out WSO2 Identity Server's passive security token service
    using a sample, see [Testing Identity Server's Passive
    STS](_Testing_Passive_STS_) .
