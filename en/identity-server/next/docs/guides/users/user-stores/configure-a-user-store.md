# Connect a remote user store

You can connect your on-premise user store to WSO2 Identity Server and onboard users and groups from it. Depending on your requirement, you can provide the user store connection either read-only or read/write privilges.

Follow the guide below to connect a remote user store to WSO2 Identity Server.

## Register a remote user store
To configure a remote user store for your organization:

1. On the WSO2 Identity Server Console, go to **User Attributes & Stores** > **User Stores**.
2. Click **New User Store** and select the user store type.

    ![Register remote user store to WSO2 Identity Server]({{base_path}}/assets/img/guides/user-stores/user-store-types.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Enter the following details according to the user store type and click **Finish**.

### Configure a Read Only LDAP user store

<table>
    <thead>
        <th>Name</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>Name</td>
            <td>Provide a name for the user store</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>Provide a description for the user store</td>
        </tr>
        <tr>
            <td>Connection URL</td>
            <td>This is the connection URL to the user store server. </br>

                Sample values:
                <ul>
                <li>ldap://10.100.1.100:389</li>
                <li>ldaps://10.100.1.102:639</li>
                </ul>
                
                <div class="admonition note"><p class="admonition-title">note
                </p>If you are connecting over ldaps (secured LDAP), you need to import the certificate of the user store to </br><code>{​IS_HOME}/repository/resources/security/client-truststore.jks</code>. </br>
                For information on how to add certificates to the truststore and how keystores are configured and used in a system, see <a href="{{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption/">Use asymmetric encryption</a></br></br>

                If LDAP connection pooling is used, see <a>performance tuning ldaps pooling</a>.
                </p></p></div>
</td>
        </tr>

<tr>

<td>Connection Name</td>
<td> This is the username used to connect to the user store and perform various operations.</br>

Sample values: uid=admin,ou=system
</br>
<div class="admonition note"><p class="admonition-title">note</p><p>This user must have sufficient permissions to read the user list and users' attributes and to perform search operations on the user store. The value you specify is used as the DN (Distinguished Name) attribute of the user.</p>
 </div></br>

</td>
</tr>

<tr>
<td>Connection Password</td>
<td> Password for the above user</td>
</tr>

</tbody>
</table>

Apart from the above configurations, you can configure the following advanced configurations.

<table>
<thead>
    <th>Name</th>
    <th>Description</th>
</thead>
<tbody>
    <tr>
        <td>User Search Base</td>
        <td>This is the DN of the context or object under which the user entries are stored in the user store. When the user store searches for users, it will start from this location of the directory. </br>
        Sample values: ou=Users,dc=wso2,dc=org</td>
    </tr>
    <tr>
        <td>Username Attribute</td>
        <td>This is a uniquely identifying attribute that represents the username of the user. Users can be authenticated using their email address, UID, etc. </br>

        Default: uid </br>
   </tr>
   <tr>
        <td>User Search Filter</td>
        <td>Filtering criteria used to search for a particular user entry.</br>
            Default : (&amp;(objectClass=person)(uid=?)) </br>
   </tr>
   <tr>
        <td>User List Filter</td>
        <td>This is the filtering criteria for searching user entries in the user store.</br>

        Default: (objectClass=person) - In this case, the search operation only provides the objects created from the person object class.
   </tr>
   <tr>
        <td>User ID Attribute</td>
        <td>This is the attribute used for uniquely identifying a user entry. The value of the attribute is considered as the unique user ID. </br>

        Default: scimId
   </tr>
   <tr>
        <td>User ID Search Filter</td>
        <td>Filtering criteria used to search for a particular user. </br>
            Default : (&amp;(objectClass=person)(scimId=?))
   </tr>
   <tr>
        <td>Enable Group Unique Id</td>
        <td>Assign unique IDs to each group entry. </br>
            Default : false
   </tr>
   <tr>
        <td>Group Id Attribute</td>
        <td>Attribute that holds the unique identifier for each group entry. </br>
            Default : entryUUID
   </tr>
   <tr>
        <td>Group Search Base</td>
        <td>This is the DN of the context or object under which the group entries are stored in the userstore. When the userstore searches for groups, it will start from this location of the directory.</br>

        Default: ou=Groups,dc=wso2,dc=org
   </tr>


</tbody>
</table>





## What's Next

- [Configure high availability for a remote user store]({{base_path}}/guides/users/user-stores/configure-high-availability/)
- [Manage remote user stores in WSO2 Identity Server]({{base_path}}/guides/users/user-stores/update-user-stores/)
