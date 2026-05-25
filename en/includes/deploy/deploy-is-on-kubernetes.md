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

- One of the following Kubernetes traffic management options, depending on the deployment pattern you choose:

    - **Option 1: Kubernetes Ingress pattern** — Install a Kubernetes [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/deploy/){:target="_blank"}.

    - **Option 2: Kubernetes Gateway API pattern** — Install Envoy Gateway. You must install the Envoy Gateway Controller with Experimental Features and Extension APIs enabled. These are required to support `BackendTLSPolicy` for secure backend communication and `EnvoyPatchPolicy` for session persistence.

        ```
        helm install envoy-gateway oci://docker.io/envoyproxy/gateway-helm \
          --version v1.7.0 \
          -n envoy-gateway-system \
          --create-namespace \
          --set envoyGateway.gateway.experimentalFeatures.enabled=true \
          --set config.envoyGateway.extensionApis.enableBackend=true \
          --set config.envoyGateway.extensionApis.enableEnvoyPatchPolicy=true
        ```

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
    --set deployment.image.registry="registry.wso2.com" \
    --set deployment.image.repository="wso2is/is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false"
    ```
    {% else %}
    ```shell
    helm install $RELEASE_NAME wso2/identity-server --version {{is_version}} \
    -n $NAMESPACE \
    --set deployment.image.registry="registry.wso2.com" \
    --set deployment.image.repository="wso2is/is" \
    --set deployment.image.tag="{{is_version}}" \
    --set deployment.apparmor.enabled="false"
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
    --set deployment.image.registry="registry.wso2.com" \
    --set deployment.image.repository="wso2is/is" \
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

## Step 7: (Optional) Configure Backend TLS for Envoy Gateway

!!! note
    This step is only required if you are using Envoy Gateway.

When using Envoy Gateway, the communication between the Gateway and the WSO2 Identity Server pods is secured via Backend TLS. To establish this trust, Envoy must verify the certificate presented by the WSO2 IS.

You must provide a Kubernetes ConfigMap containing the CA certificate that signed the WSO2 IS TLS certificate.

Follow the steps below to generate a self-signed CA certificate and sign the WSO2 IS Keystore certificate to ensure successful Backend TLS communication between Envoy and the backend Identity Server.

!!! note
    WSO2 Identity Server supports using multiple, purpose‑specific keystores — for example, separate keystores for Primary, Internal, and TLS use cases. In production it's recommended to maintain distinct keystores so that keys used for different functions (such as internal data encryption, token signing, and TLS communication) can be managed and rotated independently. For Backend TLS communication with Envoy Gateway, only the TLS keystore (which holds the certificate used for HTTPS/TLS connections) is required.

### Step 7a: Generate a Self-Signed Certificate Authority (CA)

First, create a private key and a self-signed root certificate to act as your internal CA.

```shell
# Generate CA private key
openssl genrsa -out wso2carbon-ca.key 2048

# Generate Root CA certificate
openssl req -x509 -new -nodes -key wso2carbon-ca.key -sha256 -days 3650 \
-out wso2carbon-ca.crt \
-subj "/CN=WSO2 Carbon Internal CA/O=WSO2"
```

### Step 7b: Create a Server Configuration File

To ensure the certificate is compatible with Envoy Gateway's strict validation, you must include the keyUsage and Subject Alternative Name (SAN). Create a file named `server.conf`.

```
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = localhost

[v3_req]
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
```

### Step 7c: Generate and Sign the WSO2 IS Certificate

Generate a new private key for the WSO2 IS Keystore and sign the request using the CA created in Step 7a.

```shell
# Generate private key for WSO2 IS
openssl genrsa -out wso2carbon.key 2048

# Create a Certificate Signing Request (CSR)
openssl req -new -key wso2carbon.key -out wso2carbon.csr -config server.conf

# Sign the CSR with your Internal CA
openssl x509 -req -in wso2carbon.csr \
  -CA wso2carbon-ca.crt \
  -CAkey wso2carbon-ca.key \
  -CAcreateserial \
  -out wso2carbon.crt \
  -days 365 -sha256 \
  -extfile server.conf \
  -extensions v3_req
```

### Step 7d: Package into a PKCS12 Keystore

WSO2 Identity Server prefers the PKCS12 format for its Keystore. Convert the certificate and key into a `.p12` file.

```shell
openssl pkcs12 -export -in wso2carbon.crt -inkey wso2carbon.key \
  -out wso2carbon.p12 -name wso2carbon -passout pass:wso2carbon
```

### Step 7e: Import the CA Certificate into the Truststore

To ensure that WSO2 Identity Server can trust the CA for TLS communication, you need to add the CA certificate to the client truststore. You can either use the truststore provided in the WSO2 product distribution (`client-truststore.p12`) or create your own. This allows WSO2 IS to validate certificates issued by the CA, including its own TLS certificate.

```shell
keytool -importcert \
  -alias wso2carbon \
  -file wso2carbon-ca.crt \
  -keystore client-truststore.p12 \
  -storetype PKCS12 \
  -storepass wso2carbon \
  -noprompt
```

### Step 7f: Create Kubernetes Resources

Deploy the generated TLS Keystore and CA Certificate into the Kubernetes namespace.

**I. Create TLS Keystore Secret**

This secret contains the PKCS12 keystore used by the WSO2 Identity Server pods to secure their TLS communication.

```shell
kubectl create secret generic keystores \
  --from-file=wso2carbon.p12 \
  --from-file=client-truststore.p12 \
  -n $NAMESPACE
```

**II. Create CA Bundle ConfigMap**

This ConfigMap contains the Root CA certificate. Envoy Gateway uses this to verify the identity of the WSO2 IS pods during the TLS handshake.

```shell
kubectl create configmap wso2-ca-bundle \
  --from-file=ca.crt=wso2carbon-ca.crt \
  -n $NAMESPACE
```

## Step 8: Access {{product_name}}

Once everything is set up, you can access WSO2 Identity Server using the following URLs:

- Console: https://wso2is.com/console
- My Account portal: https://wso2is.com/myaccount

Congratulations! You have successfully deployed WSO2 Identity Server on Kubernetes using Helm.

If you are deploying {{product_name}} on Azure Kubernetes Service (AKS) and require an advanced setup, refer to the relevant section in the [documentation](https://github.com/wso2/kubernetes-is/blob/master/README.md#advance-setup){:target = "_blank"}.
