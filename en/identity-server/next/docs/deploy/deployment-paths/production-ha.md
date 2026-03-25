# Path B: Production (single region, high availability)

Use this path to deploy a resilient, production-grade WSO2 Identity Server cluster within a single data center or cloud region. This path covers the most common production scenario.

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
<td>Multi-region replication, disaster recovery, and container orchestration. For those requirements, see <a href="{{base_path}}/deploy/deployment-paths/production-dr">Path C</a> or <a href="{{base_path}}/deploy/deployment-paths/containers">Path D</a>.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 3 days, depending on environment readiness and organizational approval processes.</td>
</tr>
<tr>
<td><b>Pre-requisites</b></td>
<td>
<ul>
<li>Two or more machines meeting the <a href="{{base_path}}/deploy/get-started/install">system requirements</a> (at least 4 vCPUs, 4 GB RAM, 10 GB disk each)</li>
<li>An external RDBMS (PostgreSQL, MySQL, Oracle, MSSQL, or MariaDB)</li>
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

## Choose this path when

- You need a resilient, production-grade deployment within a single region.
- You require high availability with automatic failover between nodes.
- Your users access WSO2 Identity Server from a single geographic region.

## Key steps

1. [Install WSO2 Identity Server]({{base_path}}/deploy/get-started/install) on each node.
2. [Set up external databases]({{base_path}}/deploy/set-up-separate-databases-for-clustering) for identity, shared, and consent data.
3. [Change the hostname]({{base_path}}/deploy/change-the-hostname) to your production hostname.
4. [Configure TLS]({{base_path}}/deploy/security/configure-transport-level-security) for transport-level security.
5. [Separate keystores]({{base_path}}/deploy/security/keystores/) for signing, encryption, and TLS.
6. [Configure clustering and the membership scheme]({{base_path}}/deploy/deployment-guide#clustering-related-configurations) (WKA, AWS EC2).
7. [Front with a load balancer]({{base_path}}/deploy/front-with-the-nginx-load-balancer) and enable sticky sessions.
8. [Apply security hardening]({{base_path}}/deploy/security/security-guidelines/) at product, OS, and network levels.
9. Verify the deployment against the [deployment checklist]({{base_path}}/deploy/deployment-checklist).

## Next steps

- To add geographic redundancy and disaster recovery, continue to [Path C: Production (multi-region, DR)]({{base_path}}/deploy/deployment-paths/production-dr).
- Review [day-2 operations]({{base_path}}/deploy/choose-your-deployment-path#after-you-complete-a-path) for performance tuning, monitoring, and backup recommendations.
- Return to [Start here and choose your deployment path]({{base_path}}/deploy/choose-your-deployment-path) to compare all paths.
