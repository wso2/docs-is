# Clustering Overview

## Introduction to clustering

A cluster consists of multiple instances of a product that divide up the
work and act as a single instance. This improves **performance** as the
requests are distributed among several servers instead of just one. It
is also more **reliable** as there are other instances to handle requests
when one instance becomes unavailable. Following are several benefits of 
clustering.


-   **High availability** : Some systems require high availability
    percentages such as two-nines (99%). A server may go down due to many
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
in a production environment. Therefore, you need a cluster when you go into
production when performance and reliability are critical.

------------------------------------------------------------------------

## About membership schemes

A cluster should contain two or more instances of a product that are
configured to run within the same domain. To make an instance a member
of the cluster, configure it to either of the available membership
schemes, which are as follows:

-   Well Known Address (WKA) membership scheme
-   Multicast membership scheme
-   AWS membership scheme
-   AWS ECS membership scheme

All of these membership schemes are ready to be used in production. You
can select a scheme based on your production environment. Here's a comparison of
the membership schemes:

| Multicast                                                  | WKA                                                                                                                    | AWS/AWS ECS                                                        |
|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| All nodes should be in the same subnet                     | Nodes can be in different networks                                                                                     | Amazon EC2 nodes                                           |
| All nodes should be in the same multicast domain           | No multicasting requirement                                                                                            | No multicasting requirement                                |
| Multicasting should not be blocked                         | No multicasting requirement                                                                                            | No multicasting requirement                                |
| No fixed IP addresses or hosts required                    | At least one well-known IP address or host required                                                                    | No fixed IP addresses or hosts required                    |
| Failure of any member does not affect membership discovery | New members can join with some WKA nodes down, but not if all WKA nodes are down                                       | Failure of any member does not affect membership discovery |
| Does not work on IaaSs such as Amazon EC2                  | IaaS-friendly                                                                                                          | Works on Amazon EC2                                        |
| No WKA requirement                                         | Requires keepalive, elastic IPs, or some other mechanism for re-mapping IP addresses of WK members in cases of failure | No WKA requirement                                         |

!!! note
    Some production environments do not support multicast.
    However, if your environment supports multicast, there are no issues in
    using multicast as your membership scheme.

!!! info "About Well-Known Addresses (WKA)"
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

## Clustering compatibility with WSO2 products

WSO2 products are compatible with each other if they are based on the
same WSO2 Carbon version. See the [release
matrix](http://wso2.com/products/carbon/release-matrix/) for
compatibility information.

!!! info "About performance of WSO2 products in a cluster"
    If you are setting up multiple WSO2 products in a cluster, it is
    recommended to set up each product on a separate server. 

------------------------------------------------------------------------

## Deciding how to set up your cluster

!!! note
    If there are multiple WSO2 IS nodes in the deployment, it is mandatory to enable hazelcast clustering. If you need more 
    information on that, please refer to the explanation on [why Hazelcast is mandatory when there are multiple nodes](../../administer/configuring-hazelcast#why-is-it-mandatory-to-enable-hazelcast-when-there-are-multiple-nodes).

When setting up your cluster, you must decide how you want to
[set up separate databases for clustering](../../setup/setting-up-separate-databases-for-clustering/),
whether to front your cluster with a
[load balancer](../../administer/load-balancing), and whether to use
[sticky sessions](../../administer/sticky-sessions-with-manager-nodes).
WSO2 Identity Server uses
[Hazelcast](../../administer/configuring-hazelcast) as the underlying
clustering engine.
