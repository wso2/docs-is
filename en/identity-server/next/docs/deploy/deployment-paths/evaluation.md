# Path A: Evaluation (single node)

Use this path to explore WSO2 Identity Server features, build a proof of concept, or familiarize yourself with the product before planning a production deployment.

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
<td><b>Pre-requisites</b></td>
<td>
<ul>
<li>A machine that meets the <a href="{{base_path}}/deploy/get-started/install">system requirements</a></li>
<li>Java Development Kit (JDK) 11, 17, or 21</li>
</ul>
</td>
</tr>
<tr>
<td><b>Exit criteria</b></td>
<td>WSO2 Identity Server starts, and you can sign in to the Console at <code>https://localhost:9443/console</code>.</td>
</tr>
</tbody>
</table>

!!! warning "Not for production use"
    The evaluation path uses the embedded H2 database and default keystores. Do not use this configuration in production environments.

## Choose this path when

- You want to test WSO2 Identity Server features in a local environment.
- You need to build a proof of concept or demo.
- You want to familiarize yourself with the product before planning a production deployment.

## Key steps

1. [Install WSO2 Identity Server]({{base_path}}/deploy/get-started/install) on your machine.
2. [Start WSO2 Identity Server]({{base_path}}/deploy/get-started/run-the-product) and verify the Console loads.

## Next steps

- After evaluating the product, move to [Path B: Production (single region, HA)]({{base_path}}/deploy/deployment-paths/production-ha) or [Path D: Container platforms]({{base_path}}/deploy/deployment-paths/containers) for production deployment.
- Return to [Start here and choose your deployment path]({{base_path}}/deploy/choose-your-deployment-path) to compare all paths.
