# Choose your deployment path

This page helps you select the right deployment path for WSO2 Identity Server based on your goals, environment, and operational requirements. Each path provides a focused, step-by-step sequence from prerequisites to a verified, running deployment.

## Before you begin

Before you select a deployment path, gather the following information:

- **Deployment goal** — Are you evaluating WSO2 Identity Server, or preparing for production use?
- **Availability requirements** — Do you need high availability (HA), disaster recovery (DR), or a single-node setup?
- **Platform preference** — Will you deploy on virtual machines, bare metal, or a container platform such as Kubernetes or OpenShift?
- **Expected user base** — How many concurrent users and transactions per second (TPS) do you expect?
- **Infrastructure inputs** — Do you have your database, user store, hostnames, TLS certificates, and load balancer details ready?

## Deployment paths

WSO2 Identity Server supports four deployment paths. Each path targets a specific use case and guides you through only the steps relevant to that scenario.

### Path A: Evaluation (single node)

A single-node WSO2 Identity Server instance with default configuration, suitable for feature exploration and proof-of-concept testing. Set up takes under 1 hour.

[Get started with Path A]({{base_path}}/deploy/deployment-paths/evaluation){ .md-button }

---

### Path B: Production (single region, high availability)

A two-node (or more) clustered deployment fronted by a load balancer, connected to an external database and user store, with TLS and security hardening applied. This path covers the most common production scenario.

[Get started with Path B]({{base_path}}/deploy/deployment-paths/production-ha){ .md-button }

---

### Path C: Production (multi-region, disaster recovery)

A multi-region deployment with data replication, regional failover, and disaster recovery capabilities. Builds on Path B.

[Get started with Path C]({{base_path}}/deploy/deployment-paths/production-dr){ .md-button }

---

### Path D: Container platforms (Kubernetes and OpenShift)

A containerized, orchestrated deployment on Kubernetes or OpenShift with automated scaling, rolling updates, and declarative configuration management..

[Get started with Path D]({{base_path}}/deploy/deployment-paths/containers){ .md-button }

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
| **Typical audience** | Developers, evaluators | Platform engineers, infrastructure architects, DevOps teams | Platform engineers, infrastructure architects, DevOps teams | Platform engineers, infrastructure architects, DevOps teams |

## After you complete a path

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
