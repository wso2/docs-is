# User Management Related Tables

This section lists out all the user management related tables and their
attributes in the WSO2 Identity Server database.

## UM_TENANT

When creating a tenant, the details of the tenant are stored in this
table. `UM_ID` is the auto generated tenant ID. Following are the columns
of the table.

-   `UM_ID`
-   `UM_DOMAIN_NAME`
-   `UM_EMAIL`
-   `UM_ACTIVE`
-   `UM_CREATED_DATE`
-   `UM_USER_CONFIG`

---

## UM_DOMAIN

The userstore domains of all tenants are stored in this table. By
default for a tenant, there are three domains as `PRIMARY`, `SYSTEM`, and
`INTERNAL`. If a secondary userstore is added for a tenant, the userstore domain details for that also will get stored in this table.

-   `UM_DOMAIN_ID`
-   `UM_DOMAIN_NAME`
-   `UM_TENANT_ID`  

---

## UM_USER

When a JDBC userstore is used as a primary or secondary userstore, the
user details will be stored in this table upon user creation. Following
are the columns of the table.

-   `UM_ID`
-   `UM_USER_NAME`
-   `UM_USER_PASSWORD`
-   `UM_SALT_VALUE`
-   `UM_REQUIRE_CHANGE`
-   `UM_CHANGED_TIME`
-   `UM_TENANT_ID`

---

## UM_ROLE

When a JDBC userstore is used as a primary or secondary userstore, the
user role details will be stored in this table upon creation of a role.
Following are the columns of the table.

-   `UM_ID`
-   `UM_ROLE_NAME`
-   `UM_TENANT_ID`
-   `UM_SHARED_ROLE`

---

## UM_MODULE

This table is not being used in the latest version of WSO2 Identity Server.

-   `UM_ID`
-   `UM_MODULE_NAME`

---

## UM_MODULE_ACTIONS

This table is not being used in the latest version of WSO2 Identity Server.

-   `UM_ACTION`
-   `UM_MODULE_ID`

---

## UM_PERMISSION

The permission tree is stored in this table. These are the permissions
to be assigned for user roles. Following are the columns of the table.

-   `UM_ID`
-   `UM_RESOURCE_ID`
-   `UM_ACTION`
-   `UM_TENANT_ID`
-   `UM_MODULE_ID`  

---

## UM_ROLE_PERMISSION

All the permissions assigned to a role are stored in this table. A role
can have multiple records in this table and each record is associated
with a particular permission defined by `UM_PERMISSION_ID`. This
permission ID is linked to the `UM_PERMISSION` table. Following are the
columns of the table.

-   `UM_ID`
-   `UM_PERMISSION_ID`
-   `UM_ROLE_NAME`
-   `UM_IS_ALLOWED`
-   `UM_TENANT_ID`
-   `UM_DOMAIN_ID`  

---

## UM_USER_PERMISSION

This table is not used in the latest version of WSO2 Identity Server. Following
are the columns of the table.

-   `UM_ID`
-   `UM_PERMISSION_ID`
-   `UM_USER_NAME`
-   `UM_IS_ALLOWED`
-   `UM_TENANT_ID`

---

## UM_USER_ROLE

The relationship with users and roles is stored in this table. One user
can have multiple roles assigned and similarly, one role can have
multiple users assigned into it. User is mapped with `UM_USER_ID` and
the role is mapped with `UM_ROLE_ID`. Following are the columns of the
table.

-   `UM_ID`
-   `UM_ROLE_ID`
-   `UM_USER_ID`
-   `UM_TENANT_ID`

---

## UM_SHARED_USER_ROLE

This table is not being used in the latest version of WSO2 Identity Server.

-   `UM_ROLE_ID`
-   `UM_USER_ID`
-   `UM_USER_TENANT_ID`
-   `UM_ROLE_TENANT_ID`

---

## UM_ACCOUNT_MAPPING

This table is not being used in the latest version of WSO2 Identity Server.

-   `UM_ID`
-   `UM_USER_NAME`
-   `UM_TENANT_ID`
-   `UM_USER_STORE_DOMAIN`
-   `UM_ACC_LINK_ID`

---

## UM_USER_ATTRIBUTE

When a JDBC userstore is used and a user is created in that userstore,
attributes can be added for the user profile. Each attribute will have a
record in the table as key value pairs where the `UM_ATTR_NAME` and
`UM_ATTR_VALUE` columns contain the attribute name and value
respectively. The `UM_USER_ID` column contains the ID of the user which
points to the `UM_ID` column of the `UM_USER` table. If a JDBC userstore
is used, multiple profiles can be created for a user. The profile that
the user attribute belongs to is given in the `UM_PROFILE_ID` column. Following
are the columns of the table.

