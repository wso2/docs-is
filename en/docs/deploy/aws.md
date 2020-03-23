# Deploying WSO2 Identity Server on Kubernetes using AWS

## Step 1 - Checkout this repository into your local machine using the following Git command

```java
git clone https://github.com/wso2/aws-is.git
```

## Step 2 - Specify a key value pair 

Go to [AWS console](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#KeyPairs:sort=keyName) and specify a key value pair for authentication in a preferred region.
Allowed regions are:

-	ap-southeast-2 (Asia Pacific (Sydney))
-	eu-west-1 (EU (Ireland))
-	us-east-1 (US East (N. Virginia))
-	us-east-2 (US East (Ohio))
-	us-west-1 (US West (N. California))
-	us-west-2 (US West (Oregon))

This could be used to ssh into the instances. Add a Server Certificate to AWS using ACM or IAM as explained [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html). This will be used at the load balancer listeners.

## Step 3 - Create and launch a cloudformer stack

Go to [AWS CloudFormation console](https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false) and select Launch Cloudformer.


## Step 4 - Deploy WSO2 Identity Server

Follow the on screen instructions and provide the SSH key value pair name given in step 2, and other requested information and proceed. Access the web UIs via the URLs available in the Outputs tab.

!!!note 
	The services listed through above URLs may take few minutes to become available, after stack creation.




