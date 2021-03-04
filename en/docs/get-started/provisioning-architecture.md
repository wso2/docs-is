# Provisioning Architecture

The provisioning framework is responsible for all provisioning work done
by the WSO2 Identity Server. This framework integrates with the User
Store Manager component and also receives provisioning requests from the
authentication framework. 


### Inbound provisioning

Inbound provisioning focuses on how to provision users to the Identity
Server. Out-of-the-box, the Identity Server supports inbound
provisioning via a SOAP-based API as well as the SCIM 1.1 API. Both the
APIs support HTTP Basic Authentication. If you invoke the provisioning
API with Basic Authentication credentials, then where to provision the
user (to which user store) will be decided based on the inbound
provisioning configuration of the resident service provider.

The SCIM API also supports OAuth 2.0. If the user authenticates to the
SCIM API with OAuth credentials, then the system will load the
configuration corresponding to the service provider who owns the OAuth
client id. If you plan to invoke the SCIM API via a web application or a
mobile application, we would highly recommend you to use OAuth instead
of Basic Authentication. You simply need to register your application as
a service provider in Identity Server and then generate OAuth keys.

### JIT provisioning

Just-in-time provisioning talks about how to provision users to the
Identity Server at the time of federated authentication. A service
provider initiates the authentication request, the user gets redirected
to the Identity Server and then Identity Server redirects the user to an
external identity provider for authentication. Just-in-time provisioning
gets triggered in such a scenario when the Identity Server receives a
positive authentication response from the external identity provider.
The Identity Server will provision the user to its internal user store
with the user claims from the authentication response.

You configure JIT provisioning against an identity provider - not
against service providers. Whenever you associate an identity provider
with a service provider for outbound authentication, if the JIT
provisioning is enabled for that particular identity provider, then the
users from the external identity provider will be provisioned into the
Identity Server's internal user store. In the JIT provisioning
configuration you can also pick the provisioning user store.

### Outbound provisioning

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

### Conditional provisioning with roles

If you want to provision a user to an external identity provider, for
example to Salesforce or Google Apps, based on the user's role, then you
need to define one or more provisioning roles in the outbound
provisioning configuration of the corresponding identity provider.

### SCIM implementation using WSO2 Charon

WSO2 Charon is an open source implementation of SCIM protocol, which is
an open standard for Identity Provisioning. It can be used by anyone
who wants to add SCIM-based provisioning support for their
applications. WSO2 Charon is integrated with WSO2 Identity Server. This
page demonstrates the utilization of SCIM endpoints which expose User
and Group resources in a RESTful way.

The following is a high level overview of SCIM Service Provider
architecture of IS.

![scim-service-provider-architecture](../assets/img/getting-started/scim-service-provider-architecture.png)

WSO2 Charon is one of the SCIM implementations that are made available
under Apache 2.0 license. Charon includes libraries used by SCIM in the
WSO2 Identity Server.

The following diagram provides an overview of the module breakdown of
Charon along with purpose of each module and planned tasks of them.

![charon-module-breakdown](../assets/img/getting-started/charon-module-breakdown.png)

The following includes a brief introduction on each of the modules.

-   **Charon-Core** : This is the API that exposes an implementation of
    the SCIM specification. It can be used by any SCIM service provider
    or client implementation to support SCIM operations/functionalities.
    In addition to that, it also allows room for extension points to be
    plugged in according to the particular server side/client side
    implementation, such as authentication handler, user storage,
    encoders/decoders etc.
-   **Charon-Utils** : This contains a set of default implementations of
    the extension points mentioned above. For example: Basic Auth, OAuth
    handlers, LDAP based user storage etc. A particular implementation
    that uses charon-core as SCIM API can use these default
    implementations as building blocks.
-   **Charon-Deployment** (Note: this is renamed as Charon-Impl): A
    reference implementation of SCIM service provider is shipped with
    this module. Currently it is a Apache Wink based web app that can be
    deployed in any application server - such as Tomcat, and enables the
    SCIM endpoints to be exposed. This is based on the above two
    modules: charon-core and charon-utils, and illustrates how any SCIM
    implementation can utilize the API and supporting module provided by
    Charon.
-   **Charon-Samples** : This contains samples illustrating the SCIM use
    cases. Samples mainly contain the SCIM client side implementations
    which can be run against a SCIM server, and hence can also be
    referenced to get to know how the API provided by Charon can be used
    to implement SCIM client side.

#### Charon-Deployment

Charon-Deployment is the reference implementation of SCIM service
provider that is shipped with Charon. The following illustrates how any
concrete implementation of a SCIM service provider can make use of
Charon-Core (the SCIM API) with Charon-Utils (optional).

The SCIM service provider needs to be a RESTful web application. REST is
an architectural style of building networked applications. There are
several ways to implement REST style based applications - such as
Servlets and JAX-RS based frameworks. In the reference implementation of
Charon-SCIM service provider, the latter approach is selected since
JAX-RS hides underlying HTTP handling and binds the servlets nicely to
individual methods in the Java classes using annotations. Annotations
can also dynamically extract information from HTTP requests and map
application-generated exceptions to HTTP response codes.

Out of the JAX-RS implementations, Apache-Wink was selected since it
better catered to the requirements. The Charon-Impl module creates an
Apache-Wink based web application which can be deployed in an
application server like Tomcat and which acts as a SCIM service
provider.

