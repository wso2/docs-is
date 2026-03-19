# Path D: Container platforms (Kubernetes and OpenShift)

Use this path to deploy WSO2 Identity Server on Kubernetes or OpenShift with platform-native orchestration, automated scaling, and declarative configuration management.

## Overview

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Platform engineers, infrastructure architects, and DevOps teams deploying WSO2 Identity Server on Kubernetes or OpenShift.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A containerized, orchestrated WSO2 Identity Server deployment with automated scaling, rolling updates, and platform-native service discovery.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>Virtual machine or bare-metal deployment details. For those, see <a href="{{base_path}}/deploy/deployment-paths/production-ha">Path B</a> or <a href="{{base_path}}/deploy/deployment-paths/production-dr">Path C</a>.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 3 days, depending on cluster readiness and familiarity with Kubernetes or OpenShift.</td>
</tr>
<tr>
<td><b>Pre-requisites</b></td>
<td>
<ul>
<li>A running Kubernetes (1.20+) or OpenShift (4.x+) cluster</li>
<li>An external RDBMS accessible from the cluster</li>
<li>A user store (JDBC-based or LDAP/Active Directory)</li>
<li>Container registry access for WSO2 Identity Server images</li>
<li>An ingress controller or route configuration for external access</li>
<li>TLS certificates for the deployment hostname</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>WSO2 Identity Server pods run and pass readiness and liveness probes. Authentication flows complete through the ingress endpoint. Rolling updates apply without service interruption.</td>
</tr>
</tbody>
</table>

## Choose this path when

- Your organization standardizes on Kubernetes or OpenShift.
- You want platform-native orchestration and automated scaling.
- You prefer declarative configuration management for your deployments.

## Key resources

- [Deploy on Kubernetes]({{base_path}}/deploy/deploy-is-on-kubernetes)
- [Deploy on OpenShift]({{base_path}}/deploy/deploy-is-on-openshift)
- [Kubernetes membership scheme]({{base_path}}/deploy/deployment-guide#clustering-related-configurations) (clustering configuration)

## Next steps

- Review [day-2 operations]({{base_path}}/deploy/choose-your-deployment-path#after-you-complete-a-path) for performance tuning, monitoring, and backup recommendations.
- Return to [Start here and choose your deployment path]({{base_path}}/deploy/choose-your-deployment-path) to compare all paths.
