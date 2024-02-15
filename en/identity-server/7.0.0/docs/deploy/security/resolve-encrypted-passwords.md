# Resolve Encrypted Passwords

To secure plaintext passwords in configuration files using Secure Vault, the keystore and private key passwords from the primary keystore are essential. They serve as the root passwords for Secure Vault, as they are needed to decrypt values stored by the Secret Manager in the secret repository. The Secret Callback handler is utilized to access and manage these passwords.
For more information on Secure Vault implementation in the WSO2 Identity Server and to know more about how passwords in configuration files are encrypted, see [here]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).

The default secret CallbackHandler in the WSO2 Identity Server provides two options for reading these encrypted passwords when you start the server.

## Enter password in command-line

1. Start the server by running the start-up script from the `<IS_HOME>/bin/` directory as shown below.

    ``` console
    ./wso2server.sh 
    ```

2. You will be prompted to enter the KeyStore and Private Key Password before starting the server.

    This is because, to connect to the default user store, the encrypted passwords should be decrypted. The administrator starting the server must provide the private key and keystore passwords using the command line. Note that passwords are hidden from the terminal and log files.

## Start server as a background job

If you start the WSO2 Carbon server as a background job, you will not be able to provide password values on the command line. Therefore, you must start the server in daemon mode as explained below.

1. Create a new file in the `<IS_HOME>` directory. The file should be named according to your OS.

    === "Linux"
        ```
        password-tmp
        ```

    === "Windows"
        ```
        password-tmp.txt
        ```

    !!! note
        When you start the server (see step 3 below), the keystore password will be picked from this new file. Note that this file is automatically deleted from the file system after the server starts. Therefore, the admin has to create a new text file every time the
        server starts.

        Alternatively, if you want to retain the password file after the server starts, the file should be named as follows.

        === "Linux"
            ```
            password-persist
            ```

        === "Windows"
            ```
            password-persist.txt
            ```

2. Add `wso2carbon` (the primary keystore password) to the new file and save. By default, the password provider assumes that both private key and keystore passwords are the same. If not, the private key password must be entered in the second line of the file.

3. Start the server as a background process by running the product start-up script from the `<IS_HOME>/bin` directory by executing the following command.

    ```
    wso2server.sh start
    ```

!!! info
    For information on customizing secure vault implementation see [Customize Secure Vault]({{base_path}}/deploy/security/customize-secure-vault).