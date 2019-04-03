---
template: templates/2-column.html
---

# Configuration Catalog
This document describes all the configuration parameters that are used in WSO2 Identity Server. 

## Instructions for use

> Select the configuration sections, parameters, and values that are required for your use and add them to the .toml file. See the example .toml file given below.

```toml
# This is an example .toml file.

[server]
pattern="value"                         
enable_port_forward=true

[key_mgr_node]
endpoints="value"

[gateway]
gateway_environments=["dev","test"]

[[database]]
pool_options.maxActiv=5

```

<div class="mb-config-catalog">
    <section class="title">
        <div class="mb-config-options">    
            <h2>Configuring the default deployment settings</h2>
        </div>
        <div class="mb-config-example"></div>
    </section>
    <section>
        <div class="mb-config-options">
            <div class="mb-config">
                <div class="config-wrap">
                    <code>[server]</code>
                    <span class="badge-required">Required</span>
                    <p>
                        This toml header groups the parameters that define the server node details.
                    </p>
                </div>
                <div class="params-wrap">
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>hostname</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type string"> string </span>
                                    <span class="badge-required">Required</span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>"localhost"</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>The hostname of the WSO2 EI server instance.</p>
                            </div>
                        </div>
                    </div>
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>node_ip</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type string"> string </span>
                                    <span class="badge-required">Required</span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>"127.0.0.1"</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>The IP address of the server node.</p>
                            </div>
                        </div>
                    </div>
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>enable_mtom</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type boolean"> boolean </span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>false</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>Use this paramater to enable MTOM (Message Transmission Optimization Mechanism) for the product server. When MTOM is enabled.</p>
                            </div>
                        </div>
                    </div>
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>enable_swa</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type boolean"> boolean </span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>false</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>Use this paramater to enable SwA (SOAP with Attachments) for the product server. When SwA is enabled, the ESB will process the files attached to SOAP messages.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-config-example">
<pre><code class="toml">[server]
hostname="localhost"
node_ip="127.0.0.1"
enable_mtom=false
enable_swa=false</code></pre>
        </div>
    </section>
</div>

<div class="mb-config-catalog">
    <section class="title">
        <div class="mb-config-options">    
            <h2>Connecting to the primary data store</h2>
        </div>
        <div class="mb-config-example"></div>
    </section>
    <section>
        <div class="mb-config-options">
            <div class="mb-config">
                <div class="config-wrap">
                    <code>[database.shared_db]</code>
                    <p>
                        The config heading that groups the parameters connecting the server to the primary database of the server. This database stores registry artifacts aswell as the user permissions that apply to user roles. By default, this also stores the user data unless a separate user store is configured using the [user_store] config section.
                    </p>
                </div>
                <div class="params-wrap">
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>type</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type string"> string </span>
                                    <span class="badge-required">Required</span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>"H2"</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>The type of database that is used for the primary database. All the database types that are supported by this product is listed below as possible values.</p>
                                <p>E.g. "MySql", "Oracle", "Postgre"</p>
                                <details class="warning classes" open="open">
                                    <summary>Warning</summary>
                                    <p>"H2" (not recommended for production environments). So please change when going on production.</p>
                                </details>
                            </div>
                        </div>
                    </div>
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>url</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type string"> string </span>
                                    <span class="badge-required">Required</span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>"http://localhost:8082"</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>The connection URL of the database. Note that this is specific to the database type you are using.</p>
                                <p>Use the URL pattern for the database type.</p>
                            </div>
                        </div>
                    </div>
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>username</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type string"> string </span>
                                    <span class="badge-required">Required</span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>wso2carbon</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>The user name for connecting to the database.</p>
                                <p>Any alpha numeric value.</p>
                            </div>
                        </div>
                    </div>
                    <div class="param">
                        <div class="param-name">
                          <span class="param-name-wrap"> <code>password</code> </span>
                        </div>
                        <div class="param-info">
                            <div>
                                <p>
                                    <span class="param-type string"> string </span>
                                    <span class="badge-required">Required</span>
                                </p>
                                <div class="param-default">
                                    <span class="param-default-value"><code>wso2carbon</code></span>
                                </div>
                            </div>
                            <div class="param-description">
                                <p>The password for connecting to the database.</p>
                                <p>Any alpha numeric value.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-config-example">