The following is a deployment diagram of Charon-SCIM service provider
(the web application provided by Charon-Impl module). It also gives a
high level idea on how Charon-Core and Charon-Utils modules are
utilized.

![charon-scim-deployment](../assets/img/getting-started/charon-scim-deployment.png)

As this diagram of the reference implementation illustrates, a SCIM
service provider can be developed using any REST implementation and
SCIM-defined resources can be exposed utilizing the API provided by the
Charon-Core. On the other hand, SCIM Consumers can also be implemented
using the client API of Charon-Core.

### Extensible SCIM user schemas

The SCIM (System for Cross-Domain Identity Management) specification
defines a [fixed set of default
attributes](http://tools.ietf.org/html/draft-ietf-scim-core-schema-01#section-11.2)
for the user object. This set is defined to ensure the interoperability
and it can cater to most of the industry's identity management
requirements. Given below is a sample user object with the default
attributes set.

![user-object-with-default-attribute-set](../assets/img/getting-started/user-object-with-default-attribute-set.png)

However the SCIM specification itself introduces the [Enterprise User
Extension](http://tools.ietf.org/html/draft-ietf-scim-core-schema-01#section-11.3)
to support extra attributes for the SCIM user object.

![extra-attributes](../assets/img/getting-started/extra-attributes.png)

However the reality in the industry is that organizations have their own
attributes defined for the users. These attributes are already there in
their LDAP schemas. Therefore SCIM should be extensible enough to cope
with these custom attributes of the users.

WSO2 Identity Server allows users to define their own user schema in a
configuration file (
`         [IS-HOME]/repository/conf/scim-schema-extension.config        `
). Then these configured schema are used while creating, validating user
objects. With this the users can pass their custom attributes of users
over SCIM for Identity Management requirements. The implementation is
adhering to the [Schema Extension
Model](http://tools.ietf.org/html/draft-ietf-scim-core-schema-01#section-4)
. Given below is a sample extended user object with the default schema
configuration.

![default-schema-configuration](../assets/img/getting-started/default-schema-configuration.png)

### Claims Mapping

Log into the Identity Server and do the claim mapping for the following
claim URIs (see
[here](../../learn/configuring-active-directory-user-stores-for-inbound-provisioning)
for more information on how to do claim mappings).

-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.costCenter                             `
-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.department                   `
-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.division                   `
-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.employeeNumber                   `
-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.organization                   `
-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.manager.displayName                   `
-   `                     urn:scim:schemas:extension:wso2:1.0:wso2Extension.manager.managerId                   `

Now the server is up and running with the new extended user schema. The
claim mappings can map the SCIM user attributes to the LDAP user
attributes.

Create a new user with the new schema. The following screen depicts the
user to be added with the **wso2Extension** attributes.

![wso2-extension-attributes](../assets/img/getting-started/wso2-extension-attributes.png)

### cURL commands

Given below are the cURL commands to add a user. The attribute name for
the wso2Extension is **EnterpriseUser**.

-   **Primary Userstore Command**

``` java
curl -v -k --user admin:admin --data "{"schemas":[],"userName":"SureshAtt","password":"Wso2@123","EnterpriseUser":{"employeeNumber":"000111","costCenter":"111111","organization":"WSO2Org","division":"Engineering","department":"Intigration","manager":{"managerId":"111000","displayName":"Prabath"}}}" --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
```

-   **Secondary Userstore Command**

``` java
curl -v -k --user admin:admin --data "{"schemas":[],"userName":'mysql/uresh67',"password":"Wso2@123"}" --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users 
```

Note that the user name is preceded by the domain and is within single
quotes 'mysql/uresh67'. Also note that 'mysql' here is a reference to a
domain name.

The above command provides the following results:

-   **Primary Userstore Output**

``` java
{"id":"db4f9c15-8426-4381-a669-270975d50421","EnterpriseUser":{"organization":"WSO2Org","manager":{"managerId":"111000","displayName":"Prabath"},"division":"Engineering","department":"Intigration","costCenter":"111111","employeeNumber":"73"},"schemas":["urn:scim:schemas:core:1.0","urn:scim:schemas:extension:wso2:1.0"],"userName":"SureshAtt","meta":{"lastModified":"2013-07-09T13:27:58","location":"https://localhost:9443/wso2/scim/Users/db4f9c15-8426-4381-a669-270975d50421","created":"2013-07-09T13:27:58"}}
```

-   **Secondary Userstore Output**

``` java
{"id":"2e89cac0-17f3-40e7-8a07-ff1047a70cf1","schemas":["urn:scim:schemas:core:1.0"],"userName":"mysql/uresh67","meta":{"lastModified":"2013-12-17T14:31:30","location":"https://localhost:9443/wso2/scim/Users/2e89cac0-17f3-40e7-8a07-ff1047a70cf1","created":"2013-12-17T14:31:30"}}* Closing connection #0
```

The created SCIM user object can be viewed in the following screen:

![scim-user-object](../assets/img/getting-started/scim-user-object.png)

### Related links

-   See [SCIM 1.1 APIs](../../develop/scim-1.1-apis) for more cURL commands that can
    be used to do various functions using the SCIM endpoints available.



