<!-- markdownlint-disable-next-line -->
#### Audience
The audience specifies the recipient(s) for which the ID token is intended. By default, the client ID of the application is added as an audience. You can add multiple audiences in the ID token as shown below.

 _Sample default ID token_:
 ```json
 {
  "isk": "c37e33a87f794f9db4e43eeec5596dd0f64ba43c2c8a6e35eb4bd09e8a09d58a",
  "at_hash": "sXH3BGop66MmXp0CCWDk2A",
  "aud": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "c_hash": "IgFIyrsoOeTwjdAaG3y3OQ",
  "sub": "Alice@bifrost.com",
  "nbf": 1623843889,
  "azp": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "{{ product_url_sample }}/oauth2/token",
  "exp": 1623847489,
  "iat": 1623843889
 }
 ```

 _Sample ID token when `sample_app` is added as a audience value_:

 ```json
 {
  "isk": "1f77c2907c1c2670d73909d3dad38cd02ecda3c21a343dec9d75b51630ca5418",
  "at_hash": "a387Ursh5iNxeMmNViWT2A",
  "aud": [
    "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
    "sample_app"
  ],
  "c_hash": "tz02tie7nYsK4__SFj2uKQ",
  "sub": "Alice@bifrost.com",
  "nbf": 1623908834,
  "azp": "Wsoq8t4nHW80gSnPfyDvRbiC__Ea",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "{{ product_url_sample }}/oauth2/token",
  "exp": 1623912434,
  "iat": 1623908834
 }
 ```
<br>

#### Enable encryption

Specifies whether to encrypt the ID token when it is issued. The public key of your application is used for encryption.

!!! note
    To enable this option, configure a certificate for your application in the <b>Certificate</b> section.

#### Algorithm

A single-use AES secret key, called the Content Encryption Key (CEK) is generated. {{ product_name }} obtains the public key from the specified [certificate](#certificate), and encrypts the CEK using the asymmetric encryption algorithm specified here. The selected algorithm is mentioned as the `alg` in the ID token header.

#### Encryption Method
The encryption method defines a symmetric encryption algorithm to encrypt the ID token.

{{ product_name }} uses the generated CEK value and the symmetric encryption algorithm specified here to encrypt the ID token. The selected encryption method is mentioned as the `enc` in the ID token header.

#### ID Token expiry time
This option specifies the validity period of the ID token in seconds. The default value is 3600 seconds.
