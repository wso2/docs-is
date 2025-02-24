# Encrypt Passwords with the Cipher Tool

The instructions on this page explain how plain text passwords in configuration files can be encrypted using the secure vault implementation that is built into the WSO2 Identity Server.  

!!! info "Before you begin"
    If you are using Windows, you need to have [**Ant**](http://ant.apache.org/) installed in order to use the Cipher Tool.

## Encrypt passwords

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}

While you are able to encrypt passwords using symmetric or asymmetric encryption, it is recommended to use symmetric encryption due to its greater resilience towards emerging post-quantum threats. 
Asymmetric encryption methods like RSA are not recommended due to their vulnerability to quantum computing capabilities.

!!! important
    [Configure a separate keystore]({{base_path}}/deploy/security/keystores/configure-keystores/#configure-a-separate-keystore-for-encrypting-data-in-internal-datastores) as the internal keystore to encrypt passwords. If the internal keystore is not specified, the primary keystore will be used instead.

Follow the steps below to encrypt passwords:

1. Add the following `[secrets]` configurations to the bottom of the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. Provide an alias for the password type followed by the actual password enclosed within square brackets `[]` as shown below.

    ```toml
    [secrets]
    admin_password = "[password_1]"
    keystore_password = "[password_2]"
    key_password = "[password_3]"
    truststrore_password = "[password_4]"
    log4j2_password = "[password_5]"
    ```

2.  Open a terminal, navigate to the `<IS_HOME>/bin/` directory, and execute the following command based on the encryption method and your operating system:

    === "Symmetric encryption"

        !!! note "Prerequisite"

            To support symmetric encryption, you should have a symmetric secret in an internal keystore of type PKCS12. Follow the instructions [here]({{base_path}}/deploy/security/keystores/configure-keystores/#add-a-symmetric-secret-to-a-pkcs12-keystore) to add one.

        - **For Linux**: `./ciphertool.sh -Dconfigure -Dsymmetric`

        - **For Windows**: `ciphertool.bat -Dconfigure -Dsymmetric`

    === "Asymmetric encryption"

        !!! warning

            Asymmetric encryption methods like RSA are not recommended due to their vulnerability to post-quantum threats.

        - **For Linux**: `./ciphertool.sh -Dconfigure`

        - **For Windows**: `ciphertool.bat -Dconfigure`

3. Open the `deployment.toml` again and see that the passwords are encrypted.

    ```toml
    [secrets]
    admin_password = "xxxxxxx"
    keystore_password = "xxxxxxx"
    key_password = "xxxxxxx"
    truststrore_password = "xxxxxxx"
    "log4j2_password" = "xxxxxxx"
    ```

{% else %}

To encrypt passwords on the WSO2 Identity Server:

1. Add the following `[secrets]` configurations to the bottom of the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. Give an alias for the password type followed by the actual password. The following example lists the most common passwords in configuration files.

    ```toml
    [secrets]
    admin_password = "[password_1]"
    keystore_password = "[password_2]"
    key_password = "[password_3]"
    truststrore_password = "[password_4]"
    log4j2_password = "[password_5]"
    ```

2. Open a terminal, navigate to the `<IS_HOME>/bin/` directory, and execute the following command to enable the cipher tool using the `-Dconfigure` flag.

    - On Linux: `./ciphertool.sh -Dconfigure`
    - On Windows: `ciphertool.bat -Dconfigure`

3. Open the `deployment.toml` file again and see that the alias passwords are encrypted.

    ```toml
    [secrets]
    admin_password = "xxxxxxx"
    keystore_password = "xxxxxxx"
    key_password = "xxxxxxx"
    truststrore_password = "xxxxxxx"
    "log4j2_password" = "xxxxxxx"
    ```

{% endif %}

## Use encrypted passwords

Once you have [encrypted passwords](#encrypt-passwords), you can use them in the relevant configuration files as follows:

### In deployment.toml

You can include encrypted passwords in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory by using the `$secret{alias}` format as shown below:

!!! note
    You may pass passwords as environment variables and system properties instead of directly setting the values. See [Set Passwords using Environment Variables/System Properties]({{base_path}}/deploy/security/set-passwords-using-environment-variables-or-system-properties) for instructions.

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

### In log4j2.properties

You may include encrypted passwords in the `log4j2.properties` file found in the `<IS_HOME>/repository/conf` directory. For example, you may set `log4j.appender.LOGEVENT.password` as shown below:

```
log4j.appender.LOGEVENT.password=secretAlias:log4j2_password
```

## Change encrypted passwords

You may follow the steps below to change passwords that are already encrypted.

1. Shut down the {{product_name}}.

2. On a command prompt, navigate to the `<IS_HOME>/bin/` directory where the cipher tool scripts reside.

{% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}

3. Run the cipher tool by executing the command corresponding to your encryption method and operating system:

    === "Symmetric encryption"

        - **For Linux**: `./ciphertool.sh -Dconfigure -Dsymmetric`

        - **For Windows**: `ciphertool.bat -Dconfigure -Dsymmetric`

    === "Asymmetric encryption"

        - **For Linux**: `./ciphertool.sh -Dconfigure`

        - **For Windows**: `ciphertool.bat -Dconfigure`

{% else %}

3. Run the cipher tool by executing the command corresponding to your operating system:

    * Linux: `./ciphertool.sh -Dchange`
    * Windows: `ciphertool.bat -Dchange`

{% endif %}

4. You will be prompted for the primary keystore password. Enter the password. For the default keystore, it is `wso2carbon`.

5. A numbered list of all encrypted password aliases will be displayed. Enter the number corresponding to the alias of the password you want to change.

6. The system will then prompt you (twice) to enter the new password. Enter your new password.

{% if product_name == "WSO2 Identity Server" and is_version != "7.0..0" %}
## Rotating Encryption Secrets

!!! note
    To support symmetric encryption, you must specify a PKCS12 type keystore as the internal keystore.

You can rotate encryption keys by switching between symmetric and asymmetric encryption or by changing the encryption keys within the same encryption mode. Follow the steps below.

1. Use the corresponding command to add the new key to an existing keystore with a new alias.

    === "Symmetric encryption"

        ```bash
        keytool -genseckey -alias new_alias -keyalg AES -keysize 256 -keystore internal.p12 -storetype PKCS12 -storepass password -keypass password
        ```
    
    === "Asymmetric encryption (JKS)"

        ```bash
        keytool -genkeypair -alias new_alias -keyalg RSA -keystore wso2carbon.jks -storepass password -keypass password
        ```

    === "Asymmetric encryption (PKCS12)"

        ```bash
        keytool -genkeypair -alias new_alias -keyalg RSA -keystore wso2carbon.p12 -storetype PKCS12 -storepass password -keypass password
        ```

2. Update the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory to reflect the new key or secret alias:

    === "JKS"

        ```toml
        [keystore.internal]
        file_name = "internal.jks"
        type = "JKS"
        alias = "new_alias"
        password = "$secret{keystore_password}"
        key_password = "$secret{keystore_password}"
        ```

    === "PKCS12"

        ```toml
        [keystore.internal]
        file_name = "internal.p12"
        type = "PKCS12"
        alias = "new_alias"
        password = "$secret{keystore_password}"
        key_password = "$secret{keystore_password}"
        ```

3. Navigate to the `<IS_HOME>/bin/` directory on the command prompt, where the cipher tool scripts reside.

4. Execute the cipher tool script to re-encrypt the passwords with the new key or secret. Use the `-Drotate` option and specify the old alias.

    === "Symmetric encryption"

        - For Linux: `./ciphertool.sh -Drotate -Dold.alias=wso2carbon`

        - For Windows: `ciphertool.bat -Drotate -Dold.alias=wso2carbon`

    === "Asymmetric encryption"

        - On Linux: `./ciphertool.sh -Drotate -Dold.alias=wso2carbon -Dsymmetric`

        - On Windows: `ciphertool.bat -Drotate -Dold.alias=wso2carbon  -Dsymmetric`

5. Go back to the `deployment.toml` file and see that the passwords are re-encrypted with the new encryption key.

{% endif %}

!!! info "Related topics"
    - [Deploy: Resolve Encrypted Passwords]({{base_path}}/deploy/security/resolve-encrypted-passwords)
    - [Deploy: Customize Secure Vault]({{base_path}}/deploy/security/customize-secure-vault)
