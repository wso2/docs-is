# Integrate `mod_auth_openidc` Apache HTTPD module with WSO2 Identity Server

[mod_auth_openidc](https://github.com/zmartzone/mod_auth_openidc){: target="_blank"} is an Apache HTTP Server module that provides OpenID Connect authentication. It acts as a reverse proxy that authenticates users via an external OIDC provider (like WSO2 Identity Server) and forwards identity information to your back-end app via HTTP headers. You can use it if you want to,

- Add Oauth2/OIDC authentication to legacy apps without code changes
- Centralize authentication logic in Apache
- Forward user identity (for example username, email) as headers
- Leverage Apache's robust proxy and security features

![mod_auth_openidc flow diagram showing authentication flow between client, Apache with mod_auth_openidc, WSO2 Identity Server, and back-end application]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/mod_auth_openidc_architecture.png)

Follow the steps below to connect {{product_name}} with mod_auth_openidc Apache HTTPD module.

## Prerequisites

- Homebrew package manager (for macOS users). Install from [brew.sh](https://brew.sh/){: target="_blank"} if not already installed.
- OIDC-compliant Identity Provider (for example WSO2 Identity Server 7.0.0 or later)
- An application with a back-end. If not, you can use this [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

## Step 1: Install and run {{product_name}}

Follow the following steps below to download and install {{product_name}}. Refer to the [quick setup]({{base_path}}/get-started/quick-set-up/) to learn more.

1. Download the latest {{product_name}} version from the [website](https://wso2.com/identity-server/){: target="_blank"}.

2. Unzip the archive using the following command:

      ```sh
      unzip wso2is-<version>.zip
      # Replace <version> with your downloaded version, e.g., wso2is-7.0.0
      ```

3. Start the server:

    === "Linux/MacOS"

        ```sh
        cd path/to/wso2is-<version>/bin
        ./wso2server.sh
        ```

    === "Windows"

        ```sh
        cd path/to/wso2is-<version>/bin
        wso2server.bat
        ```

4. You can access the {{product_name}} Console by visiting the following URL and providing the default credentials of `admin`, `admin`.

      ```url
      https://localhost:9443
      ```

## Step 2: Create an OIDC application

To connect your mod_auth_openidc Apache HTTPD module to {{product_name}}, you need to register it as an application. To do so,

1. On the {{product_name}} Console, go to **Applications** > **New Application**.

      ![Add application step showing the Applications menu and Add Application option]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/add-application-step.png)

2. Select **Traditional Web Application**.

      ![Select web app step showing the Traditional Web Application option]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/select-web-app-step.png)

3. Enter the following details and click **Create**.

      - **Name** - mod-auth-app
      - **Protocol** - Select OpenID Connect
      - **Callback URL** -The URL where WSO2 Identity Server sends the authentication response after login. For example: `http://localhost:8002/oauth2/callback` (or your proxy callback URL)

    ![Fill app details step showing the application configuration form with name and callback URL fields]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/fill-app-details-step.png)

4. Take note of the **Client ID** and **Client Secret** generated for your application.

     ![Copy client credentials step showing the generated client ID and client secret]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/copy-client-credentials-step.png)

## Step 3: (Optional) Set up sample application

If you have your own application, you can skip this step. If you want to use the sample Java application, follow the steps below to set it up.

