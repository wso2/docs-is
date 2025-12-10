# Integrate mod_auth_openidc with WSO2 Identity Server

[mod_auth_openidc](https://github.com/zmartzone/mod_auth_openidc){: target="_blank"} is an Apache HTTP Server module that provides OpenID Connect authentication. It acts as a reverse proxy that authenticates users via an external OIDC provider (like WSO2 Identity Server) and forwards identity information to your back-end app via HTTP headers. This guide explains how you can connect {{product_name}} with mod_auth_openidc.

![mod_auth_openidc flow diagram showing authentication flow between client, Apache with mod_auth_openidc, WSO2 Identity Server, and back-end application]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/mod_auth_openidc_architecture.png)

## Prerequisites

- A package manager (for example apt, yum, Homebrew) to install Apache HTTPD.

- An application with a back-end. If you don't have one, you can use this [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

## Step 1: Install and run {{product_name}}

Follow the following steps below to download and install {{product_name}}. Refer to the [quick setup]({{base_path}}/get-started/quick-set-up/) to learn more.

1. Download the latest {{product_name}} version from the [website](https://wso2.com/identity-server/){: target="_blank"}.

2. Unzip the archive using the following command:

      ```sh
      unzip wso2is-<version>.zip
      # Replace <version> with your downloaded version, e.g., wso2is-7.1.0
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

    ![Fill app details step showing the application configuration form with name and callback URL fields]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/fill-app-details-step-modauth.png)

4. Take note of the **Client ID** and **Client Secret** generated for your application.

     ![Copy client credentials step showing the generated client ID and client secret]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/copy-client-credentials-step.png)

## Step 3: (Optional) Set up sample application

If you have your own application, you can skip this step. If you want to use the sample Java application, follow the steps below to set it up.

1. Download the [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

2. Use the following command to run the application.

      ```java
      cd path/to/app/folder
      java -jar request-logger.jar
      ```

3. Go to `http://localhost:8080` and verify that the application works.

      ![Sample app running showing the application startup and running status]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/sample-app-running.png)

## Step 4: Install Apache and mod_auth_openidc

Follow the steps below to install Apache httpd and the required dependencies.

!!! note

    The commands below assume a macOS environment. Use the corresponding package manager in your environment for installations. To learn more, refer to the [Apache httpd documentation](https://httpd.apache.org/docs/2.4/install.html){: target="_blank"}.

1. Install Apache httpd if you don't have it already.

    ```sh
    brew install httpd
    ```

2. Install the following dependencies required by mod_auth_openidc.

    ```sh
    brew install jansson cjose libcurl
    ```

3. Clone and build mod_auth_openidc.

    ```sh
    git clone https://github.com/zmartzone/mod_auth_openidc.git
    cd mod_auth_openidc
    ./autogen.sh
    ./configure --with-apxs=$(which apxs)
    make
    make install
    ```

    !!! tip "Troubleshoot build errors"

        Homebrew may install dependencies in non-standard locations, which can cause the installation to fail. 

        If the `./configure --with-apxs=$(which apxs)` command fails, try specifying the exact paths to the dependencies:

        ```sh
        ./configure --with-apxs2=/opt/homebrew/bin/apxs \
            --with-openssl=/opt/homebrew/opt/openssl@3 \
            --with-jansson=/opt/homebrew/opt/jansson \
            --with-cjose=/opt/homebrew/opt/cjose
        make
        make install
        ```

        After building, the .so module should appear in `/opt/homebrew/lib/httpd/modules/mod_auth_openidc.so`.

## Step 5: Configure Apache to use mod_auth_openidc with {{product_name}}

The following steps explain how to configure mod_auth_openidc to act as a reverse proxy and authenticate users via WSO2 Identity Server.

1. Open your Apache configuration file at `/opt/homebrew/etc/httpd/httpd.conf` and add the following line to load the mod_auth_openidc module

    ```apache
    LoadModule auth_openidc_module /path/to/mod_auth_openidc.so
    ```

    !!! tip
        Load this module only once to avoid conflicts.

2. Create a new file at `/opt/homebrew/etc/httpd/extra/httpd-oidc.conf` and add the following content. This file will contain the VirtualHost configuration for OIDC authentication.

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

        - Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the client ID and the client secret you received earlier when registering the application in {{product_name}}.

        - This sample configuration file assumes that the following services run on the specified ports. If your setup differs, adjust the configuration accordingly.
            - WSO2 Identity Server: `https://localhost:9443`
            - Apache with mod_auth_openidc: `http://localhost:8002`
            - Back-end Service (API or Web application): `http://localhost:8080`

3. Open the Apache configuration file at `/opt/homebrew/etc/httpd/httpd.conf` and include the following line to include the VirtualHost configuration file you created above.

    ```apache
    Include /opt/homebrew/etc/httpd/extra/httpd-oidc.conf
    ```

4. Start Apache.

    ```sh
    sudo apachectl restart
    ```

## Try it out

Now that you’ve set up {{product_name}}, the sample application (or your own), and mod_auth_openidc Apache HTTPD module, follow the steps below to test them in action.

1. Log in to your app through the Apache server by visiting `http://localhost:8002`. You will be redirected to the login page of {{product_name}}.

2. Log in with an existing user.

3. After successfully logging in, the mod_auth_openidc module automatically injects OIDC claims into HTTP headers for your back-end application. You can access user information through headers like:

    - `OIDC_CLAIM_sub`: User identifier
    - `OIDC_CLAIM_org_name`: Organization name
    - `OIDC_access_token`: Access token
    - `OIDC_id_token`: ID token

    ![mod_auth_openidc logged in showing successful authentication and user information]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/mod_auth_openidc_logged_in.png)

    !!! tip

        Include these configurations in your `httpd-oidc.conf` VirtualHost file to control which claims mod_auth_openidc forwards to the application.

        ```apache
        OIDCRemoteUserClaim sub
        OIDCClaimPrefix "OIDC_CLAIM_"
        OIDCClaimDelimiter "_"
        ```

        Learn more about these configurations in the [Apache documentation](https://github.com/OpenIDC/mod_auth_openidc/blob/master/auth_openidc.conf){: target="_blank"}.

## Advanced configurations

You can enhance the integration between {{product_name}} and mod_auth_openidc with the following advanced options.

### Encrypt connections with TLS

To encrypt communication between clients and mod_auth_openidc, you can enable TLS. To do so, add the following to your `httpd-oidc.conf` VirtualHost configuration file:

```apache
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/cert.key
    
    # ... rest of your OIDC configurations
</VirtualHost>
```

### Configure sessions handling

To manage user sessions for mod_auth_openidc, add the following directives to your `httpd-oidc.conf` VirtualHost configuration:

```apache
OIDCSessionInactivityTimeout 3600
OIDCSessionMaxDuration 86400
OIDCCookieHTTPOnly On
OIDCCookieSecure Off  # Set to On for production HTTPS
```

Learn more about these configurations in the [Apache documentation](https://github.com/OpenIDC/mod_auth_openidc/blob/master/auth_openidc.conf){: target="_blank"}.

---

Now that you’ve successfully connected {{product_name}} with mod_auth_openidc module, you can leverage this integration to:

- Add authentication to applications that lack native OIDC support.

- Replace custom or insecure authentication methods.

- Centralize and simplify authentication logic.

This setup secures dashboards, microservices, and legacy apps, improving stack security, scalability, and maintainability.
