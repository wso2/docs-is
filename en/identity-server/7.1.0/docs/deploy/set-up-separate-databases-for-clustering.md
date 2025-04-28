# Seperate Databases for Clustering

WSO2 Identity Server uses a database to store information such as user management details and identity data. By default, WSO2 Identity Server is shipped with an embedded H2 database that works for all types of data.

This section guides you through the logical separation of data that you
can do when clustering WSO2 Identity Server.

!!! warning "Embedded H2 is NOT RECOMMENDED in production"
    The embedded H2 database is not recommended for enterprise testing and production environments. It has lower performance, and clustering limitations, and can cause file corruption failures. Therefore, use an industry-standard RDBMS such as Oracle, PostgreSQL, MySQL, or MS SQL instead.

    !!! tip "Before you begin"
        Creating separate databases as shown below is not mandatory. Instead, you can point to all the following data sources according to the default data structure. This will not make a difference in performance. <!-- TODO For more information on default database structure, see [Working with Databases]({{base_path}}/deploy/work-with-databases).-->

The following image shows the default database structure and a recommended database structure for the logical separation of data.

![Separate-databases-for-clustering]({{base_path}}/assets/img/setup/deploy/separate-databases-for-clustering.png)

<table>
<thead>
<tr class="header">
<th>Database Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>USERSTORE_DB</code></td>
<td>
<li>Mainly contains users and roles of the system</li>
<li>Contains authorization manager configurations, internal permissions, and roles</li>
<li>In the default database configuration, user data and registry data are located inside <code>SHARED_DB</code>.
.</li>
<li>For more information, see <a href="{{base_path}}/guides/users/user-stores/">Configure Userstores</a>.</li>
</td>
</tr>
<tr class="even">
<td><code>IDENTITY_DB</code></td>
<td>
<li>This contains identity-related data. For example, user sessions, OAuth 2.0, SAML 2.0, User Managed Access (UMA), etc.</li>
<li>In the default database configuration, all the UMA, consent, and identity data are located  in the <code>IDENTITY_DB</code>. In a deployment, both identity and UMA can be configured in a single database while consent data is configured to a separate database `CONSENT_MGT`</li>.
<!--<li>For more information, see <a href="{{base_path}}/deploy/work-with-databases">Working with Databases</a>.</li>-->
</td>
</tr>
<tr class="even">
<td><code>BPS_DB</code></td>
<td>
<li>This is used to create, drop, and truncate data pertaining to the workflow feature.</li>
<!-- TODO <li>For more information, see <a href="{{base_path}}/deploy/change-datasource-bpsds">Change the Default Datasource for BPS</a>.</li>-->
</td>
</tr>
<tr class="odd">
<td><code>SHARED_DB</code></td>
<td>
<li>This is the shared database for config and governance registry mounts in WSO2 Identity Server's nodes. This includes data on tenants and keystores.</li>
<li>In the default database configuration, user data and registry data are located inside <code>SHARED_DB</code>.
During a deployment, user data can be configured to a different database, <code>USERSTORE_DB</code> while the registry
 data remains in the <code>SHARED_DB</code>
.</li>
<!-- TODO <li>For more information, see <a href="{{base_path}}/deploy/work-with-databases">Working with Databases</a>.</li>-->
</td>
</tr>
<tr class="even">
<td><code>CONSENT_MGT</code></td>
<td>
<li>Used for data pertaining to user consents</li>
<li>In the default database configuration, UMA, consent, and identity data are located <code>IDENTITY_DB</code>.
In a deployment, both identity and UMA can be configured in a single database while consent data is configured to a separate database.</li>
<!-- TODO <li>For more information, see <a href="{{base_path}}/deploy/change-datasource-consent-management">Change the Default Datasource for Consent Management</a>.</li>-->
</td>
</tr>
</tbody>
</table>

<!-- TODO !!! note
    For more information on `SHARED_DB` and `IDENTITY_DB`, see [Working with Databases]({{base_path}}/deploy/work-with-databases/).-->
