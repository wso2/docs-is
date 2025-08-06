# Deploy {{product_name}} on Kubernetes using Helm

This guide walks you through deploying WSO2 Identity Server as a containerized application on a Kubernetes cluster using the official Helm chart. Helm simplifies the deployment by automating the configuration and management of Kubernetes resources, simplifying setup and maintenance.

The {{product_name}} Helm Chart has been tested in the following environments:

<table>
	<th>Deployment</th>
	<th>Version</th>
	<tr>
		<td>Kubernetes</td>
		<td>v1.30.x</td>
	</tr>
	<tr>
		<td>RKE2</td>
		<td>v1.32.6+rke2r1</td>
	</tr>
</table>

The Helm chart for the {{product_name}} is available [here](https://github.com/wso2/kubernetes-is){: target="_blank"}.

## Prerequisites

Make sure you have the following before starting this guide.

- Ensure your system has the following tools installed.
    - [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git){: target="_blank"}
    - [Helm](https://helm.sh/docs/intro/install/){: target="_blank"}
    - [Docker](https://docs.docker.com/engine/install/){: target="_blank"}
    - [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl){: target="_blank"}

- A running Kubernetes cluster (e.g. [minikube](https://kubernetes.io/docs/tasks/tools/#minikube){:target="_blank"} or an existing cluster).

- A Kubernetes [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/deploy/){:target="_blank"}.

## Step 1: Set up environment variables

Define environment variables for the Kubernetes namespace and Helm release name.

```shell
export NAMESPACE=<Kubernetes Namespace to deploy the resources>
export RELEASE_NAME=<Helm release name of the deployment>
```

!!! note

    - Replace <Kubernetes Namespace to deploy the resources> with the namespace where WSO2 Identity Server should be deployed.
    - Replace <Helm release name for the deployment> with a unique name for the Helm release.

## Step 2: Create a Kubernetes namespace

Ensure that the specified namespace exists or create a new one using the following command.

```shell
kubectl get namespace $NAMESPACE || kubectl create namespace $NAMESPACE
```

## Step 3: Install the Helm chart

There are two ways to install the {{product_name}} using the Helm chart. The Helm chart source code can be found in the [kubernetes-is repository](https://github.com/wso2/kubernetes-is/tree/master){:target=" _blank"}.

### Option 1: Install the chart from the Helm repository
1. Add the WSO2 Helm chart repository

    Before installing {{product_name}}, add the WSO2 Helm chart repository and update it to fetch the latest charts.

    ```shell
    helm repo add wso2 https://helm.wso2.com && helm repo update
    ```

2. Install the Helm chart from the Helm repository.
{% if is_version == "7.0.0" %}
    ```shell
    helm install $RELEASE_NAME wso2/identity-server --version {{is_version}}-2 \
    -n $NAMESPACE \
    --set deployment.image.registry="wso2" \
    --set deployment.image.repository="wso2is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false" \
    --set deployment.externalJKS.enabled="true"
    ```
    {% else %}
    ```shell
    helm install $RELEASE_NAME wso2/identity-server --version {{is_version}} \
    -n $NAMESPACE \
    --set deployment.image.registry="wso2" \
    --set deployment.image.repository="wso2is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false" \
    --set deployment.externalJKS.enabled="true"
    ```
{% endif %}

    ??? note "Get the latest helm chart version"
            To find the latest version, you can use the [WSO2 Identity Server Artifact Hub](https://artifacthub.io/packages/helm/wso2/identity-server){: target="_blank"}.
    
            Set `--version` with the version of WSO2 Identity Server Helm chart you want to deploy.
    
    {% if is_version == "7.0.0" %}
    !!! note 
        The steps in this guide are applicable from Helm chart version `7.0.0-2` onwards.
    {% endif %}

### Option 2: Install the Chart from source

If you prefer to build the chart from the source, follow the steps below:

1. Clone the WSO2 Kubernetes repository.

    ```shell
    git clone https://github.com/wso2/kubernetes-is.git
    cd kubernetes-is
    ```

    !!! note
        You can customize the product configuration by modifying the `kubernetes-is/confs/deployment.toml` file after cloning the repository.

2. Install the Helm chart from the cloned repository:

    ```shell
    helm install $RELEASE_NAME -n $NAMESPACE . \
    --set deployment.image.registry="wso2" \
    --set deployment.image.repository="wso2is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false"
    ```

??? note "Use a custom docker image"

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

## (Optional) Step 4: Configure resource limits

By default, the Helm chart for WSO2 Identity Server requests and limits the following resources in your Kubernetes cluster:

**Resource requests (Minimum required)**
<table>
    <tr>
        <th>CPU</th>
        <th>Memory</th>
    </tr>
    <tr>
        <td>2 cores</td>
        <td>2Gi</td>
    </tr>
</table>

**Resource requests (Maximum allowed)**
<table>
    <tr>
        <th>CPU</th>
        <th>Memory</th>
    </tr>
    <tr>
        <td>3 cores</td>
        <td>4Gi</td>
    </tr>
</table>

To customize resource requests and limits in your Helm deployment, use the following flags:

```shell
--set deployment.resources.requests.cpu="<value>" \
--set deployment.resources.requests.memory="<value>" \
--set deployment.resources.limits.cpu="<value>" \
--set deployment.resources.limits.memory="<value>"
```

## Step 5: Obtain the External IP

After deploying WSO2 Identity Server, you need to find its external IP address to access it outside the cluster. Run the following command to list the ingress resources in your namespace:

```shell
kubectl get ing -n $NAMESPACE
```

The output will contain the following columns:

- HOSTS: The hostname assigned to WSO2 Identity Server (Default: wso2is.com).
- ADDRESS: The external IP address that exposes WSO2 Identity Server outside the Kubernetes cluster.
- PORTS: The externally accessible service ports.

## Step 6: Configure DNS

If your hostname is backed by a DNS service, create a DNS record that maps the hostname to the external IP. If there is no DNS service, you can manually add an entry to the `/etc/hosts` file on your local machine (for evaluation purposes only):

```shell
<EXTERNAL-IP> wso2is.com
```

## Step 7: Access {{product_name}}

Once everything is set up, you can access WSO2 Identity Server using the following URLs:

- Console: https://wso2is.com/console
- My Account portal: https://wso2is.com/myaccount

Congratulations! You have successfully deployed WSO2 Identity Server on Kubernetes using Helm.

If you are deploying {{product_name}} on Azure Kubernetes Service (AKS) and require an advanced set up, refer to the relevant section in the [documentation](https://github.com/wso2/kubernetes-is/blob/master/README.md#advance-setup){:target = "_blank"}.