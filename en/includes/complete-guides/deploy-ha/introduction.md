Use this path to deploy a resilient, production-grade WSO2 Identity Server cluster
within a single data center or cloud region. This path covers the most common production scenario.

## Overview

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Platform engineers, infrastructure architects, and DevOps teams deploying WSO2 Identity Server for production workloads in a single data center or cloud region.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A two-node (or more) clustered WSO2 Identity Server deployment fronted by a load balancer, connected to an external database and user store, with TLS and security hardening applied.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>Multi-region replication, disaster recovery, and container orchestration. For those requirements, see <a href="{{base_path}}/complete-guides/deploy-dr/introduction/">Path C</a> or <a href="{{base_path}}/complete-guides/deploy-k8s/introduction/">Path D</a>.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 3 days, depending on environment readiness and organizational approval processes.</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>Both nodes respond to health checks behind the load balancer, authentication flows complete successfully, and the deployment passes the <a href="{{base_path}}/deploy/deployment-checklist/">deployment checklist</a>.</td>
</tr>
</tbody>
</table>

## Choose this path when

- You need a resilient, production-grade deployment within a single region.
- You require high availability with automatic failover between nodes.
- Your users access WSO2 Identity Server from a single geographic region.

## What this guide covers

This guide walks you through each step from installation to a verified, production-ready cluster. Follow the steps in the order shown.

| Step | What you do |
|---|---|
| Install | Install WSO2 Identity Server on each node |
| Set up external databases | Configure the external RDBMS for identity, shared, and consent data |
| Change the hostname | Update the hostname to your production value |
| Configure TLS | Enable transport-level security with your certificates |
| Configure keystores | Separate keystores for signing, encryption, and TLS |
| Configure clustering | Set up Hazelcast clustering between nodes |
| Configure the load balancer | Front the cluster with NGINX or a cloud-native load balancer |
| Apply security hardening | Apply product, OS, and network security guidelines |
| Verify the deployment | Validate the deployment against the checklist |
