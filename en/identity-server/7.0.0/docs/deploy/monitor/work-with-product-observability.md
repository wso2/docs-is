# Work with Product Observability

Product observability enables rapid debugging of product issues. WSO2 Identity Server (WSO2 IS) facilitates product observability by logging the time taken for LDAP and JDBC database calls. This helps to track down any latencies caused by database calls in an instance. The request calls and response calls are correlated via a correlation ID that is sent in the request call.

![Correleation ID]({{base_path}}/assets/img/setup/monitor/correlation-id.png)

!!! note
    By default, product observability is not enabled as it impacts on the product's performance.

## Configure product observability

### log4j configs

Follow the steps below to set up the correlation logs related to the
database calls.

1. Open the `log4j2.properties` file in the `<IS_HOME>/repository/conf` directory.
2. Append the appender `CORRELATION` to the list of all appenders as follows.

    ``` toml
    appenders = CARBON_CONSOLE, CARBON_LOGFILE, AUDIT_LOGFILE, ATOMIKOS_LOGFILE, CARBON_TRACE_LOGFILE, 
    DELETE_EVENT_LOGFILE, TRANSACTION_LOGFILE, osgi, CORRELATION
    ```

3. Append the logger `correlation` for the list of all loggers as follows:

    ```toml
    loggers = AUDIT_LOG, trace-messages, org-apache-coyote, com-hazelcast, Owasp-CsrfGuard, 
    org-apache-axis2-wsdl-codegen-writer-PrettyPrinter, org-apache-axis2-clustering, org-apache-catalina, 
    org-apache-tomcat, org-wso2-carbon-apacheds, org-apache-directory-server-ldap, org-apache-directory-server-core-event, com-atomikos, org-quartz, org-apache-jackrabbit-webdav, org-apache-juddi, org-apache-commons-digester-Digester, org-apache-jasper-compiler-TldLocationsCache, org-apache-qpid, org-apache-qpid-server-Main, qpid-message, qpid-message-broker-listening, org-apache-tiles, org-apache-commons-httpclient, org-apache-solr, me-prettyprint-cassandra-hector-TimingLogger, org-apache-axis-enterprise, org-apache-directory-shared-ldap, org-apache-directory-server-ldap-handlers, org-apache-directory-shared-ldap-entry-DefaultServerAttribute, org-apache-directory-server-core-DefaultDirectoryService, org-apache-directory-shared-ldap-ldif-LdifReader, org-apache-directory-server-ldap-LdapProtocolHandler, org-apache-directory-server-core, org-apache-directory-server-ldap-LdapSession, DataNucleus, Datastore, Datastore-Schema, JPOX-Datastore, JPOX-Plugin, JPOX-MetaData, JPOX-Query, JPOX-General, JPOX-Enhancer, org-apache-hadoop-hive, hive, ExecMapper, ExecReducer, net-sf-ehcache, axis2Deployment, equinox, tomcat2, StAXDialectDetector, org-apache-directory-api, org-apache-directory-api-ldap-model-entry, TRANSACTION_LOGGER, DELETE_EVENT_LOGGER, org-springframework, org-opensaml-xml-security-credential-criteria, org-wso2-carbon-user-core, org-wso2-carbon-identity, org-wso2-carbon-identity-sso-saml, correlation
    ```

4. Following are the default correlation appender configuration. You can change any of these values using the `log4j2.properties`.

    ``` toml
    appender.CORRELATION.type = RollingFile
    appender.CORRELATION.name = CORRELATION
    appender.CORRELATION.fileName =${sys:carbon.home}/repository/logs/correlation.log
    appender.CORRELATION.filePattern =${sys:carbon.home}/repository/logs/correlation-%d{MM-dd-yyyy}.log
    appender.CORRELATION.layout.type = PatternLayout
    appender.CORRELATION.layout.pattern = %d{yyyy-MM-dd HH:mm:ss,SSS}|%X{Correlation-ID}|%t|%mm%n
    appender.CORRELATION.policies.type = Policies
    appender.CORRELATION.policies.time.type = TimeBasedTriggeringPolicy
    appender.CORRELATION.policies.time.interval = 1
    appender.CORRELATION.policies.time.modulate = true
    appender.CORRELATION.policies.size.type = SizeBasedTriggeringPolicy
    appender.CORRELATION.policies.size.size=10MB
    appender.CORRELATION.strategy.type = DefaultRolloverStrategy
    appender.CORRELATION.strategy.max = 20
    appender.CORRELATION.filter.threshold.type = ThresholdFilter
    appender.CORRELATION.filter.threshold.level = INFO
    ```

## Enable observability

Follow the steps below to enable product observability.

1. Navigate to the `<IS_HOME>/bin` directory on the command prompt.

    ``` java
    cd <IS_HOME>/bin
    ```

