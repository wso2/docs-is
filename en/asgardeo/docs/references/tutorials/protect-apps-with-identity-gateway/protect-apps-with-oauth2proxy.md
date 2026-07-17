# Integrate OAuth2 Proxy with {{product_name}}

[OAuth2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy){: target="_blank"} is an open-source reverse proxy that authenticates users through an external OAuth2 provider (such as {{product_name}}) and forwards user identity information to your application via HTTP headers. This tutorial explains how you can connect {{product_name}} with OAuth2 Proxy.

You can use OAuth2 Proxy if you want to,

- add OAuth2/OIDC authentication to legacy apps without code changes.
- centralize authentication logic.
- forward user identity details (for example, username or email) as HTTP headers.

![OAuth2 Proxy flow diagram showing authentication flow between client, OAuth2 Proxy, {{product_name}}, and back-end application]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/oauth2proxy-architecture.png){: width: 500px;}

Follow the steps below to connect {{product_name}} with OAuth2 Proxy.

## Prerequisites

- A {{product_name}} organization. If you don't have one, [create a free account]({{base_path}}/get-started/create-asgardeo-account/).

- **Go 1.16 or later**. To install Go, follow the steps in the [Go documentation](https://go.dev/doc/install){:target="_blank"}.

- An application with a back-end. If you don't have one, you can use this [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

- (Optional) Redis for advanced session storage.

## Step 1: Register an OIDC application

To connect your OAuth2 Proxy reverse proxy to {{product_name}}, you need to register it as an application. To do so,

1. Sign in to the [{{product_name}} Console](https://console.asgardeo.io/){: target="_blank"} and go to your organization.

2. [Register a Traditional Web Application]({{base_path}}/guides/applications/register-oidc-web-app/) with the **OpenID Connect** protocol and the following details:

    - **Name** - oauth2-proxy-app
    - **Authorized redirect URL** - The URL where {{product_name}} sends the authentication response after login. For example: `http://localhost:4180/oauth2/callback` (or your proxy callback URL).

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

## Step 3: Install and configure OAuth2 Proxy

Follow the steps below to set up OAuth2 Proxy with {{product_name}}.

1. Install OAuth2 Proxy with Go by using the following command.

      ```go
      go install github.com/oauth2-proxy/oauth2-proxy/v7@latest
      ```

    !!! tip

        Refer to the [OAuth2 Proxy installation guide](https://oauth2-proxy.github.io/oauth2-proxy/installation/){: target="_blank"} for more information.

2. Create a configuration file named `oauth2-proxy.cfg` and include the following properties.

      ```ini
      provider = "oidc"
      oidc_issuer_url = "https://api.asgardeo.io/t/<organization_name>/oauth2/token"
      oidc_jwks_url = "https://api.asgardeo.io/t/<organization_name>/oauth2/jwks"
      redirect_url = "http://localhost:4180/oauth2/callback"
      
      client_id = "<your_client_id>"
      client_secret = "<your_client_secret>"
      
      email_domains = ["*"]
      scope = "openid email profile"
      
      set_xauthrequest = true
      skip_auth_preflight = false
      http_address = "127.0.0.1:4180"
      upstreams = ["http://localhost:8080"]
      
      pass_access_token = true
      pass_user_headers = true
      set_authorization_header = true
      code_challenge_method = "S256"
      user_id_claim = "username"
      
      cookie_secure = false
      cookie_samesite = "lax"
      cookie_csrf_per_request = false
      cookie_secret = "<your_32_byte_base64_secret>"
      ```

      - This sample configuration file assumes that the following services run on the specified endpoints. If your setup differs, adjust the configuration accordingly.

         - {{product_name}}: `https://api.asgardeo.io/t/<organization_name>`
         - OAuth2 Proxy: `http://localhost:4180`
         - Back-end Service (API or Web Application): `http://localhost:8080`

      - Replace `<organization_name>` with the name of your {{product_name}} organization.

      - Replace `<your_client_id>`, `<your_client_secret>` with the client ID and the client secret you received earlier when registering the application in {{product_name}}.

      - Generate a cookie secret and add it as `<your_32_byte_base64_secret>`.

    !!! tip

        Learn more about generating cookie secrets and other configurations from the [OAuth2 Proxy documentation](https://oauth2-proxy.github.io/oauth2-proxy/configuration/overview){: target="_blank"}.

3. Use one of the following methods to run OAuth2 Proxy.

    === "Run from binary"

        ```sh
        oauth2-proxy --config=/path/to/oauth2-proxy.cfg
        ```

    === "Run with Docker"

        ```sh
        docker run -p 4180:4180 \
        -v $(pwd)/oauth2-proxy.cfg:/etc/oauth2-proxy.cfg \
        quay.io/oauth2-proxy/oauth2-proxy:latest \
        --config /etc/oauth2-proxy.cfg
        ```

## Try it out

Now that you’ve set up {{product_name}}, the sample application (or your own), and OAuth2 Proxy, follow the steps below to test them in action.

1. Log in to your app through OAuth2 Proxy by visiting `http://localhost:4180/home`. You will be redirected to the login page of {{product_name}}.

2. Log in with an existing user.

3. After successfully logging in, OAuth2 Proxy forwards identity headers (for example X-Forwarded-User, X-Forwarded-Email) to your application.

      ![OAuth2 Proxy logged in showing successful authentication and user information]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/oauth2proxy-logged-in.png)

## Advanced configurations

You can enhance the integration between {{product_name}} and OAuth2 Proxy with the following advanced options.

### Integrate a Redis server for storing sessions

By default, OAuth2 Proxy keeps sessions in encrypted cookies. While this works for single-instance deployments, using Redis as a central session store offers better performance and consistency across multiple instances.

If you have a Redis server, add the following to your `oauth2-proxy.cfg` configuration file to connect it.

```ini
session_store_type = "redis"
redis_connection_url = "redis://127.0.0.1:6379/1"
```

!!! note

    Redis connection URL takes the following format:

    ```bash
    redis://[:password@]host[:port][/db-number]
    ```

### Encrypt connections with TLS

To encrypt communication between clients and OAuth2 Proxy, you can enable TLS. To do so, add the following to your `oauth2-proxy.cfg` configuration file:

```ini
http_address = "0.0.0.0:443"
cookie_secure = true
tls_cert_file = "/path/to/cert.pem"
tls_key_file = "/path/to/cert.key"
tls_min_version = "TLS1.3"  # Optional, for stronger security
```

!!! note "Generate a self-signed TLS certificate"

    To create a self-signed TLS certificate for development purposes, run the following command. For production environments, always use a certificate issued by a trusted Certificate Authority (CA), such as [Let’s Encrypt](https://letsencrypt.org/){: target="_blank"}.

    ```sh
    openssl req -x509 -newkey rsa:2048 -nodes \
    -keyout /path/to/cert.key \
    -out /path/to/cert.pem \
    -days 365 \
    -subj "/CN=localhost"
    ```

!!! tip "Learn more"

    Refer to the following documentation to learn more about these options.

    - [Session Storage](https://oauth2-proxy.github.io/oauth2-proxy/configuration/session_storage){: target="_blank"}.

    - [TLS encryption](https://oauth2-proxy.github.io/oauth2-proxy/configuration/tls){: target="_blank"}.

---

Now that you’ve successfully connected {{product_name}} with OAuth2 Proxy, you can leverage this integration to:

- Add authentication to applications that lack native OIDC support.

- Replace custom or insecure authentication methods.

- Centralize and simplify authentication logic.

This setup secures dashboards, microservices, and legacy apps, improving stack security, scalability, and maintainability.
