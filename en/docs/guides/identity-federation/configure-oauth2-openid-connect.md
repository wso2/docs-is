# Configure OAuth2-OpenID Connect

[OAuth 2.0](https://oauth.net/2/) is an authorization framework that is
capable of providing a way for clients to access a resource with
restricted access on behalf of the resource owner. OAuth 2.0 is capable
of authorizing the flows for web applications, desktop applications, and
mobile applications among others.

OpenID Connect is an authentication protocol built on top of OAuth 2.0,
which facilitates clients to verify the end-user identity against the
authentication performed by an authorization server. At the same time,
it provides methods to transfer the end user information through claims.

With OAuth as its base, OpenID Connect allows many types of clients such
as web-based clients, mobile clients and javascript clients to verify
the users with an authorization server-based authentication.

## Configure the identity provider

You need to configure an oauth application in the federated authorization server and get the application information such as client ID and secret. For example, see [configure OAuth2-OpenID Connect single sign-on]({{base_path}}/guides/login/webapp-oidc/).

!!! tip
    By default, the **Client Id** and **Client Secret** are stored as
    plain text values, where the **Client Secret** is generally stored
    as a random number generated using two UUIDs and HMAC-SHA1 hash
    function, which is known to resist the strongest attack known
    against HMAC.

    If you want to change the format in which the **Client Secret** is
    stored, open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configuration.

    ```toml
    [oauth]
    hash_tokens_and_secrets = true 
    ```

    Once you configure a required token persistence processor, be sure
    to restart the server for the changes to be applied to WSO2 Identity
    Server.
    
<!--For information on
possible values that you can specify based on your
requirement, see [Supported token persistence
processors](TO-DO:{{base_path}}/learn/extension-points-for-oauth#token-persistence-processor).-->

## Register the identity provider

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using the `admin/admin` credentials.
    
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Identity Providers**.  
    
3.  Fill in the details in the **Basic Information** section.

4.  Expand the **Federated Authenticators** section and then the
    **OAuth2/OpenID Connect Configuration** form.  
    ![oauth2-openid-connect-configuration]({{base_path}}/assets/img/guides/oauth2-openid-connect-configuration.png)
        
    !!! note
        WSO2 Identity Server supports RP-initiated logout requests to OpenID Connect identity providers.
    
5.  Fill in the following fields where relevant.

    <div class="tg-wrap"><table>
    <thead>
    <tr>
        <th>Field </th>
        <th>Description</th>
        <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Enable OAuth2/OpenIDConnect</td>
        <td>Selecting this option enables OAuth2/OpenID Connect to be used as an authenticator for users provisioned to WSO2 Identity Server.</td>
        <td>Selected</td>
    </tr>
    <tr>
        <td>Default</td>
        <td>Selecting the <strong>Default</strong> check box signifies that the OAuth2/OpenID Connect credentials are the main/default form of authentication. <br>This removes the selection made for any other <strong>Default</strong> checkboxes for other authenticators.</td>
        <td>Selected</td>
    </tr>
    <tr>
        <td>Authorization Endpoint URL</td>
        <td>This is a standard OAuth Authorization Endpoint URL of the federated IDP.</td>
        <td><code>https://<IS_HOST>:<PORT>/oauth2/authorize/</code></td>
    </tr>
    <tr>
        <td>Token Endpoint URL</td>
        <td>This is a standard OAuth Token Endpoint URL of the federated IDP.</td>
        <td><code>https://<IS_HOST>:<PORT>/oauth2/token/</code></td>
    </tr>
    <tr>
        <td>Client Id</td>
        <td>Client ID of the identity provider application.</td>
        <td><code>1421263438188909</code></td>
    </tr>
    <tr>
        <td>Client Secret</td>
        <td>Client Secret of the identity provider application. Click the <strong>Show</strong> button to view the value you enter.</td>
        <td><code>12ffb4dfb2fed67a00846b42126991f8</code></td>
    </tr>
    <tr>
        <td>Callback URL</td>
        <td>This is the URL to which the browser should be redirected after the authentication is successful. It should be the <code>commonauth</code> endpoint of Identity server</td>
        <td><code>https://<IS_HOST>:<PORT>/commonauth</code></td>
    </tr>
    <tr>
        <td>OpenID Connect User ID Location</td>
        <td>Select whether the User ID is found in the 'sub' attribute that is sent with the OpenID Connect request or if it is found among claims.</td>
        <td>User ID found in 'sub' attribute</td>
    </tr>
    <tr>
        <td>Scopes</td>
        <td>This is a space-separated, case-sensitive list of OpenID Connect scopes to request from the identity provider. See the <a href="https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims">OpenID Connect specification</a> for more information about what scopes can be configured here.</td>
        <td>openid email profile</td>
    </tr>
    <tr>
        <td>Additional Query Parameters</td>
        <td>This is necessary if you are connecting to another Identity Server or application. Sometimes extra parameters are required by this IS or application so these can be specified here.
        <div class="admonition note">
        <p>If you wish to send query parameters that need to be updated dynamically with each OIDC request, the value needs to be defined within parenthesis.This value should be the key of the query parameter sent in the OIDC request URL.
        <ul>
            <li>
                <b>Format:</b> <code>login_hint=&#36;{paramName}</code>
                Multiple parameters can be defined by separation of query parameters using the & character.
            </li>
            <li>
                <b>Sample:</b> <code>login_hint=&#36;{paramName}&scope=openid email profile</code>
                 Alternatively, use the following format to send query parameters that are resolved using an adaptive authentication script.
            </li>
            <li>
                <b>Format:</b><code>login_hint=$authparam{paramName} </code>
            </li>
        </ul>
        </p>
        </div>
        </td>
        <td>paramName1=value1</td>
    </tr>
    </tbody>
    </table></div>

!!! info "Related topics"
    - [Guides: Enable Single Sign-On for an OIDC Web Application]({{base_path}}/guides/login/sso-for-oidc)
    - [Concepts: Introduction to OpenID Connect]({{base_path}}/references/concepts/authentication/intro-oidc)
    

<!--	-   See [Log into Identity Server using another Identity Server -
		OAuth2](TO-DO:{{base_path}}/learn/login-to-identity-server-using-another-identity-server-oauth2)
		for a sample of using OAuth2/OpenIDConnect for federated
		authentication.-->
