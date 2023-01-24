# Supported Cipher Suites

For a list of cipher suites that are secure and are functional in Tomcat (Tomcat version 9 with the JSSE provider 11) for the TLSv1.2 protocols, see the list of ciphers provided in the [secure configuration generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.31&config=intermediate&guideline=5.6), which is provided by the Mozilla Foundation.

See [Configuring Transport-Level Security](../../setup/configuring-transport-level-security) for instructions on how to enable the required ciphers and to disable the weak ciphers for your WSO2 server.

!!! note
    Listed below are the relatively weaker cipher suites (which use `DES`/`3DES`, `RC4` and `MD5`). It is not recommended to use these cipher suites for the following reasons:
    
    -   DES/3DES are deprecated and should not be used.
    -   MD5 should not be used due to known collision attacks.
    -   RC4 should not be used due to crypto-analytical attacks.
    -   DSS is limited to 1024 bit key size.
    -   Cipher-suites that do not provide Perfect Forward Secrecy/ Forward Secrecy (PFS/FS).


