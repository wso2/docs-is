# Try Authorization Code Grant

The Authorization Code Grant is one of the grant types in the OAuth 2.0
specification. For more information about this grant type, see
[Authorization Code Grant](_Authorization_Code_Grant_) .

!!! note
    
    Before you begin, you must first [set up the sample
    webapp.](https://docs.wso2.com/display/IS530/Setting+Up+the+Sample+Webapp)
    

This section demonstrates the Authorization Code Grant with PKCE and
without PKCE.

The Proof Key for Code Exchange (PKCE) is a specification supported by
WSO2 Identity Server to mitigate code interception attacks. See
[Mitigating Authorization Code Interception
Attacks](https://docs.wso2.com/display/IS530/Mitigating+Authorization+Code+Interception+Attacks)
to configure PKCE for an OAuth application.

-   [Running the application (without
    PKCE)](#TryAuthorizationCodeGrant-Runningtheapplication(withoutPKCE))
-   [Running the application (with
    PKCE)](#TryAuthorizationCodeGrant-Runningtheapplication(withPKCE))

#### **Running the application (without PKCE)**

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.

2.  Enter the following details and click **Authorize**. For
    information on how to obtain these authorization details, see
    [Configuring OAuth2-OpenID
    Connect](_Configuring_OAuth2-OpenID_Connect_) .

    Authorization Grant Type: Authorization Code  
    Client ID: (the client id received at the application
    registration)  
    Callback URL: <http://wso2is.local:8080/playground2/oauth2client>  
    Authorize Endpoint: <https://localhost:9443/oauth2/authorize>

      
    ![](attachments/103329947/103329953.png){width="680" height="378"}

3.  Log in with the user credentials.  
    ![](attachments/103329947/103329952.png){width="340" height="469"}

      

4.  Select **Approve Once** or **Approve Always** in Access to profile
    information section. Also, select the attributes you agree to share.
    Click **Continue**.  
    ![](attachments/103329947/103329951.png){width="434" height="494"}

      

5.  Provide the following details and click on **Get Access Token**.

    Callback URL: <http://wso2is.local:8080/playground2/oauth2client>  
    Access Token Endpoint: <https://localhost:9443/oauth2/token>  
    Client Secret: (client secret received at the application
    registration)

    If you have configured the service provider in a tenant, you have to
    add the tenant domain as a query parameter to the access token
    endpoint.

    If the tenant domain is *[wso2.com](http://wso2.com)* , access token
    endpoint will be as follows.

    Access Token Endpoint:
    <https://localhost:9443/oauth2/token?tenantDomain=wso2.com>

    ![](attachments/103329947/103329950.png){width="568" height="250"}  
      

    At this point, the application receives the Access Token. Enter the
    introspection endpoint (i.e,
    <https://localhost:9443/oauth2/introspect> ) and click **Get
    TokenInfo** to get the token information.  
      

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on OAuth 2.0 Token Introspection

    OAuth 2.0 Token Introspection defines a protocol that allows
    authorized protected resources to query the authorization server to
    determine the set of metadata for a given token that was presented
    to them by an OAuth Client. This metadata includes whether or not
    the token is currently active (or if it has expired or otherwise
    been revoked), what rights of access the token carries (usually
    conveyed through OAuth 2.0 scopes), and the authorization context in
    which the token was granted (including who authorized the token and
    which client it was issued to). Token introspection allows a
    protected resource to query this information regardless of whether
    or not it is carried in the token itself, allowing this method to be
    used along with or independently of structured token values.

      

    ![](attachments/103329947/103329956.png){height="250"}

6.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  
    ![](attachments/103329947/103329955.png){height="250"}

#### **Running the application (with PKCE)**

1.  Visit the URL <http://wso2is.local:8080/playground2/oauth2.jsp> to
    start the application.

2.  Enter the following details and click **Authorize**.

    Authorization Grant Type: Authorization Code  
    Client ID: (the client id received at the application
    registration)  
    Callback URL: <http://wso2is.local:8080/playground2/oauth2client>  
    Authorize Endpoint: <https://localhost:9443/oauth2/authorize>  
    Use PKCE: Yes  
    PKCE Challenge Method:

    ![](attachments/103329947/103329960.png)

      

3.  Log in with the user credentials.  
    ![2.png](https://lh3.googleusercontent.com/lpIx7mjc8_V6mLfJNg2RFxSXWEcrrVHPHto6bBxCYqsxnYsavveiBfaE4_AQ0Gq0wfwKFba4F25li8P6aaAp9sEBSCX5tBxIsn5b0NqNBy27VV94BcTSHJlRPLI3FOsSmVsWAVM2){width="340"
    height="297"}

4.  Click **Approve** to consent to this action.

    ![3.png](https://lh5.googleusercontent.com/dpfRmmoe097JTIVOqEZHYwXrgX9j9q7wOvOe_Rq2WB48qnr6k937maFlZkF8iqP2yAELMkvclM-7y08EcQyTpAyJqyZ56P1t1JyPsEQUNjoHuuYin3Tu6KgpP1GSU_OIX-FI5B7v){width="434"
    height="203"}

5.  Provide the following details and click on **Get Access Token**.

    Callback URL: <http://wso2is.local:8080/playground2/oauth2client>  
    Access Token Endpoint: <https://localhost:9443/oauth2/token>  
    Client Secret: (client secret received at the application
    registration)  
    PKCE Verifier: (this will be populated using the value generated in
    step 1)

    If you have configured the service provider in a tenant, you have to
    add the tenant domain as a query parameter to the access token
    endpoint.

    If the tenant domain is *[wso2.com](http://wso2.com)* , access token
    endpoint will be as follows.

    Access Token Endpoint:
    <https://localhost:9443/oauth2/token?tenantDomain=wso2.com>

    ![](attachments/103329947/103329958.jpg)  
      

6.  At this point, the application receives the Access Token. Enter the
    introspection endpoint (i.e,
    <https://localhost:9443/oauth2/introspect> ) and click **Get
    TokenInfo** to get the token information.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here for more information on OAuth 2.0 Token Introspection

    OAuth 2.0 Token Introspection defines a protocol that allows
    authorized protected resources to query the authorization server to
    determine the set of metadata for a given token that was presented
    to them by an OAuth Client. This metadata includes whether or not
    the token is currently active (or if it has expired or otherwise
    been revoked), what rights of access the token carries (usually
    conveyed through OAuth 2.0 scopes), and the authorization context in
    which the token was granted (including who authorized the token and
    which client it was issued to). Token introspection allows a
    protected resource to query this information regardless of whether
    or not it is carried in the token itself, allowing this method to be
    used along with or independently of structured token values.

      
    ![](attachments/103329947/103329956.png){height="250"}

7.  Now you should be able to see the access token information as seen
    below, as long as the provided access token is valid.  
    ![](attachments/103329947/103329955.png){width="714"}

**Related Topics**

-   See [Invoke the OAuth Introspection
    Endpoint](https://docs.wso2.com/display/IS530/Invoke+the+OAuth+Introspection+Endpoint)
    to invoke the OAuth introspection endpoint using cURL commands.
-   See [Mitigating Authorization Code Interception
    Attacks](https://docs.wso2.com/display/IS530/Mitigating+Authorization+Code+Interception+Attacks)
    for more information about using PKCE with an OAuth application.
