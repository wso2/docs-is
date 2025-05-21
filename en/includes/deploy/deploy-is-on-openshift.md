# Deploy {{product_name}} on OpenShift Using Helm

The Helm chart for the {{product_name}} is available [here](https://github.com/wso2/kubernetes-is){: target="_blank"}.

The {{product_name}} Helm Chart has been tested in the following environments:

<table>
	<th>Deployment</th>
	<th>Version</th>
	<tr>
		<td>OpenShift</td>
		<td>v4.18.x</td>
	</tr>
</table>

This guide walks you through deploying {{product_name}} as a containerized application on an OpenShift cluster using the official Helm chart. Helm simplifies the deployment by automating the configuration and management of OpenShift resources, simplifying setup and maintenance.

## Prerequisites

Before proceeding, ensure you have the following:

- The following tools installed on your system:
    - [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git){: target="_blank"}
    - [Helm](https://helm.sh/docs/intro/install/){: target="_blank"}
    - [Docker](https://docs.docker.com/engine/install/){: target="_blank"}
    - [OpenShift CLI (oc)](https://docs.redhat.com/en/documentation/openshift_container_platform/latest/html/cli_tools/openshift-cli-oc){: target="_blank"}

- A running OpenShift cluster. You may use:
    - [OpenShift Local](https://developers.redhat.com/products/openshift-local/getting-started){: target="_blank"}, or
    - An existing remote OpenShift cluster.

- [Optional] If you are not using OpenShift routes, deploy an [Ingress-NGINX Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift){: target="_blank"} on the cluster.

## Step 1: Set environment variables

Define environment variables for the OpenShift namespace and Helm release name.

```bash
export NAMESPACE=<your-namespace>
export RELEASE_NAME=<your-helm-release-name>
```

!!! note

    - Replace `<your-namespace>` with the desired OpenShift namespace for deploying {{product_name}}.
    - Replace `<your-helm-release-name>` with a unique name for your Helm release.

## Step 2: Create the OpenShift namespace

Ensure that the specified namespace exists or create a new one using the following command.

```bash
oc get namespace $NAMESPACE || oc create namespace $NAMESPACE
```

## Step 3: Build an OpenShift-compatible Docker image

OpenShift doesn't let containers run as the root user for security reasons. Instead, each time, it runs them as a random user that belongs to the root group (GID 0). Because of this, the default [WSO2 Identity Server Docker image](https://hub.docker.com/r/wso2/wso2is) might not work as expected as the random user may not have permission to access important files. To overcome this, you can use one of the following methods.

### Option 1: Create a custom Docker image
    
Create a custom Docker image that sets the group ownership of files and folders to the root group, and give that group the right permissions.

### Option 2: Use the official Docker image by altering settings

Instead of creating a custom Docker image, you can use the official image by adjusting some security settings:

- Disable seccomp during deployment by adding this Helm option:
```bash
--set deployment.securityContext.seccompProfile.enabled="false"
```
If you are setting this flag, you need to remove following configs from the Helm command:
```bash
--set deployment.securityContext.runAsUser.enabled="false" \
--set deployment.entrypoint.defaultMode=0457
```
- Grant anyuid permissions to the service account running the deployment with this OpenShift command:
```bash
oc adm policy add-scc-to-user anyuid -z <service-account> -n $NAMESPACE
```

## Step 4: Install the Helm Chart

The {{product_name}} Helm chart is available through the WSO2 Helm repository or source code.

### Option 1: Install from the Helm Repository

1. Add the WSO2 Helm repository and update:

    ```bash
    helm repo add wso2 https://helm.wso2.com
    helm repo update
    ```

2. Install the chart:

    ```bash
    helm install $RELEASE_NAME wso2/identity-server --version {{is_version}} \
      -n $NAMESPACE \
      --set deployment.image.registry="wso2" \
      --set deployment.image.repository="wso2is" \
      --set deployment.image.tag="{{is_version}}" \
      --set deployment.apparmor.enabled="false" \
      --set deployment.securityContext.runAsUser.enabled="false" \
      --set deployment.entrypoint.defaultMode=0457
    ```

    ??? note "Get the latest helm chart version"

        To find the latest version, you can use the [WSO2 Identity Server Artifact Hub](https://artifacthub.io/packages/helm/wso2/identity-server){: target="_blank"}.
    
        Set `--version` with the version of WSO2 Identity Server Helm chart you want to deploy.


### Option 2: Install from source

1. Clone the WSO2 Kubernetes repository:

    ```bash
    git clone https://github.com/wso2/kubernetes-is.git
    cd kubernetes-is
    ```

    !!! note 

        You can modify `confs/deployment.toml` to customize server configurations.

2. Install the chart:

    ```bash
    helm install $RELEASE_NAME -n $NAMESPACE . \
      --set deployment.image.registry="wso2" \
      --set deployment.image.repository="wso2is" \
      --set deployment.image.tag="{{is_version}}" \
      --set deployment.apparmor.enabled="false" \
      --set deployment.securityContext.runAsUser.enabled="false" \
      --set deployment.entrypoint.defaultMode=0457
    ```

??? note "Use a custom docker image digest"

    The above commands use the publicly released [WSO2 Identity Server Docker image](https://hub.docker.com/r/wso2/wso2is). To use a custom docker image, update the registry, repository, and tag accordingly. You can also specify an image digest instead of a tag as shown below:

    ```shell
    --set deployment.image.digest=<digest> 
    ```

??? note "Troubleshoot startup issues in resource-constrained environments"

    If you are deploying the Helm chart in a resource-constrained environment and the startup takes longer than expected, the shutdown hook of the {{product}} may get triggered due to startup probe failures. To avoid this issue, adjust the startup probe parameters when installing the Helm chart:

    ```shell
    --set deployment.startupProbe.initialDelaySeconds=<value> \
    --set deployment.startupProbe.failureThreshold=<value>
    ```

## (Optional) Step 5: Configure resource limits

By default, the Helm chart for WSO2 Identity Server requests and limits the following resources in your OpenShift cluster:

**Minimum required resources**

| CPU      | Memory |
|----------|--------|
| 2 cores  | 2Gi    |

**Maximum allowed resources**

| CPU      | Memory |
|----------|--------|
| 3 cores  | 4Gi    |

To customize resource requests and limits in your Helm deployment, use the following flags:

```bash
--set deployment.resources.requests.cpu="<value>" \
--set deployment.resources.requests.memory="<value>" \
--set deployment.resources.limits.cpu="<value>" \
--set deployment.resources.limits.memory="<value>"
```

## Step 6: Expose {{product_name}} service

To make {{product_name}} accessible from outside your OpenShift cluster, you need to expose the service. Depending on your setup, you can use either OpenShift routes or ingress.

### Option 1: Using OpenShift routes

Enable route-based access by setting the following Helm flag during deployment:

```bash
--set deployment.route.enabled=true
```

### Option 2: Using ingress

If you prefer to use ingress, after deploying {{product_name}}, find its external IP address by listing the ingress resources in your namespace:

```bash
oc get ing -n $NAMESPACE
```

The output will contain the following columns:

- HOSTS: The hostname assigned to WSO2 Identity Server (default: wso2is.com).
- ADDRESS: The external IP address that exposes WSO2 Identity Server outside the OpenShift cluster.
- PORTS: The externally accessible service ports.

## Step 7: Configure DNS

If your hostname is backed by a DNS service, create a DNS record that maps the hostname to the external IP. If there is no DNS service, you can manually add an entry to the `/etc/hosts` file on your local machine (for evaluation purposes only):

```bash
<EXTERNAL-IP> wso2is.com
```

## Step 8: Access {{product_name}}

Once everything is set up, you can access WSO2 Identity Server using the following URLs:

- Console: [https://wso2is.com/console](https://wso2is.com/console)
- My Account: [https://wso2is.com/myaccount](https://wso2is.com/myaccount)

---

Congratulations! You have successfully deployed {{product_name}} on OpenShift using Helm.
