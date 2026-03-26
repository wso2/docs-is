Regional failover routes user traffic from a failed primary region to a healthy
secondary region. Configure failover at the DNS layer so the switchover is transparent
to clients.

## DNS-based failover

Configure health-check-based DNS failover using your DNS provider:

- **AWS Route 53** — Use health checks with failover routing policies.
- **Azure Traffic Manager** — Use priority routing with endpoint health monitoring.
- **Cloudflare** — Use load balancing with health checks and failover pools.
- **NGINX / HAProxy** — Configure upstream health checks with a fallback upstream.

Point the health check at the WSO2 Identity Server health endpoint:

```
GET https://<region-hostname>/api/health-check/v1.0/health
```

A healthy response returns HTTP `200`. Configure your DNS failover to route traffic
away from a region when this endpoint returns non-`200` or times out.

## Shared session and token considerations

WSO2 Identity Server sessions and OAuth 2.0 tokens are stored in the database. If
you replicate operational data across regions, active sessions survive a failover
without requiring users to re-authenticate.

If you do not replicate sessions:

- Users with active sessions in the failed region must re-authenticate after failover.
- Configure your applications to handle `401` responses gracefully and redirect to the sign-in flow.

## Failover runbook

Maintain a documented runbook that covers:

1. Detecting region failure (alert thresholds and escalation path).
2. Confirming replication lag is within the defined RPO before failing over.
3. Promoting the secondary database replica to primary.
4. Updating any hardcoded regional endpoints in application configurations.
5. Validating authentication flows after failover completes.
6. Failing back to the primary region after it recovers.

See [Additional reading on disaster recovery]({{base_path}}/deploy/disaster-recovery/additional-reading-on-disaster-recovery/) for further reference.
