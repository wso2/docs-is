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
    ![](attachments/103331453/103331459.png){width="614"}
5.  Expand the **OAuth/OpenID Connect Configuration** section and
    configure it with the following callback URL
    format: \[server-url\]/callback.aspx. Click **Add**.  
    For more information on configuring OAuth/OpenID Connect, see
    [Configuring OAuth2-OpenID Connect
    Single-Sign-On](_Configuring_OAuth2-OpenID_Connect_Single-Sign-On_)
    .
6.  Take note of the client key and client secret that you receive.  
    ![](attachments/103331453/103331461.png){width="851"}
7.  Open the `          oidc.sln         ` file found in the
    `          <SAMPLE_HOME>         ` directory using [Visual
    Studio](https://www.visualstudio.com/downloads/) and run the .NET
    application.
8.  Fill in the following fields and click **Submit**.
    -   **Client Id:** \<client key of service provider\>
    -   **Request URI:** http://localhost:50420/callback.aspx
    -   **Response Type:** code
    -   **Scope:** openid

    ![](attachments/103331453/103331465.png){width="406"}
9.  Sign in using admin/admin credentials and then select **Approve** or
    **Approve Always.**  
    **![](attachments/103331453/103331464.png){width="308"}**
10. You will be redirected to the callback page along with the OAuth
    code. Fill in the following fields and click **Submit** to retrieve
    the token details.  

    -   **Client Id: \<** client key of the service provider\>
    -   **Secret:** \<client secret of the service provider\>
    -   **Grant Type:** authorization\_code
    -   **Request URI:** http://localhost:50420/callback.aspx  

    ![](attachments/103331453/103331463.png){width="405"}

    It does a REST call to the token endpoint and retrieve the token
    details. Since it does a server to server call, you need to import
    the IS server certificate and export it to Visual Studio Management
    Console to avoid SSL handshake exceptions.

11. Once the REST call succeeds, you can see the token details with the
    base64 decoded JWT (ID Token) details.  
    ![](attachments/103331453/103331462.png){width="611"}
