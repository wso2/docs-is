# Configure OIDC Federated IdP-Initiated Logout

WSO2 Identity Server (WSO2 IS) handles logout requests from OIDC federated IdPs. When an OIDC
back-channel logout request is received from the OIDC federated IdP to the back-channel logout endpoint of WSO2 IS (`https://<hostname>:<port>/identity/oidc/slo`), WSO2 IS processes the request, terminates the sessions of the particular user, and then responds to the identity provider.

Learn more about [OpenID Connect back-channel logout]({{base_path}}/references/concepts/authentication/back-channel-logout).

## Scenario

Consider the scenario given below. **WSO2 IS** and **Application2** are configured as service providers in the **OIDC provider**. The **OIDC provider** is configured as an identity provider and **Application1** is configured as a service provider in **WSO2 IS**.

![oidc-fed-idp-init-logout-scenario]({{base_path}}/assets/img/guides/oidc-fed-idp-init-logout-scenario.png)

The flow is as follows:

1. User initiates the logout from **Application2**.
2. The logout request is sent to the federated **OIDC provider**.
3. The federated **OIDC provider** handles the request and propagates the logout request to **WSO2 IS**.
4. After receiving the logout request from the federated IdP, **WSO2 IS** processes the request and terminates the session. 
5. WSO2 IS then sends back a logout response to the OIDC provider.
6. Since the session is terminated on WSO2 IS, the logout request is propagated to all the connected relying parties (RPs).
7. User is logged out from **Application1**.

!!! note
    If logout is successful in WSO2 IS, it will respond with `200 OK`. If there are server-side errors or client 
    errors (e.g., claim validation fails), it will respond with `Bad Request` or `Internal Server Error`.

## Set up

To try this out, let's configure two WSO2 Identity Servers as the primary IdP (WSO2 IS 1) and the federated IdP (WSO2 IS 2). Let's configure two web applications, **Pickup-Dispatch** and **Pickup-Manager** as service providers in the primary IdP and the federated IdP respectively.

### Prerequisites

1. Set up two instances of WSO2 Identity Server.
2. Set a port offset for WSO2 IS 2 so that the two servers can run on the same computer. 

    !!! info
        Let's have the primary identity server (WSO2 IS 1) on port 9443 and the federated IdP (WSO2 IS 2) on port 9444.

3. Since there can be issues with cookies when the same hostname is configured for both WSO2 identity servers (primary and federated), you need to configure different hostnames for both servers.

    !!! info
        [Change the hostname]({{base_path}}/deploy/change-the-hostname) of the federated IdP (WSO2 IS 2). In this guide, the hostname of the federated IdP is configured as `localhost.com`.

Let's get started!

### Register the primary IdP in the federated IdP

The primary identity provider (WSO2 IS 1) should first be registered in the federated IdP (WSO2 IS 2) as a service provider.

1. Start the federated IdP (WSO2 IS 2).
2. Sign in to the Management Console using admin credentials.
3. Go to **Main** > **Identity** > **Service Providers** and click **Add**.
4. Enter `Primary IS` as the service provider name and click **Register**.
5. Expand **Inbound Authentication Configuration** > **OAuth2/OpenID Connect Configuration**  and click **Configure**.
6. Enter the following value as the Callback URL:

    ``` bash
    https://localhost:9443/commonauth
    ```

    ![oidc-federated-idp-config]({{base_path}}/assets/img/guides/oidc-federated-idp-config.png)

7. Select the **Enable OIDC Backchannel Logout** checkbox and add `https://localhost:9443/identity/oidc/slo` as the **Backchannel Logout Url**.

    ![oidc-back-channel-logout-url]({{base_path}}/assets/img/guides/oidc-back-channel-logout-url.png)

9. Click **Add** to complete the registration.

    !!! info
        Note the **OAuth Client Key** and **Client Secret** that is displayed. You will need these values later when you onboard WSO2 IS 2 as a federated IdP in the primary IdP (WSO2 IS 1).

### Configure the federated IdP in the primary IdP

The federated IdP (WSO2 IS 2) should now be registered in the primary IdP (WSO2 IS 1) as an identity provider.

1. Start the primary IdP (WSO2 IS 1).
2. Sign in to the Management Console using admin credentials.
3. Go to **Main** > **Identity** > **Identity Providers** and click **Add**.
4. Enter `Federated IdP` as the name of the identity provider.
5. Specify the federated IdP's certificate type using one of the following options:

    !!! info
        The signature of the logout token is validated using either the registered JWKS URI or the certificate uploaded to the relevant identity provider.
   
    - Select **Use IDP JWKS endpoint** and add `https://localhost.com:9444/oauth2/jwks` as the JWKS uri of the federated IdP's JWKS endpoint.

        ![oidc-primary-idp-jwks-uri-config]({{base_path}}/assets/img/guides/oidc-primary-idp-jwks-uri-config.png)

    - Alternatively, select **Upload IDP certificate** and upload the certificate of the federated IdP.

        ![oidc-primary-idp-certificate-config]({{base_path}}/assets/img/guides/oidc-primary-idp-certificate-config.png)

