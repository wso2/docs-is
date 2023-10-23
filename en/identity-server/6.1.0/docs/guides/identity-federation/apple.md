
# Configuring Apple as a Federated Authenticator

This page guides you through configuring Apple as a federated authenticator in the WSO2 Identity Server.

Follow the steps below to configure the WSO2 Identity Server to authenticate users using their Apple credentials.

## How it works

When a user attempts to log in to a client application through Apple Sign In:

1. The client application initiates the authentication flow by communicating with the WSO2 Identity Server.
2. WSO2 Identity Server redirects the user to the Apple Sign-In page.
3. Apple authenticates the user and redirects the user back to the WSO2 Identity Server with an authorization code.
4. WSO2 Identity Server sends the authorization code to the Apple Sign-In token endpoint and requests an ID token in return.
5. Apple validates the client application's client ID, client secret, and authorization code and responds with an ID token, access token, and refresh token.
6. WSO2 Identity Server validates the received ID token and extracts the authenticated user information.
7. WSO2 Identity Server completes the authentication flow by redirecting back to the client application with the authenticated user information.

![High level diagram for Apple and IS integration]({{base_path}}/assets/img/guides/apple-wso2-is-integration.png)


## Prerequisites
Before adding Apple as a federated authenticator on the WSO2 Identity Server, you need to register an application on the Apple Developer Portal and make sure you obtain the following:

- **Client ID**: This identifies the requests sent from WSO2 Identity Server to the application.
- **Client Secret**: This authenticates the requests sent from WSO2 Identity Server to the application.
- **Callback URL**: This is the URL to which Apple sends the response after authenticating the user.

Refer to [Apple's official documentation](https://developer.apple.com/documentation/sign_in_with_apple/configuring_your_environment_for_sign_in_with_apple) for more details on registering an application on the Apple Developer portal.

## Configuring the identity provider
To configure the WSO2 Identity Server as an identity provider that uses Apple for federated authentication:

1. On the Management Console, go to **Identity > Identity Providers > Add**.

    The **Add New Identity Provider** screen appears.

    ![Add New Identity Provider screen]({{base_path}}/assets/img/guides/add-new-identity-provider-screen.jpeg)

2. Enter a meaningful name as the **Identity Provider Name**, e.g., `AppleSignIn`.

3. Expand **Federated Authenticators** > **OAuth2/OpenID Connect Configuration** and enter the required values as given below.

    ![OAuth2/OpenID Connect Federated Authenticator Configuration screen]({{base_path}}/assets/img/guides/oauth2-oidc-federated-authenticator-configuration-screen.jpeg)

    <table>
        <thead>
            <tr>
                <th>Field</th>
                <th>Description</th>
                <th>Sample Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Enable OAuth2/OpenIDConnect</td>
                <td>Selecting this option enables OAuth2/OpenID Connect to be used as an authenticator for users provisioned to the WSO2 Identity Server.</td>
                <td>Selected</td>
            </tr>
            <tr>
                <td>Default</td>
                <td>Selecting this option signifies that OAuth2/OpenID Connect is used as the main/default form of authentication. Selecting this removes the selection made for any other **Default** checkboxes for other authenticators.</td>
                <td>Selected</td>
            </tr>
            <tr>
                <td>Client Id</td>
                <td>This is the <code>client key</code> of your Apple application.</td>
                <td><code>idp.demologin.com</code></td>
            </tr>
            <tr>
                <td>Client Secret</td>
                <td>This is the <code>client secret</code> of your Apple application.</td>
                <td></td>
            </tr>
            <tr>
                <td>Authorization Endpoint URL</td>
                <td>This is the authorization endpoint URL of Apple Sign In.</td>
                <td><code>https://appleid.apple.com/auth/authorize</code></td>
            </tr>
            <tr>
                <td>Token Endpoint URL</td>
                <td>This is the token endpoint URL of Apple Sign In.</td>
                <td><code>https://appleid.apple.com/auth/token</code></td>
            </tr>
            <tr>
                <td>Callback URL</td>
                <td>This is the URL to which the browser should be redirected after the authentication is successful. This should be the commonauth endpoint of Identity server.</td>
                <td><code>https://localhost:9443/commonauth</code></td>
            </tr>
            <tr>
                <td>Userinfo Endpoint URL</td>
                <td>This is not relevant for this feature.</td>
                <td>-</td>
            </tr>
            <tr>
                <td>OpenID Connect User ID Location</td>
                <td>This is not relevant for this feature.</td>
                <td>-</td>
            </tr>
            <tr>
                <td>Additional Query Parameters</td>
                <td>These are the additional query parameters that are necessary to authenticate users through Apple Sign In.</td>
                <td><code>scope=openid email&response_mode=form_post</code></td>
            </tr>
            <tr>
                <td>Enable HTTP basic auth for client authentication</td>
                <td>This is not relevant for this feature.</td>
                <td>
                    <div class="admonition warning">
                        <p class="admonition-title">Warning</p>
                        <p>Make sure to keep it unselected.</p>
                    </div>  
                </td>
            </tr>
        </tbody>
    </table>

4. Click **Register**.

You have successfully added the identity provider.

!!! Note
    Apple expires the client secret after six months. See [Apple Documentation](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens) for more information.


## Configuring the service provider
To configure the client application as a service provider in WSO2 Identity Server:

1. On the WSO2 Identity Server Management Console, go to **Identity > Service Providers > Add**.

    The **Add New Service Provider** screen appears.

    ![Add New Service Provider screen]({{base_path}}/assets/img/guides/add-new-sp-screen.jpeg)

2. Enter a meaningful name as the **Service Provider Name** text box and click **Register**. The **Service Providers** screen appears.

    ![Service Providers screen]({{base_path}}/assets/img/guides/sps-screen.jpeg)

3. Expand the **Inbound Authentication Configuration** section and configure it based on the authentication protocol that is required for the client application.

    !!! tip
        If your client application uses OpenID Connect, click **OAuth/OpenID Connect Configuration > Configure**.

        1. Enter the `callback URL` of your Apple application.

        2. Click **Register**. You will be redirected to the Service Providers screen, which displays the `client key` and `client secret`.

    !!! info
        For more information on inbound authentication configurations, see [Configuring Inbound Authentication for a Service Provider]({{base_path}}/guides/applications/inbound-auth-for-sp).

4. Expand **Local and Outbound Authentication Configuration** section, select **Federated Authentication** as the **Authentication type** and select the identity provider as `AppleSignIn`.

    ![Local and Outbound Authentication Configuration]({{base_path}}/assets/img/guides/local-and-outbound-auth-conf.jpeg)

5. Click Update to save the changes.

You have now successfully added and configured the service provider. You can now log in to the client application with your Apple ID.
