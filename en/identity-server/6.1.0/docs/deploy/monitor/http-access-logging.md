# HTTP Access Logging

HTTP access logs help you monitor your application's usage with
information such as the persons who access it, how many hits
it received, what the errors are, etc. This information is useful for
troubleshooting errors. WSO2 Identity Server can enable access logs for the
HTTP servlet transport. This servlet transport works on `9443`/`9763` ports,
and it receives admin/operation requests. So, access logs for the
servlet transport is useful for analysing operational/admin-level access
details.

## Configuring access logs for the HTTP servlet transport

In the Identity Server 5.9.0 only the access log pattern is configurable.

1. Open the `<IS_HOME>/repository/conf/deployment.toml`
    file.

2. Add the following configuration.

    ``` toml
    [http_access_log]
    pattern = "%h %l %u %t %r %s %b %{Referer}i %{User-Agent}i %T"
    ```

    The attributes that are used by default are explained below. See the
    descriptions of the Tomcat-supported [Access Log
    Valve attributes](http://tomcat.apache.org/tomcat-9.0-doc/config/valve.html#Access_Log_Valve/Attributes).

    <table style="width:100%;">
    <colgroup>
    <col style="width: 5%" />
    <col style="width: 94%" />
    </colgroup>
    <tbody>
    <tr class="odd">
    <td>directory</td>
    <td>The path to the directory that will store the access log file. By default, this is location is set to <code>               ${carbon.home}/repository/logs              </code> in all WSO2 products.</td>
    </tr>
    <tr class="even">
    <td>prefix</td>
    <td>The prefix added to the log file's name.</td>
    </tr>
    <tr class="odd">
    <td>suffix</td>
    <td>The suffix added to the log file's name. By default, this is .log for all WSO2 products.</td>
    </tr>
    <tr class="even">
    <td>pattern</td>
    <td><div class="content-wrapper">
    <p>The attribute defines the format for the log pattern, which consists of the information fields from the requests and responses that should be logged. The pattern format is created using the following attributes:</p>
    <ul>
    <li><p>A standard value to represent a particular string. For example, "%h" represents the remote host name in 
    the request. See the list of <a href="https://tomcat.apache.org/tomcat-9.0-doc/api/org/apache/catalina/valves/AccessLogValve.html">string replacement values supported by the Tomcat valve</a> .</p></li>
    <li><strong>%{xxx}i</strong> is used to represent the header in the incoming request (xxx=header value).</li>
    <li><strong>%{xxx}o</strong> is used to represents the header in the outgoing request (xxx=header value).</li>
    </ul>
    <p>While you can use the above attributes to define a custom pattern, the standard patterns shown below can be used.</p>
    <ul>
    <li><p><strong>common</strong> ( <a href="http://httpd.apache.org/docs/2.4/logs.html#common">Apache common log pattern</a> ):</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">pattern=%h %l %u %t <span class="st">&quot;%r&quot;</span> %s %b</a></code></pre></div>
    </div>
    </div></li>
    <li><p><strong>combined</strong> ( <a href="http://httpd.apache.org/docs/2.4/logs.html#combined">Apache combined log pattern</a> ):</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">pattern=%h %l %u %t <span class="st">&quot;%r&quot;</span> %s %b <span class="st">&quot;%{Referer}i&quot;</span> <span class="st">&quot;%{User-Agent}i&quot;</span></a></code></pre></div>
    </div>
    </div></li>
    </ul>
    </div></td>
    </tr>
    </tbody>
    </table>

3. Restart the server. According to the configurations, a log
    file named
    `http_access.{DATE}.log` is
    created by default inside the `<IS_HOME>/repository/logs` directory. The
    log is rotated on a daily basis.

### Routing access logs to the Log4j2 logger

By default, HTTP access logs write to a separate `http_access.log` file using the Tomcat Access Log Valve. WSO2 Identity Server also supports routing HTTP access logs through the Log4j2 logger, which gives you full control over where those logs go.

To enable Log4j2-based access logging, set `useLogger = true` in `<IS_HOME>/repository/conf/deployment.toml`:

```toml
[http_access_log]
useLogger = true
```

After enabling this, update `<IS_HOME>/repository/conf/log4j2.properties` to add the HTTP access log appender and logger.

#### Route to a dedicated rolling log file

If you want to keep HTTP access logs in their own file, separate from other server logs. To do so,

1. Add `HTTP_ACCESS` to the `appenders` list:

    ```properties
    appenders = CARBON_CONSOLE, CARBON_LOGFILE, AUDIT_LOGFILE, ATOMIKOS_LOGFILE,    CARBON_TRACE_LOGFILE, DELETE_EVENT_LOGFILE, TRANSACTION_LOGFILE, HTTP_ACCESS
    ```

2. Add `HTTP_ACCESS` to the `loggers` list:

    ```properties
    loggers = HTTP_ACCESS, AUDIT_LOG, trace-messages, ...
    ```

3. Add the appender and logger configuration:

    ```properties
    logger.HTTP_ACCESS.name = HTTP_ACCESS
    logger.HTTP_ACCESS.level = INFO
    logger.HTTP_ACCESS.appenderRef.HTTP_ACCESS.ref = HTTP_ACCESS
    logger.HTTP_ACCESS.additivity = false

    appender.HTTP_ACCESS.type = RollingFile
    appender.HTTP_ACCESS.name = HTTP_ACCESS
    appender.HTTP_ACCESS.fileName = ${sys:carbon.home}/repository/logs/http_access.log
    appender.HTTP_ACCESS.filePattern = ${sys:carbon.home}/repository/logs/http_access-%d    {MM-dd-yyyy}.log
    appender.HTTP_ACCESS.layout.type = PatternLayout
    appender.HTTP_ACCESS.layout.pattern = [%X{Correlation-ID}] %mm%n
    appender.HTTP_ACCESS.policies.type = Policies
    appender.HTTP_ACCESS.policies.time.type = TimeBasedTriggeringPolicy
    appender.HTTP_ACCESS.policies.time.interval = 1
    appender.HTTP_ACCESS.policies.time.modulate = true
    appender.HTTP_ACCESS.policies.size.type = SizeBasedTriggeringPolicy
    appender.HTTP_ACCESS.policies.size.size = 10MB
    appender.HTTP_ACCESS.strategy.type = DefaultRolloverStrategy
    appender.HTTP_ACCESS.strategy.max = 20
    appender.HTTP_ACCESS.filter.threshold.type = ThresholdFilter
    appender.HTTP_ACCESS.filter.threshold.level = INFO
    ```

#### Route to console only

In Kubernetes environments, logs are typically collected from standard output rather than files. To make HTTP access logs part of that flow, route them to the console alongside all other server logs. To do so,

1. Set `appenders` to `CARBON_CONSOLE` only:

    ```properties
    appenders = CARBON_CONSOLE
    ```

2. Add `HTTP_ACCESS` to the `loggers` list:

    ```properties
    loggers = HTTP_ACCESS, AUDIT_LOG, trace-messages, ...
    ```

3. Add the logger configuration:

    ```properties
    logger.HTTP_ACCESS.name = HTTP_ACCESS
    logger.HTTP_ACCESS.level = INFO
    logger.HTTP_ACCESS.appenderRef.HTTP_ACCESS.ref = CARBON_CONSOLE
    logger.HTTP_ACCESS.additivity = false
    ```

You can define other logging patterns and targets for the `HTTP_ACCESS` logger using standard Log4j2 configuration. See the [Log4j2 documentation](https://logging.apache.org/log4j/2.x/manual/configuration.html) for available options.

### Customizing access logs by pattern

Given below are a few sample configurations for customizing the
`pattern` attribute:

#### Example 1: Logging request headers

The configuration is as follows:

   ``` toml
   [http_access_log]
   pattern = "%{Content-Type}i %{Accept}i %{Accept-Encoding}i"
   ```

This sample configuration logs the Content-type,
Accept and Accept-encoding headers of every request coming to the
server. For example, in the following example, we use the
`RequestInfoExample` to send the HTTP request:

``` java
GET http://<IP>:<PORT>/example/servlets/servlet/RequestInfoExample?abc=xyz
```

The following log entry is recorded in the
`http_access.{DATE}.log` file.

``` java
text/plain; charset=utf-8        */*        gzip,deflate,sdch
```

#### Example 2: Logging response headers

The configuration is as follows:

   ``` toml
   [http_access_log]
   pattern = "%{Content-Type}o %{Content-Length}o %{Date}o %{Server}o"
   ```

The above configuration sample logs the `Content-type`,
`Content-Length`, `Date`, and `Server` headers of every response coming from the
server as follows:

``` java
text/html;charset=ISO-8859-1       662       Tue, 09 Jul 2013 11:21:50 GMT        WSO2 Carbon
```

#### Example 3: Logging other variable values

The configuration is as follows:

   ``` toml
   [http_access_log]
   pattern = "%r %q %h"
   ```

The above sample configuration logs the first line of the request
(method and request URI), query string (prepended with a '?' if it
exists), and a remote hostname (or IP) of every request coming to the
server as follows:

``` java
“GET http://<IP>:<PORT>//example/servlets/servlet/RequestInfoExample?abc=xyz HTTP/1.1”      ?abc=xyz     10.100.0.67
```

#### Example 4: Logging URL encoded parameters

You cannot use the `AccessLogValve` to log URL encoded
parameters. However, you can use the
`ExtendedAccessLogValve` attribute for this purpose. In
this example only two values (namely, `className`, and
`pattern`) are modified from the previous
configuration. Hence this will be added as a new valve.

The configuration is as follows:

```toml
[catalina.valves.valve.properties]
className = "org.apache.catalina.valves.ExtendedAccessLogValve"
directory="${carbon.home}/repository/logs"
prefix="localhost_access_log_extended."
suffix=".log"
pattern="x-P(param1) x-P(param2)"
```

Send the POST request together with the URL encoded values such as
`param1` = `value1` and
`param2` = `value2` as follows:

``` java
POST http://<IP>:<PORT>/example/servlets/servlet/RequestInfoExample
```

The above sample configuration logs the following:

``` java
'value1'     'value2'
```
