# Writing A New OAuth Client Authenticator

Client authentication is used to identify the application or the client
that is making the request. In most scenarios, in order to authenticate
the application or client, you retrieve the access token using the
client ID and secret that are sent in the token request. Only the
application knows the client ID and secret and it sends them out to
authenticate the calling party.

There are multiple ways to authenticate an OAuth client. For more
information, see the [client authentication
specification](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)
. The most widely used authentication method is the client secret
authentication.  This method can further be divided into the Client
secret basic authentication, Client secret post authentication, Client
secret JWT authentication, and Private key JWT authentication sections.

Previously, with WSO2 Identity Server (WSO2 IS) the client ID and client
secret were hard coded to the OAuth service provider that was created.
With this new implementation, the OAuth client authentication process is
decoupled and is handled via different authenticators.

Using WSO2 Identity Server 5.5.0 you are able to extend the client
authentication implementation. Therefore, you don’t need to stick to the
same client id and secret. You can write your own client authentication
mechanism following a specification or any other standard.  WSO2
Identity Server 5.5.0 supports client secret basic authentication out of
the box.

### The default authenticator

The default authenticator that is supported out of the box is named
`         BasicAuthClientAuthenticator        ` . It is written to
handle the basic client authenticator as follows:

-   To have an HTTP header known as the
    `          Authorization         ` in the following format:
    `          (base64encoded(client_id:client_secret))         `
-   The
    `          client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>         `
    in the body of the request.