6. Add `https://localhost:9444/oauth2/token` as the **Identity Provider's Issuer Name**.

    ![oidc-backchannel-logout-issuer-name]({{base_path}}/assets/img/guides/oidc-backchannel-logout-issuer-name.png)
   
    !!! note
        The issuer name of the identity provider registered in the primary IdP should be the same as the **Identity Provider Entity ID** of the resident IdP configuration in the federated IdP (WSO2 IS 2). Go to **Identity Providers > Resident > Inbound Authentication Configuration > OAuth2/OpenID Connect Configuration** in the federated IdP to find this value.

7. Go to **Federated Authenticators**, expand **OAuth2/OpenID Connect Configuration**, and enter the following values:

    <table>
      <tr>
         <th>Parameter</th>
         <th>Value</th>
      </tr>
      <tr>
         <td>Enable OAuth2/OpenIDConnect</td>
         <td>Select this checkbox to specify that OAuth2/OpenID Connect is enabled for this identity provider</td>
      </tr>
      <tr>
         <td>Client Id</td>
         <td>The client ID generated when the primary IdP (WSO2 IS 1) was registered in the federated IdP.</td>
      </tr>
      <tr>
         <td>Client Secret</td>
         <td>The client secret generated when the primary IdP (WSO2 IS 1) was registered in the federated IdP.</td>
      </tr>
      <tr>
         <td>Authorization Endpoint URL</td>
         <td><code>https://localhost.com:9444/oauth2/authorize</code></td>
      </tr>
      <tr>
         <td>Token Endpoint URL</td>
         <td><code>https://localhost.com:9444/oauth2/token</code></td>
      </tr>
      <tr>
         <td>Callback Url</td>
         <td><code>https://localhost:9443/commonauth</code></td>
      </tr>
      <tr>
         <td>Userinfo Endpoint URL</td>
         <td><code>https://localhost.com:9444/oauth2/userinfo</code></td>
      </tr>
      <tr>
         <td>Logout Endpoint URL</td>
         <td><code>https://localhost.com:9444/oidc/logout</code></td>
      </tr>
      <tr>
         <td>Additional Query Parameters</td>
         <td><code>scope=openid</code></td>
      </tr>
    </table>

    ![oidc-fed-idp-config-in-primary-idp]({{base_path}}/assets/img/guides/oidc-fed-idp-config-in-primary-idp.png)

8. Click **Register** to complete the IdP registration.

### Register a service provider for the primary IdP

Let's register an application as a service provider in the primary IdP (WSO2 IS 1).

1. Sign in to the Management Console of the primary IdP using admin credentials.
2. Go to **Main** > **Identity** > **Service Providers** and click **Add**.
3. Enter `Pickup-Dispatch` as the service provider name and click **Register**.
4. Expand **Inbound Authentication Configuration** > **OAuth2/OpenID Connect Configuration** and click **Configure**.
5. Enter the following value as the Callback URL:
   
    ``` bash
    http://wso2is.local:8080/pickup-dispatch/oauth2client
    ```

6. Click **Add** to save the service provider.

    !!! info
        Note the **OAuth Client Key** and **Client Secret** that are displayed. You will need these values later when deploying the sample application.

Once the service provider is registered, let's add the federated IdP (WSO2 IS 2) as the service provider's sign-in method.

1. Expand **Local & Outbound Authentication Configuration** and select **Federated Authentication**.
2. Select **Federated IdP** as the authentication type from the list.

      <!--![oidc-service-provider-federated-authentication]({{base_path}}/assets/img/guides/oidc-service-provider-federated-authentication.png)-->

4. Click **Update** to save the changes.

### Register a service provider for the federated IdP

Now, let's register an application as a service provider in the federated IdP (WSO2 IS 2).

1. Log in to the Management Console of the federated IdP using admin credentials.
2. Go to **Main** > **Identity** > **Service Providers** and click **Add**.
3. Enter `Pickup-Manager` as the service provider name and click **Register**.
4. Expand **Inbound Authentication Configuration** > **OAuth2/OpenID Connect Configuration** and click **Configure**.
5. Enter the following value as the Callback URL:
   
    ``` bash
    http://localhost.com:8080/pickup-manager/oauth2client
    ```

6. Click **Add** to save the service provider.

    !!! info
        Note the **OAuth Client Key** and **Client Secret** that are displayed. You will need these values later when deploying the sample application.