1. Download the [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

2. Use the following command to run the application.

      ```java
      cd path/to/app/folder
      java -jar request-logger-Sample-application.jar
      ```

3. Go to [http://localhost:8080](http://localhost:8080){: target="_blank"} and verify that the application works.

      ![Sample app running showing the application startup and running status]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/sample-app-running.png)

## Step 4: Install Apache and mod_auth_openidc

1. Install Apache (if not already installed).

   ```sh
   brew install httpd
   ```

2. Install Dependencies for mod_auth_openidc.

   mod_auth_openidc requires several dependencies, especially `libcurl` and `jansson`. Install them with:

   ```sh
   brew install jansson cjose libcurl
   ```

3. Clone and Build mod_auth_openidc.

   ```sh
   git clone https://github.com/zmartzone/mod_auth_openidc.git
   cd mod_auth_openidc
   ./autogen.sh
   ./configure --with-apxs=$(which apxs)
   make
   make install
   ```

   If the `./configure --with-apxs=$(which apxs)` command fails, use:

   ```sh
   ./configure --with-apxs2=/opt/homebrew/bin/apxs \
            --with-openssl=/opt/homebrew/opt/openssl@3 \
            --with-jansson=/opt/homebrew/opt/jansson \
            --with-cjose=/opt/homebrew/opt/cjose
   make
   make install
   ```

   After building, the .so module should appear in `/opt/homebrew/lib/httpd/modules/mod_auth_openidc.so`.

## Step 5: Configure Apache with mod_auth_openidc

1. Load the Module in Apache
   Open your Apache configuration file

    ```sh
    nano /opt/homebrew/etc/httpd/httpd.conf
    ```

    Add:

    ```apache
    LoadModule auth_openidc_module /path/to/mod_auth_openidc.so
    ```

    !!! tip
        Load this module only once to avoid conflicts.

## Step 6: Create the OIDC Virtual Host Configuration

1. Create `/opt/homebrew/etc/httpd/extra/httpd-oidc.conf` with the following content:

   ```apache
   Listen 8002
   <VirtualHost *:8002>
       ServerName localhost

       OIDCCryptoPassphrase a-random-secret-value

       OIDCProviderMetadataURL https://localhost:9443/oauth2/oidcdiscovery/.well-known/openid-configuration

       OIDCClientID YOUR_CLIENT_ID
       OIDCClientSecret YOUR_CLIENT_SECRET
       OIDCRedirectURI http://localhost:8002/callback

       OIDCRemoteUserClaim sub
       OIDCSSLValidateServer Off

       ProxyPass / http://localhost:8080/
       ProxyPassReverse / http://localhost:8080/

       <Location />
           AuthType openid-connect
           Require valid-user
       </Location>
   </VirtualHost>
   ```

   !!! note
    - Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with your actual values from WSO2 Identity Server
    - The setup assumes the following services are running locally with these default ports:
        - WSO2 Identity Server: https://localhost:9443
        - Apache with mod_auth_openidc: http://localhost:8002
        - Back-end Service (API or Web Application): http://localhost:8080

2. Include the OIDC configuration in main httpd.conf

   Open your Apache configuration file:

   ```sh
   nano /opt/homebrew/etc/httpd/httpd.conf
   ```

   ```apache
   Include /opt/homebrew/etc/httpd/extra/httpd-oidc.conf
   ```

3. Start Apache

```sh
sudo apachectl restart
```

## Try it out

Now that you’ve set up {{product_name}}, the sample application (or your own), and mod_auth_openidc Apache HTTPD module, follow the steps below to test them in action.

1. Log in to your app through Apache server by visiting [http://localhost:8002](http://localhost:8002){: target="_blank"}. You will be redirected to the login page of {{product_name}}.

2. Log in with an existing user.

    !!! note
       The app URL `https://localhost:8080` is no longer used directly. Instead, use the new proxy URL of Apache server.

3. After successfully logging in, the mod_auth_openidc module automatically injects OIDC claims into HTTP headers for your back-end application. You can access user information through headers like:

    - `OIDC_CLAIM_sub`: User identifier
    - `OIDC_CLAIM_org_name`: Organization name
    - `OIDC_access_token`: Access token
    - `OIDC_id_token`: ID token

    ![mod_auth_openidc logged in showing successful authentication and user information]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/mod_auth_openidc_logged_in.png)

    !!! tip
        Configure which claims to forward to your back-end:

        ```apache
        OIDCRemoteUserClaim sub
        OIDCClaimPrefix "OIDC_CLAIM_"
        OIDCClaimDelimiter "_"
        ```

### Securing the connection between {{product_name}} and mod_auth_openidc

Add to your VirtualHost configuration:

```apache
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/cert.key
    
    # ... rest of your OIDC configuration
</VirtualHost>
```


### Configuring Session management

Configure session handling:

```apache
OIDCSessionInactivityTimeout 3600
OIDCSessionMaxDuration 86400
OIDCCookieHTTPOnly On
OIDCCookieSecure Off  # Set to On for production HTTPS
```

Now that you’ve successfully connected {{product_name}} with mod_auth_openidc module, you can leverage this integration to:

- Add authentication to applications that lack native OIDC support.

- Replace custom or insecure authentication methods.

- Centralize and simplify authentication logic.

This setup secures dashboards, microservices, and legacy apps, improving stack security, scalability, and maintainability.
