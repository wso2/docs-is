# Configuring registry.xml

Users can change the default configurations by editing the
`         <PRODUCT_HOME>/repository/conf/registry.xml        ` file
using the information given below. Click on the table and use the left
and right arrow keys to scroll horizontally.

### XML Elements

<table>
<thead>
<tr class="header">
<th>XML element</th>
<th>Attribute</th>
<th>Description</th>
<th>Data type</th>
<th>Default value</th>
<th>Mandatory/<br />
Optional</th>
<th>Sample</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>&lt;wso2registry&gt;</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>&lt;cacheConfig&gt;</td>
<td><br />
</td>
<td>When an application requests to use a particular resource stored in the registry or creates/modifies a resource in the registry, the Carbon server will cache the resource for subsequent use. The <code>             &lt;cacheConfig&gt;            </code> element in this file is used to configure the time period for which a resource can be cached.</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>&lt;lastAccessedExpirationMillis&gt;</td>
<td><br />
</td>
<td>Specifies the time period for which a resource in the registry will be cached after it is <strong>read</strong> by an application.</td>
<td><br />
</td>
<td>15</td>
<td>Optional</td>
<td>&lt;lastAccessedExpirationMillis&gt;60000&lt;/lastAccessedExpirationMillis&gt;</td>
</tr>
<tr class="even">
<td>&lt;lastModifiedExpirationMillis&gt;</td>
<td><br />
</td>
<td>Specifies the time period for which a resource in the registry will be cached after it is <strong>created or modified</strong> .</td>
<td><br />
</td>
<td>15</td>
<td>Optional</td>
<td>&lt;lastModifiedExpirationMillis&gt;60000&lt;/lastModifiedExpirationMillis&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;currentDBConfig&gt;</td>
<td><br />
</td>
<td><p>The server can only handle one active configuration at a time. The currentDBConfig parameter defined in the registry.xml is used to specify the database configuration that is active at present. The value of the currentDBConfig parameter should be a valid name of a database configuration defined on the registry.xml file.</p></td>
<td>String</td>
<td>wso2registry</td>
<td>Mandatory</td>
<td>&lt;currentDBConfig&gt;wso2registry<br />
&lt;/currentDBConfig&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;readOnly&gt;</td>
<td><br />
</td>
<td><p>To run the registry in read-only mode, set the readOnly element to true. Setting the read-only mode allows you to run an immutable instance of registry repository. This setting is valid on a global level.</p></td>
<td>Boolean</td>
<td>false</td>
<td>Mandatory</td>
<td>&lt;readOnly&gt;false&lt;/readOnly&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;enableCache&gt;</td>
<td><br />
</td>
<td>To enable registry caching, set the enableCache element to true. Once caching is enabled, repetitive read operations will be executed against the cache instead of the database. This setting is valid on a global level.</td>
<td>Boolean</td>
<td>true</td>
<td>Mandatory</td>
<td>&lt;enableCache&gt;true&lt;/enableCache&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;registryRoot&gt;</td>
<td><br />
</td>
<td><p>The registryRoot parameter can be used to define the apparent root of the running instance of the server. This setting is valid on a global level.</p></td>
<td>String</td>
<td>/</td>
<td>Mandatory</td>
<td>&lt;registryRoot&gt;/&lt;/registryRoot&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;dbConfig&gt;</td>
<td><br />
</td>
<td><br />
</td>
<td>String</td>
<td><br />
</td>
<td>Mandatory</td>
<td>&lt;dbConfig name="wso2registry"&gt;</td>
</tr>
<tr class="even">
<td><br />
</td>
<td>name</td>
<td><br />
</td>
<td>String</td>
<td>wso2registry</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td><code>             &lt;validationQuery&gt;            </code></td>
<td>N/A</td>
<td><p>You can configure this parameter under the <code>              &lt;dbConfig&gt;             </code> element of the <code>              &lt;PRODUCT_HOME&gt;/repository/conf/registry.xml             </code> file.</p>
<p>When you are maintaining DB connections, it is always recommended to use a validation query to check the health of the TCP connection of the connections that stay in the DB connection pool.</p>
<p>Since opening connections is an expensive and time consuming operation, after a connection is created, it will be kept open for a specific time in the pool. When re-using these connections from the pool, there can be situations that the TCP connection to the DB is interrupted and the connection consumer gets errors such as communication link failures etc.</p>
<p>To avoid that you can use a validation query always as a best practice. It is an SQL statement specific to the DBMS type, which runs before using the connection.</p></td>
<td>String</td>
<td>N/A</td>
<td>Optional</td>
<td><code>             &lt;validationQuery&gt;SELECT 1 FROM DUAL&lt;/validationQuery&gt;            </code></td>
</tr>
<tr class="even">
<td><code>             &lt;testOnBorrow&gt;            </code></td>
<td>N/A</td>
<td>This validates the connection objects before borrowign them from the pool. If the object fails to validate, it will be dropped from the pool, and another will be attempted to borrow. This property can be added to the <code>             &lt;dbConfig&gt;            </code> element in the <code>             &lt;PRODUCT_HOME&gt;/repository/conf/registry.xml            </code> file.</td>
<td>Boolean</td>
<td>true</td>
<td>Optional</td>
<td><code>             &lt;testOnBorrow&gt;true&lt;/testOnBorrow&gt;            </code></td>
</tr>
<tr class="odd">
<td>__ __ &lt;dataSource&gt;</td>
<td><br />
</td>
<td><br />
</td>
<td>String</td>
<td>jdbc/WSO2CarbonDB</td>
<td>Mandatory</td>
<td>&lt;dataSource&gt;jdbc/WSO2CarbonDB<br />
&lt;/dataSource&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;handler&gt;</td>
<td><br />
</td>
<td><p>Handlers are pluggable components, that contain custom processing logic for handling resources. All handlers extend an abstract class named Handler, which provides default implementations for resource handling methods as well as a few utilities useful for concrete handler implementations.<br />
<br />
Handler implementations can provide alternative behaviors for basic resource related operations, by overwriting one or more methods in the Handler class.</p></td>
<td>String</td>
<td><br />
</td>
<td>Optional</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td><br />
</td>
<td>class</td>
<td><br />
</td>
<td>String</td>
<td><br />
</td>
<td><br />
</td>
<td>&lt;handler class="org.wso2.carbon.registry<br />
.extensions.handlers.SynapseRepositoryHandler"&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;filter&gt;</td>
<td><br />
</td>
<td><br />
</td>
<td>String</td>
<td><br />
</td>
<td>Optional</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td><br />
</td>
<td>class</td>
<td><br />
</td>
<td>String</td>
<td><br />
</td>
<td><br />
</td>
<td>&lt;filter class="org.wso2.carbon.registry.core.jdbc<br />
.handlers.filters.MediaTypeMatcher"&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;remoteInstance&gt;</td>
<td><br />
</td>
<td><p>In order to mount an external registry, you have to define the remote instance. This could use either the JDBC-based configuration, the Atom-based configuration model or the WebService-based configuration model.</p></td>
<td><br />
</td>
<td><br />
</td>
<td>Optional</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td><br />
</td>
<td>url</td>
<td>The URL of the remote instance.</td>
<td>String</td>
<td>https://localhost:9443/registry</td>
<td><br />
</td>
<td>remoteInstance url=" https://localhost:9443/registry "&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;ID&gt;</td>
<td><br />
</td>
<td>Remote instance ID.</td>
<td>String</td>
<td>instanceid</td>
<td>Optional</td>
<td>&lt;id&gt;instanceid&lt;/id&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;username&gt;</td>
<td><br />
</td>
<td>Username of the remote registry login.</td>
<td>String</td>
<td>username</td>
<td>Optional</td>
<td>&lt;username&gt;username&lt;/username&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;password&gt;</td>
<td><br />
</td>
<td>Password of the remote registry login.</td>
<td>String</td>
<td>password</td>
<td>Optional</td>
<td>&lt;password&gt;password&lt;/password&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;dbConfig&gt;</td>
<td><br />
</td>
<td>The database configuration to use.</td>
<td>String</td>
<td>wso2registry</td>
<td>Optional</td>
<td>&lt;dbConfig&gt;wso2registry&lt;/dbConfig&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;readOnly&gt;</td>
<td><br />
</td>
<td><p>To run the registry in read-only mode set the readOnly element to true. Setting the read-only mode allows you to run an immutable instance of registry repository. This setting is valid only for the specific remote instance.</p></td>
<td>String</td>
<td>false</td>
<td>Optional</td>
<td>&lt;readOnly&gt;false&lt;/readOnly&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;enableCache&gt;</td>
<td><br />
</td>
<td>To enable registry caching, set the enableCache element to true. Once caching is enabled, repetitive read operations will be executed against the cache instead of the database. This setting is valid only for the specific remote instance.</td>
<td>String</td>
<td>true</td>
<td>Optional</td>
<td>&lt;enableCache&gt;true&lt;/enableCache&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;registryRoot&gt;</td>
<td><br />
</td>
<td><p>The registryRoot parameter can be used to define whether the apparent root of the running instance of the server. This setting is valid only for the specific remote instance.</p></td>
<td>String</td>
<td>/</td>
<td>Optional</td>
<td>&lt;registryRoot&gt;/&lt;/registryRoot&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;mount&gt;</td>
<td><br />
</td>
<td><p>Once a remote instance has been defined, a collection on the remote registry can be mounted to the local instance.</p></td>
<td><br />
</td>
<td><br />
</td>
<td>Mandatory</td>
<td>&lt;mount path="/_system/config" overwrite="true|false|virtual"&gt;</td>
</tr>
<tr class="even">
<td><br />
</td>
<td>path</td>
<td>The path to which the mount will be added to.</td>
<td>String</td>
<td>/_system/config</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td><br />
</td>
<td>overwrite</td>
<td>Whether an existing collection at the given path would be overwritten or not.</td>
<td><br />
</td>
<td>true|false|virtual</td>
<td><br />
</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>__ &lt;instanceID&gt;</td>
<td><br />
</td>
<td>Remote instance ID.</td>
<td><br />
</td>
<td>instanceid</td>
<td>Mandatory</td>
<td>&lt;instanceId&gt;instanceid&lt;/instanceId&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;targetPath&gt;</td>
<td><br />
</td>
<td>The path on the remote registry.</td>
<td>String</td>
<td>/_system/nodes</td>
<td>Mandatory</td>
<td>&lt;targetPath&gt;/_system/nodes&lt;/targetPath&gt;</td>
</tr>
<tr class="even">
<td>__ &lt;versionResourcesOnChange&gt;</td>
<td><br />
</td>
<td>You can configure whether you want to auto-version the resources (non-collection) by setting versionResourcesOnChange element to true. In this configuration it will create a version for the resources whenever it is updated.</td>
<td>Boolean</td>
<td>false</td>
<td>Mandatory</td>
<td>&lt;versionResourcesOnChange&gt;false<br />
&lt;/versionResourcesOnChange&gt;</td>
</tr>
<tr class="odd">
<td>__ &lt;staticConfiguration&gt;</td>
<td><br />
</td>
<td><div class="content-wrapper">
<p>While most configuration options can be changed after the first run of the WSO2 Governance Registry, changing the Static Configuration (configuration details under the staticConfiguration parameter), will not be fully effective. If you need to change any Static Configuration and expect it to take effect, you will have to erase the contents of the database, and restart the server passing the -Dsetup system property which will re-generate the database.</p>
<p>!!! warning</p>
    <p>Deprecation of -DSetup</p>
    <p>When proper Database Administrative (DBA) practices are followed, the systems (except analytics products) are not granted DDL (Data Definition) rights on the schema. Therefore, maintaining the <code>                -DSetup               </code> option is redundant and typically unusable. <strong>As a result, from <a href="https://wso2.com/products/carbon/release-matrix/">January 2018 onwards</a> WSO2 has deprecated the</strong> <strong><code>                 -DSetup                </code></strong> <strong>option</strong> . Note that the proper practice is for the DBA to run the DDL statements manually so that the DBA can examine and optimize any DDL statement (if necessary) based on the DBA best practices that are in place within the organization.</p>
