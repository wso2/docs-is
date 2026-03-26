You have a multi-region WSO2 Identity Server deployment with disaster recovery capabilities. Here are the recommended next steps:

**Validate the failover**

- Run a failover drill: stop all nodes in your primary region and confirm that:
    - Traffic routes to the secondary region within your defined RTO.
    - Data loss is within your defined RPO.
    - Authentication flows continue to work after failover.

**Day-2 operations**

- [Performance tuning recommendations]({{base_path}}/deploy/performance/performance-tuning-recommendations/) — Optimize for multi-region latency.
- [Monitor server health]({{base_path}}/deploy/monitor/monitor-server-health/) — Set up cross-region health checks.
- [Backup and recovery recommendations]({{base_path}}/deploy/backup-and-recovery-recommendations/) — Establish per-region and cross-region backup schedules.

**Security and compliance**

- [Compliance]({{base_path}}/deploy/compliance/) — Meet GDPR and data residency requirements specific to your regions.
- [Upgrade WSO2 Identity Server]({{base_path}}/deploy/upgrade/upgrade-wso2-is/) — Plan rolling upgrades across regions.
