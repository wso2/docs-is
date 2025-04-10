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

## Set up environment variables

Define environment variables for the Kubernetes namespace and Helm release name.

```shell
export NAMESPACE=<Kubernetes Namespace to deploy the resources>
export RELEASE_NAME=<Helm release name of the deployment>
```

!!! note

    - Replace <Kubernetes Namespace to deploy the resources> with the namespace where WSO2 Identity Server should be deployed.
    - Replace <Helm release name for the deployment> with a unique name for the Helm release.

## Create a Kubernetes namespace

Ensure that the specified namespace exists or create a new one using the following command.

```shell
kubectl get namespace $NAMESPACE || kubectl create namespace $NAMESPACE
```

## Create a Kubernetes TLS secret

To enable secure HTTPS communication for your service (e.g., WSO2 Identity Server) within the Kubernetes cluster, you need to provide a TLS certificate and key. Kubernetes uses these to serve traffic over HTTPS using Ingress controllers or other resources that terminate TLS.

If you already have an SSL certificate and its private key (typically in .crt and .key format), you can create a Kubernetes TLS secret using the following command:

```shell
kubectl create secret tls is-tls \
--cert=path/to/cert/file \
--key=path/to/key/file \
-n $NAMESPACE
```

- `is-tls` is the name of the secret.

- Replace `path/to/cert/file` and `path/to/key/file` with the actual paths to your certificate and key.

!!! note

    - Ensure that the certificate includes `localhost` as a Subject Alternative Name (SAN) to support B2B related use cases without triggering certification validation errors.
    - When generating the keystore, use the default password `wso2carbon`.

## Create a Kubernetes secret for Java Keystore files

To support secure communication and cryptographic operations, the deployment requires four Java keystore files. These keystores are mounted into the container and used for tasks such as internal encryption, message signing, TLS, and trust validation.

- **Internal keystore (internal.p12):** Used for encrypting/decrypting internal data.
- **Primary keystore (primary.p12):** Certificates used for signing messages that are communicated with external parties (such as SAML, OIDC id_token signing).
- **TLS keystore (tls.p12):** Used for TLS communication.
- **Client truststore (client-truststore.p12):** Certificates of trusted third parties.

```shell
kubectl create secret generic keystores \
--from-file=internal.p12 \
--from-file=primary.p12 \
--from-file=tls.p12 \
--from-file=client-truststore.p12 \
-n $NAMESPACE
```

!!! note

    - Make sure to import the public key certificates of all three keystores into the truststore (client-truststore.p12).
    - To learn how to create these keystores and truststores, refer to [Create New Keystores]({{base_path}}/deploy/security/keystores/create-new-keystores/).
    - The `tls.p12` file used here should contain the same certificate and key that were used to create the `is-tls` TLS secret above, to ensure consistency in TLS communication.

## Install the Helm chart

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
    helm install $RELEASE_NAME wso2/identity-server --version {{is_version}}-1 \
    -n $NAMESPACE \
    --set deployment.image.registry="wso2" \
    --set deployment.image.repository="wso2is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false" \
    --set deployment.externalJKS.enabled="true"
    ```
{% endif %}

    !!! note "Get the latest helm chart version"
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
    --set deployment.apparmor.enabled="false" \
    --set deployment.externalJKS.enabled="true"
    ```

    !!! note "Use a custom docker image"
    
        The above commands use the publicly released [WSO2 Identity Server Docker image](https://hub.docker.com/r/wso2/wso2is). To use a custom docker image, update the registry, repository, and tag accordingly. You can also specify an image digest instead of a tag as shown below:
    
        ```shell
        --set deployment.image.digest=<digest> 
        ```

## (Optional) Change of Keystore passwords

Generate the keystore using the default password "wso2carbon". However, if you have used a different password, update the following configurations accordingly:

```shell
--set deploymentToml.keystore.internal.fileName="internal.p12" \
--set deploymentToml.keystore.internal.password="<value>" \
--set deploymentToml.keystore.internal.keyPassword="<value>" \
--set deploymentToml.keystore.primary.fileName="primary.p12" \
--set deploymentToml.keystore.primary.password="<value>" \
--set deploymentToml.keystore.primary.keyPassword="<value>" \
--set deploymentToml.keystore.tls.fileName="tls.p12" \
--set deploymentToml.keystore.tls.password="<value>" \
--set deploymentToml.keystore.tls.keyPassword="<value>" \
--set deploymentToml.truststore.fileName="client-truststore.p12" \
--set deploymentToml.truststore.password="<value>"
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

After deploying WSO2 Identity Server, you need to find its external IP address to access it outside the cluster. Run the following command to list the ingress resources in your namespace:

```shell
kubectl get ing -n $NAMESPACE
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