# Provisioning Architecture

The provisioning framework is responsible for all provisioning work done by WSO2 Identity Server. This framework integrates with the Userstore Manager component and also receives provisioning requests from the authentication framework. 

---

## Inbound provisioning

Inbound provisioning focuses on how to provision users to the Identity
Server. Out-of-the-box, WSO2 Identity Server supports inbound
provisioning via a SOAP-based API as well as the SCIM 2.0 API. Both the
APIs support HTTP Basic Authentication. If you invoke the provisioning
API with Basic Authentication credentials, then where to provision the
user (to which userstore) will be decided based on the inbound
provisioning configuration of the resident service provider.

The SCIM API also supports OAuth 2.0. If the user authenticates to the
SCIM API with OAuth credentials, then the system will load the
configuration corresponding to the service provider who owns the OAuth
client id. If you plan to invoke the SCIM API via a web application or a
mobile application, we would highly recommend you to use OAuth instead
of Basic Authentication. You simply need to register your application as
a service provider in Identity Server and then generate OAuth keys.

---

## JIT provisioning

Just-in-time provisioning talks about how to provision users to the
Identity Server at the time of federated authentication. A service
provider initiates the authentication request, the user gets redirected
to the Identity Server and then Identity Server redirects the user to an
external identity provider for authentication. Just-in-time provisioning
gets triggered in such a scenario when the Identity Server receives a
positive authentication response from the external identity provider.
The Identity Server will provision the user to its internal userstore
with the user claims from the authentication response.

You configure JIT provisioning against an identity provider - not
against service providers. Whenever you associate an identity provider
with a service provider for outbound authentication, if the JIT
provisioning is enabled for that particular identity provider, then the
users from the external identity provider will be provisioned into the
Identity Server's internal userstore. In the JIT provisioning
configuration you can also pick the provisioning userstore.

---

## Outbound provisioning

Outbound provisioning talks about provisioning users to external
systems. This can be initiated by any of the following.

-   Inbound provisioning request (initiated by a service provider or the
    resident service provider)
-   JIT provisioning (initiated by a service provider)
-   Adding a user via the management console (initiated by the
    resident service provider)
-   Assigning a user to a provisioning role (initiated by the
    resident service provider)

WSO2 Identity Server supports outbound provisioning with the following
connectors. You need to configure one or more outbound provisioning
connectors with a given identity provider, and associate the identity
provider with a service provider. All the provisioning requests must be
initiated by a service provider - and will be provisioned to all the
identity providers configured in the outbound provisioning configuration
of the corresponding service provider.

-   SCIM
-   SPML
-   SOAP
-   Google Apps provisioning API
-   Salesforce provisioning API

JIT provisioning happens while in the middle of an authentication flow.
The provisioning can happen in a blocking mode or in a non-blocking
mode. In the blocking mode, the authentication flow will be blocked until
the provisioning finishes - while in the non-blocking mode, provisioning
happens in a different thread.

---

## Conditional provisioning with roles

If you want to provision a user to an external identity provider, for
example to Salesforce or Google Apps, based on the user's role, then you
need to define one or more provisioning roles in the outbound
provisioning configuration of the corresponding identity provider.

---

## SCIM implementation using WSO2 Charon

WSO2 Charon is an open source implementation of SCIM protocol, which is
an open standard for Identity Provisioning. It can be used by anyone
who wants to add SCIM-based provisioning support for their
applications. WSO2 Charon is integrated with WSO2 Identity Server. This
section demonstrates the utilization of SCIM endpoints which expose user
and group resources in a RESTful way.

Charon library comprises of four main components. 

![Components of the Charon library]({{base_path}}/assets/img/get-started/charon.png)

### Charon — Core

As the name implies, this is the core part of the library which implements SCIM .02 specification and exposes a set of APIs for SCIM 2.0 consumers. The main functionalities of Charon core are as below.

-   Create SCIM 2.0 Objects - SCIM is built on an object model where a resource is a common denominator and all SCIM Objects are derived from it. Charon core contains SCIM Object Implementation where the object is a collection of attributes.

-   Decode JSON encoded resource Strings - This implementation allows to decode the JSON-encoded resource string and to create SCIM object model adhering to the specification. The class, `JSONDecoder.java` is responsible for this.

-   Encode SCIM objects - This implementation allows to create the encoded JSON response from the SCIM object model and send the SCIM response object using the `JSONEncoder.java` class.

-   Set Attributes - Attributes can be **simple** types such as name or id, **complex** types such as email address and address (attributes which have sub attributes), or **multivalued** types such as email or telephone number.

-   Define Schema - Schema is a collection of attribute definitions that describe the contents of an entire or partial resource.
AttributeSchema defines schema for SCIM attributes and sub attributes. The attribute definitions specify the name of the attribute, and metadata such as type (e.g., string, binary), cardinality (singular, multi, complex) and mutability
ResourceTypeSchema defines resource schema definitions (Ex: `urn:ietf:params:scim:schemas:core:2.0:User`, `urn:ietf:params:scim:schemas:core:2.0:Group`)

