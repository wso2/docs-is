---
template: templates/single-column.html
---

# Deploying WSO2 Identity Server on Kubernetes using AWS-EKS

## Prerequisites

Install the following applications if you do not have them installed already. Make sure you install the recommended versions for a seamless deployment. 

1.  Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). 

2.  Install [Helm](https://v2.helm.sh/docs/using_helm/#installing-helm) and [Tiller](https://v2.helm.sh/docs/using_helm/#installing-tiller) **version 2.9.1**.

3.  Install [Kubernetes Client](https://kubernetes.io/docs/tasks/tools/install-kubectl/) **version-v1.17.3**. 

4.  Set up an [EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html) on AWS cloud, if you do not have one set up already. 

	!!! note ""
		Make sure you have set up the following components properly before you set up the cluster. For more information, see [the amazon EKS getting started guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-prereqs).

		-	The EKS Service Role
		-	The EKS Cluster VPC
		-	AWS CLI version 2 
			!!! note 
				Alternatively, you can also use AWS CLI version 1 however, you need to make sure that you have installed Python3. AWS CLI version 2 is independant of the Python version you are using. 

5.	Launch a managed node to get started with your instance profile. For instructions to do this, see [the amazon EKS getting started guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-launch-workers).

	!!! warning 
		While configuring the added node group, ensure that the instance type is c5.4xlarge or that of a larger capacity to avoid errors in deployment due to insuffucient CPU. 

7.  Install NGINX Ingress Controller **version-nginx-0.22.0**. You can get the raw file for the recommended version from the [NGINX Ingress release tag](https://github.com/kubernetes/ingress-nginx/releases/tag/nginx-0.22.0).   

	!!! note ""
		To ensure that the NGINX Ingress controller is exposed, [download the source code](https://github.com/kubernetes/ingress-nginx/releases/tag/nginx-0.22.0) and apply the following files. Note that you can use the files for layer 7 instead of layer 4 as well. 
		
		```curl 
		kubectl apply -f namespace.yaml
		```
		```curl
		kubectl apply -f mandatory.yaml
		```
		```curl
		kubectl apply -f patch-configmap-14.yaml
		```
		```curl
		kubectl apply -f service-l4.yaml
		```

6.  Add the WSO2 Helm chart repository.
	```curl                                                                
	helm repo add wso2 https://helm.wso2.com && helm repo update
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

2.	 Open `<HELM_HOME>/is-pattern-1/values.yaml` and provide the values as mentioned in the second step **(Provide configurations)** of the **Helm Quick Start Guide** [here](https://hub.helm.sh/charts/wso2/is-pattern-1).

## Step 3 - Deploy WSO2 Identity Server

Execute the following command to deploy the product. Here, `NAMESPACE` is the Kubernetes Namespace in which the resources are deployed and the `<RELEASE_NAME>` can be any name that you choose for the deployed instance. 

```java
helm install --dep-up --name <RELEASE_NAME> <HELM_HOME>/is-pattern-1 --namespace <NAMESPACE>
```
!!! tip "Trouble Shooting Tip"
     If you come across the following error while deploying the product, execute the commands given below to resolve it. 
    
     **Error**
     
     ```curl 
     forbidden: User "system:serviceaccount:kube-system:default" cannot get namespaces in the namespace
     ```
     **Commands to resolve the above error**
     
     ```curl 
     kubectl create serviceaccount --namespace kube-system tiller
     kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
     kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":       {"serviceAccount":"tiller"}}}}'
     ```
## Step 4 - Access the management console

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
	<HOST-IP>	<RELEASE_NAME>
	```

	The `<HOST-IP>` that needs to be mentioned in the /etc/hosts file can be obtained by pinging the <EXTERNAL-IP> you got in the first step.
	
	**Request**
	```curl
	ping <EXTERNAL-IP>
	```
	**Response**
	```curl
	PING <EXTERNAL-IP> <HOST-IP>: xx data bytes
	```
3.	Navigate to `https://<RELEASE_NAME>/carbon` on a new browser window.

## Try it Out 

You can now test the functionalities of WSO2 Identity Server with your app. Alternatively, you can choose a sample app from [here](../../quick-starts/overview) and follow the steps given to deploy the chosen application. 

Make sure you add the proxy port configuration to `<KUBERNETES_HOME>/advanced/is-pattern-1/values.yaml`. 

```toml
[transport.http.properties]
proxyPort = 80
[transport.https.properties]
proxyPort = 443
```

!!! important 
	The host name included in the URLs related to the identity provider must be changed based on the `<RELEASE_NAME>` you chose in [step-3](#step-3-deploy-wso2-identity-server). This configuration is present in the properties file in `<SAMPLE_HOME>/WEB-INF/classes` where`<SAMPLE_HOME>` refers to the sample application that you have chosen to verify this deployment. 

---

!!! info "Related Topics"

    -  Working with different databases <insert-link>
    -  Working with different user stores <insert-link>
    -  Configuring the User Realm <insert-link>

---

- To try out deploying WSO2 Identity Server on other platforms, see [here](../../deploy/deploying-wso2-identity-server/).

- To try out deploying WSO2 Identity Server on another Kubernetes Provider, see [here](../../deploy/choose-your-provider/).
