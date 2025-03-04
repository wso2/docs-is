# HTTP Access Logging

HTTP access logs help you monitor your application's usage with information such as the persons who access it, how many hits it received, what the errors are, etc. This information is useful for troubleshooting errors. WSO2 Identity Server can enable access logs for the HTTP servlet transport. This servlet transport works on `9443`/`9763` ports, and it receives admin/operation requests.
Therefore, access logs for the servlet transport are useful for analyzing operational/admin-level access details.

## Configure access logs for the HTTP servlet transport

To configure access logs for HTTP servlet transport:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following configuration.

    ``` toml
    [http_access_log]
    pattern = "%h %l %u %t %r %s %b %{Referer}i %{User-Agent}i %T"
    ```

    The attributes that are used by default are explained below. See the descriptions of the Tomcat-supported [Access Log Valve attributes](http://tomcat.apache.org/tomcat-9.0-doc/config/valve.html#Access_Log_Valve/Attributes).

    <table style="width:100%;">
        <colgroup>
            <col style="width: 5%" />
            <col style="width: 94%" />
        </colgroup>
    <tbody>
        <tr class="odd">
            <td>directory</td>
            <td>The path to the directory that will store the access log file. By default, this location is set to <code>${carbon.home}/repository/logs</code> in all WSO2 products.</td>
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
            <td>
            <p>The attribute defines the format for the log pattern, which consists of the information fields from the requests and responses that should be logged. The pattern format is created using the following attributes:</p>
            <ul>
                <li><p>A standard value to represent a particular string. For example, "%h" represents the remote hostname in the request. See the list of <a href="https://tomcat.apache.org/tomcat-9.0-doc/api/org/apache/catalina/valves/AccessLogValve.html">string replacement values supported by the Tomcat valve</a> .</p></li>
                <li><strong>%{xxx}i</strong> is used to represent the header in the incoming request (xxx=header value).</li>
                <li><strong>%{xxx}o</strong> is used to represent the header in the outgoing request (xxx=header value).</li>
            </ul>
            <p>While you can use the above attributes to define a custom pattern, the standard patterns shown below can be used.</p>
            <ul>
                <li><p><strong>common</strong> (<a href="http://httpd.apache.org/docs/2.4/logs.html#common">Apache common log pattern</a>):</p>
                <code>pattern=%h %l %u %t "%r" %s %b</code>
                <li><p><strong>combined</strong> (<a href="http://httpd.apache.org/docs/2.4/logs.html#combined">Apache combined log pattern</a>):</p>
                <code>pattern=%h %l %u %t "%r" %s %b "%{Referer}i" "%{User-Agent}i"</code>
            </td>
        </tr>
    </tbody>
    </table>

3. Restart the server. According to the configurations, a log file named `http_access.{DATE}.log` is created by default inside the `<IS_HOME>/repository/logs` directory. The log is rotated daily.

### Customizing access logs by pattern

Given below are a few sample configurations for customizing the `pattern` attribute:

#### Example 1: Logging request headers

The configuration is as follows:

``` toml
[http_access_log]
pattern = "%{Content-Type}i %{Accept}i %{Accept-Encoding}i"
```

This sample configuration logs the Content-type, Accept, and Accept-encoding headers of every request coming to the server. For example, in the following example, we use the `RequestInfoExample` to send the HTTP request:

``` java
GET http://<IP>:<PORT>/example/servlets/servlet/RequestInfoExample?abc=xyz
```

The following log entry is recorded in the `http_access.{DATE}.log` file.

``` java
text/plain; charset=utf-8        */*        gzip,deflate,sdch
```

#### Example 2: Logging response headers

The configuration is as follows:

``` toml
[http_access_log]
pattern = "%{Content-Type}o %{Content-Length}o %{Date}o %{Server}o"
```

The above configuration sample logs the `Content-type`, `Content-Length`, `Date,` and `Server` headers of every response coming from the server as follows:

``` java
text/html;charset=ISO-8859-1       662       Tue, 09 Jul 2013 11:21:50 GMT        WSO2 Carbon
```

#### Example 3: Logging other variable values

The configuration is as follows:

``` toml
[http_access_log]
pattern = "%r %q %h"
```

The above sample configuration logs the first line of the request (method and request URI), query string (prepended with a '?' if it exists), and a remote hostname (or IP) of every request coming to the server as follows:

``` java
“GET http://<IP>:<PORT>//example/servlets/servlet/RequestInfoExample?abc=xyz HTTP/1.1”      ?abc=xyz     10.100.0.67
```

#### Example 4: Logging URL encoded parameters

You cannot use the `AccessLogValve` to log URL-encoded parameters. However, you can use the `ExtendedAccessLogValve` attribute for this purpose. In this example, only two values (namely, `className`, and `pattern` ) are modified from the previous configuration. Hence this will be added as a new valve.

The configuration is as follows:

```toml
[catalina.valves.valve.properties]
className = "org.apache.catalina.valves.ExtendedAccessLogValve"
directory="${carbon.home}/repository/logs"
prefix="localhost_access_log_extended."
suffix=".log"
pattern="x-P(param1) x-P(param2)"
```

Send the POST request together with the URL encoded values such as `param1` = `value1` and `param2` = `value2` as follows:

``` java
POST http://<IP>:<PORT>/example/servlets/servlet/RequestInfoExample
```

The above sample configuration logs the following:

``` java
'value1'     'value2'
```