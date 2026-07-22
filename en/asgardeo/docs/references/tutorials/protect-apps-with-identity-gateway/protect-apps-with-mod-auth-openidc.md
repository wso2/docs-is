# Integrate Mod Auth OpenIDC with {{product_name}}

[Mod Auth OpenIDC](https://github.com/zmartzone/mod_auth_openidc){: target="_blank"} is an Apache HTTP Server module that provides OpenID Connect authentication. It acts as a reverse proxy that authenticates users via an external OIDC provider (like {{product_name}}) and forwards identity information to your back-end app via HTTP headers. This guide explains how you can connect {{product_name}} with Mod Auth OpenIDC.

![Mod Auth OpenIDC flow diagram showing authentication flow between client, Apache with Mod Auth OpenIDC, {{product_name}}, and back-end application]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/mod_auth_openidc_architecture.png)

## Prerequisites

- A {{product_name}} organization. If you don't have one, [create a free account]({{base_path}}/get-started/create-asgardeo-account/).

- A package manager (for example apt, yum, Homebrew) to install Apache HTTPD.

- An application with a back-end. If you don't have one, you can use this [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

## Step 1: Register an OIDC application

To connect your Mod Auth OpenIDC Apache HTTPD module to {{product_name}}, you need to register it as an application. To do so,

1. Sign in to the [{{product_name}} Console](https://console.asgardeo.io/){: target="_blank"} and go to your organization.

2. [Register a Traditional Web Application]({{base_path}}/guides/applications/register-oidc-web-app/) with the **OpenID Connect** protocol and the following details:

    - **Name** - mod-auth-app
    - **Authorized redirect URL** - The URL where {{product_name}} sends the authentication response after login. For example: `http://localhost:8002/oauth2/callback` (or your proxy callback URL).

3. Take note of the **Client ID** and **Client Secret** [generated for your application]({{base_path}}/guides/applications/register-oidc-web-app/#get-the-client-id-and-secret).

## Step 2: (Optional) Set up sample application

If you have your own application, you can skip this step. If you want to use the sample Java application, follow the steps below to set it up.

1. Download the [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

2. Use the following command to run the application.

      ```java
      cd path/to/app/folder
      java -jar request-logger.jar
      ```

3. Go to `http://localhost:8080` and verify that the application works.

      ![Sample app running showing the application startup and running status]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/sample-app-running.png)

## Step 3: Install Apache and Mod Auth OpenIDC

Follow the steps below to install Apache httpd and the required dependencies.

!!! note

    The commands below assume a macOS environment. Use the corresponding package manager in your environment for installations. To learn more, refer to the [Apache httpd documentation](https://httpd.apache.org/docs/2.4/install.html){: target="_blank"}.

1. Install Apache httpd if you don't have it already.

    ```sh
    brew install httpd
    ```

2. Install the following dependencies required by Mod Auth OpenIDC.

    ```sh
    brew install jansson cjose libcurl
    ```

3. Clone and build Mod Auth OpenIDC.

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

## Step 4: Configure Apache to use Mod Auth OpenIDC with {{product_name}}

The following steps explain how to configure Mod Auth OpenIDC to act as a reverse proxy and authenticate users via {{product_name}}.

1. Open your Apache configuration file at `/opt/homebrew/etc/httpd/httpd.conf` and add the following line to load the Mod Auth OpenIDC module

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

        OIDCProviderMetadataURL https://api.asgardeo.io/t/<organization_name>/oauth2/token/.well-known/openid-configuration

        OIDCClientID YOUR_CLIENT_ID
        OIDCClientSecret YOUR_CLIENT_SECRET
        OIDCRedirectURI http://localhost:8002/callback

        OIDCRemoteUserClaim sub
        OIDCSSLValidateServer On

        ProxyPass / http://localhost:8080/
        ProxyPassReverse / http://localhost:8080/

        <Location />
            AuthType openid-connect
            Require valid-user
        </Location>
    </VirtualHost>
    ```

    !!! note

        - Replace `<organization_name>` with the name of your {{product_name}} organization.

        - Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the client ID and the client secret you received earlier when registering the application in {{product_name}}.

        - This sample configuration file assumes that the following services run on the specified endpoints. If your setup differs, adjust the configuration accordingly.
            - {{product_name}}: `https://api.asgardeo.io/t/<organization_name>`
            - Apache with Mod Auth OpenIDC: `http://localhost:8002`
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

Now that you’ve set up {{product_name}}, the sample application (or your own), and Mod Auth OpenIDC Apache HTTPD module, follow the steps below to test them in action.

1. Log in to your app through the Apache server by visiting `http://localhost:8002`. You will be redirected to the login page of {{product_name}}.

2. Log in with an existing user.

3. After successfully logging in, the Mod Auth OpenIDC module automatically injects OIDC claims into HTTP headers for your back-end application. You can access user information through headers like:

    - `OIDC_CLAIM_sub`: User identifier
    - `OIDC_CLAIM_org_name`: Organization name
    - `OIDC_access_token`: Access token
    - `OIDC_id_token`: ID token

    ![Mod Auth OpenIDC logged in showing successful authentication and user information]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/mod_auth_openidc_logged_in.png)

    !!! tip

        Include these configurations in your `httpd-oidc.conf` VirtualHost file to control which claims Mod Auth OpenIDC forwards to the application.

        ```apache
        OIDCRemoteUserClaim sub
        OIDCClaimPrefix "OIDC_CLAIM_"
        OIDCClaimDelimiter "_"
        ```

        Learn more about these configurations in the [Apache documentation](https://github.com/OpenIDC/mod_auth_openidc/blob/master/auth_openidc.conf){: target="_blank"}.

## Advanced configurations

You can enhance the integration between {{product_name}} and Mod Auth OpenIDC with the following advanced options.

### Encrypt connections with TLS

To encrypt communication between clients and Mod Auth OpenIDC, you can enable TLS. To do so, add the following to your `httpd-oidc.conf` VirtualHost configuration file:

```apache
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/cert.key
    
    # ... rest of your OIDC configurations
</VirtualHost>
```

### Configure sessions handling

To manage user sessions for Mod Auth OpenIDC, add the following directives to your `httpd-oidc.conf` VirtualHost configuration:

```apache
OIDCSessionInactivityTimeout 3600
OIDCSessionMaxDuration 86400
OIDCCookieHTTPOnly On
OIDCCookieSecure Off  # Set to On for production HTTPS
```

Learn more about these configurations in the [Apache documentation](https://github.com/OpenIDC/mod_auth_openidc/blob/master/auth_openidc.conf){: target="_blank"}.

---

Now that you’ve successfully connected {{product_name}} with Mod Auth OpenIDC module, you can leverage this integration to:

- Add authentication to applications that lack native OIDC support.

- Replace custom or insecure authentication methods.

- Centralize and simplify authentication logic.

This setup secures dashboards, microservices, and legacy apps, improving stack security, scalability, and maintainability.
