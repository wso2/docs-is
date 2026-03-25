Use this path to deploy WSO2 Identity Server across geographic regions with
cross-region redundancy, failover, and disaster recovery capabilities.

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
<td>Single-region HA details — complete <a href="{{base_path}}/complete-guides/deploy-ha/introduction/">Path B</a> first. Container orchestration specifics are covered in <a href="{{base_path}}/complete-guides/deploy-k8s/introduction/">Path D</a>.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 2 weeks, depending on the number of regions, data replication strategy, and network configuration.</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>Each region operates independently during normal conditions. Failover to a secondary region completes within the defined Recovery Time Objective (RTO). Data consistency meets the defined Recovery Point Objective (RPO).</td>
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
- **Operational data** — sessions, OAuth 2.0 tokens, and logs.

Your replication strategy depends on your requirements:

- Synchronize all data across regions.
- Synchronize only configuration data and partition identity data by region.
- Partition all data by region.

## What this guide covers

This guide extends the single-region HA deployment with data replication and regional failover.

| Step | What you do |
|---|---|
| Install | Install WSO2 Identity Server on nodes in each region |
| Set up external databases | Configure external RDBMS per region |
| Change the hostname | Update the hostname to your production value per region |
| Configure TLS | Configure transport-level security |
| Configure keystores | Configure keystores across regions |
| Configure clustering | Set up clustering for each region |
| Configure the load balancer | Front each regional cluster |
| Configure data replication | Set up cross-region database replication |
| Configure regional failover | Configure DNS failover and routing policies |
| Apply security hardening | Apply security guidelines across all regions |
| Verify the deployment | Validate the multi-region deployment |
