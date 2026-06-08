<!-- markdownlint-disable-next-line -->
#### Audience

The audience specifies the recipient(s) for which the ID token is intended. By default, the client ID of the application is added as an audience. You can add multiple audiences in the ID token.

!!! note
    Learn about [ID token claims and the audience field]({{base_path}}/references/tokens/id-tokens/#id-token-claims) for more details.

#### Enable encryption

Specifies whether to encrypt the ID token when it is issued. The public key of your application is used for encryption.

!!! note
    To enable this option, configure a certificate for your application in the <b>Certificate</b> section.

#### Algorithm

Select the asymmetric algorithm used to encrypt the Content Encryption Key (CEK). The selected algorithm is included as the `alg` claim in the ID token header.

!!! note
    Learn about [ID token encryption mechanics]({{base_path}}/references/tokens/id-tokens/#id-token-encryption) for details on how the CEK and encryption algorithms work together.

#### Encryption Method

Select the symmetric encryption method used to encrypt the ID token payload. The selected method is included as the `enc` claim in the ID token header.

#### ID Token expiry time

This option specifies the validity period of the ID token in seconds. The default value is 3600 seconds.
