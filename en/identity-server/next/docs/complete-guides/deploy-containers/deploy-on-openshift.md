---
template: templates/complete-guide.html
read_time: 30 mins
---

Deploy WSO2 Identity Server to an OpenShift cluster. OpenShift applies stricter security policies than standard Kubernetes, including restricted pod security contexts and the requirement to use Routes instead of Ingress resources.

!!! note "Before this step"
    Configuration steps (hostname, TLS, keystores) are complete. You have `oc` CLI access to the target project with permission to create DeploymentConfigs or Deployments, Services, ConfigMaps, and Routes.

{% include "../../../../../includes/deploy/deploy-is-on-openshift.md" %}

!!! tip "Verify"
    Run `oc get pods -n <project>` and confirm all WSO2 Identity Server pods reach `Running` status. Open `https://<hostname>/console` and sign in with admin credentials.
