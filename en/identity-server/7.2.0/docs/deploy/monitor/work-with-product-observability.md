# Work with Product Observability

Product observability enables rapid debugging of product issues. WSO2 Identity Server (WSO2 IS) facilitates product observability by logging the time taken for LDAP and JDBC database calls. This helps to track down any latencies caused by database calls in an instance. The request calls and response calls are correlated via a correlation ID that is sent in the request call.

![Correleation ID]({{base_path}}/assets/img/setup/monitor/correlation-id.png)

!!! note
    By default, product observability is not enabled as it impacts on the product's performance.

## Configure product observability

### log4j configs

Follow the steps below to set up the correlation logs related to the database calls.

Following are the default correlation appender configuration. You can change any of these values using the `log4j2.properties` file in the `<IS_HOME>/repository/conf` directory.

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

    === "macOS/Linux"
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

    - For macOS/Linux: `wso2server.sh` file
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

### Customize JDBC database call logging

You can customize the log pattern for JDBC database call logging by specifying which fields should be included in the logs. This is done by passing the `org.wso2.CorrelationLogInterceptor.JdbcLogFields` system property when starting the server.

The following table lists the fields that can be included:

| Field Name | Description |
|------------|-------------|
| `METHOD_NAME` | Method name of the database call |
| `QUERY` | Executed database query |
| `CONNECTION_URL` | Database connection URL |
| `DATABASE_NAME` | Name of the database |

To customize the JDBC log pattern, execute a command similar to the following example when starting the server:

=== "macOS/Linux"
    ```
    sh wso2server.sh -DenableCorrelationLogs=true -Dorg.wso2.CorrelationLogInterceptor.JdbcLogFields=CONNECTION_URL,DATABASE_NAME start
    ```

=== "Windows"
    ```
    wso2server.bat -DenableCorrelationLogs=true -Dorg.wso2.CorrelationLogInterceptor.JdbcLogFields=CONNECTION_URL,DATABASE_NAME start
    ```

You can include any combination of the available fields based on your requirements.

## OpenTelemetry-based tracing in WSO2 Identity Server

Attaching a Java observability agent, such as the Datadog Java Agent, enables WSO2 Identity Server to automatically trace common operations, including API calls and database interactions. The agent’s built-in auto instrumentation generates these traces.

To provide even more comprehensive observability, WSO2 Identity Server offers explicit OpenTelemetry-based instrumentation for Lightweight Directory Protocol (LDAP) operations, such as search, bind, and lookup. Enabling this feature extends visibility to LDAP calls alongside other automatically traced operations.

The following sections explain how to configure tracing with the Datadog Java Agent. Once you attach and configure the agent, you can enable instrumentation for LDAP through the WSO2 Identity Server configuration.

### Configure the Datadog Java Agent

To set up tracing with the Datadog Java Agent you need the following components:

- The Datadog Java Agent (`dd-java-agent.jar`) attached to the WSO2 Identity Server Java Virtual Machine.
- A running Datadog Agent that receives spans from the Java Agent and forwards them to the Datadog platform.

To configure the Datadog Java Agent with WSO2 Identity Server, follow these steps:

1. Install and run the Datadog Agent following the [Datadog Agent installation guide](https://docs.datadoghq.com/getting_started/agent/#setup){: target="_blank"}.

2. Download the Datadog Java Agent (`dd-java-agent.jar`) from the [Datadog releases page](https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget){: target="_blank"}.

3. To enable tracing, add the agent and related configurations as Java options when starting WSO2 Identity Server. To do so,

    - Open the corresponding to your operating system.

        === "macOS/Linux"

            `<IS_HOME>/bin/wso2server.sh`

        === "Windows"

            `<IS_HOME>/bin/wso2server.bat`

    - Extend the `JAVA_OPTS` variable to include the Java agent option.  

        ```shell
        -javaagent:/path/to/dd-java-agent.jar
        ```

4. In the same file, add the required system properties as Java options to define service metadata and agent settings specific to the environment. For example:

    ```shell
    -Ddd.service="wso2is" \
    -Ddd.env="dev" \
    -Ddd.version=1.0 \
    -Ddd.logs.injection=true \
    -Ddd.trace.agent.host=localhost \
    -Ddd.trace.otel.enabled=true \
    ```

    Refer to the [Datadog Java Agent configuration documentation](https://docs.datadoghq.com/tracing/trace_collection/library_config/java/#configuration-options){: target="_blank"} for the full set of options.

5. Restart WSO2 Identity Server and confirm that traces appear in the [Datadog APM dashboard](https://docs.datadoghq.com/tracing/){: target="_blank"}.

### Enable LDAP tracing in WSO2 Identity Server

WSO2 Identity Server extends the Datadog Java Agent with OpenTelemetry-based LDAP instrumentation, capturing operations such as search, bind, and lookup for full tracing alongside API and database calls.

!!! note
    This feature is disabled by default to avoid any potential performance impact.

You can enter the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file to enable LDAP tracing.

```toml
[tracing.opentelemetry]
ldap.enabled = true
ldap.scope_name = "wso2isldap"
```

| Configuration Parameter | Description                                                                                                                                                                                               |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ldap.enabled`          | Enables OpenTelemetry-based tracing for LDAP operations. When set to `true`, WSO2 Identity Server instruments LDAP interactions such as `search`, `bind`, and `lookup`. The default value equals `false`. |
| `ldap.scope_name`       | Defines the OpenTelemetry instrumentation scope name for LDAP spans. The default value equals `"wso2isldap"`.                                                                                             |

When enabled, LDAP operations produce spans that include metadata such as operation type, base or target DN, search filters, execution duration, and error status where applicable. The configured Java agent exports these spans to the observability platform. The following example shows a sample span for the `ldap.search` operation (from Datadog).

```json
{
  "ldap": {
    "filter": "(&(objectClass=***)(member=uid=***,ou=***,dc=***,dc=***))",
    "search": {
      "controls": "{scope=2, countLimit=0, timeLimit=0, returningAttributes=[cn], derefLinkFlag=false, returningObjFlag=false}"
    },
    "success": "true",
    "dn": "ou=***,dc=***,dc=***"
  },
  "peer": {
    "hostname": "localhost",
    "port": 10390,
    "service": "ldap"
  },
  "correlation_id": "8787f3ba-6149-4aa7-a620-77889664bae3",
  "language": "java",
  "thread": {
    "name": "https-jsse-nio-9443-exec-9",
    "id": 244
  },
  "env": "dev",
  "version": "1.0",
  "span": {
    "kind": "client"
  },
  "duration": 1211208
}
```