2. To set the `-DenableCorrelationLogs` property to `true`, execute the following command.

    === "Mac OS/Linux"
        ```
        sh wso2server.sh -DenableCorrelationLogs=true start
        ```

    === "Windows"
        ```
        wso2server.bat -DenableCorrelationLogs=true start
        ```

    !!! note
        By default, this property is set to `false`.

3. Navigate to the `<IS_HOME>/repository/logs` directory.

    ``` java
    cd <IS_HOME>/repository/logs
    ```

    Notice that a separate log file called
    `correlation.log` is created.

    ![Correlation.log]({{base_path}}/assets/img/setup/monitor/correlation-log.png){: width="600"}

Now you are ready to test the product observability of WSO2 IS.

!!! tip
    In order to test product observability, make sure you create a service provider and generate a client key and client secret, with which you can perform a secure database call.

## Log patterns

Following are the log patterns that support product observability.

### JDBC database call logging

!!! abstract ""
    === "**Format**"
        ``` java
        timestamp | correlationID | threadID | duration | callType | startTime | methodName | query | connectionUrl
        ```

    === "**Example**"
        ``` java
        2018-10-22 17:54:46,869|cf57a4a6-3ba7-46aa-8a2b-f02089d0172c|http-nio-9443-exec-2|4|jdbc|1540211086865|executeQuery|SELECT ID, TENANT_ID, IDP_ID, PROVISIONING_CONNECTOR_TYPE, IS_ENABLED, IS_BLOCKING  FROM IDP_PROVISIONING_CONFIG WHERE IDP_ID=?|jdbc:mysql://localhost:13306/apimgtdb?autoReconnect=true&useSSL=false
        ```

### LDAP database call logging

!!! abstract ""
    === "**Format**"
        ``` java
        timestamp | correlationID | threadID | duration | callType | startTime | methodName | providerUrl | principal | argsLengeth | args
        ```

    === "**Example**"
        ``` java
        2018-10-2310:55:02,279|c4eaede8-914d-4712-b630-73f6534b8def|http-nio-9443-exec-18|19|ldap|1540272302260|search|ldap://localhost:10392|uid=admin,ou=system| ou=Users,dc=wso2,dc=org,(&(objectClass=person)(uid=admin)),javax.naming.directory.SearchControls@6359ae3a
        ```

### Beginning of the request call

!!! abstract ""
    === "**Format**"
        ``` java
        timestamp | correlationID | threadID | duration | HTTP-In-Request | startTime | methodName | requestQuery | requestPath
        ```

    === "**Example**"
        ``` java
        2018-11-0514:57:06,757|f884a93d-e3a3-431f-a1ea-f6973e125cb6|http-nio-9443-exec-28|0|HTTP-In-Request|1541410026757|GET|null|/carbon/admin/images/favicon.ico
        ```

### Ending of the request call

!!! abstract ""
    === "**Format**"
        ``` java
        timestamp | correlationID | threadID | totalDurationForRequest | HTTP-In-Response | startTime | methodName | requestQuery | requestPath
        ```

    === "**Example**"
        ``` java
        2018-11-05 14:57:06,764|f884a93d-e3a3-431f-a1ea-f6973e125cb6|http-nio-9443-exec-28|7|HTTP-In-Response|1541410026764|GET|null|/carbon/admin/images/favicon.ico
        ```

## Read the logs

Let's analyze the following sample log lines to find if there are any timing delays for the JDBC or LDAP calls.

