# Setting Up Separate Databases for Clustering

WSO2 Identity Server uses a database to store information such as
user management details and identity data. By
default, each WSO2 product is shipped with an embedded H2 database that
works for all types of data.

This section guides you through the logical separation of data that you
can do when clustering WSO2 Identity Server. 

!!! warning "Embedded H2 is NOT RECOMMENDED in production"
    The embedded H2 database is **NOT RECOMMENDED** for enterprise testing and 
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Therefore, use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    !!! tip "Before you begin"
        Creating separate databases as shown below **is not mandatory**. Instead, 
        you can point all the following datasources accoridng to the default data structure. 
        This will NOT make a difference in performance. For more information on default 
        database structure, see [Working with Databases](../../setup/working-with-databases).

The following image shows the default database structure and a recommended 
database structure for a logical separation of data.

<div>
    <center>
        <img src="../assets/img/setup/setting-up-separate-databases-for-clustering/separate-databases-for-clustering.png"
         alt="separate-databases-for-clustering ">
    </center>
</div>

<table>
<thead>
<tr class="header">
<th>Database Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>             USERSTORE_DB            </code></td>
<td>
<li>Mainly contains users and roles of the system.</li>
<li>Contains authorization manager configurations, internal permissions and roles.</li>
<li>In the default database configuration, user data and registry data are located inside <code>SHARED_DB</code>
.</li>
<li>For more information, see <a href="../../setup/configuring-user-stores">Configuring User Stores</a>.</li>
</td>
</tr>
<tr class="even">
<td><code>             IDENTITY_DB            </code></td>
<td>
<li>Contains identity related data. For example user sessions, OAuth 2.0, SAML 2.0, User Managed Access (UMA) etc.</li>
<li>In the default database configuration, all the UMA, consent and identity data are located 
in the <code>IDENTITY_DB</code>.
 In a deplyment both identity and UMA can be seperated for a single database while consent data is configured to a seperate
  database `CONSENT_MGT`</li>
<li>For more information, see <a href="../../setup/working-with-databases">Working with Databases</a>.</li>
</td>
</tr>
<tr class="even">
<td><code>             BPS_DB            </code></td>
<td>
<li>This is used to create, drop, and truncate data pertaining to the workflow feature.</li>
<li>For more information, see <a href="../../setup/changing-datasource-bpsds">Changing the Default Datasource 
for BPS</a>.</li>
</td>
</tr>
<tr class="odd">
<td><code>             SHARED_DB            </code></td>
<td>
<li>Shared database for config and governance registry mounts in the product's nodes. This includes data on tenants and 
keystores.</li>
<li>In the default database configuration, user data and registry data is located inside <code>SHARED_DB</code>. 
During a deployment, user data can be configured to a different database <code>USERSTORE_DB</code> while registry
 data remains in the <code>SHARED_DB</code>
.</li>
<li>For more information, see <a href="../../setup/working-with-databases">Working with Databases</a>.</li>
</td>
</tr>
<tr class="even">
<td><code>             CONSENT_MGT          </code></td>
<td>
<li>Used for data pertaining to user consents.</li>
<li>In the default database configuration, UMA, consent and identity data are located <code>IDENTITY_DB</code>. 
In a deplyment both identity and UMA can be seperated for a single database while consent data is configured to a seperate 
database.</li>
<li>For more information, see <a href="../../setup/changing-datasource-consent-management">Changing the Default Datasource for 
Consent Management Database</a>.</li>
</td>
</tr>
</tbody>
</table>

!!! note
    For more information on `SHARED_DB` and `IDENTITY_DB`, 
    see [Working with Databases](../../setup/working-with-databases/).
