# User Management Related Tables

This section lists out all the user management related tables and their
attributes in the WSO2 Identity Server database.

#### UM\_TENANT

When creating a tenant, the details of the tenant are stored in this
table. `UM\_ID` is the auto generated tenant ID. Following are the columns
of the table.

-   `UM\_ID`
-   `UM\_DOMAIN\_NAME`
-   `UM\_EMAIL`
-   `UM\_ACTIVE`
-   `UM\_CREATED\_DATE`
-   `UM\_USER\_CONFIG`

#### UM\_DOMAIN

The user store domains of all tenants are stored in this table. By
default for a tenant, there are three domains as `PRIMARY`, `SYSTEM` and
`INTERNAL`. If a secondary user store is added for a tenant, the user
store domain details for that also will get stored in this table.

-   `UM\_DOMAIN\_ID`
-   `UM\_DOMAIN\_NAME`
-   `UM\_TENANT\_ID`  
      

#### UM\_USER

When a JDBC user store is used as a primary or secondary user store, the
user details will be stored in this table upon user creation. Following
are the columns of the table.

-   `UM\_ID`
-   `UM\_USER\_NAME`
-   `UM\_USER\_PASSWORD`
-   `UM\_SALT\_VALUE`
-   `UM\_REQUIRE\_CHANGE`
-   `UM\_CHANGED\_TIME`
-   `UM\_TENANT\_ID`

#### UM\_ROLE

When a JDBC user store is used as a primary or secondary user store, the
user role details will be stored in this table upon creation of a role.
Following are the columns of the table.

-   `UM\_ID`
-   `UM\_ROLE\_NAME`
-   `UM\_TENANT\_ID`
-   `UM\_SHARED\_ROLE`

#### UM\_MODULE

This table is not being used in Identity Server latest version.

-   `UM\_ID`
-   `UM\_MODULE\_NAME`

#### UM\_MODULE\_ACTIONS

This table is not being used in Identity Server latest version.

-   `UM\_ACTION`
-   `UM\_MODULE\_ID`

#### UM\_PERMISSION

The permission tree is stored in this table. These are the permissions
to be assigned for user roles. Following are the columns of the table.

-   `UM\_ID`
-   `UM\_RESOURCE\_ID`
-   `UM\_ACTION`
-   `UM\_TENANT\_ID`
-   `UM\_MODULE\_ID`  

#### UM\_ROLE\_PERMISSION

All the permissions assigned to a role are stored in this table. A role
can have multiple records in this table and each record is associated
with a particular permission defined by `UM\_PERMISSION\_ID`. This
permission ID is linked to `UM\_PERMISSION` table. Following are the
columns of the table.

-   `UM\_ID`
-   `UM\_PERMISSION\_ID`
-   `UM\_ROLE\_NAME`
-   `UM\_IS\_ALLOWED`
-   `UM\_TENANT\_ID`
-   `UM\_DOMAIN\_ID`  

#### UM\_USER\_PERMISSION

This table is not used in the latest Identity Server version. Following
are the columns of the table.

-   `UM\_ID`
-   `UM\_PERMISSION\_ID`
-   `UM\_USER\_NAME`
-   `UM\_IS\_ALLOWED`
-   `UM\_TENANT\_ID`

#### UM\_USER\_ROLE

The relationship with users and roles is stored in this table. One user
can have multiple roles assigned and similarly, one role can have
multiple users assigned into it. User is mapped with `UM\_USER\_ID` and
the role is mapped with `UM\_ROLE\_ID`. Following are the columns of the
table.

-   `UM\_ID`
-   `UM\_ROLE\_ID`
-   `UM\_USER\_ID`
-   `UM\_TENANT\_ID`

#### UM\_SHARED\_USER\_ROLE

This table is not being used in the latest version of the Identity
Server.

-   `UM\_ROLE\_ID`
-   `UM\_USER\_ID`
-   `UM\_USER\_TENANT\_ID`
-   `UM\_ROLE\_TENANT\_ID`

#### UM\_ACCOUNT\_MAPPING

This table is not being used in the latest version of the Identity
Server.

-   `UM\_ID`
-   `UM\_USER\_NAME`
-   `UM\_TENANT\_ID`
-   `UM\_USER\_STORE\_DOMAIN`
-   `UM\_ACC\_LINK\_ID`

#### UM\_USER\_ATTRIBUTE

When a JDBC user store is used and a user is created in that user store,
attributes can be added for the user profile. Each attribute will have a
record in the table as key value pairs where `UM\_ATTR\_NAME` and
`UM\_ATTR\_VALUE` columns contain the attribute name and value
respectively. `UM\_USER\_ID` column contains the ID of the user which
points to the UM\_ID column of the `UM\_USER` table. If a JDBC user store
is used, multiple profiles can be created for a user. The profile that
the user attribute belongs is given in `UM\_PROFILE\_ID` column. Following
are the columns of the table.

