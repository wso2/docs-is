# Choose your deployment path

This page helps you select the right deployment path for WSO2 Identity Server based on your goals, environment, and operational requirements. Each path provides a focused, step-by-step sequence from prerequisites to a verified, running deployment.

## Before you begin

Before you select a deployment path, gather the following information:

- **Deployment goal** - Are you evaluating WSO2 Identity Server, or preparing for production use?
- **Availability requirements** - Do you need high availability (HA), disaster recovery (DR), or a single-node setup?
- **Platform preference** - Will you deploy on virtual machines, bare metal, or a container platform such as Kubernetes or OpenShift?
- **Expected user base** - How many concurrent users and transactions per second (TPS) do you expect?
- **Infrastructure inputs** - Do you have your database, user store, hostnames, TLS certificates, and load balancer details ready?

## Deployment paths

WSO2 Identity Server supports four deployment paths. Each path targets a specific use case and guides you through only the steps relevant to that scenario.

<div class="deploy-paths-grid">

  <div class="md-card deploy-path-card">
    <span class="deploy-path-label">Path A</span>
    <h3>Evaluation (single node)</h3>
    <p>A single-node deployment with default configuration. Explore features, run proof-of-concept tests, and build product familiarity before committing to a production topology.</p>
    <ul class="deploy-path-specs">
      <li><strong>Nodes</strong> - 1</li>
      <li><strong>Database</strong> - Embedded H2 (bundled)</li>
      <li><strong>High availability</strong> - No</li>
      <li><strong>Setup time</strong> - Under 1 hour</li>
    </ul>
    <a href="{{base_path}}/complete-guides/deploy-eval/introduction/" class="md-button md-button--primary">Start Path A</a>
  </div>

  <div class="md-card deploy-path-card">
    <span class="deploy-path-label">Path B</span>
    <h3>Production (single region, HA)</h3>
    <p>A two-node (or more) clustered deployment fronted by a load balancer. Connects to an external database and user store, with TLS and full security hardening applied. The most common production topology.</p>
    <ul class="deploy-path-specs">
      <li><strong>Nodes</strong> - 2+</li>
      <li><strong>Database</strong> - External RDBMS</li>
      <li><strong>High availability</strong> - Yes</li>
      <li><strong>Setup time</strong> - 1–3 days</li>
    </ul>
    <a href="{{base_path}}/complete-guides/deploy-ha/introduction/" class="md-button md-button--primary">Start Path B</a>
  </div>

  <div class="md-card deploy-path-card">
    <span class="deploy-path-label">Path C</span>
    <h3>Production (multi-region, DR)</h3>
    <p>A multi-region deployment with cross-region database replication, regional failover, and disaster recovery capabilities. Builds on Path B and adds geographic redundancy.</p>
    <ul class="deploy-path-specs">
      <li><strong>Nodes</strong> - 2+ per region</li>
      <li><strong>Database</strong> - External RDBMS with replication</li>
      <li><strong>High availability</strong> - Yes, cross-region</li>
      <li><strong>Setup time</strong> - 3–7 days</li>
    </ul>
    <a href="{{base_path}}/complete-guides/deploy-dr/introduction/" class="md-button md-button--primary">Start Path C</a>
  </div>

  <div class="md-card deploy-path-card">
    <span class="deploy-path-label">Path D</span>
    <h3>Container platforms (Kubernetes and OpenShift)</h3>
    <p>A containerized, orchestrated deployment on Kubernetes or OpenShift with declarative configuration, automated scaling, rolling updates, and pod-level health management.</p>
    <ul class="deploy-path-specs">
      <li><strong>Nodes</strong> - 2+ pods</li>
      <li><strong>Database</strong> - External RDBMS</li>
      <li><strong>High availability</strong> - Yes (cluster-managed)</li>
      <li><strong>Setup time</strong> - 1–3 days</li>
    </ul>
    <a href="{{base_path}}/complete-guides/deploy-k8s/introduction/" class="md-button md-button--primary">Start Path D</a>
  </div>

</div>

## Compare deployment paths

Use the following table to compare paths at a glance.

| Criteria | Path A: Evaluation | Path B: Production HA | Path C: Multi-region DR | Path D: Containers |
| --- | --- | --- | --- | --- |
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

- [Performance tuning recommendations]({{base_path}}/deploy/performance/performance-tuning-recommendations) - Optimize JVM, OS, and database settings for your workload.
- [Backup and recovery recommendations]({{base_path}}/deploy/backup-and-recovery-recommendations) - Establish backup schedules for databases and file systems.
- [Monitor WSO2 Identity Server]({{base_path}}/deploy/monitor/) - Configure logging, health checks, and alerts.
- [Security guidelines]({{base_path}}/deploy/security/security-guidelines/) - Review and apply product, OS, and network security hardening.
- [Upgrade WSO2 Identity Server]({{base_path}}/deploy/upgrade/upgrade-wso2-is) - Apply updates and upgrade to newer versions.
- [Compliance]({{base_path}}/deploy/compliance/) - Meet GDPR, CCPA, FIPS, and FAPI requirements.
