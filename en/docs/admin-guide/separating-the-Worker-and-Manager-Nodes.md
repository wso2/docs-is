# Separating the Worker and Manager Nodes

WSO2 Carbon version 4.0.0 onwards supports deployment models that
consist of 'worker' nodes and 'manager' nodes. A worker node serves
requests received by clients, whereas a manager node deploys and
configures artifacts (web applications, services, proxy services, etc.).

The worker/manager setup separates a WSO2 product's UI components,
management console, and related functionality with its internal
framework. Typically, the manager nodes are in read-write mode and
authorized to make configuration changes. The worker nodes are in
read-only mode and authorized only to deploy artifacts and read
configurations.

#### Why separate the worker and manager nodes

1.  **Improved security** : Manager nodes are typically behind a
    firewall that only allows admin access. They are exposed to clients
    running within the organization only, while worker nodes can be
    exposed to external clients.
2.  **Proper separation of concerns** : Management nodes specialize in
    the management of the setup while worker nodes specialize in serving
    requests to deployment artifacts. Only management nodes are
    authorized to add new artifacts into the system or make
    configuration changes.
3.  **Specific worker-node tasks** : Worker nodes can only deploy
    artifacts and read configuration. Worker nodes are limited only for
    specific tasks.
4.  **Lower memory requirements** : There is a lower memory footprint in
    the worker nodes because the OSGi bundles related to the management
    console and UI are not loaded to them. This is also good for memory
    utilization.

### Worker/Manager separated clustering patterns

Since all WSO2 products are built on the cluster-enabled Carbon
platform, you can cluster them in the same way depending on which
deployment pattern you use. The clustering pattern determines the
process of separating the worker and manager nodes. You can select one
of the following patterns based on your load and the target expenditure.

!!! note
    
    Configurations change depending on the clustering deployment pattern
    that you use.
    
    Although we use WSO2 API Manager (APIM) in the examples, the concepts
    apply equally to other WSO2 products as well.
    

#### Worker/Manager clustering deployment pattern 1

This pattern involves two worker nodes in a cluster. The worker is in
high-availability mode while the manager is not. This pattern is
suitable in situations where it is rare to deploy applications or modify
a running application and therefore, can run with only a single manager
node. However, you need multiple worker nodes to ensure that the
application runs continuously.

This mode is rarely used. The preferred mode is having two management
nodes in Active/Passive mode as in deployment pattern 2.

![](attachments/56984503/56984506.png){width="700"}

#### Worker/Manager clustering deployment pattern 2

This pattern has two manager nodes in one cluster and two worker nodes
in a separate cluster. The management node is in Active/Passive mode for
high availability. It is generally not recommended to put a manager node
in the Active/Active mode, but if you want high availability for your
data center and location-based services, it is useful.

This pattern is useful in scenarios where the application
deployment/modification might be frequent and therefore, need a cluster
of manager nodes. However, if the load is less, you can share a single
load balancer with the worker cluster.

![](attachments/56984503/56984505.png){width="700"}

  

#### Worker/Manager clustering deployment pattern 3

This pattern has two manager nodes in one sub-domain and two worker
nodes in a separate sub-domain. The manager and worker subdomains are
parts of a single WSO2 product cluster domain. Both subdomains use their
own load balancer while existing within the same cluster. Note that
multiple load balancers require you to follow several unique
configurations.

This pattern is similar to deployment pattern 2. However, the
application/modification load (or any other administrative load) might
be high, so there is a dedicated load balancer for the manager cluster
to prevent this load from affecting the load of the worker cluster.

![](attachments/56984503/56984504.png){width="700"}
