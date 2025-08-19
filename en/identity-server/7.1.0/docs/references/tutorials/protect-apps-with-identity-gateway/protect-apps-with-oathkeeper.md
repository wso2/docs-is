# Integrate Ory Oathkeeper with WSO2 Identity Server

[Oathkeeper](https://github.com/ory/oathkeeper){: target="_blank"} is an open-source identity gateway that authenticates users through an external identity provider (such as {{product_name}}) and forwards user identity and session information to your back-end services via HTTP headers and cookies. This guide explains how you can connect {{product_name}} with Oathkeeper.

![Oathkeeper flow diagram showing authentication flow between client, Oathkeeper, WSO2 Identity Server, and back-end application]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/oathkeeper-architecture.png)

## Prerequisites

- **Go 1.16 or later**. To install Go, follow the steps in the [Go documentation](https://go.dev/doc/install){:target="_blank"}.

- An application with a back-end. If you don't have one, you can use this [sample application](https://github.com/wso2/samples-is/raw/refs/heads/master/identity-gateway/sample-request-logger-app/request-logger.jar){: target="_blank"}.

- (Optional) Redis server for session storage.

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

To connect Oathkeeper to {{product_name}}, you need to register it as an application. To do so,

1. On the {{product_name}} Console, go to **Applications** > **New Application**.

      ![Add application step showing the Applications menu and Add Application option]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/add-application-step.png)

2. Select **Traditional Web Application**.

      ![Select web app step showing the Traditional Web Application option]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/select-web-app-step.png)

3. Enter the following details and click **Create**.

      - **Name** - oathkeeper-app
      - **Protocol** - Select OpenID Connect
      - **Callback URL** -The URL where WSO2 Identity Server sends the authentication response after login. For example: `http://localhost:9444/oauth2/callback` (or your proxy callback URL)

      ![Fill app details step showing the application configuration form with name and callback URL fields]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/fill-app-details-step-oathkeeper.png)

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

## Step 4: Install and configure Oathkeeper

Follow the steps below to set up Oathkeeper with {{product_name}}.

1. Create a new directory and navigate to it.

      ```bash
      mkdir oathkeeper-demo
      cd oathkeeper-demo
      ```

