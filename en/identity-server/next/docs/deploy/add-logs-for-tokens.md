# Add Logs for Tokens

Entries in the `<IS_HOME>/repository/conf/security/identity_log_tokens.properties` file can determine whether tokens are added to system logs or not. By default, these are enabled in the file. The following are the entries in this file that represent different types of tokens. The tokens can be disabled from appearing in the logs by setting each token to `false`.

``` c#
UserClaims=true
UserIdToken=true
XACML_Request=true
XACML_Response=true
NTLM_Token=true
SAML_Assertion=true
SAML_Request=true
AccessToken=true
RefreshToken=true
AuthorizationCode=true
```

In addition to this, you need to ensure that the logs in the `<IS_HOME>/repository/conf/log4j2.properties` file are enabled as well. To do this, follow the instructions given below.

Change the log level from `INFO` to `DEBUG` in the `org.wso2.carbon.identity` logger as follows.

``` c#
logger.org-wso2-carbon-identity.name=org.wso2.carbon.identity
logger.org-wso2-carbon-identity.level=DEBUG
```

To log the tokens defined in the `identity_log_tokens.properties` file, you need to add the `Read_Log_Token_Properties` system property. This can be done either by starting the WSO2 Identity Server with the system property or by adding the parameter to `JAVA_OPTS` as an environment variable.

!!! tip
    `JAVA_OPTS` are optional runtime options that can be set.


To start the server and pass the parameter, navigate to the `<IS_HOME>/bin` folder in the command line and run the following command.

**Startup command**

``` bash
sh wso2server.sh -DRead_Log_Token_Properties=true
```

To add the parameter to the environment variable, use the following command and then [start the server]({{base_path}}/deploy/get-started/run-the-product/).

**Exporting to the Java environment variable**

``` bash
export JAVA_OPTS=-DRead_Log_Token_Properties=true
```
