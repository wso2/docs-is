# Deploying WSO2 Identity Server on Kubernetes using AWS-EKS

!!! info "Prerequisites"

    Install the following applications if you do not have them installed already. Make sure you install the recommended versions for a seamless deployment. 

    1.  Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 
    
    2.  Install [Helm](https://v2.helm.sh/docs/using_helm/#installing-helm) and [Tiller](https://v2.helm.sh/docs/using_helm/#installing-tiller) **version 2.9.1**.

    3.  Install [Kubernetes Client](https://kubernetes.io/docs/tasks/tools/install-kubectl/) **version-v1.17.3**. 

    4.  Set up an [EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html) on AWS cloud, if you do not have one set up already. 
    
        !!! info 
            After creating the EKS cluster, make sure you install the **aws-iam-authenticator** and create a **kubeconfig** by following the Amazon EKS guide mentioned above, to authenticate and communicate with your cluster respectively. After the communication is established, **add worker nodes** to your cluster before proceeding with the deployment.

    5.  Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) **version-nginx-0.22.0**. You can get the raw file for the recommended version [here](https://github.com/kubernetes/ingress-nginx/releases/tag/nginx-0.22.0). Make sure you install the mandatory.yaml file along with the service-xx.yaml and patch-configmap-xx.yaml files you installed for either layer 4 or layer 7.  


    6.  Add the WSO2 Helm chart repository.
        ```curl                                                                
        helm repo add wso2 https://helm.wso2.com && helm repo update
        ```

!!! note ""
	-	The local copy of the `wso2/kubernetes-is` git repository will be referred to as `KUBERNETES_HOME`.
	-	`<KUBERNETES_HOME>/advanced/` will be referred to as `HELM_HOME`.

### Step 1 - Clone the Kubernetes resources from the WSO2 Identity Server git repository

```java
git clone https://github.com/wso2/kubernetes-is.git
```

### Step 2 - Change the configurations as required 

1.	The default configurations work well for the basic deployment of the product. However, if there is anything specific that needs to be configured, change the respective files in `<HELM_HOME>/is-pattern-1/`. 

2.	 Open `<HELM_HOME>/is-pattern-1/values.yaml` and provide the values as mentioned in the second step **(Provide configurations)** of the **Helm Quick Start Guide** [here](https://hub.helm.sh/charts/wso2/is-pattern-1).

### Step 3 - Deploy WSO2 Identity Server

Execute the following command to deploy the product. Here, `NAMESPACE` is the Kubernetes Namespace in which the resources are deployed and the `<RELEASE_NAME>` can be any name that you choose for the deployed instance. 

```java
helm install --dep-up --name <RELEASE_NAME> <HELM_HOME>/is-pattern-1 --namespace <NAMESPACE>
```

### Step 4 - Access the management console

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

### Try it Out 

You can now test the functionalities of WSO2 Identity Server with your app. Alternatively, you can choose a sample app from [here](../../samples/overview) and follow the steps given to deploy the chosen application. 

Make sure you add the proxy port configuration to `<KUBERNETES_HOME>/advanced/is-pattern-1/values.yaml`. 

```toml
[transport.http.properties]
proxyPort = 80
[transport.https.properties]
proxyPort = 443
```

!!! important 
	TThe host name included in the URLs related to the identity provider must be changed based on the `<RELEASE_NAME>` you chose in [step-3](#step-3-deploy-wso2-identity-server). This configuration is present in the properties file in `<SAMPLE_HOME>/WEB-INF/classes` where`<SAMPLE_HOME>` refers to the sample application that you have chosen to verify this deployment. 