-   Exposes Endpoints
    
    -   `UserResourceManager` - `UserResourceManager` API is exposed to perform operations on user resource. A SCIM client can call this API and perform CRUD operations on a user.

    -   `GroupResourceManager` - `GroupResourceManager` API is exposed to perform operations on group resource. A SCIM client can call this API and perform CRUD operations on a group.

    -   `MeResourceManager` - By using `MeResourceManager`, a SCIM client can use a URL like `<\base_url>/Me` to perform CRUD operations as the authenticated subject. This API is also accessible from the SCIM client.

    -   `BulkResourceManager` - The API `BulkResourceManage` is exposed from charon-core to perform bulk operations. A SCIM Service provider can call this API to perform bulk operations based on the HTTP requests sent from a SCIM client.

    -   `ResourceTypesResourceManager` - The API, `ResourceTypesResourceManager` specifies the metadata about resource types.

    -   `ServiceProviderConfigResourceManager` - By using `ServiceProviderConfigResourceManager`, a SCIM client can discover the SCIM specification features in a standardized form and other additional implementation details.


-   Extension Points - There are some extension points through which users can plug their own custom implementations with wso2 charon-core.
    
    -   UserManager
    -   CharonManager
    -   AbstractSCIMObject
    -   AbstractAttribute
    -   JSONEncoder
    -   JsonDecoder

    As Charon is a library, these extension points are not pluggable to the Identity Server. Instead, the clients which use Charon for the SCIM implementations can develop own custom implementations using Charon.

### Charon — Implementations

This contains sample implementation of the SCIM service provider to illustrate how any SCIM implementation can utilize the API and the supporting module provided by Charon.

### Charon — Utils

This contains the default implementations of the extension points. For example, `DefaultCharonManager` is used to initialize the extension points while `InMemoryUserManager` is the default implementation of `UserManager`. Inside the `DefaultCharonManager` the `InMemoryUserManager` instance is created and used in the charon implementations.

### Charon — Samples
This contains samples illustrating the SCIM use cases. Samples mainly contain the SCIM client side implementations which can be run against a SCIM server, and hence can also be referenced to get to know how the API provided by Charon can be used to implement SCIM client side.

---

## Extensible SCIM user schemas

WSO2 Identity Server allows users to define their own user schema in addition to the core user schema. These configured schema are then used while creating or validating user objects. This means that custom user attributes can be passed using SCIM for identity management requirements. Follow the steps given below to add a custom attribute.

For information on Extending SCIM 2.0 User Schemas, see [here]({{base_path}}/references/extend/provisioning/extend-scim2-user-schemas/)

---

## cURL commands

Given below are the cURL commands to add a user. The attribute name for
the wso2Extension is **EnterpriseUser**.

-   **Primary Userstore Command**

``` java
curl -v -k --user admin:admin --data "{"schemas":[],"userName":"SureshAtt","password":"Wso2@123","EnterpriseUser":{"employeeNumber":"000111","costCenter":"111111","organization":"WSO2Org","division":"Engineering","department":"Intigration","manager":{"managerId":"111000","displayName":"Prabath"}}}" --header "Content-Type:application/json" https://localhost:9443/scim2/Users
```

-   **Secondary Userstore Command**

``` java
curl -v -k --user admin:admin --data "{"schemas":[],"userName":'mysql/kim',"password":"Wso2@123"}" --header "Content-Type:application/json" https://localhost:9443/scim2/Users
```

Note that the username is preceded by the domain and is within single
quotes 'mysql/kim'. Also note that 'mysql' here is a reference to a
domain name.

The above command provides the following results:

-   **Primary Userstore Output**

``` java
{"meta":{"created":"2021-03-24T08:52:13.309Z","location":"https://localhost:9443/scim2/Users/49656a04-99d9-4c45-a137-59d458abfd79","lastModified":"2021-03-24T08:52:13.309Z","resourceType":"User"},"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"roles":[{"type":"default","value":"Internal/everyone"},{"display":"everyone"}],"name":{"familyName":"SureshAtt"},"id":"49656a04-99d9-4c45-a137-59d458abfd79","userName":"SureshAtt"}
```

-   **Secondary Userstore Output**

``` java
{"id":"2e89cac0-17f3-40e7-8a07-ff1047a70cf1","schemas":["urn:scim:schemas:core:2.0"],"userName":"mysql/kim","meta":{"lastModified":"2021-03-24T14:31:30","location":"https://localhost:9443/wso2/scim2/Users/2e89cac0-17f3-40e7-8a07-ff1047a70cf1","created":"2021-03-24T14:31:30"}}'}}
```

!!! info "Related topics"
    See [SCIM 2.0 APIs]({{base_path}}/apis/scim2-rest-apis) for more cURL commands that can be used to do various functions using the SCIM endpoints available.



