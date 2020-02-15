# Installation Prerequisites

Prior to installing any WSO2 Identity Server, it is necessary to
have the appropriate prerequisite software installed on your system.
Verify that the computer has the supported operating system and
development platforms before starting the installation.

### System requirements

<table>
<tbody>
<tr class="odd">
<th><p>Memory</p></th>
<td><ul>
<li>~ 2 GB minimum</li>
<li>~ 512 MB heap size. This is generally sufficient on DEV/QA with a low number of users.</li>
<li>~ 1 GB heap size for PROD environment, supporting the most common use cases (OAuth/SAML, Federation, etc.) with moderate traffic.</li>
</ul></td>
</tr>
<tr class="even">
<th><p>Disk</p></th>
<td><ul>
<li>~ 1 GB, excluding space allocated for log files and databases.</li>
</ul></td>
</tr>
</tbody>
</table>

### Environment compatibility

<table>
<colgroup>
<col style="width: 13%" />
<col style="width: 86%" />
</colgroup>
<tbody>
<tr class="odd">
<th><p>Operating Systems/ Databases/ User Stores</p></th>
<td><div class="content-wrapper">
<ul>
<li>WSO2 Identity Server requires an Oracle JDK 11 or JDK 8 compliant JDK. This will run on most common platforms that <strong>support Java 11 or Java 8.</strong> .</li>
<li>All WSO2 Carbon-based products are generally compatible with most common DBMSs. The embedded H2 database is suitable for development and testing. For enterprise production environments we recommend an industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, MS SQL, etc. For more information, see <a href="../../setup/working-with-databases">Working with Databases</a> .</li>
<li>WSO2 Identity Server supports using any of the following as a user store :
<ul>
<li>RDBMS</li>
<li>An LDAP such as OpenLDAP</li>
<li>Active Directory</li>
<li><a href="../../setup/configuring-user-stores">Custom user stores</a></li>
</ul></li>
</ul>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>
<ul>
<li>WSO2 Identity Server is shipped with a default embedded Apache DS that is suitable for development purposes. WSO2 does not recommend using Apache DS in a production environment due to scalability issues that exist with Apache DS.</li>
<li>WSO2 does not recommend using the H2 database as a user store in production environments. However, you can use the H2 database for development purposes if necessary.</li>
</ul>
</p>
</div>
<ul> 
<li>For environments that WSO2 products are tested with, see <a href="../../setup/environment-compatibility">Environment Compatibility</a> .</li>
<li>If you have difficulty setting up any WSO2 product in a specific platform or database, <a href="https://wso2.com/contact/">contact WSO2</a>.</li>
</ul>
</div></td>
</tr>
</tbody>
</table>

### Required applications

The following applications are required for running the product and its
samples or for building from the source code.

!!! note
    
    The applications marked with an asterisk \* are mandatory.

##### Running the product

These applications are mandatory and are required to run the binary
distribution of the WSO2 product. The binary distribution contains the
binary files for both MS Windows, and Linux-based operating systems.

<table>
<colgroup>
<col style="width: 11%" />
<col style="width: 36%" />
<col style="width: 36%" />
<col style="width: 15%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Application</p></th>
<th><p>Purpose</p></th>
<th><p>Version</p></th>
<th>Download Links</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>Java SE Development Kit (JDK)*</strong></p></td>
<td><ul>
<li>To launch the product as each product is a Java application.</li>
<li>To <a href="https://wso2.github.io/using-maven.html">build the product from the source distribution</a> (both JDK and Apache Maven are required).</li>
<li>To run Apache Ant.</li>
</ul></td>
<td><div class="content-wrapper">
<ul>
<li><p>Oracle JDK 8</p></li>
<li><p>Oracle JDK 11</p></li>
<li><p>OpenJDK 8</p></li>
<li><p>OpenJDK 11</p></li>
</ul>
<div class="admonition note">
<p class="admonition-title">Note</p>
<p>If you are using an Oracle JDK version lower than 8u161, you need to download the Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy files from <a href="https://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html">here</a> and add the files to the security directory of your Java installation to avoid <code>illegal key size</code> errors when you try to invoke a secured Web service.</p>
</div>
</div></td>
<td><div class="line number1 index0 alt2">
<a href="https://openjdk.java.net/install/">OpenJDK</a>
</div>
<div class="line number1 index0 alt2">
<a href="http://java.sun.com/javase/downloads/index.jsp">Oracle JDK</a>
</div></td>
</tr>
<tr class="even">
<td><p><strong>Web Browser*</strong></p></td>
<td><div class="content-wrapper">
<ul>
<li>To access the product's <a href="../../setup/running-the-product">Management Console</a>. The Web Browser must be JavaScript enabled to take full advantage of the Management console.</li>
</ul>
<div class="admonition note">
<p class="admonition-tile">Note</p>
<p><strong>Note:</strong> On Windows Server 2003, you must not go below the medium security level in Internet Explorer 6.x.</p>
</div>    
</div></td>
<td><p><br />
</p></td>
<td><br />
</td>
</tr>
</tbody>
</table>

##### Running samples and building from source

These applications are required for [building the product from the
source distribution](https://wso2.github.io/using-maven.html),
and compiling and running product samples.

!!! warning

    If you are installing by downloading and extracting the binary distribution (as recommended for most users) instead of building from the source code, you do not need to install Maven.

<table style="width:100%;">
<colgroup>
<col style="width: 12%" />
<col style="width: 55%" />
<col style="width: 13%" />
<col style="width: 19%" />
</colgroup>
<thead>
<tr class="header">
<th>Application
<p><br />
</p></th>
<th>Purpose</th>
<th>Version</th>
<th>Download Links</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>Apache Maven</strong></p></td>
<td><ul>
<li>To build the product from the source distribution (NOTE: both JDK and Apache Maven are required).<br />
<br />
</ul></td>
<td><p>3.0.x or later</p></td>
<td><p><a href="http://maven.apache.org/">Apache Maven</a></p></td>
</tr>
</tbody>
</table>
