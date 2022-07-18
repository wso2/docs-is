# Configuring multi-factor authentication for the management console

## Prerequisites
- You need to [create a service provider](../applications/register-sp.md).

## Configure MFA for the management console

To configure MFA for the management console, initially:

1. On the management console, go to **Main** > **Identity** > **Service Providers** > **List**.

2. Click **Edit** on the service provider you wish to configure.

    Configuration of MFA for the management console contains three configuration sections as follows:

    1. [Inbound authentications configurations](#inbound-authentications-configurations)
    2. [Local and outbound Authentication configurations](#local-and-outbound-authentication-configurations)
    3. [Local configurations on `deployment.toml`](#local-configurations-on-deploymenttoml)


### Inbound authentications configurations

To configure inbound authentication for the management console:

3. Expand the **Inbound Authentication Configuration > SAML2 Web SSO Configuration** section and click **Configure**.

4. Enter the following details under **Manual Configuration**:

    | Field name    | Value |
    |---------------|-------|
    | Issuer    | carbonServer  |
    | Assertion Consumer URLs   | https://localhost:9443/acs    |
    | Enable Response Signing   | Selected  |

5. Click **Register** to save the configurations.

### Local and outbound Authentication configurations

To configure local and outbound authentication for the management console:

1. Expand the **Local and Outbound Authentication Configuration** section and click **Advanced Configuration**.

2. Click **Add Authentication Step** to add an authentication step.

3. For both authentication steps, select the authenticator from **Local Authenticators** and click **+ Add Authenticator** to add the authenticator.

    !!! info
        - **Use subject identifier from this step** and **Use attributes from this step** will be selected by default. If you wish to set multiple steps, you can have only one step as the subject step and one as the attribute step.
        - Note that you cannot use `jwt-basic` option as an authentication step.

4. Click **Update** to save the configurations.

5. Enable the following options:
    - Use tenant domain in local subject identifier
    - Use user store domain in local subject identifier

    !!! info
        Leave the default configurations as it is.

6. Click **Update** to save the configurations.

### Local configurations on `deployment.toml`

To configure the local configuration on the IS:

1. Shut down the Identity server, and open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory.

2. Add the following configuration to the `deployment.toml` file:

    ``` javascript
    [admin_console.authenticator.saml_sso_authenticator]
    enable=true
    priority="1"
    assertion_consumer_service_url = "https://localhost:9443/acs"
    identity_provider_sso_service_url = "https://localhost:9443/samlsso"
    ```

3. Save the configurations.

## Try it out

1. Start the Identity Server.

2. Access the following URL: `https://localhost:9443/`

3. Enter your user credentials for the first authentication step.

    ![basic-authentication]({{base-path}}/assets/img/guides/basic-authentication-mfa.png)

4. On successful authentication, you will be prompted for the second authentication step. Enter the TOTP code and click **Continue**.

    ![TOTP verification]({{base-path}}/assets/img/samples/totp-code-verification.png)

    !!! info
        If this is the first time you use the TOTP authentication method for the application, you need to scan the QR from an authenticator application of your choice.

You will now be successfully logged into the management console.