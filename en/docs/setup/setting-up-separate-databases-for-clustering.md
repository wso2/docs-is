# Setting Up Separate Databases for Clustering

This section guides you through the logical separation of data that you
can do when clustering WSO2 Identity Server.

!!! tip "Before you begin"
    Creating separate databases as shown below **is not mandatory**. Instead, 
    you can point all the following datasources to a single database. This will NOT make a difference 
    in performance. To do this, see the [Configuring the datasources](../../setup/configuring-the-datasources). 

WSO2 Identity Server uses a database to store information such as
user management details and registry data. All nodes in the cluster must
use one central database for config and governance registry mounts. By
default, each WSO2 product is shipped with an embedded H2 database that
works for all types of data.

!!! warning "Embedded H2 is NOT RECOMMENDED in production"
    The embedded H2 database is **NOT RECOMMENDED** for enterprise testing and for
    production environments. It has lower performance, clustering
    limitations, and can cause file corruption failures. Therefore, use an
    industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL
    instead.
    
    !!! note
        You can use the embedded H2 database in development environments and as
        the local registry in a registry mount. However, in a production
        environment it is recommended to change this. For more information on
        databases, see [Working with Databases](../../administer/working-with-databases/).

You can create the following databases and associated datasources. This
is **NOT mandatory** and you can choose not to create these databases if
you wish have default databases to handle all these concerns.

<table>
<thead>
<tr class="header">
<th>Datasource Name</th>
<th>Description</th>
<th>For more information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>             SHARED_DB            </code></td>
<td>
<li>Contains user management data.</li>
<li>Contains <code>REGISTRY_DB</code></li>
</td>
<td><a href="../../administer/working-with-databases">Working with Databases</a></td>
</tr>
<tr class="even">
<td><code>             IDENTITY_DB            </code></td>
<td>
<li>Contains identity related data. For example, OAuth 2.0, SAML 2.0, user managed access ( UMA), Consent etc.</li>
<li>Contains <code>CONSENT_MGT_DB</code></li>
</td>
<td><a href="../../administer/working-with-databases">Working with Databases</a></td>
</tr>
<tr class="even">
<td><code>             BPS_DB            </code></td>
<td>This is used to create, drop, and truncate data pertaining to the workflow feature.</td>
<td><a href="../../administer/changing-datasource-bpsds">Changing the Default Datasource for BPS</a></td>
</tr>
<tr class="odd">
<td><code>             REGISTRY_DB            </code></td>
<td>Shared database for config and governance registry mounts in the product's nodes. This includes data on tenants and keystores.</td>
<td><a href="../../administer/working-with-databases">Working with Databases</a></td>
</tr>
<tr class="even">
<td><code>             CONSENT_MGT_DB            </code></td>
<td>This is used for data pertaining to user consents.</td>
<td><a href="../../administer/working-with-databases">Working with Databases</a></td>
</tr>
</tbody>
</table>

For more information on the concept of sharing governance and config 
registry databases across the cluster, see the topic on 
[Sharing Databases in a Cluster](../../administer/sharing-databases-in-a-cluster).