[Click here to take a look at the default
implementation](https://github.com/wso2-extensions/identity-inbound-auth-oauth/blob/master/components/org.wso2.carbon.identity.oauth/src/main/java/org/wso2/carbon/identity/oauth2/client/authentication/BasicAuthClientAuthenticator.java)
.

The elements used in each method are explained below:

-   **`            request           `** : The
    `           HttpServletReqeust          `, which is the incoming
    request to the endpoint

-   **`            bodyParams           `** : List out the body
    parameters of the incoming request.

-   **`            OAuthClientAuthnContext           `** : The context
    used to store and maintain the status of the authentication flow.

### Implementing a new authenticator

Implementing an OAuth client authenticator is as straightforward as
implementing an Interface . Let's take a look at how to create a sample
OAuth client authenticator that only expects to have the client id and
secret as two separate HTTP headers.

Let's get started!

1.  Create a Java class and extend the
    `           AbstractOAuthClientAuthenticator          ` .

    The `            AbstractOAuthClientAuthenticator           `
    includes all the methods that is in the
    `            IdentityHandler           ` Interface . When you extend
    the `            AbstractOAuthClientAuthenticator           ` class,
    you only need to override the specific methods you want to change.
    Else you need to override all the methods in the
    `            IdentityHandler           ` Interface.

    ``` java
    public class OAuthSampleClientAuthenticator extends AbstractOAuthClientAuthenticator {
    ```

2.  In this sample, you are implementing the
    `           authenticateClient          `,
    `           canAuthenticate          `, and
    `           getClientId          ` methods and overriding the
    `           getPrioirty          ` and
    `           getName          ` methods.  
    Let's get to know each of these methods:

    -   **`              authenticateClient                           `**
        This method checks the validity of the given credentials. For
        example, if it’s client id and secret, you should validate the
        secret of the given client. If it is a JWT authentication you
        should do the JWT validation, such the signature validation.

    -   **`              canAuthenticate                           `**
        This method returns True if this authenticator can authenticate
        the incoming request based on the parameters and the content of
        the incoming request, else it return false. If true is returned,
        the authentication is handled by the authenticator, else the
        authenticator skips authenticating the user.

    -   **`              getClientId                           `** This
        method extracts the client id of the calling client.  
        The `             OAuthClientAuthnContext            ` maintains
        the state of authentication flow. It stores the information you
        derive in this method for future reference.

    -   **`             getName            `**  
        You need to override this method so that the authenticator you
        are implementing is registered with a new name.
    -   **`             get Priority            `**  
        Define the priority order of the authenticator. Make sure that
        the priority order ID is not taken up by another authenticator
        or implementation. Overriding this method is optional.  
        If the method is not overridden here, the configuration in the
        identity.xml file is taken into consideration when executing
        this authenticator. See [step
        3](#step3) for more
        information.
    -   **`             isEnabled            `**  
        Define if the authenticator is enabled of disabled. Overriding
        this method is optional.  
        If the method is not overridden here, the configuration in the
        identity.xml file is taken into consideration when executing
        this authenticator. See [step
        3](#step3) for more
        information.

    It is mandatory that you implement the
    `            authenticateClient           `,
    `            canAuthenticate           `, and
    `            getClientId           ` methods and override the
    `            getName           ` method.  It is not mandatory to
    override the `            isEnabled           ` and
    `            getPriority           ` methods as you can configure it
    in the `            deployment.toml          ` file too. For more
    information, see [step
    3](#step3) below.

    Optionally, if you need to send out a custom message with a custom
    error code when the authentication fails, you can do it by throwing
    an exception at the `            getClientId           ` or
    `            authenticateClient           ` methods. You can wrap
    your error code and error message in the
    `            OAuthCleintAuthnException           ` and throw it so
    that the it is handled by the underlying implementation.

    ``` java
    public class OAuthSampleClientAuthenticator extends AbstractOAuthClientAuthenticator {

        public boolean authenticateClient(HttpServletRequest httpServletRequest,
        Map < String, List > map, OAuthClientAuthnContext oAuthClientAuthnContext)
        throws OAuthClientAuthnException {
        String clientId = httpServletRequest.getHeader("client_id");
        String clientSecret = httpServletRequest.getHeader("client_secret");
        try {
        return OAuth2Util.authenticateClient(clientId, clientSecret);
        } catch (IdentityOAuthAdminException | InvalidOAuthClientException | IdentityOAuth2Exception e) {
        throw new OAuthClientAuthnException("Error while authenticating client", "INVALID_CLIENT", e);
        }
        }

        public boolean canAuthenticate(HttpServletRequest httpServletRequest, Map < String, List > map,
        OAuthClientAuthnContext oAuthClientAuthnContext) {
        if (httpServletRequest.getHeader("client_id") != null &&
        httpServletRequest.getHeader("client_secret") != null) {
        return true;
        }
        return false;
        }

        public String getClientId(HttpServletRequest httpServletRequest, Map < String, List > map,
        OAuthClientAuthnContext oAuthClientAuthnContext) throws OAuthClientAuthnException {
        return httpServletRequest.getHeader("client_id");
        }

        @Override
        public int getPriority() {
        return 150;
        }

        @Override
        public String getName() {
        return "SampleOAuthClientAuthenticator";
        }
    }
    ```
<a name="step3"></a>
3.  If you did not override the `           getPriority          ` or
    `           isEnabled          ` methods in the authenticator class,
    you can define it in the
    `           <IS_HOME>/repository/conf/deployment.toml        `
    file as follows.

    ``` toml
    [[event_listener]]
    id = "custom_event_listener"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"
    name = "org.wso2.carbon.identity.oauth.client.auth.sample.OAuthSampleClientAuthenticator"
    order = 899
    enable = true
    ```

    <table>
    <tbody>
    <tr class="odd">
    <td><code>               orderID              </code></td>
    <td>Define the priority order of the authenticator. Make sure that the priority order ID is not taken up by another authenticator or implementation.</td>
    </tr>
    <tr class="even">
    <td><code>               enable              </code></td>
    <td>Define if the authenticator is enabled or disabled.<br />
    The authenticator is enabled if <code>               true              </code> is defined as the value and disabled if <code>               false              </code> is defined as the value.</td>
    </tr>
    </tbody>
    </table>

4.  Register the authenticator as an OSGi service. For example, see
    [here](https://github.com/wso2/samples-is/blob/master/etc/oauth-sample-client-authenticator/src/main/java/org/wso2/carbon/identity/oauth/client/auth/sample/internal/OAuth2SampleClientAuthnServiceComponent.java#L46)
    .

5.  Build the OSGi bundle.

    ``` java
    mvn clean install
    ```

6.  Deploy the authenticator by copying the build jar file to the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

7.  Restart the server.

### Try it out

To try out the sample implementation that was used in this guide, follow
the steps given below to successfully get the token.

1.  [Download or clone the samples](https://github.com/wso2/samples-is).
2.  Navigate to the
    `           samples-is/etc/oauth-sample-client-authenticator/          `
    directory.
3.  Build the sample.

    ``` java
    mvn clean install
    ```

4.  Copy the
    org.wso2.carbon.identity.oauth.client.auth.sample-1.0-SNAPSHOT.jar
    file that is in `            samples-is/etc           `
    `            oauth-sample-client-authenticator/target           `
    directory to the
    `            <IS_HOME>/repository/components/dropins           `
    directory.

5.  Run the cURL command given below to get the token.

    ``` java
    curl -k -d "grant_type=password&username=admin&password=admin" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token -i -H "client_id: 0gP9suHvLpKZLhVdgtXKWfiybdca" -H "client_secret: PIOpiS1637JvSVHn2lDGIOACDNwa"
    ```

    The sample response:

    ``` java
    "access_token":"8298afd0-7474-3ae2-837a-84d69ae0c107","refresh_token":"25b66aa7-253b-3704-9086-e53a5f386c1f","token_type":"Bearer","expires_in":3600"
    ```