-   `UM_ID`
-   `UM_ATTR_NAME`
-   `UM_ATTR_VALUE`
-   `UM_PROFILE_ID`
-   `UM_USER_ID`
-   `UM_TENANT_ID`  

---

## UM_DIALECT

In claim management, all the claims are grouped into dialects. A claim
dialect is a group of claims. One claim dialect can have multiple
claims. Those claims are stored in the `UM_CLAIM` table. The claim dialects
are stored in this table. Following are the columns of the table.

-   `UM_ID`
-   `UM_DIALECT_URI`
-   `UM_TENANT_ID`

---

## UM_CLAIM

All the claims of all claim dialects are stored in this table. Following
are the columns of the table.

-   `UM_ID`
-   `UM_DIALECT_ID`
-   `UM_CLAIM_URI`
-   `UM_DISPLAY_TAG`
-   `UM_DESCRIPTION`
-   `UM_MAPPED_ATTRIBUTE_DOMAIN`
-   `UM_MAPPED_ATTRIBUTE`
-   `UM_REG_EX`
-   `UM_SUPPORTED`
-   `UM_REQUIRED`
-   `UM_DISPLAY_ORDER`
-   `UM_CHECKED_ATTRIBUTE`
-   `UM_READ_ONLY`
-   `UM_TENANT_ID`

---

## UM_PROFILE_CONFIG

This table is not being used in the latest version of WSO2 Identity Server.
Following are the columns in the table.

-   `UM_ID`
-   `UM_DIALECT_ID`
-   `UM_PROFILE_NAME`
-   `UM_TENANT_ID`

---

## UM_HYBRID_ROLE

All the `internal` roles are stored in this table. By default `everyone`
role is there for each tenant. Apart from that, for each Service
Provider created, a role will be added to this table with the same name
as the Service Provider name. Following are the columns of the table.

-   `UM_ID`
-   `UM_ROLE_NAME`
-   `UM_TENANT_ID`

---

## UM_HYBRID_USER_ROLE

When a user is assigned an `internal` role, that is recorded in this
table. The `internal` roles are stored in the `UM_HYBRID_ROLE` table and
from this table, the users are mapped to those roles. Following are the
columns of the table.

-   `UM_ID`
-   `UM_USER_NAME`
-   `UM_ROLE_ID`
-   `UM_TENANT_ID`
-   `UM_DOMAIN_ID`

---

## UM_SYSTEM_USER

System users of the Identity Server are stored in this table. The
`wso2.anonymous.user` user is by default created. Following are the
columns of the table.

-   `UM_ID`
-   `UM_USER_NAME`
-   `UM_USER_PASSWORD`
-   `UM_SALT_VALUE`
-   `UM_REQUIRE_CHANGE`
-   `UM_CHANGED_TIME`
-   `UM_TENANT_ID`

---

## UM_SYSTEM_ROLE

System roles of WSO2 Identity Server are stored in this table. The `wso2.anonymous.role` is created by default which is a special role that
represents a user that has not logged in to WSO2 Identity Server Management Console. Granting read access to resources for this role
would mean that you do not require authentication to access resources
using the respective permalinks. Following are the columns of the table.

-   `UM_ID`
-   `UM_ROLE_NAME`
-   `UM_TENANT_ID`

---

## UM_SYSTEM_USER_ROLE

Storing the system roles assigned to the the system users is done with
this table. `UM_USER_NAME` contains the username of the system user.
`UM_ROLE_ID` contains the ID of the system role which points to the `UM_ID` column of the `UM_SYSTEM_ROLE` table. The `wso2.anonymous.role`
system role is by default assigned to the `wso2.anonymous.user` system
user in this table. Following are the columns of the table.

-   `UM_ID`
-   `UM_USER_NAME`
-   `UM_ROLE_ID`
-   `UM_TENANT_ID`

---

## UM_HYBRID_REMEMBER_ME

When logging in to WSO2 Identity Server Management Console, user can
select the `Remember Me` option. Upon successful login, a record will be
added to this table. The `UM_USER_NAME` column contains the username of the
user. `UM_CREATED_TIME` is the date and time of the login.
`UM_COOKIE_VALUE` contains the `wso2.carbon.rememberme` cookie value which is created upon login.

-   `UM_ID`
-   `UM_USER_NAME`
-   `UM_COOKIE_VALUE`
-   `UM_CREATED_TIME`
-   `UM_TENANT_ID`

![User management related tables]({{base_path}}/assets/img/setup/configure/user-management-related-tables.png) 
