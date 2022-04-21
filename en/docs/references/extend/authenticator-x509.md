# Extending the authenticator for X509

Now that you have learned how to configure the authenticator, let's
learn how to extend its functionality for additional authentication
methods.

-   Authenticating using the Subject Alternative Name
-   Authenticating using the RDN

## Authenticating using the Subject Alternative Name

**About Subject Alternative Name**

The Subject Alternative Name (SAN) is an extension to the X.509
certificate format that enables securing multiple hostnames such as CN,
IP, DNS and email, using a single certificate.

!!! note "How SAN works in WSO2 Identity Server"  
    -   If SAN is not enabled, the system does not check for alternative
        names in the certificate.
    -   If SAN is enabled with either of the following, the system throws an
        error fails the authentication process:
        -   Alternative names are not defined in the certificate.
        -   No matching string is found for the alternative name pattern
            that is defined in the certificate.
        -   There are multiple matching strings found for the alternative
            name pattern that is defined in the certificate.
    -   If SAN is enabled where a single match is found for the alternative
        name pattern that is defined in the certificate, that match is used
        as the user name and the system begins user authentication. When a
        user with the given user name is found in the system, the user gets
        authenticated.ated.
    

To enable SAN in WSO2 Identity Server, add the following configurations
to the `         deployment.toml        ` file in the
`         <IS_HOME>/repository/conf/       ` directory.

``` toml
[authentication.authenticator.x509_certificate.parameters]
AlternativeNamesRegex="^[a-zA-Z]{3}$"
```

## Authenticating using the RDN

-   **Relative Distinguished Name (RDN)**  
    An RDN comprises one or more certificate attribute-value pairs in
    the form of `            <attribute>=<value>           `.

    **Sample RDN**

    ``` java
    cn=John Doe+o=WSO2
    ```

    In the above example, the two attribute-pairs,
    `            cn=John Doe           ` and
    `            c=US           ` are separated by a plus (+) sign.

-   **Distinguished Name (DN)**  
    A DN is a sequence of comma-separated RDNs, i.e., RDNs are the
    components of a DN.

    **Sample DN**

    ``` java
    cn=Jon Doe+o=WSO2, c=US
    ```

!!! note "How DN/RDN works in WSO2 Identity Server" 
    When this is configured, the system checks for a matching string from
    the subject DN. Once found, it is used as the user name to proceed with
    user authentication. If more than one matching values or no matching
    values are found, the system throws an error and fails the
    authentication process.
    

To enable subject DN in WSO2 Identity Server, add the following
configuration to the `deployment.toml` file in the
`         <IS_HOME>/repository/conf/       ` directory.

``` toml
[authentication.authenticator.x509_certificate.parameters]
UsernameRegex="[a-zA-Z]{3}"
```