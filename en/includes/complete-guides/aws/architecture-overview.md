
# WSO2 Identity Server Deployment Architecture

This architecture overview explains how WSO2 Identity Server is deployed on AWS for the testing, detailing the components involved and the network flow between them.

![Deployment Architecture Diagram]({{base_path}}/assets/img/complete-guides/aws/image1.png){: width="800" style="display: block; margin: 0;"}

## High-Level Architecture Diagram

The diagram above illustrates the overall deployment setup of WSO2 Identity Server on AWS. It shows multiple WSO2 IS nodes running across EC2 instances, connected to a centralized MySQL RDS database. NGINX is configured as a reverse proxy and load balancer to distribute incoming traffic to the available IS nodes.

## Components Involved

The deployment architecture consists of several key components that work together to provide a secure, scalable, and highly available identity management solution.

### EC2 Instances

**EC2 Instances** host the WSO2 Identity Server nodes. Multiple instances provide redundancy to prevent service interruption if one instance fails, scalability to handle increased load, and geographical distribution across availability zones for better resilience.

### Virtual Private Cloud (VPC)

The **VPC** creates an isolated, secure network environment for all AWS resources in this deployment. Within this private network, you control IP addressing, subnet allocation, routing tables, and network gateways. Security groups and network ACLs protect your resources while VPN or Direct Connect options enable secure connectivity with on-premises infrastructure.

!!! info "Network Security"
    A properly configured VPC is the foundation of a secure deployment. Subnet isolation, security groups, and network ACLs work together to protect your Identity Server deployment from unauthorized access.

### WSO2 Identity Server (IS) Nodes

The **WSO2 Identity Server** is the core component of this architecture. Each node independently processes authentication requests, manages user identities, and enforces security policies. These nodes work together to provide comprehensive identity and access management services including:

* Authentication and authorization
* Identity federation with external providers
* Advanced authentication methods including MFA
* Policy-based access control

### MySQL RDS Database

The **MySQL RDS Database** functions as the central repository for all configuration, user, and session data. Using AWS's Relational Database Service (RDS) provides significant operational advantages:

**Data consistency**: All nodes access the same data store, ensuring users have consistent experiences regardless of which node handles their request.

**Managed service benefits**: AWS handles routine database maintenance tasks, including backups, patch management, and high availability configurations.

!!! note "Database Configuration"
    All WSO2 IS nodes must connect to the same database to maintain consistent state across the deployment. AWS RDS provides managed database services, reducing operational overhead.

### NGINX

**NGINX** serves as both a reverse proxy and load balancer in this architecture. It receives all incoming client requests and intelligently distributes them across the available WSO2 IS nodes. Beyond basic load balancing, NGINX handles SSL/TLS termination, implements request filtering for security purposes, and delivers high-performance HTTP handling.

### Domain & DNS Configuration

The domain and DNS setup creates a user-friendly entry point to your Identity Server deployment. This configuration maps your public domain name to the appropriate AWS resources, associates SSL/TLS certificates, and ensures users can access your services through familiar, branded URLs rather than AWS-specific endpoints.

### SSL/TLS Certificates

Secure communication is essential for any identity management system. SSL/TLS certificates establish encrypted connections between clients and your WSO2 Identity Server deployment. Beyond encryption, these certificates authenticate your service's identity to clients, preventing man-in-the-middle attacks and building trust with end-users and applications that rely on your identity services.

!!! warning "Detailed Implementation Guide"
    In the following sections of this guide, we will examine each of these components in depth, providing both theoretical understanding and practical deployment steps. You'll learn how to properly configure and integrate all of these elements to create a robust WSO2 Identity Server deployment on AWS.

## Network Flow Explanation

Understanding how traffic flows through this architecture helps in troubleshooting issues and optimizing performance. The diagram below represents the complete request-response cycle in this deployment:

### Request Processing

When a user or application attempts to access WSO2 Identity Server services, the request follows this path:

**Initial Access**: Users connect to your service through the configured domain name over HTTPS. The DNS system resolves this domain to your AWS infrastructure.

**Load Balancing**: NGINX receives the incoming request and selects an appropriate WSO2 IS node based on current load, availability, and configured balancing algorithms.

**Request Processing**: The selected WSO2 IS node authenticates the user, processes the requested operation, and prepares a response.

**Database Operations**: During processing, the node reads from or writes to the shared MySQL RDS database to access configuration data, user information, or session state.

### Response Path

Once processing is complete, the response travels back through the system:

**Node Response**: The WSO2 IS node completes the requested operation and generates a response.

**Return Through NGINX**: The response passes back through NGINX, which forwards it to the original client.

**Secure Delivery**: All communication remains encrypted throughout the process, protecting sensitive identity information.

!!! tip "Best Practice"
    Configure health checks on your load balancer to ensure traffic is only directed to healthy instances. This improves reliability by automatically routing around failed or degraded nodes.

!!! info "Alternative Load Balancer Options"
    While this guide focuses on NGINX as the load balancer, you can also use AWS Elastic Load Balancing (ELB) services:

    * **Application Load Balancer (ALB)**: Best for HTTP/HTTPS traffic with advanced routing capabilities
    * **Network Load Balancer (NLB)**: Ideal for ultra-high performance and static IP requirements