-   `UM\_ID`
-   `UM\_ATTR\_NAME`
-   `UM\_ATTR\_VALUE`
-   `UM\_PROFILE\_ID`
-   `UM\_USER\_ID`
-   `UM\_TENANT\_ID`  

#### UM\_DIALECT

In claim management, all the claims are grouped into dialects. A claim
dialect is a group of claims. One claim dialect can have multiple
claims. Those claims are stored in UM\_CLAIM table. The claim dialects
are stored in this table. Following are the columns of the table.

-   `UM\_ID`
-   `UM\_DIALECT\_URI`
-   `UM\_TENANT\_ID`

#### UM\_CLAIM

All the claims of all claim dialects are stored in this table. Following
are the columns of the table.

-   `UM\_ID`
-   `UM\_DIALECT\_ID`
-   `UM\_CLAIM\_URI`
-   `UM\_DISPLAY\_TAG`
-   `UM\_DESCRIPTION`
-   `UM\_MAPPED\_ATTRIBUTE\_DOMAIN`
-   `UM\_MAPPED\_ATTRIBUTE`
-   `UM\_REG\_EX`
-   `UM\_SUPPORTED`
-   `UM\_REQUIRED`
-   `UM\_DISPLAY\_ORDER`
-   `UM\_CHECKED\_ATTRIBUTE`
-   `UM\_READ\_ONLY`
-   `UM\_TENANT\_ID`

#### UM\_PROFILE\_CONFIG

This table is not being used in the Identity Server latest version.
Following are the columns in the table.

-   `UM\_ID`
-   `UM\_DIALECT\_ID`
-   `UM\_PROFILE\_NAME`
-   `UM\_TENANT\_ID`

#### UM\_HYBRID\_ROLE

All the `internal` roles are stored in this table. By default `everyone`
role is there for each tenant. Apart from that, for each Service
Provider created, a role will be added to this table with the same name
as the Service Provider name. Following are the columns of the table.

-   `UM\_ID`
-   `UM\_ROLE\_NAME`
-   `UM\_TENANT\_ID`

#### UM\_HYBRID\_USER\_ROLE

When a user is assigned an `internal` role, that is recorded in this
table. The `internal` roles are stored in `UM\_HYBRID\_ROLE` table and
from this table, the users are mapped to those roles. Following are the
columns of the table.

-   `UM\_ID`
-   `UM\_USER\_NAME`
-   `UM\_ROLE\_ID`
-   `UM\_TENANT\_ID`
-   `UM\_DOMAIN\_ID`

#### UM\_SYSTEM\_USER

System users of the Identity Server are stored in this table. The
`wso2.anonymous.user` user is by default created. Following are the
columns of the table.

-   `UM\_ID`
-   `UM\_USER\_NAME`
-   `UM\_USER\_PASSWORD`
-   `UM\_SALT\_VALUE`
-   `UM\_REQUIRE\_CHANGE`
-   `UM\_CHANGED\_TIME`
-   `UM\_TENANT\_ID`

#### UM\_SYSTEM\_ROLE

System roles of the Identity Server are stored in this table. The
`wso2.anonymous.role` is created by default which is a special role that
represents a user that has not logged into the Identity Server
Management Console. Granting "Read" access to resources for this role
would mean that you do not require authentication to access resources
using the respective permalinks. Following are the columns of the table.

-   `UM\_ID`
-   `UM\_ROLE\_NAME`
-   `UM\_TENANT\_ID`

#### UM\_SYSTEM\_USER\_ROLE

Storing the system roles assigned to the the system users is done with
this table. `UM\_USER\_NAME` contains the username of the system user.
`UM\_ROLE\_ID` column contains the ID of the system role which points to
the `UM\_ID` column of the `UM\_SYSTEM\_ROLE` table. `wso2.anonymous.role`
system role is by default assigned to the `wso2.anonymous.user` system
user in this table. Following are the columns of the table.

-   `UM\_ID`
-   `UM\_USER\_NAME`
-   `UM\_ROLE\_ID`
-   `UM\_TENANT\_ID`

#### UM\_HYBRID\_REMEMBER\_ME

When login to the management console of the Identity Server, user can
select the `Remember Me` option. Upon successful login, a record will be
added to this table. `UM\_USER\_NAME` column contains the username of the
user. `UM\_CREATED\_TIME` is the date and time of the login.
`UM\_COOKIE\_VALUE` column contains the wso2.carbon.rememberme cookie
value which is created upon login.

-   `UM\_ID`
-   `UM\_USER\_NAME`
-   `UM\_COOKIE\_VALUE`
-   `UM\_CREATED\_TIME`
-   `UM\_TENANT\_ID`

![User management related tables]( ../../assets/img/using-wso2-identity-server/user-management-related-tables.png) 
