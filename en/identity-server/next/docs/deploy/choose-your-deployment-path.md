# Start here and choose your deployment path

This page helps you select the right deployment path for WSO2 Identity Server based on your goals, environment, and operational requirements. Each path provides a focused, step-by-step sequence from prerequisites to a verified, running deployment.

## Before you begin

Before you select a deployment path, gather the following information:

- **Deployment goal** — Are you evaluating WSO2 Identity Server, or preparing for production use?
- **Availability requirements** — Do you need high availability (HA), disaster recovery (DR), or a single-node setup?
- **Platform preference** — Will you deploy on virtual machines, bare metal, or a container platform such as Kubernetes or OpenShift?
- **Expected user base** — How many concurrent users and transactions per second (TPS) do you anticipate?
- **Infrastructure inputs** — Do you have your database, user store, hostnames, TLS certificates, and load balancer details ready?

## Deployment paths

WSO2 Identity Server supports four deployment paths. Each path targets a specific use case and guides you through only the steps relevant to that scenario.

### Path A: Evaluation (single node)

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Developers, architects, and technical evaluators exploring WSO2 Identity Server features for the first time.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A single-node WSO2 Identity Server instance running with default or minimal configuration, suitable for feature exploration and proof-of-concept testing.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>High availability, clustering, production-grade security hardening, performance tuning, and disaster recovery.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>Under 1 hour.</td>
</tr>
<tr>
<td><b>Required inputs</b></td>
<td>
<ul>
<li>A machine that meets the <a href="{{base_path}}/deploy/get-started/install">minimum system requirements</a></li>
<li>Java Development Kit (JDK) 11, 17, or 21</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>WSO2 Identity Server starts, and you can sign in to the Console at <code>https://localhost:9443/console</code>.</td>
</tr>
</tbody>
</table>

**Choose this path when** you want to test features, build a proof of concept, or familiarize yourself with the product before planning a production deployment.

!!! warning "Not for production use"
    The evaluation path uses the embedded H2 database and default keystores. Do not use this configuration in production environments.

**Start with:** [Install WSO2 Identity Server]({{base_path}}/deploy/get-started/install)

---

### Path B: Production (single region, high availability)

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Platform engineers, system administrators, and DevOps teams deploying WSO2 Identity Server for production workloads in a single data center or cloud region.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A two-node (or more) clustered WSO2 Identity Server deployment fronted by a load balancer, connected to an external database and user store, with TLS and security hardening applied.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>Multi-region replication, disaster recovery, and container orchestration. For those requirements, see Path C or Path D.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 3 days, depending on environment readiness and organizational approval processes.</td>
</tr>
<tr>
<td><b>Required inputs</b></td>
<td>
<ul>
<li>Two or more machines meeting the <a href="{{base_path}}/deploy/get-started/install">system requirements</a> (minimum 4 vCPUs, 4 GB RAM, 10 GB disk each)</li>
<li>An external RDBMS (PostgreSQL, MySQL, Oracle, MSSQL, or MariaDB)</li>
<li>A user store (JDBC-based or LDAP/Active Directory)</li>
<li>A load balancer (for example, NGINX or a cloud-native load balancer)</li>
<li>TLS certificates for the deployment hostname</li>
<li>The production hostname and DNS records</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>Both nodes respond to health checks behind the load balancer, authentication flows complete successfully, and the deployment passes the <a href="{{base_path}}/deploy/deployment-checklist">deployment checklist</a>.</td>
</tr>
</tbody>
</table>

**Choose this path when** you need a resilient, production-grade deployment within a single region. This path covers the most common production scenario.

**Key steps in this path:**

1. [Install WSO2 Identity Server]({{base_path}}/deploy/get-started/install) on each node.
2. [Set up external databases]({{base_path}}/deploy/set-up-separate-databases-for-clustering) for identity, shared, and consent data.
3. [Change the hostname]({{base_path}}/deploy/change-the-hostname) to your production hostname.
4. [Configure TLS]({{base_path}}/deploy/security/configure-transport-level-security) for transport-level security.
5. [Separate keystores]({{base_path}}/deploy/security/keystores/) for signing, encryption, and TLS.
6. [Configure clustering and the membership scheme]({{base_path}}/deploy/deployment-guide) (WKA, AWS, or Kubernetes).
7. [Front with a load balancer]({{base_path}}/deploy/front-with-the-nginx-load-balancer) and enable sticky sessions.
8. [Apply security hardening]({{base_path}}/deploy/security/security-guidelines/) at product, OS, and network levels.
9. Verify the deployment against the [deployment checklist]({{base_path}}/deploy/deployment-checklist).

---

### Path C: Production (multi-region, disaster recovery)

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Platform engineers and infrastructure architects who require cross-region redundancy, low-latency access for geographically distributed users, or regulatory compliance for data residency.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A multi-region WSO2 Identity Server deployment with data replication, regional failover, and disaster recovery capabilities.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>Single-region HA details (complete Path B first). Container orchestration specifics (see Path D for Kubernetes or OpenShift).</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 2 weeks, depending on the number of regions, data replication strategy, and network configuration.</td>
</tr>
<tr>
<td><b>Required inputs</b></td>
<td>
<ul>
<li>All inputs from Path B, replicated per region</li>
<li>A data replication strategy (identity and configuration data, or partitioned by region)</li>
<li>Cross-region network connectivity and DNS failover configuration</li>
<li>Database replication technology (database-vendor-specific)</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>Each region operates independently during normal conditions. Failover to a secondary region completes within the defined Recovery Time Objective (RTO). Data consistency meets the defined Recovery Point Objective (RPO).</td>
</tr>
</tbody>
</table>

