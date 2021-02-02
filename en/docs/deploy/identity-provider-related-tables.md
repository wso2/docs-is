# Identity Provider Related Tables

This section lists out all the identity provider related tables and
their attributes in the WSO2 Identity Server database.

---

#### IDP

When an Identity Provider is added, the details are stored in this
table. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `NAME`
-   `IS_ENABLED`
-   `IS_PRIMARY`
-   `HOME_REALM_ID`
-   `IMAGE`
-   `CERTIFICATE`
-   `ALIAS`
-   `INBOUND_PROV_ENABLED`
-   `INBOUND_PROV_USER_STORE_ID`
-   `USER_CLAIM_URI`
-   `ROLE_CLAIM_URI`
-   `DESCRIPTION`
-   `DEFAULT_AUTHENTICATOR_NAME`
-   `DEFAULT_PRO_CONNECTOR_NAME`
-   `PROVISIONING_ROLE`
-   `IS_FEDERATION_HUB`
-   `IS_LOCAL_CLAIM_DIALECT`
-   `DISPLAY_NAME`

---

#### IDP_ROLE

An Identity Provider may have different roles for authorization which
are different from the local roles of the Identity Server. In such a
situation, roles at the Identity Provider can be mapped to the local
roles in the Identity Server. Such roles of the Identity Provider are
stored in this table. ROLE column contains the name of the role. `IDP\_ID`
is the ID of the Identity Provider. Following are the columns of the
table.

-   `ID`
-   `IDP_ID`
-   `TENANT_ID`
-   `ROLE`

---

#### IDP_ROLE_MAPPING

The mappings of local roles of the Identity Server to the roles of
Identity Providers are stored in this table. `LOCAL_ROLE` column has the
value of the role name of the local role. `IDP_ROLE_ID` column has the
ID of the Identity Provider’s role which points to the ID column of the
`IDP_ROLE` table.

-   `ID`
-   `IDP_ROLE_ID`
-   `TENANT_ID`
-   `USER_STORE_ID`
-   `LOCAL_ROLE`

---

#### IDP_CLAIM

When an Identity Provider is having claims that are different from the
local claims of the Identity Server, corresponding claims of the
Identity Provider can be mapped to the local claims where the Identity
Provider claims are stored in this table. The mapping details of the
local claims are stored in `IDP_CLAIM_MAPPING` table. Following are the
columns of the table.

-   `ID`
-   `IDP_ID`
-   `TENANT_ID`
-   `CLAIM`

---

#### IDP_CLAIM_MAPPING

The mappings of the local claims with the Identity Provider claims are
stored in this table.`IDP_CLAIM_ID` column has the Identity Provider’s
claim ID which points to the ID column of the `IDP_CLAIM` table.
 `LOCAL_CLAIM` column contains the claim value of the local claim in the
mapping. Following are the columns of the table.

-   `ID`
-   `IDP_CLAIM_ID`
-   `TENANT_ID`
-   `LOCAL_CLAIM`
-   `DEFAULT_VALUE`
-   `IS_REQUESTED`

---

#### IDP_AUTHENTICATOR

The Local and Federated authenticators for each Identity Provider are
stored in this table. The NAME column contains the name of the
authenticator. `IDP_ID` is the Identity Provider’s ID which points to the
ID column of the IDP table. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `IDP_ID`
-   `NAME`
-   `IS_ENABLED`
-   `DISPLAY_NAME`

---

#### IDP_AUTHENTICATOR_PROPERTY

The properties related to the authenticators stored in
`IDP_AUTHENTICATOR` table are stored in this table. The properties are
stored as key value pairs in `PROPERTY_KEY` and `PROPERTY_VALUE` tables
respectively. The associated authenticator ID is given in the
`AUTHENTICATOR_ID` column which points to the ID column of the
`IDP_AUTHENTICATOR` table. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `AUTHENTICATOR_ID`
-   `PROPERTY_KEY`
-   `PROPERTY_VALUE`
-   `IS_SECRET`

---

#### IDP_PROVISIONING_CONFIG

The Outbound Provisioning Connector details for each Identity Provider
is stored in this table. The Identity Provider’s ID is given in the
`IDP_ID` column which points to the ID column of the IDP. Provisioning
Connector Type is given in the `PROVISIONING_CONNECTOR_TYPE` column.
Detailed configuration for each type of provisioning connector is stored
in `IDP_PROV_CONFIG_PROPERTY` table. Following are the columns of this
table.

-   `ID`
-   `TENANT_ID`
-   `IDP_ID`
-   `PROVISIONING_CONNECTOR_TYPE`
-   `IS_ENABLED`
-   `IS_BLOCKING`

---

#### IDP_PROV_CONFIG_PROPERTY

The properties for each Provisioning Connector are stored in this table
as key value pairs in `PROPERTY_KEY` and `PROPERTY_VALUE` columns
respectively. `PROVISIONING_CONFIG_ID` is the ID of the Provisioning
Connector in `IDP_PROVISIONING_CONFIG` table. Data type of the property
is stored in `PROPERTY_TYPE` column. Following are the columns of the
table.

-   `ID`
-   `TENANT_ID`
-   `PROVISIONING_CONFIG_ID`
-   `PROPERTY_KEY`
-   `PROPERTY_VALUE`
-   `PROPERTY_BLOB_VALUE`
-   `PROPERTY_TYPE`
-   `IS_SECRET`

---

#### IDP_PROVISIONING_ENTITY

When Outbound Provisioning is enabled for an Identity Provider and a
User or a Group is created inside Identity Server, this table is storing
records such that the `PROVISIONING_CONFIG_ID` contains the ID of the
Provisioning Config that points to the ID column of the
`IDP_PROVISIONING_CONFIG` table. `ENTITY_TYPE` column contains the type
of the entity which can be either USER or GROUP. The user store of the
Identity Server where the user or group is created is added to
`ENTITY_LOCAL_USERSTORE` column. `ENTITY_NAME` contains the name of the
user or role created inside Identity Server. `ENTITY_VALUE` contains the
unique identifier of the user or group created at the external
provisioned Identity Provider.

-   `ID`
-   `PROVISIONING_CONFIG_ID`
-   `ENTITY_TYPE`
-   `ENTITY_LOCAL_USERSTORE`
-   `ENTITY_NAME`
-   `ENTITY_VALUE`
-   `TENANT_ID`

---

#### IDP_LOCAL_CLAIM

This table is not used in the latest version of Identity Server.

-   `ID`
-   `TENANT_ID`
-   `IDP_ID`
-   `CLAIM_URI`
-   `DEFAULT_VALUE`
-   `IS_REQUESTED`  
      
      
    ![Identity provider related tables](../../../assets/img/deploy/identity-provider-related-tables.png) 
