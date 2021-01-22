---
template: templates/single-column.html
---

# Deploying WSO2 Identity Server on Kubernetes using Minikube

## Prerequisites

Install the following applications if you do not have them installed already. Make sure you install the recommended versions for a seamless deployment. 

1.  Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 

2.  Install [Helm](https://v2.helm.sh/docs/using_helm/#installing-helm) and [Tiller](https://v2.helm.sh/docs/using_helm/#installing-tiller) **version 2.9.1**.

3.  Install [Kubernetes Client](https://kubernetes.io/docs/tasks/tools/install-kubectl/) **version-v1.14**. 

4.  Set up a [kubernetes cluster](https://kubernetes.io/docs/tasks/tools/install-minikube/#before-you-begin) on minikube, if you do not have one set up already. The recommended version for minikube is **v1.7.3**.

    !!! important ""
        Set the resources in such a way that you do not face any space related issues while testing the deployment. For this, start the minikube cluster with atleast 4 CPUs and a memory of 8192. Also, make sure that the kubernetes version of the server is compatible with the Kubernetes client version installed. Since this document recommends the kubernetes client version v1.14.0, let's use the same for the server as well. The recommended hypervisor for this deployment is [virtualBox](https://www.virtualbox.org/wiki/Downloads). An example of how you can start minikube is shown below. 

        ```curl 
        minikube start --kubernetes-version v1.14.0 --vm-driver=virtualbox --cpus 4 --memory 8192
        ```  
  
5.  Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) **version-nginx-0.22.0**. You can get the raw file for the recommended version [here](https://github.com/kubernetes/ingress-nginx/releases/tag/nginx-0.22.0). Make sure you install only the `mandatory.yaml` file for this deployment. 

    !!! warning 
        **Do not** enable ingress as an addon in your minikube cluster. If you already have a minikube cluster where ingress is enabled, disable it before proceeding further.
      
        ```curl 
        minikube addons disable ingress
        ```

6.  Add the WSO2 Helm chart repository.

    ```java
    helm repo add wso2 https://helm.wso2.com && helm repo update
    ```

Enter the following command to confirm that your minikube cluster is configured properly. 

```curl 
minikube status
```

If you get the following response you can follow the steps given below to deploy WSO2 Identity Server in your local environment. 

```curl
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

!!! note ""
    -	The local copy of the `wso2/kubernetes-is` git repository will be referred to as `KUBERNETES_HOME`.
    -	`<KUBERNETES_HOME>/advanced/` will be referred to as `HELM_HOME`.

---

## Step 1 - Clone the Kubernetes resources from the WSO2 Identity Server git repository

```java
git clone https://github.com/wso2/kubernetes-is.git
```

## Step 2 - Change the configurations as required 

1.	The default configurations work well for the basic deployment of the product. However, if there is anything specific that needs to be configured, change the respective files in `<HELM_HOME>/is-pattern-1/`. 

2.	 Open `<HELM_HOME>/is-pattern-1/values.yaml` and provide the values as mentioned in the second step **(Provide configurations)** of the **Quick Start Guide** [here](https://hub.helm.sh/charts/wso2/is-pattern-1).
	
    !!!note ""
        Change the initial delay seconds of the `livenessProbe` to 250 in the `<HELM_HOME>/is-pattern-1/values.yaml` file. This is to avoid the cluster being terminated due to delays, before it is live.

## Step 3 - Deploy WSO2 Identity Server

Execute the following command to deploy the product. Here, `NAMESPACE` is the Kubernetes Namespace in which the resources are deployed and the `<RELEASE_NAME>` can be any name that you choose for the deployed instance. 

```java
helm install --dep-up --name <RELEASE_NAME> <HELM_HOME>/is-pattern-1 --namespace <NAMESPACE>
```

## Step 4 - Expose the external IP address

!!! info 
    This step is required since Minikube does not support SSL passthrough. We are exposing the external IP in which our Minikube cluster is created in order to access the running application. 

Enter the following command in the terminal. 

```curl 
kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: ingress-nginx
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
spec:
  type: NodePort
  externalIPs:
  - <External-IP>
  ports:
    - name: http
      port: 80
      targetPort: 80
      protocol: TCP
    - name: https
      port: 443
      targetPort: 443
      protocol: TCP
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx

---
```

!!! note ""
    The <\External-IP> should be replaced with the minikube's IP. You can confirm this by using the command given below.

    ```curl 
    minikube ip
    ```

## Step 5 - Access the management console

To access the console in the environment,

1.	Obtain the external IP of the Ingress resources by listing down the Kubernetes Ingresses as shown below. 

	```java
	kubectl get ing -n <NAMESPACE>
	```
	This gives you the `<RELEASE_NAME>` and `<EXTERNAL-IP>` as shown below. 

	```java 
	NAME                       HOSTS                  ADDRESS        PORTS     AGE
	wso2is-ingress             <RELEASE_NAME>         <EXTERNAL-IP>  80, 443   3m
	```

2.	Add the information obtained above in the /etc/hosts file as an entry. 

	```java
	<EXTERNAL-IP>	<RELEASE_NAME>
	```

3.	Navigate to `https://<RELEASE_NAME>/carbon` on a new browser window.

## Try it Out 

You can now test the functionalities of WSO2 Identity Server with your app. You can alternatively choose a sample app from [here](../../quick-starts/overview) and follow the steps given to deploy the chosen application. 

Make sure you add the proxy port configuration to `<KUBERNETES_HOME>/advanced/is-pattern-1/values.yaml`. 

```toml
[transport.http.properties]
proxyPort = 80
[transport.https.properties]
proxyPort = 443
```

!!! important 
	The host name has to be changed in the URLs related to the identity provider based on the `<RELEASE_NAME>` you chose in [step-3](#step-3-deploy-wso2-identity-server). This configuration is present in the properties file in `<SAMPLE_HOME>/WEB-INF/classes` where`<SAMPLE_HOME>` refers to the sample application that you have chosen to verify this deployment. 

---

!!! info "Related Topics"

    -  Working with different databases <insert-link>
    -  Working with different user stores <insert-link>
    -  Configuring the User Realm <insert-link>

---

- To try out deploying WSO2 Identity Server on other platforms, see [here](../../deploy/deploying-wso2-identity-server/).

- To try out deploying WSO2 Identity Server on another Kubernetes Provider, see [here](../../deploy/choose-your-provider/).
