WSO2 Identity Server is running on your Kubernetes or OpenShift cluster. Here are the recommended next steps:

**Day-2 operations**

- [Performance tuning recommendations]({{base_path}}/deploy/performance/performance-tuning-recommendations/) — Tune JVM settings in your pod spec and configure resource requests and limits.
- [Configure logging]({{base_path}}/deploy/monitor/monitor-logs/) — Forward container logs to your observability stack.
- [Monitor server health]({{base_path}}/deploy/monitor/monitor-server-health/) — Verify liveness and readiness probes are configured correctly.
- [Backup and recovery recommendations]({{base_path}}/deploy/backup-and-recovery-recommendations/) — Back up the external database and persistent volumes.

**Security and compliance**

- [Security guidelines]({{base_path}}/deploy/security/security-guidelines/) — Apply network policies, pod security standards, and image signing.
- [Compliance]({{base_path}}/deploy/compliance/) — Meet GDPR, CCPA, FIPS, and FAPI requirements.
- [Upgrade WSO2 Identity Server]({{base_path}}/deploy/upgrade/upgrade-wso2-is/) — Plan rolling upgrades using Kubernetes rolling update strategy.
