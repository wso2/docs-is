# Configuring Google

Google can be used as a federated authenticator in the Identity
Server. Do the following to configure the Identity Server to
authenticate users using their Google user accounts.

1.  To navigate to the federated authenticators configuration section,
    do the following.
    1.  Sign in. Enter your username and password to log on to the
        [Management
        Console](https://docs.wso2.com/display/IS580/Getting+Started+with+the+Management+Console)
        .
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Identity Providers** .  
        For more information, see [Adding and Configuring an Identity
        Provider](https://docs.wso2.com/display/IS580/Adding+and+Configuring+an+Identity+Provider)
        .
    3.  Fill in the details in the **Basic Information** section.

2.  Register OAuth 2.0 Application in Google. As the first step, go to
    [Google API Console](https://console.developers.google.com)
    and navigate to the **Credentials** tab from the sidebar. You can
    configure OAuth web application in Google by selecting **OAuth
    Client ID** . You can find more details from
    [here](https://developers.google.com/identity/protocols/OpenIDConnect)
    .  
    ![](attachments/60494108/75110338.png){height="250"}  
    Select a web application and give it a name (e.g.,
    SampleWebApllication). Enter the Authorized **redirect URI** as
    `                     https://localhost:9443/commonauth                   `
    (this is the endpoint in WSO2 Identity Server that accepts the
    response sent by Google).  
    ![](attachments/60494108/75110343.png){height="400"}  
3.  Expand the **Google Configuration** form and configure the Google
    authenticator as shown below. Make sure to add your Redirect URI as
    the Callback URL and Client id and Secret which is generated from
    above Google application . You can find the client id and secret
    from edit OAuth client.  
    ![](attachments/60494108/75110347.png){width="700"}  
    ![](attachments/103331000/103331001.png){width="700"}
4.  Fill in the following fields where relevant.

    | Field                       | Description                                                                                                                                                                                                                                                                                                                                           | Sample value                      |
    |-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
    | Enable                      | Selecting this option enables Google to be used as an authenticator for users provisioned to the Identity Server.                                                                                                                                                                                                                                     | Selected                          |
    | Default                     | Selecting the **Default** check box signifies that Google is the main/default form of authentication. This removes the selection made for any other **Default** checkboxes for other authenticators.                                                                                                                                                  | Selected                          |
    | Client Id                   | This is the username from the Google application you created from [google developer console](https://console.developers.google.com/projectselector/apis/credentials) .                                                                                                                                                                                | 1421263438188909                  |
    | Client Secret               | This is the password from the Google application you created from [google developer console](https://console.developers.google.com/projectselector/apis/credentials) . Click the **Show** button to view the value you enter.                                                                                                                         | 12ffb4dfb2fed67a00846b42126991f8  |
    | Callback Url                | This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: `                               https://(host-name):(port)/acs                             ` . Here ACS URL (Assertion Consumer URL) is the endpoint in WSO2 Identity Server which accepts the response sent by Google. | https://localhost:9443/commonauth |
    | Additional Query Parameters | This is necessary if you are connecting to another Identity Server or application. Sometimes extra parameters are required by this IS or application so these can be specified here.                                                                                                                                                                  | scope=openid email profile        |

**Related Topics**

-   Identity Federation is part of the process of configuring an
    identity provider. For more information on how to configure an
    identity provider, see [Configuring an Identity
    Provider.](_Adding_and_Configuring_an_Identity_Provider_)
