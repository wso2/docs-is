This path builds on [Path B: Production (single region, HA)]({{base_path}}/complete-guides/deploy-ha/introduction/).
Ensure you have a working single-region cluster before proceeding.

**Per-region requirements (replicate for each region)**

- All prerequisites from [Path B]({{base_path}}/complete-guides/deploy-ha/prerequisites/)
- Network connectivity between regions
- Database replication technology appropriate for your RDBMS

**Cross-region network**

- Cross-region network connectivity (VPN, VPC peering, or cloud provider interconnect)
- DNS failover configuration (weighted routing, geolocation routing, or health-check-based failover)

**Data replication strategy**

Decide on a replication strategy before starting:

- Replicate all identity, configuration, and operational data across regions.
- Replicate only configuration data and partition identity data by region.
- Partition all data by region.

See [Understanding disaster recovery]({{base_path}}/deploy/disaster-recovery/understanding-disaster-recovery/) for guidance on choosing a strategy.
