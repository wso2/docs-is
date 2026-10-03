# Deployment Architecture

This section explains how WSO2 Identity Server is structured for the testing deployment covered in this guide. It describes the components involved, the role each one plays, and how traffic flows between them.

!!! warning "Testing Environment Only"
    The architecture described in this section is designed for testing and evaluation. Key decisions — such as placing nodes in public subnets and using self-signed SSL certificates — prioritize accessibility during testing. These must be revisited and hardened for any production deployment.

---

## Architecture Diagram

![Deployment Architecture Diagram]({{base_path}}/assets/img/complete-guides/aws/image1.png){: width="800" style="display: block; margin: 0;"}

The diagram above shows the overall layout of the deployment. Multiple WSO2 IS nodes run on separate EC2 instances and connect to a shared MySQL RDS database. NGINX sits in front of the nodes, receiving all incoming traffic and distributing it across the available instances.

---

## Components

### EC2 Instances

EC2 instances host the WSO2 Identity Server nodes. Running two or more nodes provides the following benefits:

- **Redundancy** — if one instance becomes unavailable, the remaining nodes continue serving requests
- **Load distribution** — authentication and authorization workloads are spread across instances
- **Scalability** — additional nodes can be added to the cluster as demand grows

### Virtual Private Cloud (VPC)

The VPC creates an isolated, private network for all resources in this deployment. Within the VPC, you control IP addressing, subnet allocation, route tables, and internet access. Security groups attached to each resource restrict what traffic can reach them.

!!! note
    A well-configured VPC is the foundation of a secure deployment. Subnet isolation and security group rules work together to ensure that only intended traffic reaches your WSO2 IS nodes and database.

### WSO2 Identity Server Nodes

Each WSO2 IS node independently handles incoming authentication and authorization requests. The nodes share the same RDS database, which means they maintain consistent state — a user session created on one node is visible to all others. The nodes provide:

- Authentication and authorization processing
- Identity federation with external identity providers
- Multi-factor authentication (MFA) support
- Policy-based access control

### MySQL RDS Database

The MySQL RDS instance is the shared data store for all WSO2 IS nodes. All user data, session information, and identity configurations are stored here and accessed by every node in the cluster.

Using AWS RDS provides the following operational benefits:

| Benefit | Description |
|---------|-------------|
| Data consistency | All nodes read from and write to the same database, ensuring consistent state across the cluster |
| Automated backups | AWS handles scheduled backups and point-in-time recovery |
| Patch management | RDS applies database engine patches automatically during maintenance windows |
| Scalability | Instance class and storage can be upgraded without data loss |

!!! note
    All WSO2 IS nodes must connect to the same database instance. This shared connection is what makes clustering possible — configuration changes and user data are immediately available to all nodes.

### NGINX

NGINX acts as the reverse proxy and load balancer for this deployment. It is the single entry point for all incoming client traffic and is responsible for:

- Receiving HTTPS requests from clients
- Terminating SSL/TLS connections
- Distributing requests across the available WSO2 IS nodes
- Forwarding client IP information to the backend nodes via request headers

### Domain and DNS

A domain name maps to the NGINX instance's public IP address, giving clients a consistent, user-friendly URL to access the identity services. In this testing guide, the mapping is handled through a local hosts file entry rather than a DNS provider.

For a production deployment, this would be configured through Route 53 or your organization's DNS provider.

### SSL/TLS Certificates

SSL/TLS certificates encrypt all communication between clients and the WSO2 IS deployment. In this guide, a self-signed certificate is used for testing. Self-signed certificates provide encryption but are not trusted by browsers or clients by default, which is why a browser warning appears during testing.

For production, replace the self-signed certificate with one issued by a trusted Certificate Authority (CA) such as Let's Encrypt, AWS Certificate Manager, or your organization's internal CA.

---

## Network Flow

Understanding how a request travels through this architecture is useful for troubleshooting and performance tuning.

### Inbound Request Path

| Step | Description |
|------|-------------|
| 1. Client request | A user or application sends an HTTPS request to the configured domain name |
| 2. DNS resolution | The domain resolves to the public IP of the NGINX instance |
| 3. SSL termination | NGINX receives the request, terminates the SSL connection, and decrypts the traffic |
| 4. Load balancing | NGINX selects a WSO2 IS node from the upstream pool and forwards the request |
| 5. Request processing | The WSO2 IS node authenticates the user or processes the requested operation |
| 6. Database access | The node reads from or writes to the shared MySQL RDS database as needed |

### Outbound Response Path

| Step | Description |
|------|-------------|
| 7. Node response | The WSO2 IS node generates a response and sends it back to NGINX |
| 8. Return to client | NGINX forwards the response to the original client over the encrypted HTTPS connection |

!!! tip "Load Balancer Health Checks"
    Configure NGINX health checks to ensure traffic is only directed to nodes that are fully started and responsive. This prevents requests from being forwarded to a node that is still initializing or has become unavailable.

---

## Alternative Load Balancer Options

This guide uses NGINX as the load balancer. If your environment already uses AWS-native load balancing, the following options are compatible with WSO2 IS:

| Option | Best For |
|--------|----------|
| NGINX | Full control over proxy configuration, SSL termination, and custom routing rules |
| AWS Application Load Balancer (ALB) | HTTP/HTTPS traffic with path-based or host-based routing |
| AWS Network Load Balancer (NLB) | High-throughput workloads requiring static IPs or ultra-low latency |
