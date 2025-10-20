# Registry Related Tables

This section lists out all the registry related tables and their
attributes in the WSO2 Identity Server database.

#### REG\_CLUSTER\_LOCK

If you are using Registry separation implementation and sharing
configuration and governance registries among cluster nodes of any WSO2
product when a node is restarting, locks can be defined to avoid
database schema creation and data population from multiple nodes for
JDBC-base databases. These locks are defined in this table.

-   `REG_LOCK_NAME`
-   `REG_LOCK_STATUS`
-   `REG_LOCKED_TIME`
-   `REG_TENANT_ID`
      
---

#### REG\_LOG

All registry activities are logged in this table. Details such as the
registry resource path, the user who did the modification, the action
performed, timestamp and tenant ID of the user are recorded in this
table. Following are the columns in the table.

-   `REG_LOG_ID`
-   `REG_PATH`
-   `REG_USER_ID`
-   `REG_LOGGED_TIME`
-   `REG_ACTION`
-   `REG_ACTION_DATA`
-   `REG_TENANT_ID`

---

#### REG\_PATH

The paths of all registry resources are stored in this table along with
an ID for the registry path. From other tables when referring a resource
path, this ID is used.

-   `REG_PATH_ID`
-   `REG_PATH_VALUE`
-   `REG_PATH_PARENT_ID`
-   `REG_TENANT_ID`

---

#### REG\_CONTENT

Actual content of the registry resources are stored as binary objects in
this table. Following are the columns of the table.

-   `REG_CONTENT_ID`
-   `REG_CONTENT_DATA`
-   `REG_TENANT_ID`

---

#### REG\_CONTENT\_HISTORY

History of the actual content of registry resource is maintained in this
table. Following are the columns of the table.

-   `REG_CONTENT_ID`
-   `REG_CONTENT_DATA`
-   `REG_DELETED`
-   `REG_TENANT_ID`

---

#### REG\_RESOURCE

The details about the registry resource are stored in this table.
Following are the columns of the table.

-   `REG_PATH_ID`
-   `REG_NAME`
-   `REG_VERSION`
-   `REG_MEDIA_TYPE`
-   `REG_CREATOR`
-   `REG_CREATED_TIME`
-   `REG_LAST_UPDATOR`
-   `REG_LAST_UPDATED_TIME`
-   `REG_DESCRIPTION`
-   `REG_CONTENT_ID`
-   `REG_TENANT_ID`
-   `REG_UUID`

---

#### REG\_RESOURCE\_HISTORY

Upon modifying details of the registry resource (not the actual
content), history for those details are maintained in this table.
Following are the columns of the table.

-   `REG_PATH_ID`
-   `REG_NAME`
-   `REG_VERSION`
-   `REG_MEDIA_TYPE`
-   `REG_CREATOR`
-   `REG_CREATED_TIME`
-   `REG_LAST_UPDATOR`
-   `REG_LAST_UPDATED_TIME`
-   `REG_DESCRIPTION`
-   `REG_CONTENT_ID`
-   `REG_DELETED`
-   `REG_TENANT_ID`
-   `REG_UUID`

---

#### REG\_COMMENT

The details of a comment added for a registry resource are stored in
this table. Comments in this table are mapped with the records in
`REG\_RESOURCE\_COMMENT` table. Following are the columns of the table.

-   `REG_ID`
-   `REG_COMMENT_TEXT`
-   `REG_USER_ID`
-   `REG_COMMENTED_TIME`
-   `REG_TENANT_ID`

---

#### REG\_RESOURCE\_COMMENT

For a registry resource, we can add multiple comments for describing the
resource. Those comments are stored in this table along with the
registry path ID. Following are the columns of the table.

-   `REG_COMMENT_ID`
-   `REG_VERSION`
-   `REG_PATH_ID`
-   `REG_RESOURCE_NAME`
-   `REG_TENANT_ID`

---

#### REG\_RATING

Ratings for the registry resources are stored in this table. Following
are the columns of the table.

-   `REG_ID`
-   `REG_RATING`
-   `REG_USER_ID`
-   `REG_RATED_TIME`
-   `REG_TENANT_ID`

---

#### REG\_RESOURCE\_RATING

The resources in the registry can be given a rating based on a scale
1-5. Actual rating value is stored in the table `REG_RATING` and records
in this table acts as mappings to the records in `REG_RATING`.

-   `REG_RATING_ID`
-   `REG_VERSION`
-   `REG_PATH_ID`
-   `REG_RESOURCE_NAME`
-   `REG_TENANT_ID`

---

#### REG\_TAG

Tags of a registry resource are stored in this table. Following are the
columns of the table.

-   `REG_ID`
-   `REG_TAG_NAME`
-   `REG_USER_ID`
-   `REG_TAGGED_TIME`
-   `REG_TENANT_ID`

---

#### REG\_RESOURCE\_TAG

Registry resources can be tagged with a name. Actual tag name is stored
in the `REG_TAG` table. This table is mapping records with the registry
path and the records in `REG_TAG`. Following are the columns of the
table.

-   `REG_TAG_ID`
-   `REG_VERSION`
-   `REG_PATH_ID`
-   `REG_RESOURCE_NAME`
-   `REG_TENANT_ID`

---

#### REG\_PROPERTY

Properties for a registry resource are stored as key value pairs in this
table. Following are the columns of the table.

-   `REG_ID`
-   `REG_NAME`
-   `REG_VALUE`
-   `REG_TENANT_ID`  

---

#### REG\_RESOURCE\_PROPERTY

Properties can be added for a registry resource. Actual key value pairs
of the properties are stored in `REG_PROPERTY` table. This table is
providing the mapping for the records in `REG_PROPERTY` table with the
resource registry path. Following are the columns of the table.

-   `REG_PROPERTY_ID`
-   `REG_VERSION`
-   `REG_PATH_ID`
-   `REG_RESOURCE_NAME`
-   `REG_TENANT_ID`

---

#### REG\_ASSOCIATION

An association can be created from any resource (or collection) on the
registry to another resource (or collection) on the registry or an
external resource which can be referred to by a URL. While the source
should be a resource existing on the registry, the destination resource
can be anything for which a URL can be given. Association has a type
associated.

For example, suppose Document A confirms to a standard B. You can create an
association between those two by stating A "confirms to" B, where
association name is "confirms to". The registry associations are stored
in this table.

-   `REG_ASSOCIATION_ID`
-   `REG_SOURCEPATH`
-   `REG_TARGETPATH`
-   `REG_ASSOCIATION_TYPE`
-   `REG_TENANT_ID`

---

#### REG\_SNAPSHOT

This table is used to create track of revisions that you create for a
specific resource. Data will be populated upon creating a revision for a
resource from the Registry Browser (Creating a checkpoint in the meta
data section of a resource). Apart from that, versioning can be done per
each change made for a resource which can be an extremely expensive
operation at runtime (especially if there are many resources that
change). By setting the `\<versionResourcesOnChange\>` parameter in
`<IS_HOME\>/repository/conf/registry.xml` to `true/false`, you can
enable/disable versioning resources on change. If it is enabled, upon
modification to a resource, a new version will be created from the
resource and also a new record is added to this table. Following are the
columns of the table.

-   `REG_SNAPSHOT_ID`
-   `REG_PATH_ID`
-   `REG_RESOURCE_NAME`
-   `REG_RESOURCE_VIDS`
-   `REG_TENANT_ID`

![Registry related tables]({{base_path}}/assets/img/setup/configure/registry-related-tables.png) 
