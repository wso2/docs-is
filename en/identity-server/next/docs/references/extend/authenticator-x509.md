# Extending the x509 authenticator

!!! note "Before you begin"
    You need to [configure the x509 authenticator]({{base_path}}/guides/authentication/mfa/x509/) on WSO2 Identity Server.

This document guides you on extending an x509 authenticator's functionality for additional authentication methods.

You can use the following methods to extend the authenticator's functionalities:

- [Authenticating using the Subject Alternative Name](#authenticating-using-the-subject-alternative-name)
- [Authenticating using the RDN](#authenticating-using-the-rdn)

## Using the Subject Alternative Name

The Subject Alternative Name (SAN) is an extension to the X.509 certificate format that enables securing multiple hostnames, such as `CN`, `IP`, `DNS`, and `email`, using a single certificate.

!!! note "How SAN works in the WSO2 Identity Server"  
    - If SAN (Subject Alternative Name) is not enabled, the system doesn't check for any alternative names in the certificate.

    - When SAN is enabled, the system follows these rules:

        - If the certificate does not define alternative names, an error occurs, and authentication fails.

        - If no matching string is found for the alternative name pattern defined in the certificate, an error occurs, and authentication fails.

        - If multiple matching strings are found for the alternative name pattern defined in the certificate, an error occurs, and authentication fails.

        - If SAN is enabled and there's a single match for the alternative name pattern in the certificate, that match is used as the user name, and the system proceeds with user authentication. If a user with that username is found in the system, the user is authenticated.

To enable SAN in the WSO2 Identity Server, add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[authentication.authenticator.x509_certificate.parameters]
AlternativeNamesRegex="^[a-zA-Z]{3}$"
```

## Using the RDN

- **Relative Distinguished Name (RDN)**  
    An RDN comprises one or more certificate attribute-value pairs in the following form:

    ```
    <attribute>=<value>
    ```

    Sample RDN: `cn=John Doe+o=WSO2`

    The above example separates the two attribute-value pairs, `cn=John Doe` and `o=WSO2`, by a plus (+) sign.

- **Distinguished Name (DN)**  
    A DN is a sequence of comma-separated RDNs, i.e., RDNs are the components of a DN.

    Sample DN: `cn=Jon Doe+o=WSO2, c=US`

!!! note "How DN/RDN works in WSO2 Identity Server"
    The system examines the subject DN (Distinguished Name) for a matching string.

    - When a matching string is discovered, it is utilized as the user name for further user authentication.
    - However, if multiple matching or no matching values are encountered, the system generates an error, and authentication fails.

To enable subject DN in the WSO2 Identity Server, add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

``` toml
[authentication.authenticator.x509_certificate.parameters]
UsernameRegex="[a-zA-Z]{3}"
```