# Network-Level Security Guidelines for Production Deployment

This section provides the list of network-level security guidelines that are recommended for your production environment.

## Failover setup

When WSO2 Identity Server is clustered, you need to regularly monitor the health of your server instances. For example, you need to monitor resource-level factors such as the server's resource utilization, response time anomalies, and the number of incoming network connections. Server monitoring will help you identify when additional server instances (failover instances) are required. You can also make decisions about network routing changes that you need to do in order to avoid server downtime.


!!! info

	-	For information on configuring failover, [Deployment and Clustering Key Concepts](../../administer/clustering-overview).

	-	For information on WSO2 Identity Server monitoring options, see [Monitoring WSO2 Identity Server](../../setup/monitoring-the-identity-server).


## Network-level logging

Make sure to maintain and monitor logs for your proxy servers, load balancers, and other network devices.


## Open ports and services

Periodically check for open ports using port scanning tools and make sure that only the necessary ports are open to both internal and external networks. Make sure that only the ports relevant to your WSO2 products are open for communication. If there are other ports started, be sure to monitor them.

!!! info

	For a full list of WSO2 Identity Server default ports, [Default Ports of WSO2 Identity Server](../../references/default-ports-of-wso2-products). 

## Device-level security 

All your network devices should be periodically checked for anomalies. For example, you need to verify routing tables and firewall rules. Also, make sure that the default credentials are changed before the first use of those devices.

## Firmware updates

Firmware updates for your network devices should be applied regularly.

## Contexts

Access to the `/services` and `/carbon` contexts should be blocked from the DMZ level, i.e., from the proxy server, load balancer, and/or firewall. 

-	The `/services` context is used in WSO2 Identity Server to expose admin services. These admin services are used for performing administrative operations using SOAP requests.

-	The `/carbon` context is used in WSO2 Identity Server to expose the Management Console. The Management Console is a user interface for performing some of the administrative operations of a product.

-	In addition to the `/services` and `/carbon` contexts, be sure to expose only the required applications in your product to users beyond the DMZ level in your network.

!!! tip

	It is recommended to use a whitelisting approach when allowing access to resources in your product from the DMZ level.