<pre><code class="toml">[database.shared_db]
type="H2"
url="http://localhost:8082"
username=wso2carbon
password=wso2carbon</code></pre>
        </div>
    </section>
</div>

## Tuning the primary data store connection

<table>
	<tr>
		<th colspan="2">Config Heading</th>
	</tr>
	<tr>
		<td style="width: 20%"><b><code>[database.shared_db.pool_options]</code></b></td>
		<td>
			The config heading in the ei.toml file that groups the parameters for tuning the performance of the primary database that you configured with the [database.shared_db] section.
			<ul>
				<li><b>Default</b> Enabled with default parameters.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<th colspan="2">Parameters</th>
	</tr>
	<tr>
		<td><b><code>maxActive</code></b></td>
		<td>
			The maximum number of active connections that can be allocated at the same time from the pool. If there are too many active connections in the connection pool, some of them would be idle, incurring an unnecessary system overhead.
			<ul>
				<li><b>Default</b> "50"</li>
				<li><b>Possible Values</b> Depends on environment. Enter any negative value to denote an unlimited number of active connections.</li>
				<li><b>Optional</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>maxWait</code></b></td>
		<td>
			The maximum number of milliseconds that the pool will wait (when there are no available connections) for a connection to be returned before throwing an exception.
			<ul>
				<li><b>Default</b> "6000"</li>
				<li><b>Possible Values</b> Depends on environment. Enter zero or a negative value to wait indefinitely.</li>
				<li><b>Optional</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>testOnBorrow</code></b></td>
		<td>
			The indication of whether objects will be validated before being borrowed from the pool. If the object fails to validate, it will be dropped from the pool, and another attempt will be made to borrow another.
			<ul>
				<li><b>Default</b> Enabled</li>
				<li><b>Possible Value</b> Use "false" to disable testOnBorrow.</li>
				<li><b>Optional</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>validationInterval</code></b></td>
		<td>
			The indication to avoid excess validation, and only run validation at the most, at this frequency (time in milliseconds). If a connection is due for validation but has been validated previously within this interval, it will not be validated again.
			<ul>
				<li><b>Default</b> "30000"</li>
				<li><b>Possible Values</b> Depends on environment. </li>
				<li><b>Optional</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>defaultAutoCommit</code></b></td>
		<td>
			Specifies whether each SQL statement should be automatically committed when it is completed. It is recommended to disable auto committing by setting this property to true.
			<ul>
				<li><b>Default</b> Enabled</li>
				<li><b>Possible Values</b> Use "false" to disable default auto commit.</li>
				<li><b>Optional</b></li>
			</ul>
		</td>
	</tr>
</table>

## Connecting to the user stores

<table>
	<tr>
		<th colspan="2"> Config Heading</th>
	</tr>
	<tr>
		<td style="width: 20%"><b><code>[user_store]</code></b></td>
		<td>
			The config heading in the ei.toml that connects the server to the user store. The user store holds the users and roles defined for the system.
			<ul>
				<li><b>Default</b> Enabled</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<th colspan="2">Parameters</th>
	</tr>
	<tr>
		<td><b><code>type</code></b></td>
		<td>
			The type of user store.
			<ul>
				<li><b>Default Value</b>: "database"</li>
				<li><b>Possible Values</b>: "database" , "LDAP"</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
</table>

## Configuring the system administrator

<table>
	<tr>
		<th colspan="2">Config Heading</th>
	</tr>
	<tr>
		<td style="width: 20%"><b><code>[super_admin]</code></b>:</td>
		<td>
			The config heading in the ei.toml file that groups the parameters defining the system adminsitrator.
			<ul>
				<li><b>Default</b> Enabled with the default parameters.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<th colspan="2">Parameters</th>
	</tr>
	<tr>
		<td><b><code>username</code></b></td>
		<td>
			The user name of the system administrator. This user has all permissions enabled by default.
			<ul>
				<li><b>Default</b> <code>"admin"</code></li>
				<li><b>Possible Values</b> Any alpha numerical value</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>password</code></b></td>
		<td>
			The password of the system adminsitrator.
			<ul>
				<li><b>Default</b> <code>"admin"</code></li>
				<li><b>Possible Values</b> Any alpha numerical value</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>create_admin_account</code></b></td>
		<td>
			Set this whether the system administrator credentials should be created in the system at the time of starting the server.
			<ul>
				<li><b>Default</b>: Enabled</li>
				<li><b>Possible Values</b>: Use <code>"false"</code> to disable.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	
