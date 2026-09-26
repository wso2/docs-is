# VPC and Network Security Configuration

A Virtual Private Cloud (VPC) forms the secure, isolated network boundary for your entire WSO2 Identity Server deployment on AWS. Every resource in this guide — EC2 instances, RDS databases, and the NGINX proxy — lives inside this VPC. Getting the network configuration right from the start ensures that your nodes can communicate internally while unwanted external traffic is blocked.

This section walks through creating the VPC, attaching an Internet Gateway, setting up security groups, and configuring route tables.

---

## Creating the VPC

Navigate to **AWS Management Console → Services → VPC → Create VPC** and configure the following:

| Field | Recommended Value | Notes |
|-------|-------------------|-------|
| Name tag | `WSO2-IS-VPC` | Use a name meaningful to your project or environment |
| IPv4 CIDR block | `10.0.0.0/16` | Provides up to 65,536 IP addresses |
| IPv6 CIDR block | *(leave blank)* | Not required for this setup |
| Tenancy | Default | Use Dedicated only if your compliance policy requires it |

---

## Setting Up the Internet Gateway (IGW)

An Internet Gateway allows resources in your public subnet — such as the NGINX proxy and WSO2 IS nodes — to communicate with the internet. Without it, your EC2 instances will have no outbound or inbound internet access.

**Automatic creation:** If you used the AWS VPC Wizard with the "VPC with Public and Private Subnets" option, the IGW is created and attached automatically.

**Manual creation:** If you created the VPC manually, follow these steps.

**Step 1 — Create the Internet Gateway**

Go to **VPC Dashboard → Internet Gateways → Create Internet Gateway**, assign a name such as `WSO2-IS-IGW`, then click **Create** followed by **Attach to VPC**.

**Step 2 — Add a route to the public route table**

Open the route table associated with your public subnet and add the following route:

| Destination | Target |
|-------------|--------|
| `0.0.0.0/0` | `WSO2-IS-IGW` |

---

## Configuring Security Groups

Security Groups act as virtual firewalls controlling inbound and outbound traffic for each resource. The table below defines the inbound rules required for the NGINX and WSO2 IS security group.

**Steps to create the Security Group:**

1. Go to **VPC → Security Groups → Create Security Group**.
2. Set the name (e.g., `wso2is-nginx-sg`) and a clear description.
3. Select `WSO2-IS-VPC` as the associated VPC.
4. Add the inbound rules from the table below.
5. Leave outbound rules as default (allow all).
6. Click **Create Security Group**.

### Inbound Rules

| Port | Protocol | Source | Purpose | Note |
|------|----------|--------|---------|------|
| `80` | HTTP | `0.0.0.0/0` | Public web traffic to NGINX | Testing only |
| `443` | HTTPS | `0.0.0.0/0` | Secure public access via SSL/TLS | Testing and Production |
| `22` | SSH | Your IP address | Administrative access to instances | Restrict to known IPs in production |
| `9443` | Custom TCP | `0.0.0.0/0` | WSO2 IS management console | Restrict to known IPs in production |
| `3306` | MySQL | EC2 private subnet CIDR | RDS database access from EC2 nodes | Never expose publicly |
| `9943` | Custom TCP | `0.0.0.0/0` | Additional WSO2 IS secure port | Restrict to known IPs in production |

### Outbound Rules

| Direction | Rule |
|-----------|------|
| Outbound | Allow all traffic (default) — enables NGINX to reach WSO2 IS backend nodes |

!!! warning "Production Security Notice"
    The inbound rules above use open source (`0.0.0.0/0`) for testing convenience only. Before moving to production:

    - Restrict SSH (port 22) to your office or VPN IP range.
    - Restrict port 9443 to known administrative IP addresses.
    - Restrict port 3306 to EC2 private subnet CIDRs only — never expose your database to the public internet.
    - Use private subnets and VPN or AWS PrivateLink for sensitive internal communication.

---

## Configuring Route Tables

Route tables define how traffic is directed between subnets and the internet within your VPC.

### Default Route Table Behavior

When a VPC is created, AWS automatically provisions a main route table with local routing only:

| Destination | Target | Purpose |
|-------------|--------|---------|
| `10.0.0.0/16` | `local` | Internal VPC communication between all subnets |

To enable internet access for public subnets, add a route to the Internet Gateway:

| Destination | Target | Purpose |
|-------------|--------|---------|
| `0.0.0.0/0` | `WSO2-IS-IGW` | Outbound internet access for public subnet resources |

!!! note
    Using the main route table for both public and private subnets is acceptable for testing. For production, create dedicated route tables per subnet type as described below.

### Creating a Dedicated Public Route Table

For a cleaner, production-ready setup, create a separate route table for your public subnets:

1. Go to **VPC Dashboard → Route Tables → Create Route Table**.
2. Configure the following:

    | Field | Value |
    |-------|-------|
    | Name tag | `wso2-public-rt` |
    | VPC | `WSO2-IS-VPC` |

3. Click **Create route table**.
4. Select the new route table, go to **Routes → Edit routes → Add route**:

    | Destination | Target |
    |-------------|--------|
    | `0.0.0.0/0` | `WSO2-IS-IGW` |

5. Click **Save changes**.
6. Go to **Subnet Associations → Edit subnet associations**, select your public subnet, and click **Save**.

### Route Table Reference

| Type | Recommended For | Internet Access Method |
|------|-----------------|------------------------|
| Main route table (auto-created) | Testing or simple single-subnet setups | Add IGW route manually |
| Custom public route table | Production — NGINX, WSO2 IS nodes | Via IGW |
| Custom private route table | Production — RDS and internal services | Via NAT Gateway only |
