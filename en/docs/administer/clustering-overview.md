# Clustering Overview

The following topics explain clustering basics:

-   [Introduction to
    clustering](#ClusteringOverview-Introductiontoclustering)
-   [About membership
    schemes](#ClusteringOverview-Aboutmembershipschemes)
-   [Clustering compatibility with WSO2
    products](#ClusteringOverview-ClusteringcompatibilitywithWSO2products)
-   [Deciding how to set up your
    cluster](#ClusteringOverview-Decidinghowtosetupyourcluster)

### Introduction to clustering

You can install multiple instances of WSO2 products in a *cluster* . A
cluster consists of multiple instances of a product that divide up the
work and act as a single instance. This improves **performance** as
requests are distributed among several servers instead of just one. It
is also more **reliabile** as one instance is there to handle requests
when another becomes unavailable. Clustering provides the following
benefits:

-   **High availability** : Some systems require high availability
    percentages like two-nines (99%). A server may go down due to many
    reasons such as system failures, planned outage, or hardware or
    network problems. Clustering for high availability results in fewer
    service interruptions. Since downtime is costly to any business,
    clustering has a direct and positive impact on costs.

-   **Simplified administration** : You can add and remove resources
    according to your size and time requirements. You can also launch
    compute jobs using simple APIs or management tools and automate
    workflows for maximum efficiency and scalability. Administration is
    simplified by using tools like the deployment synchronizer and log
    collector.

-   **Increased scalability** : Scalability is the ability of a system
    to accommodate a growing amount of work. Scalability is using
    resources more effectively. By distributing processing, we can make
    vertical or horizontal scalability possible.

-   **Failover and switchover capabilities** : Failover can occur
    automatically or manually. You can prepare a redundant backup system
    or use load-balanced servers to serve the failover function. You
    address failover through your system design and characteristics, and
    clustering helps you design your applications against interruptions
    and with improved recovery time. Even if a failover occurs, it is
    important to bring the system back up as quickly as possible.

-   **Low cost** : Clustering improves scalability and fault tolerance,
    so business continuity is guaranteed even in the case of node
    failure. Also, it facilitates automatically scaling up the system
    when there is a burst load, which means the business will not lose
    any unforeseen opportunities.

These characteristics are essential for enterprise applications deployed
in a production environment. You need a cluster when you go into
production as that is when good performance and reliability are
critical.

WSO2 provides [Hazelcast Community
Edition](http://www.hazelcast.com/products-community.jsp) as its default
clustering engine. For clustering on a secure channel (i.e., secure
Hazelcast), use Hazelcast Enterprise. To integrate with Hazelcast
Enterprise, there are provisions to provide license key under clustering
configurations. Advanced users can fine-tune Hazelcast by creating a
`         <PRODUCT_HOME>/repository/conf/hazelcast.properties        `
file and adding the relevant Hazelcast properties as described in the
[Hazelcast Advanced Configuration Properties
documentation](http://www.hazelcast.com/docs/2.0/manual/multi_html/ch13s10.html)
. If you use Hazelcast Enterprise Edition or Hazelcast Management
Center, see [the Hazelcast
documentation](http://docs.hazelcast.org/docs/2.0/manual/html/ch13s10.html)
for details on configuring those products and also [Advanced
Configurations and
Information](https://docs.wso2.com/display/CLUSTER44x/Additional+Configurations+and+Information)
for further details.

Add the following property to hazelcast.properties file to add the
license key of Hazelcast Enterprise:
`         hazelcast.enterprise.license.key        ` .

------------------------------------------------------------------------

### About membership schemes

A cluster should contain two or more instances of a product that are
configured to run within the same domain. To make an instance a member
of the cluster, configure it to either of the available membership
schemes, which are as follows:

-   Well Known Address (WKA) membership scheme
-   Multicast membership scheme
-   AWS membership scheme

All of these membership schemes are ready to be used in production. You
can select based on your production environment. Here's a comparison of
the membership schemes:

| Multicast                                                  | WKA                                                                                                                     | AWS                                                        |
|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| All nodes should be in the same subnet                     | Nodes can be in different networks                                                                                      | Amazon EC2 nodes                                           |
| All nodes should be in the same multicast domain           | No multicasting requirement                                                                                             | No multicasting requirement                                |
| Multicasting should not be blocked                         | No multicasting requirement                                                                                             | No multicasting requirement                                |
| No fixed IP addresses or hosts required                    | At least one well-known IP address or host required.                                                                    | No fixed IP addresses or hosts required                    |
| Failure of any member does not affect membership discovery | New members can join with some WKA nodes down, but not if all WKA nodes are down.                                       | Failure of any member does not affect membership discovery |
| Does not work on IaaSs such as Amazon EC2                  | IaaS-friendly                                                                                                           | Works on Amazon EC2                                        |
| No WKA requirement                                         | Requires keepalive, elastic IPs, or some other mechanism for re-mapping IP addresses of WK members in cases of failure. | No WKA requirement                                         |

Note that some production environments do not support multicast.
However, if your environment supports multicast, there are no issues in
using this as your membership scheme.

About Well-Known Addresses (WKA)

The Well-Known Addresses (WKA) feature is a mechanism that allows
cluster members to discover and join a cluster using unicast instead of
multicast. WKA is enabled by specifying a small subset of cluster
members (referred to as WKA members) that are able to start a
cluster. The WKA member starts the cluster and the other members join
the cluster through this WKA member. When the WKA member is down, the
cluster breaks, and the members cannot communicate with each other.

The system should have at least two well-known address (WKA) members in
order to work correctly and to recover if a single WKA member fails.

  

------------------------------------------------------------------------

### Clustering compatibility with WSO2 products

WSO2 products are compatible with each other if they are based on the
same WSO2 Carbon version. See the [release
matrix](http://wso2.com/products/carbon/release-matrix/) for
compatibility information.

About performance of WSO2 products in a cluster

If you are setting up multiple WSO2 products in a cluster, it is
recommended to set up each product on a separate server. For example,
WSO2 ESB is used for message mediation, so a considerable amount of
processing happens in the ESB. The DSS does data service hosting and has
a different architecture layer from the ESB. If you deploy both the ESB
and DSS in the same instance/runtime, it can negatively impact the
performance of both, and it also makes scaling difficult. However, you
can set up hybrid servers (installing selected DSS features on top of
the ESB and vice versa) using WSO2 products without the above
performance concerns.

  

------------------------------------------------------------------------

### Deciding how to set up your cluster

When setting up your cluster, you must decide how you want to set up and
[share your databases](../../administer/sharing-databases-in-a-cluster), whether to
front your cluster with a [load balancer](../../administer/load-balancing), and
whether to use [sticky sessions](../../administer/sticky-sessions-with-manager-nodes).
You also need to make a decision on whether to [separate the worker and
manager nodes](../../administer/security-guidelines-for-production-deployment) in the
cluster.
