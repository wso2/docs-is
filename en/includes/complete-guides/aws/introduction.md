# Deploying WSO2 Identity Server on AWS

This guide is intended for individuals who want to deploy WSO2 Identity Server in a cloud environment for **testing and evaluation purposes**. It is not intended as a production deployment guide. The configurations and security settings used throughout this guide are optimized for getting a working environment up quickly, and several of them — such as open security group rules and self-signed SSL certificates — must be hardened before any production use.

Deploying a production-ready identity management solution requires careful infrastructure planning, proper security configuration, and thorough validation. This guide walks through each of those areas in sequence, covering AWS infrastructure setup, database configuration, WSO2 IS installation, and reverse proxy configuration using NGINX.

The deployment architecture used in this guide runs multiple WSO2 Identity Server nodes in a clustered configuration, connected to a shared managed MySQL RDS database. Authentication and authorization workloads are distributed across instances behind an NGINX load balancer, which ensures the system remains available even if a single node becomes unavailable.

!!! warning "Testing Environment Only"
    The configurations in this guide are designed for testing and evaluation purposes. Before using this deployment in production, you must review and harden all security settings, including security group rules, SSL certificates, database access policies, and admin credentials. Refer to the [WSO2 Identity Server documentation](https://is.docs.wso2.com) and the [AWS security best practices](https://docs.aws.amazon.com/security/) for production guidance.

## What You Will Learn

By following this guide, you will learn how to:

- Understand the prerequisites and planning considerations for a WSO2 IS deployment on AWS
- Design the infrastructure architecture for a clustered WSO2 Identity Server environment
- Configure an AWS Virtual Private Cloud (VPC) with appropriate subnets, routing, and security groups
- Launch and prepare EC2 instances to host WSO2 Identity Server nodes
- Configure an Amazon RDS MySQL instance as the shared database for the cluster
- Install WSO2 Identity Server and connect it to the RDS database
- Configure NGINX as a reverse proxy and load balancer in front of the WSO2 IS nodes
- Set up SSL/TLS certificates for encrypted communication
- Validate the deployment and troubleshoot common issues

!!! note "Estimated Time"
    This guide takes approximately 90 minutes to complete from start to finish, assuming all prerequisites are in place.
