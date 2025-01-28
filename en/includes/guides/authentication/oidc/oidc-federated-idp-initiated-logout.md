# Configure OIDC Federated IdP-Initiated Logout

{{product_name}} is able to handle logout requests from OIDC federated IdPs. When an OIDC back-channel logout request is received from the federated IdP to the back-channel logout endpoint of {{product_name}} (`https://localhost:9443/identity/oidc/slo`), it processes the request, terminates the sessions of the particular user, and then responds to the external identity provider.

## Sample scenario

Let's take a look at the following scenario to understand federated IdP-initiated logout.

![oidc-fed-idp-init-logout-scenario]({{base_path}}/assets/img/guides/oidc-fed-idp-init-logout-scenario.png)

The steps are as follows:

1. User initiates the logout from **Application2**.
2. The logout request is sent to the federated **OIDC provider**.
3. The federated **OIDC provider** handles the request and propagates the logout request to {{product_name}}.
4. After receiving the logout request from the federated IdP, **WSO2 IS** processes the request and terminates the session. 
5. {{product_name}} then sends back a logout response to the external identity provider.
6. Since the session is terminated, the logout request is propagated to all the connected applications.
7. User is logged out from **Application1**.


## Set up

To try this out, let's configure two WSO2 Identity Servers. One as the primary IdP (WSO2IS-1) and the other as the federated IdP (WSO2IS-2). Let's configure the applications, **Pickup-Dispatch** and **Pickup-Manager** in WSO2IS-1 and WSO2IS-2 respectively.

### Prerequisites

1. Set up two instances of WSO2 Identity Server.
2. Set a port offset for WSO2IS-2 so that the two servers can run on the same device. Learn how to do so [here]({{base_path}}/references/default-ports/){target="_blank"}.

3. Since there can be issues with cookies when the same hostname is configured for both WSO2 identity servers, it is recommended to [change the hostname]({{base_path}}/deploy/change-the-hostname/) of WSO2IS-2. In this guide, the hostname of WSO2IS-2 is configured as `localhost.com`.

### Register the primary IdP in the federated IdP

The primary identity provider (WSO2IS-1) should first be registered in the federated IdP (WSO2IS-2) as an application. To do so,

1. Start WSO2IS-2.
2. On the WSO2IS-2 Console, go to **Applications**, and click **New Application**.
3. Select **Standard-Based Application** and enter the following details:

    <table>
        <tr>
            <td>Name</td>
            <td>WSO2IS-1</td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>Select <code>OpenID Connect</code></td>
        </tr>
    </table>

4. Click **Create** to register the application.

5. In the **Protocol** tab of the created application, do the following:

    - Take note of the **Client ID** and **Client secret**. You will need them later.
    - Under **Allowed grant types**, enable **Code**.
    - Enter the following as the **Authorized redirect URLs**:
        ``` bash
        https://localhost:9443/commonauth
        ```
    - Enter the domain `https://localhost:9443` as an allowed origin.
    - Under **Logout URLs**, enter the following as the **Back channel logout URL**:
        ``` bash
        https://localhost:9443/identity/oidc/slo
        ```

6. Click **Update** to save the changes.

### Configure the federated IdP in the primary IdP

Next, the federated IdP (WSO2IS-2) should now be registered in the primary IdP (WSO2IS-1) as a connection. To do so,

1. Start WSO2IS-1.
2. On the WSO2IS-1 Console, go to **Connections** and select **New Connection**.
3. Select **Standard-Based IdP** and enter the following details:

    <table>
        <tr>
            <td>Identity provider name</td>
            <td>WSO2IS-2</td>
        </tr>
        <tr>
            <td>Select protocol</td>
            <td><code>OpenID Connect</code></td>
        </tr>
    </table>

4. Click **Next** and enter the following details:

    <table>
        <tr>
            <td>Client ID</td>
            <td>WSO2IS-2</td>
        </tr>
        <tr>
            <td>Client secret</td>
            <td><code>OpenID Connect</code></td>
        </tr>
        <tr>
            <td>Authorization endpoint URL</td>
            <td><code>https://localhost.com:9444/oauth2/authorize</code></td>
        </tr>
        <tr>
            <td>Token endpoint URL</td>
            <td><code>https://localhost.com:9444/oauth2/token</code></td>
        </tr>
    </table>

5. Click **Next** and do one of the following:

    - Select **JWKS endpoint** and add `https://localhost.com:9444/oauth2/jwks` as the federated IdP's JWKS endpoint URL.

    - Select **Use PEM certification** and upload the certificate of the federated IdP.

6. Click **Finish** to create the connection.

7. In the **General** tab of the created connection, add `https://localhost:9444/oauth2/token` as the **Issuer** and click **Update** to save the changes.  

### Register an application in the primary IdP

Let's register an application in the primary IdP (WSO2IS-1).

1. On the WSO2IS-1 Console, go to **Applications** and click **New Application**.
2. Select **Standard-Based Application*** and enter the following details:

    <table>
        <tr>
            <td>Name</td>
            <td>Pickup-Dispatch</td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>Select <code>OpenID Connect</code></td>
        </tr>
    </table>

3. Click **Create** to register the application.
4. In the **Protocol** tab of the created application, do the following:

    - Take note of the **Client ID** and **Client secret**. You will need them later.
    - Under **Allowed grant types**, select **Code**.
    - Enter the following in **Authorized redirect URLs**:
        ```
        http://localhost:8080/pickup-dispatch/oauth2client
        ```
    - Enter the domain `https://localhost:8080` as an allowed origin.

5. Click **Update** to save the changes.

6. In the **Login Flow** tab of the created application, add `WSO2IS-2` as a login method.

7. Click **Update** to save the changes.

### Register an application in the federated IdP

Finally, let's register an application in the federated IdP (WSO2 IS 2).

1. On the WSO2IS-1 Console, go to **Applications** and click **New Application**.
2. Select **Standard-Based Application*** and enter the following details:

    <table>
        <tr>
            <td>Name</td>
            <td>Pickup-Manager</td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>Select <code>OpenID Connect</code></td>
        </tr>
    </table>

3. Click **Create** to register the application.
4. In the **Protocol** tab of the created application, do the following:

    - Take note of the **Client ID** and **Client secret**. You will need them later.
    - Under **Allowed grant types**, select **Code**.
    - Enter the following in **Authorized redirect URLs**:
        ```
        http://localhost:8080/pickup-manager/oauth2client
        ```
    - Enter the domain `https://localhost:8080` as an allowed origin.

5. Click **Update** to save the changes.

## Try it out

Let's set up the sample applications and try out back-channel logout initiated by the federated IdP.

### Set up Pickup Dispatch

Follow the steps given below to set up the `Pickup-Dispatch` application that is registered as an application in the primary IdP (WSO2IS-1).

1. Download the [pickup-dispatch.war](https://github.com/wso2/samples-is/releases/download/v4.6.2/pickup-dispatch.war) sample.

3.  Extract the `pickup-dispatch.war` file and open the `dispatch.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

4. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated when you registered the service provider.

### Set up Pickup Manager

Follow the steps given below to set up the `Pickup-Manager` application that is registered as a service provider for the federated IdP (WSO2 IS 2).

1. Download the [pickup-manager.war](https://github.com/wso2/samples-is/releases/download/v4.6.2/pickup-manager.war) sample.

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
