# Encrypt Passwords with the Cipher Tool


The instructions on this page explain how plain text passwords in configuration files can be encrypted using the secure vault implementation that is built into the WSO2 Identity Server.  

!!! info "Before you begin"
    If you are using Windows, you need to have [**Ant**](http://ant.apache.org/) installed before using the Cipher Tool.

## Encrypt passwords

To encrypt passwords on the WSO2 Identity Server, you can use either asymmetric or symmetric encryption.

!!! important
    - It is recommended to [configure a separate keystore](../keystores/configure-keystores/#configure-a-separate-keystore-for-encrypting-data-in-internal-datastores) as the internal keystore to encrypt passwords. If the internal keystore is not specified, the primary keystore will be used instead.
    - Symmetric encryption is recommended due to its enhanced security against potential post-quantum threats.

### Using Symmetric Encryption

!!! note
    To support symmetric encryption, an internal keystore of type **PKCS12** must be used. Need to add a symmetric secret to a PKCS12 keystore and set the alias as mentioned [here](../keystores/configure-keystores/#add-a-symmetric-secret-to-a-pkcs12-keystore)

1. Add the following `[secrets]` configurations at the bottom of the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. Give an alias for the password type followed by the actual password enclosed within square brackets `[]` as shown below.

    ```toml
    [secrets]
    admin_password = "[password_1]"
    keystore_password = "[password_2]"
    key_password = "[password_3]"
    truststrore_password = "[password_4]"
    "log4j.appender.LOGEVENT.password" = "[password_5]"
    ```

2. Open a terminal, navigate to the `<IS_HOME>/bin/` directory, and execute the following command (You must first enable the Cipher tool for the product by executing the `-Dconfigure -Dsymmetric` command with the cipher tool script as shown below).

    - On Linux: `./ciphertool.sh -Dconfigure -Dsymmetric`
    - On Windows: `ciphertool.bat -Dconfigure -Dsymmetric`

3. Go back to the `deployment.toml` file and see that the alias passwords are encrypted.

    ```toml
    [secrets]
    admin_password = "eyJjaXBoZXJUZXh0IjoiVW5sdWV0K1dGSncxdWZOdXJWQVJ4KysxQTdVbm1wYzVCbEFcdTAwM2QiLCJpdiI6Ik1ZRGZpWG9lS2hBa1pBUmw3L3V2alBzbmRmSlowNGsxazJSSEN0VjRjOHJiSjVwT3FmUUdTazZmc0xaaXAyVWdlUkNqeS9Ka2NMQlRlNHloWWNpTEZRZVkra2s0cVFNcnkzY2JCNm1NbitWRGt0bHY4YUJTbWt6MVNnNUZNcXZ2alJQL1FIZ3A2Z2JZRFQ2VTlaTzRBa2hpSTFoSTkwa25NRkRqYjNGbW9Kd1x1MDAzZCJ9"
    keystore_password = "eyJjaXBoZXJUZXh0IjoiL21FK3NQWlU4VUVlL0pSYzBveHVwL0hJaWFTQTdrWmxOdjBcdTAwM2QiLCJpdiI6IjlTOS9rU2lTV25BRDVLeWVPakRRL2pGMTZoNlR0Sk92VE1pcllSQ052TGlYd05jSlY4TG5XOHNaeHdWWGlXemNpbjAxb2VMNm1rS3lqQkhRRy83U1ovQ28vRlBmWjBIZk9HYUIxblJlRjA4MkFTSUNJT1p0V3hmb1llLzh1eVdpUzJockhybndxRUdyY1hlOW0xMVpFQ2VuTFdSRHpRakM3QnRKQndDeXJOQVx1MDAzZCJ9"
    key_password = "eyJjaXBoZXJUZXh0IjoiNGVqSndqRjljc0h2cU1qeVp3M3R5K0FnTWV5TGpGcGhhU01cdTAwM2QiLCJpdiI6IkQ5U0J3Q1BlQzYwQWV3OTlvcDMwenBmMGF5T2lpL2pxbXdDMk0wL1VhaDhhVmR2QUdQalRNQlZrckZGSlJ5anQ5S2t4NE5kU2RWVE5wUlppUkhERXdkVHFMVDZoTFhkT05KRXRnS0srZHJwdXUvSm16elZNTUxrOVdVK0RZMk9kaExZSUgxSEpMN1VwTFcxRDVLelVwS0psa2t2OGFUazJyUHZiZWxLbEJqd1x1MDAzZCJ9"
    truststrore_password = "eyJjaXBoZXJUZXh0IjoiMlZzSHUvQktHUWYxOCs1S1g2M1ltalZjc3NsajV2a3dHaG9cdTAwM2QiLCJpdiI6Im9oUmNuQTNhOHcycktra3VkQlNxcmxVVGFyOUVpUXd5Zzk2M1B1YkRMeDFRMzYrTHNOOEVxWGZIb1RpbE9OTi9jOVBGSkljRVltbmV1NnJDdHBYeVZHYm5LMlVtNG1mYzNkbzhhZFhyM0JTSTZaNjdzVy9OVWVJd0RCc2tvWG51MTFLNzhhUkRvVE1wSEFiNHp6bDhOT2RyR2J0S3hWQzZYb1pWNTJhL2Y1d1x1MDAzZCJ9"
    "log4j.appender.LOGEVENT.password" = "eyJjaXBoZXJUZXh0IjoiV3BqdGNsaU9jc1JNVkgvZ3YwRkR1YTlzeVZjQnYvS2lLblFcdTAwM2QiLCJpdiI6IkFlTElSWXJNT25HaEdOTDNqcHdXQ29jeU9JMGNaS2RybHpZeWU3RStxcy9lQ2VmcmxGTGF2UjZxakJUOXhQRGdDaHFBTUtRWiswYXFBT1VQWFNzZ1gyOTVVWFA4Y29uME5WUzkxekhjWFJlNkpQZXN0VEtGdUh5Y3RtWnBMNmduM2JEdFloY1RDengxTmJGMm55djNiVWlJb3hGM2VCc3BTeW13Ly83aC8wUVx1MDAzZCJ9"
    ```

### Using Asymmetric Encryption

!!! warning
    Asymmetric encryption using RSA is not recommended due to its vulnerability to emerging **post-quantum threats**.

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
