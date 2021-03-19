## Configure WS-Federation

1.  Expand the **Inbound Authentication Configuration** followed by the
    **WS-Federation (Passive) Configuration** section and provide the
    following values. 

    -   **Passive STS Realm** - This should be a unique identifier for
        the web app. Provide the same realm name given to the web app
        you are configuring WS-Federation for.

    -   **Passive STS WReply URL** - Provide the URL of the web app you
        are configuring WS-Federation for.  This endpoint URL will
        handle the token response.
        
        ![ws-federation-passive.png](../../../assets/img/guides/ws-federation-passive.png)

        !!! tip
        
            If you want to configure an expiration time for the security
            token, you need to add the following configuration in the
            `<IS_HOME>/repository/conf/deployment.toml`
            file and restart the server.

            ``` java
            [sts]
            time_to_live = "8000"
            ```

            Here, the expiration time should be specified in milliseconds.

2.  Expand the **Claim Configuration** section and map the relevant claims. 
    See [Request Attributes for the Application](../../../guides/login/request-attributes/) for more information.
    
3.  Click **Update** to save changes.

!!! tip
    Currently the signing algorithm used for passive STS by default is `rsa-sha1` and the digest algorithm used is `sha1`. 
    To change the default algorithms, add the following configuration in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory. 
    The example given below sets the signing algorithm to `rsa-sha256` and the digest algorithm to `sha256`.

    ```toml
    [sts]
    signature_algorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"
    digest_algorithm = "http://www.w3.org/2001/04/xmlenc#sha256"
    ```
