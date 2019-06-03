# Configuring master-datasources.xml

Users can change the default configurations by editing the
`         <PRODUCT_HOME>/repository/conf/datasources/master-datasources.xml        `
file using the information in the following table.  

### XML Elements

Click on the table and use the left and right arrow keys to scroll
horizontally. For sample values, see the
[Example](#Configuringmaster-datasources.xml-exa) below the table.  

<table style="width:100%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>XML element</th>
<th>Attribute</th>
<th>Description</th>
<th>Data type</th>
<th>Default value</th>
<th>Mandatory/Optional</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>              &lt;datasources-configuration&gt;             </code></td>
<td><code>              xmlns             </code></td>
<td>The root element. The namespace is specified as: <code>              xmlns:svns="                             http://org.wso2.securevault/configuration                            "             </code></td>
<td></td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><code>              &lt;providers&gt;             </code></td>
<td></td>
<td>The container element for the datasource providers.</td>
<td></td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="odd">
<td><p><code>               &lt;provider&gt;              </code></p></td>
<td></td>
<td>The datasource provider, which should implement <code>              org.wso2.carbon.ndatasource.common                            .spi.DataSourceReader             </code> . The datasources follow a pluggable model in providing datasource type implementations using this approach.</td>
<td>Fully qualified Java class</td>
<td></td>
<td>Optional</td>
</tr>
<tr class="even">
<td><code>              &lt;datasources&gt;             </code></td>
<td></td>
<td>The container element for the datasources.</td>
<td></td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="odd">
<td><code>              &lt;datasource&gt;             </code></td>
<td></td>
<td>The root element of a datasource.</td>
<td></td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><code>              &lt;name&gt;             </code></td>
<td></td>
<td>Name of the datasource.</td>
<td>String</td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="odd">
<td><code>              &lt;description&gt;             </code></td>
<td></td>
<td>Description of the datasource.</td>
<td>String</td>
<td></td>
<td>Optional</td>
</tr>
<tr class="even">
<td><code>              &lt;jndiConfig&gt;             </code></td>
<td></td>
<td>The container element that allows you to expose this datasource as a JNDI datasource.</td>
<td></td>
<td></td>
<td>Optional</td>
</tr>
<tr class="odd">
<td><code>              &lt;name&gt;             </code></td>
<td></td>
<td>The JNDI resource name to which this datasource will be bound.</td>
<td>String</td>
<td></td>
<td>Mandatory if specifying JNDI configuration</td>
</tr>
<tr class="even">
<td><code>              &lt;environment&gt;             </code></td>
<td></td>
<td><p>The container element in which you specify the following JNDI properties:</p>
<ul>
<li><code>                java.naming.factory.initial               </code> :  Selects the registry service provider as the initial context.</li>
<li><code>                java.naming.provider.url               </code> : Specifies the location of the registry when the registry is being used as the initial context.</li>
</ul></td>
<td>Fully qualified Java class</td>
<td></td>
<td>Optional</td>
</tr>
<tr class="odd">
<td><code>              &lt;definition&gt;             </code></td>
<td><code>              type             </code></td>
<td>The container element for the data source definition. Set the type attribute to RDBMS, or to custom if you're creating a custom type. The "RDBMS" data source reader expects a "configuration" element with the sub-elements listed below.</td>
<td>String</td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><code>              &lt;configuration&gt;             </code></td>
<td></td>
<td>The container element for the RDBMS properties.</td>
<td></td>
<td></td>
<td>Mandatory if definition type is RDBMS</td>
</tr>
<tr class="odd">
<td><code>              &lt;url&gt;             </code></td>
<td></td>
<td>The connection URL to pass to the JDBC driver to establish the connection.</td>
<td>URL</td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="even">
<td><code>              &lt;username&gt;             </code></td>
<td></td>
<td>The connection user name to pass to the JDBC driver to establish the connection.</td>
<td>String</td>
<td></td>
<td>Optional</td>
</tr>
<tr class="odd">
<td><code>              &lt;password&gt;             </code></td>
<td></td>
<td>The connection password to pass to the JDBC driver to establish the connection.</td>
<td>String</td>
<td></td>
<td>Optional</td>
</tr>
<tr class="even">
<td><code>              &lt;driverClassName&gt;             </code></td>
<td></td>
<td>The class name of the JDBC driver to use.</td>
<td>Fully qualified Java class</td>
<td></td>
<td>Mandatory</td>
</tr>
<tr class="odd">
<td><code>              &lt;maxActive&gt;             </code></td>
<td></td>
<td>The maximum number of active connections that can be allocated from this pool at the same time.</td>
<td>Integer</td>
<td>100</td>
<td>Optional</td>
</tr>
<tr class="even">
<td><code>              &lt;maxWait&gt;             </code></td>
<td></td>
<td>Maximum number of milliseconds that the pool waits (when there are no available connections) for a connection to be returned before throwing an exception.</td>
<td>Integer</td>
<td>30000 (30 seconds)</td>
<td>Optional</td>
</tr>
<tr class="odd">
<td><code>              &lt;testOnBorrow&gt;             </code></td>
<td></td>
<td>Specifies whether objects will be validated before being borrowed from the pool. If the object fails to validate, it will be dropped from the pool, and we will attempt to borrow another.<br />
When set to true, the <code>              validationQuery             </code> parameter must be set to a non-null string.</td>
<td>Boolean</td>
<td>false</td>
<td>Optional</td>
</tr>
<tr class="even">
<td><code>              &lt;validationQuery&gt;             </code></td>
<td></td>
<td>The SQL query used to validate connections from this pool before returning them to the caller. If specified, this query does not have to return any data, it just can't throw a SQLException. The default value is null. Example values are SELECT 1(mysql), select 1 from dual(oracle), SELECT 1(MS Sql Server).</td>
<td>String</td>
<td>null</td>
<td>Mandatory when <code>              testOnBorrow             </code> is set to true</td>
</tr>
<tr class="odd">
<td><code>              &lt;validationInterval&gt;             </code></td>
<td></td>
<td>To avoid excess validation, only run validation at most at this frequency (interval time in milliseconds). If a connection is due for validation, but has been validated previously within this interval, it will not be validated again. The default value is 30000 (30 seconds).</td>
<td>Long</td>
<td>30000 (30 seconds)</td>
<td>Optional</td>
</tr>
</tbody>
</table>

### Example

``` html/xml
<datasources-configuration xmlns:svns="http://org.wso2.securevault/configuration">
  <providers>
    <provider>
    org.wso2.carbon.ndatasource.rdbms.RDBMSDataSourceReader
    </provider>
  </providers>
  <datasources>
    <datasource>
      <name>WSO2_CARBON_DB</name>
      <description>The datasource used for registry and user manager</description>
      <jndiConfig>
        <name>jdbc/WSO2CarbonDB</name>
      </jndiConfig>
      <definition type="RDBMS">
        <configuration>
          <url>
jdbc:h2:repository/database/WSO2CARBON_DB;DB_CLOSE_ON_EXIT=FALSE;LOCK_TIMEOUT=60000
          </url>
          <username>wso2carbon</username>
          <password>wso2carbon</password>
          <driverClassName>org.h2.Driver</driverClassName>
          <maxActive>50</maxActive>
          <maxWait>60000</maxWait>
          <testOnBorrow>true</testOnBorrow>
          <validationQuery>SELECT 1</validationQuery>
          <validationInterval>30000</validationInterval>
        </configuration>
      </definition>
    </datasource>
  </datasources>
</datasources-configuration>
```