</table>

## Configuring the keystore

<table>
	<tr>
		<th colspan="2">Config Heading</th>
	</tr>
	<tr>
		<td style="width: 20%"><b><code>[keystore.tls]</code></b></td>
		<td>
			Add this config heading to the ei.toml file to group the parameters that connects the server to the keystore used for SSL handshaking when the server communicates with another server.
			<ul>
				<li><b>Default</b> Enabled with default parameters.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<th colspan="2">Parameters</th>
	</tr>
	<tr>
		<td><b><code>file_name</code></b></td>
		<td>
			The name of the keystore file.
			<ul>
				<li><b>Default</b> <code>"wso2carbon.jks"</code></li>
				<li><b>Possible Values</b> Any file name with the .jks extension. </li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>type</code></b></td>
		<td>
			The type of the keystore file.
			<ul>
				<li><b>Default</b> <code>"JKS"</code></li>
				<li><b>Possible Values</b> <code>"JKS"</code> or <code>"PKCS12"</code></li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>password</code></b></td>
		<td>
			The password of the keystore file.
			<ul>
				<li><b>Default</b> <code>"wso2carbon"</code></li>
				<li><b>Possible Values</b> Any alpha numerical value.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>alias</code></b></td>
		<td>
			The alias of the public key certificate that is included in the keystore.
			<ul>
				<li><b>Default</b> <code>"wso2carbon"</code></li>
				<li><b>Possible Values</b> Any alpha numerical value. </li>
				<li><b>Mandatory</b></li>
			</ul> 
		</td>
	</tr>
	<tr>
		<td><b><code>key_password</code></b></td>
		<td>
			The password of the private key that is included in the keystore.
			<ul>
				<li><b>Default</b> <code>"wso2carbon"</code></li>
				<li><b>Possible Value</b> Any alpha numerical value.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
</table>

## Configuring the truststore

<table>
	<tr>
		<th colspan="2">Config Heading</th>
	</tr>
	<tr>
		<td style="width: 20%"><b><code>[truststore]</code></b></td>
		<td>
			Add this config heading to the ei.toml file to group the parameters that connects the server to the trustore.
			<ul>
				<li><b>Default</b> Enabled with default parameters. </li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<th colspan="2">Parameters</th>
	</tr>
	<tr>
		<td><b><code>file_name</code></b></td>
		<td>
			The name of the keystore file.
			<ul>
				<li><b>Default</b> <code>"wso2truststore.jks"</code></li>
				<li><b>Possible Values</b> Any file name with the .jks extension.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>type</code></b></td>
		<td>
			The type of the keystore file.
			<ul>
				<li><b>Default</b> <code>"JKS"</code></li>
				<li><b>Possible Values</b> <code>"JKS"</code> or <code>"PKCS12"</code></li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>password</code></b></td>
		<td>
			The password of the keystore file.
			<ul>
				<li><b>Default</b> <code>"wso2carbon"</code></li>
				<li><b>Possible Values</b> Any alpha numerical value. </li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>alias</code></b></td>
		<td>
			The alias of the public key certificate that is included in the trustore.
			<ul>
				<li><b>Default</b> <code>"symmetric.key.value"</code></li>
				<li><b>Possible Values</b> Any alpha numerical value. </li>
				<li><b>Mandatory</b></li>
			</ul> 
		</td>
	</tr>
	<tr>
		<td><b><code>key_password</code></b></td>
		<td>
			The password of the private key that is included in the keystore.
			<ul>
				<li><b>Default</b> <code>"wso2carbon"</code></li>
				<li><b>Possible Value</b> Any alpha numerical value.</li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
	<tr>
		<td><b><code>algorithm</code></b></td>
		<td>
			The password of the ...
			<ul>
				<li><b>Default</b> <code>"AES"</code></li>
				<li><b>Possible Value</b></li>
				<li><b>Mandatory</b></li>
			</ul>
		</td>
	</tr>
</table>
