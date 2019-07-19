# Identity Provisioning

Identity provisioning is key for [Identity
Federation](_Identity_Federation_).  See the following identity
provisioning key concepts that are used in WSO2 Identity Server.

-   [Provisioning
    framework](#IdentityProvisioning-Provisioningframework)
-   [Inbound provisioning](#IdentityProvisioning-Inboundprovisioning)
-   [Outbound provisioning](#IdentityProvisioning-Outboundprovisioning)
-   [Just In Time
    provisioning](#IdentityProvisioning-JustInTimeprovisioning)

### Provisioning framework

The identity provisioning framework is the main component that handles
user/ role provisioning in WSO2 Identity Server. The WSO2 Identity
Provisioning framework can be separated into three main components, such
as [Inbound provisioning](_Inbound_Provisioning_) , [Outbound
provisioning](_Outbound_Provisioning_) , and [User store
management](_Configuring_User_Stores_).

The inbound provisioning component is used by the external applications
to provision users to WSO2 Identity Server while outbound provisioning
component is responsible for provisioning users from WSO2 Identity
Server to external applications.  The user store management system is
used to persist users within the system. For more information on how
Identity provisioning is linked with the WSO2 Identity Server
architecture, see [Architecture](_Architecture_).

The diagram given below gives you a high level idea of the provisioning
framework.

![](attachments/103330152/103330153.jpg){width="700" height="459"}

### Inbound provisioning

[Inbound provisioning](_Inbound_Provisioning_) provisions users or
groups in to the WSO2 Identity Server by an external application. These
external applications are referred to as service providers. WSO2
Identity Server support the  SCIM API and SOAP-based Web service API
standards for inbound provisioning. To get an understanding of how
inbound provisioning is linked to the WSO2 Identity Server architecture,
see [Architecture](_Architecture_).

Once the users or groups are provisioned to WSO2 Identity Server, you
can:

-   Persist the users or groups within the Identity Server.

-   Persist the users or groups to the Identity Server and provision
    them to external applications using [outbound
    provisioning](_Outbound_Provisioning_).

-   Provision the users or groups to the external applications using
    outbound provisioning, without persisting them  internally.

SCIM is the most widely used industry adopted provisioning protocol. It
has two main versions, such as [SCIM 1.1](http://www.simplecloud.info/)
and [SCIM 2.0](http://www.simplecloud.info/). WSO2 Identity Server
supports both these versions for inbound provisioning. By default, these
APIs are protected by Basic authentication and Oauth 2.0.

!!! note
    
    Apart from the inbound provisioning mechanism, given below are the other
    methods you can add and manage users to WSO2 Identity Server:
    
    -   [Using the management console](_Configuring_Users_)
    
    -   [Self registration API](_Using_the_Self_Sign-Up_REST_APIs_)
    
    -   [Just-In-Time (JIT)
        Provisioning](_Configuring_Just-In-Time_Provisioning_for_an_Identity_Provider_)
    

### Outbound provisioning

[Outbound provisioning](_Outbound_Provisioning_) provisions users to a
trusted identity provider from the WSO2 Identity Server. A trusted
identity provider is basically an identity provider that supports
inbound provisioning. It can be Google, Salesforce, another Identity
Server, etc. Outbound Provisioning involves sending provisioning
requests from the Identity Server to other external applications.

Outbound provisioning is supported via SCIM or SPML standards. There are
outbound provisioning connectors for Google and Salesforce available by
default in the Identity Server.

To cater to the provisioning requirement the Identity Server outbound
provisioning component has different connectors for different protocol.
These include the SCIM connector where the SCIM outbound
connector only supports SCIM 1.1, Google connector, and Salesforce
connectors. Check out the [WSO2 IS connector
store](https://store.wso2.com/store/assets/isconnector/list) for more
provisioning connectors.

That's not all, you can plug custom connectors to WSO2 Identity Server.
See [Writing an Outbound Provisioning
Connector](_Writing_an_Outbound_Provisioning_Connector_) , for more
information on writing an extension for a custom connector. Outbound
provisioning configurations can be found under the **Identity Provider
configuration** user interface of the WSO2 Identity Server management
console.

!!! tip
    
    For more information on how outbound provisioning fits with the WSO2
    Identity Server architecture, see [Architecture](_Architecture_).
    

The following topics discuss the various ways you can configure outbound
provisioning:

-   **[Role Based Provisioning](_Role_Based_Provisioning_)**
-   **[Rule Based Provisioning](_Rule_Based_Provisioning_)**
-   **[Provisioning Patterns](_Provisioning_Patterns_)**

### Just In Time provisioning

[Just-In-Time (JIT)
provisioning](_Configuring_Just-In-Time_Provisioning_for_an_Identity_Provider_)
provisions users to the Identity Server at the time of [federated
authentication](_Identity_Federation_). When WSO2 Identity Server is
used for federated authentication, it redirects the user to an external
Identity Provider for authentication. JIT provisioning is triggered when
the Identity Server receives a positive authentication response from the
external Identity Provider. The Identity Server provisions the user to
its internal user store using the user claims of the authentication
response.

Using JIT provisioning you can:

-   Persist users within the Identity Server.

-   Persist users to the Identity Server and provision them to the
    external system using [outbound
    provisioning](#IdentityProvisioning-Outboundprovisioning).

!!! tip
    
    For more information on how outbound provisioning fits with the WSO2
    Identity Server architecture, see [Architecture](_Architecture_).
    
