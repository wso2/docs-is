# Encrypting Passwords with Cipher Tool


The instructions on this page explain how plain text passwords in configuration files can be encrypted using the secure vault implementation that is built into WSO2 Identity Server.  

!!! tip "Before you begin"
    - If you are using Windows, you need to have **Ant** (<http://ant.apache.org/>) installed before using the Cipher Tool.
    - If required, you can enable [single key encryption](../../administer/using-symmetric-encryption) instead of (the default) asymmetric encryption.

### Encrypting passwords

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory and add the `[secrets]` configuration section **at the bottom of the file** as shown below. Give an alias for the password type followed by the actual password. The following example lists the most common passwords in configuration files.

    ```toml
    [secrets]
    admin_password = "[password_1]"
    keystore_password = "[password_2]"
    key_password = "[password_3]"
    truststrore_password = "[password_4]"
    "log4j.appender.LOGEVENT.password" = "[password_5]"
    ```

2. Navigate to the <IS_HOME>/bin/ directory in a command prompt, and execute the following command (You must first enable the Cipher tool for the product by executing the `-Dconfigure` command with the cipher tool script as shown below).
    * On Linux: `./ciphertool.sh -Dconfigure`
    * On Windows: `./ciphertool.bat -Dconfigure`

3. Go back to the `deployment.toml` file and see that the alias passwords are encrypted.
    
    ```toml
    [secrets]
    admin_password = "GeNld2aZkydnIZGtkZYOnXlVzl8WBtZzAQ8kIoR5c7aHmyUkWTag7w4dG6B3JK5GxeX9bhsmZCBFozlPdWBT6Jvy"
    keystore_password = "brClL1SOHdezXTvBz1/76b/DnHQgxjNGtzhaBr3DnhHw32NWY484abHLREVyMoNJkER5lQUPbqeaMpR5lQUPbqeaMp"
    key_password = "CFAaISaI19dHLApEM3usNSDXXdhdicHbVncrVwuLDJp6Rhp8B3Qy3PnBhcJsryTqR/EPwdLnXboNJkER"
    truststrore_password = "DKnecEw+mJ8JhTUrqxpTZxwXrOdtcoAl2hD3LHtH+yJXNogumdSALfaqrMaknBzJq4SF3sY0RvwkMxWhnZ+BhIsko"
    "log4j.appender.LOGEVENT.password" = "kydnIZGtkZYOnXlVzl8WBtZzAQ8kIoR5c7aHmyUkWTagXTvBz1/76b/DnHQgxjNhD3LHtH+yJXNowecEEC"
    ```

## Using encrypted passwords
When you have [encrypted passwords](#encrypting-passwords), you can refer them from the relevant configuration files: The `deployment.toml` file or LOG4j properties.

### Passwords in deployment.toml

You can add the encrypted password to the relevant sections in the `deployment.toml` file by using a place holder: `$secret{alias}`. 

!!! note 
    You can also replace your passwords by referring values passed by environment variables and system properties. See [Set Passwords using Environment Variables/System Properties](../../administer/set-passwords-using-environment-variables-or-system-properties)

```toml
[super_admin]
username="admin"
password="$secret{admin_password}"

[keystore.tls]
password = "$secret{keystore_password}" 
alias = "$secret{keystore_password}" 
key_password = "$secret{key_password }"  

[truststore]                  
password = "$secret{keystore_password}" 
```

### Passwords in LOG4j properties
For example, consider the 'log4j.appender.LOGEVENT.password' in the log4j.properties file. You can refer the [encrypted password](#encrypting-passwords) from the log4j.properties file as shown below.

```
log4j.appender.LOGEVENT.password=secretAlias:log4j.appender.LOGEVENT.password
```

## Changing encrypted passwords

To change any password that we have encrypted already, follow the below steps:

1. Be sure to shut down the server.
2. Navigate to the <IS_HOME>/bin/ directory in a command prompt, where the cipher tool scripts (for Windows and Linux) are stored.
3. Execute the following command for your OS:
    * On Linux: `./ciphertool.sh -Dchange`
    * On Windows: `./ciphertool.bat -Dchange`
   It will prompt for the primary keystore password. Enter the keystore password (which is `wso2carbon` for the default keystore).
5. The alias values of all the passwords that you encrypted will now be shown in a numbered list.
6. The system will then prompt you to select the alias of the password which you want to change. Enter the list number of the password alias.
7. The system will then prompt you (twice) to enter the new password. Enter your new password.

!!! info
    For information on resolving the encrypted passwords, see [Resolving Encrypted Passwords](../../administer/resolving-encrypted-passwords).

    For information on customizing secure vault implementaion, see [Customizing Secure Vault](../../setup/customizing-secure-vault).
