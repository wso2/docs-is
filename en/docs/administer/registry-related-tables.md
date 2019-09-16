# Registry Related Tables

This section lists out all the registry related tables and their
attributes in the WSO2 Identity Server database.

#### REG\_CLUSTER\_LOCK

If you are using Registry separation implementation and sharing
configuration and governance registries among cluster nodes of any WSO2
product when a node is restarting, locks can be defined to avoid
database schema creation and data population from multiple nodes for
JDBC-base databases.These locks are defined in this table.

-   `REG\_LOCK\_NAME`
-   `REG\_LOCK\_STATUS`
-   `REG\_LOCKED\_TIME`
-   `REG\_TENANT\_ID`
      

#### REG\_LOG

All registry activities are logged in this table. Details such as the
registry resource path, the user who did the modification, the action
performed, timestamp and tenant ID of the user are recorded in this
table. Following are the columns in the table.

-   `REG\_LOG\_ID`
-   `REG\_PATH`
-   `REG\_USER\_ID`
-   `REG\_LOGGED\_TIME`
-   `REG\_ACTION`
-   `REG\_ACTION\_DATA`
-   `REG\_TENANT\_ID`

#### REG\_PATH

The paths of all registry resources are stored in this table along with
an ID for the registry path. From other tables when referring a resource
path, this ID is used.

-   `REG\_PATH\_ID`
-   `REG\_PATH\_VALUE`
-   `REG\_PATH\_PARENT\_ID`
-   `REG\_TENANT\_ID`

#### REG\_CONTENT

Actual content of the registry resources are stored as binary objects in
this table. Following are the columns of the table.

-   `REG\_CONTENT\_ID`
-   `REG\_CONTENT\_DATA`
-   `REG\_TENANT\_ID`

#### REG\_CONTENT\_HISTORY

History of the actual content of registry resource is maintained in this
table. Following are the columns of the table.

-   `REG\_CONTENT\_ID`
-   `REG\_CONTENT\_DATA`
-   `REG\_DELETED`
-   `REG\_TENANT\_ID`

#### REG\_RESOURCE

The details about the registry resource are stored in this table.
Following are the columns of the table.

-   `REG\_PATH\_ID`
-   `REG\_NAME`
-   `REG\_VERSION`
-   `REG\_MEDIA\_TYPE`
-   `REG\_CREATOR`
-   `REG\_CREATED\_TIME`
-   `REG\_LAST\_UPDATOR`
-   `REG\_LAST\_UPDATED\_TIME`
-   `REG\_DESCRIPTION`
-   `REG\_CONTENT\_ID`
-   `REG\_TENANT\_ID`
-   `REG\_UUID`

#### REG\_RESOURCE\_HISTORY

Upon modifying details of the registry resource (not the actual
content), history for those details are maintained in this table.
Following are the columns of the table.

-   `REG\_PATH\_ID`
-   `REG\_NAME`
-   `REG\_VERSION`
-   `REG\_MEDIA\_TYPE`
-   `REG\_CREATOR`
-   `REG\_CREATED\_TIME`
-   `REG\_LAST\_UPDATOR`
-   `REG\_LAST\_UPDATED\_TIME`
-   `REG\_DESCRIPTION`
-   `REG\_CONTENT\_ID`
-   `REG\_DELETED`
-   `REG\_TENANT\_ID`
-   `REG\_UUID`

#### REG\_COMMENT

The details of a comment  added for a registry resource are stored in
this table. Comments in this table are mapped with the records in
`REG\_RESOURCE\_COMMENT` table. Following are the columns of the table.

-   `REG\_ID`
-   `REG\_COMMENT\_TEXT`
-   `REG\_USER\_ID`
-   `REG\_COMMENTED\_TIME`
-   `REG\_TENANT\_ID`

#### REG\_RESOURCE\_COMMENT

For a registry resource, we can add multiple comments for describing the
resource. Those comments are stored in this table along with the
registry path ID. Following are the columns of the table.

