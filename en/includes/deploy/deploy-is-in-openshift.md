# Deploy {{product_name}} on OpenShift Using Helm

This guide walks you through deploying {{product_name}} as a containerized application on an OpenShift cluster using the official Helm chart. Helm streamlines the deployment process by automating the configuration and lifecycle management of OpenShift resources, simplifying setup and maintenance.

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

- An [Ingress-NGINX Controller](https://www.redhat.com/en/blog/using-nginx-ingress-controller-red-hat-openshift){: target="_blank"} deployed on the cluster (optional, if you’re not using OpenShift Routes).

## Step 1: Set Environment Variables

Define environment variables to use throughout the deployment process:

```bash
export NAMESPACE=<your-namespace>
export RELEASE_NAME=<your-helm-release-name>
```

!!! note

    - Replace `<your-namespace>` with the desired OpenShift namespace for deploying {{product_name}}.
    - Replace `<your-helm-release-name>` with a unique name for your Helm release.

## Step 2: Create the OpenShift Namespace

Ensure the namespace exists or create a new one:

```bash
oc get namespace $NAMESPACE || oc create namespace $NAMESPACE
```

## Step 3: Build an OpenShift-Compatible Docker Image

The default WSO2 Identity Server Docker image is not compatible with OpenShift, which runs containers as a randomly assigned, non-root user from the root group (GID 0). To ensure the server can access its necessary files, you must create a custom image that updates the file and directory group ownership to the root group (GID 0) and grants appropriate group permissions.

??? note "Deploy Official Image with disabled seccomp"
    
    - Alternatively, you can use the official image by disabling seccomp:
    ```bash
    --set deployment.securityContext.seccompProfile.enabled="false"
    ```
    - You also need to grant `anyuid` permissions to the service account used in the deployment:
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
    helm install $RELEASE_NAME wso2/identity-server --version {{is_version}}-1 \
      -n $NAMESPACE \
      --set deployment.image.registry="wso2" \
      --set deployment.image.repository="wso2is" \
      --set deployment.image.tag="{{is_version}}" \
      --set deployment.apparmor.enabled="false" \
      --set deployment.securityContext.runAsUser.enabled="false" \
      --set deployment.entrypoint.defaultMode=0457
    ```

    !!! note "Get the latest helm chart version"

        To find the latest version, you can use the [WSO2 Identity Server Artifact Hub](https://artifacthub.io/packages/helm/wso2/identity-server){: target="_blank"}.
    
        Set `--version` with the version of WSO2 Identity Server Helm chart you want to deploy.


### Option 2: Install from Source

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

    !!! note "Using a custom Docker image"

        To use your custom image, update the following values:
        ```bash
        --set deployment.image.registry=<your-registry> \
        --set deployment.image.repository=<your-repo> \
        --set deployment.image.tag=<your-tag>
        ```
        Or use a digest:
        ```bash
        --set deployment.image.digest=<your-image-digest>
        ```

## (Optional) Step 5: Configure Resource Requests and Limits

By default, the chart sets the following values:

**Minimum Required Resources**

| CPU      | Memory |
|----------|--------|
| 2 cores  | 2Gi    |

**Maximum Allowed Resources**

| CPU      | Memory |
|----------|--------|
| 3 cores  | 4Gi    |

To customize, use:

```bash
--set deployment.resources.requests.cpu="<value>" \
--set deployment.resources.requests.memory="<value>" \
--set deployment.resources.limits.cpu="<value>" \
--set deployment.resources.limits.memory="<value>"
```

## Step 6: Expose {{product_name}} Service

### Option 1: Using OpenShift Routes

To enable route-based access:

```bash
--set deployment.route.enabled=true
```

### Option 2: Using Ingress

After deploying WSO2 Identity Server, you need to find its external IP address to access it outside the cluster. Run the following command to list the ingress resources in your namespace:

```bash
oc get ing -n $NAMESPACE
```

The output will contain the following columns:

- HOSTS: The hostname assigned to WSO2 Identity Server (Default: wso2is.com).
- ADDRESS: The external IP address that exposes WSO2 Identity Server outside the Kubernetes cluster.
- PORTS: The externally accessible service ports.

## Step 7: Configure DNS

To access via a domain name:

If your hostname is backed by a DNS service, create a DNS record that maps the hostname to the external IP. If there is no DNS service, you can manually add an entry to the `/etc/hosts` file on your local machine (for evaluation purposes only):

```bash
<EXTERNAL-IP> wso2is.com
```

## Access {{product_name}}

Once everything is set up, you can access WSO2 Identity Server using the following URLs:

- Console: [https://wso2is.com/console](https://wso2is.com/console)
- My Account: [https://wso2is.com/myaccount](https://wso2is.com/myaccount)

---

Congratulations! You have successfully deployed {{product_name}} on OpenShift using Helm.
