# Using Symmetric Encryption

With symmetric encryption a single key will be shared for encryption and decryption of information. Even though, WSO2 Identity Server uses [asymmetric encryption](../../administer/using-asymmetric-encryption) by default, you can switch to symmetric encryption. 

Follow the steps given below to enable symmetric encryption. 

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.
2.  Add the following configuration.

    The `key = "value"` property is used to specify the secret alias if secure vault has been used to encrypt the secret key.

    ``` toml
    [encryption]
    key = "value"
    ```
