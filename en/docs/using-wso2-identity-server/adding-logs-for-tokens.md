# Adding Logs for Tokens

Entries in the
`         <IS_HOME>/repository/conf/security/identity_log_tokens.properties        `
file can determine whether tokens are added to system logs or not. By
default, these are enabled in the file. The following are the entries in
this file that represent different types of tokens. The tokens can be
disabled from appearing in the logs by setting each token to
`         false        ` .

``` c#
UserClaims=true
UserIdToken=true
XACML_Request=true
XACML_Response=true
NTLM_Token=true
SAML_Assertion=true
SAML_Request=true
```

In addition to this, you need to ensure that the logs in the
`         <IS_HOME>/repository/conf/log4j.properties        ` file are
enabled as well. To do this, uncomment the following entry in this file.

``` c#
log4j.logger.org.wso2.carbon.identity=DEBUG
```

In order to log the tokens defined in the
`         identity_log_tokens.properties        ` file, you need to add
the `         Read_Log_Token_Properties        ` system property. This
can be done either by starting WSO2 Identity Server with the system
property or by adding the parameter to `         JAVA_OPTS        ` as
an environment variable.

!!! tip
    `         JAVA_OPTS        ` are optional runtime options that can be set.
    

To start the server and pass the parameter, navigate to the
`         <IS_HOME>/bin        ` folder in the command line and run the
following command.



``` bash tab="Startup command"
sh wso2server.sh -DRead_Log_Token_Properties=true
```

To add the parameter to the environment variable, use the following
command and then [start the server](../../setup/running-the-product).

``` bash tab="Exporting to the Java environment variable"
export JAVA_OPTS=-DRead_Log_Token_Properties=true
```
