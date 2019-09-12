# Identity Provider Related Tables

This section lists out all the identity provider related tables and
their attributes in the WSO2 Identity Server database.

#### IDP

When an Identity Provider is added, the details are stored in this
table. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `NAME`
-   `IS\_ENABLED`
-   `IS\_PRIMARY`
-   `HOME\_REALM\_ID`
-   `IMAGE`
-   `CERTIFICATE`
-   `ALIAS`
-   `INBOUND\_PROV\_ENABLED`
-   `INBOUND\_PROV\_USER\_STORE\_ID`
-   `USER\_CLAIM\_URI`
-   `ROLE\_CLAIM\_URI`
-   `DESCRIPTION`
-   `DEFAULT\_AUTHENTICATOR\_NAME`
-   `DEFAULT\_PRO\_CONNECTOR\_NAME`
-   `PROVISIONING\_ROLE`
-   `IS\_FEDERATION\_HUB`
-   `IS\_LOCAL\_CLAIM\_DIALECT`
-   `DISPLAY\_NAME`

#### IDP\_ROLE

An Identity Provider may have different roles for authorization which
are different from the local roles of the Identity Server. In such a
situation, roles at the Identity Provider can be mapped to the local
roles in the Identity Server. Such roles of the Identity Provider are
stored in this table. ROLE column contains the name of the role. `IDP\_ID`
is the ID of the Identity Provider. Following are the columns of the
table.

-   `ID`
-   `IDP\_ID`
-   `TENANT\_ID`
-   `ROLE`

#### IDP\_ROLE\_MAPPING

The mappings of local roles of the Identity Server to the roles of
Identity Providers are stored in this table. `LOCAL\_ROLE` column has the
value of the role name of the local role. `IDP\_ROLE\_ID` column has the
ID of the Identity Provider’s role which points to the ID column of the
`IDP\_ROLE` table.

-   `ID`
-   `IDP\_ROLE\_ID`
-   `TENANT\_ID`
-   `USER\_STORE\_ID`
-   `LOCAL\_ROLE`

#### IDP\_CLAIM

When an Identity Provider is having claims that are different from the
local claims of the Identity Server, corresponding claims of the
Identity Provider can be mapped to the local claims where the Identity
Provider claims are stored in this table. The mapping details of the
local claims are stored in `IDP\_CLAIM\_MAPPING` table. Following are the
columns of the table.

-   `ID`
-   `IDP\_ID`
-   `TENANT\_ID`
-   `CLAIM`

#### IDP\_CLAIM\_MAPPING

The mappings of the local claims with the Identity Provider claims are
stored in this table.`IDP\_CLAIM\_ID` column has the Identity Provider’s
claim ID which points to the ID column of the `IDP\_CLAIM` table.
 `LOCAL\_CLAIM` column contains the claim value of the local claim in the
mapping. Following are the columns of the table.

-   `ID`
-   `IDP\_CLAIM\_ID`
-   `TENANT\_ID`
-   `LOCAL\_CLAIM`
-   `DEFAULT\_VALUE`
-   `IS\_REQUESTED`

#### IDP\_AUTHENTICATOR

The Local and Federated authenticators for each Identity Provider are
stored in this table. The NAME column contains the name of the
authenticator. `IDP\_ID` is the Identity Provider’s ID which points to the
ID column of the IDP table. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `IDP\_ID`
-   `NAME`
-   `IS\_ENABLED`
-   `DISPLAY\_NAME`

#### IDP\_AUTHENTICATOR\_PROPERTY

The properties related to the authenticators stored in
`IDP\_AUTHENTICATOR` table are stored in this table. The properties are
stored as key value pairs in `PROPERTY\_KEY` and `PROPERTY\_VALUE` tables
respectively. The associated authenticator ID is given in the
`AUTHENTICATOR\_ID` column which points to the ID column of the
`IDP\_AUTHENTICATOR` table. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `AUTHENTICATOR\_ID`
-   `PROPERTY\_KEY`
-   `PROPERTY\_VALUE`
-   `IS\_SECRET`

#### IDP\_PROVISIONING\_CONFIG

The Outbound Provisioning Connector details for each Identity Provider
is stored in this table. The Identity Provider’s ID is given in the
`IDP\_ID` column which points to the ID column of the IDP. Provisioning
Connector Type is given in the `PROVISIONING\_CONNECTOR\_TYPE` column.
Detailed configuration for each type of provisioning connector is stored
in `IDP\_PROV\_CONFIG\_PROPERTY` table. Following are the columns of this
table.

-   `ID`
-   `TENANT\_ID`
-   `IDP\_ID`
-   `PROVISIONING\_CONNECTOR\_TYPE`
-   `IS\_ENABLED`
-   `IS\_BLOCKING`

#### IDP\_PROV\_CONFIG\_PROPERTY

The properties for each Provisioning Connector are stored in this table
as key value pairs in `PROPERTY\_KEY` and `PROPERTY\_VALUE` columns
respectively. `PROVISIONING\_CONFIG\_ID` is the ID of the Provisioning
Connector in `IDP\_PROVISIONING\_CONFIG` table. Data type of the property
is stored in `PROPERTY\_TYPE` column. Following are the columns of the
table.

-   `ID`
-   `TENANT\_ID`
-   `PROVISIONING\_CONFIG\_ID`
-   `PROPERTY\_KEY`
-   `PROPERTY\_VALUE`
-   `PROPERTY\_BLOB\_VALUE`
-   `PROPERTY\_TYPE`
-   `IS\_SECRET`

#### IDP\_PROVISIONING\_ENTITY

When Outbound Provisioning is enabled for an Identity Provider and a
User or a Group is created inside Identity Server, this table is storing
records such that the `PROVISIONING\_CONFIG\_ID` contains the ID of the
Provisioning Config that points to the ID column of the
`IDP\_PROVISIONING\_CONFIG` table. `ENTITY\_TYPE` column contains the type
of the entity which can be either USER or GROUP. The user store of the
Identity Server where the user or group is created is added to
`ENTITY\_LOCAL\_USERSTORE` column. `ENTITY\_NAME` contains the name of the
user or role created inside Identity Server. `ENTITY\_VALUE` contains the
unique identifier of the user or group created at the external
provisioned Identity Provider.

-   `ID`
-   `PROVISIONING\_CONFIG\_ID`
-   `ENTITY\_TYPE`
-   `ENTITY\_LOCAL\_USERSTORE`
-   `ENTITY\_NAME`
-   `ENTITY\_VALUE`
-   `TENANT\_ID`

#### IDP\_LOCAL\_CLAIM

This table is not used in the latest version of Identity Server.

-   `ID`
-   `TENANT\_ID`
-   `IDP\_ID`
-   `CLAIM\_URI`
-   `DEFAULT\_VALUE`
-   `IS\_REQUESTED`  
      
      
    ![Identity provider related tables]( ../../assets/img/using-wso2-identity-server/identity-provider-related-tables.png) 
