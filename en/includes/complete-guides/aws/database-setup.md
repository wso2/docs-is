# Database Setup

WSO2 Identity Server requires a centralized relational database to store user data, identity configurations, session information, and consent records. In this deployment, both WSO2 IS nodes connect to a single shared Amazon RDS instance, which ensures data consistency across the cluster and removes the need to manage a self-hosted database server.

This section covers creating and configuring the RDS instance that both nodes will use.

---

## Overview

| Component | Value |
|-----------|-------|
| Database engine | MySQL 8.0 or compatible |
| Deployment type | AWS RDS (Relational Database Service) |
| Access scope | Restricted to EC2 instances within the VPC |
| Availability | Single-AZ (Multi-AZ can be enabled later for production) |

---

## Create the RDS Instance

1. Open **AWS Management Console → Services → RDS → Databases**.
2. Click **Create database**.
3. Select **Standard Create**.
4. Choose **MySQL** as the database engine.

---

## Availability and Durability

For this setup, select **Single-AZ DB instance**.

Single-AZ is appropriate for initial deployments and testing. If your environment requires zero-downtime failover, Multi-AZ can be enabled later without recreating the instance.

---

## Instance Settings

| Field | Recommended Value | Notes |
|-------|-------------------|-------|
| DB instance identifier | `wso2isdb` | Use a name meaningful to your project |
| Master username | `wso2user` | Choose a secure, non-default username |
| Master password | *(strong password)* | Store this securely — it cannot be retrieved later |

!!! warning
    Record the master username and password before proceeding. These credentials are required when configuring WSO2 IS to connect to the database. They cannot be retrieved from the AWS console after creation.

---

## Instance Class

| Setting | Recommended Value | Specifications |
|---------|-------------------|----------------|
| Instance class | `db.m7g.large` | 2 vCPUs, 8 GB RAM |

This class provides sufficient performance for clustered WSO2 IS deployments. The instance class can be scaled up or down at any time through the RDS console without data loss.

---

## Storage Configuration

| Setting | Recommended Value | Notes |
|---------|-------------------|-------|
| Storage type | General Purpose SSD (`gp3`) | Balanced performance and cost |
| Allocated storage | `200 GB` | Can be expanded later as the deployment grows |

---

## Connectivity

| Setting | Value | Notes |
|---------|-------|-------|
| VPC | `WSO2-IS-VPC` | The VPC created in the network setup section |
| Subnets | Private subnets preferred | Keeps the database off the public internet |
| Public access | Disabled | The database should never be publicly accessible |
| VPC security group | Allow inbound `3306` from EC2 private subnet CIDR | Restricts database access to your IS nodes only |

!!! warning
    Never enable public access for your RDS instance. Database access must be restricted to EC2 instances within the VPC using security group rules on port `3306`.

---

## Database Authentication

Select **Password Authentication** as the authentication method. This is the standard and most straightforward option for connecting WSO2 IS to the database.

---

## Finalize and Create

Review all settings, then click **Create Database** at the bottom of the page.

Once creation is complete:

1. Navigate to **RDS → Databases → your instance**.
2. Note the following from the **Connectivity and Security** tab:

| Detail | Where to Find It |
|--------|-----------------|
| Endpoint (hostname) | Connectivity and Security tab |
| Port | Default: `3306` |
| Master username | Settings tab |

Store these values alongside your master password. You will need all three when configuring the `deployment.toml` file on both WSO2 IS nodes in the next section.
