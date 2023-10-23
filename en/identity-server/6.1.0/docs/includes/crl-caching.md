## Configure CRL Caching

CA provides a CRL that is valid for a limited duration, which is defined
in the **Next Update** CRL field. This field indicates the date by which
the next CRL will be issued. According to the [Internet X.509 PKI
Certificate and CRL Profile](https://tools.ietf.org/html/rfc5280) , the
next CRL could be issued before but not later than the indicated date.
This property is considered to validate the returned CRL from cache as a
certificate in the CRL can be temporarily invalidated (Hold) rather than
being irreversibly revoked, i.e., an outdated CRL creates a security
exposure.

The X509CRL is downloaded from the CRL URL and persisted in cache.
Follow the steps below to configure CRL caching.

1.  Open the `deployment.toml` file located in the `          <IS_HOME>/repository/conf/        ` directory.
2.  Add the following configuration.

    ``` toml
    [[cache.manager]]
    name="CRLCache"
    timeout="900"
    capacity="5000"
    ```
    
3. Restart the server to apply the changes.
    