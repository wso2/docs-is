# Ory Oathkeeper - Customized for OpenID Connect authentication setup guide

This customized Oathkeeper setup functions as an identity-aware reverse proxy or an identity gateway. It authenticates incoming requests via WSO2 Identity Server (or any other identity provider), establishes a secure session by storing a session for each authenticated user, and forwards the request to the back-end service.

For authenticated users, it injects authentication details (such as tokens and user information) into HTTP headers before proxying the request. Upon receiving a response from the back-end, Oathkeeper captures it, attaches the necessary cookies, and then sends the complete response back to the client.

![Oathkeeper flow diagram showing authentication flow between client, Oathkeeper, WSO2 Identity Server, and back-end application]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/oathkeeper-architecture.png)

## Prerequisites

- Go 1.16 or later
- Redis server (for session storage)
  - Default port: 6379
  - Optional: Set a password for production use
- OIDC-compliant Identity Provider (for example WSO2 Identity Server 7.0.0 or later)
- Access to your back-end application

## Installation steps

Follow the below steps

### Step 1: Install and start WSO2 Identity Server

1. **Download WSO2 Identity server**
   Download the latest version of WSO2 Identity Server from: https://wso2.com/identity-server/

2. **Unzip the archive**
   Unzip the downloaded file:

   ```bash
   unzip wso2is-<version>.zip
   ```

   Note: Replace `<version>` with your downloaded version, for example `wso2is-7.0.0`.

3. **Start the server**
   Navigate to the bin directory:

   ```bash
   cd path/to/wso2is-<version>/bin
   ```

   Then run:

   ```bash
   ./wso2server.sh    # On Linux/macOS
   wso2server.bat     # On Windows
   ```

4. **Create an OIDC application**
   - Go to [https://localhost:9443/console](https://localhost:9443/console)
   - Login (default: `admin` / `admin`)
   - Navigate to **Applications → Add Application**
   ![Add application step showing the Applications menu and Add Application option]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/add-application-step.png)
   - Select **Traditional Web Application**
     ![Select web app step showing the Traditional Web Application option]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/select-web-app-step.png)
   - Fill in:
     - **Name:** `oathkeeper-app`
     - **Callback URL:** `http://localhost:9444/callback` (or your redirect URL)
       ![Fill app details step showing the application configuration form with name and callback URL fields]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/fill-app-details-step.png)
   - Save and copy the generated **Client ID** and **Client Secret**
     ![Copy client credentials step showing the generated client ID and client secret]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/copy-client-credentials-step.png)

### Step 2: Set up your back-end

If you don't already have a back-end implemented, you can download the [sample application](https://github.com/wso2/samples-is/tree/master/identity-gateway/sample-request-logger-app) for testing.

Once downloaded, run the app:

```bash
cd path/to/app/folder
java -jar request-logger.jar
```

![Sample app running showing the application startup and running status]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/sample-app-running.png)

- Visit [http://localhost:8080](http://localhost:8080) to verify it's running.

If the page loads successfully, your back-end is up and running.

### Step 3: Configure Oathkeeper

1. **Create and navigate to a new directory:**

   ```bash
   mkdir oathkeeper-demo
   cd oathkeeper-demo
   ```

2. **Fork the repository:**
  https://github.com/ory/oathkeeper.git

   Clone it:

   ```bash
   git clone --branch v0.40.9 --single-branch https://github.com/<your-github-username>/oathkeeper.git
   cd oathkeeper
   ```

3. **Download all the [customization files](https://github.com/wso2/samples-is/tree/master/identity-gateway/oathkeeper/customization-files)**

   Replace following folders and files:

   **Folders:**
   - root/proxy
   - root/pipeline/errors

   **Files:**
   - root/driver/configuration/provider_koanf.go
   - root/driver/configuration/provider.go
   - root/driver/registry_memory.go
   - root/rule/rule.go

   **Add the below authenticator files in:**
   - root/pipeline/authn
     - authenticator_callback.go
     - authenticator_callback_test.go
     - authenticator_session_jwt.go
     - Authenticator_session_jwt_test.go

   **Add session store folder to:**
   - root/pipeline

   **Add the following configuration schemas to:**
   - root/pipeline/spec
     - Authenticators.callback.schema.json
     - Authenticators.session_jwt.schema.json
     - Errors.redirect.schema.json
     - Session_store.schema.json

   **Replace root/config.schema.json**

   Run the following commands:

   ```bash
   go get github.com/redis/go-redis/v9

   go mod tidy
   ```

4. **Build from source:**

   ```bash
   go build -o ./bin/oathkeeper .
   ```

5. **Generate TLS certificates (for HTTPS):**

   ```bash
   # Create a directory for certificates
   mkdir -p certs
   cd certs
   # Generate self-signed certificates
   openssl req -x509 -newkey rsa:2048 -nodes \
     -keyout cert.key \
     -out cert.pem \
     -days 365 \
     -subj "/CN=localhost"
   ```

6. **Configure Oathkeeper:**
Download the [sample configuration files](https://github.com/wso2/samples-is/tree/master/identity-gateway/oathkeeper/sample-configuration)

   ```bash
   cp config.sample.yml config.yml
   cp rules.sample.json rules.json
   ```

7. **Update the configuration files:**
   - `config.yml`: Main configuration file
   - `rules.json`: Access rules configuration

8. **Start Oathkeeper:**

   ```bash
   ./bin/oathkeeper serve --config /path/to/config.yml
   ```

**Note**
      - The setup assumes the following services are running locally with these default ports:
         - WSO2 Identity Server: https://localhost:9443
         - Oathkeepeer: http://localhost:9444 (with TLS configuration)
         - Back-end Service (API or Web Application): http://localhost:8080

## Summary

This customizations of Ory Oathkeeper provides OIDC authorization code flow authentication for Ory Oathkeeper identity and access reverse proxy, improved session management with extensible session store, and comprehensive test coverage. The implementation offers flexible configuration options for identity providers including WSO2 Identity Server integration and back-end services, making it a secure and scalable solution for authentication needs.