## Try it out

Let's set up the sample applications and try out back-channel logout initiated by the federated IdP.

### Set up Pickup Dispatch

Follow the steps given below to set up the `Pickup-Dispatch` application that is registered as a service provider for the primary IdP (WSO2 IS 1).

1. Download the [pickup-dispatch.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/pickup-dispatch.war) sample.

3.  Extract the `pickup-dispatch.war` file and open the `dispatch.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

4. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated when you registered the service provider.

### Set up Pickup Manager

Follow the steps given below to set up the `Pickup-Manager` application that is registered as a service provider for the federated IdP (WSO2 IS 2).

1. Download the [pickup-manager.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/pickup-manager.war) sample.

2. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

3. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated when you registered the service provider.

### Deploy the samples

Next, deploy the sample web apps on a web container.

1.  Download Apache Tomcat 8.x from [here](https://tomcat.apache.org/download-80.cgi) and install it.     
    
    !!! Info
        It is recommended that you use a hostname that is not `localhost` to avoid browser errors. Modify the `/etc/hosts` entry in your machine to reflect this. Note that `wso2is.local` is used in this documentation as an example, but you must modify this when configuring the authenticators or connectors with this sample application.

4.  Next, copy the extracted and modified `pickup-manager` and `pickup-dispatch` folders to the `<TOMCAT_HOME>/webapps` folder.

You are now ready to try out back-channel logout initiated by the federated IdP.

### Try logout

Once you have completed configuring WSO2 IS as instructed in the above sections, try out the flow by running the sample applications.

1. Start the Tomcat server and access the two applications (`Pickup-Dispatch` and `Pickup-Manager`) on two browser pages.

    -  Pickup-Dispatch: [http://localhost.com:8080/pickup-dispatch/](http://localhost.com:8080/pickup-dispatch/)
    -  Pickup-Manager: [http://localhost.com:8080/pickup-manager/](http://localhost.com:8080/pickup-manager/)

2. Log in to the `Pickup-Dispatch` application.

    !!! info
        You are redirected to the login page provided by the federated IdP (WSO2 IS 2).

3. Use your WSO2 Identity Server credentials to log in.

    !!! info
        You will be redirected to the **Pickup Dispatch** application's home page.

4. Log in to the `Pickup-Manager` application.

    !!! info
        You are automatically logged in and redirected to the **Pickup Manager** application's home page.

5. Log out of the **Pickup Manager** application. 

    !!! info
        You are redirected to the login page of the application.

6. Now, attempt to access the **Pickup Dispatch** application. 

    !!! info
        Note that you are already logged out of this application as well.

## Validate the OIDC back-channel logout token

The following is an example OIDC back-channel logout token.

``` json
{
"iss": "https://localhost.com:9444/oauth2/token",
"sub": "admin",
"aud": "w_Hwp05dFRwcRs_WFHv9SNwpflAa",
"iat": 1609911868,
"exp": 1609911988,
"jti": "16159e3e-c5fc-42de-b93f-b0782ab33d58",
"sid": "15043ffc-877d-4205-af41-9b107f7da38c",
"events": {
   "http://schemas.openid.net/event/backchannel-logout": {}
   }
}  
```

Logout token validation is done according to the [OIDC back-channel logout specification](https://openid.net/specs/openid-connect-backchannel-1_0.html#Validation) for the token signature and the `iss`, `aud`, `iat`, `sub`, `sid`, `events`, and `nonce` claims.

-  **Configure “iat” claim validation**

      By default, `iat` claim validation is enabled and `iatValidityPeriod` is set as 300 seconds. To update these configurations, follow the steps given below.

      1. Open the `deployment.toml` file (stored in the  `<PRIMARY_IS_HOME>/repository/conf/` folder).
      2. Update the configurations given below.

         - The `iatValidityPeriod` configuration should be in seconds.
         - If `iat` claim validation is enabled in the primary IdP (WSO2 IS 1), the token shouldn’t be issued before the specified time.

         ``` toml
         [authentication.authenticator.oidc.parameters] 
         iatValidityPeriod = "150" 

         [authentication.authenticator.oidc.parameters]
         enableIatValidation = false
         ```

      3. Restart the primary IdP (WSO2 IS 1).

-  **Identifying the session (using `sub` or `sid` claims)**

      - Logout token should contain a `sub` claim, a `sid` claim, or both.
      - If the logout token contains a `sid` claim, the primary IdP (WSO2 IS 1) will terminate the particular session of the user with the `sid` claim. The `sid` claim in the logout token should match the `sid` claim in the ID token received for the current session.
      - If the logout token only contains a `sub` claim, the primary IdP (WSO2 IS 1) will terminate all the sessions for that `sub` claim.