# Logging in to a .NET application using the Identity Server

This topic provides instructions on how to configure a .NET application
using the WSO2 Identity Server for authentication. It is demonstrated
using a sample OpenID Connect application.

1.  Download the sample from the following [SVN
    location](https://svn.wso2.org/repos/wso2/people/lahiruc/oidc_sample/)
    .
2.  Start the Identity Server and log in to the management console.
3.  Navigate to the **Main** tab and click on **Add** under **Service
    Providers**.
4.  Enter a name for the service provider and expand the **Inbound
    Authentication and Configuration** section.  
    ![enter-sp-name](../../assets/img/tutorials/enter-sp-name.png)
5.  Expand the **OAuth/OpenID Connect Configuration** section and
    configure it with the following callback URL
    format: \[server-url\]/callback.aspx. Click **Add**.  
    For more information on configuring OAuth/OpenID Connect, see
    [Configuring OAuth2-OpenID Connect
    Single-Sign-On](../../learn/configuring-oauth2-openid-connect-single-sign-on)
    .
6.  Take note of the client key and client secret that you receive.  
    ![key-and-secret](../../assets/img/tutorials/key-and-secret.png)
7.  Open the `          oidc.sln         ` file found in the
    `          <SAMPLE_HOME>         ` directory using [Visual
    Studio](https://www.visualstudio.com/downloads/) and run the .NET
    application.
8.  Fill in the following fields and click **Submit**.
    -   **Client Id:** \<client key of service provider\>
    -   **Request URI:** http://localhost:50420/callback.aspx
    -   **Response Type:** code
    -   **Scope:** openid

    ![run-dotnet-app](../../assets/img/tutorials/run-dotnet-app.png)
    
9.  Sign in using admin/admin credentials and then select **Approve** or
    **Approve Always.**  
    ![admin-credentials-to-approve](../../assets/img/tutorials/admin-credentials-to-approve.png)
    
10. You will be redirected to the callback page along with the OAuth
    code. Fill in the following fields and click **Submit** to retrieve
    the token details.  

    -   **Client Id: \<** client key of the service provider\>
    -   **Secret:** \<client secret of the service provider\>
    -   **Grant Type:** authorization\_code
    -   **Request URI:** http://localhost:50420/callback.aspx  

    ![callback-page-with-oauth-code](../../assets/img/tutorials/callback-page-with-oauth-code.png)

    !!! info 
		It does a REST call to the token endpoint and retrieve the token
		details. Since it does a server to server call, you need to import
		the IS server certificate and export it to Visual Studio Management
		Console to avoid SSL handshake exceptions.

11. Once the REST call succeeds, you can see the token details with the
    base64 decoded JWT (ID Token) details.  
    ![jwt-id-token-details](../../assets/img/tutorials/jwt-id-token-details.png)
