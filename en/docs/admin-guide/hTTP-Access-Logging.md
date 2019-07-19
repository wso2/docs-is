# HTTP Access Logging

HTTP access logs help you monitor your application's usage with
information such as the persons who access it, how many hits
it received, what the errors are, etc. This information is useful for
troubleshooting errors. All WSO2 products can enable access logs for the
HTTP servlet transport. This servlet transport works on 9443/9763 ports,
and it recieves admin/operation requests. Therefore, access logs for the
servert transpot is useful for analysing operational/admin-level access
details.

!!! note
    
    Using WSO2 ESB, WSO2 EI, or WSO2 APIM?
    
    In products such as **WSO2 Enterprise Service Bus** (WSO2 ESB), **WSO2
    Enterprise Integrator** (WSO2 EI), and **WSO2 API Manager** (WSO2 APIM),
    access logs can be generated for the passthrough transport in addition
    to the HTTP servlet transport. The passthrough transport works on
    8280/8243 ports, and is used for API/Service invocations. By default,
    the access logs from both the servlet transport and the passthrough
    transport are written to a common access log file located in the
    `         <PRODUCT_HOME>/repository/logs/        ` directory.
    
    See the documentation for these specific products for instructions on
    how to use access logs.
    
    **Note** that access logs for the HTTP servlet transport logs details of
    the request as well as the response. However, the access logs for the
    passthrough transport only logs the request details.
    

See the topics given below to configure the default behaviour of HTTP
access logs in WSO2 products.

