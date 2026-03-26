Use this path to explore WSO2 Identity Server features, build a proof of concept,
or familiarize yourself with the product before planning a production deployment.

## Overview

<table>
<tbody>
<tr>
<td><b>Who this path targets</b></td>
<td>Developers, architects, and technical evaluators exploring WSO2 Identity Server features for the first time.</td>
</tr>
<tr>
<td><b>What you will build</b></td>
<td>A single-node WSO2 Identity Server instance running with default or minimal configuration, suitable for feature exploration and proof-of-concept testing.</td>
</tr>
<tr>
<td><b>What this path excludes</b></td>
<td>High availability, clustering, production-grade security hardening, performance tuning, and disaster recovery.</td>
</tr>
<tr>
<td><b>Estimated duration</b></td>
<td>Under 1 hour.</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>WSO2 Identity Server starts and you can sign in to the Console at <code>https://localhost:9443/console</code>.</td>
</tr>
</tbody>
</table>

!!! warning "Not for production use"
    This path uses the embedded H2 database and default keystores. Do not use this configuration in production environments.

## Choose this path when

- You want to test WSO2 Identity Server features in a local environment.
- You need to build a proof of concept or demo.
- You want to familiarize yourself with the product before planning a production deployment.

## What this guide covers

This guide walks you through the minimum steps to get WSO2 Identity Server running on a single machine.

| Step | What you do |
|---|---|
| Install | Download and install WSO2 Identity Server |
| Start the server | Start the server and confirm it is running |

After completing this guide, explore [Path B]({{base_path}}/complete-guides/deploy-ha/introduction/) or [Path D]({{base_path}}/complete-guides/deploy-k8s/introduction/) to move to a production deployment.
