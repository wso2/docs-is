# Configuring catalina-server.xml

Users can change the default configurations by editing the
`         <IS_HOME>/repository/conf/tomcat/catalina-server.xml        `
file using the information given below.

Click on the table and use the left and right arrow keys to scroll
horizontally.

### XML Elements

<table style="width:100%;">
<colgroup>
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
<col style="width: 14%" />
</colgroup>
<thead>
<tr class="header">
<th>XML element</th>
<th>Attribute</th>
<th>Description</th>
<th>Data type</th>
<th>Default value</th>
<th>Mandatory/Optional</th>
<th>Sample</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>&lt;Server&gt;</td>
<td></td>
<td>A Server element represents the entire Catalina servlet container. Therefore, it must be the single outermost element in the conf/server.xml configuration file. Its attributes represent the characteristics of the servlet container as a whole.<br />
<br />
<br />
<br />
</td>
<td></td>
<td></td>
<td>Mandatory</td>
<td>&lt;Server shutdown="SHUTDOWN" port="8005"&gt;</td>
</tr>
<tr class="even">
<td></td>
<td>shutdown</td>
<td>The command string that must be received via a TCP/IP connection to the specified port number, in order to shut down Tomcat.</td>
<td>String</td>
<td>SHUTDOWN</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>port</td>
<td><p>The TCP/IP port number on which this server waits for a shutdown command. Set to -1 to disable the shutdown port.</p>
<p>Note: Disabling the shutdown port works well when Tomcat is started using Apache Commons Daemon (running as a service on Windows or with jsvc on un*xes). It cannot be used when running Tomcat with the standard shell scripts though, as it will prevent shutdown.bat|.sh and catalina.bat|.sh from stopping it gracefully.</p></td>
<td>Int</td>
<td>8005</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>_ &lt;Service&gt;</td>
<td></td>
<td>A Service element represents the combination of one or more Connector components that share a single Engine component for processing incoming requests. One or more Service elements may be nested inside a Server element.</td>
<td></td>
<td></td>
<td>Mandatory</td>
<td>&lt;Service name="Catalina" className="org.wso2.carbon.tomcat.ext.service.ExtendedStandardService"&gt;</td>
</tr>
<tr class="odd">
<td></td>
<td>name</td>
<td>The display name of this Service, which will be included in log messages if you utilize standard Catalina components. The name of each Service that is associated with a particular Server must be unique.</td>
<td>String</td>
<td>Catalina</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>className</td>
<td>Java class name of the implementation to use. This class must implement the org.apache.catalina.Service interface. If no class name is specified, the standard implementation will be used.</td>
<td>String</td>
<td>org.wso2.carbon.tomcat.ext.service.ExtendedStandardService</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>__ &lt;Connector&gt;</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>Optional</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>Connector port=&quot;9763&quot; URIEncoding=&quot;UTF-8&quot; compressableMimeType=&quot;text/html,text/javascript,application/x-javascript,application/javascript,application/xml,text/css,application/xslt+xml,text/xsl,image/gif,image/jpg,image/jpeg&quot; noCompressionUserAgents=&quot;gozilla, traviata&quot; compressionMinSize=&quot;2048&quot; compression=&quot;on&quot; server=&quot;WSO2 Carbon Server&quot; acceptCount=&quot;200&quot; maxKeepAliveRequests=&quot;200&quot; connectionUploadTimeout=&quot;120000&quot; disableUploadTimeout=&quot;false&quot; minSpareThreads=&quot;50&quot; maxThreads=&quot;250&quot; acceptorThreadCount=&quot;2&quot; maxHttpHeaderSize=&quot;8192&quot; bindOnInit=&quot;false&quot; redirectPort=&quot;9443&quot; protocol=&quot;org.apache.coyote.http11.Http11NioProtocol&quot;/&gt;</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td></td>
<td>port</td>
<td>The TCP port number on which this Connector will create a server socket and await incoming connections. Your operating system will allow only one server application to listen to a particular port number on a particular IP address. If the special value of 0 (zero) is used, then Tomcat will select a free port at random to use for this connector. This is typically only useful in embedded and testing applications.</td>
<td>Int</td>
<td>9763</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>URIEncoding</td>
<td>This specifies the character encoding used to decode the URI bytes, after %xx decoding the URL.</td>
<td>Int</td>
<td>UTF-8</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>compressableMimeType</td>
<td>The value is a comma separated list of MIME types for which HTTP compression may be used.</td>
<td>String</td>
<td>text/html,text/javascript,application/x-javascript,application/javascript,application/xml,text/css,application/xslt+xml,text/xsl,image/gif,image/jpg,image/jpeg</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>noCompressionUserAgents</td>
<td>The value is a regular expression (using java.util.regex) matching the user-agent header of HTTP clients for which compression should not be used, because these clients, although they do advertise support for the feature, have a broken implementation.</td>
<td>String</td>
<td>gozilla, traviata</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>compressionMinSize</td>
<td>If compression is set to "on" then this attribute may be used to specify the minimum amount of data before the output is compressed.</td>
<td>Int</td>
<td>2048</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>compression</td>
<td><p>The Connector may use HTTP/1.1 GZIP compression in an attempt to save server bandwidth. The acceptable values for the parameter is "off" (disable compression), "on" (allow compression, which causes text data to be compressed), "force" (forces compression in all cases), or a numerical integer value (which is equivalent to "on", but specifies the minimum amount of data before the output is compressed). If the content-length is not known and compression is set to "on" or more aggressive, the output will also be compressed. If not specified, this attribute is set to "off".</p>
<p>Note: There is a tradeoff between using compression (saving your bandwidth) and using the sendfile feature (saving your CPU cycles). If the connector supports the sendfile feature, e.g. the NIO connector, using sendfile will take precedence over compression. The symptoms will be that static files greater that 48 Kb will be sent uncompressed. You can turn off sendfile by setting useSendfile attribute of the connector, as documented below, or change the sendfile usage threshold in the configuration of the DefaultServlet in the default conf/web.xml or in the web.xml of your web application.</p></td>
<td>String</td>
<td>on</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>server</td>
<td>Overrides the Server header for the http response. If set, the value for this attribute overrides the Tomcat default and any Server header set by a web application. If not set, any value specified by the application is used. Most often, this feature is not required.</td>
<td>String</td>
<td>WSO2 Carbon Server</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>acceptCount</td>
<td>The maximum queue length for incoming connection requests when all possible request processing threads are in use. Any requests received when the queue is full will be refused.</td>
<td>Int</td>
<td>200</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>maxKeepAliveRequests</td>
<td>The maximum number of HTTP requests which can be pipelined until the connection is closed by the server. Setting this attribute to 1 will disable HTTP/1.0 keep-alive, as well as HTTP/1.1 keep-alive and pipelining. Setting this to -1 will allow an unlimited amount of pipelined or keep-alive HTTP requests.</td>
<td>Int</td>
<td>200</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>connectionUploadTimeout</td>
<td>Specifies the timeout, in milliseconds, to use while a data upload is in progress. This only takes effect if disableUploadTimeout is set to false.</td>
<td>Int</td>
<td>120000</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>disableUploadTimeout</td>
<td>This flag allows the servlet container to use a different, usually longer connection timeout during data upload.</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>minSpareThreads</td>
<td>The minimum number of threads always kept running.</td>
<td>Int</td>
<td>50</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>maxThreads</td>
<td>The maximum number of request processing threads to be created by this Connector, which therefore determines the maximum number of simultaneous requests that can be handled. If an executor is associated with this connector, this attribute is ignored as the connector will execute tasks using the executor rather than an internal thread pool.</td>
<td>Int</td>
<td>250</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>acceptorThreadCount</td>
<td>The number of threads to be used to accept connections. Increase this value on a multi CPU machine, although you would never really need more than 2. Also, with a lot of non keep alive connections, you might want to increase this value as well.</td>
<td>Int</td>
<td>2</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>maxHttpHeaderSize</td>
<td>The maximum size of the request and response HTTP header, specified in bytes.</td>
<td>Int</td>
<td>8192</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>bindOnInit</td>
<td>Controls when the socket used by the connector is bound. By default it is bound when the connector is initiated and unbound when the connector is destroyed. If set to false, the socket will be bound when the connector is started and unbound when it is stopped.</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>redirectPort</td>
<td>If this Connector is supporting non-SSL requests, and a request is received for which a matching &lt;security-constraint&gt; requires SSL transport, Catalina will automatically redirect the request to the port number specified here.</td>
<td>Int</td>
<td>9443</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>protocol</td>
<td><p>Sets the protocol to handle incoming traffic.</p></td>
<td>String</td>
<td>org.apache.coyote.http11.Http11NioProtocol</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>SSLEnabled</td>
<td>Use this attribute to enable SSL traffic on a connector. To turn on SSL handshake/encryption/decryption on a connector set this value to true. The default value is false. When turning this value to true you will want to set the scheme and the secure attributes as well to pass the correct request.getScheme() andrequest.isSecure() values to the servlets See SSL Support for more information.</td>
<td>Boolean</td>
<td>true</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>secure</td>
<td>Set this attribute to true if you wish to have calls to request.isSecure() to return true for requests received by this Connector. You would want this on an SSL Connector or a non SSL connector that is receiving data from a SSL accelerator, like a crypto card, a SSL appliance or even a webserver.</td>
<td>Boolean</td>
<td>true</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>scheme</td>
<td>Set this attribute to the name of the protocol you wish to have returned by calls to request.getScheme(). For example, you would set this attribute to "https" for an SSL Connector.</td>
<td>String</td>
<td>https</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>clientAuth</td>
<td>Set to true if you want the SSL stack to require a valid certificate chain from the client before accepting a connection. Set to false if you want the SSL stack to request a client Certificate, but not fail if one isn't presented. A false value will not require a certificate chain unless the client requests a resource protected by a security constraint that uses CLIENT-CERT authentication.</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>enableLookups</td>
<td>Set to true if you want calls to request.getRemoteHost() to perform DNS lookups in order to return the actual host name of the remote client. Set to false to skip the DNS lookup and return the IP address in String form instead (thereby improving performance). By default, DNS lookups are disabled.</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>sslProtocol</td>
<td><p>The SSL protocol(s) to use (a single value may enable multiple protocols - see the JVM documentation for details). The permitted values may be obtained from the JVM documentation for the allowed values for algorithm when creating an SSLContext instance e.g. Oracle Java 6 and Oracle Java 7.</p>
<p>Note: There is overlap between this attribute and sslEnabledProtocols.</p></td>
<td>String</td>
<td>TLS</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>keystoreFile<br />
keystorePass</td>
<td>This setting allows you to use separate keystore and security certificates for SSL connections. The location of the keystore file and the keystore password can be given for these parameters. Note that by default, these parameters point to the location and password of the default keystore in the Carbon server.</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>__ &lt;Engine&gt;</td>
<td></td>
<td>The Engine element represents the entire request processing machinery associated with a particular Catalina Service. It receives and processes all requests from one or more Connectors, and returns the completed response to the Connector for ultimate transmission back to the client.<br />
Exactly one Engine element MUST be nested inside a Service element, following all of the corresponding Connector elements associated with this Service.</td>
<td></td>
<td></td>
<td>Mandatory</td>
<td>&lt;Engine name="Catalina" defaultHost="localhost"&gt;</td>
</tr>
<tr class="even">
<td></td>
<td>name</td>
<td>Logical name of this Engine, used in log and error messages. When using multiple Service elements in the same Server, each Engine MUST be assigned a unique name.</td>
<td>String</td>
<td>Catalina</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>defaultHost</td>
<td>The default host name, which identifies the Host that will process requests directed to host names on this server, but which are not configured in this configuration file. This name MUST match the name attributes of one of the Host elements nested immediately inside.</td>
<td>String</td>
<td>localhost</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>___ &lt;Realm&gt;</td>
<td></td>
<td>A Realm element represents a "database" of usernames, passwords, and roles (similar to Unix groups) assigned to those users. Different implementations of Realm allow Catalina to be integrated into environments where such authentication information is already being created and maintained, and then utilize that information to implement Container Managed Security as described in the Servlet Specification.<br />
You may nest a Realm inside any Catalina container Engine, Host, or Context). In addition, Realms associated with an Engine or a Host are automatically inherited by lower-level containers, unless explicitly overridden.</td>
<td></td>
<td></td>
<td>Mandatory</td>
<td>&lt;Realm className="org.wso2.carbon.tomcat.ext.realms.CarbonTomcatRealm"/&gt;</td>
</tr>
<tr class="odd">
<td></td>
<td>className</td>
<td>Java class name of the implementation to use. This class must implement the org.apache.catalina.Realminterface.</td>
<td>String</td>
<td>org.wso2.carbon.tomcat.ext.realms.CarbonTomcatRealm</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>___ &lt;Host&gt;</td>
<td></td>
<td>The Host element represents a virtual host, which is an association of a network name for a server (such as " <a href="http://www.mycompany.com">www.mycompany.com</a> " with the particular server on which Tomcat is running. For clients to be able to connect to a Tomcat server using its network name, this name must be registered in the Domain Name Service (DNS) server that manages the Internet domain you belong to - contact your Network Administrator for more information.<br />
<br />
In many cases, System Administrators wish to associate more than one network name (such as <a href="http://www.mycompany.com">www.mycompany.com</a> and company.com) with the same virtual host and applications. This can be accomplished using the Host Name Aliases feature discussed below.<br />
<br />
One or more Host elements are nested inside an Engine element. Inside the Host element, you can nest Context elements for the web applications associated with this virtual host. Exactly one of the Hosts associated with each Engine MUST have a name matching the defaultHost attribute of that Engine.<br />
<br />
Clients normally use host names to identify the server they wish to connect to. This host name is also included in the HTTP request headers. Tomcat extracts the host name from the HTTP headers and looks for a Host with a matching name. If no match is found, the request is routed to the default host. The name of the default host does not have to match a DNS name (although it can) since any request where the DNS name does not match the name of a Host element will be routed to the default host.</td>
<td></td>
<td></td>
<td>Mandatory</td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>name</td>
<td>Usually the network name of this virtual host, as registered in your Domain Name Service server. Regardless of the case used to specify the host name, Tomcat will convert it to lower case internally. One of the Hosts nested within an Engine MUST have a name that matches the defaultHost setting for that Engine. See Host Name Aliases for information on how to assign more than one network name to the same virtual host.</td>
<td>String</td>
<td>localhost</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>appBase</td>
<td>The Application Base directory for this virtual host. This is the pathname of a directory that may contain web applications to be deployed on this virtual host. You may specify an absolute pathname, or a pathname that is relative to the $CATALINA_BASE directory. See Automatic Application Deployment for more information on automatic recognition and deployment of web applications. If not specified, the default of webapps will be used.</td>
<td>String</td>
<td>${carbon.home}/repository/deployment/server/webapps/</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>autoDeploy</td>
<td>This flag value indicates if Tomcat should check periodically for new or updated web applications while Tomcat is running. If true, Tomcat periodically checks the appBase and xmlBase directories and deploys any new web applications or context XML descriptors found. Updated web applications or context XML descriptors will trigger a reload of the web application. See Automatic Application Deployment for more information.</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>deployOnStartup</td>
<td>This flag value indicates if web applications from this host should be automatically deployed when Tomcat starts. See Automatic Application Deployment for more information.</td>
<td>Boolean</td>
<td>false</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>unpackWARs</td>
<td>Set to true if you want web applications that are placed in the appBase directory as web application archive (WAR) files to be unpacked into a corresponding disk directory structure, false to run such web applications directly from a WAR file. WAR files located outside of the Host's appBase will not be expanded.</td>
<td>Boolean</td>
<td>true</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>____ &lt;Valve&gt;</td>
<td></td>
<td>The Access Log Valve creates log files in the same format as those created by standard web servers. These logs can later be analyzed by standard log analysis tools to track page hit counts, user session activity, and so on. The files produces by this Valve are rolled over nightly at midnight. This Valve may be associated with any Catalina container (Context, Host, orEngine), and will record ALL requests processed by that container.<br />
Some requests may be handled by Tomcat before they are passed to a container. These include redirects from /foo to /foo/ and the rejection of invalid requests. Where Tomcat can identify the Context that would have handled the request, the request/response will be logged in the AccessLog(s) associated Context, Host and Engine. Where Tomcat cannot identify theContext that would have handled the request, e.g. in cases where the URL is invalid, Tomcat will look first in the Engine, then the default Host for the Engine and finally the ROOT (or default) Context for the default Host for an AccessLog implementation. Tomcat will use the first AccessLog implementation found to log those requests that are rejected before they are passed to a container.<br />
<br />
The output file will be placed in the directory given by the directory attribute. The name of the file is composed by concatenation of the configured prefix, timestamp and suffix. The format of the timestamp in the file name can be set using the fileDateFormat attribute. This timestamp will be omitted if the file rotation is switched off by setting rotatable to false.<br />
<br />
Warning: If multiple AccessLogValve instances are used, they should be configured to use different output files.<br />
<br />
If sendfile is used, the response bytes will be written asynchronously in a separate thread and the access log valve will not know how many bytes were actually written. In this case, the number of bytes that was passed to the sendfile thread for writing will be recorded in the access log valve.</td>
<td></td>
<td></td>
<td>Mandatory</td>
<td>&lt;Valve className="org.apache.catalina.valves.AccessLogValve" pattern="combined" suffix=".log" prefix="http_access_" directory="${carbon.home}/repository/logs"/&gt;</td>
</tr>
<tr class="odd">
<td></td>
<td>className</td>
<td>Java class name of the implementation to use.</td>
<td>String</td>
<td>org.wso2.carbon.tomcat.ext.valves.CarbonContextCreatorValve, org.apache.catalina.valves.AccessLogValve</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>pattern</td>
<td>A formatting layout identifying the various information fields from the request and response to be logged, or the word common or combined to select a standard format.</td>
<td>String</td>
<td>combined</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>suffix</td>
<td>The suffix added to the end of each log file name.</td>
<td>String</td>
<td>.log</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>prefix</td>
<td>The prefix added to the start of each log file name.</td>
<td>String</td>
<td>http_access_</td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td></td>
<td>directory</td>
<td>Absolute or relative path name of a directory in which log files created by this valve will be placed. If a relative path is specified, it is interpreted as relative to $CATALINA_BASE. If no directory attribute is specified, the default value is "logs" (relative to $CATALINA_BASE).</td>
<td>String</td>
<td>${carbon.home}/repository/logs</td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td></td>
<td>threshold</td>
<td><p>Minimum duration in seconds after which a thread is considered stuck. If set to 0, the detection is disabled.</p>
<p>Note: since the detection is done in the background thread of the Container (Engine, Host or Context) declaring this Valve, the threshold should be higher than the backgroundProcessorDelay of this Container.<br />
<br />
</p></td>
<td>Int</td>
<td>600</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