2. Fork and clone the [Oathkeeper repository](https://github.com/ory/oathkeeper.git){: target="_blank"}.

      ```bash
      git clone --branch v0.40.9 --single-branch https://github.com/<your-github-username>/  oathkeeper.git
      cd oathkeeper
      ```

3. Download all the customization files created for Oathkeeper from [this repository](https://github.com/wso2/samples-is/tree/master/identity-gateway/oathkeeper/customization-files){: target="_blank"}.

4. Make the following changes to your original Oathkeeper clone using the customization files you downloaded earlier, keeping the same file names.

    !!! note

        In the following files and folders:
        
          - `<OATHKEEPER_HOME>` refers to the root directory of your Oathkeeper clone.
          - `<CUSTOM_HOME>` refers to the root directory of the customization files.

    - Replace the following folders in `<OATHKEEPER_HOME>` with the corresponding folders from `<CUSTOM_HOME>` in the same relative path.

        - `<OATHKEEPER_HOME>/proxy/`
        - `<OATHKEEPER_HOME>/pipeline/errors/`

    - Replace the following files in `<OATHKEEPER_HOME>` with the corresponding files from `<CUSTOM_HOME>` in the same relative path.

        - `<OATHKEEPER_HOME>/driver/configuration/provider_koanf.go`
        - `<OATHKEEPER_HOME>/driver/configuration/provider.go`
        - `<OATHKEEPER_HOME>/driver/registry_memory.go`
        - `<OATHKEEPER_HOME>/rule/rule.go`

    - Add these files from `<CUSTOM_HOME>/pipeline/authn` to `<OATHKEEPER_HOME>/pipeline/authn`

        - `authenticator_callback.go`
        - `authenticator_callback_test.go`
        - `authenticator_session_jwt.go`
        - `authenticator_session_jwt_test.go`

    - Add these configuration schema from `<CUSTOM_HOME>/spec/pipeline/` to `<OATHKEEPER_HOME>/spec/pipeline/`

        - `Authenticators.callback.schema.json`
        - `Authenticators.session_jwt.schema.json`
        - `Errors.redirect.schema.json`
        - `Session_store.schema.json`

    - Replace the configuration file `<OATHKEEPER_HOME>/spec/config.schema.json` with `<CUSTOM_HOME>/spec/config.schema.json`.

    - To add Redis support, add the `<CUSTOM_HOME>/pipeline/session_store/` folder to `<OATHKEEPER_HOME>/pipeline/` folder.

5. To use a Redis server for advanced session or cache storage, install the Redis client library in your Oathkeeper project root.

     ```bash
     go get github.com/redis/go-redis/v9
     go mod tidy
     ```

6. Run the following command in the root directory of your Oathkeeper clone to compile the binary:

     ```bash
     go build -o ./bin/oathkeeper .
     ```

6. [Download](https://github.com/wso2/samples-is/tree/master/identity-gateway/oathkeeper/sample-configuration){: target="_blank"} the sample configuration and rule files.

7. Update the downloaded `config.yml` file with the following values.

    - This sample configuration file assumes that the following services run on the specified ports. If your setup differs, adjust the configuration accordingly.

        - WSO2 Identity Server: `https://localhost:9443`
        - Oathkeeper: `http://localhost:9444`
        - Back-end Service (API or Web Application): `http://localhost:8080`

    - Replace `<your_client_id>`, `<your_client_secret>` with the client ID and the client secret you received earlier when registering the application in {{product_name}}.

    - Under `access_rules`, specify the path to the rules file. You can use the sample rules file if you don't have your own.

    - The sample configuration file assumes a system with a Redis server. If you don't have one, remove the session store configurations and add this:

        ```yaml
        # Session store configuration
        session_store:
          type: memory
        ```

    - The sample configuration file also assumes TLS encryption. If you don't use it, make the following changes.

        - Change the proxy port to `4455`. The default port `9444` uses TLS.

            ```yaml
            proxy:
              port: 4455

            ```

        - Remove TLS-related configurations:

            ```yaml
            tls:
              cert:
                path: /path/to/certificates/cert.pem
              key:
                path: /path/to/certificates/key.pem
            ```

8. Start Oathkeeper:

    ```bash
    ./bin/oathkeeper serve --config /path/to/config.yml
    ```

!!! note "Learn more"

    Refer to the Oathkeepr documentation for more information on [Oathkeeper configurations](https://www.ory.sh/docs/oathkeeper/configure-deploy){: target="_blank"}.

## Try it out

Now that you’ve set up {{product_name}}, the sample application (or your own), and Oathkeeper, follow the steps below to test them in action.

1. Log in to your app through Oathkeeper by visiting `http://localhost:9444/home`. You will be redirected to the login page of {{product_name}}.

2. Log in with an existing user.

3. After successfully logging in, Oathkeeper forwards identity headers (for example X-User, X-User-Name, X-User-Email) to your application.

    ![Oathkeeper logged in showing successful authentication and user information]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/oathkeeper-logged-in.png)

## Advanced configurations

You can enhance the integration between {{product_name}} and Oathkeeper with the following advanced options.

### Integrate a Redis server for storing sessions

By default, Oathkeeper keeps sessions in memory. While this works for single-instance deployments, using Redis as a central session store provides better performance and consistency across multiple instances.

If you have a Redis server, add the following to your `config.yml` configuration file to connect it.

!!! tip "Before you begin"

    In Step 4, make sure the Oathkeeper binary is built with all necessary files and libraries required for Redis support.

```yaml
session_store:
  type: redis
  redis:
    addr: "127.0.0.1:6379"
    password: "<your_redis_password>"
    db: 0
    session_prefix: "session:"
    state_prefix: "state:"
    ttl: "24h"
```

!!! note

    Redis connection URL takes the following format:

    ```bash
    redis://[:password@]host[:port][/db-number]
    ```

### Encrypt connections with TLS

To encrypt communication between clients and OAuth2 Proxy, you can enable TLS. To do so, add the following to your `config.yml` configuration file:

```yaml
port: 9444
tls:
  cert:
    path: "/path/to/cert.pem"
  key:
    path: "/path/to/cert.key"
```

!!! note "Generate a self-signed TLS certificate"

    To create a self-signed TLS certificate for development purposes, run the following command. For production environments, always use a certificate issued by a trusted Certificate Authority (CA), such as [Let's Encrypt](https://letsencrypt.org/){: target="_blank"}.

    ```sh
    openssl req -x509 -newkey rsa:2048 -nodes \
    -keyout /path/to/cert.key \
    -out /path/to/cert.pem \
    -days 365 \
    -subj "/CN=localhost"
    ```

---

Now that you’ve successfully connected {{product_name}} with Oathkeeper, you can leverage this integration to:

- Add authentication to applications that lack native OIDC support.

- Replace custom or insecure authentication methods.

- Centralize and simplify authentication logic.

This setup secures dashboards, microservices, and legacy apps, improving stack security, scalability, and maintainability.
