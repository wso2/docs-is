# Path C: Production (multi-region, disaster recovery)

Use this path to deploy WSO2 Identity Server across geographic regions with cross-region redundancy, failover, and disaster recovery capabilities.

## Overview

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Platform engineers, infrastructure architects, and DevOps teams who require cross-region redundancy, low-latency access for geographically distributed users, or regulatory compliance for data residency.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A multi-region WSO2 Identity Server deployment with data replication, regional failover, and disaster recovery capabilities.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>Single-region HA details (complete <a href="{{base_path}}/deploy/deployment-paths/production-ha">Path B</a> first). Container orchestration specifics (see <a href="{{base_path}}/deploy/deployment-paths/containers">Path D</a> for Kubernetes or OpenShift).</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 2 weeks, depending on the number of regions, data replication strategy, and network configuration.</td>
</tr>
<tr>
<td><b>Pre-requisites</b></td>
<td>
<ul>
<li>All pre-requisites from Path B, replicated per region</li>
<li>A data replication strategy (identity and configuration data, or partitioned by region)</li>
<li>Cross-region network connectivity and DNS failover configuration</li>
<li>Database replication technology (database-vendor-specific)</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>Each region operates independently during normal conditions. Failover to a secondary region completes within the defined RTO. Data consistency meets the defined RPO.</td>
</tr>
</tbody>
</table>

!!! note "Complete Path B first"
    Multi-region deployments build on single-region HA. Establish a working single-region cluster before adding cross-region replication and failover.

## Choose this path when

- You need to survive an entire region failure.
- You serve geographically distributed users and require low-latency access.
- You must meet data residency regulations that require data to remain in specific regions.

## Data replication considerations

WSO2 Identity Server data falls into three categories:

- **Identity and entitlement data** — usernames, passwords, attributes, roles, and role assignments.
- **Configuration data** — service providers, identity providers, and policies.
- **Operational data** — sessions, OAuth2 tokens, and logs.

Your replication strategy depends on your requirements:

- Synchronize all data across regions.
- Synchronize only configuration data and partition identity data by region.
- Partition all data by region.

## Key resources

- [Understanding disaster recovery]({{base_path}}/deploy/disaster-recovery/understanding-disaster-recovery)
- [Disaster recovery deployment patterns]({{base_path}}/deploy/disaster-recovery/disaster-recovery-deployment-patterns)
- [Additional reading on disaster recovery]({{base_path}}/deploy/disaster-recovery/additional-reading-on-disaster-recovery)

## Next steps

- Review [day-2 operations]({{base_path}}/deploy/choose-your-deployment-path#after-you-complete-a-path) for performance tuning, monitoring, and backup recommendations.
- Return to [Start here and choose your deployment path]({{base_path}}/deploy/choose-your-deployment-path) to compare all paths.
