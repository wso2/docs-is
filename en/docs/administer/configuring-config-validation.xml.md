# Configuring config-validation.xml

The
`         <IS_HOME>/repository/conf/etc/config-validation.xml        `
file contains the recommended system configurations for a server. When
you start the server, the system configurations will be validated
against these recommendations, and warnings will be published if
conflicts are found.

Given below are the default recommendations in the
`         config-validation.xml        ` file. If required, you may
change some of these recommendations on this file according to the
conditions in your production environment.

### System Validation

Following are the system parameter values recommended for the purpose of
running a WSO2 product server.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Parameter Description</th>
<th>Parameter Value</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>CPU</td>
<td>Required processor speed.</td>
<td>800</td>
</tr>
<tr class="even">
<td>RAM</td>
<td>Required RAM in your environment.</td>
<td>2048</td>
</tr>
<tr class="odd">
<td>swap</td>
<td>Required space in hard disk to use for virtual memory.</td>
<td>2048</td>
</tr>
<tr class="even">
<td>freeDisk</td>
<td>Free disk space required in your environment.</td>
<td>1024</td>
</tr>
<tr class="odd">
<td>ulimit</td>
<td><div class="content-wrapper">
<p>The limit of resources per user. This value indicates the limit on the number of file descriptors a process may have.</p>
<p>This property is specified in the product startup script as shown below. For example, see the product startup script for Linux: <code>               &lt;IS_HOME&gt;/bin/wso2server.sh:              </code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">#ulimit -n <span class="dv">100000</span></a></code></pre></div>
</div>
</div>
</div></td>
<td>4096</td>
</tr>
</tbody>
</table>

If the values set for these parameters in your environment are less than
the recommendations, the following warnings will be published when you
start your server.

-   WARN - ValidationResultPrinter CPU speed (MHz):  \<systemCPU\>  of
    the system is below the recommended minimum speed : \<recommended
    value\>
-   WARN - ValidationResultPrinter RAM size (MB):  \<systemRam\>  of the
    system is below the recommended minimum size :\<recommended value\>
-   WARN - ValidationResultPrinter Swap Memory size (MB): \<systemSwap\>
    of the system is below the recommended minimum size :\<recommended
    value\>
-   WARN - ValidationResultPrinter Maximum free Disk Space (MB):
    \<systemDisk\> of the system is below the recommended minimum size
    :\<recommended value\>
-   WARN - ValidationResultPrinter Open files limit :  \<openFileLimit\>
    of the system is below the recommended minimum count :\<recommended
    value\>  

### JVM Validation

The following JVM heap size values are recommended by default in the
`         config-validation.xml        ` file.

| Parameter      | Description                                                                                      | Parameter Value |
|----------------|--------------------------------------------------------------------------------------------------|-----------------|
| initHeapSize   | The initial heap size that applies if the JVM requires more memory than is allocated by default. | 256             |
| maxHeapSize    | The maximum heap size that applies if the JVM requires more memory than is allocated by default. | 512             |
| maxPermGenSize | The maximum heap size of the permanent generation of heap.                                       | 256             |

These parameters are specified in the product startup script as shown
below, where, " `         -Xms"        `, " `         -Xmx"        `
and " `         -XX"        ` correspond to "initHeapSize",
"maxHeapSize" and "maxPermGenSize" respectively. For example, see the
product startup script for Linux:
`         <IS_HOME>/bin/wso2server.sh        `.

``` java
$JAVACMD \
-Xms256m -Xmx1024m -XX:MaxPermSize=256m \
```

If these heap size values in your product startup script are less than
the recommended values, the following warnings will be published when
you start your server:

-   WARN - ValidationResultPrinter Initial Heap Memory (MB) : \<system
    value\>  of the running JVM is set below the recommended minimum
    size :\<recommended value\>
-   WARN - ValidationResultPrinter Maximum Heap Memory (MB) : \<system
    value\> of the running JVM is set below the recommended minimum size
    :\<recommended value\>
-   WARN - ValidationResultPrinter Maximum PermGen space (MB) :\<system
    value\>  of the running JVM is set below the recommended minimum
    size :\<recommended value\>

### System Property Validation

According to the `         config-validation.xml        ` file, values
are required to be specified for the following properties in your
system. Note that it is not recommended to remove this validations as
these are mandatory settings.

-   `          carbon.home         `
-   `          carbon.config.dir.path         `
-   `          axis2.home         `

The `         carbon.home        ` and
`         carbon.config.dir.patch        ` properties are given in the
product startup script as shown below. For example, see the product
startup script for Linux:
`         <IS_HOME>/bin/wso2server.sh        `.

``` java
$JAVA_OPTS 
-Dcarbon.home="$CARBON_HOME" \
-Dcarbon.config.dir.path="$CARBON_HOME/repository/conf" \
```

The axis2.home property is given in the product startup script as shown
below. For example, see the product startup script for Linux:
`         <IS_HOME>/bin/wso2server.sh        `.

``` java
# Set AXIS2_HOME. Needed for One Click JAR Download
AXIS2_HOME=$CARBON_HOME
```

If the values for these properties are null in the product startup
script, the following warning message will be published when you start
the server: " Value is not set for the required system property :
\<property-value\>".

### Supported OS Validation

The product has been tested for compatibility with the following
operating systems, which are listed in the
`         config-validation.xml        ` file. Therefore, by default,
the system is validated against these operating systems.

-   `          Linux         `
-   `          Unix         `
-   `          Mac OS         `
-   `          Windows Server 2003         `
-   `          Windows XP         `
-   `          Windows Vista         `
-   `          Windows 7         `
-   `          Mac OS X         `
-   `          Windows Server 2008         `
-   `          Windows Server 2008 R2         `
-   `          AIX         `

If the OS in your environment is not included in this list, the
following warning message will be published when you start the server: "
WARN - ValidationResultPrinter The running OS : \<value\> is not a
tested Operating System for running WSO2 Carbon."