<p>You are supposed to change the static configuration section only before loading any data to the registry (That is before the first start-up).</p>
</div></td>
<td><br />
</td>
<td><br />
</td>
<td>Mandatory</td>
<td>&lt;staticConfiguration&gt;&lt;versioningProperties&gt;true&lt;/versioningProperties&gt; &lt;versioningComments&gt;true&lt;/versioningComments&gt;&lt;versioningTags&gt;true&lt;/versioningTags&gt;&lt;versioningRatings&gt;true&lt;/versioningRatings&gt;&lt;/staticConfiguration&gt;</td>
</tr>
<tr class="even">
<td>__ __ &lt;versioningProperties&gt;</td>
<td><br />
</td>
<td>Whether the properties are versioned when a snapshot is created.</td>
<td>Boolean</td>
<td>true</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>__ __ &lt;versioningComments&gt;</td>
<td><br />
</td>
<td>Whether the comments are versioned when a snapshot is created.</td>
<td>Boolean</td>
<td>true</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="even">
<td>__ __ &lt;versioningTags&gt;</td>
<td><br />
</td>
<td>Whether the tags are versioned when a snapshot is created.</td>
<td>Boolean</td>
<td>true</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
<tr class="odd">
<td>__ __ &lt;versioningRatings&gt;</td>
<td><br />
</td>
<td>Whether the ratings are versioned when a snapshot is created.</td>
<td>Boolean</td>
<td>true</td>
<td>Mandatory</td>
<td><br />
</td>
</tr>
</tbody>
</table>
