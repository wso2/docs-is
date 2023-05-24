# Introduction to Multitenancy

The goal of multitenancy is to maximize resource sharing by allowing
multiple users (tenants) to log in and use a single server/cluster at
the same time, in a tenant-isolated manner. That is, each user is given
the experience of using his/her own server, rather than a shared
environment. Multitenancy ensures optimal performance of the system's
resources such as memory and hardware and also secures each tenant's
personal data.

You can register tenant domains using the Management Console of WSO2
Identity Server.

When multitenancy is enabled and a tenant becomes inactive for a long
period of time, the tenant is unloaded from the server's memory. By
default, the time period is 30 minutes. After that, the tenant has to
log in again before sending requests to the server.

You can change the default time period allowed for tenant inactiveness by
adding `-Dtenant.idle.time=<time_in_minutes>` java
property to the product's startup script (
`          ./wso2server.sh         ` file for Linux and
`          wso2server.bat         ` for Windows) as shown below:

  
``` java
JAVA_OPTS \
    -Dtenant.idle.time=30 \
```

---

## Architecture

The multi-tenant architecture of WSO2 Identity Server allows you to deploy web
applications, web services, mashups, etc. in an
environment that supports the following:

-   **Tenant isolation:** Each tenant has its own domain, which the
    other tenants cannot access.
-   **Data isolation:** Each tenant can manage its data securely in an
    isolated manner.
-   **Execution isolation:** Each tenant can carry out business
    processes and workflows independent of the other tenants. No action
    of a tenant is triggered or inhibited by another tenant.
-   **Performance isolation:** No tenant has an impact on the
    performance of another tenant.

A tenant is an isolated domain. The users within this domain can manage
their own data and perform their own transactions without being affected
by actions carried out in other domains.

These domains are allocated a server space from the complete server space
of a WSO2 Identity Server instance which is referred to as the **super tenant**.

The super tenant, as well as each individual tenant, have their own configurations and context modules. 

Each tenant has its own security domain. A domain has a set of users,
and permissions for those users to access resources. Thus, a tenant is
restricted by the users and permissions of the domain assigned to it.
The artifact repositories of the tenants are separated from each other.

![Tenant diagram]({{base_path}}/assets/img/concepts/tenant-diagram.png)

An individual tenant can carry out the following activities within the
boundaries of its own configuration and context module:

-   Deploying artifacts
-   Applying security
-   Managing users
-   Managing data
-   Throttling requests
-   Caching responses

<!-- WSO2 Carbon provides a number of Admin services which have special
privileges to manage the server. These admin services are deployed
in the super tenant. Other tenants can make use of these admin services
to manage their deployment. The admin services operate in a tenant aware
fashion. Thus, privileges and restrictions that apply to any client
using an admin service are taken into account. -->

---

## Tenant loading policy

Lazy loading is a design pattern used specifically in cloud deployments
to prolong the initialization of an object or artifact until it is
requested by a tenant or an internal process. You have the option of setting the
required tenant loading policy by enabling either **Lazy Loading** or
**Eager Loading** of tenants. Additionally, you can separately control
the loading policy for web applications and axis2 services deployed in
your tenants using the **GhostDeployment** setting.

See [Configure the Tenant Loading Policy]({{base_path}}/guides/tenants/configure-the-tenant-loading-policy) for more information.

---

## Restrictions

The following restrictions are imposed to ensure that each individual
tenant has the required level of isolation and maintains fine-grained
security control over its own services without affecting the other
tenants.

-   Only the super tenant can modify its own configuration. In addition,
    it can add, view, and delete tenants.
-   When a tenant logs in to the system, it can only access artifacts
    deployed under its own configuration. One tenant cannot manipulate
    the code of another tenant.
-   The super admin or tenant admin can add userstores to their own
    domain. Dynamic configurations are possible only for secondary userstores 
    and the primary userstore is not configurable at run time.
    This is because primary userstores are available for all tenants
    and allowing changes to the configuration at run time can lead to
    instability of the system. Therefore, the primary userstore is
    treated as a static property in the implementation and it should be
    configured prior to run time.
-   A tenant's code cannot invoke sensitive server side functionality.
    This is achieved via Java security.
-   Tenants share the transports provided by the system. They are not
    allowed to create their own transports.

---

## Request dispatching

This section describes how the multitenancy architecture described
above works in a request dispatching scenario.

When an identity server receives a request, the message is first received
by the handlers and dispatchers defined for the server configuration
(i.e. super tenant). The server configuration may include handlers that
implement cross tenant policies and Service Level Agreement (SLA)
management. For example, a priority based dispatcher can be applied at
this stage to offer differentiated qualities of service to different
clients. Once the relevant handlers and dispatchers are applied, the
request is sent to the tenant to which it is addressed. Then the message
dispatchers and handlers specific to that tenant will be applied.

The following example further illustrates how message dispatching is
carried out in a multi-tenant server.

For example, two tenants named `foo.com` and `bar.com` may deploy a service
named MyService. When this service is hosted on the two tenants, they
would have the following URLs.

`                   http://example.com/t/foo.com/services/MyService                 `  
`                   http://example.com/t/bar.com/services/MyService                 `

The name of the tenant in the URL allows the tenant to be identified
when the Identity Server receives a message which is addressed to a
specific client. Alternatively, you may configure a CNAME record in DNS
(Domain Name System) as an alias for this information.

If a request is addressed to the `         MyService        ` service
hosted by `         foo.com        `, the message handlers and
dispatchers of the super tenant will be applied and the tenant
`         foo.com        ` will be identified by the tenant name in the
URL. Then the request will be sent to `         foo.com        ` where
it will be processed.

---

## Scaling

The multitenancy architecture described above mainly refers to a
scenario where a single instance of an identity server acts as a single
multi-tenant node. In a situation where a very high load of requests is
handled, you may need multiple multi-tenant nodes. In order to operate
with multiple multi-tenant nodes, you need load balancing. The load
balancer you use also needs to be tenant-aware.

!!! info Related topics 
    - [Guide: Add New Tenants]({{base_path}}/guides/tenants/tenant-mgt/)
    - [Guide: Configure the Tenant Loading Policy]({{base_path}}/guides/tenants/configure-the-tenant-loading-policy/)
