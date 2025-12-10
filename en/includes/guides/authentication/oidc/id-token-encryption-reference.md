# ID token encryption reference

This reference explains the format of encrypted ID tokens in detail and the algorithms and methods used for encryption.

## ID token formats

An unencrypted ID token consists of two base64-encoded parts separated by a period (`.`). It takes the following format:

=== "Format"

    ```xml
    <header>.<body>
    ```
                
=== "Example"

    ```java
    eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImlzcyI6Imh0dHBzOlwvXC9jMmlkLmNvbSIsImlhdCI6MTQxNjE1ODU0MX0
    ```

- `<header>` : Contains metadata about the token, such as the signing algorithm used.
- `<body>` : Contains the actual claims about the user, such as the user's identifier, issuer, and audience.

An encrypted ID token consists of five base64-encoded parts separated by a period (`.`). It takes the following format:

=== "Format"

    ```xml 
    <header>.<Encrypted_Key>.<Initialization_Vector>.<Ciphertext>.<Authentication_Tag> 
    ```

=== "Example"

    ```java
    eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBMV81In0.Zwp2xDvYER9lAo43QrYrcaKz-tPLFPYZb2s4RontDDVyvdo-seYl6II2C1Wb4cQhXdipcB_Qj093xvLrJyZXWxeavqYhryeuHi2jgcs59MfV1U9hMaKqqjVN1pcZYSrxDzn5leBF5bw7_YKaD_R6cFY8VtpVv5j_U8WohtyIjM7_n2CsZ55vY8MUHCAYxzXK9_s75e6Ug8L4MEqpgeoJGQzYCxFrBFgGyDMv1jadLwNl4Y3yLhv4RLtQMU5AM6nODI601UfYdrapObF3mpl_74H_YdRqT28LepGMtkEXbjeRgB-FiFGLvYlrK4wygczLBKrcviVyzyhrIrqz3TYV3g.Lf5lECzAdyAGgP8t.SHBUZoWkqwW_7u0GElrUqX1tewqRaUMWdGPHxpLRPmpVuc7FwQ27-kdsQ6O1_twhZ7uzjzZaEkatNhMxy9k10733-r4GT1lTGVqidKiBZq3mRQu7qJpcz7JWUroNFRLxhSoqpLpC8_tAhkohzG-mE42xdEh4tNDy3pBtAG0fe42WrLtWTuyg5lpmOYSppOc2Gb6LcDr4MmxFNPgoatF0edJSgO-CpFJQTcXn-22lU2g7o22x3RcBx9_KZH0At3g9y9uTuBncExOoBRK_ZweKOl0q76TaLiv5faXINW15xz9hILA.RGYIL7FaQqAIMPAiQdkOig
    ```

- `<header>`: Contains metadata about the token, such as the encryption algorithm and method used.
- `<Encrypted_Key>`: Contains the Content Encryption Key (CEK) encrypted with the recipient's public key.
- `<Initialization_Vector>` : Random value used in the symmetric encryption process.
- `<Ciphertext>`: The actual encrypted ID token payload.
- The `<Authentication_Tag>`: Used for integrity checks.

## Encryption algorithms and methods

{{product_name}} uses the  [JSON Web Encryption (JWE)](https://datatracker.ietf.org/doc/html/rfc7516){: target="_blank"} standards to encrypt ID tokens. The encryption process involves the following two processes:

- **Encrypt the payload** - {{product_name}} generates a random Content Encryption Key (CEK) and uses it to encrypt the ID token payload using the specified symmetric encryption algorithm, known as the **encryption method**. {{product_name}} support the following encryption methods:

    - A128GCM
    - A192GCM
    - A256GCM
    - A128CBC-HS256
    - A128CBC+HS256

- **Encrypt the Content Encryption Key (CEK)** - {{product_name}} uses the registered public key of the application to encrypt the CEK using the specified asymmetric encryption algorithm, known as the **encryption algorithm**. {{product_name}} supports the following encryption algorithms:

    - RSA1_5
    - RSA-OAEP

{% if product_name == "WSO2 Identity Server" %}
You can configure the default values of the encryption methods and encryption algorithms by making changes to the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[oauth.oidc.id_token]
supported_encryption_algorithms=["RSA1_5","RSA-OAEP"]
supported_encryption_methods=["A128GCM","A192GCM","A256GCM","A128CBC-HS256","A128CBC+HS256"]
```

{% endif %}
