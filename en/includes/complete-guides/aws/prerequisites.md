# Prerequisites for Deploying WSO2 Identity Server on AWS

Before starting the deployment process, ensure that you have all the necessary access, tools, and configurations in place. Meeting these requirements will help you avoid interruptions and streamline the setup of WSO2 Identity Server on AWS.

## AWS Account Requirements

To deploy WSO2 Identity Server components, you must have an AWS account with the right level of permissions and billing setup.

- **Active AWS account**  
  You must have an active AWS account with billing configured. Without billing, required resources such as EC2 instances, networking components, and storage services cannot be provisioned.

- **IAM permissions**  
  Ensure your account has the necessary **IAM (Identity and Access Management) permissions** to create and manage AWS resources. At a minimum, you will need permissions to manage EC2, VPC, IAM roles, security groups, Elastic Load Balancers, and RDS (if applicable). If you're unsure about your permissions, consult with your AWS administrator.

- **Region selection**  
  Decide on the AWS region where you will deploy WSO2 Identity Server. The choice of region can affect latency, cost, and compliance. It is recommended to select a region closest to your primary user base.

!!! tip "New to AWS? Don't worry!"
    Even if you don't have all the prerequisites or are unfamiliar with AWS concepts, you can still follow this guide. Each section explains the necessary AWS components and their purpose in detail, helping you learn as you deploy. This is a great opportunity to build your AWS skills while setting up WSO2 Identity Server.

## Knowledge and Tools

In addition to account requirements, it’s beneficial to have:

- **Familiarity with AWS Services**: A basic understanding of EC2, VPC, IAM, security groups, and networking concepts.
- **SSL/TLS Certificates**: For secure communication, especially if Identity Server will be accessed externally.

## Next Steps

After ensuring all prerequisites are met, you can proceed to the **infrastructure architecture design** phase.  

!!! note "Note"
    In the architecture design phase, you will implement the foundational AWS resources such as the VPC, subnets, route tables, security groups, and IAM roles. These components create the base environment on which WSO2 Identity Server will be deployed. Careful planning at this stage ensures scalability, security, and high availability of your deployment.
