# Encrypt Passwords with the Cipher Tool


The instructions on this page explain how plain text passwords in configuration files can be encrypted using the secure vault implementation that is built into the WSO2 Identity Server.  

!!! tip "Before you begin"
    If you are using Windows, you need to have [**Ant**](http://ant.apache.org/) installed before using the Cipher Tool.

## Encrypt passwords

To encrypt passwords on the WSO2 Identity Server, you can use either asymmetric or symmetric encryption.

!!! important
    Symmetric encryption is recommended due to its enhanced security against potential quantum computing threats.

### Using Symmetric Encryption

!!! note
    To support symmetric encryption, an internal keystore of type PKCS12 must be used.

1. To create a PKCS12 keystore with an AES key or add an existing key to the keystore, use the following command. If the keystore is not available, new PKCS12 keystore will be created.

    ```bash
    keytool -genseckey -alias wso2carbon -keyalg AES -keysize 256 -keystore internal.p12 -storetype pkcs12 -storepass password -keypass password
    ```

2. Update the alias to the new alias in the `deployment.toml` file for the internal keystore configuration.

    ```toml
    [keystore.internal]
    file_name = "internal.p12"
    type = "PKCS12"
    alias = "wso2carbon"
    password = "$secret{keystore_password}"
    key_password = "$secret{keystore_password}"
    ```

3. Add the following `[secrets]` configurations at the bottom of the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. Give an alias for the password type followed by the actual password enclosed within square brackets `[]` as shown below.

    ```toml
    [secrets]
    admin_password = "[password_1]"
    keystore_password = "[password_2]"
    key_password = "[password_3]"
    truststrore_password = "[password_4]"
    "log4j.appender.LOGEVENT.password" = "[password_5]"
    ```

4. Open a terminal, navigate to the `<IS_HOME>/bin/` directory, and execute the following command (You must first enable the Cipher tool for the product by executing the `-Dconfigure -Dsymmetric` command with the cipher tool script as shown below).

    - On Linux: `./ciphertool.sh -Dconfigure -Dsymmetric`
    - On Windows: `ciphertool.bat -Dconfigure -Dsymmetric`

5. Go back to the `deployment.toml` file and see that the alias passwords are encrypted.

    ```toml
    [secrets]
    admin_password = "GeNld2aZkydnIZGtkZYOnXlVzl8WBtZzAQ8kIoR5c7aHmyUkWTag7w4dG6B3JK5GxeX9bhsmZCBFozlPdWBT6Jvy"
    keystore_password = "brClL1SOHdezXTvBz1/76b/DnHQgxjNGtzhaBr3DnhHw32NWY484abHLREVyMoNJkER5lQUPbqeaMpR5lQUPbqeaMp"
    key_password = "CFAaISaI19dHLApEM3usNSDXXdhdicHbVncrVwuLDJp6Rhp8B3Qy3PnBhcJsryTqR/EPwdLnXboNJkER"
    truststrore_password = "DKnecEw+mJ8JhTUrqxpTZxwXrOdtcoAl2hD3LHtH+yJXNogumdSALfaqrMaknBzJq4SF3sY0RvwkMxWhnZ+BhIsko"
    "log4j.appender.LOGEVENT.password" = "kydnIZGtkZYOnXlVzl8WBtZzAQ8kIoR5c7aHmyUkWTagXTvBz1/76b/DnHQgxjNhD3LHtH+yJXNowecEEC"
    ```

### Using Asymmetric Encryption

!!! info
    It is recommended to [configure a separate keystore](../asymmetric-encryption/configure-keystores-in-wso2-products/#configure-a-separate-keystore-for-encrypting-data-in-internal-datastores) as the internal keystore to encrypt passwords. If the internal keystore is not specified, the primary keystore will be used instead.

1. Add the following `[secrets]` configurations at the bottom of the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. Give an alias for the password type followed by the actual password enclosed within square brackets `[]` as shown below.

    ```toml
    [secrets]
    admin_password = "[password_1]"
    keystore_password = "[password_2]"
    key_password = "[password_3]"
    truststrore_password = "[password_4]"
    "log4j.appender.LOGEVENT.password" = "[password_5]"
    ```

2. Open a terminal, navigate to the `<IS_HOME>/bin/` directory, and execute the following command (You must first enable the Cipher tool for the product by executing the `-Dconfigure` command with the cipher tool script as shown below).

    - On Linux: `./ciphertool.sh -Dconfigure`
    - On Windows: `ciphertool.bat -Dconfigure`

3. Go back to the `deployment.toml` file and see that the alias passwords are encrypted.

    ```toml
    [secrets]
    admin_password = "GeNld2aZkydnIZGtkZYOnXlVzl8WBtZzAQ8kIoR5c7aHmyUkWTag7w4dG6B3JK5GxeX9bhsmZCBFozlPdWBT6Jvy"
    keystore_password = "brClL1SOHdezXTvBz1/76b/DnHQgxjNGtzhaBr3DnhHw32NWY484abHLREVyMoNJkER5lQUPbqeaMpR5lQUPbqeaMp"
    key_password = "CFAaISaI19dHLApEM3usNSDXXdhdicHbVncrVwuLDJp6Rhp8B3Qy3PnBhcJsryTqR/EPwdLnXboNJkER"
    truststrore_password = "DKnecEw+mJ8JhTUrqxpTZxwXrOdtcoAl2hD3LHtH+yJXNogumdSALfaqrMaknBzJq4SF3sY0RvwkMxWhnZ+BhIsko"
    "log4j.appender.LOGEVENT.password" = "kydnIZGtkZYOnXlVzl8WBtZzAQ8kIoR5c7aHmyUkWTagXTvBz1/76b/DnHQgxjNhD3LHtH+yJXNowecEEC"
    ```

## Use encrypted passwords
When you have [encrypted passwords](#encrypt-passwords), you can refer them from the relevant configuration files - the `deployment.toml` file or LOG4j properties.

### Passwords in deployment.toml

You can add the encrypted password to the relevant sections in the `deployment.toml` file by using a placeholder: `$secret{alias}`.

!!! note
    You can also replace your passwords by referring to values passed by environment variables and system properties. See [Set Passwords using Environment Variables/System Properties]({{base_path}}/deploy/security/set-passwords-using-environment-variables-or-system-properties)

```toml
[super_admin]
username="admin"
password="$secret{admin_password}"

[keystore.tls]
password = "$secret{keystore_password}" 
alias = "$secret{keystore_password}" 
key_password = "$secret{key_password}"  

[truststore]                  
password = "$secret{keystore_password}" 
```

### Passwords in LOG4j properties
For example, consider the 'log4j.appender.LOGEVENT.password' in the `log4j2.properties` file. You can refer to the [encrypted password](#encrypt-passwords) from the `log4j2.properties` file as shown below.

```
log4j.appender.LOGEVENT.password=secretAlias:log4j.appender.LOGEVENT.password
```

---

## Change encrypted passwords

To change any password that has been encrypted already, follow the steps given below.

1. Make sure you shut down the server.
2. Navigate to the `<IS_HOME>/bin/` directory in a command prompt, where the cipher tool scripts (for Windows and Linux) are stored.
3. Execute the following command for your OS:
    * On Linux: `./ciphertool.sh -Dchange`
    * On Windows: `ciphertool.bat -Dchange`
   It will prompt for the primary keystore password. Enter the keystore password (which is `wso2carbon` for the default keystore).
5. The alias values of all the passwords that you encrypted will now be shown in a numbered list.
6. The system will then prompt you to select the alias of the password which you want to change. Enter the list number of the password alias.
7. The system will then prompt you (twice) to enter the new password. Enter your new password.

## Rotating Encryption Secrets

!!! note
    To support symmetric encryption, you must specify a PKCS12 type keystore as the internal keystore.

You can rotate encryption keys by switching between symmetric and asymmetric encryption or changing the encryption keys within the same encryption mode.

1. For **symmetric** encryption, add the new key to the existing keystore with a new alias. 

    ```bash
    keytool -genseckey -alias new_alias -keyalg AES -keysize 256 -keystore internal.p12 -storepass password -keypass password
    ```
    

    For **asymmetric** encryption, add a new key pair to the keystore.

    ```bash
    keytool -genkeypair -alias new_alias -keyalg RSA -keystore wso2carbon.jks -storepass password -keypass password
    ```


2. Update the `deployment.toml` file to reflect the new key or secret alias:

    ```toml
    [keystore.internal]
    file_name = "internal.p12"
    type = "PKCS12"
    alias = "new_alias"
    password = "$secret{keystore_password}"
    key_password = "$secret{keystore_password}"
    ```

3. Navigate to the `<IS_HOME>/bin/` directory in a command prompt, where the cipher tool scripts (for Windows and Linux) are stored.

4. Execute the Cipher tool script to re-encrypt the passwords with the new key or secret. Use the `-Drotate` option and specify the old alias. 

    For **asymmetric** encryption,

    * On Linux: `./ciphertool.sh -Drotate -Dold.alias=wso2carbon`
    * On Windows: `ciphertool.bat -Drotate -Dold.alias=wso2carbon`

    For **symmetric** encryption, add `-Dsymmetric`:

    * On Linux: `./ciphertool.sh -Drotate -Dold.alias=wso2carbon -Dsymmetric`
    * On Windows: `ciphertool.bat -Drotate -Dold.alias=wso2carbon  -Dsymmetric`

5. Go back to the deployment.toml file and see that the alias passwords are re-encrypted with new encryption key.

!!! info "Related topics"
    - [Deploy: Resolve Encrypted Passwords]({{base_path}}/deploy/security/resolve-encrypted-passwords)
    - [Deploy: Customize Secure Vault]({{base_path}}/deploy/security/customize-secure-vault)
