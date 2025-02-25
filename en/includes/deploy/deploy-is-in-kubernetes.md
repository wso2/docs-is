# Deploy {{product_name}} in Kubernetes using Helm

This guide walks you through deploying WSO2 Identity Server as a containerized application on a Kubernetes cluster using the official Helm chart. Helm simplifies the deployment process by automating the configuration and management of Kubernetes resources, making it easier to set up and maintain your {{product_name}} instance.

## Prerequisites

Make sure you have the following before starting this guide.

- Ensure your system has the following tools installed.
    - [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git){: target="_blank"}
    - [Helm](https://helm.sh/docs/intro/install/){: target="_blank"}
    - [Docker](https://docs.docker.com/engine/install/){: target="_blank"}
    - [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl){: target="_blank"}

- A running Kubernetes cluster (e.g. [minikube](https://kubernetes.io/docs/tasks/tools/#minikube){:target="_blank"} or an existing cluster).

- A Kubernetes [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/deploy/){:target="_blank"}.

## Add the WSO2 Helm chart repository

Before installing {{product_name}}, add the WSO2 Helm chart repository and update it to fetch the latest charts.

```shell
helm repo add wso2 https://helm.wso2.com && helm repo update
```

## Set up environment variables

Define environment variables for the Kubernetes namespace and Helm release name.

```shell
export NAMESPACE=<Kubernetes Namespace to deploy the resources>
export RELEASE_NAME=<Helm release name for the deployment>
```
!!! note

    - Replace <Kubernetes Namespace to deploy the resources> with the namespace where WSO2 Identity Server should be deployed.
    - Replace <Helm release name for the deployment> with a unique name for the Helm release.

## Create a Kubernetes namespace

Ensure that the specified namespace exists or create a new one using the following command.

```shell
kubectl get namespace ${NAMESPACE} || kubectl create namespace ${NAMESPACE}
```

## Install the Helm chart

There are two ways to install the {{product_name}} Helm chart. The Helm chart source code can be found in the [kubernets-is repository](https://github.com/wso2/kubernetes-is/tree/master){:target=" _blank"}.

### Option 1: Install the chart from the Helm repository

Use the following command to install {{product_name}} from the official WSO2 Helm repository:

```shell
helm install "$RELEASE_NAME" wso2/identity-server --version {{is_version}}-1 \
-n "${NAMESPACE}" \
--set deployment.image.registry="wso2" \
--set deployment.image.repository="wso2is" \
--set deployment.image.tag="{{is_version}}" \
--set deployment.apparmor.enabled="false"
```

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
    helm install "$RELEASE_NAME" -n "${NAMESPACE}" . \
    --set deployment.image.registry="wso2" \
    --set deployment.image.repository="wso2is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false"
    ```

!!! note "Use a custom docker image"

    The below commands use the publicly released [WSO2 Identity Server Docker image](https://hub.docker.com/r/wso2/wso2is). To use a custom docker image, update the registry, repository, and tag accordingly. You can also specify an image digest instead of a tag as shown below:

    ```shell
    --set deployment.image.digest=<digest> 
    ```

## (Optional) Configure resource limits

By default, WSO2 Identity Server requests and limits the following resources in your Kubernetes cluster:

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

If your Kubernetes cluster has limited resources, you can adjust these values when installing the Helm chart by using the following flags:

```shell
--set deployment.resources.requests.cpu="<value>" \
--set deployment.resources.requests.memory="<value>" \
--set deployment.resources.limits.cpu="<value>" \
--set deployment.resources.limits.memory="<value>"
```

## Obtain the External IP

After deploying WSO2 Identity Server, you need to find its external IP address to access it outside the cluster. Run the following command to list the Ingress resources in your namespace:

```shell
kubectl get ing -n "$NAMESPACE"
```

The output will contain the following columns:

- HOSTS: The hostname assigned to WSO2 Identity Server (Default: wso2is.com).
- ADDRESS: The external IP address that exposes WSO2 Identity Server outside the Kubernetes cluster.
- PORTS: The externally accessible service ports.

## Configure DNS

If your hostname is backed by a DNS service, create a DNS record that maps the hostname to the external IP. If there is no DNS service, you can manually add an entry to the `/etc/hosts` file on your local machine (for evaluation purposes only):

```shell
<EXTERNAL-IP> wso2is.com
```

## Access {{product_name}}

Once everything is set up, you can access WSO2 Identity Server using the following URLs:

- Console: https://wso2is.com/console
- My Account portal: https://wso2is.com/myaccount

Congratulations! You have successfully deployed WSO2 Identity Server on Kubernetes using Helm.

If you are deploying {{product_name}} on Azure Kubernetes Service (AKS) and require an advanced set up, refer to the relevant section in the [documentation](https://github.com/wso2/kubernetes-is/blob/master/README.md#advance-setup){:target = "_blank"}.