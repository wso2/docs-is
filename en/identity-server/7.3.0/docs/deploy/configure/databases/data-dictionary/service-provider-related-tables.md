# Service Provider Related Tables

This section lists out all the service provider related tables and their
attributes in the WSO2 Identity Server database.

---

## SP_APP

When a service provider is added, the details are stored in this table.
The `APP_NAME` column represents the service provider name. Following are
the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `APP_NAME`
-   `USER_STORE`
-   `USERNAME`
-   `DESCRIPTION`
-   `ROLE_CLAIM`
-   `AUTH_TYPE`
-   `PROVISIONING_USERSTORE_DOMAIN`
-   `IS_LOCAL_CLAIM_DIALECT`
-   `IS_SEND_LOCAL_SUBJECT_ID`
-   `IS_SEND_AUTH_LIST_OF_IDPS`
-   `SUBJECT_CLAIM_URI`
-   `IS_SAAS_APP`

---

## SP_INBOUND_AUTH

Inbound authentication configuration details of a service provider are
stored in this table. For each type of associated inbound authentication
configuration for a service provider, there will be a separate record
(i.e. OpenID, PassiveSTS, SAMLSSO). If the inbound authentication
configuration is SAMLSSO (value in `INBOUND_AUTH_TYPE` is `samlsso`), it
will have a property named `Attribute Consuming Service Index` in the
column, `PROP_NAME` and the value is a random integer stored in the
`PROP_VALUE` column. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `INBOUND_AUTH_KEY`
-   `INBOUND_AUTH_TYPE`
-   `PROP_NAME`
-   `PROP_VALUE`
-   `APP_ID`

--- 

## SP_AUTH_STEP

The service providers can define how to authenticate users at WSO2 Identity Server, for authentication requests initiated by it. While
doing that, each service provider can define multiple steps and for each
step, it can pick more than one authenticator. This is called multi-level (multi-factor) authentication. This table stores each
authentication step added to the service provider. Service provider is
represented by the `APP_ID`. If multiple authentication steps are added
for one service provider, the order is maintained in the `STEP_ORDER`
column. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `STEP_ORDER`
-   `APP_ID`
-   `IS_SUBJECT_STEP`
-   `IS_ATTRIBUTE_STEP`

--- 

## SP_FEDERATED_IDP

For a service provider, federated identity providers can be added for
authentication. The federated identity providers for a service provider
are stored in this table. Here, the ID column points to the ID column of
the `SP_AUTH_STEP` table. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `AUTHENTICATOR_ID`

--- 

## SP_CLAIM_MAPPING

When the claims of the identity provider are different from the service
provider, corresponding claims can be mapped from this table for each
service provider. The service provider ID is given in `APP_ID` and the
`IDP_CLAIM` and `SP_CLAIM` are the identity provider and service provider
claims respectively. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `IDP_CLAIM`
-   `SP_CLAIM`
-   `APP_ID`
-   `IS_REQUESTED`
-   `DEFAULT_VALUE`

--- 

## SP_ROLE_MAPPING

When there are user roles defined in both the identity provider (here
WSO2 Identity Server) and the client application sides, the roles
in both sides can be mapped together accordingly through the service
provider. The service provider ID is given in `APP_ID`, the client
application side role is given in `SP_ROLE`, and the identity provider’s
side role is given in `IDP_ROLE`. This way, the client application
developers do not need to know the available roles in the identity
provider as the roles can be mapped and linked together. Following are
the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `IDP_ROLE`
-   `SP_ROLE`
-   `APP_ID`

---

## SP_REQ_PATH_AUTHENTICATOR

If a `RequestPathAuthenticator` is added to a service provider, that is
recorded in this table. Service provider ID is given in `APP_ID`.
The `AUTHENTICATOR_NAME` column will contain the name of the request path
authenticator.  Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `AUTHENTICATOR_NAME`
-   `APP_ID`

---  

## SP_PROVISIONING_CONNECTOR

Outbound provisioning connectors can be added to the identity providers
for user provisioning. Those provisioning connectors can be linked to a
service provider. For a service provider, the associated provisioning
connectors are stored in this table. The `IDP_NAME` column has the identity
provider name and the `CONNECTOR_NAME` column has the name of the
provisioning connector. The `APP_ID` column has the ID of the service
provider. Following are the columns of the table.

-   `ID`
-   `TENANT_ID`
-   `IDP_NAME`
-   `CONNECTOR_NAME`
-   `APP_ID`
-   `IS_JIT_ENABLED`
-   `BLOCKING`


![Service provider related tables]({{base_path}}/assets/img/setup/configure/service-provider-related-tables.png) 
