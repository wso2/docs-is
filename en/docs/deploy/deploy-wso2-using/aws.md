---
template: templates/single-column.html
---

# Deploying WSO2 Identity Server using AWS CloudFormation

## Prerequisites

1. Make sure you already have an [AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). 

2. Install [AWS CLI 2](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html). Alternatively, you can also use AWS CLI version 1. However, you need to make sure that you have installed Python3 to use AWS CLI version 1.

## Step 1 - Create and upload an SSL certificate into AWS
In AWS, web servers are fronted with a Load balancer. While deploying WSO2 Identity Sever in AWS, it is not required to create the load balancer separately as it is taken care of in the template that you use. To establish a secure connection between the web server and the browser via the load balancer, you will need an SSL certificate. 

??? note "Creating a self-signed certificate"
	If you are using this for testing purposes and do not want to create a certificate using the AWS certificate manager, you can create a self signed certificate instead by following the instructions given below. 

	1. Generate private key as private.pem 

		```curl tab="Request"
		openssl genrsa -out private.pem 2048
		```
		
		```curl tab="Response"
		Generating RSA private key, 2048 bit long modulus
		...................................................................................+++
		......................................................................................+++
		e is 65537 (0x010001)
		```

	2. Generate public key as public.pem

		```curl tab="Request"
		openssl rsa -in private.pem -outform PEM -pubout -out public.pem
		```
		
		```curl tab="Response"
		writing RSA key
		```

	3. Create a CSR (Certificate Signing Request) as certificate.csr

		```curl tab="Request"
		openssl req -new -key private.pem -out certificate.csr
		```
		
		```curl tab="Response"
		You are about to be asked to enter information that will be incorporated
		into your certificate request.
		What you are about to enter is what is called a Distinguished Name or a DN.
		There are quite a few fields but you can leave some blank
		For some fields there will be a default value,
		If you enter '.', the field will be left blank.
		-----
		Country Name (2 letter code) [AU]:
		State or Province Name (full name) [Some-State]:
		Locality Name (eg, city) []:
		Organization Name (eg, company) [Internet Widgits Pty Ltd]:
		Organizational Unit Name (eg, section) []:
		Common Name (e.g. server FQDN or YOUR name) []:*us-east-2.elb.amazonaws.com
		Email Address []:
		Please enter the following 'extra' attributes
		to be sent with your certificate request
		A challenge password []:
		An optional company name []:
		```
		
	4. Create a self-signed certificate as certificate.crt

		```curl tab="Request"
		openssl x509 -req -days 365 -in certificate.csr -signkey private.pem -out certificate.crt
		```

		```curl tab="Response"
		Signature ok
		subject=/CN=*us-east-2.elb.amazonaws.com
		Getting Private key
		```

	5.	Upload your certificate

		``` curl tab="Request"
		aws iam upload-server-certificate --server-certificate-name my-server-test --certificate-body file://certificate.crt --private-key file://private.pem
		```

		```curl tab="Response"
		ServerCertificateMetadata:
		Arn: arn:aws:iam::637117764576:server-certificate/my-server-test
		Expiration: '2021-03-24T07:56:42+00:00'
		Path: /
		ServerCertificateId: ASCAZIVZNSPQJ6CPW6YAP
		ServerCertificateName: my-server-test
		UploadDate: '2020-03-24T07:57:00+00:00'
		```

	6.  Validate the uploaded certificate and note down the `ServerCertificateName`. 

		```curl 
		aws iam list-server-certificate
		```

	7.  Obtain the `aws_access_key_id` and `aws_secret_access_key` from the credentials file. 

		```curl 
		vi  ~/.aws/credentials
		```			
		

## Step 2 - Create an EC2 key pair for the desired region

```curl
aws ec2 create-key-pair --key-name <key-pair-name>
```

!!! note ""
	Alternatively, you can also create this using the [AWS EC2 console](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#KeyPairs:sort=keyName). 
	
	1. Click on **Create Key Pair**.

	2. Enter a key pair name of your choice. Then choose a file format and click on **Create Key Pair** to create your key pair. 

## Step 3 - Create a stack

1. [Create an EC2 stack](https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/create/template) by choosing **Create Stack > With new resources(standard)**. Specify `https://s3.amazonaws.com/wso2-cloudformation-templates/scalable-is.yaml` as the Amazon S3 URL. Then click **Next**. 

	!!! note ""
		To get a clear idea of the resources the template creates, and the overall flow of this deployment, click **View in Designer** before proceeding. 

2. Specify all the stack details as required. Enter the **Key ID** and **Secret Key** as obtained in step 1, and the key pair name as obtained in step 2. 

	!!! note ""
		1. Make sure that the instance type is m3.large or larger. 

		2. The DB password that you choose for your DB instance can contain printable ASCII characters besides '/', '@', '"', ' '.

3. Click on **Next**. Verify the stack details in the page that appears next. If everything is fine, click **Next** again and then click **Create Stack** on the page that appears. 

!!! note "" 
	The stack resources might take upto 15 minutes to get created. You can view the porgress of the creation in the **Events** tab of the AWS console. 

## Step 4 - Access the management console 

You can access the WSO2 Identity Server management console by clicking on the `MgtConsoleUrl` mentioned in the **Outputs** tab of the stack that you created in step 3. 

---

!!! info "Related Topics"

    -  Working with different databases <insert-link>
    -  Working with different user stores <insert-link>
    -  Configuring the User Realm <insert-link>

---

To try out deploying WSO2 Identity Server on other platforms, see [here](../../deploy/deploying-wso2-identity-server/).




