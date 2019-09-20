# Encrypting Passwords with Cipher Tool


The instructions on this page explain how plain text passwords in configuration files can be encrypted using the secure vault implementation that is built into WSO2 Identity Server. 

You can customize the default secure vault configurations in the product by implementing a new secret repository, call back handler etc.   

!!! tip "Before you begin"
    - If you are using Windows, you need to have **Ant** (<http://ant.apache.org/>) installed before using the Cipher Tool.
    - If required, you can enable [single key encryption](../../administer/using-symmetric-encryption) instead of (the default) asymmetric encryption.

### Encrypting passwords

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory and add the `[secrets]` configuration section as shown below. Give an alias for the password type followed by the actual password. The following example lists the most common passwords in configuration files.

    ```toml
    [secrets]
    admin_password = "password_2"
    keystore_password = "password_3"
    key_password = "password_4"
    truststrore_password = "password_5"
    log4j.appender.LOGEVENT.password = "password_6"
    ```

2. Navigate to the <IS_HOME>/bin/ directory in a command prompt, and execute the following command (You must first enable the Cipher tool for the product by executing the `-Dconfigure` command with the cipher tool script as shown below).
    * On Linux: `./ciphertool.sh -Dconfigure`
    * On Windows: `./ciphertool.bat -Dconfigure`

3. Go back to the `deployment.toml` file and see that the alias passwords are encrypted.
    ```toml
    [secrets]
    admin_password = "encrypted_pass_2"
    keystore_password = "encrypted_pass_3"
    key_password = "encrypted_pass_4"
    truststrore_password = "encrypted_pass_5"
    ```

## Using encrypted passwords
When you have [encrypted passwords](#encrypting-passwords), you can refer them from the relevant configuration files: The `deployment.toml` file or LOG4j properties.

### Passwords in deployment.toml

You can add the encrypted password to the relevant sections in the `deployment.toml` file by using a place holder: `$ref{alias}`. 

!!! note 
    You can also replace your passwords by refering values passed by environment variables and system properties. See [Set Passwords using Environment Variables/System Properties](../../administer/set_passwords-using_environment_variables_or_system_properties)

```toml
[super_admin]
username="admin"
password="$ref{admin_password}"

[keystore.tls]
password = "$ref{keystore_password}" 
alias = "$ref{keystore_password}" 
key_password = "$ref{key_password }"  

[truststore]                  
password = "$ref{keystore_password}" 
```

### Passwords in LOG4j properties
For example, consider the 'log4j.appender.LOGEVENT.password' in the log4j.properties file. You can refer the [encrypted password](#encrypting-passwords) form the log4j.properties file as shown below.

```
log4j.appender.LOGEVENT.password=secretAlias:log4j.appender.LOGEVENT.password
```

## Changing encrypted passwords

To change any password that we have encrypted already, follow the below steps:

1. Be sure to shut down the server.
2. Navigate to the <IS_HOME>/bin/ directory in a command prompt, where the cipher tool scripts (for Windows and Linux) are stored.
3. Execute the following command for your OS:
    * On Linux: `./ciphertool.sh -Dconfigure`
    * On Windows: `./ciphertool.bat -Dconfigure`
   It will prompt for the primary keystore password. Enter the keystore password (which is `wso2carbon` for the default keystore).
5. The alias values of all the passwords that you encrypted will now be shown in a numbered list.
6. The system will then prompt you to select the alias of the password which you want to change. Enter the list number of the password alias.
7. The system will then prompt you (twice) to enter the new password. Enter your new password.

## Resolving encrypted passwords

There are two ways to resolve encrypted passwords:

!!! note 
    If you have secured the plain text passwords in configuration files using Secure Vault, the keystore password and private key password of the product's [primary keystore](../../administer/configuring-keystores-in-wso2-products) will serve as the root passwords for Secure Vault. This is because the keystore passwords are needed to initialise the values encrypted by the **Secret Manager** in the **Secret Repository**. Therefore, the **Secret Callback handler** is used to resolve these passwords. The default secret CallbackHandler provides the two options given below. Read more about [Secure Vault concepts](../../administer/carbon-secure-vault-implementation).

### Enter password in command-line
1. Start the server by running the product start up script from the `<IS_HOME>/bin/` directory as shown below.
   ```
   ./server.sh
   ```
2. When you run the startup script, the following message will be prompted before starting the server: `[Enter KeyStore and Private Key Password:]`. This is because, in order to connect to the default user store, the encrypted passwords should be decrypted. The administrator starting the server must provide the private key and keystore passwords using the command-line. Note that passwords are hidden from the terminal and log files.

### Start server as a background job

If you start the Micro Integrator as a background job, you will not be able to provide password values on the command line. Therefore, you must start the server in "daemon" mode as explained below.

1. Create a new file in the <IS_HOME> directory. The file should be named according to your OS as explained below.

    * For Linux: The file name should be `password-tmp`.
    * For Windows: The file name should be `password-tmp.txt`.

2. Add the primary keystore password (which is "wso2carbon" by default) to the new file and save. By default, the password provider assumes that both private key and keystore passwords are the same. If not, the private key password must be entered in the second line of the file.

3. Now, start the server as a background process by running the following command.
   ```
   ./server.sh start
   ```
4. Start the server by running the product start-up script from the MI_HOME/bin directory by executing the following command:
   ```
   daemon. sh server.sh -start
   ```