<table>
    <td width="60%">
    <td width="40%">
    <tr>
        <td>
            <ol>
                <li><code>2018-11-0514:05:18,427|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|0|HTTP-In-Request|1541406918427|POST|null|/carbon/admin/login_action.jsp</code></li>
                <li><code>2018-11-0514:05:18,581|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|0|jdbc|1541406918581|executeQuery|SELECT * FROM IDN_RECOVERY_DATA WHERE USER_NAME = ? AND USER_DOMAIN = ? AND TENANT_ID = ?|jdbc:h2:./repository/database/WSO2CARBON_DB</code></li>
                <li><code>2018-11-0514:05:18,591|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|7|ldap|1541406918584|initialization|ldap://localhost:10389|uid=admin,ou=system|0|empty</code></li>
                <li><code>2018-11-0514:05:18,599|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|200|ldap|1541406918591|search|ldap://localhost:10389|uid=admin,ou=system|3| uid=admin,ou=Users,dc=WSO2,dc=ORG,(&(objectClass=person)(uid=admin)),javax.naming.directory.SearchControls@548e9a48</code></li>
                <li><code>2018-11-0514:05:18,610|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|0|jdbc|1541406918610|executeQuery|SELECT DATA_KEY, DATA_VALUE FROM IDN_IDENTITY_USER_DATA WHERE TENANT_ID = ? AND USER_NAME = ?|jdbc:h2:./repository/database/WSO2CARBON_DB</code></li>
                <li><code>2018-11-0514:05:18,632|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|16|ldap|1541406918616|initialization|ldap://localhost:10389|uid=admin,ou=system|0|empty</code></li>
                <li><code>2018-11-0514:05:18,641|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|0|jdbc|1541406918641|executeQuery|SELECT UM_ROLE_NAME, UM_RESOURCE_ID, UM_IS_ALLOWED, UM_ACTION, UM_DOMAIN_NAME FROM UM_PERMISSION, UM_ROLE_PERMISSION, UM_DOMAIN WHERE UM_ROLE_PERMISSION.UM_PERMISSION_ID=UM_PERMISSION.UM_ID AND UM_ROLE_PERMISSION.UM_DOMAIN_ID=UM_DOMAIN.UM_DOMAIN_ID AND UM_PERMISSION.UM_TENANT_ID=? AND UM_ROLE_PERMISSION.UM_TENANT_ID=?|jdbc:h2:./repository/database/WSO2CARBON_DB</code></li>
                <li><code>2018-11-0514:05:18,642|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|0|jdbc|1541406918642|executeQuery|SELECT UM_USER_NAME, UM_RESOURCE_ID, UM_IS_ALLOWED, UM_ACTION FROM UM_PERMISSION, UM_USER_PERMISSION WHERE UM_USER_PERMISSION.UM_PERMISSION_ID=UM_PERMISSION.UM_ID AND UM_PERMISSION.UM_TENANT_ID=? AND UM_USER_PERMISSION.UM_TENANT_ID=?|jdbc:h2:./repository/database/WSO2CARBON_DB</code></li>
                <li><code>2018-11-0514:05:18,696|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|0|jdbc|1541406918696|executeQuery|SELECT UM_RESOURCE_ID FROM UM_PERMISSION WHERE UM_ACTION=? AND UM_TENANT_ID=?|jdbc:h2:./repository/database/WSO2CARBON_DB</code></li>
                <li><code>2018-11-0514:05:18,715|86b56b19-7872-4e2f-84f3-5a14f92e18c1|http-nio-9443-exec-8|480|HTTP-In-Response|1541406918715|POST|null|/carbon/admin/login_action.jsp</code></li>
            </ol>
        </td>
        <td>
            <ul>
                <li><b>Line 1</b> is the <code>http-in-request</code>.</li>
                <li><b>Line 10</b> is the <code>http-in-response</code>, which shows
                that the total time taken for the cycle is
                <code>480 ms</code>. This is almost close to half a second.
                With that, we can assume that there is a delay with either an LDAP or
                JDBC call.</li>
                <li>When we carefully analyze <b>each line</b>, we can see that all JDBC calls
                have taken less than <code>5 ms</code>.</li>
                <li><b>Line 4</b> however, indicates an LDAP call that has taken
                <code>200 ms</code>, which can be a possible reason for
                this issue. </li>
            </ul>
        </td>
    </tr>
</table>

## Advanced scenarios

Following are a few advanced scenarios that are related to product observability in WSO2 IS.

### Define denylists for the threads

Certain threads continuously print unnecessary logs. Defining denylists prevents the unwanted threads from printing logs thereby improving the readability of the logs.

Follow the steps below to configure denylists for threads.

1. Open either of the following files in the `<IS_HOME>/bin` directory on a command prompt.

    - For Mac/Linux: `wso2server.sh` file
    - For Windows: `wso2server.bat` file

2. Add the following configuration as a system property.

    ``` java
    -Dorg.wso2.CorrelationLogInterceptor.blacklistedThreads=threadName1,threadName2 \
    ```

    !!! tip
        Make sure to add it before the `org.wso2.carbon.bootstrap.Bootstrap $*` line.
    
    !!! note
        This configuration is not required by default, as all unnecessary threads are already a part of the denylist in the `MessageDeliveryTaskThreadPool` thread. If the above configuration is added, the default value will be overridden.

3. Restart the WSO2 IS server.

    ``` java
    sh wso2server.sh -DenableCorrelationLogs=true stop
    sh wso2server.sh -DenableCorrelationLogs=true start
    ```

4. To send the authentication request, execute the following cURL command.

    ``` java
    curl -v -k -X POST --basic -u <CLIENT_KEY>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -H "customHeader1:correlationvalue1" -H "customHeader2:correlationvalue2" -d "grant_type=client_credentials" https://localhost:9443/oauth2/token
    ```

    !!! tip
        Use the `client key` and `client secret` of the service provider you created after enabling product observability.

5. Open the `correlation.log` on a command prompt and notice the related logs.

    ``` java
    tail -f <IS_HOME>/repository/logs/correlation.log
    ```

    ![Correlation log screenshot]({{base_path}}/assets/img/setup/monitor/correlation-log-screenshot-2.png){: width="600"}
