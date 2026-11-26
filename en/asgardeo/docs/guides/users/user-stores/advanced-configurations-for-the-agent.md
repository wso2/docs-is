# Advanced configuration for the remote agent

This guide covers advanced configuration options for the remote agent.

## Configure secrets

The remote user store agent is built-in with a secure vault implementation that allows parsing plain text passwords as encrypted secrets. The downloaded agent zip file contains a `ciphertool` that can be used to encrypt the secrets defined in the `deployment.toml` file. To encrypt secrets in the agent configuration file:

1. Add the following [secrets] configurations to the bottom of the `deployment.toml` file. Secrets can be listed with any alias and the value should be enclosed within double quotes and square brackets.

    === "Configuration format"
        
        ```toml
        [secrets]
        secret_alias = "[secret_value]"
        ```

    === "Example"

        ```toml
        [secrets]
        connection_password = "[adminpassword]"
        ```

2. You can use the encrypted secrets for configurations using the `$secret{alias}` format.

    ```toml
    [user_store]
    connection_password = "$secret{secret_alias}"
    ```

3. Configure and run the cipher tool to encrypt the secrets in the deployment.toml file.

    The agent's internal keystore is used to encrypt and decrypt the secrets. To encrypt the secrets, open a terminal and run the following command.

    === "Linux/Unix"

        ```bash
        ./ciphertool.sh -Dconfigure
        ```

    === "Windows"

        ```bash
        ciphertool.bat -Dconfigure
        ```

    !!! note

        When you configure secrets in the configuration file, the agent will prompt you to enter the keystore and private key passwords when starting the agent. The default password is `wso2carbon`.

4. Open the `deployment.toml` file again and see that the alias secrets are now encrypted.

    ```toml
    [secrets]
    connection_password = "xxxxxxx"
    ```

## Configure remote agent logs

The remote agent provides flexible options for configuring logs such as altering the log level. This helps with debugging and monitoring the agent's operations effectively.

To configure remote agent logs:

- The user store agent is shipped with `log4j2` logging capabilities. The log level can be set specifically for each appender in the `log4j2.properties` file by setting the threshold value.

    ```bash
    rootLogger.level = DEBUG
    ```

    Following levels can be configured.

    - **DEBUG**: Logs detailed information for debugging.
    - **INFO**: Logs general operational information.
    - **WARN**: Logs only the potential issues.
    - **ERROR**: Logs only the error events.
    - **FATAL**: Logs critical errors that may cause the application to terminate.

- Restart the agent to apply the changes.