-   `REG\_COMMENT\_ID`
-   `REG\_VERSION`
-   `REG\_PATH\_ID`
-   `REG\_RESOURCE\_NAME`
-   `REG\_TENANT\_ID`

#### REG\_RATING

Ratings for the registry resources are stored in this table. Following
are the columns of the table.

-   `REG\_ID`
-   `REG\_RATING`
-   `REG\_USER\_ID`
-   `REG\_RATED\_TIME`
-   `REG\_TENANT\_ID`

#### REG\_RESOURCE\_RATING

The resources in the registry can be given a rating based on a scale
1-5. Actual rating value is stored in the table `REG\_RATING` and records
in this table acts as mappings to the records in `REG\_RATING`.

-   `REG\_RATING\_ID`
-   `REG\_VERSION`
-   `REG\_PATH\_ID`
-   `REG\_RESOURCE\_NAME`
-   `REG\_TENANT\_ID`

#### REG\_TAG

Tags of a registry resource are stored in this table. Following are the
columns of the table.

-   `REG\_ID`
-   `REG\_TAG\_NAME`
-   `REG\_USER\_ID`
-   `REG\_TAGGED\_TIME`
-   `REG\_TENANT\_ID`

#### REG\_RESOURCE\_TAG

Registry resources can be tagged with a name. Actual tag name is stored
in the `REG\_TAG` table. This table is mapping records with the registry
path and the records in `REG\_TAG`. Following are the columns of the
table.

-   `REG\_TAG\_ID`
-   `REG\_VERSION`
-   `REG\_PATH\_ID`
-   `REG\_RESOURCE\_NAME`
-   `REG\_TENANT\_ID`

#### REG\_PROPERTY

Properties for a registry resource are stored as key value pairs in this
table. Following are the columns of the table.

-   `REG\_ID`
-   `REG\_NAME`
-   `REG\_VALUE`
-   `REG\_TENANT\_ID`  

#### REG\_RESOURCE\_PROPERTY

Properties can be added for a registry resource. Actual key value pairs
of the properties are stored in `REG\_PROPERTY` table. This table is
providing the mapping for the records in `REG\_PROPERTY` table with the
resource registry path. Following are the columns of the table.

-   `REG\_PROPERTY\_ID`
-   `REG\_VERSION`
-   `REG\_PATH\_ID`
-   `REG\_RESOURCE\_NAME`
-   `REG\_TENANT\_ID`

#### REG\_ASSOCIATION

An association can be created from any resource (or collection) on the
registry to another resource (or collection) on the registry or an
external resource which can be referred to by a URL. While the source
should be a resource existing on the registry, the destination resource
can be anything for which a URL can be given. Association has a type
associated.

eg: Document A that confirms to a standard B, You can create an
association between those two by stating A "confirms to" B, where
association name is "confirms to". The registry associations are stored
in this table.

-   `REG\_ASSOCIATION\_ID`
-   `REG\_SOURCEPATH`
-   `REG\_TARGETPATH`
-   `REG\_ASSOCIATION\_TYPE`
-   `REG\_TENANT\_ID`

#### REG\_SNAPSHOT

This table is used to create track of revisions that you create for a
specific resource. Data will be populated upon creating a revision for a
resource from the Registry Browser (Creating a checkpoint in the meta
data section of a resource). Apart from that, versioning can be done per
each change made for a resource which can be an extremely expensive
operation at runtime (especially if there are many resources that
change). By setting the `\<versionResourcesOnChange\>` parameter in
`<IS\_HOME\>/repository/conf/registry.xml` to `true/false`, you can
enable/disable versioning resources on change. If it is enabled, upon
modification to a resource, a new version will be created from the
resource and also a new record is added to this table. Following are the
columns of the table.

-   `REG\_SNAPSHOT\_ID`
-   `REG\_PATH\_ID`
-   `REG\_RESOURCE\_NAME`
-   `REG\_RESOURCE\_VIDS`
-   `REG\_TENANT\_ID`

![Registry related tables]( ../../assets/img/using-wso2-identity-server/registry-related-tables.png) 
