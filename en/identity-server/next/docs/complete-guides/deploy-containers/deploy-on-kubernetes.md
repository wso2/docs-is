---
template: templates/deployment-guide.html
read_time: 30 mins
platform_label: Kubernetes
---

Deploy WSO2 Identity Server to a Kubernetes cluster. This step covers writing the Deployment and Service manifests, configuring the ConfigMap for `deployment.toml`, and exposing WSO2 Identity Server through an Ingress resource.

!!! note "Before this step"
    Configuration steps (hostname, TLS, keystores) are complete. Your `kubeconfig` is set to the target cluster and you have permission to create Deployments, Services, ConfigMaps, and Ingress resources.

{% include "../../../../../includes/deploy/deploy-is-on-kubernetes.md" %}

!!! tip "Verify"
    Run `kubectl get pods -n <namespace>` and confirm all WSO2 Identity Server pods reach `Running` status. Then open `https://<hostname>/console` and sign in with admin credentials.
