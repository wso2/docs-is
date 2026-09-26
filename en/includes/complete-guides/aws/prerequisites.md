# Prerequisites

Before starting the deployment process, ensure that all the necessary access, tools, and configurations are in place. Meeting these requirements before you begin will help you avoid interruptions during the setup.

!!! warning "Testing Environment Only"
    This guide sets up a WSO2 Identity Server deployment for testing and evaluation purposes. Some configurations — such as permissive security group rules and self-signed SSL certificates — are not suitable for production use. Review all settings carefully before considering any production deployment.

---

## AWS Account Requirements

To provision and manage the AWS resources required in this guide, your account must meet the following requirements.

| Requirement | Details |
|-------------|---------|
| Active AWS account | Billing must be configured. Without active billing, resources such as EC2 instances, VPC components, and RDS cannot be provisioned. |
| IAM permissions | Your account must have permissions to create and manage EC2, VPC, security groups, RDS, and IAM roles. If you are unsure of your current permissions, consult your AWS administrator before proceeding. |
| Region selection | Choose the AWS region where you will deploy WSO2 Identity Server. Select a region close to your primary user base to minimize latency. Your region choice may also be influenced by compliance or data residency requirements. |

---

## Technical Knowledge

The following knowledge areas will help you follow this guide without interruption. If you are unfamiliar with any of these topics, the relevant sections of the guide include explanations.

| Area | Why It Is Needed |
|------|-----------------|
| AWS EC2 basics | You will launch, configure, and SSH into EC2 instances |
| VPC and networking concepts | You will create subnets, security groups, and route tables |
| Linux command line | All server-side setup is performed via SSH using shell commands |
| MySQL basics | You will create schemas, run SQL scripts, and manage database users |
| NGINX configuration | You will configure NGINX as a reverse proxy and load balancer |
| SSL/TLS concepts | You will generate and configure certificates for HTTPS communication |

---

## Software and Files

Before starting, ensure you have the following available on your local machine:

| Item | Notes |
|------|-------|
| WSO2 Identity Server distribution package | Download from the [WSO2 website](https://wso2.com/identity-server/). Use the version appropriate for your environment. |
| MySQL Connector/J | Download from the [MySQL Connector/J download page](https://dev.mysql.com/downloads/connector/j/). Select the version compatible with your MySQL RDS engine. |
| SSH client | Required to connect to EC2 instances. Linux and macOS include SSH natively. Windows users can use PuTTY or Windows Subsystem for Linux (WSL). |
| AWS CLI (optional) | Useful for scripting and automating AWS resource management. Not required for this guide. |

---

## Next Steps

Once all prerequisites are in place, proceed to the **Deployment Architecture** section to understand the components and network topology before starting the infrastructure setup.

!!! note
    The architecture section covers the VPC, subnets, security groups, EC2 nodes, RDS database, and NGINX proxy — and explains how they interact. Reviewing this section before starting the setup steps will give you a clearer picture of what you are building and why each component is needed.