-   [Configuring access logs for the HTTP servlet
    transport](#HTTPAccessLogging-ConfiguringaccesslogsfortheHTTPservlettransport)
-   [Customizing access logs by
    pattern](#HTTPAccessLogging-Customizingaccesslogsbypattern)
    -   [Example 1: Logging request
        headers](#HTTPAccessLogging-Example1:Loggingrequestheaders)
    -   [Example 2: Logging response
        headers](#HTTPAccessLogging-Example2:Loggingresponseheaders)
    -   [Example 3: Logging other variable
        values](#HTTPAccessLogging-Example3:Loggingothervariablevalues)
    -   [Example 4: Logging URL encoded
        parameters](#HTTPAccessLogging-Example4:LoggingURLencodedparameters)

### Configuring access logs for the HTTP servlet transport

As the runtime of WSO2 products is based on Apache Tomcat, you can use
the `         Access_Log_Valve        ` variable in Tomcat as explained
below to configure access logs to the HTTP servlet transport:

1.  Open the \<
    `           PRODUCT_HOME>/repository/conf/tomcat/catalina-server.xml          `
    file (which is the server descriptor file for the embedded Tomcat
    integration)

2.  Customize the attributes for the
    `           Access_Log_Valve          ` variable shown below.

    ``` java
    <Valve className="org.apache.catalina.valves.AccessLogValve"
    directory="${carbon.home}/repository/logs"
    prefix="localhost_access_log_sample."
    suffix=".log"
    pattern="combined"
    ```

    The attributes that are used by default are explained below. See the
    descriptions of the Tomcat-supported [Access Log
    Valve attributes](http://tomcat.apache.org/tomcat-7.0-doc/config/valve.html#Access_Log_Valve/Attributes)
    and customize the required values.

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
    <li><p>A standard value to represent a particular string. For example, "%h" represents the remote host name in the request. See the list of <a href="https://tomcat.apache.org/tomcat-7.0-doc/api/org/apache/catalina/valves/AccessLogValve.html">string replacement values supported by the Tomcat valve</a> .</p></li>
    <li><strong>%{xxx}i</strong> is used to represent the header in the incoming request (xxx=header value).</li>
    <li><strong>%{xxx}o</strong> is used to represents the header in the outgoing request (xxx=header value).</li>
    </ul>
    <p>While you can use the above attributes to define a custom pattern, the standard patterns shown below can be used.</p>
    <ul>
    <li><p><strong>common</strong> ( <a href="http://httpd.apache.org/docs/1.3/logs.html#common">Apache common log pattern</a> ):</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">pattern=%h %l %u %t <span class="st">&quot;%r&quot;</span> %s %b</a></code></pre></div>
    </div>
    </div></li>
    <li><p><strong>combined</strong> ( <a href="http://httpd.apache.org/docs/1.3/logs.html#combined">Apache combined log pattern</a> ):</p>
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

3.  Restart the server. According to the default configurations, a log
    file named
    `           localhost_access_log_sample.{DATE}.log          ` is
    created inside the \<
    `           PRODUCT_HOME>/repository/logs          ` directory. The
    log is rotated on a daily basis.

### Customizing access logs by pattern

Given below are a few sample configurations for customizing the
`         pattern        ` attribute:

-   [Example 1: Logging request
    headers](#HTTPAccessLogging-Example1:Loggingrequestheaders)
-   [Example 2: Logging response
    headers](#HTTPAccessLogging-Example2:Loggingresponseheaders)
-   [Example 3: Logging other variable
    values](#HTTPAccessLogging-Example3:Loggingothervariablevalues)
-   [Example 4: Logging URL encoded
    parameters](#HTTPAccessLogging-Example4:LoggingURLencodedparameters)

#### Example 1: Logging request headers

The configuration is as follows:

``` java
<Valve className="org.apache.catalina.valves.AccessLogValve"
directory="${carbon.home}/repository/logs"
prefix="localhost_access_log_test."
suffix=".log"
pattern="%{Content-Type}i %{Accept}i %{Accept-Encoding}i"
/>
```

This sample configuration logs the Content-type,
Accept and Accept-encoding headers of every request coming to the
server. For example, in the following example, we use the
`         RequestInfoExample        ` to send the HTTP request:

``` java
GET http://<IP>:<PORT>/example/servlets/servlet/RequestInfoExample?abc=xyz
```

The following log entry is recorded in the
`         localhost_access_log_sample.{DATE}.log        ` file.

``` java
text/plain; charset=utf-8        */*        gzip,deflate,sdch
```

#### Example 2: Logging response headers

The configuration is as follows:

``` java
<Valve className="org.apache.catalina.valves.AccessLogValve"
directory="${carbon.home}/repository/logs"
prefix="localhost_access_log_test."
suffix=".log"
pattern="%{Content-Type}o %{Content-Length}o %{Date}o %{Server}o"
/>
```

The a bove configuration sample logs the `         Content-type        `
, `         Content-Length        `, `         Date,        ` and
`         Server        ` headers of every response coming from the
server as follows:

``` java
text/html;charset=ISO-8859-1       662       Tue, 09 Jul 2013 11:21:50 GMT        WSO2 Carbon
```

#### Example 3: Logging other variable values

The configuration is as follows:

``` java
<Valve className="org.apache.catalina.valves.AccessLogValve"
directory="${carbon.home}/repository/logs"
prefix="localhost_access_log_test."
suffix=".log"
pattern="%r %q %h"
/>
```

The above sample configuration logs the f irst line of the request
(method and request URI), query string (prepended with a '?' if it
exists), and a remote hostname (or IP) of every request coming to the
server as follows:

``` java
“GET /example/servlets/servlet/RequestInfoExample?abc=xyz HTTP/1.1”      ?abc=xyz     10.100.0.67
```

#### Example 4: Logging URL encoded parameters

You cannot use the `         AccessLogValve        ` to log URL encoded
parameters. However, you can use the
`         ExtendedAccessLogValve        ` attribute for this purpose. In
this example only two values (namely, `         className        `, and
`         pattern        ` ) are modified from the previous
configuration.

The configuration is as follows:

``` java
<Valve className="org.apache.catalina.valves.ExtendedAccessLogValve" 
directory="${carbon.home}/repository/logs"
prefix="localhost_access_log_extended."
suffix=".log"
pattern="x-P(param1) x-P(param2)"
/>
```

Send the POST request together with the URL encoded values such as
`         param1        ` = `         value1        ` and
`         param2        ` = `         value2        ` as follows:

``` java
POST http://<IP>:<PORT>/example/servlets/servlet/RequestInfoExample
```

The above sample configuration logs the following:

``` java
'value1'     'value2'
```
