# Service Provider Related Tables

This section lists out all the service provider related tables and their
attributes in the WSO2 Identity Server database.

#### SP\_APP

When a Service Provider is added, the details are stored in this table.
The APP\_NAME column represents the Service Provider name. Following are
the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `APP\_NAME`
-   `USER\_STORE`
-   `USERNAME`
-   `DESCRIPTION`
-   `ROLE\_CLAIM`
-   `AUTH\_TYPE`
-   `PROVISIONING\_USERSTORE\_DOMAIN`
-   `IS\_LOCAL\_CLAIM\_DIALECT`
-   `IS\_SEND\_LOCAL\_SUBJECT\_ID`
-   `IS\_SEND\_AUTH\_LIST\_OF\_IDPS`
-   `SUBJECT\_CLAIM\_URI`
-   `IS\_SAAS\_APP`

  

#### SP\_INBOUND\_AUTH

Inbound authentication configuration details of a Service Provider are
stored in this table. For each type of associated inbound authentication
configuration for a Service Provider, there will be a separate record
(i.e. OpenID, PassiveSTS, SAMLSSO). If the inbound authentication
configuration is SAMLSSO (value in `INBOUND\_AUTH\_TYPE` is `samlsso`), it
will have a property named “Attribute Consuming Service Index” in the
column `PROP\_NAME` and the value is a random integer stored in
`PROP\_VALUE` column. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `INBOUND\_AUTH\_KEY`
-   `INBOUND\_AUTH\_TYPE`
-   `PROP\_NAME`
-   `PROP\_VALUE`
-   `APP\_ID`

  

#### SP\_AUTH\_STEP

The Service Providers can define how to authenticate users at the
Identity Server, for authentication requests initiated by it. While
doing that, each Service Provider can define multiple steps and for each
step it can pick more than one authenticator. This is called as
Multi-level (multi-factor) Authentication. This table stores each
authentication step added to the Service Provider. Service Provider is
represented by the `APP\_ID`. If multiple authentication steps are added
for one Service Provider, the order is maintained in the STEP\_ORDER
column. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `STEP\_ORDER`
-   `APP\_ID`
-   `IS\_SUBJECT\_STEP`
-   `IS\_ATTRIBUTE\_STEP`

  

#### SP\_FEDERATED\_IDP

For a Service Provider, Federated Identity Providers can be added for
authentication. The Federated Identity Providers for a Service Provider
are stored in this table. Here the ID column points to the ID column of
the `SP\_AUTH\_STEP` table. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `AUTHENTICATOR\_ID`

  

#### SP\_CLAIM\_MAPPING

When the claims of the Identity Provider are different from the Service
Provider, corresponding claims can be mapped from this table for each
Service Provider. The Service Provider ID is given in `APP\_ID` and the
`IDP\_CLAIM` and `SP\_CLAIM` are the Identity Provider and Service Provider
claims respectively. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `IDP\_CLAIM`
-   `SP\_CLAIM`
-   `APP\_ID`
-   `IS\_REQUESTED`
-   `DEFAULT\_VALUE`

  

#### SP\_ROLE\_MAPPING

When there are user roles defined in the Identity Provider side (here
WSO2 Identity Server) and also in the client application side, the roles
in both sides can be mapped together accordingly through the Service
Provider. The Service Provider ID is given in `APP\_ID` and the client
application side role is given in `SP\_ROLE` where the Identity Provider’s
side role is given in `IDP\_ROLE`. This way, the client application
developers do not need to know the available roles in the Identity
Provider as the roles can be mapped and linked together. Following are
the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `IDP\_ROLE`
-   `SP\_ROLE`
-   `APP\_ID`

  

#### SP\_REQ\_PATH\_AUTHENTICATOR

If a RequestPathAuthenticator is added to a Service Provider, that is
recorded in this table. Service Provider ID is given in `APP\_ID`.
`AUTHENTICATOR\_NAME` column will contain the name of the request path
authenticator.  Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `AUTHENTICATOR\_NAME`
-   `APP\_ID`

  

#### SP\_PROVISIONING\_CONNECTOR

Outbound Provisioning Connectors can be added to the Identity Providers
for user provisioning. Those Provisioning Connectors can be linked to a
Service Provider. For a Service Provider, the associated Provisioning
Connectors are stored in this table. `IDP\_NAME` column has the Identity
Provider name and the `CONNECTOR\_NAME` column has the name of the
provisioning connector. `APP\_ID` column has the ID of the Service
Provider. Following are the columns of the table.

-   `ID`
-   `TENANT\_ID`
-   `IDP\_NAME`
-   `CONNECTOR\_NAME`
-   `APP\_ID`
-   `IS\_JIT\_ENABLED`
-   `BLOCKING`


![Service provider related tables]( ../../assets/img/using-wso2-identity-server/service-provider-related-tables.png) 
