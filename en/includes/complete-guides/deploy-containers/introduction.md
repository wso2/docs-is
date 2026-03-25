Use this path to deploy WSO2 Identity Server on Kubernetes or OpenShift with
platform-native orchestration, automated scaling, and declarative configuration management.

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
<td>Virtual machine or bare-metal deployment details. For those, see <a href="{{base_path}}/complete-guides/deploy-ha/introduction/">Path B</a> or <a href="{{base_path}}/complete-guides/deploy-dr/introduction/">Path C</a>.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>1 to 3 days, depending on cluster readiness and familiarity with Kubernetes or OpenShift.</td>
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

## What this guide covers

This guide covers TLS and hostname configuration shared with VM-based deployments, then the Kubernetes- and OpenShift-specific deployment steps.

| Step | What you do |
|---|---|
| Change the hostname | Set the production hostname for your ingress |
| Configure TLS | Configure TLS certificates for the deployment |
| Configure keystores | Configure keystores for signing and encryption |
| Deploy on Kubernetes | Deploy WSO2 Identity Server using Kubernetes manifests |
| Deploy on OpenShift | Deploy WSO2 Identity Server on OpenShift with SCC configuration |
| Apply security hardening | Apply security guidelines |
| Verify the deployment | Validate the deployment |