**Choose this path when** your deployment must survive an entire region failure, your users span multiple geographies and need low-latency access, or regulations require data residency within specific boundaries.

!!! note "Complete Path B first"
    Multi-region deployments build on single-region HA. Establish a working single-region cluster before adding cross-region replication and failover.

**Key resources for this path:**

- [Understanding disaster recovery]({{base_path}}/deploy/disaster-recovery/understanding-disaster-recovery)
- [Disaster recovery deployment patterns]({{base_path}}/deploy/disaster-recovery/disaster-recovery-deployment-patterns)
- [Additional reading on disaster recovery]({{base_path}}/deploy/disaster-recovery/additional-reading-on-disaster-recovery)

**Data replication considerations:**

WSO2 Identity Server data falls into three categories:

- **Identity and entitlement data** — usernames, passwords, attributes, roles, and role assignments.
- **Configuration data** — service providers, identity providers, and policies.
- **Operational data** — sessions, OAuth2 tokens, and logs.

Choose your replication strategy based on whether you need to synchronize all data across regions, synchronize only configuration while partitioning identity data by region, or partition all data by region.

---

### Path D: Container platforms (Kubernetes and OpenShift)

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>DevOps and platform engineering teams deploying WSO2 Identity Server on Kubernetes or OpenShift.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A containerized, orchestrated WSO2 Identity Server deployment with automated scaling, rolling updates, and platform-native service discovery.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>Virtual machine or bare-metal deployment details. For those, see Path B or Path C.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 3 days, depending on cluster readiness and familiarity with Kubernetes or OpenShift.</td>
</tr>
<tr>
<td><b>Required inputs</b></td>
<td>
<ul>
<li>A running Kubernetes (1.20+) or OpenShift (4.x+) cluster</li>
<li>An external RDBMS accessible from the cluster</li>
<li>A user store (JDBC-based or LDAP/Active Directory)</li>
<li>Container registry access for WSO2 Identity Server images</li>
<li>An ingress controller or route configuration for external access</li>
<li>TLS certificates for the deployment hostname</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>WSO2 Identity Server pods run and pass readiness and liveness probes. Authentication flows complete through the ingress endpoint. Rolling updates apply without service interruption.</td>
</tr>
</tbody>
</table>

**Choose this path when** your organization standardizes on Kubernetes or OpenShift and you want platform-native orchestration, automated scaling, and declarative configuration management.

**Key resources for this path:**

- [Deploy on Kubernetes]({{base_path}}/deploy/deploy-is-on-kubernetes)
- [Deploy on OpenShift]({{base_path}}/deploy/deploy-is-on-openshift)
- [Kubernetes membership scheme]({{base_path}}/deploy/deployment-guide) (clustering configuration)

---

## Compare deployment paths

Use the following table to compare paths at a glance.

| Criteria | Path A: Evaluation | Path B: Production HA | Path C: Multi-region DR | Path D: Containers |
|---|---|---|---|---|
| **Nodes** | 1 | 2+ | 2+ per region | 2+ pods |
| **Database** | Embedded H2 | External RDBMS | External RDBMS per region | External RDBMS |
| **Load balancer** | Not required | Required | Required per region | Ingress controller |
| **High availability** | No | Yes | Yes | Yes |
| **Disaster recovery** | No | No | Yes | Depends on cluster setup |
| **Clustering** | No | Yes (WKA, AWS, or Kubernetes scheme) | Yes | Yes (Kubernetes scheme) |
| **Security hardening** | Default | Full hardening | Full hardening | Full hardening |
| **Typical audience** | Developers, evaluators | Platform engineers | Infrastructure architects | DevOps teams |

## After you choose a path

Once you select a path and complete the deployment, refer to these resources for ongoing operations:

- [Performance tuning recommendations]({{base_path}}/deploy/performance/performance-tuning-recommendations) — Optimize JVM, OS, and database settings for your workload.
- [Backup and recovery recommendations]({{base_path}}/deploy/backup-and-recovery-recommendations) — Establish backup schedules for databases and file systems.
- [Monitor WSO2 Identity Server]({{base_path}}/deploy/monitor/) — Configure logging, health checks, and alerts.
- [Security guidelines]({{base_path}}/deploy/security/security-guidelines/) — Review and apply product, OS, and network security hardening.
- [Upgrade WSO2 Identity Server]({{base_path}}/deploy/upgrade/upgrade-wso2-is) — Apply updates and upgrade to newer versions.
- [Compliance]({{base_path}}/deploy/compliance/) — Meet GDPR, CCPA, FIPS, and FAPI requirements.

## Next steps

Select the deployment path that matches your requirements and follow the linked guides. If you need help deciding, consider the following:

- **Starting fresh?** Begin with **Path A** to explore the product, then move to **Path B** or **Path D** for production.
- **Going to production on virtual machines?** Start with **Path B** directly.
- **Need geographic redundancy?** Complete **Path B** first, then extend with **Path C**.
- **Running Kubernetes or OpenShift?** Go directly to **Path D**.
