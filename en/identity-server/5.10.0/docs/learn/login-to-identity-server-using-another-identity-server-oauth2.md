# Login to Identity Server using another Identity Server - OAuth2

This tutorial guides you through setting up two instances of WSO2
Identity Server (WSO2 IS) and using one Identity Server to authenticate the user
and login to the other one.

1.  Start two WSO2 IS instances. Start the second instance with its hostname as `wso2is`. 

2.  Add a relevant certificate to the primary IS client-truststore, and a port offset of 1.  
    
    For more information on how to configure this instance, see [Default Ports of WSO2 Products](../../references/default-ports-of-wso2-products#changing-the-offset-for-default-ports) and [Changing the 
    hostname](../../setup/changing-the-hostname).

3.  Configure an OAuth/OIDC service provider in the second WSO2 IS instance. 
    For more infomation on how to do this, see [Configuring
    OAuth2-OpenID Connect
    Single-Sign-On](../../learn/configuring-oauth2-openid-connect-single-sign-on)
    .

    Callback Url: <https://localhost:9443/commonauth>

    ![configure-oauth-oidc-sp](../assets/img/using-wso2-identity-server/configure-oauth-oidc-sp.png)

4.  Create an identity provider in the first Identity Server instance.  
    For more information on how to do this, see [Configuring OAuth2-OpenID Connect](../../learn/configuring-oauth2-openid-connect). 

    Set the values as follows. 

    -   Enable OAuth2/OpenIDConnect: selected

    -   Default: selected

    -   Client Id: (client id of the service provider registered in
        the second identity server instance)

    -   Client Secret: (client secret of the service provider registered
        in the second identity server instance)

    -   Authorization Endpoint URL:
        <https://wso2is:9444/oauth2/authorize>

    -   Token Endpoint URL: <https://wso2is:9444/oauth2/token>

    -   Callback Url: <https://localhost:9443/commonauth>
    
    -   Logout Endpoint URL: <https://wso2is:9444/oidc/logout>

    ![create-an-idp](../assets/img/using-wso2-identity-server/create-an-idp.png)   

5.  Setup the [playground sample](../../learn/deploying-the-sample-app/#deploying-the-playground2-webapp) in the
    first Identity Server instance.
6.  Edit the service provider in the first Identity Server instance and select
    the **Federated Authentication** as the **Authentication type** in the **Local and
    Outbound Authentication Configuration**. 
    
7.  Now select the created identity provider from the dropdown menu in **Federated
    Authentication**.      

    ![select-federation-authentication](../assets/img/using-wso2-identity-server/select-federation-authentication.png)

8.  Try the authorization code grant as described
    [here](../../learn/try-authorization-code-grant). You will be redirected to
    the second Identity Server instance instead of the first Identity Server instance for
    authentication. 
    ![second-idp](../assets/img/using-wso2-identity-server/second-idp.png) 
